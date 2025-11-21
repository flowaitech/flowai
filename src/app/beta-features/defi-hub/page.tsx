'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  PieChart, 
  TrendingUp, 
  Wallet,
  Zap,
  Shield,
  DollarSign,
  Percent,
  Activity,
  Lock,
  Unlock,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  Sparkles,
  Coins,
  Flame,
  Rocket,
  Gem
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface StakingPool {
  id: string
  name: string
  token: string
  apy: number
  tvl: string
  staked: number
  totalStaked: number
  lockPeriod: string
  risk: 'Low' | 'Medium' | 'High'
  status: 'active' | 'full' | 'upcoming'
}

interface LiquidityPool {
  id: string
  pair: string
  token0: string
  token1: string
  apr: number
  tvl: string
  volume24h: string
  fees24h: string
  myLiquidity: number
  rewards: boolean
}

export default function DeFiHub() {
  const [stakingPools, setStakingPools] = useState<StakingPool[]>([
    {
      id: '1',
      name: 'FLOW Single Staking',
      token: 'FLOW',
      apy: 45.6,
      tvl: '12.5M',
      staked: 5000,
      totalStaked: 25000000,
      lockPeriod: 'Flexible',
      risk: 'Low',
      status: 'active'
    },
    {
      id: '2',
      name: 'ETH-FLOW LP',
      token: 'ETH-FLOW',
      apy: 78.9,
      tvl: '8.3M',
      staked: 0.5,
      totalStaked: 4500,
      lockPeriod: '30 days',
      risk: 'Medium',
      status: 'active'
    },
    {
      id: '3',
      name: 'USDC Stable Pool',
      token: 'USDC',
      apy: 12.3,
      tvl: '25.8M',
      staked: 10000,
      totalStaked: 25800000,
      lockPeriod: 'No lock',
      risk: 'Low',
      status: 'active'
    },
    {
      id: '4',
      name: 'High Yield Vault',
      token: 'FLOW',
      apy: 125.4,
      tvl: '3.2M',
      staked: 0,
      totalStaked: 3200000,
      lockPeriod: '90 days',
      risk: 'High',
      status: 'full'
    }
  ])

  const [liquidityPools, setLiquidityPools] = useState<LiquidityPool[]>([
    {
      id: '1',
      pair: 'ETH/USDC',
      token0: 'ETH',
      token1: 'USDC',
      apr: 23.4,
      tvl: '45.6M',
      volume24h: '12.3M',
      fees24h: '36.9K',
      myLiquidity: 0,
      rewards: true
    },
    {
      id: '2',
      pair: 'FLOW/ETH',
      token0: 'FLOW',
      token1: 'ETH',
      apr: 56.7,
      tvl: '8.9M',
      volume24h: '3.2M',
      fees24h: '9.6K',
      myLiquidity: 2500,
      rewards: true
    },
    {
      id: '3',
      pair: 'USDC/USDT',
      token0: 'USDC',
      token1: 'USDT',
      apr: 8.9,
      tvl: '78.3M',
      volume24h: '25.6M',
      fees24h: '76.8K',
      myLiquidity: 5000,
      rewards: false
    }
  ])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState<'staking' | 'liquidity'>('staking')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)

    // Simulate APY updates
    const interval = setInterval(() => {
      setStakingPools(prev => prev.map(pool => ({
        ...pool,
        apy: pool.apy + (Math.random() - 0.5) * 0.5
      })))
      setLiquidityPools(prev => prev.map(pool => ({
        ...pool,
        apr: pool.apr + (Math.random() - 0.5) * 0.3
      })))
    }, 5000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  const totalStakedValue = stakingPools.reduce((sum, pool) => sum + pool.staked, 0)
  const totalLiquidityValue = liquidityPools.reduce((sum, pool) => sum + pool.myLiquidity, 0)
  const totalTVL = stakingPools.reduce((sum, pool) => sum + parseFloat(pool.tvl), 0)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'High': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Low': return <Badge className="bg-green-600 hover:bg-green-700">Low Risk</Badge>
      case 'Medium': return <Badge className="bg-yellow-600 hover:bg-yellow-700">Medium Risk</Badge>
      case 'High': return <Badge className="bg-red-600 hover:bg-red-700">High Risk</Badge>
      default: return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
      case 'full': return <Badge className="bg-red-600 hover:bg-red-700">Full</Badge>
      case 'upcoming': return <Badge className="bg-blue-600 hover:bg-blue-700">Upcoming</Badge>
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{ 
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3) 0%, transparent 50%)` 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-pink-500/5 animate-pulse" />
        {/* DeFi particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 pt-24 pb-8">
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
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PieChart className="w-8 h-8 text-purple-500" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                DeFi Hub
              </h1>
              <PieChart className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none">
                <Coins className="w-3 h-3 mr-1" />
                DEFI DASHBOARD
              </Badge>
              <Badge className="bg-purple-600 text-white border-none animate-pulse">
                <Flame className="w-3 h-3 mr-1" />
                YIELD FARMING
              </Badge>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive DeFi dashboard with staking, liquidity management, and yield optimization
            </p>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Value Locked</span>
                  <DollarSign className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-purple-400">
                  ${totalTVL.toFixed(1)}M
                </div>
                <div className="text-xs text-gray-500 mt-1">Across all pools</div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">My Staked Value</span>
                  <Lock className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-400">
                  ${(totalStakedValue + totalLiquidityValue).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">Total deposits</div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Average APY</span>
                  <Percent className="w-4 h-4 text-cyan-500" />
                </div>
                <div className="text-2xl font-bold text-cyan-400">67.8%</div>
                <div className="text-xs text-gray-500 mt-1">Weighted average</div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gray-900/80 backdrop-blur-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Daily Rewards</span>
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-yellow-400">$456.78</div>
                <div className="text-xs text-gray-500 mt-1">Est. earnings</div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-lg p-1 border border-gray-800">
              <Button
                variant={activeTab === 'staking' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('staking')}
                className={cn(
                  "transition-all duration-300",
                  activeTab === 'staking' 
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Lock className="w-4 h-4 mr-2" />
                Staking Pools
              </Button>
              <Button
                variant={activeTab === 'liquidity' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('liquidity')}
                className={cn(
                  "transition-all duration-300",
                  activeTab === 'liquidity' 
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Activity className="w-4 h-4 mr-2" />
                Liquidity Pools
              </Button>
            </div>
          </div>

          {/* Staking Pools */}
          {activeTab === 'staking' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stakingPools.map((pool, index) => (
                <Card
                  key={pool.id}
                  className={cn(
                    "border-0 bg-gray-900/80 backdrop-blur-xl transition-all duration-300 hover:scale-105",
                    pool.status === 'full' ? "opacity-75" : "hover:shadow-2xl hover:shadow-purple-500/20"
                  )}
                >
                  <CardHeader className="border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold text-white">
                        {pool.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(pool.status)}
                        {getRiskBadge(pool.risk)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">APY</div>
                        <div className="text-2xl font-bold text-green-400">
                          {pool.apy.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">TVL</div>
                        <div className="text-xl font-semibold text-cyan-400">
                          ${pool.tvl}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Pool Progress</span>
                        <span className="text-gray-400">
                          {((pool.totalStaked / 50000000) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((pool.totalStaked / 50000000) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div>
                        <span className="text-gray-400">Lock Period:</span>
                        <span className="ml-2 text-white">{pool.lockPeriod}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">My Stake:</span>
                        <span className="ml-2 text-white">{pool.staked.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button 
                      className={cn(
                        "w-full transition-all duration-300 hover:scale-105",
                        pool.status === 'full' 
                          ? "bg-gray-700 cursor-not-allowed" 
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      )}
                      disabled={pool.status === 'full'}
                    >
                      {pool.status === 'full' ? 'Pool Full' : pool.staked > 0 ? 'Manage Stake' : 'Stake Now'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Liquidity Pools */}
          {activeTab === 'liquidity' && (
            <div className="space-y-6">
              {liquidityPools.map((pool, index) => (
                <Card
                  key={pool.id}
                  className="border-0 bg-gray-900/80 backdrop-blur-xl transition-all duration-300 hover:scale-102 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                            {pool.token0.charAt(0)}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold">
                            {pool.token1.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">{pool.pair}</div>
                          <div className="text-sm text-gray-400">
                            {pool.rewards && <Badge className="bg-yellow-600 hover:bg-yellow-700 mr-2">Rewards</Badge>}
                            APR: {pool.apr.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-cyan-400">${pool.tvl}</div>
                        <div className="text-sm text-gray-400">TVL</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400">24h Volume</div>
                        <div className="font-semibold">${pool.volume24h}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">24h Fees</div>
                        <div className="font-semibold">${pool.fees24h}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">My Liquidity</div>
                        <div className="font-semibold">${pool.myLiquidity.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Daily Est.</div>
                        <div className="font-semibold text-green-400">
                          ${(pool.myLiquidity * pool.apr / 36500).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className={cn(
                          "flex-1 transition-all duration-300 hover:scale-105",
                          pool.myLiquidity > 0 
                            ? "bg-gray-700 hover:bg-gray-600" 
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        )}
                      >
                        {pool.myLiquidity > 0 ? 'Manage' : 'Add Liquidity'}
                      </Button>
                      {pool.myLiquidity > 0 && (
                        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                          Remove
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105">
                <Rocket className="w-4 h-4 mr-2" />
                Launch New Pool
              </Button>
              <Button variant="outline" className="border-gray-700 hover:border-purple-500 transition-all duration-300">
                <Gem className="w-4 h-4 mr-2" />
                Yield Optimizer
              </Button>
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