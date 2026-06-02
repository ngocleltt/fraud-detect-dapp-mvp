import os
import json
import pickle
from typing import List, Dict, Any, Optional
from concurrent.futures import ThreadPoolExecutor, as_completed

import numpy as np
import pandas as pd
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="ChainEye Forensics Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CID_LIST_FILE = os.path.join(BASE_DIR, "ipfs_cids.json")
MODEL_PATH = os.path.abspath(os.path.join(BASE_DIR, "..", "model", "fraud_model.pkl"))
PINATA_JWT = os.getenv("PINATA_JWT")
PINATA_GATEWAY = os.getenv("PINATA_GATEWAY", "https://blue-obedient-eagle-118.mypinata.cloud")

with open(MODEL_PATH, "rb") as f:
    MODEL_ARTIFACT = pickle.load(f)

MODEL_PIPELINE = MODEL_ARTIFACT["pipeline"]
MODEL_FEATURE_NAMES = MODEL_ARTIFACT["feature_names"]
MODEL_THRESHOLD = float(MODEL_ARTIFACT["threshold"])
MODEL_METADATA = MODEL_ARTIFACT.get("metadata", {})


class UserFeaturesInput(BaseModel):
    total_erc20_tnxs: int
    erc20_uniq_rec_contract_addr: int
    erc20_uniq_rec_token_name: int
    erc20_uniq_rec_addr: int
    time_diff_mins: float
    total_ether_received: float
    avg_min_between_rec: float
    avg_val_received: float
    total_transactions_incl_create: int
    unique_received_from_addresses: int


class SimulateRequest(BaseModel):
    user_id: str
    target_address: str
    features: UserFeaturesInput


def load_cid_list() -> List[str]:
    if not os.path.exists(CID_LIST_FILE):
        return []
    with open(CID_LIST_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_cid_list(cids: List[str]) -> None:
    with open(CID_LIST_FILE, "w", encoding="utf-8") as f:
        json.dump(cids, f, indent=2)


def fetch_user_from_ipfs(cid: str) -> Optional[Dict[str, Any]]:
    gateway_url = f"{PINATA_GATEWAY}/ipfs/{cid}"
    try:
        response = requests.get(gateway_url, timeout=30)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, dict):
                data["ipfs_cid"] = cid
            return data
    except Exception:
        return None
    return None


def upload_to_ipfs(json_data: dict) -> Optional[str]:
    if not PINATA_JWT:
        return None

    url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
    headers = {
        "Authorization": f"Bearer {PINATA_JWT}",
        "Content-Type": "application/json",
    }
    payload = {
        "pinataOptions": {"cidVersion": 1},
        "pinataMetadata": {
            "name": f"AuditRecord_{json_data.get('target_address', 'Unknown')}.json"
        },
        "pinataContent": json_data,
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=60)
        if response.status_code == 200:
            return response.json().get("IpfsHash")
    except Exception:
        return None
    return None


def features_input_to_model_dict(features: UserFeaturesInput) -> Dict[str, float]:
    return {
        "Total ERC20 tnxs": features.total_erc20_tnxs,
        "ERC20 uniq rec contract addr": features.erc20_uniq_rec_contract_addr,
        "ERC20 uniq rec token name": features.erc20_uniq_rec_token_name,
        "ERC20 uniq rec addr": features.erc20_uniq_rec_addr,
        "Time Diff between first and last (Mins)": features.time_diff_mins,
        "total ether received": features.total_ether_received,
        "Avg min between received tnx": features.avg_min_between_rec,
        "avg val received": features.avg_val_received,
        "total transactions (including tnx to create contract)": features.total_transactions_incl_create,
        "Unique Received From Addresses": features.unique_received_from_addresses,
    }


