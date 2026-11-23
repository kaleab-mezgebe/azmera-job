export type UserRole = "guest" | "seeker" | "employer";

export type ApplicationStatus =
  | "Submitted"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Accepted"
  | "Rejected";

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Remote"
  | "Hybrid";

export type ExperienceLevel =
  | "Entry Level (0-1 yrs)"
  | "Mid Level (2-4 yrs)"
  | "Senior Level (5+ yrs)"
  | "Lead / Director";

export interface JobAttachment {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "docx" | "image";
  url?: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  verified: boolean;
  location: string;
  workplaceType: "On-site" | "Hybrid" | "Remote";
  category: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string; // "ETB"
  salaryPeriod: "monthly" | "yearly";
  description: string;
  richDescriptionHtml?: string;
  attachments?: JobAttachment[];
  flyerImage?: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  postedDate: string;
  deadline: string;
  applicantCount: number;
  status: "Active" | "Closed" | "Draft";
  featured?: boolean;
  directAgentApply?: boolean; // Fast-track direct application to Azmera via Telegram/Phone (as on Facebook)
  directContactPhone?: string;
  directTelegramHandle?: string;
  openingsCount?: number; // e.g. 124 for Skylight Hotel, 5 for UNICEF
  sourceCircular?: string; // e.g. "TDRF.ORG" or "Azmera Job Connect Direct Customer Intake"
}

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  experienceYears: number;
  education: {
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
  }[];
  workHistory: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  skills: string[];
  cvFileName: string;
  cvFileSize: string;
  profileCompletion: number; // e.g. 85
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  candidateTitle: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  location: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusNotes?: string;
  coverLetter: string;
  cvFileName: string;
  interviewDate?: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  date: string;
  time: string;
  type: "Google Meet" | "In-person" | "Phone";
  locationOrLink: string;
  interviewerName: string;
  notes: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  verified: boolean;
  industry: string;
  description: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  employeeCount: string;
  foundedYear: string;
  activeJobsCount: number;
  bannerUrl: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "application" | "interview" | "job_alert" | "system";
  targetRole: "seeker" | "employer" | "both";
}

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  jobCount: number;
  popular?: boolean;
}
