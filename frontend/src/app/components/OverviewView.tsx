"use client";

import { Eye, AlertTriangle, Server, Activity } from "lucide-react";

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
  risk_score: number;
  classification: "safe" | "suspicious";
  features: UserFeatures;
}

interface LogEntry {
  timestamp: string;
  message: string;
}

interface OverviewViewProps {
  users: UserRow[];
  filterStatus: "ALL" | "SAFE" | "SUSPICIOUS";
  setFilterStatus: (status: "ALL" | "SAFE" | "SUSPICIOUS") => void;
  terminalLogs: LogEntry[];
}

export default function OverviewView({ users, filterStatus, setFilterStatus, terminalLogs }: OverviewViewProps) {
  const filteredUsers = users.filter(user => {
    if (filterStatus === "ALL") return true;
    if (filterStatus === "SAFE") return user.classification === "safe";
    return user.classification === "suspicious";
  });

  const suspiciousCount = users.filter(u => u.classification === "suspicious").length;
  const fraudRate = users.length > 0 ? ((suspiciousCount / users.length) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6 animate-fadeIn flex flex-col flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Evaluated Wallets</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{users.length} Records</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Eye className="w-5 h-5" /></div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Anomalous Anomaly Rate</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">{fraudRate}%</p>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg"><AlertTriangle className="w-5 h-5" /></div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">System Storage Fabric</p>
            <p className="text-sm font-bold text-slate-700 mt-2">IPFS Decentralised CID</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><Server className="w-5 h-5" /></div>
        </div>
      </div>

      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="text-blue-600 w-5 h-5" />
            <h2 className="text-sm font-bold tracking-wider text-slate-700">PRE-EVALUATED CONTRACT DATASET (BATCH MODE)</h2>
          </div>
          <div className="flex border border-slate-200 rounded-lg p-0.5 bg-slate-50 self-start">
            {(["ALL", "SAFE", "SUSPICIOUS"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-colors ${filterStatus === status ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/70">
                <th className="p-3">User ID</th>
                <th className="p-3">Total ERC20 Tx</th>
                <th className="p-3">Uniq Contract</th>
                <th className="p-3">Uniq Token</th>
                <th className="p-3">Uniq Rec Addr</th>
                <th className="p-3">Time Diff (Mins)</th>
                <th className="p-3">ETH Received</th>
                <th className="p-3">Avg Min / Rec</th>
                <th className="p-3">Avg Val (ETH)</th>
                <th className="p-3">Total Tx (incl create)</th>
                <th className="p-3">Uniq From Addrs</th>
                <th className="p-3 text-right">Risk Score</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors font-mono text-slate-600">
                  <td className="p-3 text-blue-600 font-sans font-semibold">{user.user_id}</td>
                  <td className="p-3">{user.features["Total ERC20 tnxs"]}</td>
                  <td className="p-3">{user.features["ERC20 uniq rec contract addr"]}</td>
                  <td className="p-3">{user.features["ERC20 uniq rec token name"]}</td>
                  <td className="p-3">{user.features["ERC20 uniq rec addr"]}</td>
                  <td className="p-3">{user.features["Time Diff between first and last (Mins)"]}</td>
                  <td className="p-3">{user.features["total ether received"]}</td>
                  <td className="p-3">{user.features["Avg min between received tnx"]}</td>
                  <td className="p-3">{user.features["avg val received"].toFixed(6)}</td>
                  <td className="p-3">{user.features["total transactions (including tnx to create contract)"]}</td>
                  <td className="p-3">{user.features["Unique Received From Addresses"]}</td>
                  <td className={`p-3 text-right font-bold ${user.classification === "suspicious" ? "text-rose-600" : "text-emerald-600"}`}>{(user.risk_score * 100).toFixed(0)}%</td>
                  <td className="p-3 text-center">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${user.classification === "suspicious" ? "bg-rose-50 text-rose-600 border border-rose-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
                      {user.classification.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-slate-900 text-slate-400 p-4 rounded-xl font-mono text-[11px] shadow-sm border border-slate-800">
        <div className="flex items-center gap-2 mb-2 border-b border-slate-800 pb-2 text-slate-500 font-sans font-bold tracking-widest">
          <Activity className="w-3.5 h-3.5 text-blue-500" /> LIVE FORENSIC TELEMETRY STREAM
        </div>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {terminalLogs.map((log, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-slate-600">[{log.timestamp}]</span>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}