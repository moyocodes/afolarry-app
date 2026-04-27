import { Resend } from "resend";

const FROM = "Afolaray Enquiries <enquiries@afolaray.com>";
const ORDERS = ["Yusuffafolabi@gmail.com", "contact@afolaray.com"];

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { from_name, from_email, phone, city, car_name, car_price, car_type } =
    req.body ?? {};

  if (!from_name || !from_email || !car_name)
    return res.status(400).json({ error: "Missing required fields" });

  const esc = (v) =>
    String(v || "")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await Promise.all([
      // ── Notify Afolaray team ──────────────────────────────────────────────
      resend.emails.send({
        from: FROM,
        to: ORDERS,
        replyTo: from_email,
        subject: `New Car Order: ${esc(car_name)}`,
        html: `
          <div style="font-family:'Sora',sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f7faff;border-radius:16px;">
            <div style="background:#0d1b2e;border-radius:12px;padding:24px;margin-bottom:24px;">
              <h2 style="color:#fff;margin:0 0 4px;font-size:20px;">New Order Received</h2>
              <p style="color:rgba(255,255,255,0.5);margin:0;font-size:13px;">Afolaray Nigeria Limited — Cars</p>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0d1b2e;">
              ${row("Car", esc(car_name))}
              ${row("Price", esc(car_price))}
              ${row("Type", esc(car_type))}
              ${row("Customer", esc(from_name))}
              ${row("Email", esc(from_email))}
              ${row("Phone", esc(phone) || "—")}
              ${row("City", esc(city) || "—")}
            </table>
            <p style="font-size:12px;color:#5a7599;margin-top:24px;">Reply to this email to contact the customer directly.</p>
          </div>`,
      }),

      // ── Confirmation to customer ──────────────────────────────────────────
      resend.emails.send({
        from: FROM,
        to: from_email,
        replyTo: ["contact@afolaray.com", "Yusuffafolabi@gmail.com"],
        subject: `Order received — ${esc(car_name)}`,
        html: `
          <div style="font-family:'Sora',sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f7faff;border-radius:16px;">
            <div style="background:#0d1b2e;border-radius:12px;padding:24px;margin-bottom:24px;">
              <h2 style="color:#fff;margin:0 0 4px;font-size:20px;">Order Confirmed</h2>
              <p style="color:rgba(255,255,255,0.5);margin:0;font-size:13px;">Afolaray Nigeria Limited</p>
            </div>
            <p style="font-size:15px;color:#0d1b2e;font-weight:600;margin:0 0 12px;">Hi ${esc(from_name)},</p>
            <p style="font-size:14px;color:#5a7599;line-height:1.75;margin:0 0 24px;">
              We have received your order request and our team will contact you shortly to confirm availability and next steps.
            </p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#0d1b2e;">
              ${row("Car", esc(car_name))}
              ${row("Price", esc(car_price))}
              ${row("Type", esc(car_type))}
              ${row("Delivery City", esc(city) || "—")}
            </table>
            <div style="margin-top:28px;padding:16px;background:#e3f2fd;border-radius:10px;font-size:13px;color:#0d1b2e;">
              Questions? Call or WhatsApp: <strong>+234 703 357 6017</strong>
            </div>
          </div>`,
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("send-order error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Failed to send email" });
  }
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #dce8f7;color:#5a7599;font-size:12px;width:130px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #dce8f7;font-weight:600;">${value}</td>
    </tr>`;
}
