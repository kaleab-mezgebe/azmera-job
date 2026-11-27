"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t, tCategory, tWorkplaceType, tJobType } from "@/lib/i18n";
import { MOCK_CATEGORIES, ETHIOPIAN_LOCATIONS } from "@/data/mockData";
import { BASE_PATH } from "@/lib/constants";
import { stripRichFormatting } from "@/components/common/RichDocumentRenderer";
import FeatureQuickHub from "@/components/common/FeatureQuickHub";
import {
  Search,
  MapPin,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Users,
  Award,
  Bookmark,
  ChevronRight,
  Code,
  Landmark,
  Palette,
  Truck,
  Radio,
  BarChart3,
  Globe2,
  Send,
  Phone,
  Flame,
  FileText,
  Star,
  Check,
  Zap,
  ArrowUpRight,
  Clock,
  Layers,
  FileCheck,
  Calendar,
} from "lucide-react";

export default function LandingView() {
  const {
    role,
    jobs,
    candidates,
    setTab,
    selectJob,
    toggleSaveJob,
    isJobSaved,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    selectedCategory,
    setSelectedCategory,
    showToast,
    openPaymentModal,
    lang,
  } = useApp();

  const goEmployerTab = (targetTab: string, customMsg?: string) => {
    if (role === "employer") {
      setTab(targetTab);
    } else {
      showToast(customMsg || "Please sign in with an Employer account to continue.", "info");
      setTab("signin");
    }
  };

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localLocation, setLocalLocation] = useState(
    selectedLocation === "All Locations (Ethiopia)" ? "" : selectedLocation
  );
  const [localCategory, setLocalCategory] = useState(
    selectedCategory || "All Categories"
  );
  const [activeJobTab, setActiveJobTab] = useState<
    "all" | "direct" | "hospitality" | "ngo" | "tech" | "banking"
  >("all");
  const [activeAudienceTab, setActiveAudienceTab] = useState<"seeker" | "employer">(
    "seeker"
  );

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    if (localLocation) setSelectedLocation(localLocation);
    if (localCategory && localCategory !== "All Categories") {
      setSelectedCategory(localCategory);
    }
    setTab("search");
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return Code;
      case "Landmark":
        return Landmark;
      case "Palette":
        return Palette;
      case "TrendingUp":
        return TrendingUp;
      case "Truck":
        return Truck;
      case "Radio":
        return Radio;
      case "BarChart3":
        return BarChart3;
      default:
        return Briefcase;
    }
  };

  // Filter jobs for featured grid
  const filteredFeaturedJobs = jobs.filter((job) => {
    if (activeJobTab === "direct") return job.directAgentApply;
    if (activeJobTab === "hospitality")
      return (
        job.category.toLowerCase().includes("hospitality") ||
        job.title.toLowerCase().includes("skylight") ||
        job.title.toLowerCase().includes("hotel")
      );
    if (activeJobTab === "ngo")
      return (
        job.category.toLowerCase().includes("management") ||
        job.companyId === "tdrf" ||
        job.companyId === "unicef" ||
        job.title.toLowerCase().includes("director")
      );
    if (activeJobTab === "tech")
      return (
        job.category.toLowerCase().includes("software") ||
        job.category.toLowerCase().includes("design") ||
        job.skills.some((s) => ["Next.js", "Python", "TypeScript", "DevOps"].includes(s))
      );
    if (activeJobTab === "banking")
      return (
        job.category.toLowerCase().includes("banking") ||
        job.category.toLowerCase().includes("finance") ||
        job.companyId === "dashen" ||
        job.companyId === "chapa"
      );
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen theme-bg theme-text">
      {/* ── 1. TALENTHUB STYLE HERO SECTION (CENTERED + 3-ZONE SEARCH CAPSULE + 4-COLUMN STATS) ── */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-[#F9FBFA] via-[#FFFFFF] to-[#F3F7F5] dark:from-[#060D17] dark:via-[#091526] dark:to-[#0C1B2E]">
        {/* Soft ambient background warmth & dot matrix */}
        <div className="absolute inset-0 hero-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[min(92vw,720px)] h-[360px] bg-gradient-to-r from-[#F59E0B]/15 via-amber-300/10 to-[#0A2540]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill Tag - Azmera Official */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-[#F59E0B]/15 border border-amber-200 dark:border-[#F59E0B]/30 text-xs font-bold text-[#B45309] dark:text-[#FBBF24] shadow-xs mb-6">
            <span className="text-[#F59E0B] dark:text-[#FBBF24]">✦</span>
            <span>{t(lang, "heroBadge")}</span>
          </div>

          {/* Centered High-Impact Headline with Underline Bar */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0A2540] dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            {t(lang, "heroTitlePart1")}
            <br />
            <span className="relative inline-block mt-2 sm:mt-3">
              {t(lang, "heroTitlePart2")}
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-[#F59E0B] rounded-full" />
            </span>
          </h1>

          {/* Centered Subtitle */}
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-6 text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            {t(lang, "heroSubtitle")}
          </p>

          {/* Centerpiece: The Floating Search Capsule (3 distinct fields + Azmera Gold CTA) */}
          <form
            onSubmit={handleHeroSearch}
            className="mt-10 p-2 sm:p-2.5 rounded-2xl md:rounded-full bg-white dark:bg-[#101E33] border border-slate-200/90 dark:border-slate-700/80 shadow-xl shadow-[#0A2540]/10 dark:shadow-black/60 flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto transition-all focus-within:border-[#F59E0B] focus-within:ring-4 focus-within:ring-[#F59E0B]/15"
          >
            {/* Field 1: Keyword search */}
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder={t(lang, "heroSearchPlaceholder")}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 outline-none font-medium"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => setLocalSearch("")}
                  className="text-xs text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Divider 1 */}
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700 shrink-0" />

            {/* Field 2: Location dropdown */}
            <div className="w-full md:w-52 flex items-center gap-2.5 px-4 py-2 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
              <MapPin className="w-5 h-5 text-[#F59E0B] shrink-0" />
              <select
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-slate-200 outline-none cursor-pointer font-medium"
              >
                <option value="" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">
                  {t(lang, "heroLocationPlaceholder")}
                </option>
                {ETHIOPIAN_LOCATIONS.filter((l) => !l.includes("All Locations")).map(
                  (loc) => (
                    <option
                      key={loc}
                      value={loc}
                      className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white"
                    >
                      {loc}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Divider 2 */}
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700 shrink-0" />

            {/* Field 3: Category dropdown */}
            <div className="w-full md:w-56 flex items-center gap-2.5 px-4 py-2 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
              <Layers className="w-5 h-5 text-slate-400 shrink-0" />
              <select
                value={localCategory}
                onChange={(e) => setLocalCategory(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-slate-200 outline-none cursor-pointer font-medium"
              >
                <option value="All Categories" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">
                  {t(lang, "allCategories")}
                </option>
                {MOCK_CATEGORIES.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.name}
                    className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white"
                  >
                    {tCategory(lang, cat.name)}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-7 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A2540] font-extrabold text-sm sm:text-base rounded-xl md:rounded-full shadow-lg shadow-[#F59E0B]/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
            >
              <span>{t(lang, "searchJobs")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Popular Search Suggestions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-700 dark:text-slate-300">{t(lang, "popular")}</span>
            {[
              "Software & Next.js",
              "Skylight Hotel (124 Openings)",
              "TDRF Mekelle (NGO)",
              "Commercial Bank",
              "Bole, Addis Ababa",
              "⚡ Fast-Track Direct Apply",
            ].map((term) => (
              <button
                key={term}
                onClick={() => {
                  if (term.includes("Fast-Track")) {
                    setActiveJobTab("direct");
                    setTab("search");
                  } else {
                    setSearchQuery(term);
                    setTab("search");
                  }
                }}
                className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-slate-600 dark:text-slate-300 hover:border-[#F59E0B] hover:text-[#0A2540] dark:hover:text-[#F59E0B] text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>

          {/* 4-Column Stats Strip directly below the capsule (Exact TalentHub layout) */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 text-center">
            <div className="py-4 px-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] dark:text-white tracking-tight">
                4,200+
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400 mt-1">
                {t(lang, "activeJobs")}
              </div>
            </div>
            <div className="py-4 px-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] dark:text-white tracking-tight">
                850+
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400 mt-1">
                {t(lang, "companies")}
              </div>
            </div>
            <div className="py-4 px-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] dark:text-white tracking-tight">
                92,000+
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400 mt-1">
                {t(lang, "jobSeekersCount")}
              </div>
            </div>
            <div className="py-4 px-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] dark:text-white tracking-tight">
                94%
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400 mt-1">
                {t(lang, "successRate")}
              </div>
            </div>
          </div>

          {/* Azmera Job Matchmaking Banner & Girl Mascot Spotlight */}
          <div className="mt-12 max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl border-2 border-amber-200 dark:border-amber-900/60 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/90 dark:from-[#111C2E] dark:via-[#132238] dark:to-[#111C2E] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-[#F59E0B] shadow-md overflow-hidden bg-white shrink-0">
                <img
                  src={`${BASE_PATH}/azmera-logo.png`}
                  alt="Azmera Jobs Logo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    Azmera Job Connect
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#0A2540] text-[#F59E0B] dark:bg-[#F59E0B] dark:text-[#0A2540]">
                    {t(lang, "verifiedOnly")}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md font-medium leading-relaxed">
                  {t(lang, "jobMatchDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href="https://t.me/AzmeraJobConnect"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                <span>{t(lang, "applyTelegram")}</span>
              </a>
              <button
                onClick={() => goEmployerTab("post-job", "Sign in with an Employer account to post a job.")}
                className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-[#0A2540] hover:bg-[#07192C] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <Building2 className="w-4 h-4 text-[#F59E0B]" />
                <span>{t(lang, "postJobNavy")}</span>
              </button>
            </div>
          </div>

          {/* Core Feature Launcher & Ethiopian Usability Hub */}
          <div className="mt-12 text-left">
            <FeatureQuickHub />
          </div>
        </div>
      </section>

      {/* ── 2. TRUSTED BY INDUSTRY LEADERS & ENTERPRISES ── */}
      <section className="py-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070F1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
            {t(lang, "trustedBy")}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-center">
            {[
              { name: "Ethiopian Skylight", tag: "124 Openings", icon: "🏨" },
              { name: "Dashen Bank", tag: "Commercial Banking", icon: "🏛️" },
              { name: "Chapa Technologies", tag: "FinTech Switch", icon: "💳" },
              { name: "UNICEF Ethiopia", tag: "Humanitarian Org", icon: "🇺🇳" },
              { name: "TDRF Tigray", tag: "Relief Fund", icon: "🤝" },
              { name: "Kuraz Technologies", tag: "Design & Software", icon: "💻" },
            ].map((co, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0A1628] hover:border-[#F59E0B] transition-all flex items-center gap-3 group cursor-pointer"
                onClick={() => {
                  setSearchQuery(co.name);
                  setTab("search");
                }}
              >
                <span className="text-xl">{co.icon}</span>
                <div className="truncate">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-[#F59E0B]">
                    {co.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">
                    {co.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BENTO GRID: THE AZMERA RECRUITMENT ADVANTAGE ── */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 text-xs font-bold text-[#0A2540] dark:text-[#FBBF24]">
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{t(lang, "modernRecruitmentStandard")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t(lang, "recruitmentAdvantageTitle")}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t(lang, "recruitmentAdvantageSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Fast-Track Direct Apply (Large) */}
          <div className="md:col-span-2 p-8 rounded-3xl border-2 border-amber-300 dark:border-amber-800/80 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white dark:to-[#101E33] shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] text-[#0A2540] flex items-center justify-center font-black text-xl shadow-md">
                  ⚡
                </div>
                <span className="px-3 py-1 rounded-full bg-[#F59E0B] text-[#0A2540] font-black text-xs">
                  {t(lang, "verifiedOnly")}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {t(lang, "directScreeningTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal max-w-xl">
                {t(lang, "directScreeningDesc")}
              </p>
            </div>

            <div className="pt-4 border-t border-amber-200 dark:border-amber-900/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t(lang, "zeroAgencyFee")}</span>
              </div>
              <button
                onClick={() => {
                  setActiveJobTab("direct");
                  setTab("search");
                }}
                className="px-4 py-2 rounded-xl bg-[#0A2540] text-white text-xs font-bold hover:bg-[#07192C] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>{t(lang, "viewFastTrack")}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
              </button>
            </div>
          </div>

          {/* Bento Card 2: 100% Salary Transparency */}
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {t(lang, "salaryTransparencyTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(lang, "salaryTransparencyDesc")}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
              <span className="text-[11px] font-extrabold text-emerald-900 dark:text-emerald-300 block">
                Top Compensation Range:
              </span>
              <span className="text-base font-black text-emerald-700 dark:text-emerald-400">
                15,000 - 195,000 ETB / month
              </span>
            </div>
          </div>

          {/* Bento Card 3: Word-Style Document Editor & Attachments */}
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0078D4]/10 text-[#0078D4] flex items-center justify-center font-black text-lg">
                W
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {t(lang, "wordCircularTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t(lang, "wordCircularDesc")}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <FileCheck className="w-4 h-4 text-[#0078D4]" />
              <span>{t(lang, "downloadToR")}</span>
            </div>
          </div>

          {/* Bento Card 4: Multi-Regional Footprint (Large) */}
          <div className="md:col-span-2 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center">
                  <Globe2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                  Addis Ababa • Mekelle • Hawassa • Dire Dawa
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {t(lang, "multiRegionalTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                {t(lang, "multiRegionalDesc")}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center font-bold">
                Addis Ababa (3,100+)
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center font-bold">
                Mekelle (140+)
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center font-bold">
                Hawassa (280+)
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-center font-bold">
                Dire Dawa (210+)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED VACANCIES WITH INTERACTIVE SECTOR TABS ── */}
      <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#07111D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#0A2540] dark:text-[#F59E0B] uppercase tracking-wider">
                HANDPICKED VERIFIED OPENINGS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                {t(lang, "featuredVacancies")}
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: "all", label: "🔥 All Handpicked" },
                { id: "direct", label: "⚡ Fast-Track Direct Apply" },
                { id: "hospitality", label: "🏨 Hospitality (Skylight 124)" },
                { id: "ngo", label: "🏛️ NGO & Leadership (TDRF)" },
                { id: "tech", label: "💻 Tech & Software" },
                { id: "banking", label: "💳 Banking & Finance" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveJobTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeJobTab === tab.id
                    ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-sm"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#F59E0B]"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFeaturedJobs.slice(0, 6).map((job) => {
              const saved = isJobSaved(job.id);
              return (
                <div
                  key={job.id}
                  className="rounded-3xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#101E33] hover:shadow-xl hover:border-[#F59E0B] transition-all p-5 sm:p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Company & Bookmark */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 truncate">
                        <img
                          src={job.companyLogo}
                          alt={job.companyName}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 bg-white shrink-0 shadow-2xs"
                        />
                        <div className="truncate">
                          <div className="flex items-center gap-1 truncate">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                              {job.companyName}
                            </span>
                            {job.verified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#38BDF8] shrink-0" />
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                            <MapPin className="w-3 h-3 text-[#0A2540] dark:text-[#F59E0B] shrink-0" />
                            {job.location}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${saved
                          ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-[#D97706]"
                          : "border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        title={saved ? "Saved" : "Save job"}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${saved ? "fill-[#F59E0B] text-[#F59E0B]" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Job Title */}
                    <h3
                      onClick={() => selectJob(job.id)}
                      className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-[#F59E0B] transition-colors cursor-pointer line-clamp-1"
                    >
                      {job.title}
                    </h3>

                    {/* Description Excerpt */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {stripRichFormatting(job.description)}
                    </p>

                    {/* Tags: Openings, Direct Apply & Type */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {job.directAgentApply && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-black bg-[#F59E0B] text-[#0A2540] flex items-center gap-1 shadow-2xs">
                          ⚡ {t(lang, "directApplyBadge")}
                        </span>
                      )}
                      {job.openingsCount && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-black bg-amber-50 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 flex items-center gap-1">
                          🔥 {job.openingsCount} Vacancies
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {tJobType(lang, job.type)}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#EEF4FA] dark:bg-slate-800 text-[#0A2540] dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {tWorkplaceType(lang, job.workplaceType)}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Salary and Apply */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
                        {t(lang, "salary")}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-[#FBBF24]">
                        {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}{" "}
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          ETB
                        </span>
                      </span>
                    </div>

                    <button
                      onClick={() => selectJob(job.id)}
                      className="px-4 py-2 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                    >
                      <span>{t(lang, "viewDetails")}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setTab("search")}
              className="px-6 py-3 rounded-2xl bg-white dark:bg-[#101E33] border-2 border-slate-200 dark:border-slate-700 hover:border-[#F59E0B] text-xs font-extrabold text-slate-900 dark:text-white inline-flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <span>Explore All {jobs.length} Active Positions</span>
              <ChevronRight className="w-4 h-4 text-[#F59E0B]" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. TOP PRE-SCREENED ETHIOPIAN TALENT SHOWCASE (TECH RECRUITER STYLE) ── */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 text-xs font-bold text-[#0A2540] dark:text-[#FBBF24]">
              <Users className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>PRE-SCREENED TALENT POOL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Top Ethiopian Candidates Ready for Immediate Hire
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Engineers, directors, hotel specialists, and designers vetted by Azmera Job Connect.
            </p>
          </div>

          <button
            onClick={() => goEmployerTab("applicants", "Sign in with an Employer account to view candidates.")}
            className="text-xs sm:text-sm font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View Full Talent Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {candidates.slice(0, 4).map((cand) => (
            <div
              key={cand.id}
              className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-sm hover:shadow-lg hover:border-[#F59E0B] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#F59E0B] shadow-xs"
                  />
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200">
                    AVAILABLE NOW
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-[#F59E0B] transition-colors">
                  {cand.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                  {cand.title}
                </p>

                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-2">
                  <MapPin className="w-3 h-3 text-[#0A2540] dark:text-[#F59E0B]" />
                  <span>{cand.location}</span>
                  <span>•</span>
                  <span>{cand.experienceYears}+ yrs exp</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                  {cand.bio}
                </p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {cand.skills.slice(0, 3).map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => goEmployerTab("applicants", `Sign in as an Employer to view ${cand.name}'s profile.`)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#0A2540] hover:text-white dark:hover:bg-[#F59E0B] dark:hover:text-[#0A2540] text-xs font-bold text-slate-800 dark:text-white transition-colors cursor-pointer"
                >
                  Request Candidate Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. TWO AUDIENCES: HOW AZMERA WORKS (DUAL FLOW) ── */}
      <section id="how-it-works" className="py-16 md:py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070F1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-extrabold text-[#F59E0B] uppercase tracking-wider">
              STREAMLINED TWO-SIDED PLATFORM
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {t(lang, "howItWorksTitle")}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t(lang, "howItWorksSubtitle")}
            </p>

            {/* Audience Switcher Tabs */}
            <div className="pt-3 flex justify-center">
              <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl inline-flex">
                <button
                  onClick={() => setActiveAudienceTab("seeker")}
                  className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${activeAudienceTab === "seeker"
                    ? "bg-[#0A2540] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                    }`}
                >
                  {t(lang, "jobSeeker")}
                </button>
                <button
                  onClick={() => setActiveAudienceTab("employer")}
                  className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${activeAudienceTab === "employer"
                    ? "bg-[#F59E0B] text-[#0A2540] shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                    }`}
                >
                  {t(lang, "forEmployers")}
                </button>
              </div>
            </div>
          </div>

          {activeAudienceTab === "seeker" ? (
            /* Seeker 3 Steps */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Build Verified Profile & CV",
                  desc: "Create your free digital resume highlighting university degrees, technical skills, and work history.",
                  badge: "Takes 2 Minutes",
                },
                {
                  step: "02",
                  title: "Explore or Fast-Track Apply",
                  desc: "Browse verified vacancies with transparent ETB salaries or connect directly via Telegram for walk-in roles.",
                  badge: "100% Salary Transparency",
                },
                {
                  step: "03",
                  title: "Interview & Immediate Placement",
                  desc: "Receive real-time application updates and schedule Google Meet or venue interviews with top employers.",
                  badge: "94% Placement Success",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#101E33] space-y-4 relative"
                >
                  <span className="text-3xl font-black text-[#0A2540] dark:text-[#F59E0B]">
                    {item.step}
                  </span>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase">
                    {item.badge}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* Employer 3 Steps */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Author Vacancies in Word Mode",
                  desc: "Format complete job specifications with headings, tables, flyer images, and downloadable PDF circulars.",
                  badge: "Word Ribbon Editor",
                },
                {
                  step: "02",
                  title: "Azmera Candidate Pre-Screening",
                  desc: "Our agency team screens and shortlists qualified candidates directly via Telegram, phone, and online CVs.",
                  badge: "Saves 14+ Days to Hire",
                },
                {
                  step: "03",
                  title: "One-Click Interview Scheduling",
                  desc: "Review candidate profiles, schedule interviews into your calendar, and extend verified employment offers.",
                  badge: "Top Talent Pipeline",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#101E33] space-y-4 relative"
                >
                  <span className="text-3xl font-black text-[#F59E0B]">
                    {item.step}
                  </span>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase">
                    {item.badge}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 7. CLIENT & CANDIDATE TESTIMONIALS ── */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold text-[#0A2540] dark:text-[#F59E0B] uppercase tracking-wider">
            VERIFIED FEEDBACK
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            What Leaders &amp; Professionals Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "Azmera's fast-track recruitment allowed us to interview and place hospitality specialists across 124 vacancies in record time. Outstanding agency reliability in Addis Ababa.",
              name: "Yohannes Tekle",
              title: "Talent Acquisition Director",
              company: "Ethiopian Skylight Hotel",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
            },
            {
              quote:
                "The reach of Azmera Job Connect across Mekelle and Tigray for our Executive Director search gave us immediate access to qualified, mission-driven diaspora and local leaders.",
              name: "Mulugeta Gebre",
              title: "Operations Board Member",
              company: "Tigray Disaster Relief Fund (TDRF)",
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
            },
            {
              quote:
                "Transparent ETB salary ranges from day one! I applied via Telegram directly to Azmera, had my screening interview the same week, and was placed at a top FinTech firm.",
              name: "Selamawit Bekele",
              title: "Software Engineer",
              company: "Placed at Chapa Technologies",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
            },
          ].map((testi, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                &ldquo;{testi.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={testi.avatar}
                  alt={testi.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#F59E0B]"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {testi.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {testi.title} • {testi.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING & PAYMENT GATEWAYS (TELEBIRR, CBE, M-PESA) ── */}
      <section id="pricing" className="py-16 md:py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#070F1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0A2540] dark:text-[#F59E0B] uppercase tracking-wider">
              ETHIOPIAN MONETIZATION &amp; PAYMENT GATEWAYS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {t(lang, "pricingTitle")}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t(lang, "pricingSubtitle")}
            </p>
          </div>

          {/* 3 Payment Methods Visual Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Telebirr Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#101E33] border border-emerald-500/30 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#00843D] text-white flex items-center justify-center font-black text-sm shadow-md shadow-[#00843D]/20">
                  tb
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">telebirr</h3>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.2 rounded">Fast</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Merchant ID: <strong>884219</strong> • *127#
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                SuperApp QR
              </span>
            </div>

            {/* CBE Bank Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#101E33] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#0A2540] text-[#F59E0B] flex items-center justify-center font-black text-sm shadow-md">
                  CBE
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">CBE Bank &amp; CBE Birr</h3>
                    <span className="text-[10px] font-bold text-[#0A2540] dark:text-[#F59E0B] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded">#1 Bank</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Acc: <strong>1000 4829 19283</strong>
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0A2540] dark:text-[#F59E0B]">
                Mobile &amp; USSD
              </span>
            </div>

            {/* M-Pesa Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#101E33] border border-green-500/30 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#00B04F] text-white flex items-center justify-center font-black text-sm shadow-md shadow-[#00B04F]/20">
                  MP
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">M-Pesa Safaricom</h3>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-950 px-1.5 py-0.2 rounded">1-Tap STK</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Till / Shortcode: <strong>782100</strong>
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-600 dark:text-green-400">
                Phone Prompt
              </span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Standard Post */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#101E33] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {t(lang, "standardPlan")}
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Standard Vacancy
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">500</span>
                  <span className="text-xs font-bold text-slate-500">ETB / 30 Days</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Ideal for single role hiring across cafes, retail, or standard office positions in Ethiopia.
                </p>
                <ul className="space-y-2 text-xs pt-2">
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Live on portal for 30 days</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Candidate application dashboard</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Pay via Telebirr, CBE, or M-Pesa</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() =>
                  openPaymentModal({
                    amount: 500,
                    purpose: "job_post_standard",
                    purposeLabel: "Standard Vacancy Post (500 ETB)",
                    title: "Standard Post Payment",
                  })
                }
                className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-[#0A2540] hover:text-white text-xs font-bold text-slate-900 dark:text-white transition-colors cursor-pointer"
              >
                {t(lang, "chooseStandard")}
              </button>
            </div>

            {/* Featured Post (Most Popular) */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#101E33] border-2 border-amber-400 shadow-xl shadow-amber-500/10 flex flex-col justify-between space-y-4 relative ring-2 ring-amber-400/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-white text-[10px] font-black rounded-full uppercase shadow-md">
                {t(lang, "mostPopular")}
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {t(lang, "featuredPlan")}
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Featured + Fast-Track
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-amber-600 dark:text-amber-400">1,500</span>
                  <span className="text-xs font-bold text-slate-500">ETB / 30 Days</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Maximum visibility with gold badge, pinned to the top of category searches and 48-hour matching.
                </p>
                <ul className="space-y-2 text-xs pt-2">
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>🔥 Gold FEATURED badge pinned at top</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Telegram @AzmeraJobConnect alert (92k+ reach)</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>48-Hour Talent Matching by Azmera</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() =>
                  openPaymentModal({
                    amount: 1500,
                    purpose: "job_post_featured",
                    purposeLabel: "Featured Vacancy + Fast-Track (1,500 ETB)",
                    title: "Featured Post Payment",
                  })
                }
                className="w-full py-3 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0A2540] text-xs font-black shadow-md shadow-[#F59E0B]/20 transition-all cursor-pointer"
              >
                Pay 1,500 ETB (Telebirr • CBE • M-Pesa)
              </button>
            </div>

            {/* Omnichannel VIP Broadcast */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#101E33] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A2540] dark:text-[#F59E0B]">
                  {t(lang, "vipPlan")}
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  VIP Mega Broadcast
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">2,500</span>
                  <span className="text-xs font-bold text-slate-500">ETB / Priority</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Multi-lingual broadcast across Telegram and Facebook with 14-day replacement guarantee.
                </p>
                <ul className="space-y-2 text-xs pt-2">
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Trilingual broadcast (Amharic, Tigrigna, English)</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>14-Day Free Candidate Replacement Guarantee</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Direct phone screening by Azmera team</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() =>
                  openPaymentModal({
                    amount: 2500,
                    purpose: "social_broadcast",
                    purposeLabel: "VIP Omnichannel Broadcast (2,500 ETB)",
                    title: "VIP Broadcast Payment",
                  })
                }
                className="w-full py-3 rounded-2xl bg-[#0A2540] hover:bg-[#07192C] text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Pay 2,500 ETB (Telebirr • CBE • M-Pesa)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. TELEGRAM COMMUNITY & ENTERPRISE CTA BANNER ── */}
      <section className="bg-gradient-to-r from-[#0A2540] via-[#0D2947] to-[#0A2540] border-y border-[#F59E0B]/30 py-16 sm:py-20 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#F59E0B] text-xs font-extrabold border border-[#F59E0B]/30">
            <Sparkles className="w-4 h-4" />
            <span>CONNECT WITH AZMERA JOBS</span>
          </div>

          <h2 className="text-2xl sm:text-5xl font-black tracking-tight">
            {t(lang, "telegramBannerTitle")}
          </h2>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {t(lang, "telegramBannerDesc")}
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => setTab("role-selection")}
              className="px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A2540] font-black text-sm rounded-2xl shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              {t(lang, "getStarted")}
            </button>

            <a
              href="https://t.me/AzmeraJobConnect"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>{t(lang, "joinTelegramBtn")}</span>
            </a>

            <button
              onClick={() => goEmployerTab("post-job", "Sign in as an Employer to post a job.")}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl transition-all border border-white/30 cursor-pointer"
            >
              {t(lang, "postJobNavy")}
            </button>
          </div>
        </div>
      </section>

      {/* ── 9. PROFESSIONAL FOOTER ── */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060E18] pt-14 pb-20 lg:pb-14 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-[#F59E0B] bg-white shadow-xs shrink-0">
                <img
                  src={`${BASE_PATH}/azmera-logo.png`}
                  alt="Azmera Logo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <span className="font-black text-base text-slate-900 dark:text-white">
                  Azmera<span className="text-[#F59E0B]">Jobs</span>
                </span>
                <p className="text-[10px] text-[#F59E0B] font-bold">
                  {t(lang, "tagline")}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Ethiopia&apos;s leading employment marketplace connecting verified talent with top employers across Addis Ababa, Mekelle, Hawassa, and nationwide.
            </p>
            <div className="flex items-center gap-2 pt-1 text-slate-700 dark:text-slate-300">
              <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="font-bold">+251 91 100 0000</span>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Follow &amp; Connect
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  {
                    name: "Telegram",
                    href: "https://t.me/AzmeraJobConnect",
                    label: "TG",
                    cls: "hover:bg-[#0088cc] hover:text-white hover:border-[#0088cc]",
                  },
                  {
                    name: "Facebook",
                    href: "https://facebook.com/AzmeraJobs",
                    label: "FB",
                    cls: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
                  },
                  {
                    name: "LinkedIn",
                    href: "https://linkedin.com/company/azmera-jobs",
                    label: "IN",
                    cls: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
                  },
                  {
                    name: "WhatsApp",
                    href: "https://wa.me/251911000000",
                    label: "WA",
                    cls: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
                  },
                  {
                    name: "TikTok",
                    href: "https://tiktok.com/@azmerajobs",
                    label: "TT",
                    cls: "hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900",
                  },
                  {
                    name: "YouTube",
                    href: "https://youtube.com/@azmerajobs",
                    label: "YT",
                    cls: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    aria-label={`Azmera Jobs on ${s.name}`}
                    className={`px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-[10px] font-black text-slate-700 dark:text-slate-200 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs ${s.cls}`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              For Job Seekers
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setTab("search")} className="hover:text-[#F59E0B] transition-colors">
                  Browse All Vacancies
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveJobTab("direct");
                    setTab("search");
                  }}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Fast-Track Direct Apply
                </button>
              </li>
              <li>
                <button onClick={() => setTab("role-selection")} className="hover:text-[#F59E0B] transition-colors">
                  Create Candidate Profile
                </button>
              </li>
              <li>
                <a href="https://t.me/AzmeraJobConnect" target="_blank" rel="noopener noreferrer" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1">
                  Telegram Job Alerts
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              For Employers &amp; HR
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => goEmployerTab("post-job")}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Post a Vacancy (Word Mode)
                </button>
              </li>
              <li>
                <button
                  onClick={() => goEmployerTab("employer-dashboard")}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Social Media Broadcast Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => goEmployerTab("applicants")}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Pre-Screened Talent Search
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Regional Hubs
            </h4>
            <ul className="space-y-2">
              <li>Addis Ababa (Bole, Kazanchis, Summit 72)</li>
              <li>Mekelle (Tigray Regional Center)</li>
              <li>Hawassa (Industrial &amp; Tourism)</li>
              <li>Dire Dawa (Commercial &amp; Trade)</li>
              <li className="pt-2 text-[11px] text-[#F59E0B] font-bold">
                Languages: English • Amharic • Afaan Oromo • Tigrigna
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© 2026 Azmera Jobs (Azmera Job Connect). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Verification Standards</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
