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
})
