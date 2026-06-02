"use client";

import {
  Shield,
  Database,
  BrainCircuit,
  Link2,
  ArrowRight,
} from "lucide-react";
import type { Dictionary, Locale } from "../locales";

interface HowItWorksViewProps {
  dict: Dictionary;
  locale: Locale;
}

export default function HowItWorksView({
  dict,
  locale,
}: HowItWorksViewProps) {
  const steps = [
    {
      id: "01",
      title: dict.howItWorks.steps.step1Title,
      description: dict.howItWorks.steps.step1Description,
      icon: Database,
    },
    {
      id: "02",
      title: dict.howItWorks.steps.step2Title,
      description: dict.howItWorks.steps.step2Description,
      icon: BrainCircuit,
    },
    {
      id: "03",
      title: dict.howItWorks.steps.step3Title,
      description: dict.howItWorks.steps.step3Description,
      icon: Link2,
    },
  ];

  return (
    <div className="animate-fadeIn w-full space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.08),_transparent_35%)]" />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700">
                <Shield className="h-3.5 w-3.5" />
                {dict.howItWorks.hero.badge}
              </div>

              <h2 className="mt-4 max-w-2xl text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {dict.howItWorks.hero.title}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                {dict.howItWorks.hero.description}
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 xl:w-auto xl:min-w-[360px]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {dict.howItWorks.summary.featuresLabel}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {dict.howItWorks.summary.featuresValue}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {dict.howItWorks.summary.aiEngineLabel}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {dict.howItWorks.summary.aiEngineValue}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {dict.howItWorks.summary.storageLabel}
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {dict.howItWorks.summary.storageValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid items-start gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {dict.howItWorks.flow.label}
              </p>
              <h3 className="mt-1 text-base font-bold text-slate-900">
                {dict.howItWorks.flow.title}
              </h3>
            </div>

            <div className="hidden items-center gap-2 text-xs text-slate-400 md:flex">
              <span>{dict.howItWorks.flow.input}</span>
              <ArrowRight className="h-3.5 w-3.5" />
              <span>{dict.howItWorks.flow.score}</span>
              <ArrowRight className="h-3.5 w-3.5" />
              <span>{dict.howItWorks.flow.anchor}</span>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.id} className="relative">
                  {index !== steps.length - 1 && (
                    <div className="absolute bottom-[-18px] left-6 top-14 w-px bg-slate-200" />
                  )}

                  <div className="group flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all hover:border-blue-200 hover:bg-white">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-blue-600 shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] text-white">
                          {dict.howItWorks.steps.stepPrefix} {step.id}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900">
                          {step.title}
                        </h4>
                      </div>

                      <p className="text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {dict.howItWorks.pipeline.label}
            </p>
          </div>

          <h3 className="mt-3 text-lg font-semibold text-white">
            {dict.howItWorks.pipeline.title}
          </h3>

          <div className="mt-5 space-y-3 text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <p className="text-slate-400">{dict.howItWorks.pipeline.frontendLabel}</p>
              <p className="mt-1 font-medium text-white">
                {dict.howItWorks.pipeline.frontendDesc}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <p className="text-slate-400">{dict.howItWorks.pipeline.backendLabel}</p>
              <p className="mt-1 font-medium text-white">
                {dict.howItWorks.pipeline.backendDesc}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <p className="text-slate-400">{dict.howItWorks.pipeline.storageLayerLabel}</p>
              <p className="mt-1 font-medium text-white">
                {dict.howItWorks.pipeline.storageLayerDesc}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">
              {dict.howItWorks.whyItMatters.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {dict.howItWorks.whyItMatters.description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}