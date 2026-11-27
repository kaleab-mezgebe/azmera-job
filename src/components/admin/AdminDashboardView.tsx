"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import { Candidate } from "@/types";
import CandidateProfileModal from "@/components/employer/CandidateProfileModal";
import {
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Filter,
  Search,
  ExternalLink,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Lock,
  ArrowRight,
  RefreshCw,
  Eye,
  Award,
  UserX,
  UserCheck,
  Flag,
  Send,
  History,
  Check,
  AlertTriangle,
  Radio,
  FileText,
  ChevronDown,
  Layers,
} from "lucide-react";
import { MOCK_COMPANIES, MOCK_JOBS } from "@/data/mockData";

type AdminTabId =
  | "approvals"
  | "payments"
  | "companies"
  | "talent"
  | "users"
  | "disputes"
  | "telegram"
  | "audit";

type AdminCategory = "moderation" | "finance" | "safety" | "channels";

interface AdminSubTab {
  id: AdminTabId;
  label: string;
  badge: string;
}

interface AdminCategoryGroup {
  id: AdminCategory;
  label: string;
  icon: string;
  badge: string;
  tabs: AdminSubTab[];
}

export default function AdminDashboardView() {
  const {
    jobs,
    toggleJobApproval,
    companies,
    toggleCompanyVerified,
    tab,
    setTab,
    selectJob,
    candidates,
    transactions,
    showToast,
    openPaymentModal,
    lang,
  } = useApp();

  // Active sub-tab and parent category
  const [adminTab, setAdminTab] = useState<AdminTabId>("approvals");
  const [activeCategory, setActiveCategory] = useState<AdminCategory>("moderation");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTalentCandidate, setSelectedTalentCandidate] = useState<Candidate | null>(null);

  const [searchFilter, setSearchFilter] = useState("");

  // User management state
  const [usersList, setUsersList] = useState([
    { id: "u-1", name: "Dawit Bekele", email: "dawit.bekele@gmail.com", role: "Job Seeker", status: "Active", joined: "Oct 2026", verified: true },
    { id: "u-2", name: "Yohannes Tekle", email: "recruitment@skylighthotel.et", role: "Employer (Skylight)", status: "Active", joined: "Sep 2026", verified: true },
    { id: "u-3", name: "Hiwot Abera", email: "hiwot.abera@outlook.com", role: "Job Seeker", status: "Active", joined: "Nov 2026", verified: true },
    { id: "u-4", name: "Dr. Almaz Gebre", email: "careers@tdrf.org", role: "Employer (TDRF)", status: "Active", joined: "Aug 2026", verified: true },
    { id: "u-5", name: "Apex Consultancy (Fake)", email: "contact@apexrecruit.xyz", role: "Employer", status: "Suspended", joined: "Nov 2026", verified: false },
  ]);

  // Disputes & Fraud reports state
  const [disputes, setDisputes] = useState([
    {
      id: "disp-101",
      reportedItem: "Apex Consultancy (Fake Job Listing)",
      reporterName: "Dawit Bekele",
      category: "Suspicious Fee Request",
      reason: "Employer sent external SMS asking for 500 ETB deposit for uniform fees prior to interview.",
      status: "Pending Action",
      severity: "High",
      timestamp: "Today, 09:15 AM",
    },
    {
      id: "disp-102",
      reportedItem: "Addis Logistics Hub (Expired Post)",
      reporterName: "Bethlehem Tadesse",
      category: "Ghost Vacancy",
      reason: "Position was filled 2 weeks ago according to reception but remains published.",
      status: "Pending Action",
      severity: "Low",
      timestamp: "Yesterday",
    },
  ]);

  // Telegram bot automation state
  const [telegramAutoPost, setTelegramAutoPost] = useState(true);
  const [lastTelegramBroadcast, setLastTelegramBroadcast] = useState("Nov 25, 2026, 10:45 AM");

  // Audit Logs state
  const [auditLogs, setAuditLogs] = useState([
    { id: "log-1", action: "Approved Vacancy", target: "Senior Full Stack Engineer (Skylight Hotel)", admin: "Azmera Admin", time: "10 mins ago", ip: "196.188.241.12" },
    { id: "log-2", action: "Verified Payment", target: "1,500 ETB via Telebirr (Ref: TB-291840281)", admin: "System Settlement", time: "35 mins ago", ip: "Gateway Webhook" },
    { id: "log-3", action: "Approved Employer KYC", target: "Ethiopian Skylight Hotel (TIN: 0048192841)", admin: "Azmera Admin", time: "2 hrs ago", ip: "196.188.241.12" },
    { id: "log-4", action: "Suspended Malicious Account", target: "Apex Consultancy (Violated Terms)", admin: "Azmera Admin", time: "Yesterday", ip: "196.188.241.12" },
  ]);

  // Sync outer sidebar tab → inner admin sub-tab
  useEffect(() => {
    if (tab === "admin-payments") { setAdminTab("payments"); setActiveCategory("finance"); }
    else if (tab === "admin-companies") { setAdminTab("companies"); setActiveCategory("moderation"); }
    else if (tab === "admin-talent") { setAdminTab("talent"); setActiveCategory("finance"); }
    else if (tab === "admin-approvals" || tab === "admin-dashboard") {
      setAdminTab("approvals");
      setActiveCategory("moderation");
    }
  }, [tab]);

  // Close dropdown on click outside
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /*
    [CLEAN UI COMMENT]:
    CATEGORIZED ADMIN ARCHITECTURE:
    Instead of 8 sprawling horizontal tabs that overflow the screen, admin tools
    are grouped into 4 distinct operational categories:
    1. Moderation & KYC (Approvals, Company verification)
    2. Finance & Gateways (Telebirr/CBE/M-Pesa, Placement commissions)
    3. Trust & Safety (User governance & bans, Fraud reports, Audit trail)
    4. Social Channels (Telegram bot & Facebook syndication)
    Admins can switch between categories or jump directly via the Quick Jump dropdown.
  */
  const CATEGORIES: AdminCategoryGroup[] = [
    {
      id: "moderation",
      label: t(lang, "moderationKyc"),
      icon: "📋",
      badge: `${jobs.length}`,
      tabs: [
        { id: "approvals", label: t(lang, "jobListingApprovals"), badge: `${jobs.length}` },
        { id: "companies", label: t(lang, "enterpriseKyc"), badge: `${companies.length}` },
      ],
    },
    {
      id: "finance",
      label: t(lang, "financeGateways"),
      icon: "💳",
      badge: `${transactions.length}`,
      tabs: [
        { id: "payments", label: t(lang, "paymentLedger"), badge: `${transactions.length}` },
        { id: "talent", label: t(lang, "talentPlacements"), badge: `${candidates.length}` },
      ],
    },
    {
      id: "safety",
      label: t(lang, "trustSafety"),
      icon: "🛡️",
      badge: `${usersList.length}`,
      tabs: [
        { id: "users", label: t(lang, "userGovernance"), badge: `${usersList.length}` },
        { id: "disputes", label: t(lang, "fraudDisputes"), badge: `${disputes.filter((d) => d.status === "Pending Action").length}` },
        { id: "audit", label: t(lang, "auditTrail"), badge: `${auditLogs.length}` },
      ],
    },
    {
      id: "channels",
      label: t(lang, "telegramBroadcast"),
      icon: "📢",
      badge: "95K",
      tabs: [
        { id: "telegram", label: t(lang, "telegramSyndication"), badge: "95K" },
      ],
    },
  ];

  const currentCategoryObj = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const allSubTabs: AdminSubTab[] = CATEGORIES.flatMap((c) => c.tabs);
  const activeTabMeta = allSubTabs.find((t) => t.id === adminTab);

  const handleSelectTab = (tabId: AdminTabId, catId: AdminCategory) => {
    setAdminTab(tabId);
    setActiveCategory(catId);
    setDropdownOpen(false);
  };

  const approvedCount = jobs.filter((j) => j.approved !== false).length;

  const toggleApproveJob = (jobId: string) => {
    toggleJobApproval(jobId);
    const targetJob = jobs.find((j) => j.id === jobId);
    if (targetJob) {
      setAuditLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          action: targetJob.approved === false ? "Approved Vacancy" : "Revoked Vacancy Approval",
          target: `${targetJob.title} (${targetJob.companyName})`,
          admin: "Azmera Admin",
          time: "Just now",
          ip: "196.188.241.12",
        },
        ...prev,
      ]);
    }
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const newStatus = u.status === "Active" ? "Suspended" : "Active";
        showToast(`User ${u.name} set to ${newStatus}!`, newStatus === "Active" ? "success" : "error");
        return { ...u, status: newStatus };
      })
    );
  };

  const handleResolveDispute = (dispId: string, action: "dismiss" | "suspend") => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === dispId ? { ...d, status: action === "suspend" ? "Sanction Applied" : "Dismissed" } : d))
    );
    showToast(action === "suspend" ? "Employer sanctioned and warning issued!" : "Dispute dismissed as benign.", "info");
  };

  const handleManualTelegramBroadcast = () => {
    setLastTelegramBroadcast("Just now");
    showToast("🚀 Broadcasted latest verified vacancies to @AzmeraJobConnect (95,240 subscribers)!", "success");
  };

  // Financial totals
  const telebirrTotal = transactions
    .filter((t) => t.method === "telebirr")
    .reduce((sum, t) => sum + t.amount, 0);
  const cbeTotal = transactions
    .filter((t) => t.method === "cbe")
    .reduce((sum, t) => sum + t.amount, 0);
  const mpesaTotal = transactions
    .filter((t) => t.method === "mpesa")
    .reduce((sum, t) => sum + t.amount, 0);
  const grandTotalRevenue = telebirrTotal + cbeTotal + mpesaTotal;

  return (
    <div className="space-y-6 pb-20">
      {/* ── ADMIN HEADER & IDENTITY BANNER ── */}
      <div className="bg-[#0A2540] rounded-3xl p-6 sm:p-8 text-white border border-[#F59E0B]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{t(lang, "superuserSession")}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/20 text-[11px] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Node: Addis Ababa
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t(lang, "commandCenterTitle")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t(lang, "commandCenterSubtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* ── 4 KPI CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Settled Revenue */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#101E33] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t(lang, "totalSettledRevenue")}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {grandTotalRevenue.toLocaleString()} <span className="text-xs text-emerald-600 font-bold">ETB</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[#00843D] font-bold">TB: {telebirrTotal.toLocaleString()}</span> • 
            <span className="text-[#8A1538] font-bold">CBE: {cbeTotal.toLocaleString()}</span> • 
            <span className="text-[#00B04F] font-bold">M-Pesa: {mpesaTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Active Job Postings */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#101E33] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t(lang, "activeJobPostings")}</span>
            <div className="w-8 h-8 rounded-xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {jobs.length} <span className="text-xs text-[#0A2540] dark:text-[#F59E0B] font-bold">Live Vacancies</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span className="text-emerald-600 font-bold">{approvedCount} Verified</span> • 
            <span className="text-amber-600 font-bold">{jobs.length - approvedCount} Pending Review</span>
          </div>
        </div>

        {/* Registered Enterprises */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#101E33] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t(lang, "employersEnterprises")}</span>
            <div className="w-8 h-8 rounded-xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            850+ <span className="text-xs text-[#0A2540] dark:text-[#F59E0B] font-bold">{t(lang, "companies")}</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>62 KYC Verified Employers across Ethiopia</span>
          </div>
        </div>

        {/* Active Candidates & Employees */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#101E33] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t(lang, "talentPoolLabel")}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            92,000+ <span className="text-xs text-amber-600 font-bold">Candidates</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>94% Placement Success Rate nationwide</span>
          </div>
        </div>
      </div>

      {/* ── CATEGORIZED ADMIN NAVIGATION & DROPDOWN ── */}
      <div className="bg-white dark:bg-[#101E33] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Level 1: Clean Category Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isCatActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setAdminTab(cat.tabs[0].id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCatActive
                      ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Jump Categorized Dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full sm:w-auto flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] hover:border-[#F59E0B] text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                <span>{t(lang, "jumpToView")}</span>
                <span className="text-[#0A2540] dark:text-[#F59E0B] font-extrabold truncate max-w-[150px]">
                  {activeTabMeta?.label}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-80 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 text-slate-400">
                  Categorized Admin Directory
                </div>
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="py-1">
                    <div className="px-3.5 py-1 text-[10px] font-black uppercase text-[#0A2540] dark:text-[#F59E0B] bg-slate-50 dark:bg-slate-800/60">
                      {cat.icon} {cat.label}
                    </div>
                    {cat.tabs.map((tab) => {
                      const isSelected = adminTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleSelectTab(tab.id, cat.id)}
                          className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 text-[#0A2540] dark:text-[#F59E0B] font-bold"
                              : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700 font-bold">
                            {tab.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Level 2: Sub-tabs within Active Category */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
          {currentCategoryObj.tabs.map((tab) => {
            const isTabActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isTabActive
                    ? "bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 text-[#0A2540] dark:text-[#F59E0B] border border-[#0A2540]/25 dark:border-[#F59E0B]/40"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span>{tab.label}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-2xs font-bold">
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TAB 1: JOB APPROVALS ── */}
      {adminTab === "approvals" && (
        <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Job Listing Moderation Queue
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ensure every opening meets Ethiopian salary transparency and zero ghost job standards.
              </p>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder={t(lang, "searchPlaceholder")}
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none w-full sm:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-2">Job Title &amp; Employer</th>
                  <th className="pb-3 px-2">Location</th>
                  <th className="pb-3 px-2">Monthly ETB Compensation</th>
                  <th className="pb-3 px-2">Verification Status</th>
                  <th className="pb-3 px-2 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {jobs
                  .filter(
                    (j) =>
                      j.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      j.companyName.toLowerCase().includes(searchFilter.toLowerCase())
                  )
                  .map((job) => {
                    const isApproved = job.approved !== false;
                    return (
                      <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={job.companyLogo}
                              alt={job.companyName}
                              className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{job.title}</span>
                                {job.featured && (
                                  <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-black px-1.5 py-0.2 rounded">
                                    ★ Featured
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400">{job.companyName}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {job.location}
                        </td>
                        <td className="py-3 px-2 whitespace-nowrap">
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                            {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} ETB
                          </span>
                        </td>
                        <td className="py-3 px-2 whitespace-nowrap">
                          {isApproved ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                              <CheckCircle2 className="w-3 h-3" />
                              {t(lang, "approvedLive")}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                              <AlertCircle className="w-3 h-3" />
                              {t(lang, "pendingVerification")}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => toggleApproveJob(job.id)}
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                                isApproved
                                  ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                              }`}
                            >
                              {isApproved ? t(lang, "revokeApproval") : t(lang, "approveListing")}
                            </button>
                            <button
                              onClick={() => selectJob(job.id)}
                              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              title="Inspect Job View"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 2: TELEBIRR / CBE / M-PESA AUDIT ── */}
      {adminTab === "payments" && (
        <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Ethiopian Payment Gateways Audit Ledger
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official transaction audit trail for Telebirr SuperApp, Commercial Bank of Ethiopia (CBE), and M-Pesa.
              </p>
            </div>
            <button
              onClick={() => showToast("Exported official VAT transaction report (CSV) for Ethiopian Ministry of Revenue")}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export VAT Tax Ledger</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-2">Ref Number</th>
                  <th className="pb-3 px-2">Gateway</th>
                  <th className="pb-3 px-2">Payer / Employer</th>
                  <th className="pb-3 px-2">Purpose</th>
                  <th className="pb-3 px-2">Amount (ETB)</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-2 font-mono font-bold text-slate-900 dark:text-white">
                      {tx.referenceNumber}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          tx.method === "telebirr"
                            ? "bg-emerald-100 text-[#00843D] dark:bg-emerald-950/60"
                            : tx.method === "cbe"
                            ? "bg-pink-100 text-[#8A1538] dark:bg-pink-950/60"
                            : "bg-green-100 text-[#00B04F] dark:bg-green-950/60"
                        }`}
                      >
                        {tx.method === "telebirr" ? "Telebirr" : tx.method === "cbe" ? "CBE Bank" : "M-Pesa"}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-bold text-slate-900 dark:text-white">{tx.companyName || "Azmera Recruiter"}</div>
                      <span className="text-[11px] text-slate-400 font-mono">{tx.payerPhoneOrAccount}</span>
                    </td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300">
                      {tx.purposeLabel}
                    </td>
                    <td className="py-3 px-2 font-black text-slate-900 dark:text-white">
                      {tx.amount.toLocaleString()} ETB
                    </td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => showToast(`VAT E-Receipt re-issued for Ref ${tx.referenceNumber}`)}
                        className="text-xs font-bold text-[#0A2540] hover:text-[#F59E0B] dark:text-[#F59E0B] underline cursor-pointer"
                      >
                        {t(lang, "viewReceipt")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 3: ENTERPRISE KYC ── */}
      {adminTab === "companies" && (
        <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Enterprise Verified Recruiter Directory
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage commercial registration, TIN certification, and blue checkmark badges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((comp) => (
              <div
                key={comp.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 hover:border-[#F59E0B] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <h3 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                        <span>{comp.name}</span>
                        {comp.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500/20" />
                        )}
                      </h3>
                      <span className="text-[11px] text-slate-400">{comp.industry}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      comp.verified
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    }`}
                  >
                    {comp.verified ? "KYC Verified" : "Pending KYC"}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {comp.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>{comp.location}</span>
                  <button
                    onClick={() => toggleCompanyVerified(comp.id)}
                    className="font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline cursor-pointer"
                  >
                    {comp.verified ? "Revoke KYC" : "Verify KYC"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 4: TALENT DIRECTORY & PLACEMENTS ── */}
      {adminTab === "talent" && (
        <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Talent Matching &amp; Placement Fee Tracking
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage 2,000 ETB direct hire commissions and 14-day candidate replacement guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidates.map((cand) => (
              <div
                key={cand.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 hover:border-[#F59E0B] transition-colors"
              >
                <img
                  src={cand.avatar}
                  alt={cand.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F59E0B] shrink-0"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {cand.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Placement Ready
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{cand.title}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                    {cand.bio}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#F59E0B]">Commission: 2,000 ETB / Hire</span>
                    <button
                      onClick={() => setSelectedTalentCandidate(cand)}
                      className="text-[#0A2540] dark:text-[#F59E0B] font-bold hover:underline cursor-pointer"
                    >
                      {t(lang, "inspectProfile")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 5: USER GOVERNANCE & SUSPENSION ── */}
      {adminTab === "users" && (
        <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Master User Directory &amp; Account Governance
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Suspend, reinstate, or verify job seekers, hiring managers, and recruiter permissions.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
              {usersList.filter((u) => u.status === "Active").length} Active Accounts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-2">User / Identity</th>
                  <th className="pb-3 px-2">Account Role</th>
                  <th className="pb-3 px-2">Joined Date</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Sanction Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {usersList.map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-2">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{usr.name}</span>
                        {usr.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{usr.email}</span>
                    </td>
                    <td className="py-3 px-2 font-semibold text-slate-700 dark:text-slate-300">
                      {usr.role}
                    </td>
                    <td className="py-3 px-2 text-slate-500">{usr.joined}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          usr.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                        }`}
                      >
                        {usr.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleUserStatus(usr.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            usr.status === "Active"
                              ? "bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
                              : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                          }`}
                        >
                          {usr.status === "Active" ? t(lang, "suspendAccount") : t(lang, "reinstateUser")}
                        </button>
                        <button
                          onClick={() => showToast(`Password reset link dispatched to ${usr.email}`)}
                          className="px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs hover:bg-slate-100 cursor-pointer"
                        >
                          Reset Pass
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 6: DISPUTES & FRAUD REPORTS ── */}
      {adminTab === "disputes" && (
        <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Candidate Fraud Reports &amp; Recruitment Complaints
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Protect Ethiopian job seekers from ghost jobs, payment scams, or misleading vacancy terms.
            </p>
          </div>

          <div className="space-y-3">
            {disputes.map((disp) => (
              <div
                key={disp.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                      {disp.category}
                    </span>
                    <span className="text-xs text-slate-400">• Reported by {disp.reporterName}</span>
                    <span className="text-[11px] text-slate-400">({disp.timestamp})</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Target: {disp.reportedItem}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    "{disp.reason}"
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {disp.status === "Pending Action" ? (
                    <>
                      <button
                        onClick={() => handleResolveDispute(disp.id, "suspend")}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <UserX className="w-3.5 h-3.5" />
                        <span>{t(lang, "sanctionEmployer")}</span>
                      </button>
                      <button
                        onClick={() => handleResolveDispute(disp.id, "dismiss")}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        {t(lang, "dismissReport")}
                      </button>
                    </>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      ✓ {disp.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 7: TELEGRAM BOT SYNDICATION ── */}
      {adminTab === "telegram" && (
        <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Telegram Channel &amp; Social Broadcast Hub
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated syndication pipeline from Azmera Database to @AzmeraJobConnect channel.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Telegram Bot Online &amp; Synced
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Broadcast Automation Mode
                  </h3>
                  <p className="text-xs text-slate-500">
                    Auto-forward vacancies upon admin verification approval
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTelegramAutoPost(!telegramAutoPost);
                    showToast(telegramAutoPost ? "Auto-syndication paused" : "Auto-syndication active!");
                  }}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    telegramAutoPost ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                      telegramAutoPost ? "translate-x-6" : "translate-x-1"
                    } top-0.5 absolute`}
                  />
                </button>
              </div>

              <div className="text-xs space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Channel:</span>
                  <span className="font-mono font-bold text-sky-600">@AzmeraJobConnect</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Subscriber Base:</span>
                  <span className="font-bold text-slate-900 dark:text-white">95,240 Ethiopian Job Seekers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Broadcast:</span>
                  <span className="text-slate-700 dark:text-slate-300">{lastTelegramBroadcast}</span>
                </div>
              </div>

              <button
                onClick={handleManualTelegramBroadcast}
                className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                <span>{t(lang, "triggerBroadcast")} 🚀</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/60 space-y-3 font-mono text-xs">
              <span className="text-[10px] font-bold uppercase text-sky-700 dark:text-sky-300 block">
                Telegram Post Format Template:
              </span>
              <div className="p-3 bg-white dark:bg-[#101E33] rounded-xl border border-sky-100 dark:border-sky-800 space-y-1.5 leading-relaxed">
                <p className="font-bold text-slate-900 dark:text-white">📢 #AzmeraJobs_Vacancy</p>
                <p>🏢 <strong>Ethiopian Skylight Hotel</strong></p>
                <p>📍 Bole, Addis Ababa</p>
                <p>💼 Senior Full Stack Software Engineer (Hotel Tech)</p>
                <p>💰 <strong>50,000 - 85,000 ETB / Month</strong></p>
                <p>⚡ <strong>Fast-Track Apply:</strong> https://azmerajobs.com/jobs/skylight-101</p>
                <p className="text-[11px] text-slate-400">💬 Or message directly: @AzmeraJobConnect</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 8: AUDIT LOGS ── */}
      {adminTab === "audit" && (
        <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Platform Activity &amp; Security Audit Log
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Immutable security record of moderation approvals, financial settlements, and user suspensions.
            </p>
          </div>

          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0A2540]/5 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center font-black">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{log.action}: </span>
                    <span className="text-slate-600 dark:text-slate-300">{log.target}</span>
                    <p className="text-[10px] text-slate-400 font-mono">
                      By {log.admin} • Node IP: {log.ip}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTalentCandidate && (
        <CandidateProfileModal
          candidate={selectedTalentCandidate}
          onClose={() => setSelectedTalentCandidate(null)}
          onScheduleInterview={(cand) => {
            setSelectedTalentCandidate(null);
            showToast(`Direct interview invite sent to ${cand.name}!`, "success");
          }}
        />
      )}
    </div>
  );
}
