import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import { getBuildInfo } from '../../client/plugins/build-info'
import buildInfoPlugin from '../../client/plugins/build-info'

describe('build-info plugin', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-info-test-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  describe('getBuildInfo', () => {
    it('returns default values when files are missing', () => {
      const info = getBuildInfo({
        packageJsonPath: path.join(tmpDir, 'missing.json'),
      })

      expect(info.releaseVersion).toBe('[LOCAL BUILD]')
      expect(info.buildVersion).toMatch(/\d/)
    })

    it('reads releaseVersion from package.json', () => {
      const pkgPath = path.join(tmpDir, 'package.json')
      fs.writeFileSync(
        pkgPath,
        JSON.stringify({ releaseVersion: '11.0.4' })
      )

      const info = getBuildInfo({
        packageJsonPath: pkgPath,
      })

      expect(info.releaseVersion).toBe('11.0.4')
    })

    it('falls back to [LOCAL BUILD] when releaseVersion is not set', () => {
      const pkgPath = path.join(tmpDir, 'package.json')
      fs.writeFileSync(
        pkgPath,
        JSON.stringify({ releaseVersion: '[LOCAL BUILD]' })
      )

      const info = getBuildInfo({
        packageJsonPath: pkgPath,
      })

      expect(info.releaseVersion).toBe('[LOCAL BUILD]')
    })

    it('generates buildVersion as a date string', () => {
      const info = getBuildInfo({
        packageJsonPath: path.join(tmpDir, 'missing.json'),
      })

      // Should be a Norwegian locale date string like "3.5.2026, 19:30:00"
      expect(info.buildVersion).toMatch(/\d{1,2}\.\d{1,2}\.\d{4}/)
    })
  })

  describe('plugin', () => {
    it('returns a plugin with the correct name', () => {
      const plugin = buildInfoPlugin()
      expect(plugin.name).toBe('portal-build-info')
    })

    it('resolves virtual:build-info module id', () => {
      const plugin = buildInfoPlugin()
      const resolveId = plugin.resolveId as (
        id: string,
        importer?: string
      ) => string | undefined

      expect(resolveId('virtual:build-info')).toBe('\0virtual:build-info')
    })

    it('does not resolve other module ids', () => {
      const plugin = buildInfoPlugin()
      const resolveId = plugin.resolveId as (
        id: string,
        importer?: string
      ) => string | undefined

      expect(resolveId('some-other-module')).toBeUndefined()
    })

    it('loads virtual module with build info exports', () => {
      const plugin = buildInfoPlugin()
      const load = plugin.load as (id: string) => string | undefined

      const result = load('\0virtual:build-info')

      expect(result).toBeDefined()
      expect(result).toContain('export const releaseVersion')
      expect(result).toContain('export const buildVersion')
    })

    it('loads buildInfo.ts file with build info exports', () => {
      const plugin = buildInfoPlugin()
      const load = plugin.load as (id: string) => string | undefined

      const buildInfoPath = path.resolve(
        __dirname,
        '../../../src/shared/buildInfo.ts'
      )
      const result = load(buildInfoPath)

      expect(result).toBeDefined()
      expect(result).toContain('export const releaseVersion')
      expect(result).toContain('export const buildVersion')
    })

    it('does not load other module ids', () => {
      const plugin = buildInfoPlugin()
      const load = plugin.load as (id: string) => string | undefined

      expect(load('some-other-id')).toBeUndefined()
    })
  })
})
