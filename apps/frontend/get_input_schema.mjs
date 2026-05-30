import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "/home/albert_vardanyan_2016/.config/opencode/scripts/stitch-proxy.sh",
  });
  const client = new Client({ name: "test", version: "1.0" }, { capabilities: {} });
  await client.connect(transport);
  const tools = await client.listTools();
  const tool = tools.tools.find(t => t.name === 'generate_screen_from_text');
  console.log(JSON.stringify(tool.inputSchema, null, 2));
  process.exit(0);
}
main().catch(console.error);
