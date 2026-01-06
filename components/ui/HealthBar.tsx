import React from 'react';

interface HealthBarProps {
  current: number;
  max?: number;
  label?: string;
  color?: string; // Tailwind class, e.g. 'bg-tech-blue'
  isRightAligned?: boolean;
}

const HealthBar: React.FC<HealthBarProps> = ({ 
  current, 
  max = 100, 
  label, 
  color = 'bg-tech-blue',
  isRightAligned = false
}) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div className={`w-full group ${isRightAligned ? 'text-right' : 'text-left'}`}>
      {label && (
        <div className="mb-2 flex items-end justify-between font-sans uppercase tracking-widest">
           {isRightAligned ? (
             <>
               <span className="text-xs text-gray-500 font-mono tracking-tighter transition-colors group-hover:text-white">
                 HP <span className="text-white text-base ml-1">{current}</span>
               </span>
               <span className="text-sm font-bold text-gray-200">{label}</span>
             </>
           ) : (
             <>
               <span className="text-sm font-bold text-gray-200">{label}</span>
               <span className="text-xs text-gray-500 font-mono tracking-tighter transition-colors group-hover:text-white">
                 <span className="text-white text-base mr-1">{current}</span> HP
               </span>
             </>
           )}
        </div>
      )}
      
      {/* Container */}
      <div className="h-1.5 w-full bg-gray-800 rounded-sm overflow-hidden relative">
        {/* Fill */}
        <div 
          className={`h-full ${color} transition-all duration-700 ease-out relative`}
          style={{ width: `${percentage}%`, marginLeft: isRightAligned ? 'auto' : '0' }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-full bg-gradient-to-r from-transparent to-white/30"></div>
        </div>
      </div>
      
      {/* Decorative under-line */}
      <div className={`h-[1px] w-full mt-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50`}></div>
    </div>
  );
};

export default HealthBar;