"use client"

import { useState, useEffect } from "react"
import RecentActivity from "@/components/recent-activity"
import type { MatchData } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface MatchesData {
  matches: MatchData[]
  puuid: string
}

export default function MatchesPage() {
  const [matchesData, setMatchesData] = useState<MatchesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatchesData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/matches")
        if (!response.ok) {
          throw new Error("Error al cargar la actividad")
        }

        const data = await response.json()
        setMatchesData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchMatchesData()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="container mx-auto px-6 py-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="bg-white p-6 rounded-full shadow-lg mb-4">
              <Loader2 className="h-8 w-8 animate-spin text-stone-500" />
            </div>
            <p className="text-stone-600">Cargando actividad...</p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto">
            <Alert variant="destructive" className="border-0 bg-red-50 shadow-lg rounded-2xl">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {matchesData && !loading && <RecentActivity matches={matchesData.matches} puuid={matchesData.puuid} />}
      </div>
    </main>
  )
}
