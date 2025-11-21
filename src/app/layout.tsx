import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/contexts/theme-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FLOW AI - AI-Powered DeFi Ecosystem",
  description:
    "Next-generation utility crypto ecosystem merging AI, DeFi, and trading intelligence inside a lightning-fast Web3 interface.",
  icons: {
    icon: "/images/logo.svg",
  },
  openGraph: {
    title: "FLOW AI - Flow with Intelligence",
    description: "AI-powered DeFi ecosystem with next-gen trading and analytics",
    url: "https://flowai.ai",
    siteName: "FLOW AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLOW AI - Flow with Intelligence",
    description: "AI-powered DeFi ecosystem with next-gen trading and analytics",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Seluruh App dibungkus ThemeProvider */}
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}