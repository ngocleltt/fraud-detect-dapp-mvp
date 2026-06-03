"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldAlert,
  Wallet,
  Radio,
  Cpu,
  LogOut,
  Languages,
  ChevronDown,
  Check,
} from "lucide-react";
import type { Dictionary, Locale } from "../locales";

interface HeaderProps {
  isConnected: boolean;
  walletAddress: string;
  onConnect: () => void;
  onDisconnect: () => void;
  locale: Locale;
  dict: Dictionary;
  onChangeLocale: (locale: Locale) => void;
}

const localeOptions: { value: Locale; short: string }[] = [
  { value: "en", short: "EN" },
  { value: "vi", short: "VI" },
  { value: "ru", short: "RU" },
];

export default function Header({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
  locale,
  dict,
  onChangeLocale,
}: HeaderProps) {
  const [showModal, setShowModal] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const handleConnectWallet = () => {
    setShowModal(false);
    onConnect();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setShowLanguageMenu(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowLanguageMenu(false);
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const currentLocaleLabel = dict.language[locale];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
              <ShieldAlert className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold tracking-wide text-slate-900 md:text-xl">
                {dict.header.brandTitle}
              </h1>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-slate-400">
                {dict.header.brandSubtitle}
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              <Radio className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-600/80">
                {dict.header.networkLabel}:
              </span>
              <span className="font-semibold">{dict.header.networkValue}</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700">
              <Cpu className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-blue-600/80">
                {dict.header.aiModelLabel}:
              </span>
              <span className="font-semibold">{dict.header.aiModelValue}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative" ref={languageMenuRef}>
              <button
                type="button"
                onClick={() => setShowLanguageMenu((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={showLanguageMenu}
                aria-controls="language-menu"
                aria-label={dict.header.languageSwitcherAriaLabel}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Languages className="h-4 w-4" />
                <span className="hidden sm:inline">{dict.language.label}:</span>
                <span>{currentLocaleLabel}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showLanguageMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showLanguageMenu && (
                <div
                  id="language-menu"
                  role="menu"
                  aria-label={dict.language.label}
                  className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
                >
                  {localeOptions.map((option) => {
                    const isActive = option.value === locale;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          onChangeLocale(option.value);
                          setShowLanguageMenu(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="inline-flex w-7 justify-center rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-slate-500">
                            {option.short}
                          </span>
                          <span>{dict.language[option.value]}</span>
                        </span>

                        {isActive ? <Check className="h-4 w-4" /> : null}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wallet-modal-title"
          aria-describedby="wallet-modal-description"
        >
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {dict.header.web3Access}
                </p>
                <h3
                  id="wallet-modal-title"
                  className="text-base font-bold text-slate-900"
                >
                  {dict.header.selectWalletProvider}
                </h3>
              </div>
            </div>

            <p
              id="wallet-modal-description"
              className="mb-4 text-sm leading-6 text-slate-500"
            >
              {dict.header.walletModalDescription}
            </p>

            <div className="space-y-2">
              <button
                onClick={handleConnectWallet}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:bg-slate-50"
              >
                <span className="text-sm font-semibold text-slate-700">
                  {dict.header.metamaskWallet}
                </span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                  {dict.header.detected}
                </span>
              </button>

              <button
                disabled
                className="flex w-full cursor-not-allowed items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 opacity-60"
              >
                <span className="text-sm font-semibold text-slate-400">
                  {dict.header.walletConnect}
                </span>
                <span className="text-[10px] text-slate-400">
                  {dict.header.unavailable}
                </span>
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 text-center text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
            >
              {dict.header.cancel}
            </button>
          </div>
        </div>
      )}
    </>
  );
}