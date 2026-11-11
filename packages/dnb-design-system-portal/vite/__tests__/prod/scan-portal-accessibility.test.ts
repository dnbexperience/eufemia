import { expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  writeFile: vi.fn<(path: string, data: string) => Promise<void>>(
    async () => {}
  ),
  goto: vi.fn<() => Promise<{ ok(): boolean; status?(): number }>>(
    async () => ({ ok: () => true })
  ),
  waitFor: vi.fn(async () => {}),
  waitForTimeout: vi.fn(async () => {}),
  addInitScript: vi.fn(async (script) => script()),
  emulateMedia: vi.fn(async () => {}),
  locator: vi.fn((selector: string) => ({
    waitFor: mocks.waitFor,
    evaluateAll: async () => [],
  })),
  analyze: vi.fn<(rules?: string[]) => Promise<{ violations: unknown[] }>>(
    async () => ({ violations: [] })
  ),
}))

const scanArgs = [
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

vi.mock('node:fs/promises', () => ({
  default: {
    readFile: vi.fn(async () => JSON.stringify({ pages: ['/'] })),
    writeFile: mocks.writeFile,
  },
}))

vi.mock('@axe-core/playwright', () => ({
  default: class {
    rules?: string[]

    withRules(rules: string[]) {
      this.rules = rules
      return this
    }

    async analyze() {
      return mocks.analyze(this.rules)
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
          waitForTimeout: mocks.waitForTimeout,
          emulateMedia: mocks.emulateMedia,
          evaluate: async () => {},
          locator: mocks.locator,
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
  process.argv = scanArgs
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

it('retries a page that fails to load', async () => {
  const originalArgs = process.argv
  mocks.writeFile.mockClear()
  mocks.goto
    .mockReset()
    .mockResolvedValueOnce({ ok: () => false, status: () => 503 })
  mocks.waitFor.mockRejectedValueOnce(
    new Error('locator.waitFor: Timeout 10000ms exceeded.')
  )
  process.argv = scanArgs
  const stdout = vi.spyOn(process.stdout, 'write').mockReturnValue(true)

  try {
    vi.resetModules()
    await import('../../../scripts/scan-portal-accessibility.mjs')
    await vi.waitFor(() =>
      expect(mocks.writeFile).toHaveBeenCalledTimes(2)
    )
    expect(mocks.goto).toHaveBeenCalledTimes(3)
    expect(mocks.waitForTimeout).toHaveBeenCalledTimes(2)
    expect(stdout).toHaveBeenCalledWith(
      'Retrying https://eufemia.dnb.no/: Page returned HTTP 503\n'
    )
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('0 axe findings and 0 errors')
    )
  } finally {
    process.argv = originalArgs
    stdout.mockRestore()
  }
})

it('checks dark mode on the loaded page without loading it again', async () => {
  const originalArgs = process.argv
  mocks.writeFile.mockClear()
  mocks.goto.mockClear()
  mocks.emulateMedia.mockClear()
  mocks.locator.mockClear()
  mocks.analyze.mockClear().mockImplementation(async (rules) => ({
    violations: rules
      ? [
          {
            id: 'color-contrast',
            impact: 'serious',
            help: 'Elements must meet minimum color contrast ratio thresholds',
            helpUrl:
              'https://dequeuniversity.com/rules/axe/color-contrast',
            nodes: [{ target: ['.dark-only'], failureSummary: 'Fix it' }],
          },
        ]
      : [],
  }))
  process.argv = [...scanArgs, '--color-schemes', 'light,dark']
  const stdout = vi.spyOn(process.stdout, 'write').mockReturnValue(true)

  try {
    vi.resetModules()
    await import('../../../scripts/scan-portal-accessibility.mjs')
    await vi.waitFor(() =>
      expect(mocks.writeFile).toHaveBeenCalledTimes(2)
    )
    expect(mocks.goto).toHaveBeenCalledTimes(1)
    expect(mocks.emulateMedia.mock.calls).toEqual([
      [{ colorScheme: 'light' }],
      [{ colorScheme: 'dark' }],
    ])
    expect(mocks.locator).toHaveBeenCalledWith(
      'body.eufemia-theme__color-scheme--dark'
    )
    expect(mocks.analyze.mock.calls).toEqual([
      [undefined],
      [['color-contrast', 'link-in-text-block']],
    ])

    const report = JSON.parse(mocks.writeFile.mock.calls[0][1])
    expect(report.findings).toEqual([
      expect.objectContaining({
        page: '/',
        colorScheme: 'dark',
        id: 'color-contrast',
      }),
    ])
  } finally {
    process.argv = originalArgs
    stdout.mockRestore()
    mocks.analyze.mockReset()
  }
})
