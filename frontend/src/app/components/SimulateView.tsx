"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

export interface SimulateFormData {
  user_id: string;
  target_address: string;
  total_erc20_tnxs: number;
  erc20_uniq_rec_contract_addr: number;
  erc20_uniq_rec_token_name: number;
  erc20_uniq_rec_addr: number;
  time_diff_mins: number;
  total_ether_received: number;
  avg_min_between_rec: number;
  avg_val_received: number;
  total_transactions_incl_create: number;
  unique_received_from_addresses: number;
}

interface SimulateViewProps {
  onSimulate: (data: SimulateFormData) => void;
}

export default function SimulateView({ onSimulate }: SimulateViewProps) {
  const [formData, setFormData] = useState<SimulateFormData>({
    user_id: "",
    target_address: "",
    total_erc20_tnxs: 0,
    erc20_uniq_rec_contract_addr: 0,
    erc20_uniq_rec_token_name: 0,
    erc20_uniq_rec_addr: 0,
    time_diff_mins: 0,
    total_ether_received: 0,
    avg_min_between_rec: 0,
    avg_val_received: 0,
    total_transactions_incl_create: 0,
    unique_received_from_addresses: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof SimulateFormData;
    setFormData(prev => ({
      ...prev,
      [key]: key === "user_id" || key === "target_address" ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.user_id || !formData.target_address) return;
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
              <input type="text" name="user_id" value={formData.user_id} onChange={handleInputChange} placeholder="e.g., USR-0051" className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Wallet Address</label>
              <input type="text" name="target_address" value={formData.target_address} onChange={handleInputChange} placeholder="0x..." className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Total ERC20 Tx</label>
              <input type="number" name="total_erc20_tnxs" value={formData.total_erc20_tnxs} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Uniq Contract</label>
              <input type="number" name="erc20_uniq_rec_contract_addr" value={formData.erc20_uniq_rec_contract_addr} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Uniq Token</label>
              <input type="number" name="erc20_uniq_rec_token_name" value={formData.erc20_uniq_rec_token_name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Uniq Rec Addr</label>
              <input type="number" name="erc20_uniq_rec_addr" value={formData.erc20_uniq_rec_addr} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Time Diff (Mins)</label>
              <input type="number" name="time_diff_mins" value={formData.time_diff_mins} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">ETH Received</label>
              <input type="number" step="any" name="total_ether_received" value={formData.total_ether_received} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Avg Min / Rec</label>
              <input type="number" step="any" name="avg_min_between_rec" value={formData.avg_min_between_rec} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Avg Val (ETH)</label>
              <input type="number" step="any" name="avg_val_received" value={formData.avg_val_received} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Total Tx (incl create)</label>
              <input type="number" name="total_transactions_incl_create" value={formData.total_transactions_incl_create} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Uniq From Addrs</label>
              <input type="number" name="unique_received_from_addresses" value={formData.unique_received_from_addresses} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
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