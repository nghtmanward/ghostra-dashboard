export interface Shard {
  id: string;
  content: string;
  timestamp?: string;
  [key: string]: unknown;
}

export interface ChatMessage {
  role: 'user' | 'ghost';
  content: string;
  timestamp: string;
}

export interface HistoryEntry {
  role: 'user' | 'assistant';
  content: string;
}

export interface EmotionalState {
  emotion: string;
  valence: number;
  arousal: number;
  tension: number;
}

export interface MemoryState {
  count: number;
  limit: number;
  moodBaseline: number;
  curiosity: number;
  emotionality: number;
}

export interface Metrics {
  loss: number;
  predictionLoss: number;
  anomaly: number;
}

export type LightState = 'green' | 'yellow' | 'red' | 'off';

export interface LightStates {
  cognitive: LightState;
  bridge: LightState;
  memory: LightState;
  shards: LightState;
}

export interface LLMModels {
  chat: string;
  fragment: string;
  reasoning: string;
  code: string;
  math: string;
  memory: string;
  safety: string;
  default: string;
}

export interface ImportantDate {
  name: string;
  date: string;
  type: 'birthday' | 'anniversary' | 'milestone' | 'custom';
}

export interface GHOSTRASettings {
  operator: {
    name: string;
    role: string;
    notes: string;
  };
  ghost: {
    purpose: string;
    phase: 'rapport' | 'presence' | 'discovery';
  };
  llm: {
    bridge_url: string;
    chat_tokens: number;
    frag_tokens: number;
    models: LLMModels;
  };
  ui: {
    font_size: number;
    accent_color: string;
    bg_color: string;
  };
  dates: ImportantDate[];
}

export type BridgeConnectionState = 'online' | 'offline' | 'connecting';