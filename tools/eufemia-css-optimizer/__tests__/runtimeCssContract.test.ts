import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import {
  buildPrefixIndex,
  deriveClassDependencies,
} from '../src/deriveDependencies.ts'
import { generateStyleManifest } from '../src/generateStyleManifest.ts'

const sourceRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../packages/dnb-eufemia/src'
)
const manifest = generateStyleManifest({ sourceRoot })
const prefixIndex = buildPrefixIndex(Object.keys(manifest.entries))
const excludedDirectories = new Set([
  '__mocks__',
  '__tests__',
  'stories',
  'style',
])

function listSourceFiles(dir: string): string[] {
  const files: string[] = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) {
        files.push(...listSourceFiles(fullPath))
      }
    } else if (
      /\.tsx?$/.test(entry.name) &&
      !/\.(?:test|spec|stories|docs)\.tsx?$/.test(entry.name) &&
      !/Docs\.tsx?$/.test(entry.name) &&
      !entry.name.endsWith('.d.ts')
    ) {
      files.push(fullPath)
    }
  }

  return files
}

describe('runtime CSS dependency contract', () => {
  it('represents every literal component class emitted by shippable source', () => {
    for (const entry of Object.values(manifest.entries)) {
      if (entry.name === 'forms') {
        continue
      }

      const sourceDir = path.join(sourceRoot, entry.group, entry.name)

      for (const file of listSourceFiles(sourceDir)) {
        const content = fs.readFileSync(file, 'utf-8')

        for (const owner of deriveClassDependencies(
          content,
          entry.name,
          prefixIndex
        )) {
          expect(
            entry.dependencies,
            `${path.relative(sourceRoot, file)} emits classes owned by ${owner}`
          ).toContain(owner)
        }
      }
    }
  })

  it('represents every literal component class emitted by Forms members', () => {
    const formsDir = path.join(sourceRoot, 'extensions', 'forms')

    for (const [member, dependencies] of Object.entries(
      manifest.formsFieldDependencies
    )) {
      const [namespace, name] = member.split('.')
      const memberDir = path.join(formsDir, namespace, name)
      const closure = new Set([
        ...manifest.entries.forms.dependencies,
        ...dependencies,
      ])

      for (const file of listSourceFiles(memberDir)) {
        const content = fs.readFileSync(file, 'utf-8')

        for (const owner of deriveClassDependencies(
          content,
          'forms',
          prefixIndex
        )) {
          expect(
            closure,
            `${path.relative(sourceRoot, file)} emits classes owned by ${owner}`
          ).toContain(owner)
        }
      }
    }
  })
})
