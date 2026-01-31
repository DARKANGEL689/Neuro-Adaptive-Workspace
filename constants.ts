import { Task, Notification } from './types';

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Refactor Neural Network Kernels', category: 'Work', priority: 'High', completed: false },
  { id: '2', title: 'Review Q3 Financials', category: 'Work', priority: 'Medium', completed: false },
  { id: '3', title: 'Schedule Dentist', category: 'Personal', priority: 'Low', completed: false },
  { id: '4', title: 'Update WebNN Drivers', category: 'System', priority: 'High', completed: true },
  { id: '5', title: 'Email Marketing Team', category: 'Work', priority: 'Medium', completed: false },
  { id: '6', title: 'Analyze rPPG Signal Noise', category: 'Work', priority: 'High', completed: false },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', source: 'Slack', message: 'Sarah: Can you check the PR?', timestamp: new Date(), priority: 'High' },
  { id: '2', source: 'System', message: 'Update downloaded.', timestamp: new Date(), priority: 'Low' },
  { id: '3', source: 'Calendar', message: 'Meeting in 15m', timestamp: new Date(), priority: 'High' },
  { id: '4', source: 'Mail', message: 'Newsletter #42', timestamp: new Date(), priority: 'Low' },
];

export const MAX_HISTORY_LENGTH = 30; // Seconds of data to show in charts