import '../../../core/vitest/mockMatchMediaSetup'
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { memo } from 'react'
import { setMedia } from 'mock-match-media'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import Anchor from '../../anchor/Anchor'
import TableOfContent from '../TableOfContent'
import useDisclosureState from '../useDisclosureState'
import * as HeightAnimationModule from '../../height-animation/HeightAnimation'

const data = [
  { id: 'title', text: 'Page title', level: 1 },
  { id: 'overview', text: 'Overview', level: 2 },
  { id: 'details', text: 'Details', level: 3 },
  { id: 'deep', text: 'Deep details', level: 4 },
  { id: 'next', text: 'Next steps', level: 2 },
]

beforeEach(() => setMedia({ width: '1400px' }))

describe('mobile item limit', () => {
  const headings = Array.from({ length: 14 }, (_, index) => ({
    id: 'section-' + index,
    text: 'Section ' + (index + 1),
    level: index % 3 === 0 ? 2 : 3,
  }))
  const links = () =>
    Array.from(document.querySelectorAll('nav a')).filter(
      (link) => !link.closest('[hidden]')
    )
  const showAll = () =>
    document.querySelector<HTMLButtonElement>(
      '.dnb-table-of-content__show-all'
    )

  it('limits nested mobile links to ten and removes the control after revealing all', async () => {
    setMedia({ width: '390px' })
    render(
      <TableOfContent.Data
        data={headings}
        defaultExpanded
        locale="en-GB"
      />
    )
    expect(links()).toHaveLength(10)
    expect(showAll()).toHaveTextContent('Show all')
    fireEvent.click(showAll())
    expect(links()).toHaveLength(14)
    expect(showAll()).toBeNull()
    expect(links()[10]).toHaveFocus()
    fireEvent.click(
      document.querySelector('.dnb-table-of-content__toggle')
    )
    fireEvent.click(
      document.querySelector('.dnb-table-of-content__toggle')
    )
    expect(links()).toHaveLength(14)
    expect(showAll()).toBeNull()
    expect(
      await axeComponent(document.querySelector('nav'))
    ).toHaveNoViolations()
  })

  it('supports a custom limit, translation, composition and unlimited lists', () => {
    setMedia({ width: '390px' })
    const navigation = (limit: number) => (
      <TableOfContent.Root defaultExpanded maxVisibleItems={limit}>
        <TableOfContent.Item id="first" text="First">
          <TableOfContent.Item id="nested" text="Nested" />
        </TableOfContent.Item>
        <TableOfContent.Item id="last" text="Last" />
      </TableOfContent.Root>
    )
    const { rerender } = render(navigation(1))
    expect(links()).toHaveLength(1)
    expect(
      document.querySelector('.dnb-table-of-content__sub-list')
    ).toHaveAttribute('hidden')
    expect(showAll()).toHaveTextContent('Vis alle')
    fireEvent.click(showAll())
    expect(links()).toHaveLength(3)
    expect(showAll()).toBeNull()
    rerender(navigation(2))
    expect(links()).toHaveLength(2)
    rerender(navigation(0))
    expect(links()).toHaveLength(3)
    expect(showAll()).toBeNull()
  })

  it('shows everything on desktop and resets the extra links for a different page', () => {
    const { rerender } = render(
      <TableOfContent.Data data={headings} defaultExpanded />
    )
    expect(links()).toHaveLength(14)
    expect(showAll()).not.toBeVisible()
    act(() => setMedia({ width: '390px' }))
    expect(links()).toHaveLength(10)
    fireEvent.click(showAll())
    act(() => setMedia({ width: '1400px' }))
    act(() => setMedia({ width: '390px' }))
    expect(links()).toHaveLength(14)
    rerender(
      <TableOfContent.Data
        data={headings.map((item) => ({ ...item, id: 'next-' + item.id }))}
        defaultExpanded
      />
    )
    expect(links()).toHaveLength(10)
  })

  it('starts limited again when returning to an earlier heading list', () => {
    setMedia({ width: '390px' })
    const { rerender } = render(
      <TableOfContent.Data data={headings} defaultExpanded />
    )
    fireEvent.click(showAll())
    const other = headings.map((item) => ({
      ...item,
      id: 'other-' + item.id,
    }))
    rerender(<TableOfContent.Data data={other} defaultExpanded />)
    expect(links()).toHaveLength(10)
    rerender(<TableOfContent.Data data={headings} defaultExpanded />)
    expect(links()).toHaveLength(10)
    expect(showAll()).not.toBeNull()
  })

  it('counts the page title, respects depth and returns focus when resizing hides a link', () => {
    const { rerender } = render(
      <TableOfContent.Data
        data={data}
        includeH1
        maxVisibleItems={2}
        defaultExpanded
      />
    )
    const link =
      document.querySelector<HTMLAnchorElement>('a[href="#next"]')
    act(() => link.focus())
    act(() => setMedia({ width: '390px' }))
    expect(links()).toHaveLength(2)
    expect(links().map((link) => link.textContent)).toEqual([
      'Page title',
      'Overview',
    ])
    expect(showAll()).toHaveFocus()
    act(() => setMedia({ width: '1400px' }))
    expect(document.querySelector('a')).toHaveFocus()
    act(() => setMedia({ width: '390px' }))
    rerender(
      <TableOfContent.Data
        data={data}
        maxDepth={1}
        maxVisibleItems={2}
        defaultExpanded
      />
    )
    expect(links()).toHaveLength(2)
    expect(showAll()).toBeNull()
  })

  it('hydrates a long expanded mobile list without mismatches', async () => {
    setMedia({ width: '390px' })
    const element = <TableOfContent.Data data={headings} defaultExpanded />
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.append(container)
    expect(
      container.querySelectorAll('[data-table-of-content-overflow]')
    ).toHaveLength(5)
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, element, { onRecoverableError })
    })
    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(links()).toHaveLength(10)
    act(() => root.unmount())
    container.remove()
  })

  it.each([true, false])(
    'reveals every overflow link on browser find when disclosure is open: %s',
    (defaultExpanded) => {
      setMedia({ width: '390px' })
      const onExpandedChange = vi.fn()
      render(
        <TableOfContent.Data
          data={headings}
          defaultExpanded={defaultExpanded}
          onExpandedChange={onExpandedChange}
        />
      )
      const matched = document
        .querySelector('a[href="#section-11"]')
        .closest('li')
      expect(matched).toHaveAttribute('hidden', 'until-found')
      act(() =>
        document
          .querySelector<HTMLButtonElement>(
            '.dnb-table-of-content__toggle'
          )
          .focus()
      )
      const focused = document.activeElement
      fireEvent(matched, new Event('beforematch', { bubbles: true }))
      expect(links()).toHaveLength(14)
      expect(showAll()).toBeNull()
      expect(
        document.querySelector('.dnb-table-of-content__toggle')
      ).toHaveAttribute('aria-expanded', 'true')
      expect(document.activeElement).toBe(focused)
      expect(onExpandedChange).toHaveBeenCalledTimes(
        defaultExpanded ? 0 : 1
      )
      expect(
        document.querySelector('nav [hidden="until-found"]')
      ).toBeNull()
    }
  )

  it('reveals a hidden nested list at the item limit and restores regular desktop layout', () => {
    setMedia({ width: '390px' })
    render(
      <TableOfContent.Root defaultExpanded maxVisibleItems={1}>
        <TableOfContent.Item id="first" text="First">
          <TableOfContent.Item id="nested" text="Nested" />
        </TableOfContent.Item>
        <TableOfContent.Item id="last" text="Last" />
      </TableOfContent.Root>
    )
    const nested = document.querySelector(
      '.dnb-table-of-content__sub-list'
    )
    expect(nested).toHaveAttribute('hidden', 'until-found')
    fireEvent(nested, new Event('beforematch', { bubbles: true }))
    expect(links()).toHaveLength(3)
    expect(showAll()).toBeNull()
    act(() => setMedia({ width: '1400px' }))
    expect(document.querySelector('nav [hidden]')).toBeNull()
  })

  it('falls back to regular hiding when until-found is unsupported', () => {
    const supportsFind = vi
      .spyOn(HeightAnimationModule, 'supportsOpenOnFind')
      .mockReturnValue(false)
    try {
      setMedia({ width: '390px' })
      render(<TableOfContent.Data data={headings} defaultExpanded />)
      const item = document
        .querySelector('a[href="#section-11"]')
        .closest('li')
      expect(item).toHaveAttribute('hidden', '')
      expect(item).toHaveAttribute('aria-hidden', 'true')
      fireEvent.click(showAll())
      expect(item).not.toHaveAttribute('hidden')
      expect(item).not.toHaveAttribute('aria-hidden')
      expect(links()).toHaveLength(14)
    } finally {
      supportsFind.mockRestore()
    }
  })

  it('has no extra control for a short list and hides it with the disclosure', () => {
    setMedia({ width: '390px' })
    const { rerender } = render(
      <TableOfContent.Data data={headings.slice(0, 10)} defaultExpanded />
    )
    expect(links()).toHaveLength(10)
    expect(showAll()).toBeNull()
    rerender(<TableOfContent.Data data={headings} defaultExpanded />)
    fireEvent.click(
      document.querySelector('.dnb-table-of-content__toggle')
    )
    expect(
      document.querySelector('.dnb-table-of-content__list-wrapper')
    ).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('disclosure persistence', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    sessionStorage.clear()
    localStorage.clear()
  })

  it('uses the stored disclosure choice from the first render of a client mount', () => {
    sessionStorage.setItem('toc-expanded', 'true')
    const renders: boolean[] = []
    const onExpandedChange = vi.fn()
    renderHook(() => {
      const { isExpanded } = useDisclosureState({
        expandedStorageKey: 'toc-expanded',
        onExpandedChange,
      })
      renders.push(isExpanded)
    })
    expect(renders[0]).toBe(true)
    expect(onExpandedChange).not.toHaveBeenCalled()
  })

  it('restores and saves session state without writing desktop expansion', () => {
    setMedia({ width: '390px' })
    sessionStorage.setItem('toc-expanded', 'true')
    const { unmount } = render(
      <TableOfContent.Data data={data} expandedStorageKey="toc-expanded" />
    )
    expect(document.querySelector('button')).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    fireEvent.click(document.querySelector('button'))
    expect(sessionStorage.getItem('toc-expanded')).toBe('false')
    act(() => setMedia({ width: '1400px' }))
    expect(sessionStorage.getItem('toc-expanded')).toBe('false')
    unmount()
    setMedia({ width: '390px' })
    render(
      <TableOfContent.Data
        data={data}
        expandedStorageKey="toc-expanded"
        defaultExpanded
      />
    )
    expect(document.querySelector('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('supports local storage and switches keys without carrying the previous choice', () => {
    setMedia({ width: '390px' })
    localStorage.setItem('first-toc', 'true')
    const { rerender } = render(
      <TableOfContent.Data
        data={data}
        expandedStorageKey="first-toc"
        expandedStorage="local"
      />
    )
    expect(document.querySelector('button')).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    rerender(
      <TableOfContent.Data
        data={data}
        expandedStorageKey="other-toc"
        expandedStorage="local"
      />
    )
    expect(document.querySelector('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    fireEvent.click(document.querySelector('button'))
    expect(localStorage.getItem('other-toc')).toBe('true')
  })

  it('leaves storage untouched when expanded is controlled', () => {
    setMedia({ width: '390px' })
    sessionStorage.setItem('toc-expanded', 'true')
    const change = vi.fn()
    render(
      <TableOfContent.Data
        data={data}
        expandedStorageKey="toc-expanded"
        expanded={false}
        onExpandedChange={change}
      />
    )
    expect(document.querySelector('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    fireEvent.click(document.querySelector('button'))
    expect(change).toHaveBeenCalledWith(true)
    expect(sessionStorage.getItem('toc-expanded')).toBe('true')
    expect(document.querySelector('nav')).not.toHaveAttribute(
      'data-table-of-content-expanded-storage-key'
    )
  })

  it.each(['invalid', 'null', '[]', '123'])(
    'uses the default when the stored value is not a boolean: %s',
    (stored) => {
      setMedia({ width: '390px' })
      sessionStorage.setItem('toc-expanded', stored)
      render(
        <TableOfContent.Data
          data={data}
          expandedStorageKey="toc-expanded"
        />
      )
      expect(document.querySelector('button')).toHaveAttribute(
        'aria-expanded',
        'false'
      )
    }
  )

  it('uses the default when invalid storage cannot be cleaned up', () => {
    sessionStorage.setItem('toc-expanded', 'invalid')
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new DOMException('Read only', 'SecurityError')
    })
    setMedia({ width: '390px' })
    render(
      <TableOfContent.Data
        data={data}
        expandedStorageKey="toc-expanded"
        defaultExpanded
      />
    )
    expect(
      document.querySelector('.dnb-table-of-content__toggle')
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('remains usable when storage access is blocked', () => {
    setMedia({ width: '390px' })
    vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError')
    })
    render(
      <TableOfContent.Data data={data} expandedStorageKey="toc-expanded" />
    )
    fireEvent.click(document.querySelector('button'))
    expect(document.querySelector('button')).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })
})

it('animates heading replacements only when animateChanges is enabled', () => {
  const animate = vi.fn(() => ({
    cancel: vi.fn(),
    finished: new Promise<void>(() => undefined),
  }))
  Object.defineProperty(HTMLElement.prototype, 'animate', {
    configurable: true,
    value: animate,
  })
  vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue([
    {},
  ] as unknown as DOMRectList)
  try {
    const { rerender, unmount } = render(
      <TableOfContent.Data data={data} currentId={null} />
    )
    const changed = data.map((item) => ({
      ...item,
      text: 'New ' + item.text,
    }))
    rerender(<TableOfContent.Data data={changed} currentId={null} />)
    expect(animate).not.toHaveBeenCalled()
    rerender(
      <TableOfContent.Data
        data={changed}
        currentId={null}
        animateChanges
      />
    )
    expect(animate).not.toHaveBeenCalled()
    rerender(
      <TableOfContent.Data data={data} currentId={null} animateChanges />
    )
    expect(animate).toHaveBeenCalled()
    expect(document.querySelector('nav')).not.toHaveAttribute(
      'animateChanges'
    )
    rerender(
      <TableOfContent.Data
        data={data}
        currentId="overview"
        animateChanges
      />
    )
    const count = animate.mock.calls.length
    rerender(
      <TableOfContent.Data data={data} currentId="next" animateChanges />
    )
    expect(animate).toHaveBeenCalledTimes(count)
    rerender(<TableOfContent.Data data={data} currentId={null} />)
    expect(document.querySelector('[data-toc-outgoing]')).toBeNull()
    unmount()
  } finally {
    delete HTMLElement.prototype.animate
    vi.restoreAllMocks()
  }
})

it('selects a clicked destination without stopping at headings passed during scrolling', async () => {
  let nextTop = 600
  const overview = document.createElement('h2')
  overview.id = 'overview'
  overview.getClientRects = () => [{}] as unknown as DOMRectList
  overview.getBoundingClientRect = () => ({ top: -20 }) as DOMRect
  const next = document.createElement('h2')
  next.id = 'next'
  next.getClientRects = () => [{}] as unknown as DOMRectList
  next.getBoundingClientRect = () => ({ top: nextTop }) as DOMRect
  document.body.append(overview, next)
  render(<TableOfContent.Data data={data} />)
  expect(document.querySelector('a[aria-current]')).toHaveAttribute(
    'href',
    '#overview'
  )

  fireEvent.click(document.querySelector('a[href="#next"]'))
  expect(document.querySelector('a[aria-current]')).toHaveAttribute(
    'href',
    '#next'
  )
  fireEvent.scroll(window)
  await new Promise((resolve) => requestAnimationFrame(resolve))
  expect(document.querySelector('a[aria-current]')).toHaveAttribute(
    'href',
    '#next'
  )

  fireEvent.wheel(window)
  await waitFor(() =>
    expect(document.querySelector('a[aria-current]')).toHaveAttribute(
      'href',
      '#overview'
    )
  )
  vi.useFakeTimers()
  try {
    fireEvent.click(document.querySelector('a[href="#next"]'))
    nextTop = -10
    fireEvent.scroll(window)
    fireEvent(window, new Event('scrollend'))
    act(() => vi.advanceTimersByTime(200))
    expect(document.querySelector('a[aria-current]')).toHaveAttribute(
      'href',
      '#next'
    )
  } finally {
    vi.useRealTimers()
  }
  nextTop = 600
  fireEvent.scroll(window)
  await waitFor(() =>
    expect(document.querySelector('a[aria-current]')).toHaveAttribute(
      'href',
      '#overview'
    )
  )
})

it.each(['hidden', 'aria-hidden', 'visibility', 'removed'])(
  'resumes automatic tracking when a clicked heading becomes %s without changing the data',
  async (change) => {
    const article = document.createElement('article')
    const overview = document.createElement('h2')
    overview.id = 'overview'
    overview.getClientRects = () => [{}] as unknown as DOMRectList
    overview.getBoundingClientRect = () =>
      ({ top: -50, bottom: -18 }) as DOMRect
    const next = document.createElement('h2')
    next.id = 'next'
    next.getClientRects = () => [{}] as unknown as DOMRectList
    next.getBoundingClientRect = () =>
      ({ top: -10, bottom: 22 }) as DOMRect
    article.append(next)
    document.body.append(overview, article)
    render(<TableOfContent.Data data={data} />)
    fireEvent.click(document.querySelector('a[href="#next"]'))
    expect(document.querySelector('a[aria-current]')).toHaveAttribute(
      'href',
      '#next'
    )

    act(() => {
      if (change === 'removed') {
        next.remove()
      } else if (change === 'visibility') {
        next.style.visibility = 'hidden'
      } else {
        article.setAttribute(change, 'true')
      }
    })
    await waitFor(() =>
      expect(document.querySelector('a[aria-current]')).toHaveAttribute(
        'href',
        '#overview'
      )
    )

    act(() => {
      article.removeAttribute('hidden')
      article.removeAttribute('aria-hidden')
      next.style.removeProperty('visibility')
      article.append(next)
    })
    await waitFor(() =>
      expect(document.querySelector('a[aria-current]')).toHaveAttribute(
        'href',
        '#next'
      )
    )
    act(() => {
      overview.remove()
      article.remove()
    })
    await waitFor(() =>
      expect(document.querySelector('a[aria-current]')).toBeNull()
    )
    expect(
      document.querySelector('.dnb-table-of-content__marker')
    ).toBeNull()
  }
)

it('defaults to sticky positioning and supports an offset or application-owned positioning', () => {
  const { rerender } = render(
    <TableOfContent.Data data={data} currentId={null} />
  )
  expect(document.querySelector('nav')).toHaveClass(
    'dnb-table-of-content--sticky'
  )
  rerender(
    <TableOfContent.Data
      data={data}
      currentId={null}
      stickyOffset="5.5rem"
    />
  )
  expect(
    document
      .querySelector('nav')
      .style.getPropertyValue('--table-of-content-sticky-offset')
  ).toBe('5.5rem')
  rerender(
    <TableOfContent.Data
      data={data}
      currentId={null}
      sticky={false}
      stickyOffset={88}
    />
  )
  expect(document.querySelector('nav')).not.toHaveClass(
    'dnb-table-of-content--sticky'
  )
  expect(
    document
      .querySelector('nav')
      .style.getPropertyValue('--table-of-content-sticky-offset')
  ).toBe('88px')
})

it('renders named navigation and nested lists with the current location', () => {
  render(
    <Provider locale="en-GB">
      <TableOfContent.Data data={data} currentId="deep" />
    </Provider>
  )
  expect(document.querySelector('nav')).toHaveAccessibleName(
    'On this page'
  )
  expect(document.querySelectorAll('a')).toHaveLength(3)
  expect(document.querySelector('li > ul a')).toHaveTextContent('Details')
  expect(document.querySelector('a[aria-current]')).toHaveAttribute(
    'href',
    '#details'
  )
  expect(document.querySelector('a[aria-current]')).toHaveAttribute(
    'aria-current',
    'location'
  )
  expect(document.querySelector('#overview')).toBeNull()
})

it('optionally includes H1 as a top-level link without consuming maxDepth', () => {
  const { rerender } = render(
    <TableOfContent.Data data={data} includeH1 currentId="title" />
  )
  expect(document.querySelector('a[aria-current]')).toHaveAttribute(
    'href',
    '#title'
  )
  expect(
    document.querySelectorAll('.dnb-table-of-content__list > li')
  ).toHaveLength(3)
  expect(document.querySelector('li > ul a')).toHaveTextContent('Details')
  expect(document.querySelector('nav')).not.toHaveAttribute('includeH1')
  rerender(
    <TableOfContent.Data
      data={data}
      includeH1
      maxDepth={1}
      currentId="title"
    />
  )
  expect(document.querySelectorAll('a')).toHaveLength(3)
  expect(document.querySelector('li > ul')).toBeNull()
  rerender(<TableOfContent.Data data={data} currentId="title" />)
  expect(document.querySelector('a[aria-current]')).toHaveAttribute(
    'href',
    '#overview'
  )
})

it('does not count explicitly hidden composed items towards the mobile limit', () => {
  setMedia({ width: '390px' })
  render(
    <TableOfContent.Root maxVisibleItems={2} defaultExpanded>
      <TableOfContent.Item id="hidden-item" text="Hidden" hidden />
      <TableOfContent.Item id="first-item" text="First" />
      <TableOfContent.Item id="second-item" text="Second" />
    </TableOfContent.Root>
  )
  const visible = Array.from(document.querySelectorAll('nav a')).filter(
    (link) => !link.closest('[hidden]')
  )
  expect(visible.map((link) => link.textContent)).toEqual([
    'First',
    'Second',
  ])
  expect(
    document.querySelector('.dnb-table-of-content__show-all')
  ).toBeNull()
})

it('supports declarative composition, fragments, memoized items and controlled updates', () => {
  const Item = memo(TableOfContent.Item)
  const content = (
    <>
      <Item id="overview" text="Overview">
        <TableOfContent.Item id="details" text={<code>Details</code>} />
      </Item>
      <TableOfContent.Item id="next" text="Next steps" />
    </>
  )
  const { rerender } = render(
    <TableOfContent.Root currentId="details">
      {content}
    </TableOfContent.Root>
  )
  expect(document.querySelector('a[aria-current] code')).toHaveTextContent(
    'Details'
  )
  rerender(
    <TableOfContent.Root currentId={null}>{content}</TableOfContent.Root>
  )
  expect(document.querySelector('a[aria-current]')).toBeNull()
})

it('forwards HTML, spacing, width and ref properties without duplicate ids', () => {
  const ref = { current: null as HTMLElement }
  render(
    <TableOfContent.Data
      id="toc"
      ref={ref}
      data={data}
      currentId={null}
      aria-label="Article sections"
      className="custom"
      top="large"
      stretch
      data-example="value"
    />
  )
  const nav = document.querySelector('nav')
  expect(nav).toBe(ref.current)
  expect(nav).toHaveAccessibleName('Article sections')
  expect(nav).toHaveClass(
    'custom',
    'dnb-space__top--large',
    'dnb-table-of-content--stretch'
  )
  expect(nav).toHaveAttribute('data-example', 'value')
})

it('uses localized and custom titles', () => {
  const { rerender } = render(
    <Provider locale="nb-NO">
      <TableOfContent.Data data={data} currentId={null} />
    </Provider>
  )
  expect(document.querySelector('nav')).toHaveAccessibleName(
    'På denne siden'
  )
  rerender(
    <TableOfContent.Data
      data={data}
      currentId={null}
      title="Article contents"
    />
  )
  expect(document.querySelector('nav')).toHaveAccessibleName(
    'Article contents'
  )
})

it('lets Root and Data override the Provider locale without changing sibling components', () => {
  render(
    <Provider locale="nb-NO">
      <TableOfContent.Data data={data} currentId={null} locale="en-GB" />
      <TableOfContent.Root currentId={null} locale="en-GB">
        <TableOfContent.Item id="overview" text="Overview" />
      </TableOfContent.Root>
      <TableOfContent.Data data={data} currentId={null} />
    </Provider>
  )
  const navs = document.querySelectorAll('nav')
  expect(navs[0]).toHaveAccessibleName('On this page')
  expect(navs[0]).toHaveAttribute('lang', 'en-GB')
  expect(navs[0]).not.toHaveAttribute('locale')
  expect(navs[1]).toHaveAccessibleName('On this page')
  expect(navs[2]).toHaveAccessibleName('På denne siden')
})

it('preserves custom titles and explicit language attributes with a locale override', () => {
  render(
    <TableOfContent.Data
      data={data}
      locale="en-GB"
      title="Guide contents"
      aria-label="Article sections"
      lang="en"
    />
  )
  expect(document.querySelector('nav')).toHaveAccessibleName(
    'Article sections'
  )
  expect(
    document.querySelector('.dnb-table-of-content__title')
  ).toHaveTextContent('Guide contents')
  expect(document.querySelector('nav')).toHaveAttribute('lang', 'en')
})

it('renders nothing when no headings can be displayed', () => {
  const { container, rerender } = render(<TableOfContent.Data data={[]} />)
  expect(container).toBeEmptyDOMElement()
  rerender(<TableOfContent.Data data={data} maxDepth={0} />)
  expect(container).toBeEmptyDOMElement()
})

it('connects the mobile disclosure to its content and preserves its chosen state across breakpoints', async () => {
  setMedia({ width: '600px' })
  const onExpandedChange = vi.fn()
  render(
    <TableOfContent.Data
      data={data}
      currentId={null}
      onExpandedChange={onExpandedChange}
    />
  )
  const toggle = document.querySelector('button')
  expect(document.querySelector('a')).not.toHaveClass(
    'dnb-anchor--no-style'
  )
  const chevron = toggle.querySelector('.dnb-icon--transition-fallback')
  expect(chevron).not.toBeNull()
  expect(
    chevron.querySelector('.dnb-icon__state--active')
  ).toHaveAttribute('data-icon-state', 'collapsed')
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
  expect(
    document.getElementById(toggle.getAttribute('aria-controls'))
  ).toHaveAttribute('aria-hidden', 'true')
  fireEvent.click(toggle)
  expect(toggle).toHaveAttribute('aria-expanded', 'true')
  expect(onExpandedChange).toHaveBeenCalledWith(true)
  expect(toggle.querySelector('.dnb-icon--transition-fallback')).toBe(
    chevron
  )
  expect(
    chevron.querySelector('.dnb-icon__state--active')
  ).toHaveAttribute('data-icon-state', 'expanded')
  act(() => setMedia({ width: '1400px' }))
  expect(document.querySelector('nav')).toHaveClass(
    'dnb-table-of-content--sidebar'
  )
  expect(document.querySelector('a')).toHaveClass(
    'dnb-anchor--no-style',
    'dnb-anchor--no-underline',
    'dnb-anchor--no-hover'
  )
  act(() => setMedia({ width: '600px' }))
  await waitFor(() =>
    expect(document.querySelector('button')).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  )
})

it('supports controlled disclosure state and browser find', () => {
  setMedia({ width: '600px' })
  const onExpandedChange = vi.fn()
  const { rerender } = render(
    <TableOfContent.Data
      data={data}
      currentId={null}
      expanded={false}
      onExpandedChange={onExpandedChange}
    />
  )
  fireEvent.click(document.querySelector('button'))
  expect(document.querySelector('button')).toHaveAttribute(
    'aria-expanded',
    'false'
  )
  expect(onExpandedChange).toHaveBeenCalledWith(true)
  fireEvent(
    document.querySelector('.dnb-height-animation'),
    new Event('beforematch')
  )
  expect(onExpandedChange).toHaveBeenCalledWith(true)
  rerender(
    <TableOfContent.Data
      data={data}
      currentId={null}
      expanded
      onExpandedChange={onExpandedChange}
    />
  )
  expect(document.querySelector('button')).toHaveAttribute(
    'aria-expanded',
    'true'
  )
})

it('moves focus to the fragment destination and preserves native links', () => {
  const destination = document.createElement('h2')
  destination.id = 'a/b #c'
  document.body.append(destination)
  render(
    <TableOfContent.Root currentId={null}>
      <TableOfContent.Item id={destination.id} text="Destination" />
    </TableOfContent.Root>
  )
  const link = document.querySelector('a')
  expect(link).toHaveAttribute('href', '#a%2Fb%20%23c')
  fireEvent.click(link, { ctrlKey: true })
  expect(destination).not.toHaveFocus()
  fireEvent.click(link)
  expect(destination).toHaveFocus()
  expect(destination).toHaveAttribute('tabindex', '-1')
  act(() => destination.blur())
  expect(destination).not.toHaveAttribute('tabindex')
})

it('focuses destinations without opening their Eufemia tooltip and keeps direct focus available', async () => {
  render(
    <Provider Tooltip={{ noAnimation: true }}>
      <TableOfContent.Data
        currentId={null}
        data={[{ id: 'destination', text: 'Destination', level: 2 }]}
      />
      <h2>
        Destination
        <Anchor id="destination" href="#destination" tooltip="Copy link">
          #
        </Anchor>
      </h2>
    </Provider>
  )
  const destination = document.getElementById('destination')
  await act(async () => {
    fireEvent.click(document.querySelector('.dnb-table-of-content a'))
  })
  expect(destination).toHaveFocus()
  expect(destination).not.toHaveAttribute('data-autofocus')
  expect(document.querySelector('.dnb-tooltip--active')).toBeNull()

  act(() => destination.blur())
  act(() => destination.focus())
  await waitFor(() =>
    expect(
      document.querySelector('.dnb-tooltip--active')
    ).toHaveTextContent('Copy link')
  )
})

it('preserves destination attributes after automatic focus', () => {
  render(
    <>
      <TableOfContent.Data
        currentId={null}
        data={[{ id: 'destination', text: 'Destination', level: 2 }]}
      />
      <a
        id="destination"
        href="#destination"
        tabIndex={0}
        data-autofocus="existing"
      >
        Destination
      </a>
    </>
  )
  const destination = document.getElementById('destination')
  fireEvent.click(document.querySelector('.dnb-table-of-content a'))
  expect(destination).toHaveFocus()
  expect(destination).toHaveAttribute('data-autofocus', 'existing')
  act(() => destination.blur())
  expect(destination).toHaveAttribute('tabindex', '0')
})

it('honors prevented navigation', () => {
  const destination = document.createElement('h2')
  destination.id = 'overview'
  document.body.append(destination)
  render(
    <TableOfContent.Root currentId={null}>
      <TableOfContent.Item
        id="overview"
        text="Overview"
        onClick={(event) => event.preventDefault()}
      />
    </TableOfContent.Root>
  )
  fireEvent.click(document.querySelector('a'))
  expect(destination).not.toHaveFocus()
})

it.each(['390px', '1400px'])(
  'renders complete SSR markup and hydrates at %s without mismatches',
  async (width) => {
    setMedia({ width })
    const element = (
      <TableOfContent.Data data={data} currentId="overview" />
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.append(container)
    expect(container.querySelectorAll('a')).toHaveLength(3)
    expect(
      container.querySelector('.dnb-table-of-content__toggle')
    ).not.toBeNull()
    expect(container.querySelector('style')?.textContent).toContain(
      '@media'
    )
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, element, { onRecoverableError })
    })
    expect(onRecoverableError).not.toHaveBeenCalled()
    act(() => root.unmount())
  }
)

it('uses stable initial styles for custom breakpoints and independently expanded instances', () => {
  const markup = (id: string, defaultExpanded: boolean) => {
    const container = document.createElement('div')
    container.innerHTML = renderToString(
      <Provider breakpoints={{ large: '64em' }}>
        <TableOfContent.Data
          id={id}
          data={data}
          defaultExpanded={defaultExpanded}
        />
      </Provider>
    )
    return container
  }
  const first = markup('first', false)
  const second = markup('second', true)
  expect(first.querySelector('style').textContent).toBe(
    second.querySelector('style').textContent
  )
  expect(first.querySelector('style').textContent).toContain('64em')
  expect(first.querySelector('nav')).not.toHaveAttribute(
    'data-table-of-content-expanded'
  )
  expect(second.querySelector('nav')).toHaveAttribute(
    'data-table-of-content-expanded',
    'true'
  )
})

it('has accessible desktop and collapsed mobile navigation', async () => {
  const { rerender } = render(
    <TableOfContent.Data data={data} currentId="details" />
  )
  expect(
    await axeComponent(document.querySelector('nav'))
  ).toHaveNoViolations()
  act(() => setMedia({ width: '600px' }))
  rerender(<TableOfContent.Data data={data} currentId="details" />)
  expect(
    await axeComponent(document.querySelector('nav'))
  ).toHaveNoViolations()
})

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    }
  )
})
afterEach(() => vi.unstubAllGlobals())
