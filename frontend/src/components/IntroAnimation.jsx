import React, { useState, useEffect, useMemo, useRef } from 'react';

// Mario sprites
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

// ═══════ SCENE LAYOUT (Mario walks right, jumps at each of 3 blocks) ═══════
const STAGE_W = 340;
const STAGE_H = 180;
const GROUND_Y = 158;
const MARIO_SIZE = 52;
const BLOCK_SIZE = 42;
const COIN_SIZE = 24;
const BLOCK_Y = 14;
const MARIO_BASE_Y = GROUND_Y - MARIO_SIZE;   // Mario top when on ground
const MARIO_PEAK_Y = BLOCK_Y + BLOCK_SIZE + 2; // Mario top when head below block
const JUMP_HEIGHT  = MARIO_BASE_Y - MARIO_PEAK_Y;

// 3 blocks across the stage
const BLOCK_X = [75, 162, 250];

// Choreographed sequence (one full cycle)
const SEQ = [
  { type: 'walk', from: 25,  to: 75,  dur: 550 },
  { type: 'jump', at: 75,    block: 0, dur: 600 },
  { type: 'walk', from: 75,  to: 162, dur: 780 },
  { type: 'jump', at: 162,   block: 1, dur: 600 },
  { type: 'walk', from: 162, to: 250, dur: 780 },
  { type: 'jump', at: 250,   block: 2, dur: 600 },
  { type: 'walk', from: 250, to: 320, dur: 550 },
  { type: 'wait', dur: 900 },
];
const CYCLE_DUR = SEQ.reduce((s, p) => s + p.dur, 0);

// Return current phase + time within phase for a given elapsed cycle time
function currentPhase(elapsed) {
  let acc = 0;
  for (let i = 0; i < SEQ.length; i++) {
    const p = SEQ[i];
    if (elapsed < acc + p.dur) return { ...p, idx: i, localT: elapsed - acc };
    acc += p.dur;
  }
  const last = SEQ[SEQ.length - 1];
  return { ...last, idx: SEQ.length - 1, localT: last.dur };
}

const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
const easeInQuad  = (t) => t * t;

const IntroAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);

  // Mario scene state (3 blocks)
  const [marioSprite, setMarioSprite] = useState(SPR.idle);
  const [blockSprites, setBlockSprites] = useState([SPR.block, SPR.block, SPR.block]);
  const [coinFrame, setCoinFrame] = useState(0);
  const [activeCoin, setActiveCoin] = useState(-1);   // -1 = hidden, 0/1/2 = which block
  const [activeScore, setActiveScore] = useState(-1);

  // Refs for GPU-accelerated transforms
  const marioRef = useRef(null);
  const shadowRef = useRef(null);
  const block0Ref = useRef(null);
  const block1Ref = useRef(null);
  const block2Ref = useRef(null);
  const coinRef = useRef(null);
  const scoreRef = useRef(null);
  const marioState = useRef({ raf: 0, startTime: 0, lastIdx: -1, impactTime: 0, lastWalkFrame: -1, didImpact: false });

  // Refs mirror state so RAF loop can read latest values without re-running useEffect
  const activeCoinRef = useRef(-1);
  const activeScoreRef = useRef(-1);
  const coinFrameRef = useRef(0);

  const showCoin = (bi) => { activeCoinRef.current = bi; setActiveCoin(bi); };
  const hideCoin = () => { activeCoinRef.current = -1; setActiveCoin(-1); };
  const showScore = (bi) => { activeScoreRef.current = bi; setActiveScore(bi); };
  const hideScore = () => { activeScoreRef.current = -1; setActiveScore(-1); };
  const setCoinFrameSync = (f) => {
    if (coinFrameRef.current !== f) {
      coinFrameRef.current = f;
      setCoinFrame(f);
    }
  };

  // System loading steps - always defined and non-empty
  const steps = useMemo(() => [
    { message: 'Conectando ao servidor...', duration: 800 },
    { message: 'Validando provedores...', duration: 600 },
    { message: 'Sincronizando histórico de rodadas...', duration: 700 },
    { message: 'Carregando sessões ativas...', duration: 600 },
    { message: 'Inicializando interface...', duration: 500 }
  ], []);

  // Safe accessor for current step message
  const getCurrentMessage = () => {
    if (currentStep >= 0 && currentStep < steps.length && steps[currentStep]?.message) {
      return steps[currentStep].message;
    }
    return 'Sincronizando...';
  };

  // ═══════ MARIO WALK-AND-JUMP CYCLE (RAF, sequences 3 blocks) ═══════
  useEffect(() => {
    const st = marioState.current;
    st.startTime = performance.now();

    const blockRefs = [block0Ref, block1Ref, block2Ref];

    const tick = (now) => {
      const elapsed = (now - st.startTime) % CYCLE_DUR;
      const phase = currentPhase(elapsed);

      // Detect cycle restart → regenerate blocks
      if (phase.idx < st.lastIdx) {
        // Trigger glint then back to normal
        setBlockSprites([SPR.blockGlint, SPR.blockGlint, SPR.blockGlint]);
        setTimeout(() => setBlockSprites([SPR.block, SPR.block, SPR.block]), 250);
      }

      // ── Phase: WALK ──
      let marioX = 25, marioY = MARIO_BASE_Y;
      let marioScaleY = 1, marioScaleX = 1;
      let nextSprite = null;

      if (phase.type === 'walk') {
        const p = phase.localT / phase.dur;
        marioX = phase.from + p * (phase.to - phase.from);
        marioY = MARIO_BASE_Y;
        // Walk cycle: alternate idle/walk1/walk2 every 100ms
        const walkIdx = Math.floor(phase.localT / 110) % 4;
        const walkMap = [SPR.walk1, SPR.idle, SPR.walk2, SPR.idle];
        nextSprite = walkMap[walkIdx];
        if (walkIdx !== st.lastWalkFrame) {
          st.lastWalkFrame = walkIdx;
        }
        if (phase.idx !== st.lastIdx) {
          st.didImpact = false;
        }
      }
      // ── Phase: JUMP (at a block) ──
      else if (phase.type === 'jump') {
        marioX = phase.at;
        const p = phase.localT / phase.dur;

        if (p < 0.15) {
          // Crouch / anticipate
          marioY = MARIO_BASE_Y + 2;
          marioScaleY = 0.9;
          marioScaleX = 1.08;
          nextSprite = SPR.idle;
        } else if (p < 0.48) {
          // Ascent
          const pp = (p - 0.15) / 0.33;
          marioY = MARIO_BASE_Y - easeOutQuad(pp) * JUMP_HEIGHT;
          nextSprite = SPR.jump;
          marioScaleY = 1.05;
        } else if (p < 0.52) {
          // IMPACT at peak
          marioY = MARIO_PEAK_Y;
          nextSprite = SPR.jump;
          // Trigger impact once
          if (!st.didImpact) {
            const bi = phase.block;
            st.impactTime = now;
            st.didImpact = true;
            // Block turns empty + coin + score
            setBlockSprites((prev) => prev.map((s, i) => (i === bi ? SPR.blockEmpty : s)));
            showCoin(bi);
            showScore(bi);
            // Bump animation
            const br = blockRefs[bi];
            if (br && br.current) {
              br.current.classList.remove('intro-block-bump');
              void br.current.offsetWidth;
              br.current.classList.add('intro-block-bump');
            }
          }
        } else if (p < 0.88) {
          // Fall
          const pp = (p - 0.52) / 0.36;
          marioY = MARIO_PEAK_Y + easeInQuad(pp) * JUMP_HEIGHT;
          nextSprite = SPR.jump;
        } else {
          // Landing squash
          marioY = MARIO_BASE_Y + 3;
          marioScaleY = 0.82;
          marioScaleX = 1.12;
          nextSprite = SPR.hit;
        }
      }
      // ── Phase: WAIT (rest) ──
      else {
        marioX = 320;
        marioY = MARIO_BASE_Y;
        nextSprite = SPR.idle;
      }

      // Apply Mario transform
      if (marioRef.current) {
        marioRef.current.style.transform =
          `translate3d(${marioX - MARIO_SIZE / 2}px, ${marioY}px, 0) scale(${marioScaleX}, ${marioScaleY})`;
      }

      // Shadow follows Mario X and shrinks as Mario rises
      if (shadowRef.current) {
        const airHeight = MARIO_BASE_Y - marioY;
        const jumpProgress = Math.max(0, Math.min(1, airHeight / JUMP_HEIGHT));
        const shadowScale = 1 - jumpProgress * 0.55;
        const shadowOpacity = 0.7 - jumpProgress * 0.45;
        shadowRef.current.style.transform =
          `translate3d(${marioX - 18}px, ${GROUND_Y - 1}px, 0) scale(${shadowScale}, ${shadowScale * 0.8})`;
        shadowRef.current.style.opacity = shadowOpacity;
      }

      // Sprite swap (React dedupes same-value setState, so no need to compare)
      if (nextSprite) {
        setMarioSprite(nextSprite);
      }

      // Phase index tracking (after all logic)
      if (phase.idx !== st.lastIdx) {
        if (phase.type !== 'jump') st.didImpact = false;
        st.lastIdx = phase.idx;
      }

      // ── Coin animation (lives for 700ms from impact) ──
      const ac = activeCoinRef.current;
      if (ac >= 0 && coinRef.current) {
        const cElapsed = now - st.impactTime;
        const cDur = 700;
        if (cElapsed < cDur) {
          const p = cElapsed / cDur;
          const riseP = Math.min(p / 0.65, 1);
          const riseY = -easeOutQuad(riseP) * 48;
          const opacity = p < 0.7 ? 1 : (1 - (p - 0.7) / 0.3);
          const cx = BLOCK_X[ac] - COIN_SIZE / 2;
          coinRef.current.style.transform =
            `translate3d(${cx}px, ${BLOCK_Y + 4 + riseY}px, 0)`;
          coinRef.current.style.opacity = opacity;
          const cf = Math.floor(cElapsed / 55) % 4;
          setCoinFrameSync(cf);
        } else {
          hideCoin();
        }
      }

      // ── +100 score animation (800ms) ──
      const as = activeScoreRef.current;
      if (as >= 0 && scoreRef.current) {
        const sElapsed = now - st.impactTime;
        const sDur = 800;
        if (sElapsed < sDur) {
          const p = sElapsed / sDur;
          const rise = -easeOutQuad(p) * 36;
          const opacity = p < 0.75 ? 1 : (1 - (p - 0.75) / 0.25);
          const sx = BLOCK_X[as] - 18;
          scoreRef.current.style.transform =
            `translate3d(${sx}px, ${BLOCK_Y - 4 + rise}px, 0)`;
          scoreRef.current.style.opacity = opacity;
        } else {
          hideScore();
        }
      }

      st.raf = requestAnimationFrame(tick);
    };

    st.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(st.raf);
  }, []);

  const coinSprites = [SPR.coin1, SPR.coin2, SPR.coin3, SPR.coin4];

  useEffect(() => {
    let stepIndex = 0;
    let progressValue = 0;
    let isMounted = true;

    const progressInterval = setInterval(() => {
      if (!isMounted) return;
      progressValue = Math.min(progressValue + 1.2, 100);
      setProgress(progressValue);
    }, 35);

    const runStep = () => {
      if (!isMounted) return;

      if (stepIndex >= 0 && stepIndex < steps.length) {
        const currentStepData = steps[stepIndex];

        if (currentStepData) {
          setCurrentStep(stepIndex);

          const timestamp = new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });

          const message = currentStepData.message ?? 'Processando...';

          setLogs(prev => [...prev, {
            time: timestamp,
            message: message.replace('...', ''),
            status: 'ok'
          }]);

          const duration = currentStepData.duration ?? 600;
          stepIndex++;

          if (stepIndex < steps.length) {
            setTimeout(runStep, duration);
          }
        }
      }
    };

    const startTimeout = setTimeout(runStep, 300);

    const completeTimeout = setTimeout(() => {
      if (isMounted && onComplete) {
        onComplete();
      }
    }, 3200);

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
      clearTimeout(startTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, steps]);

  return (
    <div className="fixed inset-0 z-50 bg-[#030308] flex items-center justify-center overflow-hidden" data-testid="intro-animation">

      {/* Minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#030308] to-[#020206]" />

      {/* ═══════ MARIO-THEMED BACKDROP (subtle, behind loading UI) ═══════ */}
      {/* Twilight tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(88, 28, 160, 0.22) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 70% 45% at 50% 100%, rgba(14, 60, 140, 0.3) 0%, transparent 55%)',
        }}
      />

      {/* Drifting clouds */}
      {[
        { top: '10%', dur: 90,  scale: 1.2, delay: 0,   op: 0.22 },
        { top: '24%', dur: 130, scale: 0.9, delay: -30, op: 0.14 },
        { top: '70%', dur: 110, scale: 1.1, delay: -60, op: 0.18 },
        { top: '85%', dur: 150, scale: 0.8, delay: -20, op: 0.12 },
      ].map((c, i) => (
        <img
          key={`intro-cloud-${i}`}
          src="/assets/mario_game/bg-cloud.png"
          alt=""
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: c.top,
            left: '-180px',
            width: `${118 * c.scale}px`,
            imageRendering: 'pixelated',
            opacity: c.op,
            filter: 'drop-shadow(0 0 10px rgba(167,139,250,0.5)) drop-shadow(0 0 20px rgba(96,165,250,0.3))',
            animation: `intro-cloud-drift ${c.dur}s linear infinite`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      {/* Floating coins (ambient) */}
      {[
        { left: '8%',  top: '18%', dur: 4.5, delay: 0 },
        { left: '92%', top: '14%', dur: 4.0, delay: 1.2 },
        { left: '5%',  top: '72%', dur: 5.2, delay: 0.6 },
        { left: '94%', top: '68%', dur: 4.8, delay: 1.8 },
        { left: '15%', top: '88%', dur: 4.2, delay: 0.4 },
        { left: '86%', top: '92%', dur: 5.0, delay: 1.0 },
      ].map((c, i) => (
        <img
          key={`intro-coin-${i}`}
          src="/assets/mario_game/bg-coin.png"
          alt=""
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left: c.left,
            top: c.top,
            width: '22px',
            height: '22px',
            imageRendering: 'pixelated',
            opacity: 0.55,
            filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.9)) drop-shadow(0 0 14px rgba(253,224,71,0.55))',
            animation: `intro-coin-bob ${c.dur}s ease-in-out infinite, intro-coin-flip ${c.dur * 0.55}s linear infinite`,
            animationDelay: `${c.delay}s, ${c.delay}s`,
          }}
        />
      ))}

      {/* Distant pixel hills at bottom */}
      <div className="absolute inset-x-0 bottom-[6%] pointer-events-none flex items-end justify-around" style={{ opacity: 0.16 }}>
        {[1.5, 1.2, 1.8, 1.3, 1.6, 1.1].map((scale, i) => (
          <img
            key={`intro-hill-${i}`}
            src="/assets/mario_game/bg-hill.png"
            alt=""
            aria-hidden
            style={{
              width: `${100 * scale}px`,
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 12px rgba(124, 58, 237, 0.7))',
              transform: `translateY(${6 * (i % 2)}px)`,
            }}
          />
        ))}
      </div>

      {/* Decorative pipes on sides */}
      <img
        src="/assets/mario_game/bg-pipe.png"
        alt=""
        aria-hidden
        className="absolute hidden md:block pointer-events-none"
        style={{
          left: '3%', bottom: '3%',
          width: '72px',
          imageRendering: 'pixelated',
          opacity: 0.35,
          filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.7))',
        }}
      />
      <img
        src="/assets/mario_game/bg-pipe.png"
        alt=""
        aria-hidden
        className="absolute hidden md:block pointer-events-none"
        style={{
          right: '3%', bottom: '3%',
          width: '85px',
          imageRendering: 'pixelated',
          opacity: 0.35,
          filter: 'drop-shadow(0 0 12px rgba(16,185,129,0.75))',
          transform: 'scaleX(-1)',
        }}
      />

      {/* Brick ground at very bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[6vh] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(120, 50, 20, 0) 0%, rgba(120, 50, 20, 0.25) 40%, rgba(88, 35, 14, 0.55) 100%), ' +
            'repeating-linear-gradient(0deg, rgba(120, 50, 20, 0.22) 0px, rgba(120, 50, 20, 0.22) 8px, transparent 8px, transparent 9px), ' +
            'repeating-linear-gradient(90deg, rgba(60, 25, 10, 0.35) 0px, rgba(60, 25, 10, 0.35) 1px, transparent 1px, transparent 24px)',
          imageRendering: 'pixelated',
          boxShadow: 'inset 0 2px 0 rgba(200, 120, 60, 0.3)',
        }}
      />

      {/* Star sparkles - Mario reference */}
      {[...Array(14)].map((_, i) => (
        <div
          key={`mario-sparkle-${i}`}
          className="absolute animate-mario-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2.5 + Math.random() * 2}s`
          }}
        >
          <svg className="w-2 h-2 text-amber-300/50" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
          </svg>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6">

        {/* ═══════ MARIO NES SCENE (walk-style cycle: jump + hit block + coin) ═══════ */}
        <div
          className="relative mb-8 mx-auto"
          style={{ width: `${STAGE_W}px`, height: `${STAGE_H}px`, imageRendering: 'pixelated' }}
          data-testid="mario-jump-scene"
        >
          {/* Holographic ground line */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: `${GROUND_Y + 2}px`,
              height: '3px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.4) 20%, rgba(96,165,250,0.6) 50%, rgba(167,139,250,0.4) 80%, transparent 100%)',
              boxShadow: '0 0 10px rgba(124,58,237,0.5)',
            }}
          />
          {/* Pixel brick ground strip below */}
          <div
            className="absolute left-0 right-0 bottom-[-4px]"
            style={{
              height: '4px',
              background: 'repeating-linear-gradient(90deg, #7c2d12 0 6px, #451a03 6px 12px)',
              boxShadow: '0 2px 0 #1c0a02',
              imageRendering: 'pixelated',
            }}
          />

          {/* ═══ 3 × ? BLOCKS ═══ */}
          {[0, 1, 2].map((i) => {
            const refMap = [block0Ref, block1Ref, block2Ref];
            return (
              <img
                key={`block-${i}`}
                ref={refMap[i]}
                src={blockSprites[i]}
                alt=""
                data-testid={`intro-qblock-${i}`}
                className="absolute intro-block-base"
                style={{
                  left: 0,
                  top: 0,
                  width: `${BLOCK_SIZE}px`,
                  height: `${BLOCK_SIZE}px`,
                  transform: `translate3d(${BLOCK_X[i] - BLOCK_SIZE / 2}px, ${BLOCK_Y}px, 0)`,
                  imageRendering: 'pixelated',
                  filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.55)) drop-shadow(0 3px 0 rgba(0,0,0,0.5))',
                  willChange: 'transform',
                  '--block-x': `${BLOCK_X[i] - BLOCK_SIZE / 2}px`,
                }}
                draggable={false}
              />
            );
          })}

          {/* Coin (appears on impact over the hit block) */}
          {activeCoin >= 0 && (
            <img
              ref={coinRef}
              src={coinSprites[coinFrame]}
              alt=""
              aria-hidden
              data-testid="intro-coin"
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

          {/* +100 floating score */}
          {activeScore >= 0 && (
            <div
              ref={scoreRef}
              className="absolute pointer-events-none"
              data-testid="intro-score-popup"
              style={{
                left: 0,
                top: 0,
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '10px',
                color: '#fde047',
                textShadow: '2px 2px 0 #000, 0 0 8px rgba(251,191,36,0.95)',
                letterSpacing: '0.5px',
                willChange: 'transform, opacity',
              }}
            >
              +100
            </div>
          )}

          {/* Impact sparks (appear above hit block) */}
          {activeCoin >= 0 && (
            <div
              className="absolute intro-spark-burst pointer-events-none"
              style={{
                left: `${BLOCK_X[activeCoin] - 20}px`,
                top: `${BLOCK_Y - 6}px`,
                width: '40px',
                height: '16px',
              }}
              aria-hidden
            >
              <span className="absolute left-[2px] top-[2px] text-amber-300 text-[10px]">✦</span>
              <span className="absolute left-1/2 -translate-x-1/2 -top-1 text-yellow-200 text-[13px]">★</span>
              <span className="absolute right-[2px] top-[2px] text-amber-300 text-[10px]">✦</span>
            </div>
          )}

          {/* Mario sprite */}
          <img
            ref={marioRef}
            src={marioSprite}
            alt="Mario"
            data-testid="mario-jumper"
            className="absolute"
            style={{
              left: 0,
              top: 0,
              width: `${MARIO_SIZE}px`,
              height: `${MARIO_SIZE}px`,
              imageRendering: 'pixelated',
              transformOrigin: 'center bottom',
              filter: 'drop-shadow(0 3px 0 rgba(0,0,0,0.4)) drop-shadow(0 0 10px rgba(124,58,237,0.35))',
              willChange: 'transform',
            }}
            draggable={false}
          />

          {/* Mario shadow — follows him horizontally, shrinks when he jumps */}
          <div
            ref={shadowRef}
            className="absolute pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: '36px',
              height: '6px',
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
              filter: 'blur(2px)',
              willChange: 'transform, opacity',
            }}
          />
        </div>

        {/* Title */}
        <div className="text-center mb-8" data-testid="intro-title">
          <h1
            className="text-[11px] font-bold text-amber-300 tracking-[0.35em] mb-2"
            style={{
              fontFamily: '"Press Start 2P", "Courier New", monospace',
              textShadow: '2px 2px 0 #8b0000'
            }}
          >
            SUPER MARIO AI
          </h1>
          <p className="text-[9px] text-gray-500 font-mono tracking-wider">
            LOADING v2.4.1
          </p>
        </div>

        {/* Progress section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400 font-mono" data-testid="intro-current-step">
              {getCurrentMessage()}
            </span>
            <span className="text-xs text-amber-400 font-mono font-bold" data-testid="intro-progress">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Pixel progress bar (Mario style) */}
          <div
            className="relative h-3 bg-black rounded-none overflow-hidden"
            style={{
              border: '2px solid #3a1a05',
              imageRendering: 'pixelated'
            }}
          >
            <div
              className="h-full transition-all duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background:
                  'repeating-linear-gradient(90deg, #ef4444 0 6px, #dc2626 6px 12px)',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.4)'
              }}
            >
              <div
                className="absolute inset-0 animate-shine"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)'
                }}
              />
            </div>
          </div>
        </div>

        {/* System log output */}
        <div className="rounded-lg bg-[#08080d] border border-white/[0.04] overflow-hidden font-mono">
          <div className="px-3 py-2 border-b border-white/[0.03] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
            <span className="text-[9px] text-gray-600 uppercase tracking-wider">System Output</span>
          </div>

          <div className="p-3 space-y-1.5 min-h-[120px]">
            {logs.map((log, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-[10px] animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-gray-700 w-16 shrink-0">{log.time}</span>
                <span className="text-gray-500">{log.message}</span>
                <span className="text-emerald-600 ml-auto">[{log.status}]</span>
              </div>
            ))}

            {progress < 100 && (
              <div className="flex items-center gap-1 text-[10px] text-gray-600">
                <span className="animate-blink">_</span>
              </div>
            )}
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            progress >= 100 ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'
          }`} />
          <span className="text-[9px] text-gray-600 font-mono uppercase tracking-wider">
            {progress >= 100 ? 'LET\u2019S GO!' : 'Processando'}
          </span>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-shine { animation: shine 2s ease-in-out infinite; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s step-end infinite; }

        /* ═══ MARIO INTRO SCENE animations ═══ */
        /* Block bumps up when Mario's head hits it (uses --block-x for horizontal pos) */
        .intro-block-bump {
          animation: intro-block-bump 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes intro-block-bump {
          0%   { transform: translate3d(var(--block-x), ${BLOCK_Y}px, 0); }
          40%  { transform: translate3d(var(--block-x), ${BLOCK_Y - 12}px, 0); }
          70%  { transform: translate3d(var(--block-x), ${BLOCK_Y - 5}px, 0); }
          100% { transform: translate3d(var(--block-x), ${BLOCK_Y}px, 0); }
        }

        /* Spark burst around block at impact */
        .intro-spark-burst {
          animation: intro-spark-burst 500ms ease-out forwards;
        }
        @keyframes intro-spark-burst {
          0%   { opacity: 0; transform: scale(0.6); }
          40%  { opacity: 1; transform: scale(1.3); }
          100% { opacity: 0; transform: scale(1.5); }
        }

        /* Background sparkles floating */
        @keyframes mario-sparkle {
          0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        .animate-mario-sparkle { animation: mario-sparkle 3s ease-in-out infinite; }

        /* Cloud drift (Mario-themed BG) */
        @keyframes intro-cloud-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 220px)); }
        }

        /* Coin ambient bob & flip */
        @keyframes intro-coin-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes intro-coin-flip {
          0%   { filter: drop-shadow(0 0 6px rgba(251,191,36,0.9)) drop-shadow(0 0 14px rgba(253,224,71,0.55)) brightness(1); }
          50%  { filter: drop-shadow(0 0 12px rgba(253,224,71,1)) drop-shadow(0 0 22px rgba(251,191,36,0.9)) brightness(1.3) hue-rotate(10deg); }
          100% { filter: drop-shadow(0 0 6px rgba(251,191,36,0.9)) drop-shadow(0 0 14px rgba(253,224,71,0.55)) brightness(1); }
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
