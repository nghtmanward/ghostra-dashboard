import React from 'react';
import { BridgeConnectionState } from '../types';

interface Props {
  state: BridgeConnectionState;
}

const LABELS: Record<BridgeConnectionState, string> = {
  online:     'ONLINE',
  offline:    'OFFLINE',
  connecting: 'LINKING...',
};

export const BridgeStatus: React.FC<Props> = ({ state }) => (
  <div className="bridge-status">
    <div className={`status-dot ${state === 'online' ? 'online' : state === 'connecting' ? 'connecting' : ''}`} />
    <span>{LABELS[state]}</span>
  </div>
);