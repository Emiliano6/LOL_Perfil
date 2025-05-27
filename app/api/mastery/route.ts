import { NextResponse } from "next/server"
import { getAccountByRiotId } from "@/lib/riot-api"

const RIOT_API_KEY = process.env.RIOT_API_KEY
const REGION_URL = "https://la1.api.riotgames.com"

export async function GET() {
  try {
    // Obtener datos de la cuenta
    const accountData = await getAccountByRiotId("emo", "ysl")

    // Obtener top 3 maestría de campeones usando PUUID
    const masteryResponse = await fetch(
      `${REGION_URL}/lol/champion-mastery/v4/champion-masteries/by-puuid/${accountData.puuid}/top?api_key=${RIOT_API_KEY}`,
    )

    if (!masteryResponse.ok) {
      throw new Error("Failed to fetch mastery data")
    }

    const masteryData = await masteryResponse.json()

    return NextResponse.json({
      mastery: masteryData.slice(0, 3), // Solo top 3
    })
  } catch (error) {
    console.error("Error fetching mastery data:", error)
    return NextResponse.json({ error: "Failed to fetch mastery data" }, { status: 500 })
  }
}
