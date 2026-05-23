import React from 'react';
import { EmotionalState, MemoryState, Metrics } from '../types';

interface Props {
  emotion: EmotionalState;
  memory: MemoryState;
  metrics: Metrics;
}

export const HUDDisplay: React.FC<Props> = ({ emotion, memory, metrics }) => (
  <>
    <div id="status-row">
      <div className="status-block">
        <span className="status-label">Emotional tell</span>
        <div className="status-line">Emotion: <span>{emotion.emotion}</span></div>
        <div className="status-line">Valence: <span>{emotion.valence.toFixed(2)}</span></div>
        <div className="status-line">Arousal: <span>{emotion.arousal.toFixed(2)}</span></div>
        <div className="status-line">Tension: <span>{emotion.tension.toFixed(2)}</span></div>
      </div>
      <div className="status-block">
        <span className="status-label">Memory & mood</span>
        <div className="status-line">Episodes: <span>{memory.count}/{memory.limit}</span></div>
        <div className="status-line">Mood baseline: <span>{memory.moodBaseline.toFixed(2)}</span></div>
        <div className="status-line">Curiosity: <span>{memory.curiosity.toFixed(2)}</span></div>
        <div className="status-line">Emotionality: <span>{memory.emotionality.toFixed(2)}</span></div>
      </div>
    </div>
    <div className="metrics-line">
      Loss: <span style={{ color: 'var(--ghost)' }}>{metrics.loss.toFixed(4)}</span>&nbsp;
      Pred: <span style={{ color: 'var(--ghost)' }}>{metrics.predictionLoss.toFixed(4)}</span>&nbsp;
      Anom: <span style={{ color: 'var(--ghost)' }}>{metrics.anomaly.toFixed(4)}</span>
    </div>
  </>
);