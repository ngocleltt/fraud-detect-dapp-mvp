"use client";

import {
  Shield,
  Database,
  BrainCircuit,
  Link2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Transaction Feature Input",
    description:
      "The system collects 10 transaction-level indicators, including ERC20 activity, wallet interaction patterns, received value, and timing behavior.",
    icon: Database,
  },
  {
    id: "02",
    title: "Off-Chain AI Risk Scoring",
    description:
      "A FastAPI service transforms the incoming payload and runs the XGBoost model to classify each wallet as SAFE or SUSPICIOUS in real time.",
    icon: BrainCircuit,
  },
  {
    id: "03",
    title: "IPFS + Contract Registry",
    description:
      "Updated dataset records are stored on IPFS, while the latest CID is anchored on-chain so every storage reference remains transparent and verifiable.",
    icon: Link2,
  },
];

export default function HowItWorksView() {
  return (
    <div className="animate-fadeIn w-full space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.08),_transparent_35%)]" />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-blue-700">
                <Shield className="h-3.5 w-3.5" />
                Detection Pipeline
              </div>

              <h2 className="mt-4 max-w-2xl text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                How ChainEye processes suspicious wallet activity
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                ChainEye combines client-side submission, off-chain AI
                analysis, and on-chain CID anchoring into one fraud-detection
                workflow built for transparent forensic tracking.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 xl:w-auto xl:min-w-[360px]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Features
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  10 inputs
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  AI Engine
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  XGBoost
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Storage
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  IPFS + CID
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
                Processing stages
              </p>
              <h3 className="mt-1 text-base font-bold text-slate-900">
                Detection flow
              </h3>
            </div>

            <div className="hidden items-center gap-2 text-xs text-slate-400 md:flex">
              <span>Input</span>
              <ArrowRight className="h-3.5 w-3.5" />
              <span>Score</span>
              <ArrowRight className="h-3.5 w-3.5" />
              <span>Anchor</span>
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
                          STEP {step.id}
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
              System pipeline
            </p>
          </div>

          <h3 className="mt-3 text-lg font-semibold text-white">
            Execution summary
          </h3>

          <div className="mt-5 space-y-3 text-sm">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <p className="text-slate-400">Frontend</p>
              <p className="mt-1 font-medium text-white">
                Wallet data and transaction features are submitted from the
                client dashboard.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <p className="text-slate-400">Backend</p>
              <p className="mt-1 font-medium text-white">
                FastAPI evaluates the payload and returns a fraud label with a
                risk score.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <p className="text-slate-400">Storage layer</p>
              <p className="mt-1 font-medium text-white">
                The latest dataset snapshot is uploaded to IPFS and referenced
                on-chain by CID.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">
              Why this matters
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              The model runs off-chain for speed, while CID registration adds a
              verifiable blockchain layer for auditability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}