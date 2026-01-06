import React, { useState } from 'react';
import { Character, AppState } from '../types';
import { CHARACTERS } from '../constants';
import Button from './ui/Button';

interface CharacterSelectProps {
  phase: AppState;
  onSelect: (char: Character) => void;
  onBack: () => void;
  selectedP1?: Character;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ phase, onSelect, onBack, selectedP1 }) => {
  const [filter, setFilter] = useState<string>('All');
  const [hoveredChar, setHoveredChar] = useState<Character | null>(null);

  const filteredChars = filter === 'All' 
    ? CHARACTERS 
    : CHARACTERS.filter(c => c.role === filter);

  const roles = ['All', 'Hero', 'Villain', 'Rival', 'Mentor', 'Anti-Hero', 'Mecha', 'Monster'];

  return (
    <div className="h-screen bg-obsidian text-white flex flex-col bg-grid-pattern overflow-hidden">
      
      {/* Header */}
      <header className="flex-none p-6 border-b border-gray-800 bg-obsidian/80 backdrop-blur-md z-20 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-gray-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
            ← Abort
          </button>
          <h2 className="text-2xl font-display font-bold text-white tracking-wide">
            {phase === 'SELECT_P1' ? 'Operator Selection // 01' : 'Opponent Selection // 02'}
          </h2>
        </div>
        
        {/* Filters */}
        <div className="flex gap-1 bg-charcoal p-1 rounded-lg border border-gray-800">
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setFilter(role)}
              className={`px-4 py-1.5 text-xs font-sans font-medium uppercase tracking-wider rounded transition-all duration-200
                ${filter === role ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              {role}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Card Grid */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {filteredChars.map(char => {
              const isDisabled = phase === 'SELECT_P2' && selectedP1?.id === char.id;
              return (
                <div 
                  key={char.id}
                  onClick={() => !isDisabled && onSelect(char)}
                  onMouseEnter={() => setHoveredChar(char)}
                  onMouseLeave={() => setHoveredChar(null)}
                  className={`
                    group relative aspect-[3/4] cursor-pointer transition-all duration-500 ease-out border border-gray-800 bg-charcoal overflow-hidden
                    ${isDisabled ? 'opacity-20 pointer-events-none grayscale' : 'hover:border-white/40 hover:shadow-2xl'}
                  `}
                >
                  <img 
                    src={char.image} 
                    alt={char.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs font-mono text-tech-blue mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      [{char.role.toUpperCase()}]
                    </p>
                    <h3 className="text-xl font-display font-bold text-white">{char.name}</h3>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Technical Details Panel */}
        <div className="w-[400px] border-l border-gray-800 bg-charcoal/50 backdrop-blur-sm p-8 flex flex-col relative hidden lg:flex">
          {hoveredChar ? (
            <div className="space-y-8 animate-slide-up">
              <div>
                <div className="text-xs font-mono text-gray-500 mb-2 border-b border-gray-700 pb-1">IDENTIFICATION</div>
                <h1 className="text-4xl font-display font-bold text-white mb-2">{hoveredChar.name}</h1>
                <div className="inline-block px-2 py-1 bg-white/5 border border-white/10 text-xs font-mono text-tech-blue">
                  CLASS: {hoveredChar.role.toUpperCase()}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-gray-500 mb-4 border-b border-gray-700 pb-1">COMBAT STATISTICS</div>
                <div className="space-y-4">
                  {Object.entries(hoveredChar.stats).map(([stat, val]) => (
                    <div key={stat} className="group">
                      <div className="flex justify-between text-xs uppercase text-gray-400 mb-1 font-sans tracking-wide">
                        <span>{stat}</span>
                        <span className="font-mono">{val}</span>
                      </div>
                      <div className="h-1 bg-gray-800 w-full overflow-hidden">
                        <div 
                          className="h-full bg-white group-hover:bg-tech-blue transition-all duration-300" 
                          style={{ width: `${val}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                 <div className="text-xs font-mono text-gray-500 mb-2 border-b border-gray-700 pb-1">SIGNATURE ABILITY</div>
                 <div className="p-4 border border-white/10 bg-white/5">
                    <p className="text-tech-gold font-display text-lg mb-1">{hoveredChar.specialMove}</p>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">{hoveredChar.description}</p>
                 </div>
              </div>
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-4">
               <div className="w-16 h-16 border border-dashed border-gray-500 rounded-full flex items-center justify-center animate-spin-slow">
                 <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
               </div>
               <p className="font-mono text-xs tracking-widest text-center">AWAITING INPUT<br/>HOVER TO SCAN</p>
             </div>
          )}
          
          <div className="mt-auto pt-6 border-t border-gray-800">
            <div className="flex justify-between text-[10px] font-mono text-gray-600">
               <span>DATA STREAM: ACTIVE</span>
               <span>ENC: AES-256</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CharacterSelect;