"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import { Job, JobType, ExperienceLevel, JobAttachment } from "@/types";
import { ETHIOPIAN_LOCATIONS, MOCK_CATEGORIES } from "@/data/mockData";
import WordDocumentEditor from "./WordDocumentEditor";
import RichDocumentRenderer from "@/components/common/RichDocumentRenderer";
import {
  Briefcase,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  Eye,
  Plus,
  Trash2,
  X,
  ShieldCheck,
  ArrowRight,
  Zap,
  FileText,
  Check,
} from "lucide-react";

export default function PostJobView() {
  const { company, postNewJob, updateJob, editingJob, setEditingJob, setTab, showToast, openPaymentModal, lang } = useApp();

  const [title, setTitle] = useState(editingJob?.title || "");
  const [category, setCategory] = useState(editingJob?.category || "Software & IT");
  const [workplaceType, setWorkplaceType] = useState<"On-site" | "Hybrid" | "Remote">(editingJob?.workplaceType || "Hybrid");
  const [type, setType] = useState<JobType>(editingJob?.type || "Full-time");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    editingJob?.experienceLevel || "Mid Level (2-4 yrs)"
  );
  const [location, setLocation] = useState(editingJob?.location || "Addis Ababa (Bole)");
  const [salaryMin, setSalaryMin] = useState<number>(editingJob?.salaryMin || 35000);
  const [salaryMax, setSalaryMax] = useState<number>(editingJob?.salaryMax || 55000);
  const [deadline, setDeadline] = useState(editingJob?.deadline || "Dec 31, 2026");
  const [selectedPackage, setSelectedPackage] = useState<"standard" | "featured" | "vip_broadcast">(editingJob?.packageType || "featured");
  const [postMode, setPostMode] = useState<"express" | "advanced">("express");
  const [openingsCount, setOpeningsCount] = useState<number>(editingJob?.openingsCount || 1);
  const [isDirectApply, setIsDirectApply] = useState<boolean>(editingJob?.directAgentApply ?? true);

  const [description, setDescription] = useState(
    `# Position Overview & Organizational Mission\n## Executive & Operational Brief\n\nOutline the primary objectives and daily operational responsibilities of this role here in Microsoft Word style. Use headings, bold styling, and bullet points to organize the vacancy notice.\n\n> 📋 **OFFICIAL RECRUITMENT NOTICE**\n> This position offers competitive compensation in ETB with performance bonuses and comprehensive health insurance.\n\n### Key Daily Expectations:\n• Coordinate with cross-functional leadership and department supervisors.\n• Ensure timely delivery of deliverables aligned with Ethiopian operational standards.\n• Maintain strict confidentiality, professional integrity, and team leadership.`
  );
  const [attachments, setAttachments] = useState<JobAttachment[]>([
    {
      id: "att-default-1",
      name: "Official_Vacancy_Circular_2026.pdf",
      size: "1.2 MB",
      type: "pdf",
      url: "#",
    },
  ]);
  const [flyerImage, setFlyerImage] = useState<string | undefined>(undefined);

  const [responsibilities, setResponsibilities] = useState<string[]>([
    "Build high-performance, responsive web interfaces using modern frameworks.",
    "Collaborate with product designers and backend engineers in agile sprints.",
  ]);
  const [newResp, setNewResp] = useState("");

  const [qualifications, setQualifications] = useState<string[]>([
    "BSc in Computer Science, Software Engineering, or related technical field.",
    "2+ years practical engineering experience in web or mobile application development.",
  ]);
  const [newQual, setNewQual] = useState("");

  const [skills, setSkills] = useState<string[]>([
    "TypeScript",
    "React / Next.js",
    "Tailwind CSS",
  ]);
  const [newSkill, setNewSkill] = useState("");

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const handleAiGenerateDescription = () => {
    const jobTitle = title.trim() || "Senior Full Stack Software Engineer";
    if (!title.trim()) setTitle(jobTitle);

    setIsAiGenerating(true);
    showToast(`Drafting description for "${jobTitle}" with AI...`, "info");

    setTimeout(() => {
      setIsAiGenerating(false);
      setDescription(
        `# ${jobTitle}
## ${company.name} • ${location}

### Executive Role Summary:
We are seeking an exceptionally talented and motivated **${jobTitle}** to join our team at ${company.name}. In this role, you will lead high-impact initiatives, uphold organizational standards, and collaborate closely with team leadership to drive excellence.

### Key Responsibilities & Deliverables:
• Spearhead daily operational tasks and oversee end-to-end execution of core deliverables.
• Partner with multidisciplinary staff to streamline organizational workflows.
• Ensure adherence to Ethiopian regulatory benchmarks, compliance, and quality standards.
• Mentor junior personnel and contribute to ongoing team development and knowledge sharing.

### Compensation & Benefits:
• Competitive monthly salary: **${salaryMin.toLocaleString()} - ${salaryMax.toLocaleString()} ETB**
• Health coverage and statutory employment benefits
• Fast-track career advancement in a premier Ethiopian organization.`
      );

      setResponsibilities([
        `Execute end-to-end responsibilities related to ${jobTitle}.`,
        "Collaborate with internal departments and regional operational leadership.",
        "Deliver progress reports and KPIs aligned with company targets.",
        "Participate in sprint planning and daily standups.",
      ]);

      setQualifications([
        "Bachelor's degree or equivalent accredited qualification in a relevant discipline.",
        "2+ years proven operational experience in a fast-paced environment.",
        "Fluency in English and Amharic (both written and oral).",
        "Strong interpersonal communication, leadership, and problem-solving skills.",
      ]);

      setSkills([
        "Operational Leadership",
        "Strategic Planning",
        "Team Collaboration",
        "Amharic & English Communication",
      ]);

      showToast(`✨ AI drafted full description & requirements for "${jobTitle}"!`, "success");
    }, 700);
  };

  const handleApplyTemplate = (templateType: "tdrf" | "skylight" | "fintech") => {
    if (templateType === "tdrf") {
      setTitle("Executive Director (Consultant) - TDRF");
      setCategory("Operations & Management");
      setLocation("Mekelle, Tigray (with field travel)");
      setWorkplaceType("On-site");
      setType("Contract");
      setExperienceLevel("Lead / Director");
      setSalaryMin(140000);
      setSalaryMax(195000);
      setFlyerImage(
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=80"
      );
      setDescription(
        `# Executive Director (Consultant)
## Tigray Disaster Relief Fund (TDRF) • Mekelle, Tigray

> 📢 **WE'RE HIRING! JOIN THE TDRF TEAM**
> Tigray Disaster Relief Fund is looking for passionate, committed, and motivated individuals who want to make a meaningful impact. We are growing our team and seeking people who share our commitment to humanitarian service, community empowerment, and supporting vulnerable populations.

---

### Key Assignment Details:
• **Location:** Mekelle, Tigray, Ethiopia (with field travel across regional woredas)
• **Duration:** Six-month consultancy, with high possibility of extension
• **Start Date:** ASAP (Immediate deployment)
• **Monthly Compensation:** 140,000 - 195,000 ETB + field travel allowances

---

### Core Objectives & Responsibilities:
1. Provide executive leadership and oversight for all TDRF emergency relief and recovery programs across Tigray.
2. Lead operational implementation, ensuring accountability, timely reporting, and high humanitarian standards.
3. Liaise with diaspora leadership, international donors, UN agencies, and local community-based organizations.
4. Coordinate field missions, rapid vulnerability assessments, and transparent distribution networks.

> ⚡ **FAST-TRACK RECRUITMENT NOTICE**
> Qualified candidates can submit their CV below or apply directly via Azmera Job Connect on Telegram (@AzmeraJobConnect) or Phone (+251 91 100 0000).`
      );
      setAttachments([
        {
          id: "att-tdrf-1",
          name: "TDRF_Executive_Director_Terms_of_Reference.pdf",
          size: "1.4 MB",
          type: "pdf",
          url: "#",
        },
        {
          id: "att-tdrf-2",
          name: "TDRF_Humanitarian_Framework_2026.docx",
          size: "620 KB",
          type: "docx",
          url: "#",
        },
      ]);
      setResponsibilities([
        "Provide executive leadership and oversight for all TDRF emergency relief programs.",
        "Lead operational implementation ensuring high humanitarian standards.",
        "Liaise with diaspora leadership, international donors, and UN agencies.",
        "Oversee financial budgets, compliance, and transparent reporting.",
      ]);
      setQualifications([
        "Master's degree in Humanitarian Affairs, Development Studies, or related field.",
        "7+ years of senior executive or program management experience.",
        "Deep understanding of the humanitarian landscape in Tigray.",
        "Fluency in English and Tigrigna is required.",
      ]);
      setSkills(["Executive Leadership", "Humanitarian Relief", "Program Management", "Tigrigna"]);
      showToast("Loaded TDRF Humanitarian Circular Template with full Word formatting!");
    } else if (templateType === "skylight") {
      setTitle("Hospitality & Hotel Specialists (124 Vacancies)");
      setCategory("Hospitality & Tourism");
      setLocation("Bole Skylight, Addis Ababa");
      setWorkplaceType("On-site");
      setType("Full-time");
      setExperienceLevel("Mid Level (2-4 yrs)");
      setSalaryMin(28000);
      setSalaryMax(48000);
      setFlyerImage(
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80"
      );
      setDescription(
        `# Ethiopian Skylight Hotel • Mass Recruitment Drive
## 124 Diverse Hospitality & Operations Vacancies

Ethiopian Skylight Hotel (Africa's largest 5-star hotel with 1,024 luxury rooms) invites qualified professionals to join our world-class team across diverse departments.

---

### Openings Breakdown:
| Department / Position | Number of Vacancies | Experience Required |
| :--- | :--- | :--- |
| Food & Beverage Captains | 28 Openings | 2+ years 5-star service |
| Guest Reception & Concierge | 32 Openings | Fluent English + Amharic |
| Banquet & Event Coordinators | 24 Openings | Large conference experience |
| Housekeeping & Facility Attendants | 40 Openings | TVET certificate / High School |

> 🎁 **EMPLOYEE BENEFITS:**
> • Free international staff dining & luxury transport shuttle
> • Subsidized family health insurance coverage
> • World-class Ethiopian Airlines hospitality training certifications`
      );
      setAttachments([
        {
          id: "att-sky-1",
          name: "Skylight_Hotel_124_Openings_Intake_Guide.pdf",
          size: "2.1 MB",
          type: "pdf",
          url: "#",
        },
      ]);
      setSkills(["Guest Services", "Front Desk", "Food & Beverage", "Banquet Operations"]);
      showToast("Loaded Skylight 124 Openings Hotel Template!");
    } else {
      setTitle("Senior Full Stack Software Engineer");
      setCategory("Software & IT");
      setLocation("Addis Ababa (Bole)");
      setWorkplaceType("Hybrid");
      setType("Full-time");
      setExperienceLevel("Senior Level (5+ yrs)");
      setSalaryMin(50000);
      setSalaryMax(75000);
      setDescription(
        `# Senior Full Stack Engineer (Next.js & Python)
## Enterprise Digital Payments & FinTech Switch

We are building high-resilience payment infrastructure powering digital commerce across Ethiopia.

### Technical Stack & Architecture:
• **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Turbopack
• **Backend:** Python, FastAPI, PostgreSQL, Redis, Kafka
• **Integrations:** EthSwitch, Telebirr API, CBE Birr, Visa / Mastercard

> 🚀 **EQUITY & PERKS:**
> • Competitive monthly ETB base salary with annual FX bonus
> • Brand new Apple MacBook Pro M3
> • Flexible hybrid work model (2 days office in Bole, 3 days remote)`
      );
      showToast("Loaded FinTech Engineering Template!");
    }
  };

  const handleAddResp = () => {
    if (newResp.trim()) {
      setResponsibilities([...responsibilities, newResp.trim()]);
      setNewResp("");
    }
  };

  const handleAddQual = () => {
    if (newQual.trim()) {
      setQualifications([...qualifications, newQual.trim()]);
      setNewQual("");
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      showToast("Please add a job title before saving as draft.", "error");
      return;
    }
    if (editingJob) {
      updateJob(editingJob.id, {
        title,
        location,
        workplaceType,
        category,
        type,
        experienceLevel,
        salaryMin: Number(salaryMin),
        salaryMax: Number(salaryMax),
        description,
        deadline,
        status: "Draft",
        openingsCount: Number(openingsCount) || 1,
        directAgentApply: isDirectApply,
      });
    } else {
      postNewJob({
        title,
        companyId: company.id,
        companyName: company.name,
        companyLogo: company.logo,
        verified: company.verified,
        location,
        workplaceType,
        category,
        type,
        experienceLevel,
        salaryMin: Number(salaryMin),
        salaryMax: Number(salaryMax),
        salaryCurrency: "ETB",
        salaryPeriod: "monthly",
        description,
        responsibilities: responsibilities.length ? responsibilities : ["Deliver quality operations."],
        qualifications: qualifications.length ? qualifications : ["Relevant qualifications."],
        skills: skills.length ? skills : ["Communication", "Problem Solving"],
        deadline,
        status: "Draft",
        featured: false,
        packageType: selectedPackage,
        paymentStatus: "unpaid",
        openingsCount: Number(openingsCount) || 1,
        directAgentApply: isDirectApply,
      });
    }
    setTab("manage-jobs");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast("Please provide job title and description.");
      return;
    }

    if (editingJob) {
      updateJob(editingJob.id, {
        title,
        location,
        workplaceType,
        category,
        type,
        experienceLevel,
        salaryMin: Number(salaryMin),
        salaryMax: Number(salaryMax),
        description,
        richDescriptionHtml: description,
        responsibilities: responsibilities.length ? responsibilities : ["Deliver quality operations."],
        qualifications: qualifications.length ? qualifications : ["Relevant qualifications."],
        skills: skills.length ? skills : ["Communication", "Problem Solving"],
        deadline,
        status: "Active",
        featured: selectedPackage !== "standard",
        packageType: selectedPackage,
        openingsCount: Number(openingsCount) || 1,
        directAgentApply: isDirectApply,
      });
      setTab("manage-jobs");
      return;
    }

    const pkgPrice =
      selectedPackage === "standard"
        ? 500
        : selectedPackage === "featured"
          ? 1500
          : 2500;

    const pkgTitle =
      selectedPackage === "standard"
        ? "Standard Vacancy Post (500 ETB)"
        : selectedPackage === "featured"
          ? "Featured + Fast-Track 48h Match (1,500 ETB)"
          : "Omnichannel VIP Broadcast (2,500 ETB)";

    openPaymentModal({
      amount: pkgPrice,
      purpose:
        selectedPackage === "standard"
          ? "job_post_standard"
          : selectedPackage === "featured"
            ? "job_post_featured"
            : "social_broadcast",
      purposeLabel: `${pkgTitle} • "${title}"`,
      title: `Publish Vacancy with ${pkgTitle}`,
      description: `Settle your payment via Telebirr, CBE Bank, or M-Pesa to activate this vacancy across Ethiopian hiring channels.`,
      metadata: {
        jobTitle: title,
        packageType: selectedPackage,
      },
      onSuccess: (tx) => {
        postNewJob({
          title,
          companyId: company.id,
          companyName: company.name,
          companyLogo: company.logo,
          verified: company.verified,
          location,
          workplaceType,
          category,
          type,
          experienceLevel,
          salaryMin: Number(salaryMin),
          salaryMax: Number(salaryMax),
          salaryCurrency: "ETB",
          salaryPeriod: "monthly",
          description,
          richDescriptionHtml: description,
          attachments: attachments.length ? attachments : undefined,
          flyerImage: flyerImage || undefined,
          responsibilities: responsibilities.length ? responsibilities : ["Deliver quality operations."],
          qualifications: qualifications.length ? qualifications : ["Relevant qualifications."],
          skills: skills.length ? skills : ["Communication", "Problem Solving"],
          deadline,
          status: "Active",
          featured: selectedPackage !== "standard",
          packageType: selectedPackage,
          paymentStatus: "paid",
          paymentTxRef: tx.referenceNumber,
          openingsCount: Number(openingsCount) || 1,
          directAgentApply: isDirectApply,
        });

        setTab("manage-jobs");
      },
    });
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#0A2540] dark:text-[#FBBF24] uppercase tracking-wider">
            Talent Acquisition Form
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            {editingJob ? t(lang, "editVacancy") : t(lang, "postNewVacancy")}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Reach thousands of qualified Ethiopian professionals on Azmera Jobs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
            <span>Preview Vacancy</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs (Feature-Based & Easy for Users) */}
      <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-0 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setPostMode("express")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${postMode === "express"
            ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-md"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
        >
          <Zap className="w-4 h-4 text-[#F59E0B] dark:text-[#0A2540]" />
          <span>⚡ {t(lang, "expressModeLabel")}</span>
          <span className="text-[10px] bg-white/20 dark:bg-[#0A2540]/20 px-2 py-0.5 rounded-full font-bold">
            Recommended
          </span>
        </button>

        <button
          type="button"
          onClick={() => setPostMode("advanced")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${postMode === "advanced"
            ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-md"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
        >
          <FileText className="w-4 h-4" />
          <span>📄 {t(lang, "advancedWordModeLabel")}</span>
        </button>
      </div>

      {/* ── EXPRESS 60-SECOND FORM ── */}
      {postMode === "express" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            {/* 1-Click Popular Job Presets */}
            <div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white block mb-2">
                {t(lang, "rolePresetsLabel")}:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: "Dining Host & Server", cat: "Hospitality & Tourism", min: 18000, max: 26000 },
                  { t: "Barista", cat: "Hospitality & Tourism", min: 16000, max: 24000 },
                  { t: "Cashier & Ticketing", cat: "Customer Service & Spa", min: 15000, max: 22000 },
                  { t: "Sales & Marketing Officer", cat: "Sales & Marketing", min: 25000, max: 40000 },
                  { t: "Junior Software Developer", cat: "Software & IT", min: 35000, max: 60000 },
                  { t: "Hotel Housekeeping Specialist", cat: "Hospitality & Tourism", min: 14000, max: 20000 },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTitle(item.t);
                      setCategory(item.cat);
                      setSalaryMin(item.min);
                      setSalaryMax(item.max);
                      showToast(`Applied preset: ${item.t}`);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-[#F59E0B] text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    + {item.t}
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white">
                    Job Position Title *
                  </label>
                  <button
                    type="button"
                    onClick={handleAiGenerateDescription}
                    disabled={isAiGenerating}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-extrabold bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900 text-[#0A2540] dark:text-[#F59E0B] border border-amber-200 dark:border-amber-800 transition-all cursor-pointer shadow-2xs"
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-[#F59E0B] ${isAiGenerating ? "animate-spin" : ""}`} />
                    <span>{isAiGenerating ? "Generating..." : "✨ AI Draft with Gemini"}</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dining Host, Barista, Software Engineer..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Job Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  {MOCK_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Location (City / Sub-City)
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  {ETHIOPIAN_LOCATIONS.filter((l) => !l.includes("All Locations")).map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Openings & ETB Salary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Number of Openings
                </label>
                <input
                  type="number"
                  min="1"
                  value={openingsCount}
                  onChange={(e) => setOpeningsCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Min Monthly ETB Salary
                </label>
                <input
                  type="number"
                  step="1000"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Max Monthly ETB Salary
                </label>
                <input
                  type="number"
                  step="1000"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            {/* Fast-Track Direct Apply Switch */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                  <span className="text-base">⚡</span> {t(lang, "directApplyBadge")}
                </span>
                <p className="text-[11px] text-amber-900/80 dark:text-amber-300/80 mt-0.5">
                  Candidates apply directly to Azmera agents via Telegram (@AzmeraJobConnect) for rapid phone screening in under 48 hours.
                </p>
              </div>
              <input
                type="checkbox"
                checked={isDirectApply}
                onChange={(e) => setIsDirectApply(e.target.checked)}
                className="w-5 h-5 accent-[#0A2540] cursor-pointer shrink-0"
              />
            </div>

            {/* Quick Description */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Short Duties &amp; Requirements
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe key shift times, customer service expectations, or qualifications..."
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none resize-none"
              />
            </div>
          </div>

          {/* Section 5: Monetization & Promotion Tier (Telebirr, CBE, M-Pesa) */}
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] flex items-center justify-center text-xs font-black">
                  ★
                </span>
                Choose Promotion Package &amp; Settlement
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                <span>Pay via:</span>
                <span className="text-[#00843D] bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">Telebirr</span>
                <span className="text-[#8A1538] bg-pink-50 dark:bg-pink-950/60 px-1.5 py-0.5 rounded">CBE Bank</span>
                <span className="text-[#00B04F] bg-green-50 dark:bg-green-950/60 px-1.5 py-0.5 rounded">M-Pesa</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Standard Post */}
              <div
                onClick={() => setSelectedPackage("standard")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${selectedPackage === "standard"
                  ? "border-[#0A2540] dark:border-[#F59E0B] bg-slate-50/80 dark:bg-slate-800/80 ring-2 ring-[#0A2540]/20 dark:ring-[#F59E0B]/20"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Basic
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    500 ETB
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                  Standard Vacancy
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Live for 30 days on portal with applicant resume tracking.
                </p>
              </div>

              {/* Featured Post (Recommended) */}
              <div
                onClick={() => setSelectedPackage("featured")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${selectedPackage === "featured"
                  ? "border-amber-500 bg-amber-50/40 dark:bg-amber-950/30 ring-2 ring-amber-500/30"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
              >
                <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-amber-500 text-white text-[9px] font-black rounded-full uppercase">
                  Most Popular
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    🔥 Recommended
                  </span>
                  <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                    1,500 ETB
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                  Featured + 48h Match
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Pinned gold badge at the top + Telegram alert + fast 48h screening.
                </p>
              </div>

              {/* Omnichannel VIP Broadcast */}
              <div
                onClick={() => setSelectedPackage("vip_broadcast")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${selectedPackage === "vip_broadcast"
                  ? "border-[#0A2540] dark:border-[#F59E0B] bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 ring-2 ring-[#0A2540]/20 dark:ring-[#F59E0B]/30"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A2540] dark:text-[#F59E0B]">
                    👑 Omnichannel VIP
                  </span>
                  <span className="text-sm font-black text-[#0A2540] dark:text-[#F59E0B]">
                    2,500 ETB
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                  VIP Mega Broadcast
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  92k+ Telegram reach in 3 languages + FB syndication + 14-day staff replacement.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-xs font-bold text-slate-800 dark:text-white cursor-pointer"
            >
              {t(lang, "saveAsDraft")}
            </button>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
            >
              {t(lang, "previewJob")}
            </button>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-black shadow-lg shadow-[#0A2540]/20 flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{editingJob ? t(lang, "updateVacancy") : t(lang, "publishJob")}</span>
            </button>
          </div>
        </form>
      ) : (
        /* ── ADVANCED WORD CIRCULAR FORM ── */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] flex items-center justify-center text-xs font-black">
                1
              </span>
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Full Stack Engineer (Next.js & Python)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:border-[#0A2540] dark:focus:border-[#F59E0B] focus:bg-white dark:focus:bg-[#101E33] text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Job Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:border-[#0A2540] dark:focus:border-[#F59E0B] focus:bg-white dark:focus:bg-[#101E33] text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  {MOCK_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name} className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Employment Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as JobType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:border-[#0A2540] dark:focus:border-[#F59E0B] focus:bg-white dark:focus:bg-[#101E33] text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  <option value="Full-time" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">Full-time</option>
                  <option value="Contract" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">Contract</option>
                  <option value="Part-time" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">Part-time</option>
                  <option value="Internship" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Workplace Model *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["On-site", "Hybrid", "Remote"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setWorkplaceType(m)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${workplaceType === m
                        ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] border-[#0A2540] dark:border-[#F59E0B] shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700"
                        }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Experience Level *
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:border-[#0A2540] dark:focus:border-[#F59E0B] focus:bg-white dark:focus:bg-[#101E33] text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  <option value="Entry Level (0-1 yrs)" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">Entry Level (0-1 yrs)</option>
                  <option value="Mid Level (2-4 yrs)" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">Mid Level (2-4 yrs)</option>
                  <option value="Senior Level (5+ yrs)" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">Senior Level (5+ yrs)</option>
                  <option value="Lead / Director" className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">Lead / Director</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Location & Compensation */}
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] flex items-center justify-center text-xs font-black">
                2
              </span>
              Location & Compensation (ETB)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Location in Ethiopia *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:border-[#0A2540] dark:focus:border-[#F59E0B] focus:bg-white dark:focus:bg-[#101E33] text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  {ETHIOPIAN_LOCATIONS.filter((l) => !l.includes("All Locations")).map(
                    (loc) => (
                      <option key={loc} value={loc} className="text-slate-900 bg-white dark:bg-[#101E33] dark:text-white">
                        {loc}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Minimum Monthly Salary (ETB)
                </label>
                <input
                  type="number"
                  step={1000}
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:border-[#0A2540] dark:focus:border-[#F59E0B] focus:bg-white dark:focus:bg-[#101E33] text-xs text-slate-900 dark:text-white outline-none font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Maximum Monthly Salary (ETB)
                </label>
                <input
                  type="number"
                  step={1000}
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 focus:border-[#0A2540] dark:focus:border-[#F59E0B] focus:bg-white dark:focus:bg-[#101E33] text-xs text-slate-900 dark:text-white outline-none font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Job Description & Microsoft Word Document Editor */}
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#0078D4] text-white flex items-center justify-center text-xs font-black shadow-xs">
                    W
                  </span>
                  Word Document &amp; Vacancy Circular Editor
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Full Microsoft Word style editor: format headings, bold/highlight text, insert graphics, and attach PDF circulars
                </p>
              </div>

              {/* Quick Templates Strip */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  Templates:
                </span>
                <button
                  type="button"
                  onClick={() => handleApplyTemplate("tdrf")}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200 text-[11px] font-bold border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
                >
                  🏛️ TDRF NGO
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTemplate("skylight")}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200 text-[11px] font-bold border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer"
                >
                  🏨 Skylight 124
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyTemplate("fintech")}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0A2540] dark:bg-blue-950/50 dark:text-blue-200 text-[11px] font-bold border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
                >
                  💻 FinTech
                </button>
              </div>
            </div>

            <WordDocumentEditor
              description={description}
              onChangeDescription={setDescription}
              attachments={attachments}
              onChangeAttachments={setAttachments}
              flyerImage={flyerImage}
              onChangeFlyerImage={setFlyerImage}
              onApplyTemplate={handleApplyTemplate}
            />

            {/* Responsibilities list builder */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Responsibilities
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a key responsibility..."
                  value={newResp}
                  onChange={(e) => setNewResp(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddResp();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddResp}
                  className="px-4 py-2 bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1.5">
                {responsibilities.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700/60"
                  >
                    <span className="flex-1">• {r}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setResponsibilities(responsibilities.filter((_, idx) => idx !== i))
                      }
                      className="text-slate-400 hover:text-red-500 pl-2 cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualifications list builder */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Required Qualifications
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a required credential or experience..."
                  value={newQual}
                  onChange={(e) => setNewQual(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddQual();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddQual}
                  className="px-4 py-2 bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1.5">
                {qualifications.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700/60"
                  >
                    <span className="flex-1">✓ {q}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setQualifications(qualifications.filter((_, idx) => idx !== i))
                      }
                      className="text-slate-400 hover:text-red-500 pl-2 cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Skills tags */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                Required Skills Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="e.g. Next.js, Python, PostgreSQL, Telebirr..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Add Skill
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>{s}</span>
                    <button
                      type="button"
                      onClick={() => setSkills(skills.filter((sk) => sk !== s))}
                      className="text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Application Settings */}
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] flex items-center justify-center text-xs font-black">
                4
              </span>
              Application Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Application Deadline
                </label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="e.g. Dec 31, 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Monetization & Promotion Tier (Telebirr, CBE, M-Pesa) */}
          <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] flex items-center justify-center text-xs font-black">
                  5
                </span>
                Choose Publication Package & Promotion Tier
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                <span>Pay via:</span>
                <span className="text-[#00843D] bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">Telebirr</span>
                <span className="text-[#8A1538] bg-pink-50 dark:bg-pink-950/60 px-1.5 py-0.5 rounded">CBE Bank</span>
                <span className="text-[#00B04F] bg-green-50 dark:bg-green-950/60 px-1.5 py-0.5 rounded">M-Pesa</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Standard Post */}
              <div
                onClick={() => setSelectedPackage("standard")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${selectedPackage === "standard"
                  ? "border-[#0A2540] dark:border-[#F59E0B] bg-slate-50/80 dark:bg-slate-800/80 ring-2 ring-[#0A2540]/20 dark:ring-[#F59E0B]/20"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Basic
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    500 ETB
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                  Standard Vacancy
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Live for 30 days on portal with applicant resume tracking.
                </p>
              </div>

              {/* Featured Post (Recommended) */}
              <div
                onClick={() => setSelectedPackage("featured")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${selectedPackage === "featured"
                  ? "border-amber-500 bg-amber-50/40 dark:bg-amber-950/30 ring-2 ring-amber-500/30"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
              >
                <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-amber-500 text-white text-[9px] font-black rounded-full uppercase">
                  Most Popular
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    🔥 Recommended
                  </span>
                  <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                    1,500 ETB
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                  Featured + 48h Match
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Pinned gold badge at the top of category + Telegram alert + fast 48h screening.
                </p>
              </div>

              {/* Omnichannel VIP Broadcast */}
              <div
                onClick={() => setSelectedPackage("vip_broadcast")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${selectedPackage === "vip_broadcast"
                  ? "border-[#0A2540] dark:border-[#F59E0B] bg-[#0A2540]/5 dark:bg-[#F59E0B]/10 ring-2 ring-[#0A2540]/20 dark:ring-[#F59E0B]/30"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A2540] dark:text-[#F59E0B]">
                    👑 Omnichannel VIP
                  </span>
                  <span className="text-sm font-black text-[#0A2540] dark:text-[#F59E0B]">
                    2,500 ETB
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                  VIP Mega Broadcast
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  92k+ Telegram reach in 3 languages + FB syndication + 14-day staff replacement.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-white cursor-pointer transition-colors"
            >
              {t(lang, "saveAsDraft")}
            </button>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-900 dark:text-white cursor-pointer transition-colors"
            >
              {t(lang, "previewJob")}
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-extrabold shadow-md shadow-[#0A2540]/20 flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{editingJob ? t(lang, "updateVacancy") : t(lang, "publishJob")}</span>
            </button>
          </div>
        </form>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#0A2540] dark:text-[#FBBF24] uppercase tracking-wider">
                  Live Preview
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {title || "Job Title Preview"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{company.name} • {location}</p>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 rounded-2xl flex items-center justify-between text-xs">
              <span className="text-amber-950 dark:text-amber-200 font-bold">
                Salary: {Number(salaryMin).toLocaleString()} -{" "}
                {Number(salaryMax).toLocaleString()} ETB / month
              </span>
              <span className="text-[#0A2540] dark:text-[#38BDF8] font-semibold">{type}</span>
            </div>

            <div className="space-y-2 text-xs text-slate-900 dark:text-white">
              <h4 className="font-bold">Description:</h4>
              <RichDocumentRenderer content={description || "No description provided yet."} />
            </div>

            <div className="space-y-2 text-xs text-slate-900 dark:text-white">
              <h4 className="font-bold">Responsibilities:</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                {responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 text-xs text-slate-900 dark:text-white">
              <h4 className="font-bold">Required Skills:</h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[#0A2540] dark:text-[#FBBF24] font-bold border border-slate-200 dark:border-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
