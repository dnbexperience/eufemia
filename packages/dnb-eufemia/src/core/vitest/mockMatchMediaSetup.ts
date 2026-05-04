/**
 * ESM-compatible mock-match-media setup for vitest.
 *
 * Replaces `mock-match-media/jest-setup` (CJS) to avoid the dual-package
 * hazard: jest-setup.cjs uses require("./") which loads a separate CJS
 * module instance from the ESM import used by test files. This means
 * setMedia() operates on a different MQLs map than the polyfilled
 * window.matchMedia, so change events never fire.
 *
 * By importing from 'mock-match-media' (ESM), the polyfill and the test
 * code share the same module instance.
 */
import { matchMedia, MediaQueryListEvent, cleanup } from 'mock-match-media'
import { afterEach } from 'vitest'

if (typeof window !== 'undefined') {
  window.matchMedia = matchMedia as typeof window.matchMedia
}

if (
  typeof globalThis !== 'undefined' &&
  !('MediaQueryListEvent' in globalThis)
) {
  ;(globalThis as Record<string, unknown>).MediaQueryListEvent =
    MediaQueryListEvent
}

afterEach(() => {
  cleanup()
})
