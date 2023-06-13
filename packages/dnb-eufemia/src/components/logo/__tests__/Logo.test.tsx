/**
 * Component Test
 *
 */

import React from 'react'
import { fakeProps, loadScss } from '../../../core/jest/jestSetup'
import Logo from '../Logo'
import { render } from '@testing-library/react'
import Provider from '../../../shared/Provider'
import Theme from '../../../shared/Theme'

const props = fakeProps(require.resolve('../Logo'), {
  optional: true,
})
props.height = 80

describe('Logo component', () => {
  it('should set correct class when inherit_color is set', () => {
    render(<Logo inherit_color />)
    expect(document.querySelector('.dnb-logo').classList).toContain(
      'dnb-logo--inherit-color'
    )
  })

  it('should set correct class when size="inherit" is set', () => {
    render(<Logo size="inherit" />)
    expect(document.querySelector('.dnb-logo').classList).toContain(
      'dnb-logo--inherit-size'
    )
  })

  it('should set correct DNB SVG', () => {
    render(<Logo />)
    expect(document.querySelector('svg')).toMatchSnapshot()
  })

  it('should set correct Sbanken brand SVG', () => {
    render(<Logo brand="sbanken" />)
    expect(document.querySelector('svg')).toMatchSnapshot()
  })

  it('should have title inside SVG', () => {
    render(<Logo />)
    expect(document.querySelector('title').textContent).toBe('DNB Logo')
    expect(document.querySelector('.dnb-logo').getAttribute('alt')).toBe(
      'DNB Logo'
    )
  })

  it('should have Sbanken title inside SVG', () => {
    render(<Logo brand="sbanken" />)
    expect(document.querySelector('title').textContent).toBe(
      'Sbanken - et konsept fra DNB logo'
    )
    expect(
      document.querySelector('.sbanken-logo').getAttribute('alt')
    ).toBe('Sbanken - et konsept fra DNB logo')
  })

  it('should set correct Sbanken brand SVG in compact variant', () => {
    render(<Logo brand="sbanken" variant="compact" />)
    expect(document.querySelector('svg')).toMatchSnapshot()
  })

  it('should set role="img"', () => {
    render(<Logo />)
    expect(document.querySelector('.dnb-logo').getAttribute('role')).toBe(
      'img'
    )
  })

  it('should set custom class', () => {
    render(<Logo className="custom-selector" />)
    expect(document.querySelector('[role="img"]').classList).toContain(
      'custom-selector'
    )
  })

  it('should inherit props from global provider', () => {
    render(<Logo brand="sbanken" variant="compact" />)
    const refHTML = document.querySelector('svg').outerHTML
    document.body.innerHTML = ''

    render(
      <Provider
        Logo={{
          brand: 'sbanken',
          variant: 'compact',
        }}
      >
        <Logo />
      </Provider>
    )

    const html = document.querySelector('svg').outerHTML
    expect(html).toBe(refHTML)
  })

  it('should inherit props from theme provider', () => {
    render(<Logo brand="sbanken" variant="compact" />)
    const refHTML = document.querySelector('svg').outerHTML
    document.body.innerHTML = ''

    render(
      <Theme name="sbanken">
        <Logo variant="compact" />
      </Theme>
    )

    const html = document.querySelector('svg').outerHTML
    expect(html).toBe(refHTML)
  })

  it('should support spacing props', () => {
    render(<Logo top="2rem" />)

    const element = document.querySelector('.dnb-logo')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).not.toContain('top')
    expect(Array.from(element.classList)).toEqual([
      'dnb-logo',
      'dnb-space__top--large',
    ])
  })

  it('should have a certain set of HTML classes', () => {
    const { rerender } = render(<Logo />)

    expect(Array.from(document.querySelector('span').classList)).toEqual([
      'dnb-logo',
    ])

    rerender(<Logo brand="sbanken" />)

    expect(Array.from(document.querySelector('span').classList)).toEqual([
      'sbanken-logo',
    ])
  })

  it('should have a certain set of HTML attributes', () => {
    render(<Logo top="2rem" title="HTML title" />)

    const element = document.querySelector('.dnb-logo')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual([
      'class',
      'role',
      'alt',
      'data-ratio',
      'aria-hidden',
      'title',
    ])
  })
})

describe('Logo scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
})
