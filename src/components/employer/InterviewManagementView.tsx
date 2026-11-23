"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Interview } from "@/types";
import {
  CalendarCheck,
  Video,
  MapPin,
  Clock,
  User,
  PlusCircle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import ScheduleInterviewModal from "./ScheduleInterviewModal";

export default function InterviewManagementView() {
  const { interviews, candidates, showToast } = useApp();
  const [filter, setFilter] = useState<"All" | "Scheduled" | "Completed">("All");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const filtered = interviews.filter((i) => {
    if (filter === "All") return true;
    return i.status === filter;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A1C2E]">
            Interview Management & Coordination
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Track scheduled video conferences, phone calls, and in-person interviews in
            Addis Ababa.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-[#0A2540] hover:bg-[#071A2E] text-white text-xs font-bold shadow-md shadow-[#0A2540]/20 flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Schedule New Interview</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["All", "Scheduled", "Completed"] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === st
                ? "bg-[#0A2540] text-white font-bold"
                : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
            }`}
          >
            {st} (
            {interviews.filter((i) => st === "All" || i.status === st).length})
          </button>
        ))}
      </div>

      {/* Interviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 bg-white p-12 rounded-3xl border border-[#E2E8F0] text-center space-y-2">
            <CalendarCheck className="w-8 h-8 text-[#64748B] mx-auto" />
            <h3 className="font-bold text-sm text-[#0A1C2E]">
              No interviews in this view
            </h3>
            <p className="text-xs text-[#64748B]">
              Schedule an interview directly from the applicant cards.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-4 hover:border-[#0A2540]/40 transition-colors"
            >
              {/* Header: Candidate & Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.candidateAvatar}
                    alt={item.candidateName}
                    className="w-12 h-12 rounded-full object-cover border border-[#0A2540]"
                  />
                  <div>
                    <h3 className="font-extrabold text-sm text-[#0A1C2E]">
                      {item.candidateName}
                    </h3>
                    <p className="text-xs text-[#0A2540] font-medium">{item.jobTitle}</p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    item.status === "Scheduled"
                      ? "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                      : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Date, Time & Mode */}
              <div className="p-3.5 bg-[#F8FAFC] rounded-2xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0A2540]" />
                    <span>Date & Time:</span>
                  </span>
                  <span className="font-bold text-[#0A1C2E]">
                    {item.date} • {item.time}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B] flex items-center gap-1.5">
                    {item.type === "Google Meet" ? (
                      <Video className="w-3.5 h-3.5 text-[#0A2540]" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 text-[#0A2540]" />
                    )}
                    <span>Format:</span>
                  </span>
                  <span className="font-bold text-[#0A1C2E] truncate max-w-[200px]">
                    {item.type} ({item.locationOrLink})
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B]">Interviewer:</span>
                  <span className="font-semibold text-[#0A1C2E]">
                    {item.interviewerName}
                  </span>
                </div>
              </div>

              {/* Notes */}
              {item.notes && (
                <p className="text-xs text-[#64748B] leading-relaxed">
                  <strong className="text-[#0A1C2E]">Notes:</strong> {item.notes}
                </p>
              )}

              {/* Actions */}
              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                {item.type === "Google Meet" ? (
                  <button
                    onClick={() => showToast("Opening video conference...")}
                    className="px-4 py-2 bg-[#0A2540] hover:bg-[#071A2E] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Meeting</span>
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-[#0A2540]">
                    In-Person at Bole Office
                  </span>
                )}

                <button
                  onClick={() =>
                    showToast(`Updated interview status for ${item.candidateName}`)
                  }
                  className="text-xs font-bold text-[#64748B] hover:text-[#0A1C2E] px-3 py-1.5 rounded-lg hover:bg-[#F8FAFC]"
                >
                  {item.status === "Scheduled" ? "Mark Completed" : "Reschedule"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isScheduleOpen && (
        <ScheduleInterviewModal
          candidate={candidates[0]}
          onClose={() => setIsScheduleOpen(false)}
        />
      )}
    </div>
  );
}
