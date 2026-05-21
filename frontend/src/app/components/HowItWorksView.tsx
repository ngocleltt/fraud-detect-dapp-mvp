"use client";

import { Shield } from "lucide-react";

export default function HowItWorksView() {
  return (
    <div className="animate-fadeIn max-w-3xl space-y-6">
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="text-blue-600 w-5 h-5" />
          <h2 className="text-sm font-bold tracking-wider text-slate-700">CHAINEYE CORE ARCHITECTURE SPECIFICATION</h2>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-6">
          ChainEye Forensics utilizes a hybrid off-chain processing architecture optimized with Ethereum smart contract verification layers to reliably predict and register transaction security anomalies.
        </p>
        <div className="space-y-4">
          <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">1</div>
            <div>
              <h3 className="text-xs font-bold text-slate-700 mb-1">Feature Extraction Array</h3>
              <p className="text-xs text-slate-500 leading-relaxed">The engine continuously maps 10 mathematical transaction attributes derived directly from Ethereum Fraud Detection paradigms.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">2</div>
            <div>
              <h3 className="text-xs font-bold text-slate-700 mb-1">Off-Chain Logistic Inference</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Incoming streaming logs are fed down to a standalone Python FastAPI system evaluating dataset entries against trained Logistic Regression matrices.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="bg-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">3</div>
            <div>
              <h3 className="text-xs font-bold text-slate-700 mb-1">On-Chain CID Data Cryptography</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Evaluated batches are packaged into formal JSON profiles hosted decentralized on IPFS networks. The unique storage CID hashes are safely anchored inside immutable Ethereum Smart Contracts.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}