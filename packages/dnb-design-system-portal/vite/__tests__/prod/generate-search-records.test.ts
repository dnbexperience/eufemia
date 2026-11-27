// @vitest-environment node
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, expect, it } from 'vitest'
import { generateSearchRecords } from '../../search/generate-search-records.ts'

let directory: string
afterEach(async () => {
  await fs.rm(directory, { recursive: true, force: true })
})

it('converts imported prose, preserves canonical tab routes and applies search exclusions independently of crawler rules', async () => {
  directory = await fs.mkdtemp(path.join(os.tmpdir(), 'portal-search-'))
  const docsDir = path.join(directory, 'src/docs')
  const write = async (file: string, value: string) => {
    const target = path.join(directory, file)
    await fs.mkdir(path.dirname(target), { recursive: true })
    await fs.writeFile(target, value)
  }
  await write('static/robots.txt', 'User-agent: *\nDisallow: /blocked')
  await write(
    'src/docs/renamed.mdx',
    "---\nslug: /web/button/\ntitle: Button\nshowTabs: true\n---\nimport Content from './_content.mdx'\nimport Demos from './demos.mdx'\n\n<Content />\n<Demos />"
  )
  await write(
    'src/docs/_content.mdx',
    "import Demos from './demos.mdx'\n\n## Use inline code\nImported body-only search phrase.\n<Demos />"
  )
  await write(
    'src/docs/properties.mdx',
    '---\nslug: /web/button/properties/\nshowTabs: true\n---\n## Properties\nProperty descriptions.'
  )
  await write(
    'src/docs/overview.mdx',
    '---\nslug: /web/button/overview/\nshowTabs: true\n---\n## Overview\nRedirect only.'
  )
  await write(
    'src/docs/demos.mdx',
    '---\nslug: /web/button/demos/\nshowTabs: true\n---\n## Demos\nExamples.\n### Primary button\nPrimary action.'
  )
  await write(
    'src/docs/hidden.mdx',
    '---\ntitle: Hidden\nsearch: false\n---\nHidden body.'
  )
  await write('src/docs/group.mdx', '---\nroute: false\n---')
  await write(
    'src/docs/group/child.mdx',
    '---\ntitle: Child\n---\nVisible child.'
  )
  await write('src/docs/draft.mdx', '---\ndraft: true\n---')
  await write(
    'src/docs/draft/child.mdx',
    '---\ntitle: Draft child\n---\nDraft body.'
  )
  await write(
    'src/docs/blocked.mdx',
    '---\ntitle: Blocked\n---\nBlocked body.'
  )
  await write(
    'src/docs/searchable.mdx',
    '---\nsearch: Searchable category\nroute: false\n---'
  )
  await write(
    'src/docs/searchable/details.mdx',
    '## Details\nCategory details.'
  )

  const records = await generateSearchRecords({ docsDir })
  expect(JSON.stringify(records)).not.toContain('Demos />')
  expect(new Set(records.map(({ slug }) => slug))).toEqual(
    new Set([
      'web/button',
      'web/button/demos',
      'web/button/properties',
      'group/child',
      'searchable/details',
      'blocked',
    ])
  )
  expect(
    records.find(({ hash }) => hash === 'use-inline-code')?.content
  ).toContain('Imported body-only search phrase.')
  expect(
    records
      .filter(({ title }) => title === 'Primary button')
      .map(({ url }) => url)
  ).toEqual(['/web/button/demos/#primary-button'])
  expect(
    records.find(({ slug }) => slug === 'web/button/properties')?.pageTitle
  ).toBe('Button → Properties')
  expect(
    records.find(({ slug }) => slug === 'searchable/details')?.pageTitle
  ).toBe('Searchable category → Details')

  const renderedDir = path.join(directory, 'public')
  await expect(
    generateSearchRecords({ docsDir, renderedDir })
  ).rejects.toThrow('ENOENT')
  await write(
    'public/web/button/index.html',
    '<main><h2>Use inline code<a class="anchor-hash" id="actual-anchor">#</a></h2><h2>Demos<a class="anchor-hash" id="demos">#</a></h2><h3>Primary button<a class="anchor-hash" id="primary-button">#</a></h3></main>'
  )
  await write(
    'public/web/button/demos/index.html',
    '<main><h2>Demos<a class="anchor-hash" id="demos">#</a></h2><h3>Primary button<a class="anchor-hash" id="primary-button">#</a></h3></main>'
  )
  await write(
    'public/web/button/properties/index.html',
    '<main><h2>Properties<a class="anchor-hash" id="properties">#</a></h2></main>'
  )
  await write('public/group/child/index.html', '<main></main>')
  await write('public/searchable/details/index.html', '<main></main>')
  await write('public/blocked/index.html', '<main></main>')
  const rendered = await generateSearchRecords({ docsDir, renderedDir })
  expect(rendered.find(({ hash }) => hash === 'actual-anchor')?.url).toBe(
    '/web/button/#actual-anchor'
  )
  expect(rendered.some(({ hash }) => hash === 'use-inline-code')).toBe(
    false
  )
  expect(
    rendered
      .filter(({ title }) => title === 'Primary button')
      .map(({ url }) => url)
  ).toEqual(['/web/button/demos/#primary-button'])
})

it('preserves independently authored content, unrelated pages and complete section chunks', async () => {
  directory = await fs.mkdtemp(path.join(os.tmpdir(), 'portal-search-'))
  const content = 'Primary action guidance. '.repeat(200)
  const pages = [
    { slug: 'web/button', title: 'Button', body: content },
    { slug: 'web/button/demos', body: content },
    {
      slug: 'web/button/properties',
      body: content + 'Additional property guidance.',
    },
    { slug: 'web/button/small', title: 'Small button', body: content },
    { slug: 'web/link', title: 'Link', body: content },
    { slug: 'ios/button', title: 'Button', body: content },
  ]
  for (const [index, { slug, title, body }] of pages.entries()) {
    await fs.writeFile(
      path.join(directory, index + '.mdx'),
      [
        '---',
        'slug: /' + slug + '/',
        title ? 'title: ' + title : '',
        'showTabs: true',
        '---',
        '## Primary button',
        body,
      ].join('\n')
    )
  }

  const records = (
    await generateSearchRecords({ docsDir: directory })
  ).filter(({ hash }) => hash === 'primary-button')
  const expectedSlugs = [
    'web/button',
    'web/button/demos',
    'web/button/properties',
    'web/button/small',
    'web/link',
    'ios/button',
  ]
  expect(new Set(records.map(({ slug }) => slug))).toEqual(
    new Set(expectedSlugs)
  )
  for (const slug of expectedSlugs) {
    expect(records.filter((record) => record.slug === slug)).toHaveLength(
      2
    )
  }
  expect(
    records.filter(({ slug }) => slug === 'web/button/properties').at(-1)
      ?.content
  ).toContain('Additional property guidance.')
})