def normalize_feature_dict(raw_features: Dict[str, Any]) -> Dict[str, float]:
    return {
        "Total ERC20 tnxs": raw_features.get("Total ERC20 tnxs", np.nan),
        "ERC20 uniq rec contract addr": raw_features.get("ERC20 uniq rec contract addr", np.nan),
        "ERC20 uniq rec token name": raw_features.get("ERC20 uniq rec token name", np.nan),
        "ERC20 uniq rec addr": raw_features.get("ERC20 uniq rec addr", np.nan),
        "Time Diff between first and last (Mins)": raw_features.get("Time Diff between first and last (Mins)", np.nan),
        "total ether received": raw_features.get("total ether received", np.nan),
        "Avg min between received tnx": raw_features.get("Avg min between received tnx", np.nan),
        "avg val received": raw_features.get("avg val received", np.nan),
        "total transactions (including tnx to create contract)": raw_features.get(
            "total transactions (including tnx to create contract)", np.nan
        ),
        "Unique Received From Addresses": raw_features.get("Unique Received From Addresses", np.nan),
    }


def predict_wallet(feature_dict: Dict[str, Any]) -> Dict[str, Any]:
    row = pd.DataFrame(
        [{name: feature_dict.get(name, np.nan) for name in MODEL_FEATURE_NAMES}]
    )
    score = float(MODEL_PIPELINE.predict_proba(row)[0, 1])
    is_fraud = score >= MODEL_THRESHOLD
    risk_level = "HIGH" if score >= 0.7 else ("MEDIUM" if score >= 0.4 else "LOW")

    return {
        "score": round(score, 4),
        "classification": "suspicious" if is_fraud else "safe",
        "label": "FRAUD" if is_fraud else "NORMAL",
        "risk_level": risk_level,
        "threshold": MODEL_THRESHOLD,
    }


def enrich_user_with_model_result(user: Dict[str, Any]) -> Dict[str, Any]:
    features = normalize_feature_dict(user.get("features", {}))
    prediction = predict_wallet(features)

    enriched = dict(user)
    enriched["features"] = features
    enriched["risk_score"] = prediction["score"]
    enriched["classification"] = prediction["classification"]
    enriched["model_label"] = prediction["label"]
    enriched["risk_level"] = prediction["risk_level"]
    enriched["model_threshold"] = prediction["threshold"]
    return enriched


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "model_loaded": True,
        "model_type": MODEL_METADATA.get("model_type", "Unknown"),
        "threshold": MODEL_THRESHOLD,
        "feature_count": len(MODEL_FEATURE_NAMES),
    }


@app.get("/api/users")
def get_all_users():
    cids = load_cid_list()
    users: List[Dict[str, Any]] = []

    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_cid = {executor.submit(fetch_user_from_ipfs, cid): cid for cid in cids}
        for future in as_completed(future_to_cid):
            user = future.result()
            if user:
                users.append(enrich_user_with_model_result(user))

    return {"users": users}


@app.get("/api/users/{search_id}")
def get_user_by_id_or_address(search_id: str):
    cids = load_cid_list()

    for cid in cids:
        user = fetch_user_from_ipfs(cid)
        if not user:
            continue

        user_id = str(user.get("user_id", "")).lower()
        target_address = str(user.get("target_address", "")).lower()
        needle = search_id.lower()

        if user_id == needle or target_address == needle:
            return enrich_user_with_model_result(user)

    raise HTTPException(status_code=404, detail="Wallet profile not found in registry")


@app.post("/api/simulate")
def simulate_transaction(payload: SimulateRequest):
    model_features = features_input_to_model_dict(payload.features)
    prediction = predict_wallet(model_features)

    new_user = {
        "user_id": payload.user_id,
        "target_address": payload.target_address,
        "classification": prediction["classification"],
        "risk_score": prediction["score"],
        "model_label": prediction["label"],
        "risk_level": prediction["risk_level"],
        "model_threshold": prediction["threshold"],
        "features": model_features,
    }

    cid = upload_to_ipfs(new_user)
    if not cid:
        raise HTTPException(status_code=500, detail="Failed to upload to IPFS")

    cids = load_cid_list()
    if cid not in cids:
        cids.insert(0, cid)
        save_cid_list(cids)

    new_user["ipfs_cid"] = cid
    return new_user