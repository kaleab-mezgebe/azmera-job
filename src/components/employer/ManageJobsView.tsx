"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Job } from "@/types";
import { t, tStatus, tCategory, tJobType, tWorkplaceType } from "@/lib/i18n";
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
  Copy,
  Calendar,
  BarChart3,
  Pause,
  Play,
  TrendingUp,
  Send,
  X,
  Check,
  Sparkles,
} from "lucide-react";

export default function ManageJobsView() {
  const { jobs, company, closeJob, setTab, selectJob, setEditingJob, postNewJob, showToast, lang } = useApp();
  const [filter, setFilter] = useState<"All" | "Active" | "Draft" | "Paused" | "Closed">("All");

  // Analytics modal state
  const [analyticsJob, setAnalyticsJob] = useState<Job | null>(null);

  // Extend deadline modal state
  const [extendJob, setExtendJob] = useState<Job | null>(null);
  const [extendDays, setExtendDays] = useState<number>(14);

  // Local status overrides for pause/resume simulation
  const [pausedJobIds, setPausedJobIds] = useState<Set<string>>(new Set());

  const companyJobs = jobs.filter((j) => j.companyId === company.id);

  const getEffectiveStatus = (job: Job) => {
    if (pausedJobIds.has(job.id)) return "Paused";
    return job.status;
  };

  const filteredJobs = companyJobs.filter((j) => {
    const st = getEffectiveStatus(j);
    if (filter === "All") return true;
    return st === filter;
  });

  const handleDuplicate = (job: Job) => {
    postNewJob({
      companyId: job.companyId,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      verified: job.verified,
      title: `${job.title} (Copy)`,
      category: job.category,
      type: job.type,
      experienceLevel: job.experienceLevel,
      location: job.location,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      salaryCurrency: job.salaryCurrency,
      salaryPeriod: job.salaryPeriod,
      deadline: "Jan 31, 2027",
      description: job.description,
      responsibilities: job.responsibilities,
      qualifications: job.qualifications,
      skills: job.skills,
      featured: false,
      status: "Active",
      workplaceType: job.workplaceType,
      openingsCount: job.openingsCount,
      directAgentApply: job.directAgentApply,
    });
    showToast(`Vacancy duplicated as "${job.title} (Copy)"!`, "success");
  };

  const handleTogglePause = (jobId: string, currentStatus: string) => {
    setPausedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
        showToast("Recruitment resumed. Vacancy is now Active and receiving candidates.", "success");
      } else {
        next.add(jobId);
        showToast("Recruitment paused. Candidates cannot apply until resumed.", "info");
      }
      return next;
    });
  };

  const handleConfirmExtendDeadline = () => {
    if (!extendJob) return;
    showToast(
      `Deadline for "${extendJob.title}" extended by +${extendDays} days! Notification sent to candidates.`,
      "success"
    );
    setExtendJob(null);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
              Vacancy Management
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t(lang, "manageVacancies")} ({companyJobs.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor applicant volumes, extend deadlines, duplicate circulars, and inspect recruitment analytics for {company.name}.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingJob(null);
            setTab("post-job");
          }}
          className="px-5 py-2.5 rounded-2xl bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold shadow-md shadow-[#0A2540]/20 flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t(lang, "postNewVacancy")}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["All", "Active", "Draft", "Paused", "Closed"] as const).map((st) => {
          const count = companyJobs.filter((j) => {
            const currentSt = getEffectiveStatus(j);
            return st === "All" || currentSt === st;
          }).length;

          return (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                filter === st
                  ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] font-bold shadow-xs"
                  : "bg-white dark:bg-[#101E33] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {tStatus(lang, st)} ({count})
            </button>
          );
        })}
      </div>

      {/* Table / Cards */}
      <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-900 dark:text-white">
            <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Job Title &amp; Sector</th>
                <th className="px-6 py-4">Deadline &amp; Date</th>
                <th className="px-6 py-4">Applicants</th>
                <th className="px-6 py-4">Compensation (ETB)</th>
                <th className="px-6 py-4">Recruitment Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    <Briefcase className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="font-bold">No vacancies found in &quot;{filter}&quot; status.</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Switch filters or post a new vacancy to get started.</p>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const effectiveStatus = getEffectiveStatus(job);

                  return (
                    <tr key={job.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {job.title}
                            </h3>
                            {job.featured && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            <span>{tCategory(lang, job.category)}</span>
                            <span>•</span>
                            <span>{tWorkplaceType(lang, job.workplaceType)}</span>
                            <span>•</span>
                            <span>{tJobType(lang, job.type)}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1.5 font-bold">
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{job.deadline}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">Posted: {job.postedDate}</p>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => setTab("applicants")}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#EEF4FA] dark:bg-slate-800 hover:bg-[#0A2540] dark:hover:bg-[#F59E0B] text-[#0A2540] dark:text-[#F59E0B] hover:text-white dark:hover:text-[#0A2540] border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>{job.applicantCount} Candidates</span>
                        </button>
                      </td>

                      <td className="px-6 py-4 font-bold text-xs text-slate-900 dark:text-white">
                        {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}{" "}
                        <span className="text-[10px] text-slate-500 font-semibold">ETB</span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            effectiveStatus === "Active"
                              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                              : effectiveStatus === "Paused"
                              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${effectiveStatus === "Active" ? "bg-emerald-500 animate-pulse" : effectiveStatus === "Paused" ? "bg-amber-500" : "bg-slate-400"}`} />
                          <span>{effectiveStatus}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Vacancy */}
                          <button
                            onClick={() => {
                              setEditingJob(job);
                              setTab("post-job");
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0A2540] dark:text-[#F59E0B] cursor-pointer"
                            title={t(lang, "editVacancy")}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* View Live */}
                          <button
                            onClick={() => selectJob(job.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                            title="View Live Listing"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Analytics */}
                          <button
                            onClick={() => setAnalyticsJob(job)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-[#0A2540] dark:text-[#F59E0B] cursor-pointer"
                            title="Job Analytics & Funnel"
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Duplicate Vacancy */}
                          <button
                            onClick={() => handleDuplicate(job)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0A2540] dark:text-slate-300 cursor-pointer"
                            title="Duplicate Vacancy"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Extend Deadline */}
                          <button
                            onClick={() => setExtendJob(job)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-600 dark:text-amber-400 cursor-pointer"
                            title="Extend Application Deadline"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                          </button>

                          {/* Pause / Resume */}
                          <button
                            onClick={() => handleTogglePause(job.id, effectiveStatus)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                            title={effectiveStatus === "Paused" ? "Resume Recruitment" : "Pause Recruitment"}
                          >
                            {effectiveStatus === "Paused" ? (
                              <Play className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Pause className="w-3.5 h-3.5 text-amber-500" />
                            )}
                          </button>

                          {/* Close / Reopen */}
                          <button
                            onClick={() => closeJob(job.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                              job.status === "Active"
                                ? "bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900"
                                : "bg-slate-100 dark:bg-slate-800 hover:bg-[#0A2540] dark:hover:bg-[#F59E0B] text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-[#0A2540]"
                            }`}
                          >
                            {job.status === "Active" ? "Close" : "Reopen"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── JOB ANALYTICS MODAL ── */}
      {analyticsJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 text-[#0A2540] dark:text-[#F59E0B] text-[10px] font-black uppercase">
                    Recruitment Funnel Analytics
                  </span>
                  <span className="text-xs text-slate-400 font-bold">• Real-time Metrics</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {analyticsJob.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {company.name} • {analyticsJob.location}
                </p>
              </div>

              <button
                onClick={() => setAnalyticsJob(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase text-slate-400">Page Views</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">1,480</p>
                <span className="text-[10px] text-emerald-600 font-bold">+18% vs avg</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase text-slate-400">Telegram Views</span>
                <p className="text-2xl font-black text-[#0A2540] dark:text-[#F59E0B] mt-1">980</p>
                <span className="text-[10px] text-slate-500 font-bold">@AzmeraJobConnect</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase text-slate-400">Applications</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{analyticsJob.applicantCount}</p>
                <span className="text-[10px] text-slate-500 font-bold">Active Candidates</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase text-slate-400">Conversion</span>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">4.2%</p>
                <span className="text-[10px] text-emerald-500 font-bold">High intent</span>
              </div>
            </div>

            {/* Funnel Progress Breakdown */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Candidate Pipeline Funnel
              </h4>

              <div className="space-y-2">
                {[
                  { stage: "Applied (Received)", count: analyticsJob.applicantCount, pct: 100, color: "bg-slate-400" },
                  { stage: "Under Review", count: Math.max(1, Math.round(analyticsJob.applicantCount * 0.8)), pct: 80, color: "bg-[#0A2540]" },
                  { stage: "Shortlisted for Interview", count: Math.max(1, Math.round(analyticsJob.applicantCount * 0.35)), pct: 35, color: "bg-emerald-500" },
                  { stage: "Interview Conducted", count: Math.max(1, Math.round(analyticsJob.applicantCount * 0.15)), pct: 15, color: "bg-amber-500" },
                  { stage: "Offer Extended", count: 1, pct: 5, color: "bg-[#F59E0B]" },
                ].map((item) => (
                  <div key={item.stage} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300">{item.stage}</span>
                      <span className="text-slate-500">{item.count} candidates ({item.pct}%)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setAnalyticsJob(null);
                  setTab("applicants");
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Applicants in Kanban Pipeline</span>
                <Users className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EXTEND DEADLINE MODAL ── */}
      {extendJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#F59E0B] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Extend Application Deadline
                  </h3>
                  <p className="text-[11px] text-slate-500">{extendJob.title}</p>
                </div>
              </div>
              <button
                onClick={() => setExtendJob(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Select Extension Period:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { days: 7, label: "+7 Days" },
                  { days: 14, label: "+14 Days" },
                  { days: 30, label: "+30 Days" },
                ].map((item) => (
                  <button
                    key={item.days}
                    onClick={() => setExtendDays(item.days)}
                    className={`py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      extendDays === item.days
                        ? "border-[#F59E0B] bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 shadow-xs"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl leading-relaxed">
              Extending the deadline will automatically refresh the vacancy on the public job board, renew candidate email alerts, and notify candidates currently viewing the role.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setExtendJob(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExtendDeadline}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] dark:text-[#0A2540] rounded-xl shadow-xs cursor-pointer"
              >
                Confirm Extension (+{extendDays}d)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
