'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/header'
import TokenCountdown from '@/components/token-countdown'
import AITerminal from '@/components/ai-terminal'
import { 
  ArrowRight, 
  Eye, 
  Sparkles, 
  Zap, 
  Shield, 
  Award, 
  Globe
} from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Home() {
  const { theme, getThemeClasses } = useTheme()
  const themeClasses = getThemeClasses(theme)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const heroRef = useRef<HTMLDivElement>(null)
  const [stars, setStars] = useState<{left:number,top:number,delay:number,duration:number}[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)

    const arr = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }))
    setStars(arr)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )
    
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll')
      elements.forEach(el => observer.observe(el))
    }, 100)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div className={cn("min-h-screen transition-all duration-300 relative overflow-x-hidden", themeClasses.bg)}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.3) 0%, transparent 50%)` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-green-500/5 animate-pulse" />
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-24 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <div className="mb-8 flex flex-col items-center">
            <h1 className={cn("text-6xl md:text-8xl font-bold bg-gradient-to-r bg-clip-text text-transparent animate-gradient", themeClasses.gradient)}>
              FLOW AI
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <span className={cn("text-xl md:text-2xl font-light", themeClasses.textSecondary)}>Flow with Intelligence</span>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-none animate-pulse">
                <Sparkles className="w-3 h-3 mr-1" /> BETA
              </Badge>
            </div>
          </div>

          <p className={cn("text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed", themeClasses.textSecondary)}>
            Next-generation utility crypto ecosystem that merges AI, DeFi, Privacy, and interactive trading simulations inside a lightning-fast Web3 interface — empowering users with intelligent automation and secure, privacy-focused AI interactions.
          </p>

          <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-16">
            <Link href="/beta-features">
              <Button 
                size="lg" 
                className={cn("font-bold text-lg px-8 py-6 transition-all transform hover:scale-105 group",
                  theme === 'light' ? "bg-blue-600 hover:bg-blue-700 text-white" : 
                  theme === 'dark' ? "bg-green-600 hover:bg-green-700 text-white" :
                  "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                )}
              >
                Explore <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/tokenomics">
              <Button 
                size="lg" 
                variant="outline" 
                className="font-bold text-lg px-8 py-6 hover:scale-105 transition-all duration-300"
              >
                <Eye className="mr-2 w-5 h-5" /> View Tokenomics
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-full",
              theme === 'dark' ? "bg-purple-600/10 border border-purple-500/20" : "bg-purple-100 border border-purple-300"
            )}>
              <Zap className="w-5 h-5 text-purple-300" />
              <span className="text-sm">AI-Powered DeFi Ecosystem</span>
            </div>
            <div className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-full",
              theme === 'dark' ? "bg-blue-600/10 border border-blue-500/20" : "bg-blue-100 border border-blue-300"
            )}>
              <Shield className="w-5 h-5 text-blue-300" />
              <span className="text-sm">Secure & Privacy</span>
            </div>
            <div className={cn(
              "inline-flex items-center gap-2 px-6 py-3 rounded-full",
              theme === 'dark' ? "bg-green-600/10 border border-green-500/20" : "bg-green-100 border border-green-300"
            )}>
              <Award className="w-5 h-5 text-green-300" />
              <span className="text-sm">Community Focused</span>
            </div>
          </div>
        </div>
      </section>

      <TokenCountdown />

      {/* Terminal */}
      <section id="terminal" className={cn("py-20", themeClasses.bg)}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={cn("text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent", themeClasses.gradient)}>AI Terminal</h2>
            <p className={cn("text-lg max-w-2xl mx-auto", themeClasses.textSecondary)}>Experience the power of AI-driven DeFi interactions through our intelligent terminal interface</p>
          </div>
          <AITerminal />
        </div>
      </section>

      {/* Join Community Button */}
      <section className={cn("py-20", themeClasses.bg)}>
        <div className="container mx-auto px-4 text-center">
          <div className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-full",
            theme === 'dark' ? "bg-purple-600/10 border border-purple-500/20" : "bg-purple-100 border border-purple-300"
          )}>
            <Globe className="w-5 h-5 text-purple-300" />
            <span className="text-sm">
              Join our community and be part of $FLOW journey
            </span>
          </div>
          <div className="mt-6">
            <Link href="/support">
              <Button
                className={cn(
                  "px-8 py-4 rounded-lg font-medium transition-all text-lg",
                  theme === 'light' ? "bg-blue-600 hover:bg-blue-700 text-white" : 
                  theme === 'dark' ? "bg-green-600 hover:bg-green-700 text-white" :
                  "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                )}
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
