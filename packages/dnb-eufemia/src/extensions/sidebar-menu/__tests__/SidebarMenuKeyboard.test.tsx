import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SidebarMenu from '../SidebarMenu'

describe('SidebarMenu keyboard navigation', () => {
  beforeEach(() => {
    // jsdom does not calculate layout rectangles.
    vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue([
      { width: 100, height: 44 },
    ] as unknown as DOMRectList)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function getAction(id: string) {
    return document.querySelector<HTMLElement>(
      '[data-sidebar-menu-id="' +
        id +
        '"] > .dnb-sidebar-menu__item__action'
    )
  }

  function press(key: string, options: KeyboardEventInit = {}) {
    return fireEvent.keyDown(document.activeElement, { key, ...options })
  }

  it('moves through visible actions in DOM order without selecting or activating them', () => {
    const onClick = vi.fn()
    const onSelectedItemChange = vi.fn()
    render(
      <SidebarMenu.Root
        defaultOpenItems={['products', 'cards']}
        onSelectedItemChange={onSelectedItemChange}
      >
        <SidebarMenu.Item id="home" text="Home" onClick={onClick} />
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Group
            id="accounts"
            text="Accounts"
            href="/accounts"
          >
            <SidebarMenu.Item
              id="savings"
              text="Savings"
              href="/savings"
            />
          </SidebarMenu.Group>
          <SidebarMenu.Accordion id="cards" text="Cards">
            <SidebarMenu.Item id="debit" text="Debit card" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Accordion>
        <SidebarMenu.Header text="Settings">
          <SidebarMenu.Item id="settings" text="Settings" />
        </SidebarMenu.Header>
      </SidebarMenu.Root>
    )

    const ids = [
      'home',
      'products',
      'accounts',
      'savings',
      'cards',
      'debit',
      'settings',
    ]
    getAction(ids[0]).focus()

    ids.slice(1).forEach((id) => {
      expect(press('ArrowDown')).toBe(false)
      expect(getAction(id)).toHaveFocus()
    })
    ids
      .slice(0, -1)
      .reverse()
      .forEach((id) => {
        expect(press('ArrowUp')).toBe(false)
        expect(getAction(id)).toHaveFocus()
      })

    expect(onClick).not.toHaveBeenCalled()
    expect(onSelectedItemChange).not.toHaveBeenCalled()
    expect(getAction('products')).toHaveAttribute('aria-expanded', 'true')
  })

  it('skips disabled, hidden, inert, noninteractive and collapsed content', () => {
    render(
      <SidebarMenu.Root>
        <SidebarMenu.Item id="home" text="Home" />
        <SidebarMenu.Item id="disabled" text="Disabled" disabled />
        <SidebarMenu.Item
          id="disabled-link"
          text="Disabled link"
          href="/disabled"
          disabled
        />
        <SidebarMenu.Item id="hidden" text="Hidden" hidden />
        <SidebarMenu.Group text="Hidden group" aria-hidden="true">
          <SidebarMenu.Item id="hidden-child" text="Hidden child" />
        </SidebarMenu.Group>
        <SidebarMenu.Group text="Inert group" inert>
          <SidebarMenu.Item id="inert-child" text="Inert child" />
        </SidebarMenu.Group>
        <SidebarMenu.Divider />
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
        <SidebarMenu.Accordion
          id="static"
          text="Static"
          collapsible={false}
        >
          <SidebarMenu.Item id="settings" text="Settings" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )

    getAction('home').focus()
    press('ArrowDown')
    expect(getAction('products')).toHaveFocus()
    press('ArrowDown')
    expect(getAction('settings')).toHaveFocus()
    press('ArrowUp')
    expect(getAction('products')).toHaveFocus()
  })

  it('supports Home and End and stops at the boundaries', () => {
    render(
      <SidebarMenu.Data
        data={[
          { id: 'home', text: 'Home' },
          { id: 'cards', text: 'Cards' },
          { id: 'settings', text: 'Settings' },
        ]}
      />
    )

    getAction('cards').focus()
    press('End')
    expect(getAction('settings')).toHaveFocus()
    press('ArrowDown')
    expect(getAction('settings')).toHaveFocus()
    press('Home')
    expect(getAction('home')).toHaveFocus()
    press('ArrowUp')
    expect(getAction('home')).toHaveFocus()
  })

  it('preserves Tab navigation and native keyboard activation', async () => {
    const onClick = vi.fn()
    render(
      <>
        <SidebarMenu.Root>
          <SidebarMenu.Item id="home" text="Home" onClick={onClick} />
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Root>
        <button type="button" data-after-menu>
          After menu
        </button>
      </>
    )

    await userEvent.tab()
    expect(getAction('home')).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
    await userEvent.tab()
    expect(getAction('cards')).toHaveFocus()
    await userEvent.tab()
    expect(document.querySelector('[data-after-menu]')).toHaveFocus()
    await userEvent.tab({ shift: true })
    expect(getAction('cards')).toHaveFocus()
  })

  it('leaves custom controls and modified keys alone', () => {
    render(
      <SidebarMenu.Root>
        <SidebarMenu.Item id="home" text="Home" />
        <SidebarMenu.Header>
          <input aria-label="Search" />
          <button type="button">Custom action</button>
        </SidebarMenu.Header>
        <SidebarMenu.Item id="settings" text="Settings" />
      </SidebarMenu.Root>
    )

    const input = document.querySelector('input')
    input.focus()
    expect(press('ArrowDown')).toBe(true)
    expect(input).toHaveFocus()
    const custom = document.querySelector<HTMLElement>(
      '.dnb-sidebar-menu__header button'
    )
    custom.focus()
    expect(press('Home')).toBe(true)
    expect(custom).toHaveFocus()
    getAction('home').focus()
    for (const modifier of ['altKey', 'ctrlKey', 'metaKey', 'shiftKey']) {
      expect(press('ArrowDown', { [modifier]: true })).toBe(true)
      expect(getAction('home')).toHaveFocus()
    }
  })

  it('keeps focus within its menu instance', () => {
    render(
      <>
        <SidebarMenu.Data data={[{ id: 'home', text: 'Home' }]} />
        <SidebarMenu.Data data={[{ id: 'cards', text: 'Cards' }]} />
      </>
    )

    getAction('home').focus()
    press('ArrowDown')
    expect(getAction('home')).toHaveFocus()
    getAction('cards').focus()
    press('ArrowUp')
    expect(getAction('cards')).toHaveFocus()
  })

  it('keeps nested menu navigation separate from its parent', () => {
    render(
      <SidebarMenu.Root>
        <SidebarMenu.Item id="home" text="Home" />
        <SidebarMenu.Header>
          <SidebarMenu.Data data={[{ id: 'nested', text: 'Nested' }]} />
        </SidebarMenu.Header>
        <SidebarMenu.Item id="settings" text="Settings" />
      </SidebarMenu.Root>
    )

    getAction('home').focus()
    press('ArrowDown')
    expect(getAction('settings')).toHaveFocus()
    getAction('nested').focus()
    press('End')
    expect(getAction('nested')).toHaveFocus()
    press('ArrowUp')
    expect(getAction('nested')).toHaveFocus()
  })

  it('lets application key handlers prevent the additional navigation', () => {
    const onKeyDown = vi.fn((event) => event.preventDefault())
    const { rerender } = render(
      <SidebarMenu.Root onKeyDown={onKeyDown}>
        <SidebarMenu.Item id="home" text="Home" />
        <SidebarMenu.Item id="cards" text="Cards" />
      </SidebarMenu.Root>
    )

    getAction('home').focus()
    press('ArrowDown')
    expect(onKeyDown).toHaveBeenCalledOnce()
    expect(getAction('home')).toHaveFocus()

    rerender(
      <SidebarMenu.Root>
        <SidebarMenu.Item id="home" text="Home" onKeyDown={onKeyDown} />
        <SidebarMenu.Item id="cards" text="Cards" />
      </SidebarMenu.Root>
    )
    press('ArrowDown')
    expect(onKeyDown).toHaveBeenCalledTimes(2)
    expect(getAction('home')).toHaveFocus()
  })

  it('follows changes to accordion visibility and the active section', () => {
    const { rerender } = render(
      <SidebarMenu.Root openItems={[]}>
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
        <SidebarMenu.Item id="settings" text="Settings" />
      </SidebarMenu.Root>
    )

    getAction('products').focus()
    press('ArrowDown')
    expect(getAction('settings')).toHaveFocus()
    rerender(
      <SidebarMenu.Root openItems={['products']}>
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
        <SidebarMenu.Item id="settings" text="Settings" />
      </SidebarMenu.Root>
    )
    getAction('products').focus()
    press('ArrowDown')
    expect(getAction('cards')).toHaveFocus()

    const sections = [
      {
        id: 'personal',
        text: 'Personal',
        items: [{ id: 'home', text: 'Home' }],
      },
      {
        id: 'business',
        text: 'Business',
        items: [{ id: 'invoices', text: 'Invoices' }],
      },
    ]
    rerender(
      <SidebarMenu.Data sections={sections} activeSection="personal" />
    )
    getAction('home').focus()
    press('End')
    expect(getAction('home')).toHaveFocus()
    rerender(
      <SidebarMenu.Data sections={sections} activeSection="business" />
    )
    getAction('invoices').focus()
    press('Home')
    expect(getAction('invoices')).toHaveFocus()
    expect(getAction('home')).not.toBeInTheDocument()
  })

  it('skips actions hidden by CSS', () => {
    render(
      <SidebarMenu.Root>
        <SidebarMenu.Item id="home" text="Home" />
        <SidebarMenu.Item
          id="display-none"
          text="Not displayed"
          style={{ display: 'none' }}
        />
        <SidebarMenu.Item
          id="invisible"
          text="Invisible"
          style={{ visibility: 'hidden' }}
        />
        <SidebarMenu.Item id="settings" text="Settings" />
      </SidebarMenu.Root>
    )
    Object.defineProperty(getAction('display-none'), 'getClientRects', {
      value: () => [],
    })

    getAction('home').focus()
    press('ArrowDown')
    expect(getAction('settings')).toHaveFocus()
  })

  it('skips closing content when browser find support is disabled', () => {
    const renderMenu = (openItems: string[]) => (
      <SidebarMenu.Root openOnFind={false} openItems={openItems}>
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
        <SidebarMenu.Item id="settings" text="Settings" />
      </SidebarMenu.Root>
    )
    const { rerender } = render(renderMenu(['products']))
    getAction('products').focus()
    press('ArrowDown')
    expect(getAction('cards')).toHaveFocus()

    rerender(renderMenu([]))
    getAction('products').focus()
    press('ArrowDown')
    expect(getAction('settings')).toHaveFocus()
  })

  it('opens with Right, focuses the first enabled child, and closes with Left', async () => {
    render(
      <SidebarMenu.Root>
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="disabled" text="Disabled" disabled />
          <SidebarMenu.Item id="hidden" text="Hidden" hidden />
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )

    getAction('products').focus()
    press('ArrowRight')
    expect(getAction('products')).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(getAction('cards')).toHaveFocus())
    press('ArrowLeft')
    expect(getAction('products')).toHaveAttribute('aria-expanded', 'false')
    expect(getAction('products')).toHaveFocus()
  })

  it('uses Left to close only the closest accordion, including nested groups', async () => {
    render(
      <SidebarMenu.Root defaultOpenItems={['products', 'cards']}>
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Accordion id="cards" text="Cards">
            <SidebarMenu.Group text="Cards group">
              <SidebarMenu.Item id="debit" text="Debit card" />
            </SidebarMenu.Group>
          </SidebarMenu.Accordion>
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )

    getAction('cards').focus()
    press('ArrowRight')
    expect(getAction('debit')).toHaveFocus()
    press('ArrowLeft')
    expect(getAction('cards')).toHaveFocus()
    expect(getAction('cards')).toHaveAttribute('aria-expanded', 'false')
    expect(getAction('products')).toHaveAttribute('aria-expanded', 'true')
    press('ArrowLeft')
    expect(getAction('cards')).toHaveFocus()
    expect(getAction('products')).toHaveAttribute('aria-expanded', 'true')
  })

  it('opens linked accordions with Right without navigating or selecting them', async () => {
    const onClick = vi.fn()
    const onSelectedItemChange = vi.fn()
    const onOpenChange = vi.fn()
    render(
      <SidebarMenu.Root onSelectedItemChange={onSelectedItemChange}>
        <SidebarMenu.Accordion
          id="products"
          text="Products"
          href="/products"
          onClick={onClick}
          onOpenChange={onOpenChange}
        >
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )

    getAction('products').focus()
    press('ArrowRight')
    await waitFor(() => expect(getAction('cards')).toHaveFocus())
    expect(onClick).not.toHaveBeenCalled()
    expect(onSelectedItemChange).not.toHaveBeenCalled()
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('keeps directional keys in custom controls and respects accordion event handlers', () => {
    const onKeyDown = vi.fn((event) => event.preventDefault())
    render(
      <SidebarMenu.Root>
        <SidebarMenu.Accordion id="products" text="Products" defaultOpen>
          <SidebarMenu.Header>
            <input aria-label="Search" />
          </SidebarMenu.Header>
        </SidebarMenu.Accordion>
        <SidebarMenu.Accordion
          id="cards"
          text="Cards"
          onKeyDown={onKeyDown}
        >
          <SidebarMenu.Item id="debit" text="Debit" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )

    const input = document.querySelector('input')
    input.focus()
    expect(press('ArrowLeft')).toBe(true)
    expect(getAction('products')).toHaveAttribute('aria-expanded', 'true')
    getAction('cards').focus()
    press('ArrowRight')
    expect(onKeyDown).toHaveBeenCalledOnce()
    expect(getAction('cards')).toHaveAttribute('aria-expanded', 'false')
  })

  it('supports Menu type-ahead and PageUp/PageDown shortcuts', () => {
    render(
      <SidebarMenu.Data
        data={[
          { id: 'home', text: 'Home' },
          { id: 'hidden', text: 'Cards hidden', disabled: true },
          { id: 'cards', text: 'Cards' },
          { id: 'credit', text: 'Credit cards' },
          { id: 'settings', text: 'Settings' },
        ]}
      />
    )

    getAction('home').focus()
    press('c')
    expect(getAction('cards')).toHaveFocus()
    press('c')
    expect(getAction('credit')).toHaveFocus()
    press('c')
    expect(getAction('cards')).toHaveFocus()
    press('PageDown')
    expect(getAction('settings')).toHaveFocus()
    press('PageUp')
    expect(getAction('home')).toHaveFocus()
  })

  it('does not close a parent menu accordion from a nested menu', () => {
    render(
      <SidebarMenu.Root>
        <SidebarMenu.Accordion id="products" text="Products" defaultOpen>
          <SidebarMenu.Header>
            <SidebarMenu.Data data={[{ id: 'nested', text: 'Nested' }]} />
          </SidebarMenu.Header>
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )
    getAction('nested').focus()
    expect(press('ArrowLeft')).toBe(true)
    expect(getAction('products')).toHaveAttribute('aria-expanded', 'true')
    expect(getAction('nested')).toHaveFocus()
  })

  it('closes the containing accordion from a static nested group', () => {
    render(
      <SidebarMenu.Root>
        <SidebarMenu.Accordion id="products" text="Products" defaultOpen>
          <SidebarMenu.Accordion
            id="static"
            text="Static"
            collapsible={false}
          >
            <SidebarMenu.Item id="cards" text="Cards" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )
    getAction('cards').focus()
    press('ArrowLeft')
    expect(getAction('products')).toHaveAttribute('aria-expanded', 'false')
    expect(getAction('products')).toHaveFocus()
  })

  it('keeps focus on the trigger when a controlled accordion stays closed', async () => {
    const onOpenChange = vi.fn()
    render(
      <SidebarMenu.Root>
        <SidebarMenu.Accordion
          id="products"
          text="Products"
          open={false}
          onOpenChange={onOpenChange}
        >
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Root>
    )
    getAction('products').focus()
    press('ArrowRight')
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(getAction('products')).toHaveAttribute('aria-expanded', 'false')
    expect(getAction('products')).toHaveFocus()
  })
})
