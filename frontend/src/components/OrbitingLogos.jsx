import React, { useState, useEffect } from 'react';

// Platform logos configuration
const orbitingPlatforms = [
  { name: 'AGJOGO', logo: '/assets/platforms/agjogo.png', link: 'http://agmarioai.agjogo7.com/?referralCode=lpy4931' },
  { name: 'DGJOGO', logo: '/assets/platforms/dgjogo.png', link: 'https://dgjogo7.com/?ch=740005&ic=6010775244#/register' },
  { name: 'YGJOGO', logo: '/assets/platforms/ygjogo.png', link: 'https://ygjogo7.com/?ch=550005&ic=601074331#/register' },
  { name: 'MGJOGO', logo: '/assets/platforms/mgjogo.png', link: 'https://mgjogo7.com/?ch=350001&ic=140492914#/register' },
  { name: 'HGJOGO', logo: '/assets/platforms/hgjogo.png', link: 'https://hgjogo7.com/en/?ch=110006&ic=140396339#/register' },
  { name: 'EGJOGO', logo: '/assets/platforms/egjogo.png', link: 'https://egjogo7.com/?ch=380004&ic=140492360#/register' },
  { name: 'FGJOGO', logo: '/assets/platforms/fgjogo.png', link: 'https://fgjogo7.com/?ch=230004&ic=140225696#/register' },
  { name: 'WGJOGO', logo: '/assets/platforms/wgjogo.png', link: 'http://wgmarioai.wgjogo7.com/?referralCode=mwc9216' },
  { name: 'BGJOGO', logo: '/assets/platforms/bgjogo.png', link: 'https://www.bgjogo7.com/register?r=tay1201' },
];

const OrbitingLogos = () => {
  const [dimensions, setDimensions] = useState({ 
    radius: 220, 
    logoSize: 70 
  });

  // Responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 480) {
        // Mobile small
        setDimensions({ radius: 115, logoSize: 42 });
      } else if (width < 640) {
        // Mobile
        setDimensions({ radius: 135, logoSize: 50 });
      } else if (width < 1024) {
        // Tablet
        setDimensions({ radius: 170, logoSize: 58 });
      } else {
        // Desktop
        setDimensions({ radius: 220, logoSize: 70 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const logoCount = orbitingPlatforms.length;
  const { radius: ORBIT_RADIUS, logoSize: LOGO_SIZE } = dimensions;
  const ORBIT_DURATION = 30; // Seconds for one complete rotation
  const CONTAINER_SIZE = (ORBIT_RADIUS + LOGO_SIZE) * 2 + 20; // Extra space for logos

  return (
    <div 
      className="absolute flex items-center justify-center pointer-events-none"
      style={{
        // Center the orbit container
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${CONTAINER_SIZE}px`,
        height: `${CONTAINER_SIZE}px`,
      }}
    >
      
      {/* Subtle outer glow */}
      <div 
        className="absolute rounded-full animate-pulse-subtle"
        style={{
          width: `${ORBIT_RADIUS * 2 + 60}px`,
          height: `${ORBIT_RADIUS * 2 + 60}px`,
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 60%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Orbit circle indicator (dashed) */}
      <div 
        className="absolute rounded-full animate-orbit-spin-slow"
        style={{
          width: `${ORBIT_RADIUS * 2}px`,
          height: `${ORBIT_RADIUS * 2}px`,
          border: '1px dashed rgba(124, 58, 237, 0.15)',
        }}
      />

      {/* Main orbit container for logos - this rotates */}
      <div 
        className="absolute animate-orbit-spin"
        style={{
          width: `${ORBIT_RADIUS * 2}px`,
          height: `${ORBIT_RADIUS * 2}px`,
        }}
      >
        {/* Orbiting logos - positioned at fixed points on the circle */}
        {orbitingPlatforms.map((platform, index) => {
          // Calculate angle for each logo (evenly distributed)
          const angle = (360 / logoCount) * index;
          
          return (
            <div
              key={platform.name}
              className="absolute"
              style={{
                // Position at center of container
                left: '50%',
                top: '50%',
                // Size of logo
                width: `${LOGO_SIZE}px`,
                height: `${LOGO_SIZE}px`,
                // Offset to orbit edge and center the logo
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translateY(-${ORBIT_RADIUS}px)
                `,
              }}
            >
              {/* Logo wrapper - counter-rotates to stay upright */}
              <div 
                className="w-full h-full animate-counter-spin"
                style={{
                  '--counter-angle': `-${angle}deg`,
                }}
              >
                {/* Logo image - clickable link to platform */}
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full pointer-events-auto cursor-pointer transition-transform duration-200 hover:scale-110"
                  data-testid={`orbit-logo-${platform.name.toLowerCase()}`}
                >
                  <img 
                    src={platform.logo} 
                    alt={platform.name}
                    className="w-full h-full object-contain"
                    style={{
                      // Soft white/neon glow
                      filter: `
                        drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))
                        drop-shadow(0 0 12px rgba(124, 58, 237, 0.25))
                      `,
                    }}
                    loading="lazy"
                    draggable={false}
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating particles for depth */}
      {[...Array(8)].map((_, i) => {
        const angle = (360 / 8) * i + 22.5;
        const distance = ORBIT_RADIUS + LOGO_SIZE/2 + 15 + (i % 3) * 10;
        const size = 2 + (i % 3);
        const delay = i * 0.5;
        
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
              background: i % 2 === 0 ? '#a855f7' : '#3b82f6',
              opacity: 0.3,
              boxShadow: `0 0 5px ${i % 2 === 0 ? '#a855f7' : '#3b82f6'}`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}

      {/* CSS Animations */}
      <style>{`
        /* Main orbit rotation - 30 seconds for full rotation (smooth) */
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-orbit-spin { 
          animation: orbit-spin ${ORBIT_DURATION}s linear infinite; 
        }

        /* Slower spin for the dashed circle */
        .animate-orbit-spin-slow { 
          animation: orbit-spin ${ORBIT_DURATION * 2}s linear infinite; 
        }

        /* Counter rotation to keep logos upright */
        @keyframes counter-spin {
          from { transform: rotate(calc(var(--counter-angle) + 0deg)); }
          to { transform: rotate(calc(var(--counter-angle) - 360deg)); }
        }
        .animate-counter-spin { 
          animation: counter-spin ${ORBIT_DURATION}s linear infinite; 
        }

        /* Subtle pulse for outer glow */
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.03); }
        }
        .animate-pulse-subtle { 
          animation: pulse-subtle 4s ease-in-out infinite; 
        }

        /* Floating particles */
        @keyframes float-particle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        .animate-float-particle { 
          animation: float-particle 3s ease-in-out infinite; 
        }
      `}</style>
    </div>
  );
};

export default OrbitingLogos;
