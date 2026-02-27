import React, { useState, useEffect, useMemo } from 'react';

const IntroAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);

  // System loading steps - always defined and non-empty
  const steps = useMemo(() => [
    { message: 'Conectando ao servidor...', duration: 800 },
    { message: 'Validando provedores...', duration: 600 },
    { message: 'Sincronizando histórico de rodadas...', duration: 700 },
    { message: 'Carregando sessões ativas...', duration: 600 },
    { message: 'Inicializando interface...', duration: 500 }
  ], []);

  // Safe accessor for current step message
  const getCurrentMessage = () => {
    if (currentStep >= 0 && currentStep < steps.length && steps[currentStep]?.message) {
      return steps[currentStep].message;
    }
    return 'Sincronizando...';
  };

  useEffect(() => {
    let stepIndex = 0;
    let progressValue = 0;
    let isMounted = true;
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      if (!isMounted) return;
      progressValue = Math.min(progressValue + 1.2, 100);
      setProgress(progressValue);
    }, 35);

    // Step progression
    const runStep = () => {
      if (!isMounted) return;
      
      if (stepIndex >= 0 && stepIndex < steps.length) {
        const currentStepData = steps[stepIndex];
        
        if (currentStepData) {
          setCurrentStep(stepIndex);
          
          // Add log entry with safe access
          const timestamp = new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
          });
          
          const message = currentStepData.message ?? 'Processando...';
          
          setLogs(prev => [...prev, { 
            time: timestamp, 
            message: message.replace('...', ''),
            status: 'ok'
          }]);
          
          const duration = currentStepData.duration ?? 600;
          stepIndex++;
          
          if (stepIndex < steps.length) {
            setTimeout(runStep, duration);
          }
        }
      }
    };

    // Start steps after a brief delay
    const startTimeout = setTimeout(runStep, 300);

    // Complete after all steps
    const completeTimeout = setTimeout(() => {
      if (isMounted && onComplete) {
        onComplete();
      }
    }, 3200);

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
      clearTimeout(startTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, steps]);

  return (
    <div className="fixed inset-0 z-50 bg-[#030308] flex items-center justify-center overflow-hidden">
      
      {/* Minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#030308] to-[#020206]" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-sm font-medium text-gray-400 tracking-widest mb-1">
            Sinal Carregando...
          </h1>
          <p className="text-[10px] text-gray-600 font-mono">
            v2.4.1
          </p>
        </div>

        {/* Progress section */}
        <div className="mb-6">
          {/* Current step message with safe fallback */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400 font-mono">
              {getCurrentMessage()}
            </span>
            <span className="text-xs text-gray-600 font-mono">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="relative h-1 bg-white/[0.03] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gray-600 to-gray-500 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Subtle shine effect */}
              <div 
                className="absolute inset-0 animate-shine"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                }}
              />
            </div>
          </div>
        </div>

        {/* System log output */}
        <div className="rounded-lg bg-[#08080d] border border-white/[0.04] overflow-hidden font-mono">
          <div className="px-3 py-2 border-b border-white/[0.03] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
            <span className="text-[9px] text-gray-600 uppercase tracking-wider">System Output</span>
          </div>
          
          <div className="p-3 space-y-1.5 min-h-[120px]">
            {logs.map((log, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 text-[10px] animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-gray-700 w-16 shrink-0">{log.time}</span>
                <span className="text-gray-500">{log.message}</span>
                <span className="text-emerald-600 ml-auto">[{log.status}]</span>
              </div>
            ))}
            
            {/* Blinking cursor */}
            {progress < 100 && (
              <div className="flex items-center gap-1 text-[10px] text-gray-600">
                <span className="animate-blink">_</span>
              </div>
            )}
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            progress >= 100 ? 'bg-emerald-500' : 'bg-gray-600 animate-pulse'
          }`} />
          <span className="text-[9px] text-gray-600 font-mono uppercase tracking-wider">
            {progress >= 100 ? 'Sistema pronto' : 'Processando'}
          </span>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-shine { animation: shine 2s ease-in-out infinite; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}</style>
    </div>
  );
};

export default IntroAnimation;
