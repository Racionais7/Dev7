import React, { useState, useEffect, useMemo } from 'react';

const IntroAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);

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

        {/* ═══════ MARIO PIXEL ART SCENE ═══════ */}
        <div className="relative mb-8 mx-auto" style={{ width: '200px', height: '180px' }} data-testid="mario-jump-scene">

          {/* Question/Brick block (target for Mario to hit) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 animate-brick-hit"
            style={{
              width: '56px',
              height: '56px',
              imageRendering: 'pixelated',
            }}
            data-testid="mario-brick-block"
          >
            {/* Brick block - pure CSS pixel art */}
            <div
              className="relative w-full h-full"
              style={{
                background: 'linear-gradient(180deg, #f4a636 0%, #e18620 50%, #c46a10 100%)',
                border: '3px solid #3a1a05',
                boxShadow:
                  'inset 3px 3px 0 rgba(255,220,150,0.55), inset -3px -3px 0 rgba(120,50,0,0.6), 0 0 18px rgba(251,191,36,0.35)',
                imageRendering: 'pixelated',
              }}
            >
              {/* Rivets (4 corners) */}
              <div className="absolute top-[4px] left-[4px] w-[6px] h-[6px] bg-[#3a1a05]" />
              <div className="absolute top-[4px] right-[4px] w-[6px] h-[6px] bg-[#3a1a05]" />
              <div className="absolute bottom-[4px] left-[4px] w-[6px] h-[6px] bg-[#3a1a05]" />
              <div className="absolute bottom-[4px] right-[4px] w-[6px] h-[6px] bg-[#3a1a05]" />
              {/* Question mark */}
              <div
                className="absolute inset-0 flex items-center justify-center text-white font-black"
                style={{
                  fontFamily: '"Press Start 2P", "Courier New", monospace',
                  fontSize: '22px',
                  textShadow: '2px 2px 0 #3a1a05',
                  letterSpacing: '-1px'
                }}
              >
                ?
              </div>
            </div>

            {/* Impact spark stars that appear on hit */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 animate-brick-spark pointer-events-none">
              <div className="flex gap-1 items-center">
                <span className="text-amber-300 text-[10px]">✦</span>
                <span className="text-yellow-200 text-[14px]">★</span>
                <span className="text-amber-300 text-[10px]">✦</span>
              </div>
            </div>
          </div>

          {/* Mario character (pixel art image) jumping */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 animate-mario-jump"
            style={{ width: '70px', height: '70px' }}
            data-testid="mario-jumper"
          >
            <img
              src="/assets/mario/mario-pixel-clean.png"
              alt="Mario"
              className="w-full h-full object-contain"
              style={{
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 4px 0 rgba(0,0,0,0.5)) drop-shadow(0 0 10px rgba(239, 68, 68, 0.35))'
              }}
              draggable={false}
            />
          </div>

          {/* Ground pixel line */}
          <div
            className="absolute left-0 right-0 bottom-[-6px] h-[4px]"
            style={{
              background: 'repeating-linear-gradient(90deg, #2a1a0a 0 6px, #1a0f05 6px 12px)',
              boxShadow: '0 2px 0 #0a0503'
            }}
          />

          {/* Mario shadow that moves with jump */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] animate-mario-shadow"
            style={{
              width: '50px',
              height: '6px',
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)',
              filter: 'blur(2px)'
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

        /* ═══ MARIO JUMPING ANIMATION ═══ */
        /* Mario jumps from ground up to the brick and back.
           Total cycle: 1.2s. The "hit" happens at ~42% when Mario peaks. */
        @keyframes mario-jump {
          0%   { transform: translate(-50%, 0) scale(1, 1); }
          15%  { transform: translate(-50%, -10px) scale(1.08, 0.92); }  /* crouch-ish */
          42%  { transform: translate(-50%, -92px) scale(0.95, 1.08); }  /* peak = impact */
          50%  { transform: translate(-50%, -88px) scale(1, 1); }
          75%  { transform: translate(-50%, -20px) scale(1, 1); }
          92%  { transform: translate(-50%, 0) scale(1.1, 0.9); }         /* landing squash */
          100% { transform: translate(-50%, 0) scale(1, 1); }
        }
        .animate-mario-jump { animation: mario-jump 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite; }

        /* Brick reacts (small bounce up) exactly when Mario reaches peak (~42%) */
        @keyframes brick-hit {
          0%, 38% { transform: translateX(-50%) translateY(0); }
          42%     { transform: translateX(-50%) translateY(-10px); }
          46%     { transform: translateX(-50%) translateY(-6px); }
          52%     { transform: translateX(-50%) translateY(0); }
          100%    { transform: translateX(-50%) translateY(0); }
        }
        .animate-brick-hit { animation: brick-hit 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite; }

        /* Sparks pop around the brick at hit moment */
        @keyframes brick-spark {
          0%, 38%  { opacity: 0; transform: translateX(-50%) scale(0.5); }
          42%      { opacity: 1; transform: translateX(-50%) scale(1.3); }
          55%      { opacity: 0.6; transform: translateX(-50%) scale(1); }
          65%, 100% { opacity: 0; transform: translateX(-50%) scale(0.6); }
        }
        .animate-brick-spark { animation: brick-spark 1.2s ease-out infinite; }

        /* Mario's shadow - shrinks when he jumps, grows when lands */
        @keyframes mario-shadow {
          0%, 100% { transform: translateX(-50%) scale(1, 1); opacity: 0.6; }
          42%      { transform: translateX(-50%) scale(0.45, 0.7); opacity: 0.25; }
          92%      { transform: translateX(-50%) scale(1.15, 1); opacity: 0.7; }
        }
        .animate-mario-shadow { animation: mario-shadow 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite; }

        /* Background sparkles floating */
        @keyframes mario-sparkle {
          0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        .animate-mario-sparkle { animation: mario-sparkle 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
