/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import type {
  LogoProps} from '../Logo';
import Logo, {
  CarnegieDefault,
  SbankenDefault,
  SbankenCompact,
} from '../Logo'
import { render } from '@testing-library/react'
import Provider from '../../../shared/Provider'
import Theme from '../../../shared/Theme'

describe('Logo component', () => {
  it('renders with empty props', () => {
    const props: LogoProps = {}
    render(<Logo {...props} />)
    expect(document.querySelector('.dnb-logo')).toBeInTheDocument()
  })

  it('should set correct class when inheritColor is set', () => {
    render(<Logo inheritColor />)
    expect(document.querySelector('.dnb-logo')).toHaveClass(
      'dnb-logo--inherit-color'
    )
  })

  it('should set height when height is set', () => {
    render(<Logo height="48" />)
    expect(document.querySelector('.dnb-logo svg')).toHaveAttribute(
      'height',
      '48'
    )
  })

  it('should set correct class when inheritSize is true', () => {
    render(<Logo inheritSize />)
    expect(document.querySelector('.dnb-logo')).toHaveClass(
      'dnb-logo--inherit-size'
    )
  })

  it('should set correct DNB SVG', () => {
    render(<Logo />)
    expect(document.querySelector('svg')).toMatchSnapshot()
  })

  it('should set correct Sbanken brand SVG', () => {
    render(<Logo svg={SbankenDefault} />)
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
    render(<Logo svg={SbankenDefault} />)
    expect(document.querySelector('title').textContent).toBe(
      'Sbanken - et konsept fra DNB'
    )
    expect(
      document.querySelector('[role="img"]').getAttribute('alt')
    ).toBe('Sbanken - et konsept fra DNB')
  })

  it('should set correct Sbanken brand SVG in compact variant', () => {
    render(<Logo svg={SbankenCompact} />)
    expect(document.querySelector('svg')).toMatchSnapshot()
  })

  it('should support inline styling', () => {
    render(<Logo style={{ color: 'red' }} />)

    expect(document.querySelector('.dnb-logo').getAttribute('style')).toBe(
      'color: red;'
    )
  })

  it('should set role="img"', () => {
    render(<Logo />)
    expect(document.querySelector('.dnb-logo').getAttribute('role')).toBe(
      'img'
    )
  })

  it('should set custom class', () => {
    render(<Logo className="custom-selector" />)
    expect(document.querySelector('[role="img"]')).toHaveClass(
      'custom-selector'
    )
  })

  it('should inherit props from global provider', () => {
    render(<Logo svg={SbankenCompact} />)
    const refHTML = document.querySelector('svg').outerHTML

    render(
      <Provider
        Logo={{
          svg: SbankenCompact,
        }}
      >
        <Logo />
      </Provider>
    )

    const html = document.querySelector('svg').outerHTML
    expect(html).toBe(refHTML)
  })

  it('should inherit props from theme provider', () => {
    render(<Logo svg={SbankenCompact} />)
    const refHTML = document.querySelector('svg').outerHTML

    render(
      <Theme name="sbanken">
        <Logo svg={SbankenCompact} />
      </Theme>
    )

    const html = document.querySelector('svg').outerHTML
    expect(html).toBe(refHTML)
  })

  it('should render the DNB logo by default', () => {
    render(<Logo />)
    expect(document.querySelector('.dnb-logo')).toBeInTheDocument()
    expect(document.querySelector('.sbanken-logo')).not.toBeInTheDocument()
    expect(document.querySelector('title').textContent).toBe('DNB Logo')
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
      'dnb-logo--ui',
      'dnb-space__top--large',
    ])
  })

  it('should have a certain set of HTML classes', () => {
    const { rerender } = render(<Logo />)

    expect(Array.from(document.querySelector('span').classList)).toEqual([
      'dnb-logo',
      'dnb-logo--ui',
    ])

    rerender(<Logo svg={SbankenDefault} />)

    expect(Array.from(document.querySelector('span').classList)).toEqual([
      'dnb-logo',
      'dnb-logo--sbanken',
    ])
  })

  it('should have a certain set of HTML attributes', () => {
    render(<Logo top="2rem" title="HTML title" />)

    const element = document.querySelector('.dnb-logo')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual([
      'role',
      'aria-hidden',
      'class',
      'alt',
      'title',
    ])
  })

  it('should render a custom SVG and support height and color', () => {
    const CustomSvg = (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 10 10" {...props}>
        <circle cx="5" cy="5" r="5" />
      </svg>
    )

    render(<Logo svg={CustomSvg} height="48" color="tomato" />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('height', '48')
    expect(svg).toHaveAttribute('color', 'tomato')

    expect(document.querySelector('.dnb-logo')).toBeInTheDocument()
  })

  it('should render alt/title given in custom SVG', () => {
    const CustomSvg = ({
      alt,
      ...props
    }: React.SVGProps<SVGSVGElement> & { alt: React.ReactNode }) => (
      <svg viewBox="0 0 10 10" {...props}>
        <title>{alt}</title>
        <circle cx="5" cy="5" r="5" />
      </svg>
    )
    CustomSvg.alt = 'Custom SVG'

    render(<Logo svg={CustomSvg} />)

    const svg = document.querySelector('svg')
    expect(svg.querySelector('title')).toHaveTextContent('Custom SVG')
  })

  it('should render a custom SVG when provided as an element', () => {
    const CustomSvg = (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 10 10" {...props}>
        <rect width="10" height="10" />
      </svg>
    )

    render(<Logo svg={<CustomSvg />} width="24" />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('width', '24')
  })

  it('should export Carnegie logo', () => {
    render(<Logo svg={CarnegieDefault} height="24" />)

    const svg = document.querySelector('svg')
    expect(svg).toHaveAttribute('height', '24')
    expect(svg).toBeInTheDocument()
    expect(svg.querySelector('title')).toHaveTextContent('DNB Carnegie')
  })

  it('should keep the original viewBox on the svg', () => {
    const SvgFactory = (props) => (
      <svg viewBox="0 0 10 10" {...props}>
        <circle cx="5" cy="5" r="5" />
      </svg>
    )
    render(<Logo height="96" svg={SvgFactory} />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 10 10')
    expect(svg).toHaveAttribute('height', '96')
  })

  it('should not forward non-DOM props to svg', () => {
    const CustomSvg = (
      props: React.SVGProps<SVGSVGElement> & {
        propMapping?: unknown
        darkMode?: boolean
      }
    ) => {
      return (
        <svg viewBox="0 0 10 10" {...props}>
          <circle cx="5" cy="5" r="5" />
        </svg>
      )
    }

    // Provide a pre-constructed element with forbidden props present
    const element = <CustomSvg propMapping={{ a: 1 }} darkMode />
    render(<Logo svg={element} />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg.hasAttribute('propMapping')).toBe(false)
    expect(svg.hasAttribute('darkMode')).toBe(false)
  })

  it('should not forward non-DOM props when svg is a theme factory', () => {
    const SvgFactory = (props) => (
      <svg viewBox="0 0 10 10" {...props}>
        <circle cx="5" cy="5" r="5" />
      </svg>
    )
    render(<Logo svg={SvgFactory} />)

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    // Ensure known problematic keys are not present
    expect(svg.hasAttribute('isUi')).toBe(false)
  })

  describe('Logo accessibility', () => {
    it('should validate with ARIA rules', async () => {
      const Comp = render(<Logo aria-label="DNB Logo" />)
      expect(await axeComponent(Comp)).toHaveNoViolations()
    })
  })
})

describe('Logo scss', () => {
  it('should match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
