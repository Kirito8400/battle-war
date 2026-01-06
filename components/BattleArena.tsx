import React, { useEffect, useState, useRef } from 'react';
import { Character, Arena, BattleResult, BattleRound } from '../types';
import { simulateBattle } from '../services/geminiService';
import HealthBar from './ui/HealthBar';

interface BattleArenaProps {
  player1: Character;
  player2: Character;
  arena: Arena;
  onFinish: (result: BattleResult) => void;
}

const BattleArena: React.FC<BattleArenaProps> = ({ player1, player2, arena, onFinish }) => {
  const [battleData, setBattleData] = useState<BattleResult | null>(null);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(-1);
  const [displayedRound, setDisplayedRound] = useState<BattleRound | null>(null);
  const [p1Health, setP1Health] = useState(100);
  const [p2Health, setP2Health] = useState(100);
  const [isSimulating, setIsSimulating] = useState(true);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  
  const [showDamage, setShowDamage] = useState<{target: 'p1'|'p2', amount: number, type: string} | null>(null);

  useEffect(() => {
    const initBattle = async () => {
      try {
        const result = await simulateBattle(player1, player2, arena);
        setBattleData(result);
        setIsSimulating(false);
        setTimeout(() => setCurrentRoundIndex(0), 1500); 
      } catch (e) {
        console.error("Error initializing battle", e);
      }
    };
    initBattle();
  }, [player1, player2, arena]);

  useEffect(() => {
    if (!battleData || currentRoundIndex < 0) return;

    if (currentRoundIndex >= battleData.rounds.length) {
      setTimeout(() => onFinish(battleData), 3000);
      return;
    }

    const round = battleData.rounds[currentRoundIndex];
    setDisplayedRound(round);

    const isP1Attacker = round.attacker === 'player1';
    const damageTarget = isP1Attacker ? 'p2' : 'p1';
    
    setTimeout(() => {
      if (damageTarget === 'p1') setP1Health(round.remainingHealthP1);
      else setP2Health(round.remainingHealthP2);
      
      setShowDamage({
        target: damageTarget, 
        amount: round.damageDealt,
        type: round.isSpecialMove ? 'CRITICAL' : 'HIT'
      });
      
      setCombatLog(prev => [`> R${round.roundNumber}: ${round.narrative}`, ...prev.slice(0, 4)]); // Keep last 5 logs

      setTimeout(() => setShowDamage(null), 1500);
    }, 800);

    const nextRoundTimer = setTimeout(() => {
      setCurrentRoundIndex(prev => prev + 1);
    }, 5000); 

    return () => clearTimeout(nextRoundTimer);
  }, [currentRoundIndex, battleData, onFinish]);


  if (isSimulating) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-obsidian text-white relative overflow-hidden">
        <div className="w-64 h-[1px] bg-gray-800 mb-8">
           <div className="h-full bg-tech-blue animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
        <h2 className="text-2xl font-display font-light tracking-[0.5em] animate-pulse">SIMULATING</h2>
        <p className="mt-4 font-mono text-xs text-gray-500">Retrieving combat data...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative overflow-hidden bg-obsidian text-white font-sans">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img src={arena.image} alt="Arena" className="w-full h-full object-cover opacity-30 grayscale blur-sm scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Main HUD */}
      <div className="relative z-10 h-full flex flex-col p-6 md:p-12">
        
        {/* Top HUD: Status Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl mx-auto items-start">
          
          {/* Player 1 Status */}
          <div className="flex flex-col gap-2">
            <HealthBar current={p1Health} max={100} label={player1.name} color="bg-tech-blue" />
            
            {/* P1 Damage Floater */}
            <div className="relative h-0">
              {showDamage?.target === 'p1' && (
                <div className="absolute top-4 left-0 text-6xl font-display font-bold text-tech-red animate-bounce tracking-tighter opacity-80">
                  -{showDamage.amount}
                </div>
              )}
            </div>
          </div>

          {/* Player 2 Status */}
          <div className="flex flex-col gap-2">
            <HealthBar current={p2Health} max={100} label={player2.name} color="bg-tech-red" isRightAligned />
             
             {/* P2 Damage Floater */}
             <div className="relative h-0">
              {showDamage?.target === 'p2' && (
                <div className="absolute top-4 right-0 text-6xl font-display font-bold text-tech-blue animate-bounce tracking-tighter opacity-80">
                  -{showDamage.amount}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Field */}
        <div className="flex-1 flex items-center justify-center relative perspective-[1000px]">
           {/* Fighters */}
           <div className="w-full max-w-5xl flex justify-between items-end h-[50vh] px-8">
              
              {/* Player 1 */}
              <div className={`relative w-1/3 h-full transition-all duration-500 ${displayedRound?.attacker === 'player1' ? 'scale-110 brightness-110 z-20' : 'scale-95 brightness-75 grayscale'}`}>
                 <img 
                  src={player1.image} 
                  className={`w-full h-full object-contain drop-shadow-2xl transition-transform duration-300 ${displayedRound?.attacker === 'player1' ? 'translate-x-8' : ''}`}
                  alt="P1" 
                />
              </div>

              {/* Player 2 */}
              <div className={`relative w-1/3 h-full transition-all duration-500 ${displayedRound?.attacker === 'player2' ? 'scale-110 brightness-110 z-20' : 'scale-95 brightness-75 grayscale'}`}>
                 <img 
                  src={player2.image} 
                  className={`w-full h-full object-contain drop-shadow-2xl transition-transform duration-300 transform -scale-x-100 ${displayedRound?.attacker === 'player2' ? '-translate-x-8' : ''}`}
                  alt="P2" 
                />
              </div>
           </div>

           {/* Special Move Banner */}
           {displayedRound?.isSpecialMove && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-black/60 backdrop-blur-md border-y border-white/20 py-4 z-50 overflow-hidden">
               <div className="flex items-center justify-center gap-4 animate-pulse">
                 <div className="h-[1px] w-24 bg-white/50"></div>
                 <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-widest text-glow">
                   {displayedRound.moveName}
                 </h1>
                 <div className="h-[1px] w-24 bg-white/50"></div>
               </div>
             </div>
           )}
        </div>

        {/* Bottom HUD: Log */}
        <div className="w-full max-w-3xl mx-auto glass-panel p-6 rounded-sm border-t-2 border-t-tech-blue/50">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-tech-blue uppercase tracking-widest">
            <span className="w-2 h-2 bg-tech-blue rounded-full animate-pulse"></span>
            Combat Log
          </div>
          
          <div className="font-sans text-lg md:text-xl text-gray-200 leading-relaxed min-h-[3rem]">
            {displayedRound ? displayedRound.narrative : "Awaiting hostilities..."}
          </div>
          
          {/* Historical Log */}
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-1 text-xs font-mono text-gray-600">
            {combatLog.slice(1, 3).map((log, i) => (
              <div key={i} className="opacity-70">{log}</div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BattleArena;