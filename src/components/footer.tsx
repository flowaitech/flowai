'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  Github, 
  Twitter,
  MessageSquare, 
  Mail, 
  Send,
  Heart,
  Sparkles, 
  Rocket,
  Shield,
  ArrowUp,
  ExternalLink,
  FileText,
  Users,
  Zap
} from 'lucide-react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Footer() {
  const { theme, getThemeClasses } = useTheme()
  const themeClasses = getThemeClasses(theme)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    product: [
      { label: 'AI Terminal', href: '/beta-features/ai-terminal' },
      { label: 'AI Trading', href: '/beta-features/ai-trading' },
      { label: 'Features', href: '/beta-features' },
      { label: 'Tokenomics', href: '/tokenomics' }
    ],
    resources: [
      { label: 'Documentation', href: '/docs', external: false },
      { label: 'Contact Us', href: '/support', external: false },
      { label: 'Terms and Conditions', href: '/terms-and-conditions', external: false },
      { label: 'Privacy Policy', href: '/privacy-policy', external: false }
    ],
    community: [
      { label: 'GitHub', href: 'https://github.com/flow-ai', external: true },
      { label: 'Twitter', href: 'https://x.com/flowaifun', external: true },
      { label: 'Telegram', href: 'https://t.me/flowaiportal', external: true }
    ],
    legal: [
      { label: 'Terms and Conditions', href: '/terms-and-conditions' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Cookie Policy', href: '#', external: true },
      { label: 'Disclaimer', href: '#', external: true }
    ]
  }

  return (
    <footer className={cn(
      "relative overflow-hidden",
      themeClasses.bgSecondary
    )}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                {/* Logo Image */}
                <div className="relative h-12 w-auto sm:h-12 md:h-14 lg:h-16">
                  <Image
                    src="/images/flow.png"
                    alt="FLOW AI Logo"
                    width={926}
                    height={287}
                    className="object-contain h-full w-auto"
                    priority
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-xl">FLOW AI</h3>
                <p className="text-sm opacity-60">Flow with Intelligence</p>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-6">
              <h4 className="font-semibold text-sm uppercase tracking-wider opacity-70">Product</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        "text-sm transition-colors hover:scale-105 inline-block",
                        themeClasses.textSecondary,
                        "hover:text-purple-600"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="space-y-6">
              <h4 className="font-semibold text-sm uppercase tracking-wider opacity-70">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : "_self"}
                      rel={link.external ? "noopener noreferrer" : ""}
                      className={cn(
                        "text-sm transition-colors hover:scale-105 inline-block",
                        themeClasses.textSecondary,
                        "hover:text-purple-600"
                      )}
                    >
                      {link.label}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 inline ml-1 opacity-60" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Links */}
            <div className="space-y-6">
              <h4 className="font-semibold text-sm uppercase tracking-wider opacity-70">Community</h4>
              <ul className="space-y-2">
                {footerLinks.community.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-sm transition-colors hover:scale-105 inline-flex items-center gap-2",
                        themeClasses.textSecondary,
                        "hover:text-purple-600"
                      )}
                    >
                      {link.label === 'GitHub' && <Github className="w-4 h-4" />}
                      {link.label === 'Twitter' && <Twitter className="w-4 h-4" />}
                      {link.label === 'Telegram' && <MessageCircle className="w-4 h-4" />}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={cn(
          "border-t",
          themeClasses.border
        )}>
          <div className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm opacity-60">
                <span>© 2025 FLOW AI. All rights reserved.</span>
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-4 text-sm">
                {footerLinks.legal.slice(0, 2).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap",
                      themeClasses.textSecondary
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Back to Top Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className={cn(
                  "hover:scale-110 transition-transform",
                  themeClasses.textSecondary
                )}
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}