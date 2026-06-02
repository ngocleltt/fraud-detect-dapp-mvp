"use client";

import { useMemo, useState } from "react";
import {
  Eye,
  AlertTriangle,
  Server,
  Activity,
  Search,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
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

type SortKey =
  | "user_id"
  | "risk_score"
  | "total_erc20"
  | "total_ether_received"
  | "total_transactions";

type SortDirection = "asc" | "desc";

export default function OverviewView({
  users,
  filterStatus,
  setFilterStatus,
  terminalLogs,
  dict,
  locale,
}: OverviewViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("risk_score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

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

  const getSortableValue = (user: UserRow, key: SortKey): string | number => {
    switch (key) {
      case "user_id":
        return user.user_id.toLowerCase();
      case "risk_score":
        return user.risk_score;
      case "total_erc20":
        return user.features["Total ERC20 tnxs"];
      case "total_ether_received":
        return user.features["total ether received"];
      case "total_transactions":
        return user.features["total transactions (including tnx to create contract)"];
      default:
        return user.risk_score;
    }
  };

  const processedUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    const filtered = users.filter((user) => {
      const statusMatched =
        filterStatus === "ALL"
          ? true
          : filterStatus === "SAFE"
          ? user.classification === "safe"
          : user.classification === "suspicious";

      const searchMatched =
        !keyword ||
        user.user_id.toLowerCase().includes(keyword) ||
        user.target_address.toLowerCase().includes(keyword);

      return statusMatched && searchMatched;
    });

    return [...filtered].sort((a, b) => {
      const aValue = getSortableValue(a, sortKey);
      const bValue = getSortableValue(b, sortKey);

      if (typeof aValue === "string" && typeof bValue === "string") {
        const result = aValue.localeCompare(bValue);
        return sortDirection === "asc" ? result : -result;
      }

      const result = Number(aValue) - Number(bValue);
      return sortDirection === "asc" ? result : -result;
    });
  }, [users, filterStatus, searchTerm, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection(key === "user_id" ? "asc" : "desc");
  };

  const renderSortIcon = (key: SortKey) => {
    const active = sortKey === key;
    const iconClass = active ? "h-3.5 w-3.5 opacity-100" : "h-3.5 w-3.5 opacity-70";

    if (!active) return <ArrowUpDown className={iconClass} />;

    return sortDirection === "asc" ? (
      <ArrowUp className={iconClass} />
    ) : (
      <ArrowDown className={iconClass} />
    );
  };

  const getSortButtonClass = (key: SortKey, align: "left" | "right" = "left") =>
    `inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-semibold normal-case tracking-normal transition-all ${
      align === "right" ? "ml-auto" : ""
    } ${
      sortKey === key
        ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
        : "border-transparent bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const downloadCSV = () => {
    const headers = [
      "user_id",
      "target_address",
      "classification",
      "risk_score",
      "Total ERC20 tnxs",
      "ERC20 uniq rec contract addr",
      "ERC20 uniq rec token name",
      "ERC20 uniq rec addr",
      "Time Diff between first and last (Mins)",
      "total ether received",
      "Avg min between received tnx",
      "avg val received",
      "total transactions (including tnx to create contract)",
      "Unique Received From Addresses",
    ];

    const rows = processedUsers.map((user) => [
      user.user_id,
      user.target_address,
      user.classification,
      user.risk_score,
      user.features["Total ERC20 tnxs"],
      user.features["ERC20 uniq rec contract addr"],
      user.features["ERC20 uniq rec token name"],
      user.features["ERC20 uniq rec addr"],
      user.features["Time Diff between first and last (Mins)"],
      user.features["total ether received"],
      user.features["Avg min between received tnx"],
      user.features["avg val received"],
      user.features["total transactions (including tnx to create contract)"],
      user.features["Unique Received From Addresses"],
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `overview-export-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

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
        <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                {(["ALL", "SAFE", "SUSPICIOUS"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
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

              <button
                type="button"
                onClick={downloadCSV}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Download className="h-4 w-4" />
                Download CSV
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by user ID or wallet address..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <div className="text-xs font-medium text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {processedUsers.length.toLocaleString(numberLocale)}
              </span>{" "}
              result(s)
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full min-w-[1280px] border-collapse text-left">
            <thead className="bg-slate-50/80">
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <button
                    type="button"
                    onClick={() => handleSort("user_id")}
                    className={getSortButtonClass("user_id")}
                  >
                    <span>{dict.overview.table.userId}</span>
                    {renderSortIcon("user_id")}
                  </button>
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <button
                    type="button"
                    onClick={() => handleSort("total_erc20")}
                    className={getSortButtonClass("total_erc20")}
                  >
                    <span>{dict.overview.table.totalErc20Tx}</span>
                    {renderSortIcon("total_erc20")}
                  </button>
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

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <button
                    type="button"
                    onClick={() => handleSort("total_ether_received")}
                    className={getSortButtonClass("total_ether_received")}
                  >
                    <span>{dict.overview.table.ethReceived}</span>
                    {renderSortIcon("total_ether_received")}
                  </button>
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.avgMinPerRec}
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.avgVal}
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <button
                    type="button"
                    onClick={() => handleSort("total_transactions")}
                    className={getSortButtonClass("total_transactions")}
                  >
                    <span>{dict.overview.table.totalTx}</span>
                    {renderSortIcon("total_transactions")}
                  </button>
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.uniqFrom}
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <button
                    type="button"
                    onClick={() => handleSort("risk_score")}
                    className={getSortButtonClass("risk_score", "right")}
                  >
                    <span>{dict.overview.table.risk}</span>
                    {renderSortIcon("risk_score")}
                  </button>
                </th>

                <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.overview.table.status}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {processedUsers.length > 0 ? (
                processedUsers.map((user) => (
                  <tr
                    key={`${user.user_id}-${user.target_address}`}
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan={13}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
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