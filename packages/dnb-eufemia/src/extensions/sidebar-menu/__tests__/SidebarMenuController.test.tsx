import { act, fireEvent, render } from '@testing-library/react'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import * as SidebarMenu from '../SidebarMenu'
import type { SidebarMenuContent } from '../types'
import { makeUniqueId } from '../../../shared/component-helper'

const fallback = [{ id: 'home', text: 'Home', href: '/home' }]
const payments = [{ id: 'payments', text: 'Payments', href: '/payments' }]

describe('SidebarMenu content controller', () => {
  let id: string
  let cleanups: Array<() => void>

  beforeEach(() => {
    id = makeUniqueId()
    cleanups = []
  })

  afterEach(() => {
    act(() => cleanups.reverse().forEach((cleanup) => cleanup()))
  })

  it('retains content set before mounting and restores the shell fallback', () => {
    const release = SidebarMenu.getController(id).setContent(
      { data: payments },
      { key: 'payments' }
    )
    cleanups.push(release)

    render(<SidebarMenu.Data controllerId={id} data={fallback} />)

    expect(
      document.querySelector('[href="/payments"]')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[href="/home"]')
    ).not.toBeInTheDocument()
    expect(document.querySelector('nav')).not.toHaveAttribute(
      'controllerId'
    )

    act(release)

    expect(document.querySelector('[href="/home"]')).toBeInTheDocument()
  })

  it('updates two independent React roots without a provider', () => {
    render(<SidebarMenu.Data controllerId={id} data={fallback} />)
    render(<SidebarMenu.Data controllerId={id} data={fallback} />)

    act(() => {
      cleanups.push(
        SidebarMenu.getController(id).setContent(
          { data: payments },
          { key: 'payments' }
        )
      )
    })

    expect(document.querySelectorAll('[href="/payments"]')).toHaveLength(2)
  })

  it('keeps different controller ids and unconnected menus isolated', () => {
    render(<SidebarMenu.Data controllerId={id} data={fallback} />)
    render(
      <SidebarMenu.Data controllerId={id + '-other'} data={fallback} />
    )
    render(<SidebarMenu.Data data={fallback} />)

    act(() => {
      cleanups.push(
        SidebarMenu.getController(id).setContent(
          { data: payments },
          { key: 'payments' }
        )
      )
    })

    expect(document.querySelectorAll('[href="/home"]')).toHaveLength(2)
    expect(document.querySelectorAll('[href="/payments"]')).toHaveLength(1)
  })

  it('reveals the previous replacement and ignores outdated cleanup', () => {
    const sidebar = SidebarMenu.getController(id)
    const first = sidebar.setContent(
      { data: payments },
      { key: 'payments' }
    )
    const second = sidebar.setContent(
      { data: fallback },
      { key: 'payments' }
    )
    const third = sidebar.setContent({ data: [] }, { key: 'other-app' })
    cleanups.push(first, second, third)

    render(<SidebarMenu.Data controllerId={id} />)
    act(first)
    expect(document.querySelector('nav a')).not.toBeInTheDocument()

    act(third)
    expect(document.querySelector('[href="/home"]')).toBeInTheDocument()

    act(second)
    expect(document.querySelector('nav a')).not.toBeInTheDocument()
  })

  it('retains transformations before mounting and reapplies them to new content', () => {
    cleanups.push(
      SidebarMenu.getController(id).transformContent(
        (content) => ({
          data: [...(content.data ?? []), ...payments],
        }),
        { key: 'payments' }
      )
    )
    const { rerender } = render(
      <SidebarMenu.Data controllerId={id} data={fallback} />
    )
    expect(document.querySelector('[href="/home"]')).toBeInTheDocument()
    expect(
      document.querySelector('[href="/payments"]')
    ).toBeInTheDocument()

    rerender(<SidebarMenu.Data controllerId={id} data={[]} />)
    expect(
      document.querySelector('[href="/home"]')
    ).not.toBeInTheDocument()
    expect(document.querySelectorAll('[href="/payments"]')).toHaveLength(1)

    act(() => {
      cleanups.push(
        SidebarMenu.getController(id).setContent(
          { data: fallback },
          { key: 'shell' }
        )
      )
    })
    expect(document.querySelector('[href="/home"]')).toBeInTheDocument()
    expect(document.querySelectorAll('[href="/payments"]')).toHaveLength(1)
  })

  it('orders transformations by order and key rather than loading order', () => {
    const append = (text: string) => (content: SidebarMenuContent) => ({
      data: content.data.map((item) => ({
        ...item,
        text: item.text + text,
      })),
    })
    const sidebar = SidebarMenu.getController(id)
    cleanups.push(
      sidebar.transformContent(append(' C'), { key: 'c', order: 10 }),
      sidebar.transformContent(append(' B'), { key: 'b' }),
      sidebar.transformContent(append(' A'), { key: 'a' })
    )

    render(<SidebarMenu.Data controllerId={id} data={fallback} />)

    expect(document.querySelector('[href="/home"]')).toHaveTextContent(
      'Home A B C'
    )
    expect(fallback[0].text).toBe('Home')
  })

  it('replaces a transformation by key and protects it from old cleanup', () => {
    const sidebar = SidebarMenu.getController(id)
    const first = sidebar.transformContent(() => ({ data: [] }), {
      key: 'app',
    })
    const second = sidebar.transformContent(() => ({ data: payments }), {
      key: 'app',
    })
    cleanups.push(first, second)
    render(<SidebarMenu.Data controllerId={id} data={fallback} />)

    act(first)
    expect(
      document.querySelector('[href="/payments"]')
    ).toBeInTheDocument()

    act(second)
    act(second)
    expect(document.querySelector('[href="/home"]')).toBeInTheDocument()
  })

  it('renders replacement sections with selection and interaction intact', () => {
    cleanups.push(
      SidebarMenu.getController(id).setContent(
        {
          sections: [
            { id: 'personal', text: 'Personal', items: fallback },
            {
              id: 'business',
              text: 'Business',
              defaultActive: true,
              items: payments,
            },
          ],
        },
        { key: 'app' }
      )
    )
    const onSelectedItemChange = vi.fn()
    const onClick = (event) => event.preventDefault()
    render(
      <SidebarMenu.Data
        controllerId={id}
        onSelectedItemChange={onSelectedItemChange}
        onClick={onClick}
      />
    )

    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveTextContent('Business')
    fireEvent.click(document.querySelector('[href="/payments"]'))
    expect(onSelectedItemChange).toHaveBeenCalledWith('payments')
  })

  it('falls back to an available section when external content replaces the sections', () => {
    render(
      <SidebarMenu.Data
        controllerId={id}
        sections={[
          {
            id: 'personal',
            text: 'Personal',
            defaultActive: true,
            items: fallback,
          },
        ]}
      />
    )
    expect(document.querySelector('[href="/home"]')).toBeInTheDocument()

    act(() => {
      cleanups.push(
        SidebarMenu.getController(id).setContent(
          {
            sections: [
              { id: 'other', text: 'Other', items: [] },
              {
                id: 'business',
                text: 'Business',
                defaultActive: true,
                items: payments,
              },
            ],
          },
          { key: 'app' }
        )
      )
    })

    expect(
      document.querySelector('.dnb-dropdown__trigger')
    ).toHaveTextContent('Business')
    expect(
      document.querySelector('[href="/payments"]')
    ).toBeInTheDocument()
  })

  it('retains updates across unmounts and StrictMode remounts', () => {
    cleanups.push(
      SidebarMenu.getController(id).setContent(
        { data: payments },
        { key: 'app' }
      )
    )
    const { unmount } = render(<SidebarMenu.Data controllerId={id} />)
    unmount()

    render(
      <StrictMode>
        <SidebarMenu.Data controllerId={id} />
      </StrictMode>
    )

    expect(document.querySelectorAll('[href="/payments"]')).toHaveLength(1)
  })

  it('switches subscriptions when controllerId changes', () => {
    cleanups.push(
      SidebarMenu.getController(id).setContent(
        { data: payments },
        { key: 'app' }
      )
    )
    const { rerender } = render(
      <SidebarMenu.Data controllerId={id} data={fallback} />
    )

    rerender(
      <SidebarMenu.Data controllerId={id + '-other'} data={fallback} />
    )
    expect(document.querySelector('[href="/home"]')).toBeInTheDocument()
    expect(
      document.querySelector('[href="/payments"]')
    ).not.toBeInTheDocument()
  })

  it('shares content and cleanup across independently loaded module copies', async () => {
    vi.resetModules()
    const first = await import('../SidebarMenuController')
    vi.resetModules()
    const second = await import('../SidebarMenuController')
    const release = first
      .getController(id)
      .setContent({ data: payments }, { key: 'app' })
    cleanups.push(release)
    render(<SidebarMenu.Data controllerId={id} data={fallback} />)
    expect(
      document.querySelector('[href="/payments"]')
    ).toBeInTheDocument()

    let replace: () => void
    act(() => {
      replace = second
        .getController(id)
        .setContent({ data: fallback }, { key: 'app' })
      cleanups.push(replace)
      release()
    })
    expect(document.querySelector('[href="/home"]')).toBeInTheDocument()

    act(replace)
    expect(document.querySelector('[href="/home"]')).toBeInTheDocument()
  })

  it('rejects empty controller ids and registration keys', () => {
    expect(() => SidebarMenu.getController('')).toThrow('non-empty id')
    expect(() =>
      SidebarMenu.getController(id).setContent({ data: [] }, { key: '' })
    ).toThrow('non-empty key')
  })

  it('hydrates fallback markup before applying retained browser content', async () => {
    cleanups.push(
      SidebarMenu.getController(id).setContent(
        { data: payments },
        { key: 'app' }
      )
    )
    const element = <SidebarMenu.Data controllerId={id} data={fallback} />
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.appendChild(container)
    expect(container.querySelector('[href="/home"]')).toBeInTheDocument()
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>

    await act(async () => {
      root = hydrateRoot(container, element, { onRecoverableError })
    })

    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(
      container.querySelector('[href="/payments"]')
    ).toBeInTheDocument()

    act(() => root.unmount())
    container.remove()
  })
})
