import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Provider from '../../../shared/Provider'
import Stat from '../Stat'

describe('Stat integration', () => {
  it('renders full composition with semantic dl/dt/dd markup', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue growth</Stat.Label>
        <Stat.Content direction="vertical">
          <Stat.Currency value={1234} signDisplay="always" />
          <Stat.Trend srLabel="Change">+12.4%</Stat.Trend>
          <Stat.Info>Some additional information.</Stat.Info>
        </Stat.Content>
      </Stat.Root>
    )

    const root = document.querySelector('.dnb-stat__root')
    const label = document.querySelector('.dnb-stat__label')
    const content = document.querySelector('.dnb-stat__content-item')

    expect(root.tagName.toLowerCase()).toBe('dl')
    expect(label.tagName.toLowerCase()).toBe('dt')
    expect(label.textContent).toBe('Revenue growth')
    expect(content.tagName.toLowerCase()).toBe('dd')
    expect(content.classList).toContain('dnb-stat__content-item--vertical')
  })

  it('renders Currency, Trend, and Info inside Content', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content direction="vertical">
          <Stat.Currency value={350234} srLabel="Annual revenue" />
          <Stat.Trend srLabel="Change">+12.4%</Stat.Trend>
          <Stat.Info>Additional info</Stat.Info>
        </Stat.Content>
      </Stat.Root>
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')
    const trend = document.querySelector('.dnb-stat__trend')
    const info = document.querySelector('.dnb-stat__info')

    expect(amount.textContent).toBe('350\u00A0234')
    expect(currency.textContent).toBe('kr')
    expect(trend).toBeInTheDocument()
    expect(trend.classList).toContain('dnb-stat__trend--positive')
    expect(info.textContent).toBe('Additional info')
  })

  it('propagates skeleton from Root to all sub-components', () => {
    render(
      <Stat.Root skeleton>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content direction="vertical">
          <Stat.Currency value={1234} />
          <Stat.Trend>+5%</Stat.Trend>
          <Stat.Info>Info text</Stat.Info>
        </Stat.Content>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')
    const currencyRoot = document.querySelector(
      '.dnb-stat__content-item > .dnb-stat'
    )
    const trend = document.querySelector('.dnb-stat__trend')
    const info = document.querySelector('.dnb-stat__info')

    expect(label.classList).toContain('dnb-skeleton')
    expect(currencyRoot.classList).toContain('dnb-skeleton')
    expect(trend.classList).toContain('dnb-skeleton')
    expect(info.classList).toContain('dnb-skeleton')
  })

  it('propagates locale from Provider to Currency', () => {
    render(
      <Provider locale="en-GB">
        <Stat.Root>
          <Stat.Label>Revenue</Stat.Label>
          <Stat.Content>
            <Stat.Currency value={12345.67} />
          </Stat.Content>
        </Stat.Root>
      </Provider>
    )

    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')
    const currencyRoot = document.querySelector(
      '.dnb-stat__content-item > .dnb-stat'
    )

    expect(amount.textContent).toBe('12,346')
    expect(currency.textContent).toBe('NOK')
    expect(currencyRoot).toHaveAttribute('lang', 'en-GB')
  })

  it('renders multiple Label + Content pairs in one Root', () => {
    render(
      <Stat.Root>
        <Stat.Label>Annual</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={350234} />
        </Stat.Content>

        <Stat.Label>Monthly</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={29186} />
        </Stat.Content>
      </Stat.Root>
    )

    const labels = document.querySelectorAll('.dnb-stat__label')
    const contents = document.querySelectorAll('.dnb-stat__content-item')

    expect(labels).toHaveLength(2)
    expect(contents).toHaveLength(2)
    expect(labels[0].textContent).toBe('Annual')
    expect(labels[1].textContent).toBe('Monthly')
  })

  it('renders screen reader text for Currency and Trend', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content direction="vertical">
          <Stat.Currency value={1234} srLabel="Total:" />
          <Stat.Trend srLabel="Change:">+12.4%</Stat.Trend>
        </Stat.Content>
      </Stat.Root>
    )

    const srElements = document.querySelectorAll('.dnb-sr-only')
    const currencySr = srElements[0]
    const trendSr = srElements[1]

    expect(currencySr.getAttribute('data-text')).toContain('Total:')
    expect(trendSr.getAttribute('data-text')).toContain('Change:')
    expect(trendSr.getAttribute('data-text')).toContain('+12.4%')
  })

  it('applies visualOrder content-label and keeps semantic order', () => {
    render(
      <Stat.Root visualOrder="content-label">
        <Stat.Label variant="subtle">Revenue</Stat.Label>
        <Stat.Content direction="vertical">
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const root = document.querySelector('.dnb-stat__root')
    const label = document.querySelector('.dnb-stat__label')

    expect(root.classList).toContain('dnb-stat__root--content-label')
    expect(label.classList).toContain('dnb-stat__label--subtle')

    // Semantic order is preserved in the DOM (label before content)
    const children = Array.from(root.children)
    expect(children[0]).toBe(label)
  })

  it('composes Currency inside Trend for monetary trends', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue delta</Stat.Label>
        <Stat.Content>
          <Stat.Trend>
            <Stat.Currency
              value={46692}
              signDisplay="always"
              srLabel="Delta"
            />
          </Stat.Trend>
        </Stat.Content>
      </Stat.Root>
    )

    const trend = document.querySelector('.dnb-stat__trend')
    const amount = document.querySelector('.dnb-stat__amount')
    const currency = document.querySelector('.dnb-stat__currency')

    expect(trend).toBeInTheDocument()
    expect(amount).toBeInTheDocument()
    expect(currency).toBeInTheDocument()

    // Inside Trend, sizes default to basis
    expect(amount.classList).toContain('dnb-t__size--basis')
    expect(currency.classList).toContain('dnb-t__size--basis')
  })

  it('composes Percent inside Info with basis size', () => {
    render(
      <Stat.Root>
        <Stat.Label>Growth</Stat.Label>
        <Stat.Content>
          <Stat.Info>
            (<Stat.Percent value={16.79} decimals={2} srLabel="Change" />)
          </Stat.Info>
        </Stat.Content>
      </Stat.Root>
    )

    const info = document.querySelector('.dnb-stat__info')
    const amount = document.querySelector('.dnb-stat__amount')
    const percent = document.querySelector('.dnb-stat__percent')

    expect(info).toBeInTheDocument()
    expect(amount).toBeInTheDocument()
    expect(percent).toBeInTheDocument()

    // Inside Info, sizes default to basis and weight to regular
    expect(amount.classList).toContain('dnb-t__size--basis')
    expect(amount.classList).toContain('dnb-t__weight--regular')
  })

  it('composes Inline with Trend and Info side by side', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content direction="vertical">
          <Stat.Currency value={1234} />
          <Stat.Inline>
            <Stat.Trend srLabel="Change">-2.1%</Stat.Trend>
            <Stat.Info>(some info)</Stat.Info>
          </Stat.Inline>
        </Stat.Content>
      </Stat.Root>
    )

    const inline = document.querySelector('.dnb-stat__inline')
    const trend = document.querySelector('.dnb-stat__trend')
    const info = document.querySelector('.dnb-stat__info')

    expect(inline).toBeInTheDocument()
    expect(trend.classList).toContain('dnb-stat__trend--negative')
    expect(info.textContent).toBe('(some info)')
  })

  it('renders Rating inside Content with accessible label', () => {
    render(
      <Stat.Root>
        <Stat.Label>Stars rating</Stat.Label>
        <Stat.Content>
          <Stat.Rating value={4} />
        </Stat.Content>
      </Stat.Root>
    )

    const rating = document.querySelector('.dnb-stat__rating')
    const stars = document.querySelectorAll('.dnb-stat__rating-star')

    expect(rating).toHaveAttribute('role', 'img')
    expect(rating).toHaveAttribute('aria-label')
    expect(rating.getAttribute('aria-label')).toContain('4')
    expect(stars).toHaveLength(5)
  })

  it('propagates skeleton from Provider through Root to all children', () => {
    render(
      <Provider skeleton>
        <Stat.Root>
          <Stat.Label>Revenue</Stat.Label>
          <Stat.Content>
            <Stat.Currency value={1234} />
          </Stat.Content>
        </Stat.Root>
      </Provider>
    )

    const label = document.querySelector('.dnb-stat__label')
    const currencyRoot = document.querySelector(
      '.dnb-stat__content-item > .dnb-stat'
    )

    expect(label.classList).toContain('dnb-skeleton')
    expect(currencyRoot.classList).toContain('dnb-skeleton')
    expect(currencyRoot).toHaveAttribute('aria-disabled', 'true')
  })

  it('should validate full composition with ARIA rules', async () => {
    const component = render(
      <Stat.Root>
        <Stat.Label>Revenue growth</Stat.Label>
        <Stat.Content direction="vertical">
          <Stat.Currency
            value={1234}
            signDisplay="always"
            srLabel="Revenue"
          />
          <Stat.Inline>
            <Stat.Trend srLabel="Change">+12.4%</Stat.Trend>
            <Stat.Info>(additional info)</Stat.Info>
          </Stat.Inline>
        </Stat.Content>
      </Stat.Root>
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })

  it('should validate multi-pair composition with ARIA rules', async () => {
    const component = render(
      <Stat.Root>
        <Stat.Label>Annual revenue</Stat.Label>
        <Stat.Content direction="vertical">
          <Stat.Currency value={350234} />
          <Stat.Trend>
            <Stat.Currency value={46692} signDisplay="always" />
          </Stat.Trend>
        </Stat.Content>

        <Stat.Label>Rating</Stat.Label>
        <Stat.Content>
          <Stat.Rating value={3.5} />
        </Stat.Content>
      </Stat.Root>
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })
})
