"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Candidate, Application } from "@/types";
import {
  X,
  CalendarCheck,
  Video,
  MapPin,
  Clock,
  User,
  Sparkles,
} from "lucide-react";

interface ScheduleInterviewModalProps {
  candidate: Candidate;
  application?: Application;
  onClose: () => void;
}

export default function ScheduleInterviewModal({
  candidate,
  application,
  onClose,
}: ScheduleInterviewModalProps) {
  const { scheduleInterview, showToast } = useApp();

  const [date, setDate] = useState("2026-11-28");
  const [time, setTime] = useState("2:00 PM - 3:00 PM (EAT)");
  const [type, setType] = useState<"Google Meet" | "In-person" | "Phone">("Google Meet");
  const [locationOrLink, setLocationOrLink] = useState("https://meet.google.com/azm-interview");
  const [interviewerName, setInterviewerName] = useState("Yared Molla (Lead Recruiter)");
  const [notes, setNotes] = useState(
    "Discussion regarding technical architecture, experience with high-load platforms, and team culture."
  );

  const handleTypeChange = (newType: "Google Meet" | "In-person" | "Phone") => {
    setType(newType);
    if (newType === "Google Meet") {
      setLocationOrLink("https://meet.google.com/azm-interview");
    } else if (newType === "In-person") {
      setLocationOrLink("Chapa HQ, Bole Medhanialem Tower 5th Floor, Addis Ababa");
    } else {
      setLocationOrLink("+251 91 144 8822");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleInterview({
      applicationId: application?.id || `app-${Date.now()}`,
      jobId: application?.jobId || "job-1",
      jobTitle: application?.jobTitle || "Senior Full Stack Engineer",
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateAvatar: candidate.avatar,
      date,
      time,
      type,
      locationOrLink,
      interviewerName,
      notes,
      status: "Scheduled",
    });
    showToast(`Interview scheduled with ${candidate.name}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-[#101E33] z-10">
          <div>
            <span className="text-[10px] font-bold text-[#0A2540] dark:text-[#FBBF24] bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 border border-[#0A2540]/15 dark:border-[#F59E0B]/30 px-2 py-0.5 rounded-md">
              Recruitment Coordination
            </span>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
              Schedule Interview with {candidate.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Format selection */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
              Interview Format *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["Google Meet", "In-person", "Phone"] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => handleTypeChange(fmt)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    type === fmt
                      ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] border-[#0A2540] dark:border-[#F59E0B] shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Interview Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Time Slot (EAT) *
              </label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="2:00 PM - 3:00 PM"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
              {type === "Google Meet"
                ? "Meeting Link"
                : type === "In-person"
                ? "Venue / Office Address"
                : "Phone Number"}
            </label>
            <input
              type="text"
              required
              value={locationOrLink}
              onChange={(e) => setLocationOrLink(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
              Interviewer Name / Title
            </label>
            <input
              type="text"
              required
              value={interviewerName}
              onChange={(e) => setInterviewerName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
              Instructions & Preparation Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold shadow-md shadow-[#0A2540]/20 cursor-pointer"
            >
              Send Interview Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
