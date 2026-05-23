import React from 'react';
import { LightStates } from '../types';

interface Props {
  lights: LightStates;
  shardCount: number;
}

export const StatusLights: React.FC<Props> = ({ lights, shardCount }) => {
  const items: { key: keyof LightStates; label: string }[] = [
    { key: 'cognitive', label: 'Cognitive Loop' },
    { key: 'bridge',    label: 'LLM Bridge' },
    { key: 'memory',    label: 'Memory' },
    { key: 'shards',    label: `Shards (${shardCount})` },
  ];

  return (
    <div id="status-lights">
      {items.map(({ key, label }) => (
        <div key={key} className="light-item">
          <div className={`status-light ${lights[key]}`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};