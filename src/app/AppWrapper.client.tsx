'use client'

import React, { ReactNode } from 'react'
import { ThemeProvider } from '@/contexts/theme-context'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { usePathname } from 'next/navigation'
import { Toaster } from './ui/toaster'

interface AppWrapperProps {
  children: ReactNode
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <ThemeProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      {/* Footer tidak tampil di Home */}
      {!isHome && <Footer />}
      <Toaster />
    </ThemeProvider>
  )
}
