"use client";

import React, { useState, useRef, useEffect } from "react";
import { JobAttachment } from "@/types";
import RichDocumentRenderer, { renderJobDescriptionHtml } from "@/components/common/RichDocumentRenderer";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image as ImageIcon,
  Paperclip,
  FileText,
  UploadCloud,
  Trash2,
  Plus,
  Download,
  Highlighter,
  Palette,
  Undo2,
  Redo2,
  Sparkles,
  CheckCircle2,
  Table as TableIcon,
  Eye,
  Edit3,
  Code2,
  FileSpreadsheet,
  X,
  ExternalLink,
  Flame,
  FileCheck,
} from "lucide-react";

interface WordDocumentEditorProps {
  description: string;
  onChangeDescription: (val: string) => void;
  attachments: JobAttachment[];
  onChangeAttachments: (files: JobAttachment[]) => void;
  flyerImage?: string;
  onChangeFlyerImage: (url: string | undefined) => void;
  onApplyTemplate?: (templateType: "tdrf" | "skylight" | "fintech") => void;
}

export default function WordDocumentEditor({
  description,
  onChangeDescription,
  attachments,
  onChangeAttachments,
  flyerImage,
  onChangeFlyerImage,
  onApplyTemplate,
}: WordDocumentEditorProps) {
  const [activeRibbonTab, setActiveRibbonTab] = useState<
    "home" | "insert" | "templates" | "attachments"
  >("home");
  const [viewMode, setViewMode] = useState<"visual" | "code" | "preview">("visual");
  const [history, setHistory] = useState<string[]>([description]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Modals for Image & Attachment
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageCaptionInput, setImageCaptionInput] = useState("");

  const [showAttachModal, setShowAttachModal] = useState(false);
  const [attachFileName, setAttachFileName] = useState("");
  const [attachFileType, setAttachFileType] = useState<"pdf" | "docx">("pdf");

  const canvasRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isTypingRef = useRef(false);

  // Sync canvas with description on load or template switch
  useEffect(() => {
    if (isTypingRef.current) return;
    if (canvasRef.current && viewMode === "visual") {
      const rendered = renderJobDescriptionHtml(description);
      if (
        canvasRef.current.innerHTML !== rendered &&
        canvasRef.current.innerHTML !== description
      ) {
        canvasRef.current.innerHTML = rendered || "<p>Type job specification here...</p>";
      }
    }
  }, [description, viewMode]);

  // Update text with history
  const updateContent = (newText: string) => {
    onChangeDescription(newText);
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(newText);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
  };

  const handleCanvasInput = () => {
    if (!canvasRef.current) return;
    isTypingRef.current = true;
    const html = canvasRef.current.innerHTML;
    updateContent(html);
    setTimeout(() => {
      isTypingRef.current = false;
    }, 150);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      onChangeDescription(prev);
      if (canvasRef.current) {
        canvasRef.current.innerHTML = renderJobDescriptionHtml(prev);
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      onChangeDescription(next);
      if (canvasRef.current) {
        canvasRef.current.innerHTML = renderJobDescriptionHtml(next);
      }
    }
  };

  // Execute formatting command on the visual WYSIWYG canvas
  const execVisualCommand = (cmd: string, val: string = "") => {
    if (viewMode !== "visual") {
      setViewMode("visual");
    }
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.focus();
        document.execCommand(cmd, false, val);
        handleCanvasInput();
      }
    }, 30);
  };

  // Underline formatted text visually
  const handleUnderline = () => {
    if (viewMode === "visual") {
      execVisualCommand("underline");
    } else if (viewMode === "code" && textareaRef.current) {
      applyTextareaFormatting("<u>", "</u>");
    }
  };

  // Highlight formatted text with yellow Word highlighter visually
  const handleHighlight = () => {
    if (viewMode === "visual") {
      if (canvasRef.current) {
        canvasRef.current.focus();
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
          const range = sel.getRangeAt(0);
          try {
            const mark = document.createElement("mark");
            mark.style.backgroundColor = "#FEF08A";
            mark.style.color = "#713F12";
            mark.style.padding = "2px 4px";
            mark.style.borderRadius = "4px";
            mark.style.fontWeight = "600";
            mark.style.display = "inline-block";
            mark.appendChild(range.extractContents());
            range.insertNode(mark);
            handleCanvasInput();
            return;
          } catch (e) {
            // fallback
          }
        }
        document.execCommand("hiliteColor", false, "#FEF08A");
        handleCanvasInput();
      }
    } else if (viewMode === "code" && textareaRef.current) {
      applyTextareaFormatting(
        "<mark style='background:#FEF08A;color:#713F12;padding:2px 4px;border-radius:4px'>",
        "</mark>"
      );
    }
  };

  // Insert Heading visually
  const handleHeading = (level: 1 | 2 | 3) => {
    if (viewMode === "visual") {
      execVisualCommand("formatBlock", `<h${level}>`);
    } else if (viewMode === "code" && textareaRef.current) {
      const hashes = "#".repeat(level);
      applyTextareaFormatting(`\n\n${hashes} `, "\n");
    }
  };

  // Insert Callout visually
  const insertCallout = (type: "notice" | "benefits" | "urgent") => {
    let calloutHtml = "";
    let calloutMarkdown = "";

    if (type === "notice") {
      calloutHtml = `
<div class="p-4 my-3.5 rounded-2xl border-l-4 border-[#0A2540] bg-blue-50/90 dark:bg-blue-950/40 text-slate-900 dark:text-blue-100 shadow-2xs text-xs sm:text-sm font-medium leading-relaxed">
  <strong class="font-bold block mb-1">📋 OFFICIAL RECRUITMENT NOTICE</strong>
  This position is governed by standard organizational recruitment policies and Ethiopian labor regulations.
</div><p></p>`;
      calloutMarkdown = `\n\n> 📋 **OFFICIAL RECRUITMENT NOTICE**\n> This position is governed by standard organizational recruitment policies and Ethiopian labor regulations.\n\n`;
    } else if (type === "benefits") {
      calloutHtml = `
<div class="p-4 my-3.5 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 shadow-2xs text-xs sm:text-sm font-medium leading-relaxed">
  <strong class="font-bold block mb-1">🎁 BENEFITS & ALLOWANCES</strong>
  • Comprehensive medical coverage (including family)<br/>
  • Transport and communication allowances<br/>
  • Annual performance bonuses in ETB
</div><p></p>`;
      calloutMarkdown = `\n\n> 🎁 **BENEFITS & ALLOWANCES**\n> • Comprehensive medical coverage (including family)\n> • Transport and communication allowances\n> • Annual performance bonuses in ETB\n\n`;
    } else {
      calloutHtml = `
<div class="p-4 my-3.5 rounded-2xl border-l-4 border-[#F59E0B] bg-amber-50/90 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 shadow-2xs text-xs sm:text-sm font-medium leading-relaxed">
  <strong class="font-bold block mb-1">⚡ FAST-TRACK RECRUITMENT NOTICE (ናባይ ቀጥታ ኣመልክቱ)</strong>
  Candidates may apply directly through Azmera Job Connect via Telegram (@AzmeraJobConnect) or Phone (+251 91 100 0000) for immediate interview scheduling.
</div><p></p>`;
      calloutMarkdown = `\n\n> ⚡ **FAST-TRACK RECRUITMENT NOTICE (ናባይ ቀጥታ ኣመልክቱ)**\n> Candidates may apply directly through Azmera Job Connect via Telegram (@AzmeraJobConnect) or Phone (+251 91 100 0000) for immediate interview scheduling.\n\n`;
    }

    if (viewMode === "visual" && canvasRef.current) {
      insertHtmlIntoCanvas(calloutHtml);
    } else if (viewMode === "code" && textareaRef.current) {
      insertTextIntoTextarea(calloutMarkdown);
    }
  };

  // Insert Table visually
  const insertTable = () => {
    const tableHtml = `
<div class="my-4 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs">
  <table class="w-full text-left border-collapse text-xs">
    <thead>
      <tr class="bg-slate-100 dark:bg-slate-800 font-extrabold text-[#0A2540] dark:text-white">
        <th class="px-3.5 py-2.5 border-r border-slate-200 dark:border-slate-700">Criteria / Department</th>
        <th class="px-3.5 py-2.5 border-r border-slate-200 dark:border-slate-700">Openings</th>
        <th class="px-3.5 py-2.5">Salary Range (ETB)</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-t border-slate-200 dark:border-slate-800">
        <td class="px-3.5 py-2.5 border-r border-slate-200 dark:border-slate-700 font-medium">Senior Lead</td>
        <td class="px-3.5 py-2.5 border-r border-slate-200 dark:border-slate-700">2 Positions</td>
        <td class="px-3.5 py-2.5 font-bold text-[#F59E0B]">80,000 - 120,000 ETB</td>
      </tr>
      <tr class="border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <td class="px-3.5 py-2.5 border-r border-slate-200 dark:border-slate-700 font-medium">Operational Team</td>
        <td class="px-3.5 py-2.5 border-r border-slate-200 dark:border-slate-700">10 Positions</td>
        <td class="px-3.5 py-2.5 font-bold text-[#F59E0B]">25,000 - 45,000 ETB</td>
      </tr>
    </tbody>
  </table>
</div><p></p>`;

    const tableMarkdown = `\n\n| Criteria / Department | Openings | Salary Range (ETB) |\n| :--- | :--- | :--- |\n| Senior Lead | 2 Positions | 80,000 - 120,000 ETB |\n| Operational Team | 10 Positions | 25,000 - 45,000 ETB |\n\n`;

    if (viewMode === "visual" && canvasRef.current) {
      insertHtmlIntoCanvas(tableHtml);
    } else {
      insertTextIntoTextarea(tableMarkdown);
    }
  };

  const insertDivider = () => {
    if (viewMode === "visual" && canvasRef.current) {
      insertHtmlIntoCanvas('<hr class="my-5 border-slate-200 dark:border-slate-800"/><p></p>');
    } else {
      insertTextIntoTextarea("\n\n---\n\n");
    }
  };

  const insertHtmlIntoCanvas = (html: string) => {
    if (!canvasRef.current) return;
    canvasRef.current.focus();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const frag = document.createDocumentFragment();
      let node;
      while ((node = tempDiv.firstChild)) {
        frag.appendChild(node);
      }
      range.insertNode(frag);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    } else {
      canvasRef.current.innerHTML += html;
    }
    handleCanvasInput();
  };

  const insertTextIntoTextarea = (text: string) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const newContent =
      description.substring(0, start) + text + description.substring(start);
    updateContent(newContent);
  };

  const applyTextareaFormatting = (prefix: string, suffix: string = "") => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = description.substring(start, end) || "formatted text";
    const replacement = `${prefix}${selected}${suffix}`;
    const newContent =
      description.substring(0, start) + replacement + description.substring(end);
    updateContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 50);
  };

  // Insert Image into text
  const handleInsertImage = () => {
    if (!imageUrlInput.trim()) return;
    const imgHtml = `
<div class="my-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
  <img src="${imageUrlInput.trim()}" alt="${imageCaptionInput || "Job Circular Graphic"}" class="w-full max-h-80 object-cover"/>
  ${imageCaptionInput ? `<div class="p-2 text-[11px] text-center text-slate-500 font-medium">${imageCaptionInput}</div>` : ""}
</div><p></p>`;

    const imgMarkdown = `\n\n![${imageCaptionInput || "Job Illustration"}](${imageUrlInput.trim()})\n*${imageCaptionInput || ""}*\n\n`;

    if (viewMode === "visual" && canvasRef.current) {
      insertHtmlIntoCanvas(imgHtml);
    } else {
      insertTextIntoTextarea(imgMarkdown);
    }

    setImageUrlInput("");
    setImageCaptionInput("");
    setShowImageModal(false);
  };

  // Add attached document
  const handleAddAttachment = () => {
    if (!attachFileName.trim()) return;
    const newAtt: JobAttachment = {
      id: `att-${Date.now()}`,
      name: attachFileName.trim().endsWith(`.${attachFileType}`)
        ? attachFileName.trim()
        : `${attachFileName.trim()}.${attachFileType}`,
      size: `${(Math.random() * 1.5 + 0.3).toFixed(1)} MB`,
      type: attachFileType,
      url: "#",
    };
    onChangeAttachments([...attachments, newAtt]);
    setAttachFileName("");
    setShowAttachModal(false);
  };

  // Remove attachment
  const handleRemoveAttachment = (id: string) => {
    onChangeAttachments(attachments.filter((a) => a.id !== id));
  };

  // Stats
  const wordCount = description.trim()
    ? description
        .replace(/<[^>]*>/g, " ")
        .trim()
        .split(/\s+/).length
    : 0;
  const charCount = description.replace(/<[^>]*>/g, "").length;

  return (
    <div className="rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0C192C] shadow-xl overflow-hidden space-y-0">
      {/* ── MS Word Window Header ── */}
      <div className="bg-[#0A2540] text-white px-4 py-2.5 flex items-center justify-between border-b border-[#0A1A2F]">
        <div className="flex items-center gap-3">
          {/* Word Blue Icon */}
          <div className="w-7 h-7 rounded-lg bg-[#0078D4] text-white flex items-center justify-center font-black text-xs shadow-xs border border-white/20">
            W
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">
                Document1 - Azmera Job Circular Editor
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-md bg-white/10 text-amber-300 border border-white/10">
                Word WYSIWYG
              </span>
            </div>
            <p className="text-[10px] text-slate-300">
              Visual Word canvas: formatting renders live without exposing raw HTML tags
            </p>
          </div>
        </div>

        {/* View Switcher: Word Canvas (Visual) vs Code vs Live Preview */}
        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setViewMode("visual")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "visual"
                ? "bg-[#F59E0B] text-[#0A2540] shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
            title="Interactive Visual Word Canvas"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Word Canvas</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("code")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "code"
                ? "bg-[#F59E0B] text-[#0A2540] shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
            title="View or Edit Raw Code / Markdown"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "preview"
                ? "bg-[#F59E0B] text-[#0A2540] shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
            title="Candidate Live Preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Candidate Preview</span>
          </button>
        </div>
      </div>

      {/* ── MS Word Ribbon Navigation Tabs ── */}
      <div className="bg-slate-100 dark:bg-[#071322] border-b border-slate-200 dark:border-slate-800 px-4 pt-1 flex items-center gap-1">
        {[
          { id: "home", label: "Home (Formatting & Styles)" },
          { id: "insert", label: "Insert (Image, Files & Callouts)" },
          { id: "templates", label: "Pre-made Templates" },
          {
            id: "attachments",
            label: `Attached Files (${attachments.length})`,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveRibbonTab(tab.id as any)}
            className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-t-2 cursor-pointer ${
              activeRibbonTab === tab.id
                ? "bg-white dark:bg-[#101E33] text-[#0A2540] dark:text-[#F59E0B] border-[#0A2540] dark:border-[#F59E0B] shadow-2xs"
                : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── MS Word Ribbon Toolbar Strip ── */}
      <div className="bg-slate-50 dark:bg-[#091526] border-b border-slate-200 dark:border-slate-800 p-2.5 flex flex-wrap items-center gap-2 text-xs select-none">
        {/* Tab 1: HOME Tools */}
        {activeRibbonTab === "home" && (
          <div className="flex flex-wrap items-center gap-2 w-full">
            {/* Undo / Redo */}
            <div className="flex items-center gap-1 pr-2 border-r border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 cursor-pointer"
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>

            {/* Headings / Styles */}
            <div className="flex items-center gap-1 pr-2 border-r border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={() => handleHeading(1)}
                className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#0A2540] text-slate-900 dark:text-white font-extrabold flex items-center gap-1 cursor-pointer"
                title="Heading 1 (Main Title)"
              >
                <Heading1 className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                <span className="text-[11px]">H1</span>
              </button>
              <button
                type="button"
                onClick={() => handleHeading(2)}
                className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#0A2540] text-slate-900 dark:text-white font-bold flex items-center gap-1 cursor-pointer"
                title="Heading 2 (Section)"
              >
                <Heading2 className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                <span className="text-[11px]">H2</span>
              </button>
              <button
                type="button"
                onClick={() => handleHeading(3)}
                className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#0A2540] text-slate-900 dark:text-white font-semibold flex items-center gap-1 cursor-pointer"
                title="Heading 3 (Sub-section)"
              >
                <Heading3 className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                <span className="text-[11px]">H3</span>
              </button>
            </div>

            {/* Font Formats: Bold, Italic, Underline, Strike */}
            <div className="flex items-center gap-1 pr-2 border-r border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={() =>
                  viewMode === "visual"
                    ? execVisualCommand("bold")
                    : applyTextareaFormatting("**", "**")
                }
                className="p-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#0A2540] text-slate-900 dark:text-white font-black cursor-pointer"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  viewMode === "visual"
                    ? execVisualCommand("italic")
                    : applyTextareaFormatting("*", "*")
                }
                className="p-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#0A2540] text-slate-900 dark:text-white italic cursor-pointer"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleUnderline}
                className="p-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#0A2540] text-slate-900 dark:text-white underline cursor-pointer"
                title="Underline (formats directly without raw tags)"
              >
                <Underline className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  viewMode === "visual"
                    ? execVisualCommand("strikeThrough")
                    : applyTextareaFormatting("~~", "~~")
                }
                className="p-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#0A2540] text-slate-900 dark:text-white line-through cursor-pointer"
                title="Strikethrough"
              >
                <Strikethrough className="w-4 h-4" />
              </button>
            </div>

            {/* Highlighter & Color */}
            <div className="flex items-center gap-1 pr-2 border-r border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={handleHighlight}
                className="p-1.5 px-2.5 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-900 border border-yellow-300 flex items-center gap-1.5 cursor-pointer font-bold shadow-2xs"
                title="Yellow Word Highlighter (Highlights selected text visually)"
              >
                <Highlighter className="w-3.5 h-3.5" />
                <span className="text-[11px]">Highlight</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  viewMode === "visual"
                    ? execVisualCommand("foreColor", "#0A2540")
                    : applyTextareaFormatting(
                        "<span style='color:#0A2540;font-weight:bold'>",
                        "</span>"
                      )
                }
                className="p-1.5 px-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0A2540] dark:text-[#38BDF8] border border-blue-200 dark:border-blue-800 flex items-center gap-1 cursor-pointer font-bold"
                title="Navy Color Text"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="text-[11px]">Navy Color</span>
              </button>
            </div>

            {/* Lists: Bullets & Numbers */}
            <div className="flex items-center gap-1 pr-2 border-r border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={() =>
                  viewMode === "visual"
                    ? execVisualCommand("insertUnorderedList")
                    : applyTextareaFormatting("\n• ", "")
                }
                className="p-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#0A2540] text-slate-900 dark:text-white cursor-pointer"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  viewMode === "visual"
                    ? execVisualCommand("insertOrderedList")
                    : applyTextareaFormatting("\n1. ", "")
                }
                className="p-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#0A2540] text-slate-900 dark:text-white cursor-pointer"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Callout & Table */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => insertCallout("notice")}
                className="px-2.5 py-1 rounded-lg bg-[#0A2540] dark:bg-[#F59E0B] text-white dark:text-[#0A2540] text-[11px] font-bold hover:bg-[#071829] dark:hover:bg-[#D97706] cursor-pointer"
              >
                + Notice Callout
              </button>
              <button
                type="button"
                onClick={insertTable}
                className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>+ Table</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: INSERT Tools */}
        {activeRibbonTab === "insert" && (
          <div className="flex flex-wrap items-center gap-3 w-full py-1">
            <button
              type="button"
              onClick={() => setShowImageModal(true)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#F59E0B] text-slate-900 dark:text-white font-bold flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <ImageIcon className="w-4 h-4 text-[#F59E0B]" />
              <span>Insert Picture / Graphic</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAttachModal(true)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#F59E0B] text-slate-900 dark:text-white font-bold flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Paperclip className="w-4 h-4 text-[#0A2540] dark:text-[#38BDF8]" />
              <span>Attach PDF / Word Circular ({attachments.length})</span>
            </button>

            <button
              type="button"
              onClick={() => insertCallout("urgent")}
              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-[#0A2540] dark:text-[#FBBF24] border border-amber-300 dark:border-amber-800 font-bold flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#D97706] dark:text-[#F59E0B]" />
              <span>Insert Fast-Track Callout (ናባይ ቀጥታ)</span>
            </button>

            <button
              type="button"
              onClick={() => insertCallout("benefits")}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold flex items-center gap-2 cursor-pointer"
            >
              <span>Insert Benefits Box</span>
            </button>

            <button
              type="button"
              onClick={insertDivider}
              className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold cursor-pointer"
            >
              Insert Horizontal Rule
            </button>
          </div>
        )}

        {/* Tab 3: TEMPLATES */}
        {activeRibbonTab === "templates" && (
          <div className="flex flex-wrap items-center gap-2 w-full py-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              1-Click Word Templates:
            </span>
            <button
              type="button"
              onClick={() => {
                onApplyTemplate?.("tdrf");
                setViewMode("visual");
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-300 font-extrabold flex items-center gap-1.5 hover:bg-rose-100 cursor-pointer"
            >
              <span>🏛️ TDRF Humanitarian Circular (Mekelle)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onApplyTemplate?.("skylight");
                setViewMode("visual");
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-300 font-extrabold flex items-center gap-1.5 hover:bg-amber-100 cursor-pointer"
            >
              <span>🏨 Skylight Hotel 124 Openings (Addis Ababa)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onApplyTemplate?.("fintech");
                setViewMode("visual");
              }}
              className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 border border-blue-300 font-extrabold flex items-center gap-1.5 hover:bg-blue-100 cursor-pointer"
            >
              <span>💻 FinTech / Banking Lead Role</span>
            </button>
          </div>
        )}

        {/* Tab 4: ATTACHMENTS LIST */}
        {activeRibbonTab === "attachments" && (
          <div className="flex flex-wrap items-center justify-between w-full py-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Official Documents for Candidates to Download:
              </span>
              {attachments.length === 0 ? (
                <span className="text-xs text-slate-400 italic">
                  No files attached yet. Click "+ Attach File".
                </span>
              ) : (
                attachments.map((file) => (
                  <span
                    key={file.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-rose-500" />
                    <span>{file.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({file.size})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(file.id)}
                      className="ml-1 text-slate-400 hover:text-red-500 cursor-pointer"
                      title="Remove attachment"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowAttachModal(true)}
              className="px-3 py-1 rounded-xl bg-[#0A2540] text-white text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-[#07192C]"
            >
              <Plus className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>+ Attach File</span>
            </button>
          </div>
        )}
      </div>

      {/* ── MS Word Document Page Canvas ── */}
      <div className="p-4 sm:p-6 bg-slate-200/70 dark:bg-[#07101E] min-h-[500px] flex justify-center">
        {/* 1. Word Canvas Mode (WYSIWYG Visual Paper) */}
        {viewMode === "visual" && (
          <div className="w-full max-w-3xl bg-white dark:bg-[#101E33] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 flex flex-col space-y-4 relative min-h-[480px]">
            {/* Word Document Header Ribbon Line */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-mono select-none">
              <span>AZMERA JOBS • VISUAL WORD CANVAS (WYSIWYG)</span>
              <span>PAGE 1 OF 1</span>
            </div>

            {/* Flyer Banner Display if set */}
            {flyerImage && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md group">
                <img
                  src={flyerImage}
                  alt="Job Flyer"
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 text-white text-[10px] font-bold">
                    Official Flyer Banner
                  </span>
                  <button
                    type="button"
                    onClick={() => onChangeFlyerImage(undefined)}
                    className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    title="Remove Flyer Banner"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Visual contentEditable Word Paper */}
            <div
              ref={canvasRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleCanvasInput}
              className="w-full flex-1 p-3 bg-transparent text-slate-900 dark:text-slate-100 font-sans text-xs sm:text-sm leading-relaxed outline-none min-h-[360px] focus:ring-1 focus:ring-[#F59E0B]/30 rounded-lg word-canvas-editable"
            />

            {/* Attached files preview shelf inside the document */}
            {attachments.length > 0 && (
              <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-[#0A2540] dark:text-[#F59E0B]" />
                  <span>Official Attached Circulars ({attachments.length}):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {attachments.map((att) => (
                    <div
                      key={att.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-black text-xs shrink-0">
                          {att.type.toUpperCase()}
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                            {att.name}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {att.size} • Downloadable by candidates
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(att.id)}
                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Code / Markdown Mode (For editing raw strings) */}
        {viewMode === "code" && (
          <div className="w-full max-w-3xl bg-white dark:bg-[#101E33] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 flex flex-col space-y-4 relative min-h-[480px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-mono select-none">
              <span>AZMERA JOBS • SOURCE CODE &amp; MARKDOWN MODE</span>
              <span>RAW TEXT</span>
            </div>

            <textarea
              ref={textareaRef}
              rows={16}
              value={description}
              onChange={(e) => updateContent(e.target.value)}
              placeholder="Raw markdown or HTML code..."
              className="w-full flex-1 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs leading-relaxed outline-none resize-y min-h-[360px]"
            />
          </div>
        )}

        {/* 3. Candidate Live Preview Mode (Processed via RichDocumentRenderer) */}
        {viewMode === "preview" && (
          <div className="w-full max-w-3xl bg-white dark:bg-[#101E33] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                Candidate Document Preview
              </span>
              <span className="text-xs text-slate-400">
                Rendered as Job Seekers will see it
              </span>
            </div>

            {/* Flyer Image */}
            {flyerImage && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                <img
                  src={flyerImage}
                  alt="Flyer"
                  className="w-full h-auto object-cover max-h-72"
                />
              </div>
            )}

            {/* Formatted Text Content processed through RichDocumentRenderer */}
            <RichDocumentRenderer content={description} />

            {/* Attached Files List */}
            {attachments.length > 0 && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#0A2540] dark:text-[#F59E0B]" />
                  <span>Download Official Circular Documents &amp; Application Forms</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {attachments.map((file) => (
                    <div
                      key={file.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
                          {file.type.toUpperCase()}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            {file.name}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {file.size}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-lg bg-[#0A2540] text-white text-[11px] font-bold flex items-center gap-1 shadow-xs cursor-pointer">
                        <Download className="w-3 h-3 text-[#F59E0B]" />
                        Download
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── MS Word Status Bar ── */}
      <div className="bg-slate-100 dark:bg-[#071322] border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span>PAGE 1 OF 1</span>
          <span>WORDS: {wordCount}</span>
          <span>CHARS: {charCount}</span>
          <span>ATTACHMENTS: {attachments.length}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">MODE: {viewMode.toUpperCase()}</span>
          <span>100% ZOOM</span>
        </div>
      </div>

      {/* ── Modal: Insert Image ── */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Insert Picture or Flyer
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Image URL or Web Link *
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/circular-banner.jpg"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Caption / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. TDRF Official Hiring Circular Flyer"
                  value={imageCaptionInput}
                  onChange={(e) => setImageCaptionInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-[#F59E0B]"
                />
              </div>

              {/* Quick sample image buttons */}
              <div>
                <span className="text-[10px] text-slate-500 font-semibold block mb-1.5">
                  Or select a sample verified image:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrlInput(
                        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=80"
                      );
                      setImageCaptionInput("TDRF Field Community Mission");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                  >
                    TDRF Mission Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrlInput(
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80"
                      );
                      setImageCaptionInput("Skylight Hotel Grand Lobby");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                  >
                    Skylight Hotel Photo
                  </button>
                </div>
              </div>

              {/* Set as Primary Flyer option */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-300">
                  Also set as primary top circular banner:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (imageUrlInput.trim()) {
                      onChangeFlyerImage(imageUrlInput.trim());
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-[11px] font-bold hover:bg-amber-200 cursor-pointer"
                >
                  Set as Top Banner
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                className="px-4 py-2 rounded-xl bg-[#0A2540] text-white text-xs font-bold shadow-xs hover:bg-[#07192C] cursor-pointer"
              >
                Insert into Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Attach File / Circular ── */}
      {showAttachModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#101E33] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Paperclip className="w-5 h-5 text-[#0A2540] dark:text-[#38BDF8]" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Attach Official Document or Circular
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAttachModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Document / Circular File Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Terms_of_Reference_Executive_Director"
                  value={attachFileName}
                  onChange={(e) => setAttachFileName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:border-[#0A2540]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Document Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttachFileType("pdf")}
                    className={`py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                      attachFileType === "pdf"
                        ? "bg-rose-50 border-rose-400 text-rose-900"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <span className="font-black text-rose-600">PDF</span> Document (.pdf)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttachFileType("docx")}
                    className={`py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                      attachFileType === "docx"
                        ? "bg-blue-50 border-blue-400 text-blue-900"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <span className="font-black text-blue-600">DOCX</span> Word Doc (.docx)
                  </button>
                </div>
              </div>

              {/* Sample standard documents */}
              <div>
                <span className="text-[10px] text-slate-500 font-semibold block mb-1.5">
                  Quick standard Ethiopian recruitment attachments:
                </span>
                <div className="space-y-1.5">
                  {[
                    "Terms_of_Reference_ToR_2026.pdf",
                    "Official_Vacancy_Circular_Gazette.pdf",
                    "Standard_Candidate_Application_Form.docx",
                  ].map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setAttachFileName(name);
                        setAttachFileType(name.endsWith(".docx") ? "docx" : "pdf");
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between cursor-pointer"
                    >
                      <span>{name}</span>
                      <span className="text-[10px] text-slate-400">Select</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAttachModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddAttachment}
                className="px-4 py-2 rounded-xl bg-[#0A2540] hover:bg-[#07192C] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] text-white dark:text-[#0A2540] text-xs font-bold shadow-xs cursor-pointer"
              >
                Attach File to Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
