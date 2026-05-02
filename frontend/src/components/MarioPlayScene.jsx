import React, { useEffect, useRef, useState } from 'react';

/**
 * Authentic NES-style Mario play scene.
 *
 *  Full cycle = 6000ms:
 *   0–400     idle at start position (standing)
 *   400–1600  walk right 48px (3-frame walk cycle @ 100ms/frame)
 *   1600–1700 pre-jump crouch (idle frame, slight compress)
 *   1700–2100 parabolic jump up → peak at block
 *   2100      IMPACT -> block becomes empty, coin spawns, +100 text
 *   2100–2500 fall back down
 *   2500–2600 landing squash
 *   2600–3800 walk left 48px back to start
 *   3800–4200 idle (breathe)
 *   4200      block regenerates with glint
 *   4200–6000 idle (but block glints softly)
 *
 * Uses requestAnimationFrame for 60fps fluidity. Mario & coin positions are
 * updated via style.transform (GPU-accelerated). Sprite frame swaps happen
 * via React state (infrequent, so cheap).
 */

// Asset paths
const A = {
  idle:   '/assets/mario_game/mario-idle.png',
  walk1:  '/assets/mario_game/mario-walk1.png',
  walk2:  '/assets/mario_game/mario-walk2.png',
  jump:   '/assets/mario_game/mario-jump.png',
  hit:    '/assets/mario_game/mario-hit.png',
  block:  '/assets/mario_game/qblock.png',
  blockGlint: '/assets/mario_game/qblock-glint.png',
  blockEmpty: '/assets/mario_game/qblock-empty.png',
  coin1:  '/assets/mario_game/coin-1.png',
  coin2:  '/assets/mario_game/coin-2.png',
  coin3:  '/assets/mario_game/coin-3.png',
  coin4:  '/assets/mario_game/coin-4.png',
  spark1: '/assets/mario_game/sparkle-1.png',
  spark2: '/assets/mario_game/sparkle-2.png',
  spark3: '/assets/mario_game/sparkle-3.png',
};

// Timeline constants (ms)
const T_IDLE_END        = 400;
const T_WALK_RIGHT_END  = 1600;
const T_PREJUMP_END     = 1700;
const T_JUMP_PEAK       = 2100;
const T_FALL_END        = 2500;
const T_LAND_END        = 2600;
const T_WALK_LEFT_END   = 3800;
const T_IDLE2_END       = 4200;
const T_CYCLE_END       = 6000;

// Distances & positions (in stage pixels, scaled via responsive container)
const STAGE_W = 260;   // stage width baseline (BIGGER)
const STAGE_H = 180;   // stage height baseline
const GROUND_Y = 150;  // Mario's feet rest on this Y coordinate
const MARIO_SIZE = 56; // rendered Mario sprite size (much bigger)
const BLOCK_SIZE = 48;
const COIN_SIZE = 32;
const WALK_DISTANCE = 72;
const MARIO_START_X = 50;
const MARIO_END_X = MARIO_START_X + WALK_DISTANCE;
const BLOCK_X = MARIO_END_X + 2;            // block sits right above where Mario jumps
const BLOCK_Y = 38;                         // top of block area
const MARIO_JUMP_PEAK_Y = GROUND_Y - 60;    // how high Mario's feet reach at peak

const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
const easeInQuad = (t) => t * t;

