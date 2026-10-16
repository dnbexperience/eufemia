import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Testing Library only cleans up on its own when Vitest globals are enabled.
// Unmounting also clears pending timers before jsdom is torn down.
afterEach(() => {
  cleanup()
})

// Suppress jsdom "Not implemented: navigation to another Document" warnings
// that occur when click events fall through without preventDefault.
const originalStderrWrite = process.stderr.write.bind(process.stderr)
process.stderr.write = (chunk, ...args) => {
  if (String(chunk).includes('Not implemented: navigation')) {
    return true
  }
  return originalStderrWrite(chunk, ...args)
}
