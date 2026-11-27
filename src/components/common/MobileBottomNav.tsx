"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import {
  LayoutDashboard, Search, FileCheck2, Bookmark, User,
  Briefcase, Users, PlusCircle, Building2, LogIn, Home,
  ShieldCheck, CheckCircle2, CreditCard,
} from "lucide-react";

export default function MobileBottomNav() {
  const { role, tab, setTab, lang, savedJobIds, applications } = useApp();

  const btnStyle = (active: boolean) => ({
    color: active ? "var(--primary)" : "var(--text-muted)",
  });

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t px-2 pt-1.5 pb-safe flex items-center justify-around shadow-lg"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {role === "admin" ? (
        <>
          <button onClick={() => setTab("admin-dashboard")} style={btnStyle(tab === "admin-dashboard")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <LayoutDashboard className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "adminConsole")}</span>
          </button>
          <button onClick={() => setTab("admin-approvals")} style={btnStyle(tab === "admin-approvals")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <CheckCircle2 className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "jobApprovals")}</span>
          </button>
          <button onClick={() => setTab("admin-payments")} style={btnStyle(tab === "admin-payments")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <CreditCard className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "paymentAudit")}</span>
          </button>
          <button onClick={() => setTab("admin-companies")} style={btnStyle(tab === "admin-companies")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <ShieldCheck className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "companies")}</span>
          </button>
          <button onClick={() => setTab("admin-talent")} style={btnStyle(tab === "admin-talent")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <Users className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "findTalent")}</span>
          </button>
        </>
      ) : role === "seeker" ? (
        <>
          <button onClick={() => setTab("dashboard")} style={btnStyle(tab === "dashboard")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <LayoutDashboard className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "home")}</span>
          </button>
          <button onClick={() => setTab("search")} style={btnStyle(tab === "search")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <Search className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "explore")}</span>
          </button>
          <button onClick={() => setTab("applications")} style={btnStyle(tab === "applications")} className="relative flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <FileCheck2 className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "applications")}</span>
            {applications.length > 0 && (
              <span className="absolute top-0 right-1.5 w-4 h-4 bg-[#F59E0B] text-[#0A2540] rounded-full text-[9px] flex items-center justify-center font-black">
                {applications.length}
              </span>
            )}
          </button>
          <button onClick={() => setTab("saved")} style={btnStyle(tab === "saved")} className="relative flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <Bookmark className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "saved")}</span>
            {savedJobIds.length > 0 && (
              <span className="absolute top-0 right-1.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-black bg-[#F59E0B] text-[#0A2540]">
                {savedJobIds.length}
              </span>
            )}
          </button>
          <button onClick={() => setTab("profile")} style={btnStyle(tab === "profile")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <User className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "viewProfile")}</span>
          </button>
        </>
      ) : role === "employer" ? (
        <>
          <button onClick={() => setTab("employer-dashboard")} style={btnStyle(tab === "employer-dashboard")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <LayoutDashboard className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "dashboard")}</span>
          </button>
          <button onClick={() => setTab("manage-jobs")} style={btnStyle(tab === "manage-jobs")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <Briefcase className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "manageJobs")}</span>
          </button>
          <div className="flex-1 min-w-0 flex justify-center">
            <button
              onClick={() => setTab("post-job")}
              className="-mt-5 bg-[#F59E0B] text-[#0A2540] p-3 rounded-full shadow-xl hover:bg-[#D97706] flex items-center justify-center border-2 border-white dark:border-[#111F33] shrink-0"
              title={t(lang, "postJob")}
            >
              <PlusCircle className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
          <button onClick={() => setTab("applicants")} style={btnStyle(tab === "applicants")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <Users className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "applicants")}</span>
          </button>
          <button onClick={() => setTab("company-profile")} style={btnStyle(tab === "company-profile")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[10px] font-semibold">
            <Building2 className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "companyProfile")}</span>
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setTab("landing")} style={btnStyle(tab === "landing")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[11px] font-semibold">
            <Home className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "home")}</span>
          </button>
          <button onClick={() => setTab("search")} style={btnStyle(tab === "search")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[11px] font-semibold">
            <Search className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "exploreJobs")}</span>
          </button>
          <button onClick={() => setTab("signin")} style={btnStyle(tab === "signin")} className="flex-1 min-w-0 flex flex-col items-center py-1 px-1 text-[11px] font-semibold">
            <LogIn className="w-5 h-5 mb-0.5 shrink-0" />
            <span className="truncate max-w-full">{t(lang, "signIn")}</span>
          </button>
          <button
            onClick={() => setTab("role-selection")}
            className="bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] px-3 py-1.5 rounded-xl text-xs font-bold border border-[#F59E0B]/40 shadow-sm cursor-pointer shrink-0"
          >
            {t(lang, "register")}
          </button>
        </>
      )}
    </nav>
  );
}
