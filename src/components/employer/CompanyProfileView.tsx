"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
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
} from "lucide-react";

export default function CompanyProfileView() {
  const { company, setCompany, showToast, setTab } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(company.name);
  const [industry, setIndustry] = useState(company.industry);
  const [description, setDescription] = useState(company.description);
  const [location, setLocation] = useState(company.location);
  const [website, setWebsite] = useState(company.website);
  const [email, setEmail] = useState(company.email);
  const [phone, setPhone] = useState(company.phone);
  const [employeeCount, setEmployeeCount] = useState(company.employeeCount);

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
    showToast("Company profile updated successfully!");
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E2E8F0] bg-white shadow-xs">
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
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
            />
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A1C2E]">
                  {company.name}
                </h1>
                {company.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A2540] dark:text-[#38BDF8] bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Employer
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-[#0A2540]">{company.industry}</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0A1C2E] flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#0A2540]" />
            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
          </button>
        </div>
      </div>

      {isEditing ? (
        /* Edit Form */
        <form
          onSubmit={handleSave}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-5"
        >
          <h2 className="text-sm font-extrabold text-[#0A1C2E] uppercase tracking-wider">
            Edit Organization Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0A1C2E] mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A1C2E] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A1C2E] mb-1">
                Industry Sector
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A1C2E] outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#0A1C2E] mb-1">
                Company Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A1C2E] outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A1C2E] mb-1">
                Location (Addis Ababa, Ethiopia)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A1C2E] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A1C2E] mb-1">
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A1C2E] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A1C2E] mb-1">
                Recruitment Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A1C2E] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A1C2E] mb-1">
                Contact Phone (+251)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A1C2E] outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#64748B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0A2540] hover:bg-[#071A2E] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        /* View Card */
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-4">
            <h2 className="text-base font-extrabold text-[#0A1C2E]">About {company.name}</h2>
            <p className="text-xs sm:text-sm text-[#0A1C2E] leading-relaxed">
              {company.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E2E8F0]">
              <div className="p-3 bg-[#F8FAFC] rounded-2xl">
                <span className="text-[10px] text-[#64748B] block font-medium">Location</span>
                <span className="text-xs font-bold text-[#0A1C2E] truncate block mt-0.5">
                  {company.location}
                </span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-2xl">
                <span className="text-[10px] text-[#64748B] block font-medium">Team Size</span>
                <span className="text-xs font-bold text-[#0A1C2E] block mt-0.5">
                  {company.employeeCount}
                </span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-2xl">
                <span className="text-[10px] text-[#64748B] block font-medium">Founded</span>
                <span className="text-xs font-bold text-[#0A1C2E] block mt-0.5">
                  Year {company.foundedYear}
                </span>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-2xl">
                <span className="text-[10px] text-[#64748B] block font-medium">Active Jobs</span>
                <span className="text-xs font-bold text-[#0A2540] block mt-0.5">
                  {company.activeJobsCount} Openings
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs space-y-3">
            <h3 className="font-extrabold text-sm text-[#0A1C2E]">
              Contact & Public Verification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 p-3 bg-[#F8FAFC] rounded-xl text-[#0A1C2E]">
                <Globe className="w-4 h-4 text-[#0A2540]" />
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline font-semibold truncate"
                >
                  {company.website}
                </a>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#F8FAFC] rounded-xl text-[#0A1C2E]">
                <Mail className="w-4 h-4 text-[#0A2540]" />
                <span className="font-semibold truncate">{company.email}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#F8FAFC] rounded-xl text-[#0A1C2E]">
                <Phone className="w-4 h-4 text-[#0A2540]" />
                <span className="font-semibold">{company.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
