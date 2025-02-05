/**
 * Component Test
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import Section, { SectionAllProps } from '../Section'
import Provider from '../../../shared/Provider'

const props: SectionAllProps = {
  style_type: 'mint-green-12',
}

describe('Section component', () => {
  it('should have correct styles', () => {
    render(<Section style_type="divider" />)
    expect(
      document.querySelector('section.dnb-section').classList
    ).toContain('dnb-section--divider')
  })

  it('should support "variant" props and takes precedence over "style_type"', () => {
    const { rerender } = render(<Section variant="warning">text</Section>)

    const element = document.querySelector('section.dnb-section')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-section',
      'dnb-section--warning',
    ])

    rerender(
      <Section variant="info" style_type="divider">
        text
      </Section>
    )

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-section',
      'dnb-section--info',
    ])
  })

  it('should support custom class name', () => {
    render(<Section className="custom-name">text</Section>)

    const element = document.querySelector('section.dnb-section')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-section',
      'dnb-section--default',
      'custom-name',
    ])
  })

  it('should support custom html attributes', () => {
    render(<Section aria-label="Aria Label">text</Section>)

    const element = document.querySelector('section.dnb-section')

    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['style', 'class', 'aria-label'])
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support any string in style_type', () => {
    render(<Section style_type="custom" />)
    expect(
      document.querySelector('section.dnb-section').classList
    ).toContain('dnb-section--custom')
  })

  it('should support spacing props', () => {
    render(<Section top="medium">text</Section>)

    const element = document.querySelector('section.dnb-section')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-space__top--medium',
      'dnb-section',
      'dnb-section--default',
    ])
  })

  it('will use props from Provider', () => {
    render(
      <Provider Section={{ style_type: 'divider' }}>
        <Section />
      </Provider>
    )

    expect(
      document.querySelector('section.dnb-section').classList
    ).toContain('dnb-section--divider')
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
    expect(document.querySelector('div.dnb-section')).toBeInTheDocument()
  })

  it('supports inline styling', () => {
    render(<Section style={{ color: 'red' }} />)

    expect(
      document.querySelector('.dnb-section').getAttribute('style')
    ).toContain('color: red;')
  })

  describe('with style properties', () => {
    it('should merge existing style', () => {
      render(<Section style={{ fontSize: '2rem' }} />)

      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); font-size: 2rem;'
      )
    })

    it('should support "outline"', () => {
      const { rerender } = render(<Section outline />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --outline-color--small: var(--outline-color--value); --outline-color--medium: var(--outline-color--value); --outline-color--large: var(--outline-color--value);'
      )

      rerender(<Section outline="fire-red" />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --outline-color--small: var(--color-fire-red); --outline-color--medium: var(--color-fire-red); --outline-color--large: var(--color-fire-red);'
      )

      rerender(
        <Section
          outline={{
            small: 'fire-red',
            medium: 'success-green',
            large: 'black',
          }}
        />
      )
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --outline-color--small: var(--color-fire-red); --outline-color--medium: var(--color-success-green); --outline-color--large: var(--color-black);'
      )
    })

    it('should support "backgroundColor"', () => {
      const { rerender } = render(<Section backgroundColor="fire-red" />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --background-color--small: var(--color-fire-red); --background-color--medium: var(--color-fire-red); --background-color--large: var(--color-fire-red);'
      )

      rerender(
        <Section
          backgroundColor={{
            small: 'fire-red',
            medium: 'success-green',
            large: 'black',
          }}
        />
      )
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --background-color--small: var(--color-fire-red); --background-color--medium: var(--color-success-green); --background-color--large: var(--color-black);'
      )
    })

    it('should support "textColor"', () => {
      const { rerender } = render(<Section textColor="fire-red" />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --text-color--small: var(--color-fire-red); --text-color--medium: var(--color-fire-red); --text-color--large: var(--color-fire-red);'
      )

      rerender(
        <Section
          textColor={{
            small: 'fire-red',
            medium: 'success-green',
            large: 'black',
          }}
        />
      )
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --text-color--small: var(--color-fire-red); --text-color--medium: var(--color-success-green); --text-color--large: var(--color-black);'
      )
    })

    it('should support "breakout"', () => {
      const { rerender } = render(<Section breakout={false} />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--off); --breakout--medium: var(--breakout--off); --breakout--large: var(--breakout--off);'
      )

      rerender(
        <Section
          breakout={{
            small: true,
            medium: false,
            large: true,
          }}
        />
      )
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--off); --breakout--large: var(--breakout--on);'
      )
    })

    it('should support "roundedCorner"', () => {
      const { rerender } = render(
        <Section roundedCorner={false} breakout={false} />
      )
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--off); --breakout--medium: var(--breakout--off); --breakout--large: var(--breakout--off);'
      )

      rerender(
        <Section
          roundedCorner={{
            small: true,
            medium: false,
            large: true,
          }}
          breakout={false}
        />
      )
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--off); --breakout--medium: var(--breakout--off); --breakout--large: var(--breakout--off); --rounded-corner--small: var(--rounded-corner--value); --rounded-corner--large: var(--rounded-corner--value);'
      )
    })

    it('should support "innerSpace"', () => {
      const { rerender } = render(<Section innerSpace={true} />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --space-t-s: 1rem; --space-r-s: 1rem; --space-b-s: 1rem; --space-l-s: 1rem; --space-t-m: 1rem; --space-r-m: 1rem; --space-b-m: 1rem; --space-l-m: 1rem; --space-t-l: 1rem; --space-r-l: 1rem; --space-b-l: 1rem; --space-l-l: 1rem;'
      )

      rerender(<Section innerSpace="large medium small" />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --space-t-s: 4.5rem; --space-r-s: 4.5rem; --space-b-s: 4.5rem; --space-l-s: 4.5rem; --space-t-m: 4.5rem; --space-r-m: 4.5rem; --space-b-m: 4.5rem; --space-l-m: 4.5rem; --space-t-l: 4.5rem; --space-r-l: 4.5rem; --space-b-l: 4.5rem; --space-l-l: 4.5rem;'
      )

      rerender(
        <Section
          innerSpace={{
            small: { top: '0.5rem', right: 'large' },
            medium: true,
            large: { left: '16px', right: 'x-small' },
          }}
        />
      )
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --space-t-s: 0.5rem; --space-r-s: 2rem; --space-t-m: 1rem; --space-r-m: 1rem; --space-b-m: 1rem; --space-l-m: 1rem; --space-r-l: 0.5rem; --space-l-l: 1rem;'
      )
    })
  })

  it('should validate with ARIA rules', async () => {
    const Component = render(<Section {...props} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Section scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-section-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
