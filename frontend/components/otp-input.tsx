"use client"

import type React from "react"

import { useRef } from "react"
import { Input } from "@/components/ui/input"

interface OTPInputProps {
  length?: number
  value: string[]
  onChange: (otp: string[]) => void
  disabled?: boolean
  error?: boolean
}

export function OTPInput({ length = 6, value, onChange, disabled = false, error = false }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, inputValue: string) => {
    if (inputValue.length > 1) return

    const newOtp = [...value]
    newOtp[index] = inputValue
    onChange(newOtp)

    // Auto-focus next input
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, length)
    const newOtp = pastedData.split("").concat(Array(length).fill("")).slice(0, length)
    onChange(newOtp)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((digit) => !digit)
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()
  }

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`w-12 h-12 text-center text-lg font-bold bg-slate-700/50 border-slate-600 text-white focus:border-emerald-500 focus:ring-emerald-500/20 ${
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
          }`}
        />
      ))}
    </div>
  )
}
