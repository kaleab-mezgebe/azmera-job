export type UserRole = "guest" | "seeker" | "employer" | "admin";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employer" | "seeker";
  avatar?: string;
  title?: string;
  phone?: string;
  companyId?: string;
  companyName?: string;
  companyLogo?: string;
  loginTimestamp?: string;
}

export type ApplicationStatus =
  | "Submitted"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Assessment"
  | "Offer"
  | "Hired"
  | "Rejected";

export interface StatusHistoryItem {
  status: ApplicationStatus;
  changedAt: string;
  note?: string;
  changedBy?: string;
}

export interface TalentPool {
  id: string;
  name: string;
  description?: string;
  candidateIds: string[];
  createdAt: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "seeker" | "employer" | "admin";
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: "seeker" | "employer" | "admin";
  jobTitle?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: MessageItem[];
}

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
  approved?: boolean;
  featured?: boolean;
  packageType?: "standard" | "featured" | "vip_broadcast";
  paymentStatus?: "unpaid" | "paid";
  directAgentApply?: boolean; // Fast-track direct application to Azmera via Telegram/Phone (as on Facebook)
  directContactPhone?: string;
  directTelegramHandle?: string;
  openingsCount?: number; // e.g. 124 for Skylight Hotel, 5 for UNICEF
  sourceCircular?: string; // e.g. "TDRF.ORG" or "Azmera Job Connect Direct Customer Intake"
  screeningQuestions?: string[];
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
  languages?: string[]; // e.g. ["English", "Amharic", "Tigrigna", "Afaan Oromo"]
  certifications?: { name: string; issuer: string; year: string }[];
  portfolioLinks?: { platform: string; url: string }[];
  privacySettings?: {
    hideContactUntilShortlisted: boolean;
    allowDatabaseSearch: boolean;
  };
  cvFileName: string;
  cvFileSize: string;
  cvList?: { id: string; name: string; size: string; updatedAt: string }[];
  preferences?: {
    desiredRole: string;
    minSalary: number;
    preferredLocation: string;
  };
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
  aiMatchScore?: number; // e.g. 94%
  rating?: number; // 1 to 5 stars
  internalNotes?: string[];
  statusHistory?: StatusHistoryItem[];
  screeningAnswers?: Record<string, string>;
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
  status: "Scheduled" | "Confirmed" | "Reschedule Requested" | "Completed" | "Cancelled";
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
  kycDocumentName?: string;
  kycDocumentUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "application" | "interview" | "job_alert" | "system";
  targetRole: "seeker" | "employer" | "admin" | "both";
}

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  jobCount: number;
  popular?: boolean;
}

// ── Monetization & Payment Methods (Telebirr, CBE, M-Pesa) ──
export type PaymentMethodType = "telebirr" | "cbe" | "mpesa";

export type PaymentPurpose =
  | "job_post_standard"
  | "job_post_featured"
  | "social_broadcast"
  | "talent_unlock"
  | "employer_subscription"
  | "seeker_cv_review"
  | "seeker_profile_boost"
  | "service_payment";

export interface PaymentTransaction {
  id: string;
  sku?: string;
  amount: number; // in ETB
  currency: "ETB";
  method: PaymentMethodType;
  purpose: PaymentPurpose;
  purposeLabel: string;
  status: "Completed" | "Pending" | "Failed";
  referenceNumber: string;
  payerPhoneOrAccount: string;
  createdAt: string;
  invoiceNumber: string;
  companyName?: string;
  ownerUserId?: string;
  verifiedBy?: "chapa_api" | "chapa_webhook" | "sandbox" | "admin";
  gatewayReference?: string;
  metadata?: {
    jobId?: string;
    jobTitle?: string;
    candidateId?: string;
    candidateName?: string;
    packageId?: string;
    packageName?: string;
    packageType?: string;
    usedForJobId?: string;
  };
}

export interface PricingPackage {
  id: string;
  name: string;
  amharicName: string;
  price: number;
  currency: "ETB";
  billingPeriod?: string;
  description: string;
  features: string[];
  recommended?: boolean;
  badge?: string;
}

export interface PaymentModalOptions {
  sku?: string;
  amount: number;
  purpose: PaymentPurpose;
  purposeLabel: string;
  title?: string;
  description?: string;
  metadata?: Record<string, any>;
  onSuccess?: (transaction: PaymentTransaction) => void;
}
