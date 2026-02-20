import React, { useState, useEffect, useRef, useCallback } from 'react';

const COOLDOWN_DURATION = 300; // 5 minutes (300 seconds) after signal window ends
const INITIAL_DELAY = 5; // 5 seconds before first signal

// Signal types - ALWAYS playable, never blocking
// ENTRY_DIRECT: High confidence - enter now
// ENTRY_LIGHT: Medium confidence - play light
// OBSERVATION: Lower confidence - observe 1 round, then play light

// Signal storage key generator - unique per provider + game
const getSignalStorageKey = (slotId, providerId) => `signal_v3_${providerId}_${slotId}`;

// Get stored signal from localStorage
const getStoredSignal = (slotId, providerId) => {
  try {
    const key = getSignalStorageKey(slotId, providerId);
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    // Validate data structure - must have required fields
    if (!data || typeof data !== 'object' || !data.createdAt || !data.cooldownEndsAt) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

// Store signal to localStorage with full state
const storeSignal = (slotId, providerId, signalData) => {
  try {
    const key = getSignalStorageKey(slotId, providerId);
    localStorage.setItem(key, JSON.stringify({
      ...signalData,
      slotId,
      providerId
    }));
  } catch (e) {
    console.warn('Failed to store signal:', e);
  }
};

// Determine current signal state from stored data
const determineSignalState = (storedSignal) => {
  if (!storedSignal) return { state: 'NEEDS_GENERATION', data: null };
  
  const now = Date.now();
  
  // If signal window is still active
  if (storedSignal.expiresAt > now) {
    return {
      state: storedSignal.type, // ENTRY_DIRECT, ENTRY_LIGHT, or OBSERVATION
      data: storedSignal,
      remainingWindow: Math.ceil((storedSignal.expiresAt - now) / 1000)
    };
  }
  
  // If still in reanalysis period (signal expired but cooldown not finished)
  if (storedSignal.cooldownEndsAt > now) {
    return {
      state: 'REANALYSIS',
      data: storedSignal,
      remainingCooldown: Math.ceil((storedSignal.cooldownEndsAt - now) / 1000)
    };
  }
  
  // Signal fully expired - needs new generation
  return { state: 'NEEDS_GENERATION', data: storedSignal };
};

const SignalGenerator = ({ slot, onBack, platformLink }) => {
  // Core states - initialized from localStorage immediately
  const [signalState, setSignalState] = useState(() => {
    if (!slot) return 'LOADING';
    const stored = getStoredSignal(slot.id, slot.provider);
    const { state } = determineSignalState(stored);
    return state === 'NEEDS_GENERATION' ? 'GENERATING_FIRST' : state;
  });
  
  const [signalData, setSignalData] = useState(() => {
    if (!slot) return null;
    const stored = getStoredSignal(slot.id, slot.provider);
    return stored;
  });
  
  const [entryWindowTime, setEntryWindowTime] = useState(() => {
    if (!slot) return 0;
    const stored = getStoredSignal(slot.id, slot.provider);
    const result = determineSignalState(stored);
    return result.remainingWindow || 0;
  });
  
  // Timer display states
  const [initialCountdown, setInitialCountdown] = useState(() => {
    if (!slot) return INITIAL_DELAY;
    const stored = getStoredSignal(slot.id, slot.provider);
    const { state } = determineSignalState(stored);
    return state === 'NEEDS_GENERATION' ? INITIAL_DELAY : 0;
  });
  
  const [cooldownRemaining, setCooldownRemaining] = useState(() => {
    if (!slot) return 0;
    const stored = getStoredSignal(slot.id, slot.provider);
    const result = determineSignalState(stored);
    return result.remainingCooldown || 0;
  });
  
  // Cycle indicators - persist per slot
  const [cyclePhase, setCyclePhase] = useState(() => {
    if (!slot) return 'cold';
    const stored = getStoredSignal(slot.id, slot.provider);
    return stored?.cyclePhase || 'cold';
  });
  
  const [deadSpinCount, setDeadSpinCount] = useState(() => {
    if (!slot) return Math.floor(Math.random() * 5) + 3;
    const stored = getStoredSignal(slot.id, slot.provider);
    return stored?.deadSpinCount ?? Math.floor(Math.random() * 5) + 3;
  });
  
  const [lastBonusDistance, setLastBonusDistance] = useState(() => {
    if (!slot) return Math.floor(Math.random() * 40) + 10;
    const stored = getStoredSignal(slot.id, slot.provider);
    return stored?.lastBonusDistance ?? Math.floor(Math.random() * 40) + 10;
  });
  
  // History - generate stable per slot using slot id as seed
  const [trendHistory, setTrendHistory] = useState(() => 
    Array.from({ length: 24 }, (_, i) => {
      const seed = slot ? (slot.id * 13 + i * 7) % 100 : Math.random() * 100;
      const rand = seed / 100;
      return rand < 0.45 ? 'HIT' : rand < 0.92 ? 'MISS' : 'BONUS';
    })
  );
  
  const [graphData, setGraphData] = useState(() => 
    Array.from({ length: 30 }, (_, i) => {
      const seed = slot ? ((slot.id * 17 + i * 11) % 100) : Math.random() * 100;
      return seed;
    })
  );
  
  // Animation states
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Refs for stable timers
  const tickIntervalRef = useRef(null);
  const canvasRef = useRef(null);
  const currentStateRef = useRef(signalState);
  const slotKeyRef = useRef(slot ? `${slot.provider}_${slot.id}` : null);

  // Keep currentStateRef in sync
  useEffect(() => {
    currentStateRef.current = signalState;
  }, [signalState]);

  const providerName = slot?.provider === 'pg' ? 'PG Soft' : 
                       slot?.provider === 'pragmatic' ? 'Pragmatic' :
                       slot?.provider === 'tada' ? 'Tada' :
                       slot?.provider === 'spirit' ? 'Spirit' : 'Revenge';

  // State configurations - ALL states are actionable
  const stateConfig = {
    LOADING: { 
      color: 'text-gray-400', 
      bg: 'bg-gray-500/10', 
      border: 'border-gray-500/30',
      label: 'ANALISANDO',
      subtitle: 'Verificando padrões...'
    },
    GENERATING_FIRST: { 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10', 
      border: 'border-blue-500/30',
      label: 'ANALISANDO',
      subtitle: 'Processando ciclo da mesa...'
    },
    REANALYSIS: { 
      color: 'text-violet-400', 
      bg: 'bg-violet-500/10', 
      border: 'border-violet-500/30',
      label: 'REANÁLISE',
      subtitle: 'Aguardando próxima janela'
    },
    ENTRY_DIRECT: { 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10', 
      border: 'border-emerald-500/40',
      label: 'ENTRADA DIRETA',
      subtitle: 'Alta confiança - Momento ideal'
    },
    ENTRY_LIGHT: { 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10', 
      border: 'border-amber-500/30',
      label: 'ENTRADA LEVE',
      subtitle: 'Confiança moderada - Aposte conservador'
    },
    OBSERVATION: { 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10', 
      border: 'border-blue-500/30',
      label: 'OBSERVAÇÃO',
      subtitle: 'Aguarde 1 rodada, depois entre leve'
    }
  };

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Calculate best time based on indicators
  const calculateBestTime = useCallback(() => {
    const now = new Date();
    // Seconds to add instead of minutes - much closer time
    let secondsToAdd = 30;
    
    if (cyclePhase === 'hot') secondsToAdd = 15;
    else if (cyclePhase === 'warming') secondsToAdd = 45;
    else if (cyclePhase === 'cold') secondsToAdd = 60;
    else secondsToAdd = 40;
    
    if (deadSpinCount > 8) secondsToAdd -= 10;
    if (deadSpinCount < 3) secondsToAdd += 15;
    if (lastBonusDistance > 60) secondsToAdd -= 10;
    if (lastBonusDistance < 20) secondsToAdd += 10;
    
    secondsToAdd = Math.max(10, Math.min(90, secondsToAdd));
    
    const bestTime = new Date(now.getTime() + secondsToAdd * 1000);
    return bestTime.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  }, [cyclePhase, deadSpinCount, lastBonusDistance]);

  // Determine if signal should be Turbo
  const determineTurbo = useCallback(() => {
    let turboChance = 0.3;
    if (cyclePhase === 'hot') turboChance += 0.25;
    else if (cyclePhase === 'warming') turboChance += 0.15;
    if (deadSpinCount > 8) turboChance += 0.15;
    else if (deadSpinCount > 5) turboChance += 0.1;
    if (lastBonusDistance > 50) turboChance += 0.1;
    return Math.random() < turboChance;
  }, [cyclePhase, deadSpinCount, lastBonusDistance]);

  // Generate a new signal - ALWAYS actionable, never blocking
  const generateAndStoreSignal = useCallback(() => {
    const isTurbo = determineTurbo();
    
    // Calculate confidence score (0-100) - Base starts higher for better UX
    let confidence = 55;
    
    // Cycle phase affects confidence
    if (cyclePhase === 'hot') confidence += 20;
    else if (cyclePhase === 'warming') confidence += 12;
    else if (cyclePhase === 'cold') confidence -= 5;
    else if (cyclePhase === 'cooling') confidence -= 3;
    
    // Dead spin count affects confidence (more dead spins = higher chance of payout)
    if (deadSpinCount > 8) confidence += 18;
    else if (deadSpinCount > 5) confidence += 10;
    else if (deadSpinCount > 3) confidence += 5;
    else if (deadSpinCount < 2) confidence -= 8;
    
    // Bonus distance affects confidence
    if (lastBonusDistance > 60) confidence += 12;
    else if (lastBonusDistance > 40) confidence += 6;
    else if (lastBonusDistance > 25) confidence += 3;
    else if (lastBonusDistance < 10) confidence -= 8;
    
    // Add larger randomness for more varied results
    confidence += Math.floor(Math.random() * 30) - 12;
    
    // Clamp confidence
    confidence = Math.max(25, Math.min(95, confidence));
    
    // Determine signal type based on confidence - ALL are playable
    // Adjusted thresholds for better distribution
    let signalType;
    if (confidence >= 65) {
      signalType = 'ENTRY_DIRECT'; // High confidence
    } else if (confidence >= 40) {
      signalType = 'ENTRY_LIGHT'; // Medium confidence
    } else {
      signalType = 'OBSERVATION'; // Lower confidence but still actionable
    }
    
    // Determine strength label based on confidence
    let strength;
    if (confidence >= 70) strength = 'Alta';
    else if (confidence >= 50) strength = 'Média';
    else strength = 'Moderada';
    
    // Exit strategies based on signal type
    const exits = {
      'ENTRY_DIRECT': ['após primeiro ganho', 'após 5 giros', 'meta atingida'],
      'ENTRY_LIGHT': ['após ganho', 'após 3 giros', 'se não pagar em 5'],
      'OBSERVATION': ['após 1 rodada observar', 'entrar leve após', 'stop loss curto']
    };
    const exitOptions = exits[signalType];
    const exit = exitOptions[Math.floor(Math.random() * exitOptions.length)];
    
    const now = Date.now();
    // All signal types have a window duration
    const windowDuration = (30 + Math.floor(Math.random() * 25)) * 1000;
    
    // Determine new cycle phase
    let newCyclePhase;
    if (signalType === 'ENTRY_DIRECT') newCyclePhase = 'hot';
    else if (signalType === 'ENTRY_LIGHT') newCyclePhase = 'warming';
    else newCyclePhase = 'cooling';
    
    const newSignal = {
      entry: `${Math.floor(Math.random() * 4) + 3}-${Math.floor(Math.random() * 4) + 7}`,
      strength,
      confidence,
      exit,
      isTurbo,
      bestTime: calculateBestTime(),
      type: signalType,
      createdAt: now,
      expiresAt: now + windowDuration,
      windowDuration: windowDuration / 1000,
      // Cooldown starts AFTER the window expires, not from now
      cooldownEndsAt: now + windowDuration + COOLDOWN_DURATION * 1000,
      // Store cycle state for persistence
      cyclePhase: newCyclePhase,
      deadSpinCount,
      lastBonusDistance
    };
    
    // Store in localStorage with slot identity
    storeSignal(slot.id, slot.provider, newSignal);
    
    // Update local cycle phase
    setCyclePhase(newCyclePhase);
    
    return newSignal;
  }, [calculateBestTime, determineTurbo, cyclePhase, deadSpinCount, lastBonusDistance, slot]);

  // Main tick - handle all timers based on stored state
  useEffect(() => {
    if (!slot) return;
    
    const tick = () => {
      const now = Date.now();
      const storedSignal = getStoredSignal(slot.id, slot.provider);
      const currentState = currentStateRef.current;
      
      // Handle GENERATING_FIRST countdown
      if (currentState === 'GENERATING_FIRST') {
        setInitialCountdown(prev => {
          if (prev <= 1) {
            // Generate first signal
            const newSignal = generateAndStoreSignal();
            setSignalData(newSignal);
            setEntryWindowTime(Math.ceil(newSignal.windowDuration));
            setSignalState(newSignal.type);
            return 0;
          }
          return prev - 1;
        });
        return;
      }
      
      // Handle active signal window countdown (ENTRY_DIRECT, ENTRY_LIGHT, OBSERVATION)
      if (['ENTRY_DIRECT', 'ENTRY_LIGHT', 'OBSERVATION'].includes(currentState) && storedSignal) {
        const remaining = Math.ceil((storedSignal.expiresAt - now) / 1000);
        if (remaining <= 0) {
          // Window expired, go to reanalysis
          setEntryWindowTime(0);
          setSignalState('REANALYSIS');
          const cooldownLeft = Math.ceil((storedSignal.cooldownEndsAt - now) / 1000);
          setCooldownRemaining(Math.max(0, cooldownLeft));
        } else {
          setEntryWindowTime(remaining);
        }
        return;
      }
      
      // Handle REANALYSIS - waiting for next signal
      if (currentState === 'REANALYSIS' && storedSignal) {
        const cooldownLeft = Math.ceil((storedSignal.cooldownEndsAt - now) / 1000);
        
        if (cooldownLeft <= 0) {
          // Reanalysis finished - generate new signal
          const newSignal = generateAndStoreSignal();
          setSignalData(newSignal);
          setEntryWindowTime(Math.ceil(newSignal.windowDuration));
          setSignalState(newSignal.type);
        } else {
          setCooldownRemaining(cooldownLeft);
        }
      }
    };
    
    // Initial tick
    tick();
    
    // Start interval
    tickIntervalRef.current = setInterval(tick, 1000);
    
    return () => {
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
      }
    };
  }, [slot, generateAndStoreSignal]);

  // Graph animation
  useEffect(() => {
    const graphInterval = setInterval(() => {
      setGraphData(prev => {
        const lastValue = prev[prev.length - 1];
        const change = (Math.random() - 0.5) * 25;
        const newValue = Math.max(15, Math.min(85, lastValue + change));
        return [...prev.slice(1), newValue];
      });
    }, 2000);
    
    return () => clearInterval(graphInterval);
  }, []);

  // Result history update
  useEffect(() => {
    const historyInterval = setInterval(() => {
      setTrendHistory(prev => {
        const rand = Math.random();
        let newResult;
        if (rand < 0.45) newResult = 'HIT';
        else if (rand < 0.92) newResult = 'MISS';
        else newResult = 'BONUS';
        return [...prev.slice(1), newResult];
      });
      
      setDeadSpinCount(prev => {
        if (Math.random() > 0.6) return Math.min(15, prev + 1);
        return Math.max(0, prev - 1);
      });
      
      setLastBonusDistance(prev => {
        if (Math.random() > 0.95) return 0;
        return Math.min(100, prev + 1);
      });
    }, 3000);
    
    return () => clearInterval(historyInterval);
  }, []);

  // Draw graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Line gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgba(124,58,237,0.3)');
    gradient.addColorStop(0.7, '#8b5cf6');
    gradient.addColorStop(1, '#a78bfa');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    graphData.forEach((value, index) => {
      const x = (width / (graphData.length - 1)) * index;
      const y = height - (value / 100) * height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // End point
    const lastX = width - 2;
    const lastY = height - (graphData[graphData.length - 1] / 100) * height;
    
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#a78bfa';
    ctx.fill();
    
  }, [graphData]);

  if (!slot) return null;

  const currentState = stateConfig[signalState] || stateConfig.LOADING;

  const formatTime = (seconds) => {
    if (seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCycleLabel = () => {
    switch (cyclePhase) {
      case 'cold': return 'Frio';
      case 'warming': return 'Aquecendo';
      case 'hot': return 'Quente';
      case 'cooling': return 'Esfriando';
      default: return 'Neutro';
    }
  };

  const getCycleColor = () => {
    switch (cyclePhase) {
      case 'cold': return 'text-blue-400';
      case 'warming': return 'text-amber-400';
      case 'hot': return 'text-emerald-400';
      case 'cooling': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getButtonText = () => {
    if (signalState === 'ENTRY_DIRECT') return 'Entrar agora';
    if (signalState === 'ENTRY_LIGHT') return 'Jogar leve';
    if (signalState === 'OBSERVATION') return 'Observar 1 rodada';
    if (signalState === 'REANALYSIS') return 'Aguardando análise';
    return 'Analisando...';
  };

  const getButtonColor = () => {
    if (signalState === 'ENTRY_DIRECT') return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30';
    if (signalState === 'ENTRY_LIGHT') return 'bg-amber-500/20 border-amber-500/40 text-amber-400 hover:bg-amber-500/30';
    if (signalState === 'OBSERVATION') return 'bg-blue-500/20 border-blue-500/40 text-blue-400 hover:bg-blue-500/30';
    return 'bg-violet-500/10 border-violet-500/20 text-violet-400';
  };

  // All signal states except GENERATING_FIRST, LOADING, and REANALYSIS are actionable
  const isButtonEnabled = ['ENTRY_DIRECT', 'ENTRY_LIGHT', 'OBSERVATION'].includes(signalState);

  return (
    <div className="min-h-screen bg-[#06060c] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0814] via-[#06060c] to-[#080612]" />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 bg-[#06060c]/90 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={onBack} 
            data-testid="signal-back-btn"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-150"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Voltar</span>
          </button>
          
          <div className={`px-3 py-1.5 rounded-full transition-all duration-300 ${currentState.bg} border ${currentState.border}`}>
            <span className={`text-xs font-bold ${currentState.color}`}>
              {currentState.label}
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-6">
        
        {/* Game Info */}
        <div className={`flex items-center gap-4 mb-6 pb-4 border-b border-white/5 transition-all duration-300 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10">
            <img src={slot.image} alt={slot.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">{slot.name}</h1>
            <p className="text-sm text-gray-500">{providerName}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Left Column - Main Decision Box */}
          <div className="lg:col-span-2 space-y-5">
            
            {/* MAIN CARD */}
            <div 
              className={`rounded-xl border p-6 transition-all duration-300 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} ${currentState.border} ${currentState.bg}`}
            >
              {/* Top info line */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  {['ENTRY_DIRECT', 'ENTRY_LIGHT', 'OBSERVATION'].includes(signalState) && entryWindowTime > 0 && (
                    <span>Janela: <span className={`font-mono ${entryWindowTime <= 10 ? 'text-amber-400' : currentState.color}`}>{entryWindowTime}s</span></span>
                  )}
                  {signalData?.isTurbo !== undefined && signalState !== 'GENERATING_FIRST' && signalState !== 'LOADING' && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      signalData.isTurbo 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                        : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                      Turbo: {signalData.isTurbo ? 'ON' : 'OFF'}
                    </span>
                  )}
                  {signalData?.confidence && ['ENTRY_DIRECT', 'ENTRY_LIGHT', 'OBSERVATION'].includes(signalState) && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${currentState.bg} ${currentState.color} border ${currentState.border}`}>
                      {signalData.confidence}% confiança
                    </span>
                  )}
                </div>
                <div>
                  {signalState === 'GENERATING_FIRST' && initialCountdown > 0 && (
                    <span className="text-blue-400">
                      Analisando em <span className="font-mono font-bold">{initialCountdown}</span>
                    </span>
                  )}
                  {signalState === 'REANALYSIS' && cooldownRemaining > 0 && (
                    <span>
                      Reanálise em: <span className="font-mono text-violet-400">{formatTime(cooldownRemaining)}</span>
                    </span>
                  )}
                </div>
              </div>
              
              {/* LOADING State */}
              {signalState === 'LOADING' && (
                <div className="text-center py-8">
                  <div className="w-8 h-8 mx-auto mb-4 border-2 border-gray-600 border-t-gray-400 rounded-full animate-spin" />
                  <p className="text-sm text-gray-500">{currentState.subtitle}</p>
                </div>
              )}
              
              {/* GENERATING FIRST SIGNAL */}
              {signalState === 'GENERATING_FIRST' && (
                <div className="text-center py-8">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-blue-500/10 border border-blue-500/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-black text-blue-400">{initialCountdown}</span>
                    </div>
                    <svg className="absolute inset-0 w-16 h-16" viewBox="0 0 64 64">
                      <circle 
                        cx="32" cy="32" r="28" 
                        fill="none" 
                        stroke="rgba(96,165,250,0.3)" 
                        strokeWidth="3"
                      />
                      <circle 
                        cx="32" cy="32" r="28" 
                        fill="none" 
                        stroke="rgba(96,165,250,0.8)" 
                        strokeWidth="3"
                        strokeDasharray={`${(1 - initialCountdown / INITIAL_DELAY) * 176} 176`}
                        strokeLinecap="round"
                        transform="rotate(-90 32 32)"
                        style={{ transition: 'stroke-dasharray 1s linear' }}
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Analisando padrões...</h2>
                  <p className="text-sm text-gray-500">Processando ciclo da mesa</p>
                </div>
              )}
              
              {/* REANALYSIS State */}
              {signalState === 'REANALYSIS' && signalData && (
                <div className="space-y-5">
                  <div className="text-center pb-4 border-b border-white/5">
                    <h2 className="text-2xl font-bold text-violet-400 mb-1">{currentState.label}</h2>
                    <p className="text-sm text-gray-500">{currentState.subtitle}</p>
                    {cooldownRemaining > 0 && (
                      <p className="text-xs text-violet-400 mt-2">
                        Reanálise em: {formatTime(cooldownRemaining)}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-3 opacity-60">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Último sinal</span>
                      <span className="text-gray-400">{signalData.entry} rodadas</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Confiança</span>
                      <span className="text-gray-400">{signalData.confidence}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-400">Próxima análise</span>
                      <span className="text-violet-400 font-bold">{signalData.bestTime}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* ENTRY_DIRECT State - High confidence */}
              {signalState === 'ENTRY_DIRECT' && signalData && (
                <div className="space-y-5">
                  <div className="text-center pb-4 border-b border-white/5">
                    <h2 className="text-3xl font-black text-emerald-400 mb-1">{currentState.label}</h2>
                    <p className="text-sm text-gray-500">{currentState.subtitle}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Entrada</span>
                      <span className="text-white font-bold">{signalData.entry} rodadas</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Confiança</span>
                      <span className="text-emerald-400 font-bold">{signalData.strength} ({signalData.confidence}%)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Estratégia de saída</span>
                      <span className="text-white font-medium">{signalData.exit}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <span className="text-gray-400">Melhor horário</span>
                        <p className="text-[10px] text-gray-600">Baseado no ciclo atual</p>
                      </div>
                      <span className="text-white font-bold">{signalData.bestTime} <span className="text-gray-500 font-normal text-xs">(local)</span></span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* ENTRY_LIGHT State - Medium confidence */}
              {signalState === 'ENTRY_LIGHT' && signalData && (
                <div className="space-y-5">
                  <div className="text-center pb-4 border-b border-white/5">
                    <h2 className="text-3xl font-black text-amber-400 mb-1">{currentState.label}</h2>
                    <p className="text-sm text-gray-500">{currentState.subtitle}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Entrada</span>
                      <span className="text-white font-bold">{signalData.entry} rodadas</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Confiança</span>
                      <span className="text-amber-400 font-bold">{signalData.strength} ({signalData.confidence}%)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Estratégia de saída</span>
                      <span className="text-white font-medium">{signalData.exit}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <span className="text-gray-400">Melhor horário</span>
                        <p className="text-[10px] text-amber-500/60">Aposte valores conservadores</p>
                      </div>
                      <span className="text-white font-bold">{signalData.bestTime} <span className="text-gray-500 font-normal text-xs">(local)</span></span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* OBSERVATION State - Lower confidence but still actionable */}
              {signalState === 'OBSERVATION' && signalData && (
                <div className="space-y-5">
                  <div className="text-center pb-4 border-b border-white/5">
                    <h2 className="text-3xl font-black text-blue-400 mb-1">{currentState.label}</h2>
                    <p className="text-sm text-gray-500">{currentState.subtitle}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Ação recomendada</span>
                      <span className="text-blue-400 font-bold">Observar 1 rodada</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Depois entrar</span>
                      <span className="text-white font-bold">{signalData.entry} rodadas (leve)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400">Confiança</span>
                      <span className="text-blue-400 font-bold">{signalData.strength} ({signalData.confidence}%)</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <span className="text-gray-400">Estratégia</span>
                        <p className="text-[10px] text-blue-400/60">{signalData.exit}</p>
                      </div>
                      <span className="text-white font-bold">{signalData.bestTime} <span className="text-gray-500 font-normal text-xs">(local)</span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* HISTORY */}
            <div className={`rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: '100ms' }}>
              <div className="px-4 py-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                <span className="text-sm font-medium text-white">Últimas rodadas</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-gray-500">Ao vivo</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="h-20 mb-4 rounded-lg bg-black/20 overflow-hidden">
                  <canvas ref={canvasRef} width={600} height={80} className="w-full h-full" />
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {trendHistory.map((result, index) => (
                    <div 
                      key={index}
                      className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold transition-all duration-150 ${
                        result === 'HIT' ? 'bg-emerald-500/20 text-emerald-400' :
                        result === 'BONUS' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-white/5 text-gray-600'
                      } ${index === trendHistory.length - 1 ? 'ring-1 ring-white/30 scale-110' : ''}`}
                    >
                      {result === 'HIT' ? '●' : result === 'BONUS' ? '★' : '○'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className={`space-y-5 transition-all duration-300 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: '80ms' }}>
            
            {/* INDICADORES */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Indicadores</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Sem pagar</span>
                  <span className={`text-sm font-bold transition-all duration-200 ${deadSpinCount > 6 ? 'text-amber-400' : 'text-white'}`}>{deadSpinCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Desde bônus</span>
                  <span className="text-sm font-bold text-white">{lastBonusDistance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Ciclo</span>
                  <span className={`text-sm font-bold ${getCycleColor()}`}>{getCycleLabel()}</span>
                </div>
              </div>
            </div>
            
            {/* BUTTON */}
            <button
              onClick={() => platformLink && window.open(platformLink, '_blank')}
              data-testid="access-platform-btn"
              disabled={!isButtonEnabled}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 border ${
                isButtonEnabled
                  ? getButtonColor()
                  : 'bg-violet-500/10 border-violet-500/20 text-violet-400 cursor-wait'
              }`}
            >
              {getButtonText()}
            </button>
            
            {['ENTRY_DIRECT', 'ENTRY_LIGHT', 'OBSERVATION'].includes(signalState) && entryWindowTime > 0 && (
              <p className={`text-center text-xs ${currentState.color}/70`}>{entryWindowTime}s restantes</p>
            )}
            
            {signalState === 'GENERATING_FIRST' && (
              <p className="text-center text-xs text-blue-400/70">Analisando em {initialCountdown}s...</p>
            )}
            
            {signalState === 'REANALYSIS' && cooldownRemaining > 0 && (
              <p className="text-center text-xs text-violet-400/70">Nova análise em {formatTime(cooldownRemaining)}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignalGenerator;
