import React from 'react';

/**
 * Mario-style ? block button, used for the "ENTRAR" CTA buttons.
 * Renders as a golden pixel block with Press Start 2P text + arrow.
 * On parent hover (the parent must have the `group` class),
 * a coin pops out from the top of the block.
 *
 * Usage:
 *   <button className="group ...">
 *     <MarioBlockEntrar text="ENTRAR" />
 *   </button>
 */
const MarioBlockEntrar = ({ text = 'ENTRAR', testId }) => {
  return (
    <div
      className="relative w-full mt-3"
      data-testid={testId}
    >
      {/* ═══ Coin pops out on hover (group-hover) ═══ */}
      <img
        src="/assets/mario_game/bg-coin.png"
        alt=""
        aria-hidden
        className="
          absolute left-1/2 w-7 h-7 pointer-events-none
          opacity-0 -translate-x-1/2 -translate-y-1
          group-hover:opacity-100 group-hover:-translate-y-12 group-hover:animate-coin-spin-fast
          transition-all duration-500 ease-out
          z-20
        "
        style={{
          top: 0,
          imageRendering: 'pixelated',
          filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.95)) drop-shadow(0 0 20px rgba(253,224,71,0.6))',
        }}
      />

      {/* ═══ Sparkle burst behind coin (on hover) ═══ */}
      <div
        className="
          absolute left-1/2 -translate-x-1/2 -top-8 w-10 h-10 pointer-events-none
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200
        "
        style={{
          background: 'radial-gradient(circle, rgba(253,224,71,0.55) 0%, transparent 65%)',
          filter: 'blur(4px)',
        }}
      />

      {/* ═══ ? BLOCK BUTTON ═══ */}
      <span
        className="
          relative w-full flex items-center justify-center gap-2
          group-hover:translate-y-[2px] group-hover:[box-shadow:1px_1px_0_#000,inset_0_2px_0_rgba(255,255,255,0.55),inset_0_-2px_0_rgba(120,53,15,0.4),0_0_18px_rgba(251,191,36,0.65)]
          transition-transform duration-150 ease-out
        "
        style={{
          background: 'linear-gradient(180deg, #fef08a 0%, #fde047 25%, #fbbf24 55%, #d97706 100%)',
          border: '3px solid #000',
          borderRadius: '6px',
          padding: '12px 20px',
          boxShadow: '3px 3px 0 #000, inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -3px 0 rgba(120,53,15,0.45), 0 0 14px rgba(251,191,36,0.45)',
        }}
      >
        {/* Rivet corners */}
        <span className="absolute top-[3px] left-[3px] w-1.5 h-1.5 bg-black rounded-sm" />
        <span className="absolute top-[3px] right-[3px] w-1.5 h-1.5 bg-black rounded-sm" />
        <span className="absolute bottom-[3px] left-[3px] w-1.5 h-1.5 bg-black rounded-sm" />
        <span className="absolute bottom-[3px] right-[3px] w-1.5 h-1.5 bg-black rounded-sm" />

        <span
          className="text-black font-black"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '11px',
            letterSpacing: '0.5px',
            textShadow: '1px 1px 0 rgba(255,255,255,0.5)',
            paddingTop: '1px',
          }}
        >
          {text}
        </span>

        {/* Animated arrow */}
        <span
          className="text-black text-[14px] inline-block group-hover:translate-x-1 transition-transform duration-200"
          style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.5)' }}
          aria-hidden
        >
          →
        </span>
      </span>

      <style>{`
        @keyframes mario-coin-spin-fast {
          0%   { transform: translateX(-50%) scaleX(1); }
          25%  { transform: translateX(-50%) scaleX(0.15); }
          50%  { transform: translateX(-50%) scaleX(-1); }
          75%  { transform: translateX(-50%) scaleX(-0.15); }
          100% { transform: translateX(-50%) scaleX(1); }
        }
        .group:hover .group-hover\\:animate-coin-spin-fast {
          animation: mario-coin-spin-fast 0.6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarioBlockEntrar;
