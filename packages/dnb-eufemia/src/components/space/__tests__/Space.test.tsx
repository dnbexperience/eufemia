/**
 * Component Test
 *
 */

import React from 'react'
import { fakeProps, loadScss } from '../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Component from '../Space'

const snapshotProps = fakeProps(require.resolve('../Space'))
snapshotProps.id = 'space'
snapshotProps.element = 'div'
snapshotProps.no_collapse = false

describe('Space component', () => {
  it('should have correct CSS classes', () => {
    render(<Component element="span" top="large" />)
    expect(
      document
        .querySelector('span.dnb-space')
        .classList.contains('dnb-space__top--large')
    ).toBe(true)
  })

  it('should accept space only prop', () => {
    render(<Component element="span" space="large" />)
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
      <Component
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
    render(<Component id="custom-id" />)

    const element = document.querySelector('div.dnb-space')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'id'])
    expect(element.getAttribute('id')).toBe('custom-id')
  })

  it('should have collapse CSS class', () => {
    render(<Component top="large" no_collapse={true} />)
    expect(document.querySelector('.dnb-space--no-collapse')).toBeTruthy()
  })
})

describe('Space scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-space-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
