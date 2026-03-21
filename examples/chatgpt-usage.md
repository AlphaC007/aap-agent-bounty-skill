# Using AAP Thesis with ChatGPT

## Via MCP Bridge

If your ChatGPT setup supports MCP tools, configure:

```json
{
  "name": "aap-thesis",
  "command": "node",
  "args": ["src/server.js"],
  "type": "stdio"
}
```

## Via Direct API

The thesis data is also available as a static JSON file at:
`src/data/thesis.json`

You can include this in your system prompt or RAG pipeline.
