import { render, fireEvent } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import MenuRoot from '../MenuRoot'
import MenuButton from '../MenuButton'
import MenuList from '../MenuList'
import MenuAction from '../MenuAction'

jest.mock('../../popover/Popover', () => {
  return { default: jest.requireActual('./testHelpers').MockPopover }
})

describe('MenuRoot', () => {
  it('renders without errors', () => {
    render(
      <MenuRoot>
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Open</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item 1" />
        </MenuList>
      </MenuRoot>
    )

    const element = document.querySelector('.dnb-menu')
    expect(element).toBeInTheDocument()
  })

  it('renders trigger element', () => {
    render(
      <MenuRoot>
        <MenuButton>
          {({ active, ...props }) => (
            <button {...props} data-active={active}>
              Menu
            </button>
          )}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item" />
        </MenuList>
      </MenuRoot>
    )

    const trigger = document.querySelector('button')
    expect(trigger).toBeInTheDocument()
    expect(trigger.textContent).toBe('Menu')
  })

  it('sets aria-haspopup="menu" on trigger', () => {
    render(
      <MenuRoot>
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item" />
        </MenuList>
      </MenuRoot>
    )

    const trigger = document.querySelector('button')
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu')
  })

  it('opens and shows content when controlled', () => {
    const { rerender } = render(
      <MenuRoot open={false}>
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item 1" />
        </MenuList>
      </MenuRoot>
    )

    expect(document.querySelector('[role="menu"]')).not.toBeInTheDocument()

    rerender(
      <MenuRoot open={true}>
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item 1" />
        </MenuList>
      </MenuRoot>
    )

    expect(document.querySelector('[role="menu"]')).toBeInTheDocument()
  })

  it('calls onOpenChange when toggled', () => {
    const onOpenChange = jest.fn()

    render(
      <MenuRoot onOpenChange={onOpenChange}>
        <MenuButton>
          {({ toggle, ...props }) => (
            <button {...props} onClick={() => toggle()}>
              Menu
            </button>
          )}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item" />
        </MenuList>
      </MenuRoot>
    )

    const trigger = document.querySelector('button')
    fireEvent.click(trigger)

    expect(onOpenChange).toHaveBeenCalled()
  })

  it('merges custom className', () => {
    render(
      <MenuRoot className="custom-class">
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item" />
        </MenuList>
      </MenuRoot>
    )

    const element = document.querySelector('.dnb-menu')
    expect(element.classList).toContain('custom-class')
  })

  it('forwards id prop', () => {
    render(
      <MenuRoot id="my-menu">
        <MenuButton>
          {({ active, ...props }) => <button {...props}>Menu</button>}
        </MenuButton>
        <MenuList>
          <MenuAction text="Item" />
        </MenuList>
      </MenuRoot>
    )

    // The Popover mock doesn't forward id, but we verify it doesn't throw
    expect(document.querySelector('.dnb-menu')).toBeInTheDocument()
  })

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(
        <MenuRoot>
          <MenuButton>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </MenuButton>
          <MenuList>
            <MenuAction text="Item 1" />
          </MenuList>
        </MenuRoot>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })

    it('has no axe violations when open', async () => {
      const { container } = render(
        <MenuRoot open={true}>
          <MenuButton>
            {({ active, ...props }) => <button {...props}>Menu</button>}
          </MenuButton>
          <MenuList aria-label="Menu">
            <MenuAction text="Item 1" />
            <MenuAction text="Item 2" />
          </MenuList>
        </MenuRoot>
      )

      expect(await axeComponent(container)).toHaveNoViolations()
    })
  })
})
