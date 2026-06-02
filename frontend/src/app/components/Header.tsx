"use client";

import { useState } from "react";
import { ShieldAlert, Wallet, Radio, Cpu, LogOut } from "lucide-react";

interface HeaderProps {
  isConnected: boolean;
  walletAddress: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function Header({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
}: HeaderProps) {
  const [showModal, setShowModal] = useState(false);

  const handleConnectWallet = () => {
    setShowModal(false);
    onConnect();
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
              <ShieldAlert className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold tracking-wide text-slate-900 md:text-xl">
                CHAINEYE FORENSICS
              </h1>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-slate-400">
                ON-CHAIN ANOMALY DETECTION ENGINE
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              <Radio className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-600/80">Network:</span>
              <span className="font-semibold">Ganache Localnet</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700">
              <Cpu className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-blue-600/80">AI Model:</span>
              <span className="font-semibold">XGBoost</span>
            </div>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-mono">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>

              <button
                onClick={onDisconnect}
                className="rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Web3 access
                </p>
                <h3 className="text-base font-bold text-slate-900">
                  Select wallet provider
                </h3>
              </div>
            </div>

            <p className="mb-4 text-sm leading-6 text-slate-500">
              Connect your decentralised identity wallet to enable account
              audit and smart contract interaction features.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleConnectWallet}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:bg-slate-50"
              >
                <span className="text-sm font-semibold text-slate-700">
                  MetaMask Wallet
                </span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                  Detected
                </span>
              </button>

              <button
                disabled
                className="flex w-full cursor-not-allowed items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 opacity-60"
              >
                <span className="text-sm font-semibold text-slate-400">
                  WalletConnect
                </span>
                <span className="text-[10px] text-slate-400">Unavailable</span>
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 text-center text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}