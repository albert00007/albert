import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "fs";

async function main() {
  const transport = new StdioClientTransport({
    command: "/home/albert_vardanyan_2016/.config/opencode/scripts/stitch-proxy.sh",
  });
  const client = new Client({ name: "test", version: "1.0" }, { capabilities: {} });
  await client.connect(transport);
  
  // 1. Create a project
  console.log("Creating project...");
  const createResult = await client.callTool({
    name: "create_project",
    arguments: { title: "MSD Redesign" }
  });
  
  const createData = JSON.parse(createResult.content[0].text);
  const projectId = createData.name.split('/').pop();
  console.log("Using Project ID:", projectId);

  // 2. Generate screen
  const prompt = "Landing page for IT organization MicroStateDev (MSD). Must be a dark theme. Use Rich Black (#09090B) and Graphite (#18181B) for backgrounds. Use Neon Purple (#8B5CF6), Indigo (#6366F1), and Soft Cyan (#67E8F9) for gradients, buttons, and accents. Include a Header, About Us section, Services section, and a Footer. Must have a glowing gradient 'Contact Us' (Связаться) button in the header. Use professional, modern layout. Output must be React/Next.js and Tailwind CSS compatible code.";
  
  console.log("Generating screen...");
  const genResult = await client.callTool({
    name: "generate_screen_from_text",
    arguments: {
      projectId: projectId,
      prompt: prompt,
      deviceType: "DESKTOP"
    }
  }, { timeout: 120000 });
  
  fs.writeFileSync('stitch_result.json', JSON.stringify(genResult, null, 2));
  console.log("Generated and saved to stitch_result.json");
  
  process.exit(0);
}
main().catch(console.error);
