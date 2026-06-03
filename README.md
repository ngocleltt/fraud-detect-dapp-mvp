<h1 align="center">Welcome to ChainEye Forensics 👋</h1>
<p align="center">
  <img src="https://img.shields.io/badge/blockchain-AI%20Powered-blue" />
  <img src="https://img.shields.io/badge/version-1.0.0-blue" />
  <a href="https://github.com/ngocleltt/fraud-detect-dapp-mvp">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/ngocleltt/fraud-detect-dapp-mvp?style=social" target="_blank" />
  </a>
  <a href="https://github.com/YOUR_USERNAME/fraud-detect-dapp-mvp/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg" target="_blank" />
  </a>
  <img src="https://img.shields.io/badge/AI-XGBoost-orange" />
  <img src="https://img.shields.io/badge/backend-FastAPI-green" />
  <img src="https://img.shields.io/badge/frontend-Next.js-black" />
  <img src="https://img.shields.io/badge/storage-IPFS%2BPinata-purple" />
  <img src="https://img.shields.io/badge/contract-Solidity-363636" />
</p>

> An AI-powered DApp MVP for detecting suspicious behavior and anomalies in blockchain networks based on transaction analysis.

## ✨ Demo

ChainEye Forensics analyzes wallet transactions using an XGBoost model trained on 10 key features:

<p align="center">
  <img width="700" align="center" src="https://via.placeholder.com/700x400?text=ChainEye+Forensics+Demo" alt="demo"/>
</p>

## 🎯 10 Features for Fraud Detection

| # | Feature | Description |
|---|---------|-------------|
| 1 | `Total ERC20 tnxs` | Total number of ERC20 transactions |
| 2 | `ERC20 uniq rec contract addr` | Unique recipient contract addresses |
| 3 | `ERC20 uniq rec token name` | Unique token names received |
| 4 | `ERC20 uniq rec addr` | Unique recipient addresses |
| 5 | `Time Diff between first and last (Mins)` | Time span of activity in minutes |
| 6 | `total ether received` | Total ETH received |
| 7 | `Avg min between received tnx` | Average minutes between transactions |
| 8 | `avg val received` | Average transaction value received |
| 9 | `total transactions (including tnx to create contract)` | Total transactions including contract creation |
| 10 | `Unique Received From Addresses` | Number of unique senders |

## 🚀 Installation

### Prerequisites

- Node.js (v16+)
- Python 3.9+
- npm or yarn
- MetaMask or any Web3 wallet (for blockchain interaction)
- Pinata account (for IPFS storage)

### Clone the repository

```sh
git clone https://github.com/YOUR_USERNAME/fraud-detect-dapp-mvp.git
cd fraud-detect-dapp-mvp
```

### Backend Setup
```sh
cd backend
pip install fastapi uvicorn pandas numpy scikit-learn xgboost imbalanced-learn requests python-dotenv
```