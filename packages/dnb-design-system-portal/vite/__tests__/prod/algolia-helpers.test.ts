import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect, vi } from 'vitest'
import {
  shouldIncludeInAlgolia,
  excludedSlugPartials,
  replaceAlgoliaRecords,
} from '../../prod/algolia-helpers.mjs'
import { getSlugFromMdastHeading } from '../../../src/uilib/utils/slug.mjs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import { visit } from 'unist-util-visit'
import { headingIdCases } from '../../../src/uilib/utils/__tests__/headingIdCases'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const portalRoot = path.resolve(__dirname, '../..')

describe('algolia-helpers', () => {
  it('prepares settings and records before atomically replacing the live index', async () => {
    const content = 'Use `<button>` & `<Td>` and keep &lt;literal&gt;.'
    const records = [{ objectID: 'web/components/button', content }]
    const settings = { attributeForDistinct: 'url', distinct: true }
    const operations: string[] = []
    const operation = (name: string, result = {}) =>
      vi.fn(() => ({
        wait: vi.fn(async () => {
          operations.push(name)
          return result
        }),
      }))
    const temporary = {
      setSettings: operation('settings'),
      saveObjects: operation('records', {
        objectIDs: ['web/components/button'],
      }),
      delete: operation('delete'),
    }
    const client = {
      initIndex: vi.fn((_name: string) => temporary),
      copyIndex: operation('copy'),
      moveIndex: operation('move'),
    }
    await expect(
      replaceAlgoliaRecords(client, 'docs', records, settings)
    ).resolves.toEqual({
      objectIDs: ['web/components/button'],
    })
    const temporaryName = client.initIndex.mock.calls[0][0]
    expect(temporaryName).not.toBe('docs')
    expect(client.copyIndex).toHaveBeenCalledWith('docs', temporaryName, {
      scope: ['settings', 'synonyms', 'rules'],
    })
    expect(temporary.setSettings).toHaveBeenCalledWith(settings)
    expect(temporary.saveObjects).toHaveBeenCalledWith([
      {
        ...records[0],
        content:
          'Use `&lt;button&gt;` &amp; `&lt;Td&gt;` and keep &amp;lt;literal&amp;gt;.',
      },
    ])
    expect(records[0].content).toBe(content)
    expect(client.moveIndex).toHaveBeenCalledWith(temporaryName, 'docs')
    expect(operations).toEqual(['copy', 'settings', 'records', 'move'])
    expect(temporary.delete).not.toHaveBeenCalled()
  })

  it('keeps the live index untouched and cleans up when preparation fails', async () => {
    const error = new Error('Upload failed')
    const wait = vi.fn().mockResolvedValue({})
    const temporary = {
      setSettings: vi.fn(() => ({ wait })),
      saveObjects: vi.fn(() => ({
        wait: vi.fn().mockRejectedValue(error),
      })),
      delete: vi.fn(() => ({ wait })),
    }
    const client = {
      initIndex: vi.fn(() => temporary),
      copyIndex: vi.fn(() => ({ wait })),
      moveIndex: vi.fn(),
    }
    await expect(
      replaceAlgoliaRecords(client, 'docs', [], {})
    ).rejects.toBe(error)
    expect(client.moveIndex).not.toHaveBeenCalled()
    expect(temporary.delete).toHaveBeenCalledOnce()
  })
  describe('heading slugs', () => {
    // Mirrors how push-algolia walks a document: it holds an mdast node.
    function firstHeading(markdown: string) {
      let node = null
      visit(
        unified().use(remarkParse).use(remarkMdx).parse(markdown),
        'heading',
        (found) => {
          node = node || found
        }
      )
      return node
    }

    it.each(headingIdCases)(
      'indexes $name under the id the page renders',
      ({ markdown, id }) => {
        expect(
          getSlugFromMdastHeading(firstHeading(`## ${markdown}`))
        ).toBe(id)
      }
    )
  })

  describe('shouldIncludeInAlgolia', () => {
    it('excludes internal visual-test fixtures', () => {
      expect(
        shouldIncludeInAlgolia({
          slug: 'web/components/button/visual-tests',
        })
      ).toBe(false)
    })

    it('excludes contentless navigation entries', () => {
      expect(
        shouldIncludeInAlgolia({ slug: 'web/get-started', route: false })
      ).toBe(false)
      expect(
        shouldIncludeInAlgolia({
          slug: 'web/get-started/how-eufemia-works',
          route: true,
        })
      ).toBe(true)
    })
    it('should include a regular page', () => {
      expect(
        shouldIncludeInAlgolia({ slug: '/uilib/components/button' })
      ).toBe(true)
    })

    it('should exclude not_in_use pages', () => {
      expect(
        shouldIncludeInAlgolia({ slug: '/uilib/not_in_use/old-page' })
      ).toBe(false)
    })

    it('should exclude drafts', () => {
      expect(
        shouldIncludeInAlgolia({
          slug: '/uilib/components/button',
          draft: true,
        })
      ).toBe(false)
    })

    it.each(excludedSlugPartials)(
      'should exclude pages matching "%s"',
      (partial) => {
        expect(
          shouldIncludeInAlgolia({ slug: `${partial}some-page` })
        ).toBe(false)
      }
    )
  })

  describe('push-algolia.mjs', () => {
    // The child process boots the whole page graph. The test budget has to
    // outlast the execFileSync timeout below, so a hung script is reported
    // as a script failure rather than as a test timeout.
    it('should run under plain Node without module resolution errors', () => {
      const script = path.resolve(portalRoot, 'prod/push-algolia.mjs')

      expect(() => {
        execFileSync(process.execPath, [script, '--dry-run'], {
          cwd: portalRoot,
          stdio: 'pipe',
          timeout: 30_000,
        })
      }).not.toThrow()
    }, 60_000)
  })
})
