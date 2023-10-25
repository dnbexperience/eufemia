/**
 * Space Test
 *
 */

import React from 'react'
import { loadScss } from '../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Space, { SpaceAllProps } from '../Space'
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
    let ref: React.RefObject<HTMLDivElement>

    function MockComponent(props) {
      ref = React.useRef()
      return <Space {...props} innerRef={ref} />
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
    render(<Space top="large" no_collapse={true} />)
    expect(
      document.querySelector('.dnb-space--no-collapse')
    ).toBeInTheDocument()
  })

  it('should support "innerSpace"', () => {
    const { rerender } = render(<Space innerSpace={true} />)
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--space-t-s: 1rem; --space-r-s: 1rem; --space-b-s: 1rem; --space-l-s: 1rem; --space-t-m: 1rem; --space-r-m: 1rem; --space-b-m: 1rem; --space-l-m: 1rem; --space-t-l: 1rem; --space-r-l: 1rem; --space-b-l: 1rem; --space-l-l: 1rem;'
    )

    rerender(<Space innerSpace="large medium small" />)
    expect(
      document.querySelector('.dnb-space').getAttribute('style')
    ).toBe(
      '--space-t-s: 4.5rem; --space-r-s: 4.5rem; --space-b-s: 4.5rem; --space-l-s: 4.5rem; --space-t-m: 4.5rem; --space-r-m: 4.5rem; --space-b-m: 4.5rem; --space-l-m: 4.5rem; --space-t-l: 4.5rem; --space-r-l: 4.5rem; --space-b-l: 4.5rem; --space-l-l: 4.5rem;'
    )

    rerender(
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
      '--space-t-s: 0.5rem; --space-r-s: 2rem; --space-t-m: 1rem; --space-r-m: 1rem; --space-b-m: 1rem; --space-l-m: 1rem; --space-r-l: 0.5rem; --space-l-l: 1rem;'
    )
  })
})

describe('Space scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-space-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
