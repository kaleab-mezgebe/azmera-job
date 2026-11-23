"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Briefcase,
  Users,
  Clock,
  MoreVertical,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit2,
  Trash2,
  ExternalLink,
} from "lucide-react";

export default function ManageJobsView() {
  const { jobs, company, closeJob, setTab, selectJob } = useApp();
  const [filter, setFilter] = useState<"All" | "Active" | "Closed">("All");

  const companyJobs = jobs.filter((j) => j.companyId === company.id);
  const filteredJobs = companyJobs.filter((j) => {
    if (filter === "All") return true;
    return j.status === filter;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A1C2E]">
            Manage Vacancies ({companyJobs.length})
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Monitor, edit, and close recruitment postings for {company.name}.
          </p>
        </div>

        <button
          onClick={() => setTab("post-job")}
          className="px-5 py-2.5 rounded-2xl bg-[#0A2540] hover:bg-[#071A2E] text-white text-xs font-bold shadow-md shadow-[#0A2540]/20 flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Vacancy</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["All", "Active", "Closed"] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === st
                ? "bg-[#0A2540] text-white font-bold"
                : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
            }`}
          >
            {st} ({companyJobs.filter((j) => st === "All" || j.status === st).length})
          </button>
        ))}
      </div>

      {/* Table / Cards */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#0A1C2E]">
            <thead className="bg-[#F8FAFC] text-[#64748B] font-bold uppercase text-[10px] tracking-wider border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4">Job Title & Sector</th>
                <th className="px-6 py-4">Published Date</th>
                <th className="px-6 py-4">Applicants</th>
                <th className="px-6 py-4">Compensation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-[#64748B]">
                    No vacancies found in this status.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[#F8FAFC]/60 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-extrabold text-sm text-[#0A1C2E]">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] text-[#64748B] mt-0.5">
                          <span>{job.category}</span>
                          <span>•</span>
                          <span>{job.workplaceType}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#64748B]">
                      {job.postedDate}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setTab("applicants")}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-[#0A2540] dark:hover:bg-[#F59E0B] text-[#0A2540] dark:text-[#38BDF8] hover:text-white dark:hover:text-[#0A2540] border border-blue-200/60 dark:border-blue-900/60 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>{job.applicantCount} Applicants</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 font-bold text-xs text-slate-900 dark:text-white">
                      {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}{" "}
                      <span className="text-[10px] text-slate-500 font-semibold">ETB</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          job.status === "Active"
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => selectJob(job.id)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          title="View Live Listing"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => closeJob(job.id)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                            job.status === "Active"
                              ? "bg-amber-50 hover:bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                              : "bg-slate-100 hover:bg-[#0A2540] text-slate-800 hover:text-white"
                          }`}
                        >
                          {job.status === "Active" ? "Close Vacancy" : "Reopen"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
