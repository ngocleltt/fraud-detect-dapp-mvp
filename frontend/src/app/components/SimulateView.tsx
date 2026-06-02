"use client";

import { useState } from "react";
import {
  PlusCircle,
  Activity,
  Wallet,
  Binary,
  Sparkles,
} from "lucide-react";
import type { Dictionary, Locale } from "../locales";

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
  dict: Dictionary;
  locale: Locale;
}

type SimulateField = {
  label: string;
  name: keyof SimulateFormData;
  type: "text" | "number";
  placeholder?: string;
  step?: string;
};

type FieldGroup = {
  title: string;
  icon: typeof Wallet;
  fields: SimulateField[];
};

export default function SimulateView({
  onSimulate,
  dict,
  locale,
}: SimulateViewProps) {
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

  const fieldGroups: FieldGroup[] = [
    {
      title: dict.simulate.groups.identity,
      icon: Wallet,
      fields: [
        {
          label: dict.simulate.fields.userId,
          name: "user_id",
          type: "text",
          placeholder: dict.simulate.placeholders.userId,
        },
        {
          label: dict.simulate.fields.walletAddress,
          name: "target_address",
          type: "text",
          placeholder: dict.simulate.placeholders.walletAddress,
        },
      ],
    },
    {
      title: dict.simulate.groups.erc20Activity,
      icon: Activity,
      fields: [
        {
          label: dict.simulate.fields.totalErc20Tx,
          name: "total_erc20_tnxs",
          type: "number",
        },
        {
          label: dict.simulate.fields.uniqueContract,
          name: "erc20_uniq_rec_contract_addr",
          type: "number",
        },
        {
          label: dict.simulate.fields.uniqueToken,
          name: "erc20_uniq_rec_token_name",
          type: "number",
        },
        {
          label: dict.simulate.fields.uniqueReceiverAddress,
          name: "erc20_uniq_rec_addr",
          type: "number",
        },
      ],
    },
    {
      title: dict.simulate.groups.valueTiming,
      icon: Binary,
      fields: [
        {
          label: dict.simulate.fields.timeDiffMins,
          name: "time_diff_mins",
          type: "number",
        },
        {
          label: dict.simulate.fields.ethReceived,
          name: "total_ether_received",
          type: "number",
          step: "any",
        },
        {
          label: dict.simulate.fields.avgMinBetweenReceived,
          name: "avg_min_between_rec",
          type: "number",
          step: "any",
        },
        {
          label: dict.simulate.fields.avgValueReceived,
          name: "avg_val_received",
          type: "number",
          step: "any",
        },
      ],
    },
    {
      title: dict.simulate.groups.structuralSignals,
      icon: Sparkles,
      fields: [
        {
          label: dict.simulate.fields.totalTxInclCreate,
          name: "total_transactions_incl_create",
          type: "number",
        },
        {
          label: dict.simulate.fields.uniqueFromAddresses,
          name: "unique_received_from_addresses",
          type: "number",
        },
      ],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof SimulateFormData;

    setFormData((prev) => ({
      ...prev,
      [key]:
        key === "user_id" || key === "target_address" ? value : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.user_id || !formData.target_address) return;
    onSimulate(formData);
  };

  const numberLocale =
    locale === "vi" ? "vi-VN" : locale === "ru" ? "ru-RU" : "en-US";

  return (
    <div className="animate-fadeIn w-full space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.08),_transparent_35%)]" />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700">
                <PlusCircle className="h-3.5 w-3.5" />
                {dict.simulate.hero.badge}
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {dict.simulate.hero.title}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                {dict.simulate.hero.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:min-w-[360px]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {dict.simulate.summary.inputModeLabel}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {dict.simulate.summary.inputModeValue}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {dict.simulate.summary.engineLabel}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {dict.simulate.summary.engineValue}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {dict.simulate.summary.resultLabel}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {dict.simulate.summary.resultValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="space-y-6">
          {fieldGroups.map((group) => {
            const Icon = group.icon;

            return (
              <section
                key={group.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-blue-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {dict.simulate.groupLabel}
                    </p>
                    <h3 className="text-base font-bold text-slate-900">
                      {group.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {group.fields.map((field) => (
                    <div
                      key={field.name}
                      className={
                        field.name === "target_address" ? "md:col-span-2" : ""
                      }
                    >
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        step={field.step ?? undefined}
                        name={field.name}
                        value={String(formData[field.name])}
                        onChange={handleInputChange}
                        placeholder={field.placeholder ?? ""}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {dict.simulate.preview.label}
              </p>
            </div>

            <h3 className="mt-3 text-lg font-semibold text-white">
              {dict.simulate.preview.title}
            </h3>

            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                <p className="text-slate-400">{dict.simulate.preview.userId}</p>
                <p className="mt-1 break-all font-medium text-white">
                  {formData.user_id || dict.simulate.preview.notProvided}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                <p className="text-slate-400">
                  {dict.simulate.preview.walletAddress}
                </p>
                <p className="mt-1 break-all font-mono text-white">
                  {formData.target_address || dict.simulate.preview.walletFallback}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                <p className="text-slate-400">
                  {dict.simulate.preview.featureCount}
                </p>
                <p className="mt-1 font-medium text-white">
                  {dict.simulate.preview.featureCountValue}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">
                {dict.simulate.note.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {dict.simulate.note.description}
              </p>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-100"
            >
              {dict.simulate.submitButton}
            </button>
          </section>
        </div>
      </form>
    </div>
  );
}