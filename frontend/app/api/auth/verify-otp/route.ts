import { type NextRequest, NextResponse } from "next/server"

// In a real app, you'd use a database or Redis to store OTPs
const otpStore = new Map<string, { otp: string; expires: number; attempts: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    const storedData = otpStore.get(email)

    if (!storedData) {
      return NextResponse.json({ error: "OTP not found or expired" }, { status: 400 })
    }

    // Check if OTP is expired
    if (Date.now() > storedData.expires) {
      otpStore.delete(email)
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    // Check attempts limit
    if (storedData.attempts >= 3) {
      otpStore.delete(email)
      return NextResponse.json({ error: "Too many failed attempts. Please request a new OTP." }, { status: 429 })
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      storedData.attempts += 1
      return NextResponse.json(
        {
          error: "Invalid OTP",
          attemptsLeft: 3 - storedData.attempts,
        },
        { status: 400 },
      )
    }

    // OTP is valid - remove from store
    otpStore.delete(email)

    // In production, create user session/JWT here
    return NextResponse.json(
      {
        message: "OTP verified successfully",
        verified: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}
