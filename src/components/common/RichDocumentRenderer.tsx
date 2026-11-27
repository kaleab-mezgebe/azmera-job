"use client";

import React from "react";

/**
 * Strips HTML tags and markdown symbols for compact card previews / search snippets.
 */
export function stripRichFormatting(raw: string): string {
  if (!raw) return "";
  return raw
    // Remove HTML tags
    .replace(/<[^>]*>/g, " ")
    // Remove markdown headers
    .replace(/^#{1,6}\s+/gm, "")
    // Remove markdown blockquotes
    .replace(/^>\s+/gm, "")
    // Remove markdown bold / italic
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/~~(.*?)~~/g, "$1")
    // Remove markdown links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove markdown image tags ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    // Remove table lines
    .replace(/\|.*\|/g, "")
    // Remove extra whitespace
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Sanitizes untrusted HTML fragments before inline markdown expansion to block XSS.
 */
function sanitizeRichHtml(input: string): string {
  return input
    // Strip dangerous blocks completely
    .replace(/<\s*(script|style|iframe|object|embed|svg|math|form|input|button|textarea|select|meta|link|base)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed|svg|math|form|input|button|textarea|select|meta|link|base)[^>]*\/?>/gi, "")
    // Strip inline JS event handlers (onload=, onerror=, onclick=, etc.) and javascript:/data: URIs
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(?:"\s*(?:javascript|vbscript|data:text\/html)[^"]*"|'\s*(?:javascript|vbscript|data:text\/html)[^']*')/gi, '$1="#"')
    // Escape any HTML tags outside the small safe formatting whitelist
    .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (full, tagName: string) => {
      const tag = tagName.toLowerCase();
      if (tag === "br") return "<br/>";
      if (tag === "u" || tag === "strong" || tag === "em" || tag === "b" || tag === "i" || tag === "p" || tag === "mark") {
        const isClose = full.startsWith("</");
        return isClose ? `</${tag}>` : `<${tag}>`;
      }
      return full.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    });
}

function isSafeImageUrl(rawUrl: string): boolean {
  const url = rawUrl.trim();
  return (
    url.startsWith("https://") ||
    url.startsWith("http://") ||
    url.startsWith("/api/uploads/") ||
    url.startsWith("/")
  );
}

/**
 * Converts a raw description (which might be markdown, HTML, or mixed with <mark> and <u> tags)
 * into rich, sanitized HTML that renders safely inside Word Canvas and Candidate views.
 */
