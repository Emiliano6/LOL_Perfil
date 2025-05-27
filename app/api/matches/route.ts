import { NextResponse } from "next/server"
import { getAccountByRiotId, getMatchHistory, getMatchDetails } from "@/lib/riot-api"

export async function GET() {
  try {
    // Obtener datos de la cuenta con tus datos específicos
    const accountData = await getAccountByRiotId("emo", "ysl")

    // Obtener historial de partidas
    const matchIds = await getMatchHistory(accountData.puuid, 10)

    // Obtener detalles de cada partida
    const matchDetails = await Promise.all(matchIds.map((matchId: string) => getMatchDetails(matchId)))

    return NextResponse.json({
      matches: matchDetails,
      puuid: accountData.puuid,
    })
  } catch (error) {
    console.error("Error fetching match data:", error)
    return NextResponse.json({ error: "Failed to fetch match data" }, { status: 500 })
  }
}
