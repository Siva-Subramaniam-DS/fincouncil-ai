/**
 * Types for FinCouncil AI
 */

export type ViewType = 'landing' | 'dashboard' | 'agents' | 'recommendation' | 'learning' | 'architecture';

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
  instructions: string[];
  status: 'idle' | 'thinking' | 'completed';
  output?: string;
}

export interface RecommendedPrompt {
  id: string;
  text: string;
  icon: string;
  category: string;
}

export interface IntermediateStep {
  agentId: string;
  agentName: string;
  title: string;
  content: string;
  timestamp: string;
}

export interface DebateMessage {
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  avatar: string;
}

export interface AnalysisResult {
  query: string;
  confidenceScore: number;
  verdict: 'Bullish' | 'Slightly Bullish' | 'Neutral' | 'Bearish' | 'Highly Bearish';
  summary: string;
  bullCase: string[];
  bearCase: string[];
  riskAssessment: {
    level: 'Low' | 'Medium' | 'High';
    sizingLimit: string;
    stopLoss: string;
    warnings: string[];
  };
  educationalNotes: Array<{
    term: string;
    definition: string;
    actionableLesson: string;
  }>;
  debateHistory: DebateMessage[];
}

export interface Lesson {
  id: string;
  title: string;
  category: 'Investments' | 'Risk Management' | 'Macro' | 'Trading Metrics';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  summary: string;
  content: string[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}
