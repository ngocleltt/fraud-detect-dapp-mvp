"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, Search, PlusCircle, HelpCircle } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OverviewView from "./components/OverviewView";
import AuditView from "./components/AuditView";
import SimulateView from "./components/SimulateView";
import HowItWorksView from "./components/HowItWorksView";
import { dictionaries, type Locale } from "./locales";
import { saveCID } from "./utils/contract";

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

interface SimulateFormData {
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

type MenuKey = "overview" | "audit" | "simulate" | "how-it-works";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const dict = dictionaries[locale];

  const [currentMenu, setCurrentMenu] = useState<MenuKey>("overview");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "SAFE" | "SUSPICIOUS">("ALL");
  const [walletState, setWalletState] = useState({
    isConnected: false,
    address: "",
  });
  const [users, setUsers] = useState<UserRow[]>([]);
  const [terminalLogs, setTerminalLogs] = useState<LogEntry[]>([
    { timestamp: "00:00:01", message: dictionaries.en.logs.systemReady },
    { timestamp: "00:00:02", message: dictionaries.en.logs.ipfsReady },
    { timestamp: "00:00:03", message: dictionaries.en.logs.modelReady },
  ]);

  const getCurrentTimeString = () => {
    return new Date().toLocaleTimeString(
      locale === "vi" ? "vi-VN" : locale === "ru" ? "ru-RU" : "en-US"
    );
  };

