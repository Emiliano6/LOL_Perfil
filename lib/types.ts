export interface SummonerData {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
}

export interface RankedData {
  leagueId: string
  queueType: string
  tier: string
  rank: string
  summonerId: string
  summonerName: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
}

export interface ChampionMasteryData {
  championId: number
  championLevel: number
  championPoints: number
  lastPlayTime: number
  championPointsSinceLastLevel: number
  championPointsUntilNextLevel: number
  chestGranted: boolean
  tokensEarned: number
  summonerId: string
}

export interface MatchData {
  metadata: {
    matchId: string
    participants: string[]
  }
  info: {
    gameCreation: number
    gameDuration: number
    gameMode: string
    gameType: string
    queueId: number
    participants: ParticipantData[]
  }
}

export interface ParticipantData {
  puuid: string
  summonerName: string
  championName: string
  kills: number
  deaths: number
  assists: number
  win: boolean
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  goldEarned: number
  totalDamageDealtToChampions: number
  totalDamageTaken: number
  visionScore: number
  champLevel: number
  totalMinionsKilled: number
  neutralMinionsKilled: number
}

export interface AccountData {
  puuid: string
  gameName: string
  tagLine: string
}

export interface EloHistoryEntry {
  date: string
  tier: string
  rank: string
  lp: number
  change: number
}
