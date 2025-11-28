import React from 'react';

interface LogoProps {
  className?: string;
  collapsed?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", collapsed = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Abstract Representation of the A Logo */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Blue Leg */}
          <path d="M20 90L40 30H50L30 90H20Z" fill="#0EA5E9" />
          {/* Red Leg */}
          <path d="M60 30L80 90H70L50 30H60Z" fill="#EF4444" />
          {/* Yellow Crossbar */}
          <path d="M30 65H70V75H30V65Z" fill="#F59E0B" transform="rotate(-15 50 70)" />
          {/* Green Accent/Top */}
          <circle cx="50" cy="20" r="10" fill="#10B981" />
        </svg>
      </div>
      
      {!collapsed && (
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight text-slate-800 tracking-tight">
            Akdemia Gestión
          </span>
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
            Admin Panel
          </span>
        </div>
      )}
    </div>
  );
};