"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
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
  const { seeker, setSeeker, showToast, logout, lang } = useApp();

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(seeker.bio);
  const [newSkill, setNewSkill] = useState("");
  const [desiredRole, setDesiredRole] = useState(seeker.preferences?.desiredRole || "Senior Full Stack Engineer");
  const [desiredSalary, setDesiredSalary] = useState(seeker.preferences?.minSalary || 45000);
  const [cvBuilderOpen, setCvBuilderOpen] = useState(false);
  const [langList, setLangList] = useState([
    { lang: "Amharic", level: "Native / Mother Tongue", badge: "Native" },
    { lang: "English", level: "Professional Working Proficiency", badge: "Fluent" },
    { lang: "Tigrigna", level: "Conversational Proficiency", badge: "Conversational" },
    { lang: "Afaan Oromo", level: "Basic Working Knowledge", badge: "Basic" },
  ]);
  const [newLang, setNewLang] = useState("");

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

  const handleCvReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        showToast("CV file must be 5 MB or smaller.", "error");
        return;
      }
      const dataBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
        reader.onerror = () => reject(new Error("Read failed"));
        reader.readAsDataURL(file);
      }).catch(() => "");

      if (!dataBase64) {
        showToast("Could not read CV file.", "error");
        return;
      }

      try {
        const res = await fetch("/api/uploads", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            mimeType: file.type || "application/pdf",
            dataBase64,
          }),
        });
        const data = (await res.json()) as {
          ok?: boolean;
          error?: string;
          file?: {
            originalName?: string;
            sizeLabel?: string;
            url?: string;
          };
        };
        if (!res.ok || !data?.ok || !data.file) {
          showToast(data?.error || "CV upload failed. Please sign in and retry.", "error");
          return;
        }
        const sizeStr = data.file.sizeLabel || `${Math.max(0.2, file.size / (1024 * 1024)).toFixed(1)} MB`;
        const newEntry = {
          id: `cv-${Date.now()}`,
          name: file.name,
          size: sizeStr,
          updatedAt: "Just now",
          url: data.file.url,
        };
        const existing =
          seeker.cvList || [{ id: "cv-1", name: seeker.cvFileName, size: seeker.cvFileSize, updatedAt: "Nov 2026" }];
        setSeeker({
          ...seeker,
          cvFileName: file.name,
          cvFileSize: sizeStr,
          cvList: [newEntry, ...existing],
          profileCompletion: Math.min(100, seeker.profileCompletion + 5),
        });
        showToast("CV uploaded securely to Azmera storage!");
      } catch {
        showToast("Network error uploading CV.", "error");
      }
    }
  };

  const handleSelectPrimaryCv = (cv: { name: string; size: string }) => {
    setSeeker({ ...seeker, cvFileName: cv.name, cvFileSize: cv.size });
    showToast(`Primary CV set to ${cv.name}`);
  };

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLang.trim()) return;
    setLangList((prev) => [...prev, { lang: newLang.trim(), level: "Working Proficiency", badge: "Added" }]);
    setNewLang("");
    showToast("Language added to profile!");
  };

  const handleSavePreferences = () => {
    setSeeker({
      ...seeker,
      preferences: {
        desiredRole,
        minSalary: Number(desiredSalary),
        preferredLocation: seeker.location,
      },
    });
    showToast("Job preferences saved!", "success");
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={seeker.avatar}
                alt={seeker.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#0A2540] dark:border-[#F59E0B] shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#0A2540] dark:bg-[#F59E0B] border-2 border-white dark:border-[#101E33] flex items-center justify-center text-white dark:text-[#0A2540] text-[10px] font-black">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {seeker.name}
              </h1>
              <p className="text-sm font-semibold text-[#0A2540] dark:text-[#F59E0B]">{seeker.title}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                  {seeker.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                  {seeker.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                  {seeker.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Strength Widget */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center sm:text-right shrink-0">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Profile Completeness
            </span>
            <div className="text-2xl font-extrabold text-[#0A2540] dark:text-[#F59E0B] my-0.5">
              {seeker.profileCompletion}%
            </div>
            <div className="w-36 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto sm:ml-auto overflow-hidden">
              <div
                className="h-full bg-[#0A2540] dark:bg-[#F59E0B] rounded-full"
                style={{ width: `${seeker.profileCompletion}%` }}
              />
            </div>
            <span className="text-[10px] text-[#0A2540] dark:text-[#FBBF24] font-semibold mt-1 block">
              Visible to top recruiters
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Bio, Experience, Education */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Me */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{t(lang, "aboutMe")}</h2>
              <button
                onClick={() => setIsEditingBio(!isEditingBio)}
                className="text-xs font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingBio ? t(lang, "cancel") : t(lang, "edit")}</span>
              </button>
            </div>

            {isEditingBio ? (
              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-[#0A2540] dark:focus:border-[#F59E0B] text-xs text-slate-900 dark:text-white outline-none leading-relaxed"
                />
                <button
                  onClick={handleSaveBio}
                  className="px-4 py-2 bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl cursor-pointer"
                >
                  {t(lang, "save")}
                </button>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {seeker.bio}
              </p>
            )}
          </div>

          {/* Work Experience */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {t(lang, "workExperience")} ({seeker.experienceYears})
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {seeker.workHistory.map((work, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5"
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
                {t(lang, "educationCredentials")}
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
          {/* CV Card (Multiple CVs + Printable Builder) */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                {t(lang, "curriculumVitae")}
              </h2>
              <button
                type="button"
                onClick={() => setCvBuilderOpen(true)}
                className="text-[11px] font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t(lang, "printResume")}</span>
              </button>
            </div>

            <div className="space-y-2">
              {(seeker.cvList && seeker.cvList.length > 0
                ? seeker.cvList
                : [{ id: "cv-1", name: seeker.cvFileName, size: seeker.cvFileSize, updatedAt: "Primary" }]
              ).map((cv) => {
                const isPrimary = cv.name === seeker.cvFileName;
                return (
                  <div
                    key={cv.id}
                    onClick={() => handleSelectPrimaryCv(cv)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                      isPrimary
                        ? "bg-amber-50/70 dark:bg-amber-950/30 border-[#F59E0B]"
                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-[#F59E0B]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#0A2540] text-white flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-[#F59E0B]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {cv.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          {isPrimary ? "Primary CV • " : ""}{cv.size} • {cv.updatedAt}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCvBuilderOpen(true);
                      }}
                      className="p-2 rounded-xl bg-white dark:bg-slate-800 text-[#0A2540] dark:text-white hover:bg-[#0A2540] hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
                      title={t(lang, "downloadCV")}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Replace / Add CV */}
            <label className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 hover:border-[#F59E0B] text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
              <UploadCloud className="w-4 h-4 text-[#F59E0B]" />
              <span>{t(lang, "replaceCv")} (PDF)</span>
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
              Skills &amp; Proficiencies
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

          {/* Languages & Dialects */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t(lang, "languagesFluency")}
            </h2>
            <form onSubmit={handleAddLanguage} className="flex gap-2">
              <input
                type="text"
                placeholder="Add language..."
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
              />
              <button type="submit" className="px-3 py-1.5 bg-[#0A2540] text-white rounded-xl text-xs font-bold cursor-pointer">
                <Plus className="w-3.5 h-3.5 text-[#F59E0B]" />
              </button>
            </form>
            <div className="space-y-2">
              {langList.map((l, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{l.lang}</span>
                    <p className="text-[11px] text-slate-400">{l.level}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 text-[#0A2540] dark:text-[#F59E0B]">
                    {l.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Job Preferences */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Job Preferences
            </h2>
            <div className="space-y-2 text-xs">
              <input
                type="text"
                value={desiredRole}
                onChange={(e) => setDesiredRole(e.target.value)}
                placeholder="Desired Role"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={desiredSalary}
                  onChange={(e) => setDesiredSalary(Number(e.target.value))}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
                <span className="text-[11px] font-bold text-slate-500">ETB/mo</span>
              </div>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full py-2 rounded-xl bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] font-bold cursor-pointer"
              >
                {t(lang, "save")}
              </button>
            </div>
          </div>

          {/* Professional Portfolio & Online Presence */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Portfolio &amp; External Links
            </h2>
            <div className="space-y-2 text-xs">
              {[
                { name: "GitHub Portfolio", url: "https://github.com/dawit-bekele", label: "github.com/dawit-bekele" },
                { name: "LinkedIn Profile", url: "https://linkedin.com/in/dawit-bekele", label: "linkedin.com/in/dawit-bekele" },
                { name: "Personal Website", url: "https://dawitbekele.dev", label: "dawitbekele.dev" },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center justify-between hover:border-[#F59E0B] transition-colors group cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white group-hover:text-[#F59E0B] transition-colors">
                      {link.name}
                    </span>
                    <p className="text-[11px] text-slate-400 font-mono">{link.label}</p>
                  </div>
                  <span className="text-slate-400 group-hover:text-[#F59E0B]">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Privacy & Account Controls */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Privacy &amp; {t(lang, "accountSettings")}
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Discoverable in Talent Search
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Allow verified employers to invite you to apply.
                  </span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={(e) => showToast(e.target.checked ? "Discoverable in candidate search" : "Profile set to private")}
                  className="w-4 h-4 accent-[#0A2540] dark:accent-[#F59E0B] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Mask Phone &amp; Email Until Interview
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Employers can only reach you via Azmera in-app messaging.
                  </span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={(e) => showToast(e.target.checked ? "Contact details masked" : "Contact details visible")}
                  className="w-4 h-4 accent-[#0A2540] dark:accent-[#F59E0B] cursor-pointer"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    showToast("Account deactivated. Signed out of session.", "info");
                    logout();
                  }}
                  className="w-full py-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold text-xs cursor-pointer transition-colors"
                >
                  {t(lang, "deactivateAccount")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable PDF CV Builder Modal */}
      {cvBuilderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">{seeker.name} — CV Preview</h3>
                <p className="text-xs text-slate-500">{seeker.title} • {seeker.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    showToast("Opened print / Save as PDF dialog!", "success");
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] text-xs font-bold cursor-pointer"
                >
                  Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={() => setCvBuilderOpen(false)}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <h4 className="font-extrabold text-[#0A2540] dark:text-[#F59E0B] uppercase tracking-wider mb-1">Summary</h4>
                <p className="leading-relaxed">{seeker.bio}</p>
              </div>
              <div>
                <h4 className="font-extrabold text-[#0A2540] dark:text-[#F59E0B] uppercase tracking-wider mb-1">Experience</h4>
                {seeker.workHistory.map((w, i) => (
                  <div key={i} className="mb-2">
                    <div className="font-bold text-slate-900 dark:text-white">{w.role} — {w.company} ({w.duration})</div>
                    <p>{w.description}</p>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-extrabold text-[#0A2540] dark:text-[#F59E0B] uppercase tracking-wider mb-1">Education</h4>
                {seeker.education.map((e, i) => (
                  <div key={i}>{e.degree} in {e.field} — {e.institution} ({e.graduationYear})</div>
                ))}
              </div>
              <div>
                <h4 className="font-extrabold text-[#0A2540] dark:text-[#F59E0B] uppercase tracking-wider mb-1">Skills &amp; Languages</h4>
                <p>{seeker.skills.join(" • ")}</p>
                <p className="mt-1">{langList.map((l) => `${l.lang} (${l.badge})`).join(" • ")}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
