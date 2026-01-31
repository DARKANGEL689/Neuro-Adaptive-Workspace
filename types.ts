export enum BiometricStatus {
  INITIALIZING = 'INITIALIZING',
  CALIBRATING = 'CALIBRATING',
  ACTIVE = 'ACTIVE',
  ERROR = 'ERROR'
}

export interface BiometricData {
  heartRate: number;
  hrv: number; // Heart Rate Variability
  stressIndex: number; // 0.0 to 1.0
  timestamp: number;
}

export interface Task {
  id: string;
  title: string;
  category: 'Work' | 'Personal' | 'System';
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface Notification {
  id: string;
  source: string;
  message: string;
  timestamp: Date;
  priority: 'High' | 'Low';
}

export enum UIState {
  FLOW = 'FLOW',       // Low stress, high density
  BALANCED = 'BALANCED', // Medium stress, normal density
  FOCUS = 'FOCUS',     // High stress, low density, single task
  RECOVERY = 'RECOVERY' // Very high stress, breathing exercises
}