import React from 'react'
import { render } from '@testing-library/react'
import List from '../List'
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

describe('List.Card.ScrollView', () => {
  it('renders with dnb-list__card__scroll-view class', () => {
    render(
      <List.Card.ScrollView>
        <span>Content</span>
      </List.Card.ScrollView>
    )

    const element = document.querySelector('.dnb-list__card__scroll-view')

    expect(element).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(
      <List.Card.ScrollView className="my-scroll">
        <span>Content</span>
      </List.Card.ScrollView>
    )

    const element = document.querySelector('.dnb-list__card__scroll-view')

    expect(element.classList).toContain('dnb-list__card__scroll-view')
    expect(element.classList).toContain('my-scroll')
  })

  it('renders children', () => {
    render(
      <List.Card.ScrollView>
        <span>Scrollable content</span>
      </List.Card.ScrollView>
    )

    const element = document.querySelector('.dnb-list__card__scroll-view')

    expect(element.textContent).toContain('Scrollable content')
  })

  it('passes style prop for maxHeight', () => {
    render(
      <List.Card.ScrollView style={{ maxHeight: '20rem' }}>
        <span>Content</span>
      </List.Card.ScrollView>
    )

    const element = document.querySelector(
      '.dnb-list__card__scroll-view'
    ) as HTMLElement

    expect(element.style.maxHeight).toBe('20rem')
  })

  it('supports spacing props', () => {
    const { default: ListCard } = require('../ListCard')

    expect(ListCard.ScrollView._supportsSpacingProps).toBe(true)
  })

  it('renders a full composition with List.Card and List.Container', () => {
    render(
      <List.Card stack>
        <List.Card.ScrollView style={{ maxHeight: '20rem' }}>
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
        </List.Card.ScrollView>
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
          <List.Card.ScrollView style={{ maxHeight: '20rem' }}>
            <List.Container>
              <List.Item.Action title="Action item" onClick={() => {}}>
                <List.Cell.End>123</List.Cell.End>
              </List.Item.Action>
            </List.Container>
          </List.Card.ScrollView>
        </List.Card>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })
  })
})
