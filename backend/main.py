import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="ChainEye Forensics Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "dataset.json")

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

def load_dataset():
    if not os.path.exists(DATASET_PATH):
        return {"metadata": {}, "users": []}
    with open(DATASET_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def save_dataset(data):
    with open(DATASET_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

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



@app.get("/api/users")
def get_all_users():
    return load_dataset()

@app.get("/api/users/{search_id}")
def get_user_by_id_or_address(search_id: str):
    data = load_dataset()
    for user in data.get("users", []):
        if user["user_id"].lower() == search_id.lower() or user["target_address"].lower() == search_id.lower():
            return user
    raise HTTPException(status_code=404, detail="Wallet profile not found in registry")

@app.post("/api/simulate")
def simulate_transaction(payload: SimulateRequest):
    data = load_dataset()
    
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
    data["users"].insert(0, new_user)
    if "metadata" in data and "total_records" in data["metadata"]:
        data["metadata"]["total_records"] = len(data["users"])
        
    save_dataset(data)
    return new_user