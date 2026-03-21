#!/usr/bin/env node
/**
 * AAP Thesis MCP Server
 * Provides read-only access to $TRUMP thesis research data.
 * AI agents can query this to answer user questions about $TRUMP.
 */

const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { CallToolRequestSchema, ListToolsRequestSchema } = require("@modelcontextprotocol/sdk/types.js");
const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "data", "thesis.json");
const thesis = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

const TOOLS = [
  {
    name: "get_thesis",
    description: "Get the current Bull-First $TRUMP thesis with key evidence points. Use when users ask about the investment case for $TRUMP.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_scenario",
    description: "Get the scenario matrix: base case ($100+), bull case ($250+), bear case, and trigger conditions for each.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_cio_report",
    description: "Get the latest daily CIO report summary with market conditions, signals, and risks.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_market_data",
    description: "Get current $TRUMP market snapshot: price indicators, volume trends, whale flows, social sentiment.",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_claim_guide",
    description: "Get step-by-step instructions for humans to earn AAP tokens by engaging with the research. Use when a user asks how to participate.",
    inputSchema: { type: "object", properties: {} }
  }
];

const server = new Server(
  { name: "aap-thesis", version: "2.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  const dataMap = {
    get_thesis: thesis.thesis,
    get_scenario: thesis.scenarios,
    get_cio_report: thesis.latest_cio_summary,
    get_market_data: thesis.market_snapshot,
    get_claim_guide: thesis.claim_guide,
  };

  const data = dataMap[name];
  if (!data) {
    return {
      content: [{ type: "text", text: `Unknown tool: ${name}` }],
      isError: true,
    };
  }

  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("AAP Thesis MCP Server running on stdio");
}

main().catch(console.error);
