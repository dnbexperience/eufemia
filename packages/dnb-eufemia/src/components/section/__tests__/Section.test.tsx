/**
 * Component Test
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import type { SectionAllProps } from '../Section'
import Section from '../Section'
import Provider from '../../../shared/Provider'
import Theme from '../../../shared/Theme'
import Context from '../../../shared/Context'

const props: SectionAllProps = {
  backgroundColor: 'mint-green-12',
}

describe('Section component', () => {
  it('should have correct styles', () => {
    render(<Section variant="divider" />)
    expect(
      document.querySelector('section.dnb-section').classList
    ).toContain('dnb-section--divider')
  })

  it('should support "variant" prop', () => {
    const { rerender } = render(<Section variant="warning">text</Section>)

    const element = document.querySelector('section.dnb-section')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-section',
      'dnb-section--warning',
    ])

    rerender(<Section variant="information">text</Section>)

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-section',
      'dnb-section--information',
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
      <Provider Section={{ variant: 'divider' }}>
        <Section />
      </Provider>
    )

    expect(
      document.querySelector('section.dnb-section').classList
    ).toContain('dnb-section--divider')
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
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none; font-size: 2rem;'
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
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --background-color--small: var(--color-fire-red); --background-color--medium: var(--color-fire-red); --background-color--large: var(--color-fire-red); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none;'
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
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --background-color--small: var(--color-fire-red); --background-color--medium: var(--color-success-green); --background-color--large: var(--color-black); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none;'
      )
    })

    it('should support "textColor"', () => {
      const { rerender } = render(<Section textColor="fire-red" />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --text-color--small: var(--color-fire-red); --text-color--medium: var(--color-fire-red); --text-color--large: var(--color-fire-red); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none;'
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
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --text-color--small: var(--color-fire-red); --text-color--medium: var(--color-success-green); --text-color--large: var(--color-black); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none;'
      )
    })

    it('should support "breakout"', () => {
      const { rerender } = render(<Section breakout={false} />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--off); --breakout--medium: var(--breakout--off); --breakout--large: var(--breakout--off); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none;'
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
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--off); --breakout--large: var(--breakout--on); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none;'
      )
    })

    it('should support "roundedCorner"', () => {
      const { rerender } = render(
        <Section roundedCorner={false} breakout={false} />
      )
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--off); --breakout--medium: var(--breakout--off); --breakout--large: var(--breakout--off); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none;'
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
        '--breakout--small: var(--breakout--off); --breakout--medium: var(--breakout--off); --breakout--large: var(--breakout--off); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none; --rounded-corner--small: var(--rounded-corner--value); --rounded-corner--large: var(--rounded-corner--value);'
      )
    })

    it('should support "innerSpace"', () => {
      const { rerender } = render(<Section innerSpace={true} />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none; --padding-t-s: 1rem; --padding-r-s: 1rem; --padding-b-s: 1rem; --padding-l-s: 1rem; --padding-t-m: 1rem; --padding-r-m: 1rem; --padding-b-m: 1rem; --padding-l-m: 1rem; --padding-t-l: 1rem; --padding-r-l: 1rem; --padding-b-l: 1rem; --padding-l-l: 1rem;'
      )

      rerender(<Section innerSpace="large medium small" />)
      expect(
        document.querySelector('.dnb-section').getAttribute('style')
      ).toBe(
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none; --padding-t-s: 4.5rem; --padding-r-s: 4.5rem; --padding-b-s: 4.5rem; --padding-l-s: 4.5rem; --padding-t-m: 4.5rem; --padding-r-m: 4.5rem; --padding-b-m: 4.5rem; --padding-l-m: 4.5rem; --padding-t-l: 4.5rem; --padding-r-l: 4.5rem; --padding-b-l: 4.5rem; --padding-l-l: 4.5rem;'
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
        '--breakout--small: var(--breakout--on); --breakout--medium: var(--breakout--on); --breakout--large: var(--breakout--on); --outline-width--small: none; --outline-width--medium: none; --outline-width--large: none; --padding-t-s: 0.5rem; --padding-r-s: 2rem; --padding-t-m: 1rem; --padding-r-m: 1rem; --padding-b-m: 1rem; --padding-l-m: 1rem; --padding-r-l: 0.5rem; --padding-l-l: 1rem;'
      )
    })
  })

  it('should validate with ARIA rules', async () => {
    const Component = render(<Section {...props} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLElement>

    function MockComponent() {
      ref = React.useRef<HTMLElement | null>(null)
      return (
        <Section {...props} ref={ref}>
          content
        </Section>
      )
    }

    render(<MockComponent />)

    expect(ref.current instanceof HTMLElement).toBe(true)
    expect(ref.current.tagName).toBe('SECTION')
    expect(ref.current.classList).toContain('dnb-section')
  })

  it('gets valid element when using createRef', () => {
    const ref: React.RefObject<HTMLElement | null> = { current: null }

    render(
      <Section {...props} ref={ref}>
        content
      </Section>
    )

    expect(ref.current instanceof HTMLElement).toBe(true)
    expect(ref.current.tagName).toBe('SECTION')
    expect(ref.current.classList).toContain('dnb-section')
  })
})

describe('surface', () => {
  it('adds surface-dark class when surface is "dark"', () => {
    render(<Section surface="dark">content</Section>)

    const element = document.querySelector('section.dnb-section')
    expect(element.classList).toContain('dnb-section--surface-dark')
  })

  it('wraps children in Theme.Context when surface is set', () => {
    let receivedSurface: string | undefined

    function Consumer() {
      const context = React.useContext(Context)
      receivedSurface = context?.theme?.surface
      return null
    }

    render(
      <Section surface="dark">
        <Consumer />
      </Section>
    )

    expect(receivedSurface).toBe('dark')
  })

  it('inherits surface from Theme context', () => {
    render(
      <Theme surface="dark">
        <Section>content</Section>
      </Theme>
    )

    const element = document.querySelector('section.dnb-section')
    expect(element.classList).toContain('dnb-section--surface-dark')
  })

  it('does not inherit surface from Theme context when surface is set by props', () => {
    render(
      <Theme surface="dark">
        <Section surface="light">content</Section>
      </Theme>
    )

    const element = document.querySelector('section.dnb-section')
    expect(element.classList).not.toContain('dnb-section--surface-dark')
  })

  it('resets surface when "initial" even inside dark Theme context', () => {
    render(
      <Theme surface="dark">
        <Section surface="initial">content</Section>
      </Theme>
    )

    const element = document.querySelector('section.dnb-section')
    expect(element.classList).not.toContain('dnb-section--surface-dark')
  })

  it('resets surface context to undefined when "initial"', () => {
    let receivedSurface: string | undefined

    function Consumer() {
      const context = React.useContext(Context)
      receivedSurface = context?.theme?.surface
      return null
    }

    render(
      <Theme surface="dark">
        <Section surface="initial">
          <Consumer />
        </Section>
      </Theme>
    )

    expect(receivedSurface).toBeUndefined()
  })
})

describe('Section scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
