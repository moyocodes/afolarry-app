import { Resend } from "resend";

const FROM = "Afolaray Shipments <shipments@afolaray.com>";
const TEAM = ["contact@afolaray.com"];

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const {
    shipmentId,
    customerName,
    customerEmail,
    recipientEmail,
    origin,
    destination,
    carrier,
    vessel,
    eta,
    status,
    notes,
    isUpdate,
  } = req.body ?? {};

  if (!shipmentId) return res.status(400).json({ error: "Missing shipmentId" });

  const resend = new Resend(process.env.RESEND_API_KEY);

  const esc = (v) =>
    String(v || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const fmtDate = (ts) =>
    ts
      ? new Date(ts).toLocaleDateString("en-NG", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "—";

  const row = (label, value) => `
    <tr>
      <td style="padding:9px 16px 9px 0;border-bottom:1px solid #e8eef6;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#5a7599;white-space:nowrap;">${label}</td>
      <td style="padding:9px 0;border-bottom:1px solid #e8eef6;font-size:13px;font-weight:600;color:#0d1b2e;">${value}</td>
    </tr>`;

  const wrapper = (content) => `
    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:580px;margin:0 auto;background:#f0f5fb;padding:32px 16px;border-radius:16px;">
      <div style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dce8f7;">
        ${content}
      </div>
      <p style="text-align:center;font-size:11px;color:#8fa8c4;margin:20px 0 0;">Afolaray Nigeria Limited · 11A Apapa-Oshodi Express Way, Amuwo, Lagos</p>
    </div>`;

  const header = (title, sub) => `
    <div style="background:linear-gradient(135deg,#0d1b2e 0%,#1565c0 100%);border-radius:12px 12px 0 0;padding:24px 28px;">
      <p style="margin:0 0 4px;font-size:10px;color:rgba(255,255,255,0.45);letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Afolaray Nigeria Limited</p>
      <p style="margin:0 0 2px;font-size:19px;color:#ffffff;font-weight:700;">${title}</p>
      ${sub ? `<p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.55);">${sub}</p>` : ""}
    </div>`;

  const body = (content) => `<div style="padding:24px 28px;">${content}</div>`;

  const trackingBox = `
    <div style="margin-top:20px;background:#e3f2fd;border-radius:10px;padding:14px 18px;display:flex;align-items:center;gap:12px;">
      <div>
        <p style="margin:0 0 3px;font-size:11px;font-weight:700;color:#1565c0;text-transform:uppercase;letter-spacing:0.06em;">Track your shipment</p>
        <p style="margin:0;font-size:13px;color:#0d1b2e;">Visit our website and enter your shipment ID: <strong>${esc(shipmentId)}</strong></p>
      </div>
    </div>`;

  const contactBox = `
    <div style="margin-top:14px;background:#f7faff;border-radius:10px;padding:14px 18px;font-size:12px;color:#5a7599;line-height:1.6;">
      Questions? Call or WhatsApp: <strong style="color:#0d1b2e;">+234 703 357 6017</strong><br>
      Email: <a href="mailto:contact@afolaray.com" style="color:#1565c0;text-decoration:none;">contact@afolaray.com</a>
    </div>`;

  const sends = [];

  const shipmentTable = `
    <table style="width:100%;border-collapse:collapse;">
      ${row("Shipment ID", `<span style="font-family:monospace;background:#f0f5fb;padding:2px 8px;border-radius:4px;">${esc(shipmentId)}</span>`)}
      ${row("Status", esc(status || "Pending"))}
      ${row("Origin", esc(origin || "—"))}
      ${row("Destination", esc(destination || "—"))}
      ${row("Carrier", esc(carrier || "—"))}
      ${row("Vessel", esc(vessel || "—"))}
      ${row("ETA", fmtDate(eta))}
      ${notes ? row("Notes", esc(notes)) : ""}
    </table>`;

  const teamSubject = isUpdate
    ? `Shipment Updated: ${shipmentId}${customerName ? ` — ${customerName}` : ""}`
    : `Shipment Created: ${shipmentId}${customerName ? ` — ${customerName}` : ""}`;

  const teamTitle = isUpdate ? "Shipment Updated" : "New Shipment Created";

  // ── Team notification ──────────────────────────────────────────────────────
  sends.push(
    resend.emails.send({
      from: FROM,
      to: TEAM,
      subject: teamSubject,
      html: wrapper(`
        ${header(teamTitle, `ID: ${esc(shipmentId)}`)}
        ${body(`
          ${customerName ? `<p style="margin:0 0 16px;font-size:13px;color:#5a7599;">Customer: <strong style="color:#0d1b2e;">${esc(customerName)}</strong>${customerEmail ? ` &lt;<a href="mailto:${esc(customerEmail)}" style="color:#1565c0;">${esc(customerEmail)}</a>&gt;` : ""}</p>` : ""}
          ${shipmentTable}
          ${recipientEmail ? `<p style="margin:16px 0 0;font-size:12px;color:#5a7599;">Recipient email: <a href="mailto:${esc(recipientEmail)}" style="color:#1565c0;">${esc(recipientEmail)}</a></p>` : ""}
        `)}
      `),
    }),
  );

  // ── Customer / shipment person ─────────────────────────────────────────────
  if (customerEmail) {
    const custSubject = isUpdate
      ? `Shipment update — ${shipmentId}`
      : `Your shipment has been created — ${shipmentId}`;
    const custHeading = isUpdate ? "Shipment Update" : "Shipment Confirmed";
    const custIntro = isUpdate
      ? "Your shipment details have been updated. Here is the latest information."
      : "Your shipment has been registered in our system. Below are the details.";

    sends.push(
      resend.emails.send({
        from: FROM,
        to: customerEmail,
        replyTo: TEAM,
        subject: custSubject,
        html: wrapper(`
          ${header(custHeading, `Shipment ID: ${esc(shipmentId)}`)}
          ${body(`
            ${customerName ? `<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0d1b2e;">Hi ${esc(customerName)},</p>` : ""}
            <p style="margin:0 0 20px;font-size:13px;color:#5a7599;line-height:1.7;">${custIntro}</p>
            ${shipmentTable}
            ${trackingBox}
            ${contactBox}
            <p style="margin:20px 0 0;font-size:12px;color:#5a7599;line-height:1.7;">
              Best regards,<br>
              <strong style="color:#0d1b2e;">Afolaray Nigeria Limited</strong>
            </p>
          `)}
        `),
      }),
    );
  }

  // ── Recipient (person at destination) ─────────────────────────────────────
  if (recipientEmail && recipientEmail !== customerEmail) {
    const recpSubject = isUpdate
      ? `Shipment update — ${shipmentId}`
      : `A shipment is on its way to you — ${shipmentId}`;
    const recpHeading = isUpdate ? "Shipment Update" : "Shipment On Its Way";
    const recpIntro = isUpdate
      ? `The shipment destined for <strong style="color:#0d1b2e;">${esc(destination || "you")}</strong> has been updated. Here is the latest information.`
      : `A shipment destined for <strong style="color:#0d1b2e;">${esc(destination || "you")}</strong> has been registered. Here are the shipment details.`;

    sends.push(
      resend.emails.send({
        from: FROM,
        to: recipientEmail,
        replyTo: TEAM,
        subject: recpSubject,
        html: wrapper(`
          ${header(recpHeading, `Shipment ID: ${esc(shipmentId)}`)}
          ${body(`
            <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0d1b2e;">Hello,</p>
            <p style="margin:0 0 20px;font-size:13px;color:#5a7599;line-height:1.7;">${recpIntro}</p>
            ${shipmentTable}
            ${trackingBox}
            ${contactBox}
            <p style="margin:20px 0 0;font-size:12px;color:#5a7599;line-height:1.7;">
              Best regards,<br>
              <strong style="color:#0d1b2e;">Afolaray Nigeria Limited</strong>
            </p>
          `)}
        `),
      }),
    );
  }

  try {
    await Promise.all(sends);
    res.json({ ok: true });
  } catch (err) {
    console.error("shipment-notify error:", err);
    res.status(500).json({ error: err.message || "Failed to send" });
  }
}
