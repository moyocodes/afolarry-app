import { Resend } from 'resend'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { from_name, from_email, message } = req.body ?? {}
  if (!from_name || !from_email || !message)
    return res.status(400).json({ error: 'Missing required fields' })

  const resend = new Resend(process.env.RESEND_API_KEY)
  const safeMsg = message.replace(/\n/g, '<br>').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&lt;br&gt;/g, '<br>')

  try {
    await Promise.all([
      // Notify the Afolaray team
      resend.emails.send({
        from: 'Afolaray Website <noreply@afolaray.com>',
        to: 'contact@afolaray.com',
        replyTo: from_email,
        subject: `New enquiry from ${from_name}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px">
            <h2 style="color:#0d1b2e">New contact form submission</h2>
            <p><strong>Name:</strong> ${from_name}</p>
            <p><strong>Email:</strong> <a href="mailto:${from_email}">${from_email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="border-left:3px solid #1565c0;padding:0.75rem 1rem;background:#f7faff;color:#334155">${safeMsg}</div>
          </div>`,
      }),

      // Confirmation to the customer
      resend.emails.send({
        from: 'Afolaray Nigeria Limited <noreply@afolaray.com>',
        to: from_email,
        subject: 'We received your message — Afolaray Nigeria Limited',
        html: `
          <div style="font-family:sans-serif;max-width:560px">
            <h2 style="color:#0d1b2e">Thank you, ${from_name}!</h2>
            <p style="color:#5a7599">We've received your message and will get back to you shortly.</p>
            <p><strong>Your message:</strong></p>
            <blockquote style="border-left:3px solid #1565c0;padding:0.75rem 1rem;background:#f7faff;color:#334155;margin:0">${safeMsg}</blockquote>
            <br>
            <p style="color:#5a7599">Best regards,<br><strong style="color:#0d1b2e">Afolaray Nigeria Limited</strong><br>11A Apapa-Oshodi Express Way, Amuwo, Lagos</p>
          </div>`,
      }),
    ])

    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to send' })
  }
}
