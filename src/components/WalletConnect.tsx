'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import SignClient from '@walletconnect/sign-client'
import WalletModal from './WalletModal'
import WalletDisconnect from './WalletDisconnect'

export default function WalletConnect({ isMobileMenu = false }: { isMobileMenu?: boolean }) {
  const [address, setAddress] = useState<string | null>(null)
  const [walletType, setWalletType] = useState<'ethereum' | 'solana' | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [availableWallets, setAvailableWallets] = useState<string[]>([])

  const projectId = 'ec13e48dee96b5ac6e2567b1b03c54f1' // Ganti dengan Project ID kamu

  // 🔍 Deteksi wallet yang tersedia di browser
  useEffect(() => {
    const detected: string[] = []
    
    // Deteksi untuk mobile environment
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (typeof window !== 'undefined') {
      // MetaMask detection
      if ((window as any).ethereum?.isMetaMask) {
        detected.push('MetaMask')
      } else if ((window as any).ethereum) {
        detected.push('MetaMask')
      }
      
      // Phantom detection  
      if ((window as any).phantom?.solana?.isPhantom) {
        detected.push('Phantom')
      }
      
      // Untuk mobile, tambahkan opsi deep link
      if (isMobile) {
        if (!detected.includes('MetaMask')) {
          detected.push('MetaMask')
        }
        if (!detected.includes('Phantom')) {
          detected.push('Phantom')
        }
      }
    }
    
    // WalletConnect selalu tersedia
    detected.push('WalletConnect')
    
    setAvailableWallets(detected)
  }, [])

  // 🔗 Connect dengan MetaMask
  const connectMetaMask = async () => {
    try {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      if (isMobile && !(window as any).ethereum) {
        // Untuk mobile tanpa MetaMask installed, buka deep link
        const deepLink = 'https://metamask.app/dapp/' + window.location.hostname
        window.open(deepLink, '_blank')
        return
      }
      
      if (!window.ethereum) {
        alert('MetaMask belum terpasang! Silakan install MetaMask terlebih dahulu.')
        return
      }
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAddress(accounts[0])
      setWalletType('ethereum')
      setIsModalOpen(false)
    } catch (err) {
      console.error('MetaMask connection error:', err)
      alert('Gagal terhubung ke MetaMask. Silakan coba lagi.')
    }
  }

  // 🔗 Connect dengan Phantom
  const connectPhantom = async () => {
    try {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const provider = (window as any).phantom?.solana
      
      if (isMobile && !provider?.isPhantom) {
        // Untuk mobile tanpa Phantom installed, buka deep link
        const deepLink = 'https://phantom.app/ul/browse/' + window.location.hostname + '?ref=' + window.location.hostname
        window.open(deepLink, '_blank')
        return
      }
      
      if (!provider?.isPhantom) {
        alert('Phantom Wallet belum terpasang! Silakan install Phantom Wallet terlebih dahulu.')
        return
      }
      
      const resp = await provider.connect()
      setAddress(resp.publicKey.toString())
      setWalletType('solana')
      setIsModalOpen(false)
    } catch (err) {
      console.error('Phantom connection error:', err)
      alert('Gagal terhubung ke Phantom Wallet. Silakan coba lagi.')
    }
  }

  // 🔗 Connect via WalletConnect (QR)
  const connectWalletConnect = async () => {
    try {
      setConnecting(true)
      const client = await SignClient.init({
        projectId: projectId,
        metadata: {
          name: 'Flow AI',
          description: 'AI Trading Platform',
          url: 'https://flow-ai.fun',
          icons: ['https://walletconnect.com/walletconnect-logo.png'],
        },
      })

      const { uri, approval } = await client.connect({
        requiredNamespaces: {
          eip155: {
            methods: ['eth_sendTransaction', 'personal_sign'],
            chains: ['eip155:1'],
            events: ['accountsChanged', 'chainChanged'],
          },
        },
      })

      if (uri) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        
        if (isMobile) {
          // Untuk mobile, buka universal link
          window.open(`https://walletconnect.com/wc?uri=${encodeURIComponent(uri)}`, '_blank')
        } else {
          // Untuk desktop, buka QR page
          window.open(`https://walletconnect.com/wc?uri=${encodeURIComponent(uri)}`, '_blank')
        }
      }

      const session = await approval()
      const addr = session.namespaces.eip155.accounts[0].split(':')[2]
      setAddress(addr)
      setWalletType('ethereum')
      setIsModalOpen(false)
    } catch (err) {
      console.error('WalletConnect Error:', err)
      alert('Gagal konek WalletConnect. Silakan coba lagi.')
    } finally {
      setConnecting(false)
    }
  }

  const disconnect = () => {
    setAddress(null)
    setWalletType(null)
  }

  const handleRefresh = () => {
    // Refresh logic bisa ditambahkan di sini
    console.log('Refreshing wallet data...')
  }

  return (
    <>
      {address ? (
        <WalletDisconnect 
          address={address} 
          walletType={walletType}
          onDisconnect={disconnect}
          onRefresh={handleRefresh}
        />
      ) : (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsModalOpen(true)}
            disabled={connecting}
            className={cn(
              "flex items-center gap-2 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl",
              isMobileMenu 
                ? "w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3 hover:scale-[1.02]"
                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 hover:scale-[1.02]"
            )}
          >
            <Wallet size={isMobileMenu ? 20 : 18} />
            <div className="text-left">
              {isMobileMenu ? (
                <>
                  <div className="text-sm font-medium">Connect Wallet</div>
                  <p className="text-xs opacity-90">Connect your wallet to continue</p>
                </>
              ) : (
                <span className="text-sm font-medium">{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
              )}
            </div>
          </Button>
        </div>
      )}

      {isModalOpen && (
        <WalletModal
          wallets={availableWallets}
          onClose={() => setIsModalOpen(false)}
          onConnectWalletConnect={connectWalletConnect}
          onConnectMetaMask={connectMetaMask}
          onConnectPhantom={connectPhantom}
        />
      )}
    </>
  )
}