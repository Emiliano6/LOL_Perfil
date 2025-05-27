"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Star, Trophy } from "lucide-react"
import type { ChampionMasteryData } from "@/lib/types"
import { championIdToName } from "@/lib/champion-data"

interface ChampionMasteryProps {
  mastery: ChampionMasteryData[]
}

export default function ChampionMastery({ mastery }: ChampionMasteryProps) {
  const formatPoints = (points: number) => {
    if (points >= 1000000) return `${(points / 1000000).toFixed(1)}M`
    if (points >= 1000) return `${(points / 1000).toFixed(0)}k`
    return points.toString()
  }

  const getChampionName = (championId: number) => {
    return championIdToName[championId] || "Unknown"
  }

  const getMasteryIcon = (index: number) => {
    if (index === 0) return Crown
    if (index === 1) return Trophy
    return Star
  }

  const getMasteryColor = (index: number) => {
    if (index === 0) return "text-yellow-500"
    if (index === 1) return "text-gray-400"
    return "text-amber-600"
  }

  // Fallback data si no hay datos de la API
  const fallbackMastery = [
    { championId: 200, championPoints: 374848, championLevel: 34 },
    { championId: 10, championPoints: 68500, championLevel: 9 },
    { championId: 523, championPoints: 67020, championLevel: 9 },
  ]

  const masteryData = mastery.length > 0 ? mastery.slice(0, 3) : fallbackMastery

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden mt-6">
      <CardHeader className="bg-gradient-to-br from-stone-100 to-stone-200 p-6">
        <CardTitle className="text-lg font-semibold text-stone-900 flex items-center space-x-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          <span>Top Campeones</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {masteryData.map((champion, index) => {
            const championName = getChampionName(champion.championId)
            const IconComponent = getMasteryIcon(index)
            const iconColor = getMasteryColor(index)

            return (
              <div
                key={champion.championId}
                className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl hover:bg-stone-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${championName}.png`}
                      alt={championName}
                      className="w-12 h-12 rounded-full border-2 border-stone-300"
                      width={48}
                      height={48}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                      }}
                    />
                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                      <IconComponent className={`h-3 w-3 ${iconColor}`} />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">{championName}</p>
                    <p className="text-sm text-stone-600">Nivel {champion.championLevel}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-stone-900">{formatPoints(champion.championPoints)}</p>
                  <p className="text-xs text-stone-500">puntos</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
