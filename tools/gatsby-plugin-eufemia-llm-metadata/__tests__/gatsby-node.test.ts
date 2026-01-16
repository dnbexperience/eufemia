import path from 'path'
import fs from 'fs'
import os from 'os'
jest.mock('prettier', () => ({
  format: async (code: string) => code,
}))
import {
  cleanDescription,
  convertMdxToMd,
  findSourceInfo,
  loadTsDocs,
  normalizeKeyCell,
  toSlugAndDir,
} from '../gatsby-node.helpers'

describe('gatsby-plugin-eufemia-llm-metadata helpers', () => {
  test('normalizeKeyCell splits and cleans keys', () => {
    expect(normalizeKeyCell('a or b')).toEqual(['a', 'b'])
    expect(normalizeKeyCell('<code>foo</code>')).toEqual(['foo'])
    expect(normalizeKeyCell('')).toEqual([])
  })

  test('cleanDescription converts basic markup', () => {
    const input =
      '<strong>bold</strong> and <code>x</code> &gt; &lt; &amp;'
    expect(cleanDescription(input)).toBe('"bold" and `x` > < &')
  })

  test('toSlugAndDir builds slug and output dir', () => {
    const { slug, dirForExtras } = toSlugAndDir(
      path.join('components', 'button.mdx')
    )
    expect(slug).toBe('/uilib/components/button/')
    expect(dirForExtras).toBe('uilib/components/button/')
  })

  test('convertMdxToMd inlines imports and normalizes examples', async () => {
    const tmpRoot = fs.mkdtempSync(
      path.join(os.tmpdir(), 'llm-mdx-')
    )
    const docsBaseRoot = path.join(tmpRoot, 'docs')
    const docsRoot = path.join(docsBaseRoot, 'uilib')
    fs.mkdirSync(docsRoot, { recursive: true })

    const examplePath = path.join(docsRoot, 'Examples.tsx')
    fs.writeFileSync(
      examplePath,
      [
        'export const ImageExample = () => {',
        '  const CustomImage = () => <div />',
        '  return <CustomImage />',
        '}',
        'export const InsideDrawer = () => <div />',
      ].join('\n')
    )

    const mdxPath = path.join(docsRoot, 'image.mdx')
    fs.writeFileSync(
      mdxPath,
      [
        'import {',
        '  ImageExample,',
        "} from './Examples'",
        '',
        '## Demos',
        '',
        '<ImageExample />',
        '',
        'import * as Examples from "./Examples"',
        '',
        '<Examples.InsideDrawer />',
      ].join('\n')
    )

    const output = await convertMdxToMd({
      inputPath: mdxPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).toContain('render(<CustomImage />)')
    expect(output).not.toContain('return <CustomImage />')
    expect(output).toContain('render(<div />)')
    expect(output).not.toContain('ImageExample,')
    expect(output).not.toContain("from './Examples'")
  })

  test('lead element resolves source in typography', async () => {
    const tsDocs = await loadTsDocs('elements/lead.mdx')
    expect(tsDocs.tsDocsDir).toContain(
      path.join('elements', 'typography')
    )
    const sourceInfo = tsDocs.tsDocsDir
      ? await findSourceInfo({
          tsDocsDir: tsDocs.tsDocsDir,
          name: 'Lead',
          version: '0.0.0-development',
        })
      : null
    expect(sourceInfo?.fileUrl).toContain(
      '/packages/dnb-eufemia/src/elements/typography/Lead.tsx'
    )
  })
})
