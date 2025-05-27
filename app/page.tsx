"use client"

import { useState, useEffect } from "react"
import ProfileCard from "@/components/profile-card"
import type { SummonerData, RankedData, AccountData } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface ProfileData {
  account: AccountData
  summoner: SummonerData
  ranked: RankedData[]
}

export default function HomePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/summoner")
      if (!response.ok) {
        throw new Error("Error al cargar los datos")
      }

      const data = await response.json()
      setProfileData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="container mx-auto px-6 py-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="bg-white p-6 rounded-full shadow-lg mb-4">
              <Loader2 className="h-8 w-8 animate-spin text-stone-500" />
            </div>
            <p className="text-stone-600">Cargando...</p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto">
            <Alert variant="destructive" className="border-0 bg-red-50 shadow-lg rounded-2xl">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {profileData && !loading && <ProfileCard summoner={profileData.summoner} ranked={profileData.ranked} />}
      </div>
    </main>
  )
}
