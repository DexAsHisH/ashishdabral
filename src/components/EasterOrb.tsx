import { useEffect, useState } from 'react';

export default function EasterOrb({ onClick }: { onClick: () => void }) {
  const [position, setPosition] = useState({ top: '10%', left: '80%',bottom:'20%' });

  useEffect(() => {
    const randomizePosition = () => {
      // Reduced percentages to ensure the orb stays within bounds
      setPosition({
        top: `${Math.random() * 70 + 15}%`,  // Keep away from top edge for tooltip
        left: `${Math.random() * 70 + 15}%`,
        bottom: `${Math.random() * 70 + 15}%`
              });
    };

    randomizePosition();
    const interval = setInterval(randomizePosition, 40000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute z-50 group cursor-pointer transition-transform duration-500 ease-in-out animate-bounce"
      style={{ top: position.top, left: position.left }}
      onClick={onClick}
    >
      {/* Ambient glow effect */}
      <div className="absolute -inset-6 bg-gradient-to-br from-orange-400/30 via-red-500/20 to-purple-600/30 rounded-full blur-2xl opacity-60 animate-pulse-slow" />
      
      {/* Outer glow ring */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/40 to-orange-600/40 rounded-full blur-xl" />

      {/* Dragon Ball Core - Multiple layers for depth */}
      <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 via-orange-500 to-red-600 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] border border-amber-300/50 overflow-hidden">
        {/* Glass highlight effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-70" />
        
        {/* Inner orange glow */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-80" />
        
        {/* Hot core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full shadow-[0_0_8px_3px_rgba(255,200,0,0.8)]" />
        </div>
        
        {/* Surface details - star pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-amber-200 rounded-full opacity-70" />
          <div className="absolute top-2/3 left-3/5 w-1 h-1 bg-amber-200 rounded-full opacity-70" />
          <div className="absolute top-1/2 left-1/6 w-0.5 h-0.5 bg-amber-100 rounded-full opacity-90" />
        </div>
        
        {/* Reflective surface */}
        <div className="absolute top-0 left-1/4 w-1/4 h-1/4 bg-white/30 rounded-full blur-sm" />
      </div>

      {/* Light rays emanating from the orb */}
      <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/0 via-yellow-400/30 to-orange-500/0 rounded-full blur-lg animate-pulse" />

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 backdrop-blur-sm border border-amber-500/30 shadow-xl">
        🟠 Yoo, u've Discovered The 🐉 Dragon Ball!
      </div>
    </div>
  );
}