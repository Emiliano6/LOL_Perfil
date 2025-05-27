const RIOT_API_KEY = process.env.RIOT_API_KEY
const BASE_URL = "https://americas.api.riotgames.com"
const REGION_URL = "https://la1.api.riotgames.com"

export async function getAccountByRiotId(gameName: string, tagLine: string) {
  const response = await fetch(
    `${BASE_URL}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${RIOT_API_KEY}`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch account data")
  }

  return response.json()
}

export async function getSummonerByPuuid(puuid: string) {
  const response = await fetch(`${REGION_URL}/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`)

  if (!response.ok) {
    throw new Error("Failed to fetch summoner data")
  }

  return response.json()
}

export async function getRankedData(summonerId: string) {
  const response = await fetch(`${REGION_URL}/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`)

  if (!response.ok) {
    throw new Error("Failed to fetch ranked data")
  }

  return response.json()
}

export async function getMatchHistory(puuid: string, count = 20) {
  const response = await fetch(
    `${BASE_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${RIOT_API_KEY}`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch match history")
  }

  return response.json()
}

export async function getMatchDetails(matchId: string) {
  const response = await fetch(`${BASE_URL}/lol/match/v5/matches/${matchId}?api_key=${RIOT_API_KEY}`)

  if (!response.ok) {
    throw new Error("Failed to fetch match details")
  }

  return response.json()
}
