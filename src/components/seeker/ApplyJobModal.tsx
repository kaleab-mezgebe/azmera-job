"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Job } from "@/types";
import { t } from "@/lib/i18n";
import {
  X,
  FileText,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Sparkles,
  Send,
} from "lucide-react";

interface ApplyJobModalProps {
  job: Job;
  onClose: () => void;
}

export default function ApplyJobModal({ job, onClose }: ApplyJobModalProps) {
  const { seeker, applyToJob, showToast, lang } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCv, setSelectedCv] = useState<string>(seeker.cvFileName);
  const [customCvName, setCustomCvName] = useState<string | null>(null);
  const [availabilityAnswer, setAvailabilityAnswer] = useState<string>("Immediate / 2 weeks notice");
  const [coverLetter, setCoverLetter] = useState(
    `Dear ${job.companyName} Hiring Team,\n\nI am writing to express my strong interest in the ${job.title} position at your organization. With my practical background in ${job.skills.slice(0, 3).join(", ")}, I am confident I can contribute to your team's goals.\n\nThank you for considering my application.\n\nSincerely,\n${seeker.name}`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomCvName(file.name);
      setSelectedCv(file.name);
      showToast(`Uploaded ${file.name}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const ok = applyToJob(job.id, coverLetter, selectedCv, {
        availability: availabilityAnswer,
      });
      setIsSubmitting(false);
      if (ok) {
        onClose();
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-[#101E33] z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#0A2540] dark:text-[#FBBF24] bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 border border-[#0A2540]/15 dark:border-[#F59E0B]/30 px-2 py-0.5 rounded-md">
                Step {step} of 2
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                {step === 1 ? "Application Details" : "Review & Submit"}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
              {t(lang, "applyForPosition")}: {job.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{job.companyName} • {job.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {step === 1 ? (
          <div className="p-6 space-y-5">
            {/* Telegram 30-Second Fast-Track Option */}
            <div className="p-4 bg-amber-50/70 dark:bg-slate-800/70 border border-amber-200 dark:border-slate-700 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0A2540] text-[#F59E0B] flex items-center justify-center shrink-0 shadow-sm">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 flex-wrap">
                    <span>No CV ready on your phone? Apply via Telegram</span>
                    <span className="text-[10px] bg-[#F59E0B] text-[#0A2540] font-black px-1.5 py-0.5 rounded-full">30 Sec</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    Connect directly with Azmera coordinators on Telegram for fast telephone screening.
                  </p>
                </div>
              </div>
              <a
                href={`https://t.me/${(job.directTelegramHandle || "@AzmeraJobConnect").replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] font-extrabold text-xs rounded-xl shadow-xs transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Telegram</span>
              </a>
            </div>

            {job.directAgentApply && (
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">⚡</span>
                  <div>
                    <span className="font-bold text-amber-950 dark:text-amber-200 block">
                      {t(lang, "directApplyBadge")}
                    </span>
                    <span className="text-[11px] text-amber-800 dark:text-amber-300">
                      Submit online or connect via Telegram ({job.directTelegramHandle || "@AzmeraJobConnect"}) for instant interview scheduling.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* CV Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                1. Select or Upload Curriculum Vitae (CV)
              </label>

              <div className="space-y-2">
                {/* Saved CVs from Profile */}
                {(seeker.cvList && seeker.cvList.length > 0
                  ? seeker.cvList
                  : [{ id: "cv-default", name: seeker.cvFileName, size: seeker.cvFileSize, updatedAt: "Verified" }]
                ).map((cv) => (
                  <div
                    key={cv.id}
                    onClick={() => setSelectedCv(cv.name)}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      selectedCv === cv.name
                        ? "border-[#F59E0B] bg-amber-50/60 dark:bg-amber-950/30"
                        : "border-slate-200 dark:border-slate-700 hover:border-[#F59E0B]/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {cv.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {cv.updatedAt} • {cv.size}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedCv === cv.name
                          ? "border-[#F59E0B] bg-[#F59E0B]"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {selectedCv === cv.name && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
                      )}
                    </div>
                  </div>
                ))}

                {/* Custom Uploaded CV if present */}
                {customCvName && (
                  <div
                    onClick={() => setSelectedCv(customCvName)}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      selectedCv === customCvName
                        ? "border-[#F59E0B] bg-amber-50/60 dark:bg-amber-950/30"
                        : "border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EEF4FA] dark:bg-slate-800 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {customCvName}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Newly uploaded PDF document
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedCv === customCvName
                          ? "border-[#F59E0B] bg-[#F59E0B]"
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {selectedCv === customCvName && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
                      )}
                    </div>
                  </div>
                )}

                {/* Upload New CV Box */}
                <label className="border border-dashed border-slate-300 dark:border-slate-600 hover:border-[#F59E0B] dark:hover:border-[#F59E0B] rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer transition-colors bg-slate-50/80 dark:bg-slate-800/40">
                  <UploadCloud className="w-6 h-6 text-[#0A2540] dark:text-[#F59E0B]" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Upload a different CV / Resume
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    PDF, DOCX up to 5MB
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-900 dark:text-white">
                  2. Cover Letter
                </label>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Personalize for {job.companyName}
                </span>
              </div>
              <textarea
                rows={5}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#0A2540] dark:focus:border-[#F59E0B] focus:bg-white dark:focus:bg-[#101E33] text-xs text-slate-900 dark:text-white outline-none leading-relaxed"
                placeholder="Explain why you are the best candidate for this opening..."
              />
            </div>

            {/* Screening Question */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                3. Employer Screening Question: Availability / Notice Period
              </label>
              <input
                type="text"
                value={availabilityAnswer}
                onChange={(e) => setAvailabilityAnswer(e.target.value)}
                placeholder="e.g. Immediate or 15 days notice"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none focus:border-[#F59E0B]"
              />
            </div>

            {/* Next Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white dark:text-[#0A2540] bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] shadow-md shadow-[#0A2540]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Review Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Review & Submit */
          <div className="p-6 space-y-5">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Candidate Information
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={seeker.avatar}
                  alt={seeker.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0A2540] dark:border-[#F59E0B]"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {seeker.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{seeker.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                  <Mail className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                  <span className="truncate">{seeker.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                  <Phone className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                  <span>{seeker.phone}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Selected Attachment
              </h3>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-900 dark:text-white">
                <FileText className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                <span>{selectedCv}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Cover Letter Preview
              </h3>
              <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto">
                {coverLetter}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 px-4 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {t(lang, "backBtn")}
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-2/3 py-3 px-4 rounded-xl font-bold text-sm text-white dark:text-[#0A2540] bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] shadow-md shadow-[#0A2540]/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t(lang, "submitApplication")}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
