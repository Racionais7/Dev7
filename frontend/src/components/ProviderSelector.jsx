import React from 'react';
import { slotsData, providerRankingOrder } from '../data/mockData';

// PG Soft Logo Component - Pixel art style (monochrome for dark mode)
const PGSoftLogo = ({ className = "h-5" }) => (
  <svg className={className} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* P letter - pixel style */}
    <rect x="0" y="0" width="4" height="4" fill="#fff"/>
    <rect x="4" y="0" width="4" height="4" fill="#fff"/>
    <rect x="8" y="0" width="4" height="4" fill="#fff"/>
    <rect x="12" y="0" width="4" height="4" fill="#fff"/>
    <rect x="0" y="4" width="4" height="4" fill="#fff"/>
    <rect x="16" y="4" width="4" height="4" fill="#fff"/>
    <rect x="0" y="8" width="4" height="4" fill="#fff"/>
    <rect x="16" y="8" width="4" height="4" fill="#fff"/>
    <rect x="0" y="12" width="4" height="4" fill="#fff"/>
    <rect x="4" y="12" width="4" height="4" fill="#fff"/>
    <rect x="8" y="12" width="4" height="4" fill="#fff"/>
    <rect x="12" y="12" width="4" height="4" fill="#fff"/>
    <rect x="0" y="16" width="4" height="4" fill="#fff"/>
    <rect x="0" y="20" width="4" height="4" fill="#fff"/>
    <rect x="0" y="24" width="4" height="4" fill="#fff"/>
    {/* Colored accents on P */}
    <rect x="4" y="4" width="4" height="4" fill="#9333ea"/>
    <rect x="4" y="20" width="4" height="4" fill="#ec4899"/>
    <rect x="4" y="24" width="4" height="4" fill="#06b6d4"/>
    
    {/* G letter - pixel style */}
    <rect x="28" y="0" width="4" height="4" fill="#fff"/>
    <rect x="32" y="0" width="4" height="4" fill="#fff"/>
    <rect x="36" y="0" width="4" height="4" fill="#fff"/>
    <rect x="40" y="0" width="4" height="4" fill="#fff"/>
    <rect x="24" y="4" width="4" height="4" fill="#fff"/>
    <rect x="24" y="8" width="4" height="4" fill="#fff"/>
    <rect x="24" y="12" width="4" height="4" fill="#fff"/>
    <rect x="36" y="12" width="4" height="4" fill="#fff"/>
    <rect x="40" y="12" width="4" height="4" fill="#fff"/>
    <rect x="44" y="12" width="4" height="4" fill="#fff"/>
    <rect x="24" y="16" width="4" height="4" fill="#fff"/>
    <rect x="44" y="16" width="4" height="4" fill="#fff"/>
    <rect x="24" y="20" width="4" height="4" fill="#fff"/>
    <rect x="44" y="20" width="4" height="4" fill="#fff"/>
    <rect x="28" y="24" width="4" height="4" fill="#fff"/>
    <rect x="32" y="24" width="4" height="4" fill="#fff"/>
    <rect x="36" y="24" width="4" height="4" fill="#fff"/>
    <rect x="40" y="24" width="4" height="4" fill="#fff"/>
    {/* Colored accents on G */}
    <rect x="44" y="4" width="4" height="4" fill="#f97316"/>
    <rect x="32" y="16" width="4" height="4" fill="#06b6d4"/>
    <rect x="28" y="20" width="4" height="4" fill="#22c55e"/>
    <rect x="44" y="24" width="4" height="4" fill="#ef4444"/>
    
    {/* SOFT text */}
    <text x="56" y="20" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#666" letterSpacing="1">SOFT</text>
  </svg>
);

// Pragmatic Play Logo Component (monochrome for dark mode)
const PragmaticLogo = ({ className = "h-5" }) => (
  <svg className={className} viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* PRAGMATIC text */}
    <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fontStyle="italic" fill="#fff" letterSpacing="-0.5">PRAGMATIC</text>
    {/* Crown */}
    <path d="M118 2 L122 8 L126 2 L130 8 L134 2 L130 10 L122 10 Z" fill="#f97316"/>
    {/* Oval with PLAY */}
    <ellipse cx="126" cy="18" rx="14" ry="12" stroke="#f97316" strokeWidth="2" fill="none"/>
    {/* Small circle inside */}
    <circle cx="126" cy="13" r="2" fill="#f97316"/>
    {/* PLAY text inside oval */}
    <text x="116" y="24" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="bold" fill="#f97316">PLAY</text>
  </svg>
);

// Provider logos/icons (monochrome for dark mode)
const ProviderLogos = {
  pg: () => <PGSoftLogo className="h-5 w-auto" />,
  pragmatic: () => <PragmaticLogo className="h-6 w-auto" />,
  tada: () => (
    <img 
      src="/assets/providers/tada.png" 
      alt="TaDa Gaming" 
      className="h-6 w-auto object-contain"
    />
  ),
  spirit: () => (
    <img 
      src="/assets/providers/spirit.jpg" 
      alt="Spirit Gaming" 
      className="h-6 w-auto object-contain"
    />
  ),
  revenge: () => (
    <img 
      src="/assets/providers/revenge.png" 
      alt="Revenge Games" 
      className="h-6 w-auto object-contain"
    />
  )
};

const ProviderSelector = ({ selectedProvider, onProviderChange }) => {
  // Simple provider data
  const providers = providerRankingOrder.map(p => ({
    id: p.id,
    name: p.name,
    hasGames: (slotsData[p.id]?.length || 0) > 0
  }));

  return (
    <section className="py-4 px-4 sm:px-6 border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        {/* Provider Cards Grid - Clean Launcher Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {providers.map((provider) => {
            const LogoComponent = ProviderLogos[provider.id];
            
            return (
              <button
                key={provider.id}
                onClick={() => provider.hasGames && onProviderChange(provider.id)}
                data-testid={`provider-${provider.id}-btn`}
                disabled={!provider.hasGames}
                className={`relative text-left transition-all duration-200 ${
                  !provider.hasGames ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {/* Card Container - Minimal Clean Style */}
                <div className={`relative px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedProvider === provider.id
                    ? 'bg-white/[0.04] border border-white/[0.08]'
                    : 'bg-transparent border border-transparent hover:bg-white/[0.02] hover:border-white/[0.04]'
                }`}>
                  
                  {/* Selection indicator - subtle left bar */}
                  {selectedProvider === provider.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white/30 rounded-full" />
                  )}

                  {/* Provider Logo/Name */}
                  <div className="mb-1">
                    {LogoComponent && <LogoComponent />}
                  </div>

                  {/* Subtitle */}
                  <p className={`text-[10px] font-mono tracking-wide ${
                    provider.hasGames 
                      ? selectedProvider === provider.id 
                        ? 'text-gray-400' 
                        : 'text-gray-600'
                      : 'text-gray-700'
                  }`}>
                    {provider.hasGames ? 'Abrir sinais' : 'Em breve'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProviderSelector;
