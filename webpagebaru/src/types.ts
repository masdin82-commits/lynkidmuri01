export type GradingScaleType = 'UP' | 'DLSU' | 'PERCENTAGE';

export interface Subject {
  id: string;
  name: string;
  units: string; // Keep as string for controlled inputs (typing floating points, empty backspaces)
  grade: string; // Keep as string for controlled inputs
}

export interface SavedGwaRecord {
  id: string;
  timestamp: string;
  semesterName: string;
  gwa: number;
  totalUnits: number;
  scale: GradingScaleType;
  subjects: Array<{ name: string; units: number; grade: number }>;
}
