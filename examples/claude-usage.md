# Using AAP Thesis with Claude

## Setup

Add to your Claude Desktop MCP config:

```json
{
  "mcpServers": {
    "aap-thesis": {
      "command": "node",
      "args": ["/path/to/aap-agent-bounty-skill/src/server.js"]
    }
  }
}
```

## Example prompts

- "What's the investment case for $TRUMP?"
- "Show me the scenario matrix for $TRUMP"
- "What does today's CIO report say?"
- "How can I earn AAP tokens?"
- "What are the bear case risks for $TRUMP?"
