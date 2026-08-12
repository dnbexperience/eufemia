import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render, fireEvent } from '@testing-library/react'

const navigate = vi.hoisted(() => vi.fn())

vi.mock('portal-query', () => ({
  navigate,
}))

vi.mock('../Anchor', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Link: ({ children, to, ...props }: any) => <a {...props}>{children}</a>,
}))

vi.mock('../AutoLinkHeader', () => ({
  default: ({ children }: { children: unknown }) => (
    <h1>{children as never}</h1>
  ),
}))

vi.mock('../TabBar.module.scss', () => ({
  tabsWrapperStyle: 'tabsWrapperStyle',
}))

import TabBar from '../TabBar'

afterEach(() => {
  cleanup()
  navigate.mockClear()
})

const tabs = [
  { title: 'Demos', key: '/uilib/components/button/demos/' },
  { title: 'Properties', key: '/uilib/components/button/properties/' },
]

function renderTabBar(search = '') {
  const location = {
    pathname: '/uilib/components/button/demos/',
    search,
    hash: '',
  } as Location

  return render(
    <TabBar
      location={location}
      title="Button"
      hideTabs={[]}
      rootPath="/uilib/components/button/"
      tabs={tabs}
    />
  )
}

describe('TabBar fullscreen control', () => {
  it('renders as a native button (not a link) so Space and Enter both activate it', () => {
    const { container } = renderTabBar()

    const button = container.querySelector('button.fullscreen')
    expect(button).toBeTruthy()
    expect(button?.tagName).toBe('BUTTON')
    expect(container.querySelector('a.fullscreen')).toBeNull()
    expect(button?.getAttribute('aria-label')).toBe('Fullscreen')
  })

  it('navigates to the fullscreen URL and updates the label when activated', () => {
    const { container } = renderTabBar()

    const button = container.querySelector(
      'button.fullscreen'
    ) as HTMLButtonElement
    fireEvent.click(button)

    expect(navigate).toHaveBeenCalledWith(
      '/uilib/components/button/demos/?fullscreen'
    )
    expect(
      container
        .querySelector('button.fullscreen')
        ?.getAttribute('aria-label')
    ).toBe('Quit Fullscreen')
  })

  it('navigates back to the non-fullscreen URL when quitting', () => {
    const { container } = renderTabBar('?fullscreen')

    const button = container.querySelector(
      'button.fullscreen'
    ) as HTMLButtonElement
    expect(button.getAttribute('aria-label')).toBe('Quit Fullscreen')

    fireEvent.click(button)

    expect(navigate).toHaveBeenCalledWith(
      '/uilib/components/button/demos/'
    )
  })
})
