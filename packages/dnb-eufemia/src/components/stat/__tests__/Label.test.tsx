import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'
import SharedContext from '../../../shared/Context'

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
    expect(label.classList).toContain('dnb-stat__label--plain')
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

  it('renders span outside Stat.Root and warns', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<Stat.Label>Revenue growth</Stat.Label>)

    const label = document.querySelector('.dnb-stat__label')
    expect(label.tagName.toLowerCase()).toBe('span')

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

  it('propagates skeleton to non-Stat children via SharedContext Provider', () => {
    let contextSkeleton: unknown = undefined

    function ContextReader() {
      contextSkeleton = React.useContext(SharedContext)?.skeleton
      return null
    }

    render(
      <Stat.Root>
        <Stat.Label skeleton>
          <ContextReader />
        </Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    expect(contextSkeleton).toBe(true)
  })

  it('does not set skeleton in SharedContext when skeleton is not active', () => {
    let contextSkeleton: unknown = undefined

    function ContextReader() {
      contextSkeleton = React.useContext(SharedContext)?.skeleton
      return null
    }

    render(
      <Stat.Root>
        <Stat.Label>
          <ContextReader />
        </Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    expect(contextSkeleton).toBe(false)
  })

  it('warns when deprecated variant="default" is used and maps to plain', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Label variant="default">Revenue growth</Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.classList).toContain('dnb-stat__label--plain')
    expect(label.classList).not.toContain('dnb-stat__label--default')

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes(
          'Stat.Label variant="default" is deprecated. Use variant="plain" instead.'
        )
    )

    expect(didWarn).toBe(true)
    spy.mockRestore()
  })

  it('supports spacing props', () => {
    render(
      <Stat.Root>
        <Stat.Label top="large">Revenue growth</Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.classList).toContain('dnb-space__top--large')
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Root>
        <Stat.Label>Revenue growth</Stat.Label>
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
        <Stat.Label id="my-label">Revenue</Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.getAttribute('id')).toBe('my-label')
  })

  it('applies style prop to the element', () => {
    render(
      <Stat.Root>
        <Stat.Label style={{ color: 'red' }}>Revenue</Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.getAttribute('style')).toContain('color: red')
  })

  it('supports className prop', () => {
    render(
      <Stat.Root>
        <Stat.Label className="custom-class">Revenue</Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.classList).toContain('custom-class')
  })

  it('uses custom element prop when outside Stat.Root', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<Stat.Label element="span">Revenue</Stat.Label>)

    const label = document.querySelector('.dnb-stat__label')
    expect(label.tagName.toLowerCase()).toBe('span')

    spy.mockRestore()
  })

  it('applies correct CSS classes when outside Stat.Root', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Label
        fontSize="medium"
        fontWeight="bold"
        variant="subtle"
        className="custom"
      >
        Revenue
      </Stat.Label>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.classList).toContain('dnb-stat')
    expect(label.classList).toContain('dnb-stat__label')
    expect(label.classList).toContain('dnb-stat__label--subtle')
    expect(label.classList).toContain('dnb-t__size--medium')
    expect(label.classList).toContain('dnb-t__weight--bold')
    expect(label.classList).toContain('custom')

    spy.mockRestore()
  })

  it('supports skeleton when outside Stat.Root', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(<Stat.Label skeleton>Revenue</Stat.Label>)

    const label = document.querySelector('.dnb-stat__label')

    expect(label.classList).toContain('dnb-skeleton')
    expect(label.classList).toContain('dnb-skeleton--font')
    expect(label).toHaveAttribute('aria-disabled', 'true')

    spy.mockRestore()
  })

  it('propagates skeleton to child components via context', () => {
    render(
      <Stat.Root>
        <Stat.Label skeleton>
          <Stat.Info>Extra label info</Stat.Info>
        </Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const info = document.querySelector('.dnb-stat__info')

    expect(info.classList).toContain('dnb-skeleton')
    expect(info).toHaveAttribute('aria-disabled', 'true')
  })

  it('does not block Root skeleton propagation when Label has no explicit skeleton prop', () => {
    render(
      <Stat.Root skeleton>
        <Stat.Label>
          <Stat.Info>Extra label info</Stat.Info>
        </Stat.Label>
        <Stat.Content>
          <Stat.Currency value={1234} />
        </Stat.Content>
      </Stat.Root>
    )

    const info = document.querySelector('.dnb-stat__info')
    const currency = document.querySelector(
      '.dnb-stat__content-item > .dnb-stat'
    )

    expect(info.classList).toContain('dnb-skeleton')
    expect(currency.classList).toContain('dnb-skeleton')
  })

  it('forwards data-* and aria-* attributes to the DOM element', () => {
    render(
      <Stat.Root>
        <Stat.Label
          data-testid="stat-label"
          data-foo="bar"
          aria-describedby="desc"
        >
          Revenue
        </Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.getAttribute('data-testid')).toBe('stat-label')
    expect(label.getAttribute('data-foo')).toBe('bar')
    expect(label.getAttribute('aria-describedby')).toBe('desc')
  })

  it('does not forward component-specific props to the DOM', () => {
    render(
      <Stat.Root>
        <Stat.Label fontSize="medium" fontWeight="bold" variant="subtle" skeleton>
          Revenue
        </Stat.Label>
      </Stat.Root>
    )

    const label = document.querySelector('.dnb-stat__label')

    expect(label.getAttribute('fontSize')).toBeNull()
    expect(label.getAttribute('fontWeight')).toBeNull()
    expect(label.getAttribute('variant')).toBeNull()
    expect(label.getAttribute('skeleton')).toBeNull()
  })
})
