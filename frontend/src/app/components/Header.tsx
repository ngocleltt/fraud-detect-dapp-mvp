"use client";

import { useState } from "react";
import { ShieldAlert, Wallet, Radio, Cpu, LogOut } from "lucide-react";

interface HeaderProps {
  isConnected: boolean;
  walletAddress: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function Header({ isConnected, walletAddress, onConnect, onDisconnect }: HeaderProps) {
  const [showModal, setShowModal] = useState(false);

  const handleConnectWallet = () => {
    setShowModal(false);
    onConnect();
  };

  return (
    <>
      <header className="border-b border-slate-200 p-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-blue-600 w-8 h-8 animate-pulse" />
          <div>
            <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CHAINEYE FORENSICS</h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest">ON-CHAIN ANOMALY DETECTION ENGINE</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            <Radio className="w-3.5 h-3.5 animate-ping text-emerald-500" />
            <span>Network: Ganache Localnet</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            <span>AI Model: Logistic Regression v1.0.2</span>
          </div>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg text-xs font-mono font-semibold text-slate-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
            <button onClick={onDisconnect} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow-md shadow-blue-500/10">
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </button>
        )}
      </header>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xl max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="text-blue-600 w-6 h-6" />
              <h3 className="text-base font-bold text-slate-800">Select Web3 Provider</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Connect your decentralised identity wallet securely to initialise individual audit and smart contract functionalities.</p>
            <div className="space-y-2">
              <button onClick={handleConnectWallet} className="w-full flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group">
                <span className="text-xs font-semibold text-slate-700">MetaMask Wallet</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">Detected</span>
              </button>
              <button disabled className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-lg opacity-50 cursor-not-allowed">
                <span className="text-xs font-semibold text-slate-400">WalletConnect</span>
                <span className="text-[10px] text-slate-400">Unavailable</span>
              </button>
            </div>
            <button onClick={() => setShowModal(false)} className="w-full mt-4 text-center text-xs text-slate-400 hover:text-slate-600 font-medium py-1">
              Cancel Connection
            </button>
          </div>
        </div>
      )}
    </>
  );
}