"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import { Conversation, MessageItem } from "@/types";
import {
  MessageSquare,
  Search,
  Send,
  CalendarCheck,
  Building2,
  User,
  ShieldCheck,
  CheckCheck,
  Paperclip,
  Phone,
  Video,
  Sparkles,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";

export default function MessagesView() {
  const { role, currentUser, seeker, company, showToast, setTab, lang } = useApp();

  // Initial mock conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv-1",
      participantId: "skylight-recruiter",
      participantName: "Yohannes Tekle (Skylight Hotel)",
      participantAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80",
      participantRole: "employer",
      jobTitle: "Senior Full Stack Software Engineer",
      lastMessage: "Could you be available for an online screening interview this Thursday at 10:00 AM EAT?",
      lastMessageTime: "10:32 AM",
      unreadCount: 1,
      messages: [
        {
          id: "m-1",
          senderId: "skylight-recruiter",
          senderName: "Yohannes Tekle",
          senderRole: "employer",
          content: "Hello Dawit! We reviewed your application for the Senior Full Stack role at Ethiopian Skylight Hotel. Your React and TypeScript experience stands out.",
          timestamp: "10:20 AM",
          read: true,
        },
        {
          id: "m-2",
          senderId: "cand-1",
          senderName: "Dawit Bekele",
          senderRole: "seeker",
          content: "Thank you Yohannes! I'm very excited about the hospitality modernization initiatives at Skylight. Looking forward to discussing further.",
          timestamp: "10:25 AM",
          read: true,
        },
        {
          id: "m-3",
          senderId: "skylight-recruiter",
          senderName: "Yohannes Tekle",
          senderRole: "employer",
          content: "Could you be available for an online screening interview this Thursday at 10:00 AM EAT?",
          timestamp: "10:32 AM",
          read: false,
        },
      ],
    },
    {
      id: "conv-2",
      participantId: "tdrf-lead",
      participantName: "Dr. Almaz Gebre (TDRF)",
      participantAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
      participantRole: "employer",
      jobTitle: "Humanitarian Logistics & Operations",
      lastMessage: "Your emergency response portfolio has been verified by the board.",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      messages: [
        {
          id: "m-201",
          senderId: "tdrf-lead",
          senderName: "Dr. Almaz Gebre",
          senderRole: "employer",
          content: "Selam Dawit, thank you for submitting your verification details for our Mekelle station.",
          timestamp: "Yesterday",
          read: true,
        },
        {
          id: "m-202",
          senderId: "cand-1",
          senderName: "Dawit Bekele",
          senderRole: "seeker",
          content: "Selam Dr. Almaz, all requested certificates and references have been uploaded to Azmera.",
          timestamp: "Yesterday",
          read: true,
        },
        {
          id: "m-203",
          senderId: "tdrf-lead",
          senderName: "Dr. Almaz Gebre",
          senderRole: "employer",
          content: "Your emergency response portfolio has been verified by the board.",
          timestamp: "Yesterday",
          read: true,
        },
      ],
    },
    {
      id: "conv-3",
      participantId: "chapa-hr",
      participantName: "Bethlehem Assefa (Chapa Financial)",
      participantAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
      participantRole: "employer",
      jobTitle: "Payment Gateway Engineer",
      lastMessage: "We would like to discuss our Telebirr & CBE settlement engine architecture.",
      lastMessageTime: "Nov 21",
      unreadCount: 0,
      messages: [
        {
          id: "m-301",
          senderId: "chapa-hr",
          senderName: "Bethlehem Assefa",
          senderRole: "employer",
          content: "Hello! We are expanding our merchant integration team.",
          timestamp: "Nov 21",
          read: true,
        },
        {
          id: "m-302",
          senderId: "chapa-hr",
          senderName: "Bethlehem Assefa",
          senderRole: "employer",
          content: "We would like to discuss our Telebirr & CBE settlement engine architecture.",
          timestamp: "Nov 21",
          read: true,
        },
      ],
    },
  ]);

  const [activeConvId, setActiveConvId] = useState<string>("conv-1");
  const [mobileShowThread, setMobileShowThread] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_PATH || "";
    void (async () => {
      try {
        const res = await fetch(`${base}/api/messages`, { credentials: "include" });
        if (res.ok) {
          const data = (await res.json()) as { conversations?: Conversation[] };
          if (Array.isArray(data.conversations) && data.conversations.length > 0) {
            setConversations(data.conversations);
          }
        }
      } catch {
        // fallback cleanly to initial state
      }
    })();
  }, []);

  const filteredConversations = conversations.filter(
    (c) =>
      c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMsg: MessageItem = {
      id: `m-${Date.now()}`,
      senderId: role === "employer" ? "user-emp-skylight" : "cand-1",
      senderName: currentUser?.name || (role === "employer" ? company.name : seeker.name),
      senderRole: role === "employer" ? "employer" : "seeker",
      content: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };

    const updatedConvs = conversations.map((c) => {
      if (c.id === activeConv.id) {
        return {
          ...c,
          lastMessage: newMsg.content,
          lastMessageTime: "Just now",
          messages: [...c.messages, newMsg],
        };
      }
      return c;
    });

    setConversations(updatedConvs);
    setInputMessage("");
    const base = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_PATH || "";
    void fetch(`${base}/api/messages`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: activeConv.id, message: newMsg }),
    }).catch(() => {});

    // Simulated auto-reply after 1.5 seconds persisted to SQLite
    setTimeout(() => {
      const replyMsg: MessageItem = {
        id: `m-reply-${Date.now()}`,
        senderId: activeConv.participantId,
        senderName: activeConv.participantName,
        senderRole: activeConv.participantRole,
        content: `Got it! Thank you for the update. We are reviewing this through the Azmera Recruitment System and will coordinate next steps shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: true,
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConv.id) {
            return {
              ...c,
              lastMessage: replyMsg.content,
              lastMessageTime: "Just now",
              messages: [...c.messages, replyMsg],
            };
          }
          return c;
        })
      );
      void fetch(`${base}/api/messages`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: activeConv.id, message: replyMsg }),
      }).catch(() => {});
      showToast(`New message from ${activeConv.participantName}`, "info");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* ── HEADER ── */}
      <div className="bg-white dark:bg-[#101E33] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-[#0A2540] dark:bg-amber-950 dark:text-[#F59E0B]">
              Direct Messaging
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t(lang, "messagesTitle")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Connect directly between hiring managers, verified recruiters, and candidates with instant messaging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {role === "employer" ? (
            <button
              onClick={() => setTab("interviews")}
              className="px-4 py-2 rounded-xl bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>View Scheduled Interviews</span>
            </button>
          ) : (
            <button
              onClick={() => setTab("applications")}
              className="px-4 py-2 rounded-xl bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>My Applications Status</span>
            </button>
          )}
        </div>
      </div>

      {/* ── MESSAGING TWO-COLUMN CONTAINER ── */}
      <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[520px] md:min-h-[580px]">
        {/* Left column: Conversations list */}
        <div className={`${mobileShowThread ? "hidden md:flex" : "flex"} md:col-span-5 lg:col-span-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex-col`}>
          {/* Search bar */}
          <div className="p-3.5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* List of threads */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConv.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setMobileShowThread(true);
                    // Mark as read
                    setConversations((prev) =>
                      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
                    );
                  }}
                  className={`w-full p-4 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                    isActive
                      ? "bg-slate-100 dark:bg-slate-800/90 border-l-4 border-[#0A2540] dark:border-[#F59E0B]"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    {conv.participantRole === "employer" && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] shadow-xs">
                        🏢
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {conv.participantName}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    {conv.jobTitle && (
                      <p className="text-[11px] font-semibold text-[#0A2540] dark:text-[#38BDF8] truncate mt-0.5">
                        {conv.jobTitle}
                      </p>
                    )}

                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#F59E0B] text-[#0A2540] shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Active conversation thread */}
        <div className={`${mobileShowThread ? "flex" : "hidden md:flex"} md:col-span-7 lg:col-span-8 flex-col h-full bg-slate-50/50 dark:bg-[#0B1524]`}>
          {/* Thread Header */}
          <div className="p-3.5 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101E33] flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileShowThread(false)}
                className="md:hidden p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
                aria-label="Back to conversations"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <img
                src={activeConv.participantAvatar}
                alt={activeConv.participantName}
                className="w-10 h-10 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                    {activeConv.participantName}
                  </h3>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                    ✓ Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {activeConv.jobTitle || "Direct Recruitment Thread"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  showToast("Scheduling interview with " + activeConv.participantName);
                  setTab("interviews");
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-[#F59E0B] hover:bg-amber-100 text-xs font-bold border border-amber-200 dark:border-amber-900 flex items-center gap-1.5 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Schedule Interview</span>
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            <div className="text-center my-2">
              <span className="px-3 py-1 rounded-full bg-slate-200/60 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                Encrypted &amp; Logged under Azmera Platform Governance
              </span>
            </div>

            {activeConv.messages.map((m) => {
              const isMe =
                (role === "employer" && m.senderRole === "employer") ||
                (role === "seeker" && m.senderRole === "seeker");

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                    <span className="font-bold">{m.senderName}</span>
                    <span>• {m.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      isMe
                        ? "bg-[#0A2540] text-white rounded-tr-none dark:bg-[#F59E0B] dark:text-[#0A2540] font-medium"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {m.content}
                  </div>

                  {isMe && (
                    <div className="flex items-center gap-1 mt-0.5 px-1 text-[10px] text-slate-400">
                      <span>Delivered</span>
                      <CheckCheck className="w-3 h-3 text-[#F59E0B] dark:text-[#0A2540]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Message Input Bar */}
          <div className="p-3.5 bg-white dark:bg-[#101E33] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <button
              onClick={() => showToast("Attachment upload (PDF CV, Portfolio) enabled", "info")}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              title="Attach Document"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder={`Write a message to ${activeConv.participantName}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:border-[#F59E0B]"
            />

            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] disabled:opacity-40 shadow-xs cursor-pointer transition-all"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
