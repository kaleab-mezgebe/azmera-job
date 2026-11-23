"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  User,
  Building2,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { ETHIOPIAN_LOCATIONS } from "@/data/mockData";

export default function RegisterView() {
  const { role, setRole, setTab, showToast } = useApp();

  const [roleType, setRoleType] = useState<"seeker" | "employer">(
    role === "employer" ? "employer" : "seeker"
  );
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+251 9");
  const [location, setLocation] = useState("Addis Ababa (Bole)");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      showToast("Please agree to the Terms of Service.");
      return;
    }
    setRole(roleType);
    setTab(roleType === "employer" ? "employer-dashboard" : "dashboard");
    showToast(
      `Welcome to Azmera Jobs! Account created as ${
        roleType === "seeker" ? fullName || "Job Seeker" : companyName || "Employer"
      }`
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-10 theme-bg">
      <div className="w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-lg" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center mx-auto mb-3 border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Create Azmera Jobs Account
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Connect with Ethiopia's top employers and skilled talent
          </p>
        </div>

        {/* Role Toggle */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
            I want to join as:
          </label>
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setRoleType("seeker")}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                roleType === "seeker"
                  ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Job Seeker</span>
            </button>
            <button
              type="button"
              onClick={() => setRoleType("employer")}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                roleType === "employer"
                  ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Employer / Recruiter</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {roleType === "seeker" ? (
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                Full Name (in English or Amharic)
              </label>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B] focus-within:bg-white dark:focus-within:bg-[#101E33] focus-within:ring-2 focus-within:ring-[#0A2540]/10 dark:focus-within:ring-[#F59E0B]/20 transition-all">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Dawit Bekele"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none shadow-none focus:shadow-none placeholder:text-slate-400"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                Company / Organization Name
              </label>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B] focus-within:bg-white dark:focus-within:bg-[#101E33] focus-within:ring-2 focus-within:ring-[#0A2540]/10 dark:focus-within:ring-[#F59E0B]/20 transition-all">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapa Technologies / Dashen Bank"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none shadow-none focus:shadow-none placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                Email Address
              </label>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B] focus-within:bg-white dark:focus-within:bg-[#101E33] focus-within:ring-2 focus-within:ring-[#0A2540]/10 dark:focus-within:ring-[#F59E0B]/20 transition-all">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none shadow-none focus:shadow-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                Ethiopian Phone
              </label>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B] focus-within:bg-white dark:focus-within:bg-[#101E33] focus-within:ring-2 focus-within:ring-[#0A2540]/10 dark:focus-within:ring-[#F59E0B]/20 transition-all">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="tel"
                  required
                  placeholder="+251 91 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none shadow-none focus:shadow-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
              Primary City / Sub-City
            </label>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B] focus-within:bg-white dark:focus-within:bg-[#101E33] focus-within:ring-2 focus-within:ring-[#0A2540]/10 dark:focus-within:ring-[#F59E0B]/20 transition-all">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none cursor-pointer border-none ring-0 focus:outline-none focus:ring-0"
              >
                {ETHIOPIAN_LOCATIONS.filter((l) => !l.includes("All Locations")).map(
                  (loc) => (
                    <option key={loc} value={loc} className="bg-white dark:bg-[#101E33] text-slate-900 dark:text-white">
                      {loc}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
              Password (min. 8 characters)
            </label>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B] focus-within:bg-white dark:focus-within:bg-[#101E33] focus-within:ring-2 focus-within:ring-[#0A2540]/10 dark:focus-within:ring-[#F59E0B]/20 transition-all">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="password"
                required
                placeholder="Create strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none shadow-none focus:shadow-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-[#0A2540] dark:text-[#F59E0B] focus:ring-[#F59E0B]"
              />
              <span>
                I agree to the Azmera Job{" "}
                <span className="text-[#0A2540] dark:text-[#F59E0B] underline font-bold">Terms of Service</span> and{" "}
                <span className="text-[#0A2540] dark:text-[#F59E0B] underline font-bold">Privacy Policy</span>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-white bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] dark:text-[#0A2540] shadow-md shadow-[#0A2540]/20 dark:shadow-[#F59E0B]/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B] dark:text-[#0A2540]" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-500 dark:text-slate-400">Already have an account? </span>
          <button
            onClick={() => setTab("signin")}
            className="text-xs font-bold text-[#F59E0B] hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
