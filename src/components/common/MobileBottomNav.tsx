"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  LayoutDashboard, Search, FileCheck2, Bookmark, User,
  Briefcase, Users, PlusCircle, Building2, LogIn, Home,
} from "lucide-react";

export default function MobileBottomNav() {
  const { role, tab, setTab, savedJobIds, applications } = useApp();

  const btnStyle = (active: boolean) => ({
    color: active ? "var(--primary)" : "var(--text-muted)",
  });

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t px-2 pt-1.5 pb-safe flex items-center justify-around shadow-lg"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {role === "seeker" ? (
        <>
          <button onClick={() => setTab("dashboard")} style={btnStyle(tab === "dashboard")} className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold">
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            <span>Home</span>
          </button>
          <button onClick={() => setTab("search")} style={btnStyle(tab === "search")} className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold">
            <Search className="w-5 h-5 mb-0.5" />
            <span>Explore</span>
          </button>
          <button onClick={() => setTab("applications")} style={btnStyle(tab === "applications")} className="relative flex flex-col items-center py-1 px-2 text-[10px] font-semibold">
            <FileCheck2 className="w-5 h-5 mb-0.5" />
            <span>Applied</span>
            {applications.length > 0 && (
              <span className="absolute top-0 right-1 w-4 h-4 bg-[#F59E0B] text-[#0A2540] rounded-full text-[9px] flex items-center justify-center font-black">
                {applications.length}
              </span>
            )}
          </button>
          <button onClick={() => setTab("saved")} style={btnStyle(tab === "saved")} className="relative flex flex-col items-center py-1 px-2 text-[10px] font-semibold">
            <Bookmark className="w-5 h-5 mb-0.5" />
            <span>Saved</span>
            {savedJobIds.length > 0 && (
              <span className="absolute top-0 right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-black bg-[#F59E0B] text-[#0A2540]">
                {savedJobIds.length}
              </span>
            )}
          </button>
          <button onClick={() => setTab("profile")} style={btnStyle(tab === "profile")} className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold">
            <User className="w-5 h-5 mb-0.5" />
            <span>Profile</span>
          </button>
        </>
      ) : role === "employer" ? (
        <>
          <button onClick={() => setTab("employer-dashboard")} style={btnStyle(tab === "employer-dashboard")} className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold">
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            <span>Dashboard</span>
          </button>
          <button onClick={() => setTab("manage-jobs")} style={btnStyle(tab === "manage-jobs")} className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold">
            <Briefcase className="w-5 h-5 mb-0.5" />
            <span>Jobs</span>
          </button>
          <button
            onClick={() => setTab("post-job")}
            className="-mt-5 bg-[#F59E0B] text-[#0A2540] p-3 rounded-full shadow-xl hover:bg-[#D97706] flex items-center justify-center border-2 border-white dark:border-[#111F33]"
            title="Post a Vacancy"
          >
            <PlusCircle className="w-6 h-6 stroke-[2.5]" />
          </button>
          <button onClick={() => setTab("applicants")} style={btnStyle(tab === "applicants")} className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold">
            <Users className="w-5 h-5 mb-0.5" />
            <span>Applicants</span>
          </button>
          <button onClick={() => setTab("company-profile")} style={btnStyle(tab === "company-profile")} className="flex flex-col items-center py-1 px-2 text-[10px] font-semibold">
            <Building2 className="w-5 h-5 mb-0.5" />
            <span>Company</span>
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setTab("landing")} style={btnStyle(tab === "landing")} className="flex flex-col items-center py-1 px-3 text-[11px] font-semibold">
            <Home className="w-5 h-5 mb-0.5" />
            <span>Home</span>
          </button>
          <button onClick={() => setTab("search")} style={btnStyle(tab === "search")} className="flex flex-col items-center py-1 px-3 text-[11px] font-semibold">
            <Search className="w-5 h-5 mb-0.5" />
            <span>Jobs</span>
          </button>
          <button onClick={() => setTab("signin")} style={btnStyle(tab === "signin")} className="flex flex-col items-center py-1 px-3 text-[11px] font-semibold">
            <LogIn className="w-5 h-5 mb-0.5" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => setTab("role-selection")}
            className="bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] px-3.5 py-1.5 rounded-xl text-xs font-bold border border-[#F59E0B]/40 shadow-sm cursor-pointer"
          >
            Register
          </button>
        </>
      )}
    </nav>
  );
}
