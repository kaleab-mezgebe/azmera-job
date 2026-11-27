"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import {
  Mail,
  Lock,
  ArrowRight,
  User,
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function SignInView() {
  const { authenticateCredentials, setTab, showToast, lang } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState<"seeker" | "employer" | "admin">("seeker");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await authenticateCredentials(email, password, userRole);
    setSubmitting(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12 theme-bg">
      <div className="w-full max-w-md rounded-3xl border p-6 sm:p-8 shadow-lg" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center mx-auto mb-3 border border-slate-200 dark:border-slate-700">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t(lang, "welcomeBack")}</h1>
          <p className="text-xs mt-1 text-slate-500 dark:text-slate-400">
            {t(lang, "signInSubtitle")}
          </p>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1" style={{ color: "var(--text)" }}>
              Account Identity
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
              <button
                type="button"
                onClick={() => setUserRole("seeker")}
                className={`py-2 text-xs rounded-lg transition-all font-bold ${userRole === "seeker"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                {t(lang, "jobSeeker")}
              </button>
              <button
                type="button"
                onClick={() => setUserRole("employer")}
                className={`py-2 text-xs rounded-lg transition-all font-bold ${userRole === "employer"
                    ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                {t(lang, "employer")}
              </button>
              <button
                type="button"
                onClick={() => setUserRole("admin")}
                className={`py-2 text-xs rounded-lg transition-all font-bold ${userRole === "admin"
                    ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                Admin
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
              Email or Ethiopian Phone (+251)
            </label>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B] focus-within:bg-white dark:focus-within:bg-[#101E33] focus-within:ring-2 focus-within:ring-[#0A2540]/10 dark:focus-within:ring-[#F59E0B]/20 transition-all">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com or 0911..."
                className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none shadow-none focus:shadow-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-900 dark:text-white">Password</label>
              <button
                type="button"
                onClick={() => setTab("forgot-password")}
                className="text-[11px] font-bold text-[#F59E0B] hover:underline cursor-pointer"
              >
                {t(lang, "forgotPasswordQuestion")}
              </button>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B] focus-within:bg-white dark:focus-within:bg-[#101E33] focus-within:ring-2 focus-within:ring-[#0A2540]/10 dark:focus-within:ring-[#F59E0B]/20 transition-all">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none shadow-none focus:shadow-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-[#E2E8F0] text-[#0A2540] focus:ring-[#F59E0B]"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-white bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] dark:text-[#0A2540] shadow-md shadow-[#0A2540]/20 dark:shadow-[#F59E0B]/20 border border-[#F59E0B]/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
          >
            <span>{submitting ? "Signing in..." : t(lang, "signIn")}</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B] dark:text-[#0A2540]" />
          </button>

          <button
            type="button"
            onClick={() => showToast("Google OAuth is not configured yet. Sign in with your email and password.", "info")}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span className="font-black text-sm">G</span>
            <span>{t(lang, "continueWithGoogle")}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E2E8F0] dark:border-[#1E334D] text-center">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{t(lang, "noAccountYet")} </span>
          <button
            onClick={() => setTab("role-selection")}
            className="text-xs font-bold text-[#F59E0B] hover:underline cursor-pointer"
          >
            {t(lang, "registerNow")}
          </button>
        </div>
      </div>
    </div>
  );
}
