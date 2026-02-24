import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Provider from '../../../shared/Provider'
import HeroFormat from '../HeroFormat'
import Amount from '../Amount'

describe('HeroFormat', () => {
  it('renders amount and currency with default locale and currency order', () => {
    render(<HeroFormat.Amount value={12345.67} currency="NOK" />)

    const container = document.querySelector('.dnb-hero-format')
    const amount = document.querySelector('.dnb-hero-format__amount')
    const currency = document.querySelector('.dnb-hero-format__currency')

    expect(container).toBeInTheDocument()
    expect(amount).toBeInTheDocument()
    expect(currency).toBeInTheDocument()

    expect(amount.textContent).toBe('12 346')
    expect(currency.textContent).toBe('kr')
    expect(amount.classList).toContain('dnb-t__size--x-large')
    expect(currency.classList).toContain('dnb-t__size--x-small')

    expect(container.lastChild).toBe(
      document.querySelector('.dnb-sr-only')
    )
    expect(
      container.querySelector('.dnb-hero-format__content').children[0]
    ).toBe(amount)
  })

  it('renders currency before amount in en locale and keeps sr text', () => {
    render(
      <HeroFormat.Amount value={-12345.67} currency="NOK" locale="en-GB" />
    )

    const container = document.querySelector('.dnb-hero-format')
    const amount = document.querySelector('.dnb-hero-format__amount')
    const currency = document.querySelector('.dnb-hero-format__currency')
    const sr = document.querySelector('.dnb-hero-format .dnb-sr-only')

    expect(amount.textContent).toBe('-12,346')
    expect(currency.textContent).toBe('NOK')

    expect(
      container.querySelector('.dnb-hero-format__content').children[0]
    ).toBe(currency)

    expect(sr.getAttribute('data-text')).toContain('kroner')
  })

  it('supports prefix and suffix', () => {
    render(
      <HeroFormat.Amount
        value={12345.67}
        currency="NOK"
        prefix="Fra"
        suffix="/mnd"
      />
    )

    const content = document.querySelector('.dnb-hero-format__content')
    const prefix = document.querySelector('.dnb-hero-format__prefix')
    const suffix = document.querySelector('.dnb-hero-format__suffix')
    const sr = document.querySelector('.dnb-hero-format .dnb-sr-only')

    expect(prefix).toBeInTheDocument()
    expect(prefix.textContent).toBe('Fra')
    expect(suffix).toBeInTheDocument()
    expect(suffix.textContent).toBe('/mnd')
    expect(content.textContent).toBe('Fra 12 346 kr/mnd')
    expect(sr.getAttribute('data-text')).toContain('/mnd')
  })

  it('renders currency after amount when suffix starts with slash', () => {
    render(
      <HeroFormat.Amount
        locale="en-GB"
        value={1234}
        currency="NOK"
        suffix="/mnd"
      />
    )

    const content = document.querySelector('.dnb-hero-format__content')
    const amount = document.querySelector('.dnb-hero-format__amount')
    const currency = document.querySelector('.dnb-hero-format__currency')
    const suffix = document.querySelector('.dnb-hero-format__suffix')

    expect(content.textContent).toBe('1,234 NOK/mnd')
    expect(amount.textContent).toBe('1,234')
    expect(currency.textContent).toBe('NOK')
    expect(suffix.textContent).toBe('/mnd')
  })

  it('supports custom mainSize and auxiliarySize', () => {
    render(
      <HeroFormat.Amount
        value={12345.67}
        currency="NOK"
        mainSize="xx-large"
        auxiliarySize="basis"
        prefix="From"
      />
    )

    const amount = document.querySelector('.dnb-hero-format__amount')
    const currency = document.querySelector('.dnb-hero-format__currency')
    const prefix = document.querySelector('.dnb-hero-format__prefix')

    expect(amount.classList).toContain('dnb-t__size--xx-large')
    expect(amount.classList).not.toContain('dnb-t__size--x-large')
    expect(currency.classList).toContain('dnb-t__size--basis')
    expect(currency.classList).not.toContain('dnb-t__size--x-small')
    expect(prefix.classList).toContain('dnb-t__size--basis')
  })

  it('supports deprecated numberSize and currencySize aliases', () => {
    render(
      <HeroFormat.Amount
        value={12345.67}
        currency="NOK"
        numberSize="xx-large"
        currencySize="basis"
      />
    )

    const amount = document.querySelector('.dnb-hero-format__amount')
    const currency = document.querySelector('.dnb-hero-format__currency')

    expect(amount.classList).toContain('dnb-t__size--xx-large')
    expect(currency.classList).toContain('dnb-t__size--basis')
  })

  it('uses children as the value', () => {
    render(<HeroFormat.Amount currency="NOK">12345.67</HeroFormat.Amount>)

    const amount = document.querySelector('.dnb-hero-format__amount')
    expect(amount.textContent).toBe('12 346')
  })

  it('supports spacing props', () => {
    render(<HeroFormat.Amount value={123} currency="NOK" top="large" />)

    const container = document.querySelector('.dnb-hero-format')
    expect(container.classList).toContain('dnb-space__top--large')
  })

  it('supports skeleton', () => {
    render(<HeroFormat.Amount value={123} currency="NOK" skeleton />)

    const container = document.querySelector('.dnb-hero-format')
    expect(container.classList).toContain('dnb-skeleton')
    expect(container.classList).toContain('dnb-skeleton--font')
    expect(container).toHaveAttribute('aria-disabled', 'true')
    expect(container).toHaveAttribute('disabled')
  })

  it('supports currencyPosition before and after', () => {
    const { rerender } = render(
      <HeroFormat.Amount
        value={12345.67}
        currency="NOK"
        currencyPosition="before"
      />
    )

    let content = document.querySelector('.dnb-hero-format__content')
    let currency = document.querySelector('.dnb-hero-format__currency')
    let amount = document.querySelector('.dnb-hero-format__amount')

    expect(content.children[0]).toBe(currency)
    expect(content.children[1]).toBe(amount)

    rerender(
      <HeroFormat.Amount
        value={12345.67}
        currency="NOK"
        currencyPosition="after"
      />
    )

    content = document.querySelector('.dnb-hero-format__content')
    currency = document.querySelector('.dnb-hero-format__currency')
    amount = document.querySelector('.dnb-hero-format__amount')

    expect(content.children[0]).toBe(amount)
    expect(content.children[1]).toBe(currency)
  })

  it('supports hidden currency sign', () => {
    render(
      <HeroFormat.Amount
        value={12345.67}
        currency="NOK"
        currencyDisplay={false}
      />
    )

    const container = document.querySelector('.dnb-hero-format')
    const currency = document.querySelector('.dnb-hero-format__currency')

    expect(container).toBeInTheDocument()
    expect(currency.textContent).toBe('')
  })

  it('supports invalid values with sr text', () => {
    render(<HeroFormat.Amount value="invalid" currency="NOK" />)

    const container = document.querySelector('.dnb-hero-format')
    const amount = document.querySelector('.dnb-hero-format__amount')
    const sr = document.querySelector('.dnb-hero-format .dnb-sr-only')

    expect(container).toBeInTheDocument()
    expect(amount.textContent).toBe('–')
    expect(sr.getAttribute('data-text')).toBe('Ikke tilgjengelig')
  })

  it('supports srLabel in screen reader text', () => {
    render(
      <HeroFormat.Amount
        value={12345.67}
        currency="NOK"
        srLabel="Total amount:"
      />
    )

    const sr = document.querySelector('.dnb-hero-format .dnb-sr-only')
    expect(sr.getAttribute('data-text')).toContain('Total amount:')
  })

  it('supports signDisplay and renders plus for positive values', () => {
    const { rerender } = render(
      <HeroFormat.Amount
        value={12345.67}
        currency="NOK"
        signDisplay="always"
        locale="en-GB"
      />
    )

    const element = document.querySelector('.dnb-hero-format')
    const sr = element.querySelector('.dnb-sr-only')
    let amount = element.querySelector('.dnb-hero-format__amount')
    let sign = element.querySelector('.dnb-hero-format__sign')
    let content = element.querySelector('.dnb-hero-format__content')

    expect(content.textContent).toBe('+12,346NOK')
    expect(sign.textContent).toBe('+')
    expect(amount.textContent).toBe('12,346')
    expect(element.textContent).toContain('+12,346NOK')
    expect(sr.getAttribute('data-text')).toContain('+12,346 kroner')

    rerender(
      <HeroFormat.Amount
        value={-12345.67}
        currency="NOK"
        signDisplay="always"
        locale="en-GB"
      />
    )

    amount = element.querySelector('.dnb-hero-format__amount')
    sign = element.querySelector('.dnb-hero-format__sign')
    content = element.querySelector('.dnb-hero-format__content')

    expect(content.textContent).toBe('- 12,346NOK')
    expect(sign.textContent).toBe('-')
    expect(amount.textContent).toBe('12,346')
    expect(element.textContent).toContain('- 12,346NOK')
    expect(sr.getAttribute('data-text')).toContain('-12,346 kroner')

    rerender(
      <HeroFormat.Amount
        value={0}
        currency="NOK"
        signDisplay="exceptZero"
        locale="en-GB"
      />
    )

    amount = document.querySelector('.dnb-hero-format__amount')
    content = document.querySelector('.dnb-hero-format__content')
    expect(amount.textContent).toBe('0')
    expect(content.textContent).toBe('NOK 0')
    expect(sr.getAttribute('data-text')).toContain('0 kroner')
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <HeroFormat.Amount
        value={12345.67}
        currency="NOK"
        suffix="/mnd"
        signDisplay="always"
      />
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })

  it('renders a space between minus sign and amount when signDisplay is always', () => {
    render(
      <HeroFormat.Amount
        value={-12345.67}
        currency="NOK"
        signDisplay="always"
        locale="en-GB"
      />
    )

    const content = document.querySelector('.dnb-hero-format__content')
    expect(content.textContent).toBe('- 12,346NOK')
  })

  it('declares _supportsSpacingProps', () => {
    expect(Amount._supportsSpacingProps).toBe(true)
  })

  describe('inherits from context', () => {
    it('locale', () => {
      const { container } = render(
        <Provider locale="en-GB">
          <HeroFormat.Amount value={12345.67} currency="NOK" />
        </Provider>
      )

      const root = container.querySelector('.dnb-hero-format')
      const content = container.querySelector('.dnb-hero-format__content')
      const amount = container.querySelector('.dnb-hero-format__amount')
      const currency = container.querySelector(
        '.dnb-hero-format__currency'
      )

      expect(root).toHaveAttribute('lang', 'en-GB')
      expect(content.textContent).toBe('NOK 12,346')
      expect(amount.textContent).toBe('12,346')
      expect(currency.textContent).toBe('NOK')
    })

    it('skeleton', () => {
      const { container } = render(
        <Provider skeleton>
          <HeroFormat.Amount value={123} currency="NOK" />
        </Provider>
      )

      const root = container.querySelector('.dnb-hero-format')
      expect(root.classList).toContain('dnb-skeleton')
      expect(root.classList).toContain('dnb-skeleton--font')
      expect(root).toHaveAttribute('aria-disabled', 'true')
      expect(root).toHaveAttribute('disabled')
    })
  })
})
