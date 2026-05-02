import React from 'react';

/**
 * Premium Mario-themed animated background with 10 parallax layers.
 *
 * Layers (back → front):
 *   1. Twilight sky gradient (radial)
 *   2. Twinkling stars scattered across the sky (40 stars, blink on/off)
 *   3. Moon with radial glow in upper-right
 *   4. Distant castle silhouette (far, low opacity)
 *   5. Back-layer large hills (slow parallax)
 *   6. Clouds drifting (multiple speeds)
 *   7. Mid-layer smaller hills
 *   8. Floating brick platforms (suspended in the middle of the scene)
 *   9. Floating coins + occasional mushroom / 1UP power-ups
 *  10. Bushes organically placed + side pipes + brick ground (bottom)
 *
 * Pure CSS animations for zero JS overhead. Low opacities + neon drop-shadows
 * blend with the dark site theme.
 */

// Spread N items with pseudo-random positions (deterministic, based on seed)
const spread = (n, yMin, yMax, seed) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    const s = (seed * 9301 + i * 49297) % 233280;
    const x = (s / 233280) * 100;
    const y = yMin + ((s * 17) % ((yMax - yMin) * 100)) / 100;
    const delay = (s % 500) / 100;
    const dur = 2 + ((s * 7) % 300) / 100;
    arr.push({ x: x.toFixed(1), y: y.toFixed(1), delay, dur });
  }
  return arr;
};

const twinkleStars = spread(42, 3, 55, 7);

const MarioBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]" aria-hidden data-testid="mario-background">

      {/* ══ LAYER 1: Twilight tint ══ */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(88, 28, 160, 0.28) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(14, 50, 120, 0.32) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 40% 30% at 20% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 65%)',
        }}
      />

      {/* ══ LAYER 2: Twinkling pixel stars ══ */}
      <div className="absolute inset-0 overflow-hidden">
        {twinkleStars.map((s, i) => (
          <img
            key={`star-${i}`}
            src="/assets/mario_game/bg-star.png"
            alt=""
            className="absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${6 + ((i * 3) % 8)}px`,
              height: `${6 + ((i * 3) % 8)}px`,
              imageRendering: 'pixelated',
              opacity: 0,
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.95))',
              animation: `mbg-twinkle ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ══ LAYER 3: Moon with radial glow (upper-right) ══ */}
      <div
        className="absolute"
        style={{
          top: '6%',
          right: '5%',
          width: '130px',
          height: '130px',
          pointerEvents: 'none',
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 animate-moon-glow"
          style={{
            background: 'radial-gradient(circle, rgba(255,240,180,0.35) 0%, rgba(251,191,36,0.18) 40%, transparent 70%)',
            filter: 'blur(6px)',
          }}
        />
        {/* Moon sprite */}
        <img
          src="/assets/mario_game/bg-moon.png"
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '72px',
            imageRendering: 'pixelated',
            opacity: 0.75,
            filter: 'drop-shadow(0 0 20px rgba(255,240,180,0.65)) drop-shadow(0 0 40px rgba(251,191,36,0.35))',
          }}
        />
      </div>

      {/* ══ LAYER 4: Distant castle silhouette (far, centered-left) ══ */}
      <img
        src="/assets/mario_game/bg-castle.png"
        alt=""
        className="absolute hidden md:block"
        style={{
          left: '8%',
          bottom: '30vh',
          width: '180px',
          imageRendering: 'pixelated',
          opacity: 0.22,
          filter: 'drop-shadow(0 0 16px rgba(124,58,237,0.65)) drop-shadow(0 0 30px rgba(88,28,160,0.45))',
        }}
      />
      <img
        src="/assets/mario_game/bg-castle.png"
        alt=""
        className="absolute hidden lg:block"
        style={{
          right: '14%',
          bottom: '32vh',
          width: '140px',
          imageRendering: 'pixelated',
          opacity: 0.16,
          filter: 'drop-shadow(0 0 14px rgba(124,58,237,0.55))',
          transform: 'scaleX(-1)',
        }}
      />

      {/* ══ LAYER 5: Back hills (slow parallax) ══ */}
      <div className="absolute inset-x-0 bottom-[26vh] pointer-events-none flex items-end justify-between opacity-15">
        {[1.8, 2.4, 1.6, 2.2, 1.9, 2.5, 1.7].map((scale, i) => (
          <img
            key={`back-hill-${i}`}
            src="/assets/mario_game/bg-hill.png"
            alt=""
            style={{
              width: `${120 * scale}px`,
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 18px rgba(124, 58, 237, 0.75)) drop-shadow(0 0 36px rgba(88, 28, 160, 0.45))',
              transform: `translateY(${10 * ((i + 3) % 3)}px)`,
            }}
          />
        ))}
      </div>

      {/* ══ LAYER 6: Clouds drifting at varying speeds ══ */}
      <div className="absolute inset-x-0 top-0 h-[65vh] overflow-hidden">
        {[
          { top: '6%',  dur: 140, delay: 0,    scale: 1.2, op: 0.22 },
          { top: '15%', dur: 95,  delay: -40,  scale: 0.75, op: 0.14 },
          { top: '24%', dur: 165, delay: -20,  scale: 1.5, op: 0.18 },
          { top: '35%', dur: 120, delay: -90,  scale: 0.95, op: 0.12 },
          { top: '46%', dur: 145, delay: -110, scale: 1.25, op: 0.1 },
          { top: '58%', dur: 175, delay: -60,  scale: 1.05, op: 0.08 },
        ].map((c, i) => (
          <img
            key={`cloud-${i}`}
            src="/assets/mario_game/bg-cloud.png"
            alt=""
            className="absolute"
            style={{
              top: c.top,
              left: '-220px',
              width: `${128 * c.scale}px`,
              imageRendering: 'pixelated',
              opacity: c.op,
              filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.55)) drop-shadow(0 0 22px rgba(96, 165, 250, 0.3))',
              animation: `mbg-cloud-drift ${c.dur}s linear infinite`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ══ LAYER 7: Mid hills (closer, brighter) ══ */}
      <div className="absolute inset-x-0 bottom-[18vh] pointer-events-none flex items-end justify-around opacity-25">
        {[1.3, 1.7, 1.2, 1.9, 1.5, 1.4, 1.8].map((scale, i) => (
          <img
            key={`mid-hill-${i}`}
            src="/assets/mario_game/bg-hill.png"
            alt=""
            style={{
              width: `${100 * scale}px`,
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.7))',
              transform: `translateY(${5 * (i % 2)}px)`,
            }}
          />
        ))}
      </div>

      {/* ══ LAYER 8: Floating brick platforms (mid-height suspended) ══ */}
      <img
        src="/assets/mario_game/bg-platform.png"
        alt=""
        className="absolute hidden md:block animate-float-plat-1"
        style={{
          left: '8%',
          top: '38%',
          width: '86px',
          imageRendering: 'pixelated',
          opacity: 0.55,
          filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.55)) drop-shadow(0 4px 0 rgba(0,0,0,0.5))',
        }}
      />
      <img
        src="/assets/mario_game/bg-platform.png"
        alt=""
        className="absolute hidden md:block animate-float-plat-2"
        style={{
          right: '10%',
          top: '44%',
          width: '96px',
          imageRendering: 'pixelated',
          opacity: 0.55,
          filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.6)) drop-shadow(0 4px 0 rgba(0,0,0,0.5))',
        }}
      />
      <img
        src="/assets/mario_game/bg-platform.png"
        alt=""
        className="absolute hidden lg:block animate-float-plat-3"
        style={{
          left: '22%',
          top: '58%',
          width: '72px',
          imageRendering: 'pixelated',
          opacity: 0.45,
          filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.5)) drop-shadow(0 3px 0 rgba(0,0,0,0.5))',
        }}
      />
      <img
        src="/assets/mario_game/bg-platform.png"
        alt=""
        className="absolute hidden lg:block animate-float-plat-4"
        style={{
          right: '24%',
          top: '62%',
          width: '80px',
          imageRendering: 'pixelated',
          opacity: 0.48,
          filter: 'drop-shadow(0 0 11px rgba(251,191,36,0.55)) drop-shadow(0 3px 0 rgba(0,0,0,0.5))',
        }}
      />

      {/* ══ LAYER 9: Floating coins (ambient + varied sizes) ══ */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { left: '6%',  top: '20%', dur: 4, delay: 0, size: 26 },
          { left: '92%', top: '15%', dur: 5, delay: 1, size: 22 },
          { left: '14%', top: '70%', dur: 4.5, delay: 2, size: 28 },
          { left: '88%', top: '65%', dur: 3.8, delay: 0.5, size: 24 },
          { left: '3%',  top: '45%', dur: 5.5, delay: 1.5, size: 20 },
          { left: '95%', top: '40%', dur: 4.2, delay: 2.5, size: 24 },
          { left: '20%', top: '82%', dur: 4.8, delay: 0.8, size: 22 },
          { left: '78%', top: '88%', dur: 5.2, delay: 1.8, size: 26 },
          { left: '30%', top: '12%', dur: 5, delay: 0.3, size: 18 },
          { left: '62%', top: '8%',  dur: 4.3, delay: 2.2, size: 20 },
          { left: '50%', top: '92%', dur: 4.6, delay: 1.4, size: 24 },
        ].map((c, i) => (
          <img
            key={`bgcoin-${i}`}
            src="/assets/mario_game/bg-coin.png"
            alt=""
            className="absolute"
            style={{
              left: c.left,
              top: c.top,
              width: `${c.size}px`,
              height: `${c.size}px`,
              imageRendering: 'pixelated',
              opacity: 0.5,
              filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 16px rgba(253, 224, 71, 0.55))',
              animation: `mbg-coin-float ${c.dur}s ease-in-out infinite, mbg-coin-spin ${c.dur * 0.5}s linear infinite`,
              animationDelay: `${c.delay}s, ${c.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ══ Occasional power-ups floating ══ */}
      <img
        src="/assets/mario_game/bg-mushroom.png"
        alt=""
        className="absolute hidden md:block animate-powerup-bob"
        style={{
          left: '4%',
          top: '50%',
          width: '30px',
          imageRendering: 'pixelated',
          opacity: 0.75,
          filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.7)) drop-shadow(0 0 18px rgba(251, 191, 36, 0.45))',
        }}
      />
      <img
        src="/assets/mario_game/bg-1up.png"
        alt=""
        className="absolute hidden md:block animate-powerup-bob-alt"
        style={{
          right: '5%',
          top: '52%',
          width: '28px',
          imageRendering: 'pixelated',
          opacity: 0.7,
          filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.75)) drop-shadow(0 0 18px rgba(134, 239, 172, 0.4))',
        }}
      />

      {/* ══ LAYER 10a: Side pipes ══ */}
      <img
        src="/assets/mario_game/bg-pipe.png"
        alt=""
        className="absolute hidden lg:block"
        style={{
          left: '2%',
          bottom: '12vh',
          width: '94px',
          imageRendering: 'pixelated',
          opacity: 0.45,
          filter: 'drop-shadow(0 0 14px rgba(16, 185, 129, 0.7)) drop-shadow(0 0 28px rgba(52, 211, 153, 0.4))',
        }}
      />
      <img
        src="/assets/mario_game/bg-pipe.png"
        alt=""
        className="absolute hidden lg:block"
        style={{
          right: '2%',
          bottom: '12vh',
          width: '112px',
          imageRendering: 'pixelated',
          opacity: 0.45,
          filter: 'drop-shadow(0 0 14px rgba(16, 185, 129, 0.75)) drop-shadow(0 0 30px rgba(52, 211, 153, 0.45))',
          transform: 'scaleX(-1)',
        }}
      />

      {/* ══ LAYER 10b: Bushes organically positioned ══ */}
      {[
        { left: '5%',  bottom: '10.5vh', scale: 1.2 },
        { left: '14%', bottom: '10.5vh', scale: 0.9 },
        { left: '26%', bottom: '10.5vh', scale: 1.6 },
        { left: '38%', bottom: '10.5vh', scale: 1.1 },
        { left: '48%', bottom: '10.5vh', scale: 1.8 },
        { left: '58%', bottom: '10.5vh', scale: 1.0 },
        { left: '68%', bottom: '10.5vh', scale: 1.5 },
        { left: '80%', bottom: '10.5vh', scale: 1.3 },
        { left: '90%', bottom: '10.5vh', scale: 1.1 },
      ].map((b, i) => (
        <img
          key={`bush-${i}`}
          src="/assets/mario_game/bg-bush.png"
          alt=""
          className="absolute"
          style={{
            left: b.left,
            bottom: b.bottom,
            width: `${70 * b.scale}px`,
            imageRendering: 'pixelated',
            opacity: 0.4,
            filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.6))',
          }}
        />
      ))}

      {/* ══ LAYER 10c: Brick / ground pattern at bottom ══ */}
      <div
        className="absolute inset-x-0 bottom-0 h-[10vh]"
        style={{
          background:
            'linear-gradient(180deg, rgba(120, 50, 20, 0) 0%, rgba(120, 50, 20, 0.4) 35%, rgba(88, 35, 14, 0.7) 100%), ' +
            'repeating-linear-gradient(0deg, rgba(120, 50, 20, 0.3) 0px, rgba(120, 50, 20, 0.3) 9px, transparent 9px, transparent 10px), ' +
            'repeating-linear-gradient(90deg, rgba(60, 25, 10, 0.4) 0px, rgba(60, 25, 10, 0.4) 1px, transparent 1px, transparent 26px)',
          imageRendering: 'pixelated',
          boxShadow: 'inset 0 2px 0 rgba(200, 120, 60, 0.4)',
        }}
      />

      {/* ══ Keyframes ══ */}
      <style>{`
        /* Twinkling stars */
        @keyframes mbg-twinkle {
          0%, 100%  { opacity: 0; transform: scale(0.6); }
          50%       { opacity: 0.9; transform: scale(1.1); }
        }

        /* Moon glow pulse */
        @keyframes mbg-moon-glow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.15); opacity: 0.8; }
        }
        .animate-moon-glow { animation: mbg-moon-glow 5s ease-in-out infinite; }

        /* Cloud drift across screen */
        @keyframes mbg-cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 300px)); }
        }

        /* Coin float + flip */
        @keyframes mbg-coin-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes mbg-coin-spin {
          0%   { filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 16px rgba(253, 224, 71, 0.5)) brightness(1) hue-rotate(0deg); }
          50%  { filter: drop-shadow(0 0 14px rgba(253, 224, 71, 1)) drop-shadow(0 0 26px rgba(251, 191, 36, 0.95)) brightness(1.35) hue-rotate(12deg); }
          100% { filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 16px rgba(253, 224, 71, 0.5)) brightness(1) hue-rotate(0deg); }
        }

        /* Floating brick platforms — gentle up/down bob */
        @keyframes mbg-float-plat-1 {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes mbg-float-plat-2 {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes mbg-float-plat-3 {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes mbg-float-plat-4 {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        .animate-float-plat-1 { animation: mbg-float-plat-1 6s ease-in-out infinite; }
        .animate-float-plat-2 { animation: mbg-float-plat-2 5s ease-in-out infinite; animation-delay: -1.5s; }
        .animate-float-plat-3 { animation: mbg-float-plat-3 7s ease-in-out infinite; animation-delay: -3s; }
        .animate-float-plat-4 { animation: mbg-float-plat-4 6.5s ease-in-out infinite; animation-delay: -2s; }

        /* Power-up bob */
        @keyframes mbg-powerup-bob {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-16px) rotate(2deg); }
        }
        @keyframes mbg-powerup-bob-alt {
          0%, 100% { transform: translateY(0) rotate(2deg); }
          50%      { transform: translateY(-18px) rotate(-2deg); }
        }
        .animate-powerup-bob     { animation: mbg-powerup-bob 4.5s ease-in-out infinite; }
        .animate-powerup-bob-alt { animation: mbg-powerup-bob-alt 5s ease-in-out infinite; animation-delay: -1.2s; }
      `}</style>
    </div>
  );
};

export default MarioBackground;
