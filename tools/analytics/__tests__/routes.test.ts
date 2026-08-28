import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const handlerSource = readFileSync(
  path.resolve(dir, '../src/lambda/index.ts'),
  'utf8'
)
const infraSource = readFileSync(
  path.resolve(dir, '../infra/main.tf'),
  'utf8'
)

/**
 * `METHOD /path` pairs the Lambda routes in its `handler` switch.
 *
 * Parses the literal `method === 'X' && path === '/y'` guards; a refactor to a
 * different routing style would need this parser (and the size check below)
 * updated so it cannot silently match nothing.
 */
function routesServedByHandler(): Set<string> {
  const routes = new Set<string>()
  const pattern = /method === '(\w+)'\s*&&\s*path === '(\/[\w-]*)'/g

  for (const [, method, route] of handlerSource.matchAll(pattern)) {
    routes.add(`${method} ${route}`)
  }

  return routes
}

/** `METHOD /path` pairs the API Gateway exposes via `route_key` in main.tf. */
function routesDeclaredInInfra(): Set<string> {
  const routes = new Set<string>()
  const pattern = /route_key\s*=\s*"(\w+ \/[\w-]*)"/g

  for (const [, route] of infraSource.matchAll(pattern)) {
    routes.add(route)
  }

  return routes
}

describe('routing contract', () => {
  it('exposes an API Gateway route for every path the handler serves', () => {
    const served = routesServedByHandler()
    const declared = routesDeclaredInInfra()

    // Sanity check the parsers actually matched something.
    expect(served.size).toBeGreaterThan(0)
    expect(declared.size).toBeGreaterThan(0)

    const missingInInfra = [...served].filter((r) => !declared.has(r))
    const missingInHandler = [...declared].filter((r) => !served.has(r))

    expect(missingInInfra).toEqual([])
    expect(missingInHandler).toEqual([])
  })
})
