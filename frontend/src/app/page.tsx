"use client";

import { useState } from "react";
import { LayoutDashboard, Search, PlusCircle, Activity } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface UserRow {
  userId: string;
  walletAddress: string;
  totalErc20Txs: number;
  erc20UniqRecContractAddr: number;
  erc20UniqRecTokenName: number;
  erc20UniqRecAddr: number;
  timeDiffFirstLastMins: number;
  totalEtherReceived: number;
  avgMinBetweenReceivedTx: number;
  avgValReceived: number;
  totalTransactions: number;
  uniqueReceivedFromAddrs: number;
  riskScore: number;
  status: "SAFE" | "SUSPICIOUS";
}

export default function Home() {
  const [currentMenu, setCurrentMenu] = useState("overview");
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<UserRow | null>(null);

  const [formData, setFormData] = useState({
    userId: "",
    walletAddress: "",
    totalErc20Txs: 0,
    erc20UniqRecContractAddr: 0,
    erc20UniqRecTokenName: 0,
    erc20UniqRecAddr: 0,
    timeDiffFirstLastMins: 0,
    totalEtherReceived: 0,
    avgMinBetweenReceivedTx: 0,
    avgValReceived: 0,
    totalTransactions: 0,
    uniqueReceivedFromAddrs: 0,
  });

  const [users, setUsers] = useState<UserRow[]>([
    {
      userId: "User_01",
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      totalErc20Txs: 45,
      erc20UniqRecContractAddr: 12,
      erc20UniqRecTokenName: 8,
      erc20UniqRecAddr: 15,
      timeDiffFirstLastMins: 14400,
      totalEtherReceived: 25.45,
      avgMinBetweenReceivedTx: 320.5,
      avgValReceived: 1.25,
      totalTransactions: 60,
      uniqueReceivedFromAddrs: 18,
      riskScore: 12.5,
      status: "SAFE"
    },
    {
      userId: "User_02",
      walletAddress: "0x3194c23C31ec41B72dcECB7A7079207e37E74C4B",
      totalErc20Txs: 850,
      erc20UniqRecContractAddr: 1,
      erc20UniqRecTokenName: 1,
      erc20UniqRecAddr: 1,
      timeDiffFirstLastMins: 120,
      totalEtherReceived: 1500.0,
      avgMinBetweenReceivedTx: 0.45,
      avgValReceived: 150.0,
      totalTransactions: 900,
      uniqueReceivedFromAddrs: 1,
      riskScore: 94.82,
      status: "SUSPICIOUS"
    }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = users.find(u => u.userId.toLowerCase() === searchId.toLowerCase() || u.walletAddress.toLowerCase() === searchId.toLowerCase());
    setSearchResult(found || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "userId" || name === "walletAddress" ? value : Number(value)
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId || !formData.walletAddress) return;

    const calculatedRisk = formData.avgMinBetweenReceivedTx < 5 && formData.avgValReceived > 50 ? 89.5 : 15.4;
    const determinedStatus = calculatedRisk > 50 ? "SUSPICIOUS" : "SAFE";

    const newUser: UserRow = {
      ...formData,
      riskScore: calculatedRisk,
      status: determinedStatus
    };

    setUsers(prev => [newUser, ...prev]);
    setFormData({
      userId: "",
      walletAddress: "",
      totalErc20Txs: 0,
      erc20UniqRecContractAddr: 0,
      erc20UniqRecTokenName: 0,
      erc20UniqRecAddr: 0,
      timeDiffFirstLastMins: 0,
      totalEtherReceived: 0,
      avgMinBetweenReceivedTx: 0,
      avgValReceived: 0,
      totalTransactions: 0,
      uniqueReceivedFromAddrs: 0,
    });
    setCurrentMenu("overview");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      <Header />

      <div className="flex flex-1">
        <aside className="w-64 border-r border-slate-200 p-4 space-y-1 bg-white">
          <div className="text-[10px] font-bold text-slate-400 tracking-widest px-3 mb-3">NAVIGATION</div>
          <button
            onClick={() => setCurrentMenu("overview")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${currentMenu === "overview" ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard Overview
          </button>
          <button
            onClick={() => setCurrentMenu("audit")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${currentMenu === "audit" ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
          >
            <Search className="w-4 h-4" />
            Account Audit
          </button>
          <button
            onClick={() => setCurrentMenu("simulate")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${currentMenu === "simulate" ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}
          >
            <PlusCircle className="w-4 h-4" />
            Simulate Transaction
          </button>
        </aside>

        <main className="flex-1 p-6 overflow-hidden">
          {currentMenu === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="text-blue-600 w-5 h-5" />
                  <h2 className="text-sm font-bold tracking-wider text-slate-700">PRE-EVALUATED CONTRACT DATASET (BATCH MODE)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                        <th className="p-3">User ID</th>
                        <th className="p-3">Total ERC20 Tx</th>
                        <th className="p-3">Uniq Contract</th>
                        <th className="p-3">Uniq Token</th>
                        <th className="p-3">Uniq RecAddr</th>
                        <th className="p-3">Time Diff (Mins)</th>
                        <th className="p-3">Total ETH Rec</th>
                        <th className="p-3">Avg Min Rec</th>
                        <th className="p-3">Avg Val Rec</th>
                        <th className="p-3">Total Txs</th>
                        <th className="p-3">Uniq From</th>
                        <th className="p-3 text-right">Risk Score</th>
                        <th className="p-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map((user, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors font-mono text-slate-600">
                          <td className="p-3 text-blue-600 font-sans font-semibold">{user.userId}</td>
                          <td className="p-3">{user.totalErc20Txs}</td>
                          <td className="p-3">{user.erc20UniqRecContractAddr}</td>
                          <td className="p-3">{user.erc20UniqRecTokenName}</td>
                          <td className="p-3">{user.erc20UniqRecAddr}</td>
                          <td className="p-3">{user.timeDiffFirstLastMins}</td>
                          <td className="p-3">{user.totalEtherReceived}</td>
                          <td className="p-3">{user.avgMinBetweenReceivedTx}</td>
                          <td className="p-3">{user.avgValReceived}</td>
                          <td className="p-3">{user.totalTransactions}</td>
                          <td className="p-3">{user.uniqueReceivedFromAddrs}</td>
                          <td className={`p-3 text-right font-bold ${user.status === "SUSPICIOUS" ? "text-rose-600" : "text-emerald-600"}`}>{user.riskScore}%</td>
                          <td className="p-3 text-center">
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${user.status === "SUSPICIOUS" ? "bg-rose-50 text-rose-600 border border-rose-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {currentMenu === "audit" && (
            <div className="space-y-6 animate-fadeIn max-w-4xl">
              <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="text-blue-600 w-5 h-5" />
                  <h2 className="text-sm font-bold tracking-wider text-slate-700">INDIVIDUAL ACCOUNT AUDIT</h2>
                </div>
                <form onSubmit={handleSearch} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter User ID or Wallet Address (e.g., User_01)..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-slate-700 transition-colors"
                  />
                  <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Audit
                  </button>
                </form>

                {searchResult ? (
                  <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="col-span-2">
                      <p className="text-xs text-slate-400 mb-1">Target Identity</p>
                      <p className="text-sm font-mono text-blue-600 truncate font-semibold">{searchResult.userId} ({searchResult.walletAddress})</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">AI Risk Score</p>
                      <p className={`text-sm font-bold ${searchResult.status === "SUSPICIOUS" ? "text-rose-600" : "text-emerald-600"}`}>{searchResult.riskScore}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Security Status</p>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-1 ${searchResult.status === "SUSPICIOUS" ? "bg-rose-50 text-rose-600 border border-rose-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
                        {searchResult.status}
                      </span>
                    </div>
                  </div>
                ) : searchId && (
                  <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-600 font-mono">
                    Identity not found in the pre-evaluated dataset registry.
                  </div>
                )}
              </section>
            </div>
          )}

          {currentMenu === "simulate" && (
            <div className="animate-fadeIn max-w-2xl">
              <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <PlusCircle className="text-blue-600 w-5 h-5" />
                  <h2 className="text-sm font-bold tracking-wider text-slate-700">SIMULATE REAL-TIME TRANSACTION</h2>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">User ID</label>
                      <input type="text" name="userId" value={formData.userId} onChange={handleInputChange} placeholder="e.g., User_03" className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">Wallet Address</label>
                      <input type="text" name="walletAddress" value={formData.walletAddress} onChange={handleInputChange} placeholder="0x..." className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Total ERC20 Transactions</label>
                    <input type="number" name="totalErc20Txs" value={formData.totalErc20Txs} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">Uniq Contract</label>
                      <input type="number" name="erc20UniqRecContractAddr" value={formData.erc20UniqRecContractAddr} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">Uniq Token</label>
                      <input type="number" name="erc20UniqRecTokenName" value={formData.erc20UniqRecTokenName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">Uniq RecAddr</label>
                      <input type="number" name="erc20UniqRecAddr" value={formData.erc20UniqRecAddr} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">Time Diff (Mins)</label>
                      <input type="number" name="timeDiffFirstLastMins" value={formData.timeDiffFirstLastMins} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">Total Ether Received</label>
                      <input type="number" step="any" name="totalEtherReceived" value={formData.totalEtherReceived} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">Avg Min Between Rec</label>
                      <input type="number" step="any" name="avgMinBetweenReceivedTx" value={formData.avgMinBetweenReceivedTx} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">Avg Val Received (ETH)</label>
                      <input type="number" step="any" name="avgValReceived" value={formData.avgValReceived} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">Total Transactions</label>
                      <input type="number" name="totalTransactions" value={formData.totalTransactions} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">Unique From Addrs</label>
                      <input type="number" name="uniqueReceivedFromAddrs" value={formData.uniqueReceivedFromAddrs} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                  </div>
                  <button type="submit" className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 rounded text-sm transition-all shadow-md shadow-blue-500/10">
                    Push Transaction Flow
                  </button>
                </form>
              </section>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}