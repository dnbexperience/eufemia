/**
 * Element Test
 *
 */

import { useRef } from 'react'
import type { RefObject } from 'react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import type { TypographyProps, TypographyUseProps } from '../Typography'
import Typography, {
  TypographyContext,
  useTypography,
} from '../Typography'
import P from '../P'
import { render } from '@testing-library/react'
import { Theme } from '../../../shared'

const props: TypographyProps = {
  size: 'medium',
  element: 'p',
}

describe('Typography element', () => {
  it('has p element as default', () => {
    render(<Typography />)

    const element = document.querySelector('.dnb-p')
    expect(element.tagName).toBe('P')
  })

  it('can set className', () => {
    render(<Typography className="my-class" weight="regular" />)
    const element = document.querySelector('.dnb-p')

    expect(element.classList.contains('dnb-p')).toBe(true)
    expect(element.classList.contains('my-class')).toBe(true)
    expect(element.classList.contains('dnb-t__weight--regular')).toBe(true)
  })

  it('has correct size and line height when size is defined', () => {
    render(<Typography size="large" />)
    const element = document.querySelector('.dnb-t__size--large')

    expect(element.classList.contains('dnb-p')).toBe(true)
    expect(element.classList.contains('dnb-t__line-height--large')).toBe(
      true
    )
    expect(element.classList.contains('dnb-t__size--large')).toBe(true)
  })

  it('should validate with ARIA rules as a p element', async () => {
    const Comp = render(<Typography {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  describe('proseMaxWidth', () => {
    it('applies proseMaxWidth style when provided', () => {
      render(<Typography proseMaxWidth={80}>Test text</Typography>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('80ch')
    })

    it('does not apply proseMaxWidth style when not provided', () => {
      render(<Typography>Test text</Typography>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('')
    })

    it('merges proseMaxWidth with existing styles', () => {
      render(
        <Typography proseMaxWidth={60} style={{ color: 'green' }}>
          Test text
        </Typography>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('60ch')
      expect(element.style.color).toBe('green')
    })

    it('works with different character widths', () => {
      render(<Typography proseMaxWidth={40}>Short text</Typography>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('40ch')
    })

    it('works with size and proseMaxWidth together', () => {
      render(
        <Typography size="x-large" proseMaxWidth={120}>
          Large text with width limit
        </Typography>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.classList.contains('dnb-p')).toBe(true)
      expect(
        element.classList.contains('dnb-t__line-height--x-large')
      ).toBe(true)
      expect(element.classList.contains('dnb-t__size--x-large')).toBe(true)
      expect(element.style.maxWidth).toBe('120ch')
    })

    it('works with all typography props and proseMaxWidth', () => {
      render(
        <Typography
          size="small"
          weight="bold"
          align="right"
          family="heading"
          decoration="underline"
          slant="italic"
          proseMaxWidth={90}
        >
          Styled text with width limit
        </Typography>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.classList.contains('dnb-p')).toBe(true)
      expect(element.classList.contains('dnb-t__line-height--small')).toBe(
        true
      )
      expect(element.classList.contains('dnb-t__size--small')).toBe(true)
      expect(element.classList.contains('dnb-t__align--right')).toBe(true)
      expect(element.classList.contains('dnb-t__family--heading')).toBe(
        true
      )
      expect(element.classList.contains('dnb-t__weight--bold')).toBe(true)
      expect(
        element.classList.contains('dnb-t__decoration--underline')
      ).toBe(true)
      expect(element.classList.contains('dnb-t__slant--italic')).toBe(true)
      expect(element.style.maxWidth).toBe('90ch')
    })

    it('works with custom element and proseMaxWidth', () => {
      render(
        <Typography element="span" proseMaxWidth={50}>
          Span text with width limit
        </Typography>
      )
      const element = document.querySelector('.dnb-span') as HTMLElement

      expect(element.tagName).toBe('SPAN')
      expect(element.style.maxWidth).toBe('50ch')
    })

    it('applies proseMaxWidth as 60ch when true', () => {
      render(<Typography proseMaxWidth>Test text</Typography>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('60ch')
    })

    it('works with proseMaxWidth from Provider when true', () => {
      render(
        <Typography.Provider proseMaxWidth>
          <Typography>Text with auto width</Typography>
        </Typography.Provider>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('60ch')
    })

    it('style maxWidth overrides proseMaxWidth prop', () => {
      render(
        <Typography proseMaxWidth={80} style={{ maxWidth: '30ch' }}>
          Test text
        </Typography>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('30ch')
    })

    it('style maxWidth overrides proseMaxWidth from Typography.Provider', () => {
      render(
        <Typography.Provider proseMaxWidth={80}>
          <Typography style={{ maxWidth: '30ch' }}>Test text</Typography>
        </Typography.Provider>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('30ch')
    })
  })

  describe('Typography.Provider', () => {
    it('applies proseMaxWidth from Provider to Typography children', () => {
      render(
        <Typography.Provider proseMaxWidth={80}>
          <Typography>Text with context width</Typography>
        </Typography.Provider>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('80ch')
    })

    it('uses prop value over Provider value when both are provided', () => {
      render(
        <Typography.Provider proseMaxWidth={80}>
          <Typography proseMaxWidth={120}>
            Text with explicit width
          </Typography>
        </Typography.Provider>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('120ch')
    })

    it('applies to multiple Typography children', () => {
      render(
        <Typography.Provider proseMaxWidth={70}>
          <Typography>First paragraph</Typography>
          <Typography>Second paragraph</Typography>
        </Typography.Provider>
      )
      const elements = document.querySelectorAll(
        '.dnb-p'
      ) as NodeListOf<HTMLElement>

      expect(elements.length).toBe(2)
      elements.forEach((element) => {
        expect(element.style.maxWidth).toBe('70ch')
      })
    })

    it('supports nested Providers with different values', () => {
      render(
        <Typography.Provider proseMaxWidth={80}>
          <Typography>Outer paragraph</Typography>
          <Typography.Provider proseMaxWidth={60}>
            <Typography>Inner paragraph</Typography>
          </Typography.Provider>
        </Typography.Provider>
      )

      const outerElement = document.querySelectorAll(
        '.dnb-p'
      )[0] as HTMLElement
      const innerElement = document.querySelectorAll(
        '.dnb-p'
      )[1] as HTMLElement

      expect(outerElement.style.maxWidth).toBe('80ch')
      expect(innerElement.style.maxWidth).toBe('60ch')
    })

    it('inner Provider overrides outer Provider', () => {
      render(
        <Typography.Provider proseMaxWidth={100}>
          <Typography>Outer paragraph</Typography>
          <Typography.Provider proseMaxWidth={50}>
            <Typography>Inner paragraph</Typography>
          </Typography.Provider>
        </Typography.Provider>
      )

      const outerElement = document.querySelectorAll(
        '.dnb-p'
      )[0] as HTMLElement
      const innerElement = document.querySelectorAll(
        '.dnb-p'
      )[1] as HTMLElement

      expect(outerElement.style.maxWidth).toBe('100ch')
      expect(innerElement.style.maxWidth).toBe('50ch')
    })

    it('works with mixed Typography and P components', () => {
      render(
        <Typography.Provider proseMaxWidth={75}>
          <Typography>Typography component</Typography>
          <P>Paragraph component</P>
        </Typography.Provider>
      )

      const typographyElement = document.querySelectorAll(
        '.dnb-p'
      )[0] as HTMLElement
      const pElement = document.querySelectorAll(
        '.dnb-p'
      )[1] as HTMLElement

      expect(typographyElement.style.maxWidth).toBe('75ch')
      expect(pElement.style.maxWidth).toBe('75ch')
    })

    it('does not apply maxWidth when Provider value is undefined', () => {
      render(
        <Typography.Provider>
          <Typography>No width limit</Typography>
        </Typography.Provider>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('')
    })
  })

  it('gets valid ref element', () => {
    let ref: RefObject<HTMLElement>

    function MockComponent() {
      ref = useRef<HTMLElement | null>(null)
      return <Typography ref={ref}>content</Typography>
    }

    render(<MockComponent />)

    expect(ref.current instanceof HTMLParagraphElement).toBe(true)
    expect(ref.current.tagName).toBe('P')
    expect(ref.current.classList).toContain('dnb-p')
  })

  it('gets valid ref element with custom element', () => {
    let ref: RefObject<HTMLElement>

    function MockComponent() {
      ref = useRef<HTMLElement | null>(null)
      return (
        <Typography element="span" ref={ref}>
          content
        </Typography>
      )
    }

    render(<MockComponent />)

    expect(ref.current instanceof HTMLSpanElement).toBe(true)
    expect(ref.current.tagName).toBe('SPAN')
  })

  it('gets valid element when ref is function', () => {
    let refElement: HTMLElement

    function refFn(elem: HTMLElement) {
      refElement = elem
    }

    render(<Typography ref={refFn}>content</Typography>)

    expect(refElement instanceof HTMLParagraphElement).toBe(true)
    expect(refElement.tagName).toBe('P')
    expect(refElement.classList).toContain('dnb-p')
  })

  describe('surface', () => {
    it('does not apply dark surface class by default', () => {
      render(<Typography>Default text</Typography>)

      const element = document.querySelector('.dnb-p')

      expect(element.classList.contains('dnb-t--surface-dark')).toBe(false)
    })

    it('applies dark surface class from Theme.Context', () => {
      render(
        <Theme.Context surface="dark">
          <Typography>Context dark text</Typography>
        </Theme.Context>
      )

      const element = document.querySelector('.dnb-p')

      expect(element.classList.contains('dnb-t--surface-dark')).toBe(true)
    })
  })
})

describe('useTypography', () => {
  function Fixture(props: TypographyUseProps & { randomProp?: string }) {
    // @ts-expect-error: ts(2339) proseMaxWidth is intentionally omitted from the return type
    const { randomProp, proseMaxWidth, ...result } = useTypography(props)
    return (
      <div
        data-testid="result"
        {...result}
        data-random-prop={randomProp}
        data-prose-max-width-prop={proseMaxWidth}
      />
    )
  }

  it('removes proseMaxWidth from props', () => {
    render(<Fixture proseMaxWidth={80} randomProp="test" />)
    const el = document.querySelector(
      '[data-testid="result"]'
    ) as HTMLElement
    expect(el.dataset.proseMaxWidthProp).toBeUndefined()
  })

  it('returns no style when proseMaxWidth is not set', () => {
    render(<Fixture />)
    const el = document.querySelector(
      '[data-testid="result"]'
    ) as HTMLElement

    expect(el.style.maxWidth).toBe('')
  })
  it('returns maxWidth style from proseMaxWidth prop (number)', () => {
    render(<Fixture proseMaxWidth={80} />)
    const el = document.querySelector(
      '[data-testid="result"]'
    ) as HTMLElement

    expect(el.style.maxWidth).toBe('80ch')
  })

  it('returns 60ch when proseMaxWidth is true', () => {
    render(<Fixture proseMaxWidth />)
    const el = document.querySelector(
      '[data-testid="result"]'
    ) as HTMLElement

    expect(el.style.maxWidth).toBe('60ch')
  })

  it('reads proseMaxWidth from TypographyContext when prop is not set', () => {
    render(
      <TypographyContext value={{ proseMaxWidth: 50 }}>
        <Fixture />
      </TypographyContext>
    )
    const el = document.querySelector(
      '[data-testid="result"]'
    ) as HTMLElement

    expect(el.style.maxWidth).toBe('50ch')
  })

  it('prop value takes priority over TypographyContext', () => {
    render(
      <TypographyContext value={{ proseMaxWidth: 50 }}>
        <Fixture proseMaxWidth={120} />
      </TypographyContext>
    )
    const el = document.querySelector(
      '[data-testid="result"]'
    ) as HTMLElement

    expect(el.style.maxWidth).toBe('120ch')
  })

  it('style prop maxWidth overrides proseMaxWidth prop', () => {
    render(<Fixture proseMaxWidth={80} style={{ maxWidth: '30ch' }} />)
    const el = document.querySelector(
      '[data-testid="result"]'
    ) as HTMLElement

    expect(el.style.maxWidth).toBe('30ch')
  })

  it('style prop maxWidth overrides proseMaxWidth from TypographyContext', () => {
    render(
      <TypographyContext value={{ proseMaxWidth: 80 }}>
        <Fixture style={{ maxWidth: '30ch' }} />
      </TypographyContext>
    )
    const el = document.querySelector(
      '[data-testid="result"]'
    ) as HTMLElement

    expect(el.style.maxWidth).toBe('30ch')
  })

  it('merges proseMaxWidth style with other style props', () => {
    render(<Fixture proseMaxWidth={60} style={{ color: 'red' }} />)
    const el = document.querySelector(
      '[data-testid="result"]'
    ) as HTMLElement

    expect(el.style.maxWidth).toBe('60ch')
    expect(el.style.color).toBe('red')
  })

  it('passes through other props untouched', () => {
    render(
      <Fixture
        proseMaxWidth={60}
        style={{ color: 'blue' }}
        randomProp="test"
      />
    )
    const el = document.querySelector(
      '[data-testid="result"]'
    ) as HTMLElement

    expect(el.dataset.randomProp).toBe('test')
  })
})
