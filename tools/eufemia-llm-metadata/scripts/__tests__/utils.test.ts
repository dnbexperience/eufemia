import { escapeMarkdownTableCell } from '../../src/extensions/mdx/utils.ts'

describe('mdx utils', () => {
  it('escapes pipes in markdown table cells', () => {
    expect(escapeMarkdownTableCell('foo|bar')).toBe('foo\\|bar')
  })

  it('escapes existing backslashes in markdown table cells', () => {
    expect(escapeMarkdownTableCell('foo\\bar')).toBe('foo\\\\bar')
  })

  it('escapes backslashes and pipes together', () => {
    expect(escapeMarkdownTableCell('foo\\|bar')).toBe('foo\\\\\\|bar')
  })
})
