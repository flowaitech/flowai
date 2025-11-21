'use client'

import React from "react"
import { ThemeProvider } from "@/contexts/theme-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

interface AppWrapperProps {
  children: React.ReactNode
  hideFooter?: boolean
}

export default function AppWrapper({ children, hideFooter = false }: AppWrapperProps) {
  return (
    <ThemeProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      {!hideFooter && <Footer />}
      <Toaster />
    </ThemeProvider>
  )
}
