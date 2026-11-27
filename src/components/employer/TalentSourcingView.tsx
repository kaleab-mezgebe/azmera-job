"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import { Candidate, TalentPool, Job } from "@/types";
import {
  Search,
  Filter,
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Send,
  FolderPlus,
  Check,
  Star,
  Eye,
  MessageSquare,
  ShieldCheck,
  Plus,
  Bookmark,
  Share2,
  FileText,
} from "lucide-react";
import CandidateProfileModal from "./CandidateProfileModal";

export default function TalentSourcingView() {
  const {
    candidates,
    jobs,
    company,
    setTab,
    showToast,
    lang,
  } = useApp();

  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedExp, setSelectedExp] = useState("All");
  const [activePoolId, setActivePoolId] = useState<string>("all");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Invite modal state
  const [inviteCandidate, setInviteCandidate] = useState<Candidate | null>(null);
  const [selectedJobToInvite, setSelectedJobToInvite] = useState<string>("");
  const [inviteMessage, setInviteMessage] = useState("");

  // Create pool modal state
  const [createPoolOpen, setCreatePoolOpen] = useState(false);
  const [newPoolName, setNewPoolName] = useState("");

  // Local talent pools state
  const [talentPools, setTalentPools] = useState<TalentPool[]>([
    {
      id: "pool-1",
      name: "💻 Senior Tech & Software",
      candidateIds: ["cand-1", "cand-4"],
      createdAt: "Nov 2026",
    },
    {
      id: "pool-2",
      name: "🏨 5-Star Hospitality Crew",
      candidateIds: ["cand-2", "cand-5"],
      createdAt: "Nov 2026",
    },
    {
      id: "pool-3",
      name: "🌍 NGO Field Operations",
      candidateIds: ["cand-3"],
      createdAt: "Nov 2026",
    },
  ]);

  const companyJobs = jobs.filter((j) => j.companyId === company.id && j.status === "Active");

  // Filtering logic
  const filteredCandidates = candidates.filter((cand) => {
    const matchesSearch =
      !search ||
      cand.name.toLowerCase().includes(search.toLowerCase()) ||
      cand.title.toLowerCase().includes(search.toLowerCase()) ||
      cand.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesLocation =
      selectedLocation === "All" ||
      cand.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesExp =
      selectedExp === "All" ||
      (selectedExp === "Junior" && cand.experienceYears <= 2) ||
      (selectedExp === "Mid" && cand.experienceYears > 2 && cand.experienceYears <= 5) ||
      (selectedExp === "Senior" && cand.experienceYears > 5);

    const matchesPool =
      activePoolId === "all" ||
      talentPools.find((p) => p.id === activePoolId)?.candidateIds.includes(cand.id);

    return matchesSearch && matchesLocation && matchesExp && matchesPool;
  });

  const handleCreatePool = () => {
    if (!newPoolName.trim()) return;
    const newPool: TalentPool = {
      id: `pool-${Date.now()}`,
      name: newPoolName.trim(),
      candidateIds: [],
      createdAt: "Just now",
    };
    setTalentPools([...talentPools, newPool]);
    setNewPoolName("");
    setCreatePoolOpen(false);
    showToast(`Created Talent Pool "${newPool.name}"!`);
  };

  const handleToggleCandidateInPool = (poolId: string, candidateId: string) => {
    setTalentPools((prev) =>
      prev.map((p) => {
        if (p.id !== poolId) return p;
        const exists = p.candidateIds.includes(candidateId);
        return {
          ...p,
          candidateIds: exists
            ? p.candidateIds.filter((id) => id !== candidateId)
            : [...p.candidateIds, candidateId],
        };
      })
    );
    showToast("Updated candidate in Talent Pool!", "success");
  };

  const handleSendInvitation = () => {
    if (!inviteCandidate || !selectedJobToInvite) {
      showToast("Please choose a job opportunity to invite for.", "error");
      return;
    }
    const targetJob = jobs.find((j) => j.id === selectedJobToInvite);
    showToast(
      `Invitation sent to ${inviteCandidate.name} for "${targetJob?.title || "role"}"!`,
      "success"
    );
    setInviteCandidate(null);
    setSelectedJobToInvite("");
    setInviteMessage("");
  };

  return (
    <div className="space-y-6 pb-20">
      {/* ── HEADER BANNER ── */}
      <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Verified Talent Pool
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t(lang, "talentSourcingTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Search verified candidate profiles, organise talent pools for future vacancies,
            and proactively invite qualified Ethiopian talent to apply before posting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCreatePoolOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
          >
            <FolderPlus className="w-4 h-4" />
            <span>+ Create Talent Pool</span>
          </button>
        </div>
      </div>

      {/* ── TALENT POOLS QUICK BAR ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActivePoolId("all")}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activePoolId === "all"
              ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
              : "bg-white dark:bg-[#101E33] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>All Candidates ({candidates.length})</span>
        </button>

        {talentPools.map((pool) => (
          <button
            key={pool.id}
            onClick={() => setActivePoolId(pool.id)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activePoolId === pool.id
                ? "bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] shadow-xs"
                : "bg-white dark:bg-[#101E33] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            <span>{pool.name}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200/60 dark:bg-slate-700 font-black">
              {pool.candidateIds.length}
            </span>
          </button>
        ))}
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="bg-white dark:bg-[#101E33] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="w-full md:w-96 flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
          <Search className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
          <input
            type="text"
            placeholder="Search by role, skills (e.g. React, Hospitality, Amharic)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Location filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <option value="All">All Locations (Ethiopia)</option>
            <option value="Addis Ababa">Addis Ababa</option>
            <option value="Mekelle">Mekelle</option>
            <option value="Hawassa">Hawassa</option>
            <option value="Dire Dawa">Dire Dawa</option>
          </select>

          {/* Experience level */}
          <select
            value={selectedExp}
            onChange={(e) => setSelectedExp(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <option value="All">All Experience</option>
            <option value="Junior">Junior (0-2 yrs)</option>
            <option value="Mid">Mid-Level (3-5 yrs)</option>
            <option value="Senior">Senior (5+ yrs)</option>
          </select>
        </div>
      </div>

      {/* ── CANDIDATE CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCandidates.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-[#101E33] p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <Users className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              No matching talent found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try adjusting your search keywords or clearing location filters.
            </p>
          </div>
        ) : (
          filteredCandidates.map((cand) => (
            <div
              key={cand.id}
              className="bg-white dark:bg-[#101E33] p-5 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-[#F59E0B]/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header: Avatar, Name, Title */}
                <div className="flex items-start gap-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0A2540] dark:border-[#F59E0B]"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow-xs" title="Verified Ethiopian Candidate">
                      ✓
                    </div>
                  </div>

                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <h3
                        onClick={() => setSelectedCandidate(cand)}
                        className="font-extrabold text-sm text-slate-900 dark:text-white hover:text-[#F59E0B] transition-colors cursor-pointer truncate"
                      >
                        {cand.name}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-[#0A2540] dark:text-[#38BDF8] truncate">
                      {cand.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#F59E0B]" />
                      <span>{cand.location} • {cand.experienceYears} yrs exp</span>
                    </p>
                  </div>
                </div>

                {/* Candidate bio / objective */}
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                  {cand.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cand.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {cand.skills.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded-lg text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                      +{cand.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Profile completeness & CV badge */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cand.cvFileName}</span>
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {cand.profileCompletion}% Complete
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setInviteCandidate(cand);
                      if (companyJobs.length > 0) {
                        setSelectedJobToInvite(companyJobs[0].id);
                      }
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Invite</span>
                  </button>

                  <button
                    onClick={() => {
                      setTab("messages");
                      showToast(`Opened direct chat with ${cand.name}`, "info");
                    }}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                    <span>Message</span>
                  </button>
                </div>

                {/* Pool quick save & view full profile */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setSelectedCandidate(cand)}
                    className="text-xs font-bold text-[#0A2540] dark:text-[#F59E0B] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View CV Profile</span>
                  </button>

                  {/* Add to Pool dropdown */}
                  <div className="relative group">
                    <button className="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 cursor-pointer">
                      <FolderPlus className="w-3.5 h-3.5" />
                      <span>Pool ▾</span>
                    </button>
                    <div className="hidden group-hover:block absolute right-0 bottom-full mb-1 w-52 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101E33] py-2 z-40">
                      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Add to Talent Pool:
                      </div>
                      {talentPools.map((p) => {
                        const inPool = p.candidateIds.includes(cand.id);
                        return (
                          <button
                            key={p.id}
                            onClick={() => handleToggleCandidateInPool(p.id, cand.id)}
                            className="w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                          >
                            <span className="truncate">{p.name}</span>
                            {inPool && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── INVITE TO APPLY MODAL ── */}
      {inviteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Invite Candidate to Apply
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Direct invitation from {company.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInviteCandidate(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Candidate summary */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <img
                src={inviteCandidate.avatar}
                alt={inviteCandidate.name}
                className="w-11 h-11 rounded-xl object-cover border border-emerald-500"
              />
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">
                  {inviteCandidate.name}
                </p>
                <p className="text-[11px] text-[#0A2540] dark:text-[#F59E0B] font-semibold">
                  {inviteCandidate.title}
                </p>
                <p className="text-[10px] text-slate-400">
                  {inviteCandidate.location} • {inviteCandidate.experienceYears} yrs experience
                </p>
              </div>
            </div>

            {/* Select Vacancy */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Open Vacancy to Invite For:
              </label>
              {companyJobs.length === 0 ? (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                  No active jobs found. Please publish a vacancy first.
                </div>
              ) : (
                <select
                  value={selectedJobToInvite}
                  onChange={(e) => setSelectedJobToInvite(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {companyJobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({j.location})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Optional Personal Note */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Personalized Invitation Message:
              </label>
              <textarea
                rows={3}
                placeholder="Hello! We reviewed your profile and believe your experience would be a tremendous fit for our team..."
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                className="w-full p-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:border-[#F59E0B]"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setInviteCandidate(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInvitation}
                className="px-5 py-2.5 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-black shadow-md cursor-pointer"
              >
                Dispatch Invitation →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE TALENT POOL MODAL ── */}
      {createPoolOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Create New Talent Pool
              </h3>
              <button
                onClick={() => setCreatePoolOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Pool Name (e.g. Bilingual Waitstaff, Senior React Developers):
              </label>
              <input
                type="text"
                placeholder="Enter talent pool title..."
                value={newPoolName}
                onChange={(e) => setNewPoolName(e.target.value)}
                className="w-full p-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:border-[#F59E0B]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCreatePoolOpen(false)}
                className="px-3 py-1.5 text-xs font-bold text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePool}
                className="px-4 py-2 rounded-xl bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] text-xs font-black cursor-pointer shadow-xs"
              >
                Create Pool
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CANDIDATE PROFILE MODAL ── */}
      {selectedCandidate && (
        <CandidateProfileModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}
