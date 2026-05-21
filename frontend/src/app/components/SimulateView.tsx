"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

interface SimulateViewProps {
  onSimulate: (data: any) => void;
}

export default function SimulateView({ onSimulate }: SimulateViewProps) {
  const [formData, setFormData] = useState({
    userId: "",
    walletAddress: "",
    totalErc20Txs: 0,
    erc20UniqRecContractAddr: 0,
    erc20UniqRecTokenName: 0,
    erc20UniqRecAddr: 0,
    timeDiffFirstLastMins: 0,
    totalEtherReceived: 0,
    avgMinBetweenReceivedTx: 0,
    avgValReceived: 0,
    totalTransactions: 0,
    uniqueReceivedFromAddrs: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "userId" || name === "walletAddress" ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId || !formData.walletAddress) return;
    onSimulate(formData);
  };

  return (
    <div className="animate-fadeIn max-w-2xl">
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <PlusCircle className="text-blue-600 w-5 h-5" />
          <h2 className="text-sm font-bold tracking-wider text-slate-700">SIMULATE REAL-TIME TRANSACTION</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">User ID</label>
              <input type="text" name="userId" value={formData.userId} onChange={handleInputChange} placeholder="e.g., User_03" className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Wallet Address</label>
              <input type="text" name="walletAddress" value={formData.walletAddress} onChange={handleInputChange} placeholder="0x..." className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div>
            <label className="block text-slate-500 mb-1 font-medium">Total ERC20 Transactions</label>
            <input type="number" name="totalErc20Txs" value={formData.totalErc20Txs} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Uniq Contract</label>
              <input type="number" name="erc20UniqRecContractAddr" value={formData.erc20UniqRecContractAddr} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Uniq Token</label>
              <input type="number" name="erc20UniqRecTokenName" value={formData.erc20UniqRecTokenName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Uniq RecAddr</label>
              <input type="number" name="erc20UniqRecAddr" value={formData.erc20UniqRecAddr} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Time Diff (Mins)</label>
              <input type="number" name="timeDiffFirstLastMins" value={formData.timeDiffFirstLastMins} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Total Ether Received</label>
              <input type="number" step="any" name="totalEtherReceived" value={formData.totalEtherReceived} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Avg Min Between Rec</label>
              <input type="number" step="any" name="avgMinBetweenReceivedTx" value={formData.avgMinBetweenReceivedTx} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Avg Val Received (ETH)</label>
              <input type="number" step="any" name="avgValReceived" value={formData.avgValReceived} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Total Transactions</label>
              <input type="number" name="totalTransactions" value={formData.totalTransactions} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Unique From Addrs</label>
              <input type="number" name="uniqueReceivedFromAddrs" value={formData.uniqueReceivedFromAddrs} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <button type="submit" className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 rounded text-sm transition-all shadow-md shadow-blue-500/10">
            Push Transaction Flow
          </button>
        </form>
      </section>
    </div>
  );
}