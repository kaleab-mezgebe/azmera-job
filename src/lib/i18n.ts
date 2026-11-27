 export type LangCode = "en" | "am" | "om" | "ti";

export type TranslationKey =
  | "home"
  | "exploreJobs"
  | "forEmployers"
  | "explore"
  | "pricingPlans"
  | "howItWorks"
  | "telegramChannel"
  | "salaryGuide"
  | "applications"
  | "savedJobs"
  | "myProfile"
  | "dashboard"
  | "manageJobs"
  | "applicants"
  | "findTalent"
  | "careerHub"
  | "moreTools"
  | "messages"
  | "interviews"
  | "companyProfile"
  | "adminConsole"
  | "jobApprovals"
  | "operations"
  | "paymentAudit"
  | "verifiedEmployers"
  | "talentDirectory"
  | "signIn"
  | "getStarted"
  | "postJob"
  | "searchPlaceholder"
  | "allLocations"
  | "findJobs"
  | "applyNow"
  | "saveJob"
  | "viewJob"
  | "salary"
  | "submitted"
  | "underReview"
  | "shortlisted"
  | "interview"
  | "assessment"
  | "offerExtended"
  | "hired"
  | "accepted"
  | "rejected"
  | "typeHere"
  | "coverLetter"
  | "submit"
  | "cancel"
  | "save"
  | "saved"
  | "edit"
  | "skills"
  | "experience"
  | "education"
  | "about"
  | "contact"
  | "fullTime"
  | "partTime"
  | "contract"
  | "remote"
  | "hybrid"
  | "onSite"
  | "welcome"
  | "tagline"
  | "entryLevel"
  | "midLevel"
  | "seniorLevel"
  | "schedule"
  | "shortlist"
  | "reject"
  | "viewProfile"
  | "downloadCV"
  | "publishJob"
  | "previewJob"
  | "jobTitle"
  | "category"
  | "description"
  | "responsibilities"
  | "qualifications"
  | "deadline"
  | "currency"
  | "verifiedEmployer"
  | "jobSeeker"
  | "employer"
  | "administrator"
  | "activeSession"
  // Landing & Hero
  | "heroBadge"
  | "heroTitlePart1"
  | "heroTitlePart2"
  | "heroSubtitle"
  | "heroSearchPlaceholder"
  | "heroLocationPlaceholder"
  | "allCategories"
  | "searchJobs"
  | "popular"
  | "activeJobs"
  | "companies"
  | "jobSeekersCount"
  | "statVerifiedJobs"
  | "statEmployers"
  | "statTelegram"
  | "statMatchRate"
  | "successRate"
  | "trustedBy"
  | "recruitmentAdvantageTitle"
  | "recruitmentAdvantageSubtitle"
  | "modernRecruitmentStandard"
  | "directScreeningTitle"
  | "directScreeningDesc"
  | "zeroAgencyFee"
  | "viewFastTrack"
  | "salaryTransparencyTitle"
  | "salaryTransparencyDesc"
  | "wordCircularTitle"
  | "wordCircularDesc"
  | "downloadToR"
  | "applyTelegram"
  | "postJobNavy"
  | "verifiedOnly"
  | "jobMatchDesc"
  | "popularCategoriesTitle"
  | "popularCategoriesSubtitle"
  | "latestOpportunities"
  | "viewDetails"
  | "apply"
  | "telegramBannerTitle"
  | "telegramBannerDesc"
  | "joinTelegramBtn"
  // Search & Filters
  | "filterBySector"
  | "employmentType"
  | "experienceLevel"
  | "minMonthlySalary"
  | "sortBy"
  | "latest"
  | "highestSalary"
  | "minSalary"
  | "noJobsFound"
  | "tryAdjustingFilters"
  | "filterJobs"
  | "resetAll"
  | "allTypes"
  | "allExperience"
  | "allSectors"
  | "sector"
  | "showingJobs"
  | "newestFirst"
  | "clearFilters"
  | "quickApply"
  | "exploreMoreOpenings"
  | "interviewScheduled"
  | "assessmentStage"
  | "offer"
  | "notSelected"
  | "billingGateways"
  // Applications
  | "myJobApplications"
  | "applicationsSubtitle"
  | "messageRecruiter"
  | "joinInterviewRoom"
  | "applicationId"
  // Auth & Navigation
  | "notifications"
  | "unread"
  | "markAllRead"
  | "noNotifications"
  | "signOut"
  | "switchToEmployer"
  | "switchToEmployee"
  | "switchToAdmin"
  | "register"
  | "welcomeBack"
  | "signInSubtitle"
  | "signInNow"
  | "createAccount"
  | "forgotPasswordQuestion"
  | "noAccountYet"
  | "registerNow"
  | "alreadyHaveAccount"
  | "joinAzmera"
  | "selectAccountType"
  | "lookingForJob"
  | "hiringTalent"
  | "continueBtn"
  | "backToSignIn"
  | "resetPassword"
  // Seeker Views
  | "totalApplied"
  | "activeCandidacies"
  | "hrScreening"
  | "passedQualifications"
  | "actionRequired"
  | "profileStrength"
  | "completeProfile"
  | "recommendedForYou"
  | "matchesYourSkills"
  | "seeAll"
  | "savedJobsTitle"
  | "noSavedJobs"
  | "findMoreJobs"
  | "noApplicationsFound"
  | "appliedOn"
  | "attachedCv"
  | "backToVacancies"
  | "roleOverview"
  | "keyResponsibilities"
  | "applyForPosition"
  | "applicationSubmitted"
  | "monthlyCompensation"
  | "applicationDeadline"
  | "applicantsSoFar"
  | "similarJobs"
  | "aboutMe"
  | "workExperience"
  | "educationCredentials"
  | "curriculumVitae"
  | "replaceCv"
  | "addSkill"
  // Employer Views
  | "employerDashboardTitle"
  | "postNewVacancy"
  | "totalActiveJobs"
  | "totalApplicants"
  | "interviewsScheduled"
  | "jobPerformanceOverview"
  | "recentApplications"
  | "viewAllApplicants"
  | "manageVacancies"
  | "allStatus"
  | "activeStatus"
  | "pausedStatus"
  | "closedStatus"
  | "applicantTracking"
  | "pipelineKanban"
  | "cardsGrid"
  | "talentSourcingTitle"
  | "talentPools"
  | "inviteToApply"
  | "interviewManagementTitle"
  | "companyProfileTitle"
  | "hrTeam"
  | "billingTitle"
  | "packagesTab"
  | "transactionsTab"
  | "gatewaysTab"
  // Admin Console
  | "commandCenterTitle"
  | "commandCenterSubtitle"
  | "superuserSession"
  | "totalSettledRevenue"
  | "activeJobPostings"
  | "employersEnterprises"
  | "talentPoolLabel"
  | "moderationKyc"
  | "financeGateways"
  | "trustSafety"
  | "telegramBroadcast"
  | "jobListingApprovals"
  | "enterpriseKyc"
  | "paymentLedger"
  | "talentPlacements"
  | "userGovernance"
  | "fraudDisputes"
  | "auditTrail"
  | "telegramSyndication"
  | "jumpToView"
  | "approveListing"
  | "revokeApproval"
  | "approvedLive"
  | "pendingVerification"
  | "viewReceipt"
  | "viewDocs"
  | "inspectProfile"
  | "suspendAccount"
  | "reinstateUser"
  | "sanctionEmployer"
  | "dismissReport"
  | "triggerBroadcast"
  // Landing Extra & Messages
  | "featuredVacancies"
  | "multiRegionalTitle"
  | "multiRegionalDesc"
  | "howItWorksTitle"
  | "howItWorksSubtitle"
  | "pricingTitle"
  | "pricingSubtitle"
  | "messagesTitle"
  | "typeMessage"
  | "sendBtn"
  | "nextStep"
  | "backBtn"
  | "submitApplication"
  | "withdrawApplication"
  | "confirmInterview"
  | "requestReschedule"
  | "saveAsDraft"
  | "editVacancy"
  | "updateVacancy"
  | "compareCandidates"
  | "jobAlerts"
  | "continueWithGoogle"
  | "verifyOtp"
  | "draftStatus"
  | "printResume"
  | "accountSettings"
  | "deactivateAccount"
  | "switchOrganization"
  | "chooseStandard"
  | "directApplyBadge"
  | "standardPlan"
  | "featuredPlan"
  | "vipPlan"
  | "mostPopular"
  | "officialCircular"
  | "switchSessionLabel"
  | "languagesFluency"
  | "expressModeLabel"
  | "advancedWordModeLabel"
  | "rolePresetsLabel";

type Translations = Record<LangCode, Record<TranslationKey, string>>;

