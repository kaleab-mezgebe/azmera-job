"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Mail, Phone, ArrowRight, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordView() {
  const { setTab, showToast } = useApp();
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [identifier, setIdentifier] = useState("+251 91 144 8822");
  const [codeSent, setCodeSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeSent(true);
    showToast(`Verification code sent to ${identifier}`);
  };

  const handleVerifyReset = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    showToast("Password reset successfully! You can now sign in.");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12 theme-bg">
      <div className="w-full max-w-md rounded-3xl border p-6 sm:p-8 shadow-lg" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {/* Back Button */}
        <button
          onClick={() => setTab("signin")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0A2540] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
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
              : "Reset Password"}
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
            <div className="flex gap-2 p-1 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setMethod("phone")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  method === "phone"
                    ? "bg-white text-[#0A2540] shadow-xs"
                    : "text-[#64748B]"
                }`}
              >
                Ethiopian SMS (+251)
              </button>
              <button
                type="button"
                onClick={() => setMethod("email")}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  method === "email"
                    ? "bg-white text-[#0A2540] shadow-xs"
                    : "text-[#64748B]"
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
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#0A2540] hover:bg-[#071A2E] shadow-md shadow-[#0A2540]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Send Verification Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyReset} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0A1C2E] mb-2 text-center">
                6-Digit Verification Code
              </label>
              <div className="flex justify-between gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    defaultValue={i === 0 ? "7" : i === 1 ? "4" : i === 2 ? "1" : ""}
                    className="w-11 h-12 text-center font-bold text-base bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#0A2540] focus:bg-white rounded-xl outline-none"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A1C2E] mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:border-[#0A2540] focus:bg-white text-xs text-[#0A1C2E] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#0A2540] hover:bg-[#071A2E] shadow-md shadow-[#0A2540]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Update Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setCodeSent(false)}
              className="w-full text-center text-xs font-semibold text-[#64748B] hover:text-[#0A1C2E]"
            >
              Change phone/email or Resend
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
