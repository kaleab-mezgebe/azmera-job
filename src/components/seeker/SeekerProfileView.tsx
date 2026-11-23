"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  UploadCloud,
  FileText,
  Plus,
  CheckCircle2,
  Edit3,
  Download,
  Trash2,
  Sparkles,
} from "lucide-react";

export default function SeekerProfileView() {
  const { seeker, setSeeker, showToast } = useApp();

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(seeker.bio);
  const [newSkill, setNewSkill] = useState("");

  const handleSaveBio = () => {
    setSeeker({ ...seeker, bio: bioText });
    setIsEditingBio(false);
    showToast("Profile bio updated!");
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !seeker.skills.includes(newSkill.trim())) {
      setSeeker({ ...seeker, skills: [...seeker.skills, newSkill.trim()] });
      setNewSkill("");
      showToast("Skill added!");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSeeker({
      ...seeker,
      skills: seeker.skills.filter((s) => s !== skillToRemove),
    });
    showToast("Skill removed");
  };

  const handleCvReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSeeker({
        ...seeker,
        cvFileName: file.name,
        cvFileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        profileCompletion: Math.min(100, seeker.profileCompletion + 5),
      });
      showToast("CV updated successfully!");
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={seeker.avatar}
                alt={seeker.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#0A2540] shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#0A2540] border-2 border-white flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-[#0A1C2E]">
                {seeker.name}
              </h1>
              <p className="text-sm font-semibold text-[#0A2540]">{seeker.title}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#64748B] pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0A2540]" />
                  {seeker.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#0A2540]" />
                  {seeker.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#0A2540]" />
                  {seeker.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Strength Widget */}
          <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] text-center sm:text-right shrink-0">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
              Profile Completeness
            </span>
            <div className="text-2xl font-extrabold text-[#0A2540] my-0.5">
              {seeker.profileCompletion}%
            </div>
            <div className="w-36 h-2 bg-[#E2E8F0] rounded-full mx-auto sm:ml-auto overflow-hidden">
              <div
                className="h-full bg-[#0A2540] rounded-full"
                style={{ width: `${seeker.profileCompletion}%` }}
              />
            </div>
            <span className="text-[10px] text-[#0A2540] font-semibold mt-1 block">
              Visible to top recruiters
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Bio, Experience, Education */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Me */}
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-[#0A1C2E]">About Me</h2>
              <button
                onClick={() => setIsEditingBio(!isEditingBio)}
                className="text-xs font-bold text-[#0A2540] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingBio ? "Cancel" : "Edit Bio"}</span>
              </button>
            </div>

            {isEditingBio ? (
              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] focus:border-[#0A2540] text-xs text-[#0A1C2E] outline-none leading-relaxed"
                />
                <button
                  onClick={handleSaveBio}
                  className="px-4 py-2 bg-[#0A2540] text-white text-xs font-bold rounded-xl"
                >
                  Save Bio
                </button>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-[#0A1C2E] leading-relaxed">
                {seeker.bio}
              </p>
            )}
          </div>

          {/* Work Experience */}
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#0A2540]" />
                <h2 className="text-base font-extrabold text-[#0A1C2E]">
                  Work Experience ({seeker.experienceYears} Years)
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {seeker.workHistory.map((work, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {work.role}
                    </h3>
                    <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md">
                      {work.duration}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{work.company}</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                    {work.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Education & Credentials
              </h2>
            </div>

            <div className="space-y-3">
              {seeker.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Class of {edu.graduationYear}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#0A2540] dark:text-[#38BDF8]">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{edu.field}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: CV & Skills */}
        <div className="space-y-6">
          {/* CV Card */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Curriculum Vitae (CV)
            </h2>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A2540] text-white flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                    {seeker.cvFileName}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    PDF • {seeker.cvFileSize}
                  </span>
                </div>
              </div>

              <button
                onClick={() => showToast("Downloading CV document...")}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 text-[#0A2540] dark:text-white hover:bg-[#0A2540] hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                title="Download CV"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Replace CV */}
            <label className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 hover:border-[#F59E0B] text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
              <UploadCloud className="w-4 h-4 text-[#F59E0B]" />
              <span>Upload Updated CV (PDF)</span>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleCvReplace}
                className="hidden"
              />
            </label>
          </div>

          {/* Skills Management */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Skills & Proficiencies
            </h2>

            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. Flutter, Docker)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#0A2540] hover:bg-[#07192C] text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#F59E0B]" />
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-1">
              {seeker.skills.map((skill) => (
                <span
                  key={skill}
                  className="group px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-red-500 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
