import React from 'react'
import { render } from '@testing-library/react'
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
})
