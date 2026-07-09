import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // In production, send email via SendGrid, SES, or similar
    // await sendEmail({ name, email, phone, subject, message })

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
