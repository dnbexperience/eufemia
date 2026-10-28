import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  getSocialImage,
  socialImageTags,
  socialDetailTags,
} from '../../src/shared/social-image.mjs'
const file = 'images/' + 'a'.repeat(64) + '.png'
const manifest = {
  '/uilib/components/button/': {
    file,
    alt: 'Button "DNB" & example',
    kind: 'screenshot',
  },
}
test('reuses screenshots for tab routes and strips tracking parameters', () => {
  assert.equal(
    getSocialImage('/uilib/components/button/demos/?x=1#example', manifest)
      ?.url,
    'https://assets.eufemia.dnb.no/og/' + file
  )
})
test('omits image tags without a screenshot and rejects legacy artwork', () => {
  assert.equal(getSocialImage('/unknown/', manifest), null)
  assert.equal(
    getSocialImage('/bad/', {
      '/bad/': { file: '../bad.png', kind: 'screenshot' },
    }),
    null
  )
  assert.equal(
    getSocialImage('/guide/', { '/guide/': { file, alt: 'Old artwork' } }),
    null
  )
  assert.deepEqual(socialImageTags('/unknown/', manifest), [])
})
test('escapes screenshot alt text and provides image dimensions', () => {
  const html = socialImageTags('/uilib/components/button/', manifest).join(
    ''
  )
  assert.ok(html.includes('Button &quot;DNB&quot; &amp; example'))
  assert.ok(html.includes('summary_large_image'))
  assert.ok(html.includes('content="630"'))
  assert.ok(html.includes('property="og:image:width" content="1200"'))
})
test('serves OG images from the shared Eufemia assets host', () => {
  const image = getSocialImage('/uilib/components/button/', manifest)
  assert.ok(image)
  const url = new URL(image.url)
  assert.equal(url.origin, 'https://assets.eufemia.dnb.no')
  assert.equal(url.pathname, '/og/' + file)
  const html = socialImageTags('/uilib/components/button/', manifest).join(
    ''
  )
  assert.ok(html.includes('content="' + image.url + '"'))
})
test('emits only title and description without extra fields', () => {
  const html = socialDetailTags(
    'Filter',
    'Search & narrow down results.'
  ).join('')
  assert.ok(html.includes('name="twitter:title" content="Filter"'))
  assert.ok(
    html.includes(
      'name="twitter:description" content="Search &amp; narrow down results."'
    )
  )
  assert.ok(!html.includes('twitter:label'))
})
