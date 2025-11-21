'use client'

import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  PieChart, 
  Target, 
  Calendar,
  Check,
  Loader2,
  ArrowRight,
  Zap,
  Shield,
  Rocket,
  Activity,
  Coins,
  Users,
  BarChart3,
  Star,
  Award,
  Globe,
  Clock,
  AlertCircle
} from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

// Simple Card Components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
    {children}
  </div>
)

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
)

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    {children}
  </h3>
)

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
)

// Simple Badge Component with color variants
const Badge = ({ children, className = '', variant = 'default', color = 'default' }: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'; 
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'yellow' | 'gray';
}) => {
  const colorClasses = {
    blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    green: "bg-green-500/20 text-green-300 border-green-500/30",
    orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    red: "bg-red-500/20 text-red-300 border-red-500/30",
    yellow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    gray: "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }

  return (
    <div className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      variant === 'default' && "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      variant === 'secondary' && (color !== 'default' ? colorClasses[color] : "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"),
      className
    )}>
      {children}
    </div>
  )
}

// Simple Button Component
const Button = ({ 
  children, 
  className = '', 
  disabled = false, 
  type = 'button', 
  onClick,
  href
}: { 
  children: React.ReactNode; 
  className?: string; 
  disabled?: boolean; 
  type?: 'button' | 'submit'; 
  onClick?: () => void; 
  href?: string;
}) => {
  const buttonContent = (
    <>
      {children}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          "h-10 py-2 px-4",
          className
        )}
      >
        {buttonContent}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        "h-10 py-2 px-4",
        className
      )}
    >
      {buttonContent}
    </button>
  )
}

