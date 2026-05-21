"use client";

import { useState } from "react";
import { LayoutDashboard, Search, PlusCircle, HelpCircle } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OverviewView from "./components/OverviewView";
import AuditView from "./components/AuditView";
import SimulateView from "./components/SimulateView";
import HowItWorksView from "./components/HowItWorksView";

interface UserRow {
  userId: string;
  walletAddress: string;
  totalErc20Txs: number;
  erc20UniqRecContractAddr: number;
  erc20UniqRecTokenName: number;
  erc20UniqRecAddr: number;
  timeDiffFirstLastMins: number;
  totalEtherReceived: number;
  avgMinBetweenReceivedTx: number;
  avgValReceived: number;
  totalTransactions: number;
  uniqueReceivedFromAddrs: number;
  riskScore: number;
  status: "SAFE" | "SUSPICIOUS";
}

interface LogEntry {
  timestamp: string;
  message: string;
}

export default function Home() {
  const [currentMenu, setCurrentMenu] = useState("overview");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "SAFE" | "SUSPICIOUS">("ALL");
  const [walletState, setWalletState] = useState({ isConnected: false, address: "" });

  const [terminalLogs, setTerminalLogs] = useState<LogEntry[]>([
    { timestamp: "00:00:01", message: "SYS // ChainEye Forensics Engine initialised successfully." },
    { timestamp: "00:00:02", message: "IPFS // Connection verified. CID record buffer loaded." },
    { timestamp: "00:00:03", message: "AI // Logistic Regression model binary weights online." }
  ]);

  const [users, setUsers] = useState<UserRow[]>([
    {
      userId: "User_01",
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      totalErc20Txs: 45,
      erc20UniqRecContractAddr: 12,
      erc20UniqRecTokenName: 8,
      erc20UniqRecAddr: 15,
      timeDiffFirstLastMins: 14400,
      totalEtherReceived: 25.45,
      avgMinBetweenReceivedTx: 320.5,
      avgValReceived: 1.25,
      totalTransactions: 60,
      uniqueReceivedFromAddrs: 18,
      riskScore: 12.5,
      status: "SAFE"
    },
    {
      userId: "User_02",
      walletAddress: "0x3194c23C31ec41B72dcECB7A7079207e37E74C4B",
      totalErc20Txs: 850,
      erc20UniqRecContractAddr: 1,
      erc20UniqRecTokenName: 1,
      erc20UniqRecAddr: 1,
      timeDiffFirstLastMins: 120,
      totalEtherReceived: 1500.0,
      avgMinBetweenReceivedTx: 0.45,
      avgValReceived: 150.0,
      totalTransactions: 900,
      uniqueReceivedFromAddrs: 1,
      riskScore: 94.82,
      status: "SUSPICIOUS"
    }
  ]);

  const getCurrentTimeString = () => {
    return new Date().toLocaleTimeString();
  };

  const handleConnectWallet = () => {
    setWalletState({ isConnected: true, address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" });
    setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "WALLET // Connected via Account identity 0x742d...f44e" }]);
  };

  const handleDisconnectWallet = () => {
    setWalletState({ isConnected: false, address: "" });
    setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: "WALLET // Session detached by user authorization." }]);
  };

  const handleAuditSearch = (id: string) => {
    setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: `AUDIT // Queried target target data buffer for identity: [${id}]` }]);
    return users.find(u => u.userId.toLowerCase() === id.toLowerCase() || u.walletAddress.toLowerCase() === id.toLowerCase()) || null;
  };

  const handleSimulateSubmit = (formData: any) => {
    const calculatedRisk = formData.avgMinBetweenReceivedTx < 5 && formData.avgValReceived > 50 ? 89.5 : 15.4;
    const determinedStatus = calculatedRisk > 50 ? "SUSPICIOUS" : "SAFE";

    const newUser: UserRow = { ...formData, riskScore: calculatedRisk, status: determinedStatus };
    setUsers(prev => [newUser, ...prev]);
    setTerminalLogs(prev => [...prev, { timestamp: getCurrentTimeString(), message: `SIM // Registered execution stream for ${formData.userId}. Risk computation: ${calculatedRisk}%` }]);
    setCurrentMenu("overview");
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