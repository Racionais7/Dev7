import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import SlotGrid from "./components/SlotGrid";
import SignalGenerator from "./components/SignalGenerator";
import ProviderSelector from "./components/ProviderSelector";
import PlatformSelector from "./components/PlatformSelector";
import IntroAnimation from "./components/IntroAnimation";
import { slotsData, providers, platformLinks } from "./data/mockData";

// Função para calcular usuários online realistas baseado na hora
const calculateRealisticOnline = () => {
  const now = new Date();
  const hours = now.getHours();
  
  // Base de usuários por hora do dia
  let baseUsers = 150;
  if (hours >= 19 && hours <= 23) baseUsers = 450; // Horário nobre
  else if (hours >= 14 && hours <= 18) baseUsers = 320;
  else if (hours >= 10 && hours <= 13) baseUsers = 220;
  else if (hours >= 0 && hours <= 6) baseUsers = 80; // Madrugada
  
  // Adiciona variação aleatória ±15%
  const variation = baseUsers * 0.15 * (Math.random() - 0.5) * 2;
  return Math.floor(baseUsers + variation);
};

function App() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showSignalGenerator, setShowSignalGenerator] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('pg');
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  
  // Estados dinâmicos e realistas
  const [accuracy, setAccuracy] = useState(89.2);
  const [onlineUsers, setOnlineUsers] = useState(calculateRealisticOnline());

  // Atualização dinâmica dos valores
  useEffect(() => {
    const interval = setInterval(() => {
      // Accuracy varia ±0.2% (realista)
      setAccuracy(prev => {
        const change = (Math.random() - 0.5) * 0.4;
        return Math.min(92, Math.max(86, parseFloat((prev + change).toFixed(1))));
      });
      
      // Online users varia ±5 (realista)
      setOnlineUsers(prev => {
        const change = Math.floor((Math.random() - 0.5) * 10);
        const base = calculateRealisticOnline();
        return Math.max(50, prev + change + Math.floor((base - prev) * 0.1));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentSlots = slotsData[selectedProvider] || [];
  const providerName = providers[selectedProvider] || '';
  const currentPlatformLink = platformLinks[selectedPlatform] || '';

  if (showIntro) return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  if (!selectedPlatform) return <PlatformSelector onPlatformSelect={setSelectedPlatform} />;

  return (
    <div className="min-h-screen bg-[#06060c] text-white flex flex-col">
      {/* Animated background - professional dashboard style */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0814] via-[#06060c] to-[#080612]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.04)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.03)_0%,transparent_50%)]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {showSignalGenerator ? (
        <SignalGenerator 
          slot={selectedSlot} 
          onBack={() => { setShowSignalGenerator(false); setSelectedSlot(null); }}
          platformLink={currentPlatformLink}
        />
      ) : (
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header 
            selectedPlatform={selectedPlatform} 
            onBackToPlatforms={() => { setSelectedPlatform(null); setSelectedSlot(null); setShowSignalGenerator(false); }}
          />
          
          {/* Dashboard Hero Section */}
          <section className="py-6 sm:py-8 px-4 sm:px-6 border-b border-white/5">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Left - Dashboard Title */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-500/5 border border-violet-500/30 flex items-center justify-center">
                      <svg className="w-7 h-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#06060c] animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold">
                      <span className="text-white">Signal </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-500">Analytics</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">Sinais premium para jogadores exigentes</p>
                  </div>
                </div>
                
                {/* Right - Stats Bar */}
                <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
                  {/* System Status */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-400">Conectado</span>
                  </div>
                  
                  {/* Accuracy */}
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-400">Acertos: </span>
                    <span className="text-xs font-bold text-violet-400">{accuracy}%</span>
                  </div>
                  
                  {/* Active Users */}
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-400">Online: </span>
                    <span className="text-xs font-bold text-white">{onlineUsers.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ProviderSelector selectedProvider={selectedProvider} onProviderChange={(id) => { setSelectedProvider(id); setSelectedSlot(null); }} />
          <SlotGrid slots={currentSlots} onSlotSelect={(slot) => { setSelectedSlot(slot); setShowSignalGenerator(true); }} selectedSlot={selectedSlot} selectedProvider={selectedProvider} providerName={providerName} />

          {/* Footer with Responsible Gambling */}
          <footer className="mt-auto border-t border-white/5">
            {/* Responsible Gambling Section */}
            <div className="py-6 px-4 sm:px-6 bg-white/[0.01]">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  {/* 18+ Badge */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <span className="text-lg font-black text-red-400">18+</span>
                    <span className="text-xs text-red-400/80">Apenas para maiores</span>
                  </div>
                  
                  {/* Gambling Warning */}
                  <div className="text-center sm:text-left max-w-md">
                    <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                      Jogue com responsabilidade. Se você sentir que está perdendo o controle, procure ajuda.
                      <span className="text-violet-400 ml-1">www.jogadoranonimo.com.br</span>
                    </p>
                  </div>
                  
                  {/* Partner Logos */}
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10">
                      <span className="text-[10px] text-gray-500 font-bold">BetBlocker</span>
                    </div>
                    <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10">
                      <span className="text-[10px] text-gray-500 font-bold">GamCare</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="py-4 px-4 sm:px-6 border-t border-white/5">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-violet-500/10 border border-violet-500/30 flex items-center justify-center">
                    <svg className="w-3 h-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="font-bold text-white">Mario AI</span>
                  <span>© 2026</span>
                </div>
                <div className="flex items-center gap-4">
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
