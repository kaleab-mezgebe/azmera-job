"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Sparkles,
  Zap,
  Briefcase,
  ShieldCheck,
  Send,
  CreditCard,
  FileText,
  Users,
  Globe2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin,
  Smartphone,
  Eye,
  Check,
} from "lucide-react";

export default function FeatureQuickHub() {
  const { role, setTab, openPaymentModal, showToast, lang, setLang } = useApp();
  const [activeCategory, setActiveCategory] = useState<"all" | "seekers" | "employers" | "payments">("all");

  const goEmployer = (targetTab: string, okMsg: string) => {
    if (role === "employer") {
      setTab(targetTab);
      showToast(okMsg);
    } else {
      showToast("Sign in as an Employer to use this recruitment tool.", "info");
      setTab("signin");
    }
  };

  const features = [
    {
      id: "feat-etb-salary",
      category: "seekers",
      icon: TrendingUp,
      title: "100% ETB Salary Transparency",
      amharicTitle: "ግልጽ የብር ደመወዝ",
      badge: "Zero Ghost Jobs",
      badgeColor: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
      description: "Every vacancy mandates exact minimum and maximum monthly ETB compensation. No more awkward negotiations.",
      actionLabel: "Explore ETB Jobs",
      onAction: () => {
        setTab("search");
        showToast("Filtering jobs with transparent ETB compensation!");
      },
    },
    {
      id: "feat-fast-track",
      category: "seekers",
      icon: Zap,
      title: "Telegram Fast-Track Direct Apply",
      amharicTitle: "በቴሌግራም ቀጥታ ማመልከቻ",
      badge: "30-Second Apply",
      badgeColor: "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300",
      description: "Skip lengthy application forms. For urgent walk-in & hospitality jobs, apply directly to Azmera talent agents via Telegram.",
      actionLabel: "View Fast-Track Roles",
      onAction: () => {
        setTab("search");
        showToast("Displaying Fast-Track direct-apply vacancies!");
      },
    },
    {
      id: "feat-express-post",
      category: "employers",
      icon: Briefcase,
      title: "60-Second Express Job Post",
      amharicTitle: "በ 1 ደቂቃ ስራ መለጠፊያ",
      badge: "Easy for Recruiters",
      badgeColor: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
      description: "Designed for busy cafe, hotel, and retail managers. Fill 4 simple fields and publish across Ethiopia in under 60 seconds.",
      actionLabel: "Post Job in 60s",
      onAction: () => goEmployer("post-job", "Opening 60-Second Express Job Post form!"),
    },
    {
      id: "feat-payments",
      category: "payments",
      icon: CreditCard,
      title: "Telebirr, CBE Bank & M-Pesa",
      amharicTitle: "ቴሌብር • ንግድ ባንክ • M-Pesa",
      badge: "Instant Mobile Pay",
      badgeColor: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
      description: "Seamless Ethiopian mobile payments with real-time verification and automated VAT e-receipts for employers.",
      actionLabel: "Test Payment Flow",
      onAction: () => {
        openPaymentModal({
          amount: 1500,
          purpose: "job_post_featured",
          purposeLabel: "Featured Vacancy Promotion (Demo Simulation)",
          title: "Try Telebirr, CBE or M-Pesa Payment",
          description: "Experience how employers pay and receive instant automated confirmation.",
        });
      },
    },
    {
      id: "feat-broadcast",
      category: "employers",
      icon: Send,
      title: "Omnichannel Social Media Broadcast",
      amharicTitle: "የቴሌግራም እና ፌስቡክ ብሮድካስት",
      badge: "92,000+ Reach",
      badgeColor: "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300",
      description: "1-Click formatted job digest generation for Telegram & Facebook in Amharic, Tigrigna, and English.",
      actionLabel: "Open Broadcast Studio",
      onAction: () => goEmployer("employer-dashboard", "Opening Social Broadcast & Intake Studio!"),
    },
    {
      id: "feat-guarantee",
      category: "employers",
      icon: ShieldCheck,
      title: "14-Day Free Replacement Guarantee",
      amharicTitle: "የ14 ቀናት የተተኪ ሰራተኛ ዋስትና",
      badge: "Zero-Risk Hiring",
      badgeColor: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
      description: "If a hired candidate departs within 14 days, Azmera provides an immediate vetted replacement at zero extra cost.",
      actionLabel: "View Billing & Warranty",
      onAction: () => goEmployer("billing", "Viewing 14-Day Staff Replacement Warranty & Billing!"),
    },
    {
      id: "feat-trilingual",
      category: "seekers",
      icon: Globe2,
      title: "Multi-Language Engine",
      amharicTitle: "አማርኛ • ትግርኛ • Oromoo • English",
      badge: "Localized for Ethiopia",
      badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
      description: "Tailored for multi-regional employment with native typography in Addis Ababa, Mekelle, Hawassa, and nationwide.",
      actionLabel:
        lang === "am"
          ? "ቋንቋ ቀይር"
          : lang === "om"
          ? "Afaan Jijjiiri"
          : lang === "ti"
          ? "ቋንቋ ቀይር"
          : "Switch Language",
      onAction: () => {
        const order: Array<"en" | "am" | "om" | "ti"> = ["en", "am", "om", "ti"];
        const nextLang = order[(order.indexOf(lang) + 1) % order.length];
        setLang(nextLang);
        const labels = { en: "English", am: "አማርኛ", om: "Afaan Oromoo", ti: "ትግርኛ" };
        showToast(`Language switched to ${labels[nextLang]}`);
      },
    },
    {
      id: "feat-word-circular",
      category: "employers",
      icon: FileText,
      title: "Microsoft Word-Style Circular Editor",
      amharicTitle: "የዎርድ ስታይል ማስታወቂያ አዘጋጅ",
      badge: "Official ToR & PDFs",
      badgeColor: "bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 text-[#0A2540] dark:text-[#F59E0B]",
      description: "Author complete vacancies with rich tables, headings, flyer images, and downloadable official PDF circulars for NGOs & banks.",
      actionLabel: "Launch Circular Editor",
      onAction: () => goEmployer("post-job", "Opening Word Circular Editor!"),
    },
  ];

  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((f) => f.category === activeCategory);

  return (
    <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-[11px] font-black text-[#0A2540] dark:text-[#F59E0B] uppercase tracking-wider">
              Feature-Driven Quick Launch Hub
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Explore Azmera Core Capabilities &amp; Workflows
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Everything designed for speed, simplicity, and Ethiopian market realities. Select a feature to launch it directly.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shrink-0 overflow-x-auto">
          {[
            { id: "all", label: "All Features (8)" },
            { id: "seekers", label: "For Seekers" },
            { id: "employers", label: "For Employers" },
            { id: "payments", label: "Payments (ETB)" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#0A2540] text-white dark:bg-[#F59E0B] dark:text-[#0A2540] shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredFeatures.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.id}
              className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 hover:border-[#F59E0B] dark:hover:border-[#F59E0B] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#0A2540] dark:text-[#F59E0B] shadow-2xs group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${feat.badgeColor}`}>
                    {feat.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5 group-hover:text-[#F59E0B] transition-colors">
                    {lang === "am" ? feat.amharicTitle : feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                <button
                  type="button"
                  onClick={feat.onAction}
                  className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#0A2540] hover:text-white dark:hover:bg-[#F59E0B] dark:hover:text-[#0A2540] border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all cursor-pointer"
                >
                  <span>{feat.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
