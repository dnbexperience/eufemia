import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'

describe('Stat.Content', () => {
  it('supports vertical direction inside Stat.Root', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Content direction="vertical">
          <Stat.Currency value={1234} />
          <Stat.Trend>+1.2%</Stat.Trend>
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content).toBeInTheDocument()
    expect(content.tagName.toLowerCase()).toBe('dd')
    expect(content.classList).toContain('dnb-stat__content-item--vertical')

    spy.mockRestore()
  })

  it('renders dd outside Stat.Root and warns', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<Stat.Content />)

    const content = document.querySelector('.dnb-stat__content-item')
    expect(content.tagName.toLowerCase()).toBe('dd')

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('Stat.Content should be used inside Stat.Root')
    )

    expect(didWarn).toBe(true)
    spy.mockRestore()
  })

  it('propagates skeleton to children via context', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content skeleton>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const currency = document.querySelector(
      '.dnb-stat__content-item > .dnb-stat'
    )

    expect(currency.classList).toContain('dnb-skeleton')
    expect(currency.classList).toContain('dnb-skeleton--font')
    expect(currency).toHaveAttribute('aria-disabled', 'true')

    spy.mockRestore()
  })

  it('does not apply skeleton to children when not set', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const currency = document.querySelector(
      '.dnb-stat__content-item > .dnb-stat'
    )

    expect(currency.classList).not.toContain('dnb-skeleton')
    expect(currency).not.toHaveAttribute('aria-disabled')

    spy.mockRestore()
  })

  it('Content skeleton overrides Root skeleton=false for children', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root skeleton={false}>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content skeleton>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const currency = document.querySelector(
      '.dnb-stat__content-item > .dnb-stat'
    )

    expect(currency.classList).toContain('dnb-skeleton')
    expect(currency).toHaveAttribute('aria-disabled', 'true')

    spy.mockRestore()
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })
})
