"use client";

import { Terminal, Server, Cpu, CheckCircle2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Terminal className="h-3.5 w-3.5 text-indigo-500" />
            <span className="font-medium">© 2026 ChainEye Forensics Lab</span>
          </div>

          <div className="flex flex-wrap items-center gap-1 text-[10px] text-slate-400">
            <span>Powered by</span>
            <span className="font-semibold text-slate-500">Next.js</span>
            <span>•</span>
            <span className="font-semibold text-slate-500">Solidity</span>
            <span>•</span>
            <span className="font-semibold text-slate-500">FastAPI</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600">
            <Server className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-slate-400">RPC</span>
            <span className="font-semibold text-slate-700">127.0.0.1:8545</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-600">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-semibold">Ping: 1ms</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600">
            <Cpu className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-slate-400">Registry</span>
            <span className="font-bold text-slate-700">0x9B1c...E443</span>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
            <CheckCircle2 className="h-3 w-3" />
            DEPLOYED
          </span>
        </div>
      </div>
    </footer>
  );
}