import React, { useEffect, useState } from 'react';

/**
 * Classic Konami Code (↑↑↓↓←→←→BA) → triggers a 1-UP celebration:
 *   - Full-screen coin shower (physics-lite)
 *   - Retro "1-UP!" banner with pixel shake
 *   - +99 coins via the global __marioHUD API
 *
 * Works on desktop (keyboard). Also tappable: secret area via `window.triggerMarioKonami`.
 */
const SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const randomCoin = (i) => {
  const dur = 2200 + Math.random() * 1200;
  const left = Math.random() * 100;
  const delay = Math.random() * 800;
  const rotate = (Math.random() - 0.5) * 720;
  const size = 16 + Math.random() * 22;
  return { i, dur, left, delay, rotate, size };
};

const KonamiEasterEgg = () => {
  const [active, setActive] = useState(false);
  const [coins, setCoins] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let buf = [];
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf.push(k);
      if (buf.length > SEQUENCE.length) buf = buf.slice(-SEQUENCE.length);

      // Track progress (how many prefix chars match)
      let match = 0;
      for (let i = 0; i < Math.min(buf.length, SEQUENCE.length); i++) {
        if (buf[buf.length - 1 - i] === SEQUENCE[SEQUENCE.length - 1 - i]) match++;
        else break;
      }
      setProgress(match);

      const tail = buf.slice(-SEQUENCE.length).join(',');
      if (tail === SEQUENCE.join(',')) {
        trigger();
        buf = [];
      }
    };
    window.addEventListener('keydown', onKey);
    window.triggerMarioKonami = trigger;
    return () => {
      window.removeEventListener('keydown', onKey);
      delete window.triggerMarioKonami;
    };
  }, []);

  const trigger = () => {
    if (active) return;
    setActive(true);
    setCoins(Array.from({ length: 42 }, (_, i) => randomCoin(i)));
    if (window.__marioHUD) window.__marioHUD.addCoins(99);
    setTimeout(() => {
      setActive(false);
      setCoins([]);
    }, 3400);
  };

  if (!active && progress === 0) return null;

  return (
    <>
      {/* tiny progress hint (bottom-right) when user is mid-combo */}
      {!active && progress > 0 && progress < SEQUENCE.length && (
        <div
          className="fixed bottom-3 left-3 z-[70] pointer-events-none text-[9px] text-yellow-300 opacity-70"
          style={{ fontFamily: '"Press Start 2P", monospace', textShadow: '1px 1px 0 #000' }}
          data-testid="konami-progress"
        >
          KONAMI {progress}/{SEQUENCE.length}
        </div>
      )}

      {active && (
        <div className="fixed inset-0 z-[80] pointer-events-none overflow-hidden" data-testid="konami-active">
          {/* coin shower */}
          {coins.map((c) => (
            <img
              key={c.i}
              src="/assets/mario_game/coin-1.png"
              alt=""
              draggable={false}
              style={{
                position: 'absolute',
                top: '-40px',
                left: `${c.left}%`,
                width: c.size,
                height: c.size,
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 0 6px rgba(250,204,21,0.9))',
                animation: `konami-fall ${c.dur}ms cubic-bezier(0.33,0,0.67,1) ${c.delay}ms forwards, konami-spin 0.6s steps(6) ${c.delay}ms infinite`,
                '--rotate': `${c.rotate}deg`,
              }}
            />
          ))}

          {/* 1-UP banner */}
          <div
            className="absolute top-[28%] left-1/2 -translate-x-1/2 px-6 py-4 rounded"
            style={{
              background: 'linear-gradient(180deg, #16a34a 0%, #065f46 100%)',
              border: '4px solid #000',
              boxShadow: '6px 6px 0 #000, inset 0 2px 0 rgba(255,255,255,0.3)',
              animation: 'konami-banner 3.4s ease-out forwards',
            }}
          >
            <div
              className="text-white text-[22px] sm:text-[32px] font-black"
              style={{
                fontFamily: '"Press Start 2P", monospace',
                textShadow: '3px 3px 0 #000, -1px -1px 0 #fde047',
                letterSpacing: '3px',
              }}
            >
              1 - UP !
            </div>
            <div
              className="text-yellow-200 text-[8px] sm:text-[10px] mt-2 text-center"
              style={{ fontFamily: '"Press Start 2P", monospace', textShadow: '1px 1px 0 #000' }}
            >
              +99 COINS
            </div>
          </div>

          <style>{`
            @keyframes konami-fall {
              0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
              85%  { opacity: 1; }
              100% { transform: translateY(110vh) rotate(var(--rotate)); opacity: 0; }
            }
            @keyframes konami-banner {
              0%   { transform: translate(-50%, -40px) scale(0.2); opacity: 0; }
              15%  { transform: translate(-50%, 0) scale(1.15); opacity: 1; }
              22%  { transform: translate(-50%, 0) scale(0.95); }
              30%  { transform: translate(-50%, 0) scale(1.05); }
              40%  { transform: translate(-50%, 0) scale(1); }
              85%  { transform: translate(-50%, 0) scale(1); opacity: 1; }
              100% { transform: translate(-50%, -30px) scale(0.9); opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default KonamiEasterEgg;
