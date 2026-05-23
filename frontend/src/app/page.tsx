"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, Search, PlusCircle, HelpCircle } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OverviewView from "./components/OverviewView";
import AuditView from "./components/AuditView";
import SimulateView from "./components/SimulateView";
import HowItWorksView from "./components/HowItWorksView";

interface UserFeatures {
  "Total ERC20 tnxs": number;
  "ERC20 uniq rec contract addr": number;
  "ERC20 uniq rec token name": number;
  "ERC20 uniq rec addr": number;
  "Time Diff between first and last (Mins)": number;
  "total ether received": number;
  "Avg min between received tnx": number;
  "avg val received": number;
  "total transactions (including tnx to create contract)": number;
  "Unique Received From Addresses": number;
}

interface UserRow {
  user_id: string;
  target_address: string;
  night_activity: number;
  risky_interact: number;
  risk_score: number;
  classification: "safe" | "suspicious";
  features: UserFeatures;
}

interface LogEntry {
  timestamp: string;
  message: string;
}

export default function Home() {
  const [currentMenu, setCurrentMenu] = useState("overview");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "SAFE" | "SUSPICIOUS">("ALL");
  const [walletState, setWalletState] = useState({ isConnected: false, address: "" });
  const [users, setUsers] = useState<UserRow[]>([]);

  const [terminalLogs, setTerminalLogs] = useState<LogEntry[]>([
    { timestamp: "00:00:01", message: "SYS // ChainEye Forensics Engine initialised successfully." },
    { timestamp: "00:00:02", message: "IPFS // Connection verified. CID record buffer loaded." },
    { timestamp: "00:00:03", message: "AI // Logistic Regression model weights online." }
  ]);

  const getCurrentTimeString = () => {
    return new Date().toLocaleTimeString();
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || []);
          setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: `REST // Fetched ${data.users?.length || 0} wallet records from server storage.` }]);
        }
      } catch (error) {
        setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "ERR // Backend node connection timeout." }]);
        console.error(error);
      }
    };
    loadUsers();
  }, []);

  const handleConnectWallet = () => {
    setWalletState({ isConnected: true, address: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE" });
    setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "WALLET // Connected via MetaMask account signature." }]);
  };

  const handleDisconnectWallet = () => {
    setWalletState({ isConnected: false, address: "" });
    setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "WALLET // Session detached by user authorization." }]);
  };

  const handleAuditSearch = async (id: string): Promise<{ userId: string; walletAddress: string; riskScore: number; status: "SAFE" | "SUSPICIOUS" } | null> => {
    setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: `AUDIT // Contacting registry for node: [${id}]` }]);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/${encodeURIComponent(id)}`);
      if (res.ok) {
        const data = await res.json();
        const mappedResult = {
          userId: data.user_id,
          walletAddress: data.target_address,
          riskScore: Math.round(data.risk_score * 100),
          status: (data.classification === "suspicious" ? "SUSPICIOUS" : "SAFE") as "SAFE" | "SUSPICIOUS",
        };
        setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: `AUDIT // Account found: ${mappedResult.userId}, status ${mappedResult.status}.` }]);
        return mappedResult;
      }
      if (res.status === 404) {
        setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: `AUDIT // Registry lookup failed for node: [${id}]` }]);
      }
    } catch (error) {
      setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "ERR // Registry fetch stream broken." }]);
      console.error(error);
    }
    return null;
  };

  interface SimulateFormData {
    user_id: string;
    target_address: string;
    total_erc20_tnxs: number;
    erc20_uniq_rec_contract_addr: number;
    erc20_uniq_rec_token_name: number;
    erc20_uniq_rec_addr: number;
    time_diff_mins: number;
    total_ether_received: number;
    avg_min_between_rec: number;
    avg_val_received: number;
    total_transactions_incl_create: number;
    unique_received_from_addresses: number;
  }

  const handleSimulateSubmit = async (rawFormData: SimulateFormData) => {
    const apiPayload = {
      user_id: rawFormData.user_id,
      target_address: rawFormData.target_address,
      features: {
        "Total ERC20 tnxs": rawFormData.total_erc20_tnxs,
        "ERC20 uniq rec contract addr": rawFormData.erc20_uniq_rec_contract_addr,
        "ERC20 uniq rec token name": rawFormData.erc20_uniq_rec_token_name,
        "ERC20 uniq rec addr": rawFormData.erc20_uniq_rec_addr,
        "Time Diff between first and last (Mins)": rawFormData.time_diff_mins,
        "total ether received": rawFormData.total_ether_received,
        "Avg min between received tnx": rawFormData.avg_min_between_rec,
        "avg val received": rawFormData.avg_val_received,
        "total transactions (including tnx to create contract)": rawFormData.total_transactions_incl_create,
        "Unique Received From Addresses": rawFormData.unique_received_from_addresses
      }
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload)
      });
      if (res.ok) {
        const freshUser = await res.json();
        setUsers(prev => [freshUser, ...prev]);
        setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: `SIM // Network entry approved. Label: ${freshUser.classification.toUpperCase()}` }]);
        setCurrentMenu("overview");
        return;
      }
      setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: `ERR // Simulation failed with status ${res.status}.` }]);
    } catch (error) {
      setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "ERR // Simulation transmission collapsed." }]);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      <Header isConnected={walletState.isConnected} walletAddress={walletState.address} onConnect={handleConnectWallet} onDisconnect={handleDisconnectWallet} />
      <div className="flex flex-1">
        <aside className="w-64 border-r border-slate-200 p-4 space-y-1 bg-white">
          <div className="text-[10px] font-bold text-slate-400 tracking-widest px-3 mb-3">NAVIGATION</div>
          <button onClick={() => setCurrentMenu("overview")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${currentMenu === "overview" ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
            <LayoutDashboard className="w-4 h-4" /> Dashboard Overview
          </button>
          <button onClick={() => setCurrentMenu("audit")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${currentMenu === "audit" ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
            <Search className="w-4 h-4" /> Account Audit
          </button>
          <button onClick={() => setCurrentMenu("simulate")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${currentMenu === "simulate" ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
            <PlusCircle className="w-4 h-4" /> Simulate Transaction
          </button>
          <button onClick={() => setCurrentMenu("how-it-works")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${currentMenu === "how-it-works" ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
            <HelpCircle className="w-4 h-4" /> How It Works
          </button>
        </aside>
        <main className="flex-1 p-6 overflow-hidden flex flex-col gap-6">
          {currentMenu === "overview" && <OverviewView users={users} filterStatus={filterStatus} setFilterStatus={setFilterStatus} terminalLogs={terminalLogs} />}
          {currentMenu === "audit" && <AuditView onSearch={handleAuditSearch} />}
          {currentMenu === "simulate" && <SimulateView onSimulate={handleSimulateSubmit} />}
          {currentMenu === "how-it-works" && <HowItWorksView />}
        </main>
      </div>
      <Footer />
    </div>
  );
}