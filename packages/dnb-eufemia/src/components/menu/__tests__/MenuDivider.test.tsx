import React from 'react'
import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import MenuDivider from '../MenuDivider'

describe('MenuDivider', () => {
  it('renders as li element', () => {
    render(
      <ul role="menu">
        <MenuDivider />
      </ul>
    )

    const element = document.querySelector('.dnb-menu__divider')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('LI')
  })

  it('has role="separator"', () => {
    render(
      <ul role="menu">
        <MenuDivider />
      </ul>
    )

    const element = document.querySelector('[role="separator"]')
    expect(element).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(
      <ul role="menu">
        <MenuDivider className="custom-divider" />
      </ul>
    )

    const element = document.querySelector('.dnb-menu__divider')
    expect(element.classList).toContain('custom-divider')
  })

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(
        <ul role="menu" aria-label="Test">
          <li role="menuitem">Item 1</li>
          <MenuDivider />
          <li role="menuitem">Item 2</li>
        </ul>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })
  })
})
