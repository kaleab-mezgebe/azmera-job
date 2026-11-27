"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Candidate, Application, ApplicationStatus } from "@/types";
import { t } from "@/lib/i18n";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  CalendarCheck,
  FileText,
  MapPin,
  Clock,
  Eye,
  ShieldCheck,
  Download,
  Sparkles,
  Columns,
  LayoutGrid,
  Star,
  ChevronRight,
  MessageSquare,
  StickyNote,
} from "lucide-react";
import CandidateProfileModal from "./CandidateProfileModal";
import ScheduleInterviewModal from "./ScheduleInterviewModal";

const PIPELINE_COLUMNS: { status: ApplicationStatus; color: string }[] = [
  { status: "Under Review", color: "border-slate-400 bg-slate-100/50 dark:bg-slate-800/40" },
  { status: "Shortlisted", color: "border-[#F59E0B] bg-amber-50/30 dark:bg-amber-950/20" },
  { status: "Interview", color: "border-[#0A2540] dark:border-[#F59E0B] bg-slate-100/50 dark:bg-slate-800/40" },
  { status: "Assessment", color: "border-[#0A2540] dark:border-[#F59E0B] bg-slate-100/50 dark:bg-slate-800/40" },
  { status: "Offer", color: "border-[#F59E0B] bg-amber-50/30 dark:bg-amber-950/20" },
  { status: "Hired", color: "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20" },
];

