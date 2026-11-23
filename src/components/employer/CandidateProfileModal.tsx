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
} from "lucide-react";

interface CandidateProfileModalProps {
  candidate: Candidate;
  application?: Application;
  onClose: () => void;
  onScheduleInterview: (cand: Candidate) => void;
}

export default function CandidateProfileModal({
  candidate,
  application,
  onClose,
  onScheduleInterview,
}: CandidateProfileModalProps) {
  const { updateApplicationStatus, showToast } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-start justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#0A2540]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-[#0A1C2E]">
                  {candidate.name}
                </h2>
                {application && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      application.status === "Shortlisted"
                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        : application.status === "Interview"
                        ? "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                        : "bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    }`}
                  >
                    {application.status}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#0A2540]">{candidate.title}</p>
              <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#0A2540]" />
                {candidate.location} • {candidate.experienceYears} Years Exp.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#0A1C2E] rounded-xl hover:bg-[#F8FAFC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2.5 p-3 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
            <button
              onClick={() => {
                onScheduleInterview(candidate);
              }}
              className="px-4 py-2 bg-[#0A2540] hover:bg-[#071A2E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Schedule Interview</span>
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
                className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl transition-colors"
              >
                Reject
              </button>
            )}

            <button
              onClick={() => showToast(`Opening ${candidate.cvFileName}...`)}
              className="px-3.5 py-2 bg-white border border-[#E2E8F0] text-xs font-bold text-[#0A1C2E] rounded-xl flex items-center gap-1.5 ml-auto"
            >
              <Download className="w-3.5 h-3.5 text-[#0A2540]" />
              <span>Download CV</span>
            </button>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0A2540]" />
              <span className="font-semibold text-[#0A1C2E]">{candidate.email}</span>
            </div>
            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#0A2540]" />
              <span className="font-semibold text-[#0A1C2E]">{candidate.phone}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-[#0A1C2E] leading-relaxed">
              {candidate.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#0A2540]" />
              <span>Work Experience</span>
            </h3>
            <div className="space-y-2.5">
              {candidate.workHistory.map((work, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[#0A1C2E]">{work.role}</h4>
                    <span className="text-[10px] font-bold text-[#0A2540]">
                      {work.duration}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] font-semibold">{work.company}</p>
                  <p className="text-xs text-[#0A1C2E] pt-1">{work.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#0A2540]" />
              <span>Education</span>
            </h3>
            {candidate.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
              >
                <h4 className="font-bold text-xs text-[#0A1C2E]">{edu.degree}</h4>
                <p className="text-xs text-[#0A2540] font-medium">{edu.institution}</p>
                <p className="text-[11px] text-[#64748B]">
                  {edu.field} • Class of {edu.graduationYear}
                </p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
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
            <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
              <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Submitted Cover Letter for {application.jobTitle}
              </h3>
              <p className="text-xs text-[#0A1C2E] bg-[#F8FAFC] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed">
                {application.coverLetter}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
