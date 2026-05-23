import React, { useState } from 'react';
import { useBridge } from './hooks/useBridge';
import { ChatPanel } from './components/ChatPanel';
import { HUDDisplay } from './components/HUDDisplay';
import { StatusLights } from './components/StatusLights';
import { EmotionalState, MemoryState, Metrics, LightStates } from './types';
import './App.css';

const DEFAULT_EMOTION: EmotionalState = { emotion: 'neutral', valence: 0, arousal: 0, tension: 0 };
const DEFAULT_MEMORY: MemoryState     = { count: 0, limit: 0, moodBaseline: 0, curiosity: 0, emotionality: 0 };
const DEFAULT_METRICS: Metrics        = { loss: 0, predictionLoss: 0, anomaly: 0 };
const DEFAULT_LIGHTS: LightStates     = { cognitive: 'off', bridge: 'off', memory: 'off', shards: 'off' };

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [emotion]  = useState<EmotionalState>(DEFAULT_EMOTION);
  const [memory]   = useState<MemoryState>(DEFAULT_MEMORY);
  const [metrics]  = useState<Metrics>(DEFAULT_METRICS);
  const [lights]   = useState<LightStates>(DEFAULT_LIGHTS);

  const { connectionState, shards, sendChat } = useBridge();

  return (
    <div className="app">
      <div className="titlebar">
        <h1>The Ghost Stirs...</h1>
        <button className="settings-btn" onClick={() => setSettingsOpen(!settingsOpen)}>⚙ SETTINGS</button>
      </div>

      <div className="hud-wrapper">
        <div className="ghost-container">
          <HUDDisplay emotion={emotion} memory={memory} metrics={metrics} />
          <StatusLights lights={lights} shardCount={shards.length} />
        </div>
      </div>

      <ChatPanel
        connectionState={connectionState}
        shardCount={shards.length}
        shards={shards}
        onSend={sendChat}
      />
    </div>
  );
}