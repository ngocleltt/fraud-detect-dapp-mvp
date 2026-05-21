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
  total_received: number;
  total_sent: number;
  num_transactions: number;
  avg_transaction_value: number;
  max_transaction_value: number;
  transaction_frequency: number;
  unique_counterparties: number;
  account_age_days: number;
  in_out_ratio: number;
  night_activity_ratio: number;
  known_risky_counterparty_ratio: number;
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

  const fetchUsersFromBackend = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
        setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: `REST // Fetched ${data.users?.length || 0} wallet records from server storage.` }]);
      }
    } catch (err) {
      setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "ERR // Backend node connection timeout." }]);
    }
  };

  useEffect(() => {
    fetchUsersFromBackend();
  }, []);

  const handleConnectWallet = () => {
    setWalletState({ isConnected: true, address: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE" });
    setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "WALLET // Connected via MetaMask account signature." }]);
  };

  const handleDisconnectWallet = () => {
    setWalletState({ isConnected: false, address: "" });
    setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "WALLET // Session detached by user authorization." }]);
  };

  const handleAuditSearch = async (id: string): Promise<UserRow | null> => {
    setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: `AUDIT // Contacting registry for node: [${id}]` }]);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "ERR // Registry fetch stream broken." }]);
    }
    return null;
  };

  const handleSimulateSubmit = async (rawFormData: any) => {
    const apiPayload = {
      user_id: rawFormData.user_id,
      target_address: rawFormData.target_address,
      features: {
        total_received: rawFormData.total_received,
        total_sent: rawFormData.total_sent,
        num_transactions: rawFormData.num_transactions,
        avg_transaction_value: rawFormData.avg_transaction_value,
        max_transaction_value: rawFormData.max_transaction_value,
        transaction_frequency: rawFormData.transaction_frequency,
        unique_counterparties: rawFormData.unique_counterparties,
        account_age_days: rawFormData.account_age_days,
        in_out_ratio: rawFormData.in_out_ratio,
        night_activity_ratio: rawFormData.night_activity_ratio,
        known_risky_counterparty_ratio: rawFormData.known_risky_counterparty_ratio
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
      }
    } catch (err) {
      setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "ERR // Simulation transmission collapsed." }]);
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