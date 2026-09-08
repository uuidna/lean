#!/usr/bin/env node
// mcp — executable QPU MCP. JSON-RPC 2.0 over stdio. Also: --list · --call <tool> [json]
import { QPU_TOOLS, qpuMcpCall, qpuMcpToolNames } from './mcp-catalog.js'
import { handleQpuMcpRpc, type McpRpc } from './mcp-rpc.js'
import { QPU_MCP_NAME } from './version.js'

const send = (msg: unknown) => {
  process.stdout.write(`${JSON.stringify(msg)}\n`)
}

const isMain = (() => {
  if (typeof process === 'undefined' || !Array.isArray(process.argv) || process.argv[1] === undefined) return false
  const argv1 = String(process.argv[1])
  try {
    if (import.meta.url === new URL(`file://${argv1}`).href) return true
  } catch { /* windows paths */ }
  const tail = argv1.split(/[\\/]/).pop() ?? ''
  return tail === QPU_MCP_NAME || tail === 'qpu' || tail === 'mcp.js' || tail === `${QPU_MCP_NAME}.js`
})()

const cli = async (): Promise<boolean> => {
  const argv = process.argv.slice(2)
  if (argv[0] === '--list') {
    process.stdout.write(`${qpuMcpToolNames().join('\n')}\n`)
    return true
  }
  if (argv[0] === '--call') {
    const name = argv[1]
    if (!name) {
      process.stderr.write('usage: qpu --call <tool> [json]\n')
      process.exitCode = 1
      return true
    }
    let args: Record<string, unknown> = {}
    if (argv[2]) {
      try { args = JSON.parse(argv[2]) as Record<string, unknown> } catch {
        process.stderr.write('qpu --call: arguments must be JSON\n')
        process.exitCode = 1
        return true
      }
    }
    const out = await qpuMcpCall(name, args)
    process.stdout.write(`${typeof out === 'string' ? out : JSON.stringify(out, null, 2)}\n`)
    return true
  }
  return false
}

const stdio = (): void => {
  let buf = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (chunk) => {
    buf += chunk
    let i = buf.indexOf('\n')
    while (i >= 0) {
      const line = buf.slice(0, i).trim()
      buf = buf.slice(i + 1)
      if (line) {
        let msg: McpRpc
        try { msg = JSON.parse(line) as McpRpc } catch { i = buf.indexOf('\n'); continue }
        void handleQpuMcpRpc(msg).then((out) => { if (out) send(out) }).catch((e) => {
          if (msg.id !== undefined)
            send({ jsonrpc: '2.0', id: msg.id, error: { code: -32603, message: String(e) } })
        })
      }
      i = buf.indexOf('\n')
    }
  })
}

if (isMain) {
  void cli().then((done) => { if (!done) stdio() })
}

export { QPU_TOOLS, qpuMcpCall, qpuMcpToolNames, handleQpuMcpRpc }
