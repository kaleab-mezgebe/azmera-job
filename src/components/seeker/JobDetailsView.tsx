"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  Building2,
  ArrowLeft,
  Share2,
  DollarSign,
  Users,
  ExternalLink,
  Sparkles,
  Send,
  Phone,
  Flame,
  FileText,
  Download,
  Paperclip,
} from "lucide-react";
import ApplyJobModal from "./ApplyJobModal";
import RichDocumentRenderer from "@/components/common/RichDocumentRenderer";

export default function JobDetailsView() {
  const {
    selectedJob,
    setTab,
    toggleSaveJob,
    isJobSaved,
    hasApplied,
    jobs,
    selectJob,
    showToast,
  } = useApp();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  if (!selectedJob) {
    return (
      <div className="p-12 text-center">
        <p className="text-sm text-[#64748B]">No job selected.</p>
        <button
          onClick={() => setTab("search")}
          className="mt-3 px-4 py-2 bg-[#0A2540] text-white rounded-xl text-xs font-bold"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const saved = isJobSaved(selectedJob.id);
  const applied = hasApplied(selectedJob.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Job link copied to clipboard!");
    } else {
      showToast("Job link ready to share!");
    }
  };

  const similarJobs = jobs
    .filter((j) => j.id !== selectedJob.id && j.category === selectedJob.category)
    .slice(0, 3);

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => setTab("search")}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0A2540] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Vacancies</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={selectedJob.companyLogo}
              alt={selectedJob.companyName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#E2E8F0] shadow-xs"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-[#64748B]">
                  {selectedJob.companyName}
                </span>
                {selectedJob.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A2540] dark:text-[#38BDF8] bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Employer
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {selectedJob.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                  {selectedJob.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                  {selectedJob.type} ({selectedJob.workplaceType})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                  Posted {selectedJob.postedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 self-start shrink-0">
            <button
              onClick={handleShare}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Share job"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleSaveJob(selectedJob.id)}
              className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                saved
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-[#D97706]"
                  : "border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
              title={saved ? "Saved" : "Save Job"}
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-[#F59E0B] text-[#F59E0B]" : ""}`} />
            </button>

            {applied ? (
              <button
                disabled
                className="px-6 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5 cursor-default"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Application Submitted</span>
              </button>
            ) : (
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-[#0A2540] hover:bg-[#071A2E] text-white text-xs font-bold shadow-md shadow-[#0A2540]/20 transition-all cursor-pointer hover:scale-[1.02]"
              >
                Apply for Position
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E2E8F0]">
          <div className="p-3.5 bg-[#F8FAFC] dark:bg-slate-800/60 rounded-2xl">
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 block font-medium">
              Monthly Compensation
            </span>
            <span className="text-sm font-extrabold text-[#0A2540] dark:text-[#F59E0B]">
              {selectedJob.salaryMin.toLocaleString()} -{" "}
              {selectedJob.salaryMax.toLocaleString()} ETB
            </span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] dark:bg-slate-800/60 rounded-2xl">
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 block font-medium">
              Experience Level
            </span>
            <span className="text-sm font-bold text-[#0A1C2E] dark:text-white">
              {selectedJob.experienceLevel}
            </span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] dark:bg-slate-800/60 rounded-2xl">
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 block font-medium">
              Application Deadline
            </span>
            <span className="text-sm font-bold text-[#0A1C2E] dark:text-white">
              {selectedJob.deadline}
            </span>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] dark:bg-slate-800/60 rounded-2xl">
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 block font-medium">
              Applicants So Far
            </span>
            <span className="text-sm font-bold text-[#0A1C2E] dark:text-white">
              {selectedJob.applicantCount} candidates
            </span>
          </div>
        </div>

        {/* Badges for Openings or Circular */}
        {(selectedJob.openingsCount || selectedJob.sourceCircular) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {selectedJob.openingsCount && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60">
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                {selectedJob.openingsCount} Vacancies Available
              </span>
            )}
            {selectedJob.sourceCircular && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                📋 Source: {selectedJob.sourceCircular}
              </span>
            )}
          </div>
        )}

        {/* Direct Fast-Track Apply Card (ናባይ ቀጥታ ኣመልክቱ) */}
        {selectedJob.directAgentApply && (
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-2 border-[#F59E0B] p-5 sm:p-6 rounded-3xl space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F59E0B] text-[#0A2540] flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                ⚡
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Direct Agent Fast-Track Application
                  </h3>
                  <span className="text-xs font-extrabold text-[#D97706] bg-amber-100 dark:bg-amber-950/60 dark:text-[#FBBF24] px-3 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                    ናባይ ቀጥታ ኣመልክቱ
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  The employer has assigned Azmera Job Connect to directly screen and place qualified candidates immediately. You can contact Azmera directly via Telegram or Phone for fast scheduling!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`https://t.me/${(selectedJob.directTelegramHandle || "@AzmeraJobConnect").replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs shadow-md shadow-[#0088cc]/20 transition-all hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                <span>Message Azmera on Telegram ({selectedJob.directTelegramHandle || "@AzmeraJobConnect"})</span>
              </a>

              <a
                href={`tel:${selectedJob.directContactPhone || "+251911000000"}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A2540] dark:bg-[#1E293B] hover:bg-[#071A2E] text-white font-bold text-xs border border-slate-300 dark:border-slate-700 shadow-xs transition-all hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 text-[#F59E0B]" />
                <span>Call Directly: {selectedJob.directContactPhone || "+251 91 100 0000"}</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Main Details Grid: Content + Company Aside */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Description, Responsibilities, Requirements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Promotional Flyer Banner if available (like TDRF circular flyer) */}
          {selectedJob.flyerImage && (
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md relative group bg-black">
              <img
                src={selectedJob.flyerImage}
                alt={`${selectedJob.title} Circular`}
                className="w-full h-auto object-cover max-h-96 opacity-95 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-3 left-3 bg-[#0A2540]/90 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg border border-white/10 backdrop-blur-xs">
                <FileText className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Official Vacancy Circular Flyer (የስራ ማስታወቂያ)</span>
              </div>
            </div>
          )}

          {/* About the Role */}
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-slate-800 space-y-4">
            <h2 className="text-lg font-extrabold text-[#0A1C2E] dark:text-white">Role Overview</h2>
            <RichDocumentRenderer content={selectedJob.description} />

            {/* Responsibilities */}
            <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-[#0A1C2E] dark:text-white">Key Responsibilities</h3>
              <ul className="space-y-2.5">
                {selectedJob.responsibilities.map((resp, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-[#0A1C2E] dark:text-slate-300 leading-relaxed"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0A2540] dark:bg-[#F59E0B] mt-1.5 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications */}
            <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-[#0A1C2E] dark:text-white">
                Required Qualifications & Experience
              </h3>
              <ul className="space-y-2.5">
                {selectedJob.qualifications.map((qual, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-[#0A1C2E] dark:text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B] mt-0.5 shrink-0" />
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Official Attached Circulars & Downloadable Documents Shelf */}
          {selectedJob.attachments && selectedJob.attachments.length > 0 && (
            <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-bold">
                    <Paperclip className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Official Circulars &amp; Downloadable Documents
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Official specifications, terms of reference, and candidate forms
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0A2540] dark:text-[#FBBF24] bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  {selectedJob.attachments.length} Document{selectedJob.attachments.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {selectedJob.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100/80 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-black text-xs text-rose-600 shrink-0 shadow-2xs">
                        {file.type.toUpperCase()}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-slate-900 dark:text-white block truncate group-hover:text-[#F59E0B] transition-colors">
                          {file.name}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {file.size} • Verified Circular File
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast(`Downloading ${file.name}...`)}
                      className="px-3.5 py-2 rounded-xl bg-[#0A2540] hover:bg-[#07192C] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105 shrink-0 ml-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Apply Card */}
          <div className="bg-gradient-to-r from-[#0A2540] to-[#0E2F52] p-6 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#F59E0B]/30">
            <div>
              <h3 className="text-base font-extrabold">Ready to take the next step?</h3>
              <p className="text-xs text-slate-200 mt-1">
                Apply now with your Azmera profile and verified CV.
              </p>
            </div>
            {applied ? (
              <span className="px-5 py-2.5 bg-white/20 text-white font-bold text-xs rounded-xl">
                Already Applied
              </span>
            ) : (
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0A2540] font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>

        {/* Right 1 Col: Company Profile & Similar Jobs */}
        <div className="space-y-6">
          {/* Company Card */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedJob.companyLogo}
                alt={selectedJob.companyName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-white"
              />
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {selectedJob.companyName}
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {selectedJob.category}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Leading Ethiopian institution committed to digital innovation, local
              employment creation, and operational excellence.
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Headquarters:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedJob.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Work Model:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedJob.workplaceType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Verification:</span>
                <span className="text-[#0A2540] dark:text-[#38BDF8] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          </div>

          {/* Similar Openings */}
          {similarJobs.length > 0 && (
            <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Similar Opportunities
              </h3>
              <div className="space-y-3">
                {similarJobs.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => selectJob(sim.id)}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {sim.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{sim.companyName}</p>
                    <span className="text-[11px] font-extrabold text-[#0A2540] dark:text-[#F59E0B] mt-1 block">
                      {sim.salaryMin.toLocaleString()} - {sim.salaryMax.toLocaleString()}{" "}
                      ETB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <ApplyJobModal
          job={selectedJob}
          onClose={() => setIsApplyModalOpen(false)}
        />
      )}
    </div>
  );
}