export const translations: Translations = {
  en: {
    home: "Home",
    exploreJobs: "Browse Jobs",
    forEmployers: "For Employers",
    explore: "Explore",
    pricingPlans: "Pricing & Plans",
    howItWorks: "How It Works",
    telegramChannel: "Telegram Fast-Track",
    salaryGuide: "Salary Transparency",
    applications: "Applications",
    savedJobs: "Saved Jobs",
    myProfile: "My Profile & CV",
    dashboard: "Dashboard",
    manageJobs: "Manage Jobs",
    applicants: "Applicants",
    findTalent: "Find Talent",
    careerHub: "Career Hub",
    moreTools: "More Tools",
    messages: "Messages",
    interviews: "Interviews",
    companyProfile: "Company Profile",
    adminConsole: "Admin Console",
    jobApprovals: "Job Approvals",
    operations: "Operations",
    paymentAudit: "Payment Audit",
    verifiedEmployers: "Verified Employers",
    talentDirectory: "Talent Directory",
    signIn: "Sign In",
    getStarted: "Get Started",
    postJob: "Post a Job",
    searchPlaceholder: "Job title, skill or company…",
    allLocations: "All Locations (Ethiopia)",
    findJobs: "Find Jobs",
    applyNow: "Apply Now",
    saveJob: "Save Job",
    viewJob: "View Job",
    salary: "Salary",
    submitted: "Submitted",
    underReview: "Under Review",
    shortlisted: "Shortlisted",
    interview: "Interview",
    assessment: "Assessment",
    offerExtended: "Offer Extended",
    hired: "Hired 🎉",
    accepted: "Hired 🎉",
    rejected: "Not Selected",
    typeHere: "Type here…",
    coverLetter: "Cover Letter",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    saved: "Saved",
    edit: "Edit",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    about: "About",
    contact: "Contact",
    fullTime: "Full-time",
    partTime: "Part-time",
    contract: "Contract",
    remote: "Remote",
    hybrid: "Hybrid",
    onSite: "On-site",
    welcome: "Welcome",
    tagline: "YOUR TRUSTED PARTNER IN JOBS",
    entryLevel: "Entry Level",
    midLevel: "Mid Level",
    seniorLevel: "Senior Level",
    schedule: "Schedule Interview",
    shortlist: "Shortlist",
    reject: "Reject",
    viewProfile: "View Profile",
    downloadCV: "Download CV",
    publishJob: "Publish Job",
    previewJob: "Preview Job",
    jobTitle: "Job Title",
    category: "Category",
    description: "Description",
    responsibilities: "Responsibilities",
    qualifications: "Qualifications",
    deadline: "Deadline",
    currency: "ETB",
    verifiedEmployer: "Verified Employer",
    jobSeeker: "Job Seeker",
    employer: "Employer",
    administrator: "System Admin",
    activeSession: "Active Session",
    // Landing & Hero
    heroBadge: "#1 JOB PORTAL PLATFORM 2026 • ETHIOPIA",
    heroTitlePart1: "Find Your Dream Job",
    heroTitlePart2: "In Ethiopia",
    heroSubtitle: "Discover thousands of verified opportunities from top companies across every industry. Connecting talent with opportunity with transparent ETB salaries.",
    heroSearchPlaceholder: "Job title or keyword",
    heroLocationPlaceholder: "City or remote",
    allCategories: "All Categories",
    searchJobs: "Search Jobs",
    popular: "Popular:",
    activeJobs: "Active Jobs",
    companies: "Companies",
    jobSeekersCount: "Job Seekers",
    statVerifiedJobs: "Verified Jobs",
    statEmployers: "Employers",
    statTelegram: "Telegram Members",
    statMatchRate: "Match Rate",
    successRate: "Success Rate",
    trustedBy: "TRUSTED BY ETHIOPIA'S INDUSTRY LEADERS & GLOBAL DEVELOPMENT PARTNERS",
    recruitmentAdvantageTitle: "Why Top Ethiopian Employers & Talent Choose Azmera",
    recruitmentAdvantageSubtitle: "A purpose-built platform engineered to eliminate ghost jobs, accelerate candidate screening, and offer 100% salary transparency.",
    modernRecruitmentStandard: "THE MODERN RECRUITMENT STANDARD",
    directScreeningTitle: "Direct Agent Screening & Fast-Track Application",
    directScreeningDesc: "Skip the resume black hole. For direct customer orders (such as hospitality staff at Skylight, cashier ticketing in Mekelle, or restaurant hosts in 22 Mazoria), candidates apply directly to Azmera via Telegram (@AzmeraJobConnect) or direct phone, getting matched with hiring managers in under 48 hours.",
    zeroAgencyFee: "Zero agency fee for job seekers • Fast telephone screening",
    viewFastTrack: "View Fast-Track Openings",
    salaryTransparencyTitle: "Guaranteed ETB Salary Transparency",
    salaryTransparencyDesc: "Every vacancy mandates clear monthly compensation in ETB. No more hidden compensation or awkward final interviews.",
    wordCircularTitle: "Microsoft Word-Style Job Circulars",
    wordCircularDesc: "Employers author complete vacancies with rich headings, bullets, tables, flyer banners, and downloadable official PDF circulars.",
    downloadToR: "Downloadable Terms of Reference (ToR)",
    applyTelegram: "Apply on Telegram",
    postJobNavy: "Post a Job",
    verifiedOnly: "100% VERIFIED",
    jobMatchDesc: "Fast-track your job application directly with our talent matching team for vacancies in Addis Ababa, Mekelle, Hawassa, and nationwide.",
    popularCategoriesTitle: "Popular Job Categories",
    popularCategoriesSubtitle: "Explore opportunities across key Ethiopian economic and growth sectors.",
    latestOpportunities: "Latest Verified Opportunities",
    viewDetails: "View Details",
    apply: "Apply Now",
    telegramBannerTitle: "Join Ethiopia's Largest Job Network on Telegram",
    telegramBannerDesc: "Get instant vacancy circulars, interview invitations, and verified salary benchmarks delivered directly to your phone.",
    joinTelegramBtn: "Join @AzmeraJobConnect (95K+ Members)",
    // Search & Filters
    filterBySector: "Filter by Sector",
    employmentType: "Employment Type",
    experienceLevel: "Experience Level",
    minMonthlySalary: "Minimum Monthly Salary (ETB)",
    sortBy: "Sort by",
    latest: "Latest",
    highestSalary: "Highest Salary",
    minSalary: "Min. Salary (ETB/mo)",
    noJobsFound: "No jobs match your search criteria",
    tryAdjustingFilters: "Try adjusting your filters, location, or search keywords.",
    filterJobs: "Filter Jobs",
    resetAll: "Reset All",
    allTypes: "All Types",
    allExperience: "All Experience",
    allSectors: "All Sectors",
    sector: "Sector:",
    showingJobs: "verified jobs in Ethiopia",
    newestFirst: "Newest First",
    clearFilters: "Clear All Filters",
    quickApply: "Quick Apply",
    exploreMoreOpenings: "Explore More Openings",
    interviewScheduled: "Interview Scheduled",
    assessmentStage: "Assessment Stage",
    offer: "Offer Extended",
    notSelected: "Not Selected",
    billingGateways: "Billing & Plans",
    // Applications
    myJobApplications: "My Job Applications",
    applicationsSubtitle: "Monitor your application status, interview schedules, and employer offers in real-time.",
    messageRecruiter: "Message Recruiter 💬",
    joinInterviewRoom: "Join Interview Room 🎥",
    applicationId: "Application ID",
    // Auth & Navigation
    notifications: "Notifications",
    unread: "unread",
    markAllRead: "Mark all read",
    noNotifications: "No notifications yet.",
    signOut: "Sign Out",
    switchToEmployer: "Switch to Employer",
    switchToEmployee: "Switch to Employee",
    switchToAdmin: "Switch to Admin",
    register: "Register",
    welcomeBack: "Welcome Back",
    signInSubtitle: "Sign in to access your authenticated Azmera session",
    signInNow: "Sign In Now",
    createAccount: "Create Azmera Jobs Account",
    forgotPasswordQuestion: "Forgot Password?",
    noAccountYet: "Don't have an account?",
    registerNow: "Register Now",
    alreadyHaveAccount: "Already have an account?",
    joinAzmera: "Join Azmera Jobs",
    selectAccountType: "How do you plan to use Azmera Jobs?",
    lookingForJob: "I am looking for a job",
    hiringTalent: "I am hiring talent",
    continueBtn: "Continue",
    backToSignIn: "Back to Sign In",
    resetPassword: "Reset Password",
    // Seeker Views
    totalApplied: "Total Applied",
    activeCandidacies: "Active candidacies",
    hrScreening: "HR Screening phase",
    passedQualifications: "Passed qualifications",
    actionRequired: "Action required",
    profileStrength: "Profile Strength",
    completeProfile: "Complete Profile",
    recommendedForYou: "Recommended Vacancies For You",
    matchesYourSkills: "Matches your skills",
    seeAll: "See All",
    savedJobsTitle: "Saved Jobs",
    noSavedJobs: "No saved jobs yet",
    findMoreJobs: "Find More Jobs",
    noApplicationsFound: "No applications in this category",
    appliedOn: "Applied on",
    attachedCv: "Attached CV",
    backToVacancies: "Back to Vacancies",
    roleOverview: "Role Overview",
    keyResponsibilities: "Key Responsibilities",
    applyForPosition: "Apply for Position",
    applicationSubmitted: "Application Submitted",
    monthlyCompensation: "Monthly Compensation",
    applicationDeadline: "Application Deadline",
    applicantsSoFar: "Applicants So Far",
    similarJobs: "Similar Vacancies",
    aboutMe: "About Me",
    workExperience: "Work Experience",
    educationCredentials: "Education & Credentials",
    curriculumVitae: "Curriculum Vitae (CV)",
    replaceCv: "Upload / Replace CV",
    addSkill: "Add Skill",
    // Employer Views
    employerDashboardTitle: "Recruitment Command Center",
    postNewVacancy: "Post New Vacancy",
    totalActiveJobs: "Total Active Jobs",
    totalApplicants: "Total Applicants",
    interviewsScheduled: "Interviews Scheduled",
    jobPerformanceOverview: "Job Performance Overview",
    recentApplications: "Recent Candidate Applications",
    viewAllApplicants: "View All Applicants",
    manageVacancies: "Manage Vacancies",
    allStatus: "All",
    activeStatus: "Active",
    pausedStatus: "Paused",
    closedStatus: "Closed",
    applicantTracking: "Applicant Tracking & Recruitment Pipeline",
    pipelineKanban: "Pipeline Kanban",
    cardsGrid: "Cards Grid",
    talentSourcingTitle: "Talent Discovery & Sourcing",
    talentPools: "Talent Pools",
    inviteToApply: "Invite to Apply",
    interviewManagementTitle: "Interview Management & Coordination",
    companyProfileTitle: "Company Profile & HR Workspace",
    hrTeam: "HR Team & Permissions",
    billingTitle: "Recruiter Billing & Payment Gateway",
    packagesTab: "Vacancy Packages",
    transactionsTab: "Payment Ledger",
    gatewaysTab: "Ethiopian Gateways",
    // Admin Console
    commandCenterTitle: "Azmera Jobs Central Command Center",
    commandCenterSubtitle: "Platform administration, job integrity moderation, user governance, and Ethiopian payment settlements (Telebirr, CBE Bank, M-Pesa).",
    superuserSession: "Superuser Root Session",
    totalSettledRevenue: "Total Settled Revenue",
    activeJobPostings: "Active Job Postings",
    employersEnterprises: "Employers & Enterprises",
    talentPoolLabel: "Talent Pool (Employees)",
    moderationKyc: "Moderation & KYC",
    financeGateways: "Finance & Gateways",
    trustSafety: "Trust & Safety",
    telegramBroadcast: "Telegram Broadcast",
    jobListingApprovals: "Job Listing Approvals",
    enterpriseKyc: "Enterprise KYC Verification",
    paymentLedger: "Telebirr / CBE / M-Pesa Ledger",
    talentPlacements: "Talent Placement Commissions",
    userGovernance: "User Governance & Ban Control",
    fraudDisputes: "Fraud Reports & Disputes",
    auditTrail: "Platform Security Audit Trail",
    telegramSyndication: "Telegram Bot Syndication",
    jumpToView: "Jump to View:",
    approveListing: "Approve Listing",
    revokeApproval: "Revoke Approval",
    approvedLive: "Approved & Live",
    pendingVerification: "Pending Verification",
    viewReceipt: "View Receipt",
    viewDocs: "View Docs",
    inspectProfile: "Inspect Profile",
    suspendAccount: "Suspend Account",
    reinstateUser: "Reinstate User",
    sanctionEmployer: "Sanction Employer",
    dismissReport: "Dismiss Report",
    triggerBroadcast: "Trigger Live Telegram Broadcast Now",
    // Landing Extra & Messages
    featuredVacancies: "Featured Vacancies in Ethiopia",
    multiRegionalTitle: "Multi-Regional Coverage & Local Languages",
    multiRegionalDesc: "Active employment pipelines serving Addis Ababa (Bole, Kazanchis, Summit 72), Mekelle (Tigray), Hawassa, and Dire Dawa with complete multilingual support in English, Amharic, Afaan Oromo, and Tigrigna.",
    howItWorksTitle: "How Azmera Jobs Works",
    howItWorksSubtitle: "Connecting verified Ethiopian employers with qualified candidates in 3 simple steps.",
    pricingTitle: "Transparent Ethiopian Payment Gateways & Pricing",
    pricingSubtitle: "Pay securely in Ethiopian Birr (ETB) via Telebirr, Commercial Bank of Ethiopia (CBE), or M-Pesa.",
    messagesTitle: "Direct Messages & Interviews",
    typeMessage: "Type your message here...",
    sendBtn: "Send",
    nextStep: "Next Step",
    backBtn: "Back",
    submitApplication: "Submit Application",
    withdrawApplication: "Withdraw",
    confirmInterview: "Confirm Interview",
    requestReschedule: "Request Reschedule",
    saveAsDraft: "Save as Draft",
    editVacancy: "Edit Vacancy",
    updateVacancy: "Save Changes",
    compareCandidates: "Compare Selected",
    jobAlerts: "Job Alerts",
    continueWithGoogle: "Continue with Google",
    verifyOtp: "Verify Phone OTP",
    draftStatus: "Draft",
    printResume: "Download / Print PDF CV",
    accountSettings: "Account Settings",
    deactivateAccount: "Deactivate Account",
    switchOrganization: "Organization",
    chooseStandard: "Choose Standard (500 ETB)",
    directApplyBadge: "Direct Fast-Track Apply",
    standardPlan: "Standard Listing",
    featuredPlan: "Featured Vacancy",
    vipPlan: "Mega Broadcast & Hiring",
    mostPopular: "Most Popular",
    officialCircular: "Official Vacancy Circular Flyer",
    switchSessionLabel: "Switch Session",
    languagesFluency: "Languages & Fluency",
    expressModeLabel: "60-Second Express Mode",
    advancedWordModeLabel: "Advanced Word Circular & ToR",
    rolePresetsLabel: "1-Click Role Presets",
  },
  am: {
    home: "መነሻ",
    exploreJobs: "ሥራዎችን ፈልግ",
    forEmployers: "ለቀጣሪዎች",
    explore: "አስስ",
    pricingPlans: "ዋጋ እና እቅዶች",
    howItWorks: "እንዴት እንደሚሰራ",
    telegramChannel: "የቴሌግራም ቻናል",
    salaryGuide: "የደሞዝ ግልጽነት መረጃ",
    applications: "ማመልከቻዎቼ",
    savedJobs: "የተቀመጡ ሥራዎች",
    myProfile: "መገለጫዬ እና ሲቪ",
    dashboard: "ዳሽቦርድ",
    manageJobs: "ሥራዎችን ያስተዳድሩ",
    applicants: "አመልካቾች",
    findTalent: "ባለሙያዎችን ፈልግ",
    careerHub: "የሥራ ማዕከል",
    moreTools: "ተጨማሪ መሣሪያዎች",
    messages: "መልእክቶች",
    interviews: "ቃለ-ምልልሶች",
    companyProfile: "የድርጅቱ መገለጫ",
    adminConsole: "የአስተዳዳሪ ማዕከል",
    jobApprovals: "የሥራ ማረጋገጫ",
    operations: "አስተዳደር",
    paymentAudit: "የክፍያ ኦዲት",
    verifiedEmployers: "የተረጋገጡ ቀጣሪዎች",
    talentDirectory: "የባለሙያዎች ማውጫ",
    signIn: "ግባ",
    getStarted: "ጀምር",
    postJob: "ክፍት ሥራ ያስታውቁ",
    searchPlaceholder: "የሥራ ርዕስ፣ ክህሎት ወይም ድርጅት…",
    allLocations: "ሁሉም የኢትዮጵያ ከተሞች",
    findJobs: "ሥራ ፈልግ",
    applyNow: "አሁን አመልክት",
    saveJob: "ሥራ አስቀምጥ",
    viewJob: "ሥራ ተመልከት",
    salary: "ደሞዝ",
    submitted: "ቀርቧል",
    underReview: "በግምገማ ላይ",
    shortlisted: "ተመርጧል",
    interview: "ቃለ-ምልልስ",
    assessment: "የክህሎት ምዘና",
    offerExtended: "የቅጥር ጥያቄ ቀርቧል",
    hired: "ተቀጥሯል 🎉",
    accepted: "ተቀጥሯል 🎉",
    rejected: "አልተመረጠም",
    typeHere: "እዚህ ይጻፉ…",
    coverLetter: "የሽፋን ደብዳቤ",
    submit: "አስገባ",
    cancel: "ሰርዝ",
    save: "አስቀምጥ",
    saved: "ተቀምጧል",
    edit: "አርትዕ",
    skills: "ክህሎቶች",
    experience: "የሥራ ልምድ",
    education: "የትምህርት ደረጃ",
    about: "ስለ ድርጅቱ",
    contact: "አድራሻ",
    fullTime: "ሙሉ ጊዜ",
    partTime: "የትርፍ ጊዜ",
    contract: "በኮንትራት",
    remote: "የርቀት ሥራ",
    hybrid: "ቅይጥ (ድብልቅ)",
    onSite: "በቢሮ የሚሰራ",
    welcome: "እንኳን ደህና መጡ",
    tagline: "በሥራ ፍለጋ አስተማማኝ አጋርዎ",
    entryLevel: "ጀማሪ ባለሙያ",
    midLevel: "መካከለኛ ባለሙያ",
    seniorLevel: "ከፍተኛ ባለሙያ",
    schedule: "ቃለ-ምልልስ ይያዙ",
    shortlist: "እጩ ዝርዝር ውስጥ አስገባ",
    reject: "ውድቅ አድርግ",
    viewProfile: "መገለጫ ይመልከቱ",
    downloadCV: "ሲቪ ያውርዱ",
    publishJob: "ሥራ ያውጡ",
    previewJob: "ቅድመ እይታ",
    jobTitle: "የሥራ መደብ",
    category: "የሥራ ዘርፍ",
    description: "የሥራ ዝርዝር መግለጫ",
    responsibilities: "ዋና ኃላፊነቶች",
    qualifications: "ተፈላጊ ችሎታዎች",
    deadline: "የማመልከቻ ማብቂያ ቀን",
    currency: "ብር (ETB)",
    verifiedEmployer: "የተረጋገጠ ቀጣሪ",
    jobSeeker: "ሥራ ፈላጊ",
    employer: "ቀጣሪ ድርጅት",
    administrator: "ሲስተም አስተዳዳሪ",
    activeSession: "ንቁ አካውንት",
    // Landing & Hero
    heroBadge: "የኢትዮጵያ ቀዳሚ የሥራ መድረክ 2026",
    heroTitlePart1: "ህልምዎን የሚመስል ሥራ",
    heroTitlePart2: "በኢትዮጵያ ያግኙ",
    heroSubtitle: "በሁሉም የሥራ ዘርፎች ከተረጋገጡ ታላላቅ ድርጅቶች በሺዎች የሚቆጠሩ ክፍት የሥራ ቦታዎችን በግልጽ የብር ደሞዝ ያግኙ።",
    heroSearchPlaceholder: "የሥራ መደብ ወይም ክህሎት",
    heroLocationPlaceholder: "ከተማ ወይም የርቀት",
    allCategories: "ሁሉም የሥራ ዘርፎች",
    searchJobs: "ሥራዎችን ፈልግ",
    popular: "ተፈላጊዎች:",
    activeJobs: "ንቁ ክፍት ሥራዎች",
    companies: "ቀጣሪ ድርጅቶች",
    jobSeekersCount: "ሥራ ፈላጊዎች",
    statVerifiedJobs: "የተረጋገጡ ሥራዎች",
    statEmployers: "ቀጣሪ ድርጅቶች",
    statTelegram: "የቴሌግራም አባላት",
    statMatchRate: "የቅጥር ስኬት",
    successRate: "የቅጥር ስኬት",
    trustedBy: "በኢትዮጵያ ቀዳሚ ድርጅቶች እና ዓለም አቀፍ አጋሮች የታመነ",
    recruitmentAdvantageTitle: "ቀዳሚ ቀጣሪዎች እና ባለሙያዎች ለምን አዝመራን ይመርጣሉ?",
    recruitmentAdvantageSubtitle: "የሐሰት ማስታወቂያዎችን ለማስቀረት፣ ፈጣን እጩ ማጣሪያ እና 100% የደሞዝ ግልጽነት ለማረጋገጥ የተዘጋጀ ዘመናዊ መድረክ።",
    modernRecruitmentStandard: "ዘመናዊው የቅጥር መሥፈርት",
    directScreeningTitle: "በአዝመራ ባለሙያዎች ፈጣን ማጣሪያ እና ቀጥታ ማመልከቻ",
    directScreeningDesc: "የሲቪ ጥበቃን ያስቀሩ። ለቀጥታ የሆስፒታሊቲ፣ የጥሪ ማዕከል እና የቢሮ ሥራዎች በቀጥታ በቴሌግራም ወይም በስልክ ያመልክቱ፤ በ48 ሰዓት ውስጥ ከቀጣሪዎች ጋር ይገናኙ።",
    zeroAgencyFee: "ለሥራ ፈላጊዎች ዜሮ የአገልግሎት ክፍያ • ፈጣን የስልክ ማጣሪያ",
    viewFastTrack: "የፈጣን ማመልከቻ ክፍት ቦታዎች",
    salaryTransparencyTitle: "100% የተረጋገጠ የብር ደሞዝ ግልጽነት",
    salaryTransparencyDesc: "እያንዳንዱ የሥራ ማስታወቂያ ግልጽ ወርሃዊ ደሞዝ በብር ያካትታል። የተደበቀ ደሞዝ ወይም አሳሳች መረጃ አይኖርም።",
    wordCircularTitle: "እንደ ዎርድ የተሟላ ይዘት ያላቸው የሥራ ማስታወቂያዎች",
    wordCircularDesc: "ቀጣሪዎች ዝርዝር መግለጫዎችን፣ የኃላፊነት ዝርዝርን፣ ሠንጠረዦችን እና የሚወርዱ ፒዲኤፍ ማስታወቂያዎችን ያሳትማሉ።",
    downloadToR: "የሥራ ዝርዝር መመሪያ (ToR) ያውርዱ",
    applyTelegram: "በቴሌግራም አመልክት",
    postJobNavy: "ክፍት ሥራ ያስታውቁ",
    verifiedOnly: "100% የተረጋገጠ",
    jobMatchDesc: "በአዲስ አበባ፣ በመቀሌ፣ በሐዋሳ እና በመላው ኢትዮጵያ ካሉ ክፍት የሥራ ቦታዎች ጋር በፍጥነት ይገናኙ።",
    popularCategoriesTitle: "ተፈላጊ የሥራ ዘርፎች",
    popularCategoriesSubtitle: "በዋና ዋና የኢትዮጵያ የኢኮኖሚ እና የዕድገት ዘርፎች ውስጥ ያሉ ክፍት ቦታዎችን ያስሱ።",
    latestOpportunities: "የቅርብ ጊዜ የተረጋገጡ ክፍት የሥራ ቦታዎች",
    viewDetails: "ዝርዝሩን ይመልከቱ",
    apply: "አሁን አመልክት",
    telegramBannerTitle: "በቴሌግራም የኢትዮጵያ ትልቁን የሥራ ማህበረሰብ ይቀላቀሉ",
    telegramBannerDesc: "አዳዲስ የሥራ ማስታወቂያዎችን፣ የቃለ-መጠይቅ ጥሪዎችን እና የደሞዝ መረጃዎችን በቀጥታ በስልክዎ ያግኙ።",
    joinTelegramBtn: "@AzmeraJobConnect ይቀላቀሉ (95K+ አባላት)",
    // Search & Filters
    filterBySector: "በሥራ ዘርፍ ለይ",
    employmentType: "የቅጥር ሁኔታ",
    experienceLevel: "የሥራ ልምድ ደረጃ",
    minMonthlySalary: "ዝቅተኛ ወርሃዊ ደሞዝ (ብር)",
    sortBy: "ቅደም ተከተል",
    latest: "አዲስ የወጡ",
    highestSalary: "ከፍተኛ ደሞዝ",
    minSalary: "ዝቅተኛ ደሞዝ (ETB/ወር)",
    noJobsFound: "ምንም የተገኘ ክፍት ሥራ የለም",
    tryAdjustingFilters: "እባክዎን ማጣሪያዎችን፣ ከተማን ወይም የፍለጋ ቃላትን ቀይረው ይሞክሩ።",
    filterJobs: "ሥራዎችን ለይ",
    resetAll: "ሁሉንም አጽዳ",
    allTypes: "ሁሉም ዓይነቶች",
    allExperience: "ሁሉም የልምድ ደረጃዎች",
    allSectors: "ሁሉም ዘርፎች",
    sector: "የሥራ ዘርፍ:",
    showingJobs: "የተረጋገጡ ክፍት ሥራዎች በኢትዮጵያ",
    newestFirst: "አዲስ የወጡ",
    clearFilters: "ሁሉንም ማጣሪያዎች አጽዳ",
    quickApply: "ፈጣን ማመልከቻ",
    exploreMoreOpenings: "ተጨማሪ ክፍት ሥራዎችን ፈልግ",
    interviewScheduled: "ቃለ-ምልልስ ተይዟል",
    assessmentStage: "የክህሎት ምዘና ደረጃ",
    offer: "የቅጥር ጥያቄ ቀርቧል",
    notSelected: "አልተመረጠም",
    billingGateways: "ክፍያ እና እቅዶች",
    // Applications
    myJobApplications: "የሥራ ማመልከቻዎቼ",
    applicationsSubtitle: "የማመልከቻ ሁኔታዎን፣ የቃለ-መጠይቅ ቀጠሮዎችን እና የቅጥር ውጤቶችን በቀጥታ ይከታተሉ።",
    messageRecruiter: "ለቀጣሪው መልእክት ላክ 💬",
    joinInterviewRoom: "የቃለ-መጠይቅ ክፍሉን ተቀላቀሉ 🎥",
    applicationId: "የማመልከቻ መለያ ቁጥር",
    // Auth & Navigation
    notifications: "ማሳወቂያዎች",
    unread: "ያልተነበቡ",
    markAllRead: "ሁሉንም እንደተነበበ ምልክት አድርግ",
    noNotifications: "እስካሁን ምንም ማሳወቂያ የለም።",
    signOut: "ውጣ",
    switchToEmployer: "ወደ ቀጣሪ ቀይር",
    switchToEmployee: "ወደ ሥራ ፈላጊ ቀይር",
    switchToAdmin: "ወደ አስተዳዳሪ ቀይር",
    register: "ተመዝገብ",
    welcomeBack: "እንኳን በደህና ተመለሱ",
    signInSubtitle: "ወደ አዝመራ አካውንትዎ ለመግባት መረጃዎን ያስገቡ",
    signInNow: "አሁን ግባ",
    createAccount: "የአዝመራ ጆብስ አካውንት ይፍጠሩ",
    forgotPasswordQuestion: "የይለፍ ቃል ረሱ?",
    noAccountYet: "አካውንት የለዎትም?",
    registerNow: "አሁን ይመዝገቡ",
    alreadyHaveAccount: "ቀደም ሲል አካውንት አለዎት?",
    joinAzmera: "አዝመራ ጆብስን ይቀላቀሉ",
    selectAccountType: "አዝመራ ጆብስን እንዴት መጠቀም ይፈልጋሉ?",
    lookingForJob: "ሥራ እየፈለግሁ ነው",
    hiringTalent: "ባለሙያዎችን እየቀጠርኩ ነው",
    continueBtn: "ቀጥል",
    backToSignIn: "ወደ መግቢያ ተመለስ",
    resetPassword: "የይለፍ ቃል ዳግም አስጀምር",
    // Seeker Views
    totalApplied: "ጠቅላላ ማመልከቻዎች",
    activeCandidacies: "ንቁ ማመልከቻዎች",
    hrScreening: "የHR ማጣሪያ ደረጃ",
    passedQualifications: "መስፈርቱን አልፈዋል",
    actionRequired: "ትኩረት ያስፈልጋል",
    profileStrength: "የመገለጫ ጥንካሬ",
    completeProfile: "መገለጫን ያጠናቅቁ",
    recommendedForYou: "ለእርስዎ የተመረጡ ክፍት ሥራዎች",
    matchesYourSkills: "ከክህሎትዎ ጋር የሚመሳሰሉ",
    seeAll: "ሁሉንም ይመልከቱ",
    savedJobsTitle: "የተቀመጡ ሥራዎች",
    noSavedJobs: "እስካሁን የተቀመጠ ሥራ የለም",
    findMoreJobs: "ተጨማሪ ሥራዎችን ፈልግ",
    noApplicationsFound: "በዚህ ምድብ ውስጥ ማመልከቻ የለም",
    appliedOn: "የተመለከተበት ቀን",
    attachedCv: "የተያያዘ ሲቪ",
    backToVacancies: "ወደ ክፍት ሥራዎች ተመለስ",
    roleOverview: "የሥራው ዝርዝር መግለጫ",
    keyResponsibilities: "ዋና ዋና ኃላፊነቶች",
    applyForPosition: "ለዚህ ሥራ ያመልክቱ",
    applicationSubmitted: "ማመልከቻዎ ቀርቧል",
    monthlyCompensation: "ወርሃዊ ደሞዝ",
    applicationDeadline: "የማመልከቻ ማብቂያ ቀን",
    applicantsSoFar: "እስካሁን ያመለከቱ",
    similarJobs: "ተመሳሳይ ክፍት ሥራዎች",
    aboutMe: "ስለ እኔ",
    workExperience: "የሥራ ልምድ",
    educationCredentials: "ትምህርት እና ማስረጃዎች",
    curriculumVitae: "ሲቪ (Curriculum Vitae)",
    replaceCv: "ሲቪ ይጫኑ / ይቀይሩ",
    addSkill: "ክህሎት ጨምር",
    // Employer Views
    employerDashboardTitle: "የቅጥር አስተዳደር ማዕከል",
    postNewVacancy: "አዲስ ክፍት ሥራ ያውጡ",
    totalActiveJobs: "ንቁ ክፍት ሥራዎች",
    totalApplicants: "ጠቅላላ አመልካቾች",
    interviewsScheduled: "የተያዙ ቃለ-ምልልሶች",
    jobPerformanceOverview: "የሥራ ማስታወቂያዎች አፈጻጸም",
    recentApplications: "የቅርብ ጊዜ የእጩዎች ማመልከቻዎች",
    viewAllApplicants: "ሁሉንም አመልካቾች ይመልከቱ",
    manageVacancies: "ክፍት ሥራዎችን ያስተዳድሩ",
    allStatus: "ሁሉም",
    activeStatus: "ንቁ",
    pausedStatus: "የቆመ",
    closedStatus: "የተዘጋ",
    applicantTracking: "የአመልካቾች ክትትል እና የቅጥር ሂደት",
    pipelineKanban: "የሂደት ሰሌዳ (Kanban)",
    cardsGrid: "በካርድ ዝርዝር",
    talentSourcingTitle: "የባለሙያዎች ፍለጋ እና መረጣ",
    talentPools: "የባለሙያዎች ስብስብ",
    inviteToApply: "እንዲያመለክቱ ይጋብዙ",
    interviewManagementTitle: "የቃለ-ምልልስ አስተዳደር እና ቅንጅት",
    companyProfileTitle: "የድርጅቱ መገለጫ እና የHR ቡድን",
    hrTeam: "የHR ቡድን እና ፈቃዶች",
    billingTitle: "የቀጣሪ ክፍያ እና የክፍያ መንገዶች",
    packagesTab: "የማስታወቂያ ጥቅሎች",
    transactionsTab: "የክፍያ ዝርዝር",
    gatewaysTab: "የኢትዮጵያ ክፍያ መንገዶች",
    // Admin Console
    commandCenterTitle: "የአዝመራ ጆብስ ማዕከላዊ የቁጥጥር ማዕከል",
    commandCenterSubtitle: "የመድረኩ አስተዳደር፣ የሥራ ማስታወቂያዎች ማረጋገጫ፣ የተጠቃሚዎች ቁጥጥር እና የኢትዮጵያ ክፍያዎች (ቴሌብር፣ ንግድ ባንክ፣ M-Pesa)።",
    superuserSession: "ዋና አስተዳዳሪ (Root)",
    totalSettledRevenue: "ጠቅላላ የተሰበሰበ ገቢ",
    activeJobPostings: "ንቁ የሥራ ማስታወቂያዎች",
    employersEnterprises: "ቀጣሪ ድርጅቶች",
    talentPoolLabel: "የባለሙያዎች ቋት",
    moderationKyc: "ማረጋገጫ እና KYC",
    financeGateways: "ፋይናንስ እና ክፍያዎች",
    trustSafety: "ደህንነት እና እምነት",
    telegramBroadcast: "የቴሌግራም ስርጭት",
    jobListingApprovals: "የሥራ ማስታወቂያዎች ማጽደቂያ",
    enterpriseKyc: "የድርጅቶች KYC ማረጋገጫ",
    paymentLedger: "የቴሌብር / CBE / M-Pesa መዝገብ",
    talentPlacements: "የባለሙያ ቅጥር ኮሚሽኖች",
    userGovernance: "የተጠቃሚዎች አስተዳደር እና እገዳ",
    fraudDisputes: "የማጭበርበር ሪፖርቶች እና ቅሬታዎች",
    auditTrail: "የመድረክ ደህንነት ኦዲት መዝገብ",
    telegramSyndication: "የቴሌግራም ቦት ስርጭት",
    jumpToView: "ወደ ገጽ ዝለል:",
    approveListing: "ማስታወቂያ አጽድቅ",
    revokeApproval: "ፈቃድ አንሳ",
    approvedLive: "ጸድቆ በመታየት ላይ",
    pendingVerification: "ማረጋገጫ በመጠባበቅ ላይ",
    viewReceipt: "ደረሰኝ ይመልከቱ",
    viewDocs: "ሰነዶችን ይመልከቱ",
    inspectProfile: "መገለጫ መርምር",
    suspendAccount: "አካውንት አግድ",
    reinstateUser: "ተጠቃሚውን መልስ",
    sanctionEmployer: "ቀጣሪውን ቅጣ",
    dismissReport: "ሪፖርቱን ዝጋ",
    triggerBroadcast: "አሁኑኑ በቴሌግራም አሰራጭ",
    // Landing Extra & Messages
    featuredVacancies: "በኢትዮጵያ የተመረጡ ክፍት ሥራዎች",
    multiRegionalTitle: "በመላው ኢትዮጵያ እና በሀገር ውስጥ ቋንቋዎች",
    multiRegionalDesc: "በአዲስ አበባ (ቦሌ፣ ካዛንቺስ፣ ሰሚት 72)፣ በመቀሌ፣ በሐዋሳ እና በድሬዳዋ በአማርኛ፣ በኦሮምኛ፣ በትግርኛ እና በእንግሊዝኛ ሙሉ አገልግሎት እንሰጣለን።",
    howItWorksTitle: "አዝመራ ጆብስ እንዴት ይሰራል?",
    howItWorksSubtitle: "የተረጋገጡ የኢትዮጵያ ቀጣሪዎችን እና ብቁ ባለሙያዎችን በ3 ቀላል ደረጃዎች ያገናኛል።",
    pricingTitle: "ግልጽ የኢትዮጵያ ክፍያ መንገዶች እና ዋጋዎች",
    pricingSubtitle: "በቴሌብር፣ በኢትዮጵያ ንግድ ባንክ (CBE) ወይም በM-Pesa በብር በቀላሉ ይክፈሉ።",
    messagesTitle: "ቀጥታ መልእክቶች እና ቃለ-ምልልሶች",
    typeMessage: "መልእክትዎን እዚህ ይጻፉ...",
    sendBtn: "ላክ",
    nextStep: "ቀጣይ ደረጃ",
    backBtn: "ተመለስ",
    submitApplication: "ማመልከቻ ላክ",
    withdrawApplication: "ማመልከቻ ሰርዝ",
    confirmInterview: "ቃለ-ምልልስ አረጋግጥ",
    requestReschedule: "ቀጠሮ ይቀየር",
    saveAsDraft: "እንደ ረቂቅ አስቀምጥ",
    editVacancy: "ማስታወቂያ አርትዕ",
    updateVacancy: "ለውጦችን አስቀምጥ",
    compareCandidates: "እጩዎችን አነጻጽር",
    jobAlerts: "የሥራ ማሳወቂያዎች",
    continueWithGoogle: "በGoogle ይቀጥሉ",
    verifyOtp: "የስልክ OTP ያረጋግጡ",
    draftStatus: "ረቂቅ",
    printResume: "ሲቪ በPDF አውርድ / አትም",
    accountSettings: "የአካውንት ቅንብሮች",
    deactivateAccount: "አካውንት አቦዝን",
    switchOrganization: "ድርጅት",
    chooseStandard: "መደበኛውን ይምረጡ (500 ETB)",
    directApplyBadge: "ቀጥታ ፈጣን ማመልከቻ",
    standardPlan: "መደበኛ ማስታወቂያ",
    featuredPlan: "ተለይቶ የቀረበ የሥራ ማስታወቂያ",
    vipPlan: "ሜጋ ብሮድካስት እና ቅጥር",
    mostPopular: "በጣም ተፈላጊ",
    officialCircular: "ይፋዊ የሥራ ማስታወቂያ ሰነድ",
    switchSessionLabel: "ማንነት መቀያየሪያ",
    languagesFluency: "ቋንቋዎች እና ችሎታ",
    expressModeLabel: "በ60 ሰከንድ ፈጣን ቅጽ",
    advancedWordModeLabel: "ዝርዝር የዎርድ ማስታወቂያ እና ToR",
    rolePresetsLabel: "በ1 ጠቅታ ዝግጁ የሥራ ዓይነቶች",
  },
  om: {
    home: "Mana",
    exploreJobs: "Hojiiwwan Barbaadi",
    forEmployers: "Qacartootaaf",
    explore: "Qoradhu",
    pricingPlans: "Gatii fi Karoora",
    howItWorks: "Akkaataa Hojjetu",
    telegramChannel: "Chaanaalii Telegiraamii",
    salaryGuide: "Odeeffannoo Mindaa",
    applications: "Gaaffilee Hojii Koo",
    savedJobs: "Hojiiwwan Qusataman",
    myProfile: "Profaayilii fi CV Koo",
    dashboard: "Daashboordii",
    manageJobs: "Hojiiwwan Bulchi",
    applicants: "Gaafattoota Hojii",
    findTalent: "Ogeessota Barbaadi",
    careerHub: "Wiirtuu Hojii",
    moreTools: "Meeshaalee Dabalataa",
    messages: "Ergaawwan",
    interviews: "Interiviyuuwwan",
    companyProfile: "Profaayilii Dhaabbata",
    adminConsole: "Wiirtuu Bulchiinsaa",
    jobApprovals: "Mirkaneessa Hojii",
    operations: "Hojimaata",
    paymentAudit: "Oodiitii Kaffaltii",
    verifiedEmployers: "Qacartoota Mirkanaa'an",
    talentDirectory: "Galmee Ogeessotaa",
    signIn: "Seeni",
    getStarted: "Jalqabi",
    postJob: "Hojii Maxxansi",
    searchPlaceholder: "Maqaa hojii, dandeettii yookiin dhaabbata…",
    allLocations: "Magaalota Itiyoophiyaa Hunda",
    findJobs: "Hojii Barbaadi",
    applyNow: "Amma Gaafadhu",
    saveJob: "Hojii Qusadhu",
    viewJob: "Hojii Ilaali",
    salary: "Mindaa",
    submitted: "Dhiyaateera",
    underReview: "Sakatta'amu irratti",
    shortlisted: "Filatameera",
    interview: "Interiviyuu",
    assessment: "Madaallii Dandeettii",
    offerExtended: "Waliigalteen Dhiyaateera",
    hired: "Qacarameera 🎉",
    accepted: "Qacarameera 🎉",
    rejected: "Hin filatamne",
    typeHere: "Asitti barreessi…",
    coverLetter: "Xalayaa Iyyannoo",
    submit: "Galchi",
    cancel: "Dhiisi",
    save: "Qusadhu",
    saved: "Qusatameera",
    edit: "Gulaali",
    skills: "Dandeettiwwan",
    experience: "Muuxannoo Hojii",
    education: "Sadarkaa Barnootaa",
    about: "Waa'ee Dhaabbataa",
    contact: "Teessoo Quunnamtii",
    fullTime: "Yeroo Guutuu",
    partTime: "Yeroo Murtaa'aa",
    contract: "Waliigalteen",
    remote: "Fageenya Irraa",
    hybrid: "Makaa (Hybrid)",
    onSite: "Waajjira Keessatti",
    welcome: "Baga Nagaan Dhuftan",
    tagline: "HOJII KEESSATTI HIRIYYAA KEESSAN AMANAMAA",
    entryLevel: "Sadarkaa Jalqabaa",
    midLevel: "Sadarkaa Giddu-galeessaa",
    seniorLevel: "Sadarkaa Olaanaa",
    schedule: "Interiviyuu Qindeessi",
    shortlist: "Tarree Filatamtootaa",
    reject: "Kuffisi",
    viewProfile: "Profaayilii Ilaali",
    downloadCV: "CV Buufadhu",
    publishJob: "Hojii Maxxansi",
    previewJob: "Dursii Ilaali",
    jobTitle: "Gosa Hojii",
    category: "Damee Hojii",
    description: "Ibsa Bal'aa Hojii",
    responsibilities: "Itti-gaafatamummaa",
    qualifications: "Ulaagaalee Barbaadaman",
    deadline: "Guyyaa Xumuraa",
    currency: "Birrii (ETB)",
    verifiedEmployer: "Qacaraa Mirkanaa'e",
    jobSeeker: "Hojii Barbaadaa",
    employer: "Dhaabbata Qacaraa",
    administrator: "Bulchaa Sirnaa",
    activeSession: "Akkaawuntii Hojjetu",
    // Landing & Hero
    heroBadge: "PLATFOORMIIN HOJII QAXALEE 2026 • ITIYOOPHIYAA",
    heroTitlePart1: "Hojii Abjuu Keessanii",
    heroTitlePart2: "Itiyoophiyaa Keessatti Argadhaa",
    heroSubtitle: "Dhaabbilee gurguddoo hunda irraa carraawwan mirkanaa'an kumaatamaan lakkaa'aman mindaa Birrii ifa ta'een argadhaa.",
    heroSearchPlaceholder: "Maqaa hojii ykn jecha ijoo",
    heroLocationPlaceholder: "Magaalaa ykn fageenya irraa",
    allCategories: "Kutaalee Hunda",
    searchJobs: "Hojiiwwan Barbaadi",
    popular: "Jaallatamo:",
    activeJobs: "Hojiiwwan Hojjetan",
    companies: "Dhaabbilee Qacartootaa",
    jobSeekersCount: "Hojii Barbaaddota",
    statVerifiedJobs: "Hojiiwwan Mirkanaa'an",
    statEmployers: "Dhaabbilee Qacartootaa",
    statTelegram: "Miseensota Telegiraamii",
    statMatchRate: "Milkaa'ina Qacarii",
    successRate: "Milkaa'ina Qacarii",
    trustedBy: "DHAABBILEE GURGUDDOO ITIYOOPHIYAA FI DEEGGARTTOOTA IDIL-ADDUNYAATIIN KAN AMANAME",
    recruitmentAdvantageTitle: "Maaliif Qacartonni fi Ogeessonni Azmeraa Filatu?",
    recruitmentAdvantageSubtitle: "Beeksisa sobaa dhabamsiisuuf, sakatta'a ariifachiisaa fi mindaa 100% ifa ta'e dhiyeessuuf kan tolfame.",
    modernRecruitmentStandard: "ULAAGAA QACARII AMMAYYAA",
    directScreeningTitle: "Sakatta'a Ariifachiisaa fi Iyyannoo Kallattii",
    directScreeningDesc: "Iyyannoo Telegiraamii (@AzmeraJobConnect) ykn bilbilaan dhiyeessuun sa'aatii 48 keessatti dursitoota qacarii wajjin wal qunnamaa.",
    zeroAgencyFee: "Kaffaltii tajaajilaa homaa malee • Sakatta'a bilbilaa ariifachiisaa",
    viewFastTrack: "Carraawwan Iyyannoo Ariifachiisaa",
    salaryTransparencyTitle: "Mindaa Birrii 100% Ifa Ta'e Mirkanaa'e",
    salaryTransparencyDesc: "Beeksisni hundi mindaa ji'aa ifa ta'e agarsiisa. Mindaa dhokate ykn odeeffannoo dogoggorsaa hin jiru.",
    wordCircularTitle: "Beeksisa Hojii Akkaataa Word Bal'aa Qabu",
    wordCircularDesc: "Qacartonni ibsa guutuu, itti-gaafatamummaa, gabateewwan fi PDF buufamu maxxansu.",
    downloadToR: "Qajeelfama Hojii (ToR) Buufadhu",
    applyTelegram: "Telegiraamiin Gaafadhu",
    postJobNavy: "Hojii Maxxansi",
    verifiedOnly: "100% KAN MIRKANAA'E",
    jobMatchDesc: "Finfinnee, Maqalee, Hawaasaa fi guutuu Itiyoophiyaa keessatti carraawwan hojii wajjin dafaa wal qunnamaa.",
    popularCategoriesTitle: "Kutaalee Hojii Jaallatamo",
    popularCategoriesSubtitle: "Dameelee diinagdee fi guddinaa Itiyoophiyaa keessatti carraawwan jiran qoradhaa.",
    latestOpportunities: "Carraawwan Hojii Haaraa Mirkanaa'an",
    viewDetails: "Bal'ina Ilaali",
    apply: "Amma Gaafadhu",
    telegramBannerTitle: "Hawaasa Hojii Telegiraamii Isa Guddaa Itiyoophiyaa Dabalamaa",
    telegramBannerDesc: "Beeksisa hojii haaraa, waamicha interiviyuu fi odeeffannoo mindaa kallattiin bilbila keessan irratti argadhaa.",
    joinTelegramBtn: "@AzmeraJobConnect Dabalamaa (Miseensota 95K+)",
    // Search & Filters
    filterBySector: "Kutaadhaan Calali",
    employmentType: "Gosa Qacarii",
    experienceLevel: "Sadarkaa Muuxannoo",
    minMonthlySalary: "Mindaa Xiqqaa Ji'aa (Birrii)",
    sortBy: "Akkaataan Tarreessi",
    latest: "Haaraa",
    highestSalary: "Mindaa Olaanaa",
    minSalary: "Mindaa Xiqqaa (ETB/ji'a)",
    noJobsFound: "Hojiin ulaagaa keessan guutu hin argamne",
    tryAdjustingFilters: "Mee calaltuuwwan, bakka ykn jechoota barbaacha jijjiiraa yaalaa.",
    filterJobs: "Hojiiwwan Calali",
    resetAll: "Hunda Deebisi",
    allTypes: "Gosa Hunda",
    allExperience: "Muuxannoo Hunda",
    allSectors: "Kutaalee Hunda",
    sector: "Kutaa Hojii:",
    showingJobs: "hojiiwwan mirkanaa'an Itiyoophiyaa keessatti",
    newestFirst: "Dursi Haaraa",
    clearFilters: "Calaltuuwwan Hunda Haqi",
    quickApply: "Dursii Gaafadhu",
    exploreMoreOpenings: "Hojiiwwan Dabalataa Barbaadi",
    interviewScheduled: "Interiviyuu Qindaa'eera",
    assessmentStage: "Sadarkaa Madaallii",
    offer: "Dhiyeessiin Kennameera",
    notSelected: "Hin filatamne",
    billingGateways: "Kaffaltii fi Karoora",
    // Applications
    myJobApplications: "Gaaffilee Hojii Koo",
    applicationsSubtitle: "Haala iyyannoo keessanii, sagantaa interiviyuu fi dhiyeessii qacartootaa hordofaa.",
    messageRecruiter: "Qacaraatti Ergaa Ergi 💬",
    joinInterviewRoom: "Kutaa Interiviyuu Seenaa 🎥",
    applicationId: "Eenyummeessaa Iyyannoo",
    // Auth & Navigation
    notifications: "Beeksisawwan",
    unread: "hin dubbifamne",
    markAllRead: "Hunda akka dubbifameetti mallatteessi",
    noNotifications: "Ammatti beeksisni hin jiru.",
    signOut: "Ba'i",
    switchToEmployer: "Gara Qacaraatti Jijjiiri",
    switchToEmployee: "Gara Hojii Barbaadaatti Jijjiiri",
    switchToAdmin: "Gara Bulchaatti Jijjiiri",
    register: "Galmaa'i",
    welcomeBack: "Baga Nagaan Deebitan",
    signInSubtitle: "Akkaawuntii Azmeraa keessan seenuuf odeeffannoo galchaa",
    signInNow: "Amma Seeni",
    createAccount: "Akkaawuntii Azmera Jobs Uumi",
    forgotPasswordQuestion: "Jecha icciitii dagattanii?",
    noAccountYet: "Akkaawuntii hin qabdanii?",
    registerNow: "Amma Galmaa'aa",
    alreadyHaveAccount: "Duraan akkaawuntii qabduu?",
    joinAzmera: "Azmera Jobs Dabalamaa",
    selectAccountType: "Azmera Jobs akkamitti fayyadamuu karoorsitu?",
    lookingForJob: "Hojii barbaadaa jira",
    hiringTalent: "Ogeessota qacaraa jira",
    continueBtn: "Itti Fufi",
    backToSignIn: "Gara Seensaatti Deebi'i",
    resetPassword: "Jecha Icciitii Haaromsi",
    // Seeker Views
    totalApplied: "Waliigala Iyyannoo",
    activeCandidacies: "Iyyannoowwan hojjetan",
    hrScreening: "Sadarkaa calallii HR",
    passedQualifications: "Ulaagaa darbeera",
    actionRequired: "Tarkaanfii barbaada",
    profileStrength: "Cimina Profaayilii",
    completeProfile: "Profaayilii Guuti",
    recommendedForYou: "Hojiiwwan Isiniif Filataman",
    matchesYourSkills: "Dandeettii keessan waliin wal sima",
    seeAll: "Hunda Ilaali",
    savedJobsTitle: "Hojiiwwan Qusataman",
    noSavedJobs: "Ammatti hojiin qusatame hin jiru",
    findMoreJobs: "Hojiiwwan Dabalataa Barbaadi",
    noApplicationsFound: "Ramaddii kana keessa iyyannoon hin jiru",
    appliedOn: "Guyyaa itti iyyatame",
    attachedCv: "CV itti maxxanfame",
    backToVacancies: "Gara Hojiiwwaniitti Deebi'i",
    roleOverview: "Ibsa Bal'aa Hojii",
    keyResponsibilities: "Itti-gaafatamummaa Ijoo",
    applyForPosition: "Hojii Kanaaf Iyyadhu",
    applicationSubmitted: "Iyyannoon Dhiyaateera",
    monthlyCompensation: "Mindaa Ji'aa",
    applicationDeadline: "Guyyaa Xumuraa",
    applicantsSoFar: "Iyyattoota Hanga Ammaa",
    similarJobs: "Hojiiwwan Walfakkaatan",
    aboutMe: "Waa'ee Koo",
    workExperience: "Muuxannoo Hojii",
    educationCredentials: "Barnootaa fi Ragaawwan",
    curriculumVitae: "CV (Curriculum Vitae)",
    replaceCv: "CV Ol-kaa'i / Jijjiiri",
    addSkill: "Dandeettii Dabali",
    // Employer Views
    employerDashboardTitle: "Wiirtuu Ajaja Qacarii",
    postNewVacancy: "Hojii Haaraa Maxxansi",
    totalActiveJobs: "Hojiiwwan Hojjetan",
    totalApplicants: "Waliigala Iyyattootaa",
    interviewsScheduled: "Interiviyuuwwan Qindaa'an",
    jobPerformanceOverview: "Raawwii Beeksisa Hojii",
    recentApplications: "Iyyannoowwan Dhihoo",
    viewAllApplicants: "Iyyattoota Hunda Ilaali",
    manageVacancies: "Hojiiwwan Bulchi",
    allStatus: "Hunda",
    activeStatus: "Hojjetaa",
    pausedStatus: "Dhaabbate",
    closedStatus: "Cufame",
    applicantTracking: "Hordoffii Iyyattootaa fi Adeemsa Qacarii",
    pipelineKanban: "Gabatee Adeemsaa (Kanban)",
    cardsGrid: "Tarree Kaardii",
    talentSourcingTitle: "Barbaacha fi Filannoo Ogeessotaa",
    talentPools: "Kuusaa Ogeessotaa",
    inviteToApply: "Akka Iyyatan Afeeri",
    interviewManagementTitle: "Bulchiinsa fi Qindoomina Interiviyuu",
    companyProfileTitle: "Profaayilii Dhaabbataa fi Garee HR",
    hrTeam: "Garee HR fi Hayyamoota",
    billingTitle: "Kaffaltii Qacaraa fi Karaalee Kaffaltii",
    packagesTab: "Paakeejiiwwan Hojii",
    transactionsTab: "Galmee Kaffaltii",
    gatewaysTab: "Karaalee Kaffaltii Itiyoophiyaa",
    // Admin Console
    commandCenterTitle: "Wiirtuu Ajaja Giddu-galeessaa Azmera Jobs",
    commandCenterSubtitle: "Bulchiinsa sirnaa, mirkaneessa beeksisa hojii, too'annoo fayyadamtootaa fi kaffaltiiwwan Itiyoophiyaa (Telebirr, CBE Bank, M-Pesa).",
    superuserSession: "Bulchaa Olaanaa (Root)",
    totalSettledRevenue: "Galii Waliigalaa Mirkanaa'e",
    activeJobPostings: "Beeksisa Hojii Hojjetan",
    employersEnterprises: "Qacartoota fi Dhaabbilee",
    talentPoolLabel: "Kuusaa Ogeessotaa",
    moderationKyc: "Mirkaneessaa fi KYC",
    financeGateways: "Faayinaansii fi Kaffaltii",
    trustSafety: "Amantaa fi Nageenya",
    telegramBroadcast: "Tamsaasa Telegiraamii",
    jobListingApprovals: "Mirkaneessa Beeksisa Hojii",
    enterpriseKyc: "Mirkaneessa KYC Dhaabbilee",
    paymentLedger: "Galmee Telebirr / CBE / M-Pesa",
    talentPlacements: "Koomishinii Qacarii Ogeessotaa",
    userGovernance: "Bulchiinsa Fayyadamtootaa",
    fraudDisputes: "Gabaasa Gowwoomsaa fi Falmii",
    auditTrail: "Galmee Odiitii Nageenya Sirnaa",
    telegramSyndication: "Tamsaasa Bootii Telegiraamii",
    jumpToView: "Gara Fuulaatti Utaali:",
    approveListing: "Beeksisa Mirkaneessi",
    revokeApproval: "Mirkaneessa Haqi",
    approvedLive: "Mirkanaa'ee Mul'ataa Jira",
    pendingVerification: "Mirkaneessa Eegaa Jira",
    viewReceipt: "Nagahee Ilaali",
    viewDocs: "Sanadoota Ilaali",
    inspectProfile: "Profaayilii Qoradhu",
    suspendAccount: "Akkaawuntii Dhorki",
    reinstateUser: "Fayyadamaa Deebisi",
    sanctionEmployer: "Qacaraa Adabi",
    dismissReport: "Gabaasa Cufi",
    triggerBroadcast: "Amma Telegiraamiin Tamsaasi",
    // Landing Extra & Messages
    featuredVacancies: "Hojiiwwan Filatamoo Itiyoophiyaa Keessaa",
    multiRegionalTitle: "Tajaajila Naannolee Hundaa fi Afaanota Biyya Keessaa",
    multiRegionalDesc: "Finfinnee, Maqalee, Hawaasaa fi Dirre Dhawaa keessatti deeggarsa guutuu Afaan Ingilizii, Amaariffaa, Afaan Oromoo fi Tigriffaan tajaajilla.",
    howItWorksTitle: "Azmera Jobs Akkamitti Hojjeta?",
    howItWorksSubtitle: "Qacartoota mirkanaa'an fi ogeessota gahumsa qaban tarkaanfii 3 salphaan wal qunnamsiisa.",
    pricingTitle: "Karaalee Kaffaltii Itiyoophiyaa fi Gatii Ifa Ta'e",
    pricingSubtitle: "Telebirr, Baankii Daldalaa Itiyoophiyaa (CBE), ykn M-Pesa fayyadamuun Birriin kaffalaa.",
    messagesTitle: "Ergaawwan Kallattii fi Interiviyuu",
    typeMessage: "Ergaa keessan asitti barreessaa...",
    sendBtn: "Ergi",
    nextStep: "Tarkaanfii Itti Aanu",
    backBtn: "Duubatti",
    submitApplication: "Iyyannoo Galchi",
    withdrawApplication: "Iyyannoo Haqi",
    confirmInterview: "Interiviyuu Mirkaneessi",
    requestReschedule: "Yeroo Jijjiiri",
    saveAsDraft: "Akka Wixinii Qusadhu",
    editVacancy: "Beeksisa Gulaali",
    updateVacancy: "Jijjiirama Ol-kaa'i",
    compareCandidates: "Kaadhimamtoota Madaali",
    jobAlerts: "Beeksisa Hojii Haaraa",
    continueWithGoogle: "Google tiin Itti Fufi",
    verifyOtp: "OTP Bilbilaa Mirkaneessi",
    draftStatus: "Wixinii",
    printResume: "CV PDF Buufadhu / Maxxansi",
    accountSettings: "Qindaa'ina Akkaawuntii",
    deactivateAccount: "Akkaawuntii Dhaabi",
    switchOrganization: "Dhaabbata",
    chooseStandard: "Idilee Filadhu (500 ETB)",
    directApplyBadge: "Iyyannoo Kallattii Ariifachiisaa",
    standardPlan: "Beeksisa Idilee",
    featuredPlan: "Beeksisa Hojii Filatamaa",
    vipPlan: "Tamsaasa Bal'aa fi Qacarii",
    mostPopular: "Baay'ee Jaallatamaa",
    officialCircular: "Beeksisa Hojii Idilee",
    switchSessionLabel: "Eenyummaa Jijjiiri",
    languagesFluency: "Afaanotaa fi Dandeettii",
    expressModeLabel: "Haala Ariifachiisaa Sekondii 60",
    advancedWordModeLabel: "Beeksisa Bal'aa Word fi ToR",
    rolePresetsLabel: "Filannoo Hojii Qophii",
  },
  ti: {
    home: "መበገሲ",
    exploreJobs: "ስራሓት ፈልይ",
    forEmployers: "ንቀጠርቲ",
    explore: "ድህሰስ",
    pricingPlans: "ዋጋን መደባትን",
    howItWorks: "ከመይ ይሰርሕ",
    telegramChannel: "ቻነል ቴሌግራም",
    salaryGuide: "ሓበሬታ ደሞዝ",
    applications: "ማመልከቻታተይ",
    savedJobs: "ዝተዓቀቡ ስራሓት",
    myProfile: "ፕሮፋይለይን ሲቪይን",
    dashboard: "ዳሽቦርድ",
    manageJobs: "ስራሓት ምምሕዳር",
    applicants: "ሕቶ ቀረብቲ",
    findTalent: "ሰብ ሞያታት ፈልይ",
    careerHub: "ማእከል ስራሕ",
    moreTools: "ተወሳኺ መሳርሒታት",
    messages: "መልእኽትታት",
    interviews: "ቃለ-መሕትቶታት",
    companyProfile: "ፕሮፋይል ትካል",
    adminConsole: "ማእከል ኣመሓዳሪ",
    jobApprovals: "ምጽዳቕ ስራሕ",
    operations: "ስርሒታት",
    paymentAudit: "ኦዲት ክፍሊት",
    verifiedEmployers: "ዝተረጋገጹ ቀጠርቲ",
    talentDirectory: "መውጽኢ ሰብ ሞያ",
    signIn: "እቶ",
    getStarted: "ጀምር",
    postJob: "ክፉት ስራሕ ኣውጽእ",
    searchPlaceholder: "ኣርእስቲ ስራሕ፣ ክእለት ወይ ትካል…",
    allLocations: "ኩሎም ከተማታት ኢትዮጵያ",
    findJobs: "ስራሕ ፈልይ",
    applyNow: "ሕጂ ሕተት",
    saveJob: "ስራሕ ዓቅብ",
    viewJob: "ስራሕ ርኣይ",
    salary: "ደሞዝ",
    submitted: "ቀሪቡ",
    underReview: "ኣብ ምምርማር",
    shortlisted: "ተሓርዩ",
    interview: "ቃለ-መሕትቶ",
    assessment: "ምዘና ክእለት",
    offerExtended: "ሕቶ ቅጥሪ ቀሪቡ",
    hired: "ተቐጢሩ 🎉",
    accepted: "ተቐጢሩ 🎉",
    rejected: "ኣይተሓረየን",
    typeHere: "ኣብዚ ጽሓፉ…",
    coverLetter: "ደብዳቤ መሸፈኒ",
    submit: "ኣቅርብ",
    cancel: "ሰርዝ",
    save: "ዓቅብ",
    saved: "ተዓቂቡ",
    edit: "ኣርም",
    skills: "ክእለታት",
    experience: "ተመኩሮ ስራሕ",
    education: "ደረጃ ትምህርቲ",
    about: "ብዛዕባ ትካል",
    contact: "ኣድራሻ",
    fullTime: "ምሉእ ግዜ",
    partTime: "ክፋል ግዜ",
    contract: "ብኮንትራት",
    remote: "ካብ ርሑቕ ዝስራሕ",
    hybrid: "ሕዙዝ (ድብልቅ)",
    onSite: "ኣብ ቢሮ",
    welcome: "እንቋዕ ብደሓን መጻእኹም",
    tagline: "ኣብ ስራሕ እሙን መሻርኽትኹም",
    entryLevel: "ጀማሪ ሰብ ሞያ",
    midLevel: "ማእኸላይ ሰብ ሞያ",
    seniorLevel: "ላዕለዋይ ሰብ ሞያ",
    schedule: "ቃለ-መሕትቶ ምምቻእ",
    shortlist: "ናብ ሕሩያት ኣእቱ",
    reject: "ውድቂ ግበር",
    viewProfile: "ፕሮፋይል ርኣይ",
    downloadCV: "ሲቪ ኣውርድ",
    publishJob: "ስራሕ ኣውጽእ",
    previewJob: "ቅድመ ርእየት",
    jobTitle: "ዓይነት ስራሕ",
    category: "ዓውዲ ስራሕ",
    description: "ዝርዝር መግለጺ ስራሕ",
    responsibilities: "ሓላፍነታት",
    qualifications: "ተደለይቲ ብቕዓታት",
    deadline: "መወዳእታ ዕለት",
    currency: "ብር (ETB)",
    verifiedEmployer: "ዝተረጋገጸ ቀጣሪ",
    jobSeeker: "ስራሕ ደላይ",
    employer: "ቀጣሪ ትካል",
    administrator: "ሲስተም ኣመሓዳሪ",
    activeSession: "ንጡፍ ኣካውንት",
    // Landing & Hero
    heroBadge: "ቀዳማይ ናይ ስራሕ መድረኽ 2026 • ኢትዮጵያ",
    heroTitlePart1: "ናይ ሕልምኹም ስራሕ",
    heroTitlePart2: "ኣብ ኢትዮጵያ ርከቡ",
    heroSubtitle: "ካብ ኩሎም ዓውድታት ስራሕ ካብ ዝተረጋገጹ ዓበይቲ ትካላት ብኣሽሓት ዝቑጸሩ ክፉታት ስራሓት ብግሉጽ ደሞዝ ብር ርከቡ።",
    heroSearchPlaceholder: "ዓይነት ስራሕ ወይ ክእለት",
    heroLocationPlaceholder: "ከተማ ወይ ካብ ርሑቕ",
    allCategories: "ኩሎም ዓውድታት",
    searchJobs: "ስራሓት ፈልይ",
    popular: "ተደለይቲ:",
    activeJobs: "ንጡፋት ስራሓት",
    companies: "ቀጠርቲ ትካላት",
    jobSeekersCount: "ስራሕ ደለይቲ",
    statVerifiedJobs: "ዝተረጋገጹ ስራሓት",
    statEmployers: "ቀጠርቲ ትካላት",
    statTelegram: "ኣባላት ቴሌግራም",
    statMatchRate: "ደረጃ ዓወት ቅጥሪ",
    successRate: "ደረጃ ዓወት ቅጥሪ",
    trustedBy: "ብቐዳሞት ትካላት ኢትዮጵያን ዓለም-ለኸ መሻርኽትን ዝተኣመነ",
    recruitmentAdvantageTitle: "ቀጠርትን ሰብ ሞያን ስለምንታይ ንኣዝመራ ይመርጹ?",
    recruitmentAdvantageSubtitle: "ናይ ሓሶት ምልክታታት ንምውጋድ፣ ቅልጡፍ ምምራጽ ሕጹያትን 100% ግሉጽነት ደሞዝ ንምርግጋጽ ዝተዳለወ።",
    modernRecruitmentStandard: "ዘመናዊ መዐቀኒ ቅጥሪ",
    directScreeningTitle: "ቅልጡፍ ምጽራይን ቀጥታዊ ማመልከቻን",
    directScreeningDesc: "ብቐጥታ ብቴሌግራም (@AzmeraJobConnect) ወይ ብተሌፎን ብምምልካት ኣብ ውሽጢ 48 ሰዓታት ምስ ቀጠርቲ ተራኸቡ።",
    zeroAgencyFee: "ንደለይቲ ስራሕ ዝኾነ ክፍሊት የለን • ቅልጡፍ ናይ ቴሌፎን ምጽራይ",
    viewFastTrack: "ናይ ቀጥታዊ ማመልከቻ ዕድላት",
    salaryTransparencyTitle: "100% ዝተረጋገጸ ግሉጽነት ደሞዝ ብር",
    salaryTransparencyDesc: "ኩሉ ምልክታ ስራሕ ግሉጽ ናይ ወርሒ ደሞዝ ብብር የካትት። ሕቡእ ደሞዝ የለን።",
    wordCircularTitle: "ምሉእ ዝርዝር ዘለዎም ናይ ስራሕ ምልክታታት",
    wordCircularDesc: "ቀጠርቲ ዝርዝር ሓበሬታ፣ ሓላፍነታት፣ ሰሌዳታትን ዝወርድ ፒዲኤፍ ምልክታታትን የውጽኡ።",
    downloadToR: "ዝርዝር መምርሒ ስራሕ (ToR) ኣውርድ",
    applyTelegram: "ብቴሌግራም ሕተት",
    postJobNavy: "ክፉት ስራሕ ኣውጽእ",
    verifiedOnly: "100% ዝተረጋገጸ",
    jobMatchDesc: "ኣብ ኣዲስ ኣበባ፣ መቐለ፣ ሃዋሳን መላእ ኢትዮጵያን ዘለዉ ክፉታት ስራሓት ብቕልጡፍ ርከቡ።",
    popularCategoriesTitle: "ተደለይቲ ዓውድታት ስራሕ",
    popularCategoriesSubtitle: "ኣብ ቀንዲ ናይ ኢትዮጵያ ናይ ቁጠባን ዕቤትን ዓውድታት ዘለዉ ክፉታት ቦታታት ድህሰሱ።",
    latestOpportunities: "ሓደሽቲ ዝተረጋገጹ ናይ ስራሕ ዕድላት",
    viewDetails: "ዝርዝር ርኣይ",
    apply: "ሕጂ ሕተት",
    telegramBannerTitle: "ኣብ ቴሌግራም ዝዓበየ ማሕበረሰብ ስራሕ ኢትዮጵያ ተጸንበሩ",
    telegramBannerDesc: "ሓደሽቲ ናይ ስራሕ ምልክታታት፣ ጻውዒት ቃለ-መሕትቶን ሓበሬታ ደሞዝን ብቐጥታ ኣብ ተንቀሳቓሲ ስልክኹም ርከቡ።",
    joinTelegramBtn: "@AzmeraJobConnect ተጸንበሩ (95K+ ኣባላት)",
    // Search & Filters
    filterBySector: "ብዓውዲ ስራሕ ፍለይ",
    employmentType: "ዓይነት ቅጥሪ",
    experienceLevel: "ደረጃ ተመኩሮ",
    minMonthlySalary: "ዝተሓተ ወርሓዊ ደሞዝ (ብር)",
    sortBy: "ቅደም ተኸተል",
    latest: "ሓዲሽ",
    highestSalary: "ዝለዓለ ደሞዝ",
    minSalary: "ዝወሓደ ደሞዝ (ETB/ወርሒ)",
    noJobsFound: "ምስ መምረጺኹም ዝሰማማዕ ስራሕ ኣይተረኽበን",
    tryAdjustingFilters: "በጃኹም መምረጺታት፣ ከተማ ወይ ቃላት ምድላይ ቀይርኩም ፈትኑ።",
    filterJobs: "ስራሓት ፍለይ",
    resetAll: "ኩሉ ኣጽሪ",
    allTypes: "ኩሎም ዓይነታት",
    allExperience: "ኩሉ ተመኩሮ",
    allSectors: "ኩሎም ዓውድታት",
    sector: "ዓውዲ ስራሕ:",
    showingJobs: "ዝተረጋገጹ ክፉታት ስራሓት ኣብ ኢትዮጵያ",
    newestFirst: "ቀዳምነት ሓደሽቲ",
    clearFilters: "ኩሎም መምረጺታት ኣጽሪ",
    quickApply: "ቅልጡፍ ምምልካት",
    exploreMoreOpenings: "ተወሳኺ ክፉታት ስራሕ ድለዩ",
    interviewScheduled: "ቃለ-መሕትቶ ተታሒዙ",
    assessmentStage: "ደረጃ ምዘና",
    offer: "ሕቶ ቅጥሪ ቀሪቡ",
    notSelected: "ኣይተሓረየን",
    billingGateways: "ክፍሊትን መደባትን",
    // Applications
    myJobApplications: "ማመልከቻታተይ",
    applicationsSubtitle: "ኩነታት ማመልከቻኹም፣ ቀጠሮ ቃለ-መሕትቶን ውጽኢት ቅጥሪን ብቐጥታ ተኸታተሉ።",
    messageRecruiter: "ንቀጣሪ መልእኽቲ ስደድ 💬",
    joinInterviewRoom: "ክፍሊ ቃለ-መሕትቶ እተዉ 🎥",
    applicationId: "መለለዪ ማመልከቻ",
    // Auth & Navigation
    notifications: "መፍለጢታት",
    unread: "ዘይተነበበ",
    markAllRead: "ኩሉ ከም ዝተነበበ ምልክት ግበር",
    noNotifications: "ክሳብ ሕጂ መፍለጢ የለን።",
    signOut: "ውጻእ",
    switchToEmployer: "ናብ ቀጣሪ ቀይር",
    switchToEmployee: "ናብ ደላይ ስራሕ ቀይር",
    switchToAdmin: "ናብ ኣመሓዳሪ ቀይር",
    register: "ተመዝገብ",
    welcomeBack: "እንቋዕ ብደሓን ተመለስኩም",
    signInSubtitle: "ናብ ኣዝመራ ኣካውንትኹም ንምእታው መረዳእታኹም የእትዉ",
    signInNow: "ሕጂ እቶ",
    createAccount: "ናይ ኣዝመራ ጆብስ ኣካውንት ፍጠሩ",
    forgotPasswordQuestion: "መሕለፊ ቃል ረሲዕኩም?",
    noAccountYet: "ኣካውንት የብልኩምን?",
    registerNow: "ሕጂ ተመዝገቡ",
    alreadyHaveAccount: "ቅድሚ ሕጂ ኣካውንት ኣለኩም?",
    joinAzmera: "ኣዝመራ ጆብስ ተጸንበሩ",
    selectAccountType: "ንኣዝመራ ጆብስ ከመይ ክትጥቀሙሉ ትደልዩ?",
    lookingForJob: "ስራሕ እየ ዝደሊ ዘለኹ",
    hiringTalent: "ሰብ ሞያታት እየ ዝቐጽር ዘለኹ",
    continueBtn: "ቀጽል",
    backToSignIn: "ናብ መእተዊ ተመለስ",
    resetPassword: "መሕለፊ ቃል ዳግም ኣጀምር",
    // Seeker Views
    totalApplied: "ጠቕላላ ማመልከቻታት",
    activeCandidacies: "ንጡፋት ማመልከቻታት",
    hrScreening: "ደረጃ ምጽራይ HR",
    passedQualifications: "መስፈርቲ ሓሊፉ",
    actionRequired: "ተግባር የድሊ",
    profileStrength: "ጥንካረ ፕሮፋይል",
    completeProfile: "ፕሮፋይል ምሉእ ግበር",
    recommendedForYou: "ንዓኹም ዝተመረጹ ክፉታት ስራሓት",
    matchesYourSkills: "ምስ ክእለትኩም ዝሰማማዕ",
    seeAll: "ኩሉ ርኣይ",
    savedJobsTitle: "ዝተዓቀቡ ስራሓት",
    noSavedJobs: "ክሳብ ሕጂ ዝተዓቀበ ስራሕ የለን",
    findMoreJobs: "ተወሳኺ ስራሓት ድለይ",
    noApplicationsFound: "ኣብዚ ምድብ ማመልከቻ የለን",
    appliedOn: "ዝተመልከተሉ ዕለት",
    attachedCv: "ዝተተሓሓዘ ሲቪ",
    backToVacancies: "ናብ ክፉታት ስራሓት ተመለስ",
    roleOverview: "ዝርዝር መግለጺ ስራሕ",
    keyResponsibilities: "ቀንዲ ሓላፍነታት",
    applyForPosition: "ነዚ ስራሕ ኣመልክት",
    applicationSubmitted: "ማመልከቻ ቀሪቡ",
    monthlyCompensation: "ወርሓዊ ደሞዝ",
    applicationDeadline: "መወዳእታ ዕለት ማመልከቻ",
    applicantsSoFar: "ክሳብ ሕጂ ዘመልከቱ",
    similarJobs: "ተመሳሰልቲ ስራሓት",
    aboutMe: "ብዛዕባይ",
    workExperience: "ተመኩሮ ስራሕ",
    educationCredentials: "ትምህርትን መረጋገጺታትን",
    curriculumVitae: "ሲቪ (Curriculum Vitae)",
    replaceCv: "ሲቪ ጽዓን / ቀይር",
    addSkill: "ክእለት ወስኽ",
    // Employer Views
    employerDashboardTitle: "ማእከል ምምሕዳር ቅጥሪ",
    postNewVacancy: "ሓዲሽ ክፉት ስራሕ ኣውጽእ",
    totalActiveJobs: "ንጡፋት ክፉታት ስራሓት",
    totalApplicants: "ጠቕላላ ሕቶ ቀረብቲ",
    interviewsScheduled: "ዝተታሕዙ ቃለ-መሕትቶታት",
    jobPerformanceOverview: "ኣፈጻጽማ ምልክታታት ስራሕ",
    recentApplications: "ሓደሽቲ ማመልከቻታት ሕጹያት",
    viewAllApplicants: "ኩሎም ኣመልከትቲ ርኣይ",
    manageVacancies: "ክፉታት ስራሓት ኣመሓድር",
    allStatus: "ኩሉ",
    activeStatus: "ንጡፍ",
    pausedStatus: "ዝደው በለ",
    closedStatus: "ዝተዓጽወ",
    applicantTracking: "ክትትል ኣመልከትትን መስርሕ ቅጥሪን",
    pipelineKanban: "ሰሌዳ መስርሕ (Kanban)",
    cardsGrid: "ዝርዝር ካርድ",
    talentSourcingTitle: "ምድላይን ምምራጽን ሰብ ሞያ",
    talentPools: "እኩብ ሰብ ሞያ",
    inviteToApply: "ንክመልክቱ ዓድም",
    interviewManagementTitle: "ምምሕዳርን ምውህሃድን ቃለ-መሕትቶ",
    companyProfileTitle: "ፕሮፋይል ትካልን ጉጅለ HRን",
    hrTeam: "ጉጅለ HRን ፈቓዳትን",
    billingTitle: "ክፍሊት ቀጣሪን መንገድታት ክፍሊትን",
    packagesTab: "ጥቅልታት ምልክታ",
    transactionsTab: "መዝገብ ክፍሊት",
    gatewaysTab: "ናይ ኢትዮጵያ መንገድታት ክፍሊት",
    // Admin Console
    commandCenterTitle: "ማእከላዊ መቆጻጸሪ ኣዝመራ ጆብስ",
    commandCenterSubtitle: "ምምሕዳር መድረኽ፣ ምጽዳቕ ምልክታ ስራሕ፣ ቁጽጽር ተጠቀምትን ክፍሊታት ኢትዮጵያን (ቴሌብር፣ ንግዲ ባንክ፣ M-Pesa)።",
    superuserSession: "ላዕለዋይ ኣመሓዳሪ (Root)",
    totalSettledRevenue: "ጠቕላላ ዝተኣከበ እቶት",
    activeJobPostings: "ንጡፋት ምልክታታት ስራሕ",
    employersEnterprises: "ቀጠርቲ ትካላት",
    talentPoolLabel: "ማሕደር ሰብ ሞያ",
    moderationKyc: "ምጽዳቕን KYCን",
    financeGateways: "ፋይናንስን ክፍሊታትን",
    trustSafety: "እምነትን ድሕንነትን",
    telegramBroadcast: "ዝርግሐ ቴሌግራም",
    jobListingApprovals: "ምጽዳቕ ምልክታ ስራሕ",
    enterpriseKyc: "ምርግጋጽ KYC ትካላት",
    paymentLedger: "መዝገብ ቴሌብር / CBE / M-Pesa",
    talentPlacements: "ኮሚሽን ቅጥሪ ሰብ ሞያ",
    userGovernance: "ምምሕዳር ተጠቀምትን እገዳን",
    fraudDisputes: "ጸብጻብ ምትላልን ክርክርን",
    auditTrail: "መዝገብ ኦዲት ድሕንነት መድረኽ",
    telegramSyndication: "ዝርግሐ ቦት ቴሌግራም",
    jumpToView: "ናብ ገጽ ዝለል:",
    approveListing: "ምልክታ ኣጽድቕ",
    revokeApproval: "ፍቓድ ኣልዕል",
    approvedLive: "ጸዲቑ ኣብ ምርኣይ",
    pendingVerification: "ምርግጋጽ ይጽበ ኣሎ",
    viewReceipt: "ቅብሊት ርኣይ",
    viewDocs: "ሰነዳት ርኣይ",
    inspectProfile: "ፕሮፋይል መርምር",
    suspendAccount: "ኣካውንት ኣግድ",
    reinstateUser: "ተጠቃሚ ምለስ",
    sanctionEmployer: "ንቀጣሪ ቅጻዕ",
    dismissReport: "ጸብጻብ ዕጾ",
    triggerBroadcast: "ሕጂ ብቴሌግራም ዘርግሕ",
    // Landing Extra & Messages
    featuredVacancies: "ኣብ ኢትዮጵያ ዝተመረጹ ክፉታት ስራሓት",
    multiRegionalTitle: "ሽፋን ኩሎም ከባቢታትን ቋንቋታት ሃገርን",
    multiRegionalDesc: "ኣብ ኣዲስ ኣበባ፣ መቐለ፣ ሃዋሳን ድሬዳዋን ብእንግሊዝኛ፣ ኣምሓርኛ፣ ኦሮምኛን ትግርኛን ምሉእ ኣገልግሎት ንህብ።",
    howItWorksTitle: "ኣዝመራ ጆብስ ከመይ ይሰርሕ?",
    howItWorksSubtitle: "ዝተረጋገጹ ቀጠርቲ ኢትዮጵያን ብቑዓት ሰብ ሞያን ብ3 ቀለልቲ ደረጃታት የራኽብ።",
    pricingTitle: "ግሉጻት ናይ ኢትዮጵያ መንገድታት ክፍሊትን ዋጋን",
    pricingSubtitle: "ብቴሌብር፣ ንግዲ ባንክ ኢትዮጵያ (CBE) ወይ M-Pesa ብብር ብቐሊሉ ክፈሉ።",
    messagesTitle: "ቀጥታዊ መልእኽትታትን ቃለ-መሕትቶን",
    typeMessage: "መልእኽትኹም ኣብዚ ጽሓፉ...",
    sendBtn: "ስደድ",
    nextStep: "ቀጻሊ ደረጃ",
    backBtn: "ተመለስ",
    submitApplication: "ማመልከቻ ስደድ",
    withdrawApplication: "ማመልከቻ ሰርዝ",
    confirmInterview: "ቃለ-መሕትቶ ኣረጋግጽ",
    requestReschedule: "ቀጠሮ ቀይር",
    saveAsDraft: "ከም ረቂቕ ዓቅብ",
    editVacancy: "ምልክታ ኣርም",
    updateVacancy: "ለውጥታት ዓቅብ",
    compareCandidates: "ሕጹያት ኣነጻጽር",
    jobAlerts: "መፍለጢታት ስራሕ",
    continueWithGoogle: "ብGoogle ቀጽል",
    verifyOtp: "OTP ስልኪ ኣረጋግጽ",
    draftStatus: "ረቂቕ",
    printResume: "ሲቪ ብPDF ኣውርድ / ሕተም",
    accountSettings: "ቅጥዕታት ኣካውንት",
    deactivateAccount: "ኣካውንት ኣቋርጽ",
    switchOrganization: "ትካል",
    chooseStandard: "መደበኛ ምረጽ (500 ETB)",
    directApplyBadge: "ናባይ ቀጥታ ኣመልክቱ",
    standardPlan: "መደበኛ ምልክታ",
    featuredPlan: "ዝተፈለየ ምልክታ ስራሕ",
    vipPlan: "ሜጋ ብሮድካስትን ቅጥርን",
    mostPopular: "ብዝሒ ዝድለ",
    officialCircular: "ወግዓዊ ምልክታ ስራሕ",
    switchSessionLabel: "መንነት መቀያየሪ",
    languagesFluency: "ቋንቋታትን ብቕዓትን",
    expressModeLabel: "ናይ 60 ሰከንድ ቅልጡፍ ቅጥዒ",
    advancedWordModeLabel: "ዝርዝር ምልክታ Word ከምኡውን ToR",
    rolePresetsLabel: "ብ1 ጠውቂ ዝተዳለዉ ስራሓት",
  },
};

