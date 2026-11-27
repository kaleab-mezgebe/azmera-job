"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Candidate, Application } from "@/types";
import {
  X,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  FileText,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Download,
  Video,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface CandidateProfileModalProps {
  candidate: Candidate;
  application?: Application;
  onClose: () => void;
  onScheduleInterview?: (cand: Candidate) => void;
}

export default function CandidateProfileModal({
  candidate,
  application,
  onClose,
  onScheduleInterview,
}: CandidateProfileModalProps) {
  const { updateApplicationStatus, showToast, openPaymentModal } = useApp();
  const [isHiredOrUnlocked, setIsHiredOrUnlocked] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between sticky top-0 bg-white dark:bg-[#101E33] z-10">
          <div className="flex items-center gap-4">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#0A2540] dark:border-[#F59E0B]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {candidate.name}
                </h2>
                {application && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      application.status === "Shortlisted"
                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        : application.status === "Interview"
                        ? "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                        : "bg-[#EEF4FA] text-[#0A2540] dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {application.status}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#0A2540] dark:text-[#F59E0B]">{candidate.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                {candidate.location} • {candidate.experienceYears} Years Exp.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2.5 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            {onScheduleInterview && (
              <button
                onClick={() => {
                  onScheduleInterview(candidate);
                }}
                className="px-4 py-2 bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Schedule Interview</span>
              </button>
            )}

            {/* Direct Hire / Placement Monetization Button */}
            <button
              onClick={() => {
                if (isHiredOrUnlocked) {
                  showToast(`${candidate.name} is already hired with 14-day replacement active.`);
                  return;
                }
                openPaymentModal({
                  amount: 2000,
                  purpose: "talent_unlock",
                  purposeLabel: `Direct Talent Placement & Guarantee (${candidate.name})`,
                  title: `Hire ${candidate.name} (Direct Placement)`,
                  description: `Settle placement fee via Telebirr, CBE Bank, or M-Pesa. Includes 14-Day Free Candidate Replacement Guarantee.`,
                  metadata: {
                    candidateId: candidate.id,
                    candidateName: candidate.name,
                  },
                  onSuccess: () => {
                    setIsHiredOrUnlocked(true);
                    if (application) {
                      updateApplicationStatus(application.id, "Hired", "Hired via Azmera Fast-Track Placement.");
                    }
                  },
                });
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                isHiredOrUnlocked
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#0A2540] shadow-md shadow-amber-500/20"
              }`}
            >
              {isHiredOrUnlocked ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Hired • 14-Day Guarantee Active</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Direct Hire (2,000 ETB)</span>
                </>
              )}
            </button>

            {application && application.status !== "Shortlisted" && (
              <button
                onClick={() => {
                  updateApplicationStatus(application.id, "Shortlisted");
                  showToast(`${candidate.name} shortlisted!`);
                }}
                className="px-3.5 py-2 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 hover:text-white text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Shortlist Candidate
              </button>
            )}

            {application && application.status !== "Rejected" && (
              <button
                onClick={() => {
                  updateApplicationStatus(application.id, "Rejected");
                  showToast(`${candidate.name} marked as rejected.`);
                }}
                className="px-3.5 py-2 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Reject
              </button>
            )}

            <button
              onClick={() => showToast(`Opening ${candidate.cvFileName}...`)}
              className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl flex items-center gap-1.5 ml-auto cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
              <span>Download CV</span>
            </button>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2 min-w-0">
              <Mail className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B] shrink-0" />
              <span className="font-semibold text-slate-900 dark:text-white truncate">{candidate.email}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2 min-w-0">
              <Phone className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B] shrink-0" />
              <span className="font-semibold text-slate-900 dark:text-white truncate">{candidate.phone}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {candidate.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
              <span>Work Experience</span>
            </h3>
            <div className="space-y-2.5">
              {candidate.workHistory.map((work, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{work.role}</h4>
                    <span className="text-[10px] font-bold text-[#0A2540] dark:text-[#38BDF8]">
                      {work.duration}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{work.company}</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 pt-1">{work.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
              <span>Education</span>
            </h3>
            {candidate.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
              >
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{edu.degree}</h4>
                <p className="text-xs text-[#0A2540] dark:text-[#38BDF8] font-medium">{edu.institution}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {edu.field} • Class of {edu.graduationYear}
                </p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Application Cover letter if available */}
          {application && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Submitted Cover Letter for {application.jobTitle}
              </h3>
              <p className="text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl whitespace-pre-line leading-relaxed">
                {application.coverLetter}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
