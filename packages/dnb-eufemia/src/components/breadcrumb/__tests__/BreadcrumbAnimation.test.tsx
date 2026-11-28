import { act, fireEvent, render } from '@testing-library/react'
import { setMedia } from 'mock-match-media'
import Breadcrumb from '../Breadcrumb'
import '../../../core/vitest/mockMatchMediaSetup'

const pages = (page?: string) => [
  {
    text: 'Overview',
    href: '#overview',
    variant: page ? ('home' as const) : ('current' as const),
  },
  ...(page ? [{ text: page, variant: 'current' as const }] : []),
]

describe('Breadcrumb animation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setMedia({ 'prefers-reduced-motion': 'no-preference' })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('settles transitions while the parent keeps rendering and uses the latest item props', () => {
    const { rerender } = render(
      <Breadcrumb animate variant="multiple" data={pages('Page')} />
    )
    rerender(<Breadcrumb animate variant="multiple" data={pages()} />)
    for (let i = 0; i < 3; i++) {
      act(() => vi.advanceTimersByTime(75))
      rerender(<Breadcrumb animate variant="multiple" data={pages()} />)
    }
    expect(document.querySelector('[inert]')).toBeNull()

    const onClick = vi.fn()
    rerender(
      <Breadcrumb
        animate
        variant="multiple"
        data={[{ text: 'Updated', href: '#overview', onClick }]}
      />
    )
    expect(document.querySelector('a')).toHaveTextContent('Updated')
    fireEvent.click(document.querySelector('a'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it.each(['responsive', 'collapse'] as const)(
    'updates the vertical %s list immediately',
    (variant) => {
      const { rerender } = render(
        <Breadcrumb
          animate
          variant={variant}
          collapsed={false}
          data={pages('Page')}
        />
      )
      rerender(
        <Breadcrumb
          animate
          variant={variant}
          collapsed={false}
          data={pages()}
        />
      )
      const list = document.querySelector('.dnb-breadcrumb__collapse')
      expect(list.querySelectorAll('li')).toHaveLength(1)
      expect(list.querySelector('[class*="--animated"]')).toBeNull()
    }
  )

  it('only makes the current item focusable while restoring focus', () => {
    const { rerender } = render(
      <Breadcrumb animate variant="multiple" data={pages('Page')} />
    )
    expect(document.querySelector('li[tabindex]')).toBeNull()
    act(() => document.querySelector('a').focus())
    rerender(<Breadcrumb animate variant="multiple" data={pages()} />)
    const current = document.querySelector('[aria-current="page"]')
    expect(current).toHaveFocus()
    expect(current).toHaveClass('dnb-no-focus')
    fireEvent.blur(current)
    expect(current).not.toHaveAttribute('tabindex')
    expect(current).not.toHaveClass('dnb-no-focus')
  })

  it('retains removed items briefly, hides them from navigation, and settles rapid updates', () => {
    const { rerender } = render(
      <Breadcrumb animate variant="multiple" data={pages()} />
    )
    expect(document.querySelector('[class*="--enter"]')).toBeNull()

    rerender(
      <Breadcrumb animate variant="multiple" data={pages('Accounts')} />
    )
    expect(
      document.querySelector('.dnb-breadcrumb__item--enter')
    ).toHaveTextContent('Accounts')

    rerender(
      <Breadcrumb animate variant="multiple" data={pages('Payments')} />
    )
    const removed = document.querySelector('.dnb-breadcrumb__item--exit')
    expect(removed).toHaveTextContent('Accounts')
    expect(removed).toHaveAttribute('inert')
    expect(removed).toHaveAttribute('aria-hidden', 'true')
    expect(removed).not.toHaveAttribute('aria-current')
    expect(
      document.querySelectorAll('[aria-current="page"]')
    ).toHaveLength(1)

    rerender(<Breadcrumb animate variant="multiple" data={pages()} />)
    rerender(
      <Breadcrumb animate variant="multiple" data={pages('Accounts')} />
    )
    act(() => vi.advanceTimersByTime(180))

    expect(document.querySelectorAll('li')).toHaveLength(2)
    expect(document.querySelector('[inert]')).toBeNull()
    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Accounts')
    expect(document.querySelector('a')).toHaveAttribute(
      'href',
      '#overview'
    )
  })

  it.each([{ animate: false }, { animate: true, noAnimation: true }])(
    'removes items immediately with %j',
    (props) => {
      const { rerender } = render(
        <Breadcrumb
          {...props}
          variant="multiple"
          data={pages('Accounts')}
        />
      )
      rerender(<Breadcrumb {...props} variant="multiple" data={pages()} />)
      expect(document.querySelectorAll('li')).toHaveLength(1)
    }
  )

  it('uses explicit child keys and retains a removed child', () => {
    const root = (
      <Breadcrumb.Item
        key="root"
        href="#overview"
        text="Overview"
        variant="home"
      />
    )
    const { rerender } = render(
      <Breadcrumb animate variant="multiple">
        {root}
        <Breadcrumb.Item key="page" text="Accounts" variant="current" />
      </Breadcrumb>
    )
    rerender(
      <Breadcrumb animate variant="multiple">
        {root}
      </Breadcrumb>
    )
    expect(document.querySelector('[inert]')).toHaveTextContent('Accounts')
    act(() => vi.advanceTimersByTime(180))
    expect(document.querySelectorAll('li')).toHaveLength(1)
  })

  it.each(['data', 'children'])(
    'keeps repeated labels distinct when using %s',
    (source) => {
      const onClick = vi.fn()
      const items = [
        { text: 'Page', onClick, variant: 'home' as const },
        { text: 'Page', variant: 'current' as const },
      ]
      const breadcrumb = (showCurrent: boolean) => {
        const data = showCurrent ? items : items.slice(0, 1)
        return (
          <Breadcrumb
            animate
            variant="multiple"
            data={source === 'data' ? data : undefined}
          >
            {source === 'children' && <Breadcrumb.Item {...data[0]} />}
            {source === 'children' && showCurrent && (
              <Breadcrumb.Item {...data[1]} />
            )}
          </Breadcrumb>
        )
      }
      const { rerender } = render(breadcrumb(true))
      const root = document.querySelector('li')

      rerender(breadcrumb(false))
      expect(document.querySelector('[inert]')).toHaveTextContent('Page')
      act(() => vi.advanceTimersByTime(180))
      expect(document.querySelectorAll('li')).toHaveLength(1)
      expect(document.querySelector('li')).toBe(root)

      rerender(breadcrumb(true))
      expect(document.querySelectorAll('li')).toHaveLength(2)
      expect(document.querySelector('li')).toBe(root)
      expect(
        document.querySelector('[aria-current="page"]')
      ).toHaveTextContent('Page')
    }
  )

  it('removes items immediately with reduced motion and cancels a running exit', () => {
    const { rerender } = render(
      <Breadcrumb animate variant="multiple" data={pages('Accounts')} />
    )
    rerender(<Breadcrumb animate variant="multiple" data={pages()} />)
    expect(document.querySelector('[inert]')).toBeInTheDocument()

    act(() => setMedia({ 'prefers-reduced-motion': 'reduce' }))
    expect(document.querySelectorAll('li')).toHaveLength(1)

    rerender(
      <Breadcrumb animate variant="multiple" data={pages('Payments')} />
    )
    rerender(<Breadcrumb animate variant="multiple" data={pages()} />)
    expect(document.querySelectorAll('li')).toHaveLength(1)
  })

  it('cancels pending work on unmount', () => {
    const { rerender, unmount } = render(
      <Breadcrumb animate variant="multiple" data={pages('Accounts')} />
    )
    rerender(<Breadcrumb animate variant="multiple" data={pages()} />)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
