import React from 'react';

const Header = ({ selectedPlatform, onBackToPlatforms }) => {
  const isHG = selectedPlatform === 'HGJOGO';
  
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
            {isHG ? (
              <>
                <img src="/assets/platforms/hgjogo_cta.jpg" alt="HG JOGO" className="w-10 h-10 rounded-lg object-cover" />
                <span className="text-lg font-bold">
                  <span className="text-white">HG</span>
                  <span className="text-cyan-400"> JOGO</span>
                </span>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FG</span>
                </div>
                <span className="text-lg font-bold">
                  <span className="text-white">FG</span>
                  <span className="text-red-500"> JOGO</span>
                </span>
              </>
            )}
          </div>

          {isHG ? (
            <img src="/assets/platforms/hgjogo_cta.jpg" alt="HG JOGO" className="w-9 h-9 rounded-lg object-cover opacity-80" />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center opacity-80">
              <span className="text-white font-bold text-xs">FG</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
