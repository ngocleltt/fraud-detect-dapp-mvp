"use client";

import { useState } from "react";
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  Wallet,
  ScanSearch,
} from "lucide-react";

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

  const featureRows = searchResult
    ? [
        {
          label: "Total ERC20 tnxs",
          value: searchResult.features["Total ERC20 tnxs"],
        },
        {
          label: "ERC20 uniq rec contract addr",
          value: searchResult.features["ERC20 uniq rec contract addr"],
        },
        {
          label: "ERC20 uniq rec token name",
          value: searchResult.features["ERC20 uniq rec token name"],
        },
        {
          label: "ERC20 uniq rec addr",
          value: searchResult.features["ERC20 uniq rec addr"],
        },
        {
          label: "Time Diff between first and last (Mins)",
          value: searchResult.features["Time Diff between first and last (Mins)"],
        },
        {
          label: "total ether received",
          value: searchResult.features["total ether received"],
        },
        {
          label: "Avg min between received tnx",
          value: searchResult.features["Avg min between received tnx"],
        },
        {
          label: "avg val received",
          value: searchResult.features["avg val received"].toFixed(8),
        },
        {
          label: "total transactions (including tnx to create contract)",
          value:
            searchResult.features[
              "total transactions (including tnx to create contract)"
            ],
        },
        {
          label: "Unique Received From Addresses",
          value: searchResult.features["Unique Received From Addresses"],
        },
      ]
    : [];

  const isSuspicious = searchResult?.classification === "suspicious";

  return (
    <div className="animate-fadeIn w-full space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.08),_transparent_35%)]" />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700">
                <ScanSearch className="h-3.5 w-3.5" />
                Account Inspection
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Audit an individual wallet or user record
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Search by internal user ID or wallet address to inspect the
                model result, risk score, and the full forensic feature set used
                during evaluation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:min-w-[360px]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Lookup mode
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  User ID / Wallet
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Output
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  Risk + Features
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Status
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  Real-time query
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 md:flex-row"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Enter User ID or Wallet Address (e.g. USR-0001 or 0x...)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800"
            >
              Audit Account
            </button>
          </form>
        </div>
      </section>

      {isLoading ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500" />
            <p className="text-sm font-medium text-slate-600">
              Auditing account, please wait...
            </p>
          </div>
        </section>
      ) : searchResult ? (
        <section className="grid items-start gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Audit result
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    Identity summary
                  </h3>
                </div>

                <div
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold border ${
                    isSuspicious
                      ? "border-rose-200 bg-rose-50 text-rose-600"
                      : "border-emerald-200 bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {isSuspicious ? (
                    <ShieldAlert className="h-3.5 w-3.5" />
                  ) : (
                    <ShieldCheck className="h-3.5 w-3.5" />
                  )}
                  {searchResult.classification.toUpperCase()}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    User ID
                  </p>
                  <p className="mt-2 text-sm font-semibold text-blue-600">
                    {searchResult.user_id}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Risk score
                  </p>
                  <p
                    className={`mt-2 text-2xl font-bold ${
                      isSuspicious ? "text-rose-600" : "text-emerald-600"
                    }`}
                  >
                    {(searchResult.risk_score * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-slate-400" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Wallet address
                  </p>
                </div>
                <p className="mt-3 break-all font-mono text-sm text-slate-700">
                  {searchResult.target_address}
                </p>
              </div>

              <div
                className={`mt-4 rounded-xl border px-4 py-3 ${
                  isSuspicious
                    ? "border-rose-200 bg-rose-50"
                    : "border-emerald-200 bg-emerald-50"
                }`}
              >
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    isSuspicious ? "text-rose-500" : "text-emerald-500"
                  }`}
                >
                  Interpretation
                </p>
                <p
                  className={`mt-2 text-sm leading-6 ${
                    isSuspicious ? "text-rose-700" : "text-emerald-700"
                  }`}
                >
                  {isSuspicious
                    ? "This identity shows a suspicious risk profile based on the extracted transaction features."
                    : "This identity currently appears within the safe range based on the evaluated transaction pattern."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Forensic feature map
                </p>
                <h3 className="mt-1 text-base font-bold text-slate-900">
                  Evaluated indicators
                </h3>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-500 border border-slate-200">
                10 features
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead className="bg-white">
                  <tr className="border-b border-slate-100">
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Feature
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {featureRows.map((row) => (
                    <tr key={row.label} className="hover:bg-slate-50/80">
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {row.label}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900 font-mono">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : hasSearched && searchId ? (
        <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-4 w-4 text-rose-500" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-500">
                No record found
              </p>
              <p className="mt-2 text-sm leading-6 text-rose-700">
                Identity not found in the pre-evaluated dataset registry. Try a
                different user ID or wallet address.
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}