import { NextRequest, NextResponse } from 'next/server'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'

// Solana RPC connection
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || clusterApiUrl('mainnet-beta')

// CoinGecko API untuk price data
const COINGECKO_API = 'https://api.coingecko.com/api/v3'

async function getSOLBalance(address: string): Promise<string> {
  try {
    const connection = new Connection(SOLANA_RPC_URL)
    const publicKey = new PublicKey(address)
    const balance = await connection.getBalance(publicKey)
    
    // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
    const balanceSol = balance / 1_000_000_000
    
    return balanceSol.toFixed(4)
  } catch (error) {
    console.error('Error fetching SOL balance:', error)
    return '0.0000'
  }
}

async function getSOLPrice(): Promise<{ price: number, change24h: number }> {
  try {
    const response = await fetch(`${COINGECKO_API}/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true`)
    const data = await response.json()
    
    return {
      price: data.solana.usd,
      change24h: data.solana.usd_24h_change
    }
  } catch (error) {
    console.error('Error fetching SOL price:', error)
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
      getSOLBalance(address),
      getSOLPrice()
    ])

    const usdValue = (parseFloat(balance) * priceData.price).toFixed(2)
    const change24h = priceData.change24h >= 0 ? `+${priceData.change24h.toFixed(2)}%` : `${priceData.change24h.toFixed(2)}%`

    return NextResponse.json({
      success: true,
      data: {
        sol: balance,
        usd: `$${usdValue}`,
        change24h: change24h
      }
    })

  } catch (error) {
    console.error('Solana wallet balance error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch balance' },
      { status: 500 }
    )
  }
}