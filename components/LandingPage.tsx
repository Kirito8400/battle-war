import React from 'react';
import Button from './ui/Button';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-obsidian">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale scale-105 animate-float"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-12 max-w-5xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gray-500"></div>
            <span className="text-xs font-mono text-gray-400 tracking-[0.3em]">SYSTEM ONLINE</span>
            <div className="h-[1px] w-12 bg-gray-500"></div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tight">
            BATTLE NEXUS
          </h1>
          
          <p className="text-gray-400 font-sans text-lg tracking-wide max-w-xl mx-auto leading-relaxed">
            Advanced combat simulation powered by Gemini AI. <br/>
            Select your operator. Engage the simulation.
          </p>
        </div>

        {/* Action */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button onClick={onStart} size="lg" variant="primary">
            Initialize Sequence
          </Button>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-8 flex justify-between w-full max-w-7xl px-8 text-xs font-mono text-gray-600">
          <div>SECURE CONNECTION ESTABLISHED</div>
          <div>V.2.0.4 // STABLE</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;