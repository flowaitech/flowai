'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Terminal, 
  TrendingUp, 
  PieChart, 
  Brain, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Activity,
  Network
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BetaFeatures() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})

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

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const features = [
    {
      id: 'ai-terminal',
      title: 'AI Terminal',
      description: 'Advanced AI-powered command interface for blockchain interactions',
      icon: Terminal,
      gradient: 'from-purple-600/60 to-cyan-600/60',
      href: '/beta-features/ai-terminal',
      status: 'beta',
      category: 'Core AI'
    },
    {
      id: 'ai-trading',
      title: 'AI Trading',
      description: 'Intelligent trading simulation with FLOW AI market predictions',
      icon: TrendingUp,
      gradient: 'from-cyan-600/60 to-blue-600/60',
      href: '/beta-features/ai-trading',
      status: 'beta',
      category: 'Trading'
    },
    {
      id: 'defi-hub',
      title: 'DeFi Hub',
      description: 'Comprehensive DeFi dashboard with staking and liquidity management',
      icon: PieChart,
      gradient: 'from-blue-600/60 to-purple-600/60',
      href: '/beta-features/defi-hub',
      status: 'beta',
      category: 'DeFi'
    },
    {
      id: 'ai-insight',
      title: 'AI Insight Engine',
      description: 'Deep market analysis and trend prediction powered by AI',
      icon: Brain,
      gradient: 'from-purple-600/60 to-pink-600/60',
      href: '/beta-features/ai-insight-engine',
      status: 'beta',
      category: 'Analytics'
    },
    {
      id: 'onchain-analytics',
      title: 'On-Chain Analytics',
      description: 'Real-time blockchain data visualization and transaction monitoring',
      icon: BarChart3,
      gradient: 'from-pink-600/60 to-orange-600/60',
      href: '/beta-features/onchain-analytics',
      status: 'beta',
      category: 'Analytics'
    },
    {
      id: 'network-support',
      title: 'Network Support',
      description: 'Multi-chain infrastructure supporting major blockchain networks',
      icon: Network,
      gradient: 'from-orange-600/60 to-yellow-600/60',
      href: '/beta-features/network-support',
      status: 'active',
      category: 'Infrastructure'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600/70 hover:bg-green-700/70">Active</Badge>
      case 'beta':
        return <Badge className="bg-yellow-600/70 hover:bg-yellow-700/70">Beta</Badge>
      case 'coming-soon':
        return <Badge className="bg-gray-700/70 hover:bg-gray-800/70">Explore Feature</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* ✨ Soft Neon Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15) 0%, transparent 60%)` 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5" />
        {/* Floating Particles (dimmed) */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* 🌟 Header */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              FLOW AI FEATURES
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              <Badge className="bg-gradient-to-r from-purple-500/60 to-cyan-500/60 text-white border-none">
                BETA PROGRAM
              </Badge>
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Explore the next evolution of AI-powered blockchain innovation.
            </p>
          </div>

          {/* 🧩 Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.id}
                  className={cn(
                    "relative border border-gray-800 bg-gray-900/40 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] group animate-on-scroll",
                    "hover:shadow-lg hover:shadow-purple-500/10 rounded-2xl"
                  )}
                  id={`feature-${index}`}
                  style={{
                    opacity: isVisible[`feature-${index}`] ? 1 : 0,
                    transform: isVisible[`feature-${index}`] ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease-out ${index * 100}ms`
                  }}
                >
                  {/* Glow Effect (soft) */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500",
                    "bg-gradient-to-r " + feature.gradient,
                    "blur-lg"
                  )} />

                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-gradient-to-r " + feature.gradient
                      )}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(feature.status)}
                        <Badge variant="outline" className="text-xs border-gray-700 text-gray-400">
                          {feature.category}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-cyan-300 transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <Link href={feature.href}>
                      <Button 
                        className={cn(
                          "w-full group/btn transition-all duration-300",
                          "bg-gradient-to-r " + feature.gradient,
                          "hover:scale-105 hover:shadow-md hover:shadow-purple-500/10"
                        )}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {feature.status === 'coming-soon' ? 'Coming Soon' : 'Explore Feature'}
                          {feature.status !== 'coming-soon' && (
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          )}
                        </span>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* 📊 Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { value: '6+', label: 'Beta Features', gradient: 'from-purple-400 to-cyan-400' },
              { value: '1000+', label: 'Active Users', gradient: 'from-cyan-400 to-blue-400' },
              { value: '99.9%', label: 'Uptime', gradient: 'from-pink-400 to-orange-400' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-gray-900/40 backdrop-blur-xl border border-gray-800">
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ⚡ CTA Section */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border border-purple-500/20 backdrop-blur-xl">
              <Activity className="w-5 h-5 text-purple-300" />
              <span className="text-sm text-gray-300">
                Join our beta program and shape the future of AI-driven DeFi innovation.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🎨 Gradient Animation */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  )
}
