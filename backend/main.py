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
    total_received: float
    total_sent: float
    num_transactions: int
    avg_transaction_value: float
    max_transaction_value: float
    transaction_frequency: float
    unique_counterparties: int
    account_age_days: int
    in_out_ratio: float
    night_activity_ratio: float
    known_risky_counterparty_ratio: float

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
    
    score = 0.14
    if payload.features.night_activity_ratio > 0.5 and payload.features.known_risky_counterparty_ratio > 0.4:
        score = 0.92
        
    classification = "suspicious" if score > 0.5 else "safe"
    
    new_user = {
        "user_id": payload.user_id,
        "target_address": payload.target_address,
        "night_activity": payload.features.night_activity_ratio,
        "risky_interact": payload.features.known_risky_counterparty_ratio,
        "risk_score": score,
        "classification": classification,
        "features": payload.features.dict()
    }
    
    data["users"].insert(0, new_user)
    if "metadata" in data and "total_records" in data["metadata"]:
        data["metadata"]["total_records"] = len(data["users"])
        
    save_dataset(data)
    return new_user