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

  it('renders span outside Stat.Root and warns', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<Stat.Content />)

    const content = document.querySelector('.dnb-stat__content-item')
    expect(content.tagName.toLowerCase()).toBe('span')

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

  it('applies skeleton class and aria-disabled to Content element', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content skeleton>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content.classList).toContain('dnb-skeleton')
    expect(content.classList).toContain('dnb-skeleton--font')
    expect(content).toHaveAttribute('aria-disabled', 'true')

    spy.mockRestore()
  })

  it('supports spacing props', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content top="large">
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content.classList).toContain('dnb-space__top--large')

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

  it('supports id prop', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content id="my-content">
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content.getAttribute('id')).toBe('my-content')
  })

  it('applies style prop to the element', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content style={{ color: 'red' }}>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content.getAttribute('style')).toContain('color: red')

    spy.mockRestore()
  })

  it('supports className prop', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content className="custom-class">
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content.classList).toContain('custom-class')

    spy.mockRestore()
  })

  it('uses custom element prop when outside Stat.Root', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Content element="div">
        <Stat.Currency value={1234} />
      </Stat.Content>
    )

    const content = document.querySelector('.dnb-stat__content-item')
    expect(content.tagName.toLowerCase()).toBe('div')

    spy.mockRestore()
  })

  it('applies correct CSS classes when outside Stat.Root', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Content direction="vertical" className="custom">
        <Stat.Currency value={1234} />
      </Stat.Content>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content.classList).toContain('dnb-stat')
    expect(content.classList).toContain('dnb-stat__content-item')
    expect(content.classList).toContain('dnb-stat__content-item--vertical')
    expect(content.classList).toContain('custom')

    spy.mockRestore()
  })

  it('supports skeleton when outside Stat.Root', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Content skeleton>
        <Stat.Currency value={1234} />
      </Stat.Content>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content.classList).toContain('dnb-skeleton')
    expect(content.classList).toContain('dnb-skeleton--font')
    expect(content).toHaveAttribute('aria-disabled', 'true')

    spy.mockRestore()
  })

  it('sets aria-live attribute when ariaLive prop is provided', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content ariaLive="polite">
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content).toHaveAttribute('aria-live', 'polite')
  })

  it('supports assertive aria-live', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content ariaLive="assertive">
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content).toHaveAttribute('aria-live', 'assertive')
  })

  it('does not set aria-live when ariaLive prop is not provided', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content).not.toHaveAttribute('aria-live')
  })

  it('forwards data-* and aria-* attributes to the DOM element', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content
          data-testid="stat-content"
          data-foo="bar"
          aria-describedby="desc"
        >
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content.getAttribute('data-testid')).toBe('stat-content')
    expect(content.getAttribute('data-foo')).toBe('bar')
    expect(content.getAttribute('aria-describedby')).toBe('desc')
  })

  it('does not forward component-specific props to the DOM', () => {
    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content direction="vertical" skeleton ariaLive="polite">
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const content = document.querySelector('.dnb-stat__content-item')

    expect(content.getAttribute('direction')).toBeNull()
    expect(content.getAttribute('skeleton')).toBeNull()
    expect(content.getAttribute('ariaLive')).toBeNull()
  })
})
