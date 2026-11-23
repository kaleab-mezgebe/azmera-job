"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { MOCK_CATEGORIES, ETHIOPIAN_LOCATIONS } from "@/data/mockData";
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
    jobs,
    candidates,
    setRole,
    setTab,
    selectJob,
    toggleSaveJob,
    isJobSaved,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    showToast,
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localLocation, setLocalLocation] = useState(
    selectedLocation === "All Locations (Ethiopia)" ? "" : selectedLocation
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
      {/* ── 1. ULTRA-PREMIUM TECH RECRUITER HERO SECTION ── */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-20 lg:py-24 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/60 dark:from-[#060D17] dark:via-[#091526] dark:to-[#0C1B2E]">
        {/* Subtle dot matrix & glowing mesh */}
        <div className="absolute inset-0 hero-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#0A2540]/10 via-[#F59E0B]/15 to-[#0A2540]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Authoritative Messaging & Dual-Action CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 border border-[#0A2540]/15 dark:border-[#F59E0B]/30 text-xs font-bold text-[#0A2540] dark:text-[#FBBF24] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>ETHIOPIA&apos;S PREMIER RECRUITMENT &amp; TALENT PLATFORM</span>
                <span className="text-[10px] text-slate-400">•</span>
                <span className="text-[11px] font-extrabold text-[#F59E0B]">4,200+ ACTIVE OPENINGS</span>
              </div>

              {/* High-Impact Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-900 dark:text-white">
                Connecting Top Ethiopian Talent With{" "}
                <span className="text-[#F59E0B] relative inline-block">
                  Opportunity.
                  <svg
                    className="absolute left-0 -bottom-2 w-full h-3.5 text-[#F59E0B]/40"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 6 Q 50 12, 100 6"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                Discover pre-screened vacancies with transparent ETB salaries at Ethiopia&apos;s leading tech enterprises, commercial banks, 5-star hotels, international NGOs, and startups. Fast-track placement via Azmera Job Connect.
              </p>

              {/* Dual Role Quick Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  onClick={() => setTab("search")}
                  className="px-6 py-3.5 rounded-2xl bg-[#0A2540] hover:bg-[#07192C] text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-[#0A2540]/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Search className="w-4 h-4 text-[#F59E0B]" />
                  <span>Explore Verified Jobs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setRole("employer");
                    setTab("post-job");
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-white dark:bg-[#101E33] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-extrabold border-2 border-slate-200 dark:border-slate-700 hover:border-[#F59E0B] shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Building2 className="w-4 h-4 text-[#F59E0B]" />
                  <span>Hire Talent / Post Vacancy</span>
                </button>
              </div>

              {/* Advanced Search Console Bar */}
              <form
                onSubmit={handleHeroSearch}
                className="mt-6 p-2 rounded-2xl sm:rounded-full bg-white dark:bg-[#101E33] border-2 border-slate-200 dark:border-slate-700/80 shadow-2xl shadow-[#0A2540]/8 dark:shadow-black/50 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto lg:mx-0 transition-all focus-within:border-[#F59E0B] focus-within:ring-4 focus-within:ring-[#F59E0B]/10"
              >
                <div className="flex-1 w-full flex items-center gap-2.5 px-4 py-1.5">
                  <Search className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by title, skill, or employer (e.g. Next.js, Skylight, TDRF)..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none font-medium"
                  />
                </div>

                <div className="hidden sm:block w-px h-8 bg-slate-200 dark:border-slate-700 shrink-0" />

                <div className="w-full sm:w-56 flex items-center gap-2 px-3 py-1.5 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <MapPin className="w-4 h-4 text-[#0A2540] dark:text-[#38BDF8] shrink-0" />
                  <select
                    value={localLocation}
                    onChange={(e) => setLocalLocation(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-200 outline-none cursor-pointer font-medium"
                  >
                    <option value="" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">
                      All Ethiopian Cities
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

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#0A2540] hover:bg-[#07192C] text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                </button>
              </form>

              {/* Quick Search Chips */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Popular:</span>
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
                    className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-slate-600 dark:text-slate-300 hover:border-[#F59E0B] hover:text-[#0A2540] dark:hover:text-[#F59E0B] text-[11px] font-semibold transition-colors shadow-2xs"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Live Matchmaking Showcase Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Soft ambient backlight */}
                <div className="absolute inset-0 bg-[#0A2540]/10 dark:bg-[#F59E0B]/15 rounded-3xl blur-2xl -z-10" />

                <div className="p-6 sm:p-7 rounded-3xl border-2 border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#101E33] shadow-2xl shadow-[#0A2540]/12 dark:shadow-black/60 relative overflow-hidden space-y-5">
                  {/* Card Header with Verified Status */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        Azmera Recruitment Radar
                      </span>
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#0A2540]/10 text-[#0A2540] dark:bg-[#F59E0B]/20 dark:text-[#FBBF24] border border-[#0A2540]/15 dark:border-[#F59E0B]/30 tracking-wider">
                      VERIFIED AGENCY
                    </span>
                  </div>

                  {/* Mascot Branding Visual */}
                  <div className="flex flex-col items-center text-center py-2">
                    <div className="relative group cursor-pointer" onClick={() => setTab("search")}>
                      <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-[#F59E0B] shadow-2xl p-1 bg-white">
                        <img
                          src="/azmera-logo.png"
                          alt="Azmera - Your Trusted Partner in Jobs"
                          className="w-full h-full object-cover object-top rounded-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-[#0A2540] text-white py-1.5 px-3.5 rounded-2xl shadow-xl border-2 border-[#F59E0B] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-[11px] font-extrabold tracking-wide">
                          100% Verified
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-4 text-xl font-black text-slate-900 dark:text-white">
                      Azmera Jobs
                    </h3>
                    <p className="text-xs font-black tracking-wider text-[#F59E0B]">
                      YOUR TRUSTED PARTNER IN JOBS
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xs font-medium leading-relaxed">
                      Connecting verified Ethiopian professionals &amp; businesses with fast, direct, and transparent hiring.
                    </p>
                  </div>

                  {/* Live Matchmaking Feed (Real placements) */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Live Placement Feed Across Ethiopia
                    </span>
                    <div className="space-y-1.5">
                      {[
                        {
                          name: "Dawit B.",
                          role: "Senior Full Stack",
                          company: "Chapa Technologies",
                          time: "Just now",
                        },
                        {
                          name: "Rahel T.",
                          role: "Hospitality Lead (124 Openings)",
                          company: "Skylight Hotel",
                          time: "12m ago",
                        },
                        {
                          name: "Kassahun M.",
                          role: "Executive Director",
                          company: "TDRF Mekelle",
                          time: "25m ago",
                        },
                      ].map((feed, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="font-extrabold text-slate-900 dark:text-white truncate">
                              {feed.name}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              → {feed.company}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
                            {feed.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fast-Track Direct Apply Banner */}
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">⚡</span>
                      <div>
                        <span className="text-xs font-black text-amber-950 dark:text-amber-200 block">
                          Fast-Track Matchmaking
                        </span>
                        <span className="text-[10px] text-amber-800 dark:text-amber-300">
                          Telegram: @AzmeraJobConnect
                        </span>
                      </div>
                    </div>
                    <a
                      href="https://t.me/AzmeraJobConnect"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-[11px] font-bold flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Join</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Verified Vacancies", value: "4,200+", icon: Briefcase },
              { label: "Vetted Employers", value: "850+", icon: Building2 },
              { label: "Job Seekers Network", value: "92,000+", icon: Users },
              { label: "Placement Success", value: "94%", icon: Award },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-xs flex items-center gap-3.5 hover:border-[#F59E0B] transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 2. TRUSTED BY INDUSTRY LEADERS & ENTERPRISES ── */}
      <section className="py-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070F1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
            TRUSTED BY ETHIOPIA&apos;S INDUSTRY LEADERS &amp; GLOBAL DEVELOPMENT PARTNERS
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
            <span>THE MODERN RECRUITMENT STANDARD</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Top Ethiopian Employers &amp; Talent Choose Azmera
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A purpose-built platform engineered to eliminate ghost jobs, accelerate candidate screening, and offer 100% salary transparency.
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
                  EXCLUSIVE FEATURE
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Direct Agent Screening &amp; Fast-Track Application
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal max-w-xl">
                Skip the resume black hole. For direct customer orders (such as hospitality staff at Skylight, cashier ticketing in Mekelle, or restaurant hosts in 22 Mazoria), candidates apply directly to Azmera via Telegram (<code className="text-amber-800 dark:text-amber-300 font-bold">@AzmeraJobConnect</code>) or direct phone, getting matched with hiring managers in under 48 hours.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-200 dark:border-amber-900/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero agency fee for job seekers • Fast telephone screening</span>
              </div>
              <button
                onClick={() => {
                  setActiveJobTab("direct");
                  setTab("search");
                }}
                className="px-4 py-2 rounded-xl bg-[#0A2540] text-white text-xs font-bold hover:bg-[#07192C] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>View Fast-Track Openings</span>
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
                Guaranteed ETB Salary Transparency
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Every vacancy mandates clear monthly compensation in ETB. No more hidden compensation or awkward final interviews.
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
                Microsoft Word-Style Job Circulars
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Employers author complete vacancies with rich headings, bullets, tables, flyer banners, and downloadable official PDF circulars.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <FileCheck className="w-4 h-4 text-[#0078D4]" />
              <span>Downloadable Terms of Reference (ToR)</span>
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
                Multi-Regional Coverage &amp; Local Languages
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                Active employment pipelines serving Addis Ababa (Bole, Kazanchis, Summit 72), Mekelle (Tigray), Hawassa, and Dire Dawa with complete multilingual support in English, Amharic, and Tigrigna.
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
                Featured Vacancies in Ethiopia
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeJobTab === tab.id
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
                        className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                          saved
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
                      {job.description}
                    </p>

                    {/* Tags: Openings, Direct Apply & Type */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {job.directAgentApply && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-black bg-[#F59E0B] text-[#0A2540] flex items-center gap-1 shadow-2xs">
                          ⚡ Direct Apply (ናባይ ቀጥታ)
                        </span>
                      )}
                      {job.openingsCount && (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-black bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 flex items-center gap-1">
                          🔥 {job.openingsCount} Vacancies
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {job.type}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-[#0A2540] dark:text-blue-300 border border-blue-200/70 dark:border-blue-900/60">
                        {job.workplaceType}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Salary and Apply */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
                        Monthly ETB Salary
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
                      <span>View &amp; Apply</span>
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
            onClick={() => {
              setRole("employer");
              setTab("applicants");
            }}
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
                  onClick={() => {
                    setRole("employer");
                    setTab("applicants");
                    showToast(`Contacting recruiter regarding ${cand.name}`);
                  }}
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
              How Azmera Jobs Delivers Results
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Select your path to see how our end-to-end matchmaking operates.
            </p>

            {/* Audience Switcher Tabs */}
            <div className="pt-3 flex justify-center">
              <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl inline-flex">
                <button
                  onClick={() => setActiveAudienceTab("seeker")}
                  className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeAudienceTab === "seeker"
                      ? "bg-[#0A2540] text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  For Job Seekers
                </button>
                <button
                  onClick={() => setActiveAudienceTab("employer")}
                  className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeAudienceTab === "employer"
                      ? "bg-[#F59E0B] text-[#0A2540] shadow-xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  For Employers &amp; HR Teams
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

      {/* ── 8. TELEGRAM COMMUNITY & ENTERPRISE CTA BANNER ── */}
      <section className="bg-gradient-to-r from-[#0A2540] via-[#0D2947] to-[#0A2540] border-y border-[#F59E0B]/30 py-16 sm:py-20 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#F59E0B] text-xs font-extrabold border border-[#F59E0B]/30">
            <Sparkles className="w-4 h-4" />
            <span>CONNECT WITH AZMERA JOBS</span>
          </div>

          <h2 className="text-2xl sm:text-5xl font-black tracking-tight">
            Ready to Accelerate Your Career or Scale Your Team?
          </h2>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Join over 92,000+ Ethiopian job seekers receiving daily verified alerts on Telegram, or partner with Azmera to recruit qualified professionals in under 48 hours.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => setTab("role-selection")}
              className="px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A2540] font-black text-sm rounded-2xl shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              Get Started for Free
            </button>

            <a
              href="https://t.me/AzmeraJobConnect"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Join Telegram Channel (@AzmeraJobConnect)</span>
            </a>

            <button
              onClick={() => {
                setRole("employer");
                setTab("post-job");
              }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl transition-all border border-white/30 cursor-pointer"
            >
              Post a Vacancy
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
                  src="/azmera-logo.png"
                  alt="Azmera Logo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <span className="font-black text-base text-slate-900 dark:text-white">
                  Azmera<span className="text-[#F59E0B]">Jobs</span>
                </span>
                <p className="text-[10px] text-[#F59E0B] font-bold">
                  YOUR TRUSTED PARTNER IN JOBS
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
                  onClick={() => {
                    setRole("employer");
                    setTab("post-job");
                  }}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Post a Vacancy (Word Mode)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole("employer");
                    setTab("employer-dashboard");
                  }}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Social Media Broadcast Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole("employer");
                    setTab("applicants");
                  }}
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
                Languages: English • አማርኛ • ትግርኛ • Oromoo
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
