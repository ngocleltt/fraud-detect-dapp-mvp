"use client";

import { useEffect } from "react";
import { X, ShieldCheck, TriangleAlert, Wallet, Radar } from "lucide-react";
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

interface RiskDetailsModalProps {
  user: UserRow | null;
  onClose: () => void;
  dict: Dictionary;
  locale: Locale;
}

export default function RiskDetailsModal({
  user,
  onClose,
  dict,
  locale,
}: RiskDetailsModalProps) {
  useEffect(() => {
    if (!user) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user, onClose]);

  if (!user) return null;

  const numberLocale =
    locale === "vi" ? "vi-VN" : locale === "ru" ? "ru-RU" : "en-US";

  const classificationLabels = {
    safe: dict.common.safe.toUpperCase(),
    suspicious: dict.common.suspicious.toUpperCase(),
  };

  const formatNumber = (value: number, min = 2, max = 2) =>
    value.toLocaleString(numberLocale, {
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    });

  const getRiskSignals = () => {
    const signals: string[] = [];

    if (user.features["Total ERC20 tnxs"] >= 20) {
      signals.push(dict.riskModal.signals.highErc20Density);
    }

    if (user.features["ERC20 uniq rec addr"] >= 8) {
      signals.push(dict.riskModal.signals.broadReceiverInteraction);
    }

    if (user.features["Unique Received From Addresses"] >= 6) {
      signals.push(dict.riskModal.signals.manyInboundSources);
    }

    if (user.features["Time Diff between first and last (Mins)"] <= 180) {
      signals.push(dict.riskModal.signals.compressedWindow);
    }

    if (user.features["total ether received"] >= 10) {
      signals.push(dict.riskModal.signals.largeEthInflow);
    }

    if (user.features["avg val received"] >= 0.4) {
      signals.push(dict.riskModal.signals.elevatedAvgValue);
    }

    if (signals.length === 0) {
      signals.push(dict.riskModal.signals.noStrongAnomaly);
    }

    return signals.slice(0, 4);
  };

  const featureEntries = [
    {
      label: dict.riskModal.features.totalErc20,
      value: user.features["Total ERC20 tnxs"],
    },
    {
      label: dict.riskModal.features.uniqContracts,
      value: user.features["ERC20 uniq rec contract addr"],
    },
    {
      label: dict.riskModal.features.uniqTokens,
      value: user.features["ERC20 uniq rec token name"],
    },
    {
      label: dict.riskModal.features.uniqReceivers,
      value: user.features["ERC20 uniq rec addr"],
    },
    {
      label: dict.riskModal.features.activityWindow,
      value: user.features["Time Diff between first and last (Mins)"],
    },
    {
      label: dict.riskModal.features.totalEtherReceived,
      value: formatNumber(user.features["total ether received"], 2, 2),
    },
    {
      label: dict.riskModal.features.avgMinutesBetween,
      value: formatNumber(user.features["Avg min between received tnx"], 2, 2),
    },
    {
      label: dict.riskModal.features.avgValueReceived,
      value: formatNumber(user.features["avg val received"], 2, 3),
    },
    {
      label: dict.riskModal.features.totalTransactions,
      value:
        user.features["total transactions (including tnx to create contract)"],
    },
    {
      label: dict.riskModal.features.uniqFrom,
      value: user.features["Unique Received From Addresses"],
    },
  ];

  const isSuspicious = user.classification === "suspicious";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {dict.riskModal.panelLabel}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-slate-900">{user.user_id}</h3>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                  isSuspicious
                    ? "border-rose-200 bg-rose-50 text-rose-600"
                    : "border-emerald-200 bg-emerald-50 text-emerald-600"
                }`}
              >
                {isSuspicious ? (
                  <TriangleAlert className="h-3.5 w-3.5" />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5" />
                )}
                {classificationLabels[user.classification]}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <Wallet className="h-4 w-4 text-slate-400" />
              <span className="text-slate-400">
                {dict.riskModal.walletAddress}:
              </span>
              <span className="truncate font-mono">{user.target_address}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            aria-label={dict.riskModal.close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-6 py-6">
          <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {dict.riskModal.riskScore}
                  </p>
                  <p
                    className={`mt-2 text-2xl font-bold ${
                      isSuspicious ? "text-rose-600" : "text-emerald-600"
                    }`}
                  >
                    {formatNumber(user.risk_score * 100, 2, 2)}%
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {dict.riskModal.confidenceHint}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {dict.riskModal.activityWindow}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {user.features["Time Diff between first and last (Mins)"]}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {dict.riskModal.activityWindowDesc}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {dict.riskModal.totalEthReceived}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {formatNumber(user.features["total ether received"], 2, 2)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {dict.riskModal.totalEthReceivedDesc}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {dict.riskModal.featureMap}
                  </p>
                  <h4 className="mt-1 text-sm font-bold text-slate-900">
                    {dict.riskModal.featureMapTitle}
                  </h4>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {featureEntries.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  <Radar className="h-4 w-4 text-blue-600" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {dict.riskModal.signalSummary}
                  </p>
                </div>

                <h4 className="mt-2 text-sm font-bold text-slate-900">
                  {dict.riskModal.signalSummaryTitle}
                </h4>

                <div className="mt-4 space-y-2">
                  {getRiskSignals().map((signal) => (
                    <div
                      key={signal}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                    >
                      {signal}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {dict.riskModal.interpretation}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {isSuspicious
                    ? dict.riskModal.suspiciousInterpretation
                    : dict.riskModal.safeInterpretation}
                </p>
              </div>

              <div
                className={`rounded-3xl border p-4 ${
                  isSuspicious
                    ? "border-rose-200 bg-rose-50/70"
                    : "border-emerald-200 bg-emerald-50/70"
                }`}
              >
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    isSuspicious ? "text-rose-500" : "text-emerald-500"
                  }`}
                >
                  {dict.riskModal.status}
                </p>
                <p
                  className={`mt-2 text-sm leading-6 ${
                    isSuspicious ? "text-rose-700" : "text-emerald-700"
                  }`}
                >
                  {isSuspicious
                    ? dict.riskModal.suspiciousStatus
                    : dict.riskModal.safeStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}