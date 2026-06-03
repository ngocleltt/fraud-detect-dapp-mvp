"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  ShieldAlert,
  TrendingUp,
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

interface GraphicsPanelProps {
  users: UserRow[];
  dict: Dictionary;
  locale: Locale;
}

type MetricKey = "risk" | "eth" | "erc20" | "velocity";

function LineGraphic({
  values,
  color,
}: {
  values: number[];
  color: string;
}) {
  const width = 420;
  const height = 190;
  const padX = 14;
  const padY = 16;

  if (!values.length) {
    return (
      <div className="flex h-[190px] items-center justify-center rounded-[24px] border border-white/10 bg-[#0b0f19] text-xs text-slate-500">
        No data
      </div>
    );
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x =
      padX + (index * (width - padX * 2)) / Math.max(values.length - 1, 1);
    const y =
      height - padY - ((value - min) / range) * (height - padY * 2);
    return { x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padY} L ${
    points[0].x
  } ${height - padY} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-[190px] w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="graphics-panel-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>

        <filter id="graphics-panel-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {[0, 1, 2, 3].map((row) => {
        const y = padY + ((height - padY * 2) / 3) * row;
        return (
          <line
            key={row}
            x1={padX}
            y1={y}
            x2={width - padX}
            y2={y}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="4 6"
          />
        );
      })}

      <path d={areaPath} fill="url(#graphics-panel-fill)" />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#graphics-panel-glow)"
      />

      {points.map((point, index) => {
        if (index !== points.length - 1) return null;

        return (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="6"
              fill="#0b0f19"
              stroke={color}
              strokeWidth="3"
            />
            <circle cx={point.x} cy={point.y} r="12" fill={color} opacity="0.14" />
          </g>
        );
      })}
    </svg>
  );
}

function MiniTrend({
  values,
  color,
}: {
  values: number[];
  color: string;
}) {
  const width = 260;
  const height = 70;
  const pad = 6;

  if (!values.length) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x = pad + (index * (width - pad * 2)) / Math.max(values.length - 1, 1);
    const y = height - pad - ((value - min) / range) * (height - pad * 2);
    return `${x},${y}`;
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-[70px] w-full"
      preserveAspectRatio="none"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points.join(" ")}
      />
    </svg>
  );
}

