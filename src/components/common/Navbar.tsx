"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t, LangCode } from "@/lib/i18n";
import {
  Briefcase,
  Bell,
  Globe2,
  User,
  Building2,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  PlusCircle,
  Sun,
  Moon,
  Zap,
} from "lucide-react";

export default function Navbar() {
  const {
    role,
    setRole,
    tab,
    setTab,
    lang,
    setLang,
    theme,
    toggleTheme,
    seeker,
    company,
    unreadCount,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    savedJobIds,
    applications,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const activeAppsCount = applications.filter(
    (a) => a.status !== "Rejected" && a.status !== "Accepted"
  ).length;

  const languages: { code: LangCode; label: string; native: string }[] = [
    { code: "en", label: "English", native: "EN" },
    { code: "am", label: "Amharic", native: "አማርኛ" },
    { code: "om", label: "Afaan Oromo", native: "Oromoo" },
    { code: "ti", label: "Tigrigna", native: "ትግርኛ" },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070F1A]/95 shadow-2xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => {
                if (role === "guest") setTab("landing");
                else if (role === "seeker") setTab("dashboard");
                else setTab("employer-dashboard");
              }}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden border-2 border-[#F59E0B] shadow-md shadow-[#0A2540]/15 group-hover:scale-105 transition-transform bg-white shrink-0">
                <img
                  src="/azmera-logo.png"
                  alt="Azmera Jobs Logo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                    Azmera<span className="text-[#F59E0B]">Jobs</span>
                  </span>
                  <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-[#0A2540]/10 text-[#0A2540] dark:bg-[#F59E0B]/20 dark:text-[#FBBF24] border border-[#0A2540]/15 dark:border-[#F59E0B]/30">
                    ETHIOPIA
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-[#F59E0B] -mt-0.5 hidden sm:block tracking-wide">
                  YOUR TRUSTED PARTNER IN JOBS
                </p>
              </div>
            </button>

            {/* Center Nav Links - Authentic Production Header */}
            {role === "guest" && (
              <nav className="hidden md:flex items-center gap-6">
                {[
                  { label: "Home", id: "landing" },
                  { label: "Browse Jobs", id: "search" },
                  { label: "For Employers", id: "role-selection" },
                  { label: "How It Works", id: "role-selection" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setTab(item.id)}
                    className={`text-sm font-semibold transition-colors cursor-pointer ${
                      tab === item.id
                        ? "text-[#0A2540] dark:text-[#F59E0B]"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}

            {role === "seeker" && (
              <nav className="hidden md:flex items-center gap-6">
                {[
                  { label: "Dashboard", id: "dashboard" },
                  { label: "Explore Jobs", id: "search" },
                  {
                    label: "Applications",
                    id: "applications",
                    badge: activeAppsCount > 0 ? activeAppsCount : undefined,
                  },
                  {
                    label: "Saved Jobs",
                    id: "saved",
                    badge: savedJobIds.length > 0 ? savedJobIds.length : undefined,
                  },
                  { label: "My Profile", id: "profile" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setTab(item.id)}
                    className={`text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                      tab === item.id
                        ? "text-[#0A2540] dark:text-[#F59E0B]"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="px-1.5 py-0.2 text-[10px] font-black rounded-full bg-[#F59E0B] text-[#0A2540]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            )}

            {role === "employer" && (
              <nav className="hidden md:flex items-center gap-6">
                {[
                  { label: "Overview", id: "employer-dashboard" },
                  { label: "Manage Jobs", id: "manage-jobs" },
                  { label: "Applicants", id: "applicants" },
                  { label: "Interviews", id: "interviews" },
                  { label: "Company Profile", id: "company-profile" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setTab(item.id)}
                    className={`text-sm font-semibold transition-colors cursor-pointer ${
                      tab === item.id
                        ? "text-[#0A2540] dark:text-[#F59E0B]"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-slate-700 dark:text-slate-200 hover:border-[#F59E0B] transition-colors cursor-pointer"
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-[#0A2540]" />
                ) : (
                  <Sun className="w-4 h-4 text-[#F59E0B]" />
                )}
              </button>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => {
                    setLangOpen(!langOpen);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-[#F59E0B] transition-colors cursor-pointer"
                  title="Switch Language"
                >
                  <Globe2 className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                  <span>{languages.find((l) => l.code === lang)?.native}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {langOpen && (
                  <div
                    className="absolute right-0 mt-2 w-44 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] py-1.5 z-50 overflow-hidden"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 text-slate-400">
                      Language / ቋንቋ
                    </div>
                    {languages.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          lang === item.code
                            ? "bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 text-[#0A2540] dark:text-[#F59E0B] font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                          {item.native}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    setLangOpen(false);
                  }}
                  className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-slate-700 dark:text-slate-200 hover:border-[#F59E0B] transition-colors cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F59E0B] text-[#0A2540] text-[10px] font-black flex items-center justify-center shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div
                    className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{unreadCount} unread</p>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-xs font-semibold text-[#0A2540] dark:text-[#F59E0B] hover:underline cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-500">No notifications yet.</div>
                      ) : (
                        notifications.slice(0, 5).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-3.5 cursor-pointer transition-colors ${
                              !n.read
                                ? "bg-amber-50/50 dark:bg-amber-950/20"
                                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">
                                {n.title}
                              </span>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">
                                {n.timestamp}
                              </span>
                            </div>
                            <p className="text-xs mt-1 text-slate-600 dark:text-slate-400 line-clamp-2">
                              {n.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Auth / User CTA */}
              {role === "guest" ? (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => setTab("signin")}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {t(lang, "signIn")}
                  </button>
                  <button
                    onClick={() => setTab("role-selection")}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#071A2E] rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>{t(lang, "getStarted")}</span>
                  </button>
                </div>
              ) : role === "seeker" ? (
                <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setTab("profile")}
                    className="flex items-center gap-2 p-1 rounded-xl transition-colors text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    <img
                      src={seeker.avatar}
                      alt={seeker.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#F59E0B]"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {seeker.name}
                      </p>
                      <p className="text-[10px] font-semibold text-[#F59E0B]">
                        Job Seeker
                      </p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setTab("post-job")}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#071A2E] rounded-xl shadow-xs cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>{t(lang, "postJob")}</span>
                  </button>
                  <button
                    onClick={() => setTab("company-profile")}
                    className="flex items-center gap-2 p-1 rounded-xl transition-colors text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div className="hidden md:block">
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[100px]">
                        {company.name}
                      </p>
                      <p className="text-[10px] font-semibold text-[#0A2540] dark:text-[#38BDF8]">
                        Employer
                      </p>
                    </div>
                  </button>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] text-slate-700 dark:text-slate-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070F1A] px-4 pt-3 pb-6 space-y-4">
            {/* Quick Switch View inside mobile drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500">Switch Persona:</span>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                {[
                  { role: "guest" as const, label: "Visitor" },
                  { role: "seeker" as const, label: "Seeker" },
                  { role: "employer" as const, label: "Employer" },
                ].map((m) => (
                  <button
                    key={m.role}
                    onClick={() => {
                      setRole(m.role);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      role === m.role
                        ? "bg-[#0A2540] text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nav links per role */}
            {role === "guest" && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "landing", label: "Home" },
                  { id: "search", label: "Browse Jobs" },
                  { id: "role-selection", label: "Create Account" },
                  { id: "signin", label: "Sign In" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="p-2.5 text-xs text-left font-bold rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {role === "seeker" && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "dashboard", label: "Dashboard" },
                  { id: "search", label: "Explore Jobs" },
                  { id: "applications", label: `Applications (${activeAppsCount})` },
                  { id: "saved", label: `Saved Jobs (${savedJobIds.length})` },
                  { id: "profile", label: "My Profile" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 text-xs text-left font-bold rounded-xl transition-colors ${
                      item.id === "profile" ? "col-span-2" : ""
                    } ${
                      tab === item.id
                        ? "bg-[#0A2540] text-white"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {role === "employer" && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "employer-dashboard", label: "Overview" },
                  { id: "post-job", label: "+ Post Vacancy" },
                  { id: "manage-jobs", label: "Manage Jobs" },
                  { id: "applicants", label: "Applicants" },
                  { id: "interviews", label: "Interviews" },
                  { id: "company-profile", label: "Company Profile" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 text-xs text-left font-bold rounded-xl transition-colors ${
                      tab === item.id
                        ? "bg-[#0A2540] text-white"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Floating Interactive Persona Switcher for Client Demo / Review */}
      <aside aria-label="Demo Persona Switcher" className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-[#0A2540]/95 backdrop-blur-md border border-[#F59E0B]/40 shadow-2xl text-white">
        <div className="flex items-center gap-1 pl-2.5 pr-1.5 text-[11px] font-black text-[#F59E0B] tracking-wider uppercase hidden sm:flex">
          <Zap className="w-3.5 h-3.5" />
          <span>Demo Persona:</span>
        </div>

        {[
          { role: "guest" as const, label: "Visitor", icon: <Globe2 className="w-3 h-3" /> },
          { role: "seeker" as const, label: "Job Seeker", icon: <User className="w-3 h-3" /> },
          { role: "employer" as const, label: "Employer", icon: <Building2 className="w-3 h-3" /> },
        ].map((m) => (
          <button
            key={m.role}
            onClick={() => setRole(m.role)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              role === m.role
                ? "bg-[#F59E0B] text-[#0A2540] shadow-md scale-105"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {m.icon}
            <span>{m.label}</span>
          </button>
        ))}
      </aside>
    </>
  );
}
