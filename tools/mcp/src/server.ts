import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

const server = new McpServer(
  { name: 'my-mcp-server', version: '1.0.0' },
  { debouncedNotificationMethods: [] }
)

// Register a tool
server.tool('hello', { name: z.string() }, async ({ name }) => ({
  content: [{ type: 'text', text: `Hello, ${name}!` }],
}))

export default server
