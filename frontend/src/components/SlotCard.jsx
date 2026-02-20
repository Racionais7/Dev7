import React, { useState, useEffect } from 'react';

// PG Soft Logo Component - Pixel art style (small version for cards)
const PGSoftLogoSmall = ({ className = "h-3" }) => (
  <svg className={className} viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* P letter - pixel style */}
    <rect x="0" y="0" width="2.5" height="2.5" fill="#888"/>
    <rect x="2.5" y="0" width="2.5" height="2.5" fill="#888"/>
    <rect x="5" y="0" width="2.5" height="2.5" fill="#888"/>
    <rect x="7.5" y="0" width="2.5" height="2.5" fill="#888"/>
    <rect x="0" y="2.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="10" y="2.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="0" y="5" width="2.5" height="2.5" fill="#888"/>
    <rect x="10" y="5" width="2.5" height="2.5" fill="#888"/>
    <rect x="0" y="7.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="2.5" y="7.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="5" y="7.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="7.5" y="7.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="0" y="10" width="2.5" height="2.5" fill="#888"/>
    <rect x="0" y="12.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="0" y="15" width="2.5" height="2.5" fill="#888"/>
    
    {/* G letter - pixel style */}
    <rect x="18" y="0" width="2.5" height="2.5" fill="#888"/>
    <rect x="20.5" y="0" width="2.5" height="2.5" fill="#888"/>
    <rect x="23" y="0" width="2.5" height="2.5" fill="#888"/>
    <rect x="25.5" y="0" width="2.5" height="2.5" fill="#888"/>
    <rect x="15.5" y="2.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="15.5" y="5" width="2.5" height="2.5" fill="#888"/>
    <rect x="15.5" y="7.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="23" y="7.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="25.5" y="7.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="28" y="7.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="15.5" y="10" width="2.5" height="2.5" fill="#888"/>
    <rect x="28" y="10" width="2.5" height="2.5" fill="#888"/>
    <rect x="15.5" y="12.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="28" y="12.5" width="2.5" height="2.5" fill="#888"/>
    <rect x="18" y="15" width="2.5" height="2.5" fill="#888"/>
    <rect x="20.5" y="15" width="2.5" height="2.5" fill="#888"/>
    <rect x="23" y="15" width="2.5" height="2.5" fill="#888"/>
    <rect x="25.5" y="15" width="2.5" height="2.5" fill="#888"/>
    
    {/* SOFT text */}
    <text x="36" y="13" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="#555" letterSpacing="0.5">SOFT</text>
  </svg>
);

// Pragmatic Logo Small (for cards)
const PragmaticLogoSmall = ({ className = "h-3" }) => (
  <svg className={className} viewBox="0 0 100 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="12" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fontStyle="italic" fill="#666" letterSpacing="-0.3">PRAGMATIC</text>
    {/* Crown */}
    <path d="M74 1 L76 4 L78 1 L80 4 L82 1 L80 6 L76 6 Z" fill="#f97316" opacity="0.7"/>
    {/* Oval */}
    <ellipse cx="78" cy="10" rx="7" ry="5" stroke="#f97316" strokeWidth="1" fill="none" opacity="0.7"/>
    {/* PLAY text */}
    <text x="73" y="12" fontFamily="Arial, sans-serif" fontSize="4" fontWeight="bold" fill="#f97316" opacity="0.7">PLAY</text>
  </svg>
);

