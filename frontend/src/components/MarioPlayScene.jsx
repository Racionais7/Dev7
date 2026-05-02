import React, { useEffect, useRef, useState } from 'react';

/**
 * Agency-grade NES Mario scene inside the hologram circle.
 *
 * Choreography (≈5.2s cycle):
 *   0)  walk  25 → 55       (350ms)   ← entrance
 *   1)  jump  block 0       (550ms)   ← IMPACT #1 → shake+stars+shockwave+coin
 *   2)  walk  55 → 140      (620ms)
 *   3)  jump  block 1       (550ms)   ← IMPACT #2
 *   4)  walk  140 → 225     (620ms)
 *   5)  jump  block 2       (550ms)   ← IMPACT #3
 *   6)  walk  225 → 258     (300ms)
 *   7)  cheer (arms up bob) (500ms)   ← victory pose
 *   8)  walk  258 → 25 back (800ms)   ← flipped sprite
 *   9)  wait  at start      (350ms)   ← blocks regenerate with glint
 *
 * Premium effects:
 *   • Ghost motion-trail (2 afterimages) during ascent/fall
 *   • Camera shake on every impact (2px tremor, 280ms)
 *   • 5-star pixel burst around the hit block (radial)
 *   • Expanding shockwave ring from impact point
 *   • Ground dust puffs on landing (left + right of feet)
 *   • Mario flips direction when walking back
 *   • Block bump + turns empty + coin rises + "+100" floats
 *   • Block regeneration with glint flash at cycle restart
 *   • Dynamic shadow shrinks/grows with jump height
 */

const SPR = {
  idle:       '/assets/mario_game/mario-idle.png',
  walk1:      '/assets/mario_game/mario-walk1.png',
  walk2:      '/assets/mario_game/mario-walk2.png',
  jump:       '/assets/mario_game/mario-jump.png',
  hit:        '/assets/mario_game/mario-hit.png',
  block:      '/assets/mario_game/qblock.png',
  blockGlint: '/assets/mario_game/qblock-glint.png',
  blockEmpty: '/assets/mario_game/qblock-empty.png',
  coin1:      '/assets/mario_game/coin-1.png',
  coin2:      '/assets/mario_game/coin-2.png',
  coin3:      '/assets/mario_game/coin-3.png',
  coin4:      '/assets/mario_game/coin-4.png',
};

// Layout
const STAGE_W = 280;
const STAGE_H = 180;
const GROUND_Y = 150;
const MARIO_SIZE = 52;
const BLOCK_SIZE = 42;
const COIN_SIZE = 24;
const BLOCK_Y = 16;
const BLOCK_X = [55, 140, 225];
const MARIO_BASE_Y = GROUND_Y - MARIO_SIZE;     // 98
const MARIO_PEAK_Y = BLOCK_Y + BLOCK_SIZE + 2;  // 60
const JUMP_HEIGHT  = MARIO_BASE_Y - MARIO_PEAK_Y; // 38

// Sequence
const SEQ = [
  { type: 'walk',  from: 25,  to: 55,  dur: 350, dir: 1 },
  { type: 'jump',  at: 55,    block: 0, dur: 550 },
  { type: 'walk',  from: 55,  to: 140, dur: 620, dir: 1 },
  { type: 'jump',  at: 140,   block: 1, dur: 550 },
  { type: 'walk',  from: 140, to: 225, dur: 620, dir: 1 },
  { type: 'jump',  at: 225,   block: 2, dur: 550 },
  { type: 'walk',  from: 225, to: 258, dur: 300, dir: 1 },
  { type: 'cheer', at: 258,   dur: 500 },
  { type: 'walk',  from: 258, to: 25,  dur: 800, dir: -1 },
  { type: 'wait',  at: 25,    dur: 350 },
];
const CYCLE_DUR = SEQ.reduce((s, p) => s + p.dur, 0);

