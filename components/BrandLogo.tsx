
import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  withBackground?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 48, className = "", withBackground = true }) => {
  return (
    <div 
      className={`relative flex items-center justify-center overflow-hidden shrink-0 ${className}`}
      style={{ 
        width: size, 
        height: size, 
        borderRadius: '50%',
        backgroundColor: withBackground ? '#1B1F3B' : 'transparent'
      }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curved Progress Line */}
        <path 
          d="M10 75C25 72 45 65 85 35" 
          stroke="#4FD1C5" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          className="opacity-80"
        />
        <path 
          d="M10 75C25 72 45 65 85 35" 
          stroke="#4FD1C5" 
          strokeWidth="1" 
          strokeLinecap="round"
          filter="url(#glow)"
        />
        
        {/* 3 Glowing Dots */}
        <circle cx="48" cy="58" r="3.5" fill="#4FD1C5" className="animate-brand-glow" filter="url(#glow-dot)" />
        <circle cx="67" cy="46" r="3.5" fill="#4FD1C5" className="animate-brand-glow" filter="url(#glow-dot)" style={{ animationDelay: '0.5s' }} />
        <circle cx="85" cy="35" r="4" fill="#4FD1C5" className="animate-brand-glow" filter="url(#glow-dot)" style={{ animationDelay: '1s' }} />

        <defs>
          <filter id="glow" x="-10" y="-10" width="120" height="120">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-dot" x="-5" y="-5" width="20" height="20">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};
