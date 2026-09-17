import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

interface LeadPayload {
  type: "fleet_partner" | "charter_inquiry" | "sales_inquiry" | "sell_yacht" | "contact";
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  plan?: string;
  fleetSize?: string;
  fleetBase?: string;
  listingLink?: string;
  yachtName?: string;
  charterDates?: string;
  guests?: number | string;
  budget?: string;
  notes?: string;
  details?: Record<string, unknown>;
}

export async function POST(req: Request) {
  try {
    const data: LeadPayload = await req.json();

    if (!data.email && !data.phone) {
      return NextResponse.json(
        { ok: false, error: "At least email or phone is required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const leadId = "YD-" + Math.floor(100000 + Math.random() * 900000);

    // 1. Persist lead to local JSON storage backup
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "leads.json");
      const existing: unknown[] = fs.existsSync(leadsFile)
        ? JSON.parse(fs.readFileSync(leadsFile, "utf8"))
        : [];
      existing.push({ id: leadId, timestamp, ...data });
      fs.writeFileSync(leadsFile, JSON.stringify(existing, null, 2), "utf8");
    } catch (err) {
      console.warn("[YachtDesk Lead Backup Warning]:", err);
    }

    // 2. Dispatch email notification via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const toInbox = process.env.CONTACT_INBOX || "hello@laycandesk.com";
    const fromEmail = process.env.FROM_EMAIL || "hello@laycandesk.com";

    const subjectType =
      data.type === "fleet_partner"
        ? `Greek Fleet Partner (${data.plan || "CA Partner"})`
        : data.type === "sales_inquiry"
        ? `Superyacht S&P Inquiry (${data.yachtName || "Purchase"})`
        : data.type === "sell_yacht"
        ? `Central Agency Sale Listing (${data.company || "Owner"})`
        : data.type === "charter_inquiry"
        ? `Charter Booking Request (${data.yachtName || "Aegean"})`
        : "General Inquiry";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0B1E36; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0B1E36; color: white; padding: 20px; text-align: left;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: #38BDF8;">YachtDesk Central Operations</h2>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #94A3B8;">New Intake: ${subjectType} • Ref #${leadId}</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold; width: 35%;">Lead Type:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #02509A;">${data.type.toUpperCase()}</td>
            </tr>
            ${data.company ? `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Company / Fleet:</td>
              <td style="padding: 8px 0; font-weight: bold;">${data.company}</td>
            </tr>` : ""}
            ${data.name ? `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Contact Name:</td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>` : ""}
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            ${data.phone ? `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">WhatsApp / Phone:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #16A34A;">${data.phone}</td>
            </tr>` : ""}
            ${data.plan ? `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Selected Plan:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #0284C7;">${data.plan}</td>
            </tr>` : ""}
            ${data.fleetSize ? `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Fleet Size:</td>
              <td style="padding: 8px 0;">${data.fleetSize}</td>
            </tr>` : ""}
            ${data.fleetBase ? `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Base Marina:</td>
              <td style="padding: 8px 0;">${data.fleetBase}</td>
            </tr>` : ""}
            ${data.yachtName ? `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Target Yacht:</td>
              <td style="padding: 8px 0; font-weight: bold;">${data.yachtName}</td>
            </tr>` : ""}
            ${data.charterDates ? `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Requested Dates:</td>
              <td style="padding: 8px 0;">${data.charterDates}</td>
            </tr>` : ""}
            ${data.listingLink ? `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Fleet / MLS Link:</td>
              <td style="padding: 8px 0;"><a href="${data.listingLink}" target="_blank">${data.listingLink}</a></td>
            </tr>` : ""}
            ${data.notes ? `
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 8px 0; color: #64748B; font-weight: bold;">Notes:</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${data.notes}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 20px; padding: 12px; background: #F8FAFC; border-radius: 8px; font-size: 11px; color: #64748B;">
            Submitted via YachtDesk Portal at ${timestamp} • Hellenic Law 4926/2022 Framework
          </div>
        </div>
      </div>
    `;

    let emailSent = false;
    let resendId: string | null = null;

    if (resendKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `YachtDesk Operations <${fromEmail}>`,
            to: [toInbox],
            reply_to: data.email,
            subject: `[YachtDesk] ${subjectType}: ${data.company || data.name || data.email}`,
            html: htmlContent,
          }),
        });

        if (res.ok) {
          const resJson = await res.json();
          emailSent = true;
          resendId = resJson.id;
        } else {
          const errText = await res.text();
          console.warn("[YachtDesk Resend Dispatch Warning]:", res.status, errText);
        }
      } catch (emailErr) {
        console.warn("[YachtDesk Email Error]:", emailErr);
      }
    }

    return NextResponse.json({
      ok: true,
      leadId,
      emailSent,
      resendId,
      message: "Inquiry successfully recorded",
    });
  } catch (error) {
    console.error("[YachtDesk API Error]:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
