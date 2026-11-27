"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t, tCategory, tJobType, tWorkplaceType } from "@/lib/i18n";
import { MOCK_CATEGORIES, ETHIOPIAN_LOCATIONS } from "@/data/mockData";
import { BASE_PATH } from "@/lib/constants";
import {
  Search,
  MapPin,
  Briefcase,
  TrendingUp,
  Bookmark,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Code,
  Landmark,
  Palette,
  Truck,
  Radio,
  BarChart3,
  FileCheck2,
} from "lucide-react";

export default function SeekerDashboardView() {
  const {
    seeker,
    jobs,
    applications,
    savedJobIds,
    setTab,
    selectJob,
    toggleSaveJob,
    isJobSaved,
    setSearchQuery,
    setSelectedLocation,
    lang,
  } = useApp();

  const [localSearch, setLocalSearch] = useState("");
  const [localLocation, setLocalLocation] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
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

  const underReviewCount = applications.filter((a) => a.status === "Under Review").length;
  const shortlistedCount = applications.filter((a) => a.status === "Shortlisted").length;
  const interviewCount = applications.filter((a) => a.status === "Interview").length;

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#102A4C] to-[#0A1C2E] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-[#1E385B]">
        {/* Subtle decorative background circles & Azmera logo watermark */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="hidden sm:block absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full overflow-hidden border-2 border-[#F59E0B]/40 shadow-xl opacity-90 pointer-events-none bg-white/10 backdrop-blur-xs">
          <img src={`${BASE_PATH}/azmera-logo.png`} alt="Azmera" className="w-full h-full object-cover object-top" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F59E0B] text-xs font-bold backdrop-blur-xs border border-[#F59E0B]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Azmera Jobs • {t(lang, "tagline")}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t(lang, "welcome")}, {seeker.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong className="font-bold underline text-[#F59E0B]">{jobs.length}</strong>{" "}
            {t(lang, "showingJobs")}
          </p>

          {/* Quick Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="pt-2 flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 bg-white rounded-xl text-[#0A2540] shadow-xs">
              <Search className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <input
                type="text"
                placeholder={t(lang, "searchPlaceholder")}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full text-xs text-[#0A2540] outline-none"
              />
            </div>
            <div className="sm:w-52 flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl text-[#0A2540] shadow-xs">
              <MapPin className="w-4 h-4 text-[#0A2540] shrink-0" />
              <select
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="w-full text-xs text-[#0A2540] outline-none cursor-pointer"
              >
                <option value="">{t(lang, "allLocations")}</option>
                {ETHIOPIAN_LOCATIONS.filter((l) => !l.includes("All Locations")).map(
                  (loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  )
                )}
              </select>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A2540] font-black text-xs rounded-xl shadow-xs transition-colors shrink-0"
            >
              {t(lang, "findJobs")}
            </button>
          </form>
        </div>
      </div>

      {/* Application Status Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setTab("applications")}
          className="p-4 rounded-2xl border shadow-xs hover:border-[#0A2540] transition-all cursor-pointer"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{t(lang, "totalApplied")}</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--bg)", color: "var(--text)" }}>
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold mt-2" style={{ color: "var(--text)" }}>
            {applications.length}
          </div>
          <span className="text-[11px] font-medium flex items-center gap-1 mt-1" style={{ color: "var(--primary)" }}>
            {t(lang, "activeCandidacies")} <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        <div
          onClick={() => setTab("applications")}
          className="p-4 rounded-2xl border shadow-xs hover:border-[#0A2540] transition-all cursor-pointer"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{t(lang, "underReview")}</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold mt-2" style={{ color: "var(--text)" }}>
            {underReviewCount}
          </div>
          <span className="text-[11px] text-blue-600 font-medium mt-1 block">
            {t(lang, "hrScreening")}
          </span>
        </div>

        <div
          onClick={() => setTab("applications")}
          className="p-4 rounded-2xl border shadow-xs hover:border-[#0A2540] transition-all cursor-pointer"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{t(lang, "shortlisted")}</span>
            <div className="w-8 h-8 rounded-lg badge-green flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" style={{ color: "var(--primary)" }} />
            </div>
          </div>
          <div className="text-2xl font-extrabold mt-2" style={{ color: "var(--primary)" }}>
            {shortlistedCount}
          </div>
          <span className="text-[11px] font-medium mt-1 block" style={{ color: "var(--primary)" }}>
            {t(lang, "passedQualifications")}
          </span>
        </div>

        <div
          onClick={() => setTab("applications")}
          className="p-4 rounded-2xl border shadow-xs hover:border-amber-400 transition-all cursor-pointer ring-1 ring-amber-400/30"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{t(lang, "interviews")}</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-700 mt-2">
            {interviewCount}
          </div>
          <span className="text-[11px] text-amber-700 font-bold mt-1 block">
            {t(lang, "actionRequired")}
          </span>
        </div>
      </div>

      {/* Profile Completion Card */}
      <div className="p-5 rounded-2xl border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#E2E8F0]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#F59E0B]"
                strokeDasharray={`${seeker.profileCompletion}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-black text-[#F59E0B]">
              {seeker.profileCompletion}%
            </span>
          </div>

          <div>
            <h3 className="text-sm font-extrabold" style={{ color: "var(--text)" }}>
              {t(lang, "profileStrength")}: {seeker.profileCompletion}%
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              Add your portfolio link and university honors to achieve 100% visibility to
              recruiters.
            </p>
          </div>
        </div>

        <button
          onClick={() => setTab("profile")}
          className="px-4 py-2 rounded-xl bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] font-bold text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          {t(lang, "completeProfile")}
        </button>
      </div>

      {/* Recommended Jobs for Seeker */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold text-[#0A2540] dark:text-[#FBBF24] uppercase tracking-wider">
              {t(lang, "matchesYourSkills")}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {t(lang, "recommendedForYou")}
            </h2>
          </div>
          <button
            onClick={() => setTab("search")}
            className="text-xs font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t(lang, "seeAll")}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.slice(0, 4).map((job) => {
            const saved = isJobSaved(job.id);
            return (
              <div
                key={job.id}
                className="p-5 rounded-2xl border hover:shadow-md transition-all flex flex-col justify-between group"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.companyLogo}
                        alt={job.companyName}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-white"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {job.companyName}
                          </span>
                          {job.verified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#38BDF8]" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
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
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-[#F59E0B] text-[#F59E0B]" : ""}`} />
                    </button>
                  </div>

                  <h3
                    onClick={() => selectJob(job.id)}
                    className="font-bold text-sm text-slate-900 dark:text-white transition-colors cursor-pointer hover:text-[#F59E0B]"
                  >
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {job.type}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-[#0A2540] dark:text-blue-300 border border-blue-200/70 dark:border-blue-900/60">
                      {job.workplaceType}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/60">
                      {job.category}
                    </span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 dark:text-[#FBBF24]">
                    {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}{" "}
                    <span className="text-[10px] font-bold text-slate-500">ETB/mo</span>
                  </span>
                  <button
                    onClick={() => selectJob(job.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-[1.02]"
                  >
                    Details &amp; Apply
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popular Categories */}
      <div>
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-3">
          Popular Sectors in Ethiopia
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MOCK_CATEGORIES.slice(0, 4).map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            return (
              <button
                key={cat.id}
                onClick={() => setTab("search")}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] hover:border-[#F59E0B] text-left transition-colors flex items-center gap-3 cursor-pointer shadow-2xs"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {cat.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {cat.jobCount} open roles
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