export function renderJobDescriptionHtml(raw: string): string {
  if (!raw || typeof raw !== "string") return "";

  const sanitizedRaw = sanitizeRichHtml(raw);
  const lines = sanitizedRaw.split("\n");
  const processedLines: string[] = [];
  let inBlockquote = false;
  let blockquoteContent: string[] = [];
  let inBulletList = false;
  let bulletListItems: string[] = [];
  let inNumberedList = false;
  let numberedListItems: string[] = [];
  let inTable = false;
  let tableRows: string[] = [];

  const flushBlockquote = () => {
    if (inBlockquote && blockquoteContent.length > 0) {
      const fullText = blockquoteContent.join("<br/>");
      const isUrgent =
        fullText.includes("⚡") ||
        fullText.toLowerCase().includes("fast-track") ||
        fullText.includes("ናባይ ቀጥታ");
      const isNotice =
        fullText.includes("📋") || fullText.toLowerCase().includes("notice");
      const isBenefits =
        fullText.includes("🎁") || fullText.toLowerCase().includes("benefits");

      let borderClass = "border-l-4 border-[#0A2540] bg-[#EEF4FA] dark:bg-slate-800/80 text-[#0A2540] dark:text-slate-100";
      if (isUrgent) {
        borderClass =
          "border-l-4 border-[#F59E0B] bg-amber-50/90 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100";
      } else if (isBenefits) {
        borderClass =
          "border-l-4 border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100";
      }

      processedLines.push(
        `<div class="p-4 my-3.5 rounded-2xl ${borderClass} shadow-2xs text-xs sm:text-sm font-medium leading-relaxed">${fullText}</div>`
      );
      blockquoteContent = [];
      inBlockquote = false;
    }
  };

  const flushBulletList = () => {
    if (inBulletList && bulletListItems.length > 0) {
      const lis = bulletListItems
        .map(
          (item) =>
            `<li class="flex items-start gap-2.5 my-1"><span class="w-1.5 h-1.5 rounded-full bg-[#0A2540] dark:bg-[#F59E0B] mt-1.5 shrink-0"></span><span>${item}</span></li>`
        )
        .join("");
      processedLines.push(`<ul class="my-2.5 space-y-1 text-xs sm:text-sm">${lis}</ul>`);
      bulletListItems = [];
      inBulletList = false;
    }
  };

  const flushNumberedList = () => {
    if (inNumberedList && numberedListItems.length > 0) {
      const lis = numberedListItems
        .map(
          (item, idx) =>
            `<li class="flex items-start gap-2.5 my-1"><span class="w-5 h-5 rounded-md bg-[#0A2540]/10 dark:bg-[#F59E0B]/20 text-[#0A2540] dark:text-[#FBBF24] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span><span>${item}</span></li>`
        )
        .join("");
      processedLines.push(`<ol class="my-2.5 space-y-1.5 text-xs sm:text-sm">${lis}</ol>`);
      numberedListItems = [];
      inNumberedList = false;
    }
  };

  const flushTable = () => {
    if (inTable && tableRows.length > 0) {
      const rows = tableRows.map((r, rowIdx) => {
        const cells = r
          .split("|")
          .map((c) => c.trim())
          .filter((_, i, arr) => i > 0 && i < arr.length - 1);

        // Check if separator line e.g. | :--- | :--- |
        if (cells.every((c) => /^:?-+:?$/.test(c))) {
          return "";
        }

        const tag = rowIdx === 0 ? "th" : "td";
        const rowClass =
          rowIdx === 0
            ? "bg-slate-100 dark:bg-slate-800 font-extrabold text-[#0A2540] dark:text-white"
            : "border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50";

        const cellsHtml = cells
          .map(
            (c) =>
              `<${tag} class="px-3.5 py-2.5 text-xs border-r border-slate-200 dark:border-slate-700 last:border-r-0">${c}</${tag}>`
          )
          .join("");

        return `<tr class="${rowClass}">${cellsHtml}</tr>`;
      }).filter(Boolean);

      processedLines.push(
        `<div class="my-4 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs"><table class="w-full text-left border-collapse">${rows.join("")}</table></div>`
      );
      tableRows = [];
      inTable = false;
    }
  };

  // Helper to format inline markdown inside any line (bold, italic, strike, underline, highlight)
  const formatInline = (text: string): string => {
    return text
      // Bold **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
      // Italic *text*
      .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em class="italic">$1</em>')
      // Strikethrough ~~text~~
      .replace(/~~(.*?)~~/g, '<del class="line-through text-slate-400">$1</del>')
      // Underline <u>text</u> -> ensure consistent styling
      .replace(
        /<u>(.*?)<\/u>/gi,
        '<u class="underline decoration-2 decoration-[#F59E0B] underline-offset-3 font-semibold">$1</u>'
      )
      // Highlight <mark ...>text</mark> -> cohesive Azmera Gold highlight
      .replace(
        /<mark(?:\s+[^>]*)?>(.*?)<\/mark>/gi,
        '<mark class="bg-amber-200/80 dark:bg-amber-400/25 text-[#0A2540] dark:text-amber-200 px-1.5 py-0.5 rounded-md font-semibold inline-block">$1</mark>'
      )
      // Image markdown ![alt](url) — allow only safe http(s) or relative upload URLs
      .replace(/!\[(.*?)\]\((.*?)\)/g, (_m, alt: string, url: string) => {
        if (!isSafeImageUrl(url)) return "";
        const safeAlt = alt.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeUrl = url.trim().replace(/"/g, "&quot;");
        return `<div class="my-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm"><img src="${safeUrl}" alt="${safeAlt}" class="w-full max-h-80 object-cover"/><div class="p-2 text-[11px] text-center text-slate-500 font-medium">${safeAlt}</div></div>`;
      });
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 1. Table line (| ... |)
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushBlockquote();
      flushBulletList();
      flushNumberedList();
      inTable = true;
      tableRows.push(trimmed);
      continue;
    } else {
      flushTable();
    }

    // 2. Blockquote line (> ...)
    if (trimmed.startsWith(">")) {
      flushBulletList();
      flushNumberedList();
      inBlockquote = true;
      const quoteText = trimmed.replace(/^>\s*/, "");
      blockquoteContent.push(formatInline(quoteText));
      continue;
    } else {
      flushBlockquote();
    }

    // 3. Markdown Checklist (- [x] / - [ ] / * [x] / * [ ]) & Bullet line (• / - / *)
    const checklistMatch = trimmed.match(/^(?:-|\*|•)\s*\[(x|X|\s)\]\s+(.*)$/);
    if (checklistMatch) {
      flushNumberedList();
      inBulletList = true;
      const checked = checklistMatch[1].toLowerCase() === "x";
      const itemText = formatInline(checklistMatch[2]);
      bulletListItems.push(
        `<span class="inline-flex items-center gap-2">${
          checked
            ? '<span class="inline-flex items-center justify-center w-4 h-4 rounded-md bg-emerald-600 text-white text-[10px] font-black shrink-0">✓</span>'
            : '<span class="inline-flex items-center justify-center w-4 h-4 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-transparent text-[10px] shrink-0">•</span>'
        }<span>${itemText}</span></span>`
      );
      continue;
    }

    if (
      trimmed.startsWith("•") ||
      (trimmed.startsWith("-") && !trimmed.startsWith("---")) ||
      (trimmed.startsWith("*") && !trimmed.startsWith("**") && trimmed.charAt(1) === " ")
    ) {
      flushNumberedList();
      inBulletList = true;
      const bulletText = trimmed.replace(/^(?:•|-|\*)\s*/, "");
      bulletListItems.push(formatInline(bulletText));
      continue;
    } else {
      flushBulletList();
    }

    // 4. Numbered list line (1. ... or 2. ...)
    if (/^\d+\.\s+/.test(trimmed)) {
      inNumberedList = true;
      const numText = trimmed.replace(/^\d+\.\s+/, "");
      numberedListItems.push(formatInline(numText));
      continue;
    } else {
      flushNumberedList();
    }

    // 5. Horizontal rule (---)
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      processedLines.push('<hr class="my-5 border-slate-200 dark:border-slate-800"/>');
      continue;
    }

    // 6. Headings (# H1, ## H2, ### H3)
    if (trimmed.startsWith("#")) {
      const match = trimmed.match(/^(#{1,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = formatInline(match[2].trim());
        if (!text) continue; // Skip empty headers like "## "

        if (level === 1) {
          processedLines.push(
            `<h1 class="text-xl sm:text-2xl font-black text-[#0A2540] dark:text-white mt-5 mb-2.5 tracking-tight">${text}</h1>`
          );
        } else if (level === 2) {
          processedLines.push(
            `<h2 class="text-lg sm:text-xl font-extrabold text-[#0A2540] dark:text-white mt-4 mb-2 tracking-tight">${text}</h2>`
          );
        } else {
          processedLines.push(
            `<h3 class="text-base sm:text-lg font-bold text-[#0A2540] dark:text-white mt-3.5 mb-1.5">${text}</h3>`
          );
        }
        continue;
      } else if (trimmed === "#" || trimmed === "##" || trimmed === "###") {
        // Skip bare hashtags without content
        continue;
      }
    }

    // 7. Regular paragraph / empty line
    if (trimmed.length === 0) {
      processedLines.push('<div class="h-2"></div>');
    } else {
      processedLines.push(
        `<p class="my-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">${formatInline(
          trimmed
        )}</p>`
      );
    }
  }

  // Flush any trailing blocks
  flushBlockquote();
  flushBulletList();
  flushNumberedList();
  flushTable();

  return processedLines.join("\n");
}

interface RichDocumentRendererProps {
  content: string;
  className?: string;
}

export default function RichDocumentRenderer({
  content,
  className = "",
}: RichDocumentRendererProps) {
  const renderedHtml = renderJobDescriptionHtml(content);

  return (
    <div
      className={`rich-document-prose max-w-none text-slate-800 dark:text-slate-200 leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
