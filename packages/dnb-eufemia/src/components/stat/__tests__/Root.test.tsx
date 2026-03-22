import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'

describe('Stat.Root', () => {
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

  it('warns when Content appears before any Label', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
        <Stat.Label>Revenue</Stat.Label>
      </Stat.Root>
    )

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('every Stat.Content should be preceded by a Stat.Label')
    )

    expect(didWarn).toBe(true)
    spy.mockRestore()
  })

  it('does not warn when Label precedes Content', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('every Stat.Content should be preceded by a Stat.Label')
    )

    expect(didWarn).toBe(false)
    spy.mockRestore()
  })

  it('warns when Content precedes Label inside a Fragment', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <>
          <Stat.Content>
            <Stat.Currency value={1234} />
          </Stat.Content>
        </>
        <Stat.Label>Revenue</Stat.Label>
      </Stat.Root>
    )

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('every Stat.Content should be preceded by a Stat.Label')
    )

    expect(didWarn).toBe(true)
    spy.mockRestore()
  })

  it('does not emit order warning when Label is missing entirely', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const didWarnOrder = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('every Stat.Content should be preceded by a Stat.Label')
    )

    expect(didWarnOrder).toBe(false)
    spy.mockRestore()
  })
})
