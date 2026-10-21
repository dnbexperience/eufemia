import { act, fireEvent, render } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { setMedia } from 'mock-match-media'
import '../../../core/vitest/mockMatchMediaSetup'
import * as SidebarMenu from '../SidebarMenu'
import { makeUniqueId } from '../../../shared/component-helper'

describe('SidebarMenu controller props', () => {
  let id: string
  let cleanups: Array<() => void>

  beforeEach(() => {
    id = makeUniqueId()
    cleanups = []
    setMedia({ width: '100em' })
  })

  afterEach(() => {
    act(() => cleanups.reverse().forEach((cleanup) => cleanup()))
  })

  const items = [
    { id: 'home', text: 'Home' },
    { id: 'payments', text: 'Payments' },
  ]

  it('retains menu props set before mounting and restores current shell props', () => {
    const release = SidebarMenu.getController(id).setProps(
      { selectedItem: 'payments', 'aria-label': 'Payments navigation' },
      { key: 'payments' }
    )
    cleanups.push(release)
    const { rerender } = render(
      <SidebarMenu.Data
        controllerId={id}
        data={items}
        aria-label="Shell navigation"
      />
    )

    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Payments')
    expect(document.querySelector('nav')).toHaveAccessibleName(
      'Payments navigation'
    )

    rerender(
      <SidebarMenu.Data
        controllerId={id}
        data={items}
        aria-label="Updated shell"
        selectedItem="home"
      />
    )
    act(release)
    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Home')
    expect(document.querySelector('nav')).toHaveAccessibleName(
      'Updated shell'
    )
  })

  it('connects declarative Root menus without changing children', () => {
    render(
      <SidebarMenu.Root controllerId={id}>
        <SidebarMenu.Item id="home" text="Home" />
        <SidebarMenu.Item id="payments" text="Payments" />
      </SidebarMenu.Root>
    )
    act(() => {
      cleanups.push(
        SidebarMenu.getController(id).setProps(
          { selectedItem: 'payments', className: 'app-menu' },
          { key: 'app' }
        )
      )
    })
    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Payments')
    expect(document.querySelector('nav')).toHaveClass('app-menu')
    expect(
      document.querySelectorAll('.dnb-sidebar-menu__item')
    ).toHaveLength(2)
    expect(document.querySelector('nav')).not.toHaveAttribute(
      'controllerId'
    )
  })

  it('merges registrations per prop, replaces a key, and ignores stale cleanup', () => {
    const controller = SidebarMenu.getController(id)
    const first = controller.setProps(
      { selectedItem: 'home', 'aria-label': 'First' },
      { key: 'first' }
    )
    const second = controller.setProps(
      { selectedItem: 'payments' },
      { key: 'second' }
    )
    cleanups.push(first, second)
    render(
      <SidebarMenu.Data
        controllerId={id}
        data={items}
        aria-label="Shell"
      />
    )
    expect(document.querySelector('nav')).toHaveAccessibleName('First')
    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Payments')

    let replace: () => void
    act(() => {
      replace = controller.setProps(
        { 'aria-label': 'Second' },
        { key: 'second' }
      )
      cleanups.push(replace)
      second()
    })
    expect(document.querySelector('nav')).toHaveAccessibleName('Second')
    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Home')
    act(replace)
    act(replace)
    expect(document.querySelector('nav')).toHaveAccessibleName('First')
  })

  it('keeps independent controllers and menus without a controller isolated', () => {
    cleanups.push(
      SidebarMenu.getController(id).setProps(
        { selectedItem: 'payments' },
        { key: 'app' }
      )
    )
    render(<SidebarMenu.Data controllerId={id} data={items} />)
    render(<SidebarMenu.Data controllerId={id + '-other'} data={items} />)
    render(<SidebarMenu.Data data={items} />)
    expect(
      document.querySelectorAll('[aria-current="page"]')
    ).toHaveLength(1)
  })

  it('overrides callbacks until cleanup without calling both handlers', () => {
    const shell = vi.fn()
    const app = vi.fn()
    const release = SidebarMenu.getController(id).setProps(
      { onSelectedItemChange: app },
      { key: 'app' }
    )
    cleanups.push(release)
    render(
      <SidebarMenu.Data
        controllerId={id}
        data={items}
        onSelectedItemChange={shell}
      />
    )
    fireEvent.click(
      document.querySelector('[data-sidebar-menu-id="payments"] button')
    )
    expect(app).toHaveBeenCalledWith('payments')
    expect(shell).not.toHaveBeenCalled()
    act(release)
    fireEvent.click(
      document.querySelector('[data-sidebar-menu-id="home"] button')
    )
    expect(shell).toHaveBeenCalledWith('home')
  })

  function ResponsiveMenu() {
    const { isSmallScreen, isCompact } = SidebarMenu.useResponsive()
    return (
      <div data-testid="mode">
        {isSmallScreen ? 'drawer' : isCompact ? 'compact' : 'full'}
      </div>
    )
  }

  it('updates responsive thresholds and generated CSS before and after mounting', () => {
    setMedia({ width: '75em' })
    const first = SidebarMenu.getController(id).setProps(
      { compactAt: '70em', compactOffset: '10em' },
      { key: 'app' }
    )
    cleanups.push(first)
    render(
      <SidebarMenu.ResponsiveProvider
        controllerId={id}
        scopeId="props-test"
        drawerAt="50em"
      >
        <ResponsiveMenu />
      </SidebarMenu.ResponsiveProvider>
    )
    expect(
      document.querySelector('[data-testid="mode"]')
    ).toHaveTextContent('compact')
    expect(
      document.querySelector(
        '[data-sidebar-menu-responsive-provider] style'
      )
    ).toHaveTextContent('max-width:80em')

    act(() => {
      cleanups.push(
        SidebarMenu.getController(id).setProps(
          { drawerAt: '90em' },
          { key: 'drawer' }
        )
      )
    })
    expect(
      document.querySelector('[data-testid="mode"]')
    ).toHaveTextContent('drawer')
    expect(
      document.querySelector(
        '[data-sidebar-menu-responsive-provider] style'
      )
    ).toHaveTextContent('max-width: 90em')
  })

  it('restores responsive props on cleanup and preserves unrelated content registrations', () => {
    setMedia({ width: '75em' })
    const controller = SidebarMenu.getController(id)
    const props = controller.setProps(
      { compactAt: '80em', inlineCollapsed: true },
      { key: 'app' }
    )
    const content = controller.setContent({ data: items }, { key: 'app' })
    cleanups.push(props, content)
    render(
      <SidebarMenu.ResponsiveProvider
        controllerId={id}
        drawerAt="50em"
        compactAt="70em"
      >
        <ResponsiveMenu />
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Data controllerId={id} />
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )
    expect(
      document.querySelector('[data-testid="mode"]')
    ).toHaveTextContent('compact')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('inert')
    expect(document.querySelector('nav')).not.toHaveAttribute('compactAt')
    expect(document.querySelector('nav')).not.toHaveAttribute(
      'inlineCollapsed'
    )
    act(content)
    expect(
      document.querySelector('[data-testid="mode"]')
    ).toHaveTextContent('compact')
    act(props)
    expect(
      document.querySelector('[data-testid="mode"]')
    ).toHaveTextContent('full')
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).not.toHaveAttribute('inert')
  })

  it('keeps props registered while content registrations are cleaned up by older bundles', async () => {
    const release = SidebarMenu.getController(id).setProps(
      { selectedItem: 'payments' },
      { key: 'app' }
    )
    cleanups.push(release)
    // Older content controllers clear their store after the final content cleanup.
    const { createSharedState } =
      await import('../../../shared/helpers/useSharedState')
    createSharedState(id, undefined, {
      scope: 'sidebar-menu-content/v1',
    }).set(undefined)
    render(<SidebarMenu.Data controllerId={id} data={items} />)
    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Payments')
  })

  it('hydrates the shell props before applying retained browser props', async () => {
    cleanups.push(
      SidebarMenu.getController(id).setProps(
        { 'aria-label': 'App' },
        { key: 'app' }
      )
    )
    const element = (
      <SidebarMenu.Data
        controllerId={id}
        data={items}
        aria-label="Shell"
      />
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.appendChild(container)
    expect(container.querySelector('nav')).toHaveAccessibleName('Shell')
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, element, { onRecoverableError })
    })
    expect(container.querySelector('nav')).toHaveAccessibleName('App')
    expect(onRecoverableError).not.toHaveBeenCalled()
    act(() => root.unmount())
    container.remove()
  })

  it('retains props across independently loaded controller modules', async () => {
    vi.resetModules()
    const first = await import('../SidebarMenuController')
    vi.resetModules()
    const second = await import('../SidebarMenuController')
    const release = first
      .getController(id)
      .setProps({ selectedItem: 'home' }, { key: 'app' })
    cleanups.push(release)
    render(<SidebarMenu.Data controllerId={id} data={items} />)
    act(() => {
      cleanups.push(
        second
          .getController(id)
          .setProps({ selectedItem: 'payments' }, { key: 'app' })
      )
      release()
    })
    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Payments')
  })

  it('never applies shell-owned structure and identifiers through JavaScript overrides', () => {
    cleanups.push(
      SidebarMenu.getController(id).setProps(
        {
          children: 'Replaced children',
          controllerId: 'other',
          dangerouslySetInnerHTML: {
            __html: '<span>Replaced content</span>',
          },
          data: [],
          scopeId: 'other',
          styleNonce: 'other',
          selectedItem: 'payments',
        } as never,
        { key: 'app' }
      )
    )
    render(<SidebarMenu.Data controllerId={id} data={items} />)
    expect(
      document.querySelectorAll('.dnb-sidebar-menu__item')
    ).toHaveLength(2)
    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Payments')
    expect(document.querySelector('nav')).not.toHaveAttribute('scopeId')
    expect(document.querySelector('nav')).not.toHaveAttribute('styleNonce')
  })

  it('applies initial-only defaults set before mounting', () => {
    cleanups.push(
      SidebarMenu.getController(id).setProps(
        {
          defaultSelectedItem: 'payments',
          defaultInlineCollapsed: true,
        },
        { key: 'app' }
      )
    )
    render(
      <SidebarMenu.ResponsiveProvider controllerId={id}>
        <SidebarMenu.ResponsiveInline>
          <SidebarMenu.Data controllerId={id} data={items} />
        </SidebarMenu.ResponsiveInline>
      </SidebarMenu.ResponsiveProvider>
    )
    expect(
      document.querySelector('.dnb-sidebar-menu-responsive-inline')
    ).toHaveAttribute('inert')
    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Payments')
  })

  it('switches both menu and responsive subscriptions when the controller id changes', () => {
    setMedia({ width: '75em' })
    cleanups.push(
      SidebarMenu.getController(id).setProps(
        { drawerAt: '90em', selectedItem: 'payments' },
        { key: 'app' }
      )
    )
    const menu = (controllerId: string) => (
      <SidebarMenu.ResponsiveProvider
        controllerId={controllerId}
        drawerAt="50em"
      >
        <ResponsiveMenu />
        <SidebarMenu.Data
          controllerId={controllerId}
          data={items}
          selectedItem="home"
        />
      </SidebarMenu.ResponsiveProvider>
    )
    const { rerender } = render(menu(id))
    expect(
      document.querySelector('[data-testid="mode"]')
    ).toHaveTextContent('drawer')
    rerender(menu(id + '-other'))
    expect(
      document.querySelector('[data-testid="mode"]')
    ).toHaveTextContent('full')
    expect(
      document.querySelector('[aria-current="page"]')
    ).toHaveTextContent('Home')
  })
})
