"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ApplicationStatus } from "@/types";
import {
  FileCheck2,
  Clock,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  MapPin,
  ExternalLink,
  Video,
  FileText,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

export default function SeekerApplicationsView() {
  const { applications, selectJob, setTab, showToast } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const statuses: ApplicationStatus[] = [
    "Submitted",
    "Under Review",
    "Shortlisted",
    "Interview",
    "Accepted",
    "Rejected",
  ];

  const filtered = applications.filter((app) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "Active")
      return app.status !== "Rejected" && app.status !== "Accepted";
    return app.status === filterStatus;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "Submitted":
        return {
          bg: "badge-gray",
          icon: Clock,
          label: "Submitted",
        };
      case "Under Review":
        return {
          bg: "badge-blue",
          icon: Clock,
          label: "Under Review",
        };
      case "Shortlisted":
        return {
          bg: "badge-navy",
          icon: CheckCircle2,
          label: "Shortlisted",
        };
      case "Interview":
        return {
          bg: "badge-gold animate-pulse",
          icon: CalendarCheck,
          label: "Interview Scheduled",
        };
      case "Accepted":
        return {
          bg: "badge-green",
          icon: CheckCircle2,
          label: "Accepted / Offer",
        };
      case "Rejected":
        return {
          bg: "badge-red",
          icon: XCircle,
          label: "Not Selected",
        };
    }
  };

  const getStepIndex = (status: ApplicationStatus) => {
    switch (status) {
      case "Submitted":
        return 1;
      case "Under Review":
        return 2;
      case "Shortlisted":
        return 3;
      case "Interview":
        return 4;
      case "Accepted":
        return 5;
      case "Rejected":
        return -1;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border shadow-xs" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold" style={{ color: "var(--text)" }}>
            My Job Applications
          </h1>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Track your recruitment stages, interview invitations, and status updates in
            real time.
          </p>
        </div>

        <button
          onClick={() => setTab("search")}
          className="px-4 py-2.5 bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl shadow-xs self-start sm:self-auto transition-colors"
        >
          Explore More Openings
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {["All", "Active", "Interview", "Shortlisted", "Under Review"].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStatus === st
                ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs font-bold"
                : "border text-[#64748B] hover:text-[#0A1C2E]"
            }`}
            style={filterStatus !== st ? { background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-muted)" } : {}}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 rounded-3xl border text-center space-y-3" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto" style={{ background: "var(--bg)", color: "var(--text-muted)" }}>
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm" style={{ color: "var(--text)" }}>
              No applications in this category
            </h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Discover open vacancies and start submitting applications.
            </p>
            <button
              onClick={() => setTab("search")}
              className="mt-2 px-4 py-2 bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          filtered.map((app) => {
            const badge = getStatusBadge(app.status);
            const stepIdx = getStepIndex(app.status);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={app.id}
                className="p-6 rounded-3xl border shadow-xs space-y-5 transition-colors"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                {/* Top Row: Job & Status */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={app.companyLogo}
                      alt={app.companyName}
                      className="w-12 h-12 rounded-2xl object-cover border"
                      style={{ borderColor: "var(--border)" }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
                          {app.companyName}
                        </span>
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          • Applied on {app.appliedDate}
                        </span>
                      </div>
                      <h3
                        onClick={() => selectJob(app.jobId)}
                        className="font-extrabold text-base transition-colors cursor-pointer hover:text-[#F59E0B]"
                        style={{ color: "var(--text)" }}
                      >
                        {app.jobTitle}
                      </h3>
                      <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--text-muted)" }}>
                        <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                        {app.location}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto ${badge.bg}`}
                  >
                    <BadgeIcon className="w-3.5 h-3.5" />
                    <span>{badge.label}</span>
                  </span>
                </div>

                {/* Status Progress Stepper (Except if rejected) */}
                {app.status !== "Rejected" ? (
                  <div className="pt-2">
                    <div className="grid grid-cols-4 gap-2 relative">
                      {[
                        { num: 1, label: "Submitted" },
                        { num: 2, label: "Under Review" },
                        { num: 3, label: "Shortlisted" },
                        { num: 4, label: "Interview" },
                      ].map((st) => {
                        const isDone = stepIdx >= st.num;
                        const isCurrent = stepIdx === st.num;
                        return (
                          <div key={st.num} className="text-center space-y-1">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                isDone ? "bg-gradient-to-r from-[#0A2540] to-[#F59E0B]" : "bg-[#E2E8F0] dark:bg-[#1E334D]"
                              }`}
                            />
                            <span
                              className={`text-[10px] font-bold block ${
                                isCurrent
                                  ? "text-[#F59E0B]"
                                  : isDone
                                  ? "text-[#0A2540] dark:text-[#7DD3FC]"
                                  : "text-[#64748B]"
                              }`}
                            >
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-red-50 text-red-800 rounded-2xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      Thank you for your interest. The employer decided to proceed with
                      other candidates at this time.
                    </span>
                  </div>
                )}

                {/* Status Note or Interview Notice */}
                {app.statusNotes && (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs text-slate-800 dark:text-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Recruitment Update:
                    </span>
                    <p className="leading-relaxed">{app.statusNotes}</p>
                    {app.interviewDate && (
                      <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#0A2540] dark:text-[#F59E0B]">
                        <Video className="w-4 h-4" />
                        <span>Scheduled: {app.interviewDate}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Row Actions */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <FileText className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                    <span>Attached CV: {app.cvFileName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => selectJob(app.jobId)}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold transition-colors cursor-pointer"
                    >
                      View Vacancy
                    </button>
                    {app.status === "Interview" && (
                      <button
                        onClick={() =>
                          showToast("Connecting to Google Meet interview room...")
                        }
                        className="px-4 py-1.5 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Interview</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
