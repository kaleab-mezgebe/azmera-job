"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { ETHIOPIAN_LOCATIONS, MOCK_CATEGORIES } from "@/data/mockData";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  X,
  Bookmark,
  ShieldCheck,
  ChevronDown,
  Clock,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

export default function JobSearchView() {
  const {
    jobs,
    selectJob,
    toggleSaveJob,
    isJobSaved,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    selectedCategory,
    setSelectedCategory,
  } = useApp();

  const [selectedJobType, setSelectedJobType] = useState<string>("All Types");
  const [selectedExperience, setSelectedExperience] = useState<string>("All Experience");
  const [minSalary, setMinSalary] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"latest" | "salary-high">("latest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Query filter
      const matchesQuery =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation =
        selectedLocation === "All Locations (Ethiopia)" ||
        !selectedLocation ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase().split("(")[0].trim());

      // Category filter
      const matchesCategory =
        selectedCategory === "All Categories" ||
        !selectedCategory ||
        job.category === selectedCategory;

      // Job type filter
      const matchesType =
        selectedJobType === "All Types" ||
        job.type === selectedJobType ||
        job.workplaceType === selectedJobType;

      // Experience filter
      const matchesExp =
        selectedExperience === "All Experience" ||
        job.experienceLevel.includes(selectedExperience.split(" ")[0]);

      // Salary filter
      const matchesSalary = job.salaryMax >= minSalary;

      return (
        matchesQuery &&
        matchesLocation &&
        matchesCategory &&
        matchesType &&
        matchesExp &&
        matchesSalary
      );
    });
  }, [
    jobs,
    searchQuery,
    selectedLocation,
    selectedCategory,
    selectedJobType,
    selectedExperience,
    minSalary,
  ]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (sortBy === "salary-high") {
        return b.salaryMax - a.salaryMax;
      }
      return 0; // default order
    });
  }, [filteredJobs, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedLocation("All Locations (Ethiopia)");
    setSelectedCategory("All Categories");
    setSelectedJobType("All Types");
    setSelectedExperience("All Experience");
    setMinSalary(0);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedLocation !== "All Locations (Ethiopia)" ||
    selectedCategory !== "All Categories" ||
    selectedJobType !== "All Types" ||
    selectedExperience !== "All Experience" ||
    minSalary > 0;

  return (
    <div className="space-y-6 pb-20">
      {/* Top Search & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl border shadow-xs space-y-3" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex flex-col md:flex-row gap-2.5">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B] focus-within:bg-white dark:focus-within:bg-[#101E33]">
            <Search className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B] shrink-0" />
            <input
              type="text"
              placeholder="Search by job title, skills, or company (e.g. Next.js, Chapa, PM)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="md:w-64 flex items-center gap-2 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B]">
            <MapPin className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B] shrink-0" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none cursor-pointer"
            >
              <option value="All Locations (Ethiopia)" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">
                All Locations (Ethiopia)
              </option>
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
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
            <span>Filters</span>
          </button>
        </div>

        {/* Quick Category and Type Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
            Sector:
          </span>
          <button
            onClick={() => setSelectedCategory("All Categories")}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === "All Categories"
                ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            All Sectors
          </button>
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.name
                  ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sidebar Filters on Desktop + Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop Filter Sidebar */}
        <div
          className={`lg:block ${
            showMobileFilters ? "block" : "hidden"
          } lg:col-span-1 space-y-5 p-5 rounded-3xl border shadow-xs h-fit`}
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Filter Jobs</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#0A2540] dark:text-[#F59E0B] hover:underline font-semibold cursor-pointer"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
              Employment Type
            </label>
            <div className="space-y-1.5">
              {["All Types", "Full-time", "Contract", "Hybrid", "Remote"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  <input
                    type="radio"
                    name="jobType"
                    checked={selectedJobType === type}
                    onChange={() => setSelectedJobType(type)}
                    className="accent-[#0A2540] dark:accent-[#F59E0B]"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
              Experience Level
            </label>
            <div className="space-y-1.5">
              {["All Experience", "Entry Level", "Mid Level", "Senior Level"].map((exp) => (
                <label
                  key={exp}
                  className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  <input
                    type="radio"
                    name="expLevel"
                    checked={selectedExperience === exp}
                    onChange={() => setSelectedExperience(exp)}
                    className="accent-[#0A2540] dark:accent-[#F59E0B]"
                  />
                  <span>{exp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Minimum in ETB */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white">
                Min. Salary (ETB/mo)
              </label>
              <span className="text-xs font-bold text-[#0A2540] dark:text-[#F59E0B]">
                {minSalary > 0 ? `${minSalary.toLocaleString()} ETB` : "Any"}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={80000}
              step={5000}
              value={minSalary}
              onChange={(e) => setMinSalary(Number(e.target.value))}
              className="w-full accent-[#0A2540] dark:accent-[#F59E0B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              <span>0 ETB</span>
              <span>40k ETB</span>
              <span>80k+ ETB</span>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-4">
          {/* Results Summary Header */}
          <div className="flex items-center justify-between px-4 py-3 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              Showing <strong className="font-extrabold text-[#0A2540] dark:text-[#F59E0B]">{sortedJobs.length}</strong> open vacancies in Ethiopia
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-xs font-semibold text-slate-900 dark:text-white outline-none cursor-pointer"
              >
                <option value="latest" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">Latest Vacancies</option>
                <option value="salary-high" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">Highest Salary (ETB)</option>
              </select>
            </div>
          </div>

          {/* Empty State */}
          {sortedJobs.length === 0 ? (
            <div className="p-12 rounded-3xl border text-center space-y-3" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                No jobs match your filter criteria
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try loosening your filters or search query to find more vacancies across
                Addis Ababa and other cities.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-4 py-2 bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* Job Cards List */
            <div className="space-y-3.5">
              {sortedJobs.map((job) => {
                const saved = isJobSaved(job.id);
                return (
                  <div
                    key={job.id}
                    className="p-5 rounded-2xl border hover:shadow-md transition-all group"
                    style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Left: Company Logo & Details */}
                      <div className="flex items-start gap-3.5">
                        <img
                          src={job.companyLogo}
                          alt={job.companyName}
                          className="w-13 h-13 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 bg-white"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              {job.companyName}
                            </span>
                            {job.verified && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0A2540] dark:text-[#38BDF8] bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/60 px-1.5 py-0.5 rounded-md">
                                <ShieldCheck className="w-3 h-3 text-[#0A2540] dark:text-[#38BDF8]" />
                                Verified
                              </span>
                            )}
                            {job.directAgentApply && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#D97706] bg-amber-100 dark:bg-amber-950/60 dark:text-[#FBBF24] border border-amber-300 dark:border-amber-800 px-2 py-0.5 rounded-md">
                                ⚡ Direct Apply (ናባይ ቀጥታ ኣመልክቱ)
                              </span>
                            )}
                            {job.openingsCount && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 px-2 py-0.5 rounded-md">
                                🔥 {job.openingsCount} Vacancies
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400">
                              • {job.postedDate}
                            </span>
                          </div>

                          <h3
                            onClick={() => selectJob(job.id)}
                            className="font-extrabold text-base text-slate-900 dark:text-white transition-colors cursor-pointer hover:text-[#F59E0B]"
                          >
                            {job.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-2 text-xs pt-0.5 text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                              {job.location}
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {job.type}
                            </span>
                            <span>•</span>
                            <span>{job.workplaceType}</span>
                          </div>

                          {/* Skills Pills */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {job.skills.slice(0, 4).map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 4 && (
                              <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                                +{job.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Salary & Actions */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] block font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Salary (Monthly)
                          </span>
                          <span className="text-sm font-black text-slate-900 dark:text-[#FBBF24]">
                            {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}{" "}
                            <span className="text-xs font-bold text-slate-500">ETB</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                              saved
                                ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-[#D97706]"
                                : "border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                            title={saved ? "Job saved" : "Bookmark job"}
                          >
                            <Bookmark
                              className={`w-4 h-4 ${saved ? "fill-[#F59E0B] text-[#F59E0B]" : ""}`}
                            />
                          </button>

                          <button
                            onClick={() => selectJob(job.id)}
                            className="px-4 py-2 rounded-xl bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer hover:scale-[1.02]"
                          >
                            View Job
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
