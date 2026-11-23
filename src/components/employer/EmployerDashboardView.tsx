"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import SocialBroadcastCard from "./SocialBroadcastCard";
import {
  Briefcase,
  Users,
  CalendarCheck,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  Eye,
  ShieldCheck,
  ChevronRight,
  Clock,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

export default function EmployerDashboardView() {
  const {
    company,
    jobs,
    applications,
    candidates,
    interviews,
    setTab,
    selectCandidate,
    updateApplicationStatus,
  } = useApp();

  const companyJobs = jobs.filter((j) => j.companyId === company.id);
  const activeJobs = companyJobs.filter((j) => j.status === "Active");
  const totalApplicants = companyJobs.reduce((acc, j) => acc + j.applicantCount, 0);
  const shortlistedCount = applications.filter((a) => a.status === "Shortlisted").length;
  const scheduledInterviews = interviews.filter((i) => i.status === "Scheduled");

  return (
    <div className="space-y-8 pb-20">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs bg-white"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {company.name}
              </h1>
              {company.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A2540] dark:text-[#38BDF8] bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60 px-2.5 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Recruiter
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Recruitment Command Center • {company.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab("post-job")}
            className="px-5 py-3 rounded-2xl bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold shadow-md shadow-[#0A2540]/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4 text-[#F59E0B] dark:text-[#0A2540]" />
            <span>Post New Vacancy</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setTab("manage-jobs")}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-xs hover:border-[#F59E0B] transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Active Jobs</span>
            <div className="w-9 h-9 rounded-xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold mt-2 text-slate-900 dark:text-white">
            {activeJobs.length}
          </div>
          <span className="text-[11px] font-semibold flex items-center gap-1 mt-1 text-[#F59E0B]">
            {companyJobs.length} total vacancies <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        <div
          onClick={() => setTab("applicants")}
          className="p-5 rounded-2xl border shadow-xs hover:border-blue-400 transition-all cursor-pointer"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Total Applicants</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold mt-2" style={{ color: "var(--text)" }}>
            {totalApplicants > 0 ? totalApplicants : applications.length * 12}
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1 block">
            +18 this week
          </span>
        </div>

        <div
          onClick={() => setTab("applicants")}
          className="p-5 rounded-2xl border shadow-xs hover:border-emerald-400 transition-all cursor-pointer"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Shortlisted</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F59E0B] mt-2">
            {shortlistedCount + 12}
          </div>
          <span className="text-[11px] font-semibold mt-1 block" style={{ color: "var(--primary)" }}>
            Ready for interviews
          </span>
        </div>

        <div
          onClick={() => setTab("interviews")}
          className="p-5 rounded-2xl border shadow-xs hover:border-amber-400 transition-all cursor-pointer ring-1 ring-amber-400/30"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Interviews Scheduled</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-800">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
            {scheduledInterviews.length}
          </div>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold mt-1 block">
            Next: Today at 2:00 PM
          </span>
        </div>
      </div>

      {/* Azmera Daily Social Media Broadcast & Customer Intake Center */}
      <SocialBroadcastCard />

      {/* Recruitment Pipeline Performance */}
      <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Job Performance Overview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Views, applicants, and candidate progression across active postings
            </p>
          </div>
          <span className="text-xs font-bold text-[#0A2540] dark:text-[#FBBF24] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full">
            Past 30 Days (Addis Ababa)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Average Days to Hire
            </span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white">14 Days</div>
            <p className="text-[11px] text-[#0A2540] dark:text-[#38BDF8] font-semibold">
              ↓ 4 days faster than Ethiopian industry avg.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Application Conversion Rate
            </span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white">24.8%</div>
            <p className="text-[11px] text-[#0A2540] dark:text-[#38BDF8] font-semibold">
              ↑ 6.2% high candidate engagement
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Offer Acceptance Rate
            </span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white">92%</div>
            <p className="text-[11px] text-[#0A2540] dark:text-[#38BDF8] font-semibold">Top tier employer rating</p>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Recent Candidate Applications
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Latest applications received for {company.name} positions
            </p>
          </div>

          <button
            onClick={() => setTab("applicants")}
            className="text-xs font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Applicants</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-900 dark:text-white">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Candidate</th>
                <th className="px-6 py-3.5">Target Position</th>
                <th className="px-6 py-3.5">Applied Date</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {applications.slice(0, 5).map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={app.candidateAvatar}
                        alt={app.candidateName}
                        className="w-10 h-10 rounded-full object-cover border border-[#F59E0B]"
                      />
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                          {app.candidateName}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {app.candidateTitle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-xs text-slate-900 dark:text-white">
                    {app.jobTitle}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{app.appliedDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        app.status === "Interview"
                          ? "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                          : app.status === "Shortlisted"
                          ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                          : app.status === "Rejected"
                          ? "bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800"
                          : "bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          selectCandidate(app.candidateId);
                          setTab("applicants");
                        }}
                        className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-900 dark:text-white cursor-pointer"
                      >
                        Profile & CV
                      </button>
                      {app.status !== "Shortlisted" && app.status !== "Interview" && (
                        <button
                          onClick={() =>
                            updateApplicationStatus(app.id, "Shortlisted")
                          }
                          className="px-3 py-1 rounded-lg bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-[11px] font-bold cursor-pointer"
                        >
                          Shortlist
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
