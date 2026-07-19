import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { rateLimit, clientIp, tooManyRequests } from "@/lib/rate-limit"

export async function POST(request: Request) {
  const { ok, retryAfter } = rateLimit({
    key: `contact:${clientIp(request)}`,
    limit: 5,
    windowMs: 60_000,
  })
  if (!ok) return tooManyRequests(retryAfter)

  try {
    const body = await request.json()
    const { name, email, phone, subject, message, _gotcha } = body

    // Honeypot: bots fill the hidden field, humans never see it.
    // Pretend success so bots learn nothing.
    if (_gotcha) {
      return NextResponse.json(
        { success: true, message: "Thank you for your message. We will get back to you shortly." },
        { status: 200 }
      )
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await prisma.inquiry.create({
      data: { name, email, phone: phone || null, subject, message },
    })

    return NextResponse.json(
      { success: true, message: "Thank you for your message. We will get back to you shortly." },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: "Failed to process your message" },
      { status: 500 }
    )
  }
}
