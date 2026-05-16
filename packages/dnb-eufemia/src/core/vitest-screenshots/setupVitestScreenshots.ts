/**
 * Vitest browser-mode setup for screenshot tests.
 *
 * In-iframe client surface. Heavy lifting (navigation, screenshot,
 * diff) happens server-side via the `makeScreenshot` BrowserCommand
 * registered in `vitest.config.screenshots.ts`.
 */

import {
  afterAll,
  beforeAll,
  expect,
  expect as vitestExpect,
} from 'vitest'
// @ts-expect-error
import { commands } from 'vitest/browser'

import { onMain, runOnMain, selectThemes } from './themeSelection.client'

import type {
  MakeScreenshotPayload,
  MakeScreenshotResult,
} from './commands/screenshotEngine'
import type { LoadImagePayload } from './commands/loadImage'

export { expect, beforeAll, afterAll }
export { onMain, runOnMain, selectThemes }

// @ts-expect-error
declare module 'vitest/internal/browser' {
  /* eslint-disable @typescript-eslint/consistent-type-definitions */
  interface BrowserCommands {
    makeScreenshot: (
      payload: MakeScreenshotPayload
    ) => Promise<MakeScreenshotResult>
    loadImage: (payload: LoadImagePayload) => Promise<{ base64: string }>
    matchImageSnapshot: (payload: {
      bytesBase64: string
      snapshotPath: string
      diffPath: string
      actualPath: string
      testFilePath: string
      fullName: string
      allowedMismatchedPixelRatio: number
      update: boolean
    }) => Promise<MakeScreenshotResult>
  }
}

type ActionName = 'click' | 'hover' | 'focus' | 'focusclick' | 'active'
type Action = {
  action?: ActionName
  selector?: string
  keypress?: string
}
type Simulate = Action | ActionName | (Action | ActionName)[]

type DescribeDefaults = {
  url: string | null
  themeName: string | null
  pageViewport: { width?: number; height?: number } | null
  headers: Record<string, string> | null
  fullscreen: boolean
  withWrapper: boolean | null
}

let describeDefaults: DescribeDefaults = {
  url: null,
  themeName: null,
  pageViewport: null,
  headers: null,
  fullscreen: false,
  withWrapper: null,
}

// @ts-expect-error
const env = (import.meta as unknown as { env?: Record<string, string> })
  .env
export const isCI = String(env?.CI) === 'true' || String(env?.CI) === '1'

export const setupPageScreenshot = ({
  url,
  themeName = null,
  pageViewport = null,
  headers = null,
  fullscreen = false,
  withWrapper = null,
}: {
  url?: string
  themeName?: string | null
  pageViewport?: { width?: number; height?: number } | null
  headers?: Record<string, string> | null
  fullscreen?: boolean
  withWrapper?: boolean | null
  timeout?: number
}) => {
  let previous: DescribeDefaults

  beforeAll(() => {
    previous = { ...describeDefaults }

    describeDefaults = {
      url: url ?? describeDefaults.url,
      themeName: themeName ?? describeDefaults.themeName,
      pageViewport: pageViewport ?? describeDefaults.pageViewport,
      headers: headers ?? describeDefaults.headers,
      fullscreen: fullscreen || describeDefaults.fullscreen,
      withWrapper: withWrapper ?? describeDefaults.withWrapper,
    }
  })

  afterAll(() => {
    describeDefaults = previous
  })
}

export type MakeScreenshotOptions = {
  url?: string
  themeName?: string
  pageViewport?: { width?: number; height?: number }
  headers?: Record<string, string>
  fullscreen?: boolean
  selector: string
  style?: Record<string, string>
  rootClassName?: string | string[]
  withWrapper?: boolean
  executeBeforeSimulate?: () => void
  simulate?: Simulate
  simulateAfter?: Simulate
  screenshotSelector?: string
  styleSelector?: string
  simulateSelector?: string
  wrapperStyle?: Record<string, string>
  recalculateHeightAfterSimulate?: boolean
}

const defaultAllowedMismatchedPixelRatio = 0

const sanitize = (input: string) =>
  input.replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '')

