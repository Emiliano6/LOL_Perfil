"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChevronRight, Zap } from "lucide-react"
import MatchDetailsModal from "./match-details-modal"
import type { MatchData } from "@/lib/types"

interface RecentActivityProps {
  matches: MatchData[]
  puuid: string
}

export default function RecentActivity({ matches, puuid }: RecentActivityProps) {
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null)
  const [hoveredMatch, setHoveredMatch] = useState<string | null>(null)

  const getQueueName = (queueId: number) => {
    const queueNames: { [key: number]: string } = {
      420: "Ranked Solo",
      440: "Ranked Flex",
      450: "ARAM",
      400: "Normal",
      430: "Normal",
    }
    return queueNames[queueId] || "Game"
  }

  const formatDate = (timestamp: number) => {
    const now = new Date()
    const matchDate = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - matchDate.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Hace unos minutos"
    if (diffInHours < 24) return `Hace ${diffInHours}h`
    if (diffInHours < 48) return "Ayer"
    return matchDate.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m`
  }

  const getKDA = (participant: any) => {
    if (participant.deaths === 0) return "Perfect"
    return ((participant.kills + participant.assists) / participant.deaths).toFixed(1)
  }

  const getKDAColor = (kda: string | number) => {
    if (kda === "Perfect") return "text-purple-600"
    const kdaNum = typeof kda === "string" ? Number.parseFloat(kda) : kda
    if (kdaNum >= 3) return "text-green-600"
    if (kdaNum >= 2) return "text-blue-600"
    if (kdaNum >= 1.5) return "text-yellow-600"
    return "text-red-500"
  }

  return (
    <div className="max-w-md mx-auto space-y-3">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-stone-900 mb-1">Actividad Reciente</h2>
        <p className="text-sm text-stone-500">Últimas 10 partidas</p>
      </div>

      {matches.slice(0, 10).map((match, index) => {
        const participant = match.info.participants.find((p) => p.puuid === puuid)
        if (!participant) return null

        const kda = getKDA(participant)
        const isHovered = hoveredMatch === match.metadata.matchId

        return (
          <Card
            key={match.metadata.matchId}
            className={`border-0 shadow-sm rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform ${
              participant.win
                ? "bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100"
                : "bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100"
            } ${isHovered ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01] hover:shadow-md"}`}
            onClick={() => setSelectedMatch(match)}
            onMouseEnter={() => setHoveredMatch(match.metadata.matchId)}
            onMouseLeave={() => setHoveredMatch(null)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${participant.championName}.png`}
                      alt={participant.championName}
                      className={`w-12 h-12 rounded-full border-2 border-white shadow-sm transition-transform duration-200 ${
                        isHovered ? "scale-110" : ""
                      }`}
                      width={48}
                      height={48}
                    />
                    {participant.win && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Zap className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{participant.championName}</p>
                    <p className="text-xs text-stone-600">{getQueueName(match.info.queueId)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <Badge
                      variant={participant.win ? "default" : "destructive"}
                      className={`text-xs mb-1 transition-all duration-200 ${
                        participant.win ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                      } ${isHovered ? "scale-105" : ""}`}
                    >
                      {participant.win ? "W" : "L"}
                    </Badge>
                    <p className="text-xs text-stone-500">{formatDate(match.info.gameCreation)}</p>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 text-stone-400 transition-transform duration-200 ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-medium text-stone-700">
                    {participant.kills}/{participant.deaths}/{participant.assists}
                  </span>
                  <span className={`font-semibold ${getKDAColor(kda)}`}>{kda} KDA</span>
                  <div className="flex items-center space-x-1 text-stone-500">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{formatDuration(match.info.gameDuration)}</span>
                  </div>
                </div>
              </div>

              {/* Preview of other players */}
              <div className="border-t border-stone-200 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-3 w-3 text-stone-500" />
                    <span className="text-xs text-stone-600">10 jugadores</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {match.info.participants.slice(0, 5).map((player, playerIndex) => (
                      <img
                        key={playerIndex}
                        src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${player.championName}.png`}
                        alt={player.championName}
                        className={`w-5 h-5 rounded-full border border-stone-200 transition-transform duration-200 ${
                          isHovered ? "scale-110" : ""
                        }`}
                        width={20}
                        height={20}
                      />
                    ))}
                    <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center">
                      <span className="text-xs text-stone-600">+5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover indicator */}
              <div
                className={`mt-2 text-center transition-opacity duration-200 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-xs text-stone-500">Click para ver detalles</p>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Match Details Modal */}
      <MatchDetailsModal
        match={selectedMatch!}
        userPuuid={puuid}
        isOpen={!!selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </div>
  )
}
