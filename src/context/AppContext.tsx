"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Job, Candidate, Application, Interview, Company, NotificationItem, UserRole, ApplicationStatus,
} from "@/types";
import {
  MOCK_JOBS, MOCK_COMPANIES, MOCK_CANDIDATES, MOCK_APPLICATIONS,
  MOCK_INTERVIEWS, MOCK_NOTIFICATIONS,
} from "@/data/mockData";
import { LangCode } from "@/lib/i18n";

export type Theme = "light" | "dark";

interface AppContextType {
  // ── Identity & Navigation ──
  role: UserRole;
  setRole: (role: UserRole) => void;
  tab: string;
  setTab: (tab: string) => void;
  // ── Theme ──
  theme: Theme;
  toggleTheme: () => void;
  // ── Language ──
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  // ── Profiles ──
  seeker: Candidate;
  setSeeker: React.Dispatch<React.SetStateAction<Candidate>>;
  company: Company;
  setCompany: React.Dispatch<React.SetStateAction<Company>>;
  // ── Jobs ──
  jobs: Job[];
  selectedJob: Job | null;
  selectJob: (jobId: string | null) => void;
  toggleSaveJob: (jobId: string) => void;
  savedJobIds: string[];
  isJobSaved: (jobId: string) => boolean;
  postNewJob: (job: Omit<Job, "id" | "postedDate" | "applicantCount">) => void;
  closeJob: (jobId: string) => void;
  // ── Applications ──
  applications: Application[];
  applyToJob: (jobId: string, coverLetter: string, cvFileName: string) => boolean;
  updateApplicationStatus: (appId: string, newStatus: ApplicationStatus, notes?: string) => void;
  hasApplied: (jobId: string) => boolean;
  // ── Candidates ──
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  selectCandidate: (candidateId: string | null) => void;
  // ── Interviews ──
  interviews: Interview[];
  scheduleInterview: (interview: Omit<Interview, "id">) => void;
  // ── Notifications ──
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;
  // ── Search State ──
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  // ── Toast ──
  toastMessage: string | null;
  toastType: "success" | "error" | "info";
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("guest");
  const [tab, setTabState] = useState<string>("landing");
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<LangCode>("en");

  const [seeker, setSeeker] = useState<Candidate>(MOCK_CANDIDATES[0]);
  const [company, setCompany] = useState<Company>(MOCK_COMPANIES[0]);

  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(["job-1", "job-3"]);

  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [candidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  const [interviews, setInterviews] = useState<Interview[]>(MOCK_INTERVIEWS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations (Ethiopia)");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  // ── Theme persistence ──
  useEffect(() => {
    const saved = localStorage.getItem("azm-theme") as Theme | null;
    if (saved === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("azm-theme", next);
      return next;
    });
  }, []);

  // ── Toast ──
  const showToast = useCallback((msg: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage((curr) => (curr === msg ? null : curr)), 3500);
  }, []);

  // ── Navigation ──
  const setTab = (newTab: string) => {
    setTabState(newTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === "guest") setTabState("landing");
    else if (newRole === "seeker") setTabState("dashboard");
    else setTabState("employer-dashboard");
  };

  // ── Jobs ──
  const selectJob = (jobId: string | null) => {
    setSelectedJobId(jobId);
    if (jobId) setTab("job-details");
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      showToast(exists ? "Removed from saved jobs" : "Job bookmarked!", "success");
      return exists ? prev.filter((id) => id !== jobId) : [...prev, jobId];
    });
  };

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

  const hasApplied = (jobId: string) =>
    applications.some((app) => app.jobId === jobId && app.candidateId === seeker.id);

  const applyToJob = (jobId: string, coverLetter: string, cvFileName: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return false;
    if (hasApplied(jobId)) { showToast("Already applied for this position.", "info"); return false; }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      candidateId: seeker.id,
      candidateName: seeker.name,
      candidateAvatar: seeker.avatar,
      candidateTitle: seeker.title,
      jobTitle: job.title,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      location: job.location,
      appliedDate: "Today",
      status: "Submitted",
      statusNotes: "Your application was submitted and sent to HR.",
      coverLetter,
      cvFileName: cvFileName || seeker.cvFileName,
    };

    setApplications([newApp, ...applications]);
    setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, applicantCount: j.applicantCount + 1 } : j));
    setNotifications([{
      id: `notif-${Date.now()}`,
      title: "Application Received",
      message: `Your application for "${job.title}" at ${job.companyName} was submitted.`,
      timestamp: "Just now",
      read: false,
      type: "application",
      targetRole: "seeker",
    }, ...notifications]);
    showToast("Application submitted successfully!");
    return true;
  };

  const updateApplicationStatus = (appId: string, newStatus: ApplicationStatus, notes?: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, status: newStatus, statusNotes: notes || `Status updated to ${newStatus}.` }
          : app
      )
    );
    showToast(`Status updated: ${newStatus}`);
  };

  const postNewJob = (jobData: Omit<Job, "id" | "postedDate" | "applicantCount">) => {
    setJobs([{ ...jobData, id: `job-${Date.now()}`, postedDate: "Just now", applicantCount: 0 }, ...jobs]);
    showToast("Vacancy published successfully!");
  };

  const closeJob = (jobId: string) => {
    setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, status: j.status === "Active" ? "Closed" : "Active" } : j));
    showToast("Job status updated");
  };

  const selectCandidate = (candId: string | null) => setSelectedCandidateId(candId);

  const scheduleInterview = (interviewData: Omit<Interview, "id">) => {
    const newInterview: Interview = { ...interviewData, id: `int-${Date.now()}` };
    setInterviews([newInterview, ...interviews]);
    if (interviewData.applicationId) {
      updateApplicationStatus(interviewData.applicationId, "Interview",
        `Interview scheduled for ${interviewData.date} at ${interviewData.time}`);
    }
    showToast("Interview scheduled!");
  };

  const markNotificationRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read");
  };

  const unreadCount = notifications.filter(
    (n) => !n.read && (n.targetRole === role || n.targetRole === "both")
  ).length;

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

  return (
    <AppContext.Provider
      value={{
        role, setRole, tab, setTab,
        theme, toggleTheme, lang, setLang,
        seeker, setSeeker, company, setCompany,
        jobs, selectedJob, selectJob, toggleSaveJob, savedJobIds, isJobSaved, postNewJob, closeJob,
        applications, applyToJob, updateApplicationStatus, hasApplied,
        candidates, selectedCandidate, selectCandidate,
        interviews, scheduleInterview,
        notifications, markNotificationRead, markAllNotificationsRead, unreadCount,
        searchQuery, setSearchQuery, selectedLocation, setSelectedLocation,
        selectedCategory, setSelectedCategory,
        toastMessage, toastType, showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
