import React from 'react';

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

const OrbitingLogos = () => {
  const logoCount = orbitingPlatforms.length;
  
  // Responsive orbit radius
  const orbitRadiusSm = 100; // Mobile
  const orbitRadiusMd = 130; // Tablet
  const orbitRadiusLg = 160; // Desktop
  
  const logoSize = 42; // Logo container size

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      
      {/* Outer glow ring */}
      <div 
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: 'clamp(240px, 50vw, 380px)',
          height: 'clamp(240px, 50vw, 380px)',
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.06) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Main orbit container - this rotates */}
      <div 
        className="absolute rounded-full animate-orbit-spin"
        style={{
          width: 'clamp(220px, 45vw, 350px)',
          height: 'clamp(220px, 45vw, 350px)',
          border: '1px dashed rgba(45, 212, 191, 0.25)',
          boxShadow: `
            0 0 30px rgba(45, 212, 191, 0.08),
            inset 0 0 30px rgba(45, 212, 191, 0.05)
          `,
        }}
      >
        {/* Inner dashed ring */}
        <div 
          className="absolute inset-4 rounded-full"
          style={{
            border: '1px dashed rgba(45, 212, 191, 0.15)',
          }}
        />

        {/* Orbiting logos - positioned at fixed points on the circle */}
        {orbitingPlatforms.map((platform, index) => {
          // Calculate angle for each logo (evenly distributed)
          const angle = (360 / logoCount) * index;
          const radian = (angle * Math.PI) / 180;
          
          return (
            <div
              key={platform.name}
              className="absolute"
              style={{
                // Position at center of container
                left: '50%',
                top: '50%',
                // Size of logo container
                width: `${logoSize}px`,
                height: `${logoSize}px`,
                // Offset to orbit edge and center the logo
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateY(calc(-1 * clamp(${orbitRadiusSm}px, 22vw, ${orbitRadiusLg}px)))
                `,
              }}
            >
              {/* Logo wrapper - counter-rotates to stay upright */}
              <div 
                className="w-full h-full animate-counter-spin"
                style={{
                  // Counter-rotate includes the initial angle offset
                  '--counter-angle': `-${angle}deg`,
                }}
              >
                {/* Logo container with glow */}
                <div 
                  className="relative w-full h-full rounded-full overflow-hidden transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(10, 10, 10, 0.95)',
                    border: '1px solid rgba(45, 212, 191, 0.4)',
                    boxShadow: `
                      0 0 15px rgba(45, 212, 191, 0.2),
                      0 0 30px rgba(45, 212, 191, 0.1),
                      inset 0 0 10px rgba(45, 212, 191, 0.05)
                    `,
                  }}
                >
                  <img 
                    src={platform.logo} 
                    alt={platform.name}
                    className="w-full h-full object-contain p-1.5"
                    loading="lazy"
                    draggable={false}
                  />
                  
                  {/* Subtle shine effect */}
                  <div 
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => {
        const angle = (360 / 12) * i;
        const distance = 100 + Math.random() * 60;
        const size = 2 + Math.random() * 2;
        const delay = Math.random() * 5;
        const duration = 3 + Math.random() * 2;
        
        return (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: '50%',
              top: '50%',
              transform: `
                translate(-50%, -50%)
                rotate(${angle}deg)
                translateY(-${distance}px)
              `,
              background: i % 2 === 0 ? '#2dd4bf' : '#7c3aed',
              opacity: 0.4,
              boxShadow: `0 0 6px ${i % 2 === 0 ? '#2dd4bf' : '#7c3aed'}`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}

      {/* CSS Animations */}
      <style>{`
        /* Main orbit rotation - 20 seconds for full rotation */
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-orbit-spin { 
          animation: orbit-spin 20s linear infinite; 
        }

        /* Counter rotation to keep logos upright */
        @keyframes counter-spin {
          from { transform: rotate(calc(var(--counter-angle) + 0deg)); }
          to { transform: rotate(calc(var(--counter-angle) - 360deg)); }
        }
        .animate-counter-spin { 
          animation: counter-spin 20s linear infinite; 
        }

        /* Pulse glow effect */
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-glow { 
          animation: pulse-glow 4s ease-in-out infinite; 
        }

        /* Floating particles */
        @keyframes float-particle {
          0%, 100% { 
            opacity: 0.2; 
            transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateY(var(--distance, -100px)) scale(0.8);
          }
          50% { 
            opacity: 0.6; 
            transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateY(calc(var(--distance, -100px) - 15px)) scale(1.2);
          }
        }
        .animate-float-particle { 
          animation: float-particle 3s ease-in-out infinite; 
        }
      `}</style>
    </div>
  );
};

export default OrbitingLogos;