const currentPhase = (elapsed) => {
  let acc = 0;
  for (let i = 0; i < SEQ.length; i++) {
    const p = SEQ[i];
    if (elapsed < acc + p.dur) return { ...p, idx: i, localT: elapsed - acc };
    acc += p.dur;
  }
  const last = SEQ[SEQ.length - 1];
  return { ...last, idx: SEQ.length - 1, localT: last.dur };
};

const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
const easeInQuad  = (t) => t * t;

let _pid = 0;
const nextId = () => ++_pid;

const MarioPlayScene = ({ glitchActive }) => {
  // Sprites (infrequent updates)
  const [marioSprite, setMarioSprite] = useState(SPR.idle);
  const [blockSprites, setBlockSprites] = useState([SPR.block, SPR.block, SPR.block]);
  const [coinFrame, setCoinFrame] = useState(0);
  const [activeCoin, setActiveCoin] = useState(-1);
  const [activeScore, setActiveScore] = useState(-1);
  const [showTrail, setShowTrail] = useState(false);
  // Particle arrays
  const [stars, setStars] = useState([]);
  const [dusts, setDusts] = useState([]);
  const [shockwaves, setShockwaves] = useState([]);

  // Transform refs (GPU-accelerated)
  const stageRef  = useRef(null);
  const marioRef  = useRef(null);
  const shadowRef = useRef(null);
  const block0Ref = useRef(null);
  const block1Ref = useRef(null);
  const block2Ref = useRef(null);
  const coinRef   = useRef(null);
  const scoreRef  = useRef(null);
  const trail1Ref = useRef(null);
  const trail2Ref = useRef(null);

  // Mirror state for RAF loop (avoids re-effect)
  const activeCoinRef  = useRef(-1);
  const activeScoreRef = useRef(-1);
  const coinFrameRef   = useRef(0);

  const st = useRef({
    raf: 0, startTime: 0, lastIdx: -1, impactTime: 0,
    didImpact: false, didLand: false, lastDir: 1,
  });

  // Helper setters
  const showCoin = (bi)  => { activeCoinRef.current  = bi; setActiveCoin(bi); };
  const hideCoin = ()    => { activeCoinRef.current  = -1; setActiveCoin(-1); };
  const showScore = (bi) => { activeScoreRef.current = bi; setActiveScore(bi); };
  const hideScore = ()   => { activeScoreRef.current = -1; setActiveScore(-1); };
  const setCoinFrameSync = (f) => {
    if (coinFrameRef.current !== f) {
      coinFrameRef.current = f;
      setCoinFrame(f);
    }
  };

  // Particle spawners (auto-remove after animation)
  const spawnStars = (cx, cy) => {
    const id = nextId();
    setStars((prev) => [...prev, { id, cx, cy }]);
    setTimeout(() => setStars((prev) => prev.filter((s) => s.id !== id)), 720);
  };
  const spawnDust = (cx) => {
    const id = nextId();
    setDusts((prev) => [...prev, { id, cx }]);
    setTimeout(() => setDusts((prev) => prev.filter((d) => d.id !== id)), 500);
  };
  const spawnShockwave = (cx, cy) => {
    const id = nextId();
    setShockwaves((prev) => [...prev, { id, cx, cy }]);
    setTimeout(() => setShockwaves((prev) => prev.filter((s) => s.id !== id)), 700);
  };
  const triggerShake = () => {
    const s = stageRef.current;
    if (s) {
      s.classList.remove('mps-shake');
      void s.offsetWidth;
      s.classList.add('mps-shake');
    }
  };

  // ═══════ MAIN RAF LOOP ═══════
  useEffect(() => {
    const s = st.current;
    s.startTime = performance.now();
    const blockRefs = [block0Ref, block1Ref, block2Ref];

    const tick = (now) => {
      const elapsed = (now - s.startTime) % CYCLE_DUR;
      const phase = currentPhase(elapsed);

      // Cycle restart → regenerate blocks
      if (phase.idx < s.lastIdx) {
        setBlockSprites([SPR.blockGlint, SPR.blockGlint, SPR.blockGlint]);
        setTimeout(() => setBlockSprites([SPR.block, SPR.block, SPR.block]), 220);
      }

      let marioX = 25;
      let marioY = MARIO_BASE_Y;
      let marioScaleY = 1;
      let marioScaleX = 1;
      let nextSprite = null;
      let dir = s.lastDir;
      let inAir = false;

      if (phase.type === 'walk') {
        const p = phase.localT / phase.dur;
        marioX = phase.from + p * (phase.to - phase.from);
        marioY = MARIO_BASE_Y;
        const wi = Math.floor(phase.localT / 110) % 4;
        nextSprite = [SPR.walk1, SPR.idle, SPR.walk2, SPR.idle][wi];
        dir = phase.dir || 1;
        s.didImpact = false;
        s.didLand = false;
      } else if (phase.type === 'jump') {
        marioX = phase.at;
        const p = phase.localT / phase.dur;
        if (p < 0.12) {
          // anticipation crouch
          marioY = MARIO_BASE_Y + 2;
          marioScaleY = 0.88;
          marioScaleX = 1.1;
          nextSprite = SPR.idle;
        } else if (p < 0.5) {
          // ascent
          const pp = (p - 0.12) / 0.38;
          marioY = MARIO_BASE_Y - easeOutQuad(pp) * JUMP_HEIGHT;
          nextSprite = SPR.jump;
          inAir = true;
        } else if (p < 0.55) {
          // IMPACT
          marioY = MARIO_PEAK_Y;
          nextSprite = SPR.jump;
          inAir = true;
          if (!s.didImpact) {
            const bi = phase.block;
            s.impactTime = now;
            s.didImpact = true;
            setBlockSprites((prev) => prev.map((sp, i) => (i === bi ? SPR.blockEmpty : sp)));
            showCoin(bi);
            showScore(bi);
            const br = blockRefs[bi];
            if (br.current) {
              br.current.classList.remove('mps-block-bump');
              void br.current.offsetWidth;
              br.current.classList.add('mps-block-bump');
            }
            spawnStars(BLOCK_X[bi], BLOCK_Y + BLOCK_SIZE / 2);
            spawnShockwave(BLOCK_X[bi], BLOCK_Y + BLOCK_SIZE / 2);
            triggerShake();
          }
        } else if (p < 0.9) {
          // fall
          const pp = (p - 0.55) / 0.35;
          marioY = MARIO_PEAK_Y + easeInQuad(pp) * JUMP_HEIGHT;
          nextSprite = SPR.jump;
          inAir = true;
        } else {
          // landing squash
          marioY = MARIO_BASE_Y + 3;
          marioScaleY = 0.82;
          marioScaleX = 1.12;
          nextSprite = SPR.hit;
          if (!s.didLand) {
            s.didLand = true;
            spawnDust(phase.at - 10);
            spawnDust(phase.at + 10);
          }
        }
        dir = 1;
      } else if (phase.type === 'cheer') {
        marioX = phase.at;
        // gentle bob
        const p = phase.localT / phase.dur;
        marioY = MARIO_BASE_Y - Math.sin(p * Math.PI) * 5;
        nextSprite = SPR.jump;
        dir = 1;
      } else {
        // wait
        marioX = 25;
        marioY = MARIO_BASE_Y;
        nextSprite = SPR.idle;
        dir = 1;
      }

      // Apply Mario transform
      if (marioRef.current) {
        const dsx = dir === -1 ? -1 : 1;
        marioRef.current.style.transform =
          `translate3d(${marioX - MARIO_SIZE / 2}px, ${marioY}px, 0) scale(${marioScaleX * dsx}, ${marioScaleY})`;
      }

      // Trail ghosts — they follow via CSS transition lag
      if (trail1Ref.current) {
        const dsx = dir === -1 ? -1 : 1;
        trail1Ref.current.style.transform =
          `translate3d(${marioX - MARIO_SIZE / 2}px, ${marioY}px, 0) scale(${marioScaleX * dsx}, ${marioScaleY})`;
      }
      if (trail2Ref.current) {
        const dsx = dir === -1 ? -1 : 1;
        trail2Ref.current.style.transform =
          `translate3d(${marioX - MARIO_SIZE / 2}px, ${marioY}px, 0) scale(${marioScaleX * dsx}, ${marioScaleY})`;
      }

      // Shadow: follows X, shrinks with height
      if (shadowRef.current) {
        const air = MARIO_BASE_Y - marioY;
        const jp = Math.max(0, Math.min(1, air / JUMP_HEIGHT));
        const scale = 1 - jp * 0.55;
        const op = 0.65 - jp * 0.4;
        shadowRef.current.style.transform =
          `translate3d(${marioX - 17}px, ${GROUND_Y - 1}px, 0) scale(${scale}, ${scale * 0.8})`;
        shadowRef.current.style.opacity = op;
      }

      // Update React state only on changes
      if (inAir !== showTrail) setShowTrail(inAir);
      if (dir !== s.lastDir) s.lastDir = dir;
      if (nextSprite) setMarioSprite(nextSprite);
      if (phase.idx !== s.lastIdx) s.lastIdx = phase.idx;

      // Coin animation
      const ac = activeCoinRef.current;
      if (ac >= 0 && coinRef.current) {
        const ce = now - s.impactTime;
        const cd = 750;
        if (ce < cd) {
          const p = ce / cd;
          const riseP = Math.min(p / 0.65, 1);
          const riseY = -easeOutQuad(riseP) * 52;
          const op = p < 0.7 ? 1 : (1 - (p - 0.7) / 0.3);
          coinRef.current.style.transform =
            `translate3d(${BLOCK_X[ac] - COIN_SIZE / 2}px, ${BLOCK_Y + 6 + riseY}px, 0)`;
          coinRef.current.style.opacity = op;
          setCoinFrameSync(Math.floor(ce / 55) % 4);
        } else {
          hideCoin();
        }
      }

      // Score animation
      const as = activeScoreRef.current;
      if (as >= 0 && scoreRef.current) {
        const se = now - s.impactTime;
        const sd = 850;
        if (se < sd) {
          const p = se / sd;
          const rise = -easeOutQuad(p) * 40;
          const op = p < 0.75 ? 1 : (1 - (p - 0.75) / 0.25);
          scoreRef.current.style.transform =
            `translate3d(${BLOCK_X[as] - 18}px, ${BLOCK_Y - 4 + rise}px, 0)`;
          scoreRef.current.style.opacity = op;
        } else {
          hideScore();
        }
      }

      s.raf = requestAnimationFrame(tick);
    };

    s.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const coinSprites = [SPR.coin1, SPR.coin2, SPR.coin3, SPR.coin4];

  return (
    <div
      ref={stageRef}
      className="absolute pointer-events-none z-[10] mps-stage"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${STAGE_W}px`,
        height: `${STAGE_H}px`,
        imageRendering: 'pixelated',
      }}
      data-testid="mario-play-scene"
    >
      {/* Holographic ground line */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: `${GROUND_Y + 2}px`,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.4) 20%, rgba(96,165,250,0.55) 50%, rgba(167,139,250,0.4) 80%, transparent 100%)',
          boxShadow: '0 0 10px rgba(124,58,237,0.55)',
        }}
      />

      {/* 3 × ? Blocks */}
      {[0, 1, 2].map((i) => {
        const refs = [block0Ref, block1Ref, block2Ref];
        return (
          <img
            key={`block-${i}`}
            ref={refs[i]}
            src={blockSprites[i]}
            alt=""
            data-testid={`mps-qblock-${i}`}
            className="absolute mps-block-base"
            style={{
              left: 0,
              top: 0,
              width: `${BLOCK_SIZE}px`,
              height: `${BLOCK_SIZE}px`,
              transform: `translate3d(${BLOCK_X[i] - BLOCK_SIZE / 2}px, ${BLOCK_Y}px, 0)`,
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.5)) drop-shadow(0 3px 0 rgba(0,0,0,0.5))',
              willChange: 'transform',
              '--bx': `${BLOCK_X[i] - BLOCK_SIZE / 2}px`,
            }}
            draggable={false}
          />
        );
      })}

      {/* Shockwaves */}
      {shockwaves.map((sw) => (
        <div
          key={`sw-${sw.id}`}
          className="absolute pointer-events-none mps-shockwave"
          style={{
            left: `${sw.cx - 12}px`,
            top: `${sw.cy - 12}px`,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid rgba(253,224,71,0.9)',
            boxShadow: '0 0 18px rgba(251,191,36,0.7), inset 0 0 10px rgba(251,191,36,0.4)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Coin */}
      {activeCoin >= 0 && (
        <img
          ref={coinRef}
          src={coinSprites[coinFrame]}
          alt=""
          aria-hidden
          data-testid="mps-coin"
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: `${COIN_SIZE}px`,
            height: `${COIN_SIZE}px`,
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 8px rgba(251,191,36,1)) drop-shadow(0 0 16px rgba(253,224,71,0.7))',
            willChange: 'transform, opacity',
          }}
          draggable={false}
        />
      )}

      {/* +100 score popup */}
      {activeScore >= 0 && (
        <div
          ref={scoreRef}
          className="absolute pointer-events-none"
          data-testid="mps-score"
          style={{
            left: 0,
            top: 0,
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '11px',
            color: '#fde047',
            textShadow: '2px 2px 0 #000, 0 0 8px rgba(251,191,36,0.95)',
            letterSpacing: '0.5px',
            willChange: 'transform, opacity',
          }}
        >
          +100
        </div>
      )}

      {/* Star burst (5 stars in radial pattern) */}
      {stars.map((s) =>
        [0, 1, 2, 3, 4].map((i) => {
          const angle = (i * 72) + 18; // evenly spread 5 directions
          const big = i % 2 === 0;
          return (
            <div
              key={`star-${s.id}-${i}`}
              className="absolute pointer-events-none mps-star"
              style={{
                left: `${s.cx}px`,
                top: `${s.cy}px`,
                fontSize: big ? '12px' : '9px',
                color: big ? '#fde047' : '#fbbf24',
                textShadow: '0 0 6px rgba(251,191,36,0.95)',
                lineHeight: 1,
                '--angle': `${angle}deg`,
                '--dist': `${26 + (i % 2) * 10}px`,
                animationDelay: `${i * 12}ms`,
              }}
            >
              {big ? '★' : '✦'}
            </div>
          );
        })
      )}

      {/* Ground dust puffs on landing */}
      {dusts.map((d) => (
        <div
          key={`dust-${d.id}`}
          className="absolute pointer-events-none mps-dust"
          style={{
            left: `${d.cx - 7}px`,
            top: `${GROUND_Y - 4}px`,
            width: '14px',
            height: '8px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(167,139,250,0.6) 0%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Mario trail ghosts (visible only during air) */}
      {showTrail && (
        <>
          <img
            ref={trail1Ref}
            src={marioSprite}
            alt=""
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: `${MARIO_SIZE}px`,
              height: `${MARIO_SIZE}px`,
              imageRendering: 'pixelated',
              transformOrigin: 'center bottom',
              opacity: 0.32,
              filter: 'blur(0.6px) drop-shadow(0 0 8px rgba(124,58,237,0.75))',
              mixBlendMode: 'screen',
              transition: 'transform 50ms linear',
              willChange: 'transform',
            }}
            draggable={false}
          />
          <img
            ref={trail2Ref}
            src={marioSprite}
            alt=""
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: `${MARIO_SIZE}px`,
              height: `${MARIO_SIZE}px`,
              imageRendering: 'pixelated',
              transformOrigin: 'center bottom',
              opacity: 0.18,
              filter: 'blur(1.2px) drop-shadow(0 0 10px rgba(96,165,250,0.6))',
              mixBlendMode: 'screen',
              transition: 'transform 110ms linear',
              willChange: 'transform',
            }}
            draggable={false}
          />
        </>
      )}

      {/* Mario sprite */}
      <img
        ref={marioRef}
        src={marioSprite}
        alt="Mario"
        data-testid="mario-pixel-hologram"
        className="absolute"
        style={{
          left: 0,
          top: 0,
          width: `${MARIO_SIZE}px`,
          height: `${MARIO_SIZE}px`,
          imageRendering: 'pixelated',
          transformOrigin: 'center bottom',
          filter: glitchActive
            ? 'brightness(1.5) hue-rotate(30deg) drop-shadow(0 0 10px rgba(255,255,255,0.9))'
            : 'drop-shadow(0 2px 0 rgba(0,0,0,0.45)) drop-shadow(0 0 8px rgba(124,58,237,0.3))',
          willChange: 'transform',
        }}
        draggable={false}
      />

      {/* Dynamic shadow */}
      <div
        ref={shadowRef}
        className="absolute pointer-events-none"
        style={{
          left: 0,
          top: 0,
          width: '34px',
          height: '6px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
          filter: 'blur(2px)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Keyframes */}
      <style>{`
        /* Block bump — uses --bx CSS variable for per-block horizontal position */
        .mps-block-bump {
          animation: mps-block-bump 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes mps-block-bump {
          0%   { transform: translate3d(var(--bx), ${BLOCK_Y}px, 0); }
          40%  { transform: translate3d(var(--bx), ${BLOCK_Y - 12}px, 0); }
          70%  { transform: translate3d(var(--bx), ${BLOCK_Y - 5}px, 0); }
          100% { transform: translate3d(var(--bx), ${BLOCK_Y}px, 0); }
        }

        /* Camera shake — applied to stage container when block is hit */
        .mps-stage.mps-shake {
          animation: mps-shake 280ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
        @keyframes mps-shake {
          0%, 100% { transform: translate(-50%, -50%); }
          15% { transform: translate(calc(-50% - 2px), calc(-50% + 1px)); }
          30% { transform: translate(calc(-50% + 2px), calc(-50% - 1px)); }
          45% { transform: translate(calc(-50% - 1px), calc(-50% - 1px)); }
          60% { transform: translate(calc(-50% + 1px), calc(-50% + 2px)); }
          75% { transform: translate(calc(-50% - 1px), calc(-50% + 1px)); }
          90% { transform: translate(calc(-50% + 1px), -50%); }
        }

        /* Shockwave ring — expands outward */
        .mps-shockwave {
          animation: mps-sw 650ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes mps-sw {
          0%   { opacity: 1;   transform: scale(0.3); }
          100% { opacity: 0;   transform: scale(4.5); }
        }

        /* Stars fly outward in radial direction */
        .mps-star {
          animation: mps-star 680ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: center;
        }
        @keyframes mps-star {
          0%   { opacity: 0;   transform: rotate(var(--angle)) translateY(0) scale(0.5); }
          20%  { opacity: 1;   transform: rotate(var(--angle)) translateY(calc(-1 * var(--dist))) scale(1.35); }
          70%  { opacity: 0.85; }
          100% { opacity: 0;   transform: rotate(var(--angle)) translateY(calc(-1 * var(--dist) - 14px)) scale(0.65); }
        }

        /* Dust puff on landing */
        .mps-dust {
          animation: mps-dust 450ms ease-out forwards;
        }
        @keyframes mps-dust {
          0%   { opacity: 0;    transform: scale(0.5, 0.5); }
          30%  { opacity: 0.75; transform: scale(1.5, 1); }
          100% { opacity: 0;    transform: scale(2, 0.5) translateY(-2px); }
        }
      `}</style>
    </div>
  );
};

export default MarioPlayScene;
