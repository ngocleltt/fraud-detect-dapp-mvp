"use client";

import { Eye, AlertTriangle, Server, Activity } from "lucide-react";
import type { Dictionary, Locale } from "../locales";

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
  risk_score: number;
  classification: "safe" | "suspicious";
  features: UserFeatures;
}

interface LogEntry {
  timestamp: string;
  message: string;
}

interface OverviewViewProps {
  users: UserRow[];
  filterStatus: "ALL" | "SAFE" | "SUSPICIOUS";
  setFilterStatus: (status: "ALL" | "SAFE" | "SUSPICIOUS") => void;
  terminalLogs: LogEntry[];
  dict: Dictionary;
  locale: Locale;
}

export default function OverviewView({
  users,
  filterStatus,
  setFilterStatus,
  terminalLogs,
  dict,
  locale,
}: OverviewViewProps) {
  const filteredUsers = users.filter((user) => {
    if (filterStatus === "ALL") return true;
    if (filterStatus === "SAFE") return user.classification === "safe";
    return user.classification === "suspicious";
  });

  const suspiciousCount = users.filter(
    (u) => u.classification === "suspicious"
  ).length;

  const fraudRate =
    users.length > 0 ? ((suspiciousCount / users.length) * 100).toFixed(2) : "0.00";

  const statusLabels = {
    ALL: dict.overview.filters.all,
    SAFE: dict.overview.filters.safe,
    SUSPICIOUS: dict.overview.filters.suspicious,
  };

  const classificationLabels = {
    safe: dict.common.safe.toUpperCase(),
    suspicious: dict.common.suspicious.toUpperCase(),
  };

  const numberLocale =
    locale === "vi" ? "vi-VN" : locale === "ru" ? "ru-RU" : "en-US";

  return (
    <div className="animate-fadeIn flex flex-1 flex-col space-y-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {dict.overview.cards.datasetVolumeLabel}
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {users.length.toLocaleString(numberLocale)}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {dict.overview.cards.datasetVolumeDesc}
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3 text-blue-600">
              <Eye className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {dict.overview.cards.suspiciousRateLabel}
              </p>
              <p className="mt-2 text-2xl font-bold text-rose-600">
                {fraudRate}%
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {dict.overview.cards.suspiciousRateDesc}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-3 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {dict.overview.cards.storageLayerLabel}
              </p>
              <p className="mt-2 text-lg font-bold text-slate-900">
                {dict.overview.cards.storageLayerTitle}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {dict.overview.cards.storageLayerDesc}
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-3 text-indigo-600">
              <Server className="h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {dict.overview.batch.label}
              </p>
            </div>
            <h2 className="mt-1 text-base font-bold text-slate-900">
              {dict.overview.batch.title}
            </h2>
          </div>

          <div className="flex self-start rounded-xl border border-slate-200 bg-slate-50 p-1">
            {(["ALL", "SAFE", "SUSPICIOUS"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${
                  filterStatus === status
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full min-w-[1280px] border-collapse text-left">
            <thead className="bg-slate-50/80">
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.userId}
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.totalErc20Tx}
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.uniqContract}
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.uniqToken}
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.uniqRecAddr}
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.timeDiff}
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.ethReceived}
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.avgMinPerRec}
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.avgVal}
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.totalTx}
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.uniqFrom}
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.risk}
                </th>
                <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.status}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user, idx) => (
                <tr
                  key={idx}
                  className="text-sm text-slate-600 transition-colors hover:bg-slate-50/80"
                >
                  <td className="px-4 py-3 font-semibold text-blue-600">
                    {user.user_id}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {user.features["Total ERC20 tnxs"]}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {user.features["ERC20 uniq rec contract addr"]}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {user.features["ERC20 uniq rec token name"]}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {user.features["ERC20 uniq rec addr"]}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {user.features["Time Diff between first and last (Mins)"]}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {user.features["total ether received"]}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {user.features["Avg min between received tnx"]}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {user.features["avg val received"].toLocaleString(numberLocale, {
                      minimumFractionDigits: 6,
                      maximumFractionDigits: 6,
                    })}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {
                      user.features[
                        "total transactions (including tnx to create contract)"
                      ]
                    }
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {user.features["Unique Received From Addresses"]}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-bold ${
                      user.classification === "suspicious"
                        ? "text-rose-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {(user.risk_score * 100).toLocaleString(numberLocale, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    %
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                        user.classification === "suspicious"
                          ? "border-rose-200 bg-rose-50 text-rose-600"
                          : "border-emerald-200 bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {classificationLabels[user.classification]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 border-b border-slate-800 pb-3">
          <Activity className="h-3.5 w-3.5 text-blue-500" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {dict.overview.telemetry}
          </p>
        </div>

        <div className="max-h-28 space-y-1 overflow-y-auto font-mono text-[11px] text-slate-400">
          {terminalLogs.map((log, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-slate-600">[{log.timestamp}]</span>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}