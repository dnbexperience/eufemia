import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Stat from '../Stat'
import Provider from '../../../shared/Provider'
import SharedContext from '../../../shared/Context'

describe('Stat.Inline', () => {
  it('renders horizontal inline layout with defaults', () => {
    render(
      <Stat.Inline>
        <Stat.Trend>+1.2%</Stat.Trend>
        <Stat.Info>(additional information)</Stat.Info>
      </Stat.Inline>
    )

    const inline = document.querySelector('.dnb-stat__inline')

    expect(inline).toBeInTheDocument()
    expect(inline.classList).toContain(
      'dnb-flex-container--direction-horizontal'
    )
    expect(inline.classList).toContain('dnb-flex-container--align-center')
    expect(inline.classList).toContain(
      'dnb-flex-container--spacing-x-small'
    )
  })

  it('supports overrides', () => {
    render(
      <Stat.Inline align="baseline" gap="small">
        <Stat.Trend>+1.2%</Stat.Trend>
        <Stat.Info>(additional information)</Stat.Info>
      </Stat.Inline>
    )

    const inline = document.querySelector('.dnb-stat__inline')

    expect(inline.classList).toContain(
      'dnb-flex-container--align-baseline'
    )
    expect(inline.classList).toContain('dnb-flex-container--spacing-small')
    expect(inline.classList).not.toContain(
      'dnb-flex-container--align-center'
    )
  })

  it('should validate with ARIA rules', async () => {
    const component = render(
      <Stat.Inline>
        <Stat.Trend>+1.2%</Stat.Trend>
        <Stat.Info>(additional information)</Stat.Info>
      </Stat.Inline>
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })

  it('supports skeleton prop', () => {
    render(
      <Stat.Inline skeleton>
        <Stat.Trend>+1.2%</Stat.Trend>
        <Stat.Info>(additional information)</Stat.Info>
      </Stat.Inline>
    )

    const inline = document.querySelector('.dnb-stat__inline')

    expect(inline.classList).toContain('dnb-skeleton')
    expect(inline.classList).toContain('dnb-skeleton--font')
    expect(inline).toHaveAttribute('aria-disabled', 'true')
  })

  it('inherits skeleton from Provider context', () => {
    render(
      <Provider skeleton>
        <Stat.Inline>
          <Stat.Trend>+1.2%</Stat.Trend>
          <Stat.Info>(additional information)</Stat.Info>
        </Stat.Inline>
      </Provider>
    )

    const inline = document.querySelector('.dnb-stat__inline')

    expect(inline.classList).toContain('dnb-skeleton')
    expect(inline).toHaveAttribute('aria-disabled', 'true')
  })

  it('propagates skeleton to children', () => {
    render(
      <Stat.Inline skeleton>
        <Stat.Trend>+1.2%</Stat.Trend>
        <Stat.Info>(additional information)</Stat.Info>
      </Stat.Inline>
    )

    const trend = document.querySelector('.dnb-stat__trend')
    const info = document.querySelector('.dnb-stat__info')

    expect(trend.classList).toContain('dnb-skeleton')
    expect(info.classList).toContain('dnb-skeleton')
  })

  it('propagates skeleton to non-Stat children via SharedContext Provider', () => {
    let contextSkeleton: unknown = undefined

    function ContextReader() {
      contextSkeleton = React.useContext(SharedContext)?.skeleton
      return null
    }

    render(
      <Stat.Inline skeleton>
        <ContextReader />
      </Stat.Inline>
    )

    expect(contextSkeleton).toBe(true)
  })

  it('does not propagate skeleton to children when not set', () => {
    render(
      <Stat.Inline>
        <Stat.Trend>+1.2%</Stat.Trend>
        <Stat.Info>(additional information)</Stat.Info>
      </Stat.Inline>
    )

    const trend = document.querySelector('.dnb-stat__trend')
    const info = document.querySelector('.dnb-stat__info')

    expect(trend.classList).not.toContain('dnb-skeleton')
    expect(info.classList).not.toContain('dnb-skeleton')
    expect(trend).not.toHaveAttribute('aria-disabled')
    expect(info).not.toHaveAttribute('aria-disabled')
  })

  it('inherits skeleton from Root context', () => {
    render(
      <Stat.Root skeleton>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content>
          <Stat.Inline>
            <Stat.Trend>+1.2%</Stat.Trend>
            <Stat.Info>(info)</Stat.Info>
          </Stat.Inline>
        </Stat.Content>
      </Stat.Root>
    )

    const inline = document.querySelector('.dnb-stat__inline')
    const trend = document.querySelector('.dnb-stat__trend')
    const info = document.querySelector('.dnb-stat__info')

    expect(inline.classList).toContain('dnb-skeleton')
    expect(trend.classList).toContain('dnb-skeleton')
    expect(info.classList).toContain('dnb-skeleton')
  })

  it('supports id prop', () => {
    render(
      <Stat.Inline id="my-inline">
        <Stat.Trend>+1.2%</Stat.Trend>
        <Stat.Info>(additional information)</Stat.Info>
      </Stat.Inline>
    )

    const inline = document.querySelector('.dnb-stat__inline')

    expect(inline.getAttribute('id')).toBe('my-inline')
  })

  it('warns when used outside Stat.Root', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Inline>
        <Stat.Trend>+1.2%</Stat.Trend>
      </Stat.Inline>
    )

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('Stat.Inline should be used inside Stat.Root')
    )
    expect(didWarn).toBe(true)

    spy.mockRestore()
  })

  it('does not warn when used inside Stat.Root', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Content>
          <Stat.Inline>
            <Stat.Trend>+1.2%</Stat.Trend>
          </Stat.Inline>
        </Stat.Content>
      </Stat.Root>
    )

    const didWarn = spy.mock.calls.some((call) =>
      call
        .map((entry) => String(entry))
        .join(' ')
        .includes('Stat.Inline should be used inside Stat.Root')
    )
    expect(didWarn).toBe(false)

    spy.mockRestore()
  })
})
