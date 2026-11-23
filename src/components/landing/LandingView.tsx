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
} from "lucide-react";

export default function LandingView() {
  const {
    jobs,
    setRole,
    setTab,
    selectJob,
    toggleSaveJob,
    isJobSaved,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localLocation, setLocalLocation] = useState(
    selectedLocation === "All Locations (Ethiopia)" ? "" : selectedLocation
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

  return (
    <div className="flex flex-col min-h-screen theme-bg theme-text">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-16 lg:py-20 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/50 dark:from-[#070F1A] dark:via-[#091524] dark:to-[#0B1A2C]">
        {/* Subtle, architectural dot grid backdrop */}
        <div className="absolute inset-0 hero-grid-pattern opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 border border-[#0A2540]/15 dark:border-[#F59E0B]/30 text-xs font-bold text-[#0A2540] dark:text-[#FBBF24]">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                <span>Your Trusted Partner in Jobs • Ethiopia</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
                Connecting Talent With{" "}
                <span className="text-[#F59E0B] relative inline-block">
                  Opportunity.
                  <svg
                    className="absolute left-0 -bottom-1.5 w-full h-3 text-[#F59E0B]/40"
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
                Discover verified vacancies with transparent ETB salaries at Ethiopia&apos;s leading tech companies, commercial banks, fintechs, and startups.
              </p>

              {/* Search Box */}
              <form
                onSubmit={handleHeroSearch}
                className="mt-6 p-2 rounded-2xl sm:rounded-full bg-white dark:bg-[#101E33] border border-slate-200 dark:border-slate-700 shadow-xl shadow-[#0A2540]/6 dark:shadow-black/40 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto lg:mx-0 transition-all focus-within:border-[#F59E0B]"
              >
                <div className="flex-1 w-full flex items-center gap-2.5 px-3.5 py-1.5">
                  <Search className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <input
                    type="text"
                    placeholder="Job title, skill or company..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none font-medium"
                  />
                </div>

                <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-slate-700 shrink-0" />

                <div className="w-full sm:w-56 flex items-center gap-2 px-3 py-1.5 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <MapPin className="w-4 h-4 text-[#0A2540] dark:text-[#38BDF8] shrink-0" />
                  <select
                    value={localLocation}
                    onChange={(e) => setLocalLocation(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-200 outline-none cursor-pointer font-medium"
                  >
                    <option value="" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">All Locations (Ethiopia)</option>
                    {ETHIOPIAN_LOCATIONS.filter((l) => !l.includes("All Locations")).map(
                      (loc) => (
                        <option key={loc} value={loc} className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">
                          {loc}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#0A2540] hover:bg-[#07192C] text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] shrink-0"
                >
                  <span>Find Jobs</span>
                  <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                </button>
              </form>

              {/* Quick Suggestions */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs">
                <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">Popular:</span>
                {["FinTech", "Next.js", "Commercial Bank", "Bole, Addis Ababa", "Remote"].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setTab("search");
                      }}
                      className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-slate-600 dark:text-slate-300 hover:border-[#F59E0B] hover:text-[#0A2540] dark:hover:text-[#F59E0B] text-[11px] font-medium transition-colors shadow-2xs"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Right Showcase Column featuring Azmera Mascot & Brand */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md">

                {/* Subtle soft glow */}
                <div className="absolute inset-0 bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 rounded-3xl blur-xl -z-10" />

                {/* Main Card */}
                <div
                  className="p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#101E33] shadow-xl shadow-[#0A2540]/8 dark:shadow-black/40 relative overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Azmera Jobs Platform</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#0A2540]/10 text-[#0A2540] dark:bg-[#F59E0B]/20 dark:text-[#FBBF24] border border-[#0A2540]/15 dark:border-[#F59E0B]/30 tracking-wider">
                      OFFICIAL
                    </span>
                  </div>

                  {/* Mascot Image Display */}
                  <div className="py-4 flex flex-col items-center text-center">
                    <div className="relative group">
                      <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#F59E0B] shadow-xl p-1 bg-white">
                        <img
                          src="/azmera-logo.png"
                          alt="Azmera - Your Trusted Partner in Jobs"
                          className="w-full h-full object-cover object-top rounded-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Floating Badge on Logo */}
                      <div className="absolute -bottom-2 -right-2 bg-[#0A2540] text-white py-1.5 px-3 rounded-2xl shadow-lg border-2 border-[#F59E0B] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-[11px] font-extrabold tracking-wide">100% Verified</span>
                      </div>
                    </div>

                    <h3 className="mt-4 text-xl font-black tracking-tight text-slate-900 dark:text-white">
                      Azmera Jobs
                    </h3>
                    <p className="text-xs font-black tracking-wider text-[#F59E0B] mt-0.5">
                      YOUR TRUSTED PARTNER IN JOBS
                    </p>
                    <p className="text-xs mt-1.5 max-w-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      Empowering Ethiopian professionals &amp; businesses with fast, direct, and transparent hiring.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="p-3 rounded-xl text-center bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="block text-lg font-black text-[#F59E0B]">4,200+</span>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Active Vacancies</span>
                    </div>
                    <div className="p-3 rounded-xl text-center bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="block text-lg font-black text-[#0A2540] dark:text-[#38BDF8]">850+</span>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Verified Employers</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Vacancies", value: "4,200+", icon: Briefcase },
              { label: "Verified Employers", value: "850+", icon: Building2 },
              { label: "Job Seekers", value: "92,000+", icon: Users },
              { label: "Placement Success", value: "94%", icon: Award },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-xs flex items-center gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center shrink-0">
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

      {/* Popular Categories */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A2540] dark:text-[#F59E0B]">
              Explore by Industry
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Popular Job Categories
            </h2>
          </div>
          <button
            onClick={() => setTab("search")}
            className="text-xs sm:text-sm font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Sectors</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            return (
              <button
                key={cat.id}
                onClick={() => { setTab("search"); }}
                className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] text-left transition-all hover:border-[#F59E0B] hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center transition-transform group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-4 group-hover:text-[#F59E0B] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {cat.jobCount} open vacancies
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-[11px] font-bold text-[#0A2540] dark:text-[#F59E0B] gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Browse Jobs</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-14 border-y border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#081220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold text-[#0A2540] dark:text-[#F59E0B] uppercase tracking-wider">
                Handpicked Openings
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Featured Vacancies in Ethiopia
              </h2>
            </div>
            <button
              onClick={() => setTab("search")}
              className="text-sm font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>Explore all {jobs.length} jobs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.slice(0, 6).map((job) => {
              const saved = isJobSaved(job.id);
              return (
                <div
                  key={job.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#101E33] hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all p-5 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Company & Bookmark */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.companyLogo}
                          alt={job.companyName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-white"
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[140px]">
                              {job.companyName}
                            </span>
                            {job.verified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#38BDF8] shrink-0" />
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#0A2540] dark:text-[#F59E0B]" />
                            {job.location}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
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

                    {/* Job Title - GUARANTEED HIGH CONTRAST */}
                    <h3
                      onClick={() => selectJob(job.id)}
                      className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-[#F59E0B] transition-colors cursor-pointer line-clamp-1"
                    >
                      {job.title}
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Tags - CLEAN, CRISP CONTRAST */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {job.directAgentApply && (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-[#F59E0B] text-[#0A2540] flex items-center gap-1 shadow-xs">
                          ⚡ Direct Apply (ናባይ ቀጥታ ኣመልክቱ)
                        </span>
                      )}
                      {job.openingsCount && (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 flex items-center gap-1">
                          🔥 {job.openingsCount} Openings
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {job.type}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-[#0A2540] dark:text-blue-300 border border-blue-200/70 dark:border-blue-900/60">
                        {job.workplaceType}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/60">
                        {job.category}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Salary and Apply */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
                        Salary (Monthly)
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-[#FBBF24]">
                        {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}{" "}
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">ETB</span>
                      </span>
                    </div>

                    <button
                      onClick={() => selectJob(job.id)}
                      className="px-3.5 py-2 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                    >
                      <span>View &amp; Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Two Audiences: Job Seekers vs Employers */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
            Built for Ethiopia
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mt-1 text-slate-900 dark:text-white">
            Empowering Both Candidates &amp; Recruiters
          </h2>
          <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">
            Whether you are advancing your professional career or assembling an
            exceptional team, Azmera Jobs simplifies every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Seeker Card */}
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A2540]/5 dark:bg-[#38BDF8]/15 text-[#0A2540] dark:text-[#38BDF8] flex items-center justify-center mb-5 border border-slate-200 dark:border-slate-700">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                For Ambitious Job Seekers
              </h3>
              <p className="text-xs sm:text-sm mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
                Build your professional profile, showcase university credentials, upload
                your CV, and apply to verified positions with one tap.
              </p>

              <div className="space-y-3 mt-6">
                {[
                  "Verified vacancies with transparent ETB salary ranges",
                  "Real-time application status tracking (Review, Interview, Offer)",
                  "Custom alerts for jobs in Addis Ababa and regional cities",
                  "Direct interview invitations with Google Meet or in-person venues",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setRole("seeker");
                  setTab("dashboard");
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Enter as Job Seeker</span>
                <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
              </button>
            </div>
          </div>

          {/* Employer Card */}
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-[#F59E0B]/20 text-[#D97706] dark:text-[#FBBF24] flex items-center justify-center mb-5 border border-amber-200/60 dark:border-[#F59E0B]/30">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                For Employers &amp; Recruiters
              </h3>
              <p className="text-xs sm:text-sm mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
                Publish vacancies in minutes, manage candidate pipelines, preview CVs instantly, and schedule interviews.
              </p>

              <div className="space-y-3 mt-6">
                {[
                  "Multi-section vacancy authoring with custom qualifications",
                  "Structured applicant management with instant shortlisting",
                  "Candidate CV preview and university credential verification",
                  "Interview scheduling tool with calendar coordination",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setRole("employer");
                  setTab("employer-dashboard");
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0A2540] font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Enter as Recruiter / Employer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Focus across Ethiopia */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-slate-200 dark:border-slate-800">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0A2540] dark:text-[#F59E0B]">
            Nationwide Coverage
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Active Job Markets Across Ethiopia
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { city: "Addis Ababa", open: "3,100+ Jobs", tag: "Capital Hub" },
            { city: "Hawassa", open: "280+ Jobs", tag: "Industrial & Tech" },
            { city: "Dire Dawa", open: "210+ Jobs", tag: "Logistics & Trade" },
            { city: "Bahir Dar", open: "190+ Jobs", tag: "Finance & Tourism" },
            { city: "Adama", open: "175+ Jobs", tag: "Manufacturing" },
            { city: "Mekelle", open: "140+ Jobs", tag: "Agri & Commerce" },
          ].map((loc, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedLocation(loc.city);
                setTab("search");
              }}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] hover:border-[#F59E0B] transition-all text-center group cursor-pointer shadow-2xs"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#F59E0B]">
                {loc.city}
              </div>
              <div className="text-[11px] font-semibold text-[#0A2540] dark:text-[#38BDF8] mt-0.5">
                {loc.open}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {loc.tag}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#0A2540] via-[#0E2F52] to-[#0A2540] border-y border-[#F59E0B]/30 py-16 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#F59E0B] text-xs font-bold border border-[#F59E0B]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Azmera Jobs Today</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to Take Your Career or Company to the Next Level?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Join thousands of Ethiopian professionals and top organizations finding the
            perfect match on Azmera Jobs — Your Trusted Partner in Jobs.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setTab("role-selection")}
              className="px-7 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A2540] font-black text-sm rounded-xl shadow-xl transition-all cursor-pointer hover:scale-105"
            >
              Create Free Account
            </button>
            <button
              onClick={() => setTab("search")}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all border border-white/30 cursor-pointer"
            >
              Browse Open Positions
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070F1A] pt-12 pb-20 lg:pb-12 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-[#F59E0B] bg-white shadow-xs shrink-0">
                <img
                  src="/azmera-logo.png"
                  alt="Azmera Jobs"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <span className="font-black text-base text-slate-900 dark:text-white tracking-tight">
                  Azmera<span className="text-[#F59E0B]">Jobs</span>
                </span>
                <span className="block text-[9px] font-bold text-[#F59E0B] -mt-1 tracking-wider">
                  YOUR TRUSTED PARTNER IN JOBS
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed">
              Connecting Talent With Opportunity. Ethiopia&apos;s premier job discovery and
              recruitment marketplace.
            </p>
            <p className="text-[11px] font-semibold text-[#0A2540] dark:text-[#38BDF8]">
              📍 Bole Medhanialem, Addis Ababa, Ethiopia
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              For Job Seekers
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setTab("search")}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Explore Vacancies
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole("seeker");
                    setTab("profile");
                  }}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Candidate Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole("seeker");
                    setTab("applications");
                  }}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Track Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => setTab("role-selection")}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Career Resources
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              For Employers
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
                  Post a Vacancy
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
                  Manage Candidates
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setRole("employer");
                    setTab("company-profile");
                  }}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Verified Employer Badge
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-xs uppercase tracking-wider">
              Localization / ቋንቋ
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5">
              Available in English, Amharic, Afaan Oromo, and Tigrigna.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-900 dark:text-white">
                English
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                አማርኛ
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                Oromoo
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                ትግርኛ
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <p>© 2026 Azmera Jobs. All rights reserved. Connecting Talent With Opportunity.</p>
          <p className="font-medium text-slate-700 dark:text-slate-300">Ethiopian Job Market • ETB Currency</p>
        </div>
      </footer>
    </div>
  );
}
