import React, { useState, useEffect } from 'react';
import SlotCard from './SlotCard';

// System log actions - neutral operational messages
const systemActions = [
  'leitura atualizada',
  'padrão detectado',
  'ciclo reiniciado',
  'sequência interrompida',
  'nova janela analisada',
  'buffer sincronizado',
  'cache atualizado',
  'conexão estável',
  'dados processados',
  'análise concluída'
];

// Generate initial system log entries
const generateInitialLogs = () => {
  const providers = ['PG Soft', 'Pragmatic', 'TaDa', 'Spirit'];
  const logs = [];
  const now = Date.now();
  
  for (let i = 0; i < 8; i++) {
    logs.push({
      id: now - (i * 5000),
      provider: providers[Math.floor(Math.random() * providers.length)],
      action: systemActions[Math.floor(Math.random() * systemActions.length)],
      timestamp: new Date(now - (i * 5000 + Math.random() * 3000))
    });
  }
  
  return logs;
};

const SlotGrid = ({ slots, onSlotSelect, selectedSlot, selectedProvider, providerName }) => {
  // System activity log state
  const [systemLogs, setSystemLogs] = useState(generateInitialLogs);

  // Update system log periodically
  useEffect(() => {
    const providers = ['PG Soft', 'Pragmatic', 'TaDa', 'Spirit'];
    
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const newLog = {
          id: Date.now(),
          provider: providers[Math.floor(Math.random() * providers.length)],
          action: systemActions[Math.floor(Math.random() * systemActions.length)],
          timestamp: new Date()
        };
        
        setSystemLogs(prev => [newLog, ...prev.slice(0, 7)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Cinematic Style */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl text-white font-light tracking-wide">
              {providerName}
            </h2>
            <p className="text-xs text-gray-500 mt-1">{slots.length} jogos disponíveis</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400/80 font-medium tracking-wide">AO VIVO</span>
            </div>
          </div>
        </div>

        {/* Slots Grid - Cinematic Casino Lobby */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 lg:gap-4">
          {slots.map((slot, index) => (
            <div 
              key={slot.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <SlotCard slot={slot} onSelect={onSlotSelect} isSelected={selectedSlot?.id === slot.id} />
            </div>
          ))}
        </div>

        {/* System Activity Log */}
        <div className="mt-12 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm text-gray-400 font-medium tracking-wide">Registro do sistema</h2>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
              <span className="text-[9px] text-gray-600 font-mono">ONLINE</span>
            </div>
          </div>

          {/* System Log Panel */}
          <div className="rounded-lg bg-[#08080d] border border-white/[0.04] overflow-hidden font-mono">
            <div className="divide-y divide-white/[0.02]">
              {systemLogs.map((log, index) => (
                <div 
                  key={log.id}
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs transition-opacity ${
                    index === 0 ? 'bg-white/[0.01]' : ''
                  }`}
                  style={{ opacity: 1 - (index * 0.08) }}
                >
                  {/* Timestamp */}
                  <span className="text-gray-600 text-[10px] w-14 shrink-0">
                    {log.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                  
                  {/* Provider */}
                  <span className="text-gray-500 w-20 shrink-0 truncate">
                    {log.provider}
                  </span>
                  
                  {/* Separator */}
                  <span className="text-gray-700">—</span>
                  
                  {/* Action */}
                  <span className="text-gray-400">
                    {log.action}
                  </span>
                  
                  {/* Activity indicator for latest */}
                  {index === 0 && (
                    <span className="ml-auto w-1 h-1 rounded-full bg-gray-500 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default SlotGrid;
