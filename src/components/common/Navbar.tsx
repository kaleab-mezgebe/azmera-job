"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { t, LangCode } from "@/lib/i18n";
import { BASE_PATH } from "@/lib/constants";
import {
  Briefcase,
  Bell,
  Globe2,
  User,
  Building2,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  PlusCircle,
  Sun,
  Moon,
  Zap,
  ShieldCheck,
  LogOut,
  Check,
  CreditCard,
  HelpCircle,
  Send,
  MessageSquare,
  Search,
  TrendingUp,
  Bookmark,
  Calendar,
  Users,
} from "lucide-react";

export default function Navbar() {
  const {
    role,
    currentUser,
    logout,
    tab,
    setTab,
    lang,
    setLang,
    theme,
    toggleTheme,
    seeker,
    company,
    unreadCount,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    savedJobIds,
    applications,
    showToast,
  } = useApp();

  // Dropdown states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false); // Clean UI: Guest Explore dropdown
  const [seekerMenuOpen, setSeekerMenuOpen] = useState(false); // Clean UI: Seeker Career Hub dropdown
  const [employerMenuOpen, setEmployerMenuOpen] = useState(false); // Clean UI: Employer More Tools dropdown
  const [adminMenuOpen, setAdminMenuOpen] = useState(false); // Clean UI: Admin Operations dropdown
  const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false);
  const [howItWorksTab, setHowItWorksTab] = useState<"seeker" | "employer">("seeker");

  // Close dropdowns on click outside
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
        setSeekerMenuOpen(false);
        setEmployerMenuOpen(false);
        setAdminMenuOpen(false);
        setLangOpen(false);
        setNotifOpen(false);
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGuestNavClick = (id: string) => {
    setMoreMenuOpen(false);
    if (id === "for-employers") {
      if (role === "employer") {
        setTab("employer-dashboard");
      } else {
        showToast("Sign in with an Employer account to access the Recruiter Console.", "info");
        setTab("signin");
      }
    } else if (id === "how-it-works") {
      setHowItWorksModalOpen(true);
    } else {
      setTab(id);
    }
  };

  const activeAppsCount = applications.filter(
    (a) => a.status !== "Rejected" && a.status !== "Hired"
  ).length;

  const languages: { code: LangCode; label: string; native: string }[] = [
    { code: "en", label: "English", native: "EN" },
    { code: "am", label: "Amharic", native: "አማርኛ" },
    { code: "om", label: "Afaan Oromo", native: "Oromoo" },
    { code: "ti", label: "Tigrigna", native: "ትግርኛ" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070F1A]/95 shadow-2xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">

            {/* ── 1. LOGO & BRAND IDENTITY ── */}
            <button
              onClick={() => {
                if (role === "guest") setTab("landing");
                else if (role === "seeker") setTab("dashboard");
                else if (role === "admin") setTab("admin-dashboard");
                else setTab("employer-dashboard");
              }}
              className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer shrink-0"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden border-2 border-[#F59E0B] shadow-md shadow-[#0A2540]/15 group-hover:scale-105 transition-transform bg-white shrink-0">
                <img
                  src={`${BASE_PATH}/azmera-logo.png`}
                  alt="Azmera Jobs Logo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                    Azmera<span className="text-[#F59E0B]">Jobs</span>
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] font-semibold text-[#F59E0B] -mt-0.5 hidden sm:block tracking-wide whitespace-nowrap">
                  {t(lang, "tagline")}
                </p>
              </div>
            </button>

            {/* ── 2. CENTER NAVIGATION PER ROLE ── */}

            {/*
              Guest Navigation: Exactly as requested in user design screenshots
              - Home | Browse Jobs | Pricing & Plans | For Employers | How It Works
              - Fully trilingual translation (EN, AM, OM, TI)
              - Harmonized Deep Navy (#0A2540) and Warm Amber (#F59E0B)
            */}
            {role === "guest" && (
              <nav className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0">
                <button
                  onClick={() => setTab("landing")}
                  className={`text-xs xl:text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                    tab === "landing"
                      ? "text-[#0A2540] dark:text-[#F59E0B] border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "home")}
                </button>

                <button
                  onClick={() => setTab("search")}
                  className={`text-xs xl:text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                    tab === "search"
                      ? "text-[#0A2540] dark:text-[#F59E0B] border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "exploreJobs")}
                </button>

                <button
                  onClick={() => setTab("pricing")}
                  className={`text-xs xl:text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                    tab === "pricing" || tab === "billing"
                      ? "text-[#0A2540] dark:text-[#F59E0B] border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "pricingPlans")}
                </button>

                <button
                  onClick={() => handleGuestNavClick("for-employers")}
                  className={`text-xs xl:text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                    tab === "for-employers"
                      ? "text-[#0A2540] dark:text-[#F59E0B] border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "forEmployers")}
                </button>

                <button
                  onClick={() => setHowItWorksModalOpen(true)}
                  className="text-xs xl:text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  {t(lang, "howItWorks")}
                </button>
              </nav>
            )}

            {/*
              [CLEAN UI COMMENT - SEEKER NAVIGATION]:
              - Harmonized brand navy & amber colors.
              - Fully translated dynamically into English, Amharic, Oromo, and Tigrigna.
            */}
            {role === "seeker" && (
              <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
                <button
                  onClick={() => setTab("dashboard")}
                  className={`text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    tab === "dashboard"
                      ? "text-[#0A2540] dark:text-[#F59E0B] font-bold border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "dashboard")}
                </button>

                <button
                  onClick={() => setTab("search")}
                  className={`text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    tab === "search"
                      ? "text-[#0A2540] dark:text-[#F59E0B] font-bold border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "exploreJobs")}
                </button>

                <button
                  onClick={() => setTab("applications")}
                  className={`text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 py-1 cursor-pointer ${
                    tab === "applications"
                      ? "text-[#0A2540] dark:text-[#F59E0B] font-bold border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{t(lang, "applications")}</span>
                  {activeAppsCount > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-black rounded-full bg-[#F59E0B] text-[#0A2540] whitespace-nowrap shrink-0">
                      {activeAppsCount}
                    </span>
                  )}
                </button>

                {/* Seeker Career Hub Dropdown */}
                <div className="relative shrink-0">
                  <button
                    onClick={() => {
                      setSeekerMenuOpen(!seekerMenuOpen);
                      setEmployerMenuOpen(false);
                      setAdminMenuOpen(false);
                      setMoreMenuOpen(false);
                      setLangOpen(false);
                      setNotifOpen(false);
                      setAccountMenuOpen(false);
                    }}
                    className={`flex items-center gap-1.5 text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                      seekerMenuOpen || tab === "messages" || tab === "saved" || tab === "profile"
                        ? "text-[#0A2540] dark:text-[#F59E0B] font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{t(lang, "careerHub")}</span>
                    {(savedJobIds.length > 0 || unreadCount > 0) && (
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${seekerMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {seekerMenuOpen && (
                    <div className="absolute left-0 mt-2 w-64 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 text-slate-400">
                        {t(lang, "careerHub")}
                      </div>

                      <button
                        onClick={() => {
                          setTab("messages");
                          setSeekerMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <MessageSquare className="w-4 h-4 text-[#F59E0B] shrink-0" />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(lang, "messages")}</span>
                        </div>
                        <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-[#F59E0B] text-[#0A2540]">2</span>
                      </button>

                      <button
                        onClick={() => {
                          setTab("saved");
                          setSeekerMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Bookmark className="w-4 h-4 text-[#F59E0B] shrink-0" />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(lang, "savedJobs")}</span>
                        </div>
                        {savedJobIds.length > 0 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-black rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                            {savedJobIds.length}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setTab("profile");
                          setSeekerMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors cursor-pointer border-t border-slate-100 dark:border-slate-800"
                      >
                        <User className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(lang, "myProfile")}</p>
                          <p className="text-[10px] text-slate-400">CV, Skills &amp; Privacy</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            )}

            {/*
              [CLEAN UI COMMENT - EMPLOYER NAVIGATION]:
              - Unified brand navy/amber color hierarchy.
              - Multi-language support (EN, AM, OM, TI).
            */}
            {role === "employer" && (
              <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 shrink-0">
                <button
                  onClick={() => setTab("employer-dashboard")}
                  className={`text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    tab === "employer-dashboard"
                      ? "text-[#0A2540] dark:text-[#F59E0B] font-bold border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "dashboard")}
                </button>

                <button
                  onClick={() => setTab("manage-jobs")}
                  className={`text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    tab === "manage-jobs"
                      ? "text-[#0A2540] dark:text-[#F59E0B] font-bold border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "manageJobs")}
                </button>

                <button
                  onClick={() => setTab("applicants")}
                  className={`text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    tab === "applicants"
                      ? "text-[#0A2540] dark:text-[#F59E0B] font-bold border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "applicants")}
                </button>

                <button
                  onClick={() => setTab("talent-sourcing")}
                  className={`text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    tab === "talent-sourcing"
                      ? "text-[#0A2540] dark:text-[#F59E0B] font-bold border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "findTalent")}
                </button>

                {/* Employer Secondary Tools Dropdown */}
                <div className="relative shrink-0">
                  <button
                    onClick={() => {
                      setEmployerMenuOpen(!employerMenuOpen);
                      setSeekerMenuOpen(false);
                      setAdminMenuOpen(false);
                      setMoreMenuOpen(false);
                      setLangOpen(false);
                      setNotifOpen(false);
                      setAccountMenuOpen(false);
                    }}
                    className={`flex items-center gap-1.5 text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                      employerMenuOpen || tab === "messages" || tab === "interviews" || tab === "billing" || tab === "company-profile"
                        ? "text-[#0A2540] dark:text-[#F59E0B] font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{t(lang, "moreTools")}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${employerMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {employerMenuOpen && (
                    <div className="absolute left-0 mt-2 w-64 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 text-slate-400">
                        {t(lang, "moreTools")}
                      </div>

                      <button
                        onClick={() => {
                          setTab("messages");
                          setEmployerMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(lang, "messages")}</p>
                          <p className="text-[10px] text-slate-400">Direct hiring manager chat</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setTab("interviews");
                          setEmployerMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(lang, "interviews")}</p>
                          <p className="text-[10px] text-slate-400">Google Meet &amp; in-person</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setTab("billing");
                          setEmployerMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors cursor-pointer border-t border-slate-100 dark:border-slate-800"
                      >
                        <CreditCard className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(lang, "billingGateways")}</p>
                          <p className="text-[10px] text-slate-400">Telebirr, CBE Bank, M-Pesa</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setTab("company-profile");
                          setEmployerMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Building2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(lang, "companyProfile")}</p>
                          <p className="text-[10px] text-slate-400">Verification &amp; HR team</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            )}

            {/*
              [CLEAN UI COMMENT - ADMIN NAVIGATION]:
              - Unified brand navy/amber color hierarchy (eliminated purple/indigo discord).
              - Multi-language support (EN, AM, OM, TI).
            */}
            {role === "admin" && (
              <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 shrink-0">
                <button
                  onClick={() => setTab("admin-dashboard")}
                  className={`text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    tab === "admin-dashboard"
                      ? "text-[#0A2540] dark:text-[#F59E0B] font-extrabold border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "adminConsole")}
                </button>

                <button
                  onClick={() => setTab("admin-approvals")}
                  className={`text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                    tab === "admin-approvals"
                      ? "text-[#0A2540] dark:text-[#F59E0B] font-extrabold border-b-2 border-[#0A2540] dark:border-[#F59E0B]"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {t(lang, "jobApprovals")}
                </button>

                {/* Admin Operations Dropdown */}
                <div className="relative shrink-0">
                  <button
                    onClick={() => {
                      setAdminMenuOpen(!adminMenuOpen);
                      setSeekerMenuOpen(false);
                      setEmployerMenuOpen(false);
                      setMoreMenuOpen(false);
                      setLangOpen(false);
                      setNotifOpen(false);
                      setAccountMenuOpen(false);
                    }}
                    className={`flex items-center gap-1.5 text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                      adminMenuOpen || tab === "admin-payments" || tab === "admin-companies" || tab === "admin-talent"
                        ? "text-[#0A2540] dark:text-[#F59E0B] font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{t(lang, "operations")}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${adminMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {adminMenuOpen && (
                    <div className="absolute left-0 mt-2 w-64 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 text-slate-400">
                        {t(lang, "operations")}
                      </div>

                      <button
                        onClick={() => {
                          setTab("admin-payments");
                          setAdminMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(lang, "paymentAudit")}</p>
                          <p className="text-[10px] text-slate-400">Telebirr, CBE &amp; M-Pesa</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setTab("admin-companies");
                          setAdminMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Building2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(lang, "verifiedEmployers")}</p>
                          <p className="text-[10px] text-slate-400">TIN &amp; business licenses</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setTab("admin-talent");
                          setAdminMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Users className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(lang, "talentDirectory")}</p>
                          <p className="text-[10px] text-slate-400">Candidate discoverability</p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            )}

            {/* ── 3. RIGHT CONTROLS & SESSION CAPSULE ── */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">

              {/* Theme Toggle (Light / Dark) */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-slate-700 dark:text-slate-200 hover:border-[#F59E0B] transition-colors cursor-pointer shrink-0"
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-[#0A2540]" />
                ) : (
                  <Sun className="w-4 h-4 text-[#F59E0B]" />
                )}
              </button>

              {/* Language Switcher */}
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    setLangOpen(!langOpen);
                    setNotifOpen(false);
                    setMoreMenuOpen(false);
                    setAccountMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-[#F59E0B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  title="Switch Language"
                >
                  <Globe2 className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B] shrink-0" />
                  <span className="sm:hidden uppercase font-bold">{lang}</span>
                  <span className="hidden sm:inline whitespace-nowrap">{languages.find((l) => l.code === lang)?.native}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] py-1.5 z-50 overflow-hidden">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 text-slate-400">
                      Language
                    </div>
                    {languages.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          lang === item.code
                            ? "bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 text-[#0A2540] dark:text-[#F59E0B] font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                          {item.native}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notification Bell (Visible for all visitors and authenticated users) */}
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    setLangOpen(false);
                    setMoreMenuOpen(false);
                    setAccountMenuOpen(false);
                  }}
                  className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-slate-700 dark:text-slate-200 hover:border-[#F59E0B] transition-colors cursor-pointer shrink-0"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F59E0B] text-[#0A2540] text-[10px] font-black flex items-center justify-center shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-[4.25rem] sm:top-auto sm:mt-2 w-auto sm:w-96 max-h-[80vh] overflow-y-auto rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t(lang, "notifications")}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{unreadCount} {t(lang, "unread")}</p>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-xs font-semibold text-[#0A2540] dark:text-[#F59E0B] hover:underline cursor-pointer"
                        >
                          {t(lang, "markAllRead")}
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-500">{t(lang, "noNotifications")}</div>
                      ) : (
                        notifications.slice(0, 5).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-3.5 cursor-pointer transition-colors ${
                              !n.read
                                ? "bg-amber-50/50 dark:bg-amber-950/20"
                                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">
                                {n.title}
                              </span>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">
                                {n.timestamp}
                              </span>
                            </div>
                            <p className="text-xs mt-1 text-slate-600 dark:text-slate-400 line-clamp-2">
                              {n.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Guest Action Cluster: Sign In | [Browse Jobs] | [(+) Post a Job] */}
              {role === "guest" ? (
                <div className="hidden sm:flex items-center gap-2 sm:gap-2.5 shrink-0">
                  <button
                    onClick={() => setTab("signin")}
                    className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0A2540] dark:hover:text-[#F59E0B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {t(lang, "signIn")}
                  </button>

                  <button
                    onClick={() => setTab("search")}
                    className="px-3.5 py-1.5 text-xs font-bold rounded-full border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:border-[#0A2540] dark:hover:border-[#F59E0B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {t(lang, "exploreJobs")}
                  </button>

                  <button
                    onClick={() => {
                      showToast("Sign in with an Employer account to post a job.", "info");
                      setTab("signin");
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#0A2540] dark:hover:bg-[#07192C] rounded-full shadow-md shadow-[#0A2540]/20 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] whitespace-nowrap shrink-0"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                    <span>{t(lang, "postJob")}</span>
                  </button>
                </div>
              ) : (
                /* ── AUTHENTICATED SESSION IDENTIFIER (ADMIN / EMPLOYER / EMPLOYEE) ── */
                <div className="relative shrink-0 hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                  {/* Employer Quick Action */}
                  {role === "employer" && (
                    <button
                      onClick={() => setTab("post-job")}
                      className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#071A2E] rounded-xl shadow-xs cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                      <span>{t(lang, "postJob")}</span>
                    </button>
                  )}

                  {/* Active Session Identity Button - Unified Brand Style */}
                  <button
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#101E33] hover:border-[#F59E0B] transition-all cursor-pointer shrink-0"
                  >
                    {role === "admin" ? (
                      <div className="w-7 h-7 rounded-xl bg-[#0A2540] dark:bg-[#F59E0B] text-[#F59E0B] dark:text-[#0A2540] flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    ) : role === "employer" ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-7 h-7 rounded-xl object-cover border border-[#F59E0B]/50 shrink-0"
                      />
                    ) : (
                      <img
                        src={seeker.avatar}
                        alt={seeker.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#F59E0B]/50 shrink-0"
                      />
                    )}

                    <div className="text-left shrink-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#F59E0B]">
                          {role === "admin" ? t(lang, "administrator") : role === "employer" ? t(lang, "employer") : t(lang, "jobSeeker")}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-none whitespace-nowrap max-w-[120px] truncate">
                        {role === "admin"
                          ? "Azmera Admin"
                          : role === "employer"
                          ? company.name
                          : seeker.name}
                      </p>
                    </div>

                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>

                  {/* Active Session Dropdown Menu */}
                  {accountMenuOpen && (
                    <div className="absolute right-0 top-12 w-72 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Active Authenticated Session
                        </span>
                        <p className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">
                          {currentUser?.name || (role === "admin" ? "Azmera Operations Admin" : role === "employer" ? "Skylight Hotel Recruiter" : "Dawit Bekele")}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {currentUser?.email || (role === "admin" ? "admin@azmerajobs.com" : role === "employer" ? "recruitment@skylighthotel.et" : "dawit.bekele@gmail.com")}
                        </p>
                      </div>

                      {/* Sign Out */}
                      <div className="pt-2 px-3">
                        <button
                          onClick={() => {
                            logout();
                            setAccountMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out (Session Exit)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile & tablet menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE & TABLET DRAWER ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070F1A] px-4 pt-3 pb-6 space-y-4">
            {/* Nav links per role */}
            {role === "guest" && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "landing", label: t(lang, "home") },
                  { id: "search", label: t(lang, "exploreJobs") },
                  { id: "for-employers", label: t(lang, "forEmployers") },
                  { id: "pricing", label: t(lang, "pricingPlans") },
                  { id: "how-it-works", label: t(lang, "howItWorks") },
                  { id: "signin", label: t(lang, "signIn") },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleGuestNavClick(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="p-2.5 text-xs text-left font-bold rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {role === "seeker" && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "dashboard", label: t(lang, "dashboard") },
                  { id: "search", label: t(lang, "exploreJobs") },
                  { id: "applications", label: `${t(lang, "applications")} (${activeAppsCount})` },
                  { id: "messages", label: `${t(lang, "messages")} (2)` },
                  { id: "saved", label: `${t(lang, "savedJobs")} (${savedJobIds.length})` },
                  { id: "profile", label: t(lang, "myProfile") },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 text-xs text-left font-bold rounded-xl transition-colors ${
                      tab === item.id
                        ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540]"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {role === "employer" && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "employer-dashboard", label: t(lang, "dashboard") },
                  { id: "post-job", label: `+ ${t(lang, "postJob")}` },
                  { id: "manage-jobs", label: t(lang, "manageJobs") },
                  { id: "applicants", label: t(lang, "applicants") },
                  { id: "talent-sourcing", label: t(lang, "findTalent") },
                  { id: "messages", label: t(lang, "messages") },
                  { id: "interviews", label: t(lang, "interviews") },
                  { id: "billing", label: t(lang, "billingGateways") },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 text-xs text-left font-bold rounded-xl transition-colors ${
                      tab === item.id
                        ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540]"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {role === "admin" && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "admin-dashboard", label: t(lang, "adminConsole") },
                  { id: "admin-approvals", label: t(lang, "jobApprovals") },
                  { id: "admin-payments", label: `💳 ${t(lang, "paymentAudit")}` },
                  { id: "admin-companies", label: `🏢 ${t(lang, "verifiedEmployers")}` },
                  { id: "admin-talent", label: `🎯 ${t(lang, "talentDirectory")}` },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 text-xs text-left font-bold rounded-xl transition-colors ${
                      tab === item.id
                        ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540]"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* ── HOW IT WORKS INTERACTIVE GUIDE MODAL ── */}
      {howItWorksModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#0A2540] text-[#F59E0B] flex items-center justify-center font-black">
                  💡
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                    How Azmera Jobs Operates
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Connecting Talent With Opportunity across Ethiopia
                  </p>
                </div>
              </div>
              <button
                onClick={() => setHowItWorksModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Audience Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
              <button
                onClick={() => setHowItWorksTab("seeker")}
                className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  howItWorksTab === "seeker"
                    ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setHowItWorksTab("employer")}
                className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  howItWorksTab === "employer"
                    ? "bg-[#F59E0B] text-[#0A2540] shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                For Employers &amp; Recruiters
              </button>
            </div>

            {howItWorksTab === "seeker" ? (
              <div className="space-y-4">
                {[
                  {
                    num: "1",
                    title: "Create Digital Profile & Verified CV",
                    desc: "Build your candidate resume with education, work history, and skills in under 2 minutes.",
                  },
                  {
                    num: "2",
                    title: "Apply Online or Fast-Track via Telegram",
                    desc: "Browse verified vacancies with transparent ETB compensation. For priority roles, message Azmera directly on Telegram (@AzmeraJobConnect) or call (+251 91 100 0000).",
                  },
                  {
                    num: "3",
                    title: "Interview & Immediate Placement",
                    desc: "Track application progress in real time (Submitted, Review, Shortlisted, Interview, Accepted) and join top teams.",
                  },
                ].map((s) => (
                  <div
                    key={s.num}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#0A2540] text-[#F59E0B] font-black text-sm flex items-center justify-center shrink-0">
                      {s.num}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {s.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setHowItWorksModalOpen(false);
                      setTab("landing");
                      setTimeout(() => {
                        const el = document.getElementById("how-it-works");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="px-4 py-2 text-xs font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline cursor-pointer"
                  >
                    View on page ↓
                  </button>
                  <button
                    onClick={() => {
                      setHowItWorksModalOpen(false);
                      setTab("search");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#0A2540] text-white text-xs font-extrabold shadow-xs cursor-pointer hover:bg-[#07192C]"
                  >
                    Explore Open Vacancies →
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  {
                    num: "1",
                    title: "Post Vacancies in Microsoft Word Mode",
                    desc: "Format complete job specifications with headings, tables, flyer banners, and downloadable official PDF circulars.",
                  },
                  {
                    num: "2",
                    title: "Azmera Candidate Pre-Screening",
                    desc: "Our recruitment agency pre-screens and shortlists candidates through direct phone interviews and online CV evaluation.",
                  },
                  {
                    num: "3",
                    title: "Manage Pipeline & Extend Offers",
                    desc: "Review candidate profiles, schedule interviews into your calendar, and hire top qualified Ethiopian talent.",
                  },
                ].map((s) => (
                  <div
                    key={s.num}
                    className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/60 flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#F59E0B] text-[#0A2540] font-black text-sm flex items-center justify-center shrink-0">
                      {s.num}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {s.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setHowItWorksModalOpen(false);
                      showToast("Sign in or register an Employer account to post vacancies.", "info");
                      setTab("signin");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#F59E0B] text-[#0A2540] text-xs font-black shadow-xs hover:bg-[#D97706] cursor-pointer"
                  >
                    Post a Vacancy Now →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
