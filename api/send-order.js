// /api/send-order.js  (or pages/api/send-order.js for Next.js)
// Uses Resend to dispatch two emails:
//   1. Order notification  → your business inbox
//   2. Confirmation copy   → the customer

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL; // e.g. orders@afolaray.com
const FROM_ADDRESS = process.env.FROM_ADDRESS; // e.g. "Afolaray Orders <no-reply@afolaray.com>"

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { from_name, from_email, phone, city, car_name, car_price, car_type } =
    req.body;

  if (!from_name || !from_email || !car_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // ── 1. Notify the business ────────────────────────────────────────────
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: BUSINESS_EMAIL,
      replyTo: from_email,
      subject: `New Car Order: ${car_name}`,
      html: `
        <div style="font-family:'Sora',sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f7faff;border-radius:16px;">
          <div style="background:#0d1b2e;border-radius:12px;padding:24px;margin-bottom:24px;">
            <h2 style="color:#fff;margin:0 0 4px;font-size:20px;">New Order Received 🚗</h2>
            <p style="color:rgba(255,255,255,0.55);margin:0;font-size:13px;">Afolaray Nigeria Limited</p>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0d1b2e;">
            ${row("Car", car_name)}
            ${row("Price", car_price)}
            ${row("Type", car_type)}
            ${row("Customer", from_name)}
            ${row("Email", from_email)}
            ${row("Phone", phone || "—")}
            ${row("City", city || "—")}
          </table>
          <p style="font-size:12px;color:#5a7599;margin-top:24px;">
            Reply directly to this email to respond to the customer.
          </p>
        </div>
      `,
    });

    // ── 2. Confirmation to customer ───────────────────────────────────────
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: from_email,
      subject: `Your Order for ${car_name} – Afolaray Nigeria`,
      html: `
        <div style="font-family:'Sora',sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f7faff;border-radius:16px;">
          <div style="background:#0d1b2e;border-radius:12px;padding:24px;margin-bottom:24px;">
            <h2 style="color:#fff;margin:0 0 4px;font-size:20px;">Order Confirmed ✅</h2>
            <p style="color:rgba(255,255,255,0.55);margin:0;font-size:13px;">Afolaray Nigeria Limited</p>
          </div>
          <p style="font-size:15px;color:#0d1b2e;font-weight:600;margin:0 0 16px;">Hi ${from_name},</p>
          <p style="font-size:14px;color:#5a7599;line-height:1.7;margin:0 0 24px;">
            Thank you for your order! We have received your request and our team will contact you shortly to confirm availability and next steps.
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0d1b2e;">
            ${row("Car", car_name)}
            ${row("Price", car_price)}
            ${row("Type", car_type)}
            ${row("Delivery City", city || "—")}
          </table>
          <div style="margin-top:28px;padding:16px;background:#e3f2fd;border-radius:10px;font-size:13px;color:#0d1b2e;">
            📞 Questions? Call or WhatsApp: <strong>+234 703 357 6017</strong>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Failed to send email" });
  }
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #dce8f7;color:#5a7599;font-size:12px;width:120px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #dce8f7;font-weight:600;">${value}</td>
    </tr>
  `;
}
