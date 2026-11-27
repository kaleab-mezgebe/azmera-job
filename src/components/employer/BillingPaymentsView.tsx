"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import { MOCK_PRICING_PACKAGES, MOCK_PAYMENT_GATEWAYS } from "@/data/mockData";
import { PricingPackage, PaymentTransaction } from "@/types";
import { exportTransactionsCsv, openPrintableVatInvoice } from "@/lib/invoice";
import {
  CreditCard,
  Wallet,
  Receipt,
  Download,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Plus,
  Sparkles,
  Building,
  Smartphone,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function BillingPaymentsView() {
  const { transactions, openPaymentModal, showToast, company, lang } = useApp();

  const [selectedTab, setSelectedTab] = useState<"packages" | "transactions" | "gateways">("packages");
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentTransaction | null>(null);

  const totalSpent = transactions.reduce((acc, t) => acc + t.amount, 0);

  const handlePurchasePackage = (pkg: PricingPackage) => {
    openPaymentModal({
      amount: pkg.price,
      purpose:
        pkg.id === "pkg-standard"
          ? "job_post_standard"
          : pkg.id === "pkg-featured"
          ? "job_post_featured"
          : pkg.id === "pkg-broadcast"
          ? "social_broadcast"
          : "employer_subscription",
      purposeLabel: lang === "am" ? pkg.amharicName : pkg.name,
      title: `Subscribe to ${pkg.name}`,
      description: pkg.description,
      metadata: {
        packageId: pkg.id,
        packageName: pkg.name,
      },
      onSuccess: (tx) => {
        showToast(`${pkg.name} activated successfully for ${company.name}!`, "success");
      },
    });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-black uppercase tracking-wider">
              Monetization & Billing Center
            </span>
            <span className="text-xs text-slate-400 font-bold">• Ethiopian Birr (ETB)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            {t(lang, "billingTitle")}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your hiring credits, vacancy promotions, and instant payments via Telebirr, CBE Bank, and M-Pesa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handlePurchasePackage(MOCK_PRICING_PACKAGES[1])}
            className="px-5 py-3 rounded-2xl bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold shadow-md shadow-[#0A2540]/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Zap className="w-4 h-4 text-[#F59E0B] dark:text-[#0A2540]" />
            <span>Top-up / Post Featured Job (1,500 ETB)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Investment */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Spent</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
              ETB
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black mt-2 text-slate-900 dark:text-white">
            {totalSpent.toLocaleString()}{" "}
            <span className="text-xs font-bold text-slate-400">ETB</span>
          </div>
          <span className="text-[11px] font-semibold flex items-center gap-1 mt-1 text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" /> 100% Tax Compliant with VAT
          </span>
        </div>

        {/* Active Promoted Posts */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Active Featured Jobs</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#F59E0B] flex items-center justify-center font-bold text-xs">
              🔥
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black mt-2 text-slate-900 dark:text-white">
            3 Vacancies
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
            Pinned to search & Telegram
          </span>
        </div>

        {/* 14-Day Guarantee Seal */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Staff Guarantee</span>
            <div className="w-9 h-9 rounded-xl bg-[#0A2540]/10 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black mt-2 text-slate-900 dark:text-white">
            14 Days
          </div>
          <span className="text-[11px] font-semibold text-[#0A2540] dark:text-[#F59E0B] mt-1 block">
            Free staff replacement
          </span>
        </div>

        {/* Supported Channels */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Payment Channels</span>
            <div className="w-9 h-9 rounded-xl bg-[#0A2540]/10 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center font-bold text-xs">
              <Smartphone className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-extrabold mt-2 text-slate-900 dark:text-white flex items-center gap-1.5">
            <span className="text-[#00843D]">Telebirr</span> • <span className="text-[#8A1538]">CBE</span> • <span className="text-[#00B04F]">M-Pesa</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">
            Instant automated confirmation
          </span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedTab("packages")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            selectedTab === "packages"
              ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          {t(lang, "packagesTab")}
        </button>
        <button
          onClick={() => setSelectedTab("gateways")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            selectedTab === "gateways"
              ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          {t(lang, "gatewaysTab")} (Telebirr • CBE • M-Pesa)
        </button>
        <button
          onClick={() => setSelectedTab("transactions")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            selectedTab === "transactions"
              ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          {t(lang, "transactionsTab")} ({transactions.length})
        </button>
      </div>

      {/* SECTION 1: PACKAGES & PRICING */}
      {selectedTab === "packages" && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Transparent ETB Packages for Top Employers
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Zero hidden fees. Every vacancy includes applicant filtering, Telegram alert synchronization, and 14-day candidate replacement protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative border ${
                  pkg.recommended
                    ? "bg-white dark:bg-[#101E33] border-amber-400 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/30"
                    : "bg-white dark:bg-[#101E33] border-slate-200 dark:border-slate-800 shadow-xs"
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black rounded-full shadow-md uppercase tracking-wide">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white mt-0.5">
                      {lang === "am" ? pkg.amharicName : pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                        {pkg.price.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        ETB
                      </span>
                      <span className="text-[10px] text-slate-400 ml-auto font-semibold">
                        / {pkg.billingPeriod}
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 text-xs">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handlePurchasePackage(pkg)}
                    className={`w-full py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      pkg.recommended
                        ? "bg-[#F59E0B] hover:bg-[#D97706] text-[#0A2540] shadow-md shadow-[#F59E0B]/20"
                        : "bg-[#0A2540] hover:bg-[#07192C] text-white dark:bg-slate-800 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span>Pay {pkg.price.toLocaleString()} ETB</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-slate-400 font-semibold mt-2">
                    Pay via Telebirr • CBE • M-Pesa
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: PAYMENT GATEWAYS OVERVIEW */}
      {selectedTab === "gateways" && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Official Supported Payment Gateways in Ethiopia
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Azmera Jobs supports all 3 primary digital transaction systems in Ethiopia with automated receipt issuance and instant account crediting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_PAYMENT_GATEWAYS.map((gateway) => (
              <div
                key={gateway.id}
                className="bg-white dark:bg-[#101E33] rounded-3xl p-6 border shadow-xs flex flex-col justify-between space-y-5"
                style={{ borderColor: gateway.color + "40" }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-xl text-white font-extrabold text-xs"
                      style={{ backgroundColor: gateway.color }}
                    >
                      {gateway.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {gateway.operator}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-base text-slate-900 dark:text-white">
                      {lang === "am" ? gateway.amharicName : gateway.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {gateway.description}
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Merchant Name:</span>
                      <strong className="text-slate-900 dark:text-white text-right">
                        {gateway.merchantName}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        {gateway.id === "cbe" ? "Account Number:" : "Merchant ID / Shortcode:"}
                      </span>
                      <strong className="font-mono font-bold" style={{ color: gateway.color }}>
                        {gateway.accountNumber || gateway.merchantId}
                      </strong>
                    </div>
                    {gateway.shortCode && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">USSD Code:</span>
                        <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono font-bold">
                          {gateway.shortCode}
                        </code>
                      </div>
                    )}
                  </div>

                  {/* Step by step */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Payment Instructions:
                    </span>
                    <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      {gateway.steps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() =>
                      openPaymentModal({
                        amount: 1500,
                        purpose: "job_post_featured",
                        purposeLabel: `Demo Payment via ${gateway.name}`,
                        title: `Instant ${gateway.name} Gateway Simulation`,
                        metadata: { method: gateway.id },
                      })
                    }
                    className="w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.01]"
                    style={{ backgroundColor: gateway.color }}
                  >
                    <span>Test {gateway.name} Payment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: TRANSACTIONS & OFFICIAL VAT INVOICES */}
      {selectedTab === "transactions" && (
        <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Transaction History & Verified E-Receipts
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                All receipts carry official Ethiopian tax compliance and 14-day replacement guarantees.
              </p>
            </div>
            <button
              onClick={() => {
                exportTransactionsCsv(transactions);
                showToast("Exported transactions CSV!", "success");
              }}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Invoice #</th>
                  <th className="p-4">Service & Purpose</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Bank Ref Code</th>
                  <th className="p-4">Amount (ETB)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      {tx.invoiceNumber}
                      <span className="block text-[10px] text-slate-400 font-normal">{tx.createdAt}</span>
                    </td>
                    <td className="p-4">
                      <strong className="text-slate-900 dark:text-white block">{tx.purposeLabel}</strong>
                      <span className="text-[10px] text-slate-500">{tx.companyName || company.name}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-white ${
                          tx.method === "telebirr"
                            ? "bg-[#00843D]"
                            : tx.method === "cbe"
                            ? "bg-[#8A1538]"
                            : "bg-[#00B04F]"
                        }`}
                      >
                        {tx.method === "telebirr" ? "telebirr" : tx.method === "cbe" ? "CBE Bank" : "M-Pesa"}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-600 dark:text-slate-400 font-bold">
                      {tx.referenceNumber}
                    </td>
                    <td className="p-4 font-black text-slate-900 dark:text-white text-sm">
                      {tx.amount.toLocaleString()} ETB
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedReceipt(tx)}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-[#0A2540] hover:text-white dark:hover:bg-[#F59E0B] dark:hover:text-[#0A2540] rounded-xl text-slate-700 dark:text-slate-300 font-bold transition-colors cursor-pointer"
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-[#F59E0B] flex items-center justify-center">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Azmera Verified Tax E-Receipt
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedReceipt.invoiceNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <strong className="text-slate-900 dark:text-white text-right">
                  {selectedReceipt.purposeLabel}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Channel:</span>
                <strong className="uppercase text-slate-900 dark:text-white">
                  {selectedReceipt.method}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reference FT / TX:</span>
                <strong className="font-mono text-emerald-600">
                  {selectedReceipt.referenceNumber}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date Issued:</span>
                <span className="font-semibold">{selectedReceipt.createdAt}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm">
                <span className="font-bold">Total Paid:</span>
                <strong className="font-black text-emerald-600 text-base">
                  {selectedReceipt.amount.toLocaleString()} ETB
                </strong>
              </div>
            </div>

            <div className="p-3 bg-amber-50/70 dark:bg-slate-800/70 rounded-xl border border-amber-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Includes 14-Day Free Candidate Replacement Guarantee.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  const opened = openPrintableVatInvoice(selectedReceipt);
                  showToast(
                    opened
                      ? "VAT receipt opened — select 'Save as PDF' to save."
                      : "VAT receipt saved to downloads.",
                    "success"
                  );
                  setSelectedReceipt(null);
                }}
                className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
