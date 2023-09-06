/**
 * Space Test
 *
 */

import React from 'react'
import { loadScss } from '../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Space, { SpaceAllProps } from '../Space'

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
