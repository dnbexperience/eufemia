import React from 'react'
import { render } from '@testing-library/react'
import Stat from '../Stat'

describe('Stat.Label', () => {
  it('renders dt inside Stat.Root', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue growth</Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label).toBeInTheDocument()
    expect(label.tagName.toLowerCase()).toBe('dt')
    expect(label.textContent).toBe('Revenue growth')
    expect(label.classList).toContain('dnb-stat')
    expect(label.classList).toContain('dnb-stat__label--default')
    expect(label.classList).toContain('dnb-t__size--basis')
    expect(label.classList).toContain('dnb-t__line-height--basis')
    expect(label.classList).toContain('dnb-t__weight--regular')
  })

  it('supports custom label typography props', () => {
    render(
      <Stat.Root>
        <Stat.Label fontSize="medium" fontWeight="bold" variant="subtle">
          Revenue growth
        </Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.classList).toContain('dnb-stat__label--subtle')
    expect(label.classList).toContain('dnb-t__size--medium')
    expect(label.classList).toContain('dnb-t__line-height--basis')
    expect(label.classList).toContain('dnb-t__weight--bold')
    expect(label.classList).not.toContain('dnb-t__weight--medium')
  })

  it('uses regular fontWeight by default for subtle variant', () => {
    render(
      <Stat.Root>
        <Stat.Label variant="subtle">Revenue growth</Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.classList).toContain('dnb-stat__label--subtle')
    expect(label.classList).toContain('dnb-t__weight--regular')
    expect(label.classList).not.toContain('dnb-t__weight--medium')
  })

  it('supports srOnly', () => {
    render(
      <Stat.Root>
        <Stat.Label srOnly>Revenue growth</Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.classList).toContain('dnb-sr-only')
  })

  it('renders dt outside Stat.Root and warns', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<Stat.Label>Revenue growth</Stat.Label>)

    const label = document.querySelector('.dnb-stat__label')
    expect(label.tagName.toLowerCase()).toBe('dt')

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('Stat.Label should be used inside Stat.Root')
    )

    expect(didWarn).toBe(true)
    spy.mockRestore()
  })

  it('supports skeleton prop', () => {
    render(
      <Stat.Root>
        <Stat.Label skeleton>Revenue growth</Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.classList).toContain('dnb-skeleton')
    expect(label.classList).toContain('dnb-skeleton--font')
    expect(label).toHaveAttribute('aria-disabled', 'true')
  })
})
