import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ReactQueryProvider from "@/providers/QueryClientProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Pinger - Professional Website & API Monitoring",
  description:
    "Enterprise-grade monitoring for websites and APIs. Get instant alerts, detailed analytics, and 99.9% uptime SLA. Trusted by 10,000+ teams worldwide.",
  generator: 'v0.app'
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geist.variable}`}>
      <body className="font-sans antialiased">

        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
