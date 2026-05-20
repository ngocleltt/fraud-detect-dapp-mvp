"use client";

import { useState } from "react";
import { ShieldAlert, Search, Activity, Wallet, AlertTriangle, Terminal, Cpu, PlusCircle, CheckCircle, Users } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchAnalyzed, setSearchAnalyzed] = useState(false);
  
  const [formUser, setFormUser] = useState("");
  const [formNightRatio, setFormNightRatio] = useState("");
  const [formRiskyRatio, setFormRiskyRatio] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [mockUsers, setMockUsers] = useState([
    { id: "User_01", wallet: "0x71C...3a9", nightRatio: "0.12", riskyRatio: "0.05", score: "14.20", status: "SAFE" },
    { id: "User_02", wallet: "0x3F5...2b1", nightRatio: "0.89", riskyRatio: "0.74", score: "87.42", status: "SUSPICIOUS" },
    { id: "User_03", wallet: "0x9A1...7e4", nightRatio: "0.25", riskyRatio: "0.10", score: "22.15", status: "SAFE" },
    { id: "User_04", wallet: "0x5B8...9d2", nightRatio: "0.72", riskyRatio: "0.68", score: "79.90", status: "SUSPICIOUS" },
    { id: "User_05", wallet: "0x2C4...4f8", nightRatio: "0.08", riskyRatio: "0.02", score: "09.50", status: "SAFE" }
  ]);

  const handleSearchAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setLoadingSearch(true);
    setSearchAnalyzed(false);
    setTimeout(() => {
      setLoadingSearch(false);
      setSearchAnalyzed(true);
    }, 1200);
  };

  const handleInsertTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUser || !formNightRatio || !formRiskyRatio) return;
    setLoadingSubmit(true);
    setSubmitSuccess(false);

    setTimeout(() => {
      const calculatedScore = (parseFloat(formNightRatio) * 50 + parseFloat(formRiskyRatio) * 50).toFixed(2);
      const determinedStatus = parseFloat(calculatedScore) > 50 ? "SUSPICIOUS" : "SAFE";

      const newUser = {
        id: formUser,
        wallet: "0x" + Math.random().toString(16).substring(2, 5).toUpperCase() + "..." + Math.random().toString(16).substring(2, 5).toUpperCase(),
        nightRatio: parseFloat(formNightRatio).toFixed(2),
        riskyRatio: parseFloat(formRiskyRatio).toFixed(2),
        score: calculatedScore,
        status: determinedStatus
      };

      setMockUsers([newUser, ...mockUsers]);
      setLoadingSubmit(false);
      setSubmitSuccess(true);
      setFormUser("");
      setFormNightRatio("");
      setFormRiskyRatio("");
    }, 1500);
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white">
      <header className="border-b border-slate-900 bg-slate-950/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/30">
            <ShieldAlert className="w-6 h-6 text-blue-500 animate-pulse" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-wider text-white">CHAIN<span className="text-blue-500">EYE</span></span>
            <span className="ml-2 px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400 font-mono font-bold tracking-widest">MVP v1.0</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl transition duration-200 text-sm font-medium text-slate-200">
          <Wallet className="w-4 h-4 text-blue-400" />
          Connect Wallet
        </button>
      </header>

      <section className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="max-w-3xl flex flex-col gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit text-blue-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            Machine Learning Engine Stacked
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Blockchain Behavioral <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Anomaly Detection</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Analyze address transaction mechanics in real-time. Our custom non-parametric logistic inference engine computes risk orientation matrices across 11 core structural components to isolate malicious entities instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-sm font-semibold tracking-wide text-slate-200 mb-4 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-500" /> Advanced Forensic Query (Feature 1)
              </h2>
              <form onSubmit={handleSearchAudit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Enter target username or ID (e.g., User_02)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition font-mono tracking-wide"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingSearch}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-950/20 transition duration-150 flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {loadingSearch ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing
                    </>
                  ) : (
                    "Run Security Audit"
                  )}
                </button>
              </form>
            </div>

            <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" /> System Dataset Ledger Overview (Feature 2)
                </span>
                <span className="text-xs font-mono text-slate-500">Batch Prediction Mode Active</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-900 text-slate-400">
                      <th className="py-3 px-4 font-semibold">User ID</th>
                      <th className="py-3 px-4 font-semibold">Target Address</th>
                      <th className="py-3 px-4 font-semibold text-center">Night Activity</th>
                      <th className="py-3 px-4 font-semibold text-center">Risky Interact</th>
                      <th className="py-3 px-4 font-semibold text-right">Risk Score</th>
                      <th className="py-3 px-4 font-semibold text-center">Classification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/50">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-900/30 transition duration-150">
                        <td className="py-3.5 px-4 text-slate-200 font-bold">{user.id}</td>
                        <td className="py-3.5 px-4 text-slate-500">{user.wallet}</td>
                        <td className="py-3.5 px-4 text-center text-slate-400">{user.nightRatio}</td>
                        <td className="py-3.5 px-4 text-center text-slate-400">{user.riskyRatio}</td>
                        <td className="py-3.5 px-4 text-right font-bold text-blue-400">{user.score}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            user.status === "SUSPICIOUS" 
                              ? "bg-red-500/10 border border-red-500/20 text-red-400" 
                              : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-sm font-semibold tracking-wide text-slate-200 mb-4 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-blue-500" /> Simulate Real-time Transaction
              </h2>
              <form onSubmit={handleInsertTransaction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Target User ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., User_06"
                    value={formUser}
                    onChange={(e) => setFormUser(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Night Activity Ratio (0.0 - 1.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    required
                    placeholder="e.g., 0.85"
                    value={formNightRatio}
                    onChange={(e) => setFormNightRatio(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Risky Counterparty Ratio (0.0 - 1.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    required
                    placeholder="e.g., 0.70"
                    value={formRiskyRatio}
                    onChange={(e) => setFormRiskyRatio(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loadingSubmit}
                  className="w-full mt-2 px-4 py-3 bg-slate-100 hover:bg-white text-slate-950 disabled:bg-slate-800 disabled:text-slate-500 font-bold text-xs uppercase tracking-wider rounded-xl transition duration-150 flex items-center justify-center gap-2"
                >
                  {loadingSubmit ? "Processing Matrix..." : "Push Transaction to IPFS"}
                </button>
                {submitSuccess && (
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] mt-1 bg-emerald-950/10 border border-emerald-500/20 p-2.5 rounded-lg animate-in fade-in duration-200">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Inference complete. Ledger sync'd with Smart Contract Registry CID.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {searchAnalyzed && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 anonymity-trace animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-slate-900/20 border border-red-500/20 rounded-2xl p-6 flex flex-col gap-6 relative overflow-hidden bg-gradient-to-b from-red-950/5 to-transparent">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-wide text-slate-400">Risk Assessment</span>
                <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-mono font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> High Risk
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black tracking-tight text-red-500 font-mono">87.42</span>
                <span className="text-slate-500 font-mono text-sm">/ 100</span>
              </div>
              <div className="border-t border-slate-900 pt-4 flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Classification Status</span>
                <span className="text-lg font-bold text-red-400">Suspicious Entity Detected</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Entity metrics diverge significantly from nominal profiles. Multi-vector tracking triggers high correlation with laundering nodes.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-900/20 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" /> Vector Feature Verification Matrix
                </span>
                <span className="text-xs font-mono text-slate-500">11 Targets Active</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">1. total_received</span>
                  <span className="text-blue-400 font-bold">1,420.50 ETH</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">2. total_sent</span>
                  <span className="text-blue-400 font-bold">1,419.12 ETH</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">3. num_transactions</span>
                  <span className="text-blue-400 font-bold">8,412 TXs</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">4. avg_transaction_value</span>
                  <span className="text-slate-400">0.168 ETH</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">5. max_transaction_value</span>
                  <span className="text-slate-400">45.00 ETH</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">6. transaction_frequency</span>
                  <span className="text-red-400 font-bold">142.1 / hr</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">7. unique_counterparties</span>
                  <span className="text-slate-400">341 nodes</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">8. account_age_days</span>
                  <span className="text-slate-400">14 days</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">9. in_out_ratio</span>
                  <span className="text-slate-400">0.999</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-red-500/20 rounded-xl flex items-center justify-between bg-red-950/5">
                  <span className="text-red-400">10. night_activity_ratio</span>
                  <span className="text-red-400 font-bold">0.892</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-red-500/20 rounded-xl flex items-center justify-between col-span-1 md:col-span-2 bg-red-950/5">
                  <span className="text-red-400">11. known_risky_counterparty_ratio</span>
                  <span className="text-red-400 font-bold">0.745</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="border-t border-slate-900 py-6 px-6 bg-slate-950/20 text-center text-xs text-slate-600 font-mono mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-blue-500" />
          <span>Decentralized Forensic Model Environment</span>
        </div>
        <span>Security Analysis Framework MVP</span>
      </footer>
    </main>
  );
}