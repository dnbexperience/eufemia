import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Provider from '../../../shared/Provider'
import Stat from '../Stat'
import Amount from '../Amount'

describe('Stat.Amount', () => {
  it('renders plain amount by default without currency', () => {
    render(<Stat.Amount value={12345.67} />)

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')
    const content = document.querySelector('.dnb-stat__content')

    expect(amount.textContent).toBe('12 346')
    expect(currency).not.toBeInTheDocument()
    expect(content.textContent).toBe('12 346')
  })

  it('renders amount and currency with default locale and currency order', () => {
    render(<Stat.Amount value={12345.67} currency="NOK" />)

    const container = document.querySelector('.dnb-stat')
    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(container).toBeInTheDocument()
    expect(amount).toBeInTheDocument()
    expect(currency).toBeInTheDocument()

    expect(amount.textContent).toBe('12 346')
    expect(currency.textContent).toBe('kr')
    expect(amount.classList).toContain('dnb-t__size--large')
    expect(amount.classList).toContain('dnb-t__line-height--medium')
    expect(currency.classList).toContain('dnb-t__size--large')
    expect(currency.classList).toContain('dnb-t__line-height--medium')

    expect(container.lastChild).toBe(
      document.querySelector('.dnb-sr-only')
    )
    expect(container.querySelector('.dnb-stat__content').children[0]).toBe(
      amount
    )
  })

  it('renders currency before amount in en locale and keeps sr text', () => {
    render(<Stat.Amount value={-12345.67} currency="NOK" locale="en-GB" />)

    const container = document.querySelector('.dnb-stat')
    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(amount.textContent).toBe('-12,346')
    expect(currency.textContent).toBe('NOK')

    expect(container.querySelector('.dnb-stat__content').children[0]).toBe(
      currency
    )

    expect(sr.getAttribute('data-text')).toContain('kroner')
  })

  it('supports prefix and suffix', () => {
    render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        prefix="Fra"
        suffix="/mnd"
      />
    )

    const content = document.querySelector('.dnb-stat__content')
    const prefix = document.querySelector('.dnb-stat__prefix')
    const suffix = document.querySelector('.dnb-stat__suffix')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(prefix).toBeInTheDocument()
    expect(prefix.textContent).toBe('Fra')
    expect(suffix).toBeInTheDocument()
    expect(suffix.textContent).toBe('/mnd')
    expect(content.textContent).toBe('Fra 12 346 kr/mnd')
    expect(sr.getAttribute('data-text')).toContain('/mnd')
  })

  it('renders currency after amount when suffix starts with slash', () => {
    render(
      <Stat.Amount
        locale="en-GB"
        value={1234}
        currency="NOK"
        suffix="/mnd"
      />
    )

    const content = document.querySelector('.dnb-stat__content')
    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')
    const suffix = document.querySelector('.dnb-stat__suffix')

    expect(content.textContent).toBe('1,234 NOK/mnd')
    expect(amount.textContent).toBe('1,234')
    expect(currency.textContent).toBe('NOK')
    expect(suffix.textContent).toBe('/mnd')
  })

  it('supports custom mainSize and auxiliarySize', () => {
    render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        mainSize="xx-large"
        auxiliarySize="basis"
        prefix="From"
      />
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')
    const prefix = document.querySelector('.dnb-stat__prefix')

    expect(amount.classList).toContain('dnb-t__size--xx-large')
    expect(amount.classList).not.toContain('dnb-t__size--large')
    expect(amount.classList).toContain('dnb-t__line-height--xx-large')
    expect(currency.classList).toContain('dnb-t__size--basis')
    expect(currency.classList).not.toContain('dnb-t__size--large')
    expect(currency.classList).toContain('dnb-t__line-height--basis')
    expect(prefix.classList).toContain('dnb-t__size--basis')
    expect(prefix.classList).toContain('dnb-t__line-height--basis')
  })

  it('supports fontSize as fallback for both main and auxiliary sizes', () => {
    render(
      <Stat.Amount value={12345.67} currency="NOK" fontSize="x-large" />
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--x-large')
    expect(currency.classList).toContain('dnb-t__size--x-large')
  })

  it('lets mainSize and auxiliarySize override fontSize', () => {
    render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        fontSize="x-large"
        mainSize="xx-large"
        auxiliarySize="basis"
      />
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--xx-large')
    expect(amount.classList).not.toContain('dnb-t__size--x-large')
    expect(currency.classList).toContain('dnb-t__size--basis')
    expect(currency.classList).not.toContain('dnb-t__size--x-large')
  })

  it('uses basis size by default when rendered inside Stat.Trend', () => {
    render(
      <Stat.Trend>
        <Stat.Amount value={1234} currency="NOK" />
      </Stat.Trend>
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--basis')
    expect(currency.classList).toContain('dnb-t__size--basis')
  })

  it('keeps explicit sizes when rendered inside Stat.Trend', () => {
    render(
      <Stat.Trend>
        <Stat.Amount
          value={1234}
          currency="NOK"
          mainSize="x-large"
          auxiliarySize="small"
        />
      </Stat.Trend>
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--x-large')
    expect(currency.classList).toContain('dnb-t__size--small')
  })

  it('uses basis size by default when rendered inside Stat.Info', () => {
    render(
      <Stat.Info>
        <Stat.Amount value={1234} currency="NOK" />
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
        <Stat.Amount value={1234} />
      </Stat.Info>
    )

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.classList).toContain('dnb-t__weight--regular')
    expect(amount.classList).not.toContain('dnb-t__weight--medium')
  })

  it('keeps medium mainWeight by default when rendered inside Stat.Trend', () => {
    render(
      <Stat.Trend>
        <Stat.Amount value={1234} />
      </Stat.Trend>
    )

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.classList).toContain('dnb-t__weight--medium')
    expect(amount.classList).not.toContain('dnb-t__weight--regular')
  })

  it('supports custom mainWeight', () => {
    render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        signDisplay="always"
        mainWeight="bold"
      />
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const sign = document.querySelector('.dnb-stat__sign')

    expect(amount.classList).toContain('dnb-t__weight--bold')
    expect(sign.classList).toContain('dnb-t__weight--bold')
  })

  it('supports custom auxWeight', () => {
    render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        prefix="From"
        auxWeight="bold"
      />
    )

    const currency = document.querySelector('.dnb-stat__currency')
    const prefix = document.querySelector('.dnb-stat__prefix')

    expect(currency.classList).toContain('dnb-t__weight--bold')
    expect(prefix.classList).toContain('dnb-t__weight--bold')
  })

  it('uses medium auxWeight when main and auxiliary sizes are equal and mainWeight is omitted', () => {
    render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        mainSize="large"
        auxiliarySize="large"
      />
    )

    const currency = document.querySelector('.dnb-stat__currency')

    expect(currency.classList).toContain('dnb-t__weight--medium')
  })

  it('does not force medium auxWeight when mainWeight is set', () => {
    render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        mainSize="large"
        auxiliarySize="large"
        mainWeight="regular"
      />
    )

    const currency = document.querySelector('.dnb-stat__currency')

    expect(currency.classList).not.toContain('dnb-t__weight--medium')
  })

  it('uses children as the value', () => {
    render(<Stat.Amount currency="NOK">12345.67</Stat.Amount>)

    const amount = document.querySelector('.dnb-stat__amount')
    expect(amount.textContent).toBe('12 346')
  })

  it('supports spacing props', () => {
    render(<Stat.Amount value={123} currency="NOK" top="large" />)

    const container = document.querySelector('.dnb-stat')
    expect(container.classList).toContain('dnb-space__top--large')
  })

  it('supports skeleton', () => {
    render(<Stat.Amount value={123} currency="NOK" skeleton />)

    const container = document.querySelector('.dnb-stat')
    expect(container.classList).toContain('dnb-skeleton')
    expect(container.classList).toContain('dnb-skeleton--font')
    expect(container).toHaveAttribute('aria-disabled', 'true')
    expect(container).toHaveAttribute('disabled')
  })

  it('supports currencyPosition before and after', () => {
    const { rerender } = render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        currencyPosition="before"
      />
    )

    let content = document.querySelector('.dnb-stat__content')
    let currency = document.querySelector('.dnb-stat__currency')
    let amount = document.querySelector('.dnb-stat__amount')

    expect(content.children[0]).toBe(currency)
    expect(content.children[1]).toBe(amount)

    rerender(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        currencyPosition="after"
      />
    )

    content = document.querySelector('.dnb-stat__content')
    currency = document.querySelector('.dnb-stat__currency')
    amount = document.querySelector('.dnb-stat__amount')

    expect(content.children[0]).toBe(amount)
    expect(content.children[1]).toBe(currency)
  })

  it('supports hidden currency sign', () => {
    render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        currencyDisplay={false}
      />
    )

    const container = document.querySelector('.dnb-stat')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(container).toBeInTheDocument()
    expect(currency).not.toBeInTheDocument()
  })

  it('supports invalid values with sr text', () => {
    render(<Stat.Amount value="invalid" currency="NOK" />)

    const container = document.querySelector('.dnb-stat')
    const amount = document.querySelector('.dnb-stat__amount')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(container).toBeInTheDocument()
    expect(amount.textContent).toBe('–')
    expect(sr.getAttribute('data-text')).toBe('Ikke tilgjengelig')
  })

  it('supports srLabel in screen reader text', () => {
    render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        srLabel="Total amount:"
      />
    )

    const sr = document.querySelector('.dnb-stat .dnb-sr-only')
    expect(sr.getAttribute('data-text')).toContain('Total amount:')
  })

  it('supports signDisplay and renders plus for positive values', () => {
    const { rerender } = render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        signDisplay="always"
        locale="en-GB"
      />
    )

    const element = document.querySelector('.dnb-stat')
    const sr = element.querySelector('.dnb-sr-only')
    let amount = element.querySelector('.dnb-stat__amount')
    let sign = element.querySelector('.dnb-stat__sign')
    let content = element.querySelector('.dnb-stat__content')

    expect(content.textContent).toBe('+12,346NOK')
    expect(sign.textContent).toBe('+')
    expect(amount.textContent).toBe('12,346')
    expect(element.textContent).toContain('+12,346NOK')
    expect(sr.getAttribute('data-text')).toContain('+12,346 kroner')

    rerender(
      <Stat.Amount
        value={-12345.67}
        currency="NOK"
        signDisplay="always"
        locale="en-GB"
      />
    )

    amount = element.querySelector('.dnb-stat__amount')
    sign = element.querySelector('.dnb-stat__sign')
    content = element.querySelector('.dnb-stat__content')

    expect(content.textContent).toBe('- 12,346NOK')
    expect(sign.textContent).toBe('-')
    expect(amount.textContent).toBe('12,346')
    expect(element.textContent).toContain('- 12,346NOK')
    expect(sr.getAttribute('data-text')).toContain('-12,346 kroner')

    rerender(
      <Stat.Amount
        value={0}
        currency="NOK"
        signDisplay="exceptZero"
        locale="en-GB"
      />
    )

    amount = document.querySelector('.dnb-stat__amount')
    content = document.querySelector('.dnb-stat__content')
    expect(amount.textContent).toBe('0')
    expect(content.textContent).toBe('NOK 0')
    expect(sr.getAttribute('data-text')).toContain('0 kroner')
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Amount
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
      <Stat.Amount
        value={-12345.67}
        currency="NOK"
        signDisplay="always"
        locale="en-GB"
      />
    )

    const content = document.querySelector('.dnb-stat__content')
    expect(content.textContent).toBe('- 12,346NOK')
  })

  it('supports opt-in sign tone colorization', () => {
    const { rerender } = render(
      <Stat.Amount
        value={12345.67}
        currency="NOK"
        signDisplay="always"
        colorizeBySign
        locale="en-GB"
      />
    )

    let root = document.querySelector('.dnb-stat')
    expect(root.classList).toContain('dnb-stat--tone-positive')
    expect(root.classList).not.toContain('dnb-stat--tone-negative')

    rerender(
      <Stat.Amount
        value={-12345.67}
        currency="NOK"
        signDisplay="always"
        colorizeBySign
        locale="en-GB"
      />
    )

    root = document.querySelector('.dnb-stat')
    expect(root.classList).toContain('dnb-stat--tone-negative')
    expect(root.classList).not.toContain('dnb-stat--tone-positive')
  })

  it('declares _supportsSpacingProps', () => {
    expect(Amount._supportsSpacingProps).toBe(true)
  })

  describe('inherits from context', () => {
    it('locale', () => {
      const { container } = render(
        <Provider locale="en-GB">
          <Stat.Amount value={12345.67} currency="NOK" />
        </Provider>
      )

      const root = container.querySelector('.dnb-stat')
      const content = container.querySelector('.dnb-stat__content')
      const amount = container.querySelector('.dnb-stat__amount')
      const currency = container.querySelector('.dnb-stat__currency')

      expect(root).toHaveAttribute('lang', 'en-GB')
      expect(content.textContent).toBe('NOK 12,346')
      expect(amount.textContent).toBe('12,346')
      expect(currency.textContent).toBe('NOK')
    })

    it('skeleton', () => {
      const { container } = render(
        <Provider skeleton>
          <Stat.Amount value={123} currency="NOK" />
        </Provider>
      )

      const root = container.querySelector('.dnb-stat')
      expect(root.classList).toContain('dnb-skeleton')
      expect(root.classList).toContain('dnb-skeleton--font')
      expect(root).toHaveAttribute('aria-disabled', 'true')
      expect(root).toHaveAttribute('disabled')
    })
  })
})
