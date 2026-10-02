import { parseBlocks } from '../parseBlocks'

const strip = (markdown: string) =>
  parseBlocks(markdown).map(({ source, ...block }) => block)

describe('parseBlocks', () => {
  it('parses paragraphs separated by blank lines', () => {
    expect(strip('One\nline\n\nTwo')).toEqual([
      { type: 'paragraph', text: 'One\nline' },
      { type: 'paragraph', text: 'Two' },
    ])
  })

  it('keeps the source of each block', () => {
    expect(parseBlocks('# Title\n\nText').map((b) => b.source)).toEqual([
      '# Title',
      'Text',
    ])
  })

  it('parses ATX and setext headings', () => {
    expect(strip('# One\n### Three ###\nTwo\n---\nAlso one\n===')).toEqual(
      [
        { type: 'heading', level: 1, text: 'One' },
        { type: 'heading', level: 3, text: 'Three' },
        { type: 'heading', level: 2, text: 'Two' },
        { type: 'heading', level: 1, text: 'Also one' },
      ]
    )
  })

  it('does not treat #hashtag as heading', () => {
    expect(strip('#hashtag')).toEqual([
      { type: 'paragraph', text: '#hashtag' },
    ])
  })

  it('parses fenced code with language', () => {
    expect(strip('```ts\nconst a = 1\n\nconst b = 2\n```\nAfter')).toEqual(
      [
        { type: 'code', lang: 'ts', value: 'const a = 1\n\nconst b = 2' },
        { type: 'paragraph', text: 'After' },
      ]
    )
  })

  it('runs an unclosed fence to the end', () => {
    expect(strip('~~~\nstreaming *code*')).toEqual([
      { type: 'code', lang: '', value: 'streaming *code*' },
    ])
  })

  it('requires a matching closing fence', () => {
    expect(strip('````\n```\n````')).toEqual([
      { type: 'code', lang: '', value: '```' },
    ])
  })

  it('parses thematic breaks', () => {
    expect(strip('Text\n\n***\n\n- - -')).toEqual([
      { type: 'paragraph', text: 'Text' },
      { type: 'hr' },
      { type: 'hr' },
    ])
  })

  it('parses nested blockquotes', () => {
    expect(strip('> Quote\n> > Nested')).toEqual([
      {
        type: 'blockquote',
        children: [
          { type: 'paragraph', text: 'Quote' },
          {
            type: 'blockquote',
            children: [{ type: 'paragraph', text: 'Nested' }],
          },
        ],
      },
    ])
  })

  it('parses tight bullet lists with nesting', () => {
    expect(strip('- One\n  - Nested\n- Two')).toEqual([
      {
        type: 'list',
        ordered: false,
        start: 1,
        tight: true,
        items: [
          {
            checked: null,
            children: [
              { type: 'paragraph', text: 'One' },
              {
                type: 'list',
                ordered: false,
                start: 1,
                tight: true,
                items: [
                  {
                    checked: null,
                    children: [{ type: 'paragraph', text: 'Nested' }],
                  },
                ],
              },
            ],
          },
          {
            checked: null,
            children: [{ type: 'paragraph', text: 'Two' }],
          },
        ],
      },
    ])
  })

  it('parses loose ordered lists with a start number', () => {
    const [list] = strip('3. Three\n\n4. Four')
    expect(list).toMatchObject({
      type: 'list',
      ordered: true,
      start: 3,
      tight: false,
    })
    expect(list.type === 'list' && list.items).toHaveLength(2)
  })

  it('starts a new list when the marker type changes', () => {
    expect(strip('- One\n1. Two').map((b) => b.type)).toEqual([
      'list',
      'list',
    ])
  })

  it('supports lazy continuation lines in list items', () => {
    const [list] = strip('- One\ncontinued')
    expect(list.type === 'list' && list.items[0].children).toEqual([
      { type: 'paragraph', text: 'One\ncontinued' },
    ])
  })

  it('parses task list items', () => {
    const [list] = strip('- [ ] Todo\n- [x] Done')
    expect(list.type === 'list' && list.items).toEqual([
      { checked: false, children: [{ type: 'paragraph', text: 'Todo' }] },
      { checked: true, children: [{ type: 'paragraph', text: 'Done' }] },
    ])
  })

  it('lets a list interrupt a paragraph only when it starts at 1', () => {
    expect(strip('Text\n- item').map((b) => b.type)).toEqual([
      'paragraph',
      'list',
    ])
    expect(strip('Year\n2024. was good')).toEqual([
      { type: 'paragraph', text: 'Year\n2024. was good' },
    ])
  })

  it('parses tables with alignment', () => {
    expect(
      strip('| A | B | C |\n|:--|:-:|--:|\n| 1 | `a|b` | 3 |\n| 4 |')
    ).toEqual([
      {
        type: 'table',
        align: ['left', 'center', 'right'],
        header: ['A', 'B', 'C'],
        rows: [
          ['1', '`a|b`', '3'],
          ['4', '', ''],
        ],
      },
    ])
  })

  it('parses tables without outer pipes and escaped pipes', () => {
    expect(strip('A | B\n--- | ---\na \\| b | c')).toEqual([
      {
        type: 'table',
        align: [null, null],
        header: ['A', 'B'],
        rows: [['a | b', 'c']],
      },
    ])
  })

  it('treats a table header without delimiter row as paragraph', () => {
    expect(strip('| A | B |')).toEqual([
      { type: 'paragraph', text: '| A | B |' },
    ])
  })

  it('renders nesting deeper than 32 levels as text', () => {
    let block = parseBlocks('> '.repeat(40) + 'deep')[0]
    let depth = 0
    while (block.type === 'blockquote') {
      block = block.children[0] as typeof block
      depth++
    }
    expect(depth).toBe(33)
    expect(block.type).toBe('paragraph')
  })

  it('normalizes line endings', () => {
    expect(strip('One\r\n\r\nTwo')).toHaveLength(2)
  })

  it('returns an empty list for empty input', () => {
    expect(parseBlocks('')).toEqual([])
    expect(parseBlocks('\n\n')).toEqual([])
  })
})
