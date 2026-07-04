// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Facial Analysis Types
export interface FacialAnalysis {
  id: string;
  userId: string;
  imageUri: string;
  timestamp: string;
  emotions: EmotionData;
  facialFeatures: FacialFeatures;
  confidence: number;
  recommendations?: string[];
}

export interface EmotionData {
  happiness: number;
  sadness: number;
  anger: number;
  fear: number;
  surprise: number;
  disgust: number;
  neutral: number;
  dominant: 'happiness' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' | 'neutral';
}

export interface FacialFeatures {
  age: number;
  gender: 'male' | 'female';
  ethnicity?: string;
  faceQuality: number;
  landmarks?: FacialLandmark[];
}

export interface FacialLandmark {
  name: string;
  x: number;
  y: number;
}

// Habits Types
export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  category: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  color?: string;
  isCompleted: boolean;
  completedDates: string[];
  createdAt: string;
  updatedAt: string;
}

export interface HabitStats {
  totalCompleted: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
}

// Chat Types
export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  response: string;
  emotionContext?: EmotionData;
  timestamp: string;
}

export interface DailyMessageLimit {
  used: number;
  limit: number;
  resetTime: string;
}

// Auth State Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Habits State Types
export interface HabitsState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
}

// Analysis State Types
export interface AnalysisState {
  analyses: FacialAnalysis[];
  currentAnalysis: FacialAnalysis | null;
  isLoading: boolean;
  error: string | null;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}