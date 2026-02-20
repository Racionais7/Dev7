import React, { useState, useEffect, useRef } from 'react';
import { platformImage } from '../data/mockData';

// Data
const gameProviders = [
  { name: 'PG', fullName: 'PG Soft', color: '#F59E0B', logo: '/providers/pg-soft.png' },
  { name: 'PP', fullName: 'Pragmatic Play', color: '#3B82F6', logo: '/providers/pragmatic-play.png' },
  { name: 'Spirit', fullName: 'Spirit Gaming', color: '#8B5CF6', logo: '/providers/spirit.png' },
  { name: 'Tada', fullName: 'Tada Gaming', color: '#EC4899', logo: '/providers/tada.png' },
  { name: 'Reeveme', fullName: 'Reeveme', color: '#10B981', logo: '/providers/reeveme.png' }
];

const platformLogos = [
  { name: 'AGJOGO', logo: '/assets/platforms/agjogo.png' },
  { name: 'BGJOGO', logo: '/assets/platforms/bgjogo.png' },
  { name: 'DGJOGO', logo: '/assets/platforms/dgjogo.png' },
  { name: 'YGJOGO', logo: '/assets/platforms/ygjogo.png' },
  { name: 'EGJOGO', logo: '/assets/platforms/egjogo.png' },
  { name: 'MGJOGO', logo: '/assets/platforms/mgjogo.png' },
  { name: 'FGJOGO', logo: '/assets/platforms/fgjogo.png' },
  { name: 'HGJOGO', logo: '/assets/platforms/hgjogo.png' },
  { name: 'WGJOGO', logo: '/assets/platforms/wgjogo.png' }
];

const responsibilityBadges = [
  { name: 'Responsible Gambling', icon: 'RG' },
  { name: 'GamCare', icon: 'GC' },
  { name: 'BetBlocker', icon: 'BB' },
  { name: '18+', icon: '18+' }
];

