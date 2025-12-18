
import React from 'react';
import { PenguinProps } from '../types';

export const Penguin: React.FC<PenguinProps> = ({ className = "" }) => {
  return (
    <div className={`w-20 h-20 transition-transform duration-500 hover:scale-110 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Body */}
        <ellipse cx="50" cy="60" rx="35" ry="40" fill="#333" />
        <ellipse cx="50" cy="65" rx="25" ry="30" fill="white" />
        
        {/* Eyes */}
        <circle cx="40" cy="45" r="4" fill="#333" />
        <circle cx="60" cy="45" r="4" fill="#333" />
        
        {/* Beak */}
        <path d="M45 52 L55 52 L50 60 Z" fill="#FFA500" />
        
        {/* Blushes */}
        <circle cx="35" cy="55" r="4" fill="#FFC0CB" fillOpacity="0.6" />
        <circle cx="65" cy="55" r="4" fill="#FFC0CB" fillOpacity="0.6" />
        
        {/* Feet */}
        <ellipse cx="38" cy="92" rx="8" ry="4" fill="#FFA500" />
        <ellipse cx="62" cy="92" rx="8" ry="4" fill="#FFA500" />
      </svg>
    </div>
  );
};
