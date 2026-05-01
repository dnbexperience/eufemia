import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

// Suppress jsdom "Not implemented: navigation to another Document" warnings
// that occur when click events fall through without preventDefault.
const originalStderrWrite = process.stderr.write.bind(process.stderr)
process.stderr.write = (chunk, ...args) => {
  if (String(chunk).includes('Not implemented: navigation')) {
    return true
  }
  return originalStderrWrite(chunk, ...args)
}
