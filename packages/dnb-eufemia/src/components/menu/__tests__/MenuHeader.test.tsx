import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Menu from '../Menu'

describe('MenuHeader', () => {
  it('renders with text prop', () => {
    render(
      <ul role="menu">
        <Menu.Header text="Section" />
      </ul>,
    )

    const header = document.querySelector('.dnb-menu__header')
    expect(header).toBeInTheDocument()
    expect(header.textContent).toBe('Section')
  })

  it('renders with children', () => {
    render(
      <ul role="menu">
        <Menu.Header>
          <strong>Custom</strong>
        </Menu.Header>
      </ul>,
    )

    const header = document.querySelector('.dnb-menu__header')
    expect(header.querySelector('strong')).toBeTruthy()
    expect(header.textContent).toBe('Custom')
  })

  it('does not have role="menuitem"', () => {
    render(
      <ul role="menu">
        <Menu.Header text="Section" />
      </ul>,
    )

    const header = document.querySelector('.dnb-menu__header')
    expect(header.getAttribute('role')).not.toBe('menuitem')
  })

  it('is not focusable', () => {
    render(
      <ul role="menu">
        <Menu.Header text="Section" />
        <Menu.Action text="Item" />
      </ul>,
    )

    const header = document.querySelector('.dnb-menu__header')
    expect(header.getAttribute('tabindex')).toBeNull()
  })

  it('applies custom className', () => {
    render(
      <ul role="menu">
        <Menu.Header text="Section" className="custom" />
      </ul>,
    )

    const header = document.querySelector('.dnb-menu__header')
    expect(header.classList.contains('custom')).toBe(true)
  })

  it('prefers text prop over children', () => {
    render(
      <ul role="menu">
        <Menu.Header text="From text">From children</Menu.Header>
      </ul>,
    )

    const text = document.querySelector('.dnb-menu__header__text')
    expect(text.textContent).toBe('From text')
  })

  it('works inside Menu.Root', () => {
    render(
      <Menu.Root open>
        <Menu.Button text="Edit" />
        <Menu.List>
          <Menu.Header text="Clipboard" />
          <Menu.Action text="Cut" />
          <Menu.Divider />
          <Menu.Header text="Selection" />
          <Menu.Action text="Select All" />
        </Menu.List>
      </Menu.Root>,
    )

    const headers = document.querySelectorAll('.dnb-menu__header')
    expect(headers).toHaveLength(2)
    expect(headers[0].textContent).toBe('Clipboard')
    expect(headers[1].textContent).toBe('Selection')

    // Headers should not be registered as menu items
    const menuItems = document.querySelectorAll('[role="menuitem"]')
    expect(menuItems).toHaveLength(2) // Cut + Select All only
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ul role="menu">
        <Menu.Header text="Section" />
      </ul>,
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })
})
