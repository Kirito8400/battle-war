export interface Character {
  id: string;
  name: string;
  role: 'Hero' | 'Villain' | 'Mecha' | 'Monster' | 'Rival' | 'Mentor' | 'Anti-Hero';
  image: string;
  stats: {
    power: number; // 0-100
    speed: number; // 0-100
    defense: number; // 0-100
    technique: number; // 0-100
  };
  description: string;
  specialMove: string;
}

export interface Arena {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface BattleRound {
  roundNumber: number;
  narrative: string;
  attacker: 'player1' | 'player2';
  damageDealt: number;
  isSpecialMove: boolean;
  moveName: string;
  remainingHealthP1: number;
  remainingHealthP2: number;
}

export interface BattleResult {
  winner: 'player1' | 'player2' | 'draw';
  rounds: BattleRound[];
  summary: string;
}

export type AppState = 'LANDING' | 'SELECT_P1' | 'SELECT_P2' | 'CONFIRM' | 'BATTLE' | 'RESULT';