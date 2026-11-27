"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  Edit3,
  CheckCircle2,
  Users,
  Calendar,
  Sparkles,
  FileText,
  Upload,
  UserPlus,
  Trash2,
  CreditCard,
  Lock,
  X,
  Check,
  ExternalLink,
} from "lucide-react";

interface HRTeamMember {
  id: string;
  name: string;
  email: string;
  title: string;
  role: "Company Admin" | "Recruiter" | "Interviewer";
  avatar: string;
  status: "Active" | "Invited";
}

export default function CompanyProfileView() {
  const { company, setCompany, showToast, setTab, lang } = useApp();

  const [activeTab, setActiveTab] = useState<"overview" | "kyc" | "team">("overview");
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [name, setName] = useState(company.name);
  const [industry, setIndustry] = useState(company.industry);
  const [description, setDescription] = useState(company.description);
  const [location, setLocation] = useState(company.location);
  const [website, setWebsite] = useState(company.website);
  const [email, setEmail] = useState(company.email);
  const [phone, setPhone] = useState(company.phone);
  const [employeeCount, setEmployeeCount] = useState(company.employeeCount);

  // KYC state
  const [tinNumber, setTinNumber] = useState("0078945612");
  const [commercialRegNumber, setCommercialRegNumber] = useState("AA/BOL/109/2016");
  const [licenseType, setLicenseType] = useState("Grade 1 Hospitality, Commercial & Service Enterprise");

  // Team members state
  const [teamMembers, setTeamMembers] = useState<HRTeamMember[]>([
    {
      id: "tm-1",
      name: "Selamawit Tadesse",
      email: "selam.tadesse@skylighthotel.et",
      title: "Head of Talent Acquisition",
      role: "Company Admin",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      status: "Active",
    },
    {
      id: "tm-2",
      name: "Yared Haile",
      email: "yared.h@skylighthotel.et",
      title: "Senior Technical Recruiter",
      role: "Recruiter",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      status: "Active",
    },
    {
      id: "tm-3",
      name: "Hana Alemu",
      email: "hana.a@skylighthotel.et",
      title: "People Operations Specialist",
      role: "Interviewer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      status: "Active",
    },
  ]);

  // Invite modal state
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteTitle, setInviteTitle] = useState("");
  const [inviteRole, setInviteRole] = useState<"Company Admin" | "Recruiter" | "Interviewer">("Recruiter");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCompany({
      ...company,
      name,
      industry,
      description,
      location,
      website,
      email,
      phone,
      employeeCount,
    });
    setIsEditing(false);
    showToast("Company profile updated successfully!", "success");
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) {
      showToast("Please enter the team member's full name and email.", "error");
      return;
    }

    const newMember: HRTeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      title: inviteTitle.trim() || "Recruiter",
      role: inviteRole,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(inviteName)}&background=0A2540&color=F59E0B`,
      status: "Invited",
    };

    setTeamMembers((prev) => [...prev, newMember]);
    showToast(`Invitation sent to ${inviteEmail} as ${inviteRole}!`, "success");
    setIsInviteOpen(false);
    setInviteName("");
    setInviteEmail("");
    setInviteTitle("");
  };

  const handleRemoveMember = (id: string, memberName: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    showToast(`Removed ${memberName} from company workspace.`, "info");
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] shadow-xs">
        <div className="h-44 w-full bg-gradient-to-r from-[#0A2540] to-[#F59E0B] relative">
          <img
            src={company.bannerUrl}
            alt="Office"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>

        <div className="px-6 sm:px-8 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <img
              src={company.logo}
              alt={company.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-[#101E33] shadow-md bg-white dark:bg-[#101E33]"
            />
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {company.name}
                </h1>
                {company.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    {t(lang, "verifiedEmployer")}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#0A2540] dark:text-[#F59E0B]">
                {company.industry} • {company.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
              <span>{isEditing ? t(lang, "cancel") : t(lang, "edit")}</span>
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="px-6 sm:px-8 flex border-t border-slate-100 dark:border-slate-800 overflow-x-auto gap-4">
          {[
            { id: "overview" as const, label: t(lang, "companyProfileTitle"), icon: Building2 },
            { id: "kyc" as const, label: t(lang, "enterpriseKyc"), icon: ShieldCheck },
            { id: "team" as const, label: `${t(lang, "hrTeam")} (${teamMembers.length})`, icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`py-3.5 text-xs font-bold whitespace-nowrap flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                activeTab === item.id
                  ? "border-[#F59E0B] text-[#0A2540] dark:text-[#F59E0B]"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {isEditing ? (
        /* Edit Form */
        <form
          onSubmit={handleSave}
          className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5"
        >
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Edit Organization Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Industry Sector
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Company Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Location (Addis Ababa, Ethiopia)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Recruitment Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Contact Phone (+251)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : activeTab === "overview" ? (
        /* Tab 1: Organization Overview */
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">About {company.name}</h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {company.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Location</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate block mt-0.5">
                  {company.location}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Team Size</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">
                  {company.employeeCount}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Founded</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">
                  Year {company.foundedYear}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Active Jobs</span>
                <span className="text-xs font-bold text-[#0A2540] dark:text-[#F59E0B] block mt-0.5">
                  {company.activeJobsCount} Openings
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white dark:bg-[#101E33] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Contact &amp; Public Inquiries
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-slate-800 dark:text-slate-200">
                <Globe className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline font-semibold truncate"
                >
                  {company.website}
                </a>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-slate-800 dark:text-slate-200">
                <Mail className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                <span className="font-semibold truncate">{company.email}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-slate-800 dark:text-slate-200">
                <Phone className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                <span className="font-semibold">{company.phone}</span>
              </div>
            </div>
          </div>

          {/* Subscription Banner */}
          <div className="bg-gradient-to-br from-[#0A2540] to-[#101E33] text-white p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE PLAN: VIP ENTERPRISE
              </span>
              <h3 className="text-base font-extrabold mt-1">Recruitment Subscription &amp; Birr Gateways</h3>
              <p className="text-xs text-slate-300 max-w-md">
                Unlimited job circulars, verified employer badge, and direct Telegram broadcasting enabled via Telebirr &amp; CBE.
              </p>
            </div>
            <button
              onClick={() => setTab("billing")}
              className="px-5 py-2.5 rounded-xl bg-[#F59E0B] text-[#0A2540] text-xs font-bold hover:bg-[#D97706] transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-md"
            >
              Manage Billing &amp; Invoices
            </button>
          </div>
        </div>
      ) : activeTab === "kyc" ? (
        /* Tab 2: Business KYC & TIN Verification */
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase">
                    Verified Enterprise
                  </span>
                  <span className="text-xs text-slate-400 font-bold">• Ministry of Trade &amp; Industry (Ethiopia)</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                  Commercial Registration &amp; Tax Clearance
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Verified Ethiopian corporate identity ensures your job postings rank with priority and display official verified trust badges.
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-7 h-7" />
              </div>
            </div>

            {/* Official Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Tax Identification Number (TIN)
                </span>
                <p className="text-sm font-black font-mono text-slate-900 dark:text-white">{tinNumber}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <Check className="w-3 h-3" /> ERCA Verified
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Principal Reg. Number
                </span>
                <p className="text-sm font-black font-mono text-slate-900 dark:text-white">{commercialRegNumber}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <Check className="w-3 h-3" /> Ministry Approved
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  License Classification
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{licenseType}</p>
                <span className="text-[10px] text-slate-400 font-semibold">Renewed 2026/27</span>
              </div>
            </div>

            {/* Uploaded Certificate Card */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Uploaded Legal Documents:
              </h4>

              <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#101E33] rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4FA] dark:bg-slate-800 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center font-bold text-xs shrink-0">
                    PDF
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Skylight_Hotel_Commercial_Registration_Certificate_2026.pdf
                    </p>
                    <p className="text-[11px] text-slate-400">1.8 MB • Verified by Azmera Platform Admin</p>
                  </div>
                </div>

                <button
                  onClick={() => showToast("Downloading verified commercial registration certificate...", "info")}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Download
                </button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Need to update your corporate legal credentials?
                </span>
                <button
                  onClick={() => showToast("Document re-submission request dispatched to Admin queue.", "info")}
                  className="text-xs font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline cursor-pointer"
                >
                  Request Document Update
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Tab 3: HR Team & Recruiter Permissions */
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#EEF4FA] dark:bg-slate-800 text-[#0A2540] dark:text-[#F59E0B] text-[10px] font-black uppercase">
                    Role-Based Access Control
                  </span>
                  <span className="text-xs text-slate-400 font-bold">• Multi-Recruiter Organization</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                  HR Team Members &amp; Permissions
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Invite your recruitment colleagues, assign hiring manager roles, and collaborate on applicant pipelines.
                </p>
              </div>

              <button
                onClick={() => setIsInviteOpen(true)}
                className="px-4 py-2.5 bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto hover:scale-[1.02]"
              >
                <UserPlus className="w-4 h-4" />
                <span>Invite Team Member</span>
              </button>
            </div>

            {/* Team Members List */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {teamMembers.map((member) => (
                <div key={member.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                          {member.name}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                            member.role === "Company Admin"
                              ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540]"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {member.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{member.title} • {member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#F59E0B] bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                      {member.status}
                    </span>
                    {member.role !== "Company Admin" && (
                      <button
                        onClick={() => handleRemoveMember(member.id, member.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                        title="Remove member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Role Permissions Reference */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Permission Levels Guide:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Company Admin:</strong>
                  Full control over job posts, recruiter invitations, legal KYC, and Telebirr/CBE billing.
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Recruiter:</strong>
                  Can post vacancies, review CVs, move applicants along Kanban, and direct message candidates.
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white block font-bold">Interviewer:</strong>
                  View-only access to shortlisted candidates and scheduled interview calendar.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── INVITE TEAM MEMBER MODAL ── */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0A2540]/10 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Invite HR Team Member
                  </h3>
                  <p className="text-[11px] text-slate-500">{company.name} Workspace</p>
                </div>
              </div>
              <button
                onClick={() => setIsInviteOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Almaz Bekele"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email:
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. almaz@skylighthotel.et"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Job Title:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Talent Acquisition Partner"
                  value={inviteTitle}
                  onChange={(e) => setInviteTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Permission Role:
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  <option value="Recruiter">Recruiter (Post jobs &amp; manage pipeline)</option>
                  <option value="Interviewer">Interviewer (Assess candidates &amp; interviews)</option>
                  <option value="Company Admin">Company Admin (Full permissions &amp; billing)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] dark:text-[#0A2540] rounded-xl shadow-xs cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
