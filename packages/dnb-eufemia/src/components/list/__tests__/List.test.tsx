/**
 * List molecule tests.
 * Covers key variants and combinations of List.Container + List.Item.* + List.Cell.*
 * and accessibility (axe) for the most used list patterns.
 */

import React from 'react'
import { render } from '@testing-library/react'
import List from '../List'
import { axeComponent } from '../../../core/jest/jestSetup'
import { fish_medium } from '../../../icons'

describe('List', () => {
  it('renders a basic list with Container and Item.Basic and cells', () => {
    render(
      <List.Container>
        <List.Item.Basic title="Row one">
          <List.Cell.Start>Start</List.Cell.Start>
          <List.Cell.Center>Center</List.Cell.Center>
          <List.Cell.End>End</List.Cell.End>
        </List.Item.Basic>
        <List.Item.Basic title="Row two">
          <List.Cell.End>Value</List.Cell.End>
        </List.Item.Basic>
      </List.Container>
    )

    const list = document.querySelector('.dnb-list')
    const items = document.querySelectorAll('.dnb-list__item')

    expect(list).toBeInTheDocument()
    expect(list.tagName).toBe('UL')
    expect(items.length).toBe(2)
    items.forEach((item) => {
      expect(item.tagName).toBe('LI')
    })
    expect(list.textContent).toContain('Row one')
    expect(list.textContent).toContain('Row two')
    expect(list.textContent).toContain('Start')
    expect(list.textContent).toContain('Center')
    expect(list.textContent).toContain('End')
    expect(list.textContent).toContain('Value')
  })

  it('renders an action/navigate list with clickable items', () => {
    const onClick = jest.fn()

    render(
      <List.Container>
        <List.Item.Action
          icon={fish_medium}
          title="Action row"
          onClick={onClick}
        >
          <List.Cell.End>123</List.Cell.End>
        </List.Item.Action>
      </List.Container>
    )

    const list = document.querySelector('.dnb-list')
    const item = document.querySelector('.dnb-list__item')

    expect(list).toBeInTheDocument()
    expect(item).toBeInTheDocument()
    expect(list.textContent).toContain('Action row')
    expect(list.textContent).toContain('123')
  })

  it('renders an action list with href as link', () => {
    render(
      <List.Container>
        <List.Item.Action title="Link row" href="#section">
          <List.Cell.End>Value</List.Cell.End>
        </List.Item.Action>
      </List.Container>
    )

    const link = document.querySelector('a[href="#section"]')

    expect(link).toBeInTheDocument()
    expect(link.textContent).toContain('Link row')
  })

  it('renders an accordion list with header and content', () => {
    render(
      <List.Container>
        <List.Item.Accordion open icon={fish_medium} title="Accordion row">
          <List.Item.Accordion.Header>
            <List.Cell.End>Summary</List.Cell.End>
          </List.Item.Accordion.Header>
          <List.Item.Accordion.Content>
            <List.Cell.Start innerSpace>Details here</List.Cell.Start>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>
      </List.Container>
    )

    const list = document.querySelector('.dnb-list')
    const item = document.querySelector('.dnb-list__item')

    expect(list).toBeInTheDocument()
    expect(item).toBeInTheDocument()
    expect(list.textContent).toContain('Accordion row')
    expect(list.textContent).toContain('Summary')
    expect(list.textContent).toContain('Details here')
  })

  it('renders a list with overline and footer cells', () => {
    render(
      <List.Container>
        <List.Item.Basic title="Item with header and footer">
          <List.Cell.Title>
            <List.Cell.Title.Overline>
              Overline cell
            </List.Cell.Title.Overline>
            Header text
          </List.Cell.Title>
          <List.Cell.Center>Body</List.Cell.Center>
          <List.Cell.Footer>Footer cell</List.Cell.Footer>
        </List.Item.Basic>
      </List.Container>
    )

    expect(document.body.textContent).toContain('Overline cell')
    expect(document.body.textContent).toContain('Body')
    expect(document.body.textContent).toContain('Footer cell')
  })

  it('renders a list with title and subline', () => {
    render(
      <List.Container>
        <List.Item.Basic title="Title text">
          <List.Cell.Title.Subline>Subline text</List.Cell.Title.Subline>
          <List.Cell.End>Value</List.Cell.End>
        </List.Item.Basic>
      </List.Container>
    )

    expect(document.body.textContent).toContain('Title text')
    expect(document.body.textContent).toContain('Subline text')
    expect(document.body.textContent).toContain('Value')
  })

  it('renders a list using List.Cell.Title directly', () => {
    render(
      <List.Container>
        <List.Item.Basic>
          <List.Cell.Title>Custom Title</List.Cell.Title>
          <List.Cell.Title.Subline>Description</List.Cell.Title.Subline>
          <List.Cell.End>123</List.Cell.End>
        </List.Item.Basic>
      </List.Container>
    )

    const title = document.querySelector('.dnb-list__item__title')

    expect(title).toBeInTheDocument()
    expect(title.textContent).toContain('Custom Title')
    expect(document.body.textContent).toContain('Description')
    expect(document.body.textContent).toContain('123')
  })

  it('renders a separated list with variant modifier', () => {
    render(
      <List.Container separated variant="basic">
        <List.Item.Basic title="One">
          <List.Cell.End>A</List.Cell.End>
        </List.Item.Basic>
        <List.Item.Basic title="Two">
          <List.Cell.End>B</List.Cell.End>
        </List.Item.Basic>
      </List.Container>
    )

    const list = document.querySelector('.dnb-list')

    expect(list.classList).toContain('dnb-list--separated')
    expect(list.classList).toContain('dnb-list--variant-basic')
  })

  it('exports List.Cell.Icon for custom icon placement', () => {
    render(
      <List.Container>
        <List.Item.Basic>
          <List.Cell.Icon>{fish_medium}</List.Cell.Icon>
          <List.Cell.Title>With icon cell</List.Cell.Title>
        </List.Item.Basic>
      </List.Container>
    )

    const icon = document.querySelector('.dnb-list__item__icon .dnb-icon')
    expect(icon).toBeInTheDocument()
    expect(icon.classList).toContain('dnb-icon--medium')
  })

  it('renders a mixed list with Basic, Action and Accordion items', () => {
    render(
      <List.Container>
        <List.Item.Basic title="Basic">
          <List.Cell.End>1</List.Cell.End>
        </List.Item.Basic>
        <List.Item.Action title="Action" onClick={() => {}}>
          <List.Cell.End>2</List.Cell.End>
        </List.Item.Action>
        <List.Item.Accordion title="Accordion">
          <List.Item.Accordion.Header>
            <List.Cell.End>3</List.Cell.End>
          </List.Item.Accordion.Header>
          <List.Item.Accordion.Content>
            <List.Cell.Start innerSpace>Content</List.Cell.Start>
          </List.Item.Accordion.Content>
        </List.Item.Accordion>
      </List.Container>
    )

    const items = document.querySelectorAll('.dnb-list__item')

    expect(items.length).toBe(3)
    expect(document.body.textContent).toContain('Basic')
    expect(document.body.textContent).toContain('Action')
    expect(document.body.textContent).toContain('Accordion')
  })

  describe('Accessibility', () => {
    it('basic list has no axe violations', async () => {
      const { container } = render(
        <List.Container>
          <List.Item.Basic title="Row one">
            <List.Cell.Start>Start</List.Cell.Start>
            <List.Cell.Center>Center</List.Cell.Center>
            <List.Cell.End>End</List.Cell.End>
          </List.Item.Basic>
          <List.Item.Basic title="Row two">
            <List.Cell.End>Value</List.Cell.End>
          </List.Item.Basic>
        </List.Container>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('action list (button) has no axe violations', async () => {
      const { container } = render(
        <List.Container>
          <List.Item.Action title="Click me" onClick={() => {}}>
            <List.Cell.End>123</List.Cell.End>
          </List.Item.Action>
        </List.Container>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('action list (link) has no axe violations', async () => {
      const { container } = render(
        <List.Container>
          <List.Item.Action title="Link" href="#section">
            <List.Cell.End>Value</List.Cell.End>
          </List.Item.Action>
        </List.Container>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('action list with inline anchor wrapper has no axe violations', async () => {
      const { container } = render(
        <List.Container>
          <List.Item.Action
            title="Link row"
            href="#section"
            target="_blank"
            rel="noopener noreferrer"
            chevronPosition="left"
          >
            <List.Cell.End>Value</List.Cell.End>
          </List.Item.Action>
        </List.Container>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('accordion list has no axe violations', async () => {
      const { container } = render(
        <List.Container>
          <List.Item.Accordion title="Accordion">
            <List.Item.Accordion.Header>
              <List.Cell.End>Summary</List.Cell.End>
            </List.Item.Accordion.Header>
            <List.Item.Accordion.Content>
              <List.Cell.Start innerSpace>Details</List.Cell.Start>
            </List.Item.Accordion.Content>
          </List.Item.Accordion>
        </List.Container>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('list with overline and footer cells has no axe violations', async () => {
      const { container } = render(
        <List.Container>
          <List.Item.Basic title="Item">
            <List.Cell.Title>
              <List.Cell.Title.Overline>Overline</List.Cell.Title.Overline>
              Header
            </List.Cell.Title>
            <List.Cell.Center>Body</List.Cell.Center>
            <List.Cell.Footer>Footer</List.Cell.Footer>
          </List.Item.Basic>
        </List.Container>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('separated list has no axe violations', async () => {
      const { container } = render(
        <List.Container separated>
          <List.Item.Basic title="One">
            <List.Cell.End>A</List.Cell.End>
          </List.Item.Basic>
          <List.Item.Basic title="Two">
            <List.Cell.End>B</List.Cell.End>
          </List.Item.Basic>
        </List.Container>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })
  })
})
