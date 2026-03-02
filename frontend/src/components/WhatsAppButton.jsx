import React, { useState } from 'react';

const WhatsAppButton = ({ groupLink = "https://chat.whatsapp.com/JYQ5DpfR0yfJQt9lVeFuN6" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        data-testid="whatsapp-close-btn"
        className="w-6 h-6 rounded-full bg-gray-800/90 border border-white/20 flex items-center justify-center hover:bg-gray-700 transition-all hover:scale-110"
        title="Fechar"
      >
        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* WhatsApp button */}
      <a
        href={groupLink}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-floating-btn"
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
        
        {/* Glow effect */}
        <div 
          className="absolute -inset-2 rounded-full transition-all duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(37, 211, 102, 0.4) 0%, transparent 70%)',
            filter: 'blur(8px)',
            opacity: isHovered ? 1 : 0.6
          }}
        />
        
        {/* Main button */}
        <div 
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'scale-110 shadow-2xl' : 'scale-100'
          }`}
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            boxShadow: isHovered 
              ? '0 8px 32px rgba(37, 211, 102, 0.5), 0 0 0 4px rgba(37, 211, 102, 0.2)' 
              : '0 4px 20px rgba(37, 211, 102, 0.4)'
          }}
        >
          {/* WhatsApp Icon */}
          <svg 
            className="w-7 h-7 sm:w-8 sm:h-8 text-white" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>

        {/* Tooltip */}
        <div 
          className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-2 rounded-lg bg-gray-900/95 border border-white/10 backdrop-blur-sm transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}
        >
          <span className="text-sm text-white font-medium">Entre no grupo VIP</span>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="border-8 border-transparent border-l-gray-900/95" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