const MarioPlayScene = ({ glitchActive }) => {
  // React state for sprite frames and visibility (infrequent updates)
  const [marioSprite, setMarioSprite] = useState(A.idle);
  const [blockSprite, setBlockSprite] = useState(A.block);
  const [coinFrame, setCoinFrame] = useState(0);
  const [coinVisible, setCoinVisible] = useState(false);
  const [sparkFrame, setSparkFrame] = useState(0);
  const [sparkVisible, setSparkVisible] = useState(false);
  const [floatTextVisible, setFloatTextVisible] = useState(false);

  // Refs for DOM manipulation (60fps transforms - avoid React re-render)
  const marioRef = useRef(null);
  const blockRef = useRef(null);
  const coinRef = useRef(null);
  const floatTextRef = useRef(null);

  const stateRef = useRef({
    startTime: 0,
    raf: 0,
    // persistent state between frames so we only change sprite on transition
    lastPhase: '',
    coinT0: 0,
  });

  useEffect(() => {
    const s = stateRef.current;
    s.startTime = performance.now();

    const tick = (now) => {
      const elapsed = (now - s.startTime) % T_CYCLE_END;

      // ── Determine phase & Mario sprite ──
      let phase = '';
      let marioX = MARIO_START_X;
      let marioY = GROUND_Y;
      let marioFlipX = 1;
      let marioScaleY = 1;

      if (elapsed < T_IDLE_END) {
        phase = 'idle';
        marioX = MARIO_START_X;
        marioY = GROUND_Y;
      } else if (elapsed < T_WALK_RIGHT_END) {
        phase = 'walk_right';
        const p = (elapsed - T_IDLE_END) / (T_WALK_RIGHT_END - T_IDLE_END);
        marioX = MARIO_START_X + p * WALK_DISTANCE;
        marioY = GROUND_Y;
      } else if (elapsed < T_PREJUMP_END) {
        phase = 'prejump';
        marioX = MARIO_END_X;
        marioY = GROUND_Y + 2; // tiny crouch
        marioScaleY = 0.9;
      } else if (elapsed < T_JUMP_PEAK) {
        phase = 'jump_up';
        const p = (elapsed - T_PREJUMP_END) / (T_JUMP_PEAK - T_PREJUMP_END);
        const ep = easeOutQuad(p);
        marioX = MARIO_END_X;
        marioY = GROUND_Y - ep * (GROUND_Y - MARIO_JUMP_PEAK_Y);
      } else if (elapsed < T_FALL_END) {
        phase = 'fall';
        const p = (elapsed - T_JUMP_PEAK) / (T_FALL_END - T_JUMP_PEAK);
        const ep = easeInQuad(p);
        marioX = MARIO_END_X;
        marioY = MARIO_JUMP_PEAK_Y + ep * (GROUND_Y - MARIO_JUMP_PEAK_Y);
      } else if (elapsed < T_LAND_END) {
        phase = 'land';
        marioX = MARIO_END_X;
        marioY = GROUND_Y + 1;
        marioScaleY = 0.85; // landing squash
      } else if (elapsed < T_WALK_LEFT_END) {
        phase = 'walk_left';
        const p = (elapsed - T_LAND_END) / (T_WALK_LEFT_END - T_LAND_END);
        marioX = MARIO_END_X - p * WALK_DISTANCE;
        marioY = GROUND_Y;
        marioFlipX = -1;
      } else {
        phase = 'idle2';
        marioX = MARIO_START_X;
        marioY = GROUND_Y;
      }

      // Apply Mario transform (GPU)
      if (marioRef.current) {
        const flipX = marioFlipX === -1 ? -1 : 1;
        marioRef.current.style.transform =
          `translate3d(${marioX - MARIO_SIZE / 2}px, ${marioY - MARIO_SIZE}px, 0) scaleX(${flipX}) scaleY(${marioScaleY})`;
      }

      // ── Sprite swap on phase transition ──
      if (phase !== s.lastPhase) {
        if (phase === 'idle' || phase === 'idle2') {
          setMarioSprite(A.idle);
        } else if (phase === 'prejump') {
          setMarioSprite(A.idle);
        } else if (phase === 'jump_up' || phase === 'fall') {
          setMarioSprite(A.jump);
        } else if (phase === 'land') {
          setMarioSprite(A.hit);
        }
        // block impact trigger
        if (phase === 'fall' && s.lastPhase === 'jump_up') {
          // Just crossed peak → impact
          setBlockSprite(A.blockEmpty);
          setCoinVisible(true);
          setSparkVisible(true);
          setFloatTextVisible(true);
          s.coinT0 = now;
          // bump the block (CSS anim below)
          if (blockRef.current) {
            blockRef.current.classList.remove('block-bump');
            // force reflow to restart anim
            void blockRef.current.offsetWidth;
            blockRef.current.classList.add('block-bump');
          }
        }
        if (phase === 'idle2' && s.lastPhase === 'walk_left') {
          // Block regenerates (subtle)
          setTimeout(() => {
            setBlockSprite(A.block);
          }, 400);
        }
        s.lastPhase = phase;
      }

      // ── Walk-cycle sprite rotation (during walking phases only) ──
      if (phase === 'walk_right' || phase === 'walk_left') {
        // 10 frames per second for walk
        const walkFrameIdx = Math.floor(elapsed / 100) % 3;
        const nextSprite = walkFrameIdx === 0 ? A.idle : (walkFrameIdx === 1 ? A.walk1 : A.walk2);
        if (nextSprite !== marioSprite) {
          setMarioSprite(nextSprite);
        }
      }

      // ── Coin rise + spin ──
      if (coinVisible && coinRef.current) {
        const cElapsed = now - s.coinT0;
        const cDur = 900;
        if (cElapsed < cDur) {
          const cp = cElapsed / cDur;
          // Rise: -40px over 70% of duration, then fade
          const riseP = Math.min(cp / 0.7, 1);
          const riseY = -easeOutQuad(riseP) * 38;
          const opacity = cp < 0.7 ? 1 : (1 - (cp - 0.7) / 0.3);
          coinRef.current.style.transform = `translate3d(${BLOCK_X - COIN_SIZE / 2}px, ${BLOCK_Y + 4 + riseY}px, 0)`;
          coinRef.current.style.opacity = opacity;
          // coin frame switch every 80ms
          const cf = Math.floor(cElapsed / 80) % 4;
          if (cf !== coinFrame) setCoinFrame(cf);
        } else {
          setCoinVisible(false);
          setSparkVisible(false);
          setFloatTextVisible(false);
        }
      }

      // ── Sparkle frame rotation ──
      if (sparkVisible) {
        const sElapsed = now - s.coinT0;
        const sf = Math.floor(sElapsed / 90) % 3;
        if (sf !== sparkFrame) setSparkFrame(sf);
      }

      // ── +100 float text ──
      if (floatTextVisible && floatTextRef.current) {
        const fElapsed = now - s.coinT0;
        const fDur = 900;
        const fp = Math.min(fElapsed / fDur, 1);
        floatTextRef.current.style.transform = `translate3d(${BLOCK_X - 14}px, ${BLOCK_Y - 8 - easeOutQuad(fp) * 28}px, 0)`;
        floatTextRef.current.style.opacity = fp < 0.75 ? 1 : (1 - (fp - 0.75) / 0.25);
      }

      // ── Block glint (idle phase) ──
      if (phase === 'idle2') {
        const idleT = elapsed - T_WALK_LEFT_END;
        // Periodic glint every ~900ms
        if (Math.floor(idleT / 100) % 9 === 0 && blockSprite === A.block) {
          setBlockSprite(A.blockGlint);
        } else if (Math.floor(idleT / 100) % 9 === 1 && blockSprite === A.blockGlint) {
          setBlockSprite(A.block);
        }
      }

      s.raf = requestAnimationFrame(tick);
    };

    s.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const coinSprites = [A.coin1, A.coin2, A.coin3, A.coin4];
  const sparkSprites = [A.spark1, A.spark2, A.spark3];

  return (
    <div
      className="absolute pointer-events-none z-[10]"
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
      {/* Soft holographic ground line */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: `${GROUND_Y + 1}px`,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.35) 20%, rgba(96,165,250,0.45) 50%, rgba(167,139,250,0.35) 80%, transparent 100%)',
          boxShadow: '0 0 8px rgba(124,58,237,0.4)',
        }}
      />

      {/* ? Block */}
      <img
        ref={blockRef}
        src={blockSprite}
        alt=""
        aria-hidden
        data-testid="mario-qblock"
        className="absolute"
        style={{
          left: 0,
          top: 0,
          width: `${BLOCK_SIZE}px`,
          height: `${BLOCK_SIZE}px`,
          transform: `translate3d(${BLOCK_X - BLOCK_SIZE / 2}px, ${BLOCK_Y}px, 0)`,
          imageRendering: 'pixelated',
          filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.45)) drop-shadow(0 2px 0 rgba(0,0,0,0.5))',
          willChange: 'transform',
        }}
        draggable={false}
      />

      {/* Coin (hidden until hit) */}
      {coinVisible && (
        <img
          ref={coinRef}
          src={coinSprites[coinFrame]}
          alt=""
          aria-hidden
          data-testid="mario-coin"
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: `${COIN_SIZE}px`,
            height: `${COIN_SIZE}px`,
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.9)) drop-shadow(0 0 12px rgba(253,224,71,0.6))',
            willChange: 'transform, opacity',
          }}
          draggable={false}
        />
      )}

      {/* Sparkle (on top of coin trail) */}
      {sparkVisible && (
        <img
          src={sparkSprites[sparkFrame]}
          alt=""
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left: `${BLOCK_X - 14}px`,
            top: `${BLOCK_Y - 6}px`,
            width: '28px',
            height: '28px',
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))',
            animation: 'mps-spark-fade 900ms ease-out forwards',
          }}
          draggable={false}
        />
      )}

      {/* "+100" floating text */}
      {floatTextVisible && (
        <div
          ref={floatTextRef}
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: 0,
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '13px',
            color: '#fde047',
            textShadow: '2px 2px 0 #000, 0 0 8px rgba(251,191,36,0.95)',
            letterSpacing: '0.5px',
            willChange: 'transform, opacity',
          }}
          data-testid="mario-score-popup"
        >
          +100
        </div>
      )}

      {/* Mario */}
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
            : 'drop-shadow(0 2px 0 rgba(0,0,0,0.4)) drop-shadow(0 0 8px rgba(124,58,237,0.3))',
          willChange: 'transform',
        }}
        draggable={false}
      />

      {/* Keyframes */}
      <style>{`
        [data-testid="mario-qblock"].block-bump {
          animation: mps-block-bump 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes mps-block-bump {
          0%   { transform: translate3d(${BLOCK_X - BLOCK_SIZE / 2}px, ${BLOCK_Y}px, 0); }
          40%  { transform: translate3d(${BLOCK_X - BLOCK_SIZE / 2}px, ${BLOCK_Y - 10}px, 0); }
          70%  { transform: translate3d(${BLOCK_X - BLOCK_SIZE / 2}px, ${BLOCK_Y - 4}px, 0); }
          100% { transform: translate3d(${BLOCK_X - BLOCK_SIZE / 2}px, ${BLOCK_Y}px, 0); }
        }

        @keyframes mps-spark-fade {
          0%   { opacity: 1; transform: scale(0.8); }
          60%  { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
};

export default MarioPlayScene;
