import { act, fireEvent, render } from '@testing-library/react'
import ScrollView from '../../../fragments/scroll-view/ScrollView'
import { axeComponent } from '../../../core/test-utils/testSetup'
import SidebarMenu from '../SidebarMenu'
import { SidebarMenuContainerProperties } from '../SidebarMenuDocs'
import HeightAnimationInstance from '../../../components/height-animation/HeightAnimationInstance'

describe('SidebarMenu', () => {
  it('documents the supported declarative children', () => {
    expect(SidebarMenuContainerProperties.children.doc).toContain(
      'SidebarMenu.Item, SidebarMenu.Accordion, SidebarMenu.Group, SidebarMenu.Section, SidebarMenu.Header, and SidebarMenu.Divider'
    )
  })

  it('exposes only compound components from the placeholder export', () => {
    expect(Object.keys(SidebarMenu).sort()).toEqual(
      [
        'Accordion',
        'Container',
        'Divider',
        'Group',
        'Header',
        'Item',
        'Section',
      ].sort()
    )
  })

  it('supports spacing props on the container', () => {
    render(
      <SidebarMenu.Container top="large" left>
        <SidebarMenu.Item id="overview" text="Overview" />
      </SidebarMenu.Container>
    )

    const navigation = document.querySelector('.dnb-sidebar-menu')

    expect(navigation).toHaveClass('dnb-space__top--large')
    expect(navigation).toHaveClass('dnb-space__left--small')
    expect(SidebarMenu.Container['_supportsSpacingProps']).toBe(true)
  })

  it('renders declarative items and nested accordions', () => {
    render(
      <SidebarMenu.Container aria-label="Main navigation">
        <SidebarMenu.Header>Menu</SidebarMenu.Header>
        <SidebarMenu.Item id="home" text="Home" href="/home" />
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" href="/cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const navigation = document.querySelector('nav')
    const trigger = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )

    expect(navigation).toHaveAttribute('aria-label', 'Main navigation')
    expect(document.querySelector('[href="/home"]')).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(
      trigger.querySelector('.dnb-sidebar-menu__item__icon')
    ).not.toBeInTheDocument()
    expect(document.querySelector('[href="/cards"]')).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-height-animation')
    ).toHaveAttribute('hidden', 'until-found')
    expect(document.getElementById('home')).not.toBeInTheDocument()
    expect(
      document.querySelector('[data-sidebar-menu-id="home"]')
    ).toBeInTheDocument()

    fireEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(document.querySelector('[href="/cards"]')).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-height-animation')
    ).not.toHaveAttribute('hidden')
  })

  it('renders declarative static groups without accordion semantics', () => {
    render(
      <SidebarMenu.Container>
        <SidebarMenu.Group id="actions" text="Actions">
          <SidebarMenu.Item id="button" text="Button" />
          <SidebarMenu.Accordion id="menus" text="Menus">
            <SidebarMenu.Item id="sidebar-menu" text="Sidebar menu" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Group>
      </SidebarMenu.Container>
    )

    const group = document.querySelector(
      '[data-sidebar-menu-group-id="actions"]'
    )
    const title = group.querySelector('.dnb-sidebar-menu__group__title')
    const list = group.querySelector('.dnb-sidebar-menu__group__list')
    const item = document.querySelector('[data-sidebar-menu-id="button"]')

    expect(title).toHaveTextContent('Actions')
    expect(title.querySelector('button, a')).not.toBeInTheDocument()
    expect(list).toHaveAttribute('aria-labelledby', 'actions-title')
    expect(group.querySelector('[aria-expanded]')).toBeInTheDocument()
    expect(title).not.toHaveAttribute('aria-expanded')
    expect(item).toHaveStyle({ '--sidebar-menu-indent': '2rem' })
  })

  it('renders static groups from data', () => {
    render(
      <SidebarMenu.Container
        data={[
          {
            id: 'actions',
            type: 'group',
            text: 'Actions',
            items: [{ id: 'button', text: 'Button' }],
          },
        ]}
      />
    )

    expect(
      document.querySelector('.dnb-sidebar-menu__group__title')
    ).toHaveTextContent('Actions')
    expect(
      document.querySelector('[aria-expanded]')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('[data-sidebar-menu-id="button"]')
    ).toBeInTheDocument()
  })

  it('renders a divider before a data item', () => {
    render(
      <SidebarMenu.Container
        data={[
          {
            id: 'overview',
            text: 'Overview',
            dividerBefore: true,
          },
        ]}
      />
    )

    const list = document.querySelector('.dnb-sidebar-menu__list')

    expect(list.children[0]).toHaveClass('dnb-sidebar-menu__divider-item')
    expect(list.children[1]).toHaveAttribute(
      'data-sidebar-menu-id',
      'overview'
    )
    expect(
      list.children[0].querySelector('[role="separator"]')
    ).toBeInTheDocument()
  })

  it('renders custom data content after its divider', () => {
    render(
      <SidebarMenu.Container
        data={[
          {
            id: 'platform',
            type: 'custom',
            content: <button type="button">Web</button>,
            dividerBefore: true,
          },
          { id: 'overview', text: 'Overview' },
        ]}
      />
    )

    const list = document.querySelector('.dnb-sidebar-menu__list')

    expect(list.children[0]).toHaveClass('dnb-sidebar-menu__divider-item')
    expect(list.children[1]).toHaveClass('dnb-sidebar-menu__custom')
    expect(list.children[1]).toHaveTextContent('Web')
    expect(list.children[2]).toHaveAttribute(
      'data-sidebar-menu-id',
      'overview'
    )
  })

  it('passes presentation props to data accordions', () => {
    render(
      <SidebarMenu.Container
        data={[
          {
            id: 'products',
            text: 'Products',
            className: 'animated-item',
            style: { animationDelay: '50ms' },
            items: [{ id: 'cards', text: 'Cards' }],
          },
        ]}
      />
    )

    const accordion = document.querySelector(
      '[data-sidebar-menu-id="products"]'
    )

    expect(accordion).toHaveClass('animated-item')
    expect(accordion).toHaveStyle({ animationDelay: '50ms' })
  })

  it('supports a linked static group title', () => {
    const onSelectedItemChange = vi.fn()

    render(
      <SidebarMenu.Container
        selectedItem="typography"
        onSelectedItemChange={onSelectedItemChange}
      >
        <SidebarMenu.Group
          id="typography"
          text="Typography"
          href="/typography"
        >
          <SidebarMenu.Item id="font-size" text="Font size" />
        </SidebarMenu.Group>
      </SidebarMenu.Container>
    )

    const link = document.querySelector(
      '.dnb-sidebar-menu__group__link[href="/typography"]'
    )

    expect(link).toHaveAttribute('aria-current', 'page')
    expect(link).not.toHaveAttribute('aria-expanded')
    expect(link).toHaveClass('dnb-sidebar-menu__item__action')
    expect(link.closest('li')).toHaveClass(
      'dnb-sidebar-menu__item--selected'
    )
    expect(
      link.querySelector('.dnb-sidebar-menu__item__selection-icon')
    ).toBeInTheDocument()

    fireEvent.click(link)

    expect(onSelectedItemChange).toHaveBeenCalledWith('typography')
  })

  it('keeps non-linked group titles styled as headings', () => {
    render(
      <SidebarMenu.Container>
        <SidebarMenu.Group id="actions" text="Actions">
          <SidebarMenu.Item id="button" text="Button" />
        </SidebarMenu.Group>
      </SidebarMenu.Container>
    )

    const title = document.querySelector('.dnb-sidebar-menu__group__title')

    expect(title).not.toHaveClass('dnb-sidebar-menu__item__action')
    expect(
      document.querySelector('.dnb-sidebar-menu__group__link')
    ).not.toBeInTheDocument()
  })

  it('opens a collapsed accordion when hidden content is found', () => {
    render(
      <SidebarMenu.Container>
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const content = document.querySelector('.dnb-height-animation')
    const trigger = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )

    fireEvent(content, new Event('beforematch'))

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(content).not.toHaveAttribute('hidden')
  })

  it('opens nested accordions and keeps closing content visible during animation', () => {
    globalThis.IS_TEST = false
    globalThis.bypassTime = -1
    globalThis.animationDuration = -1

    render(
      <SidebarMenu.Container>
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Accordion id="cards" text="Cards">
            <SidebarMenu.Item id="debit-card" text="Debit card" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const triggers = document.querySelectorAll(
      '.dnb-sidebar-menu__accordion__trigger'
    )
    const animations = document.querySelectorAll('.dnb-height-animation')

    fireEvent.click(triggers[0])
    fireEvent.click(triggers[1])

    expect(triggers[0]).toHaveAttribute('aria-expanded', 'true')
    expect(triggers[1]).toHaveAttribute('aria-expanded', 'true')
    expect(animations[1]).not.toHaveAttribute('hidden')

    fireEvent.click(triggers[1])

    expect(triggers[1]).toHaveAttribute('aria-expanded', 'false')
    expect(animations[1]).toHaveClass('dnb-height-animation--animating')
    expect(animations[1]).not.toHaveAttribute('hidden')

    act(() => {
      animations[1].dispatchEvent(new Event('transitionend'))
    })

    expect(animations[1]).toHaveAttribute('hidden', 'until-found')

    globalThis.IS_TEST = undefined
    globalThis.bypassTime = undefined
    globalThis.animationDuration = undefined
  })

  it('can disable hidden until found behavior', () => {
    render(
      <SidebarMenu.Container disableUntilFound>
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(
      document.querySelector('[data-sidebar-menu-id="cards"]')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-height-animation')
    ).not.toBeInTheDocument()
  })

  it('wraps labels between words without splitting characters', () => {
    render(
      <SidebarMenu.Container>
        <SidebarMenu.Item id="payments" text="Incoming payments" />
      </SidebarMenu.Container>
    )

    const text = document.querySelector('.dnb-sidebar-menu__item__text')

    expect(getComputedStyle(text).wordBreak).toBe('normal')
    expect(getComputedStyle(text).overflowWrap).toBe('normal')
  })

  it('renders trailing content before a badge', () => {
    render(
      <SidebarMenu.Container
        data={[
          {
            id: 'updates',
            text: 'Updates',
            suffix: <span data-testid="suffix">Theme</span>,
            badge: 'New',
          },
        ]}
      />
    )

    const action = document.querySelector(
      '.dnb-sidebar-menu__item__action'
    )
    const suffix = action.querySelector('[data-testid="suffix"]')
    const badge = action.querySelector('.dnb-sidebar-menu__badge')

    expect(suffix).toBeInTheDocument()
    expect(badge).toBeInTheDocument()
    expect(
      suffix.compareDocumentPosition(badge) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })

  it('renders an arbitrarily nested menu from data', () => {
    render(
      <SidebarMenu.Container
        data={[
          {
            id: 'products',
            text: 'Products',
            items: [
              {
                id: 'cards',
                text: 'Cards',
                items: [
                  {
                    id: 'debit-card',
                    text: 'Debit card',
                    href: '/cards/debit',
                    active: true,
                  },
                ],
              },
            ],
          },
        ]}
      />
    )

    const activeItem = document.querySelector('[href="/cards/debit"]')

    expect(
      document.querySelectorAll('[aria-expanded="true"]')
    ).toHaveLength(2)
    expect(activeItem).toHaveAttribute('aria-current', 'page')
    expect(
      document.querySelector('[data-sidebar-menu-id="debit-card"]')
    ).toHaveClass('dnb-sidebar-menu__item--selected')
  })

  it('supports controlled open state', () => {
    const onOpenItemsChange = vi.fn()

    const { rerender } = render(
      <SidebarMenu.Container
        openItems={[]}
        onOpenItemsChange={onOpenItemsChange}
      >
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const trigger = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )
    fireEvent.click(trigger)

    expect(onOpenItemsChange).toHaveBeenCalledWith(['products'])
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    rerender(
      <SidebarMenu.Container openItems={['products']}>
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('switches between declarative sections with toggle buttons', () => {
    const onActiveSectionChange = vi.fn()

    render(
      <SidebarMenu.Container
        defaultActiveSection="personal"
        onActiveSectionChange={onActiveSectionChange}
      >
        <SidebarMenu.Section id="personal" text="Personal">
          <SidebarMenu.Item id="overview" text="Overview" />
        </SidebarMenu.Section>
        <SidebarMenu.Section id="business" text="Business">
          <SidebarMenu.Item id="invoices" text="Invoices" />
        </SidebarMenu.Section>
      </SidebarMenu.Container>
    )

    const businessButton = document.querySelector(
      '[data-section-id="business"]'
    )

    expect(document.body).toHaveTextContent('Overview')
    expect(document.body).not.toHaveTextContent('Invoices')

    fireEvent.click(businessButton)

    expect(onActiveSectionChange).toHaveBeenCalledWith('business')
    expect(document.body).not.toHaveTextContent('Overview')
    expect(document.body).toHaveTextContent('Invoices')
  })

  it('renders and switches sections supplied as data', () => {
    render(
      <SidebarMenu.Container
        sections={[
          {
            id: 'personal',
            text: 'Personal',
            active: true,
            items: [{ id: 'home', text: 'Home' }],
          },
          {
            id: 'business',
            text: 'Business',
            items: [{ id: 'payments', text: 'Payments' }],
          },
        ]}
      />
    )

    fireEvent.click(document.querySelector('[data-section-id="business"]'))

    expect(document.body).toHaveTextContent('Payments')
    expect(document.body).not.toHaveTextContent('Home')
  })

  it('activates the section containing the selected route', () => {
    const sections = [
      {
        id: 'personal',
        text: 'Personal',
        items: [{ id: 'home', text: 'Home' }],
      },
      {
        id: 'business',
        text: 'Business',
        items: [{ id: 'payments', text: 'Payments' }],
      },
    ]
    const { rerender } = render(
      <SidebarMenu.Container selectedItem="home" sections={sections} />
    )

    expect(document.body).toHaveTextContent('Home')

    rerender(
      <SidebarMenu.Container selectedItem="payments" sections={sections} />
    )

    expect(document.body).toHaveTextContent('Payments')
    expect(document.body).not.toHaveTextContent('Home')
    expect(
      document.querySelector('[data-section-id="business"]')
    ).toHaveAttribute('aria-pressed', 'true')
  })

  it('selects a clicked item and renders its selection arrow', () => {
    const onSelectedItemChange = vi.fn()

    render(
      <SidebarMenu.Container onSelectedItemChange={onSelectedItemChange}>
        <SidebarMenu.Item id="overview" text="Overview" />
        <SidebarMenu.Item id="payments" text="Payments" icon="card" />
      </SidebarMenu.Container>
    )

    const payments = document.querySelector(
      '[data-sidebar-menu-id="payments"] button'
    )
    fireEvent.click(payments)

    expect(onSelectedItemChange).toHaveBeenCalledWith('payments')
    expect(
      document.querySelector('[data-sidebar-menu-id="payments"]')
    ).toHaveClass('dnb-sidebar-menu__item--selected')
    expect(
      document.querySelector(
        '[data-sidebar-menu-id="payments"] [data-testid="selection-indicator"]'
      )
    ).toBeInTheDocument()
    expect(
      document.querySelector(
        '[data-sidebar-menu-id="payments"] .dnb-sidebar-menu__item__icon'
      )
    ).not.toBeInTheDocument()
    expect(
      document.querySelector(
        '[data-sidebar-menu-id="overview"] [data-testid="selection-indicator"]'
      )
    ).toHaveAttribute('aria-hidden', 'true')
    expect(
      document.querySelector('[data-sidebar-menu-id="overview"]')
    ).not.toHaveClass('dnb-sidebar-menu__item--selected')
  })

  it('supports controlled selected item state', () => {
    const { rerender } = render(
      <SidebarMenu.Container selectedItem="overview">
        <SidebarMenu.Item id="overview" text="Overview" />
        <SidebarMenu.Item id="payments" text="Payments" />
      </SidebarMenu.Container>
    )

    fireEvent.click(
      document.querySelector('[data-sidebar-menu-id="payments"] button')
    )
    expect(
      document.querySelector('[data-sidebar-menu-id="overview"]')
    ).toHaveClass('dnb-sidebar-menu__item--selected')

    rerender(
      <SidebarMenu.Container selectedItem="payments">
        <SidebarMenu.Item id="overview" text="Overview" />
        <SidebarMenu.Item id="payments" text="Payments" />
      </SidebarMenu.Container>
    )

    expect(
      document.querySelector('[data-sidebar-menu-id="payments"]')
    ).toHaveClass('dnb-sidebar-menu__item--selected')
  })

  it('renders badges on the right side of items and accordions', () => {
    render(
      <SidebarMenu.Container>
        <SidebarMenu.Item
          id="inbox"
          text="Inbox"
          badge="New"
          badgeProps={{ status: 'positive' }}
        />
        <SidebarMenu.Accordion
          id="products"
          text="Products"
          badge={3}
          badgeProps={{ label: 'Product groups:' }}
        >
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const itemBadge = document.querySelector(
      '[data-sidebar-menu-id="inbox"] .dnb-sidebar-menu__badge'
    )
    const accordionBadge = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger .dnb-sidebar-menu__badge'
    )

    expect(itemBadge).toHaveTextContent('New')
    expect(itemBadge.querySelector('.dnb-badge')).toHaveClass(
      'dnb-badge--status-positive'
    )
    expect(accordionBadge).toHaveTextContent('3')
    expect(accordionBadge).toHaveTextContent('Product groups:')
  })

  it('navigates and toggles expansion when a page accordion is activated', () => {
    vi.useFakeTimers()
    const onSelectedItemChange = vi.fn()

    render(
      <SidebarMenu.Container onSelectedItemChange={onSelectedItemChange}>
        <SidebarMenu.Accordion
          id="components"
          text="Components"
          href="/components"
          onClick={(event) => event.preventDefault()}
        >
          <SidebarMenu.Item id="buttons" text="Buttons" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const link = document.querySelector('[href="/components"]')
    const toggle = document.querySelector(
      '[aria-label="Expand Components"]'
    )

    expect(link).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle.querySelector('.dnb-icon')).toBeInTheDocument()

    fireEvent.click(link)

    expect(onSelectedItemChange).toHaveBeenCalledWith('components')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(link).toHaveAttribute('aria-current', 'page')

    act(() => vi.advanceTimersByTime(249))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    act(() => vi.advanceTimersByTime(1))
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(
      link.querySelector('.dnb-sidebar-menu__item__selection-icon')
    ).toBeInTheDocument()
    expect(
      link.querySelector(
        '.dnb-sidebar-menu__item__selection-indicator--has-icon'
      )
    ).not.toBeInTheDocument()

    fireEvent.click(link)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-label', 'Expand Components')

    vi.useRealTimers()
  })

  it('persists linked accordion opening before its delayed reveal', () => {
    vi.useFakeTimers()
    const storageKey = 'sidebar-menu-delayed-page'

    const component = render(
      <SidebarMenu.Container openItemsStorageKey={storageKey}>
        <SidebarMenu.Accordion
          id="components"
          text="Components"
          href="/components"
          onClick={(event) => event.preventDefault()}
        >
          <SidebarMenu.Item id="buttons" text="Buttons" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    fireEvent.click(document.querySelector('[href="/components"]'))

    expect(JSON.parse(sessionStorage.getItem(storageKey))).toEqual([
      'components',
    ])

    component.unmount()
    render(
      <SidebarMenu.Container openItemsStorageKey={storageKey}>
        <SidebarMenu.Accordion
          id="components"
          text="Components"
          href="/components"
        >
          <SidebarMenu.Item id="buttons" text="Buttons" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(
      document.querySelector('[aria-label="Collapse Components"]')
    ).toBeInTheDocument()

    vi.useRealTimers()
    sessionStorage.removeItem(storageKey)
  })

  it('keeps an open page accordion open when it is first selected', () => {
    render(
      <SidebarMenu.Container>
        <SidebarMenu.Accordion
          id="components"
          text="Components"
          href="/components"
          defaultOpen
          onClick={(event) => event.preventDefault()}
        >
          <SidebarMenu.Item id="buttons" text="Buttons" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const link = document.querySelector('[href="/components"]')
    const toggle = document.querySelector(
      '[aria-label="Collapse Components"]'
    )

    fireEvent.click(link)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(link)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles a selected page accordion without navigating again', () => {
    const onClick = vi.fn()
    const onSelectedItemChange = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <SidebarMenu.Container
        selectedItem="components"
        onSelectedItemChange={onSelectedItemChange}
      >
        <SidebarMenu.Accordion
          id="components"
          text="Components"
          href="/components"
          defaultOpen
          onClick={onClick}
          onOpenChange={onOpenChange}
        >
          <SidebarMenu.Item id="buttons" text="Buttons" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const link = document.querySelector('[href="/components"]')
    const toggle = document.querySelector(
      '[aria-label="Collapse Components"]'
    )

    expect(fireEvent.click(link)).toBe(false)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(onClick).not.toHaveBeenCalled()
    expect(onSelectedItemChange).not.toHaveBeenCalled()
  })

  it('lets the page accordion toggle expand without selecting it', () => {
    const onSelectedItemChange = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <SidebarMenu.Container onSelectedItemChange={onSelectedItemChange}>
        <SidebarMenu.Accordion
          id="components"
          text="Components"
          href="/components"
          onOpenChange={onOpenChange}
        >
          <SidebarMenu.Item id="buttons" text="Buttons" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const toggle = document.querySelector(
      '[aria-label="Expand Components"]'
    )
    fireEvent.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(onSelectedItemChange).not.toHaveBeenCalled()
    expect(
      document.querySelector('[href="/components"]')
    ).not.toHaveAttribute('aria-current')
  })

  it('disables both actions of a disabled page accordion', () => {
    const onClick = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <SidebarMenu.Container>
        <SidebarMenu.Accordion
          id="components"
          text="Components"
          href="/components"
          disabled
          onClick={onClick}
          onOpenChange={onOpenChange}
        >
          <SidebarMenu.Item id="buttons" text="Buttons" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const link = document.querySelector(
      '.dnb-sidebar-menu__accordion__link'
    )
    const toggle = document.querySelector(
      '.dnb-sidebar-menu__accordion__toggle'
    )

    expect(link).not.toHaveAttribute('href')
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('tabindex', '-1')
    expect(toggle).toBeDisabled()

    fireEvent.click(link)
    fireEvent.click(toggle)

    expect(onClick).not.toHaveBeenCalled()
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('prevents custom link navigation for disabled items', () => {
    function CustomLink(
      props: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        to: string
      }
    ) {
      const { children, ...rest } = props
      return (
        <a href="/fallback" {...rest}>
          {children}
        </a>
      )
    }

    render(
      <SidebarMenu.Container>
        <SidebarMenu.Item
          id="disabled"
          text="Disabled"
          to="/disabled"
          element={CustomLink as React.ElementType}
          disabled
        />
      </SidebarMenu.Container>
    )

    const link = document.querySelector('a')
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })

    link.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  it('supports page accordions in the data API', () => {
    render(
      <SidebarMenu.Container
        data={[
          {
            id: 'components',
            text: 'Components',
            href: '/components',
            items: [{ id: 'buttons', text: 'Buttons' }],
          },
        ]}
      />
    )

    expect(
      document.querySelector('[href="/components"]')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[aria-label="Expand Components"]')
    ).toBeInTheDocument()
  })

  it('renders non-collapsible data groups expanded without a toggle', () => {
    render(
      <SidebarMenu.Container
        data={[
          {
            id: 'base-fields',
            text: 'Base fields',
            href: '/base-fields',
            collapsible: false,
            items: [{ id: 'string', text: 'String' }],
          },
        ]}
      />
    )

    expect(
      document.querySelector('[href="/base-fields"]')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[data-sidebar-menu-id="string"]')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[aria-expanded]')
    ).not.toBeInTheDocument()
  })

  it('marks only the selected page accordion in nested structures', () => {
    render(
      <SidebarMenu.Container
        selectedItem="products"
        defaultOpenItems={['products']}
      >
        <SidebarMenu.Accordion
          id="products"
          text="Products"
          href="/products"
        >
          <SidebarMenu.Accordion
            id="cards"
            text="Cards"
            href="/products/cards"
          >
            <SidebarMenu.Item id="credit-card" text="Credit card" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(
      document.querySelectorAll('.dnb-sidebar-menu__accordion--selected')
    ).toHaveLength(1)
    expect(document.querySelector('[href="/products"]')).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(
      document.querySelector('[href="/products/cards"]')
    ).not.toHaveAttribute('aria-current')
  })

  it('opens the structure containing the selected route', () => {
    const { rerender } = render(
      <SidebarMenu.Container
        selectedItem="overview"
        data={[
          { id: 'overview', text: 'Overview' },
          {
            id: 'products',
            text: 'Products',
            items: [
              {
                id: 'cards',
                text: 'Cards',
                items: [
                  {
                    id: 'credit-card',
                    text: 'Credit card',
                    href: '/cards/credit',
                  },
                ],
              },
            ],
          },
        ]}
      />
    )

    expect(
      document.querySelectorAll('[aria-expanded="true"]')
    ).toHaveLength(0)

    rerender(
      <SidebarMenu.Container
        selectedItem="credit-card"
        data={[
          { id: 'overview', text: 'Overview' },
          {
            id: 'products',
            text: 'Products',
            items: [
              {
                id: 'cards',
                text: 'Cards',
                items: [
                  {
                    id: 'credit-card',
                    text: 'Credit card',
                    href: '/cards/credit',
                  },
                ],
              },
            ],
          },
        ]}
      />
    )

    expect(
      document.querySelectorAll('[aria-expanded="true"]')
    ).toHaveLength(2)
    expect(
      document.querySelector('[href="/cards/credit"]')
    ).toHaveAttribute('aria-current', 'page')
    expect(
      document.querySelector('[data-sidebar-menu-id="credit-card"]')
    ).toHaveClass('dnb-sidebar-menu__item--selected')
  })

  it('allows collapsing an accordion containing the selected route', () => {
    render(
      <SidebarMenu.Container selectedItem="credit-card">
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="credit-card" text="Credit card" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    const trigger = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(
      trigger.querySelector(
        '.dnb-sidebar-menu__accordion__current-indicator'
      )
    ).not.toBeInTheDocument()

    fireEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(
      trigger.querySelector(
        '.dnb-sidebar-menu__accordion__current-indicator'
      )
    ).toHaveAttribute('aria-label', 'Contains current page')
  })

  it('does not adjust open accordion height when data is recreated', async () => {
    vi.useFakeTimers()
    const adjustTo = vi.spyOn(
      HeightAnimationInstance.prototype,
      'adjustTo'
    )
    const createData = () => [
      {
        id: 'products',
        text: 'Products',
        items: [{ id: 'cards', text: 'Cards' }],
      },
    ]
    const { rerender } = render(
      <SidebarMenu.Container selectedItem="cards" data={createData()} />
    )
    act(() => {
      vi.advanceTimersByTime(200)
    })
    adjustTo.mockClear()

    rerender(
      <SidebarMenu.Container selectedItem="cards" data={createData()} />
    )

    expect(adjustTo).not.toHaveBeenCalled()
    adjustTo.mockRestore()
    vi.useRealTimers()
  })

  it('keeps previously opened route structures open while navigating', () => {
    const data = [
      {
        id: 'products',
        text: 'Products',
        items: [
          {
            id: 'cards',
            text: 'Cards',
            items: [{ id: 'credit-card', text: 'Credit card' }],
          },
        ],
      },
      {
        id: 'services',
        text: 'Services',
        items: [
          {
            id: 'financing',
            text: 'Financing',
            items: [{ id: 'loans', text: 'Loans' }],
          },
        ],
      },
    ]
    const { rerender } = render(
      <SidebarMenu.Container selectedItem="credit-card" data={data} />
    )

    rerender(<SidebarMenu.Container selectedItem="loans" data={data} />)

    expect(
      document.querySelectorAll('[aria-expanded="true"]')
    ).toHaveLength(4)
  })

  it('scrolls a selected route into view within a ScrollView', () => {
    vi.useFakeTimers()

    render(
      <ScrollView>
        <SidebarMenu.Container selectedItem="credit-card">
          <SidebarMenu.Accordion id="products" text="Products">
            <SidebarMenu.Item id="credit-card" text="Credit card" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Container>
      </ScrollView>
    )

    const scrollView = document.querySelector(
      '.dnb-scroll-view'
    ) as HTMLElement
    const selectedItem = document.querySelector(
      '[data-sidebar-menu-id="credit-card"] [aria-current="page"]'
    )
    const scrollTo = vi.fn()
    Object.defineProperty(scrollView, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    })
    vi.spyOn(scrollView, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 200,
      height: 200,
    } as DOMRect)
    vi.spyOn(selectedItem, 'getBoundingClientRect').mockReturnValue({
      top: 300,
      bottom: 340,
      height: 40,
    } as DOMRect)

    act(() => vi.runAllTimers())

    expect(scrollTo).toHaveBeenCalledWith({
      top: 220,
      behavior: 'auto',
    })
    expect(scrollView.style.scrollBehavior).toBe('')

    vi.useRealTimers()
  })

  it('does not scroll the selected route when positioning is disabled', () => {
    vi.useFakeTimers()

    render(
      <ScrollView>
        <SidebarMenu.Container
          selectedItem="credit-card"
          scrollSelectedItemIntoView={false}
        >
          <SidebarMenu.Item id="credit-card" text="Credit card" />
        </SidebarMenu.Container>
      </ScrollView>
    )

    const scrollView = document.querySelector(
      '.dnb-scroll-view'
    ) as HTMLElement
    const scrollTo = vi.fn()
    Object.defineProperty(scrollView, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    })
    vi.spyOn(scrollView, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 200,
      height: 200,
    } as DOMRect)
    vi.spyOn(
      document.querySelector(
        '[data-sidebar-menu-id="credit-card"] [aria-current="page"]'
      ),
      'getBoundingClientRect'
    ).mockReturnValue({ top: 300, bottom: 340, height: 40 } as DOMRect)

    act(() => vi.runAllTimers())

    expect(scrollTo).not.toHaveBeenCalled()

    vi.useRealTimers()
  })

  it('scrolls an off-screen selected route after navigation', () => {
    vi.useFakeTimers()

    const { rerender } = render(
      <ScrollView>
        <SidebarMenu.Container selectedItem="overview">
          <SidebarMenu.Item id="overview" text="Overview" />
          <SidebarMenu.Item id="payments" text="Payments" />
        </SidebarMenu.Container>
      </ScrollView>
    )

    const scrollView = document.querySelector(
      '.dnb-scroll-view'
    ) as HTMLElement
    const scrollTo = vi.fn()
    Object.defineProperty(scrollView, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    })
    vi.spyOn(scrollView, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 200,
      height: 200,
    } as DOMRect)
    vi.spyOn(
      document.querySelector(
        '[data-sidebar-menu-id="overview"] [aria-current="page"]'
      ),
      'getBoundingClientRect'
    ).mockReturnValue({ top: 300, bottom: 340, height: 40 } as DOMRect)

    act(() => vi.runAllTimers())
    expect(scrollTo).toHaveBeenCalledTimes(1)

    scrollTo.mockClear()
    rerender(
      <ScrollView>
        <SidebarMenu.Container selectedItem="payments">
          <SidebarMenu.Item id="overview" text="Overview" />
          <SidebarMenu.Item id="payments" text="Payments" />
        </SidebarMenu.Container>
      </ScrollView>
    )
    vi.spyOn(
      document.querySelector(
        '[data-sidebar-menu-id="payments"] [aria-current="page"]'
      ),
      'getBoundingClientRect'
    ).mockReturnValue({ top: 300, bottom: 340, height: 40 } as DOMRect)

    act(() => vi.runAllTimers())
    expect(scrollTo).toHaveBeenCalledWith({
      top: 220,
      behavior: 'smooth',
    })

    vi.useRealTimers()
  })

  it('waits for a selected route accordion to open before scrolling', async () => {
    vi.useFakeTimers()
    globalThis.IS_TEST = false
    globalThis.bypassTime = -1
    globalThis.animationDuration = -1

    const { rerender } = render(
      <ScrollView>
        <SidebarMenu.Container selectedItem="overview">
          <SidebarMenu.Item id="overview" text="Overview" />
          <SidebarMenu.Accordion id="components" text="Components">
            <SidebarMenu.Item id="accordion" text="Accordion" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Container>
      </ScrollView>
    )

    const scrollView = document.querySelector(
      '.dnb-scroll-view'
    ) as HTMLElement
    const scrollTo = vi.fn()
    Object.defineProperty(scrollView, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    })
    vi.spyOn(scrollView, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 200,
      height: 200,
    } as DOMRect)

    act(() => vi.runAllTimers())
    scrollTo.mockClear()

    rerender(
      <ScrollView>
        <SidebarMenu.Container selectedItem="accordion">
          <SidebarMenu.Item id="overview" text="Overview" />
          <SidebarMenu.Accordion id="components" text="Components">
            <SidebarMenu.Item id="accordion" text="Accordion" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Container>
      </ScrollView>
    )

    const selectedItem = document.querySelector(
      '[data-sidebar-menu-id="accordion"] [aria-current="page"]'
    )
    const animation = selectedItem.closest('.dnb-height-animation')
    vi.spyOn(selectedItem, 'getBoundingClientRect').mockReturnValue({
      top: 300,
      bottom: 340,
      height: 40,
    } as DOMRect)

    act(() => vi.runAllTimers())

    expect(animation).toHaveClass('dnb-height-animation--animating')
    expect(scrollTo).not.toHaveBeenCalled()

    act(() => {
      animation.dispatchEvent(new Event('transitionend'))
    })
    animation.classList.add('dnb-height-animation--animating')
    expect(scrollTo).not.toHaveBeenCalled()

    await act(async () => {
      animation.classList.remove('dnb-height-animation--animating')
      await Promise.resolve()
    })
    act(() => {
      vi.runAllTimers()
    })

    expect(scrollTo).toHaveBeenCalledWith({
      top: 220,
      behavior: 'smooth',
    })

    globalThis.IS_TEST = undefined
    globalThis.bypassTime = undefined
    globalThis.animationDuration = undefined
    vi.useRealTimers()
  })

  it('positions the initially selected route without a delay', () => {
    vi.useFakeTimers()

    render(
      <ScrollView>
        <SidebarMenu.Container selectedItem="payments">
          <SidebarMenu.Item id="payments" text="Payments" />
        </SidebarMenu.Container>
      </ScrollView>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
    const selectedItem = document.querySelector(
      '[data-sidebar-menu-id="payments"] [aria-current="page"]'
    )
    const scrollTo = vi.fn()
    Object.defineProperty(scrollView, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    })
    vi.spyOn(scrollView, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 200,
      height: 200,
    } as DOMRect)
    vi.spyOn(selectedItem, 'getBoundingClientRect').mockReturnValue({
      top: 300,
      bottom: 340,
      height: 40,
    } as DOMRect)

    act(() => vi.advanceTimersToNextTimer())

    expect(scrollTo).toHaveBeenCalled()

    vi.useRealTimers()
  })

  it('scrolls an off-screen selected route within the browser window', () => {
    vi.useFakeTimers()

    render(
      <SidebarMenu.Container selectedItem="payments">
        <SidebarMenu.Item id="payments" text="Payments" />
      </SidebarMenu.Container>
    )

    const selectedItem = document.querySelector(
      '[data-sidebar-menu-id="payments"] [aria-current="page"]'
    )
    const scrollIntoView = vi.fn()
    Object.defineProperty(selectedItem, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    })
    vi.spyOn(selectedItem, 'getBoundingClientRect').mockReturnValue({
      top: 1200,
      bottom: 1240,
      height: 40,
    } as DOMRect)

    act(() => vi.runAllTimers())

    expect(scrollIntoView).toHaveBeenCalledWith({
      block: 'center',
      inline: 'nearest',
      behavior: 'auto',
    })

    vi.useRealTimers()
  })

  it('does not scroll a selected route already visible in the window', () => {
    vi.useFakeTimers()

    render(
      <SidebarMenu.Container selectedItem="payments">
        <SidebarMenu.Item id="payments" text="Payments" />
      </SidebarMenu.Container>
    )

    const selectedItem = document.querySelector(
      '[data-sidebar-menu-id="payments"] [aria-current="page"]'
    )
    const scrollIntoView = vi.fn()
    Object.defineProperty(selectedItem, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    })
    vi.spyOn(selectedItem, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 140,
      height: 40,
    } as DOMRect)

    act(() => vi.runAllTimers())

    expect(scrollIntoView).not.toHaveBeenCalled()

    vi.useRealTimers()
  })

  it('persists and restores its ScrollView position', () => {
    const storageKey = 'sidebar-menu-scroll-position'
    sessionStorage.setItem(storageKey, '120')

    const component = render(
      <ScrollView>
        <SidebarMenu.Container
          selectedItem="payments"
          scrollPositionStorageKey={storageKey}
        >
          <SidebarMenu.Item id="payments" text="Payments" />
        </SidebarMenu.Container>
      </ScrollView>
    )

    const scrollView = document.querySelector(
      '.dnb-scroll-view'
    ) as HTMLElement
    expect(scrollView.scrollTop).toBe(120)

    scrollView.scrollTop = 240
    fireEvent.scroll(scrollView)
    expect(sessionStorage.getItem(storageKey)).toBe('240')

    component.unmount()
    sessionStorage.removeItem(storageKey)
  })

  it('does not center the selected item over a restored position', () => {
    vi.useFakeTimers()
    const storageKey = 'sidebar-menu-restored-scroll-position'
    sessionStorage.setItem(storageKey, '120')

    render(
      <ScrollView>
        <SidebarMenu.Container
          selectedItem="payments"
          scrollPositionStorageKey={storageKey}
        >
          <SidebarMenu.Item id="payments" text="Payments" />
        </SidebarMenu.Container>
      </ScrollView>
    )

    const scrollView = document.querySelector(
      '.dnb-scroll-view'
    ) as HTMLElement
    const scrollTo = vi.fn(() => {
      expect(scrollView.style.scrollBehavior).toBe('auto')
    })
    Object.defineProperty(scrollView, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    })
    vi.spyOn(scrollView, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 200,
      height: 200,
    } as DOMRect)
    vi.spyOn(
      document.querySelector(
        '[data-sidebar-menu-id="payments"] [aria-current="page"]'
      ),
      'getBoundingClientRect'
    ).mockReturnValue({ top: 80, bottom: 120, height: 40 } as DOMRect)

    act(() => vi.runAllTimers())

    expect(scrollView.scrollTop).toBe(120)
    expect(scrollTo).not.toHaveBeenCalled()

    vi.useRealTimers()
    sessionStorage.removeItem(storageKey)
  })

  it('scrolls to an initially selected item outside the restored view', () => {
    vi.useFakeTimers()
    const storageKey = 'sidebar-menu-restored-off-screen-position'
    sessionStorage.setItem(storageKey, '120')

    render(
      <ScrollView>
        <SidebarMenu.Container
          selectedItem="payments"
          scrollPositionStorageKey={storageKey}
        >
          <SidebarMenu.Item id="payments" text="Payments" />
        </SidebarMenu.Container>
      </ScrollView>
    )

    const scrollView = document.querySelector(
      '.dnb-scroll-view'
    ) as HTMLElement
    const selectedItem = document.querySelector(
      '[data-sidebar-menu-id="payments"] [aria-current="page"]'
    )
    const scrollTo = vi.fn()
    Object.defineProperty(scrollView, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    })
    vi.spyOn(scrollView, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 200,
      height: 200,
    } as DOMRect)
    vi.spyOn(selectedItem, 'getBoundingClientRect').mockReturnValue({
      top: 300,
      bottom: 340,
      height: 40,
    } as DOMRect)

    act(() => vi.runAllTimers())

    expect(scrollTo).toHaveBeenCalledWith({
      top: 340,
      behavior: 'auto',
    })
    expect(scrollView.style.scrollBehavior).toBe('')

    vi.useRealTimers()
    sessionStorage.removeItem(storageKey)
  })

  it('restores open items from session storage across navigation remounts', () => {
    const storageKey = 'sidebar-menu-test'
    sessionStorage.removeItem(storageKey)

    const component = render(
      <SidebarMenu.Container openItemsStorageKey={storageKey}>
        <SidebarMenu.Accordion id="personal-products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    fireEvent.click(
      document.querySelector('[aria-label="Expand Products"]') ??
        document.querySelector('.dnb-sidebar-menu__accordion__trigger')
    )

    expect(JSON.parse(sessionStorage.getItem(storageKey))).toEqual([
      'personal-products',
    ])

    component.unmount()
    render(
      <SidebarMenu.Container openItemsStorageKey={storageKey}>
        <SidebarMenu.Accordion id="personal-products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(
      document.querySelector('.dnb-sidebar-menu__accordion__trigger')
    ).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(
      document.querySelector('.dnb-sidebar-menu__accordion__trigger')
    )
    expect(JSON.parse(sessionStorage.getItem(storageKey))).toEqual([])

    sessionStorage.removeItem(storageKey)
  })

  it('restores a collapsed selected ancestor across remounts', () => {
    const storageKey = 'sidebar-menu-collapsed-selection'
    sessionStorage.removeItem(storageKey)

    const renderMenu = () =>
      render(
        <SidebarMenu.Container
          selectedItem="credit-card"
          openItemsStorageKey={storageKey}
        >
          <SidebarMenu.Accordion id="products" text="Products">
            <SidebarMenu.Item id="credit-card" text="Credit card" />
          </SidebarMenu.Accordion>
        </SidebarMenu.Container>
      )

    const component = renderMenu()
    const trigger = document.querySelector(
      '.dnb-sidebar-menu__accordion__trigger'
    )

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(JSON.parse(sessionStorage.getItem(storageKey))).toEqual({
      openItems: [],
      closedItems: ['products'],
      selectedItem: 'credit-card',
    })

    component.unmount()
    renderMenu()

    expect(
      document.querySelector('.dnb-sidebar-menu__accordion__trigger')
    ).toHaveAttribute('aria-expanded', 'false')

    sessionStorage.removeItem(storageKey)
  })

  it('preserves a stored closed state over default open items', () => {
    const storageKey = 'sidebar-menu-closed-default'
    sessionStorage.setItem(storageKey, JSON.stringify([]))

    render(
      <SidebarMenu.Container
        openItemsStorageKey={storageKey}
        defaultOpenItems={['products']}
      >
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(
      document.querySelector('[data-sidebar-menu-id="products"] button')
    ).toHaveAttribute('aria-expanded', 'false')

    sessionStorage.removeItem(storageKey)
  })

  it('does not animate from defaults to stored state on mount', () => {
    const storageKey = 'sidebar-menu-stored-initial-state'
    sessionStorage.setItem(storageKey, JSON.stringify([]))
    const close = vi.spyOn(HeightAnimationInstance.prototype, 'close')

    render(
      <SidebarMenu.Container
        openItemsStorageKey={storageKey}
        defaultOpenItems={['products']}
      >
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(
      document.querySelector('[data-sidebar-menu-id="products"] button')
    ).toHaveAttribute('aria-expanded', 'false')
    expect(close).not.toHaveBeenCalled()

    close.mockRestore()
    sessionStorage.removeItem(storageKey)
  })

  it('loads open state when the storage key changes', () => {
    sessionStorage.setItem('menu-a', JSON.stringify(['products']))
    sessionStorage.setItem('menu-b', JSON.stringify([]))

    const { rerender } = render(
      <SidebarMenu.Container openItemsStorageKey="menu-a">
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(
      document.querySelector('[data-sidebar-menu-id="products"] button')
    ).toHaveAttribute('aria-expanded', 'true')

    rerender(
      <SidebarMenu.Container openItemsStorageKey="menu-b">
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(
      document.querySelector('[data-sidebar-menu-id="products"] button')
    ).toHaveAttribute('aria-expanded', 'false')
    expect(JSON.parse(sessionStorage.getItem('menu-b'))).toEqual([])

    sessionStorage.removeItem('menu-a')
    sessionStorage.removeItem('menu-b')
  })

  it('can persist open items in local storage', () => {
    const storageKey = 'sidebar-menu-local-test'
    localStorage.removeItem(storageKey)

    render(
      <SidebarMenu.Container
        openItemsStorageKey={storageKey}
        openItemsStorage="local"
        defaultOpenItems={['business-services']}
      >
        <SidebarMenu.Accordion id="business-services" text="Services">
          <SidebarMenu.Item id="payments" text="Payments" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(JSON.parse(localStorage.getItem(storageKey))).toEqual([
      'business-services',
    ])

    localStorage.removeItem(storageKey)
  })

  it('falls back to default open items for malformed stored state', () => {
    const storageKey = 'sidebar-menu-malformed-test'
    sessionStorage.setItem(storageKey, '{invalid')

    render(
      <SidebarMenu.Container
        openItemsStorageKey={storageKey}
        defaultOpenItems={['products']}
      >
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(
      document.querySelector('.dnb-sidebar-menu__accordion__trigger')
    ).toHaveAttribute('aria-expanded', 'true')
    expect(JSON.parse(sessionStorage.getItem(storageKey))).toEqual([
      'products',
    ])

    sessionStorage.removeItem(storageKey)
  })

  it('does not persist controlled open state', () => {
    const storageKey = 'sidebar-menu-controlled-test'
    sessionStorage.removeItem(storageKey)

    render(
      <SidebarMenu.Container
        openItems={['products']}
        openItemsStorageKey={storageKey}
      >
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
      </SidebarMenu.Container>
    )

    expect(sessionStorage.getItem(storageKey)).toBeNull()
  })

  it('has no automated accessibility violations', async () => {
    const component = render(
      <SidebarMenu.Container aria-label="Main navigation">
        <SidebarMenu.Item id="overview" text="Overview" />
        <SidebarMenu.Accordion id="products" text="Products">
          <SidebarMenu.Item id="cards" text="Cards" />
        </SidebarMenu.Accordion>
        <SidebarMenu.Divider />
        <SidebarMenu.Item id="disabled" text="Disabled" disabled />
      </SidebarMenu.Container>
    )

    expect(await axeComponent(component)).toHaveNoViolations()
  })
})
