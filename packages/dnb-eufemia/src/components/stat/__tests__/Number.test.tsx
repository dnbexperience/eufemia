import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Provider from '../../../shared/Provider'
import Stat from '../Stat'
import NumberComponent from '../Number'

describe('Stat.Number', () => {
  it('declares _supportsSpacingProps', () => {
    expect(NumberComponent._supportsSpacingProps).toBe(true)
  })

  it('renders plain number without currency by default', () => {
    render(<Stat.Number value={12345.67} />)

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')
    const content = document.querySelector('.dnb-stat__content')

    expect(amount.textContent).toBe('12 346')
    expect(currency).not.toBeInTheDocument()
    expect(content.textContent).toBe('12 346')
  })

  it('renders number with currency when currency prop is set', () => {
    render(<Stat.Number value={12345.67} currency="NOK" />)

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.textContent).toBe('12 346')
    expect(currency).toBeInTheDocument()
    expect(currency.textContent).toBe('kr')
  })

  it('renders currency before amount in en-GB locale', () => {
    render(<Stat.Number value={-12345.67} currency="NOK" locale="en-GB" />)

    const content = document.querySelector('.dnb-stat__content')
    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(amount.textContent).toBe('-12,346')
    expect(currency.textContent).toBe('NOK')
    expect(content.children[0]).toBe(currency)
    expect(sr.getAttribute('data-text')).toContain('kroner')
  })

  it('uses children as value', () => {
    render(<Stat.Number>12345.67</Stat.Number>)

    const amount = document.querySelector('.dnb-stat__amount')
    expect(amount.textContent).toBe('12 346')
  })

  it('supports prefix and suffix', () => {
    render(
      <Stat.Number
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

    expect(prefix.textContent).toBe('Fra')
    expect(suffix.textContent).toBe('/mnd')
    expect(content.textContent).toBe('Fra 12 346 kr/mnd')
    expect(sr.getAttribute('data-text')).toContain('/mnd')
  })

  it('renders currency after amount when suffix starts with slash', () => {
    render(
      <Stat.Number
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
      <Stat.Number
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
    expect(amount.classList).toContain('dnb-t__line-height--xx-large')
    expect(currency.classList).toContain('dnb-t__size--basis')
    expect(currency.classList).toContain('dnb-t__line-height--basis')
    expect(prefix.classList).toContain('dnb-t__size--basis')
  })

  it('supports fontSize as fallback for both main and auxiliary sizes', () => {
    render(
      <Stat.Number value={12345.67} currency="NOK" fontSize="x-large" />
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(amount.classList).toContain('dnb-t__size--x-large')
    expect(currency.classList).toContain('dnb-t__size--x-large')
  })

  it('lets mainSize and auxiliarySize override fontSize', () => {
    render(
      <Stat.Number
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

  it('defaults to large size', () => {
    render(<Stat.Number value={1234} />)

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.classList).toContain('dnb-t__size--large')
    expect(amount.classList).toContain('dnb-t__line-height--medium')
  })

  it('defaults to medium weight', () => {
    render(<Stat.Number value={1234} />)

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.classList).toContain('dnb-t__weight--medium')
  })

  it('supports custom mainWeight', () => {
    render(
      <Stat.Number
        value={12345.67}
        signDisplay="always"
        mainWeight="bold"
      />
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const sign = document.querySelector('.dnb-stat__sign')

    expect(amount.classList).toContain('dnb-t__weight--bold')
    expect(sign.classList).toContain('dnb-t__weight--bold')
  })

  it('supports custom auxiliaryWeight', () => {
    render(
      <Stat.Number
        value={12345.67}
        currency="NOK"
        prefix="From"
        auxiliaryWeight="bold"
      />
    )

    const currency = document.querySelector('.dnb-stat__currency')
    const prefix = document.querySelector('.dnb-stat__prefix')

    expect(currency.classList).toContain('dnb-t__weight--bold')
    expect(prefix.classList).toContain('dnb-t__weight--bold')
  })

  it('uses medium auxiliaryWeight when main and auxiliary sizes are equal and mainWeight is omitted', () => {
    render(
      <Stat.Number
        value={12345.67}
        currency="NOK"
        mainSize="large"
        auxiliarySize="large"
      />
    )

    const currency = document.querySelector('.dnb-stat__currency')

    expect(currency.classList).toContain('dnb-t__weight--medium')
  })

  it('does not force medium auxiliaryWeight when mainWeight is set', () => {
    render(
      <Stat.Number
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

  it('uses basis size by default when rendered inside Stat.Trend', () => {
    render(
      <Stat.Trend>
        <Stat.Number value={1234} currency="NOK" />
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
        <Stat.Number
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
        <Stat.Number value={1234} currency="NOK" />
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
        <Stat.Number value={1234} />
      </Stat.Info>
    )

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.classList).toContain('dnb-t__weight--regular')
    expect(amount.classList).not.toContain('dnb-t__weight--medium')
  })

  it('keeps medium mainWeight by default when rendered inside Stat.Trend', () => {
    render(
      <Stat.Trend>
        <Stat.Number value={1234} />
      </Stat.Trend>
    )

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.classList).toContain('dnb-t__weight--medium')
    expect(amount.classList).not.toContain('dnb-t__weight--regular')
  })

  it('supports signDisplay and renders plus for positive values', () => {
    render(
      <Stat.Number value={12345.67} signDisplay="always" locale="en-GB" />
    )

    const sign = document.querySelector('.dnb-stat__sign')
    const amount = document.querySelector('.dnb-stat__amount')
    const content = document.querySelector('.dnb-stat__content')

    expect(sign.textContent).toBe('+')
    expect(amount.textContent).toBe('12,346')
    expect(content.textContent).toBe('+12,346')
  })

  it('renders minus sign separately when signDisplay is always', () => {
    render(
      <Stat.Number value={-12345.67} signDisplay="always" locale="en-GB" />
    )

    const sign = document.querySelector('.dnb-stat__sign')
    const amount = document.querySelector('.dnb-stat__amount')
    const content = document.querySelector('.dnb-stat__content')

    expect(sign.textContent).toBe('-')
    expect(amount.textContent).toBe('12,346')
    expect(content.textContent).toBe('- 12,346')
  })

  it('does not render sign for zero when signDisplay is exceptZero', () => {
    render(
      <Stat.Number value={0} signDisplay="exceptZero" locale="en-GB" />
    )

    const sign = document.querySelector('.dnb-stat__sign')
    const amount = document.querySelector('.dnb-stat__amount')

    expect(sign).not.toBeInTheDocument()
    expect(amount.textContent).toBe('0')
  })

  it('supports opt-in sign tone colorization', () => {
    const { rerender } = render(
      <Stat.Number
        value={12345.67}
        signDisplay="always"
        colorizeBySign
        locale="en-GB"
      />
    )

    let root = document.querySelector('.dnb-stat')
    expect(root.classList).toContain('dnb-stat--tone-positive')
    expect(root.classList).not.toContain('dnb-stat--tone-negative')

    rerender(
      <Stat.Number
        value={-12345.67}
        signDisplay="always"
        colorizeBySign
        locale="en-GB"
      />
    )

    root = document.querySelector('.dnb-stat')
    expect(root.classList).toContain('dnb-stat--tone-negative')
    expect(root.classList).not.toContain('dnb-stat--tone-positive')
  })

  it('does not colorize when colorizeBySign is false', () => {
    render(
      <Stat.Number value={12345.67} signDisplay="always" locale="en-GB" />
    )

    const root = document.querySelector('.dnb-stat')
    expect(root.classList).not.toContain('dnb-stat--tone-positive')
    expect(root.classList).not.toContain('dnb-stat--tone-negative')
  })

  it('colorizes negative zero as negative tone', () => {
    render(<Stat.Number value={-0} signDisplay="always" colorizeBySign />)

    const root = document.querySelector('.dnb-stat')
    expect(root.classList).toContain('dnb-stat--tone-negative')
    expect(root.classList).not.toContain('dnb-stat--tone-positive')
  })

  it('supports percent formatting', () => {
    render(<Stat.Number value={12.3} percent />)

    const amount = document.querySelector('.dnb-stat__amount')
    const percent = document.querySelector('.dnb-stat__percent')

    expect(amount.textContent).toBe('12')
    expect(percent).toBeInTheDocument()
  })

  it('supports srLabel in screen reader text', () => {
    render(<Stat.Number value={12345.67} srLabel="Total:" />)

    const sr = document.querySelector('.dnb-stat .dnb-sr-only')
    expect(sr.getAttribute('data-text')).toContain('Total:')
  })

  it('supports invalid values with localized error text', () => {
    render(<Stat.Number value="invalid" />)

    const amount = document.querySelector('.dnb-stat__amount')
    const sr = document.querySelector('.dnb-stat .dnb-sr-only')

    expect(amount.textContent).toBe('–')
    expect(sr.getAttribute('data-text')).toBe('Ikke tilgjengelig')
  })

  it('renders NaN as absent value', () => {
    render(<Stat.Number value={NaN} />)

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.textContent).toBe('–')
  })

  it('renders Infinity without crashing', () => {
    render(<Stat.Number value={Infinity} />)

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.textContent).toContain('∞')
  })

  it('renders negative Infinity without crashing', () => {
    render(<Stat.Number value={-Infinity} />)

    const amount = document.querySelector('.dnb-stat__amount')

    expect(amount.textContent).toContain('∞')
  })

  it('supports currencyPosition before and after', () => {
    const { rerender } = render(
      <Stat.Number
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
      <Stat.Number
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
      <Stat.Number
        value={12345.67}
        currency="NOK"
        currencyDisplay={false}
      />
    )

    const currency = document.querySelector('.dnb-stat__currency')
    expect(currency).not.toBeInTheDocument()
  })

  it('supports skeleton', () => {
    render(<Stat.Number value={123} skeleton />)

    const container = document.querySelector('.dnb-stat')
    expect(container.classList).toContain('dnb-skeleton')
    expect(container.classList).toContain('dnb-skeleton--font')
    expect(container).toHaveAttribute('aria-disabled', 'true')
    expect(container).toHaveAttribute('disabled')
  })

  it('supports spacing props', () => {
    render(<Stat.Number value={123} top="large" />)

    const container = document.querySelector('.dnb-stat')
    expect(container.classList).toContain('dnb-space__top--large')
  })

  it('supports custom element', () => {
    render(<Stat.Number value={1234} element="div" />)

    const container = document.querySelector('div.dnb-stat')
    expect(container).toBeInTheDocument()
  })

  it('sets lang attribute from locale', () => {
    render(<Stat.Number value={1234} locale="en-GB" />)

    const container = document.querySelector('.dnb-stat')
    expect(container).toHaveAttribute('lang', 'en-GB')
  })

  describe('inherits from context', () => {
    it('locale', () => {
      render(
        <Provider locale="en-GB">
          <Stat.Number value={12345.67} currency="NOK" />
        </Provider>
      )

      const root = document.querySelector('.dnb-stat')
      const amount = document.querySelector('.dnb-stat__amount')
      const currency = document.querySelector('.dnb-stat__currency')

      expect(root).toHaveAttribute('lang', 'en-GB')
      expect(amount.textContent).toBe('12,346')
      expect(currency.textContent).toBe('NOK')
    })

    it('skeleton', () => {
      render(
        <Provider skeleton>
          <Stat.Number value={123} />
        </Provider>
      )

      const root = document.querySelector('.dnb-stat')
      expect(root.classList).toContain('dnb-skeleton')
      expect(root.classList).toContain('dnb-skeleton--font')
      expect(root).toHaveAttribute('aria-disabled', 'true')
      expect(root).toHaveAttribute('disabled')
    })
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Number
        value={12345.67}
        currency="NOK"
        suffix="/mnd"
        signDisplay="always"
      />
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })
})
