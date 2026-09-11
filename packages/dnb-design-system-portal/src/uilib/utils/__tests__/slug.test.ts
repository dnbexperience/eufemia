import { describe, it, expect } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import { visit } from 'unist-util-visit'
import {
  getSlugFromText,
  getSlugFromReactHeading,
  getSlugFromMdastHeading,
  stripCustomMarkdownId,
  getSlugFromMdxHeading,
} from '../slug.mjs'

import { headingIdCases, textOf, childrenOf } from './headingIdCases'

function mdastHeading(markdown: string) {
  let node = null
  visit(
    unified().use(remarkParse).use(remarkMdx).parse(markdown),
    'heading',
    (found) => {
      node = node || found
    }
  )
  return node
}

describe('every format of a heading gives the same slug', () => {
  describe.each(headingIdCases)('$name', (testCase) => {
    const markdown = `## ${testCase.markdown}`

    it('from MDX source', () => {
      expect(getSlugFromMdxHeading(markdown)).toBe(testCase.id)
    })

    it('from a parsed heading', () => {
      expect(getSlugFromMdastHeading(mdastHeading(markdown))).toBe(
        testCase.id
      )
    })

    it('from React children', () => {
      expect(getSlugFromReactHeading(childrenOf(testCase))).toBe(
        testCase.id
      )
    })

    it('from plain text', () => {
      expect(getSlugFromText(textOf(testCase))).toBe(testCase.id)
    })
  })
})

describe('getSlugFromText', () => {
  it('slugifies the words a reader sees', () => {
    expect(getSlugFromText('Getting Started')).toBe('getting-started')
  })

  it('prefers a custom id over the text', () => {
    expect(getSlugFromText('Spacing for Articles {#spacing}')).toBe(
      'spacing'
    )
  })

  it('slugifies a custom id, so an author cannot declare an unusable one', () => {
    expect(getSlugFromText('Heading {#My Custom ID}')).toBe('my-custom-id')
    expect(getSlugFromText('Heading {#Uppercase}')).toBe('uppercase')
    expect(getSlugFromText('Heading {#a/b?c}')).toBe('abc')
  })

  it('has nothing to give for nothing', () => {
    expect(getSlugFromText(undefined)).toBe('')
    expect(getSlugFromText('')).toBe('')
  })
})

describe('getSlugFromReactHeading', () => {
  it('reads text through an element', () => {
    expect(
      getSlugFromReactHeading({ props: { children: 'Typography' } })
    ).toBe('typography')
  })

  it('reads text through nested elements', () => {
    expect(
      getSlugFromReactHeading({
        props: { children: { props: { children: 'Typography' } } },
      })
    ).toBe('typography')
  })

  it('reads text through an array inside an element', () => {
    expect(
      getSlugFromReactHeading({
        props: {
          children: ['Value', { props: { children: '.Address' } }],
        },
      })
    ).toBe('valueaddress')
  })
})

describe('getSlugFromMdxHeading', () => {
  it('accepts a heading of any level', () => {
    expect(getSlugFromMdxHeading('#### Deeply nested')).toBe(
      'deeply-nested'
    )
  })

  it('resolves a link to its text', () => {
    expect(
      getSlugFromMdxHeading('## [Typography](/uilib/typography/)')
    ).toBe('typography')
  })
})

describe('stripCustomMarkdownId', () => {
  it('removes the marker from a string', () => {
    expect(stripCustomMarkdownId('Spacing for Articles {#spacing}')).toBe(
      'Spacing for Articles'
    )
  })

  it('removes the marker from children without collapsing spacing', () => {
    const element = { props: { children: 'font-size' } }

    expect(
      stripCustomMarkdownId([
        { props: { children: '200%' } },
        ' in ',
        element,
        ' {#font-size}',
      ])
    ).toEqual([{ props: { children: '200%' } }, ' in ', element])
  })

  it('leaves children without a marker untouched', () => {
    const children = ['Default ', { props: { children: 'rem' } }, ' table']

    expect(stripCustomMarkdownId(children)).toEqual(children)
  })
})
