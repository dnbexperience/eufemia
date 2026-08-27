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

  test('does not exhibit catastrophic backtracking on malformed separator rows', () => {
    // A near-separator with a large trailing whitespace run previously made the
    // separator matcher run in O(n^2) time (polynomial ReDoS).
    const md = ['a | b', '-|-' + ' '.repeat(100000) + 'x'].join('\n')

    const start = performance.now()
    const tables = extractMarkdownTables(md)
    const elapsed = performance.now() - start

    expect(tables).toEqual([])
    expect(elapsed).toBeLessThan(1000)
  })

  test('does not exhibit catastrophic backtracking on unmatched link delimiters', () => {
    // Long runs of unmatched "[" and "(" previously made the inline link matcher
    // run in O(n^2) time (polynomial ReDoS).
    const openBrackets = '['.repeat(100000)
    const openLinks = '[a]('.repeat(100000)
    const md = [
      '| h1 | h2 |',
      '| --- | --- |',
      `| ${openBrackets} | ${openLinks} |`,
    ].join('\n')

    const start = performance.now()
    const tables = extractMarkdownTables(md)
    const elapsed = performance.now() - start

    expect(tables).toHaveLength(1)
    expect(tables[0][1]).toEqual([openBrackets, openLinks])
    expect(elapsed).toBeLessThan(1000)
  })
})
