export interface Metrics {
  timestamp: string;
  value: number;
}

export interface Status {
  id: number;
  status: string;
  timestamp: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  user_id?: number;
}