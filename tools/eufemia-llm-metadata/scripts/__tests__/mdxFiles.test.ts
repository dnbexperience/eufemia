import fs from 'fs'
import os from 'os'
import path from 'path'

import {
  findMdxFiles,
  parseFrontmatter,
  parseFrontmatterScalar,
  readFrontmatter,
} from '../../src/extensions/mdx/mdxFiles.ts'

describe('mdxFiles', () => {
  it('parseFrontmatterScalar coerces booleans, null, numbers and strings', () => {
    expect(parseFrontmatterScalar('true')).toBe(true)
    expect(parseFrontmatterScalar('false')).toBe(false)
    expect(parseFrontmatterScalar('null')).toBeNull()
    expect(parseFrontmatterScalar('42')).toBe(42)
    expect(parseFrontmatterScalar('-1.5')).toBe(-1.5)
    expect(parseFrontmatterScalar("'quoted'")).toBe('quoted')
    expect(parseFrontmatterScalar('"quoted"')).toBe('quoted')
    expect(parseFrontmatterScalar('plain')).toBe('plain')
    expect(parseFrontmatterScalar('')).toBe('')
  })

  it('parseFrontmatter reads the block, skips comments and ignores the body', () => {
    const source = [
      '---',
      'title: Button',
      '# a comment',
      "category: 'actions'",
      'draft: false',
      'order: 30',
      '---',
      '',
      '# Heading',
      'body: not-frontmatter',
    ].join('\n')

    expect(parseFrontmatter(source)).toEqual({
      title: 'Button',
      category: 'actions',
      draft: false,
      order: 30,
    })
  })

  it('parseFrontmatter returns null when there is no frontmatter block', () => {
    expect(parseFrontmatter('# Just a heading\n\nText.')).toBeNull()
  })

  it('findMdxFiles collects .mdx files recursively and ignores others', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mdxfiles-'))
    fs.mkdirSync(path.join(root, 'nested'), { recursive: true })
    fs.writeFileSync(path.join(root, 'a.mdx'), '---\ntitle: A\n---\n')
    fs.writeFileSync(
      path.join(root, 'nested', 'b.mdx'),
      '---\ntitle: B\n---\n'
    )
    fs.writeFileSync(path.join(root, 'ignore.md'), '# nope')
    fs.writeFileSync(path.join(root, 'ignore.tsx'), 'export {}')

    const files = (await findMdxFiles(root)).map((file) =>
      path.relative(root, file).replace(/\\/g, '/')
    )

    expect(files.sort()).toEqual(['a.mdx', 'nested/b.mdx'])
  })

  it('readFrontmatter returns null for a missing file', async () => {
    expect(
      await readFrontmatter(
        path.join(os.tmpdir(), 'does-not-exist-xyz.mdx')
      )
    ).toBeNull()
  })
})
