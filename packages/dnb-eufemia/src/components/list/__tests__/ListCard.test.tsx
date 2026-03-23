import React from 'react'
import { act, render, waitFor } from '@testing-library/react'
import List from '../List'
import { List as RootList } from '../../../components'
import { axeComponent } from '../../../core/jest/jestSetup'
import { fish_medium } from '../../../icons'

describe('List.Card', () => {
  it('renders with dnb-list__card class', () => {
    render(
      <List.Card>
        <span>Content</span>
      </List.Card>
    )

    const element = document.querySelector('.dnb-list__card')

    expect(element).toBeInTheDocument()
  })

  it('renders as a section element (from Card)', () => {
    render(
      <List.Card>
        <span>Content</span>
      </List.Card>
    )

    const element = document.querySelector('.dnb-list__card')

    expect(element.tagName).toBe('SECTION')
  })

  it('merges custom className', () => {
    render(
      <List.Card className="custom-class">
        <span>Content</span>
      </List.Card>
    )

    const element = document.querySelector('.dnb-list__card')

    expect(element.classList).toContain('dnb-list__card')
    expect(element.classList).toContain('custom-class')
  })

  it('renders children', () => {
    render(
      <List.Card>
        <span>Card content</span>
      </List.Card>
    )

    const element = document.querySelector('.dnb-list__card')

    expect(element.textContent).toContain('Card content')
  })

  it('passes stack prop to Card', () => {
    render(
      <List.Card stack>
        <span>Item 1</span>
        <span>Item 2</span>
      </List.Card>
    )

    const element = document.querySelector('.dnb-list__card')

    expect(element).toBeInTheDocument()
  })

  it('applies stack layout by default', () => {
    render(
      <List.Card>
        <span>Item 1</span>
        <span>Item 2</span>
      </List.Card>
    )

    const element = document.querySelector('.dnb-list__card')
    const inner = element.querySelector(
      '.dnb-flex-container--align-stretch'
    )

    expect(inner).toBeInTheDocument()
  })

  it('passes title prop to Card', () => {
    render(
      <List.Card title="My Title">
        <span>Content</span>
      </List.Card>
    )

    const element = document.querySelector('.dnb-list__card')

    expect(element.textContent).toContain('My Title')
  })

  it('supports spacing props', () => {
    const { default: ListCard } = require('../ListCard')

    expect(ListCard._supportsSpacingProps).toBe(true)
  })

  it('does not expose ScrollView on List.Card', () => {
    expect('ScrollView' in List.Card).toBe(false)
  })

  it('renders a full List.Card with List.Container inside', () => {
    render(
      <List.Card stack>
        <List.Container>
          <List.Item.Action
            icon={fish_medium}
            title="Payment received"
            onClick={() => {}}
          >
            <List.Cell.End>1 234 kr</List.Cell.End>
          </List.Item.Action>
        </List.Container>
      </List.Card>
    )

    const card = document.querySelector('.dnb-list__card')
    const list = document.querySelector('.dnb-list')

    expect(card).toBeInTheDocument()
    expect(list).toBeInTheDocument()
    expect(card.textContent).toContain('Payment received')
    expect(card.textContent).toContain('1 234 kr')
  })
})

