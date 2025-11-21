'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, TrendingUp, DollarSign, Wallet, ArrowUpRight, ArrowDownRight, Plus, Minus, RefreshCw, Lock, Unlock } from 'lucide-react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

export default function DeFiHubFeature() {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [selectedPool, setSelectedPool] = useState<any>(null)
  const [userBalance, setUserBalance] = useState('1,234.56')
  const [stakeAmount, setStakeAmount] = useState('')
  const [isStaking, setIsStaking] = useState(false)

  const liquidityPools = [
    { 
      name: 'FLOW-ETH', 
      apy: '18.5%', 
      tvl: '$2.3M', 
      volume24h: '$456K',
      fee: '0.3%',
      risk: 'Low',
      multiplier: '1.5x',
      tokens: ['FLOW', 'ETH'],
      userStaked: '0',
      userRewards: '0'
    },
    { 
      name: 'FLOW-USDC', 
      apy: '22.1%', 
      tvl: '$1.8M', 
      volume24h: '$234K',
      fee: '0.25%',
      risk: 'Medium',
      multiplier: '2.0x',
      tokens: ['FLOW', 'USDC'],
      userStaked: '0',
      userRewards: '0'
    },
    { 
      name: 'FLOW-BNB', 
      apy: '16.8%', 
      tvl: '$1.2M', 
      volume24h: '$123K',
      fee: '0.3%',
      risk: 'Low',
      multiplier: '1.2x',
      tokens: ['FLOW', 'BNB'],
      userStaked: '0',
      userRewards: '0'
    },
    { 
      name: 'FLOW-SOL', 
      apy: '25.4%', 
      tvl: '$890K', 
      volume24h: '$89K',
      fee: '0.35%',
      risk: 'High',
      multiplier: '2.5x',
      tokens: ['FLOW', 'SOL'],
      userStaked: '0',
      userRewards: '0'
    },
    { 
      name: 'FLOW-MATIC', 
      apy: '19.2%', 
      tvl: '$567K', 
      volume24h: '$67K',
      fee: '0.3%',
      risk: 'Medium',
      multiplier: '1.8x',
      tokens: ['FLOW', 'MATIC'],
      userStaked: '0',
      userRewards: '0'
    },
    { 
      name: 'FLOW-AVAX', 
      apy: '21.7%', 
      tvl: '$445K', 
      volume24h: '$45K',
      fee: '0.28%',
      risk: 'Medium',
      multiplier: '2.2x',
      tokens: ['FLOW', 'AVAX'],
      userStaked: '0',
      userRewards: '0'
    }
  ]

  const stakingOptions = [
    { 
      name: 'FLOW Single Staking', 
      apy: '12.5%', 
      lockPeriod: 'Flexible',
      tvl: '$5.6M',
      multiplier: '1.0x',
      risk: 'Low',
      minAmount: '100 FLOW'
    },
    { 
      name: 'FLOW Lock Staking', 
      apy: '18.9%', 
      lockPeriod: '30 days',
      tvl: '$2.3M',
      multiplier: '1.5x',
      risk: 'Low',
      minAmount: '500 FLOW'
    },
    { 
      name: 'FLOW Vault', 
      apy: '24.3%', 
      lockPeriod: '90 days',
      tvl: '$1.2M',
      multiplier: '2.0x',
      risk: 'Medium',
      minAmount: '1000 FLOW'
    }
  ]

  const yieldFarming = [
    { 
      name: 'AI Farm', 
      apy: '35.7%', 
      tvl: '$3.4M',
      multiplier: '3.0x',
      risk: 'High',
      rewards: ['FLOW', 'ETH'],
      period: '7 days'
    },
    { 
      name: 'DeFi Farm', 
      apy: '28.9%', 
      tvl: '$2.1M',
      multiplier: '2.5x',
      risk: 'Medium',
      rewards: ['FLOW', 'USDC'],
      period: '14 days'
    },
    { 
      name: 'Gaming Farm', 
      apy: '42.1%', 
      tvl: '$1.8M',
      multiplier: '3.5x',
      risk: 'High',
      rewards: ['FLOW', 'NFT'],
      period: '30 days'
    }
  ]

  const handleStake = () => {
    if (!stakeAmount || !selectedPool) return
    
    setIsStaking(true)
    setTimeout(() => {
      setUserBalance((parseFloat(userBalance.replace(',', '')) - parseFloat(stakeAmount)).toFixed(2))
      setSelectedPool({
        ...selectedPool,
        userStaked: stakeAmount,
        userRewards: (parseFloat(stakeAmount) * parseFloat(selectedPool.apy) / 100 / 365).toFixed(4)
      })
      setStakeAmount('')
      setIsStaking(false)
    }, 2000)
  }

  const handleUnstake = () => {
    if (!selectedPool || !selectedPool.userStaked) return
    
    setIsStaking(true)
    setTimeout(() => {
      setUserBalance((parseFloat(userBalance.replace(',', '')) + parseFloat(selectedPool.userStaked)).toFixed(2))
      setSelectedPool({
        ...selectedPool,
        userStaked: '0',
        userRewards: '0'
      })
      setIsStaking(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Feature Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className={cn("text-2xl font-bold", themeClasses.accent)}>DeFi Hub</h3>
            <p className={cn("text-sm opacity-60", themeClasses.textSecondary)}>
              Integrated dashboard for liquidity pools and staking
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className={cn("text-xs", theme === 'light' ? "border-purple-600 text-purple-600" : theme === 'dark' ? "border-pink-600 text-pink-600" : "border-purple-600 text-purple-600")}>
            15-25% APY
          </Badge>
          <Badge className={cn("text-xs", theme === 'light' ? "bg-purple-600 text-white" : theme === 'dark' ? "bg-pink-600 text-white" : "bg-purple-600 text-white")}>
            BETA
          </Badge>
        </div>
      </div>

      {/* User Balance Card */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className={cn("text-sm", themeClasses.textSecondary)}>Available Balance</div>
              <div className="text-2xl font-bold text-green-500">${userBalance}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button size="sm" className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liquidity Pools */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Liquidity Pools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liquidityPools.map((pool, index) => (
              <div 
                key={index}
                onClick={() => setSelectedPool(pool)}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105",
                  selectedPool?.name === pool.name ? 
                    (theme === 'light' ? "bg-blue-50 border-blue-500" :
                     theme === 'dark' ? "bg-green-900/30 border-green-500" :
                     "bg-purple-50 border-purple-500") :
                    (theme === 'light' ? "bg-gray-50 border-gray-200 hover:bg-gray-100" :
                     theme === 'dark' ? "bg-gray-800 border-gray-700 hover:bg-gray-700" :
                     "bg-gray-50 border-gray-200 hover:bg-gray-100")
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {pool.tokens.map((token, i) => (
                        <div key={i} className={cn(
                          "w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold",
                          token === 'FLOW' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' :
                          token === 'ETH' ? 'bg-blue-600 text-white' :
                          token === 'USDC' ? 'bg-blue-500 text-white' :
                          token === 'BNB' ? 'bg-yellow-500 text-white' :
                          token === 'SOL' ? 'bg-purple-600 text-white' :
                          token === 'MATIC' ? 'bg-purple-500 text-white' :
                          'bg-red-500 text-white'
                        )}>
                          {token.substring(0, 1)}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{pool.name}</div>
                      <div className={cn("text-xs", themeClasses.textSecondary)}>{pool.fee} Fee</div>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    pool.risk === 'Low' ? "border-green-500 text-green-500" :
                    pool.risk === 'Medium' ? "border-yellow-500 text-yellow-500" :
                    "border-red-500 text-red-500"
                  )}>
                    {pool.risk}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>APY</span>
                    <span className="text-sm font-bold text-green-500">{pool.apy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>TVL</span>
                    <span className="text-xs font-medium">{pool.tvl}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>24h Volume</span>
                    <span className="text-xs font-medium">{pool.volume24h}</span>
                  </div>
                  {pool.userStaked !== '0' && (
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className={cn("text-xs", themeClasses.textSecondary)}>Your Stake</span>
                        <span className="text-xs font-medium">{pool.userStaked}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={cn("text-xs", themeClasses.textSecondary)}>Rewards</span>
                        <span className="text-xs font-medium text-green-500">{pool.userRewards}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staking Interface */}
      {selectedPool && (
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardHeader>
            <CardTitle className={cn("text-lg", themeClasses.accent)}>
              Stake in {selectedPool.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={cn("text-sm font-medium mb-2 block", themeClasses.text)}>
                  Amount to Stake
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0.00"
                    className={cn(
                      "w-full p-3 pr-12 rounded-lg border",
                      theme === 'light' ? "bg-white border-gray-300" :
                      theme === 'dark' ? "bg-gray-800 border-gray-700" :
                      "bg-white border-gray-300"
                    )}
                  />
                  <span className="absolute right-3 top-3 text-sm text-gray-500">USD</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={cn("text-xs", themeClasses.textSecondary)}>
                    Available: ${userBalance}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStakeAmount(userBalance)}
                    className="text-xs"
                  >
                    Max
                  </Button>
                </div>
              </div>
              
              <div>
                <label className={cn("text-sm font-medium mb-2 block", themeClasses.text)}>
                  Estimated Rewards
                </label>
                <div className={cn(
                  "p-3 rounded-lg border",
                  theme === 'light' ? "bg-green-50 border-green-200" :
                  theme === 'dark' ? "bg-green-900/20 border-green-700" :
                  "bg-green-50 border-green-200"
                )}>
                  <div className="text-2xl font-bold text-green-500">
                    ${stakeAmount ? (parseFloat(stakeAmount) * parseFloat(selectedPool.apy) / 100 / 365).toFixed(4) : '0.00'}
                  </div>
                  <div className={cn("text-xs", themeClasses.textSecondary)}>Daily</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {selectedPool.userStaked !== '0' ? (
                <>
                  <Button
                    onClick={handleUnstake}
                    disabled={isStaking}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {isStaking ? (
                      <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Minus className="w-4 h-4" />
                    )}
                    Unstake
                  </Button>
                  <Button
                    onClick={handleStake}
                    disabled={isStaking || !stakeAmount || parseFloat(stakeAmount) > parseFloat(userBalance.replace(',', ''))}
                    className="flex items-center gap-2"
                  >
                    {isStaking ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    Add Stake
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleStake}
                  disabled={isStaking || !stakeAmount || parseFloat(stakeAmount) > parseFloat(userBalance.replace(',', ''))}
                  className="flex items-center gap-2"
                >
                  {isStaking ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  Stake Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Staking Options */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Staking Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stakingOptions.map((option, index) => (
              <div key={index} className={cn(
                "p-4 rounded-lg border transition-all duration-200 hover:scale-105",
                theme === 'light' ? "bg-gray-50 border-gray-200 hover:bg-gray-100" :
                theme === 'dark' ? "bg-gray-800 border-gray-700 hover:bg-gray-700" :
                "bg-gray-50 border-gray-200 hover:bg-gray-100"
              )}>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-sm">{option.name}</div>
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    option.risk === 'Low' ? "border-green-500 text-green-500" :
                    option.risk === 'Medium' ? "border-yellow-500 text-yellow-500" :
                    "border-red-500 text-red-500"
                  )}>
                    {option.risk}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>APY</span>
                    <span className="text-sm font-bold text-green-500">{option.apy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>Lock Period</span>
                    <span className="text-xs font-medium">{option.lockPeriod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>TVL</span>
                    <span className="text-xs font-medium">{option.tvl}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>Min Amount</span>
                    <span className="text-xs font-medium">{option.minAmount}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Stake Now
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Yield Farming */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Yield Farming</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {yieldFarming.map((farm, index) => (
              <div key={index} className={cn(
                "p-4 rounded-lg border transition-all duration-200 hover:scale-105",
                theme === 'light' ? "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200" :
                theme === 'dark' ? "bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-700" :
                "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
              )}>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-sm">{farm.name}</div>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    {farm.multiplier}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>APY</span>
                    <span className="text-sm font-bold text-purple-500">{farm.apy}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>TVL</span>
                    <span className="text-xs font-medium">{farm.tvl}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>Rewards</span>
                    <div className="flex gap-1">
                      {farm.rewards.map((reward, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>Period</span>
                    <span className="text-xs font-medium">{farm.period}</span>
                  </div>
                </div>
                
                <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Start Farming
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>High Yields</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Earn up to 42% APY with optimized strategies
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Secure</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Audited smart contracts and insurance coverage
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Auto-Compounding</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Automatically reinvest rewards for maximum returns
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}