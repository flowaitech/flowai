'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Network, CheckCircle, AlertCircle, Clock, Zap, Shield, Globe, ArrowRight, Settings, Wallet, Link2 } from 'lucide-react'
import { useTheme, getThemeClasses } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

export default function MultiChainFeature() {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const [selectedChain, setSelectedChain] = useState<any>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectedChains, setConnectedChains] = useState(['ethereum', 'solana'])

  const chains = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      status: 'active',
      color: 'from-blue-600 to-blue-800',
      icon: '🔷',
      description: 'The original smart contract platform',
      features: ['Smart Contracts', 'DeFi', 'NFTs', 'Layer 2 Support'],
      stats: {
        tvl: '$28.5B',
        transactions: '1.2M/day',
        gas: '$15-50',
        blockTime: '12s'
      },
      bridges: ['Polygon', 'Arbitrum', 'Optimism'],
      tokens: ['FLOW', 'ETH', 'USDC', 'USDT', 'WBTC']
    },
    {
      id: 'bsc',
      name: 'BNB Smart Chain',
      symbol: 'BNB',
      status: 'coming',
      color: 'from-yellow-500 to-yellow-700',
      icon: '🟡',
      description: 'Fast and low-cost transactions',
      features: ['Smart Contracts', 'DeFi', 'Gaming', 'Low Fees'],
      stats: {
        tvl: '$5.2B',
        transactions: '4.5M/day',
        gas: '$0.05-0.50',
        blockTime: '3s'
      },
      bridges: ['Ethereum', 'Polygon'],
      tokens: ['FLOW', 'BNB', 'BUSD', 'USDC', 'CAKE']
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      status: 'coming',
      color: 'from-purple-600 to-purple-800',
      icon: '🟣',
      description: 'Ethereum scaling solution',
      features: ['Layer 2', 'DeFi', 'Gaming', 'NFTs'],
      stats: {
        tvl: '$1.8B',
        transactions: '3.2M/day',
        gas: '$0.01-0.10',
        blockTime: '2s'
      },
      bridges: ['Ethereum', 'BSC'],
      tokens: ['FLOW', 'MATIC', 'USDC', 'USDT', 'WMATIC']
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      status: 'active',
      color: 'from-purple-500 to-pink-600',
      icon: '🟣',
      description: 'High-performance blockchain',
      features: ['High Speed', 'Low Cost', 'DeFi', 'NFTs'],
      stats: {
        tvl: '$1.5B',
        transactions: '65M/day',
        gas: '$0.00025',
        blockTime: '400ms'
      },
      bridges: ['Ethereum', 'BSC'],
      tokens: ['FLOW', 'SOL', 'USDC', 'USDT', 'RAY']
    },
    {
      id: 'arbitrum',
      name: 'Arbitrum',
      symbol: 'ARB',
      status: 'planned',
      color: 'from-blue-500 to-cyan-600',
      icon: '🔵',
      description: 'Ethereum Layer 2 scaling',
      features: ['Layer 2', 'DeFi', 'Smart Contracts'],
      stats: {
        tvl: '$2.3B',
        transactions: '800K/day',
        gas: '$0.10-1.00',
        blockTime: '250ms'
      },
      bridges: ['Ethereum'],
      tokens: ['FLOW', 'ARB', 'USDC', 'USDT', 'WETH']
    },
    {
      id: 'avalanche',
      name: 'Avalanche',
      symbol: 'AVAX',
      status: 'planned',
      color: 'from-red-500 to-orange-600',
      icon: '🔺',
      description: 'Fast, low-cost platform',
      features: ['Smart Contracts', 'DeFi', 'Gaming', 'Subnets'],
      stats: {
        tvl: '$980M',
        transactions: '1.5M/day',
        gas: '$0.05-2.00',
        blockTime: '2s'
      },
      bridges: ['Ethereum', 'BSC'],
      tokens: ['FLOW', 'AVAX', 'USDC', 'USDT', 'WAVAX']
    }
  ]

  const crossChainFeatures = [
    {
      title: 'Unified Interface',
      description: 'Single dashboard to manage all your assets across different chains',
      icon: <Globe className="w-5 h-5" />,
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Cross-Chain Swaps',
      description: 'Seamlessly swap tokens between different blockchains',
      icon: <ArrowRight className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Bridge Integration',
      description: 'Built-in bridges for secure cross-chain transfers',
      icon: <Link2 className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Multi-Wallet Support',
      description: 'Connect multiple wallets from different ecosystems',
      icon: <Wallet className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const handleConnectChain = (chainId: string) => {
    setIsConnecting(true)
    setTimeout(() => {
      setConnectedChains(prev => [...prev, chainId])
      setIsConnecting(false)
    }, 2000)
  }

  const handleDisconnectChain = (chainId: string) => {
    setConnectedChains(prev => prev.filter(id => id !== chainId))
    if (selectedChain?.id === chainId) {
      setSelectedChain(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Feature Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center shadow-lg">
            <Network className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className={cn("text-2xl font-bold", themeClasses.accent)}>Multi-Chain Support</h3>
            <p className={cn("text-sm opacity-60", themeClasses.textSecondary)}>
              Connect wallets across multiple blockchains
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className={cn("text-xs", theme === 'light' ? "border-orange-600 text-orange-600" : theme === 'dark' ? "border-red-600 text-red-600" : "border-purple-600 text-purple-600")}>
            4 Chains
          </Badge>
          <Badge className={cn("text-xs", theme === 'light' ? "bg-orange-600 text-white" : theme === 'dark' ? "bg-red-600 text-white" : "bg-purple-600 text-white")}>
            BETA
          </Badge>
        </div>
      </div>

      {/* Cross-Chain Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {crossChainFeatures.map((feature, index) => (
          <Card key={index} className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
            <CardContent className="p-4 text-center">
              <div className={cn("w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center mx-auto mb-3", feature.color)}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h4 className={cn("font-semibold text-sm mb-2", themeClasses.accent)}>{feature.title}</h4>
              <p className={cn("text-xs", themeClasses.textSecondary)}>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Supported Chains */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Supported Blockchains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chains.map((chain, index) => (
              <div 
                key={index}
                onClick={() => setSelectedChain(chain)}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105",
                  selectedChain?.id === chain.id ? 
                    (theme === 'light' ? "bg-orange-50 border-orange-500" :
                     theme === 'dark' ? "bg-red-900/30 border-red-500" :
                     "bg-purple-50 border-purple-500") :
                    (theme === 'light' ? "bg-gray-50 border-gray-200 hover:bg-gray-100" :
                     theme === 'dark' ? "bg-gray-800 border-gray-700 hover:bg-gray-700" :
                     "bg-gray-50 border-gray-200 hover:bg-gray-100")
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-full bg-gradient-to-r flex items-center justify-center", chain.color)}>
                      <span className="text-white text-lg">{chain.icon}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{chain.name}</div>
                      <div className={cn("text-xs", themeClasses.textSecondary)}>{chain.symbol}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      chain.status === 'active' ? 'bg-green-500' :
                      chain.status === 'coming' ? 'bg-yellow-500' :
                      'bg-gray-400'
                    )}></div>
                    {connectedChains.includes(chain.id) && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                <p className={cn("text-xs mb-3", themeClasses.textSecondary)}>{chain.description}</p>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>TVL</span>
                    <span className="text-xs font-medium">{chain.stats.tvl}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>Transactions</span>
                    <span className="text-xs font-medium">{chain.stats.transactions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-xs", themeClasses.textSecondary)}>Gas Fee</span>
                    <span className="text-xs font-medium">{chain.stats.gas}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    chain.status === 'active' ? "border-green-500 text-green-500" :
                    chain.status === 'coming' ? "border-yellow-500 text-yellow-500" :
                    "border-gray-500 text-gray-500"
                  )}>
                    {chain.status === 'active' ? 'Active' :
                     chain.status === 'coming' ? 'Coming Soon' : 'Planned'}
                  </Badge>
                  
                  {connectedChains.includes(chain.id) ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDisconnectChain(chain.id)
                      }}
                      className="text-xs"
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleConnectChain(chain.id)
                      }}
                      disabled={chain.status !== 'active' || isConnecting}
                      className="text-xs"
                    >
                      {isConnecting ? (
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        'Connect'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chain Details */}
      {selectedChain && (
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardHeader>
            <CardTitle className={cn("text-lg", themeClasses.accent)}>
              {selectedChain.name} Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Chain Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{selectedChain.stats.tvl}</div>
                <div className={cn("text-xs", themeClasses.textSecondary)}>Total Value Locked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{selectedChain.stats.transactions}</div>
                <div className={cn("text-xs", themeClasses.textSecondary)}>Daily Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{selectedChain.stats.gas}</div>
                <div className={cn("text-xs", themeClasses.textSecondary)}>Gas Fee Range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{selectedChain.stats.blockTime}</div>
                <div className={cn("text-xs", themeClasses.textSecondary)}>Block Time</div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className={cn("text-sm font-semibold mb-3", themeClasses.text)}>Key Features</h4>
              <div className="flex flex-wrap gap-2">
                {selectedChain.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className={cn(
                    "text-xs",
                    theme === 'light' ? "border-blue-200 text-blue-600" :
                    theme === 'dark' ? "border-green-700 text-green-400" :
                    "border-purple-200 text-purple-600"
                  )}>
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Supported Tokens */}
            <div>
              <h4 className={cn("text-sm font-semibold mb-3", themeClasses.text)}>Supported Tokens</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {selectedChain.tokens.map((token, index) => (
                  <div key={index} className={cn(
                    "p-2 rounded-lg text-center text-xs font-medium",
                    theme === 'light' ? "bg-blue-50 text-blue-600" :
                    theme === 'dark' ? "bg-green-900/30 text-green-400" :
                    "bg-purple-50 text-purple-600"
                  )}>
                    {token}
                  </div>
                ))}
              </div>
            </div>

            {/* Bridge Connections */}
            <div>
              <h4 className={cn("text-sm font-semibold mb-3", themeClasses.text)}>Bridge Connections</h4>
              <div className="flex flex-wrap gap-2">
                {selectedChain.bridges.map((bridge, index) => (
                  <div key={index} className={cn(
                    "p-2 rounded-lg text-xs flex items-center gap-2",
                    theme === 'light' ? "bg-gray-100" :
                    theme === 'dark' ? "bg-gray-800" :
                    "bg-gray-100"
                  )}>
                    <Link2 className="w-3 h-3" />
                    {bridge}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configure Settings
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Bridge Assets
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connection Status */}
      <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
        <CardHeader>
          <CardTitle className={cn("text-lg", themeClasses.accent)}>Connection Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chains.map((chain, index) => (
              <div key={index} className={cn(
                "p-3 rounded-lg border flex items-center justify-between",
                theme === 'light' ? "bg-gray-50 border-gray-200" :
                theme === 'dark' ? "bg-gray-800 border-gray-700" :
                "bg-gray-50 border-gray-200"
              )}>
                <div className="flex items-center gap-3">
                  <div className={cn("w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center", chain.color)}>
                    <span className="text-white text-sm">{chain.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{chain.name}</div>
                    <div className={cn("text-xs", themeClasses.textSecondary)}>
                      {connectedChains.includes(chain.id) ? 'Connected' : 'Not Connected'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {connectedChains.includes(chain.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                        Active
                      </Badge>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs border-gray-500 text-gray-500">
                        Disconnected
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Lightning Fast</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Instant cross-chain transactions with minimal latency
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Secure Bridges</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Audited bridge protocols for safe asset transfers
            </p>
          </CardContent>
        </Card>

        <Card className={cn("border-0", themeClasses.cardBg, themeClasses.shadow)}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h4 className={cn("font-semibold text-sm mb-1", themeClasses.accent)}>Global Access</h4>
            <p className={cn("text-xs", themeClasses.textSecondary)}>
              Connect to any blockchain from anywhere in the world
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}