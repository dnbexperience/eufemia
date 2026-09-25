import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  discoverRoutes,
  routeToSlug,
} from '../../../scripts/duplicate-id-scan/routes.mts'

let dir: string

beforeAll(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'routes-'))
  const write = (relative: string) => {
    const full = path.join(dir, relative)
    fs.mkdirSync(path.dirname(full), { recursive: true })
    fs.writeFileSync(full, '<html></html>')
  }
  write('index.html')
  write('uilib/components/button/index.html')
  write('uilib/components/anchor/demos/index.html')
  write('assets/chunk/index.html') // top-level assets — skipped
  write('server/index.html') // SSR bundle — skipped
  write('uilib/components/button/app.js') // not an index.html
})

afterAll(() => {
  fs.rmSync(dir, { recursive: true, force: true })
})

describe('discoverRoutes', () => {
  it('returns one route per index.html, skipping assets and server', () => {
    expect(discoverRoutes(dir)).toEqual([
      '/',
      '/uilib/components/anchor/demos/',
      '/uilib/components/button/',
    ])
  })
})

describe('routeToSlug', () => {
  it('strips leading and trailing slashes', () => {
    expect(routeToSlug('/uilib/components/button/')).toBe(
      'uilib/components/button'
    )
  })

  it('maps the root route to an empty string', () => {
    expect(routeToSlug('/')).toBe('')
  })
})
