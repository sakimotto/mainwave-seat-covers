/**
 * Mailer with pluggable provider.
 *
 * - EMAIL_PROVIDER=log (default): prints emails to the server console (dev)
 * - EMAIL_PROVIDER=resend: sends via Resend's HTTP API (RESEND_API_KEY in Infisical)
 *
 * No dependencies — Resend is called with plain fetch.
 */
import { brand } from "@/brands"

type EmailPayload = { to: string; subject: string; html: string }

function fromAddress(): string {
  return process.env.EMAIL_FROM ?? `${brand.name} <noreply@mainwaveseatcovers.com.au>`
}

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
  const provider = process.env.EMAIL_PROVIDER ?? "log"

  if (provider === "log") {
    console.log(`\n📧 [email/log] To: ${payload.to}\n   Subject: ${payload.subject}\n   ${payload.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 200)}\n`)
    return { success: true }
  }

  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("[email] RESEND_API_KEY missing")
      return { success: false, error: "Email not configured" }
    }
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromAddress(),
          to: payload.to,
          subject: payload.subject,
          html: payload.html,
        }),
      })
      if (!res.ok) {
        const body = await res.text()
        console.error(`[email] Resend ${res.status}: ${body.slice(0, 300)}`)
        return { success: false, error: "Email send failed" }
      }
      return { success: true }
    } catch (err) {
      console.error("[email] Resend error:", err)
      return { success: false, error: "Email send failed" }
    }
  }

  console.error(`[email] Unknown EMAIL_PROVIDER "${provider}"`)
  return { success: false, error: "Email not configured" }
}

const brandButton = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#cc0000;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 28px;text-transform:uppercase;letter-spacing:2px;font-size:13px">${label}</a>`

const shell = (content: string) =>
  `<div style="font-family:Arial,sans-serif;background:#0a0a0a;color:#f5f2ee;padding:40px 24px;max-width:560px;margin:0 auto">
    <p style="font-size:24px;font-weight:900;margin:0 0 24px">${brand.name}<span style="color:#cc0000">.</span></p>
    ${content}
    <p style="color:#666;font-size:11px;margin-top:32px">${brand.legalName} · ${brand.address}</p>
  </div>`

export function verifyEmailTemplate(verifyUrl: string): string {
  return shell(`
    <h1 style="font-size:20px;margin:0 0 12px">Confirm your email</h1>
    <p style="color:#bbb;line-height:1.6">One click and your account is fully active — order tracking, your garage, and exclusive offers.</p>
    <p style="margin:24px 0">${brandButton(verifyUrl, "Verify Email")}</p>
    <p style="color:#888;font-size:12px">If you didn't create this account, ignore this email.</p>
  `)
}

export function welcomeEmailTemplate(name: string): string {
  return shell(`
    <h1 style="font-size:20px;margin:0 0 12px">Welcome to ${brand.name}, ${name}</h1>
    <p style="color:#bbb;line-height:1.6">Factory-direct gear, made in our own Thailand factory. Add your vehicle to your garage and we'll match products that fit it exactly.</p>
  `)
}

export function orderConfirmTemplate(reference: string, total: string): string {
  return shell(`
    <h1 style="font-size:20px;margin:0 0 12px">Order received — #${reference}</h1>
    <p style="color:#bbb;line-height:1.6">Total: <strong style="color:#fff">${total}</strong></p>
    <p style="color:#bbb;line-height:1.6">Our team is reviewing your order and will contact you shortly to confirm payment and delivery details.</p>
  `)
}

export function newsletterWelcomeTemplate(): string {
  return shell(`
    <h1 style="font-size:20px;margin:0 0 12px">You're on the list</h1>
    <p style="color:#bbb;line-height:1.6">New products, limited-time offers, and community events — straight to your inbox. No spam, unsubscribe anytime.</p>
  `)
}
