'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { X, Wallet, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useIsMobile } from '@/hooks/use-mobile'

interface WalletOption {
  id: string
  name: string
  iconSrc?: string // path ke public images, contoh: '/images/metamask.png'
  emojiFallback?: string // kalau gak ada image, pakai emoji
  description: string
  popular?: boolean
  color: string
}

interface Props {
  wallets: string[]
  onClose: () => void
  onConnectWalletConnect: () => void
  onConnectMetaMask: () => void
  onConnectPhantom: () => void
}

const walletOptions: WalletOption[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    iconSrc: '/images/metamask.png',
    emojiFallback: '🦊',
    description: 'Most trusted Ethereum wallet',
    popular: true,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'phantom',
    name: 'Phantom',
    iconSrc: '/images/phan.png',
    emojiFallback: '👻',
    description: 'Solana ecosystem wallet',
    popular: false,
    color: 'from-purple-500 to-purple-600'
  }
]

export default function WalletModal({
  onClose,
  onConnectWalletConnect,
  onConnectMetaMask,
  onConnectPhantom,
  wallets,
}: Props) {
  const isMobile = useIsMobile()

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  const handleWalletClick = (walletId: string) => {
    switch (walletId) {
      case 'metamask':
        onConnectMetaMask()
        break
      case 'phantom':
        onConnectPhantom()
        break
      case 'walletconnect':
        onConnectWalletConnect()
        break
    }
  }

  const isWalletAvailable = (walletId: string) => {
    if (typeof window === 'undefined') return false
    
    switch (walletId) {
      case 'metamask':
        return !!(window as any).ethereum?.isMetaMask || !!(window as any).ethereum
      case 'phantom':
        return !!(window as any).phantom?.solana?.isPhantom
      case 'walletconnect':
        return true // WalletConnect always available
      default:
        return true
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-20 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[1] cursor-pointer"
          onClick={onClose}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onClose()
            }
          }}
          aria-label="Close wallet modal"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1]
          }}
          className={`relative bg-background/95 backdrop-blur-sm border border-border rounded-2xl shadow-2xl w-full z-[2] ${
            isMobile ? 'max-w-sm mt-4' : 'max-w-md mt-8'
          } overflow-hidden`}
          onClick={(e) => e.stopPropagation()} // Prevent click from propagating to backdrop
        >
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-secondary/20 rounded-2xl" />
          
          {/* Content */}
          <div className="relative bg-background/95 backdrop-blur-sm rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Connect Wallet</h2>
                  <p className="text-sm text-muted-foreground">Choose your wallet</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-lg hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Security Badge */}
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border/50">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-xs text-muted-foreground">
                  Secure connection • Your data stays private
                </span>
              </div>
            </div>

            {/* Wallet List */}
            <div className="px-6 pb-6">
              <div className="space-y-2">
                {walletOptions.map((wallet) => {
                  const isAvailable = isWalletAvailable(wallet.id)
                  
                  return (
                    <motion.div
                      key={wallet.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 ${
                          !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => isAvailable && handleWalletClick(wallet.id)}
                      >
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${wallet.color} rounded-lg flex items-center justify-center overflow-hidden`}>
                              {wallet.iconSrc ? (
                                <Image
                                  src={wallet.iconSrc}
                                  alt={wallet.name}
                                  width={36}
                                  height={36}
                                  className="object-contain"
                                />
                              ) : (
                                <span className="text-lg">{wallet.emojiFallback ?? '💼'}</span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{wallet.name}</span>
                                {wallet.popular && (
                                  <Badge variant="secondary" className="text-xs">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {wallet.description}
                              </p>
                            </div>
                          </div>
                          
                          {!isAvailable && (
                            <Badge variant="outline" className="text-xs">
                              Not installed
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-muted/30 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                By connecting, you agree to our{' '}
                <a href="/terms-and-conditions" className="text-primary hover:underline">
                  Terms
                </a>{' '}
                and{' '}
                <a href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
