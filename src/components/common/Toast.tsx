"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

export default function Toast() {
  const { toastMessage, toastType, showToast } = useApp();

  if (!toastMessage) return null;

  const config = {
    success: {
      icon: <CheckCircle2 className="w-4 h-4 text-[#0A2540]" />,
      bg: "#F59E0B",
      border: "rgba(245, 158, 11, 0.4)",
    },
    error: {
      icon: <XCircle className="w-4 h-4 text-white" />,
      bg: "#dc2626",
      border: "rgba(220,38,38,0.4)",
    },
    info: {
      icon: <Info className="w-4 h-4 text-white" />,
      bg: "#2563eb",
      border: "rgba(37,99,235,0.4)",
    },
  }[toastType ?? "success"];

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 max-w-sm animate-slide-up">
      <div
        className="px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border"
        style={{ background: "var(--surface)", borderColor: config.border, boxShadow: "var(--shadow-lg)" }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: config.bg }}
        >
          {config.icon}
        </div>
        <p className="text-xs font-semibold flex-1" style={{ color: "var(--text)" }}>{toastMessage}</p>
        <button
          onClick={() => showToast("", "info")}
          className="transition-colors p-0.5 rounded"
          style={{ color: "var(--text-muted)" }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
