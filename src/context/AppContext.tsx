"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Job,
  Candidate,
  Application,
  Interview,
  Company,
  NotificationItem,
  UserRole,
  ApplicationStatus,
  PaymentTransaction,
  PaymentModalOptions,
  UserSession,
} from "@/types";
import {
  MOCK_JOBS,
  MOCK_COMPANIES,
  MOCK_CANDIDATES,
  MOCK_APPLICATIONS,
  MOCK_INTERVIEWS,
  MOCK_NOTIFICATIONS,
  MOCK_TRANSACTIONS,
  DEMO_ADMIN_SESSION,
  DEMO_EMPLOYER_SESSION,
  DEMO_SEEKER_SESSION,
} from "@/data/mockData";
import PaymentModal from "@/components/payment/PaymentModal";
import { LangCode } from "@/lib/i18n";

export type Theme = "light" | "dark";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_PATH || "";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
      ...init,
    });
    const data = (await res.json()) as T;
    if (!res.ok) return data;
    return data;
  } catch {
    return null;
  }
}

interface AppContextType {
  // ── Identity, Authentication & Session ──
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserSession | null;
  login: (role: "admin" | "employer" | "seeker", customUser?: Partial<UserSession>) => void;
  authenticateCredentials: (
    identifier: string,
    password: string,
    role?: "admin" | "employer" | "seeker"
  ) => Promise<{ ok: boolean; error?: string }>;
  registerUserAccount: (payload: {
    role: "seeker" | "employer";
    name: string;
    companyName?: string;
    email: string;
    phone?: string;
    location?: string;
    password: string;
    otpCode?: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  switchSession: (role: "admin" | "employer" | "seeker") => void;
  tab: string;
  setTab: (tab: string) => void;
  // ── Theme ──
  theme: Theme;
  toggleTheme: () => void;
  // ── Language ──
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  // ── Profiles & Companies ──
  seeker: Candidate;
  setSeeker: React.Dispatch<React.SetStateAction<Candidate>>;
  company: Company;
  setCompany: React.Dispatch<React.SetStateAction<Company>>;
  companies: Company[];
  switchEmployerCompany: (companyId: string) => void;
  toggleCompanyVerified: (companyId: string) => void;
  // ── Jobs ──
  jobs: Job[];
  selectedJob: Job | null;
  selectJob: (jobId: string | null) => void;
  editingJob: Job | null;
  setEditingJob: (job: Job | null) => void;
  toggleSaveJob: (jobId: string) => void;
  savedJobIds: string[];
  isJobSaved: (jobId: string) => boolean;
  postNewJob: (job: Omit<Job, "id" | "postedDate" | "applicantCount"> & { paymentTxRef?: string }) => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  closeJob: (jobId: string) => void;
  toggleJobApproval: (jobId: string) => void;
  // ── Applications ──
  applications: Application[];
  applyToJob: (
    jobId: string,
    coverLetter: string,
    cvFileName: string,
    screeningAnswers?: Record<string, string>
  ) => boolean;
  withdrawApplication: (appId: string) => void;
  updateApplicationStatus: (appId: string, newStatus: ApplicationStatus, notes?: string) => void;
  hasApplied: (jobId: string) => boolean;
  // ── Candidates ──
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  selectCandidate: (candidateId: string | null) => void;
  // ── Interviews ──
  interviews: Interview[];
  scheduleInterview: (interview: Omit<Interview, "id">) => void;
  respondToInterview: (interviewId: string, status: "Confirmed" | "Reschedule Requested" | "Cancelled") => void;
  // ── Job Alerts ──
  jobAlertPrefs: {
    enabled: boolean;
    channels: { platform: boolean; email: boolean; telegram: boolean; sms: boolean };
    keyword: string;
  };
  setJobAlertPrefs: React.Dispatch<
    React.SetStateAction<{
      enabled: boolean;
      channels: { platform: boolean; email: boolean; telegram: boolean; sms: boolean };
      keyword: string;
    }>
  >;
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
  // ── Payments & Monetization (Telebirr, CBE, M-Pesa) ──
  transactions: PaymentTransaction[];
  addTransaction: (tx: PaymentTransaction, options?: { alreadyPersisted?: boolean }) => void;
  openPaymentModal: (options: PaymentModalOptions) => void;
  closePaymentModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("guest");
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [tab, setTabState] = useState<string>("landing");
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLangState] = useState<LangCode>("en");

  const setLang = useCallback((newLang: LangCode) => {
    setLangState(newLang);
    try {
      localStorage.setItem("azm_lang", newLang);
    } catch {
      // ignore storage errors
    }
  }, []);

  const [seeker, setSeekerState] = useState<Candidate>({
    ...MOCK_CANDIDATES[0],
    cvList: [
      { id: "cv-1", name: MOCK_CANDIDATES[0].cvFileName, size: MOCK_CANDIDATES[0].cvFileSize, updatedAt: "Nov 2026" },
      { id: "cv-2", name: "Dawit_Bekele_Product_Lead_CV.pdf", size: "1.4 MB", updatedAt: "Oct 2026" },
    ],
    preferences: {
      desiredRole: "Senior Full Stack Engineer / Tech Lead",
      minSalary: 45000,
      preferredLocation: "Addis Ababa (Bole)",
    },
  });
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [company, setCompanyState] = useState<Company>(MOCK_COMPANIES[1] || MOCK_COMPANIES[0]);

  const setSeeker: React.Dispatch<React.SetStateAction<Candidate>> = useCallback((updater) => {
    setSeekerState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      void apiFetch("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ id: next.id, updates: next }),
      });
      return next;
    });
  }, []);

  const setCompany: React.Dispatch<React.SetStateAction<Company>> = useCallback((updater) => {
    setCompanyState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      setCompanies((list) => list.map((c) => (c.id === next.id ? next : c)));
      void apiFetch("/api/companies", {
        method: "PATCH",
        body: JSON.stringify({ id: next.id, updates: next }),
      });
      return next;
    });
  }, []);

  const [jobs, setJobs] = useState<Job[]>(() =>
    MOCK_JOBS.map((j, idx) => ({ ...j, approved: idx < 5 }))
  );
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(["job-1", "job-3"]);

  const [applications, setApplications] = useState<Application[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [jobAlertPrefs, setJobAlertPrefsState] = useState({
    enabled: true,
    channels: { platform: true, email: true, telegram: true, sms: false },
    keyword: "Full Stack / React",
  });

  const setJobAlertPrefs: typeof setJobAlertPrefsState = useCallback((updater) => {
    setJobAlertPrefsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      void apiFetch("/api/job-alerts", {
        method: "PUT",
        body: JSON.stringify(next),
      });
      return next;
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations (Ethiopia)");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  // ── Payments & Monetization State ──
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [paymentModalOptions, setPaymentModalOptions] = useState<PaymentModalOptions | null>(null);

  const openPaymentModal = useCallback((options: PaymentModalOptions) => {
    setPaymentModalOptions(options);
  }, []);

  const closePaymentModal = useCallback(() => {
    setPaymentModalOptions(null);
  }, []);

  const showToast = useCallback((msg: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage((curr) => (curr === msg ? null : curr)), 3500);
  }, []);

  const applySessionState = useCallback(
    (session: UserSession, availableCompanies: Company[] = MOCK_COMPANIES) => {
      setCurrentUser(session);
      setRoleState(session.role);
      if (session.role === "employer" && session.companyId) {
        const foundCo = availableCompanies.find((c) => c.id === session.companyId);
        if (foundCo) setCompanyState(foundCo);
      }
      const targetTab =
        session.role === "admin"
          ? "admin-dashboard"
          : session.role === "employer"
          ? "employer-dashboard"
          : "dashboard";
      setTabState(targetTab);
      try {
        localStorage.setItem("azm_session", JSON.stringify(session));
        localStorage.setItem("azm_role", session.role);
        localStorage.setItem("azm_tab", targetTab);
      } catch {
        // ignore storage errors
      }
    },
    []
  );

  const refreshBootstrap = useCallback(async () => {
    const data = await apiFetch<{
      user: UserSession | null;
      jobs: Job[];
      companies: Company[];
      candidates: Candidate[];
      seeker: Candidate | null;
      applications: Application[];
      interviews: Interview[];
      notifications: NotificationItem[];
      transactions: PaymentTransaction[];
      savedJobIds: string[];
    }>("/api/bootstrap");

    if (!data) return null;
    if (Array.isArray(data.jobs)) setJobs(data.jobs);
    if (Array.isArray(data.companies)) {
      setCompanies(data.companies);
      const coMatch = data.user?.companyId
        ? data.companies.find((c) => c.id === data.user?.companyId)
        : data.companies[1] || data.companies[0];
      if (coMatch) setCompanyState(coMatch);
    }
    if (Array.isArray(data.candidates)) setCandidates(data.candidates);
    if (data.seeker) setSeekerState(data.seeker);
    if (Array.isArray(data.applications)) setApplications(data.applications);
    if (Array.isArray(data.interviews)) setInterviews(data.interviews);
    if (Array.isArray(data.notifications)) setNotifications(data.notifications);
    if (Array.isArray(data.transactions)) setTransactions(data.transactions);
    if (Array.isArray(data.savedJobIds)) setSavedJobIds(data.savedJobIds);
    if (data.user) {
      const alertRes = await apiFetch<{
        ok?: boolean;
        prefs?: {
          enabled: boolean;
          channels: { platform: boolean; email: boolean; telegram: boolean; sms: boolean };
          keyword: string;
        };
      }>("/api/job-alerts");
      if (alertRes?.ok && alertRes.prefs) {
        setJobAlertPrefsState(alertRes.prefs);
      }
    }
    return data;
  }, []);

  // ── Theme, Language & Backend Database Hydration ──
  useEffect(() => {
    const saved = localStorage.getItem("azm-theme") as Theme | null;
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    let restoredFromLocal = false;
    // Hydrate local preferences & persisted state from NestJS Backend asynchronously
    void (async () => {
      if (saved === "dark") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
      const savedLang = localStorage.getItem("azm_lang") as LangCode | null;
      if (savedLang && ["en", "am", "om", "ti"].includes(savedLang)) {
        setLangState(savedLang);
      }

      try {
        const savedSession = localStorage.getItem("azm_session");
        if (savedSession) {
          const parsed = JSON.parse(savedSession) as UserSession;
          if (parsed && (parsed.role === "admin" || parsed.role === "employer" || parsed.role === "seeker")) {
            setCurrentUser(parsed);
            setRoleState(parsed.role);
            restoredFromLocal = true;
            const savedTab = localStorage.getItem("azm_tab");
            if (savedTab && savedTab !== "landing") {
              setTabState(savedTab);
            } else {
              setTabState(
                parsed.role === "admin"
                  ? "admin-dashboard"
                  : parsed.role === "employer"
                  ? "employer-dashboard"
                  : "dashboard"
              );
            }
          }
        }
      } catch {
        // ignore restore errors
      }

      const data = await refreshBootstrap();
      if (!data) return;

      if (data.user && !restoredFromLocal) {
        applySessionState(data.user, data.companies);
      } else if (data.user) {
        setCurrentUser(data.user);
        setRoleState(data.user.role);
      } else if (restoredFromLocal) {
        // Server session cookie expired; clear stale client session
        setCurrentUser(null);
        setRoleState("guest");
        setTabState("landing");
        localStorage.removeItem("azm_session");
        localStorage.removeItem("azm_role");
      }

      // Universal Chapa redirect-back verifier (?payment_ref=AZM-...)
      try {
        const params = new URLSearchParams(window.location.search);
        const paymentRef = params.get("payment_ref");
        if (paymentRef && data.user) {
          const verifyRes = await apiFetch<{
            ok?: boolean;
            transaction?: PaymentTransaction;
            error?: string;
          }>("/api/payments/verify", {
            method: "POST",
            body: JSON.stringify({ txRef: paymentRef }),
          });
          if (verifyRes?.ok && verifyRes.transaction) {
            setTransactions((prev) => [
              verifyRes.transaction!,
              ...prev.filter((item) => item.id !== verifyRes.transaction!.id),
            ]);
            await refreshBootstrap();
            showToast(`Chapa payment verified (${verifyRes.transaction.amount} ETB)!`, "success");
          } else if (verifyRes?.error) {
            showToast(verifyRes.error, "error");
          }
          params.delete("payment_ref");
          const cleanSearch = params.toString();
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}${cleanSearch ? `?${cleanSearch}` : ""}`
          );
        }
      } catch {
        // ignore URL verification errors
      }
    })();
  }, [applySessionState, refreshBootstrap, showToast]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("azm-theme", next);
      return next;
    });
  }, []);

  const addTransaction = useCallback(
    (tx: PaymentTransaction, options?: { alreadyPersisted?: boolean }) => {
      setTransactions((prev) => [tx, ...prev.filter((item) => item.id !== tx.id)]);
      if (tx.metadata?.jobId) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === tx.metadata?.jobId
              ? {
                  ...j,
                  paymentStatus: "paid",
                  approved: true,
                  featured: tx.purpose === "job_post_featured" || tx.purpose === "social_broadcast",
                }
              : j
          )
        );
      }
      if (options?.alreadyPersisted) return;
      void (async () => {
        await apiFetch<{ ok?: boolean; transaction?: PaymentTransaction }>("/api/payments", {
          method: "POST",
          body: JSON.stringify(tx),
        });
      })();
    },
    []
  );

  const login = useCallback(
    (targetRole: "admin" | "employer" | "seeker", customUser?: Partial<UserSession>) => {
      let session: UserSession;
      if (targetRole === "admin") {
        session = { ...DEMO_ADMIN_SESSION, ...customUser, loginTimestamp: new Date().toLocaleTimeString() };
      } else if (targetRole === "employer") {
        session = { ...DEMO_EMPLOYER_SESSION, ...customUser, loginTimestamp: new Date().toLocaleTimeString() };
      } else {
        session = { ...DEMO_SEEKER_SESSION, ...customUser, loginTimestamp: new Date().toLocaleTimeString() };
      }

      applySessionState(session, companies);

      void apiFetch<{ ok?: boolean; user?: UserSession }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ mode: "demo", role: targetRole, customUser }),
      });

      const label =
        targetRole === "admin"
          ? "System Administrator"
          : targetRole === "employer"
          ? `Employer (${session.companyName || "Skylight Hotel"})`
          : `Employee (${session.name})`;

      showToast(`Signed in as ${label}`, "success");
    },
    [applySessionState, companies, showToast]
  );

  const authenticateCredentials = useCallback(
    async (identifier: string, password: string, targetRole?: "admin" | "employer" | "seeker") => {
      const res = await apiFetch<{ ok?: boolean; user?: UserSession; error?: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ mode: "credentials", identifier, password, role: targetRole }),
      });
      if (res?.ok && res.user) {
        applySessionState(res.user, companies);
        await refreshBootstrap();
        showToast(`Signed in as ${res.user.name}`, "success");
        return { ok: true };
      }
      const errMsg = res?.error || "Invalid credentials.";
      showToast(errMsg, "error");
      return { ok: false, error: errMsg };
    },
    [applySessionState, companies, refreshBootstrap, showToast]
  );

  const registerUserAccount = useCallback(
    async (payload: {
      role: "seeker" | "employer";
      name: string;
      companyName?: string;
      email: string;
      phone?: string;
      location?: string;
      password: string;
      otpCode?: string;
    }) => {
      const res = await apiFetch<{ ok?: boolean; user?: UserSession; error?: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (res?.ok && res.user) {
        const freshCompanies = await apiFetch<{ companies?: Company[] }>("/api/companies");
        const nextCos = freshCompanies?.companies || companies;
        if (freshCompanies?.companies) setCompanies(freshCompanies.companies);
        applySessionState(res.user, nextCos);
        await refreshBootstrap();
        showToast(`Account created! Welcome, ${res.user.name}`, "success");
        return { ok: true };
      }
      const errMsg = res?.error || "Registration failed.";
      showToast(errMsg, "error");
      return { ok: false, error: errMsg };
    },
    [applySessionState, companies, refreshBootstrap, showToast]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    setRoleState("guest");
    setTabState("landing");
    setApplications([]);
    setInterviews([]);
    setNotifications([]);
    setTransactions([]);
    setSavedJobIds([]);
    localStorage.removeItem("azm_session");
    localStorage.removeItem("azm_role");
    localStorage.setItem("azm_tab", "landing");
    void apiFetch("/api/auth/logout", { method: "POST" });
    showToast("Signed out. Switched to Public Visitor mode.", "info");
  }, [showToast]);

  const switchSession = useCallback(
    (targetRole: "admin" | "employer" | "seeker") => {
      login(targetRole);
    },
    [login]
  );

  const setRole = useCallback(
    (newRole: UserRole) => {
      if (newRole === "guest") {
        logout();
      } else {
        login(newRole);
      }
    },
    [login, logout]
  );

  const setTab = useCallback((newTab: string) => {
    setTabState(newTab);
    localStorage.setItem("azm_tab", newTab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
    void apiFetch("/api/saved-jobs", {
      method: "POST",
      body: JSON.stringify({ jobId, userId: seeker.id }),
    });
  };

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

  const hasApplied = (jobId: string) =>
    applications.some((app) => app.jobId === jobId && app.candidateId === seeker.id);

  const applyToJob = (
    jobId: string,
    coverLetter: string,
    cvFileName: string,
    screeningAnswers?: Record<string, string>
  ) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return false;
    if (hasApplied(jobId)) {
      showToast("Already applied for this position.", "info");
      return false;
    }

    const tempId = `app-${Date.now()}`;
    const newApp: Application = {
      id: tempId,
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
      screeningAnswers,
    };

    setApplications((prev) => [newApp, ...prev]);
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, applicantCount: j.applicantCount + 1 } : j)));
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: "Application Received",
        message: `Your application for "${job.title}" at ${job.companyName} was submitted.`,
        timestamp: "Just now",
        read: false,
        type: "application",
        targetRole: "seeker",
      },
      ...prev,
    ]);
    showToast("Application submitted successfully!");

    void (async () => {
      const res = await apiFetch<{ ok?: boolean; application?: Application; notification?: NotificationItem }>(
        "/api/applications",
        {
          method: "POST",
          body: JSON.stringify({
            jobId: job.id,
            candidateId: seeker.id,
            candidateName: seeker.name,
            candidateAvatar: seeker.avatar,
            candidateTitle: seeker.title,
            coverLetter,
            cvFileName: cvFileName || seeker.cvFileName,
            screeningAnswers,
          }),
        }
      );
      if (res?.ok && res.application) {
        setApplications((prev) => prev.map((a) => (a.id === tempId ? res.application! : a)));
      }
    })();

    return true;
  };

  const withdrawApplication = (appId: string) => {
    const target = applications.find((a) => a.id === appId);
    if (!target) return;
    setApplications((prev) => prev.filter((a) => a.id !== appId));
    setJobs((prev) =>
      prev.map((j) =>
        j.id === target.jobId ? { ...j, applicantCount: Math.max(0, j.applicantCount - 1) } : j
      )
    );
    showToast(`Application for "${target.jobTitle}" withdrawn.`, "info");
    void apiFetch(`/api/applications/${appId}`, { method: "DELETE" });
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
    void apiFetch(`/api/applications/${appId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus, notes }),
    });
  };

  const postNewJob = (jobData: Omit<Job, "id" | "postedDate" | "applicantCount"> & { paymentTxRef?: string }) => {
    const tempId = `job-${Date.now()}`;
    const optimistic: Job = {
      ...jobData,
      approved: true,
      id: tempId,
      postedDate: "Just now",
      applicantCount: 0,
    };
    setJobs((prev) => [optimistic, ...prev]);
    showToast(jobData.status === "Draft" ? "Vacancy saved as draft!" : "Vacancy published successfully!");

    void (async () => {
      const res = await apiFetch<{ ok?: boolean; job?: Job }>("/api/jobs", {
        method: "POST",
        body: JSON.stringify(jobData),
      });
      if (res?.ok && res.job) {
        setJobs((prev) => prev.map((j) => (j.id === tempId ? res.job! : j)));
      }
    })();
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, ...updates } : j)));
    setEditingJob(null);
    showToast("Vacancy updated successfully!", "success");
    void apiFetch(`/api/jobs/${jobId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  };

  const closeJob = (jobId: string) => {
    const target = jobs.find((j) => j.id === jobId);
    const nextStatus = target?.status === "Active" ? "Closed" : "Active";
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: nextStatus } : j)));
    showToast("Job status updated");
    void apiFetch(`/api/jobs/${jobId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: nextStatus }),
    });
  };

  const toggleJobApproval = (jobId: string) => {
    const target = jobs.find((j) => j.id === jobId);
    const nextApproved = !target?.approved;
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, approved: nextApproved } : j)));
    showToast(
      nextApproved
        ? "Job listing verified and approved for live broadcast!"
        : "Job listing set to Pending Review",
      nextApproved ? "success" : "info"
    );
    void apiFetch(`/api/jobs/${jobId}`, {
      method: "PATCH",
      body: JSON.stringify({ approved: nextApproved }),
    });
  };

  const switchEmployerCompany = (companyId: string) => {
    const found = companies.find((c) => c.id === companyId);
    if (found) {
      setCompanyState(found);
      showToast(`Switched organization workspace to ${found.name}`, "info");
    }
  };

  const toggleCompanyVerified = (companyId: string) => {
    const target = companies.find((c) => c.id === companyId);
    const next = !target?.verified;
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id !== companyId) return c;
        if (company.id === companyId) setCompanyState({ ...c, verified: next });
        return { ...c, verified: next };
      })
    );
    if (target) {
      showToast(`${target.name} KYC status: ${next ? "Verified" : "Pending"}`, next ? "success" : "info");
    }
    void apiFetch("/api/companies", {
      method: "PATCH",
      body: JSON.stringify({ id: companyId, updates: { verified: next } }),
    });
  };

  const selectCandidate = (candId: string | null) => setSelectedCandidateId(candId);

  const scheduleInterview = (interviewData: Omit<Interview, "id">) => {
    const tempId = `int-${Date.now()}`;
    const newInterview: Interview = { ...interviewData, id: tempId };
    setInterviews((prev) => [newInterview, ...prev]);
    if (interviewData.applicationId) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === interviewData.applicationId
            ? {
                ...app,
                status: "Interview",
                statusNotes: `Interview scheduled for ${interviewData.date} at ${interviewData.time}`,
              }
            : app
        )
      );
    }
    showToast("Interview scheduled!");
    void (async () => {
      const res = await apiFetch<{ ok?: boolean; interview?: Interview }>("/api/interviews", {
        method: "POST",
        body: JSON.stringify(interviewData),
      });
      if (res?.ok && res.interview) {
        setInterviews((prev) => prev.map((iv) => (iv.id === tempId ? res.interview! : iv)));
      }
    })();
  };

  const respondToInterview = (
    interviewId: string,
    status: "Confirmed" | "Reschedule Requested" | "Cancelled"
  ) => {
    setInterviews((prev) => prev.map((i) => (i.id === interviewId ? { ...i, status } : i)));
    showToast(
      status === "Confirmed"
        ? "Interview attendance confirmed!"
        : status === "Reschedule Requested"
        ? "Reschedule request sent to hiring team."
        : "Interview declined.",
      status === "Confirmed" ? "success" : "info"
    );
    void apiFetch(`/api/interviews/${interviewId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    void apiFetch("/api/notifications", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read");
    void apiFetch("/api/notifications", {
      method: "PATCH",
      body: JSON.stringify({ markAll: true, role }),
    });
  };

  const userNotifications = notifications.filter((n) => {
    if (role === "admin") return n.targetRole === "admin" || !n.targetRole;
    if (role === "employer") return n.targetRole === "employer" || !n.targetRole;
    if (role === "seeker") return n.targetRole === "seeker" || !n.targetRole;
    return false;
  });

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        login,
        authenticateCredentials,
        registerUserAccount,
        logout,
        switchSession,
        tab,
        setTab,
        theme,
        toggleTheme,
        lang,
        setLang,
        seeker,
        setSeeker,
        company,
        setCompany,
        companies,
        switchEmployerCompany,
        toggleCompanyVerified,
        jobs,
        selectedJob,
        selectJob,
        editingJob,
        setEditingJob,
        toggleSaveJob,
        savedJobIds,
        isJobSaved,
        postNewJob,
        updateJob,
        closeJob,
        toggleJobApproval,
        applications,
        applyToJob,
        withdrawApplication,
        updateApplicationStatus,
        hasApplied,
        candidates,
        selectedCandidate,
        selectCandidate,
        interviews,
        scheduleInterview,
        respondToInterview,
        jobAlertPrefs,
        setJobAlertPrefs,
        notifications: userNotifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,
        searchQuery,
        setSearchQuery,
        selectedLocation,
        setSelectedLocation,
        selectedCategory,
        setSelectedCategory,
        toastMessage,
        toastType,
        showToast,
        transactions,
        addTransaction,
        openPaymentModal,
        closePaymentModal,
      }}
    >
      {children}
      {paymentModalOptions && (
        <PaymentModal options={paymentModalOptions} onClose={closePaymentModal} />
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
