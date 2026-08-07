import { act, fireEvent, render } from '@testing-library/react'
import ScrollView from '../../../fragments/scroll-view/ScrollView'
import { axeComponent } from '../../../core/test-utils/testSetup'
import SidebarMenu from '../SidebarMenu'
import HeightAnimationInstance from '../../height-animation/HeightAnimationInstance'

describe('SidebarMenu', () => {
  it('exposes only compound components from the placeholder export', () => {
    expect(Object.keys(SidebarMenu).sort()).toEqual(
      [
        'Accordion',
        'Container',
        'Divider',
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
    ).toBeInTheDocument()
    expect(
      trigger.querySelector('.dnb-sidebar-menu__item__icon svg')
    ).toBeInTheDocument()
    expect(
      document.querySelector('[href="/cards"]')
    ).not.toBeInTheDocument()

    fireEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(document.querySelector('[href="/cards"]')).toBeInTheDocument()
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
    expect(document.querySelector('#debit-card')).toHaveClass(
      'dnb-sidebar-menu__item--selected'
    )
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

    const payments = document.querySelector('#payments button')
    fireEvent.click(payments)

    expect(onSelectedItemChange).toHaveBeenCalledWith('payments')
    expect(document.querySelector('#payments')).toHaveClass(
      'dnb-sidebar-menu__item--selected'
    )
    expect(
      document.querySelector(
        '#payments [data-testid="selection-indicator"]'
      )
    ).toBeInTheDocument()
    expect(
      document.querySelector('#payments .dnb-sidebar-menu__item__icon')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector(
        '#overview [data-testid="selection-indicator"]'
      )
    ).toHaveAttribute('aria-hidden', 'true')
    expect(document.querySelector('#overview')).not.toHaveClass(
      'dnb-sidebar-menu__item--selected'
    )
  })

  it('supports controlled selected item state', () => {
    const { rerender } = render(
      <SidebarMenu.Container selectedItem="overview">
        <SidebarMenu.Item id="overview" text="Overview" />
        <SidebarMenu.Item id="payments" text="Payments" />
      </SidebarMenu.Container>
    )

    fireEvent.click(document.querySelector('#payments button'))
    expect(document.querySelector('#overview')).toHaveClass(
      'dnb-sidebar-menu__item--selected'
    )

    rerender(
      <SidebarMenu.Container selectedItem="payments">
        <SidebarMenu.Item id="overview" text="Overview" />
        <SidebarMenu.Item id="payments" text="Payments" />
      </SidebarMenu.Container>
    )

    expect(document.querySelector('#payments')).toHaveClass(
      'dnb-sidebar-menu__item--selected'
    )
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
      '#inbox .dnb-sidebar-menu__badge'
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

    act(() => vi.advanceTimersByTime(499))
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
    ).toBeInTheDocument()

    fireEvent.click(link)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-label', 'Expand Components')

    vi.useRealTimers()
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
    expect(document.querySelector('#credit-card')).toHaveClass(
      'dnb-sidebar-menu__item--selected'
    )
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

    const scrollView = document.querySelector('.dnb-scroll-view')
    const selectedItem = document.querySelector(
      '#credit-card [aria-current="page"]'
    )
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

  it('only scrolls the selected route on the initial render', () => {
    vi.useFakeTimers()

    const { rerender } = render(
      <ScrollView>
        <SidebarMenu.Container selectedItem="overview">
          <SidebarMenu.Item id="overview" text="Overview" />
          <SidebarMenu.Item id="payments" text="Payments" />
        </SidebarMenu.Container>
      </ScrollView>
    )

    const scrollView = document.querySelector('.dnb-scroll-view')
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
      document.querySelector('#overview [aria-current="page"]'),
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

    act(() => vi.runAllTimers())
    expect(scrollTo).not.toHaveBeenCalled()

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
      '#payments [aria-current="page"]'
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
      '#payments [aria-current="page"]'
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
      '#payments [aria-current="page"]'
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
      document.querySelector('#payments [aria-current="page"]'),
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
      '#payments [aria-current="page"]'
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
