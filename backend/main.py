import os
import json
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import List, Dict, Any
from concurrent.futures import ThreadPoolExecutor, as_completed

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
PINATA_JWT = os.getenv("PINATA_JWT")

class UserFeaturesInput(BaseModel):
    total_erc20_tnxs: int
    erc20_uniq_rec_contract_addr: int
    erc20_uniq_rec_token_name: int
    erc20_uniq_rec_addr: int
    time_diff_mins: int
    total_ether_received: float
    avg_min_between_rec: float
    avg_val_received: float
    total_transactions_incl_create: int
    unique_received_from_addresses: int

class SimulateRequest(BaseModel):
    user_id: str
    target_address: str
    features: UserFeaturesInput

# ---------- IPFS CID management ----------
def load_cid_list() -> List[str]:
    if not os.path.exists(CID_LIST_FILE):
        return []
    with open(CID_LIST_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_cid_list(cids: List[str]):
    with open(CID_LIST_FILE, "w", encoding="utf-8") as f:
        json.dump(cids, f, indent=2)

def fetch_user_from_ipfs(cid: str) -> Dict[str, Any]:
    gateway_url = f"https://blue-obedient-eagle-118.mypinata.cloud/ipfs/{cid}"
    try:
        response = requests.get(gateway_url, timeout=30)  
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        print(f"Error fetching {cid}: {e}")
    return None

# ---------- Pinata upload ----------
def upload_to_ipfs(json_data: dict):
    if not PINATA_JWT:
        print("❌ PINATA_JWT chưa được cấu hình trong .env")
        return None
        
    url = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
    headers = {
        "Authorization": f"Bearer {PINATA_JWT}",
        "Content-Type": "application/json"
    }
    payload = {
        "pinataOptions": {"cidVersion": 1},
        "pinataMetadata": {
            "name": f"AuditRecord_{json_data.get('target_address', 'Unknown')}.json"
        },
        "pinataContent": json_data
    }
    try:
        response = requests.post(url, json=payload, headers=headers)
        print(f"📡 Pinata response status: {response.status_code}")
        print(f"📄 Response body: {response.text}")
        if response.status_code == 200:
            cid = response.json()["IpfsHash"]
            print(f"✅ Upload successful! CID: {cid}")
            return cid
        else:
            print(f"❌ Upload failed. Status: {response.status_code}")
            return None
    except Exception as e:
        print(f"❌ Exception: {e}")
        return None

# ---------- Risk score ----------
def calculate_risk_score(features: UserFeaturesInput) -> float:
    score = 0.0
    if features.total_erc20_tnxs > 1000:
        score += 0.3
    elif features.total_erc20_tnxs > 500:
        score += 0.15
    if features.erc20_uniq_rec_contract_addr > 100:
        score += 0.2
    if features.erc20_uniq_rec_token_name > 80:
        score += 0.15
    if features.erc20_uniq_rec_addr > 500:
        score += 0.2
    if features.time_diff_mins < 1440:
        score += 0.2
    if features.avg_min_between_rec < 1.0:
        score += 0.2
    if features.total_ether_received < 0.1 and features.total_erc20_tnxs > 500:
        score += 0.25
    if features.avg_val_received < 0.00001:
        score += 0.15
    return min(score, 1.0)

# ---------- API Endpoints ----------
@app.get("/api/users")
def get_all_users():
    cids = load_cid_list()
    users = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_cid = {executor.submit(fetch_user_from_ipfs, cid): cid for cid in cids}
        for future in as_completed(future_to_cid):
            user = future.result()
            if user:
                users.append(user)
    return {"users": users}

@app.get("/api/users/{search_id}")
def get_user_by_id_or_address(search_id: str):
    cids = load_cid_list()
    for cid in cids:
        user = fetch_user_from_ipfs(cid)
        if user:
            if user["user_id"].lower() == search_id.lower() or user["target_address"].lower() == search_id.lower():
                return user
    raise HTTPException(status_code=404, detail="Wallet profile not found in registry")

@app.post("/api/simulate")
def simulate_transaction(payload: SimulateRequest):
    risk_score = calculate_risk_score(payload.features)
    classification = "suspicious" if risk_score > 0.4 else "safe"
    
    new_user = {
        "user_id": payload.user_id,
        "target_address": payload.target_address,
        "classification": classification,
        "risk_score": risk_score,
        "features": {
            "Total ERC20 tnxs": payload.features.total_erc20_tnxs,
            "ERC20 uniq rec contract addr": payload.features.erc20_uniq_rec_contract_addr,
            "ERC20 uniq rec token name": payload.features.erc20_uniq_rec_token_name,
            "ERC20 uniq rec addr": payload.features.erc20_uniq_rec_addr,
            "Time Diff between first and last (Mins)": payload.features.time_diff_mins,
            "total ether received": payload.features.total_ether_received,
            "Avg min between received tnx": payload.features.avg_min_between_rec,
            "avg val received": payload.features.avg_val_received,
            "total transactions (including tnx to create contract)": payload.features.total_transactions_incl_create,
            "Unique Received From Addresses": payload.features.unique_received_from_addresses
        }
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