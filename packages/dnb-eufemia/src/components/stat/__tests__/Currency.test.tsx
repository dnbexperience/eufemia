import { render } from '@testing-library/react'
import {
  axeComponent,
  spyOnEufemiaWarn,
} from '../../../core/test-utils/testSetup'
import Stat from '../Stat'

describe('Stat.Currency', () => {
  let log: ReturnType<typeof spyOnEufemiaWarn>

  beforeEach(() => {
    log = spyOnEufemiaWarn()
  })

  afterEach(() => {
    log.mockRestore()
  })
  it('renders currency by default', () => {
    render(<Stat.Currency value={12345.67} />)

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.textContent).toBe('12 346')
    expect(currency).toBeInTheDocument()
    expect(currency.textContent).toBe('kr')
    expect(document.querySelector('.dnb-animated-digits')).toBeNull()
  })

  describe('animated updates', () => {
    it('isolates the complete animated amount from the page direction', () => {
      render(<Stat.Currency value={1234} animate dir="rtl" />)

      expect(document.querySelector('.dnb-stat__content')).toHaveAttribute(
        'dir',
        'ltr'
      )
    })

    it.each([Stat.Currency, Stat.Percent])(
      'animates the numeric width without translating the symbol (%#)',
      (Component) => {
        const animate = vi.fn(() => ({ cancel: vi.fn() }))
        const originalAnimate = HTMLElement.prototype.animate
        HTMLElement.prototype.animate =
          animate as unknown as typeof originalAnimate
        const geometry = vi
          .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
          .mockImplementation(function (this: HTMLElement) {
            return { width: this.textContent.length * 10 } as DOMRect
          })
        vi.stubGlobal('matchMedia', () => ({
          matches: false,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }))

        try {
          const { rerender, unmount } = render(
            <Component value={99} animate />
          )
          const symbol = document.querySelector(
            '.dnb-stat__currency, .dnb-stat__percent'
          )
          rerender(<Component value={1000} animate />)

          expect(animate).toHaveBeenCalledWith(
            [{ width: '20px' }, { width: '50px' }],
            { duration: 160, easing: 'ease-out' }
          )
          expect(animate.mock.contexts[0]).toBe(
            document.querySelector('.dnb-animated-digits')
          )
          expect(
            document.querySelector(
              '.dnb-stat__currency, .dnb-stat__percent'
            )
          ).toBe(symbol)
          unmount()
        } finally {
          HTMLElement.prototype.animate = originalAnimate
          geometry.mockRestore()
          vi.unstubAllGlobals()
        }
      }
    )

    it.each([Stat.Number, Stat.Currency, Stat.Percent])(
      'supports animated updates across numeric Stat components (%#)',
      (Component) => {
        const { rerender } = render(
          <Component value={12} animate={{ reserveWidth: '4ch' }} />
        )

        rerender(
          <Component value={34} animate={{ reserveWidth: '4ch' }} />
        )

        expect(
          document.querySelector('.dnb-stat__amount')
        ).toHaveTextContent('34')
        expect(
          document.querySelectorAll(
            '.dnb-animated-digits__character--changed .dnb-animated-digits__value'
          )
        ).toHaveLength(2)
        expect(
          document.querySelector<HTMLElement>('.dnb-animated-digits').style
            .minInlineSize
        ).toBe('4ch')
      }
    )

    it('shows the initial value without animation', () => {
      render(<Stat.Currency value={1234} animate />)

      expect(document.querySelector('.dnb-stat__amount').textContent).toBe(
        '1 234'
      )
      expect(
        document.querySelectorAll(
          '.dnb-animated-digits__character--changed'
        )
      ).toHaveLength(0)
    })

    it('rolls only changed digits and exposes the final amount immediately', () => {
      const { rerender } = render(<Stat.Currency value={1234} animate />)
      const currency = document.querySelector('.dnb-stat__currency')

      rerender(<Stat.Currency value={1278} animate />)

      expect(document.querySelector('.dnb-stat__amount').textContent).toBe(
        '1 278'
      )
      expect(
        Array.from(
          document.querySelectorAll(
            '.dnb-animated-digits__character--changed'
          )
        ).map((digit) =>
          digit
            .querySelector('[data-previous]')
            ?.getAttribute('data-previous')
        )
      ).toEqual(['3', '4'])
      expect(
        document.querySelector('.dnb-sr-only').getAttribute('data-text')
      ).toContain('1 278')
      expect(document.querySelector('.dnb-stat__currency')).toBe(currency)
      expect(document.querySelector('.dnb-stat__content')).toHaveAttribute(
        'aria-hidden',
        'true'
      )
    })

    it('replaces an unfinished transition with the latest value', () => {
      const { rerender } = render(<Stat.Currency value={99} animate />)

      rerender(<Stat.Currency value={1000} animate />)
      rerender(<Stat.Currency value={10} animate />)

      expect(document.querySelector('.dnb-stat__amount').textContent).toBe(
        '10'
      )
      expect(
        document.querySelector('.dnb-animated-digits__previous')
      ).toHaveAttribute('data-previous', '0')
      expect(document.querySelector('.dnb-animated-digits')).toHaveClass(
        'dnb-animated-digits--down'
      )
    })

    it('updates locale and decimals without rolling unchanged values', () => {
      const { rerender } = render(
        <Stat.Currency
          value={1234.5}
          decimals={2}
          locale="nb-NO"
          animate
        />
      )

      rerender(
        <Stat.Currency
          value={1234.5}
          decimals={2}
          locale="en-GB"
          animate
        />
      )

      expect(document.querySelector('.dnb-stat__amount').textContent).toBe(
        '1,234.50'
      )
      expect(
        document.querySelectorAll(
          '.dnb-animated-digits__character--changed'
        )
      ).toHaveLength(0)
    })

    it.each([null, ''])(
      'does not animate from a missing value (%s)',
      (value) => {
        const { rerender } = render(
          <Stat.Currency value={value} animate />
        )
        rerender(<Stat.Currency value={1234} animate />)

        expect(
          document.querySelectorAll(
            '.dnb-animated-digits__character--changed'
          )
        ).toHaveLength(0)
      }
    )

    it('does not animate when formatting and value change together', () => {
      const { rerender } = render(
        <Stat.Currency value={99} locale="nb-NO" animate />
      )
      rerender(<Stat.Currency value={1000} locale="en-GB" animate />)

      expect(
        document.querySelectorAll(
          '.dnb-animated-digits__character--changed'
        )
      ).toHaveLength(0)
    })

    it('keeps negative values and decimal separators in the formatted amount', () => {
      const { rerender } = render(
        <Stat.Currency value={1.5} decimals={2} animate />
      )

      rerender(<Stat.Currency value={-2.75} decimals={2} animate />)

      expect(document.querySelector('.dnb-stat__amount').textContent).toBe(
        '−2,75'
      )
      expect(
        Array.from(
          document.querySelectorAll(
            '.dnb-animated-digits__character--changed .dnb-animated-digits__value'
          )
        ).map((digit) => digit.getAttribute('data-text'))
      ).toEqual(['2', '7', '5'])
    })

    it('starts without animation when loading finishes', () => {
      const { rerender } = render(
        <Stat.Currency value={0} animate skeleton />
      )

      expect(document.querySelector('.dnb-animated-digits')).toBeNull()

      rerender(<Stat.Currency value={1234} animate skeleton={false} />)

      expect(document.querySelector('.dnb-stat__amount').textContent).toBe(
        '1 234'
      )
      expect(
        document.querySelectorAll(
          '.dnb-animated-digits__character--changed'
        )
      ).toHaveLength(0)
    })
  })

  it('supports custom currency codes', () => {
    render(
      <Stat.Currency
        value={12345.67}
        currency="EUR"
        currencyDisplay="code"
      />
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.textContent).toBe('12 346')
    expect(currency.textContent).toBe('EUR')
  })

  describe('compact', () => {
    it('renders currency suffix and symbol', () => {
      render(<Stat.Currency value={1300000} compact decimals={1} />)

      const content = document.querySelector('.dnb-stat__content')
      const amount = document.querySelector('.dnb-stat__amount')
      const currency = document.querySelector('.dnb-stat__currency')

      expect(content.textContent).toBe('1,3 mill. kr')
      expect(amount.textContent).toBe('1,3 mill.')
      expect(currency.textContent).toBe('kr')
    })

    it('keeps compact suffix in the amount when auxiliarySize is set', () => {
      render(
        <Stat.Currency
          value={1300000}
          compact
          decimals={1}
          mainSize="x-large"
          auxiliarySize="basis"
        />
      )

      const amount = document.querySelector('.dnb-stat__amount')
      const currency = document.querySelector('.dnb-stat__currency')

      expect(amount.textContent).toBe('1,3 mill.')
      expect(amount.classList).toContain('dnb-t__size--x-large')
      expect(currency.textContent).toBe('kr')
      expect(currency.classList).toContain('dnb-t__size--basis')
    })
  })

  it('supports sign tone colorization', () => {
    render(
      <Stat.Currency
        value={12345.67}
        signDisplay="always"
        colorizeBySign
      />
    )

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-stat--tone-positive')
    expect(root.classList).not.toContain('dnb-stat--tone-negative')
  })

  it('supports auxiliaryWeight', () => {
    render(<Stat.Currency value={12345.67} auxiliaryWeight="bold" />)

    const currency = document.querySelector('.dnb-stat__currency')

    expect(currency.classList).toContain('dnb-t__weight--bold')
  })

  it('supports fontSize and allows mainSize to override it', () => {
    const { rerender } = render(
      <Stat.Currency value={12345.67} fontSize="x-large" />
    )

    let amount = document.querySelector('.dnb-stat__amount')
    let currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--x-large')
    expect(currency.classList).toContain('dnb-t__size--x-large')

    rerender(
      <Stat.Currency
        value={12345.67}
        fontSize="x-large"
        mainSize="xx-large"
      />
    )

    amount = document.querySelector('.dnb-stat__amount')
    currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--xx-large')
    expect(currency.classList).toContain('dnb-t__size--x-large')
  })

  it('uses basis size by default when rendered inside Stat.Trend', () => {
    render(
      <Stat.Trend>
        <Stat.Currency value={12345.67} />
      </Stat.Trend>
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--basis')
    expect(currency.classList).toContain('dnb-t__size--basis')
  })

  it('uses basis size by default when rendered inside Stat.Info', () => {
    render(
      <Stat.Info>
        <Stat.Currency value={12345.67} />
      </Stat.Info>
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--basis')
    expect(currency.classList).toContain('dnb-t__size--basis')
  })

  it('uses regular mainWeight by default when rendered inside Stat.Info', () => {
    render(
      <Stat.Info>
        <Stat.Currency value={12345.67} />
      </Stat.Info>
    )

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.classList).toContain('dnb-t__weight--regular')
    expect(amount.classList).not.toContain('dnb-t__weight--medium')
  })

  it('supports spacing props', () => {
    render(<Stat.Currency value={1234} top="large" />)

    const root = document.querySelector('.dnb-stat')

    expect(root.classList).toContain('dnb-space__top--large')
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Currency
        value={12345.67}
        signDisplay="always"
        srLabel="Revenue"
      />
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })

  it('renders currency with space after currency in en-GB locale', () => {
    const { container } = render(
      <Stat.Currency value={12345.67} currency="NOK" locale="en-GB" />
    )

    const content = container.querySelector('.dnb-stat__content')
    const amount = container.querySelector('.dnb-stat__amount')
    const currency = container.querySelector('.dnb-stat__currency')

    // Check individual parts
    expect(currency.textContent).toBe('NOK')
    expect(amount.textContent).toBe('12,346')

    // Check that currency is before amount
    expect(content.innerHTML.indexOf('dnb-stat__currency')).toBeLessThan(
      content.innerHTML.indexOf('dnb-stat__amount')
    )

    // Verify screen-reader text includes the currency and amount
    const srOnly = container.querySelector('.dnb-sr-only')
    expect(srOnly.getAttribute('data-text')).toContain('12,346')
    expect(srOnly.getAttribute('data-text')).toContain('kroner')
  })

  it('renders space between currency and suffix without slash', () => {
    render(<Stat.Currency value={1234} suffix="per mnd" />)

    const suffix = document.querySelector('.dnb-stat__suffix')
    const content = document.querySelector('.dnb-stat__content')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(suffix.textContent).toBe('per mnd')
    expect(content.textContent).toContain('kr\u00A0per mnd')
    expect(sr.getAttribute('data-text')).toContain('kroner per mnd')
  })

  it('renders space between prefix and currency', () => {
    render(<Stat.Currency value={1234} locale="en-GB" prefix="From" />)

    const prefix = document.querySelector('.dnb-stat__prefix')
    const content = document.querySelector('.dnb-stat__content')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(prefix.textContent).toBe('From')
    expect(content.textContent).toContain('From\u00A0NOK')
    expect(sr.getAttribute('data-text')).toContain('From 1,234 kroner')
  })
})
