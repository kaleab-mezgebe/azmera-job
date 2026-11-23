"use client";

import React from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import Toast from "@/components/common/Toast";

// Landing & Auth
import LandingView from "@/components/landing/LandingView";
import RoleSelectionView from "@/components/auth/RoleSelectionView";
import SignInView from "@/components/auth/SignInView";
import RegisterView from "@/components/auth/RegisterView";
import ForgotPasswordView from "@/components/auth/ForgotPasswordView";

// Job Seeker Views
import SeekerDashboardView from "@/components/seeker/SeekerDashboardView";
import JobSearchView from "@/components/seeker/JobSearchView";
import JobDetailsView from "@/components/seeker/JobDetailsView";
import SeekerApplicationsView from "@/components/seeker/SeekerApplicationsView";
import SeekerProfileView from "@/components/seeker/SeekerProfileView";
import SavedJobsView from "@/components/seeker/SavedJobsView";

// Employer Views
import EmployerDashboardView from "@/components/employer/EmployerDashboardView";
import ManageJobsView from "@/components/employer/ManageJobsView";
import PostJobView from "@/components/employer/PostJobView";
import ApplicantsManagementView from "@/components/employer/ApplicantsManagementView";
import InterviewManagementView from "@/components/employer/InterviewManagementView";
import CompanyProfileView from "@/components/employer/CompanyProfileView";

function MainContent() {
  const { role, tab } = useApp();

  const renderView = () => {
    // Auth and Guest routes
    if (tab === "landing") return <LandingView />;
    if (tab === "role-selection") return <RoleSelectionView />;
    if (tab === "signin") return <SignInView />;
    if (tab === "register") return <RegisterView />;
    if (tab === "forgot-password") return <ForgotPasswordView />;

    // Shared / Job Seeker views
    if (tab === "search") return <JobSearchView />;
    if (tab === "job-details") return <JobDetailsView />;
    if (tab === "dashboard") return <SeekerDashboardView />;
    if (tab === "applications") return <SeekerApplicationsView />;
    if (tab === "saved") return <SavedJobsView />;
    if (tab === "profile") return <SeekerProfileView />;

    // Employer views
    if (tab === "employer-dashboard") return <EmployerDashboardView />;
    if (tab === "manage-jobs") return <ManageJobsView />;
    if (tab === "post-job") return <PostJobView />;
    if (tab === "applicants") return <ApplicantsManagementView />;
    if (tab === "interviews") return <InterviewManagementView />;
    if (tab === "company-profile") return <CompanyProfileView />;

    // Fallback
    return role === "employer" ? (
      <EmployerDashboardView />
    ) : role === "seeker" ? (
      <SeekerDashboardView />
    ) : (
      <LandingView />
    );
  };

  const isPublicLanding = role === "guest" && tab === "landing";

  return (
    <div className="min-h-screen flex flex-col theme-bg theme-text">
      <Navbar />

      <div className="flex-1 flex w-full">
        {/* Sidebar only shown on desktop for authenticated or dashboard views */}
        {role !== "guest" && <Sidebar />}

        <main
          className={`flex-1 w-full ${
            isPublicLanding ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
          }`}
        >
          {renderView()}
        </main>
      </div>

      <MobileBottomNav />
      <Toast />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
