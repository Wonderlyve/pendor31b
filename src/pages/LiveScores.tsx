import React from 'react';
import { Clock, Activity } from 'lucide-react';

export default function LiveScores() {
  const liveMatches = [
    { id: 1, competition: "Ligue 1", team1: "PSG", team2: "Lyon", score1: 2, score2: 1, time: "73'", status: "En cours" },
    { id: 2, competition: "Ligue 1", team1: "Marseille", team2: "Monaco", score1: 1, score2: 1, time: "55'", status: "En cours" },
    { id: 3, competition: "Ligue 1", team1: "Nice", team2: "Rennes", time: "21:00", status: "À venir" },
    { id: 4, competition: "Ligue 1", team1: "Lille", team2: "Nantes", time: "19:00", status: "À venir" },
    { id: 5, competition: "Ligue 1", team1: "Toulouse", team2: "Strasbourg", time: "17:00", status: "À venir" },
    { id: 6, competition: "Premier League", team1: "Arsenal", team2: "Liverpool", score1: 0, score2: 0, time: "12'", status: "En cours" },
    { id: 7, competition: "Premier League", team1: "Manchester City", team2: "Chelsea", score1: 2, score2: 0, time: "40'", status: "En cours" },
    { id: 8, competition: "Premier League", team1: "Tottenham", team2: "Everton", time: "18:30", status: "À venir" },
    { id: 9, competition: "Premier League", team1: "Newcastle", team2: "West Ham", time: "16:00", status: "À venir" },
    { id: 10, competition: "Premier League", team1: "Brighton", team2: "Aston Villa", time: "14:00", status: "À venir" },
    { id: 11, competition: "La Liga", team1: "Real Madrid", team2: "Barcelona", time: "20:45", status: "À venir" },
    { id: 12, competition: "La Liga", team1: "Atletico Madrid", team2: "Sevilla", time: "22:00", status: "À venir" },
    { id: 13, competition: "La Liga", team1: "Valence", team2: "Real Sociedad", time: "19:30", status: "À venir" },
    { id: 14, competition: "La Liga", team1: "Betis", team2: "Villarreal", time: "17:15", status: "À venir" },
    { id: 15, competition: "La Liga", team1: "Getafe", team2: "Osasuna", time: "12:00", status: "À venir" },
  ];

  const groupedMatches = liveMatches.reduce((groups, match) => {
    const { competition } = match;
    if (!groups[competition]) {
      groups[competition] = [];
    }
    groups[competition].push(match);
    return groups;
  }, {});

  return (
    <div className="max-w-xl mx-auto p-2 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Matchs en Direct</h1>
      {Object.keys(groupedMatches).map(competition => (
        <div key={competition} className="mb-4">
          <h2 className="text-lg font-semibold bg-blue-600 text-white py-1 px-3 rounded">{competition}</h2>
          <div className="overflow-hidden mt-1">
            {groupedMatches[competition].map(match => (
              <div key={match.id} className="flex items-center justify-between p-2 bg-white hover:bg-gray-50">
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{match.team1}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {match.status === "En cours" ? (
                    <>
                      <span className="text-red-500 font-bold text-sm">{match.score1} - {match.score2}</span>
                      <span className="flex items-center text-xs text-gray-600">
                        <Activity className="h-3 w-3 mr-1 animate-pulse" /> {match.time}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-gray-600">{match.status}</span>
                  )}
                </div>
                <div className="flex-1 text-right">
                  <p className="font-medium text-sm">{match.team2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
