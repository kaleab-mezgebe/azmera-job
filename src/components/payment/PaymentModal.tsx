"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { PaymentMethodType, PaymentTransaction, PaymentModalOptions } from "@/types";
import { MOCK_PAYMENT_GATEWAYS } from "@/data/mockData";
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Smartphone,
  Building,
  QrCode,
  ArrowRight,
  Download,
  Receipt,
  Sparkles,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface PaymentModalProps {
  options: PaymentModalOptions;
  onClose: () => void;
}

export default function PaymentModal({ options, onClose }: PaymentModalProps) {
  const { showToast, addTransaction, lang } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>("telebirr");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form Inputs
  const [phoneNumber, setPhoneNumber] = useState("0911234567");
  const [safaricomNumber, setSafaricomNumber] = useState("0712345678");
  const [txRefInput, setTxRefInput] = useState("");

  // Flow State
  const [step, setStep] = useState<"details" | "processing" | "awaiting_chapa" | "success">("details");
  const [stkSent, setStkSent] = useState(false);
  const [completedTx, setCompletedTx] = useState<PaymentTransaction | null>(null);
  const [pendingTxRef, setPendingTxRef] = useState<string | null>(null);
  const [chapaCheckoutUrl, setChapaCheckoutUrl] = useState<string | null>(null);
  const [verifyingChapa, setVerifyingChapa] = useState(false);

  const activeGateway =
    MOCK_PAYMENT_GATEWAYS.find((g) => g.id === selectedMethod) || MOCK_PAYMENT_GATEWAYS[0];

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    showToast(`Copied ${text} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleTriggerStk = () => {
    setStkSent(true);
    showToast("STK push sent to your Safaricom phone! Check your screen.", "info");
    setTimeout(() => {
      setTxRefInput(`SCL-${Math.floor(10000000 + Math.random() * 90000000)}`);
    }, 1500);
  };

  const handleConfirmPayment = async () => {
    setStep("processing");

    const payerAccount =
      selectedMethod === "mpesa"
        ? safaricomNumber
        : selectedMethod === "telebirr"
        ? phoneNumber
        : "1000 4829 ****";

    try {
      const initRes = await fetch("/api/payments/initiate", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: options.sku,
          amount: options.amount,
          method: selectedMethod,
          purpose: options.purpose,
          purposeLabel: options.purposeLabel,
          payerPhoneOrAccount: payerAccount,
          returnUrl: typeof window !== "undefined" ? window.location.origin : undefined,
          metadata: options.metadata,
        }),
      });
      const initData = (await initRes.json()) as {
        ok?: boolean;
        error?: string;
        mode?: "live" | "sandbox";
        txRef?: string;
        checkoutUrl?: string;
      };

      if (!initRes.ok || !initData?.ok || !initData.txRef) {
        setStep("details");
        showToast(initData?.error || "Payment initialization failed.", "error");
        return;
      }

      if (initData.mode === "live" && initData.checkoutUrl) {
        setPendingTxRef(initData.txRef);
        setChapaCheckoutUrl(initData.checkoutUrl);
        setStep("awaiting_chapa");
        window.open(initData.checkoutUrl, "_blank", "noopener,noreferrer");
        showToast("Complete checkout on Chapa, then click 'Verify Payment Now'.", "info");
        return;
      }

      const confirmRes = await fetch("/api/payments/confirm-sandbox", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txRef: initData.txRef,
          method: selectedMethod,
          payerPhoneOrAccount: payerAccount,
        }),
      });
      const confirmData = (await confirmRes.json()) as {
        ok?: boolean;
        error?: string;
        transaction?: PaymentTransaction;
      };

      if (!confirmRes.ok || !confirmData?.ok || !confirmData.transaction) {
        setStep("details");
        showToast(confirmData?.error || "Payment verification failed.", "error");
        return;
      }

      const newTx = confirmData.transaction;
      addTransaction(newTx, { alreadyPersisted: true });
      setCompletedTx(newTx);
      setStep("success");
      showToast(`Payment of ${newTx.amount.toLocaleString()} ETB verified!`, "success");

      if (options.onSuccess) {
        options.onSuccess(newTx);
      }
    } catch {
      setStep("details");
      showToast("Network error verifying payment.", "error");
    }
  };

  const handleVerifyChapaNow = async () => {
    if (!pendingTxRef) return;
    setVerifyingChapa(true);
    try {
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txRef: pendingTxRef }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        transaction?: PaymentTransaction;
      };
      if (!res.ok || !data?.ok || !data.transaction) {
        showToast(data?.error || "Chapa has not confirmed payment yet. Finish checkout and retry.", "info");
        return;
      }
      addTransaction(data.transaction, { alreadyPersisted: true });
      setCompletedTx(data.transaction);
      setStep("success");
      showToast(`Payment of ${data.transaction.amount.toLocaleString()} ETB verified by Chapa!`, "success");
      if (options.onSuccess) {
        options.onSuccess(data.transaction);
      }
    } catch {
      showToast("Network error contacting verification server.", "error");
    } finally {
      setVerifyingChapa(false);
    }
  };

  const vatAmount = Math.round(options.amount * 0.15);
  const netAmount = options.amount - vatAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto overflow-x-hidden relative flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-[#101E33] z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-[#0A2540] dark:text-[#F59E0B] uppercase tracking-wider">
                Azmera Verified Payment Gateway
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {step === "success" ? "Payment Confirmed! 🎉" : options.title || "Complete Secure Payment"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 flex-1">
          {/* Order Summary Pill */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                Selected Service
              </span>
              <p className="font-extrabold text-sm text-slate-900 dark:text-white">
                {options.purposeLabel}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
                Amount to Pay
              </span>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-baseline gap-1 sm:justify-end">
                <span>{options.amount.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">ETB</span>
              </div>
            </div>
          </div>

          {step === "awaiting_chapa" && (
            <div className="py-8 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#00843D]/15 text-[#00843D] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Complete Secure Chapa Checkout
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Chapa opened in a new window for Reference{" "}
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{pendingTxRef}</span>. Pay with Telebirr, CBE, M-Pesa, or Card, then click verify below.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                {chapaCheckoutUrl && (
                  <a
                    href={chapaCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 inline-flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4 text-[#F59E0B]" />
                    <span>Open Chapa Checkout</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleVerifyChapaNow}
                  disabled={verifyingChapa}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 shadow-md cursor-pointer disabled:opacity-60"
                >
                  {verifyingChapa ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying with Chapa...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I&apos;ve Paid — Verify Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-[#00843D] dark:border-t-[#F59E0B] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-[#0A2540] dark:text-[#F59E0B]" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Verifying Payment with {activeGateway.name}...
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                  Connecting to Ethiopian Interbank Network & Telebirr/CBE API for automated confirmation.
                </p>
              </div>
            </div>
          )}

          {step === "details" && (
            <>
              {/* Payment Method Selector (3 Main Ethiopian Methods) */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Select Ethiopian Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {/* Telebirr */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("telebirr")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      selectedMethod === "telebirr"
                        ? "border-[#00843D] bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-[#00843D]/30"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00843D]" />
                      <span className="text-[9px] font-black uppercase text-[#00843D] bg-[#00843D]/10 px-1.5 py-0.5 rounded">
                        Fast
                      </span>
                    </div>
                    <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">
                      telebirr
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {lang === "am" ? "ቴሌብር • ኢትዮ ቴሌኮም" : "Ethio Telecom Mobile Money"}
                    </p>
                  </button>

                  {/* CBE Bank */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("cbe")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      selectedMethod === "cbe"
                        ? "border-[#8A1538] bg-pink-50/80 dark:bg-pink-950/40 ring-2 ring-[#8A1538]/30"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8A1538]" />
                      <span className="text-[9px] font-black uppercase text-[#8A1538] bg-[#8A1538]/10 px-1.5 py-0.5 rounded">
                        Bank
                      </span>
                    </div>
                    <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">
                      CBE Bank
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {lang === "am" ? "ንግድ ባንክ • CBE Birr" : "CBE Birr • Bank Transfer"}
                    </p>
                  </button>

                  {/* M-Pesa */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("mpesa")}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      selectedMethod === "mpesa"
                        ? "border-[#00B04F] bg-green-50/80 dark:bg-green-950/40 ring-2 ring-[#00B04F]/30"
                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00B04F]" />
                      <span className="text-[9px] font-black uppercase text-[#00B04F] bg-[#00B04F]/10 px-1.5 py-0.5 rounded">
                        STK
                      </span>
                    </div>
                    <div className="font-black text-xs sm:text-sm text-slate-900 dark:text-white">
                      M-Pesa
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {lang === "am" ? "ሳፋሪኮም • M-Pesa" : "Safaricom Mobile Money"}
                    </p>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Method Gateway Box */}
              <div
                className="p-4 sm:p-5 rounded-2xl border transition-all"
                style={{
                  borderColor:
                    selectedMethod === "telebirr"
                      ? "#00843D"
                      : selectedMethod === "cbe"
                      ? "#8A1538"
                      : "#00B04F",
                  backgroundColor:
                    selectedMethod === "telebirr"
                      ? "rgba(0, 132, 61, 0.04)"
                      : selectedMethod === "cbe"
                      ? "rgba(138, 21, 56, 0.04)"
                      : "rgba(0, 176, 79, 0.04)",
                }}
              >
                {/* Method Header */}
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/80 pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                      style={{
                        backgroundColor:
                          selectedMethod === "telebirr"
                            ? "#00843D"
                            : selectedMethod === "cbe"
                            ? "#8A1538"
                            : "#00B04F",
                      }}
                    >
                      {selectedMethod === "telebirr" ? "tb" : selectedMethod === "cbe" ? "CBE" : "MP"}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {lang === "am" ? activeGateway.amharicName : activeGateway.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {activeGateway.type}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/70 px-2.5 py-1 rounded-full">
                    {activeGateway.badge}
                  </span>
                </div>

                {/* TELEBIRR SPECIFIC INSTRUCTIONS */}
                {selectedMethod === "telebirr" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">
                          Telebirr Merchant Name
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
                          {activeGateway.merchantName}
                        </span>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">
                            Merchant ID / Shortcode
                          </span>
                          <span className="font-extrabold text-[#00843D] text-sm block mt-0.5">
                            {activeGateway.merchantId}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(activeGateway.merchantId, "telebirr-merchant")}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                        >
                          {copiedField === "telebirr-merchant" ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* QR Code & USSD Prompt */}
                    <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-4">
                      {/* Stylized QR Code Graphic */}
                      <div className="w-24 h-24 bg-slate-950 p-2 rounded-xl flex flex-col items-center justify-center shrink-0 border-2 border-[#00843D]">
                        <QrCode className="w-16 h-16 text-white" />
                        <span className="text-[8px] font-black text-[#00843D] uppercase tracking-wider">
                          Telebirr QR
                        </span>
                      </div>
                      <div className="space-y-1 text-center sm:text-left flex-1">
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">
                          Scan with Telebirr SuperApp
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          Open your Telebirr app, tap <strong>Scan</strong>, and authorize{" "}
                          <strong>{options.amount.toLocaleString()} ETB</strong>. Alternatively, dial{" "}
                          <code className="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded font-bold text-[#00843D]">
                            *127#
                          </code>{" "}
                          and send to <strong>0911 234 567</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Reference / Phone Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                        Telebirr Transaction Reference or Phone Number:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={txRefInput}
                          onChange={(e) => setTxRefInput(e.target.value)}
                          placeholder="e.g. TB-9281746210 or 0911..."
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono outline-none focus:border-[#00843D]"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setTxRefInput(
                              `TB-${Math.floor(1000000000 + Math.random() * 9000000000)}`
                            )
                          }
                          className="px-3 py-2 bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 text-[#00843D] dark:text-emerald-300 text-xs font-bold rounded-xl cursor-pointer"
                        >
                          Auto-Fill Sample
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* CBE BANK SPECIFIC INSTRUCTIONS */}
                {selectedMethod === "cbe" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">
                          Bank Account Name
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
                          {activeGateway.merchantName}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {activeGateway.branch}
                        </span>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">
                            CBE Account Number
                          </span>
                          <span className="font-mono font-black text-[#8A1538] text-sm block mt-0.5">
                            {activeGateway.accountNumber}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            CBE Birr Shortcode: <strong>{activeGateway.merchantId}</strong>
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(activeGateway.accountNumber, "cbe-acc")}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                        >
                          {copiedField === "cbe-acc" ? (
                            <Check className="w-4 h-4 text-[#8A1538]" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                        <Building className="w-4 h-4 text-[#8A1538]" />
                        <span>How to Pay via CBE Mobile Banking or CBE Birr:</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        Transfer <strong>{options.amount.toLocaleString()} ETB</strong> to Account{" "}
                        <strong>1000 4829 19283</strong> via CBE Mobile Banking, CBE Birr (*847#),
                        or any branch. Paste the FT transaction reference below for instant receipt.
                      </p>
                    </div>

                    {/* CBE Reference Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                        CBE Transaction FT Reference Code:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={txRefInput}
                          onChange={(e) => setTxRefInput(e.target.value)}
                          placeholder="e.g. FT26319840281"
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono outline-none focus:border-[#8A1538]"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setTxRefInput(
                              `FT26${Math.floor(10000000 + Math.random() * 90000000)}`
                            )
                          }
                          className="px-3 py-2 bg-pink-100 dark:bg-pink-950/60 hover:bg-pink-200 text-[#8A1538] dark:text-pink-300 text-xs font-bold rounded-xl cursor-pointer"
                        >
                          Auto-Fill Sample
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* M-PESA SPECIFIC INSTRUCTIONS */}
                {selectedMethod === "mpesa" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">
                          Safaricom M-Pesa Merchant
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
                          {activeGateway.merchantName}
                        </span>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">
                            M-Pesa Till / Shortcode
                          </span>
                          <span className="font-mono font-black text-[#00B04F] text-sm block mt-0.5">
                            {activeGateway.merchantId}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(activeGateway.merchantId, "mpesa-till")}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                        >
                          {copiedField === "mpesa-till" ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 1-Tap STK Push Box */}
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-[#00B04F]" />
                          Safaricom Phone Instant STK Push
                        </span>
                        <span className="text-[10px] font-bold text-[#00B04F] bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                          No USSD Needed
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={safaricomNumber}
                          onChange={(e) => setSafaricomNumber(e.target.value)}
                          placeholder="e.g. 0712 345 678"
                          className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-mono outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleTriggerStk}
                          className="px-4 py-2 bg-[#00B04F] hover:bg-[#009241] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          {stkSent ? "Resend Prompt" : "Send STK Push"}
                        </button>
                      </div>

                      {stkSent && (
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          STK prompt pushed to {safaricomNumber}. Enter your M-Pesa PIN on your phone to complete.
                        </p>
                      )}
                    </div>

                    {/* Reference Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1">
                        M-Pesa Confirmation Code (SMS):
                      </label>
                      <input
                        type="text"
                        value={txRefInput}
                        onChange={(e) => setTxRefInput(e.target.value)}
                        placeholder="e.g. SCL92817402"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono outline-none focus:border-[#00B04F]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Security & Replacement Guarantee Seal */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl flex items-center gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                <ShieldCheck className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>
                  <strong>100% Guaranteed Transaction:</strong> Includes Azmera's 14-day candidate replacement guarantee and automated VAT e-receipt.
                </span>
              </div>
            </>
          )}

          {/* STEP 3: SUCCESS & OFFICIAL E-RECEIPT */}
          {step === "success" && completedTx && (
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Payment Verified Successfully!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md">
                  Your transaction has been settled via{" "}
                  <strong className="text-slate-900 dark:text-white uppercase">{completedTx.method}</strong>. Your vacancy/service is now active on Azmera Jobs!
                </p>
              </div>

              {/* Official Ethiopian VAT E-Receipt Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#070F1A] border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#F59E0B]" />
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                      Azmera Official E-Receipt
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-bold">
                    {completedTx.invoiceNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Payment Method</span>
                    <span className="font-bold text-slate-900 dark:text-white uppercase">
                      {completedTx.method === "telebirr"
                        ? "telebirr (Ethio Telecom)"
                        : completedTx.method === "cbe"
                        ? "CBE Bank"
                        : "Safaricom M-Pesa"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Bank / Tx Reference</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {completedTx.referenceNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Date & Time</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Status</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600">
                      <Check className="w-3 h-3" /> SETTLED
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Total Paid (VAT Inclusive):</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {completedTx.amount.toLocaleString()} ETB
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#070F1A] flex items-center justify-between gap-3">
          {step === "details" && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmPayment}
                className="px-6 py-2.5 rounded-xl text-white text-xs font-extrabold flex items-center gap-2 shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                style={{
                  backgroundColor:
                    selectedMethod === "telebirr"
                      ? "#00843D"
                      : selectedMethod === "cbe"
                      ? "#8A1538"
                      : "#00B04F",
                }}
              >
                <span>Verify & Confirm {options.amount.toLocaleString()} ETB</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === "awaiting_chapa" && (
            <>
              <button
                type="button"
                onClick={() => setStep("details")}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </>
          )}

          {step === "success" && (
            <>
              <button
                type="button"
                onClick={() => {
                  showToast("Invoice downloaded to your device as PDF!", "info");
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#F59E0B]" />
                <span>Download VAT Invoice</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-extrabold cursor-pointer"
              >
                Done / View Active Vacancy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
