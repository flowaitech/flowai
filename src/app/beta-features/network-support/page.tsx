'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Check, 
  Zap, 
  Shield, 
  Globe, 
  Network,
  Activity,
  TrendingUp,
  Cpu,
  Database,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function NetworkSupport() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
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
      observer.disconnect()
    }
  }, [])

  const networks = [
    {
      name: 'Ethereum',
      logo: '/images/networks/eth.png',
      description: 'Main network for smart contracts & DeFi liquidity',
      status: 'active',
      gradient: 'from-blue-600 to-purple-600',
      features: ['Smart Contracts', 'DeFi', 'NFTs', 'Layer 1'],
      tps: '15-30',
      finality: '~13 minutes'
    },
    {
      name: 'Solana',
      logo: '/images/networks/solana.png',
      description: 'High-performance blockchain for decentralized apps',
      status: 'active',
      gradient: 'from-purple-600 to-pink-600',
      features: ['High Speed', 'Low Cost', 'Proof of History', 'Scalable'],
      tps: '65,000+',
      finality: '~2.5 seconds'
    },
    {
      name: 'BSC',
      logo: '/images/networks/bnb.png',
      description: 'High-performance blockchain with low transaction costs',
      status: 'active',
      gradient: 'from-yellow-600 to-orange-600',
      features: ['EVM Compatible', 'Low Fees', 'Fast', 'DeFi Hub'],
      tps: '100+',
      finality: '~3 seconds'
    },
    {
      name: 'Arbitrum',
      logo: '/images/networks/arbitrum.png',
      description: 'Leading Layer 2 solution for Ethereum scaling',
      status: 'coming-soon',
      gradient: 'from-cyan-600 to-blue-600',
      features: ['Layer 2', 'Optimistic Rollup', 'EVM Compatible', 'Low Gas'],
      tps: '40,000+',
      finality: '~1 second'
    },
    {
      name: 'Optimism',
      logo: '/images/networks/op.png',
      description: 'Fast and secure Layer 2 scaling solution',
      status: 'coming-soon',
      gradient: 'from-red-600 to-pink-600',
      features: ['Layer 2', 'Optimistic Rollup', 'EVM Compatible', 'Fast'],
      tps: '4,000+',
      finality: '~1 second'
    },
    {
      name: 'Polygon',
      logo: '/images/networks/matic.png',
      description: 'Fast, low-cost transactions with Ethereum compatibility',
      status: 'coming-soon',
      gradient: 'from-green-600 to-cyan-600',
      features: ['Layer 2', 'Low Fees', 'Fast', 'EVM Compatible'],
      tps: '7,000+',
      finality: '~2 minutes'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
      case 'beta':
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Beta</Badge>
      case 'coming-soon':
        return <Badge className="bg-gray-600 hover:bg-gray-700">Coming Soon</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects - Removed mouse tracking */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5 animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/beta-features">
              <Button 
                variant="ghost" 
                className="text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Beta Features
              </Button>
            </Link>
          </div>

          {/* Title Section */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-cyan-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Network Support
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Network className="w-6 h-6 text-cyan-500" />
                <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-none">
                  MULTI-CHAIN INFRASTRUCTURE
                </Badge>
                <Network className="w-6 h-6 text-cyan-500" />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Supported Multi-Chain Infrastructure for AI-Powered Future
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Lightning Fast Cross-Chain</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Global Coverage</span>
              </div>
            </div>
          </div>

          {/* Networks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {networks.map((network, index) => (
              <Card
                key={network.name}
                className={cn(
                  "relative border-0 bg-gray-900/50 backdrop-blur-xl transition-all duration-300 hover:scale-105 animate-on-scroll group",
                  "hover:shadow-2xl hover:shadow-purple-500/20"
                )}
                id={`network-${index}`}
                style={{
                  opacity: isVisible[`network-${index}`] ? 1 : 0,
                  transform: isVisible[`network-${index}`] ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${index * 100}ms`
                }}
              >
                {/* Glow Effect */}
                <div className={cn(
                  "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  "bg-gradient-to-r " + network.gradient,
                  "blur-xl"
                )} />

                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-800 p-3">
                      <Image
                        src={network.logo}
                        alt={network.name}
                        fill
                        className="object-contain"
                        onError={(e) => {
                          // Fallback to placeholder if image not found
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-2xl font-bold bg-gradient-to-r ${network.gradient} bg-clip-text text-transparent">${network.name.charAt(0)}</div>`
                          }
                        }}
                      />
                    </div>
                    {getStatusBadge(network.status)}
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                    {network.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {network.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {network.features.map((feature, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-gray-700 text-gray-400">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-xs text-gray-500">TPS</div>
                      <div className="text-sm font-semibold text-cyan-400">{network.tps}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-xs text-gray-500">Finality</div>
                      <div className="text-sm font-semibold text-green-400">{network.finality}</div>
                    </div>
                  </div>

                  <div className="text-center p-2 text-sm text-gray-400">
                    {network.status === 'coming-soon' ? 'Coming Soon' : 'Network Available'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Infrastructure Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 rounded-lg bg-gray-900/30 backdrop-blur-xl border border-gray-800">
              <Database className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                6+
              </div>
              <div className="text-gray-400 text-sm">Supported Networks</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-900/30 backdrop-blur-xl border border-gray-800">
              <Activity className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                100K+
              </div>
              <div className="text-gray-400 text-sm">Daily Transactions</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-900/30 backdrop-blur-xl border border-gray-800">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <div className="text-gray-400 text-sm">Uptime SLA</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-900/30 backdrop-blur-xl border border-gray-800">
              <Cpu className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                &lt;1s
              </div>
              <div className="text-gray-400 text-sm">Cross-Chain Bridge</div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 backdrop-blur-xl">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-300">
                FLOW AI supports multi-chain integration to ensure seamless scalability and cross-network intelligence.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}