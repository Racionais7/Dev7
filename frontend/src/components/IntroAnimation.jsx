import React, { useState, useEffect, useMemo, useRef } from 'react';

// Mario sprites
const SPR = {
  idle:       '/assets/mario_game/mario-idle.png',
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

// Mario jump cycle timing (ms)
const JUMP_CYCLE = 1700;
const T_CROUCH   = 120;
const T_PEAK     = 480;   // impact point
const T_LAND     = 900;
const T_IDLE_END = 1100;
const T_GLINT    = 1350;  // block regenerates with glint

// Positions inside the 220x200 stage
const STAGE_W = 220;
const STAGE_H = 200;
const GROUND_Y = 178;
const MARIO_SIZE = 70;
const BLOCK_SIZE = 58;
const COIN_SIZE = 30;
const BLOCK_Y = 18;
const MARIO_BASE_Y = GROUND_Y - MARIO_SIZE;  // Mario top when on ground
const MARIO_PEAK_Y = BLOCK_Y + BLOCK_SIZE;   // Mario top when head near block

const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);
const easeInQuad  = (t) => t * t;

const IntroAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);

  // Mario scene state
  const [marioSprite, setMarioSprite] = useState(SPR.idle);
  const [blockSprite, setBlockSprite] = useState(SPR.block);
  const [coinFrame, setCoinFrame] = useState(0);
  const [coinVisible, setCoinVisible] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);

  // Refs for GPU-accelerated transforms
  const marioRef = useRef(null);
  const blockRef = useRef(null);
  const coinRef = useRef(null);
  const scoreRef = useRef(null);
  const marioState = useRef({ raf: 0, startTime: 0, lastPhase: '', impactTime: 0 });

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

  // ═══════ MARIO JUMP CYCLE (requestAnimationFrame driven) ═══════
  useEffect(() => {
    const st = marioState.current;
    st.startTime = performance.now();

    const tick = (now) => {
      const elapsed = (now - st.startTime) % JUMP_CYCLE;

      // Determine phase, mario position & sprite
      let phase = '';
      let marioY = MARIO_BASE_Y;
      let marioScaleY = 1;
      let marioScaleX = 1;

      if (elapsed < T_CROUCH) {
        phase = 'crouch';
        marioY = MARIO_BASE_Y + 3;
        marioScaleY = 0.9;
        marioScaleX = 1.08;
      } else if (elapsed < T_PEAK) {
        phase = 'jump_up';
        const p = (elapsed - T_CROUCH) / (T_PEAK - T_CROUCH);
        const ep = easeOutQuad(p);
        marioY = MARIO_BASE_Y - ep * (MARIO_BASE_Y - MARIO_PEAK_Y);
        marioScaleY = 1.05;
      } else if (elapsed < T_LAND - 80) {
        phase = 'fall';
        const p = (elapsed - T_PEAK) / ((T_LAND - 80) - T_PEAK);
        const ep = easeInQuad(p);
        marioY = MARIO_PEAK_Y + ep * (MARIO_BASE_Y - MARIO_PEAK_Y);
      } else if (elapsed < T_LAND) {
        phase = 'land';
        marioY = MARIO_BASE_Y + 4;
        marioScaleY = 0.78;
        marioScaleX = 1.15;
      } else if (elapsed < T_IDLE_END) {
        phase = 'recover';
        marioY = MARIO_BASE_Y;
      } else {
        phase = 'idle';
        marioY = MARIO_BASE_Y;
      }

      // Apply Mario transform (GPU)
      if (marioRef.current) {
        const xOffset = STAGE_W / 2 - MARIO_SIZE / 2;
        marioRef.current.style.transform =
          `translate3d(${xOffset}px, ${marioY}px, 0) scale(${marioScaleX}, ${marioScaleY})`;
      }

      // Sprite swap on phase transition
      if (phase !== st.lastPhase) {
        if (phase === 'crouch' || phase === 'idle' || phase === 'recover') {
          setMarioSprite(SPR.idle);
        } else if (phase === 'jump_up' || phase === 'fall') {
          setMarioSprite(SPR.jump);
        } else if (phase === 'land') {
          setMarioSprite(SPR.hit);
        }

        // IMPACT: fall phase just started after jump_up → we hit the block
        if (phase === 'fall' && st.lastPhase === 'jump_up') {
          st.impactTime = now;
          setBlockSprite(SPR.blockEmpty);
          setCoinVisible(true);
          setScoreVisible(true);
          // Block bump anim (restart)
          if (blockRef.current) {
            blockRef.current.classList.remove('intro-block-bump');
            void blockRef.current.offsetWidth;
            blockRef.current.classList.add('intro-block-bump');
          }
        }

        // End of cycle → regenerate block
        if (phase === 'idle' && st.lastPhase === 'recover') {
          setTimeout(() => setBlockSprite(SPR.blockGlint), 150);
          setTimeout(() => setBlockSprite(SPR.block), 380);
        }

        st.lastPhase = phase;
      }

      // Coin animation (600ms from impact)
      if (coinVisible && coinRef.current) {
        const cElapsed = now - st.impactTime;
        const cDur = 650;
        if (cElapsed < cDur) {
          const p = cElapsed / cDur;
          const riseP = Math.min(p / 0.65, 1);
          const riseY = -easeOutQuad(riseP) * 50;
          const opacity = p < 0.7 ? 1 : (1 - (p - 0.7) / 0.3);
          const cx = STAGE_W / 2 - COIN_SIZE / 2;
          coinRef.current.style.transform = `translate3d(${cx}px, ${BLOCK_Y + 6 + riseY}px, 0)`;
          coinRef.current.style.opacity = opacity;
          const cf = Math.floor(cElapsed / 55) % 4;
          if (cf !== coinFrame) setCoinFrame(cf);
        } else {
          setCoinVisible(false);
        }
      }

      // +100 score animation (700ms from impact)
      if (scoreVisible && scoreRef.current) {
        const sElapsed = now - st.impactTime;
        const sDur = 750;
        if (sElapsed < sDur) {
          const p = sElapsed / sDur;
          const rise = -easeOutQuad(p) * 38;
          const opacity = p < 0.75 ? 1 : (1 - (p - 0.75) / 0.25);
          const sx = STAGE_W / 2 - 18;
          scoreRef.current.style.transform = `translate3d(${sx}px, ${BLOCK_Y - 4 + rise}px, 0)`;
          scoreRef.current.style.opacity = opacity;
        } else {
          setScoreVisible(false);
        }
      }

      st.raf = requestAnimationFrame(tick);
    };

    st.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(st.raf);
  }, [coinVisible, scoreVisible, coinFrame]);

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

          {/* ? Block */}
          <img
            ref={blockRef}
            src={blockSprite}
            alt=""
            data-testid="intro-qblock"
            className="absolute intro-block-base"
            style={{
              left: 0,
              top: 0,
              width: `${BLOCK_SIZE}px`,
              height: `${BLOCK_SIZE}px`,
              transform: `translate3d(${STAGE_W / 2 - BLOCK_SIZE / 2}px, ${BLOCK_Y}px, 0)`,
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.55)) drop-shadow(0 3px 0 rgba(0,0,0,0.5))',
              willChange: 'transform',
            }}
            draggable={false}
          />

          {/* Coin (appears on impact) */}
          {coinVisible && (
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
          {scoreVisible && (
            <div
              ref={scoreRef}
              className="absolute pointer-events-none"
              data-testid="intro-score-popup"
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

          {/* Impact sparks (tiny, CSS-only, appear when block is empty) */}
          {coinVisible && (
            <div
              className="absolute intro-spark-burst pointer-events-none"
              style={{
                left: `${STAGE_W / 2 - 20}px`,
                top: `${BLOCK_Y - 4}px`,
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

          {/* Mario shadow — grows with distance from ground */}
          <div
            className="absolute pointer-events-none intro-mario-shadow"
            style={{
              left: `${STAGE_W / 2 - 22}px`,
              top: `${GROUND_Y - 2}px`,
              width: '44px',
              height: '6px',
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)',
              filter: 'blur(2px)',
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
        /* Block bumps up when Mario's head hits it */
        .intro-block-bump {
          animation: intro-block-bump 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes intro-block-bump {
          0%   { transform: translate3d(${STAGE_W / 2 - BLOCK_SIZE / 2}px, ${BLOCK_Y}px, 0); }
          40%  { transform: translate3d(${STAGE_W / 2 - BLOCK_SIZE / 2}px, ${BLOCK_Y - 12}px, 0); }
          70%  { transform: translate3d(${STAGE_W / 2 - BLOCK_SIZE / 2}px, ${BLOCK_Y - 5}px, 0); }
          100% { transform: translate3d(${STAGE_W / 2 - BLOCK_SIZE / 2}px, ${BLOCK_Y}px, 0); }
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

        /* Mario shadow pulses with jump cycle (pure CSS mimics the JS jump phases) */
        .intro-mario-shadow {
          animation: intro-shadow-pulse ${JUMP_CYCLE}ms cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        @keyframes intro-shadow-pulse {
          0%   { opacity: 0.6; transform: scale(1, 1); }
          ${((T_PEAK / JUMP_CYCLE) * 100).toFixed(1)}% { opacity: 0.2; transform: scale(0.5, 0.7); }
          ${((T_LAND / JUMP_CYCLE) * 100).toFixed(1)}% { opacity: 0.75; transform: scale(1.25, 1); }
          ${((T_IDLE_END / JUMP_CYCLE) * 100).toFixed(1)}% { opacity: 0.6; transform: scale(1, 1); }
          100% { opacity: 0.6; transform: scale(1, 1); }
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