describe('List.ScrollView', () => {
  it('renders with dnb-list__card__scroll-view class', () => {
    render(
      <List.ScrollView>
        <span>Content</span>
      </List.ScrollView>
    )

    const element = document.querySelector('.dnb-list__card__scroll-view')

    expect(element).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(
      <List.ScrollView className="my-scroll">
        <span>Content</span>
      </List.ScrollView>
    )

    const element = document.querySelector('.dnb-list__card__scroll-view')

    expect(element.classList).toContain('dnb-list__card__scroll-view')
    expect(element.classList).toContain('my-scroll')
  })

  it('renders children', () => {
    render(
      <List.ScrollView>
        <span>Scrollable content</span>
      </List.ScrollView>
    )

    const element = document.querySelector('.dnb-list__card__scroll-view')

    expect(element.textContent).toContain('Scrollable content')
  })

  it('passes style prop for maxHeight', () => {
    render(
      <List.ScrollView style={{ maxHeight: '20rem' }}>
        <span>Content</span>
      </List.ScrollView>
    )

    const element = document.querySelector(
      '.dnb-list__card__scroll-view'
    ) as HTMLElement

    expect(element.style.maxHeight).toBe('20rem')
  })

  it('sets maxHeight based on maxVisibleListItems', () => {
    render(
      <List.ScrollView maxVisibleListItems={3}>
        <span>Content</span>
      </List.ScrollView>
    )

    const element = document.querySelector(
      '.dnb-list__card__scroll-view'
    ) as HTMLElement

    expect(element.style.maxHeight).toBe(
      'calc(calc(var(--item-height, 4rem) * 3) + 0.125rem)'
    )
    expect(element.style.marginBottom).toBe('-0.125rem')
  })

  it('derives outline compensation from --item-outline-width', async () => {
    const originalGetComputedStyle = window.getComputedStyle

    const getComputedStyleSpy = jest
      .spyOn(window, 'getComputedStyle')
      .mockImplementation((element) => {
        const styles = originalGetComputedStyle(element)

        if (
          element instanceof HTMLElement &&
          element.classList.contains('dnb-list__container')
        ) {
          return {
            ...styles,
            getPropertyValue: (property: string) => {
              if (property === '--item-outline-width') {
                return '0.0625rem'
              }

              return styles.getPropertyValue(property)
            },
          } as CSSStyleDeclaration
        }

        return styles
      })

    render(
      <List.Card>
        <List.ScrollView maxVisibleListItems={2}>
          <List.Container>
            <List.Item.Action title="Item one" onClick={() => {}}>
              <List.Cell.End>100 kr</List.Cell.End>
            </List.Item.Action>

            <List.Item.Action title="Item two" onClick={() => {}}>
              <List.Cell.End>200 kr</List.Cell.End>
            </List.Item.Action>
          </List.Container>
        </List.ScrollView>
      </List.Card>
    )

    const element = document.querySelector(
      '.dnb-list__card__scroll-view'
    ) as HTMLElement

    await waitFor(() => {
      expect(element.style.marginBottom).toBe('-0.125rem')
    })

    getComputedStyleSpy.mockRestore()
  })

  it('measures rendered list item heights when list items exist', async () => {
    let currentHeights = {
      itemOneHeight: 80,
      itemTwoHeight: 60,
      itemTwoTop: 80,
    }

    const offsetHeightSpy = jest
      .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
      .mockImplementation(function () {
        if (this.textContent?.includes('Item one')) {
          return currentHeights.itemOneHeight
        }

        if (this.textContent?.includes('Item two')) {
          return currentHeights.itemTwoHeight
        }

        return 0
      })

    const offsetTopSpy = jest
      .spyOn(HTMLElement.prototype, 'offsetTop', 'get')
      .mockImplementation(function () {
        if (this.textContent?.includes('Item two')) {
          return currentHeights.itemTwoTop
        }

        return 0
      })

    render(
      <List.ScrollView maxVisibleListItems={2}>
        <List.Container>
          <List.Item.Action title="Item one" onClick={() => {}}>
            <List.Cell.End>100 kr</List.Cell.End>
          </List.Item.Action>

          <List.Item.Action title="Item two" onClick={() => {}}>
            <List.Cell.End>200 kr</List.Cell.End>
          </List.Item.Action>
        </List.Container>
      </List.ScrollView>
    )

    const element = document.querySelector(
      '.dnb-list__card__scroll-view'
    ) as HTMLElement

    await waitFor(() => {
      expect(element.style.maxHeight).toBe('calc(140px + 0.125rem)')
    })

    currentHeights = {
      itemOneHeight: 100,
      itemTwoHeight: 90,
      itemTwoTop: 100,
    }

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    await waitFor(() => {
      expect(element.style.maxHeight).toBe('calc(190px + 0.125rem)')
    })

    offsetHeightSpy.mockRestore()
    offsetTopSpy.mockRestore()
  })

  it('lets style.maxHeight override maxVisibleListItems', () => {
    render(
      <List.ScrollView
        maxVisibleListItems={3}
        style={{ maxHeight: '20rem' }}
      >
        <span>Content</span>
      </List.ScrollView>
    )

    const element = document.querySelector(
      '.dnb-list__card__scroll-view'
    ) as HTMLElement

    expect(element.style.maxHeight).toBe('20rem')
    expect(element.style.marginBottom).toBe('')
  })

  it('supports spacing props', () => {
    const { default: ListScrollView } = require('../ListScrollView')

    expect(ListScrollView._supportsSpacingProps).toBe(true)
  })

  it('is available from the public List export', () => {
    expect(RootList.ScrollView._supportsSpacingProps).toBe(true)
  })

  it('renders a full composition with List.Card and List.Container', () => {
    render(
      <List.Card stack>
        <List.ScrollView style={{ maxHeight: '20rem' }}>
          <List.Container>
            <List.Item.Action
              icon={fish_medium}
              title="Item one"
              onClick={() => {}}
            >
              <List.Cell.End>100 kr</List.Cell.End>
            </List.Item.Action>
            <List.Item.Action
              icon={fish_medium}
              title="Item two"
              onClick={() => {}}
            >
              <List.Cell.End>200 kr</List.Cell.End>
            </List.Item.Action>
          </List.Container>
        </List.ScrollView>
      </List.Card>
    )

    const card = document.querySelector('.dnb-list__card')
    const scrollView = document.querySelector(
      '.dnb-list__card__scroll-view'
    )
    const items = document.querySelectorAll('.dnb-list__item')

    expect(card).toBeInTheDocument()
    expect(scrollView).toBeInTheDocument()
    expect(items.length).toBe(2)
    expect(card.textContent).toContain('Item one')
    expect(card.textContent).toContain('Item two')
  })

  describe('Accessibility', () => {
    it('List.Card with items has no axe violations', async () => {
      const { container } = render(
        <List.Card stack>
          <List.Container>
            <List.Item.Basic title="Row one">
              <List.Cell.End>Value</List.Cell.End>
            </List.Item.Basic>
          </List.Container>
        </List.Card>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('List.Card with ScrollView has no axe violations', async () => {
      const { container } = render(
        <List.Card stack>
          <List.ScrollView style={{ maxHeight: '20rem' }}>
            <List.Container>
              <List.Item.Action title="Action item" onClick={() => {}}>
                <List.Cell.End>123</List.Cell.End>
              </List.Item.Action>
            </List.Container>
          </List.ScrollView>
        </List.Card>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })
  })

  it('propagates skeleton to child items via context', () => {
    render(
      <List.ScrollView skeleton>
        <List.Container>
          <List.Item.Basic title="Item">
            <List.Cell.End>Value</List.Cell.End>
          </List.Item.Basic>
        </List.Container>
      </List.ScrollView>
    )

    const items = document.querySelectorAll('.dnb-list__item')

    items.forEach((item) => {
      expect(item.classList).toContain('dnb-skeleton')
      expect(item.classList).toContain('dnb-skeleton--font')
    })
  })

  it('inherits parent context values when skeleton is set', () => {
    render(
      <List.Container variant="basic" separated>
        <List.ScrollView skeleton>
          <List.Item.Basic title="Item">
            <List.Cell.End>Value</List.Cell.End>
          </List.Item.Basic>
        </List.ScrollView>
      </List.Container>
    )

    const item = document.querySelector('.dnb-list__item')

    expect(item.classList).toContain('dnb-list--variant-basic')
    expect(item.classList).toContain('dnb-skeleton')
  })

  it('propagates parent Container skeleton through ScrollView without explicit skeleton prop', () => {
    render(
      <List.Container skeleton>
        <List.ScrollView>
          <List.Item.Basic title="Item">
            <List.Cell.End>Value</List.Cell.End>
          </List.Item.Basic>
        </List.ScrollView>
      </List.Container>
    )

    const item = document.querySelector('.dnb-list__item')

    expect(item.classList).toContain('dnb-skeleton')
    expect(item.classList).toContain('dnb-skeleton--font')
  })

  it('propagates disabled prop to child items via context', () => {
    render(
      <List.ScrollView disabled>
        <List.Container>
          <List.Item.Basic title="Item">
            <List.Cell.End>Value</List.Cell.End>
          </List.Item.Basic>
        </List.Container>
      </List.ScrollView>
    )

    const item = document.querySelector('.dnb-list__item')

    expect(item.classList).toContain('dnb-list__item--disabled')
  })

  it('propagates parent Container disabled through ScrollView without explicit disabled prop', () => {
    render(
      <List.Container disabled>
        <List.ScrollView>
          <List.Item.Basic title="Item">
            <List.Cell.End>Value</List.Cell.End>
          </List.Item.Basic>
        </List.ScrollView>
      </List.Container>
    )

    const item = document.querySelector('.dnb-list__item')

    expect(item.classList).toContain('dnb-list__item--disabled')
  })
})
