import React from 'react';
import { 
  CheckSquare, 
  Mail, 
  BarChart2, 
  Clock, 
  ShieldAlert, 
  Wind,
  Focus,
  Terminal
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Task, Notification, BiometricData } from '../types';

// ----------------------------------------------------------------------
// Task List Widget
// ----------------------------------------------------------------------
interface TaskListProps {
  tasks: Task[];
  simplified: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, simplified }) => {
  // If simplified (High Stress), show only high priority tasks
  const visibleTasks = simplified 
    ? tasks.filter(t => t.priority === 'High' && !t.completed).slice(0, 1) 
    : tasks;

  return (
    <div className={`h-full flex flex-col transition-all duration-700 ${simplified ? 'justify-center items-center' : ''}`}>
      {!simplified && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500">Active Directives</h3>
          <CheckSquare size={14} className="text-emerald-500" />
        </div>
      )}
      
      <div className={`space-y-3 w-full ${simplified ? 'max-w-2xl' : ''}`}>
        {visibleTasks.map(task => (
          <div key={task.id} className={`
            group flex items-center border rounded-md transition-all duration-300 cursor-pointer hover:border-emerald-500/50
            ${simplified 
              ? 'p-8 border-orange-500/30 bg-orange-900/10 scale-105' 
              : 'p-3 border-white/10 bg-white/5'}
          `}>
            <div className={`
              rounded-full border flex items-center justify-center mr-4
              ${simplified ? 'w-8 h-8 border-orange-400' : 'w-4 h-4 border-gray-500'}
            `}>
              {task.completed && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
            </div>
            
            <div className="flex-1">
              <h4 className={`font-sans font-medium ${simplified ? 'text-3xl tracking-tight' : 'text-sm'}`}>
                {task.title}
              </h4>
              {!simplified && (
                <div className="flex items-center mt-1 space-x-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    task.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-[10px] text-gray-500">{task.category}</span>
                </div>
              )}
            </div>

            {simplified && <Focus className="text-orange-400 animate-pulse" size={24} />}
          </div>
        ))}
        
        {visibleTasks.length === 0 && (
            <div className="text-center text-gray-500 py-10">No active directives.</div>
        )}
      </div>
      
      {simplified && (
        <p className="mt-8 text-orange-200/50 text-sm font-mono animate-pulse">
          COGNITIVE LOAD REDUCED. FOCUS ON ONE ITEM.
        </p>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// Inbox / Notification Widget (Hidden in High Stress)
// ----------------------------------------------------------------------
interface InboxProps {
  notifications: Notification[];
}

export const InboxWidget: React.FC<InboxProps> = ({ notifications }) => {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500">Inbound Stream</h3>
        <Mail size={14} className="text-blue-400" />
      </div>
      
      <div className="space-y-2">
        {notifications.map(notif => (
          <div key={notif.id} className="flex items-start p-3 bg-white/5 border border-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer">
            <div className="mt-1 mr-3 text-gray-400">
               {notif.source === 'Slack' ? <Terminal size={14} /> : <Mail size={14} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <span className="text-xs font-semibold text-gray-300">{notif.source}</span>
                <span className="text-[10px] text-gray-600">{notif.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <p className="text-xs text-gray-400 truncate">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Biometric Chart Widget
// ----------------------------------------------------------------------
interface BiometricChartProps {
  data: BiometricData[];
}

export const BiometricChart: React.FC<BiometricChartProps> = ({ data }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500">Physiological Telemetry</h3>
        <BarChart2 size={14} className="text-purple-400" />
      </div>
      
      <div className="flex-1 min-h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="timestamp" hide />
            <YAxis hide domain={[0, 1]} />
            <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                itemStyle={{ fontSize: '12px', fontFamily: 'monospace' }}
                labelStyle={{ display: 'none' }}
                formatter={(value: number) => [`${(value * 100).toFixed(0)}%`, 'Stress']}
            />
            <Area 
                type="monotone" 
                dataKey="stressIndex" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorStress)" 
                strokeWidth={2}
                isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Breathing Guide (Recovery Mode)
// ----------------------------------------------------------------------
export const BreathingGuide: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Expanding Circle */}
        <div className="w-64 h-64 border-2 border-blue-300/30 rounded-full animate-[ping_4s_ease-in-out_infinite] absolute" />
        <div className="w-48 h-48 border border-blue-300/50 rounded-full animate-[pulse_4s_ease-in-out_infinite] flex items-center justify-center bg-blue-500/5 backdrop-blur-sm">
           <Wind size={48} className="text-blue-200 opacity-80" />
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-light text-blue-100 mb-2">High Cortisol Detected</h2>
        <p className="text-blue-300/60 font-mono text-sm">Synchronize breathing with the pulse.</p>
        <div className="mt-8 flex justify-center space-x-8 text-xs font-mono text-blue-400/50 uppercase tracking-widest">
           <span>Inhale</span>
           <span>Hold</span>
           <span>Exhale</span>
        </div>
      </div>
    </div>
  );
};