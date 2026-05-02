import React, { useEffect, useRef, useState } from 'react';

/**
 * Cinematic Mario hero scene.
 *
 * Choreography (6.2s cycle, repeating):
 *   0.00s – 4.20s  Idle (breathing + subtle float + holographic shimmer)
 *   4.20s – 4.70s  Anticipation (crouch, purple glow charges, particles gather)
 *   4.70s – 5.10s  Explosive launch (squash -> stretch, motion trail, speed lines)
 *   5.10s – 5.25s  IMPACT at peak (chromatic flash, shockwave, coins explode, ring ripple)
 *   5.25s – 5.85s  Graceful arc-fall (rotates subtly, trail fades)
 *   5.85s – 6.20s  Landing squash + dust cloud, return to idle
 *
 * Timing is baked into keyframes AND mirrored with setInterval() so React-driven
 * effects (coin burst, flash, ring pulse) trigger exactly in sync. This is what
 * makes it feel choreographed instead of random.
 */
const CYCLE_MS = 6200;
const IMPACT_OFFSET_MS = 5100;  // when peak/impact moment happens inside the cycle
const CHARGE_OFFSET_MS = 4200;  // when charge-up starts

const MarioHeroScene = ({ glitchActive, mousePosition }) => {
  const [impactTick, setImpactTick] = useState(0);    // increments on every impact
  const [chargeTick, setChargeTick] = useState(0);    // increments on every charge-up
  const startRef = useRef(Date.now());

  useEffect(() => {
    // Align our React-side triggers with the CSS animation cycle.
    startRef.current = Date.now();

    const impactTimer = setInterval(() => {
      setImpactTick((t) => t + 1);
    }, CYCLE_MS);
    const impactInitial = setTimeout(() => setImpactTick((t) => t + 1), IMPACT_OFFSET_MS);

    const chargeTimer = setInterval(() => {
      setChargeTick((t) => t + 1);
    }, CYCLE_MS);
    const chargeInitial = setTimeout(() => setChargeTick((t) => t + 1), CHARGE_OFFSET_MS);

    return () => {
      clearInterval(impactTimer);
      clearInterval(chargeTimer);
      clearTimeout(impactInitial);
      clearTimeout(chargeInitial);
    };
  }, []);

  return (
    <>
      {/* ═══════ CHARGE-UP ENERGY GATHER (subtle particles converging on Mario before jump) ═══════ */}
      <div
        key={`charge-${chargeTick}`}
        className="absolute pointer-events-none z-[9]"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '180px',
          height: '180px',
        }}
        data-testid="mario-charge-particles"
      >
        {[...Array(6)].map((_, i) => {
          const angle = (360 / 6) * i;
          return (
            <span
              key={i}
              className="absolute top-1/2 left-1/2 block w-[3px] h-[3px] rounded-full bg-amber-300"
              style={{
                boxShadow: '0 0 8px #fbbf24, 0 0 16px #f59e0b',
                transform: `rotate(${angle}deg) translateY(-90px)`,
                animation: `mhs-charge-converge 500ms cubic-bezier(0.55, 0, 0.25, 1) forwards`,
                animationDelay: `${i * 30}ms`,
                opacity: 0,
              }}
            />
          );
        })}
      </div>

      {/* ═══════ CHROMATIC IMPACT FLASH (fullscreen tint) ═══════ */}
      <div
        key={`flash-${impactTick}`}
        className="absolute inset-0 pointer-events-none z-[20]"
        style={{
          background:
            'radial-gradient(circle at 50% 22%, rgba(255,255,255,0.6) 0%, rgba(255, 214, 96, 0.35) 15%, transparent 40%)',
          animation: `mhs-chromatic-flash 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          opacity: 0,
          mixBlendMode: 'screen',
        }}
        data-testid="mario-impact-flash"
      />

      {/* ═══════ SHOCKWAVE RING AT IMPACT POINT (expands through radar rings) ═══════ */}
      <div
        key={`shock-${impactTick}`}
        className="absolute pointer-events-none z-[12]"
        style={{
          left: '50%',
          top: '50%',
          width: '40px',
          height: '40px',
          marginLeft: '-20px',
          marginTop: '-110px',
          borderRadius: '9999px',
          border: '2px solid rgba(253, 224, 71, 0.9)',
          boxShadow: '0 0 30px rgba(253, 224, 71, 0.7), inset 0 0 20px rgba(251, 191, 36, 0.5)',
          animation: `mhs-shockwave 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          opacity: 0,
        }}
        data-testid="mario-shockwave"
      />
      <div
        key={`shock2-${impactTick}`}
        className="absolute pointer-events-none z-[12]"
        style={{
          left: '50%',
          top: '50%',
          width: '40px',
          height: '40px',
          marginLeft: '-20px',
          marginTop: '-110px',
          borderRadius: '9999px',
          border: '1.5px solid rgba(167, 139, 250, 0.8)',
          animation: `mhs-shockwave 900ms cubic-bezier(0.22, 1, 0.36, 1) 80ms forwards`,
          opacity: 0,
        }}
      />

      {/* ═══════ STAR BURST at impact (SVG, pixel-perfect) ═══════ */}
      <div
        key={`stars-${impactTick}`}
        className="absolute pointer-events-none z-[13]"
        style={{
          left: '50%',
          top: '50%',
          marginTop: '-115px',
          transform: 'translateX(-50%)',
          opacity: 0,
          animation: `mhs-star-burst 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <polygon
            points="20,2 24,16 38,16 27,25 31,38 20,30 9,38 13,25 2,16 16,16"
            fill="#fde047"
            stroke="#f59e0b"
            strokeWidth="1.5"
            style={{ filter: 'drop-shadow(0 0 8px #fbbf24)' }}
          />
        </svg>
      </div>

      {/* ═══════ COIN PARTICLE EXPLOSION (8 coins spiral outward on impact) ═══════ */}
      <div
        key={`coins-${impactTick}`}
        className="absolute pointer-events-none z-[12]"
        style={{
          left: '50%',
          top: '50%',
          width: 0,
          height: 0,
          marginTop: '-110px',
        }}
        data-testid="mario-coins"
      >
        {[...Array(8)].map((_, i) => {
          const angle = (360 / 8) * i - 90; // spread upward hemisphere primarily
          return (
            <span
              key={i}
              className="absolute top-0 left-0 flex items-center justify-center"
              style={{
                width: '14px',
                height: '14px',
                marginLeft: '-7px',
                marginTop: '-7px',
                borderRadius: '9999px',
                background: 'radial-gradient(circle at 35% 35%, #fef3c7 0%, #fbbf24 50%, #b45309 100%)',
                boxShadow: '0 0 8px rgba(251, 191, 36, 0.9), inset 0 -2px 0 rgba(120, 53, 15, 0.5)',
                fontSize: '8px',
                fontWeight: 900,
                color: '#78350f',
                fontFamily: 'monospace',
                // Each coin flies in its own direction
                ['--coin-angle']: `${angle}deg`,
                animation: `mhs-coin-burst 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards, mhs-coin-spin 900ms linear forwards`,
                animationDelay: `${i * 20}ms`,
                opacity: 0,
              }}
            >
              $
            </span>
          );
        })}
      </div>

      {/* ═══════ RADAR RING PULSE on impact (visually rings react to Mario's slam) ═══════ */}
      <div
        key={`ringpulse-${impactTick}`}
        className="absolute pointer-events-none z-[5]"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '220px',
          height: '220px',
          borderRadius: '9999px',
          border: '2px solid rgba(124, 58, 237, 0.6)',
          boxShadow: '0 0 40px rgba(124, 58, 237, 0.4)',
          opacity: 0,
          animation: `mhs-ring-pulse 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
        }}
      />

      {/* ═══════ MARIO CHARACTER (with trail, squash/stretch, arc) ═══════ */}
      <div
        className={`absolute flex items-center justify-center pointer-events-none ${glitchActive ? 'animate-glitch-spark' : ''}`}
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)`,
          transition: glitchActive ? 'none' : 'transform 0.2s ease-out',
          zIndex: 10,
        }}
      >
        <div
          className="relative"
          style={{
            width: '120px',
            height: '150px',
            willChange: 'transform',
          }}
        >
          {/* Outer wrapper handles the BIG JUMP (translateY) — cinematic, physics-based */}
          <div
            className="absolute inset-0"
            style={{
              animation: `mhs-mario-jump ${CYCLE_MS}ms cubic-bezier(0.22, 1, 0.36, 1) infinite`,
              willChange: 'transform',
            }}
          >
            {/* Inner wrapper handles squash/stretch + charge glow */}
            <div
              className="absolute inset-0"
              style={{
                animation: `mhs-mario-squash ${CYCLE_MS}ms ease-in-out infinite`,
                transformOrigin: 'center bottom',
                willChange: 'transform',
              }}
            >
              {/* ── MOTION TRAIL (3 afterimages) ── */}
              {[0, 1, 2].map((i) => (
                <img
                  key={`trail-${i}`}
                  src="/assets/mario/mario-pixel-clean.png"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{
                    imageRendering: 'pixelated',
                    animation: `mhs-mario-trail ${CYCLE_MS}ms ease-out infinite`,
                    animationDelay: `${(i + 1) * 40}ms`,
                    opacity: 0,
                    filter: `drop-shadow(0 0 6px rgba(124, 58, 237, ${0.6 - i * 0.15})) blur(${i * 0.5}px)`,
                    mixBlendMode: 'screen',
                  }}
                  draggable={false}
                />
              ))}

              {/* ── MAIN MARIO SPRITE ── */}
              <img
                src="/assets/mario/mario-pixel-clean.png"
                alt="Mario"
                data-testid="mario-pixel-hologram"
                className="relative w-full h-full object-contain"
                style={{
                  imageRendering: 'pixelated',
                  animation: `mhs-mario-breathe 3s ease-in-out infinite, mhs-mario-glow ${CYCLE_MS}ms ease-in-out infinite`,
                  filter: glitchActive
                    ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.95)) brightness(1.6) hue-rotate(30deg)'
                    : 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.9)) drop-shadow(0 0 18px rgba(59, 130, 246, 0.6)) drop-shadow(0 2px 0 rgba(0, 0, 0, 0.35))',
                  willChange: 'transform, filter',
                }}
                draggable={false}
              />

              {/* ── SPEED LINES (during ascent only) ── */}
              <div
                className="absolute inset-0 pointer-events-none overflow-visible"
                style={{
                  animation: `mhs-speed-lines-visibility ${CYCLE_MS}ms linear infinite`,
                  opacity: 0,
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: '100%',
                      width: '2px',
                      height: '24px',
                      background: 'linear-gradient(to bottom, transparent, rgba(167, 139, 250, 0.8), transparent)',
                      boxShadow: '0 0 6px rgba(167, 139, 250, 0.6)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ GROUND DUST on landing ═══════ */}
      <div
        className="absolute pointer-events-none z-[7]"
        style={{
          left: '50%',
          bottom: '15%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '12px',
          background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.5) 0%, transparent 70%)',
          filter: 'blur(4px)',
          animation: `mhs-ground-dust ${CYCLE_MS}ms ease-out infinite`,
          opacity: 0,
        }}
      />

      {/* ═══════ KEYFRAMES ═══════ */}
      <style>{`
        /* Mario main jump arc — choreographed over the full cycle */
        @keyframes mhs-mario-jump {
          0%   { transform: translateY(0); }
          67%  { transform: translateY(0); }               /* idle section */
          72%  { transform: translateY(6px); }             /* anticipation crouch */
          75.8% { transform: translateY(0px); }            /* begin explosive launch */
          82%  { transform: translateY(-100px); }          /* peak at ~5.10s */
          82.3% { transform: translateY(-100px); }         /* micro-hold at peak for impact visual */
          90%  { transform: translateY(-25px); }           /* arc down */
          94%  { transform: translateY(0); }               /* landing */
          95%  { transform: translateY(4px); }             /* squash */
          98%  { transform: translateY(0); }
          100% { transform: translateY(0); }
        }
        @media (min-width: 640px) {
          @keyframes mhs-mario-jump {
            0%   { transform: translateY(0); }
            67%  { transform: translateY(0); }
            72%  { transform: translateY(7px); }
            75.8% { transform: translateY(0); }
            82%  { transform: translateY(-130px); }
            82.3% { transform: translateY(-130px); }
            90%  { transform: translateY(-30px); }
            94%  { transform: translateY(0); }
            95%  { transform: translateY(5px); }
            98%  { transform: translateY(0); }
            100% { transform: translateY(0); }
          }
        }
        @media (min-width: 1024px) {
          @keyframes mhs-mario-jump {
            0%   { transform: translateY(0); }
            67%  { transform: translateY(0); }
            72%  { transform: translateY(8px); }
            75.8% { transform: translateY(0); }
            82%  { transform: translateY(-155px); }
            82.3% { transform: translateY(-155px); }
            90%  { transform: translateY(-36px); }
            94%  { transform: translateY(0); }
            95%  { transform: translateY(6px); }
            98%  { transform: translateY(0); }
            100% { transform: translateY(0); }
          }
        }

        /* Squash/stretch — reads as physics-based weight */
        @keyframes mhs-mario-squash {
          0%, 67%   { transform: scale(1, 1); }
          72%       { transform: scale(1.12, 0.85); }      /* anticipation squash */
          78%       { transform: scale(0.88, 1.18); }      /* launch stretch */
          82%       { transform: scale(0.96, 1.06); }      /* at peak, slight stretch */
          84%       { transform: scale(1.1, 0.9); }        /* impact react (head hits) */
          90%       { transform: scale(1, 1); }
          95%       { transform: scale(1.18, 0.78); }      /* landing squash */
          98%       { transform: scale(1, 1); }
          100%      { transform: scale(1, 1); }
        }

        /* Subtle idle breathing */
        @keyframes mhs-mario-breathe {
          0%, 100% { transform: translateY(0) scale(1, 1); }
          50%      { transform: translateY(-2px) scale(1.01, 0.99); }
        }

        /* Glow charges up before jump, peaks at impact */
        @keyframes mhs-mario-glow {
          0%, 67%  { filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.9)) drop-shadow(0 0 18px rgba(59, 130, 246, 0.6)) drop-shadow(0 2px 0 rgba(0, 0, 0, 0.35)); }
          72%      { filter: drop-shadow(0 0 14px rgba(251, 191, 36, 1)) drop-shadow(0 0 28px rgba(239, 68, 68, 0.8)) brightness(1.15); }
          78%      { filter: drop-shadow(0 0 22px rgba(253, 224, 71, 1)) drop-shadow(0 0 40px rgba(239, 68, 68, 0.9)) brightness(1.3); }
          82%      { filter: drop-shadow(0 0 28px rgba(255, 255, 255, 1)) brightness(1.5); }
          90%      { filter: drop-shadow(0 0 16px rgba(167, 139, 250, 0.9)) drop-shadow(0 0 30px rgba(96, 165, 250, 0.6)); }
          100%     { filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.9)) drop-shadow(0 0 18px rgba(59, 130, 246, 0.6)) drop-shadow(0 2px 0 rgba(0, 0, 0, 0.35)); }
        }

        /* Motion trail — only visible during ascent */
        @keyframes mhs-mario-trail {
          0%, 75%  { opacity: 0; transform: translateY(0); }
          78%      { opacity: 0.45; }
          82%      { opacity: 0.3; }
          85%      { opacity: 0; }
          100%     { opacity: 0; }
        }

        /* Speed lines visibility — only during launch */
        @keyframes mhs-speed-lines-visibility {
          0%, 76%  { opacity: 0; }
          78%      { opacity: 0.9; }
          82%      { opacity: 0.5; }
          84%      { opacity: 0; }
          100%     { opacity: 0; }
        }

        /* Charge-up particles converge toward Mario from 6 directions */
        @keyframes mhs-charge-converge {
          0%   { opacity: 0; transform: rotate(var(--tw-rotate, 0deg)) translateY(-90px) scale(0.5); }
          30%  { opacity: 1; }
          100% { opacity: 0; transform: rotate(var(--tw-rotate, 0deg)) translateY(-4px) scale(1.4); }
        }

        /* Chromatic impact flash — fast fade */
        @keyframes mhs-chromatic-flash {
          0%   { opacity: 0; }
          20%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Shockwave ring expands and fades */
        @keyframes mhs-shockwave {
          0%   { opacity: 0.95; transform: scale(0.3); }
          40%  { opacity: 0.9; }
          100% { opacity: 0; transform: scale(5.5); }
        }

        /* Star burst appears briefly */
        @keyframes mhs-star-burst {
          0%   { opacity: 0; transform: translateX(-50%) scale(0.3) rotate(-20deg); }
          30%  { opacity: 1; transform: translateX(-50%) scale(1.4) rotate(0deg); }
          100% { opacity: 0; transform: translateX(-50%) scale(1.6) rotate(15deg); }
        }

        /* Coin burst — each coin flies in its --coin-angle direction, affected by gravity */
        @keyframes mhs-coin-burst {
          0%   { opacity: 1; transform: rotate(var(--coin-angle)) translateY(0) rotate(calc(-1 * var(--coin-angle))); }
          40%  { opacity: 1; transform: rotate(var(--coin-angle)) translateY(-70px) rotate(calc(-1 * var(--coin-angle))); }
          100% { opacity: 0; transform: rotate(var(--coin-angle)) translateY(30px) rotate(calc(-1 * var(--coin-angle))) translateX(0); }
        }
        @keyframes mhs-coin-spin {
          0%   { filter: brightness(1.2); }
          50%  { filter: brightness(1.5); }
          100% { filter: brightness(0.9); }
        }

        /* Radar ring pulse — simulates the rings reacting to Mario's slam */
        @keyframes mhs-ring-pulse {
          0%   { opacity: 0.9; transform: translate(-50%, -50%) scale(0.94); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.35); }
        }

        /* Ground dust — appears on landing */
        @keyframes mhs-ground-dust {
          0%, 92%  { opacity: 0; transform: translateX(-50%) scale(0.4, 0.4); }
          95%      { opacity: 0.8; transform: translateX(-50%) scale(1.4, 1); }
          100%     { opacity: 0; transform: translateX(-50%) scale(1.8, 0.6); }
        }
      `}</style>
    </>
  );
};

export default MarioHeroScene;