const PlatformSelector = ({ onPlatformSelect }) => {
  const [accuracy, setAccuracy] = useState(96.5);
  const [isVisible, setIsVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);
  
  const footerRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setHeroVisible(true), 300);
    setTimeout(() => setCardsVisible(true), 700);
    setTimeout(() => setCtaVisible(true), 1000);
    
    // Accuracy updates with ±0.3% variation every 3 seconds
    const accuracyInterval = setInterval(() => {
      setAccuracy(prev => {
        const change = (Math.random() - 0.5) * 0.6; // ±0.3%
        return Math.min(99.9, Math.max(95, parseFloat((prev + change).toFixed(1))));
      });
    }, 3000);
    
    // Glitch spark effect every 8-12 seconds
    const triggerGlitch = () => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 80);
      const nextGlitch = 8000 + Math.random() * 4000;
      setTimeout(triggerGlitch, nextGlitch);
    };
    const glitchTimeout = setTimeout(triggerGlitch, 8000 + Math.random() * 4000);
    
    // Mouse parallax handler for desktop
    const handleMouseMove = (e) => {
      if (!coreRef.current) return;
      const rect = coreRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = ((e.clientX - centerX) / (window.innerWidth / 2)) * 6;
      const y = ((e.clientY - centerY) / (window.innerHeight / 2)) * 6;
      setMousePosition({ x: Math.max(-6, Math.min(6, x)), y: Math.max(-6, Math.min(6, y)) });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setFooterVisible(true);
    }, { threshold: 0.2 });
    if (footerRef.current) observer.observe(footerRef.current);

    return () => { 
      clearInterval(accuracyInterval);
      clearTimeout(glitchTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect(); 
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#06060c] text-white overflow-x-hidden">
      
      {/* ════════════════════════════════════════════════════════════════════════
          PREMIUM ANIMATED BACKGROUND
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0814] via-[#06060c] to-[#080612] animate-bg-breathing" />
        <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-violet-600/4 blur-[150px] animate-glow-pulse" />
        <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-blue-600/3 blur-[120px] animate-glow-pulse-delay" />
        
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: `${2 + Math.random() * 2}px`,
              height: `${2 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#7c3aed', '#3b82f6', '#6366f1', '#f59e0b'][i % 4],
              opacity: 0.3,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 12}s`
            }}
          />
        ))}
        
        {/* Star sparkles - Mario reference */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-star-sparkle"
            style={{
              left: `${40 + Math.random() * 50}%`,
              top: `${10 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <svg className="w-2 h-2 text-amber-400/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
            </svg>
          </div>
        ))}
        
        {/* Light beams */}
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-violet-500/8 to-transparent animate-beam-pass" />
        <div className="absolute top-0 right-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/6 to-transparent animate-beam-pass-delay" />
      </div>

      <div className="relative z-10">
        
        {/* ════════════════════════════════════════════════════════════════════════
            HEADER - Clean minimal
        ════════════════════════════════════════════════════════════════════════ */}
        <header className={`py-4 px-4 sm:px-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-end">
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm text-gray-400">Online</span>
            </div>
          </div>
        </header>

        {/* ════════════════════════════════════════════════════════════════════════
            HERO SECTION - Centered Animated Icon Only
        ════════════════════════════════════════════════════════════════════════ */}
        <main className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Hero - Centered Icon */}
            <div className="flex flex-col items-center justify-center min-h-[35vh] sm:min-h-[40vh] mb-8 sm:mb-10">
              
              {/* ════════ CENTERED ARCANE CORE ════════ */}
              <div 
                ref={coreRef}
                className={`relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] transition-all duration-1000 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{
                  transform: `perspective(1000px) rotateX(${-mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
                  transition: 'transform 0.15s ease-out'
                }}
              >
                
                {/* ═══════ PROJECTED GLOW ON BACKGROUND (Aura) ═══════ */}
                <div 
                  className="absolute inset-[-40px] sm:inset-[-60px] lg:inset-[-80px] rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, rgba(59, 130, 246, 0.08) 30%, transparent 60%)',
                    filter: 'blur(50px)'
                  }}
                />
                
                {/* ═══════ ARCANE CORE - HOLOGRAPHIC BASE ═══════ */}
                <div className="absolute inset-0 flex items-center justify-center">
                  
                  {/* Outer glow */}
                  <div 
                    className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full animate-core-glow-premium"
                    style={{
                      background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)',
                      filter: 'blur(40px)'
                    }}
                  />
                  
                  {/* ═══════ RADAR RINGS (Expanding/Fading) ═══════ */}
                  <div 
                    className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[340px] lg:h-[340px] rounded-full animate-radar-ring-1"
                    style={{
                      border: '1.5px solid rgba(124, 58, 237, 0.3)',
                      boxShadow: '0 0 30px rgba(124, 58, 237, 0.2), inset 0 0 30px rgba(59, 130, 246, 0.08)'
                    }}
                  />
                  
                  <div 
                    className="absolute w-[180px] h-[180px] sm:w-[230px] sm:h-[230px] lg:w-[280px] lg:h-[280px] rounded-full animate-radar-ring-2"
                    style={{
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      boxShadow: '0 0 25px rgba(59, 130, 246, 0.15)'
                    }}
                  />
                  
                  <div 
                    className="absolute w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] lg:w-[220px] lg:h-[220px] rounded-full animate-radar-ring-3"
                    style={{
                      border: '1px solid rgba(147, 197, 253, 0.2)',
                      boxShadow: '0 0 20px rgba(124, 58, 237, 0.18), inset 0 0 20px rgba(59, 130, 246, 0.1)'
                    }}
                  />
                  
                  {/* Center nucleus */}
                  <div 
                    className="absolute w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] lg:w-[170px] lg:h-[170px] rounded-full animate-nucleus-breathe"
                    style={{
                      background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 70%)',
                      boxShadow: '0 0 50px rgba(124, 58, 237, 0.35), inset 0 0 30px rgba(59, 130, 246, 0.2)'
                    }}
                  />
                  
                  {/* ═══════ MARIO 3D HOLOGRAM - PREMIUM ANIMATIONS ═══════ */}
                  <div 
                    className={`absolute w-[100px] h-[130px] sm:w-[120px] sm:h-[160px] lg:w-[140px] lg:h-[190px] flex items-center justify-center pointer-events-none ${glitchActive ? 'animate-glitch-spark' : ''}`}
                    style={{
                      transform: `translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)`,
                      transition: glitchActive ? 'none' : 'transform 0.2s ease-out'
                    }}
                  >
                    {/* Mario holographic figure with breathing + floating */}
                    <div className="animate-mario-float">
                      <svg 
                        className={`w-full h-full animate-mario-breathe ${glitchActive ? '' : 'animate-mario-shimmer'}`}
                        viewBox="0 0 100 140" 
                        fill="none"
                        style={{ 
                          filter: glitchActive 
                            ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.9)) brightness(1.5)' 
                            : 'drop-shadow(0 0 12px rgba(124, 58, 237, 0.6)) drop-shadow(0 0 25px rgba(59, 130, 246, 0.35))'
                        }}
                      >
                        <defs>
                          {/* Holographic gradient for Mario */}
                          <linearGradient id="marioHoloGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.85">
                              <animate attributeName="stopColor" values="#60a5fa;#a78bfa;#60a5fa" dur="4s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.9">
                              <animate attributeName="stopColor" values="#a78bfa;#60a5fa;#a78bfa" dur="4s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8">
                              <animate attributeName="stopColor" values="#818cf8;#7c3aed;#818cf8" dur="4s" repeatCount="indefinite" />
                            </stop>
                          </linearGradient>
                          
                          {/* Red accent gradient for Mario details */}
                          <linearGradient id="marioRedAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.65" />
                            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.45" />
                          </linearGradient>
                          
                          {/* Blue accent for overalls */}
                          <linearGradient id="marioBlueAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.75" />
                            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.55" />
                          </linearGradient>
                          
                          {/* Noise filter for hologram shimmer */}
                          <filter id="holoNoise" x="0%" y="0%" width="100%" height="100%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise">
                              <animate attributeName="baseFrequency" values="0.9;1.1;0.9" dur="0.5s" repeatCount="indefinite" />
                            </feTurbulence>
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
                          </filter>
                          
                          {/* Energy glow filter */}
                          <filter id="energyGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="0.8" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
                        
                        {/* ══ MARIO BODY - Holographic Light Effect ══ */}
                        
                        {/* Hat - iconic M cap with red accent */}
                        <ellipse cx="50" cy="22" rx="26" ry="10" fill="url(#marioRedAccent)" stroke="url(#marioHoloGradient)" strokeWidth="1.2" />
                        <path d="M24 22 Q50 8 76 22" fill="url(#marioRedAccent)" stroke="url(#marioHoloGradient)" strokeWidth="0.8" />
                        {/* M logo on cap */}
                        <text x="50" y="20" textAnchor="middle" fill="url(#marioHoloGradient)" fontSize="10" fontWeight="bold" fontFamily="Arial">M</text>
                        
                        {/* Head/Face */}
                        <ellipse cx="50" cy="38" rx="18" ry="16" fill="none" stroke="url(#marioHoloGradient)" strokeWidth="1.5" filter="url(#energyGlow)" />
                        {/* Eyes */}
                        <ellipse cx="43" cy="36" rx="3" ry="4" fill="url(#marioHoloGradient)" />
                        <ellipse cx="57" cy="36" rx="3" ry="4" fill="url(#marioHoloGradient)" />
                        {/* Nose */}
                        <ellipse cx="50" cy="42" rx="5" ry="3" fill="url(#marioRedAccent)" stroke="url(#marioHoloGradient)" strokeWidth="0.4" />
                        {/* Mustache */}
                        <path d="M38 46 Q44 50 50 46 Q56 50 62 46" fill="none" stroke="url(#marioHoloGradient)" strokeWidth="1.5" strokeLinecap="round" />
                        
                        {/* Body/Torso with overalls */}
                        <ellipse cx="50" cy="72" rx="20" ry="18" fill="url(#marioBlueAccent)" stroke="url(#marioHoloGradient)" strokeWidth="1.2" filter="url(#energyGlow)" />
                        {/* Overalls straps */}
                        <path d="M40 58 L42 82" stroke="url(#marioHoloGradient)" strokeWidth="1.5" />
                        <path d="M60 58 L58 82" stroke="url(#marioHoloGradient)" strokeWidth="1.5" />
                        {/* Buttons */}
                        <circle cx="42" cy="68" r="2" fill="url(#marioHoloGradient)" />
                        <circle cx="58" cy="68" r="2" fill="url(#marioHoloGradient)" />
                        
                        {/* Arms - raised victory pose */}
                        <path d="M30 65 Q20 55 18 45" stroke="url(#marioHoloGradient)" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#energyGlow)" />
                        <path d="M70 65 Q80 55 82 45" stroke="url(#marioHoloGradient)" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#energyGlow)" />
                        {/* Gloves */}
                        <circle cx="16" cy="43" r="4" fill="none" stroke="url(#marioHoloGradient)" strokeWidth="1.5" />
                        <circle cx="84" cy="43" r="4" fill="none" stroke="url(#marioHoloGradient)" strokeWidth="1.5" />
                        
                        {/* Legs */}
                        <path d="M40 88 L36 115" stroke="url(#marioBlueAccent)" strokeWidth="4" strokeLinecap="round" filter="url(#energyGlow)" />
                        <path d="M60 88 L64 115" stroke="url(#marioBlueAccent)" strokeWidth="4" strokeLinecap="round" filter="url(#energyGlow)" />
                        
                        {/* Shoes - brown boots */}
                        <ellipse cx="32" cy="120" rx="10" ry="5" fill="url(#marioRedAccent)" stroke="url(#marioHoloGradient)" strokeWidth="0.8" />
                        <ellipse cx="68" cy="120" rx="10" ry="5" fill="url(#marioRedAccent)" stroke="url(#marioHoloGradient)" strokeWidth="0.8" />
                        
                        {/* Energy lines running through body */}
                        <path d="M50 15 L50 125" stroke="url(#marioHoloGradient)" strokeWidth="0.4" strokeDasharray="3,5" opacity="0.4" className="animate-energy-flow" />
                      </svg>
                    </div>
                    
                    {/* Scanline effect over Mario - passes every 2-3s */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scanline-premium" />
                    </div>
                    
                    {/* Hologram shimmer/noise overlay */}
                    <div className="absolute inset-0 pointer-events-none animate-holo-shimmer" style={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.03) 50%, transparent 100%)',
                      mixBlendMode: 'overlay'
                    }} />
                  </div>
                  
                  {/* ═══════ HOLOGRAPHIC FLOOR RING WITH MARIO SHADOW ═══════ */}
                  <div 
                    className="absolute bottom-[12%] sm:bottom-[10%] lg:bottom-[8%] w-[150px] h-[35px] sm:w-[180px] sm:h-[40px] lg:w-[220px] lg:h-[50px]"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.2) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
                      borderRadius: '50%',
                      filter: 'blur(6px)'
                    }}
                  />
                  {/* Mario projected shadow */}
                  <div 
                    className="absolute bottom-[10%] sm:bottom-[8%] lg:bottom-[6%] w-[50px] h-[12px] sm:w-[60px] sm:h-[15px] lg:w-[75px] lg:h-[18px] animate-shadow-breathe"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, rgba(124, 58, 237, 0.25) 50%, transparent 70%)',
                      borderRadius: '50%',
                      filter: 'blur(3px)'
                    }}
                  />
                  
                  {/* ═══════ ORBITING ITEMS (Parallax with different speeds) ═══════ */}
                  
                  {/* Golden Coin - fastest orbit (18s) */}
                  <div 
                    className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[360px] lg:h-[360px] animate-orbit-coin-parallax"
                    style={{
                      transform: `translateX(${mousePosition.x * 4}px) translateY(${mousePosition.y * 4}px)`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative animate-coin-3d-spin">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.7))' }}>
                          <circle cx="12" cy="12" r="10" fill="url(#coinGold)" stroke="#fbbf24" strokeWidth="1.2" />
                          <text x="12" y="16" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">$</text>
                          <defs>
                            <radialGradient id="coinGold">
                              <stop offset="0%" stopColor="#fde047" />
                              <stop offset="100%" stopColor="#f59e0b" />
                            </radialGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Super Star - medium orbit (25s) */}
                  <div 
                    className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] animate-orbit-star-parallax"
                    style={{
                      transform: `translateX(${mousePosition.x * 6}px) translateY(${mousePosition.y * 6}px)`,
                      transition: 'transform 0.35s ease-out'
                    }}
                  >
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                      <div className="relative animate-star-pulse-premium">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.7))' }}>
                          <path d="M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z" fill="url(#starYellow)" stroke="#facc15" strokeWidth="0.8" />
                          <ellipse cx="9" cy="11" rx="1.2" ry="1.5" fill="#1f2937" />
                          <ellipse cx="15" cy="11" rx="1.2" ry="1.5" fill="#1f2937" />
                          <defs>
                            <linearGradient id="starYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#fef08a" />
                              <stop offset="100%" stopColor="#facc15" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* 1-UP Mushroom - slowest orbit (35s) */}
                  <div 
                    className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] animate-orbit-mushroom-parallax"
                    style={{
                      transform: `translateX(${mousePosition.x * 8}px) translateY(${mousePosition.y * 8}px)`,
                      transition: 'transform 0.4s ease-out'
                    }}
                  >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <div className="relative animate-mushroom-bob">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.7))' }}>
                          <ellipse cx="12" cy="10" rx="9" ry="7" fill="url(#mushroom1up)" stroke="#10b981" strokeWidth="0.8" />
                          <circle cx="8" cy="8" r="2" fill="white" />
                          <circle cx="16" cy="8" r="2" fill="white" />
                          <circle cx="12" cy="12" r="1.5" fill="white" />
                          <rect x="8" y="15" width="8" height="6" rx="1" fill="#fef3c7" stroke="#10b981" strokeWidth="0.4" />
                          <defs>
                            <linearGradient id="mushroom1up" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#34d399" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ambient particles */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`holo-p-${i}`}
                      className="absolute rounded-full animate-particle-ambient"
                      style={{
                        width: `${2 + Math.random() * 2}px`,
                        height: `${2 + Math.random() * 2}px`,
                        background: ['#7c3aed', '#3b82f6', '#60a5fa', '#a78bfa'][i % 4],
                        boxShadow: `0 0 6px ${['#7c3aed', '#3b82f6', '#60a5fa', '#a78bfa'][i % 4]}`,
                        left: `${25 + Math.random() * 50}%`,
                        top: `${25 + Math.random() * 50}%`,
                        animationDelay: `${i * 0.6}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Subtitle below icon */}
              <p className={`mt-6 text-gray-500 text-xs sm:text-sm text-center transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Análise profissional de padrões
              </p>
            </div>

            {/* ════════════════════════════════════════════════════════════════════════
                LIVE SIGNALS SECTION - Platform de Sinais ao Vivo (SIMPLIFICADO)
            ════════════════════════════════════════════════════════════════════════ */}
            <div className={`space-y-4 transition-all duration-700 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              
              {/* ════════ LIVE SIGNALS BADGE ONLY ════════ */}
              <div className="flex items-center justify-center mb-4">
                {/* Live badge pulsing */}
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 animate-live-pulse">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-bold text-sm tracking-wide">SINAIS AO VIVO</span>
                </div>
              </div>
              
              {/* ════════ SINAIS AO VIVO + PROVIDERS in same row (desktop) ════════ */}
              <div className="flex flex-col lg:flex-row gap-3 justify-center items-stretch">
                
                {/* SINAIS AO VIVO - COMPACT PREMIUM CARD */}
                <div className="w-full lg:w-auto lg:min-w-[200px]">
                  <div className="group relative h-full min-h-[100px] rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-3px]">
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/25 via-blue-500/20 to-violet-500/25 opacity-60 group-hover:opacity-90 transition-opacity animate-border-glow" />
                    
                    <div className="relative h-full m-[1px] rounded-xl bg-[#0c0c14]/95 backdrop-blur-xl p-4 border border-violet-400/10 group-hover:border-violet-400/25 transition-all flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                        {/* Larger icon with glow */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/15 flex items-center justify-center border border-violet-400/20 relative">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 animate-pulse-subtle" />
                          <div className="absolute inset-0 rounded-xl bg-violet-500/10 blur-md animate-pulse" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">SINAIS AO VIVO</h3>
                          <p className="text-gray-500 text-[11px]">Entradas recomendadas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* PROVIDERS - Fixed centered grid */}
                <div className="flex-1 max-w-3xl">
                  {/* Desktop: 5 columns */}
                  <div className="hidden lg:grid grid-cols-5 gap-3">
                    {gameProviders.map((provider) => (
                      <div key={provider.name} className="group relative min-h-[100px] transition-all duration-300 hover:translate-y-[-3px]">
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-all duration-300"
                          style={{ 
                            background: `radial-gradient(circle, ${provider.color}30 0%, transparent 70%)`,
                            filter: 'blur(12px)'
                          }}
                        />
                        <div className="relative h-full rounded-xl bg-[#0c0c14]/80 border border-white/5 group-hover:border-white/20 backdrop-blur-sm p-3 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden">
                          <div className="w-16 h-16 flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                            {provider.logo ? (
                              <img src={provider.logo} alt={provider.fullName} className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-sm font-bold text-white">{provider.name}</span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors text-center">{provider.fullName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Tablet: 3 columns */}
                  <div className="hidden sm:grid lg:hidden grid-cols-3 gap-3">
                    {gameProviders.map((provider) => (
                      <div key={`tab-${provider.name}`} className="group relative min-h-[90px]">
                        <div className="h-full rounded-xl bg-[#0c0c14]/80 border border-white/5 group-hover:border-white/15 p-3 flex flex-col items-center justify-center transition-all">
                          <div className="w-14 h-14 flex items-center justify-center mb-1.5">
                            {provider.logo ? (
                              <img src={provider.logo} alt={provider.fullName} className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-sm font-bold text-white">{provider.name}</span>
                            )}
                          </div>
                          <span className="text-[9px] text-gray-500 text-center">{provider.fullName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mobile: Horizontal carousel */}
                  <div className="flex sm:hidden gap-2.5 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                    {gameProviders.map((provider) => (
                      <div key={`mob-${provider.name}`} className="flex-shrink-0 w-[95px] snap-start group relative">
                        <div className="h-[90px] rounded-xl bg-[#0c0c14]/80 border border-white/5 p-2.5 flex flex-col items-center justify-center transition-all">
                          <div className="w-12 h-12 flex items-center justify-center mb-1">
                            {provider.logo ? (
                              <img src={provider.logo} alt={provider.fullName} className="w-full h-full object-contain" />
                            ) : (
                              <span className="text-xs font-bold text-white">{provider.name}</span>
                            )}
                          </div>
                          <span className="text-[8px] text-gray-500 text-center leading-tight">{provider.fullName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ════════ LIVE ACCURACY INDICATOR WITH HEARTBEAT ════════ */}
              <div className="w-full max-w-4xl mx-auto">
                <div className="rounded-xl bg-[#0c0c14]/80 border border-white/5 backdrop-blur-sm p-4 sm:p-5 hover:border-white/10 transition-all relative overflow-hidden">
                  {/* Heartbeat glow effect */}
                  <div className="absolute inset-0 animate-heartbeat-glow pointer-events-none" style={{
                    background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)'
                  }} />
                  
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                        200<span className="text-emerald-400">+</span>
                      </h3>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Jogos Disponíveis</p>
                    </div>
                    
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">Taxa de Acerto</p>
                        <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-700 animate-accuracy-pulse">
                          {accuracy}%
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 animate-live-indicator">
                        <div className="relative">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-heartbeat" />
                          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-heartbeat-ring" />
                        </div>
                        <span className="text-xs text-emerald-400 font-bold">Ao Vivo</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated progress bar with heartbeat glow */}
                  <div className="relative h-3 sm:h-4 rounded-full bg-white/5 overflow-hidden">
                    <div className="absolute inset-0 rounded-full animate-bar-heartbeat" style={{
                      boxShadow: '0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 10px rgba(16, 185, 129, 0.1)'
                    }} />
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 relative transition-all duration-1000"
                      style={{ width: `${accuracy}%` }}
                    >
                      <div className="absolute inset-0 animate-bar-shine" style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                      }} />
                      {/* Pulsing end indicator */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white animate-pulse-glow" style={{
                        boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(16, 185, 129, 0.6)'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════════════
                CTA SECTION - MAIN FOCAL POINT WITH BREATHING GLOW
            ════════════════════════════════════════════════════════════════════════ */}
            <div className={`mt-8 sm:mt-12 transition-all duration-700 delay-200 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Main CTA Container with Breathing Glow */}
              <div className="relative w-full max-w-2xl mx-auto px-4">
                {/* Breathing glow background - Large focal effect */}
                <div className="absolute -inset-8 sm:-inset-12 rounded-3xl animate-breathing-glow pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.25) 0%, rgba(124, 58, 237, 0.15) 40%, transparent 70%)',
                  filter: 'blur(30px)'
                }} />
                
                <button
                  onClick={() => onPlatformSelect('FGJOGO')}
                  data-testid="platform-select-btn"
                  className="w-full block group relative"
                >
                  {/* Animated neon border - Breathing pulse */}
                  <div className="absolute -inset-[3px] rounded-2xl animate-cta-breathing-border" style={{
                    background: 'linear-gradient(90deg, #ef4444, #7c3aed, #3b82f6, #7c3aed, #ef4444)',
                    backgroundSize: '400% 100%'
                  }} />
                  
                  {/* Additional glow layer */}
                  <div className="absolute -inset-4 rounded-3xl animate-focal-pulse pointer-events-none" style={{
                    background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
                    filter: 'blur(15px)'
                  }} />
                  
                  {/* Main Card - Larger and more prominent */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-[#12121a] to-[#0a0a12] p-5 sm:p-6 border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300 group-hover:translate-y-[-6px] group-hover:shadow-2xl group-hover:shadow-red-500/30 overflow-hidden">
                    
                    {/* Shine sweep effect */}
                    <div className="absolute inset-0 animate-cta-shine-loop pointer-events-none" style={{
                      background: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 60%, transparent 80%)'
                    }} />
                    
                    {/* Content Layout */}
                    <div className="relative flex flex-col items-center text-center">
                      
                      {/* Platform Icon */}
                      <div className="relative mb-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-red-500/20 to-violet-500/15 border border-white/15 overflow-hidden animate-icon-float">
                          <div className="absolute inset-0 animate-glass-reflection pointer-events-none" style={{
                            background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)'
                          }} />
                          
                          {platformImage ? (
                            <img src={platformImage} alt="Platform" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-900/40 to-violet-900/30">
                              <span className="text-lg font-black text-white">FG</span>
                              <span className="text-lg font-black text-red-500">JOGO</span>
                            </div>
                          )}
                        </div>
                        <div className="absolute -inset-2 rounded-2xl border-2 border-red-500/40 animate-icon-glow-pulse" />
                      </div>
                      
                      {/* Large CTA Button - Premium Glass Style */}
                      <div className="relative w-full max-w-sm mb-4">
                        <button 
                          className="w-full py-4 sm:py-5 px-8 rounded-xl text-lg sm:text-xl font-bold tracking-wide transition-all duration-200 ease-out flex items-center justify-center gap-3 text-[#F1F5FF] hover:scale-[1.04] active:scale-[0.97] group"
                          style={{
                            background: 'rgba(40, 28, 18, 0.5)',
                            backdropFilter: 'blur(14px)',
                            WebkitBackdropFilter: 'blur(14px)',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            boxShadow: 'inset 0 1px 0 rgba(251, 191, 36, 0.15), 0 8px 24px rgba(0, 0, 0, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(50, 38, 22, 0.6)';
                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(251, 191, 36, 0.2), 0 0 0 1px rgba(251, 191, 36, 0.35), inset 0 1px 0 rgba(251, 191, 36, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(40, 28, 18, 0.5)';
                            e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(251, 191, 36, 0.15), 0 8px 24px rgba(0, 0, 0, 0.3)';
                          }}
                        >
                          <span>COMEÇAR AGORA</span>
                          <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Text under button */}
                      <p className="text-sm sm:text-base text-amber-400/90 font-semibold mb-2 animate-text-glow">
                        Entrar antes do próximo sinal
                      </p>
                      
                      {/* Secondary info */}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Ambiente seguro • Alta performance • Online 24h</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* ════════════════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════════════════ */}
        <footer ref={footerRef} className={`mt-12 sm:mt-16 bg-[#08080e] border-t border-white/5 transition-all duration-700 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* LINE 1: Responsibility Badges */}
          <div className="py-5 sm:py-6 border-b border-white/5 bg-[#0a0a12]">
            <div className="max-w-7xl mx-auto px-2 sm:px-6">
              <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-10">
                {responsibilityBadges.map((b, idx) => (
                  <div 
                    key={b.name} 
                    className={`flex items-center gap-1 sm:gap-3 text-gray-400 transition-all duration-500 hover:text-gray-300 ${footerVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[8px] sm:text-xs font-bold hover:bg-white/10 transition-all flex-shrink-0">
                      {b.icon}
                    </div>
                    <span className="text-[8px] sm:text-sm font-bold whitespace-nowrap">{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* LINE 2: Providers + Text */}
          <div className="py-5 border-b border-white/5 bg-[#09090f]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-3">
                {gameProviders.map((p, idx) => (
                  <div 
                    key={`f-${p.name}`}
                    className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:brightness-125 overflow-hidden ${footerVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      transitionDelay: `${200 + idx * 80}ms`
                    }}
                  >
                    {p.logo ? (
                      <img src={p.logo} alt={p.fullName} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-xs font-bold text-gray-400">{p.name}</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-600 italic">
                Outros fornecedores estão sendo adicionados constantemente...
              </p>
            </div>
          </div>
          
          {/* LINE 3: Platform Logos Grid */}
          <div className="py-6 bg-[#08080e]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5 max-w-4xl mx-auto">
                {platformLogos.map((p, idx) => (
                  <div 
                    key={p.name}
                    className={`aspect-square flex items-center justify-center overflow-hidden transition-all duration-300 ${footerVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${400 + idx * 50}ms` }}
                  >
                    {p.logo ? (
                      <img 
                        src={p.logo} 
                        alt={p.name} 
                        className="w-full h-full object-contain hover:scale-105 transition-all" 
                      />
                    ) : p.name === 'FGJOGO' ? (
                      <div className="flex flex-col items-center">
                        <span className="text-[8px] sm:text-[9px] font-bold text-white">FG</span>
                        <span className="text-[8px] sm:text-[9px] font-bold text-red-500">JOGO</span>
                      </div>
                    ) : (
                      <span className="text-[8px] sm:text-[9px] font-bold text-gray-600">{p.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="py-3 px-4 sm:px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span className="font-bold text-white">FG</span>
                <span className="font-bold text-red-500">JOGO</span>
                <span className="ml-2">© 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Tudo funcionando</span>
                <span className="sm:hidden">Online</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          PREMIUM ANIMATIONS
      ════════════════════════════════════════════════════════════════════════ */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* ═══════ LIVE ACTIVITY TICKER ANIMATIONS ═══════ */
        @keyframes ticker-slide {
          0% { transform: translateX(10px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-ticker-slide { animation: ticker-slide 0.5s ease-out; }
        
        @keyframes ticker-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(16, 185, 129, 0.5); }
          50% { text-shadow: 0 0 15px rgba(16, 185, 129, 0.8), 0 0 25px rgba(16, 185, 129, 0.4); }
        }
        .animate-ticker-glow { animation: ticker-glow 2s ease-in-out infinite; }
        
        @keyframes live-heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.3); }
          30% { transform: scale(1); }
          45% { transform: scale(1.2); }
          60% { transform: scale(1); }
        }
        .animate-live-heartbeat { animation: live-heartbeat 1.5s ease-in-out infinite; }
        
        @keyframes live-ping {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-live-ping { animation: live-ping 1.5s ease-out infinite; }

        /* ═══════ HEARTBEAT ACCURACY BAR ANIMATIONS ═══════ */
        @keyframes heartbeat-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          15% { opacity: 0.8; transform: scale(1.02); }
          30% { opacity: 0.4; transform: scale(1); }
          45% { opacity: 0.7; transform: scale(1.01); }
          60% { opacity: 0.3; transform: scale(1); }
        }
        .animate-heartbeat-glow { animation: heartbeat-glow 2s ease-in-out infinite; }
        
        @keyframes accuracy-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-accuracy-pulse { animation: accuracy-pulse 3s ease-in-out infinite; }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          15% { transform: scale(1.4); box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.4); }
          30% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          45% { transform: scale(1.3); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3); }
          60% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        
        @keyframes heartbeat-ring {
          0%, 100% { transform: scale(1); opacity: 0; }
          15% { transform: scale(2); opacity: 0.5; }
          30% { transform: scale(3); opacity: 0; }
        }
        .animate-heartbeat-ring { animation: heartbeat-ring 1.5s ease-out infinite; }
        
        @keyframes bar-heartbeat {
          0%, 100% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.2); }
          15% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3); }
          30% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.2); }
          45% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          60% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.2); }
        }
        .animate-bar-heartbeat { animation: bar-heartbeat 2s ease-in-out infinite; }
        
        @keyframes live-indicator {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.6); }
        }
        .animate-live-indicator { animation: live-indicator 2s ease-in-out infinite; }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; box-shadow: 0 0 10px rgba(255,255,255,0.6); }
          50% { opacity: 1; box-shadow: 0 0 20px rgba(255,255,255,1), 0 0 30px rgba(16, 185, 129, 0.8); }
        }
        .animate-pulse-glow { animation: pulse-glow 1s ease-in-out infinite; }

        /* ═══════ RECENT WINS FEED ANIMATIONS ═══════ */
        @keyframes feed-slide-in {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-feed-slide-in { animation: feed-slide-in 0.4s ease-out; }

        /* ═══════ MAIN CTA FOCAL POINT ANIMATIONS ═══════ */
        @keyframes breathing-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-breathing-glow { animation: breathing-glow 3s ease-in-out infinite; }
        
        @keyframes cta-breathing-border {
          0% { background-position: 0% 50%; opacity: 0.7; }
          50% { background-position: 100% 50%; opacity: 1; }
          100% { background-position: 200% 50%; opacity: 0.7; }
        }
        .animate-cta-breathing-border { animation: cta-breathing-border 4s ease-in-out infinite; }
        
        @keyframes focal-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-focal-pulse { animation: focal-pulse 2s ease-in-out infinite; }
        
        @keyframes button-breathe {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 15px 40px rgba(239, 68, 68, 0.6); }
        }
        .animate-button-breathe { animation: button-breathe 2s ease-in-out infinite; }
        
        @keyframes button-inner-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-button-inner-glow { animation: button-inner-glow 2s ease-in-out infinite; }
        
        @keyframes button-shine-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-button-shine-fast { animation: button-shine-fast 2s ease-in-out infinite; }
        
        @keyframes arrow-pulse {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .animate-arrow-pulse { animation: arrow-pulse 1s ease-in-out infinite; }
        
        @keyframes icon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-icon-float { animation: icon-float 3s ease-in-out infinite; }
        
        @keyframes icon-glow-pulse {
          0%, 100% { opacity: 0.4; box-shadow: 0 0 10px rgba(239, 68, 68, 0.3); }
          50% { opacity: 0.8; box-shadow: 0 0 25px rgba(239, 68, 68, 0.6); }
        }
        .animate-icon-glow-pulse { animation: icon-glow-pulse 2s ease-in-out infinite; }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(251, 191, 36, 0.3); }
          50% { text-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 0 25px rgba(251, 191, 36, 0.3); }
        }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }

        /* Background */
        @keyframes bg-breathing {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.02); }
        }
        .animate-bg-breathing { animation: bg-breathing 8s ease-in-out infinite; }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-glow-pulse { animation: glow-pulse 6s ease-in-out infinite; }
        .animate-glow-pulse-delay { animation: glow-pulse 6s ease-in-out infinite 3s; }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-25px) translateX(8px); opacity: 0.5; }
        }
        .animate-float-particle { animation: float-particle var(--duration, 12s) ease-in-out infinite; }

        @keyframes star-sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-star-sparkle { animation: star-sparkle 3s ease-in-out infinite; }

        @keyframes beam-pass {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-beam-pass { animation: beam-pass 12s ease-in-out infinite; }
        .animate-beam-pass-delay { animation: beam-pass 15s ease-in-out infinite 5s; }

        /* Title */
        @keyframes title-entrance {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-title-entrance { 
          animation: title-entrance 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Arcade Core */
        @keyframes ring-ultra-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-ring-ultra-slow { animation: ring-ultra-slow 60s linear infinite; }

        @keyframes ring-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-ring-slow-reverse { animation: ring-slow-reverse 45s linear infinite; }

        @keyframes ring-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.02); opacity: 0.7; }
        }
        .animate-ring-pulse { animation: ring-pulse 4s ease-in-out infinite; }

        @keyframes core-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-core-glow { animation: core-glow 5s ease-in-out infinite; }

        @keyframes nucleus-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 60px rgba(124, 58, 237, 0.4); }
          50% { transform: scale(1.03); box-shadow: 0 0 80px rgba(124, 58, 237, 0.6); }
        }
        .animate-nucleus-pulse { animation: nucleus-pulse 4s ease-in-out infinite; }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .animate-scanline { animation: scanline 5s ease-in-out infinite; }

        /* Orbits - different speeds for parallax */
        @keyframes orbit-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-orbit-fast { animation: orbit-fast 12s linear infinite; }

        @keyframes orbit-medium {
          from { transform: rotate(120deg); }
          to { transform: rotate(480deg); }
        }
        .animate-orbit-medium { animation: orbit-medium 18s linear infinite; }

        @keyframes orbit-slow {
          from { transform: rotate(240deg); }
          to { transform: rotate(600deg); }
        }
        .animate-orbit-slow { animation: orbit-slow 25s linear infinite; }

        @keyframes particle-float {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-15px); opacity: 0.8; }
        }
        .animate-particle-float { animation: particle-float 3s ease-in-out infinite; }

        /* Cards */
        @keyframes border-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        .animate-border-glow { animation: border-glow 3s ease-in-out infinite; }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-subtle { animation: pulse-subtle 2.5s ease-in-out infinite; }

        @keyframes bar-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-bar-shine { animation: bar-shine 2s linear infinite; }

        /* CTA */
        @keyframes border-neon {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        .animate-border-neon { animation: border-neon 4s linear infinite; }

        @keyframes cta-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-cta-shine { animation: cta-shine 4s ease-in-out infinite; }

        @keyframes glass-reflection {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        .animate-glass-reflection { animation: glass-reflection 5s ease-in-out infinite; }

        @keyframes thumbnail-glow-blue {
          0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.5); }
        }
        .animate-thumbnail-glow-blue { animation: thumbnail-glow-blue 3s ease-in-out infinite; }

        @keyframes arrow-nudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-arrow-nudge { animation: arrow-nudge 1.5s ease-in-out infinite; }

        /* ═══════ PREMIUM MARIO HOLOGRAM ANIMATIONS ═══════ */
        
        /* Mario breathing motion - 0.98 → 1.00 → 0.98 (3-4s) */
        @keyframes mario-breathe {
          0%, 100% { transform: scale(0.98); }
          50% { transform: scale(1.0); }
        }
        .animate-mario-breathe { animation: mario-breathe 3.5s ease-in-out infinite; }
        
        /* Mario floating - up/down 8px (5s) */
        @keyframes mario-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-mario-float { animation: mario-float 5s ease-in-out infinite; }
        
        /* Premium scanline - passes every 2.5s with brightness */
        @keyframes scanline-premium {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.8; }
          50% { opacity: 1; }
          90% { opacity: 0.8; }
          100% { transform: translateY(600%); opacity: 0; }
        }
        .animate-scanline-premium { animation: scanline-premium 2.5s ease-in-out infinite; }
        
        /* Hologram shimmer/noise effect - very subtle */
        @keyframes holo-shimmer {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          25% { opacity: 0.5; transform: translateY(-1px); }
          50% { opacity: 0.3; transform: translateY(1px); }
          75% { opacity: 0.4; transform: translateY(-0.5px); }
        }
        .animate-holo-shimmer { animation: holo-shimmer 0.4s ease-in-out infinite; }
        .animate-mario-shimmer { animation: holo-shimmer 0.5s ease-in-out infinite; }
        
        /* Glitch spark effect - 1-2 frames */
        @keyframes glitch-spark {
          0% { 
            transform: translate(-2px, 1px) skewX(-2deg);
            filter: brightness(1.8) hue-rotate(20deg);
          }
          50% { 
            transform: translate(2px, -1px) skewX(2deg);
            filter: brightness(2) hue-rotate(-20deg);
          }
          100% { 
            transform: translate(0, 0) skewX(0deg);
            filter: brightness(1);
          }
        }
        .animate-glitch-spark { animation: glitch-spark 0.08s linear; }
        
        /* Radar rings - expand/fade repeatedly */
        @keyframes radar-ring-1 {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 0.4;
            border-color: rgba(124, 58, 237, 0.3);
          }
          50% { 
            transform: scale(1.08) rotate(180deg); 
            opacity: 0.7;
            border-color: rgba(124, 58, 237, 0.5);
          }
        }
        .animate-radar-ring-1 { animation: radar-ring-1 8s ease-in-out infinite; }
        
        @keyframes radar-ring-2 {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.05) rotate(-120deg); 
            opacity: 0.6;
          }
        }
        .animate-radar-ring-2 { animation: radar-ring-2 6s ease-in-out infinite 1s; }
        
        @keyframes radar-ring-3 {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.35;
            box-shadow: 0 0 20px rgba(124, 58, 237, 0.18);
          }
          50% { 
            transform: scale(1.03); 
            opacity: 0.55;
            box-shadow: 0 0 35px rgba(124, 58, 237, 0.3);
          }
        }
        .animate-radar-ring-3 { animation: radar-ring-3 4s ease-in-out infinite 0.5s; }
        
        /* Core glow premium */
        @keyframes core-glow-premium {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.02); }
        }
        .animate-core-glow-premium { animation: core-glow-premium 5s ease-in-out infinite; }
        
        /* Nucleus breathing */
        @keyframes nucleus-breathe {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 50px rgba(124, 58, 237, 0.35), inset 0 0 30px rgba(59, 130, 246, 0.2);
          }
          50% { 
            transform: scale(1.03);
            box-shadow: 0 0 70px rgba(124, 58, 237, 0.5), inset 0 0 40px rgba(59, 130, 246, 0.3);
          }
        }
        .animate-nucleus-breathe { animation: nucleus-breathe 3.5s ease-in-out infinite; }
        
        /* Shadow breathing sync with Mario */
        @keyframes shadow-breathe {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }
        .animate-shadow-breathe { animation: shadow-breathe 5s ease-in-out infinite; }
        
        /* ═══════ ORBITING ITEMS WITH PARALLAX ═══════ */
        
        /* Coin orbit - fastest (18s) */
        @keyframes orbit-coin-parallax {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-orbit-coin-parallax { animation: orbit-coin-parallax 18s linear infinite; }
        
        /* Coin 3D spin */
        @keyframes coin-3d-spin {
          0% { transform: rotateY(0deg) scale(1); }
          25% { transform: rotateY(90deg) scale(0.9); }
          50% { transform: rotateY(180deg) scale(1); }
          75% { transform: rotateY(270deg) scale(0.9); }
          100% { transform: rotateY(360deg) scale(1); }
        }
        .animate-coin-3d-spin { animation: coin-3d-spin 4s linear infinite; }
        
        /* Star orbit - medium (25s) */
        @keyframes orbit-star-parallax {
          from { transform: rotate(90deg); }
          to { transform: rotate(450deg); }
        }
        .animate-orbit-star-parallax { animation: orbit-star-parallax 25s linear infinite; }
        
        /* Star pulse premium */
        @keyframes star-pulse-premium {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.15) rotate(10deg); opacity: 1; }
        }
        .animate-star-pulse-premium { animation: star-pulse-premium 3s ease-in-out infinite; }
        
        /* Mushroom orbit - slowest (35s) */
        @keyframes orbit-mushroom-parallax {
          from { transform: rotate(180deg); }
          to { transform: rotate(540deg); }
        }
        .animate-orbit-mushroom-parallax { animation: orbit-mushroom-parallax 35s linear infinite; }
        
        /* Mushroom bob */
        @keyframes mushroom-bob {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.05); }
        }
        .animate-mushroom-bob { animation: mushroom-bob 2.5s ease-in-out infinite; }
        
        /* Ambient particle float */
        @keyframes particle-ambient {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-15px) translateX(5px); opacity: 0.7; }
        }
        .animate-particle-ambient { animation: particle-ambient 4s ease-in-out infinite; }
        
        /* Energy flow */
        @keyframes energy-flow {
          0% { stroke-dashoffset: 20; opacity: 0.3; }
          50% { stroke-dashoffset: 0; opacity: 0.6; }
          100% { stroke-dashoffset: -20; opacity: 0.3; }
        }
        .animate-energy-flow { animation: energy-flow 2s linear infinite; }
        
        /* ═══════ LIVE SIGNALS ANIMATIONS ═══════ */
        @keyframes live-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
        }
        .animate-live-pulse { animation: live-pulse 2s ease-in-out infinite; }
        
        /* ═══════ ENHANCED CTA ANIMATIONS ═══════ */
        @keyframes cta-border-glow {
          0% { background-position: 0% 50%; opacity: 0.7; }
          50% { background-position: 150% 50%; opacity: 1; }
          100% { background-position: 300% 50%; opacity: 0.7; }
        }
        .animate-cta-border-glow { animation: cta-border-glow 4s linear infinite; }
        
        @keyframes cta-shine-loop {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        .animate-cta-shine-loop { animation: cta-shine-loop 3s ease-in-out infinite; }
        
        @keyframes button-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-button-shine { animation: button-shine 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default PlatformSelector;
