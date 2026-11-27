"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Sparkles,
  Zap,
  Users,
  Briefcase,
  CreditCard,
  Globe2,
  ChevronUp,
  ChevronDown,
  X,
  Check,
  Send,
  Building,
  Smartphone,
  ExternalLink,
} from "lucide-react";

export default function FeatureGuideDock() {
  const {
    role,
    setRole,
    currentUser,
    switchSession,
    logout,
    tab,
    setTab,
    lang,
    setLang,
    theme,
    toggleTheme,
    openPaymentModal,
    showToast,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 lg:bottom-5 right-4 lg:right-5 z-40">
      {/* Expanded Modal / Drawer */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm max-h-[75vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#101E33] border border-slate-200 dark:border-slate-700 shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Azmera Quick Workspace
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Persona Switcher */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Switch Role View
            </span>
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              {[
                { id: "guest", label: "Visitor" },
                { id: "seeker", label: "Seeker" },
                { id: "employer", label: "Employer" },
                { id: "admin", label: "Admin" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    if (p.id === "guest") logout();
                    else switchSession(p.id as any);
                  }}
                  className={`py-1.5 px-1.5 rounded-xl text-[11px] font-bold transition-all text-center cursor-pointer ${
                    role === p.id
                      ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-1.5 text-xs">
            <button
              onClick={() => {
                openPaymentModal({
                  amount: 1500,
                  purpose: "job_post_featured",
                  purposeLabel: "Featured Vacancy (Telebirr • CBE • M-Pesa)",
                  title: "Ethiopian Mobile Payment Checkout",
                });
              }}
              className="w-full p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-bold flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>Telebirr / CBE / M-Pesa Checkout</span>
              </div>
              <span className="text-[10px] bg-emerald-200 dark:bg-emerald-900 px-1.5 py-0.5 rounded font-black">
                1,500 ETB
              </span>
            </button>

            <button
              onClick={() => {
                switchSession("employer");
                setTab("talent-sourcing");
                setIsOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-[#0A2540] dark:text-white font-bold flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#F59E0B]" />
                <span>Candidate Talent Directory</span>
              </div>
              <span className="text-[10px] bg-[#0A2540] text-[#F59E0B] px-1.5 py-0.5 rounded font-black">
                Verified
              </span>
            </button>

            <button
              onClick={() => {
                setTab("messages");
                setIsOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 font-bold flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Direct Messages</span>
              </div>
              <span className="text-[10px] bg-amber-200 dark:bg-amber-900 px-1.5 py-0.5 rounded font-black">
                Live
              </span>
            </button>

            <a
              href="https://t.me/AzmeraJobConnect"
              target="_blank"
              rel="noreferrer"
              className="w-full p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-300 font-bold flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-sky-600" />
                <span>@AzmeraJobConnect Channel</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
            </a>
          </div>

          {/* Language & Theme Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-slate-400" />
              {["en", "am", "om", "ti"].map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setLang(code as any);
                    showToast(`Language set to ${code.toUpperCase()}`);
                  }}
                  className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] cursor-pointer ${
                    lang === code
                      ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540]"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="text-[11px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-2.5 rounded-full bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] font-black text-xs shadow-xl shadow-[#0A2540]/25 flex items-center gap-2 border border-[#F59E0B]/60 cursor-pointer transition-transform hover:scale-105"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] dark:text-[#0A2540]" />
        <span className="hidden sm:inline">Quick Switch</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