export default function GraphicsPanel({
  users,
  dict,
  locale,
}: GraphicsPanelProps) {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("risk");

  const numberLocale =
    locale === "vi" ? "vi-VN" : locale === "ru" ? "ru-RU" : "en-US";

  const formatNumber = (value: number, digits = 0) =>
    value.toLocaleString(numberLocale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });

  const formatPercent = (value: number) =>
    `${(value * 100).toLocaleString(numberLocale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}%`;

  const total = users.length;
  const suspiciousCount = users.filter(
    (user) => user.classification === "suspicious"
  ).length;
  const safeCount = total - suspiciousCount;

  const avgRisk =
    total > 0
      ? users.reduce((sum, user) => sum + user.risk_score, 0) / total
      : 0;

  const avgEthReceived =
    total > 0
      ? users.reduce(
          (sum, user) => sum + user.features["total ether received"],
          0
        ) / total
      : 0;

  const metricConfig = useMemo(() => {
    return {
      risk: {
        accent: "#3b82f6",
        chipClass:
          "border-blue-400/20 bg-blue-500/10 text-blue-300",
        getValue: (user: UserRow) => user.risk_score * 100,
        format: (user: UserRow) => formatPercent(user.risk_score),
      },
      eth: {
        accent: "#10b981",
        chipClass:
          "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
        getValue: (user: UserRow) => user.features["total ether received"],
        format: (user: UserRow) =>
          formatNumber(user.features["total ether received"], 2),
      },
      erc20: {
        accent: "#8b5cf6",
        chipClass:
          "border-violet-400/20 bg-violet-500/10 text-violet-300",
        getValue: (user: UserRow) => user.features["Total ERC20 tnxs"],
        format: (user: UserRow) =>
          formatNumber(user.features["Total ERC20 tnxs"], 0),
      },
      velocity: {
        accent: "#f59e0b",
        chipClass:
          "border-amber-400/20 bg-amber-500/10 text-amber-300",
        getValue: (user: UserRow) =>
          user.features["Time Diff between first and last (Mins)"] > 0
            ? user.features["total transactions (including tnx to create contract)"] /
              user.features["Time Diff between first and last (Mins)"]
            : 0,
        format: (user: UserRow) => {
          const value =
            user.features["Time Diff between first and last (Mins)"] > 0
              ? user.features[
                  "total transactions (including tnx to create contract)"
                ] / user.features["Time Diff between first and last (Mins)"]
              : 0;
          return formatNumber(value, 3);
        },
      },
    };
  }, [formatNumber]);

  const active = metricConfig[activeMetric];

  const chartValues = useMemo(() => {
    return [...users].slice(0, 12).map((user) => active.getValue(user));
  }, [users, active]);

  const miniTrendValues = useMemo(() => {
    return [...users].slice(0, 10).map((user) => active.getValue(user));
  }, [users, active]);

  const topMetricUsers = useMemo(() => {
    return [...users]
      .sort((a, b) => active.getValue(b) - active.getValue(a))
      .slice(0, 5);
  }, [users, active]);

  const chartCurrent =
    chartValues.length > 0 ? chartValues[chartValues.length - 1] : 0;
  const chartPrevious =
    chartValues.length > 1 ? chartValues[chartValues.length - 2] : chartCurrent;

  const chartDelta =
    chartPrevious !== 0 ? ((chartCurrent - chartPrevious) / chartPrevious) * 100 : 0;

  const panel = dict.graphicsPanel;

  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            {panel.badge}
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-900">{panel.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{panel.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["risk", "eth", "erc20", "velocity"] as MetricKey[]).map((metric) => {
            const isActive = metric === activeMetric;
            return (
              <button
                key={metric}
                type="button"
                onClick={() => setActiveMetric(metric)}
                className={`rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {panel.tabs[metric]}
              </button>
            );
          })}
        </div>
      </div>

      {!users.length ? (
        <div className="flex h-52 items-center justify-center text-sm font-medium text-slate-400">
          {panel.noData}
        </div>
      ) : (
        <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-[#101522] p-4 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
                <div className="flex items-center gap-2 text-slate-400">
                  <BarChart3 className="h-4 w-4" />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                    {panel.overview.totalRecords}
                  </p>
                </div>
                <p className="mt-3 text-3xl font-bold text-white">
                  {formatNumber(total)}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#101522] p-4 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
                <div className="flex items-center gap-2 text-rose-300">
                  <ShieldAlert className="h-4 w-4" />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                    {panel.overview.suspiciousRate}
                  </p>
                </div>
                <p className="mt-3 text-3xl font-bold text-white">
                  {formatPercent(total ? suspiciousCount / total : 0)}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#101522] p-4 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
                <div className="flex items-center gap-2 text-blue-300">
                  <TrendingUp className="h-4 w-4" />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                    {panel.overview.avgRisk}
                  </p>
                </div>
                <p className="mt-3 text-3xl font-bold text-white">
                  {formatPercent(avgRisk)}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#101522] p-4 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Activity className="h-4 w-4" />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                    {panel.overview.avgEth}
                  </p>
                </div>
                <p className="mt-3 text-3xl font-bold text-white">
                  {formatNumber(avgEthReceived, 2)}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    {panel.chart.eyebrow}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-slate-900">
                    {panel.chart.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {panel.chart.subtitle}
                  </p>
                </div>

                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${active.chipClass}`}
                >
                  <TrendingUp className="h-4 w-4" />
                  {panel.tabs[activeMetric]}
                </div>
              </div>

              <div className="mt-4 rounded-[28px] border border-white/10 bg-[#0b0f19] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <LineGraphic values={chartValues} color={active.accent} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {panel.chart.currentLabel}:{" "}
                  <span className="text-slate-900">
                    {activeMetric === "risk"
                      ? formatNumber(chartCurrent, 1) + "%"
                      : formatNumber(
                          chartCurrent,
                          activeMetric === "velocity" ? 3 : 2
                        )}
                  </span>
                </div>

                <div
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    chartDelta >= 0
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  {panel.chart.deltaLabel}:{" "}
                  {chartDelta >= 0 ? "+" : ""}
                  {formatNumber(chartDelta, 2)}%
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-[#101522] p-4 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {panel.distribution.eyebrow}
              </p>
              <h3 className="mt-2 text-base font-bold text-white">
                {panel.distribution.title}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {panel.distribution.subtitle}
              </p>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="flex h-full w-full">
                  <div
                    className="bg-emerald-500"
                    style={{ width: `${total ? (safeCount / total) * 100 : 0}%` }}
                  />
                  <div
                    className="bg-rose-500"
                    style={{
                      width: `${total ? (suspiciousCount / total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/10 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                    {panel.distribution.safe}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {formatNumber(safeCount)}
                  </p>
                </div>

                <div className="rounded-2xl border border-rose-400/15 bg-rose-500/10 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-300">
                    {panel.distribution.suspicious}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {formatNumber(suspiciousCount)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#101522] p-4 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {panel.leaders.eyebrow}
              </p>
              <h3 className="mt-2 text-base font-bold text-white">
                {panel.leaders.title}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {panel.leaders.subtitle}
              </p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-[#0b0f19] p-3">
                <MiniTrend values={miniTrendValues} color={active.accent} />
              </div>

              <div className="mt-4 space-y-3">
                {topMetricUsers.map((user) => {
                  const raw = active.getValue(user);
                  const maxTop = topMetricUsers[0]
                    ? active.getValue(topMetricUsers[0])
                    : 1;
                  const width = maxTop > 0 ? Math.max((raw / maxTop) * 100, 8) : 8;

                  return (
                    <div key={user.user_id} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-slate-100">
                          {user.user_id}
                        </p>
                        <p className="text-xs font-bold text-slate-300">
                          {active.format(user)}
                        </p>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${width}%`,
                            backgroundColor: active.accent,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#101522] p-4 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <div className="flex items-center gap-2 text-slate-400">
                <Activity className="h-4 w-4" />
                <p className="text-[11px] font-bold uppercase tracking-[0.18em]">
                  {panel.insight.eyebrow}
                </p>
              </div>
              <h3 className="mt-2 text-base font-bold text-white">
                {panel.insight.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {panel.insight.descriptions[activeMetric]}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}