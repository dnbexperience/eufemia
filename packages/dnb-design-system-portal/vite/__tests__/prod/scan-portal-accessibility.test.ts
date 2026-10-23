import { expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  writeFile: vi.fn(async () => {}),
  goto: vi.fn(async () => ({ ok: () => true })),
  addInitScript: vi.fn(async (script) => script()),
}))

vi.mock('node:fs/promises', () => ({
  default: {
    readFile: vi.fn(async () => JSON.stringify({ pages: ['/'] })),
    writeFile: mocks.writeFile,
  },
}))

vi.mock('@axe-core/playwright', () => ({
  default: class {
    async analyze() {
      return { violations: [] }
    }
  },
}))

vi.mock('@playwright/test', () => ({
  chromium: {
    launch: async () => ({
      newContext: async () => ({
        addInitScript: mocks.addInitScript,
        newPage: async () => ({
          goto: mocks.goto,
          locator: () => ({
            waitFor: async () => {},
            evaluateAll: async () => [],
          }),
        }),
        close: async () => {},
      }),
      close: async () => {},
    }),
  },
}))

it('disables page-view tracking before loading a scanned page', async () => {
  const originalArgs = process.argv
  const beaconDescriptor = Object.getOwnPropertyDescriptor(
    Navigator.prototype,
    'sendBeacon'
  )
  const beaconValues = []
  Object.defineProperty(Navigator.prototype, 'sendBeacon', {
    configurable: true,
    value: vi.fn(),
  })
  mocks.goto.mockImplementation(async () => {
    beaconValues.push(navigator.sendBeacon)
    return { ok: () => true }
  })
  process.argv = [
    'node',
    'scan-portal-accessibility.mjs',
    '--base-url',
    'https://eufemia.dnb.no',
    '--sitemap',
    'sitemap.json',
    '--output',
    'report.json',
    '--issue-output',
    'issue.json',
  ]
  const stdout = vi.spyOn(process.stdout, 'write').mockReturnValue(true)

  try {
    await import('../../../scripts/scan-portal-accessibility.mjs')
    await vi.waitFor(() =>
      expect(mocks.writeFile).toHaveBeenCalledTimes(2)
    )
    expect(beaconValues).toEqual([undefined])
  } finally {
    process.argv = originalArgs
    stdout.mockRestore()
    if (beaconDescriptor) {
      Object.defineProperty(
        Navigator.prototype,
        'sendBeacon',
        beaconDescriptor
      )
    } else {
      Reflect.deleteProperty(Navigator.prototype, 'sendBeacon')
    }
  }
})
