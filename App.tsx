import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import CharacterSelect from './components/CharacterSelect';
import BattleArena from './components/BattleArena';
import BattleResultScreen from './components/BattleResult';
import Button from './components/ui/Button';
import { Character, Arena, AppState, BattleResult } from './types';
import { ARENAS } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('LANDING');
  const [player1, setPlayer1] = useState<Character | null>(null);
  const [player2, setPlayer2] = useState<Character | null>(null);
  const [selectedArena, setSelectedArena] = useState<Arena>(ARENAS[0]);
  const [lastResult, setLastResult] = useState<BattleResult | null>(null);

  const handleStart = () => setAppState('SELECT_P1');

  const handleSelectP1 = (char: Character) => {
    setPlayer1(char);
    setAppState('SELECT_P2');
  };

  const handleSelectP2 = (char: Character) => {
    setPlayer2(char);
    const randomArena = ARENAS[Math.floor(Math.random() * ARENAS.length)];
    setSelectedArena(randomArena);
    setAppState('CONFIRM'); 
  };

  const startBattle = () => {
    setAppState('BATTLE');
  };

  const handleBattleFinish = (result: BattleResult) => {
    setLastResult(result);
    setAppState('RESULT');
  };

  const resetGame = () => {
    setPlayer1(null);
    setPlayer2(null);
    setLastResult(null);
    setAppState('LANDING');
  };

  // Render Based on State
  switch (appState) {
    case 'LANDING':
      return <LandingPage onStart={handleStart} />;
    
    case 'SELECT_P1':
      return (
        <CharacterSelect 
          phase="SELECT_P1" 
          onSelect={handleSelectP1} 
          onBack={() => setAppState('LANDING')}
        />
      );

    case 'SELECT_P2':
      return (
        <CharacterSelect 
          phase="SELECT_P2" 
          onSelect={handleSelectP2} 
          onBack={() => setAppState('SELECT_P1')}
          selectedP1={player1!}
        />
      );

    case 'CONFIRM':
      return (
        <div className="h-screen flex flex-col items-center justify-center bg-obsidian text-white relative bg-grid-pattern">
          {/* Header */}
          <div className="z-10 text-center mb-16">
             <h2 className="text-4xl font-display font-bold tracking-widest text-white mb-2">MATCHUP CONFIRMED</h2>
             <div className="h-[1px] w-32 bg-gray-700 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 z-10 mb-16 w-full max-w-4xl justify-center">
            
            {/* P1 Card */}
            <div className="text-center group">
              <div className="w-40 h-40 border border-white/20 p-2 mb-4 bg-charcoal/50 backdrop-blur">
                <img src={player1?.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={player1?.name}/>
              </div>
              <p className="font-display text-2xl text-white tracking-wide">{player1?.name}</p>
              <p className="font-mono text-xs text-tech-blue">PLAYER 01</p>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center gap-2">
               <div className="text-6xl font-display font-light text-gray-600">VS</div>
               <div className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">ARENA: {selectedArena.name}</div>
            </div>

            {/* P2 Card */}
            <div className="text-center group">
              <div className="w-40 h-40 border border-white/20 p-2 mb-4 bg-charcoal/50 backdrop-blur">
                <img src={player2?.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={player2?.name}/>
              </div>
              <p className="font-display text-2xl text-white tracking-wide">{player2?.name}</p>
              <p className="font-mono text-xs text-tech-red">PLAYER 02</p>
            </div>

          </div>
          
          <div className="z-10">
            <Button onClick={startBattle} size="lg" variant="primary">
               Initiate Combat
            </Button>
          </div>
        </div>
      );

    case 'BATTLE':
      if (!player1 || !player2) return null;
      return (
        <BattleArena 
          player1={player1} 
          player2={player2} 
          arena={selectedArena} 
          onFinish={handleBattleFinish}
        />
      );

    case 'RESULT':
      if (!lastResult || !player1 || !player2) return null;
      return (
        <BattleResultScreen 
          result={lastResult} 
          player1={player1} 
          player2={player2} 
          onReset={resetGame}
        />
      );

    default:
      return null;
  }
};

export default App;