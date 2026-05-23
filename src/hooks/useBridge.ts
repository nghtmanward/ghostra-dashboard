import { useState, useEffect, useCallback } from 'react';
import { Shard, HistoryEntry, BridgeConnectionState, GHOSTRASettings } from '../types';

const DEFAULT_BRIDGE = 'http://localhost:8765';

export function useBridge(bridgeUrl: string = DEFAULT_BRIDGE) {
  const [connectionState, setConnectionState] = useState<BridgeConnectionState>('offline');
  const [shards, setShards] = useState<Shard[]>([]);

  const loadShards = useCallback(async () => {
    try {
      const res = await fetch(`${bridgeUrl}/shards`, { mode: 'cors' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const loaded: Shard[] = Array.isArray(data) ? data : (data.shards || []);
      setShards(loaded);
      setConnectionState('online');
    } catch {
      setConnectionState('offline');
    }
  }, [bridgeUrl]);

  const checkStatus = useCallback(async () => {
    try {
      setConnectionState('connecting');
      const res = await fetch(`${bridgeUrl}/status`, {
        mode: 'cors',
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) { setConnectionState('online'); loadShards(); }
      else setConnectionState('offline');
    } catch {
      setConnectionState('offline');
    }
  }, [bridgeUrl, loadShards]);

  const sendChat = useCallback(async (
    message: string,
    history: HistoryEntry[],
    shards: Shard[]
  ): Promise<string> => {
    const res = await fetch(`${bridgeUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history: history.slice(-20),
        shards: shards.slice(0, 3),
        shard_context: '',
      }),
      mode: 'cors',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.response || data.message || data.text || 'No response.';
  }, [bridgeUrl]);

  const saveSettings = useCallback(async (settings: GHOSTRASettings): Promise<void> => {
    await fetch(`${bridgeUrl}/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
      mode: 'cors',
    });
  }, [bridgeUrl]);

  const testConnection = useCallback(async (url: string): Promise<boolean> => {
    try {
      const res = await fetch(`${url}/status`, {
        mode: 'cors',
        signal: AbortSignal.timeout(3000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  const shutdownLLM = useCallback(async (): Promise<void> => {
    await fetch(`${bridgeUrl}/shutdown-llm`, { method: 'POST', mode: 'cors' });
  }, [bridgeUrl]);

  useEffect(() => {
    checkStatus();
    const interval = setInterval(loadShards, 30000);
    return () => clearInterval(interval);
  }, [checkStatus, loadShards]);

  return {
    connectionState,
    shards,
    sendChat,
    saveSettings,
    testConnection,
    shutdownLLM,
    reload: checkStatus,
  };
}