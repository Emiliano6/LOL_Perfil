"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Sword, Shield, Coins, Clock } from "lucide-react"
import type { MatchData, ParticipantData } from "@/lib/types"

interface MatchDetailsModalProps {
  match: MatchData
  userPuuid: string
  isOpen: boolean
  onClose: () => void
}

export default function MatchDetailsModal({ match, userPuuid, isOpen, onClose }: MatchDetailsModalProps) {
  if (!isOpen) return null

  const userParticipant = match.info.participants.find((p) => p.puuid === userPuuid)
  const team1 = match.info.participants.slice(0, 5)
  const team2 = match.info.participants.slice(5, 10)

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getItemImage = (itemId: number) => {
    if (itemId === 0) return null
    return `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/${itemId}.png`
  }

  const TeamDisplay = ({
    team,
    teamName,
    isWinning,
  }: { team: ParticipantData[]; teamName: string; isWinning: boolean }) => (
    <div className={`rounded-2xl p-4 ${isWinning ? "bg-green-50" : "bg-red-50"}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-stone-900">{teamName}</h4>
        <Badge variant={isWinning ? "default" : "destructive"} className="text-xs">
          {isWinning ? "Victoria" : "Derrota"}
        </Badge>
      </div>

      <div className="space-y-2">
        {team.map((participant, index) => {
          const isUser = participant.puuid === userPuuid
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded-xl transition-all duration-200 ${
                isUser ? "bg-white/80 border-2 border-stone-300" : "bg-white/40"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${participant.championName}.png`}
                    alt={participant.championName}
                    className="w-8 h-8 rounded-full"
                    width={32}
                    height={32}
                  />
                  {isUser && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                  )}
                </div>
                <div>
                  <p className={`text-sm font-medium ${isUser ? "text-blue-600" : "text-stone-700"}`}>
                    {participant.championName}
                  </p>
                  <p className="text-xs text-stone-500">
                    {participant.kills}/{participant.deaths}/{participant.assists}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {[
                  participant.item0,
                  participant.item1,
                  participant.item2,
                  participant.item3,
                  participant.item4,
                  participant.item5,
                ].map((itemId, itemIndex) => {
                  const itemImage = getItemImage(itemId)
                  return (
                    <div key={itemIndex} className="w-5 h-5 bg-stone-200 rounded border">
                      {itemImage && (
                        <img
                          src={itemImage || "/placeholder.svg"}
                          alt="Item"
                          className="w-full h-full rounded"
                          width={20}
                          height={20}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-0 shadow-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${userParticipant?.championName}.png`}
                alt={userParticipant?.championName}
                className="w-12 h-12 rounded-full border-2 border-stone-300"
                width={48}
                height={48}
              />
              <div>
                <h3 className="text-xl font-bold text-stone-900">{userParticipant?.championName}</h3>
                <p className="text-stone-600">Detalles de la partida</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors duration-200">
              <X className="h-5 w-5 text-stone-500" />
            </button>
          </div>

          {/* Match Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-stone-50 rounded-xl p-3 text-center">
              <Clock className="h-5 w-5 text-stone-500 mx-auto mb-1" />
              <p className="text-sm font-semibold text-stone-900">{formatDuration(match.info.gameDuration)}</p>
              <p className="text-xs text-stone-500">Duración</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 text-center">
              <Sword className="h-5 w-5 text-red-500 mx-auto mb-1" />
              <p className="text-sm font-semibold text-stone-900">
                {userParticipant?.kills}/{userParticipant?.deaths}/{userParticipant?.assists}
              </p>
              <p className="text-xs text-stone-500">KDA</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 text-center">
              <Coins className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
              <p className="text-sm font-semibold text-stone-900">{formatNumber(userParticipant?.goldEarned || 0)}</p>
              <p className="text-xs text-stone-500">Oro</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-3 text-center">
              <Shield className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-sm font-semibold text-stone-900">
                {formatNumber(userParticipant?.totalDamageDealtToChampions || 0)}
              </p>
              <p className="text-xs text-stone-500">Daño</p>
            </div>
          </div>

          {/* Teams */}
          <div className="space-y-4">
            <TeamDisplay team={team1} teamName="Equipo Azul" isWinning={team1[0]?.win || false} />
            <TeamDisplay team={team2} teamName="Equipo Rojo" isWinning={team2[0]?.win || false} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
