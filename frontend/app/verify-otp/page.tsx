"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, RefreshCw, AlertCircle } from "lucide-react"
import { OTPInput } from "@/components/otp-input"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function VerifyOTPPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [error, setError] = useState("")
  const [attemptsLeft, setAttemptsLeft] = useState(3)

  const { updateUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")

    if (otpCode.length !== 6) {
      setError("Please enter the complete OTP")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      })

      const data = await response.json()

      if (response.ok) {
        const userData = {
          id: "temp-id",
          name: "New User",
          email: email,
        }
        updateUser(userData)
        localStorage.setItem("pinger_user", JSON.stringify(userData))
        document.cookie = "pinger_auth=true; path=/; max-age=86400"

        router.push("/dashboard")
      } else {
        setError(data.error)
        if (data.attemptsLeft !== undefined) {
          setAttemptsLeft(data.attemptsLeft)
        }
        setOtp(["", "", "", "", "", ""])
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    setError("")

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setCanResend(false)
        setCountdown(60)
        setOtp(["", "", "", "", "", ""])
        setAttemptsLeft(3)

        if (data.otp) {
          console.log("New OTP:", data.otp)
        }
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError("Failed to resend OTP. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,0.02)_50%,transparent_65%)]" />

      <div className="w-full max-w-md relative">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Registration
        </Link>

        <Card className="backdrop-blur-xl bg-slate-800/50 border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/20">
                <Mail className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">Verify your email</CardTitle>
              <CardDescription className="text-slate-400 mt-2">
                We've sent a 6-digit code to
                <br />
                <span className="text-emerald-400 font-medium">{email}</span>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <OTPInput value={otp} onChange={setOtp} disabled={isLoading} error={!!error} />

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm justify-center">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                {attemptsLeft < 3 && attemptsLeft > 0 && (
                  <p className="text-yellow-400 text-sm text-center">
                    {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} remaining
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || otp.join("").length !== 6}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium py-2.5 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>

            <div className="text-center space-y-3">
              <p className="text-slate-400 text-sm">Didn't receive the code?</p>

              {canResend ? (
                <Button
                  variant="outline"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors bg-transparent"
                >
                  {isResending ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Resend Code"
                  )}
                </Button>
              ) : (
                <p className="text-slate-500 text-sm">Resend code in {countdown}s</p>
              )}
            </div>

            <div className="text-center">
              <p className="text-slate-500 text-sm">
                Wrong email?{" "}
                <Link href="/register" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  Change email address
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-slate-500 text-sm mt-6">
          Check your spam folder if you don't see the email
          {process.env.NODE_ENV === "development" && (
            <span className="block mt-1 text-emerald-400">Development: Check console for OTP</span>
          )}
        </p>
      </div>
    </div>
  )
}
