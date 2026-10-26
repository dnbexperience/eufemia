import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractCard, discoverRoutes, normalizeRoute } from './content.mts'

test('extracts only screenshot inputs and a readable title without heading permalinks', () => {
  const card = extractCard(
    '<title>Button | Eufemia</title><link rel="stylesheet" href="/assets/theme-a.css"><script src="/assets/page-b.js"></script><main><nav><h1>Navigation</h1></nav><h1>Button<a href="#button">#</a></h1><h2>Variants</h2><p>A useful description.</p><div class="dnb-live-preview"><button>Continue</button></div></main>',
    '/uilib/components/button/'
  )
  assert.deepEqual(card, {
    route: '/uilib/components/button/',
    title: 'Button',
    captureSelector: '.dnb-live-preview',
    captureRoute: '/uilib/components/button/',
    assets: ['/assets/page-b.js', '/assets/theme-a.css'],
  })
})

test('falls back to the document title and keeps entity text', () => {
  assert.equal(
    extractCard(
      '<title>Text &amp; labels | Eufemia</title><main></main>',
      '/guide/'
    ).title,
    'Text & labels'
  )
  assert.equal(extractCard('<main></main>', '/empty/').title, 'Eufemia')
  const long = extractCard(
    '<main><h1>' + 'Long title '.repeat(20) + '</h1></main>',
    '/long/'
  ).title
  assert.ok(long.length <= 90)
  assert.ok(long.endsWith('…'))
})

test('discovers a Demos tab even when the parent page has no live example', () => {
  const card = extractCard(
    '<main><h1>Button</h1><a href="/uilib/components/button/demos">Demos</a></main>',
    '/uilib/components/button/'
  )
  assert.equal(card.captureRoute, '/uilib/components/button/demos/')
  assert.equal(card.captureSelector, '.dnb-live-preview')
})

test('keeps guides and pages without demos text-only', () => {
  assert.equal(
    extractCard(
      '<main><h1>Guide</h1><div class="dnb-live-preview">Example</div></main>',
      '/guide/'
    ).captureSelector,
    null
  )
  assert.equal(
    extractCard(
      '<main><h1>Button</h1></main>',
      '/uilib/components/button/'
    ).captureSelector,
    null
  )
})

test('discovers only same-origin documentation routes and removes queries and fragments', () => {
  const routes = discoverRoutes(
    '- [Button](https://eufemia.dnb.no/uilib/components/button.md)\n- [Bad](https://example.com/x.md)\n- [Guide](https://eufemia.dnb.no/guide/.md)',
    'https://eufemia.dnb.no'
  )
  assert.deepEqual(routes, ['/', '/guide/', '/uilib/components/button/'])
  assert.equal(
    normalizeRoute('/uilib/components/button/demos/?x=1#example'),
    '/uilib/components/button/demos/'
  )
})
