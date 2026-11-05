import fs from 'fs'
import os from 'os'
import path from 'path'
import { vi } from 'vitest'

vi.mock('prettier', () => ({
  format: async (code: string) => code,
  default: { format: async (code: string) => code },
}))

import { convertMdxToMd } from '../mdx-to-md.ts'

describe('mdx-to-md converter', () => {
  it.each([
    ['web/patterns-and-extensions/ai.mdx', true],
    ['web/patterns-and-extensions/ai/Message.mdx', true],
    ['web/patterns-and-extensions/ai/Message/properties.mdx', true],
    ['web/patterns-and-extensions/ai/integrations.mdx', true],
    ['web/patterns-and-extensions/ai-other.mdx', false],
    ['uilib/components/button.mdx', false],
  ])(
    'includes the experimental notice only on AI pages: %s',
    async (route, experimental) => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-notice-'))
      const inputPath = path.join(root, route)
      fs.mkdirSync(path.dirname(inputPath), { recursive: true })
      fs.writeFileSync(
        inputPath,
        '---\ntitle: Example\n---\n\nPage content.'
      )
      try {
        const output = await convertMdxToMd({
          inputPath,
          docsRoot: root,
          prettierConfig: {},
          includeFrontmatter: true,
          state: { mdxCache: new Map(), inProgress: new Set() },
        })
        expect(output.includes('**Experimental:**')).toBe(experimental)
        expect(output).toContain('Page content.')
      } finally {
        fs.rmSync(root, { recursive: true, force: true })
      }
    }
  )

  it('includes the shared usage note when converting a properties page directly', async () => {
    const docsRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-props-'))
    const inputPath = path.join(docsRoot, 'properties.mdx')
    fs.writeFileSync(inputPath, '## Properties\n\nProperty descriptions.')

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).toContain('need a use case approved by DNB UX')
    expect(output).toContain(
      '/web/styling-and-themes/configuration/component-properties/#intended-use-and-customization'
    )
    expect(output).toContain('Property descriptions.')
  })

  it('inlines imports and normalizes examples', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-to-md-'))
    const docsRoot = path.join(tmpRoot, 'docs')
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
})