type SnapshotState = {
  testFilePath: string
  imageDir: string
  attachmentsDir: string
  describeStack: string[]
  testTitle: string
  perTitleCount: Map<string, number>
  update: boolean
  retry: number
}

const stateBySession = new WeakMap<object, SnapshotState>()

// We deliberately cap the per-test counter map so a single test file
// with many parameterised cases (Button, Table, …) cannot keep growing
// the bookkeeping table for the whole run. Each entry is keyed by the
// sanitised describe-stack + title, so a few hundred entries is more
// than enough; older keys are evicted FIFO.
const MAX_PER_TITLE_ENTRIES = 1024

const resolveSnapshotName = (state: SnapshotState) => {
  const titleSegments = [...state.describeStack, state.testTitle]
    .filter(Boolean)
    .map(sanitize)
  const baseName = titleSegments.join('-')

  const next = (state.perTitleCount.get(baseName) ?? 0) + 1
  state.perTitleCount.set(baseName, next)

  if (state.perTitleCount.size > MAX_PER_TITLE_ENTRIES) {
    const firstKey = state.perTitleCount.keys().next().value
    if (firstKey !== undefined) {
      state.perTitleCount.delete(firstKey)
    }
  }

  return `${baseName}-${next}`
}

const getSnapshotState = (): SnapshotState => {
  const s = vitestExpect.getState() as unknown as {
    testPath?: string
    currentTestName?: string
    snapshotState?: { _updateSnapshot?: string }
    task?: { result?: { retryCount?: number } }
  }

  if (!s.testPath) {
    throw new Error(
      'makeScreenshot: cannot resolve testPath from expect state'
    )
  }

  const key = s as unknown as object
  let state = stateBySession.get(key)

  if (!state) {
    const testFileDir = pathDirname(s.testPath)
    state = {
      testFilePath: s.testPath,
      imageDir: pathJoin(testFileDir, '__image_snapshots__'),
      attachmentsDir: pathJoin(
        testFileDir,
        '__image_snapshots__',
        '.diff'
      ),
      describeStack: [],
      testTitle: '',
      perTitleCount: new Map(),
      update: s.snapshotState?._updateSnapshot === 'all',
      retry: 0,
    }
    stateBySession.set(key, state)
  }

  state.update = s.snapshotState?._updateSnapshot === 'all'
  state.retry = s.task?.result?.retryCount ?? 0

  const fullName = s.currentTestName ?? ''
  const segments = fullName.split(' > ')
  state.testTitle = segments.pop() ?? ''
  state.describeStack = segments
  return state
}

function pathDirname(p: string) {
  const i = Math.max(p.lastIndexOf('/'), p.lastIndexOf('\\'))
  return i === -1 ? '' : p.slice(0, i)
}

function pathJoin(...parts: string[]) {
  return parts.filter(Boolean).join('/')
}

const serializeFn = (fn: (() => void) | undefined): string | null => {
  if (!fn) {
    return null
  }
  return fn.toString()
}

