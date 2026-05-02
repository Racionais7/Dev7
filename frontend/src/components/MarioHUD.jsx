import React, { useState, useEffect, useRef } from 'react';

/**
 * Classic Super Mario Bros HUD.
 * Shows: MARIO | score | COINS × NN | WORLD | TIME
 *
 * - Exposes `window.__marioHUD` with addCoins/addScore APIs so any component
 *   (Konami egg, block clicks) can drive it.
 * - Score auto-idles a tiny amount to feel alive; time counts down then resets.
 * - Fully responsive: compact on mobile, full details on >=sm screens.
 */
const pad = (n, w) => String(n).padStart(w, '0');

const MarioHUD = () => {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [time, setTime] = useState(400);
  const [coinPulse, setCoinPulse] = useState(false);
  const [scorePulse, setScorePulse] = useState(false);

  const coinsRef = useRef(0);
  const scoreRef = useRef(0);

  // Expose global API for other components
  useEffect(() => {
    const api = {
      addCoins: (n = 1) => {
        coinsRef.current += n;
        setCoins(coinsRef.current);
        setCoinPulse(true);
        setTimeout(() => setCoinPulse(false), 260);
        // Coin gives 200 points
        scoreRef.current += n * 200;
        setScore(scoreRef.current);
        setScorePulse(true);
        setTimeout(() => setScorePulse(false), 260);
      },
      addScore: (n) => {
        scoreRef.current += n;
        setScore(scoreRef.current);
        setScorePulse(true);
        setTimeout(() => setScorePulse(false), 260);
      },
    };
    window.__marioHUD = api;
    return () => { delete window.__marioHUD; };
  }, []);

  // Ambient score drift (very slow, keeps HUD feeling "live")
  useEffect(() => {
    const id = setInterval(() => {
      scoreRef.current += 10;
      setScore(scoreRef.current);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  // Time countdown — resets instead of game-over
  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 400));
    }, 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full flex justify-center pointer-events-none select-none"
      data-testid="mario-hud"
    >
      <div
        className="inline-flex items-center gap-3 sm:gap-7 px-2.5 sm:px-5 py-1.5 sm:py-2 rounded"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,20,0.85) 0%, rgba(0,0,0,0.85) 100%)',
          border: '2px solid #000',
          boxShadow: '0 0 0 2px rgba(250,204,21,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
          fontFamily: '"Press Start 2P", monospace',
        }}
      >
        {/* MARIO score */}
        <div className="flex flex-col items-start leading-none">
          <span className="text-white text-[6px] sm:text-[8px]" style={{ letterSpacing: '1px' }}>MARIO</span>
          <span
            className={`text-[7px] sm:text-[11px] mt-1 transition-transform ${scorePulse ? 'scale-110 text-yellow-300' : 'scale-100 text-white'}`}
            style={{ textShadow: '1px 1px 0 #000' }}
            data-testid="hud-score"
          >
            {pad(score, 6)}
          </span>
        </div>

        {/* Animated coin icon + coin count */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <img
            src="/assets/mario_game/coin-1.png"
            alt=""
            aria-hidden
            draggable={false}
            width={14}
            height={14}
            style={{
              width: 14,
              height: 14,
              minWidth: 14,
              minHeight: 14,
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.6))',
              flexShrink: 0,
              objectFit: 'contain',
              animation: 'mario-hud-coin-spin 1.2s ease-in-out infinite',
              transformOrigin: 'center',
              willChange: 'transform',
            }}
          />
          <span
            className={`text-[7px] sm:text-[11px] transition-transform ${coinPulse ? 'scale-125 text-yellow-300' : 'scale-100 text-white'}`}
            style={{ textShadow: '1px 1px 0 #000' }}
            data-testid="hud-coins"
          >
            ×{pad(coins, 2)}
          </span>
        </div>

        {/* WORLD */}
        <div className="flex flex-col items-start leading-none">
          <span className="text-white text-[6px] sm:text-[8px]" style={{ letterSpacing: '1px' }}>WORLD</span>
          <span
            className="text-[7px] sm:text-[11px] mt-1 text-white"
            style={{ textShadow: '1px 1px 0 #000' }}
          >
            1-1
          </span>
        </div>

        {/* TIME - hidden on very small screens to save space */}
        <div className="hidden xs:flex flex-col items-start leading-none sm:flex">
          <span className="text-white text-[6px] sm:text-[8px]" style={{ letterSpacing: '1px' }}>TIME</span>
          <span
            className="text-[7px] sm:text-[11px] mt-1"
            style={{
              textShadow: '1px 1px 0 #000',
              color: time < 60 ? '#ef4444' : '#fff',
            }}
            data-testid="hud-time"
          >
            {pad(time, 3)}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes mario-hud-coin-spin {
          0%, 100% { transform: scale(1) translateY(0); }
          50%      { transform: scale(1.15) translateY(-1px); }
        }
      `}</style>
    </div>
  );
};

export default MarioHUD;
