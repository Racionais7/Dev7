import React from 'react';
import { platformImage } from '../data/mockData';

const Header = ({ selectedPlatform, onBackToPlatforms }) => {
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-white font-bold text-sm">FG</span>
            </div>
            <span className="text-lg font-bold">
              <span className="text-white">FG</span>
              <span className="text-red-500"> JOGO</span>
            </span>
          </div>

          <img src={platformImage} alt="Platform" className="w-9 h-9 rounded-lg object-cover opacity-80" />
        </div>
      </div>
    </header>
  );
};

export default Header;
