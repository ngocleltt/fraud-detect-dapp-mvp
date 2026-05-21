"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface UserRow {
  userId: string;
  walletAddress: string;
  riskScore: number;
  status: "SAFE" | "SUSPICIOUS";
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
    if (!trimmedId) {
      return;
    }
    setIsLoading(true);
    setHasSearched(false);
    const result = await onSearch(trimmedId);
    setSearchResult(result);
    setHasSearched(true);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Search className="text-blue-600 w-5 h-5" />
          <h2 className="text-sm font-bold tracking-wider text-slate-700">INDIVIDUAL ACCOUNT AUDIT</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter User ID or Wallet Address (e.g., User_01)..."
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
          <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="col-span-2">
              <p className="text-xs text-slate-400 mb-1">Target Identity</p>
              <p className="text-sm font-mono text-blue-600 truncate font-semibold">{searchResult.userId} ({searchResult.walletAddress})</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">AI Risk Score</p>
              <p className={`text-sm font-bold ${searchResult.status === "SUSPICIOUS" ? "text-rose-600" : "text-emerald-600"}`}>{searchResult.riskScore}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Security Status</p>
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-1 ${searchResult.status === "SUSPICIOUS" ? "bg-rose-50 text-rose-600 border border-rose-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
                {searchResult.status}
              </span>
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