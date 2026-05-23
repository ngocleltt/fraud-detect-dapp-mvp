"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface UserFeatures {
  "Total ERC20 tnxs": number;
  "ERC20 uniq rec contract addr": number;
  "ERC20 uniq rec token name": number;
  "ERC20 uniq rec addr": number;
  "Time Diff between first and last (Mins)": number;
  "total ether received": number;
  "Avg min between received tnx": number;
  "avg val received": number;
  "total transactions (including tnx to create contract)": number;
  "Unique Received From Addresses": number;
}

interface UserRow {
  user_id: string;
  target_address: string;
  classification: "safe" | "suspicious";
  risk_score: number;
  features: UserFeatures;
}

interface AuditViewProps {
  onSearch: (id: string) => Promise<UserRow | null>;
}

export default function AuditView({ onSearch }: AuditViewProps) {
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<UserRow | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = searchId.trim();
    if (!trimmedId) return;
    setIsLoading(true);
    setHasSearched(false);
    const result = await onSearch(trimmedId);
    setSearchResult(result);
    setHasSearched(true);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl">
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Search className="text-blue-600 w-5 h-5" />
          <h2 className="text-sm font-bold tracking-wider text-slate-700">INDIVIDUAL ACCOUNT AUDIT</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter User ID or Wallet Address (e.g., USR-0001 or 0x...)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-slate-700 transition-colors"
          />
          <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
            Audit
          </button>
        </form>

        {isLoading ? (
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 font-medium">
            Auditing account, please wait...
          </div>
        ) : searchResult ? (
          <div className="mt-6 space-y-5">
            {/* Summary header */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">User ID</p>
                <p className="text-sm font-mono text-blue-600 font-semibold">{searchResult.user_id}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-slate-400 mb-1">Wallet Address</p>
                <p className="text-sm font-mono text-slate-700 truncate">{searchResult.target_address}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Risk Score</p>
                <p className={`text-sm font-bold ${searchResult.classification === "suspicious" ? "text-rose-600" : "text-emerald-600"}`}>
                  {(searchResult.risk_score * 100).toFixed(0)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Security Status</p>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-1 ${
                  searchResult.classification === "suspicious"
                    ? "bg-rose-50 text-rose-600 border border-rose-200"
                    : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                }`}>
                  {searchResult.classification.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Full features table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-xs font-semibold text-slate-500">
                BLOCKCHAIN FORENSIC FEATURES (ERC20)
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white border-b border-slate-100">
                    <tr>
                      <th className="p-3 font-semibold text-slate-500">Feature</th>
                      <th className="p-3 font-semibold text-slate-500">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td className="p-3 font-mono">Total ERC20 tnxs</td><td className="p-3">{searchResult.features["Total ERC20 tnxs"]}</td></tr>
                    <tr><td className="p-3 font-mono">ERC20 uniq rec contract addr</td><td className="p-3">{searchResult.features["ERC20 uniq rec contract addr"]}</td></tr>
                    <tr><td className="p-3 font-mono">ERC20 uniq rec token name</td><td className="p-3">{searchResult.features["ERC20 uniq rec token name"]}</td></tr>
                    <tr><td className="p-3 font-mono">ERC20 uniq rec addr</td><td className="p-3">{searchResult.features["ERC20 uniq rec addr"]}</td></tr>
                    <tr><td className="p-3 font-mono">Time Diff between first and last (Mins)</td><td className="p-3">{searchResult.features["Time Diff between first and last (Mins)"]}</td></tr>
                    <tr><td className="p-3 font-mono">total ether received</td><td className="p-3">{searchResult.features["total ether received"]}</td></tr>
                    <tr><td className="p-3 font-mono">Avg min between received tnx</td><td className="p-3">{searchResult.features["Avg min between received tnx"]}</td></tr>
                    <tr><td className="p-3 font-mono">avg val received</td><td className="p-3">{searchResult.features["avg val received"].toFixed(8)}</td></tr>
                    <tr><td className="p-3 font-mono">total transactions (including tnx to create contract)</td><td className="p-3">{searchResult.features["total transactions (including tnx to create contract)"]}</td></tr>
                    <tr><td className="p-3 font-mono">Unique Received From Addresses</td><td className="p-3">{searchResult.features["Unique Received From Addresses"]}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : hasSearched && searchId ? (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-600 font-mono">
            Identity not found in the pre-evaluated dataset registry.
          </div>
        ) : null}
      </section>
    </div>
  );
}