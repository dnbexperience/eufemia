import fs from 'fs'
import os from 'os'
import path from 'path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  formatFailureMessage,
  formatFullName,
  getFailedTestKey,
  resolveExpectedImagePath,
  selectFailedTestAttempt,
  type FailedTestEntry,
} from '../screenshotReporter'

const tempDirs: string[] = []

afterEach(() => {
  while (tempDirs.length > 0) {
    const tempDir = tempDirs.pop()

    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  }
})

function createTempDir() {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'screenshot-reporter-')
  )

  tempDirs.push(tempDir)

  return tempDir
}

function makeFailedTestEntry(
  overrides: Partial<FailedTestEntry> = {}
): FailedTestEntry {
  return {
    testFilePath:
      '/repo/src/components/textarea/__tests__/Textarea.screenshot.test.ts',
    relativeTestFilePath:
      'src/components/textarea/__tests__/Textarea.screenshot.test.ts',
    fullName:
      'Textarea.screenshot.test.ts › Textarea for ui › have to match different sizes',
    title: 'have to match different sizes',
    message: 'Error: failed',
    expectedImagePath: null,
    actualImagePath: null,
    diffImagePath: null,
    dataVisualTestId: 'textarea-sizes',
    lineNumber: 146,
    ...overrides,
  }
}

describe('resolveExpectedImagePath', () => {
  it('prefers the artifact-local expected image when it exists', () => {
    const tempDir = createTempDir()
    const testResultsDir = path.join(tempDir, 'test-results', 'case')

    fs.mkdirSync(testResultsDir, { recursive: true })

    const actualImagePath = path.join(testResultsDir, 'example-actual.png')
    const artifactExpectedImagePath = path.join(
      testResultsDir,
      'example-expected.png'
    )
    const checkedInExpectedImagePath = path.join(
      tempDir,
      'src',
      'example.png'
    )

    fs.writeFileSync(actualImagePath, '')
    fs.writeFileSync(artifactExpectedImagePath, '')

    expect(
      resolveExpectedImagePath({
        expectedImagePath: checkedInExpectedImagePath,
        actualImagePath,
        diffImagePath: null,
      })
    ).toBe(artifactExpectedImagePath)
  })

  it('keeps the original expected image path when no artifact-local copy exists', () => {
    const tempDir = createTempDir()
    const checkedInExpectedImagePath = path.join(
      tempDir,
      'src',
      'example.png'
    )
    const actualImagePath = path.join(
      tempDir,
      'test-results',
      'case',
      'example-actual.png'
    )

    expect(
      resolveExpectedImagePath({
        expectedImagePath: checkedInExpectedImagePath,
        actualImagePath,
        diffImagePath: null,
      })
    ).toBe(checkedInExpectedImagePath)
  })
})

describe('formatFailureMessage', () => {
  it('strips ANSI escape sequences before rendering HTML line breaks', () => {
    expect(
      formatFailureMessage([
        'Error: \u001b[2mexpect(\u001b[22m\u001b[31mBuffer\u001b[39m\u001b[2m).\u001b[22mtoMatchSnapshot failed',
        'Details',
      ])
    ).toBe('Error: expect(Buffer).toMatchSnapshot failed<br />Details')
  })
})

describe('formatFullName', () => {
  it('removes empty title path segments before joining', () => {
    expect(
      formatFullName([
        '',
        '',
        'extensions/forms/Field/PhoneNumber/__tests__/PhoneNumber.screenshot.test.ts',
        'PhoneNumber for ui',
        'have to match with a label',
      ])
    ).toBe(
      'extensions/forms/Field/PhoneNumber/__tests__/PhoneNumber.screenshot.test.ts › PhoneNumber for ui › have to match with a label'
    )
  })
})

describe('retry collapse helpers', () => {
  it('uses the same key for repeated failures of the same test', () => {
    const first = makeFailedTestEntry()
    const retry = makeFailedTestEntry({ message: 'Error: retry failed' })

    expect(getFailedTestKey(first)).toBe(getFailedTestKey(retry))
  })

  it('prefers the attempt with image attachments', () => {
    const previous = makeFailedTestEntry({
      message: 'Error: page.evaluate: The operation is insecure.',
    })
    const next = makeFailedTestEntry({
      expectedImagePath: '/tmp/example-expected.png',
      actualImagePath: '/tmp/example-actual.png',
      diffImagePath: '/tmp/example-diff.png',
      message: 'Error: expect(Buffer).toMatchSnapshot failed',
    })

    expect(selectFailedTestAttempt({ previous, next })).toBe(next)
  })

  it('prefers the latest attempt when attachment coverage is equal', () => {
    const previous = makeFailedTestEntry({
      message: 'Error: first failure',
    })
    const next = makeFailedTestEntry({ message: 'Error: retry failure' })

    expect(selectFailedTestAttempt({ previous, next })).toBe(next)
  })
})
