import { TournamentData } from './types';

export const MOCK_DATA: Record<string, TournamentData> = {
  'ДФО': {
    table: [
      { rank: 1, teamName: 'Динамо-Владивосток', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 2, teamName: 'Академия Динамо', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 3, teamName: 'СКА-Хабаровск', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 4, teamName: 'Искра', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 5, teamName: 'СШОР №1', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 6, teamName: 'Сахалин', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 7, teamName: 'Рекорд', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 8, teamName: 'Благовещенск', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
    ],
    allMatches: [],
    dinamoMatches: [],
    recentMatches: [],
    nextMatch: null,
    dinamoStats: { rank: 1, points: 0, lastResults: [] },
    dinamoPlayers: [],
    logos: {}
  },
  'РЮФЛ': {
    table: [
      { rank: 1, teamName: 'Динамо-Владивосток', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 2, teamName: 'Ак. Динамо Владивосток', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 3, teamName: 'Атлетика Артём', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 4, teamName: 'Локомотив Уссурийск', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 5, teamName: 'Океан Находка', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 6, teamName: 'Старт Владивосток', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 7, teamName: 'Рекорд Уссурийск', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
      { rank: 8, teamName: 'Юный Динамовец Уссурийск', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, lastGames: [] },
    ],
    allMatches: [],
    dinamoMatches: [],
    recentMatches: [],
    nextMatch: null,
    dinamoStats: { rank: 1, points: 0, lastResults: [] },
    dinamoPlayers: [],
    logos: {
      'Старт Владивосток': 'https://i.ibb.co/3YfY2wxQ/image.png',
      'Атлетика Артём': 'https://i.ibb.co/zVHWXz6d/image.png',
      'Локомотив Уссурийск': 'https://i.ibb.co/rKmr6NSk/image.png',
      'Океан Находка': 'https://i.ibb.co/RkvnHgpN/image.png'
    }
  }
};
