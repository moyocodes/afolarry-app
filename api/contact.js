import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { from_name, from_email, phone, service, message, subject } =
    req.body ?? {};
  if (!from_name || !from_email || !message)
    return res.status(400).json({ error: "Missing required fields" });

  const resend = new Resend(process.env.RESEND_API_KEY);

  const esc = (v) =>
    String(v || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const safeMsg = esc(message).replace(/\n/g, "<br>");
  const safeService = esc(service || "General enquiry");
  const safePhone = esc(phone || "Not provided");
  const subjectLine =
    subject || `New enquiry from ${from_name}${service ? ` — ${service}` : ""}`;

  const row = (label, value) => `
    <tr>
      <td style="padding:9px 16px 9px 0;border-bottom:1px solid #e8eef6;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#5a7599;white-space:nowrap;">${label}</td>
      <td style="padding:9px 0;border-bottom:1px solid #e8eef6;font-size:13px;font-weight:600;color:#0d1b2e;">${value}</td>
    </tr>`;

  const header = (title) => `
    <div style="background:#0d1b2e;border-radius:12px 12px 0 0;padding:20px 28px;">
      <p style="margin:0 0 5px;font-size:10px;color:rgba(255,255,255,0.4);letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">Afolaray Nigeria Limited</p>
      <p style="margin:0;font-size:18px;color:#ffffff;font-weight:600;">${title}</p>
    </div>`;

  const wrapper = (content) => `
    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;background:#f0f5fb;padding:32px 16px;border-radius:16px;">
      <div style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dce8f7;">
        ${content}
      </div>
      <p style="text-align:center;font-size:11px;color:#8fa8c4;margin:20px 0 0;">Afolaray Nigeria Limited · 11A Apapa-Oshodi Express Way, Amuwo, Lagos</p>
    </div>`;

  const body = (content) => `
    <div style="padding:24px 28px;">${content}</div>`;

  const msgBlock = (html) => `
    <div style="margin-top:16px;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#5a7599;">Message</p>
      <div style="background:#f7faff;border-radius:8px;padding:14px 16px;font-size:13px;color:#0d1b2e;line-height:1.7;">${html}</div>
    </div>`;

  try {
    await Promise.all([
      // ── Notify Afolaray team ──────────────────────────────────────────────
      resend.emails.send({
        from: "Afolaray Contact <contact@afolaray.com>",
        to: ["contact@afolaray.com"],
        replyTo: from_email,
        subject: subjectLine,
        html: wrapper(`
          ${header("New enquiry received")}
          ${body(`
            <table style="width:100%;border-collapse:collapse;">
              ${row("Name", esc(from_name))}
              ${row("Email", `<a href="mailto:${esc(from_email)}" style="color:#1565c0;text-decoration:none;">${esc(from_email)}</a>`)}
              ${row("Phone", safePhone)}
              ${row("Service", safeService)}
            </table>
            ${msgBlock(safeMsg)}
            <p style="margin:20px 0 0;font-size:11px;color:#8fa8c4;">Reply to this email to contact the customer directly.</p>
          `)}
        `),
      }),

      // ── Confirmation to customer ──────────────────────────────────────────
      resend.emails.send({
        from: "Afolaray Contact <contact@afolaray.com>",
        to: from_email,
        replyTo: ["contact@afolaray.com"],
        subject: "We received your message — Afolaray Nigeria Limited",
        html: wrapper(`
          ${header("Message received")}
          ${body(`
            <p style="margin:0 0 4px;font-size:15px;font-weight:600;color:#0d1b2e;">Hi ${esc(from_name)},</p>
            <p style="margin:0 0 20px;font-size:13px;color:#5a7599;line-height:1.7;">We've received your enquiry and our team will be in touch with you shortly.</p>
            <table style="width:100%;border-collapse:collapse;">
              ${row("Service", safeService)}
              ${row("Phone", safePhone)}
            </table>
            ${msgBlock(safeMsg)}
            <div style="margin-top:20px;background:#e3f2fd;border-radius:8px;padding:14px 16px;font-size:12px;color:#0d1b2e;line-height:1.6;">
              Questions? Call or WhatsApp us: <strong>+234 703 357 6017</strong>
            </div>
            <p style="margin:20px 0 0;font-size:12px;color:#5a7599;line-height:1.7;">
              Best regards,<br>
              <strong style="color:#0d1b2e;">Afolaray Nigeria Limited</strong>
            </p>
          `)}
        `),
      }),
    ]);

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to send" });
  }
}
