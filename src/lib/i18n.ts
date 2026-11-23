export type LangCode = "en" | "am" | "om" | "ti";

export type TranslationKey =
  | "home" | "exploreJobs" | "applications" | "savedJobs" | "myProfile"
  | "dashboard" | "manageJobs" | "applicants" | "interviews" | "companyProfile"
  | "signIn" | "getStarted" | "postJob" | "searchPlaceholder" | "allLocations"
  | "findJobs" | "applyNow" | "saveJob" | "viewJob" | "salary" | "submitted"
  | "underReview" | "shortlisted" | "interview" | "accepted" | "rejected"
  | "typeHere" | "coverLetter" | "submit" | "cancel" | "save" | "edit"
  | "skills" | "experience" | "education" | "about" | "contact"
  | "fullTime" | "partTime" | "contract" | "remote" | "hybrid" | "onSite"
  | "welcome" | "tagline" | "entryLevel" | "midLevel" | "seniorLevel"
  | "schedule" | "shortlist" | "reject" | "viewProfile" | "downloadCV"
  | "publishJob" | "previewJob" | "jobTitle" | "category" | "description"
  | "responsibilities" | "qualifications" | "deadline" | "currency";

type Translations = Record<LangCode, Record<TranslationKey, string>>;

export const translations: Translations = {
  en: {
    home: "Home", exploreJobs: "Explore Jobs", applications: "Applications",
    savedJobs: "Saved Jobs", myProfile: "My Profile", dashboard: "Dashboard",
    manageJobs: "Manage Jobs", applicants: "Applicants", interviews: "Interviews",
    companyProfile: "Company Profile", signIn: "Sign In", getStarted: "Get Started",
    postJob: "Post a Job", searchPlaceholder: "Job title, skill or company…",
    allLocations: "All Locations (Ethiopia)", findJobs: "Find Jobs",
    applyNow: "Apply Now", saveJob: "Save Job", viewJob: "View Job",
    salary: "Salary", submitted: "Submitted", underReview: "Under Review",
    shortlisted: "Shortlisted", interview: "Interview", accepted: "Accepted",
    rejected: "Not Selected", typeHere: "Type here…", coverLetter: "Cover Letter",
    submit: "Submit", cancel: "Cancel", save: "Save", edit: "Edit",
    skills: "Skills", experience: "Experience", education: "Education",
    about: "About", contact: "Contact", fullTime: "Full-time", partTime: "Part-time",
    contract: "Contract", remote: "Remote", hybrid: "Hybrid", onSite: "On-site",
    welcome: "Welcome", tagline: "Your Trusted Partner in Jobs",
    entryLevel: "Entry Level", midLevel: "Mid Level", seniorLevel: "Senior Level",
    schedule: "Schedule Interview", shortlist: "Shortlist", reject: "Reject",
    viewProfile: "View Profile", downloadCV: "Download CV",
    publishJob: "Publish Job", previewJob: "Preview Job",
    jobTitle: "Job Title", category: "Category", description: "Description",
    responsibilities: "Responsibilities", qualifications: "Qualifications",
    deadline: "Deadline", currency: "ETB",
  },
  am: {
    home: "መነሻ", exploreJobs: "ሥራዎችን ፈልግ", applications: "ማመልከቻዎቼ",
    savedJobs: "የተቀመጡ ሥራዎች", myProfile: "የእኔ መገለጫ", dashboard: "ዳሽቦርድ",
    manageJobs: "ሥራዎችን ያስተዳድሩ", applicants: "አመልካቾች", interviews: "ቃለ-ምልልሶች",
    companyProfile: "የድርጅቱ መገለጫ", signIn: "ግባ", getStarted: "ጀምር",
    postJob: "ሥራ ፈርጅ", searchPlaceholder: "ሥራ ርዕስ፣ ክህሎት ወይም ድርጅት…",
    allLocations: "ሁሉም ቦታዎች (ኢትዮጵያ)", findJobs: "ሥራ ፈልግ",
    applyNow: "አሁን አመልክት", saveJob: "ሥራ ቀምጥ", viewJob: "ሥራ ተመልከት",
    salary: "ደሞዝ", submitted: "ቀርቧል", underReview: "በግምገማ ላይ",
    shortlisted: "ተዘርዝሯል", interview: "ቃለ-ምልልስ", accepted: "ተቀባይ",
    rejected: "አልተቀበለም", typeHere: "እዚህ ጻፍ…", coverLetter: "የሽፋን ደብዳቤ",
    submit: "አስገባ", cancel: "ሰርዝ", save: "ቀምጥ", edit: "ያርትዑ",
    skills: "ክህሎቶች", experience: "ልምድ", education: "ትምህርት",
    about: "ስለ", contact: "አድራሻ", fullTime: "ሙሉ ሰዓት", partTime: "ሰሚ ሰዓት",
    contract: "ኮንትራት", remote: "ርቀት", hybrid: "ድብልቅ", onSite: "ቦታ ላይ",
    welcome: "እንኳን ደህና መጡ", tagline: "በሥራ ፍለጋ አስተማማኝ አጋርዎ",
    entryLevel: "ጀማሪ", midLevel: "መካከለኛ", seniorLevel: "ከፍተኛ",
    schedule: "ቃለ-ምልልስ ይያዙ", shortlist: "ዝርዝር ያስቀምጡ", reject: "ቅቡ",
    viewProfile: "መገለጫ ይመልከቱ", downloadCV: "ሲቪ ያውርዱ",
    publishJob: "ሥራ አቅርቡ", previewJob: "ቅድሚያ ይመልከቱ",
    jobTitle: "የሥራ ርዕስ", category: "ምድብ", description: "ዝርዝር",
    responsibilities: "ሃላፊነቶች", qualifications: "ብቃቶች",
    deadline: "የመጨረሻ ቀን", currency: "ብር",
  },
  om: {
    home: "Mana", exploreJobs: "Hojii Barbaadi", applications: "Gaaffilee Koo",
    savedJobs: "Hojii Qusatan", myProfile: "Profaayilii Koo", dashboard: "Daashboordi",
    manageJobs: "Hojii Bulchi", applicants: "Gaafattoota", interviews: "Interiviyuuwwan",
    companyProfile: "Profaayilii Dhaabbata", signIn: "Seeni", getStarted: "Jalqabi",
    postJob: "Hojii Maxxansi", searchPlaceholder: "Maqaa hojii, dandeettii yookiin dhaabbata…",
    allLocations: "Bakka Hunda (Itiyoophiyaa)", findJobs: "Hojii Barbaadi",
    applyNow: "Amma Gaafadhu", saveJob: "Hojii Qusadhu", viewJob: "Hojii Ilaali",
    salary: "Mindaa", submitted: "Dhiyaate", underReview: "Sakatta'amu irratti",
    shortlisted: "Tarreeffame", interview: "Interiviyuu", accepted: "Fudhatame",
    rejected: "Didame", typeHere: "Asitti barreessi…", coverLetter: "Xalayaa Wixinee",
    submit: "Dhiyeessi", cancel: "Dhiisi", save: "Qusadhu", edit: "Gulaali",
    skills: "Dandeettiwwan", experience: "Muuxannoo", education: "Barnootaa",
    about: "Waa'ee", contact: "Quunnamtii", fullTime: "Sa'aatii Guutuu",
    partTime: "Walakkaa Sa'aatii", contract: "Kontraatii", remote: "Fageenya irraa",
    hybrid: "Makaa", onSite: "Bakka irratti",
    welcome: "Baga Dhuftan", tagline: "Hojii Keessatti Hiriyyaa Keessan Amanamaa",
    entryLevel: "Jalqabaa", midLevel: "Gidduugaleessa", seniorLevel: "Olaanaa",
    schedule: "Interiviyuu Qindeessi", shortlist: "Tarreeffame Godhi", reject: "Didi",
    viewProfile: "Profaayilii Ilaali", downloadCV: "CV Buufadhu",
    publishJob: "Hojii Maxxansi", previewJob: "Dursinee Ilaali",
    jobTitle: "Maqaa Hojii", category: "Kutaa", description: "Ibsa",
    responsibilities: "Itti-gaafatamummaa", qualifications: "Ga'umsa",
    deadline: "Guyyaa Xumuraa", currency: "Birrii",
  },
  ti: {
    home: "ቤት", exploreJobs: "ስራሓት ፈልይ", applications: "ሕቶታተይ",
    savedJobs: "ዝተዓቀቡ ስራሓት", myProfile: "ፕሮፋይለይ", dashboard: "ዳሽቦርድ",
    manageJobs: "ስራሓት ምምሕዳር", applicants: "ሕቶ ቀረብቲ", interviews: "ቃለ-መሕትቶ",
    companyProfile: "ፕሮፋይል ትካል", signIn: "እቶ", getStarted: "ጀምር",
    postJob: "ስራሕ ኣቅርብ", searchPlaceholder: "ኣርእስቲ ስራሕ፣ ክእለት ወይ ትካል…",
    allLocations: "ኩሎም ቦታታት (ኢትዮጵያ)", findJobs: "ስራሕ ፈልይ",
    applyNow: "ሕጂ ሕተት", saveJob: "ስራሕ ዓቅብ", viewJob: "ስራሕ ርኣይ",
    salary: "ደሞዝ", submitted: "ቀሪቡ", underReview: "ኣብ ምምርማር",
    shortlisted: "ኣብ ዝርዝር ኣቲዩ", interview: "ቃለ-መሕትቶ", accepted: "ተቐቢሉ",
    rejected: "ኣይተቐበለን", typeHere: "ኣብዚ ጽሓፍ…", coverLetter: "ደብዳቤ መሸፈኒ",
    submit: "ኣቅርብ", cancel: "ሰርዝ", save: "ዓቅብ", edit: "ኣርም",
    skills: "ክእለታት", experience: "ተመኩሮ", education: "ትምህርቲ",
    about: "ብዛዕባ", contact: "ምርካብ", fullTime: "ምሉእ ሰዓት", partTime: "ፍርቂ ሰዓት",
    contract: "ኮንትራት", remote: "ካብ ርሑቅ", hybrid: "ሕዙዝ", onSite: "ኣብ ቦታ",
    welcome: "ሰላም ምጻእ", tagline: "ኣብ ስራሕ እሙን መሻርኽትኹም",
    entryLevel: "ጀማሪ", midLevel: "ማእኸላይ", seniorLevel: "ዝለዓለ",
    schedule: "ቃለ-መሕትቶ ምምቻእ", shortlist: "ዝርዝር ምግባር", reject: "ምንፋይ",
    viewProfile: "ፕሮፋይል ርኣይ", downloadCV: "CV ኣውርድ",
    publishJob: "ስራሕ ኣቅርብ", previewJob: "ቅድሚ ምሕታሚ ርኣይ",
    jobTitle: "ኣርእስቲ ስራሕ", category: "ዓይነት", description: "ምግላጽ",
    responsibilities: "ሓለፋታት", qualifications: "ብቕዓታት",
    deadline: "መወዳእታ ዕለት", currency: "ብር",
  },
};

export function t(lang: LangCode, key: TranslationKey): string {
  return translations[lang]?.[key] ?? translations["en"][key] ?? key;
}
