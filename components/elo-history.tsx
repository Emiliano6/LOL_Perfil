"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { RankedData, MatchData } from "@/lib/types"

interface EloHistoryProps {
  ranked: RankedData[]
  matches: MatchData[]
  puuid: string
}

export default function EloHistory({ ranked, matches, puuid }: EloHistoryProps) {
  const soloQueueData = ranked.find((r) => r.queueType === "RANKED_SOLO_5x5")

  if (!soloQueueData) return null

  // Simular historial de ELO basado en las últimas partidas
  const generateEloHistory = () => {
    const currentLP = soloQueueData.leaguePoints
    const history = []
    let simulatedLP = currentLP

    // Agregar entrada actual
    history.push({
      date: "Ahora",
      tier: soloQueueData.tier,
      rank: soloQueueData.rank,
      lp: currentLP,
      change: 0,
    })

    // Simular cambios basados en las últimas 5 partidas ranked
    const rankedMatches = matches
      .filter((match) => match.info.queueId === 420) // Solo ranked solo
      .slice(0, 5)

    rankedMatches.forEach((match, index) => {
      const participant = match.info.participants.find((p) => p.puuid === puuid)
      if (!participant) return

      const lpChange = participant.win ? Math.floor(Math.random() * 10) + 15 : -(Math.floor(Math.random() * 10) + 12)
      simulatedLP -= lpChange

      const date = new Date(match.info.gameCreation)
      history.push({
        date: date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" }),
        tier: soloQueueData.tier,
        rank: soloQueueData.rank,
        lp: Math.max(0, simulatedLP),
        change: lpChange,
      })
    })

    return history.reverse()
  }

  const eloHistory = generateEloHistory()

  const getRankColor = (tier: string) => {
    const colors: { [key: string]: string } = {
      IRON: "from-stone-400 to-stone-500",
      BRONZE: "from-amber-400 to-amber-500",
      SILVER: "from-gray-300 to-gray-400",
      GOLD: "from-yellow-300 to-yellow-400",
      PLATINUM: "from-cyan-300 to-cyan-400",
      EMERALD: "from-green-300 to-green-400",
      DIAMOND: "from-blue-300 to-blue-400",
      MASTER: "from-purple-300 to-purple-400",
      GRANDMASTER: "from-red-300 to-red-400",
      CHALLENGER: "from-yellow-200 to-orange-300",
    }
    return colors[tier] || "from-stone-300 to-stone-400"
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-stone-100 to-stone-200 p-6">
        <CardTitle className="text-lg font-semibold text-stone-900 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Historial de ELO</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {eloHistory.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className={`bg-gradient-to-r ${getRankColor(entry.tier)} px-2 py-1 rounded-lg`}>
                  <span className="text-xs font-bold text-white">
                    {entry.tier.charAt(0)}
                    {entry.rank}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">{entry.lp} LP</p>
                  <p className="text-xs text-stone-500">{entry.date}</p>
                </div>
              </div>

              {entry.change !== 0 && (
                <div className="flex items-center space-x-1">
                  {entry.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : entry.change < 0 ? (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <Minus className="h-4 w-4 text-stone-400" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      entry.change > 0 ? "text-green-600" : entry.change < 0 ? "text-red-600" : "text-stone-400"
                    }`}
                  >
                    {entry.change > 0 ? "+" : ""}
                    {entry.change}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
