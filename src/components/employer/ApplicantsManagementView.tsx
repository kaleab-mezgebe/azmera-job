"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Candidate, Application, ApplicationStatus } from "@/types";
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
} from "lucide-react";
import CandidateProfileModal from "./CandidateProfileModal";
import ScheduleInterviewModal from "./ScheduleInterviewModal";

export default function ApplicantsManagementView() {
  const {
    applications,
    candidates,
    updateApplicationStatus,
    showToast,
  } = useApp();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | undefined>(undefined);
  const [interviewModalCandidate, setInterviewModalCandidate] = useState<Candidate | null>(null);
  const [cvPreviewUrl, setCvPreviewUrl] = useState<string | null>(null);

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

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A1C2E]">
            Candidate & Applicant Management ({filteredApps.length})
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Review profiles, screen CVs, advance candidates, and coordinate interviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            {applications.filter((a) => a.status === "Shortlisted").length} Candidates Shortlisted
          </span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 flex items-center gap-2 px-3 py-2 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] focus-within:border-[#0A2540]">
          <Search className="w-4 h-4 text-[#0A2540]" />
          <input
            type="text"
            placeholder="Search candidate or job role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs text-[#0A1C2E] bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["All", "Under Review", "Shortlisted", "Interview", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-[#0A2540] text-white font-bold"
                  : "bg-[#F8FAFC] text-[#64748B] hover:bg-white border border-transparent hover:border-[#E2E8F0]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredApps.length === 0 ? (
          <div className="col-span-2 bg-white p-12 rounded-3xl border border-[#E2E8F0] text-center space-y-2">
            <Users className="w-8 h-8 text-[#64748B] mx-auto" />
            <h3 className="font-bold text-sm text-[#0A1C2E]">
              No applicants found matching this criteria
            </h3>
            <p className="text-xs text-[#64748B]">
              Try clearing filters or search query.
            </p>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white p-5 rounded-3xl border border-[#E2E8F0] hover:border-[#0A2540]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Top Row: Candidate info + Status badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={app.candidateAvatar}
                      alt={app.candidateName}
                      className="w-13 h-13 rounded-2xl object-cover border border-[#0A2540]"
                    />
                    <div>
                      <h3
                        onClick={() => handleOpenProfile(app)}
                        className="font-extrabold text-sm text-[#0A1C2E] hover:text-[#0A2540] transition-colors cursor-pointer"
                      >
                        {app.candidateName}
                      </h3>
                      <p className="text-xs font-semibold text-[#0A2540]">
                        {app.candidateTitle}
                      </p>
                      <p className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#0A2540]" />
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

                {/* Target Role & CV link */}
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

                {/* Excerpt of cover letter */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                  "{app.coverLetter}"
                </p>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenProfile(app)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                  <span>View Profile</span>
                </button>

                <div className="flex items-center gap-1.5 ml-auto">
                  {/* Shortlist */}
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

                  {/* Schedule Interview */}
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
                    className="px-3.5 py-1.5 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Interview</span>
                  </button>

                  {/* Reject */}
                  {app.status !== "Rejected" && (
                    <button
                      onClick={() => {
                        updateApplicationStatus(app.id, "Rejected");
                        showToast(`Rejected ${app.candidateName}`);
                      }}
                      className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                      title="Reject candidate"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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

      {/* CV Preview Modal */}
      {cvPreviewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0A2540]" />
                <h3 className="font-extrabold text-sm text-[#0A1C2E]">{cvPreviewUrl}</h3>
              </div>
              <button
                onClick={() => setCvPreviewUrl(null)}
                className="text-[#64748B] hover:text-[#0A1C2E]"
              >
                ✕
              </button>
            </div>

            <div className="p-8 bg-[#F8FAFC] rounded-2xl text-center space-y-3">
              <FileText className="w-12 h-12 text-[#0A2540] mx-auto animate-pulse" />
              <h4 className="font-bold text-sm text-[#0A1C2E]">Verified Candidate CV</h4>
              <p className="text-xs text-[#64748B] max-w-xs mx-auto">
                Validated PDF format including academic credentials and work history.
              </p>
              <button
                onClick={() => {
                  showToast(`Downloading ${cvPreviewUrl}...`);
                  setCvPreviewUrl(null);
                }}
                className="px-4 py-2 bg-[#0A2540] text-white text-xs font-bold rounded-xl"
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
