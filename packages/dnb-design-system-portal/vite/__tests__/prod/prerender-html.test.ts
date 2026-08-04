import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  injectHtml,
  buildRedirectHtml,
} from '../../prod/prerender-html.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const prodDir = path.resolve(__dirname, '../../prod')

describe('prerender-html (shared HTML builders)', () => {
  const template = [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <title id="head-title">Default Title</title>',
    '</head>',
    '<body>',
    '  <div id="root"></div>',
    '</body>',
    '</html>',
  ].join('\n')

  describe('injectHtml', () => {
    it('injects app HTML and the provided content script', () => {
      const result = injectHtml(
        template,
        '<h1>Hi</h1>',
        { js: [], css: [] },
        'CONTENT_SCRIPT_MARKER'
      )
      expect(result).toContain('<div id="root"><h1>Hi</h1></div>')
      expect(result).toContain('CONTENT_SCRIPT_MARKER')
    })

    it('emits only the default theme enabled; others disabled', () => {
      const result = injectHtml(
        template,
        '<h1>Hi</h1>',
        { js: [], css: [] },
        '',
        undefined,
        undefined,
        {
          ui: '/assets/eufemia-theme-ui.css',
          sbanken: '/assets/eufemia-theme-sbanken.css',
        }
      )
      expect(result).toContain(
        '<link rel="stylesheet" crossorigin href="/assets/eufemia-theme-ui.css" data-eufemia-theme="ui">'
      )
      expect(result).toContain('data-eufemia-theme="sbanken" disabled>')
    })
  })

  describe('buildRedirectHtml', () => {
    it('builds a refresh + canonical redirect page', () => {
      const html = buildRedirectHtml('/target/')
      expect(html).toContain(
        'http-equiv="refresh" content="0;url=/target/"'
      )
      expect(html).toContain('<link rel="canonical" href="/target/">')
    })
  })

  // Drift guard: the bug that motivated extracting this module was a fix
  // landing in only one of two duplicated injectHtml copies. Ensure the
  // build entry and the typed facade both import the shared module and
  // never re-declare the builders inline.
  describe('no duplicated implementations', () => {
    it('prerender.mjs imports the builders and does not redefine them', () => {
      const src = fs.readFileSync(
        path.join(prodDir, 'prerender.mjs'),
        'utf-8'
      )
      expect(src).toContain("from './prerender-html.mjs'")
      expect(src).not.toMatch(/function\s+injectHtml\s*\(/)
      expect(src).not.toMatch(/function\s+buildRedirectHtml\s*\(/)
    })

    it('prerender-utils.ts imports the builders from the shared module', () => {
      const src = fs.readFileSync(
        path.join(prodDir, 'prerender-utils.ts'),
        'utf-8'
      )
      expect(src).toContain("from './prerender-html.mjs'")
    })
  })
})
