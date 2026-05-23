# GHOSTRA Dashboard

A React/TypeScript web interface for the GHOSTRA cognitive AI system.

## Overview

GHOSTRA Dashboard is a standalone frontend that connects to the GHOSTRA cognitive engine via a local bridge server on port 8765. It provides real-time monitoring and interaction with the GHOSTRA system including emotional telemetry, memory shard tracking, and a live chat interface.

Migrated from a vanilla JavaScript/Electron monolith to a decoupled React 18/TypeScript architecture.

## Stack

- React 18 with TypeScript
- Custom hooks for bridge communication
- CSS variables for theming
- Connects to GHOSTRA Python bridge via REST

## Running

```bash
npm install
npm start
```

Requires GHOSTRA bridge running on port 8765.

## Related

- [GHOSTRA](https://github.com/nghtmanward/GHOSTRA) — the cognitive engine this dashboard connects to