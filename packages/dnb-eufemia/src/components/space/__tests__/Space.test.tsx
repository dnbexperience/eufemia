/**
 * Space Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import type { SpaceAllProps } from '../Space'
import Space from '../Space'
import Section from '../../Section'

const props: SpaceAllProps = {}

describe('Space component', () => {
  it('renders with empty props', () => {
    render(<Space {...props} />)
    expect(document.querySelector('.dnb-space')).toBeInTheDocument()
  })

  it('should have correct CSS classes', () => {
    render(<Space element="span" top="large" />)
    expect(document.querySelector('span.dnb-space').classList).toContain(
      'dnb-space__top--large'
    )
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLElement>

    function MockComponent(props) {
      ref = React.useRef<HTMLElement | null>(null)
      return <Space {...props} ref={ref} />
    }

    const { rerender } = render(<MockComponent />)

    expect(ref.current instanceof HTMLDivElement).toBe(true)
    expect(ref.current.tagName).toBe('DIV')

    rerender(<MockComponent element={Section} />)

    expect(ref.current instanceof HTMLElement).toBe(true)
    expect(ref.current.tagName).toBe('SECTION')
  })

  it('should accept space only prop', () => {
    render(<Space element="span" space="large" />)
    expect(
      Object.values(document.querySelector('span.dnb-space').classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-space__right--large',
      'dnb-space__bottom--large',
      'dnb-space__left--large',
    ])
  })

  it('should accept space prop as an object with spacing properties', () => {
    render(
      <Space
        element="span"
        space={{
          top: 'x-large',
          right: 'large',
          bottom: 'small small',
          left: 'x-small x-small small',
        }}
      />
    )
    expect(
      Object.values(document.querySelector('span.dnb-space').classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--x-large',
      'dnb-space__right--large',
      'dnb-space__bottom--large',
      'dnb-space__left--large',
    ])
  })

  it('should accept id attribute', () => {
    render(<Space id="custom-id" />)

    const element = document.querySelector('div.dnb-space')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'id'])
    expect(element.getAttribute('id')).toBe('custom-id')
  })

  it('should have collapse CSS class', () => {
    render(<Space top="large" noCollapse={true} />)
    expect(
      document.querySelector('.dnb-space--no-collapse')
    ).toBeInTheDocument()
  })

  it('should not emit style for non-responsive spacing (handled by CSS classes)', () => {
    const { rerender } = render(
      <Space top="large" right="small" bottom="0" left={false} />
    )
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBeNull()

    rerender(<Space space="small" />)
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBeNull()
  })

  it('should support "innerSpace"', () => {
    const { rerender } = render(<Space innerSpace={true} />)
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--padding-t: 1rem; --padding-r: 1rem; --padding-b: 1rem; --padding-l: 1rem;'
    )

    rerender(<Space innerSpace="large medium small" />)
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--padding-t: 4.5rem; --padding-r: 4.5rem; --padding-b: 4.5rem; --padding-l: 4.5rem;'
    )
  })

  describe('Space accessibility', () => {
    it('should validate with ARIA rules', async () => {
      const Comp = render(
        <Space top="large">
          <Section>Content</Section>
        </Space>
      )
      expect(await axeComponent(Comp)).toHaveNoViolations()
    })
  })
})

describe('Space scss', () => {
  it('should match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})

describe('responsive space', () => {
  it('should support "space" with a string media query object', () => {
    const { rerender } = render(
      <Space
        space={{
          small: 'small',
          medium: 'large',
          large: 'x-large',
        }}
      />
    )
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--margin-t-s: 1rem; --margin-r-s: 1rem; --margin-b-s: 1rem; --margin-l-s: 1rem; --margin-t-m: 2rem; --margin-r-m: 2rem; --margin-b-m: 2rem; --margin-l-m: 2rem; --margin-t-l: 3rem; --margin-r-l: 3rem; --margin-b-l: 3rem; --margin-l-l: 3rem;'
    )

    // CSS classes should be based on small breakpoint
    expect(
      Object.values(document.querySelector('.dnb-space').classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--small',
      'dnb-space__right--small',
      'dnb-space__bottom--small',
      'dnb-space__left--small',
    ])

    rerender(
      <Space
        space={{
          small: { top: 'small', right: 'large' },
          medium: { top: 'large', bottom: 'medium' },
          large: { left: 'x-large', right: 'x-small' },
        }}
        bottom="x-small"
      />
    )
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--margin-t-s: 1rem; --margin-r-s: 2rem; --margin-b-s: 0.5rem; --margin-t-m: 2rem; --margin-b-m: 0.5rem; --margin-r-l: 0.5rem; --margin-b-l: 0.5rem; --margin-l-l: 3rem;'
    )

    // CSS classes should be based on small breakpoint
    expect(
      Object.values(document.querySelector('.dnb-space').classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--small',
      'dnb-space__right--large',
      'dnb-space__bottom--x-small',
    ])
  })

  it('should support mixed types across media queries', () => {
    render(
      <Space
        space={{
          small: true,
          medium: '2rem',
          large: { top: 'x-large', right: '1.5rem' },
        }}
      />
    )
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--margin-t-s: 1rem; --margin-r-s: 1rem; --margin-b-s: 1rem; --margin-l-s: 1rem; --margin-t-m: 2rem; --margin-r-m: 2rem; --margin-b-m: 2rem; --margin-l-m: 2rem; --margin-t-l: 3rem; --margin-r-l: 1.5rem;'
    )

    // CSS classes should be based on small breakpoint (true = small)
    expect(
      Object.values(document.querySelector('.dnb-space').classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--small',
      'dnb-space__right--small',
      'dnb-space__bottom--small',
      'dnb-space__left--small',
    ])
  })

  it('should support inline/block shorthand with and without media queries', () => {
    const { rerender } = render(
      <Space
        space={{
          inline: 'small',
          block: 'large',
        }}
      />
    )
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBeNull()

    // CSS classes should be based on expanded values
    expect(
      Object.values(document.querySelector('.dnb-space').classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-space__right--small',
      'dnb-space__bottom--large',
      'dnb-space__left--small',
    ])

    rerender(
      <Space
        space={{
          small: { inline: 'small', block: 'medium' },
          medium: { block: 'large' },
          large: { inline: 'x-large' },
        }}
      />
    )
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--margin-l-s: 1rem; --margin-r-s: 1rem; --margin-t-s: 1.5rem; --margin-b-s: 1.5rem; --margin-t-m: 2rem; --margin-b-m: 2rem; --margin-l-l: 3rem; --margin-r-l: 3rem;'
    )

    // CSS classes should be based on small breakpoint expanded values
    expect(
      Object.values(document.querySelector('.dnb-space').classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--medium',
      'dnb-space__right--small',
      'dnb-space__bottom--medium',
      'dnb-space__left--small',
    ])
  })

  it('should let individual direction props override inline/block shorthand', () => {
    render(
      <Space space={{ inline: 'small' }} top="large" bottom="medium" />
    )
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBeNull()

    // CSS classes should reflect the overrides
    expect(
      Object.values(document.querySelector('.dnb-space').classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-space__right--small',
      'dnb-space__bottom--medium',
      'dnb-space__left--small',
    ])
  })

  it('should emit different values per breakpoint for a mixed media object', () => {
    const { rerender } = render(
      <Space
        space={{
          small: 'large x-small',
          medium: {
            top: '5rem',
            left: '16px',
            bottom: 'large',
            right: '5rem',
          },
          large: {
            top: '1rem',
            left: '16px',
            bottom: 'large',
            right: '5rem',
          },
        }}
      />
    )

    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--margin-t-s: 2.5rem; --margin-r-s: 2.5rem; --margin-b-s: 2.5rem; --margin-l-s: 2.5rem; --margin-t-m: 5rem; --margin-l-m: 1rem; --margin-b-m: 2rem; --margin-r-m: 5rem; --margin-t-l: 1rem; --margin-l-l: 1rem; --margin-b-l: 2rem; --margin-r-l: 5rem;'
    )

    // CSS classes should be based on small breakpoint (large x-small = 2.5rem total)
    expect(
      Object.values(document.querySelector('.dnb-space').classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-space__top--x-small',
      'dnb-space__right--large',
      'dnb-space__right--x-small',
      'dnb-space__bottom--large',
      'dnb-space__bottom--x-small',
      'dnb-space__left--large',
      'dnb-space__left--x-small',
    ])

    // Another scenario with px values and string combinations
    rerender(
      <Space
        space={{
          small: 'medium small',
          medium: {
            top: '32px', // Should convert to 2rem
            right: 'x-large small',
            bottom: false,
            left: '0.5rem',
          },
          large: {
            top: 'xx-large',
            right: '48px', // Should convert to 3rem
            bottom: 'large large',
            left: 'small',
          },
        }}
      />
    )

    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--margin-t-s: 2.5rem; --margin-r-s: 2.5rem; --margin-b-s: 2.5rem; --margin-l-s: 2.5rem; --margin-t-m: 2rem; --margin-l-m: 0.5rem; --margin-b-m: 0; --margin-r-m: 4rem; --margin-t-l: 3.5rem; --margin-l-l: 1rem; --margin-b-l: 4rem; --margin-r-l: 3rem;'
    )
  })

  it('should support zero and false values across media queries', () => {
    render(
      <Space
        space={{
          small: { top: 'large', right: 'zero', bottom: false, left: '0' },
          medium: { top: '0rem', right: 'small', bottom: 'medium' },
          large: { left: 'zero', right: false },
        }}
      />
    )

    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--margin-t-s: 2rem; --margin-b-s: 0; --margin-l-s: 0; --margin-r-m: 1rem; --margin-b-m: 1.5rem; --margin-r-l: 0;'
    )

    // CSS classes should reflect only non-zero values from small breakpoint
    expect(
      Object.values(document.querySelector('.dnb-space').classList)
    ).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-space__bottom--zero',
      'dnb-space__left--zero',
    ])
  })

  it('should support complex rem and px combinations', () => {
    render(
      <Space
        space={{
          small: '3rem',
          medium: {
            top: '3.5rem',
            right: '24px',
            bottom: '2.5rem',
            left: '8px',
          },
          large: 'xx-large x-small',
        }}
      />
    )

    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--margin-t-s: 3rem; --margin-r-s: 3rem; --margin-b-s: 3rem; --margin-l-s: 3rem; --margin-t-m: 3.5rem; --margin-r-m: 1.5rem; --margin-b-m: 2.5rem; --margin-l-m: 0.5rem; --margin-t-l: 4rem; --margin-r-l: 4rem; --margin-b-l: 4rem; --margin-l-l: 4rem;'
    )
  })
})

describe('responsive innerSpace', () => {
  it('should support a media object with mixed scalar and object values', () => {
    render(
      <Space
        innerSpace={{
          small: { top: '0.5rem', right: 'large' },
          medium: true,
          large: { left: '16px', right: 'x-small' },
        }}
      />
    )
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--padding-t-s: 0.5rem; --padding-r-s: 2rem; --padding-t-m: 1rem; --padding-r-m: 1rem; --padding-b-m: 1rem; --padding-l-m: 1rem; --padding-l-l: 1rem; --padding-r-l: 0.5rem;'
    )
  })
})
