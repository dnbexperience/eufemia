import { describe, expect, it, vi } from 'vitest'
import { createHomeExtension } from '../../src/extensions/mdx/home.ts'

vi.mock('node:fs', () => ({
  default: {
    readFileSync: () =>
      JSON.stringify({
        title: 'Price $&',
        introduction: "Use $` and $' verbatim.",
        actions: [],
        resources: [],
      }),
  },
}))

describe('Home MDX extension', () => {
  it('inserts generated markdown verbatim', async () => {
    const extension = createHomeExtension()

    const result = await extension.replace('Before\n\n<Home />\n\nAfter')

    expect(result).toContain('# Price $&')
    expect(result).toContain("Use $` and $' verbatim.")
    expect(result).not.toContain('<Home')
  })
})