export const makeScreenshot = async (
  opts: MakeScreenshotOptions
): Promise<void> => {
  const state = getSnapshotState()
  const name = resolveSnapshotName(state)

  const snapshotPath = pathJoin(state.imageDir, `${name}.png`)
  const diffPath = pathJoin(state.attachmentsDir, `${name}.diff.png`)
  const actualPath = pathJoin(state.attachmentsDir, `${name}.actual.png`)
  const htmlDumpPath = pathJoin(state.attachmentsDir, `${name}.html`)

  const result = await commands.makeScreenshot({
    selector: opts.selector,
    url: opts.url ?? describeDefaults.url,
    themeName: opts.themeName ?? describeDefaults.themeName,
    fullscreen: Boolean(opts.fullscreen || describeDefaults.fullscreen),
    pageViewport:
      opts.pageViewport ?? describeDefaults.pageViewport ?? null,
    headers: opts.headers ?? describeDefaults.headers,
    style: opts.style ?? null,
    rootClassName: opts.rootClassName ?? null,
    withWrapper: opts.withWrapper ?? describeDefaults.withWrapper ?? null,
    executeBeforeSimulateSrc: serializeFn(opts.executeBeforeSimulate),
    simulate: opts.simulate ?? null,
    simulateAfter: opts.simulateAfter ?? null,
    screenshotSelector: opts.screenshotSelector ?? null,
    styleSelector: opts.styleSelector ?? null,
    simulateSelector: opts.simulateSelector ?? null,
    wrapperStyle: opts.wrapperStyle ?? null,
    recalculateHeightAfterSimulate: Boolean(
      opts.recalculateHeightAfterSimulate
    ),
    retry: state.retry,
    testFilePath: state.testFilePath,
    fullName: [...state.describeStack, state.testTitle]
      .filter(Boolean)
      .join(' > '),
    snapshotPath,
    diffPath,
    actualPath,
    htmlDumpPath,
    allowedMismatchedPixelRatio: defaultAllowedMismatchedPixelRatio,
    update: state.update,
  })

  switch (result.status) {
    case 'created':
    case 'updated':
    case 'match':
      return

    case 'size-mismatch':
      throw new Error(
        `Screenshot dimensions differ: reference ${result.reference.width}x${result.reference.height}, actual ${result.actual.width}x${result.actual.height}. Saved actual to ${result.actualPath}.`
      )

    case 'mismatch':
      throw new Error(
        `Screenshot mismatch: ${result.diffPixels} px differ (${(result.ratio * 100).toFixed(3)}%). Diff at ${result.diffPath}, actual at ${result.actualPath}.`
      )
  }
}
/**
 * Compatibility shim for the legacy `loadImage` + `expect(image).toMatchSnapshot()`
 * pattern used by `Logo.screenshot.test.ts`. Reads a file via the
 * server-side `loadImage` BrowserCommand and asserts byte-equality
 * against the same snapshot file the legacy reporter produces.
 *
 * Returns an opaque token; pass it directly to `expect(...).toMatchImageSnapshot()`.
 */
export const loadImage = async (
  imagePath: string
): Promise<Uint8Array> => {
  const { base64 } = await commands.loadImage({ imagePath })
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

const handleMatchResult = (result: MakeScreenshotResult) => {
  switch (result.status) {
    case 'created':
    case 'updated':
    case 'match':
      return
    case 'size-mismatch':
      throw new Error(
        `Image dimensions differ: reference ${result.reference.width}x${result.reference.height}, actual ${result.actual.width}x${result.actual.height}.`
      )
    case 'mismatch':
      throw new Error(
        `Image mismatch: ${result.diffPixels} px differ (${(result.ratio * 100).toFixed(3)}%).`
      )
  }
}

const bytesToBase64 = (bytes: Uint8Array) => {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

expect.extend({
  async toMatchImageSnapshot(received: unknown) {
    if (!(received instanceof Uint8Array)) {
      return {
        pass: false,
        message: () =>
          `toMatchImageSnapshot expected a Uint8Array but got ${typeof received}`,
      }
    }

    const state = getSnapshotState()
    const name = resolveSnapshotName(state)
    const snapshotPath = pathJoin(state.imageDir, `${name}.png`)
    const diffPath = pathJoin(state.attachmentsDir, `${name}.diff.png`)
    const actualPath = pathJoin(state.attachmentsDir, `${name}.actual.png`)

    const result = await commands.matchImageSnapshot({
      bytesBase64: bytesToBase64(received),
      snapshotPath,
      diffPath,
      actualPath,
      testFilePath: state.testFilePath,
      fullName: [...state.describeStack, state.testTitle]
        .filter(Boolean)
        .join(' > '),
      allowedMismatchedPixelRatio: defaultAllowedMismatchedPixelRatio,
      update: state.update,
    })

    try {
      handleMatchResult(result)
      return { pass: true, message: () => '' }
    } catch (e) {
      return {
        pass: false,
        message: () => (e as Error).message,
      }
    }
  },
})

declare module 'vitest' {
  interface Assertion<T> {
    toMatchImageSnapshot(): Promise<T>
  }
  interface AsymmetricMatchersContaining {
    toMatchImageSnapshot(): void
  }
}

/* eslint-enable @typescript-eslint/consistent-type-definitions */
