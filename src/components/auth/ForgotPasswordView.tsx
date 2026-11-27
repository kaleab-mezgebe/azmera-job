"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { t } from "@/lib/i18n";
import { Mail, Phone, ArrowRight, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordView() {
  const { setTab, showToast, lang } = useApp();
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [identifier, setIdentifier] = useState("+251 91 144 8822");
  const [codeSent, setCodeSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), purpose: "reset" }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; devCode?: string };
      if (!res.ok || !data?.ok) {
        showToast(data?.error || "Could not send verification code.", "error");
        setSubmitting(false);
        return;
      }
      if (data.devCode && data.devCode.length === 6) {
        setOtp(data.devCode.split(""));
        setDevOtpHint(data.devCode);
        showToast(`Verification code sent (test code: ${data.devCode})`, "info");
      } else {
        setOtp(["", "", "", "", "", ""]);
        setDevOtpHint(null);
        showToast(`Verification code sent to ${identifier}`, "info");
      }
      setCodeSent(true);
    } catch {
      showToast("Network error sending code.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("").trim();
    if (code.length !== 6) {
      showToast("Please enter the 6-digit verification code.", "error");
      return;
    }
    if (newPassword.length < 8) {
      showToast("New password must be at least 8 characters.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), code, newPassword }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data?.ok) {
        showToast(data?.error || "Failed to reset password.", "error");
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      showToast("Password reset successfully! You can now sign in.", "success");
    } catch {
      showToast("Network error resetting password.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12 theme-bg">
      <div className="w-full max-w-md rounded-3xl border p-6 sm:p-8 shadow-lg" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {/* Back Button */}
        <button
          onClick={() => setTab("signin")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#0A2540] dark:hover:text-[#F59E0B] mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t(lang, "backToSignIn")}</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#0A2540]/5 dark:bg-[#F59E0B]/15 text-[#0A2540] dark:text-[#F59E0B] flex items-center justify-center mx-auto mb-3 border border-slate-200 dark:border-slate-700">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {success
              ? "Password Updated!"
              : codeSent
              ? "Verify Code & Reset"
              : t(lang, "resetPassword")}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {success
              ? "Your password has been changed. Sign in with your new credentials."
              : codeSent
              ? `Enter the 6-digit code sent to ${identifier}`
              : "Enter your phone number or email to receive a recovery code"}
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-5">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Security credentials successfully verified.</span>
            </div>
            <button
              onClick={() => setTab("signin")}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#0A2540] hover:bg-[#071A2E] shadow-md shadow-[#0A2540]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : !codeSent ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setMethod("phone")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  method === "phone"
                    ? "bg-white dark:bg-[#0A2540] text-[#0A2540] dark:text-[#F59E0B] shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Ethiopian SMS (+251)
              </button>
              <button
                type="button"
                onClick={() => setMethod("email")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  method === "email"
                    ? "bg-white dark:bg-[#0A2540] text-[#0A2540] dark:text-[#F59E0B] shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Email Address
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                {method === "phone" ? "Mobile Phone Number" : "Email Address"}
              </label>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus-within:border-[#0A2540] dark:focus-within:border-[#F59E0B] focus-within:bg-white dark:focus-within:bg-[#101E33] focus-within:ring-2 focus-within:ring-[#0A2540]/10 dark:focus-within:ring-[#F59E0B]/20 transition-all">
                {method === "phone" ? (
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <input
                  type={method === "phone" ? "tel" : "email"}
                  required
                  placeholder={method === "phone" ? "+251 91 ..." : "you@domain.com"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full text-xs text-slate-900 dark:text-white bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0 focus:border-none shadow-none focus:shadow-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white dark:text-[#0A2540] bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] shadow-md shadow-[#0A2540]/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
            >
              <span>{submitting ? "Sending..." : "Send Verification Code"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyReset} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2 text-center">
                6-Digit Verification Code
              </label>
              <div className="flex justify-between gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i]}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(-1);
                      setOtp((prev) => prev.map((d, idx) => (idx === i ? val : d)));
                    }}
                    className="w-11 h-12 text-center font-bold text-base bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#0A2540] dark:focus:border-[#F59E0B] focus:bg-white dark:focus:bg-[#101E33] rounded-xl outline-none"
                  />
                ))}
              </div>
              {devOtpHint && (
                <p className="text-[11px] text-amber-600 dark:text-amber-400 text-center mt-1.5">
                  Dev test code: <span className="font-mono font-bold">{devOtpHint}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#0A2540] dark:focus:border-[#F59E0B] focus:bg-white dark:focus:bg-[#101E33] text-xs outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white dark:text-[#0A2540] bg-[#0A2540] hover:bg-[#071A2E] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] shadow-md shadow-[#0A2540]/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
            >
              <span>{submitting ? "Updating..." : "Update Password"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setCodeSent(false)}
              className="w-full text-center text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Change phone/email or Resend
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
