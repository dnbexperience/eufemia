import { expect, it } from 'vitest'
import { readRenderedToc } from '../../prod/portal-toc'

it('reads rendered headings and inline code while excluding examples and hidden content', () => {
  expect(
    readRenderedToc(`
    <h2>Outside main<a class="anchor-hash" id="outside">#</a></h2>
    <main>
      <h1>Title<a class="anchor-hash" id="title">#</a></h1>
      <h2>Use <code>TableOfContent.Root</code><a class="anchor-hash" id="root">#</a><span class="dnb-aria-live">Copied</span></h2>
      <section><h3>Imported &amp; rendered<a class="anchor-hash" id="imported">#</a></h3></section>
      <div hidden><h2>Hidden<a class="anchor-hash" id="hidden">#</a></h2></div>
      <div style="display: none"><h2>Hidden<a class="anchor-hash" id="inline-hidden">#</a></h2></div>
      <div aria-hidden="true"><h2>Hidden too<a class="anchor-hash" id="hidden-too">#</a></h2></div>
      <div class="dnb-live-code-editor"><h2>Example<a class="anchor-hash" id="example">#</a></h2></div>
      <div class="dnb-table-of-content"><h2>TOC<a class="anchor-hash" id="toc">#</a></h2></div>
      <h2>No permalink</h2>
    </main>
  `)
  ).toEqual([
    { id: 'title', level: 1, text: ['Title'] },
    {
      id: 'root',
      level: 2,
      text: ['Use ', { code: 'TableOfContent.Root' }],
    },
    { id: 'imported', level: 3, text: ['Imported & rendered'] },
  ])
})
