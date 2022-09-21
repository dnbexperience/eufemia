/**
 * Component Test
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import Section from '../Section'

const props = fakeProps(require.resolve('../Section'), {
  all: true,
})
props.style = null
props.element = null
props.inner_ref = null
props.style_type = 'mint-green-12'

describe('Section component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Section {...props} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should have correct styles', () => {
    render(<Section style_type="divider" />)
    expect(
      document
        .querySelector('section.dnb-section')
        .classList.contains('dnb-section--divider')
    ).toBe(true)
  })

  it('should have correct spacing', () => {
    const hasSpacing = () =>
      Array.from(document.querySelector('section.dnb-section').classList)
        .filter((className) => className.includes('dnb-section--spacing'))
        .join('')

    const { rerender } = render(<Section />)
    expect(hasSpacing()).toBe('')

    rerender(<Section spacing="large" />)
    expect(hasSpacing()).toBe('dnb-section--spacing-large')

    rerender(<Section spacing="medium" />)
    expect(hasSpacing()).toBe('dnb-section--spacing-medium')

    rerender(<Section spacing="small" />)
    expect(hasSpacing()).toBe('dnb-section--spacing-small')

    rerender(<Section spacing />)
    expect(hasSpacing()).toBe('dnb-section--spacing-large')
  })

  it('should have a div as the element tag', () => {
    render(<Section element="div" />)
    expect(document.querySelector('div.dnb-section')).toBeTruthy()
  })

  it('should validate with ARIA rules', async () => {
    const Component = render(<Section {...props} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Section scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-section.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-section-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
