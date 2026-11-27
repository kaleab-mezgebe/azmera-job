"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import { MOCK_COMPANIES } from "@/data/mockData";
import {
  LayoutDashboard, Search, FileCheck2, Bookmark, User,
  Building2, Briefcase, Users, CalendarCheck, PlusCircle,
  Sparkles, LogOut, ChevronRight, ShieldCheck, CreditCard,
} from "lucide-react";

export default function Sidebar() {
  const {
    role, tab, setTab, lang,
    seeker, company, savedJobIds, applications, jobs, candidates, interviews,
    logout,
  } = useApp();

  if (role === "guest") return null;

  const adminNavItems = [
    { id: "admin-dashboard", label: t(lang, "adminConsole"), icon: LayoutDashboard, badge: "Live" },
    { id: "admin-approvals", label: t(lang, "jobApprovals"), icon: Briefcase, badge: `${jobs.length}` },
    { id: "admin-payments", label: t(lang, "paymentAudit"), icon: CreditCard, badge: "ETB Pay", badgeVariant: "green" },
    { id: "admin-companies", label: t(lang, "verifiedEmployers"), icon: Building2, badge: `${MOCK_COMPANIES.length}` },
    { id: "admin-talent", label: t(lang, "talentDirectory"), icon: Users, badge: `${candidates.length}` },
  ];

  const seekerNavItems = [
    { id: "dashboard", label: t(lang, "dashboard"), icon: LayoutDashboard, badge: null },
    { id: "search", label: t(lang, "exploreJobs"), icon: Search, badge: `${jobs.length}` },
    { id: "applications", label: t(lang, "applications"), icon: FileCheck2, badge: `${applications.length}` },
    { id: "messages", label: t(lang, "messages"), icon: Users, badge: "2", badgeVariant: "amber" },
    { id: "saved", label: t(lang, "savedJobs"), icon: Bookmark, badge: `${savedJobIds.length}` },
    { id: "profile", label: t(lang, "myProfile"), icon: User, badge: `${seeker.profileCompletion}%`, badgeVariant: "green" },
  ];

  const employerNavItems = [
    { id: "employer-dashboard", label: t(lang, "dashboard"), icon: LayoutDashboard, badge: null },
    { id: "manage-jobs", label: t(lang, "manageJobs"), icon: Briefcase, badge: `${jobs.filter((j) => j.companyId === company.id).length}` },
    { id: "applicants", label: t(lang, "applicants"), icon: Users, badge: `${candidates.length}` },
    { id: "talent-sourcing", label: t(lang, "findTalent"), icon: Search, badge: `${candidates.length} Profiles`, badgeVariant: "green" },
    { id: "messages", label: t(lang, "messages"), icon: Users, badge: "3", badgeVariant: "amber" },
    { id: "interviews", label: t(lang, "interviews"), icon: CalendarCheck, badge: `${interviews.filter((i) => i.status === "Scheduled").length}`, badgeVariant: "amber" },
    { id: "billing", label: t(lang, "billingGateways"), icon: CreditCard, badge: "ETB Pay", badgeVariant: "green" },
    { id: "company-profile", label: t(lang, "companyProfile"), icon: Building2, badge: "✓ Verified", badgeVariant: "green" },
  ];

  const items = role === "admin" ? adminNavItems : role === "seeker" ? seekerNavItems : employerNavItems;

  return (
    <aside
      className="hidden lg:flex flex-col w-64 border-r min-h-[calc(100vh-4rem)] p-4 shrink-0"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Profile card */}
      <div className="mb-6 p-3.5 rounded-2xl border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
        {role === "admin" ? (
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#0A2540] dark:bg-[#F59E0B] text-[#F59E0B] dark:text-[#0A2540] flex items-center justify-center font-black shadow-md shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-extrabold text-sm truncate text-slate-900 dark:text-white">
                Azmera Admin
              </h3>
              <p className="text-[11px] truncate text-[#F59E0B] font-bold">
                {t(lang, "administrator")}
              </p>
              <span className="inline-block mt-1 text-[9px] font-black uppercase rounded-md px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Governance Root
              </span>
            </div>
          </div>
        ) : role === "seeker" ? (
          <div className="flex items-center gap-3">
            <img src={seeker.avatar} alt={seeker.name} className="w-11 h-11 rounded-full object-cover border-2 border-[#F59E0B] shadow-xs" />
            <div className="overflow-hidden">
              <h3 className="font-bold text-sm truncate" style={{ color: "var(--text)" }}>{seeker.name}</h3>
              <p className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{seeker.title}</p>
              <div className="flex items-center gap-1 mt-1.5">
                <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div className="h-full rounded-full bg-gradient-to-r from-[#0A2540] to-[#F59E0B]" style={{ width: `${seeker.profileCompletion}%` }} />
                </div>
                <span className="text-[10px] font-bold text-[#F59E0B]">{seeker.profileCompletion}%</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img src={company.logo} alt={company.name} className="w-11 h-11 rounded-xl object-cover border" style={{ borderColor: "var(--border)" }} />
            <div className="overflow-hidden">
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-sm truncate" style={{ color: "var(--text)" }}>{company.name}</h3>
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--primary)" }} />
              </div>
              <p className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{company.industry}</p>
              <span className="inline-block mt-1 text-[10px] font-semibold rounded-md px-1.5 py-0.5 badge-green">Verified Recruiter</span>
            </div>
          </div>
        )}
      </div>

      {/* Post job button */}
      {role === "employer" && (
        <button
          onClick={() => setTab("post-job")}
          className="w-full mb-5 py-2.5 px-4 rounded-xl font-bold text-sm text-white dark:text-[#0A2540] bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] shadow-md shadow-[#0A2540]/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          {t(lang, "postJob")}
        </button>
      )}

      {/* Nav list */}
      <div className="space-y-1 flex-1">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          {role === "admin" ? "Azmera Governance Console" : role === "seeker" ? "Job Seeker Workspace" : "Recruitment Console"}
        </p>

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = tab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all"
              style={
                isActive
                  ? { background: "var(--primary)", color: "#fff" }
                  : { color: "var(--text-muted)", background: "transparent" }
              }
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--bg)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : item.badgeVariant === "green"
                      ? "badge-green"
                      : item.badgeVariant === "amber"
                      ? "badge-amber"
                      : "badge-gray"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t space-y-2" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t(lang, "signOut")}</span>
        </button>
      </div>
    </aside>
  );
}
