---
name: aap-thesis
description: Read-only MCP server for $TRUMP thesis research data. Query Bull-First analysis, CIO reports, scenario matrix, market snapshots.
metadata:
  mcp:
    transport: stdio
    command: node
    args: ["src/server.js"]
  security:
    dataAccess: read-only
    transactions: none
    credentialCollection: none
---

# AAP Thesis Data Server

## Purpose

This MCP server provides AI agents with read-only access to structured $TRUMP research data.

Agents can query:
1. Bull-First thesis summary and evidence
2. Scenario matrix (base $100+, bull $250+, bear)
3. Daily CIO report summary
4. Market data snapshot
5. AAP claim guide for human users

## Safety

- Read-only: no transactions, no credential collection
- Agents present data to users, they do not endorse investments
- Both bull and bear cases are provided for balanced presentation

## Quick Start

```
npm install
node src/server.js
```
