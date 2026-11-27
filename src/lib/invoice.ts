import { PaymentTransaction } from "@/types";

function escapeHtml(raw: unknown): string {
  return String(raw ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildVatInvoiceHtml(tx: PaymentTransaction): string {
  const vatAmount = Math.round(tx.amount * 0.15);
  const netAmount = tx.amount - vatAmount;
  const methodLabel =
    tx.method === "telebirr"
      ? "telebirr (Ethio Telecom)"
      : tx.method === "cbe"
      ? "CBE Bank / CBE Birr"
      : "Safaricom M-Pesa";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Azmera Jobs VAT E-Receipt - ${escapeHtml(tx.invoiceNumber)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; color: #0A2540; margin: 0; padding: 32px; background: #F8FAFC; }
    .card { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #CBD5E1; border-radius: 16px; padding: 32px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0A2540; padding-bottom: 20px; margin-bottom: 24px; }
    .brand { font-size: 22px; font-weight: 800; color: #0A2540; }
    .tag { display: inline-block; background: #F59E0B; color: #0A2540; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; margin-top: 6px; }
    .meta { text-align: right; font-size: 12px; color: #475569; }
    .meta strong { display: block; font-size: 14px; color: #0A2540; font-family: monospace; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; font-size: 13px; }
    .box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px 14px; }
    .label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748B; margin-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; }
    th, td { padding: 12px 10px; border-bottom: 1px solid #E2E8F0; text-align: left; }
    th { font-size: 11px; text-transform: uppercase; color: #64748B; background: #F1F5F9; }
    .num { text-align: right; font-family: monospace; font-weight: 700; }
    .total td { font-size: 16px; font-weight: 800; border-top: 2px solid #0A2540; border-bottom: none; color: #0A2540; }
    .guarantee { margin-top: 24px; padding: 14px; background: #FEF3C7; border: 1px solid #F59E0B; border-radius: 10px; font-size: 12px; color: #78350F; }
    .actions { text-align: center; margin-top: 20px; }
    .btn { background: #0A2540; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; }
    @media print { body { background: #fff; padding: 0; } .actions { display: none; } }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div>
        <div class="brand">AZMERA JOBS</div>
        <div style="font-size:12px;color:#475569;margin-top:2px;">Addis Ababa, Ethiopia • +251 91 100 0000 • @AzmeraJobConnect</div>
        <span class="tag">Official Ethiopian VAT E-Receipt</span>
      </div>
      <div class="meta">
        <span>Invoice Number</span>
        <strong>${escapeHtml(tx.invoiceNumber)}</strong>
        <span style="display:block;margin-top:4px;">Issued: ${escapeHtml(tx.createdAt)}</span>
      </div>
    </div>

    <div class="grid">
      <div class="box">
        <div class="label">Billed Account / Company</div>
        <strong>${escapeHtml(tx.companyName || "Azmera Partner")}</strong>
        <div style="color:#475569;margin-top:2px;">Payer: ${escapeHtml(tx.payerPhoneOrAccount)}</div>
      </div>
      <div class="box">
        <div class="label">Gateway & Reference</div>
        <strong>${escapeHtml(methodLabel)}</strong>
        <div style="color:#059669;font-family:monospace;font-weight:700;margin-top:2px;">Ref: ${escapeHtml(tx.referenceNumber)} (${escapeHtml(tx.status)})</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th class="num">Amount (ETB)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${escapeHtml(tx.purposeLabel)} (Net Subtotal)</td>
          <td class="num">${netAmount.toLocaleString()} ETB</td>
        </tr>
        <tr>
          <td>Ethiopian VAT (15%)</td>
          <td class="num">${vatAmount.toLocaleString()} ETB</td>
        </tr>
        <tr class="total">
          <td>Total Paid (VAT Inclusive)</td>
          <td class="num">${tx.amount.toLocaleString()} ETB</td>
        </tr>
      </tbody>
    </table>

    <div class="guarantee">
      <strong>Azmera Guarantee:</strong> Verified electronic transaction receipt. Covered by Azmera Jobs 14-day candidate replacement policy where applicable.
    </div>

    <div class="actions">
      <button class="btn" onclick="window.print()">Print / Save as PDF</button>
    </div>
  </div>
</body>
</html>`;
}

export function openPrintableVatInvoice(tx: PaymentTransaction): boolean {
  const html = buildVatInvoiceHtml(tx);
  const popup = window.open("", "_blank", "width=820,height=900");
  if (popup) {
    popup.document.open();
    popup.document.write(html);
    popup.document.close();
    setTimeout(() => {
      try {
        popup.focus();
        popup.print();
      } catch {
        // user can click Print button inside popup
      }
    }, 250);
    return true;
  }

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${tx.invoiceNumber || tx.referenceNumber}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return false;
}

export function exportTransactionsCsv(transactions: PaymentTransaction[]): void {
  const header = ["Invoice", "Date", "Purpose", "Company", "Method", "Reference", "Amount_ETB", "Status"];
  const escapeCsv = (val: unknown) => `"${String(val ?? "").replace(/"/g, '""')}"`;
  const rows = transactions.map((tx) =>
    [
      tx.invoiceNumber,
      tx.createdAt,
      tx.purposeLabel,
      tx.companyName || "",
      tx.method,
      tx.referenceNumber,
      tx.amount,
      tx.status,
    ]
      .map(escapeCsv)
      .join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `azmera-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
