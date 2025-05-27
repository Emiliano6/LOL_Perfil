import { NextResponse } from "next/server"
import { getAccountByRiotId, getSummonerByPuuid, getRankedData } from "@/lib/riot-api"

export async function GET() {
  try {
    // Obtener datos de la cuenta con tus datos específicos
    const accountData = await getAccountByRiotId("emo", "ysl")

    // Obtener datos del summoner
    const summonerData = await getSummonerByPuuid(accountData.puuid)

    // Obtener datos de ranked
    const rankedData = await getRankedData(summonerData.id)

    return NextResponse.json({
      account: accountData,
      summoner: summonerData,
      ranked: rankedData,
    })
  } catch (error) {
    console.error("Error fetching summoner data:", error)
    return NextResponse.json({ error: "Failed to fetch summoner data" }, { status: 500 })
  }
}
