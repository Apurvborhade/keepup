import { type NextRequest, NextResponse } from "next/server"

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters with uppercase, lowercase, and number" },
        { status: 400 },
      )
    }

    // Simulate user creation delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, save user to database here
    console.log(`Creating user: ${name} (${email})`)

    // Send OTP for email verification
    const otpResponse = await fetch(`${request.nextUrl.origin}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    if (!otpResponse.ok) {
      return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 })
    }

    const otpData = await otpResponse.json()

    return NextResponse.json(
      {
        message: "Account created successfully. Please verify your email.",
        requiresVerification: true,
        // In development, return OTP for testing
        ...(process.env.NODE_ENV === "development" && { otp: otpData.otp }),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}
