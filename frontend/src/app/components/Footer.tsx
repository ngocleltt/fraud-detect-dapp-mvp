"use client";

import { Terminal, Server, Cpu, CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white p-4 text-xs text-slate-500 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
        
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Server className="w-3.5 h-3.5 text-blue-500" />
            <span>RPC Node:</span>
            <span className="text-slate-800 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">127.0.0.1:8545</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Ping: 1ms</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 text-center md:order-2">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <Terminal className="w-3.5 h-3.5 text-indigo-500" />
            <span>© 2026 ChainEye Forensics Lab.</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <span>Powered by</span>
            <span className="font-semibold text-slate-500">Next.js</span>
            <span>•</span>
            <span className="font-semibold text-slate-500">Solidity</span>
            <span>•</span>
            <span className="font-semibold text-slate-500">FastAPI</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] md:order-3">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Cpu className="w-3.5 h-3.5 text-indigo-500" />
            <span>Registry Registry Contract:</span>
            <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-bold">0x9B1c...E443</span>
          </div>
          <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
            <CheckCircle2 className="w-3 h-3" />
            DEPLOYED
          </span>
        </div>

      </div>
    </footer>
  );
}