import React, { useState, useEffect, useRef } from 'react';

/**
 * Classic Super Mario Bros HUD.
 * Shows: MARIO | score | COINS × NN | WORLD | TIME
 *
 * - Exposes `window.__marioHUD` with addCoins/addScore APIs so any component
 *   (Konami egg, block clicks) can drive it.
 * - Score auto-idles a tiny amount to feel alive; time counts down then resets.
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

  const stat = (label, value, opts = {}) => (
    <div className="flex flex-col items-start leading-none">
      <span
        className="text-white text-[7px] sm:text-[8px]"
        style={{ fontFamily: '"Press Start 2P", monospace', letterSpacing: '1px' }}
      >
        {label}
      </span>
      <span
        className={`text-white text-[9px] sm:text-[11px] mt-1 transition-transform ${opts.pulse ? 'scale-110 text-yellow-300' : 'scale-100'}`}
        style={{
          fontFamily: '"Press Start 2P", monospace',
          textShadow: '1px 1px 0 #000',
          color: opts.color || '#fff',
        }}
        data-testid={opts.testid}
      >
        {value}
      </span>
    </div>
  );

  return (
    <div
      className="w-full flex justify-center pointer-events-none select-none"
      data-testid="mario-hud"
    >
      <div
        className="inline-flex items-center gap-4 sm:gap-7 px-3 sm:px-5 py-2 rounded"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,20,0.85) 0%, rgba(0,0,0,0.85) 100%)',
          border: '2px solid #000',
          boxShadow: '0 0 0 2px rgba(250,204,21,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
          imageRendering: 'pixelated',
        }}
      >
        {stat('MARIO', pad(score, 6), { pulse: scorePulse, testid: 'hud-score' })}

        {/* Animated coin icon */}
        <div className="flex items-center gap-2">
          <img
            src="/assets/mario_game/coin-1.png"
            alt=""
            className={`w-4 h-4 sm:w-5 sm:h-5 ${coinPulse ? 'animate-pulse' : ''}`}
            style={{
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.6))',
              animation: 'hud-coin-spin 0.9s steps(4) infinite',
            }}
          />
          <span
            className={`text-[9px] sm:text-[11px] transition-transform ${coinPulse ? 'scale-125 text-yellow-300' : 'scale-100 text-white'}`}
            style={{
              fontFamily: '"Press Start 2P", monospace',
              textShadow: '1px 1px 0 #000',
            }}
            data-testid="hud-coins"
          >
            ×{pad(coins, 2)}
          </span>
        </div>

        {stat('WORLD', '1-1')}
        {stat('TIME', pad(time, 3), { color: time < 60 ? '#ef4444' : '#fff', testid: 'hud-time' })}
      </div>

      {/* sprite-step coin animation via multiple coin frames */}
      <style>{`
        @keyframes hud-coin-spin {
          0%   { content: url('/assets/mario_game/coin-1.png'); }
          25%  { content: url('/assets/mario_game/coin-2.png'); }
          50%  { content: url('/assets/mario_game/coin-3.png'); }
          75%  { content: url('/assets/mario_game/coin-4.png'); }
          100% { content: url('/assets/mario_game/coin-1.png'); }
        }
      `}</style>
    </div>
  );
};

export default MarioHUD;
