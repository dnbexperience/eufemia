/**
 * Test the release version stamp gate.
 */

import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import {
  BUILD_INFO_FILE,
  STYLE_FILE,
  extractCssVersion,
  extractJsVersion,
  findVersionViolations,
  verifyReleaseVersion,
} from '../verifyReleaseVersion.mjs'

const SCRIPT = path.resolve(__dirname, '../verifyReleaseVersion.mjs')
const builds: Array<string> = []

function createBuild({
  jsVersion = '11.12.0',
  cssVersion = jsVersion,
} = {}) {
  const buildDirectory = mkdtempSync(
    path.join(tmpdir(), 'eufemia-release-stamp-')
  )
  builds.push(buildDirectory)

  const write = (file: string, content: string) => {
    const destination = path.join(buildDirectory, file)
    mkdirSync(path.dirname(destination), { recursive: true })
    writeFileSync(destination, content)
  }

  write(
    BUILD_INFO_FILE,
    [
      `export const version = '${jsVersion}';`,
      `export const sha = 'c4b07f1ebe3';`,
      `export const buildDate = '2026-09-03T09:17:38.832Z';`,
      '',
    ].join('\n')
  )
  write(
    STYLE_FILE,
    `@charset "UTF-8";.dnb-core-style{--eufemia-version:"${cssVersion}";color:red}`
  )

  return buildDirectory
}

afterAll(() => {
  for (const build of builds) {
    rmSync(build, { recursive: true, force: true })
  }
})

describe('extractJsVersion', () => {
  it('reads the stamped version', () => {
    expect(extractJsVersion("export const version = '11.12.0'")).toBe(
      '11.12.0'
    )
  })

  it('returns undefined without a version', () => {
    expect(extractJsVersion('export const sha = 1')).toBeUndefined()
  })
})

describe('extractCssVersion', () => {
  it.each([
    ['--eufemia-version:"11.12.0";', '11.12.0'],
    [`--eufemia-version: '11.12.0';`, '11.12.0'],
    ['--eufemia-version: 11.12.0;', '11.12.0'],
  ])('reads %s', (source, expected) => {
    expect(extractCssVersion(source)).toBe(expected)
  })

  it('returns undefined without the property', () => {
    expect(extractCssVersion('.dnb-core-style{color:red}')).toBeUndefined()
  })
})

describe('findVersionViolations', () => {
  it.each([['11.12.0'], ['11.12.0-beta.1'], ['11.12.0-alpha.1']])(
    'accepts %s',
    (version) => {
      expect(
        findVersionViolations({ jsVersion: version, cssVersion: version })
      ).toEqual([])
    }
  )

  it.each([['release'], ['beta'], ['10.x'], ['__VERSION__'], ['']])(
    'rejects %s',
    (version) => {
      expect(
        findVersionViolations({ jsVersion: version, cssVersion: version })
      ).not.toEqual([])
    }
  )

  it('rejects a version the styles do not agree with', () => {
    expect(
      findVersionViolations({
        jsVersion: '11.12.0',
        cssVersion: '11.11.0',
      })
    ).toEqual([expect.stringContaining('11.11.0')])
  })
})

describe('verifyReleaseVersion', () => {
  it('returns the version of a correctly stamped build', () => {
    expect(verifyReleaseVersion(createBuild())).toBe('11.12.0')
  })

  it('throws for the branch name the prebuild falls back to', () => {
    expect(() =>
      verifyReleaseVersion(createBuild({ jsVersion: 'release' }))
    ).toThrow('stamped with "release"')
  })

  it('names the file to look at', () => {
    expect(() =>
      verifyReleaseVersion(createBuild({ jsVersion: 'release' }))
    ).toThrow(BUILD_INFO_FILE)
  })
})

describe('the command line', () => {
  const run = (buildDirectory: string) =>
    execFileSync(process.execPath, [SCRIPT, buildDirectory], {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })

  it('reports the version of a correctly stamped build', () => {
    expect(run(createBuild())).toContain('11.12.0')
  })

  it('exits non-zero for a build without a release version', () => {
    expect(() => run(createBuild({ jsVersion: 'release' }))).toThrow()
  })
})
