export interface Team {
  id: string;
  name: string;
  logo: string;
  league: string;
}

export const teams: Team[] = [
  {
    id: "psg",
    name: "Paris Saint-Germain",
    logo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=60",
    league: "Ligue 1"
  },
  {
    id: "om",
    name: "Olympique de Marseille",
    logo: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=60",
    league: "Ligue 1"
  },
  {
    id: "ol",
    name: "Olympique Lyonnais",
    logo: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=60",
    league: "Ligue 1"
  },
  {
    id: "monaco",
    name: "AS Monaco",
    logo: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=60",
    league: "Ligue 1"
  }
];

export const betTypes = {
  "1X2": ["1", "X", "2"],
  "Double Chance": ["1X", "12", "X2"],
  "Les Deux Équipes Marquent": ["Oui", "Non"],
  "Over/Under 2.5": ["Over", "Under"],
  "Score Exact": ["1-0", "2-0", "2-1", "0-0", "1-1", "2-2", "0-1", "0-2", "1-2"],
  "Buteur": ["Premier", "Dernier", "À tout moment"],
  "Nombre de Corners": ["Over 9.5", "Under 9.5"],
  "Cartons": ["Over 3.5", "Under 3.5"],
  "Personnalisé": []
} as const;

export interface Match {
  team1: Team;
  team2: Team;
  betType: string;
  betValue: string;
  customBet?: string;
}