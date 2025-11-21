'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Menu, X, ExternalLink, Sparkles, TrendingUp, Zap, Globe, Rocket, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import WalletConnect from './WalletConnect'
import { getThemeClasses } from '@/contexts/theme-context'

export default function Header() {
  const themeClasses = getThemeClasses()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '/', icon: <Globe className="w-4 h-4" /> },
    { label: 'Buy $FLOW', href: 'https://pump.fun/coin/Bc99ss8kpWe4yckpRiftuN29QQKf8X9vsR4N2KBnpump', external: true, icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Features', href: '/beta-features', icon: <Zap className="w-4 h-4" /> },
    { label: 'Tokenomics', href: '/tokenomics', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Docs', href: '/docs', icon: <Rocket className="w-4 h-4" /> },
    { label: 'Contact Us', href: '/support', icon: <Star className="w-4 h-4" /> },
  ]

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b',
          isScrolled ? 'bg-gray-900/90 shadow-lg shadow-black/20' : themeClasses.bg,
          themeClasses.border
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative h-12 sm:h-10 md:h-10 lg:h-14 w-auto transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/flow.png"
                  alt=""
                  width={926}
                  height={287}
                  className="object-contain h-full w-auto"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map(item =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-1 relative group',
                      themeClasses.textSecondary,
                      'hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600'
                    )}
                  >
                    {item.label}
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-1 relative',
                      themeClasses.textSecondary,
                      'hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600'
                    )}
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              {/* Wallet */}
              <div className="hidden lg:block">
                <WalletConnect />
              </div>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'lg:hidden w-10 h-10 p-0 transition-all duration-300 relative overflow-hidden',
                  themeClasses.textSecondary,
                  'hover:scale-110 active:scale-95'
                )}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative">
                  <Menu
                    className={cn(
                      'w-5 h-5 transition-all duration-300',
                      isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                    )}
                  />
                  <X
                    className={cn(
                      'absolute top-0 left-0 w-5 h-5 transition-all duration-300',
                      isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-out',
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <div
          className={cn('absolute inset-0 transition-opacity duration-300', isMenuOpen ? 'opacity-100' : 'opacity-0')}
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={cn(
            'absolute top-16 right-0 h-[calc(100vh-4rem)] w-80 max-w-[85vw] transition-transform duration-300 ease-out transform',
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <Card
            className={cn(
              'h-full rounded-none shadow-2xl border-l overflow-hidden flex flex-col',
              'bg-gray-900/95'
            )}
          >
            <div className="p-4 border-b border-gray-800">
              <WalletConnect isMobileMenu />
            </div>

            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item, index) => (
                <div
                  key={item.label}
                  className={cn(
                    'group rounded-xl p-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
                    'hover:bg-gray-800/80'
                  )}
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                    transition: `all 0.3s ease-out ${isMenuOpen ? `${(index + 1) * 60}ms` : '0ms'}`,
                  }}
                >
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : '_self'}
                    rel={item.external ? 'noopener noreferrer' : ''}
                    className={cn('block w-full', themeClasses.textSecondary)}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMenuOpen(false)
                      setTimeout(() => {
                        if (item.external) window.open(item.href, '_blank')
                        else window.location.href = item.href
                      }, 300)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 text-gray-300'
                          )}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-medium text-sm flex items-center gap-2">
                            {item.label}
                            {item.external && <ExternalLink className="w-3 h-3 opacity-60" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