export function tStatus(lang: LangCode, status: string): string {
  switch (status) {
    case "All": return t(lang, "allStatus");
    case "Active": return t(lang, "activeStatus");
    case "Paused": return t(lang, "pausedStatus");
    case "Closed": return t(lang, "closedStatus");
    case "Submitted": return t(lang, "submitted");
    case "Under Review": return t(lang, "underReview");
    case "Shortlisted": return t(lang, "shortlisted");
    case "Interview": return t(lang, "interview");
    case "Assessment": return t(lang, "assessment");
    case "Offer": return t(lang, "offerExtended");
    case "Hired": return t(lang, "hired");
    case "Rejected": return t(lang, "rejected");
    default: return status;
  }
}

export function t(lang: LangCode, key: TranslationKey): string {
  return translations[lang]?.[key] ?? translations["en"][key] ?? key;
}

export function tCategory(lang: LangCode, category: string): string {
  if (lang === "en") return category;
  const map: Record<string, Record<LangCode, string>> = {
    "Software & IT": { en: "Software & IT", am: "ሶፍትዌር እና አይቲ", om: "Sooftiweerii fi IT", ti: "ሶፍትዌርን አይቲን" },
    "Hospitality & Tourism": { en: "Hospitality & Tourism", am: "ሆቴል እና ቱሪዝም", om: "Hoteela fi Tuuriizimii", ti: "ሆቴልን ቱሪዝምን" },
    "Banking & Finance": { en: "Banking & Finance", am: "ባንክ እና ፋይናንስ", om: "Baankii fi Faayinaansii", ti: "ባንክን ፋይናንስን" },
    "Healthcare & Medical": { en: "Healthcare & Medical", am: "ጤና እና ሕክምና", om: "Fayyaa fi Yaalaa", ti: "ጥዕናን ሕክምናን" },
    "NGO & Humanitarian": { en: "NGO & Humanitarian", am: "መንግስታዊ ያልሆኑ ድርጅቶች", om: "Dhaabbilee Mit-Mootummaa", ti: "መንግስታዊ ዘይኮኑ ትካላት" },
    "Education & Teaching": { en: "Education & Teaching", am: "ትምህርት እና ስልጠና", om: "Barnootaa fi Leenjii", ti: "ትምህርትን ስልጠናን" },
    "Engineering & Construction": { en: "Engineering & Construction", am: "ምህንድስና እና ኮንስትራክሽን", om: "Injinariingii fi Ijaarsa", ti: "ኢንጂነሪንግን ህንጸትን" },
    "Logistics & Transport": { en: "Logistics & Transport", am: "ሎጂስቲክስ እና ትራንስፖርት", om: "Lojistikii fi Geejjiba", ti: "ሎጂስቲክስን መጓዓዝያን" },
    "Sales & Marketing": { en: "Sales & Marketing", am: "ሽያጭ እና ማርኬቲንግ", om: "Gurgurtaa fi Beeksisa", ti: "ንግድን ዕዳጋን" },
  };
  return map[category]?.[lang] || category;
}

export function tWorkplaceType(lang: LangCode, type: string): string {
  if (type === "Remote") return t(lang, "remote");
  if (type === "Hybrid") return t(lang, "hybrid");
  if (type === "On-site") return t(lang, "onSite");
  return type;
}

export function tJobType(lang: LangCode, type: string): string {
  if (type === "Full-time") return t(lang, "fullTime");
  if (type === "Part-time") return t(lang, "partTime");
  if (type === "Contract") return t(lang, "contract");
  return type;
}