export default function TokenomicsPage() {
  const { theme, getThemeClasses } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  
  const tokenomics = [
    { name: "Circulating Supply", percentage: 94, description: "Tokens currently available and traded on the market.", color: "bg-blue-600" },
    { name: "CEX Listing", percentage: 3, description: "Reserved for exchange listings & fees", color: "bg-purple-600" },
    { name: "Marketing", percentage: 2, description: "Driving community growth, brand visibility, and strategic partnerships.", color: "bg-green-600" },
    { name: "Airdrop", percentage: 1, description: "Rewarding early supporters and expanding Flow AI’s global reach.", color: "bg-orange-600" }
  ]

  const [animatedPercentages, setAnimatedPercentages] = useState<{ [key: string]: number }>({})
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []
    tokenomics.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setAnimatedPercentages(prev => ({ ...prev, [item.name]: item.percentage }))
      }, index * 200)
      timeouts.push(timeout)
    })
    return () => timeouts.forEach(clearTimeout)
  }, [])

  const roadmap = [
    {
      quarter: "PHASE 1",
      milestones: [
        { text: "Launch of official website and Flow AI Terminal (Beta)", done: true },
        { text: "$FLOW Token Launch + initial liquidity pool deployment", done: true },
        { text: "Twitter/X Golden Badge verification", done: false },
        { text: "Begin AI Insight Engine early access for beta users", done: false },
        { text: "Strategic partnerships with early DeFi and AI collaborators", done: false }
      ]
    },
    {
      quarter: "PHASE 2",
      milestones: [
        { text: "Launch of DeFi Dashboard & AI Trading Simulator (Full Version)", done: false },
        { text: "Introduce social trading leaderboard powered by Flow AI analytics", done: false },
        { text: "Rollout of mobile web app (PWA) for cross-device accessibility", done: false },
        { text: "Onboard first institutional AI-trading partners", done: false },
        { text: "Expand multi-network compatibility (Ethereum, BSC, Solana)", done: false },
        { text: "Start Flow AI Ambassador Program for community-led growth", done: false }
      ]
    },
    {
      quarter: "PHASE 3",
      milestones: [
        { text: "Launch $FLOW Staking & Reward Distribution System", done: false },
        { text: "Introduce Governance Beta — community voting on platform updates", done: false },
        { text: "Deploy AI Agent Marketplace (custom trading & analysis agents)", done: false },
        { text: "Start AI x DeFi Hackathon to foster developer engagement", done: false },
        { text: "Integrate on-chain analytics dashboard with live market data", done: false },
        { text: "Initiate Flow Labs, a grant program for ecosystem innovation", done: false }
      ]
    },
    {
      quarter: "PHASE 4",
      milestones: [
        { text: "Launch AI Multi-Agent Collaboration Layer for complex strategy orchestration", done: false },
        { text: "Formation of the Flow DAO — community-driven ecosystem governance", done: false },
        { text: "Deploy Cross-chain Token Bridge for seamless asset flow", done: false },
        { text: "Introduce AI Portfolio Manager, personalized by user trading patterns", done: false },
        { text: "Expand Flow Network API for developers and AI model integration", done: false }
      ]
    }
  ]

  const stats = [
    { label: "Total Supply", value: "1,000,000,000", icon: Coins, color: "blue" },
    { label: "Token Symbol", value: "$FLOW", icon: Activity, color: "purple" },
    { label: "Holders Target", value: "10,000+", icon: Users, color: "green" },
    { label: "Market Cap Goal", value: "$10M+", icon: BarChart3, color: "orange" }
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)

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
    <div className={cn("relative", themeClasses.bg, "text-gray-200 pb-20 px-6 md:px-12")}>
      {/* Background Effects - dengan z-index rendah agar tidak menutupi header */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.2) 0%, transparent 50%)` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-green-500/5 animate-pulse" />
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10 pt-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={cn("text-5xl md:text-7xl font-bold bg-gradient-to-r", themeClasses.gradient, "text-transparent bg-clip-text")}>
            Flow Overview
          </h1>
          <p className={cn(themeClasses.textSecondary, "text-lg md:text-xl max-w-3xl mx-auto")}>
            Understanding $FLOW token distribution and our roadmap for future of AI-powered DeFi.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" color="purple">
              <Coins className="w-3 h-3 mr-1" /> 1B Total Supply
            </Badge>
            <Badge variant="secondary" color="blue">
              <Shield className="w-3 h-3 mr-1" /> Secure & Transparent
            </Badge>
            <Badge variant="secondary" color="green">
              <Award className="w-3 h-3 mr-1" /> Community Focused
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-xl border transition-all duration-300 hover:scale-105 animate-on-scroll",
                  themeClasses.cardBg,
                  themeClasses.shadow,
                  themeClasses.shadowHover
                )}
                id={`stat-${index}`}
                style={{
                  opacity: isVisible[`stat-${index}`] ? 1 : 0,
                  transform: isVisible[`stat-${index}`] ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${index * 100}ms`
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={cn("w-8 h-8", 
                    stat.color === 'blue' ? "text-blue-500" :
                    stat.color === 'purple' ? "text-purple-500" :
                    stat.color === 'green' ? "text-green-500" :
                    stat.color === 'orange' ? "text-orange-500" : "text-gray-500"
                  )} />
                  <Badge variant="secondary" color={stat.color}>
                    {stat.label}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className={cn("text-sm", themeClasses.textSecondary)}>{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Tokenomics Section */}
        <div className="space-y-10">
          <div className="text-center mb-10">
            <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", themeClasses.accent)}>
              Token Distribution
            </h2>
            <p className={cn(themeClasses.textSecondary, "text-lg max-w-2xl mx-auto")}>
              Total Supply: 1,000,000,000 $FLOW
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tokenomics.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-xl border transition-all duration-300 hover:scale-105 animate-on-scroll",
                  themeClasses.cardBg,
                  themeClasses.shadow,
                  themeClasses.shadowHover
                )}
                id={`tokenomic-${index}`}
                style={{
                  opacity: isVisible[`tokenomic-${index}`] ? 1 : 0,
                  transform: isVisible[`tokenomic-${index}`] ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${index * 100}ms`
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <Badge variant="secondary" color={
                    item.name === "Liquidity Pool" ? "blue" :
                    item.name === "CEX Listing" ? "purple" :
                    item.name === "Marketing" ? "green" : "orange"
                  }>
                    {item.percentage}%
                  </Badge>
                </div>
                <p className={cn("text-sm mb-4", themeClasses.textSecondary)}>
                  {item.description}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-1000 flex items-center justify-center", item.color)}
                    style={{ width: `${animatedPercentages[item.name] || 0}%` }}
                  >
                    {(animatedPercentages[item.name] || 0) > 10 && (
                      <span className="text-xs font-semibold text-white drop-shadow-sm">
                        {animatedPercentages[item.name]}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="space-y-10">
          <div className="text-center mb-10">
            <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", themeClasses.accent)}>
              Development Roadmap
            </h2>
            <p className={cn(themeClasses.textSecondary, "text-lg max-w-2xl mx-auto")}>
              Our journey to revolutionize AI-powered DeFi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmap.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-xl border transition-all duration-300 hover:scale-105 animate-on-scroll",
                  themeClasses.cardBg,
                  themeClasses.shadow,
                  themeClasses.shadowHover
                )}
                id={`roadmap-${index}`}
                style={{
                  opacity: isVisible[`roadmap-${index}`] ? 1 : 0,
                  transform: isVisible[`roadmap-${index}`] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 100}ms`
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{item.quarter}</h3>
                  <Badge variant="secondary" color={
                    index === 0 ? "green" : "yellow"
                  }>
                    {index === 0 ? "Current" : "Upcoming"}
                  </Badge>
                </div>
                <ul className="space-y-3">
                  {item.milestones.map((milestone, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
                        {milestone.done ? (
                          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-500">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="relative">
                            <Loader2 className={cn(
                              "w-4 h-4 animate-spin",
                              themeClasses.accent
                            )} />
                            <div className="absolute inset-0 rounded-full border-2 border-gray-300 opacity-30"></div>
                          </div>
                        )}
                      </div>
                      <span className={cn(
                        "text-xs flex-1", 
                        milestone.done ? "line-through opacity-60" : "", 
                        themeClasses.textSecondary
                      )}>
                        {milestone.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-full",
            theme === 'dark' ? "bg-purple-600/10 border border-purple-500/20" : "bg-purple-100 border border-purple-300"
          )}>
            <Zap className="w-5 h-5 text-purple-300" />
            <span className="text-sm">
              Join our community and be part of $FLOW journey
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              href="/support"
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                theme === 'light' ? "bg-blue-600 hover:bg-blue-700 text-white" : 
                theme === 'dark' ? "bg-green-600 hover:bg-green-700 text-white" :
                "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              )}
            >
              <Globe className="w-4 h-4 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}