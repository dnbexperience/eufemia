import { extractMarkdownTables } from '../markdownTablesUtils.ts'

describe('markdownTablesUtils', () => {
  test('extractMarkdownTables ignores fences and keeps escaped pipes', () => {
    const md = [
      '| Name | Desc |',
      '| --- | --- |',
      '| foo | bar |',
      '',
      '```',
      '| not | table |',
      '| --- | --- |',
      '| nope | nope |',
      '```',
      '',
      '| A | B |',
      '| :-- | --: |',
      '| 1 \\| 2 | 3 |',
    ].join('\n')

    const tables = extractMarkdownTables(md)
    expect(tables.length).toBe(2)
    expect(tables[0]).toEqual([
      ['Name', 'Desc'],
      ['foo', 'bar'],
    ])
    expect(tables[1]).toEqual([
      ['A', 'B'],
      ['1 | 2', '3'],
    ])
  })

  test('extractMarkdownTables renders basic inline markdown', () => {
    const md = [
      '| Name | Desc |',
      '| --- | --- |',
      '| `code` | _em_ and **strong** and [Link](/path) |',
    ].join('\n')

    const tables = extractMarkdownTables(md)
    expect(tables).toEqual([
      [
        ['Name', 'Desc'],
        [
          '<code>code</code>',
          '<em>em</em> and <strong>strong</strong> and <a href="/path">Link</a>',
        ],
      ],
    ])
  })
})
