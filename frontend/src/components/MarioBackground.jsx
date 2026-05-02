import React from 'react';

/**
 * Mario-themed animated background with parallax layers.
 *
 * Layers (back → front):
 *  1. Night-sky twilight gradient (handled by parent)
 *  2. Distant pixel hills silhouette
 *  3. Slow-drifting pixel clouds
 *  4. Floating spinning coins (scattered, ambient)
 *  5. Pixel bushes (closer)
 *  6. Side pipes (decorative)
 *  7. Brick-pattern ground at very bottom
 *
 * Uses generated pixel-art PNGs with image-rendering: pixelated.
 * All animations are pure CSS (GPU transform) — zero JS cost.
 * Low opacity + purple/blue drop-shadows to blend with the neon site theme.
 */

const MarioBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]" aria-hidden data-testid="mario-background">

      {/* ═══════ LAYER A: Twilight sky glow (subtle additive) ═══════ */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(88, 28, 160, 0.25) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(14, 50, 120, 0.3) 0%, transparent 55%)',
        }}
      />

      {/* ═══════ LAYER B: Clouds drifting (multiple speeds for parallax) ═══════ */}
      <div className="absolute inset-x-0 top-0 h-[60vh] overflow-hidden">
        {[
          { top: '8%',  dur: 120, delay: 0,    scale: 1.1, op: 0.22 },
          { top: '18%', dur: 90,  delay: -40,  scale: 0.8, op: 0.14 },
          { top: '28%', dur: 150, delay: -20,  scale: 1.4, op: 0.18 },
          { top: '40%', dur: 110, delay: -80,  scale: 0.95, op: 0.12 },
          { top: '52%', dur: 130, delay: -100, scale: 1.2, op: 0.1 },
        ].map((c, i) => (
          <img
            key={`cloud-${i}`}
            src="/assets/mario_game/bg-cloud.png"
            alt=""
            className="absolute"
            style={{
              top: c.top,
              left: '-200px',
              width: `${128 * c.scale}px`,
              imageRendering: 'pixelated',
              opacity: c.op,
              filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.45)) drop-shadow(0 0 22px rgba(96, 165, 250, 0.25))',
              animation: `mbg-cloud-drift ${c.dur}s linear infinite`,
              animationDelay: `${c.delay}s`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* ═══════ LAYER C: Floating coins (ambient decoration) ═══════ */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { left: '6%',  top: '20%', dur: 4, delay: 0 },
          { left: '92%', top: '15%', dur: 5, delay: 1 },
          { left: '14%', top: '70%', dur: 4.5, delay: 2 },
          { left: '88%', top: '65%', dur: 3.8, delay: 0.5 },
          { left: '3%',  top: '45%', dur: 5.5, delay: 1.5 },
          { left: '95%', top: '40%', dur: 4.2, delay: 2.5 },
          { left: '20%', top: '85%', dur: 4.8, delay: 0.8 },
          { left: '78%', top: '90%', dur: 5.2, delay: 1.8 },
        ].map((c, i) => (
          <img
            key={`bgcoin-${i}`}
            src="/assets/mario_game/bg-coin.png"
            alt=""
            className="absolute"
            style={{
              left: c.left,
              top: c.top,
              width: '28px',
              height: '28px',
              imageRendering: 'pixelated',
              opacity: 0.5,
              filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 16px rgba(253, 224, 71, 0.5))',
              animation: `mbg-coin-float ${c.dur}s ease-in-out infinite, mbg-coin-spin ${c.dur * 0.5}s linear infinite`,
              animationDelay: `${c.delay}s, ${c.delay}s`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* ═══════ LAYER D: Distant hills silhouette (bottom) ═══════ */}
      <div className="absolute inset-x-0 bottom-[30vh] pointer-events-none">
        <div className="flex items-end justify-around" style={{ opacity: 0.18 }}>
          {[1.4, 1.8, 1.2, 2.0, 1.6, 1.3].map((scale, i) => (
            <img
              key={`hill-${i}`}
              src="/assets/mario_game/bg-hill.png"
              alt=""
              style={{
                width: `${120 * scale}px`,
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 0 14px rgba(124, 58, 237, 0.65)) drop-shadow(0 0 28px rgba(88, 28, 160, 0.4))',
                transform: `translateY(${8 * (i % 2)}px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ═══════ LAYER E: Side pipes (decorative) ═══════ */}
      <img
        src="/assets/mario_game/bg-pipe.png"
        alt=""
        className="absolute hidden lg:block"
        style={{
          left: '2%',
          bottom: '18vh',
          width: '90px',
          imageRendering: 'pixelated',
          opacity: 0.35,
          filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.6)) drop-shadow(0 0 24px rgba(52, 211, 153, 0.35))',
        }}
      />
      <img
        src="/assets/mario_game/bg-pipe.png"
        alt=""
        className="absolute hidden lg:block"
        style={{
          right: '2%',
          bottom: '18vh',
          width: '110px',
          imageRendering: 'pixelated',
          opacity: 0.35,
          filter: 'drop-shadow(0 0 14px rgba(16, 185, 129, 0.65)) drop-shadow(0 0 28px rgba(52, 211, 153, 0.4))',
          transform: 'scaleX(-1)',
        }}
      />

      {/* ═══════ LAYER F: Bushes row just above brick ground ═══════ */}
      <div className="absolute inset-x-0 bottom-[11vh] pointer-events-none">
        <div className="flex items-end justify-around gap-4 sm:gap-10" style={{ opacity: 0.32 }}>
          {[1, 1.5, 1, 1.8, 1.2, 1.6, 1, 1.4].map((scale, i) => (
            <img
              key={`bush-${i}`}
              src="/assets/mario_game/bg-bush.png"
              alt=""
              style={{
                width: `${72 * scale}px`,
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.55))',
              }}
            />
          ))}
        </div>
      </div>

      {/* ═══════ LAYER G: Brick/ground pattern at very bottom ═══════ */}
      <div
        className="absolute inset-x-0 bottom-0 h-[10vh]"
        style={{
          background:
            'linear-gradient(180deg, rgba(120, 50, 20, 0) 0%, rgba(120, 50, 20, 0.35) 40%, rgba(88, 35, 14, 0.6) 100%), ' +
            'repeating-linear-gradient(0deg, rgba(120, 50, 20, 0.25) 0px, rgba(120, 50, 20, 0.25) 8px, transparent 8px, transparent 9px), ' +
            'repeating-linear-gradient(90deg, rgba(60, 25, 10, 0.35) 0px, rgba(60, 25, 10, 0.35) 1px, transparent 1px, transparent 24px)',
          imageRendering: 'pixelated',
          boxShadow: 'inset 0 2px 0 rgba(200, 120, 60, 0.35)',
        }}
      />

      {/* ═══════ Keyframes ═══════ */}
      <style>{`
        @keyframes mbg-cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 280px)); }
        }
        @keyframes mbg-coin-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes mbg-coin-spin {
          0%   { filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 16px rgba(253, 224, 71, 0.5)) brightness(1) hue-rotate(0deg); }
          50%  { filter: drop-shadow(0 0 14px rgba(253, 224, 71, 1))   drop-shadow(0 0 24px rgba(251, 191, 36, 0.9)) brightness(1.3) hue-rotate(15deg); }
          100% { filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 16px rgba(253, 224, 71, 0.5)) brightness(1) hue-rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default MarioBackground;
