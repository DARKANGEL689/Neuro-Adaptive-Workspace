import React, { useEffect, useRef, useState } from 'react';
import { Camera, Activity, Eye, Zap } from 'lucide-react';
import { BiometricStatus } from '../types';

interface BiometricSensorProps {
  status: BiometricStatus;
  stressIndex: number;
  bpm: number;
  onCalibrationComplete: () => void;
}

export const BiometricSensor: React.FC<BiometricSensorProps> = ({ 
  status, 
  stressIndex, 
  bpm,
  onCalibrationComplete 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streamActive, setStreamActive] = useState(false);

  // Setup Camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } catch (err) {
        console.error("Camera access denied or unavailable", err);
      }
    };

    if (status !== BiometricStatus.ERROR) {
      startCamera();
    }

    return () => {
      // Cleanup tracks
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [status]);

  // Fake Calibration Timer
  useEffect(() => {
    if (status === BiometricStatus.INITIALIZING && streamActive) {
      const timer = setTimeout(() => {
        onCalibrationComplete();
      }, 3000); // 3 second fake calibration
      return () => clearTimeout(timer);
    }
  }, [status, streamActive, onCalibrationComplete]);

  // Overlay Canvas Animation (Scanning effect)
  useEffect(() => {
    if (!streamActive || !canvasRef.current || !videoRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    let animationFrame: number;
    let scanLineY = 0;

    const draw = () => {
      if (!canvasRef.current || !videoRef.current) return;
      
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw Face Mesh markers (Simulated)
      ctx.strokeStyle = status === BiometricStatus.CALIBRATING 
        ? 'rgba(45, 212, 191, 0.5)' // Teal
        : stressIndex > 0.7 ? 'rgba(239, 68, 68, 0.4)' // Red
        : 'rgba(45, 212, 191, 0.2)'; // Teal low

      ctx.lineWidth = 1;
      
      // Simulated facial landmarks
      const centerX = width / 2;
      const centerY = height / 2;
      
      if (status === BiometricStatus.ACTIVE || status === BiometricStatus.CALIBRATING) {
        // Draw target box
        const boxSize = 100;
        ctx.strokeRect(centerX - boxSize/2, centerY - boxSize/2, boxSize, boxSize);
        
        // Draw scan line
        ctx.beginPath();
        ctx.moveTo(0, scanLineY);
        ctx.lineTo(width, scanLineY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();

        scanLineY = (scanLineY + 2) % height;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, [streamActive, status, stressIndex]);

  return (
    <div className={`relative overflow-hidden rounded-lg border transition-colors duration-500
      ${stressIndex > 0.7 ? 'border-red-900/50 bg-red-950/10' : 'border-emerald-900/50 bg-emerald-950/10'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 bg-black/20">
        <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
          <Camera size={12} />
          <span>OPTICAL SENSOR</span>
        </div>
        <div className="flex items-center space-x-2">
           <span className={`h-2 w-2 rounded-full ${status === BiometricStatus.ACTIVE ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
           <span className="text-[10px] uppercase tracking-wider text-gray-500">{status}</span>
        </div>
      </div>

      {/* Video Feed Area */}
      <div className="relative h-48 w-full bg-black flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale mix-blend-screen"
        />
        <canvas 
          ref={canvasRef}
          width={320}
          height={192}
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Overlay Data */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[10px] text-gray-400 font-mono mb-1">HEART RATE</div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-mono font-bold text-white">{bpm}</span>
                <span className="text-xs text-gray-500">BPM</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-[10px] text-gray-400 font-mono mb-1">STRESS INDEX</div>
              <div className="flex items-center justify-end space-x-2">
                <div className="h-1.5 w-16 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${stressIndex > 0.7 ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ width: `${stressIndex * 100}%` }}
                  />
                </div>
                <span className={`text-sm font-mono font-bold ${stressIndex > 0.7 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {(stressIndex * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Specs Footer */}
      <div className="p-2 bg-black/40 text-[10px] font-mono text-gray-600 flex justify-between">
        <div className="flex items-center space-x-1">
          <Eye size={10} />
          <span>rPPG: ACTIVE</span>
        </div>
        <div className="flex items-center space-x-1">
          <Zap size={10} />
          <span>WebNN: ON</span>
        </div>
        <div className="flex items-center space-x-1">
          <Activity size={10} />
          <span>HRV: {Math.floor(100 - (stressIndex * 60))}ms</span>
        </div>
      </div>
    </div>
  );
};