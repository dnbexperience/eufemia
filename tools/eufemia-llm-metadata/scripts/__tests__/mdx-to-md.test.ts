import fs from 'fs'
import os from 'os'
import path from 'path'
import { jest } from '@jest/globals'

jest.unstable_mockModule('prettier', () => ({
  format: async (code: string) => code,
  default: { format: async (code: string) => code },
}))

const { convertMdxToMd } = await import('../mdx-to-md.ts')

describe('mdx-to-md converter', () => {
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
