"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star, Trophy } from "lucide-react"
import type { SummonerData, RankedData, ChampionMasteryData, MatchData } from "@/lib/types"
import ProfileStats from "./profile-stats"
import ChampionMastery from "./champion-mastery"
import EloHistory from "./elo-history"

interface ProfileCardProps {
  summoner: SummonerData
  ranked: RankedData[]
}

export default function ProfileCard({ summoner, ranked }: ProfileCardProps) {
  const [mastery, setMastery] = useState<ChampionMasteryData[]>([])
  const [matches, setMatches] = useState<MatchData[]>([])
  const [loading, setLoading] = useState(true)

  const soloQueueData = ranked.find((r) => r.queueType === "RANKED_SOLO_5x5")

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        // Obtener maestría
        const masteryResponse = await fetch("/api/mastery")
        if (masteryResponse.ok) {
          const masteryData = await masteryResponse.json()
          setMastery(masteryData.mastery || [])
        }

        // Obtener partidas para el historial de ELO
        const matchesResponse = await fetch("/api/matches")
        if (matchesResponse.ok) {
          const matchesData = await matchesResponse.json()
          setMatches(matchesData.matches || [])
        }
      } catch (error) {
        console.error("Error fetching additional data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdditionalData()
  }, [])

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
    <div className="max-w-md mx-auto space-y-6">
      {/* Main Profile Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          {/* Header with gradient */}
          <div className="bg-gradient-to-br from-stone-100 to-stone-200 p-8 text-center">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-stone-300 to-stone-400 rounded-full blur-lg opacity-30"></div>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${summoner.profileIconId}.png`}
                alt="Profile"
                className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg"
                width={96}
                height={96}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=96&width=96"
                }}
              />
            </div>

            <h1 className="text-2xl font-bold text-stone-900 mb-1">emo</h1>
            <p className="text-stone-600 text-sm mb-3">emo#ysl</p>

            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 bg-white/60 px-3 py-1 rounded-full">
                <Star className="h-3 w-3 text-stone-500" />
                <span className="text-stone-700 font-medium">{summoner.summonerLevel}</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/60 px-3 py-1 rounded-full">
                <MapPin className="h-3 w-3 text-stone-500" />
                <span className="text-stone-700 font-medium">LAN</span>
              </div>
            </div>
          </div>

          {/* Solo Queue Stats Only */}
          <div className="p-6">
            {soloQueueData && (
              <div className="bg-stone-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-stone-600" />
                    <span className="text-sm font-medium text-stone-700">Ranked Solo</span>
                  </div>
                  <div className={`bg-gradient-to-r ${getRankColor(soloQueueData.tier)} px-3 py-1 rounded-full`}>
                    <span className="text-xs font-bold text-white">
                      {soloQueueData.tier} {soloQueueData.rank}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-stone-900">{soloQueueData.leaguePoints}</p>
                    <p className="text-xs text-stone-500">LP</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{soloQueueData.wins}</p>
                    <p className="text-xs text-stone-500">Wins</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-red-500">{soloQueueData.losses}</p>
                    <p className="text-xs text-stone-500">Losses</p>
                  </div>
                </div>
              </div>
            )}

            <ProfileStats ranked={ranked} />
          </div>
        </CardContent>
      </Card>

      {/* Top Champions */}
      <ChampionMastery mastery={mastery} />

      {/* ELO History */}
      {!loading && <EloHistory ranked={ranked} matches={matches} puuid={summoner.puuid} />}
    </div>
  )
}
