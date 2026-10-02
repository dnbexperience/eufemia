import { parseBlocks } from '../parseBlocks'
import { parseInline } from '../parseInline'

const answer = [
  '## Your **spending** in March',
  '',
  'You spent *12 400 kr*, which is ~~more~~ less than [last month](https://dnb.no/spend "Spending").',
  '',
  '- Groceries: `4 200 kr`',
  '- [x] Transport',
  '  1. Bus',
  '',
  '> Tip: www.dnb.no/sparing',
  '',
  '| Category | Amount |',
  '|:--|--:|',
  '| Food | 4 200 |',
  '',
  '```ts',
  'const total = 12_400',
  '```',
].join('\n')

describe('streaming', () => {
  it('parses every partial chunk without throwing', () => {
    expect(() => {
      for (let i = 1; i <= answer.length; i++) {
        const blocks = parseBlocks(answer.slice(0, i))
        blocks.forEach((block, index) => {
          if ('text' in block) {
            parseInline(block.text, {
              incomplete: index === blocks.length - 1,
            })
          }
        })
      }
    }).not.toThrow()
  })

  it('ends up with the same result as the complete text', () => {
    const blocks = parseBlocks(answer)
    const last = blocks[blocks.length - 1]
    expect(blocks.map((b) => b.type)).toEqual([
      'heading',
      'paragraph',
      'list',
      'blockquote',
      'table',
      'code',
    ])
    expect(last).toMatchObject({
      lang: 'ts',
      value: 'const total = 12_400',
    })
  })

  it('handles pathological input quickly', () => {
    const inputs = [
      '['.repeat(20000),
      '*'.repeat(20000),
      '*a '.repeat(10000),
      '` '.repeat(10000),
      '[a]('.repeat(5000),
      '_a_'.repeat(10000),
      '> '.repeat(5000) + 'x',
      '- '.repeat(3000) + 'x',
      'https://'.repeat(5000),
    ]
    const start = Date.now()
    for (const input of inputs) {
      parseBlocks(input).forEach((block) => {
        if ('text' in block) {
          parseInline(block.text)
          parseInline(block.text, { incomplete: true })
        }
      })
    }
    expect(Date.now() - start).toBeLessThan(500)
  })
})
