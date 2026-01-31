import React from 'react';
import { UIState } from '../types';

interface AdaptiveContainerProps {
  uiState: UIState;
  children: React.ReactNode;
}

export const AdaptiveContainer: React.FC<AdaptiveContainerProps> = ({ uiState, children }) => {
  // Base classes always present
  let containerClasses = "min-h-screen transition-colors duration-1000 ease-in-out relative overflow-hidden ";
  
  // Adaptive Backgrounds
  switch (uiState) {
    case UIState.FLOW:
      containerClasses += "bg-[#0a0a0c] text-slate-300";
      break;
    case UIState.BALANCED:
      containerClasses += "bg-[#111] text-slate-200";
      break;
    case UIState.FOCUS:
      containerClasses += "bg-[#1a1414] text-orange-50"; // Warm dark for focus
      break;
    case UIState.RECOVERY:
      containerClasses += "bg-[#050505] text-blue-100"; // Deep calm blue
      break;
  }

  return (
    <div className={containerClasses}>
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {uiState === UIState.FLOW && (
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
          />
        )}
        {uiState === UIState.RECOVERY && (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent animate-pulse-slow" />
        )}
        {uiState === UIState.FOCUS && (
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/5 via-transparent to-orange-900/5" />
        )}
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};