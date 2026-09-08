// mcp-rpc — JSON-RPC 2.0 MCP. Workers-safe. Stdio and HTTP share this handler.
import { QPU_TOOLS, qpuMcpCall, qpuMcpToolNames } from './mcp-catalog.js'
import type { QpuEnv } from './bindings/env.js'
import { QPU_HOST } from './hologram.js'
import { QPU_MCP_NAME, QPU_MCP_PROTOCOL, QPU_VERSION } from './version.js'

export type JsonId = string | number | null

export interface McpRpc {
  jsonrpc?: string
  id?: JsonId
  method?: string
  params?: { protocolVersion?: string; name?: string; arguments?: Record<string, unknown> }
}

const INSTRUCTIONS = [
  'QPU — three readings of one machine: empty seat, BindingPoint width, hologram.',
  'Tools return constructors. Seat stays empty. Lean proofs live on uuidna.',
  'Live JSON: https://lean.uuidna.com  Stdio: npx @uuidna/qpu',
].join(' ')

export const qpuMcpDiscoveryOf = (origin: string) => ({
  server: QPU_MCP_NAME,
  transport: 'streamable-http (JSON-RPC 2.0)',
  protocolVersion: QPU_MCP_PROTOCOL,
  endpoint: `${origin}/mcp`,
  tools: qpuMcpToolNames(),
  note: 'POST initialize · tools/list · tools/call · ping. Same catalog as npx @uuidna/qpu. Scale: /ws /sse /scale /fractal.',
  websocket: `${origin}/ws`,
  sse: `${origin}/sse`,
  scale: `${origin}/scale`,
  fractal: `${origin}/fractal`,
})

const listed = () =>
  QPU_TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema }))

export async function handleQpuMcpRpc(msg: McpRpc, env?: QpuEnv): Promise<object | null> {
  const id = msg.id
  const method = msg.method
  const params = msg.params ?? {}
  if (!method) {
    if (id === undefined) return null
    return { jsonrpc: '2.0', id, error: { code: -32600, message: 'missing method' } }
  }
  if (method === 'notifications/initialized' || method === 'initialized' || method === 'notifications/cancelled')
    return null
  if (id === undefined && method.startsWith('notifications/')) return null

  const result = async (r: unknown) => ({ jsonrpc: '2.0', id, result: r })
  const error = (code: number, message: string) => ({ jsonrpc: '2.0', id, error: { code, message } })

  if (method === 'initialize') {
    return result({
      protocolVersion: params.protocolVersion || QPU_MCP_PROTOCOL,
      capabilities: { tools: {} },
      serverInfo: { name: QPU_MCP_NAME, version: QPU_VERSION },
      instructions: INSTRUCTIONS,
    })
  }
  if (method === 'ping') return result({})
  if (method === 'tools/list') return result({ tools: listed() })
  if (method === 'tools/call') {
    const name = String(params.name ?? '')
    try {
      const out = await qpuMcpCall(name, params.arguments ?? {}, env)
      const text = typeof out === 'string' ? out : JSON.stringify(out)
      return result({ content: [{ type: 'text', text }] })
    } catch (e) {
      return error(-32602, String((e as Error).message || e))
    }
  }
  return error(-32601, `method not found: ${method}`)
}

export const qpuMcpHost = QPU_HOST
