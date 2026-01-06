import React from 'react';
import { BattleResult as BattleResultType, Character } from '../types';
import Button from './ui/Button';

interface BattleResultProps {
  result: BattleResultType;
  player1: Character;
  player2: Character;
  onReset: () => void;
}

const BattleResult: React.FC<BattleResultProps> = ({ result, player1, player2, onReset }) => {
  const winnerChar = result.winner === 'player1' ? player1 : result.winner === 'player2' ? player2 : null;
  const isDraw = result.winner === 'draw';

  return (
    <div className="h-screen w-full bg-obsidian flex flex-col items-center justify-center relative overflow-hidden p-6">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian"></div>
      
      <div className="relative z-10 w-full max-w-4xl glass-panel p-12 border border-white/10 flex flex-col items-center text-center">
        
        <div className="mb-2 text-xs font-mono text-gray-500 tracking-[0.5em] uppercase">Simulation Complete</div>
        
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 tracking-tighter">
          {isDraw ? 'DRAW' : 'VICTORY'}
        </h1>

        {winnerChar && (
          <div className="flex flex-col items-center mb-10 animate-slide-up">
            <div className="w-32 h-32 rounded-full p-1 border border-white/20 mb-6 relative">
              <div className="absolute inset-0 rounded-full border border-tech-gold opacity-50 animate-ping"></div>
              <img src={winnerChar.image} alt={winnerChar.name} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <h3 className="text-2xl font-display text-white tracking-widest">{winnerChar.name}</h3>
            <p className="text-xs font-mono text-tech-gold mt-2">WINNER // {winnerChar.role.toUpperCase()}</p>
          </div>
        )}

        <div className="max-w-xl mx-auto mb-10 text-gray-400 font-sans leading-relaxed border-l-2 border-white/10 pl-6 text-left italic">
          "{result.summary}"
        </div>

        <div className="flex gap-6">
          <Button onClick={onReset} variant="secondary">
            Return to Menu
          </Button>
          <Button onClick={onReset} variant="primary">
            New Simulation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BattleResult;