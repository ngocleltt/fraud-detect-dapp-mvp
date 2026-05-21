"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

export interface SimulateFormData {
  user_id: string;
  target_address: string;
  total_received: number;
  total_sent: number;
  num_transactions: number;
  avg_transaction_value: number;
  max_transaction_value: number;
  transaction_frequency: number;
  unique_counterparties: number;
  account_age_days: number;
  in_out_ratio: number;
  night_activity_ratio: number;
  known_risky_counterparty_ratio: number;
}

interface SimulateViewProps {
  onSimulate: (data: SimulateFormData) => void;
}

export default function SimulateView({ onSimulate }: SimulateViewProps) {
  const [formData, setFormData] = useState<SimulateFormData>({
    user_id: "",
    target_address: "",
    total_received: 0,
    total_sent: 0,
    num_transactions: 0,
    avg_transaction_value: 0,
    max_transaction_value: 0,
    transaction_frequency: 0,
    unique_counterparties: 0,
    account_age_days: 0,
    in_out_ratio: 0,
    night_activity_ratio: 0,
    known_risky_counterparty_ratio: 0,
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
              <label className="block text-slate-500 mb-1 font-medium">Total Received</label>
              <input type="number" step="any" name="total_received" value={formData.total_received} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Total Sent</label>
              <input type="number" step="any" name="total_sent" value={formData.total_sent} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Transaction Count</label>
              <input type="number" name="num_transactions" value={formData.num_transactions} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Avg Transaction Value</label>
              <input type="number" step="any" name="avg_transaction_value" value={formData.avg_transaction_value} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Max Transaction Value</label>
              <input type="number" step="any" name="max_transaction_value" value={formData.max_transaction_value} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Transaction Frequency</label>
              <input type="number" step="any" name="transaction_frequency" value={formData.transaction_frequency} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Unique Counterparties</label>
              <input type="number" name="unique_counterparties" value={formData.unique_counterparties} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Account Age (Days)</label>
              <input type="number" name="account_age_days" value={formData.account_age_days} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">In/Out Ratio</label>
              <input type="number" step="any" name="in_out_ratio" value={formData.in_out_ratio} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Night Activity Ratio</label>
              <input type="number" step="any" name="night_activity_ratio" value={formData.night_activity_ratio} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
            </div>
          </div>
          <div>
            <label className="block text-slate-500 mb-1 font-medium">Known Risky Counterparty Ratio</label>
            <input type="number" step="any" name="known_risky_counterparty_ratio" value={formData.known_risky_counterparty_ratio} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
          </div>
          <button type="submit" className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 rounded text-sm transition-all shadow-md shadow-blue-500/10">
            Push Transaction Flow
          </button>
        </form>
      </section>
    </div>
  );
}