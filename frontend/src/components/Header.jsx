import React from 'react';

const PLATFORM_META = {
  HGJOGO: {
    logo: '/assets/platforms/hgjogo_cta.jpg',
    prefix: 'HG',
    suffix: 'JOGO',
    suffixClass: 'text-cyan-400',
  },
  FGJOGO: {
    logo: '/assets/platforms/fgjogo_logo.png',
    prefix: 'FG',
    suffix: 'JOGO',
    suffixClass: 'text-pink-500',
  },
  VGJOGO: {
    logo: '/assets/platforms/vgjogo.png',
    prefix: 'VG',
    suffix: 'JOGO',
    suffixClass: 'text-violet-400',
  },
};

const Header = ({ selectedPlatform, onBackToPlatforms }) => {
  const meta = PLATFORM_META[selectedPlatform] || PLATFORM_META.FGJOGO;

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBackToPlatforms} 
            data-testid="back-to-platforms-btn"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Voltar</span>
          </button>

          <div className="flex items-center gap-2">
            <img src={meta.logo} alt={`${meta.prefix} ${meta.suffix}`} className="w-10 h-10 rounded-lg object-cover" />
            <span className="text-lg font-bold">
              <span className="text-white">{meta.prefix}</span>
              <span className={meta.suffixClass}> {meta.suffix}</span>
            </span>
          </div>

          <img src={meta.logo} alt={`${meta.prefix} ${meta.suffix}`} className="w-9 h-9 rounded-lg object-cover opacity-80" />
        </div>
      </div>
    </header>
  );
};

export default Header;
