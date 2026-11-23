"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  User,
  Building2,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Search,
} from "lucide-react";

export default function RoleSelectionView() {
  const { setRole, setTab } = useApp();
  const [selected, setSelected] = useState<"seeker" | "employer">("seeker");

  const handleContinue = () => {
    // Save selected role and navigate to registration
    setRole(selected);
    setTab("register");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12 theme-bg">
      <div className="w-full max-w-2xl rounded-3xl border p-6 sm:p-10 shadow-lg" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 text-[#0A2540] dark:text-[#FBBF24] border border-[#0A2540]/15 dark:border-[#F59E0B]/30 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Join Azmera Jobs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            How do you plan to use Azmera Jobs?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Select your account type to personalize your experience. You can easily
            switch views at any time.
          </p>
        </div>

        {/* The Two Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {/* Option 1: Job Seeker */}
          <div
            onClick={() => setSelected("seeker")}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative bg-white dark:bg-[#101E33] ${
              selected === "seeker"
                ? "border-[#0A2540] dark:border-[#F59E0B] shadow-xl shadow-[#0A2540]/8 dark:shadow-black/50 ring-4 ring-[#0A2540]/5 dark:ring-[#F59E0B]/15"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-85 hover:opacity-100"
            }`}
          >
            {selected === "seeker" && (
              <span className="absolute -top-3 right-6 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0A2540] text-white dark:bg-[#F59E0B] dark:text-[#0A2540] shadow-xs">
                Selected
              </span>
            )}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    selected === "seeker"
                      ? "bg-[#0A2540] text-[#F59E0B] shadow-md shadow-[#0A2540]/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <User className="w-6 h-6" />
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === "seeker"
                      ? "border-[#0A2540] dark:border-[#F59E0B] bg-[#0A2540] dark:bg-[#F59E0B]"
                      : "border-slate-300 dark:border-slate-600 bg-transparent"
                  }`}
                >
                  {selected === "seeker" && (
                    <div className="w-2 h-2 rounded-full bg-white dark:bg-[#0A2540]" />
                  )}
                </div>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                I am looking for a job
              </h3>
              <p className="text-xs mt-1.5 leading-relaxed text-slate-500 dark:text-slate-400">
                Explore thousands of verified vacancies, build your professional CV, and
                apply directly to top Ethiopian employers.
              </p>

              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {[
                  "Free candidate profile",
                  "ETB salary transparency",
                  "Application status tracking",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[11px] font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Option 2: Employer */}
          <div
            onClick={() => setSelected("employer")}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between relative bg-white dark:bg-[#101E33] ${
              selected === "employer"
                ? "border-[#0A2540] dark:border-[#F59E0B] shadow-xl shadow-[#0A2540]/8 dark:shadow-black/50 ring-4 ring-[#0A2540]/5 dark:ring-[#F59E0B]/15"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-85 hover:opacity-100"
            }`}
          >
            {selected === "employer" && (
              <span className="absolute -top-3 right-6 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0A2540] text-white dark:bg-[#F59E0B] dark:text-[#0A2540] shadow-xs">
                Selected
              </span>
            )}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    selected === "employer"
                      ? "bg-[#0A2540] text-[#F59E0B] shadow-md shadow-[#0A2540]/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <Building2 className="w-6 h-6" />
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === "employer"
                      ? "border-[#0A2540] dark:border-[#F59E0B] bg-[#0A2540] dark:bg-[#F59E0B]"
                      : "border-slate-300 dark:border-slate-600 bg-transparent"
                  }`}
                >
                  {selected === "employer" && (
                    <div className="w-2 h-2 rounded-full bg-white dark:bg-[#0A2540]" />
                  )}
                </div>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                I want to hire employees
              </h3>
              <p className="text-xs mt-1.5 leading-relaxed text-slate-500 dark:text-slate-400">
                Post job openings, screen qualified Ethiopian candidates, review CVs, and
                schedule interviews with ease.
              </p>

              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {[
                  "Verified company badge",
                  "Rich applicant pipeline",
                  "Built-in interview tool",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[11px] font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleContinue}
            className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] dark:text-[#0A2540] shadow-lg shadow-[#0A2540]/20 dark:shadow-[#F59E0B]/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
          >
            <span>Continue as {selected === "seeker" ? "Job Seeker" : "Employer"}</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B] dark:text-[#0A2540]" />
          </button>

          <div className="text-center">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Already have an account? </span>
            <button
              onClick={() => setTab("signin")}
              className="text-xs font-bold text-[#F59E0B] hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
