"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, Award } from "lucide-react"

interface ProfileStatsProps {
  ranked: any[]
}

export default function ProfileStats({ ranked }: ProfileStatsProps) {
  const soloQueueData = ranked.find((r) => r.queueType === "RANKED_SOLO_5x5")

  if (!soloQueueData) return null

  const totalGames = soloQueueData.wins + soloQueueData.losses
  const winRate = Math.round((soloQueueData.wins / totalGames) * 100)

  const getWinRateColor = (rate: number) => {
    if (rate >= 70) return "text-green-600"
    if (rate >= 60) return "text-blue-600"
    if (rate >= 50) return "text-yellow-600"
    return "text-red-500"
  }

  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <Card className="bg-stone-50 border-0 rounded-2xl">
        <CardContent className="p-4 text-center">
          <TrendingUp className="h-5 w-5 text-stone-600 mx-auto mb-2" />
          <p className={`text-lg font-bold ${getWinRateColor(winRate)}`}>{winRate}%</p>
          <p className="text-xs text-stone-500">Win Rate</p>
        </CardContent>
      </Card>

      <Card className="bg-stone-50 border-0 rounded-2xl">
        <CardContent className="p-4 text-center">
          <Target className="h-5 w-5 text-stone-600 mx-auto mb-2" />
          <p className="text-lg font-bold text-stone-900">{totalGames}</p>
          <p className="text-xs text-stone-500">Partidas</p>
        </CardContent>
      </Card>

      <Card className="bg-stone-50 border-0 rounded-2xl">
        <CardContent className="p-4 text-center">
          <Award className="h-5 w-5 text-stone-600 mx-auto mb-2" />
          <p className="text-lg font-bold text-stone-900">{soloQueueData.wins}</p>
          <p className="text-xs text-stone-500">Victorias</p>
        </CardContent>
      </Card>
    </div>
  )
}
