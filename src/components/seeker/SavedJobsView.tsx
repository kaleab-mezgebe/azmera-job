"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Bookmark, MapPin, ShieldCheck, Trash2, ArrowRight } from "lucide-react";

export default function SavedJobsView() {
  const { jobs, savedJobIds, toggleSaveJob, selectJob, setTab } = useApp();

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A1C2E]">
            Saved Jobs ({savedJobs.length})
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Keep track of job openings you want to review and apply to later.
          </p>
        </div>

        <button
          onClick={() => setTab("search")}
          className="px-4 py-2 bg-[#0A2540] text-white text-xs font-bold rounded-xl hover:bg-[#071A2E] transition-colors"
        >
          Find More Jobs
        </button>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#E2E8F0] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] text-[#64748B] flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-[#0A1C2E]">No saved jobs yet</h3>
          <p className="text-xs text-[#64748B]">
            When you find a vacancy you like, tap the bookmark icon to save it here.
          </p>
          <button
            onClick={() => setTab("search")}
            className="mt-2 px-4 py-2 bg-[#0A2540] text-white text-xs font-bold rounded-xl"
          >
            Explore Jobs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-5 rounded-2xl border border-[#E2E8F0] hover:border-[#0A2540]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-11 h-11 rounded-xl object-cover border border-[#E2E8F0]"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#0A1C2E]">
                          {job.companyName}
                        </span>
                        {job.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0A2540]" />
                        )}
                      </div>
                      <span className="text-[11px] text-[#64748B] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#0A2540]" />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3
                  onClick={() => selectJob(job.id)}
                  className="font-extrabold text-sm text-slate-900 dark:text-white hover:text-[#F59E0B] transition-colors cursor-pointer"
                >
                  {job.title}
                </h3>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {job.type}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200/80 dark:border-amber-900/60">
                    {job.category}
                  </span>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 dark:text-[#FBBF24]">
                  {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}{" "}
                  <span className="text-[10px] text-slate-500 font-bold">ETB</span>
                </span>
                <button
                  onClick={() => selectJob(job.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0A2540] hover:bg-[#07192C] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer hover:scale-[1.02]"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
