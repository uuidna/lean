#!/usr/bin/env node
// mcp — Lean stdio. Inner catalog is this package; Cursor --cursor is one involution door.
import { qpuMcpFrameOf, qpuMcpTakeOf, qpuMcpCliRunOf } from '@uuidna/qpu/mcp'
import { QPU_TOOLS, qpuMcpCall, qpuMcpToolNames } from './mcp-catalog.js'
import { handleQpuMcpRpc, type McpRpc } from './mcp-rpc.js'
import { QPU_MCP_NAME } from './version.js'

const send = (msg: unknown) => {
  process.stdout.write(qpuMcpFrameOf(msg))
}

const isMain = (() => {
  if (typeof process === 'undefined' || !Array.isArray(process.argv) || process.argv[1] === undefined) return false
  const argv1 = String(process.argv[1])
  try {
    if (import.meta.url === new URL(`file://${argv1}`).href) return true
  } catch { /* windows paths */ }
  const tail = argv1.split(/[\\/]/).pop() ?? ''
  return tail === QPU_MCP_NAME || tail === 'qpu' || tail === 'lean' || tail === 'mcp.js' || tail === `${QPU_MCP_NAME}.js`
})()

const cli = async (): Promise<boolean> =>
  qpuMcpCliRunOf(process.argv.slice(2), qpuMcpCall, qpuMcpToolNames, 'npm run lean -- <tool> [json]')

const stdio = (): void => {
  let buf = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (chunk) => {
    buf += chunk
    const taken = qpuMcpTakeOf(buf)
    buf = taken.rest
    for (const msg of taken.msgs) {
      void handleQpuMcpRpc(msg).then((out) => { if (out) send(out) }).catch((e) => {
        if (msg.id !== undefined)
          send({ jsonrpc: '2.0', id: msg.id, error: { code: -32603, message: String(e) } })
      })
    }
  })
}

if (isMain) {
  void cli().then((done) => { if (!done) stdio() })
}

export { QPU_TOOLS, qpuMcpCall, qpuMcpToolNames, handleQpuMcpRpc }
