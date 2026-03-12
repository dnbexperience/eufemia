import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'

describe('Stat.Root', () => {
  it('renders a definition list with dt/dd children', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue growth</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} signDisplay="always" />
        </Stat.Content>
      </Stat.Root>
    )

    const root = document.querySelector('.dnb-stat__root')
    const dt = document.querySelector('.dnb-stat__label')
    const dd = document.querySelector('.dnb-stat__content-item')

    expect(root.tagName.toLowerCase()).toBe('dl')
    expect(dt.tagName.toLowerCase()).toBe('dt')
    expect(dd.tagName.toLowerCase()).toBe('dd')
  })

  it('supports visualOrder content-label', () => {
    render(
      <Stat.Root visualOrder="content-label">
        <Stat.Label>Revenue growth</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} signDisplay="always" />
        </Stat.Content>
      </Stat.Root>
    )

    const root = document.querySelector('.dnb-stat__root')
    const dt = document.querySelector('.dnb-stat__label')
    const dd = document.querySelector('.dnb-stat__content-item')

    expect(root.classList).toContain('dnb-stat__root--content-label')
    expect(dt.tagName.toLowerCase()).toBe('dt')
    expect(dd.tagName.toLowerCase()).toBe('dd')
  })

  it('supports spacing props through Space', () => {
    render(
      <Stat.Root top="large">
        <Stat.Label>Revenue growth</Stat.Label>
      </Stat.Root>
    )

    const root = document.querySelector('.dnb-stat__root')

    expect(root.classList).toContain('dnb-space__top--large')
  })

  it('supports boolean shorthand spacing', () => {
    render(
      <Stat.Root top>
        <Stat.Label>Revenue growth</Stat.Label>
      </Stat.Root>
    )

    const root = document.querySelector('.dnb-stat__root')

    expect(root.classList).toContain('dnb-space__top--small')
  })

  it('warns when unsupported children are used', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <span>unsupported</span>
        <Stat.Label>Revenue growth</Stat.Label>
      </Stat.Root>
    )

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes(
          'Stat.Root should only contain Stat.Label and Stat.Content.'
        )
    )

    expect(didWarn).toBe(true)
    spy.mockRestore()
  })

  it('warns when Stat.Label is missing', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('Stat.Root should contain a Stat.Label.')
    )

    expect(didWarn).toBe(true)
    spy.mockRestore()
  })

  it('does not warn when Stat.Label is present', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Label>Revenue growth</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('Stat.Root should contain a Stat.Label.')
    )

    expect(didWarn).toBe(false)
    spy.mockRestore()
  })

  it('should validate root composition with ARIA rules', async () => {
    const component = render(
      <Stat.Root>
        <Stat.Label>Revenue growth</Stat.Label>
        <Stat.Content direction="vertical">
          <Stat.Currency value={1234} signDisplay="always" />
          <Stat.Trend>+12.4%</Stat.Trend>
          <Stat.Info>Compared to last month</Stat.Info>
        </Stat.Content>
      </Stat.Root>
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })

  it('should fail root composition with invalid ARIA rules', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    const component = render(
      <Stat.Root>
        <Stat.Label>Revenue growth</Stat.Label>
        <div>
          <Stat.Content direction="vertical">content</Stat.Content>
        </div>
      </Stat.Root>
    )

    expect(await axeComponent(component)).not.toHaveNoViolations()
    spy.mockRestore()
  })

  it('propagates skeleton to Stat.Currency', () => {
    render(
      <Stat.Root skeleton>
        <Stat.Label>Revenue growth</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const currency = document.querySelector(
      '.dnb-stat__content-item .dnb-stat'
    )
    expect(currency.classList).toContain('dnb-skeleton')
    expect(currency.classList).toContain('dnb-skeleton--font')
    expect(currency).toHaveAttribute('aria-disabled', 'true')
  })

  it('propagates skeleton to Stat.Label', () => {
    render(
      <Stat.Root skeleton>
        <Stat.Label>Revenue growth</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')
    expect(label.classList).toContain('dnb-skeleton')
    expect(label.classList).toContain('dnb-skeleton--font')
    expect(label).toHaveAttribute('aria-disabled', 'true')
  })

  it('propagates skeleton to Stat.Rating', () => {
    render(
      <Stat.Root skeleton>
        <Stat.Label>Customer rating</Stat.Label>
        <Stat.Content>
          <Stat.Rating value={3.5} />
        </Stat.Content>
      </Stat.Root>
    )

    const rating = document.querySelector('.dnb-stat__rating')
    expect(rating.classList).toContain('dnb-skeleton')
    expect(rating.classList).toContain('dnb-skeleton--font')
    expect(rating).toHaveAttribute('aria-disabled', 'true')
  })

  it('propagates skeleton to Stat.Trend', () => {
    render(
      <Stat.Root skeleton>
        <Stat.Label>Revenue growth</Stat.Label>
        <Stat.Content>
          <Stat.Trend value={12.4} />
        </Stat.Content>
      </Stat.Root>
    )

    const trend = document.querySelector('.dnb-stat__trend')
    expect(trend.classList).toContain('dnb-skeleton')
    expect(trend.classList).toContain('dnb-skeleton--font')
    expect(trend).toHaveAttribute('aria-disabled', 'true')
  })

  it('propagates skeleton to Stat.Info', () => {
    render(
      <Stat.Root skeleton>
        <Stat.Label>Revenue growth</Stat.Label>
        <Stat.Content>
          <Stat.Info>Compared to last month</Stat.Info>
        </Stat.Content>
      </Stat.Root>
    )

    const info = document.querySelector('.dnb-stat__info')
    expect(info.classList).toContain('dnb-skeleton')
    expect(info.classList).toContain('dnb-skeleton--font')
    expect(info).toHaveAttribute('aria-disabled', 'true')
  })
})
