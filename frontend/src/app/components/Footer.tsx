"use client";

import { Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 p-4 bg-white text-center text-xs text-slate-500 mt-auto flex items-center justify-center gap-2 font-mono shadow-inner">
      <Terminal className="w-4 h-4 text-blue-500" />
      <span>© 2026 ChainEye Forensics Lab. Hybrid Decentralised Storage Topology via IPFS & Smart Contracts.</span>
    </footer>
  );
}