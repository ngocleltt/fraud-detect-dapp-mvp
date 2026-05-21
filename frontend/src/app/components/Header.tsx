"use client";

import { ShieldAlert, Wallet } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-slate-200 p-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <ShieldAlert className="text-blue-600 w-8 h-8 animate-pulse" />
        <div>
          <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CHAINEYE FORENSICS</h1>
          <p className="text-[10px] text-slate-400 font-medium tracking-widest">ON-CHAIN ANOMALY DETECTION ENGINE</p>
        </div>
      </div>
      <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow-md shadow-blue-500/10">
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </button>
    </header>
  );
}