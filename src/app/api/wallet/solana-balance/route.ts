import { NextRequest, NextResponse } from 'next/server'
import { Connection, PublicKey } from '@solana/web3.js'

// Solana Mainnet RPC
const SOLANA_RPC_URL = 'https://api.mainnet-beta.solana.com'
// CoinGecko API untuk harga SOL
const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price'

// Cache untuk menyimpan data harga (update setiap 5 menit)
let solPriceCache: { sol_usd: number; timestamp: number } | null = null

// Fungsi untuk mendapatkan harga SOL ke USD
async function getSOLPrice(): Promise<number> {
  try {
    // Check cache
    if (solPriceCache && Date.now() - solPriceCache.timestamp < 5 * 60 * 1000) {
      return solPriceCache.sol_usd
    }

    const response = await fetch(`${COINGECKO_API}?ids=solana&vs_currencies=usd&include_24hr_change=true`)
    const data = await response.json()
    
    if (data.solana?.usd) {
      solPriceCache = {
        sol_usd: data.solana.usd,
        timestamp: Date.now()
      }
      return data.solana.usd
    }
    
    throw new Error('Failed to fetch SOL price')
  } catch (error) {
    console.error('SOL Price API Error:', error)
    // Fallback harga
    return 100 // Default fallback price
  }
}

// Fungsi untuk mendapatkan balance dari Solana blockchain
async function getSolanaBalance(address: string): Promise<{ sol: string; usd: string; change24h: string }> {
  try {
    // Validasi address
    try {
      new PublicKey(address)
    } catch (error) {
      throw new Error('Invalid Solana address')
    }

    // Buat koneksi ke Solana Mainnet
    const connection = new Connection(SOLANA_RPC_URL, 'confirmed')
    
    // Get balance in lamports
    const balanceLamports = await connection.getBalance(new PublicKey(address))
    
    // Convert to SOL (1 SOL = 1,000,000,000 lamports)
    const balanceSol = balanceLamports / 1_000_000_000
    
    // Get SOL price in USD
    const solPrice = await getSOLPrice()
    
    // Calculate USD value
    const usdValue = balanceSol * solPrice
    
    // Get 24h change dari CoinGecko
    let change24h = '+0.00%'
    try {
      const priceResponse = await fetch(`${COINGECKO_API}?ids=solana&vs_currencies=usd&include_24hr_change=true`)
      const priceData = await priceResponse.json()
      if (priceData.solana?.usd_24h_change !== undefined) {
        change24h = `${priceData.solana.usd_24h_change >= 0 ? '+' : ''}${priceData.solana.usd_24h_change.toFixed(2)}%`
      }
    } catch (error) {
      console.error('SOL 24h change error:', error)
    }
    
    return {
      sol: balanceSol.toFixed(4),
      usd: `$${usdValue.toFixed(2)}`,
      change24h: change24h
    }
    
  } catch (error) {
    console.error('Solana balance fetch error:', error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json({ 
        success: false,
        error: 'Address is required' 
      }, { status: 400 })
    }

    // Get real balance dari Solana blockchain
    const balance = await getSolanaBalance(address)

    return NextResponse.json({
      success: true,
      data: balance,
      address: address,
      network: 'solana',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Solana Balance API Error:', error)
    
    // Return error dengan detail
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Solana balance',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}