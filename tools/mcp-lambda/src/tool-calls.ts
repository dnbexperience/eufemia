import { AsyncLocalStorage } from 'node:async_hooks'

export type ToolCall = { name: string; input: unknown }

const requestToolCalls = new AsyncLocalStorage<ToolCall[]>()

/** The docs server's onToolCall hook: it fires only when a tool handler runs. */
export function recordToolCall(name: string, input: unknown): void {
  requestToolCalls.getStore()?.push({ name, input })
}

/** Runs one request and returns the tools that ran while it was handled. */
export async function withToolCalls<T>(
  run: () => Promise<T>
): Promise<{ result: T; toolCalls: ToolCall[] }> {
  const toolCalls: ToolCall[] = []
  const result = await requestToolCalls.run(toolCalls, run)
  return { result, toolCalls }
}