  useEffect(() => {
    setTerminalLogs([
      { timestamp: "00:00:01", message: dict.logs.systemReady },
      { timestamp: "00:00:02", message: dict.logs.ipfsReady },
      { timestamp: "00:00:03", message: dict.logs.modelReady },
    ]);
  }, [locale, dict.logs]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/users");

        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || []);
          setTerminalLogs((prev) => [
            ...prev,
            {
              timestamp: getCurrentTimeString(),
              message: dict.logs.fetchedRecords(data.users?.length || 0),
            },
          ]);
        } else {
          setTerminalLogs((prev) => [
            ...prev,
            {
              timestamp: getCurrentTimeString(),
              message: dict.logs.fetchFailed(res.status),
            },
          ]);
        }
      } catch (error) {
        setTerminalLogs((prev) => [
          ...prev,
          {
            timestamp: getCurrentTimeString(),
            message: dict.logs.backendTimeout,
          },
        ]);
        console.error(error);
      }
    };

    loadUsers();
  }, [locale, dict.logs]);

  const handleConnectWallet = () => {
    setWalletState({
      isConnected: true,
      address: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    });
    setTerminalLogs((prev) => [
      ...prev,
      {
        timestamp: getCurrentTimeString(),
        message: dict.logs.walletConnected,
      },
    ]);
  };

  const handleDisconnectWallet = () => {
    setWalletState({ isConnected: false, address: "" });
    setTerminalLogs((prev) => [
      ...prev,
      {
        timestamp: getCurrentTimeString(),
        message: dict.logs.walletDisconnected,
      },
    ]);
  };

  const handleAuditSearch = async (id: string): Promise<UserRow | null> => {
    setTerminalLogs((prev) => [
      ...prev,
      {
        timestamp: getCurrentTimeString(),
        message: dict.logs.auditSearching(id),
      },
    ]);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/users/${encodeURIComponent(id)}`
      );

      if (res.ok) {
        const data = await res.json();
        setTerminalLogs((prev) => [
          ...prev,
          {
            timestamp: getCurrentTimeString(),
            message: dict.logs.auditFound(data.user_id, data.classification),
          },
        ]);
        return data as UserRow;
      }

      if (res.status === 404) {
        setTerminalLogs((prev) => [
          ...prev,
          {
            timestamp: getCurrentTimeString(),
            message: dict.logs.auditNotFound(id),
          },
        ]);
      }
    } catch (error) {
      setTerminalLogs((prev) => [
        ...prev,
        {
          timestamp: getCurrentTimeString(),
          message: dict.logs.auditBroken,
        },
      ]);
      console.error(error);
    }

    return null;
  };

  const handleSimulateSubmit = async (rawFormData: SimulateFormData) => {
    const apiPayload = {
      user_id: rawFormData.user_id,
      target_address: rawFormData.target_address,
      features: {
        total_erc20_tnxs: rawFormData.total_erc20_tnxs,
        erc20_uniq_rec_contract_addr: rawFormData.erc20_uniq_rec_contract_addr,
        erc20_uniq_rec_token_name: rawFormData.erc20_uniq_rec_token_name,
        erc20_uniq_rec_addr: rawFormData.erc20_uniq_rec_addr,
        time_diff_mins: rawFormData.time_diff_mins,
        total_ether_received: rawFormData.total_ether_received,
        avg_min_between_rec: rawFormData.avg_min_between_rec,
        avg_val_received: rawFormData.avg_val_received,
        total_transactions_incl_create: rawFormData.total_transactions_incl_create,
        unique_received_from_addresses:
          rawFormData.unique_received_from_addresses,
      },
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      if (res.ok) {
        const freshUser = await res.json();
        console.log("Full freshUser:", freshUser);
        const cid = freshUser.ipfs_cid;
        console.log("CID from backend:", cid);
        if (cid && cid.trim() !== "") {
          try {
            const reason = `Simulate at ${new Date().toISOString()}`;
            const txHash = await saveCID(cid, reason);
            console.log("Blockchain success, tx:", txHash);
          } catch (err) {
            console.error("Blockchain error:", err);
          }
        }
        setUsers((prev) => [freshUser, ...prev]);
        setTerminalLogs((prev) => [
          ...prev,
          {
            timestamp: getCurrentTimeString(),
            message: dict.logs.simApproved(freshUser.classification),
          },
        ]);
        setCurrentMenu("overview");
        return;
      }

      setTerminalLogs((prev) => [
        ...prev,
        {
          timestamp: getCurrentTimeString(),
          message: dict.logs.simFailed(res.status),
        },
      ]);
    } catch (error) {
      setTerminalLogs((prev) => [
        ...prev,
        {
          timestamp: getCurrentTimeString(),
          message: dict.logs.simBroken,
        },
      ]);
      console.error(error);
    }
  };

  const navItems: {
    key: MenuKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { key: "overview", label: dict.nav.overview, icon: LayoutDashboard },
    { key: "audit", label: dict.nav.audit, icon: Search },
    { key: "simulate", label: dict.nav.simulate, icon: PlusCircle },
    { key: "how-it-works", label: dict.nav.howItWorks, icon: HelpCircle },
  ];

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-800">
      <Header
        isConnected={walletState.isConnected}
        walletAddress={walletState.address}
        onConnect={handleConnectWallet}
        onDisconnect={handleDisconnectWallet}
        locale={locale}
        dict={dict}
        onChangeLocale={setLocale}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block">
          <div className="sticky top-0 flex h-full flex-col p-4">
            <div className="mb-3 px-3 text-[10px] font-bold tracking-widest text-slate-400">
              {dict.nav.navigation}
            </div>

            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentMenu === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => setCurrentMenu(item.key)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${
                      active
                        ? "border border-blue-100 bg-blue-50 text-blue-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {dict.language.label}
              </p>
              <div className="mt-3 flex gap-2">
                {(["en", "vi", "ru"] as Locale[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLocale(lang)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      locale === lang
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {dict.language[lang]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {dict.session.title}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                {walletState.isConnected
                  ? dict.session.walletLinked
                  : dict.session.walletOffline}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {dict.session.description}
              </p>
            </div>
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {currentMenu === "overview" && (
              <OverviewView
                users={users}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                terminalLogs={terminalLogs}
                dict={dict}
                locale={locale}
              />
            )}

            {currentMenu === "audit" && (
              <AuditView onSearch={handleAuditSearch} dict={dict} locale={locale} />
            )}

            {currentMenu === "simulate" && (
              <SimulateView
                onSimulate={handleSimulateSubmit}
                dict={dict}
                locale={locale}
              />
            )}

            {currentMenu === "how-it-works" && (
              <HowItWorksView dict={dict} locale={locale} />
            )}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}