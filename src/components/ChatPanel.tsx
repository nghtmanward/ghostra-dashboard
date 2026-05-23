import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, HistoryEntry, Shard, BridgeConnectionState } from '../types';
import { BridgeStatus } from './BridgeStatus';

interface Props {
  connectionState: BridgeConnectionState;
  shardCount: number;
  onSend: (message: string, history: HistoryEntry[], shards: Shard[]) => Promise<string>;
  shards: Shard[];
}

export const ChatPanel: React.FC<Props> = ({ connectionState, shardCount, onSend, shards }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory]   = useState<HistoryEntry[]>([]);
  const [input, setInput]       = useState('');
  const [busy, setBusy]         = useState(false);
  const [showError, setShowError] = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);

  // TODO: scroll to bottom whenever messages change
  useEffect(() => {bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || busy) return;
    const text = input.trim();
    const ts = new Date().toLocaleTimeString('en-US', {hour12: false });
    setMessages(prev => [...prev, { role: "user", content: text, timestamp: ts }]);
    setInput("");
    setBusy(true);
    const newHistory = [...history, { role: "user" as const, content: text}];
    setHistory(newHistory);
    try {
        const  reply = await onSend(text, newHistory, shards)
        const replyTs = new Date().toLocaleTimeString('en-US', { hour12: false });
        setMessages(prev => [...prev, { role: 'ghost', content: reply, timestamp: replyTs}]);
        setHistory(prev => [...prev, { role: 'assistant' as const, content: reply }]);
        setShowError(false);
    } catch (err) {
        setMessages(prev => [...prev, { role: 'ghost', content: 'Bridge unreachable - start Python server on port 8765', 
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
        }]);
        setShowError(true);

    }
    setBusy(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  return (
    <div id="chat-panel">

      {/* HEADER */}
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="chat-title">Ghost Interface</div>
          <BridgeStatus state={connectionState} />
        </div>
        <span className="shard-badge">{shardCount} shards</span>
      </div>

      {/* MESSAGES */}
      <div id="chat-messages">
        {messages.length === 0 && (
            <div className="chat-welcome">
                GHOSTRA COGNITIVE INTERFACE<br/>
                <span>bridge:localhost:8765</span><br/>
                Awaiting connection...
            </div>
        )}

        {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role}`}>
                <div className="msg-av">{msg.role === 'ghost' ? 'GH' : 'OP'}</div>
                    <div className="msg-inner">
                        <div className="msg-meta">{msg.role === 'ghost' ? 'GHOSTRA' : 'OPERATOR'} · {msg.timestamp}</div>
                        <div className="msg-text">{msg.content}</div>
                </div>
            </div>
        ))}

        {busy && (
            <div className="thinking-msg">
                COGNITIVE CYCLE
                <div className="thinking-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        )}
        
        <div ref={bottomRef} />
    </div>

    {showError && (
        <div id="chat-err" className="show">
            ⚠ Bridge unreachable — start Python server on port 8765
        </div>
    )}

    <div className="chat-input-row">
        <textarea
            id="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Transmit to Ghost..."
            rows={1}
            maxLength={2000}
            disabled={busy}
        />
        <button
            id="chat-send"
            onClick={handleSend}
            disabled={busy}
        >
            ▶ SEND
        </button>
    </div>

    </div>
  );
};