import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "/home/albert_vardanyan_2016/.config/opencode/scripts/stitch-proxy.sh",
  });
  
  const client = new Client(
    { name: "test-client", version: "1.0.0" },
    { capabilities: {} }
  );

  await client.connect(transport);
  
  const tools = await client.listTools();
  console.log("Tools available:", JSON.stringify(tools, null, 2));

  // If there's a generate or design tool, let's look at it
  const stitchTool = tools.tools.find(t => t.name.includes('generate') || t.name.includes('design') || t.name.includes('stitch'));
  
  if (stitchTool) {
     console.log("Found tool:", stitchTool.name);
     console.log("Schema:", JSON.stringify(stitchTool.inputSchema, null, 2));
  } else {
     console.log("No generate tool found.");
  }
  
  process.exit(0);
}

main().catch(console.error);