export default function ApplicantsManagementView() {
  const {
    applications,
    candidates,
    updateApplicationStatus,
    showToast,
    setTab,
    lang,
  } = useApp();

  const getColumnLabel = (status: ApplicationStatus) => {
    switch (status) {
      case "Under Review": return t(lang, "underReview");
      case "Shortlisted": return t(lang, "shortlisted");
      case "Interview": return t(lang, "interview");
      case "Assessment": return t(lang, "assessment");
      case "Offer": return t(lang, "offerExtended");
      case "Hired": return t(lang, "hired");
      default: return status;
    }
  };

  const [viewMode, setViewMode] = useState<"kanban" | "grid">("kanban");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | undefined>(undefined);
  const [interviewModalCandidate, setInterviewModalCandidate] = useState<Candidate | null>(null);
  const [cvPreviewUrl, setCvPreviewUrl] = useState<string | null>(null);

  // Internal Notes modal
  const [notesModalApp, setNotesModalApp] = useState<Application | null>(null);
  const [internalNoteText, setInternalNoteText] = useState("");

  // Candidate Ratings state
  const [ratings, setRatings] = useState<Record<string, number>>({
    "app-1": 5,
    "app-2": 4,
    "app-3": 5,
    "app-4": 4,
  });

  // Side-by-side comparison state
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const toggleCompare = (appId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(appId)) return prev.filter((id) => id !== appId);
      if (prev.length >= 3) {
        showToast("Select up to 3 candidates to compare side by side.", "info");
        return prev;
      }
      return [...prev, appId];
    });
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      !search ||
      app.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      app.candidateTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenProfile = (app: Application) => {
    const cand =
      candidates.find((c) => c.id === app.candidateId) || {
        id: app.candidateId,
        name: app.candidateName,
        avatar: app.candidateAvatar,
        title: app.candidateTitle,
        location: app.location,
        email: "candidate@azmerajob.et",
        phone: "+251 91 123 4567",
        bio: app.coverLetter,
        experienceYears: 4,
        education: [
          {
            institution: "Addis Ababa University",
            degree: "Bachelor of Science",
            field: "Computer Science",
            graduationYear: "2022",
          },
        ],
        workHistory: [
          {
            company: "Tech Solutions Ethiopia",
            role: "Software Developer",
            duration: "2022 - Present",
            description: "Developed web applications and cloud integrations.",
          },
        ],
        skills: ["React", "TypeScript", "Python"],
        cvFileName: app.cvFileName,
        cvFileSize: "2.1 MB",
        profileCompletion: 88,
      };

    setSelectedCandidate(cand);
    setSelectedApplication(app);
  };

  const handleScheduleFromModal = (cand: Candidate) => {
    setSelectedCandidate(null);
    setInterviewModalCandidate(cand);
  };

  const handleSetRating = (appId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [appId]: rating }));
    showToast(`Rated ${rating} stars!`, "success");
  };

  const handleSaveNote = () => {
    if (!notesModalApp) return;
    updateApplicationStatus(notesModalApp.id, notesModalApp.status, internalNoteText);
    showToast("Internal recruitment note recorded!", "success");
    setNotesModalApp(null);
    setInternalNoteText("");
  };

  return (
    <div className="space-y-6 pb-20">
      {/* ── HEADER & ATS CONTROLS ── */}
      <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
              Applicant Tracking
            </span>
            <span className="text-xs text-slate-400">• {applications.length} {t(lang, "applicants")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t(lang, "applicantTracking")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track candidates through screening stages, compare applicants, rate interviews, and extend offers.
          </p>
        </div>

        {/* View mode toggle & Compare button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {compareIds.length >= 2 && (
            <button
              onClick={() => setCompareModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] text-xs font-extrabold shadow-xs cursor-pointer"
            >
              {t(lang, "compareCandidates")} ({compareIds.length})
            </button>
          )}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "kanban"
                  ? "bg-white dark:bg-[#101E33] text-[#0A2540] dark:text-[#F59E0B] shadow-xs"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Columns className="w-4 h-4" />
              <span>{t(lang, "pipelineKanban")}</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-[#101E33] text-[#0A2540] dark:text-[#F59E0B] shadow-xs"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{t(lang, "cardsGrid")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="bg-white dark:bg-[#101E33] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
          <Search className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
          <input
            type="text"
            placeholder="Search candidate or job role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["All", "Under Review", "Shortlisted", "Interview", "Assessment", "Offer", "Hired", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] font-bold shadow-xs"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ── KANBAN ATS BOARD VIEW ── */}
      {viewMode === "kanban" ? (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-1">
          {PIPELINE_COLUMNS.map((col) => {
            const columnApps = filteredApps.filter(
              (a) =>
                a.status === col.status ||
                (col.status === "Under Review" && a.status === "Submitted")
            );

            return (
              <div
                key={col.status}
                className="w-80 shrink-0 bg-slate-50 dark:bg-[#0C1726] rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[750px]"
              >
                {/* Column header */}
                <div className={`p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between rounded-t-3xl border-t-4 ${col.color}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {getColumnLabel(col.status)}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white dark:bg-slate-800 shadow-2xs">
                    {columnApps.length}
                  </span>
                </div>

                {/* Candidate list in column */}
                <div className="p-3 flex-1 overflow-y-auto space-y-3">
                  {columnApps.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No candidates in this stage
                    </div>
                  ) : (
                    columnApps.map((app) => (
                      <div
                        key={app.id}
                        className="bg-white dark:bg-[#101E33] p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-[#F59E0B] hover:shadow-md transition-all space-y-3"
                      >
                        {/* Top: Photo, Name & Compare checkbox */}
                        <div className="flex items-start gap-3">
                          <img
                            src={app.candidateAvatar}
                            alt={app.candidateName}
                            className="w-11 h-11 rounded-xl object-cover border border-[#F59E0B]"
                          />
                          <div className="overflow-hidden flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <h4
                                onClick={() => handleOpenProfile(app)}
                                className="font-extrabold text-xs text-slate-900 dark:text-white hover:text-[#F59E0B] cursor-pointer truncate"
                              >
                                {app.candidateName}
                              </h4>
                              <input
                                type="checkbox"
                                checked={compareIds.includes(app.id)}
                                onChange={() => toggleCompare(app.id)}
                                title="Select to compare"
                                className="accent-[#0A2540] dark:accent-[#F59E0B] cursor-pointer shrink-0"
                              />
                            </div>
                            <p className="text-[11px] font-semibold text-[#0A2540] dark:text-[#38BDF8] truncate">
                              {app.jobTitle}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {app.location}
                            </p>
                          </div>
                        </div>

                        {/* AI Match score badge */}
                        <div className="flex items-center justify-between pt-1 text-[11px]">
                          <span className="px-2 py-0.5 rounded-md font-bold bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 text-[#0A2540] dark:text-[#F59E0B] flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                            <span>{app.aiMatchScore || 94}% AI Match</span>
                          </span>

                          {/* Star Rating */}
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => handleSetRating(app.id, star)}
                                className="cursor-pointer"
                              >
                                <Star
                                  className={`w-3.5 h-3.5 ${
                                    (ratings[app.id] || 4) >= star
                                      ? "fill-[#F59E0B] text-[#F59E0B]"
                                      : "text-slate-300 dark:text-slate-600"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Recruiter Note snippet */}
                        {app.internalNotes && app.internalNotes.length > 0 && (
                          <div className="p-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 text-[10px] text-amber-900 dark:text-amber-300">
                            <strong>Note:</strong> {Array.isArray(app.internalNotes) ? app.internalNotes.join(", ") : app.internalNotes}
                          </div>
                        )}

                        {/* Pipeline Advance Selector */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                          <select
                            value={app.status === "Submitted" ? "Under Review" : app.status}
                            onChange={(e) => {
                              const newSt = e.target.value as ApplicationStatus;
                              updateApplicationStatus(app.id, newSt);
                              showToast(`Advanced ${app.candidateName} to ${newSt}!`);
                            }}
                            className="text-[10px] font-bold p-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer"
                          >
                            <option value="Under Review">Under Review</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Interview">Interview</option>
                            <option value="Assessment">Assessment</option>
                            <option value="Offer">Offer</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setNotesModalApp(app);
                                const noteStr = Array.isArray(app.internalNotes)
                                  ? app.internalNotes.join("\n")
                                  : "";
                                setInternalNoteText(noteStr);
                              }}
                              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="Add Recruiter Notes"
                            >
                              <StickyNote className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenProfile(app)}
                              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="View Profile"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── CARDS GRID VIEW ── */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-[#101E33] p-5 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-[#F59E0B]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={app.candidateAvatar}
                      alt={app.candidateName}
                      className="w-13 h-13 rounded-2xl object-cover border-2 border-[#0A2540] dark:border-[#F59E0B]"
                    />
                    <div>
                      <h3
                        onClick={() => handleOpenProfile(app)}
                        className="font-extrabold text-sm text-slate-900 dark:text-white hover:text-[#F59E0B] transition-colors cursor-pointer"
                      >
                        {app.candidateName}
                      </h3>
                      <p className="text-xs font-semibold text-[#0A2540] dark:text-[#38BDF8]">
                        {app.candidateTitle}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#0A2540] dark:text-[#F59E0B]" />
                        {app.location} • Applied {app.appliedDate}
                      </p>
                    </div>
                  </div>

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
                </div>

                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Position:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{app.jobTitle}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Attachment:</span>
                    <button
                      onClick={() => setCvPreviewUrl(app.cvFileName)}
                      className="font-bold text-[#0A2540] dark:text-[#38BDF8] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{app.cvFileName}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                  "{app.coverLetter}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenProfile(app)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                  <span>View Profile</span>
                </button>

                <div className="flex items-center gap-1.5 ml-auto">
                  {app.status !== "Shortlisted" && app.status !== "Interview" && (
                    <button
                      onClick={() => {
                        updateApplicationStatus(app.id, "Shortlisted");
                        showToast(`Shortlisted ${app.candidateName}!`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 hover:text-white text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Shortlist
                    </button>
                  )}

                  <button
                    onClick={() => {
                      const cand = candidates.find((c) => c.id === app.candidateId) || {
                        id: app.candidateId,
                        name: app.candidateName,
                        avatar: app.candidateAvatar,
                        title: app.candidateTitle,
                        location: app.location,
                        email: "cand@azmerajob.et",
                        phone: "+251 91 123 4567",
                        bio: "",
                        experienceYears: 4,
                        education: [],
                        workHistory: [],
                        skills: [],
                        cvFileName: app.cvFileName,
                        cvFileSize: "2MB",
                        profileCompletion: 90,
                      };
                      setInterviewModalCandidate(cand);
                      setSelectedApplication(app);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Interview</span>
                  </button>

                  {app.status !== "Rejected" && (
                    <button
                      onClick={() => {
                        updateApplicationStatus(app.id, "Rejected");
                        showToast(`Rejected ${app.candidateName}`);
                      }}
                      className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      title="Reject candidate"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── RECRUITER NOTES MODAL ── */}
      {notesModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Internal Notes for {notesModalApp.candidateName}
                </h3>
              </div>
              <button
                onClick={() => setNotesModalApp(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                These notes are strictly private to your hiring committee and never visible to the candidate.
              </p>
              <textarea
                rows={4}
                placeholder="Candidate demonstrated great proficiency in React. Salary expectation 45,000 ETB. Recommended for technical interview..."
                value={internalNoteText}
                onChange={(e) => setInternalNoteText(e.target.value)}
                className="w-full p-3 rounded-2xl text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:border-[#F59E0B]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setNotesModalApp(null)}
                className="px-3 py-1.5 text-xs font-bold text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-xl bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] text-xs font-black shadow-xs cursor-pointer"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Profile Details Modal */}
      {selectedCandidate && (
        <CandidateProfileModal
          candidate={selectedCandidate}
          application={selectedApplication}
          onClose={() => {
            setSelectedCandidate(null);
            setSelectedApplication(undefined);
          }}
          onScheduleInterview={handleScheduleFromModal}
        />
      )}

      {/* Schedule Interview Modal */}
      {interviewModalCandidate && (
        <ScheduleInterviewModal
          candidate={interviewModalCandidate}
          application={selectedApplication}
          onClose={() => {
            setInterviewModalCandidate(null);
            setSelectedApplication(undefined);
          }}
        />
      )}

      {/* Side-by-Side Candidate Comparison Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                {t(lang, "compareCandidates")}
              </h3>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {applications
                .filter((a) => compareIds.includes(a.id))
                .map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-2.5 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={app.candidateAvatar} alt={app.candidateName} className="w-10 h-10 rounded-xl object-cover border border-[#F59E0B]" />
                      <div>
                        <div className="font-extrabold text-slate-900 dark:text-white">{app.candidateName}</div>
                        <div className="text-[11px] text-slate-500">{app.candidateTitle}</div>
                      </div>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div><strong>Role:</strong> {app.jobTitle}</div>
                      <div><strong>Location:</strong> {app.location}</div>
                      <div><strong>Stage:</strong> {app.status}</div>
                      <div><strong>Match:</strong> {app.aiMatchScore || 92}%</div>
                      <div><strong>Rating:</strong> {"★".repeat(ratings[app.id] || 4)}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* CV Preview Modal */}
      {cvPreviewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0A2540] dark:text-[#F59E0B]" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{cvPreviewUrl}</h3>
              </div>
              <button
                onClick={() => setCvPreviewUrl(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-8 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-center space-y-3">
              <FileText className="w-12 h-12 text-[#0A2540] dark:text-[#F59E0B] mx-auto animate-pulse" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Verified Candidate CV</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Validated PDF format including academic credentials and work history.
              </p>
              <button
                onClick={() => {
                  showToast(`Downloading ${cvPreviewUrl}...`);
                  setCvPreviewUrl(null);
                }}
                className="px-4 py-2 bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl cursor-pointer"
              >
                Download Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
