"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Job } from "@/types";
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
} from "lucide-react";

interface ApplyJobModalProps {
  job: Job;
  onClose: () => void;
}

export default function ApplyJobModal({ job, onClose }: ApplyJobModalProps) {
  const { seeker, applyToJob, showToast } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCv, setSelectedCv] = useState<string>(seeker.cvFileName);
  const [customCvName, setCustomCvName] = useState<string | null>(null);
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
      const ok = applyToJob(job.id, coverLetter, selectedCv);
      setIsSubmitting(false);
      if (ok) {
        onClose();
      }
    }, 600);
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
              Apply to {job.title}
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
            {/* CV Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                1. Select or Upload Curriculum Vitae (CV)
              </label>

              <div className="space-y-2">
                {/* Default CV */}
                <div
                  onClick={() => setSelectedCv(seeker.cvFileName)}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    selectedCv === seeker.cvFileName
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
                        {seeker.cvFileName}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Verified Profile CV • {seeker.cvFileSize}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedCv === seeker.cvFileName
                        ? "border-[#F59E0B] bg-[#F59E0B]"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {selectedCv === seeker.cvFileName && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A2540]" />
                    )}
                  </div>
                </div>

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
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0A1C2E]">
                          {customCvName}
                        </h4>
                        <p className="text-[11px] text-[#64748B]">
                          Newly uploaded PDF document
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedCv === customCvName
                          ? "border-[#0A2540] bg-[#0A2540]"
                          : "border-[#D0DBD4]"
                      }`}
                    >
                      {selectedCv === customCvName && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                )}

                {/* Upload New CV Box */}
                <label className="border border-dashed border-[#D0DBD4] hover:border-[#0A2540] rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer transition-colors bg-[#F8FAFC]/60">
                  <UploadCloud className="w-6 h-6 text-[#0A2540]" />
                  <span className="text-xs font-bold text-[#0A1C2E]">
                    Upload a different CV / Resume
                  </span>
                  <span className="text-[10px] text-[#64748B]">
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
                <label className="text-xs font-bold text-[#0A1C2E]">
                  2. Cover Letter
                </label>
                <span className="text-[11px] text-[#64748B]">
                  Personalize for {job.companyName}
                </span>
              </div>
              <textarea
                rows={5}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] focus:border-[#0A2540] focus:bg-white text-xs text-[#0A1C2E] outline-none leading-relaxed"
                placeholder="Explain why you are the best candidate for this opening..."
              />
            </div>

            {/* Next Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#0A2540] hover:bg-[#071A2E] shadow-md shadow-[#0A2540]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Review Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Review & Submit */
          <div className="p-6 space-y-5">
            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-3">
              <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Candidate Information
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={seeker.avatar}
                  alt={seeker.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#0A2540]"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-[#0A1C2E]">
                    {seeker.name}
                  </h4>
                  <p className="text-xs text-[#64748B]">{seeker.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-1.5 text-[#0A1C2E]">
                  <Mail className="w-3.5 h-3.5 text-[#0A2540]" />
                  <span className="truncate">{seeker.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#0A1C2E]">
                  <Phone className="w-3.5 h-3.5 text-[#0A2540]" />
                  <span>{seeker.phone}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-2">
              <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Selected Attachment
              </h3>
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#0A1C2E]">
                <FileText className="w-4 h-4 text-[#0A2540]" />
                <span>{selectedCv}</span>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-2">
              <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Cover Letter Preview
              </h3>
              <p className="text-xs text-[#0A1C2E] whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto">
                {coverLetter}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 px-4 rounded-xl font-bold text-xs text-[#0A1C2E] bg-[#F8FAFC] hover:bg-[#E2E8F0] transition-colors"
              >
                Back
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="w-2/3 py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#0A2540] hover:bg-[#071A2E] shadow-md shadow-[#0A2540]/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Submit</span>
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
