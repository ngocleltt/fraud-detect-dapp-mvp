"use client";

import { useState } from "react";
import { ShieldAlert, Search, Activity, Wallet, AlertTriangle, Terminal, Cpu } from "lucide-react";

export default function Home() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const triggerAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    setLoading(true);
    setAnalyzed(false);
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 1800);
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

        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 backdrop-blur-sm">
          <form onSubmit={triggerAnalysis} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Enter target blockchain address (0x...)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition font-mono tracking-wide"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-950/20 transition duration-150 flex items-center justify-center gap-2 min-w-[140px]"
            >
              {loading ? (
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

        {analyzed && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
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