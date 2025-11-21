'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { 
  Wallet, 
  Copy, 
  ExternalLink, 
  LogOut, 
  RefreshCw,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react'
import { toast } from 'sonner'

interface WalletDisconnectProps {
  address: string
  walletType: 'ethereum' | 'solana' | null
  onDisconnect: () => void
  onRefresh?: () => void
}

interface BalanceData {
  eth?: string
  sol?: string
  usd: string
  change24h: string
  isLoading: boolean
  hasError: boolean
}

export default function WalletDisconnect({ 
  address, 
  walletType,
  onDisconnect, 
  onRefresh 
}: WalletDisconnectProps) {
  const [balance, setBalance] = useState<BalanceData>({
    eth: walletType === 'ethereum' ? '0.0000' : undefined,
    sol: walletType === 'solana' ? '0.0000' : undefined,
    usd: '$0.00',
    change24h: '+0.00%',
    isLoading: true,
    hasError: false
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  // 🔍 Fetch balance dari API
  const fetchBalance = async () => {
    try {
      setIsRefreshing(true)
      
      const apiUrl = walletType === 'solana' 
        ? `/api/wallet/solana-balance?address=${address}`
        : `/api/wallet/balance?address=${address}`
      
      const response = await fetch(apiUrl)
      const result = await response.json()
      
      if (result.success) {
        if (walletType === 'solana') {
          setBalance({
            sol: result.data.sol,
            usd: result.data.usd,
            change24h: result.data.change24h,
            isLoading: false,
            hasError: false
          })
        } else {
          setBalance({
            eth: result.data.eth,
            usd: result.data.usd,
            change24h: result.data.change24h,
            isLoading: false,
            hasError: false
          })
        }

        // Tampilkan warning jika menggunakan fallback data
        if (result.warning) {
          console.warn(result.warning)
        }
      } else {
        throw new Error(result.error || 'Failed to fetch balance')
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error)
      // Tampilkan error state
      setBalance(prev => ({
        ...prev,
        usd: '$0.00',
        change24h: '+0.00%',
        isLoading: false,
        hasError: true
      }))
    } finally {
      setIsRefreshing(false)
    }
  }

  // 🔄 Auto refresh balance setiap 30 detik
  useEffect(() => {
    fetchBalance()
    const interval = setInterval(fetchBalance, 30000)
    return () => clearInterval(interval)
  }, [address])

  // 📋 Copy address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    toast.success('Address copied to clipboard')
  }

  // 🔗 Open address in explorer
  const openExplorer = () => {
    if (walletType === 'solana') {
      window.open(`https://explorer.solana.com/address/${address}`, '_blank')
    } else {
      window.open(`https://etherscan.io/address/${address}`, '_blank')
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const isPositiveChange = balance.change24h.startsWith('+')
  
  const getNetworkBadge = () => {
    switch (walletType) {
      case 'ethereum':
        return { text: 'Ethereum', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' }
      case 'solana':
        return { text: 'Solana', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' }
      default:
        return { text: 'Unknown', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' }
    }
  }

  const networkBadge = getNetworkBadge()
  const balanceAmount = walletType === 'solana' ? balance.sol : balance.eth
  const currencySymbol = walletType === 'solana' ? 'SOL' : 'ETH'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl px-4 py-2 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl">
          <Wallet size={18} />
          <span>{formatAddress(address)}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 p-0">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Wallet size={16} className="text-white" />
                  </div>
                  <span className="font-medium text-sm">Connected Wallet</span>
                </div>
                <Badge variant="outline" className={networkBadge.color}>
                  {networkBadge.text}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Address:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{formatAddress(address)}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={copyAddress}
                    >
                      <Copy size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Balance Section */}
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Balance</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={fetchBalance}
                  disabled={isRefreshing}
                >
                  <RefreshCw 
                    size={12} 
                    className={isRefreshing ? 'animate-spin' : ''} 
                  />
                </Button>
              </div>

              {balance.isLoading ? (
                <div className="space-y-2">
                  <div className="h-8 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                </div>
              ) : balance.hasError ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center py-4">
                    <div className="text-center">
                      <div className="text-red-500 text-sm mb-2">Failed to load balance</div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={fetchBalance}
                        className="text-xs"
                      >
                        <RefreshCw size={12} className="mr-1" />
                        Retry
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-emerald-500" />
                      <span className="text-2xl font-bold">{balanceAmount} {currencySymbol}</span>
                    </div>
                    <Badge 
                      variant={isPositiveChange ? "default" : "destructive"}
                      className="text-xs"
                    >
                      <TrendingUp size={10} className="mr-1" />
                      {balance.change24h}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {balance.usd} USD
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Real-time balance
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Activity size={12} />
                    <span>Updated just now</span>
                    {balance.hasError && (
                      <span className="text-amber-500">• Using cached data</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Actions */}
            <div className="p-2">
              <DropdownMenuItem 
                onClick={openExplorer}
                className="flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer"
              >
                <ExternalLink size={16} />
                <span>View on {walletType === 'solana' ? 'Solana Explorer' : 'Etherscan'}</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={onDisconnect}
                className="flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
              >
                <LogOut size={16} />
                <span>Disconnect Wallet</span>
              </DropdownMenuItem>
            </div>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}