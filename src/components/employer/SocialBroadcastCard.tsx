"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import {
  Share2,
  Copy,
  Check,
  Send,
  Sparkles,
  PhoneCall,
  Plus,
  MessageSquare,
  Globe,
  Flame,
  CheckCircle2,
} from "lucide-react";

export default function SocialBroadcastCard() {
  const { jobs, showToast, postNewJob, openPaymentModal, lang } = useApp();
  const [selectedLang, setSelectedLang] = useState<"ti" | "am" | "om" | "en">(lang);
  useEffect(() => {
    setSelectedLang(lang);
  }, [lang]);
  const [copied, setCopied] = useState(false);
  const [publishingTg, setPublishingTg] = useState(false);
  const [showQuickIntakeModal, setShowQuickIntakeModal] = useState(false);

  // Quick intake form state
  const [clientCompany, setClientCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("Addis Ababa (Bole)");
  const [openings, setOpenings] = useState("1");
  const [salary, setSalary] = useState("20,000 - 30,000 ETB");
  const [isDirectApply, setIsDirectApply] = useState(true);

  // Selected top customer vacancies for the broadcast
  const broadcastJobs = jobs.slice(0, 8);

  // Generate formatted text based on language
  const generateBroadcastText = () => {
    if (selectedLang === "ti") {
      const list = broadcastJobs
        .map((j, idx) => {
          const num = idx + 1;
          const locShort = j.location.includes("Mekelle")
            ? "መቐለ"
            : j.location.includes("22")
            ? "ኣ/ኣ 22"
            : j.location.includes("Summit") || j.location.includes("ሰሚት")
            ? "ኣ/ኣ ሰሚት 72"
            : j.location.includes("Skylight")
            ? "skylight hotel= ኣ/ኣ"
            : "ኣ/ኣ";
          const count = j.openingsCount ? ` = ${j.openingsCount}` : "";
          return `${num}, ${j.title} = ${locShort}${count}`;
        })
        .join("\n");

      const directNums = broadcastJobs
        .map((j, idx) => (j.directAgentApply ? idx + 1 : null))
        .filter(Boolean)
        .join(",");

      return `📢 ሎሚቕነ ኣብ Azmera Job connect ዝወፁ ስራሕቲታት\n\n${list}\n\n👉 ኣቲኹም ርኣዩ\n⚡ ${directNums || "1,4,5,6,7"} ኸዓ ናባይ ቀጥታ ኣመልክቱ\n\n📞 Telegram: @AzmeraJobConnect\n📱 Phone: +251 91 100 0000\n🌐 azmerajobs.com`;
    }

    if (selectedLang === "am") {
      const list = broadcastJobs
        .map((j, idx) => {
          const num = idx + 1;
          const locShort = j.location.includes("Mekelle")
            ? "መቐለ"
            : j.location.includes("22")
            ? "አ/አ 22"
            : j.location.includes("Summit") || j.location.includes("ሰሚት")
            ? "አ/አ ሰሚት 72"
            : j.location.includes("Skylight")
            ? "ስካይላይት ሆቴል = አ/አ"
            : "አ/አ";
          const count = j.openingsCount ? ` = ${j.openingsCount}` : "";
          return `${num}, ${j.title} = ${locShort}${count}`;
        })
        .join("\n");

      const directNums = broadcastJobs
        .map((j, idx) => (j.directAgentApply ? idx + 1 : null))
        .filter(Boolean)
        .join(",");

      return `📢 በዛሬው እለት በ Azmera Job connect የወጡ ክፍት የስራ ቦታዎች\n\n${list}\n\n👉 ገብታችሁ ተመልከቱ\n⚡ ቁጥር ${directNums || "1,4,5,6,7"} በቀጥታ በእኔ በኩል ማመልከት ትችላላችሁ\n\n📞 Telegram: @AzmeraJobConnect\n📱 ስልክ: +251 91 100 0000\n🌐 azmerajobs.com`;
    }

    if (selectedLang === "om") {
      const list = broadcastJobs
        .map((j, idx) => {
          const num = idx + 1;
          const loc = j.location.includes("Mekelle") ? "Meqelle" : "Finfinnee (AA)";
          const count = j.openingsCount ? ` = ${j.openingsCount}` : "";
          return `${num}, ${j.title} = ${loc}${count}`;
        })
        .join("\n");

      return `📢 Iddoowwan Hojii Banaa Haaraa Azmera Job Connect\n\n${list}\n\n👉 Seenaa ilaalaa\n⚡ Kallattiin karaa Azmera iyyadhaa\n\n📞 Telegram: @AzmeraJobConnect\n📱 Bilbila: +251 91 100 0000\n🌐 azmerajobs.com`;
    }

    // English
    const list = broadcastJobs
      .map((j, idx) => {
        const num = idx + 1;
        const count = j.openingsCount ? ` (${j.openingsCount} Openings)` : "";
        return `${num}. ${j.title}${count} - ${j.location}`;
      })
      .join("\n");

    return `📢 Latest Verified Job Openings on Azmera Job Connect\n\n${list}\n\n👉 Visit platform: azmerajobs.com\n⚡ Fast-track direct agent applications available for positions 1, 4, 5, 6, 7!\n\n📞 Telegram: @AzmeraJobConnect\n📱 Phone: +251 91 100 0000`;
  };

  const handleCopy = () => {
    const text = generateBroadcastText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("📋 Formatted broadcast copied! Ready to paste into Facebook & Telegram.");
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePublishTelegram = async () => {
    setPublishingTg(true);
    try {
      const text = generateBroadcastText();
      const res = await fetch("/api/broadcast", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang: selectedLang }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        delivered?: boolean;
        queued?: boolean;
        channelId?: string;
      };
      if (!res.ok || !data?.ok) {
        showToast(data?.error || "Broadcast failed. Sign in as employer/admin.", "error");
        return;
      }
      if (data.delivered) {
        showToast(`Published live to ${data.channelId || "@AzmeraJobConnect"}!`, "success");
      } else {
        showToast(
          `Broadcast logged! Add TELEGRAM_BOT_TOKEN in .env to auto-post to ${data.channelId || "@AzmeraJobConnect"}.`,
          "info"
        );
      }
    } catch {
      showToast("Network error publishing broadcast.", "error");
    } finally {
      setPublishingTg(false);
    }
  };

  const handleQuickIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) return;

    postNewJob({
      title: jobTitle,
      companyId: "custom",
      companyName: clientCompany || "Verified Client Employer",
      companyLogo:
        "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=120&auto=format&fit=crop&q=80",
      verified: true,
      location: location,
      workplaceType: "On-site",
      category: "Customer Service & Hospitality",
      type: "Full-time",
      experienceLevel: "Entry Level (0-1 yrs)",
      salaryMin: 18000,
      salaryMax: 28000,
      salaryCurrency: "ETB",
      salaryPeriod: "monthly",
      description: `Immediate opening placed directly via Azmera Job Connect intake. Client is actively screening candidates for immediate onboarding in ${location}.`,
      responsibilities: [
        "Fulfill core daily operational and customer hospitality duties.",
        "Maintain punctuality, professional appearance, and trustworthy ethics.",
        "Collaborate closely with site supervisors and team leaders.",
      ],
      qualifications: [
        "Willingness to learn, high energy, and honest work ethic.",
        "Basic conversational communication in local language.",
      ],
      skills: ["Customer Service", "Punctuality", "Teamwork"],
      deadline: "2026-04-30",
      status: "Active",
      featured: true,
      directAgentApply: isDirectApply,
      openingsCount: parseInt(openings) || 1,
      sourceCircular: "Azmera Direct Client Phone Intake",
    });

    showToast(`✓ Added "${jobTitle}" to Azmera Job platform & active broadcast!`);
    setShowQuickIntakeModal(false);
    setJobTitle("");
    setClientCompany("");
  };

  return (
    <div className="bg-gradient-to-br from-[#0A2540] to-[#0A1F36] rounded-3xl p-6 sm:p-8 text-white border border-[#F59E0B]/30 shadow-xl space-y-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] text-[#0A2540] flex items-center justify-center font-black text-xl shadow-md shrink-0">
            📢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Social Media Broadcast &amp; Intake
              </h2>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F59E0B] text-[#0A2540]">
                Daily Digest
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              1-Click generate formatted posts for Facebook &amp; Telegram from active vacancies
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() =>
              openPaymentModal({
                sku: "social_broadcast_digest",
                amount: 800,
                purpose: "social_broadcast",
                purposeLabel: "Sponsored Social Broadcast (Telegram @AzmeraJobConnect)",
                title: "Launch Paid Telegram & FB Broadcast",
                description: "Boost today's vacancy digest to 92,000+ job seekers across Addis Ababa, Mekelle, Hawassa via Telebirr, CBE Bank, or M-Pesa.",
                onSuccess: () => {
                  showToast("Broadcast payment verified! Post scheduled across Telegram & FB.", "success");
                },
              })
            }
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>Pay & Launch Broadcast (800 ETB)</span>
          </button>

          <button
            onClick={() => setShowQuickIntakeModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#F59E0B]" />
            <span>+ Quick Client Intake</span>
          </button>

          <button
            onClick={handlePublishTelegram}
            disabled={publishingTg}
            className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-60"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{publishingTg ? "Publishing..." : "Publish to Telegram"}</span>
          </button>

          <button
            onClick={handleCopy}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-[#F59E0B] hover:bg-[#D97706] text-[#0A2540] hover:scale-[1.02]"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Post for Facebook</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Language Selector Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-[#F59E0B]" /> Language:
          </span>
          <div className="flex bg-white/10 p-1 rounded-xl">
            {[
              { id: "ti", label: "ትግርኛ (Tigrigna)" },
              { id: "am", label: "አማርኛ (Amharic)" },
              { id: "om", label: "Afaan Oromoo" },
              { id: "en", label: "English" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedLang(opt.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedLang === opt.id
                    ? "bg-[#F59E0B] text-[#0A2540] shadow-xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://t.me/AzmeraJobConnect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sky-300 hover:text-white flex items-center gap-1 hover:underline font-semibold"
          >
            <Send className="w-3 h-3" />
            <span>@AzmeraJobConnect</span>
          </a>
          <span className="text-white/20">•</span>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent("https://azmerajobs.com")}&text=${encodeURIComponent(generateBroadcastText())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-[#0088cc]/30 hover:bg-[#0088cc] text-sky-100 text-[11px] font-bold transition-all"
          >
            Share to Telegram
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(generateBroadcastText())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-[#25D366]/25 hover:bg-[#25D366] text-emerald-100 hover:text-white text-[11px] font-bold transition-all"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://azmerajobs.com")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-[#0A66C2]/30 hover:bg-[#0A66C2] text-blue-100 text-[11px] font-bold transition-all"
          >
            LinkedIn
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://azmerajobs.com")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-[#1877F2]/30 hover:bg-[#1877F2] text-blue-100 text-[11px] font-bold transition-all"
          >
            Facebook
          </a>
        </div>
      </div>

      {/* Post Preview Box */}
      <div className="relative z-10">
        <div className="bg-[#051322] border border-white/15 rounded-2xl p-5 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap select-all shadow-inner">
          {generateBroadcastText()}
        </div>
      </div>

      {/* Direct Order Quick Intake Modal */}
      {showQuickIntakeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] text-slate-900 dark:text-white rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#0A2540] text-[#F59E0B] flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Quick Customer Intake</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Received a job order via phone or Telegram? Add it directly to Azmera Jobs!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowQuickIntakeModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuickIntakeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Job Position Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dining Host or Barista"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Employer / Client Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 22 Lounge or Mekelle Hotel"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Number of Openings
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={openings}
                    onChange={(e) => setOpenings(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-[#F59E0B]"
                  >
                    <option value="Addis Ababa (Bole)">Addis Ababa (Bole)</option>
                    <option value="Addis Ababa (22 Mazoria)">Addis Ababa (22 Mazoria)</option>
                    <option value="Addis Ababa (Summit 72)">Addis Ababa (Summit 72)</option>
                    <option value="Mekelle, Tigray">Mekelle, Tigray</option>
                    <option value="Hawassa">Hawassa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Approx. Monthly Salary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 18,000 - 25,000 ETB"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-950 dark:text-amber-200 block">
                    ⚡ {t(lang, "directApplyBadge")}
                  </span>
                  <span className="text-[11px] text-amber-800 dark:text-amber-300">
                    Candidates can apply directly to Azmera via Telegram or phone
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isDirectApply}
                  onChange={(e) => setIsDirectApply(e.target.checked)}
                  className="w-5 h-5 accent-[#0A2540] cursor-pointer"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowQuickIntakeModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold shadow-md shadow-[#0A2540]/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] dark:text-[#0A2540]" />
                  <span>Publish to Platform &amp; Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
