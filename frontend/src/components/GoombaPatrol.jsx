import React, { useState, useEffect, useRef } from 'react';

/**
 * GoombaPatrol - 2-3 Goombas patrolling along the bottom ground layer.
 * Clicking one squishes it (classic SMB feel) and awards a coin via __marioHUD.
 *
 * Uses requestAnimationFrame for smooth 60fps movement. Each goomba carries
 * its own ref-based state to avoid per-frame React re-renders.
 */
const GOOMBA_SIZE = 32;
const WALK_FRAME_MS = 220; // sprite swap rate

const makeGoomba = (initX, dir, speed, bottom) => ({
  x: initX,
  dir,           // +1 right, -1 left
  speed,         // px/sec
  bottom,        // px offset from viewport bottom
  squished: false,
  squishedAt: 0,
  frame: 0,
  lastFrameTs: 0,
});

const GoombaPatrol = () => {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const [, force] = useState(0);
  const goombasRef = useRef([
    makeGoomba(120, 1, 34, 18),
    makeGoomba(560, -1, 42, 34),
    makeGoomba(1100, 1, 30, 10),
  ]);
  const elRefs = useRef([]);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const tick = (ts) => {
      const dt = lastTsRef.current ? Math.min((ts - lastTsRef.current) / 1000, 0.05) : 0;
      lastTsRef.current = ts;

      goombasRef.current.forEach((g, i) => {
        const el = elRefs.current[i];
        if (!el) return;

        if (g.squished) {
          // respawn after 1.4s on the opposite edge
          if (ts - g.squishedAt > 1400) {
            g.squished = false;
            g.dir = Math.random() < 0.5 ? 1 : -1;
            g.x = g.dir === 1 ? -GOOMBA_SIZE : vw + GOOMBA_SIZE;
            g.speed = 26 + Math.random() * 22;
          }
        } else {
          g.x += g.dir * g.speed * dt;
          // Bounce / wrap at edges
          if (g.x < -GOOMBA_SIZE - 40) g.x = vw + GOOMBA_SIZE;
          if (g.x > vw + GOOMBA_SIZE + 40) g.x = -GOOMBA_SIZE;

          // Walk sprite swap
          if (ts - g.lastFrameTs > WALK_FRAME_MS) {
            g.frame = 1 - g.frame;
            g.lastFrameTs = ts;
            const imgEl = el.querySelector('img');
            if (imgEl) {
              imgEl.src = g.frame === 0
                ? '/assets/mario_game/goomba-1.png'
                : '/assets/mario_game/goomba-2.png';
            }
          }
        }

        const flip = g.dir < 0 ? ' scaleX(-1)' : '';
        el.style.transform = `translate3d(${g.x}px, 0, 0)${flip}`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [vw]);

  const squish = (i) => {
    const g = goombasRef.current[i];
    if (!g || g.squished) return;
    g.squished = true;
    g.squishedAt = performance.now();
    const el = elRefs.current[i];
    if (el) {
      const imgEl = el.querySelector('img');
      if (imgEl) imgEl.src = '/assets/mario_game/goomba-squish.png';
    }
    // reward
    if (window.__marioHUD) window.__marioHUD.addCoins(1);
    force((n) => n + 1); // noop re-render to refresh nothing critical
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-20 pointer-events-none"
      style={{ height: GOOMBA_SIZE + 60 }}
      data-testid="goomba-patrol"
      aria-hidden
    >
      {goombasRef.current.map((g, i) => (
        <div
          key={i}
          ref={(el) => (elRefs.current[i] = el)}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            bottom: g.bottom,
            left: 0,
            width: GOOMBA_SIZE,
            height: GOOMBA_SIZE,
            transform: `translate3d(${g.x}px, 0, 0)`,
            willChange: 'transform',
          }}
          onClick={() => squish(i)}
          title="Stomp!"
          data-testid={`goomba-${i}`}
        >
          <img
            src="/assets/mario_game/goomba-1.png"
            alt=""
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.6))',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default GoombaPatrol;
