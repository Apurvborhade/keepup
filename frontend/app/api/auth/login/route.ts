import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users = new Map([
  [
    "demo@pinger.com",
    {
      id: "1",
      name: "Demo User",
      email: "demo@pinger.com",
      password: "Demo123!", // In production, this would be hashed
      verified: true,
    },
  ],
])

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check user credentials (in production, compare hashed passwords)
    const user = users.get(email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    if (!user.verified) {
      return NextResponse.json({ error: "Please verify your email before logging in" }, { status: 403 })
    }

    // In production, create JWT token here
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