const SlotCard = ({ slot, onSelect, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [liveRTP, setLiveRTP] = useState(slot.basePayout);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRTP(prev => {
        const change = (Math.random() - 0.5) * 0.8;
        const newRTP = slot.basePayout + change;
        return Math.max(slot.basePayout - 1.5, Math.min(slot.basePayout + 1.5, parseFloat(newRTP.toFixed(1))));
      });
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [slot.basePayout]);

  // Provider display - use logo for PG Soft and Pragmatic
  const renderProviderName = () => {
    if (slot.provider === 'pg') {
      return <PGSoftLogoSmall className="h-3 w-auto opacity-60" />;
    }
    if (slot.provider === 'pragmatic') {
      return <PragmaticLogoSmall className="h-3.5 w-auto opacity-60" />;
    }
    const name = slot.provider === 'tada' ? 'Tada' :
                 slot.provider === 'spirit' ? 'Spirit' : 'Revenge';
    return <span className="text-[10px] text-gray-500 tracking-wider">{name}</span>;
  };

  return (
    <div
      data-testid={`slot-card-${slot.id}`}
      className="group relative cursor-pointer"
      onClick={() => onSelect(slot)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft glow effect under card on hover */}
      <div 
        className="absolute -inset-2 rounded-2xl transition-all duration-500 pointer-events-none"
        style={{
          background: isHovered 
            ? 'radial-gradient(ellipse at center, rgba(139,69,69,0.12) 0%, transparent 70%)' 
            : 'transparent',
          filter: 'blur(20px)',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(8px)' : 'translateY(0)'
        }}
      />

      {/* Card Container */}
      <div 
        className="relative rounded-xl overflow-hidden transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, rgba(20,20,30,0.9) 0%, rgba(12,12,18,0.95) 100%)',
          transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
          boxShadow: isHovered 
            ? '0 20px 40px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' 
            : '0 8px 24px -8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)'
        }}
      >
        {/* ARTWORK AREA */}
        <div 
          className="relative overflow-hidden"
          style={{ aspectRatio: '4/5' }}
        >
          <img 
            src={slot.image} 
            alt={slot.name} 
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
              filter: isHovered ? 'brightness(1.03)' : 'brightness(1)'
            }}
            loading="lazy" 
          />

          {/* Gradient overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom, 
                transparent 0%, 
                transparent 40%,
                rgba(12,12,18,0.4) 70%,
                rgba(12,12,18,0.95) 100%
              )`
            }}
          />

          {/* Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)'
            }}
          />

          {/* Live indicator */}
          <div className="absolute top-3 right-3 z-10">
            <div 
              className="flex items-center gap-1.5 px-2 py-1 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-emerald-400 font-medium">AO VIVO</span>
            </div>
          </div>

          {/* Game name overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 z-10">
            <h3 className="text-white text-sm font-medium tracking-wide truncate drop-shadow-lg">
              {slot.name}
            </h3>
            <div className="mt-0.5">
              {renderProviderName()}
            </div>
          </div>
        </div>

        {/* INFO PANEL */}
        <div 
          className="px-3 py-2.5"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, transparent 100%)'
          }}
        >
          {/* Stats row */}
          <div 
            className="flex items-center justify-between text-[10px] mb-2 transition-opacity duration-300"
            style={{ opacity: isHovered ? 0.9 : 0.5 }}
          >
            <span className="text-gray-400">
              RTP <span className="text-emerald-400/80">{liveRTP.toFixed(1)}%</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">
              Vol. <span className="text-amber-400/70">
                {slot.basePayout >= 88 ? 'Alta' : slot.basePayout >= 82 ? 'Média' : 'Baixa'}
              </span>
            </span>
          </div>

          {/* Premium Casino Button - Deep Red Gradient */}
          <button
            className="w-full py-2 rounded-lg text-[11px] font-bold tracking-wider transition-all duration-200"
            style={{
              background: isHovered 
                ? 'linear-gradient(180deg, #A83350 0%, #8C2A42 50%, #6B2035 100%)'
                : 'linear-gradient(180deg, #9A2E48 0%, #7E263A 50%, #5E1C2C 100%)',
              boxShadow: isHovered
                ? 'inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -1px 2px rgba(0,0,0,0.25), 0 2px 8px rgba(154,46,72,0.35)'
                : 'inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 2px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.25)',
              border: '1px solid rgba(168,51,80,0.35)',
              color: '#fff',
              textShadow: '0 1px 2px rgba(0,0,0,0.25)',
              filter: isHovered ? 'brightness(1.05)' : 'brightness(1)'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(slot);
            }}
          >
            JOGAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotCard;
