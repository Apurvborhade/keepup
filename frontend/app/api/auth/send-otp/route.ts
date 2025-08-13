import { type NextRequest, NextResponse } from "next/server"

// In a real app, you'd use a database or Redis to store OTPs
const otpStore = new Map<string, { otp: string; expires: number; attempts: number }>()

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Generate OTP
    const otp = generateOTP()
    const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store OTP (in production, use Redis or database)
    otpStore.set(email, { otp, expires, attempts: 0 })

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, send actual email here
    console.log(`OTP for ${email}: ${otp}`) // For development

    return NextResponse.json(
      {
        message: "OTP sent successfully",
        // In development, return OTP for testing
        ...(process.env.NODE_ENV === "development" && { otp }),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
