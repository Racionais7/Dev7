import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

// Platform logos configuration
const orbitingPlatforms = [
  { name: 'AGJOGO', logo: '/assets/platforms/agjogo.png' },
  { name: 'DGJOGO', logo: '/assets/platforms/dgjogo.png' },
  { name: 'YGJOGO', logo: '/assets/platforms/ygjogo.png' },
  { name: 'MGJOGO', logo: '/assets/platforms/mgjogo.png' },
  { name: 'HGJOGO', logo: '/assets/platforms/hgjogo.png' },
  { name: 'EGJOGO', logo: '/assets/platforms/egjogo.png' },
  { name: 'FGJOGO', logo: '/assets/platforms/fgjogo.png' },
  { name: 'WGJOGO', logo: '/assets/platforms/wgjogo.png' },
  { name: 'BGJOGO', logo: '/assets/platforms/bgjogo.png' },
];

const OrbitingLogos = ({ mousePosition = { x: 0, y: 0 }, glitchActive = false }) => {
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Smooth rotation animation - slower for better visual
  useAnimationFrame((time) => {
    setRotation((time / 100) % 360); // Slower rotation (was 80)
  });

  const logoCount = orbitingPlatforms.length;
  
  // Responsive orbit radius
  const getOrbitRadius = () => {
    if (typeof window === 'undefined') return 140;
    if (window.innerWidth < 640) return 110; // Mobile
    if (window.innerWidth < 1024) return 140; // Tablet
    return 165; // Desktop
  };
  
  const orbitRadius = getOrbitRadius();
  const logoSize = isMobile ? 32 : 44; // Smaller logos

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
        transform: `perspective(1000px) rotateX(${-mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
    >
      {/* Orbit path glow effect */}
      <div 
        className="absolute rounded-full animate-orbit-glow-pulse"
        style={{
          width: `${orbitRadius * 2 + 60}px`,
          height: `${orbitRadius * 2 + 60}px`,
          border: '1px solid rgba(124, 58, 237, 0.15)',
          boxShadow: `
            0 0 40px rgba(124, 58, 237, 0.08),
            inset 0 0 40px rgba(59, 130, 246, 0.05)
          `
        }}
      />

      {/* Energy trail ring */}
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: `${orbitRadius * 2 + 30}px`,
          height: `${orbitRadius * 2 + 30}px`,
        }}
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from ${rotation}deg,
              transparent 0%,
              rgba(124, 58, 237, 0.25) 15%,
              rgba(59, 130, 246, 0.35) 30%,
              rgba(124, 58, 237, 0.25) 45%,
              transparent 60%,
              transparent 100%
            )`,
            filter: 'blur(12px)',
          }}
        />
      </div>

      {/* Subtle orbit path */}
      <svg 
        className="absolute"
        style={{
          width: `${orbitRadius * 2 + 20}px`,
          height: `${orbitRadius * 2 + 20}px`,
        }}
        viewBox="0 0 400 400"
      >
        <defs>
          <linearGradient id="orbitPathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3">
              <animate attributeName="stopOpacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4">
              <animate attributeName="stopOpacity" values="0.4;0.6;0.4" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3">
              <animate attributeName="stopOpacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <circle 
          cx="200" 
          cy="200" 
          r={orbitRadius * (400 / (orbitRadius * 2 + 20))} 
          fill="none" 
          stroke="url(#orbitPathGradient)" 
          strokeWidth="1.5"
          strokeDasharray="4,8"
          style={{
            transform: `rotate(${rotation * 0.5}deg)`,
            transformOrigin: 'center'
          }}
        />
      </svg>

      {/* Orbiting logos */}
      {orbitingPlatforms.map((platform, index) => {
        const angle = (360 / logoCount) * index + rotation;
        const radian = (angle * Math.PI) / 180;
        
        // Calculate position
        const x = Math.cos(radian) * orbitRadius;
        const y = Math.sin(radian) * orbitRadius;
        
        // Depth effect: calculate based on Y position in the orbit
        // When sin(radian) > 0, the logo is in the "back" half of the orbit
        const depth = Math.sin(radian); // -1 (front) to 1 (back)
        const normalizedDepth = (depth + 1) / 2; // 0 (front) to 1 (back)
        
        // Scale: larger in front (1.0), smaller in back (0.6)
        const scale = 1.0 - (normalizedDepth * 0.4);
        
        // Opacity: more opaque in front (1.0), less in back (0.35)
        const opacity = 1.0 - (normalizedDepth * 0.65);
        
        // Brightness: brighter in front, dimmer in back
        const brightness = 1.2 - (normalizedDepth * 0.5);
        
        // Z-index: front logos above Mario, back logos behind
        const zIndex = depth < 0 ? 30 : 5;
        
        // Glow intensity based on position
        const glowIntensity = (1 - normalizedDepth) * 0.6;
        
        return (
          <motion.div
            key={platform.name}
            className="absolute"
            style={{
              zIndex,
              transform: `translate(${x}px, ${y}px)`,
            }}
            initial={false}
          >
            {/* Logo container */}
            <div 
              className="relative transition-all duration-200 ease-out"
              style={{
                width: `${logoSize}px`,
                height: `${logoSize}px`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity,
              }}
            >
              {/* Glow effect behind logo */}
              <div 
                className="absolute inset-[-4px] rounded-xl"
                style={{
                  background: `radial-gradient(circle, rgba(124, 58, 237, ${glowIntensity}) 0%, rgba(59, 130, 246, ${glowIntensity * 0.5}) 50%, transparent 70%)`,
                  filter: 'blur(8px)',
                  opacity: depth < 0 ? 1 : 0.3,
                }}
              />
              
              {/* Logo card */}
              <div 
                className="relative w-full h-full rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(12, 12, 20, 0.85)',
                  border: `1px solid rgba(124, 58, 237, ${0.2 + glowIntensity * 0.3})`,
                  boxShadow: `
                    0 0 ${10 + glowIntensity * 15}px rgba(124, 58, 237, ${glowIntensity * 0.4}),
                    0 0 ${5 + glowIntensity * 10}px rgba(59, 130, 246, ${glowIntensity * 0.3})
                  `,
                  filter: `brightness(${brightness})`,
                }}
              >
                <img 
                  src={platform.logo} 
                  alt={platform.name}
                  className="w-full h-full object-contain p-1.5"
                  loading="lazy"
                />
                
                {/* Shine effect on front logos */}
                {depth < -0.3 && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
                    }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Energy particles following orbit */}
      {[...Array(16)].map((_, i) => {
        const particleAngle = (360 / 16) * i + rotation * 1.3;
        const particleRadian = (particleAngle * Math.PI) / 180;
        const particleRadius = orbitRadius - 5 + Math.sin(i * 0.7) * 10;
        const particleX = Math.cos(particleRadian) * particleRadius;
        const particleY = Math.sin(particleRadian) * particleRadius;
        const particleDepth = Math.sin(particleRadian);
        const particleOpacity = 0.2 + (1 - (particleDepth + 1) / 2) * 0.6;
        
        return (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              transform: `translate(${particleX}px, ${particleY}px) translate(-50%, -50%)`,
              background: i % 2 === 0 ? '#7c3aed' : '#3b82f6',
              opacity: particleOpacity,
              boxShadow: `0 0 ${4 + particleOpacity * 4}px ${i % 2 === 0 ? '#7c3aed' : '#3b82f6'}`,
              zIndex: particleDepth > 0 ? 2 : 25,
            }}
          />
        );
      })}

      {/* CSS Animations */}
      <style>{`
        @keyframes orbit-glow-pulse {
          0%, 100% { 
            opacity: 0.7;
            box-shadow: 0 0 40px rgba(124, 58, 237, 0.08), inset 0 0 40px rgba(59, 130, 246, 0.05);
          }
          50% { 
            opacity: 1;
            box-shadow: 0 0 60px rgba(124, 58, 237, 0.15), inset 0 0 60px rgba(59, 130, 246, 0.1);
          }
        }
        .animate-orbit-glow-pulse { 
          animation: orbit-glow-pulse 4s ease-in-out infinite; 
        }
      `}</style>
    </div>
  );
};

export default OrbitingLogos;
