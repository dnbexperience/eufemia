import { parseInline } from '../parseInline'

const text = (value: string) => ({ type: 'text', value })

describe('parseInline', () => {
  it('returns plain text', () => {
    expect(parseInline('Hello world')).toEqual([text('Hello world')])
  })

  it('parses strong, em and del', () => {
    expect(parseInline('**a** *b* __c__ _d_ ~~e~~')).toEqual([
      { type: 'strong', children: [text('a')] },
      text(' '),
      { type: 'em', children: [text('b')] },
      text(' '),
      { type: 'strong', children: [text('c')] },
      text(' '),
      { type: 'em', children: [text('d')] },
      text(' '),
      { type: 'del', children: [text('e')] },
    ])
  })

  it('parses nested emphasis', () => {
    expect(parseInline('***both***')).toEqual([
      {
        type: 'em',
        children: [{ type: 'strong', children: [text('both')] }],
      },
    ])
    expect(parseInline('**bold *and em***')).toEqual([
      {
        type: 'strong',
        children: [
          text('bold '),
          { type: 'em', children: [text('and em')] },
        ],
      },
    ])
  })

  it('does not use intraword underscores as emphasis', () => {
    expect(parseInline('snake_case_name')).toEqual([
      text('snake_case_name'),
    ])
  })

  it('keeps unmatched and spaced markers as text', () => {
    expect(parseInline('2 * 3 * 4')).toEqual([text('2 * 3 * 4')])
    expect(parseInline('**not closed')).toEqual([text('**not closed')])
  })

  it('parses code spans', () => {
    expect(parseInline('Use `a *b*` or `` x`y ``')).toEqual([
      text('Use '),
      { type: 'code', value: 'a *b*' },
      text(' or '),
      { type: 'code', value: 'x`y' },
    ])
  })

  it('handles backslash escapes', () => {
    expect(parseInline('\\*not em\\*')).toEqual([text('*not em*')])
  })

  it('parses links and titles', () => {
    expect(parseInline('[DNB **bank**](https://dnb.no "Home")')).toEqual([
      {
        type: 'link',
        href: 'https://dnb.no',
        title: 'Home',
        children: [
          text('DNB '),
          { type: 'strong', children: [text('bank')] },
        ],
      },
    ])
  })

  it('supports balanced parentheses in link destinations', () => {
    expect(parseInline('[a](https://x.no/a_(b))')).toEqual([
      {
        type: 'link',
        href: 'https://x.no/a_(b)',
        children: [text('a')],
      },
    ])
  })

  it('parses images', () => {
    expect(parseInline('![A *cat*](cat.png)')).toEqual([
      { type: 'image', src: 'cat.png', alt: 'A cat', title: undefined },
    ])
  })

  it('keeps brackets that are not links as text', () => {
    expect(parseInline('[not a link] and [x]')).toEqual([
      text('[not a link] and [x]'),
    ])
  })

  it('parses autolinks and bare URLs', () => {
    expect(
      parseInline('See <https://a.no>, www.dnb.no. Or https://b.no/x).')
    ).toEqual([
      text('See '),
      {
        type: 'link',
        href: 'https://a.no',
        children: [text('https://a.no')],
      },
      text(', '),
      {
        type: 'link',
        href: 'http://www.dnb.no',
        children: [text('www.dnb.no')],
      },
      text('. Or '),
      {
        type: 'link',
        href: 'https://b.no/x',
        children: [text('https://b.no/x')],
      },
      text(').'),
    ])
  })

  it('parses email autolinks', () => {
    expect(parseInline('<post@dnb.no>')).toEqual([
      {
        type: 'link',
        href: 'mailto:post@dnb.no',
        children: [text('post@dnb.no')],
      },
    ])
  })

  it('does not nest links', () => {
    expect(parseInline('[https://a.no](https://b.no)')).toEqual([
      {
        type: 'link',
        href: 'https://b.no',
        children: [text('https://a.no')],
      },
    ])
  })

  it('does not autolink words starting with h or w', () => {
    expect(parseInline('http and www')).toEqual([text('http and www')])
  })

  it('parses hard and soft line breaks', () => {
    expect(parseInline('a  \nb\\\nc\nd')).toEqual([
      text('a'),
      { type: 'br' },
      text('b'),
      { type: 'br' },
      text('c\nd'),
    ])
  })

  describe('incomplete', () => {
    const incomplete = (value: string) =>
      parseInline(value, { incomplete: true })

    it('closes unclosed emphasis at the end', () => {
      expect(incomplete('Some **bold te')).toEqual([
        text('Some '),
        { type: 'strong', children: [text('bold te')] },
      ])
      expect(incomplete('**bold *em')).toEqual([
        {
          type: 'strong',
          children: [
            text('bold '),
            { type: 'em', children: [text('em')] },
          ],
        },
      ])
      expect(incomplete('~~str')).toEqual([
        { type: 'del', children: [text('str')] },
      ])
    })

    it('hides a trailing marker without content', () => {
      expect(incomplete('Hello **')).toEqual([text('Hello ')])
      expect(incomplete('Hello *')).toEqual([text('Hello ')])
    })

    it('closes an unclosed code span', () => {
      expect(incomplete('Run `npm i')).toEqual([
        text('Run '),
        { type: 'code', value: 'npm i' },
      ])
    })

    it('shows the label of an unfinished link without linking', () => {
      expect(incomplete('Read [the docs](https://eufe')).toEqual([
        text('Read the docs'),
      ])
      expect(incomplete('Read [the do')).toEqual([text('Read the do')])
    })

    it('hides unfinished images', () => {
      expect(incomplete('Look ![a cat](https://ca')).toEqual([
        text('Look '),
      ])
      expect(incomplete('Look ![a c')).toEqual([text('Look ')])
    })

    it('does not change complete markdown', () => {
      const value = '**a** [b](https://b.no) `c`'
      expect(incomplete(value)).toEqual(parseInline(value))
    })

    it('does not treat spaced asterisks as openers', () => {
      expect(incomplete('2 * 3')).toEqual([text('2 * 3')])
    })
  })
})
