import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Container from '../Container'
import type { ItemBasicProps } from '../ItemBasic'
import ItemBasic from '../ItemBasic'
import ItemTitle from '../ItemTitle'
import ItemEnd from '../ItemEnd'
import { fish_medium } from '../../../icons'
import type { ComponentMarkers } from '../../../shared/helpers/withComponentMarkers'

describe('ItemBasic', () => {
  it('renders with props as an object', () => {
    const props: ItemBasicProps = {}

    render(<ItemBasic {...props}>Content</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element).toBeInTheDocument()
    expect(element.classList).toContain('dnb-list__item')
  })

  it('renders as li element for list semantics', () => {
    render(<ItemBasic>Content</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.tagName).toBe('LI')
  })

  it('renders as a custom element while keeping icon, title and cells', () => {
    render(
      <ItemBasic element="div" icon={fish_medium} title="Title">
        <span data-testid="cell">Cell</span>
      </ItemBasic>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.tagName).toBe('DIV')
    expect(
      element.querySelector('.dnb-list__item__icon')
    ).toBeInTheDocument()
    expect(
      element.querySelector('.dnb-list__item__title').textContent
    ).toContain('Title')
    expect(
      element.querySelector('[data-testid="cell"]')
    ).toBeInTheDocument()
  })

  it('renders the auto-rendered icon and title as spans when element is span', () => {
    render(<ItemBasic element="span" icon={fish_medium} title="Title" />)

    const element = document.querySelector('.dnb-list__item')

    expect(element.tagName).toBe('SPAN')
    // The auto-rendered icon and title must stay phrasing content inside a
    // span row – a <div> here would be invalid nesting.
    expect(element.querySelectorAll('div')).toHaveLength(0)
    expect(element.querySelector('.dnb-list__item__icon').tagName).toBe(
      'SPAN'
    )
    expect(element.querySelector('.dnb-list__item__title').tagName).toBe(
      'SPAN'
    )
  })

  it('renders item content', () => {
    const text = 'List item content'

    render(<ItemBasic>{text}</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.textContent).toContain(text)
  })

  it.each(['Normal row', 0])(
    'keeps plain content %s without an implicit title',
    (children) => {
      render(<ItemBasic>{children}</ItemBasic>)

      const item = document.querySelector('.dnb-list__item')

      expect(item.textContent).toBe(String(children))
      expect(item.querySelector('.dnb-list__item__title')).toBeNull()
    }
  )

  it('keeps interpolated text without an implicit title', () => {
    render(<ItemBasic>Account {123}</ItemBasic>)

    const item = document.querySelector('.dnb-list__item')

    expect(item.textContent).toBe('Account 123')
    expect(item.querySelector('.dnb-list__item__title')).toBeNull()
  })

  it('keeps plain text inside a span row valid with the css layout engine', () => {
    render(
      <ItemBasic element="span" layoutEngine="css">
        Accounts
      </ItemBasic>
    )

    const item = document.querySelector('.dnb-list__item')

    expect(item.textContent).toBe('Accounts')
    expect(item.querySelector('.dnb-list__item__title')).toBeNull()
    expect(item.querySelectorAll('div')).toHaveLength(0)
  })

  it('leaves explicit cells unchanged', () => {
    render(
      <ItemBasic>
        <ItemTitle>Account</ItemTitle>
        <ItemEnd>123</ItemEnd>
      </ItemBasic>
    )

    expect(
      document.querySelectorAll('.dnb-list__item__title')
    ).toHaveLength(1)
    expect(
      document.querySelector('.dnb-list__item__title .dnb-list__item__end')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-list__item > .dnb-list__item__end')
    ).toBeInTheDocument()
  })

  describe('layout engine', () => {
    const renderRow = (props: ItemBasicProps = {}) => {
      render(
        <ItemBasic title="Title" {...props}>
          <ItemEnd>End</ItemEnd>
        </ItemBasic>
      )
      return document.querySelector('.dnb-list__item')
    }

    it('uses the css layout engine without gaps by default', () => {
      const row = renderRow()

      expect(Array.from(row.classList)).toEqual([
        'dnb-space',
        'dnb-flex-container',
        'dnb-flex-container--css-gap',
        'dnb-flex-container--direction-horizontal',
        'dnb-flex-container--justify-space-between',
        'dnb-flex-container--align-flex-start',
        'dnb-flex-container--divider-space',
        'dnb-list__item',
        'dnb-t__size--basis',
      ])
    })

    // The css engine would turn these props into CSS gaps on the row grid,
    // where every empty grid column adds space. The legacy engine only
    // adds space between the cells, like before.
    it('uses the legacy layout engine when gap is set', () => {
      const row = renderRow({ gap: 'large' })

      expect(Array.from(row.classList)).toEqual([
        'dnb-space',
        'dnb-flex-container',
        'dnb-flex-container--direction-horizontal',
        'dnb-flex-container--justify-space-between',
        'dnb-flex-container--align-flex-start',
        'dnb-flex-container--spacing-large',
        'dnb-flex-container--row-gap-small',
        'dnb-flex-container--divider-space',
        'dnb-list__item',
        'dnb-t__size--basis',
      ])
      expect(
        row.querySelector('.dnb-list__item__title').classList
      ).toContain('dnb-space__right--large')
    })

    it('uses the legacy layout engine when rowGap is set', () => {
      const row = renderRow({ rowGap: 'large' })

      expect(Array.from(row.classList)).toEqual([
        'dnb-space',
        'dnb-flex-container',
        'dnb-flex-container--direction-horizontal',
        'dnb-flex-container--justify-space-between',
        'dnb-flex-container--align-flex-start',
        'dnb-flex-container--row-gap-large',
        'dnb-flex-container--divider-space',
        'dnb-list__item',
        'dnb-t__size--basis',
      ])
    })

    // A wrapper that forwards its own props passes `gap={undefined}`. That
    // replaces the `gap={false}` of the row, so Flex uses its default small
    // gap. The expected classes are the ones v11.15.2 rendered.
    it('uses the legacy layout engine when gap is forwarded as undefined', () => {
      const row = renderRow({ gap: undefined })

      expect(Array.from(row.classList)).toEqual([
        'dnb-space',
        'dnb-flex-container',
        'dnb-flex-container--direction-horizontal',
        'dnb-flex-container--justify-space-between',
        'dnb-flex-container--align-flex-start',
        'dnb-flex-container--spacing-small',
        'dnb-flex-container--row-gap-small',
        'dnb-flex-container--divider-space',
        'dnb-list__item',
        'dnb-t__size--basis',
      ])
    })

    it('uses the legacy layout engine when rowGap is forwarded as undefined', () => {
      const row = renderRow({ rowGap: undefined })

      expect(Array.from(row.classList)).toEqual([
        'dnb-space',
        'dnb-flex-container',
        'dnb-flex-container--direction-horizontal',
        'dnb-flex-container--justify-space-between',
        'dnb-flex-container--align-flex-start',
        'dnb-flex-container--row-gap-small',
        'dnb-flex-container--divider-space',
        'dnb-list__item',
        'dnb-t__size--basis',
      ])
    })

    it('uses the legacy layout engine when divider is set', () => {
      const row = renderRow({ divider: 'line' })

      expect(row.classList).not.toContain('dnb-flex-container--css-gap')
      expect(row.querySelectorAll(':scope > hr')).toHaveLength(1)
    })

    it.each([
      ['gap', { gap: false }],
      ['rowGap', { rowGap: false }],
      ['divider', { divider: 'space' }],
    ] as const)(
      'keeps the css layout engine when %s adds no space',
      (_, props) => {
        const row = renderRow(props)

        expect(row.classList).toContain('dnb-flex-container--css-gap')
        expect(row.className).not.toContain('row-gap')
        expect(row.className).not.toContain('--spacing-')
      }
    )

    it('lets an explicit layoutEngine win over gap', () => {
      const row = renderRow({ gap: 'large', layoutEngine: 'css' })

      expect(row.classList).toContain('dnb-flex-container--css-gap')
      expect(row.classList).toContain('dnb-flex-container--spacing-large')
    })
  })

  it.each([undefined, null, false, true, ''])(
    'does not create a title for empty content %s',
    (children) => {
      render(<ItemBasic>{children}</ItemBasic>)

      expect(
        document.querySelector('.dnb-list__item__title')
      ).not.toBeInTheDocument()
    }
  )

  it('renders icon when icon prop is provided', () => {
    render(<ItemBasic icon={fish_medium}>Content</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')
    const iconWrapper = element.querySelector('.dnb-list__item__icon')

    expect(iconWrapper).toBeInTheDocument()
    expect(element.querySelector('.dnb-icon')).toBeInTheDocument()
  })

  it('renders title when title prop is provided', () => {
    render(<ItemBasic title="Item title">Content</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')
    const titleWrapper = element.querySelector('.dnb-list__item__title')

    expect(titleWrapper).toBeInTheDocument()
    expect(titleWrapper.textContent).toContain('Item title')
  })

  it('renders icon, title and children in order', () => {
    render(
      <ItemBasic icon={fish_medium} title="Title">
        <span data-testid="cell">Cell</span>
      </ItemBasic>
    )

    const element = document.querySelector('.dnb-list__item')
    const icon = element.querySelector('.dnb-list__item__icon')
    const title = element.querySelector('.dnb-list__item__title')
    const cell = element.querySelector('[data-testid="cell"]')

    expect(icon).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(cell).toBeInTheDocument()
    expect(cell.textContent).toBe('Cell')
  })

  it('inherits the variant modifier from the parent list', () => {
    render(
      <Container variant="basic">
        <ItemBasic>Inherited</ItemBasic>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list--variant-basic')
  })

  it('applies variant prop directly without a Container', () => {
    render(<ItemBasic variant="basic">Direct variant</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list--variant-basic')
  })

  it('does not apply variant class when no variant and no Container', () => {
    render(<ItemBasic>No variant</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.className).not.toContain('dnb-list--variant')
  })

  it('forwards variant prop to ItemContent when inside a Container', () => {
    render(
      <Container variant="basic">
        <ItemBasic variant="basic">With prop and context</ItemBasic>
      </Container>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list--variant-basic')
  })

  it('applies selected modifier class when selected', () => {
    render(<ItemBasic selected>Selected item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item--selected')
    expect(element.classList).toContain('dnb-list__item--selection')
  })

  it('applies selection modifier class when selected is false', () => {
    render(<ItemBasic selected={false}>Selectable item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).not.toContain('dnb-list__item--selected')
    expect(element.classList).toContain('dnb-list__item--selection')
  })

  it('merges custom className', () => {
    render(
      <ItemBasic className="custom-class">
        <span>Child</span>
      </ItemBasic>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item')
    expect(element.classList).toContain('custom-class')
  })

  it('declares _supportsSpacingProps for flex layout', () => {
    expect((ItemBasic as ComponentMarkers)._supportsSpacingProps).toBe(
      true
    )
  })

  it('applies disabled modifier class when disabled', () => {
    render(<ItemBasic disabled>Disabled item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item--disabled')
  })

  it('applies pending modifier and pending indicator when pending', () => {
    render(<ItemBasic pending>Pending item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-list__item--pending')
    expect(
      element.querySelector('.dnb-list__item__pending')
    ).toBeInTheDocument()
  })

  it('applies skeleton font class when skeleton is true', () => {
    render(<ItemBasic skeleton>Skeleton item</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.classList).toContain('dnb-skeleton')
    expect(element.classList).toContain('dnb-skeleton--font')
  })

  it('supports id prop', () => {
    render(<ItemBasic id="my-item">Content</ItemBasic>)

    const element = document.querySelector('.dnb-list__item')

    expect(element.getAttribute('id')).toBe('my-item')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Container>
        <ItemBasic title="Title">Content</ItemBasic>
      </Container>
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })

  it('forwards data-* and aria-* attributes to the DOM element', () => {
    render(
      <ItemBasic
        data-testid="item-basic"
        data-foo="bar"
        aria-label="Basic item"
      >
        Content
      </ItemBasic>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.getAttribute('data-testid')).toBe('item-basic')
    expect(element.getAttribute('data-foo')).toBe('bar')
    expect(element.getAttribute('aria-label')).toBe('Basic item')
  })

  it('does not forward component-specific props to the DOM', () => {
    render(
      <ItemBasic variant="basic" selected pending skeleton>
        Content
      </ItemBasic>
    )

    const element = document.querySelector('.dnb-list__item')

    expect(element.getAttribute('variant')).toBeNull()
    expect(element.getAttribute('selected')).toBeNull()
    expect(element.getAttribute('pending')).toBeNull()
    expect(element.getAttribute('skeleton')).toBeNull()
  })
})
