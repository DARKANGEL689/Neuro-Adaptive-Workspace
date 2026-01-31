import React, { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Settings, 
  Maximize2, 
  Minimize2, 
  BrainCircuit,
  Lock
} from 'lucide-react';
import { AdaptiveContainer } from './components/AdaptiveContainer';
import { BiometricSensor } from './components/BiometricSensor';
import { TaskList, InboxWidget, BiometricChart, BreathingGuide } from './components/Widgets';
import { BiometricStatus, BiometricData, UIState } from './types';
import { MOCK_TASKS, MOCK_NOTIFICATIONS, MAX_HISTORY_LENGTH } from './constants';

export default function App() {
  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  const [bioStatus, setBioStatus] = useState<BiometricStatus>(BiometricStatus.INITIALIZING);
  const [stressIndex, setStressIndex] = useState(0.2); // Start calm
  const [bpm, setBpm] = useState(65);
  const [uiState, setUiState] = useState<UIState>(UIState.FLOW);
  const [bioHistory, setBioHistory] = useState<BiometricData[]>([]);
  const [manualOverride, setManualOverride] = useState(false);

  // --------------------------------------------------------------------------
  // Neuro-Adaptive Logic Simulation
  // --------------------------------------------------------------------------
  
  // 1. Simulate Calibration
  const handleCalibrationComplete = useCallback(() => {
    setBioStatus(BiometricStatus.ACTIVE);
  }, []);

  // 2. Simulate Data Stream (The "Loop")
  useEffect(() => {
    if (bioStatus !== BiometricStatus.ACTIVE || manualOverride) return;

    const interval = setInterval(() => {
      // Fluctuate stress naturally
      setStressIndex(prev => {
        const change = (Math.random() - 0.5) * 0.1;
        const newVal = Math.max(0, Math.min(1, prev + change));
        return newVal;
      });

      // Fluctuate BPM based on stress
      setBpm(prev => {
        const targetBpm = 60 + (stressIndex * 60); // 60 to 120
        const drift = (Math.random() - 0.5) * 4;
        return Math.floor(prev * 0.9 + targetBpm * 0.1 + drift);
      });

    }, 1000);

    return () => clearInterval(interval);
  }, [bioStatus, stressIndex, manualOverride]);

  // 3. Record History
  useEffect(() => {
    const newData: BiometricData = {
      heartRate: bpm,
      hrv: 100 - (stressIndex * 50),
      stressIndex,
      timestamp: Date.now()
    };
    
    setBioHistory(prev => {
      const newHistory = [...prev, newData];
      if (newHistory.length > MAX_HISTORY_LENGTH) return newHistory.slice(1);
      return newHistory;
    });
  }, [bpm, stressIndex]);

  // 4. Determine UI State based on Stress (The "Generative UI Engine")
  useEffect(() => {
    if (manualOverride) return; // Allow manual override for demo

    if (stressIndex < 0.4) {
      setUiState(UIState.FLOW);
    } else if (stressIndex < 0.75) {
      setUiState(UIState.BALANCED);
    } else if (stressIndex < 0.9) {
      setUiState(UIState.FOCUS);
    } else {
      setUiState(UIState.RECOVERY);
    }
  }, [stressIndex, manualOverride]);

  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------
  const getHeaderOpacity = () => {
    if (uiState === UIState.FOCUS) return 'opacity-20 hover:opacity-100';
    if (uiState === UIState.RECOVERY) return 'opacity-0';
    return 'opacity-100';
  };

  return (
    <AdaptiveContainer uiState={uiState}>
      
      {/* ---------------------------------------------------------------------
          Top Navigation (Mutates visibility based on state)
      --------------------------------------------------------------------- */}
      <header className={`fixed top-0 w-full z-50 p-6 flex justify-between items-center transition-opacity duration-500 ${getHeaderOpacity()}`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/5 rounded-lg backdrop-blur-md border border-white/10">
            <BrainCircuit size={20} className={uiState === UIState.RECOVERY ? 'text-blue-400' : 'text-emerald-400'} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider font-sans">NAW <span className="text-xs font-normal opacity-50">OS v1.0</span></h1>
            <div className="flex items-center space-x-2">
               <span className={`w-1.5 h-1.5 rounded-full ${bioStatus === BiometricStatus.ACTIVE ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
               <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">{uiState} MODE</span>
            </div>
          </div>
        </div>

        {/* Manual Override Controls (For Demo Purposes) */}
        <div className="bg-black/40 backdrop-blur-md rounded-full border border-white/5 px-4 py-2 flex items-center space-x-4">
           <span className="text-[10px] font-mono text-gray-500 uppercase">Simulate State</span>
           <input 
             type="range" 
             min="0" 
             max="1" 
             step="0.01" 
             value={stressIndex}
             onChange={(e) => {
               setManualOverride(true);
               setStressIndex(parseFloat(e.target.value));
             }}
             className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
           />
           <button 
             onClick={() => setManualOverride(false)}
             className={`text-[10px] uppercase font-mono px-2 py-1 rounded ${!manualOverride ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500'}`}
           >
             Auto
           </button>
        </div>
      </header>

      {/* ---------------------------------------------------------------------
          Main Content Grid
          This grid dynamically refactors based on the UI State
      --------------------------------------------------------------------- */}
      <main className="container mx-auto px-6 h-screen pt-24 pb-6 flex flex-col">
        
        {/* RECOVERY MODE: Full Screen Overlay */}
        {uiState === UIState.RECOVERY ? (
           <div className="flex-1">
             <BreathingGuide />
           </div>
        ) : (
          <div className={`grid h-full gap-6 transition-all duration-700 ease-in-out
             ${uiState === UIState.FLOW ? 'grid-cols-12 grid-rows-6' : ''} 
             ${uiState === UIState.BALANCED ? 'grid-cols-8 grid-rows-6' : ''}
             ${uiState === UIState.FOCUS ? 'grid-cols-1 grid-rows-1' : ''}
          `}>
            
            {/* 1. Biometric Sensor / HUD */}
            {/* In Focus mode, this shrinks or hides. In Flow, it's prominent. */}
            {uiState !== UIState.FOCUS && (
              <div className={`
                transition-all duration-700 relative z-20
                ${uiState === UIState.FLOW ? 'col-span-3 row-span-3' : 'col-span-8 row-span-2'}
              `}>
                <BiometricSensor 
                  status={bioStatus} 
                  stressIndex={stressIndex} 
                  bpm={bpm} 
                  onCalibrationComplete={handleCalibrationComplete}
                />
              </div>
            )}

            {/* 2. Primary Task Area */}
            {/* Expands to fill screen in FOCUS mode */}
            <div className={`
               bg-[#121214] border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-all duration-700
               ${uiState === UIState.FLOW ? 'col-span-6 row-span-4' : ''}
               ${uiState === UIState.BALANCED ? 'col-span-5 row-span-6' : ''}
               ${uiState === UIState.FOCUS ? 'col-span-1 row-span-1 border-orange-500/20 bg-black' : ''}
            `}>
              <div className="h-full p-6">
                <TaskList tasks={MOCK_TASKS} simplified={uiState === UIState.FOCUS} />
              </div>
            </div>

            {/* 3. Secondary Widgets (Hidden in FOCUS) */}
            {uiState !== UIState.FOCUS && (
              <>
                {/* Inbox */}
                <div className={`
                  bg-[#121214] border border-white/5 rounded-xl p-6 transition-all duration-700
                  ${uiState === UIState.FLOW ? 'col-span-3 row-span-4' : 'hidden'}
                `}>
                  <InboxWidget notifications={MOCK_NOTIFICATIONS} />
                </div>

                {/* Charts */}
                <div className={`
                   bg-[#121214] border border-white/5 rounded-xl p-6 transition-all duration-700
                   ${uiState === UIState.FLOW ? 'col-span-3 row-span-3' : 'col-span-8 row-span-2'}
                `}>
                  <BiometricChart data={bioHistory} />
                </div>

                {/* Contextual Info (Only in FLOW) */}
                {uiState === UIState.FLOW && (
                  <div className="col-span-6 row-span-2 bg-gradient-to-r from-emerald-900/10 to-transparent border border-white/5 rounded-xl p-6 flex items-center justify-between">
                     <div>
                       <h3 className="text-xl font-light text-emerald-100">Flow State Detected</h3>
                       <p className="text-sm text-emerald-400/60 font-mono mt-1">Cognitive throughput optimized. Notifications enabled.</p>
                     </div>
                     <div className="h-12 w-12 rounded-full border border-emerald-500/30 flex items-center justify-center">
                        <Activity className="text-emerald-400" size={24} />
                     </div>
                  </div>
                )}
              </>
            )}

          </div>
        )}
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 w-full p-4 border-t border-white/5 bg-black/80 backdrop-blur-md flex justify-between text-[10px] font-mono text-gray-600 uppercase tracking-wider z-50">
        <div className="flex space-x-6">
          <span>Mem: 42%</span>
          <span>WebNN: Quantized (FP16)</span>
          <span>Latency: 12ms</span>
        </div>
        <div className="flex items-center space-x-2">
          {uiState === UIState.FOCUS && <Lock size={10} />}
          <span>Privacy Loop: Local</span>
        </div>
      </footer>

    </AdaptiveContainer>
  );
}