import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

// Alchemy API untuk real-time Ethereum data
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || 'demo'
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

// CoinGecko API untuk price data
const COINGECKO_API = 'https://api.coingecko.com/api/v3'

async function getETHBalance(address: string): Promise<string> {
  try {
    const response = await fetch(ALCHEMY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [address, 'latest'],
        id: 1
      })
    })

    const data = await response.json()
    const balanceWei = data.result
    const balanceEth = ethers.formatEther(balanceWei)
    
    return parseFloat(balanceEth).toFixed(4)
  } catch (error) {
    console.error('Error fetching ETH balance:', error)
    return '0.0000'
  }
}

async function getETHPrice(): Promise<{ price: number, change24h: number }> {
  try {
    const response = await fetch(`${COINGECKO_API}/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true`)
    const data = await response.json()
    
    return {
      price: data.ethereum.usd,
      change24h: data.ethereum.usd_24h_change
    }
  } catch (error) {
    console.error('Error fetching ETH price:', error)
    return { price: 0, change24h: 0 }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address is required' },
        { status: 400 }
      )
    }

    // Fetch real-time data
    const [balance, priceData] = await Promise.all([
      getETHBalance(address),
      getETHPrice()
    ])

    const usdValue = (parseFloat(balance) * priceData.price).toFixed(2)
    const change24h = priceData.change24h >= 0 ? `+${priceData.change24h.toFixed(2)}%` : `${priceData.change24h.toFixed(2)}%`

    return NextResponse.json({
      success: true,
      data: {
        eth: balance,
        usd: `$${usdValue}`,
        change24h: change24h
      }
    })

  } catch (error) {
    console.error('Wallet balance error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch balance' },
      { status: 500 }
    )
  }
}