import { act, fireEvent, render } from '@testing-library/react'
import ScrollIndicator from '../ScrollIndicator'
import Provider from '../../../shared/Provider'
import { axeComponent } from '../../../core/test-utils/testSetup'

const items = [
  { label: 'Show first image', active: true },
  { label: 'Show second image' },
  { label: 'Show third image', active: true },
]

describe('ScrollIndicator', () => {
  it('renders a named toolbar with independent visibility states and one tab stop', () => {
    render(
      <Provider locale="en-GB">
        <ScrollIndicator items={items} onChange={vi.fn()} top="small" />
      </Provider>
    )
    const toolbar = document.querySelector('[role="toolbar"]')
    const buttons = document.querySelectorAll('button')
    expect(toolbar).toHaveAccessibleName('Scroll position')
    expect(toolbar).toHaveClass('dnb-space__top--small')
    expect(buttons[0]).toHaveAccessibleName('Show first image')
    expect(buttons[0]).toHaveAttribute('data-active', 'true')
    expect(buttons[0]).toHaveAccessibleDescription('In view')
    expect(buttons[1]).not.toHaveAttribute('aria-describedby')
    expect(buttons[1]).toHaveAttribute('data-active', 'false')
    expect(buttons[2]).toHaveAttribute('data-active', 'true')
    expect(Array.from(buttons, (button) => button.tabIndex)).toEqual([
      0, -1, -1,
    ])
  })

  it.each(['ltr', 'rtl'] as const)(
    'moves focus with arrows and Home/End in %s without activating an item',
    (direction) => {
      const onChange = vi.fn()
      render(
        <ScrollIndicator
          items={items}
          onChange={onChange}
          style={{ direction }}
        />
      )
      const buttons = document.querySelectorAll('button')
      act(() => buttons[0].focus())
      const next = direction === 'ltr' ? 'ArrowRight' : 'ArrowLeft'
      const previous = direction === 'ltr' ? 'ArrowLeft' : 'ArrowRight'
      fireEvent.keyDown(buttons[0], { key: next })
      expect(buttons[1]).toHaveFocus()
      expect(buttons[1]).toHaveAttribute('tabindex', '0')
      expect(buttons[0]).toHaveAttribute('tabindex', '-1')
      fireEvent.keyDown(buttons[1], { key: previous })
      expect(buttons[0]).toHaveFocus()
      fireEvent.keyDown(buttons[0], { key: previous })
      expect(buttons[2]).toHaveFocus()
      fireEvent.keyDown(buttons[2], { key: next })
      expect(buttons[0]).toHaveFocus()
      fireEvent.keyDown(buttons[0], { key: 'End' })
      expect(buttons[2]).toHaveFocus()
      fireEvent.keyDown(buttons[2], { key: 'Home' })
      expect(buttons[0]).toHaveFocus()
      fireEvent.keyDown(buttons[0], { key: next, ctrlKey: true })
      expect(buttons[0]).toHaveFocus()
      expect(onChange).not.toHaveBeenCalled()
      fireEvent.click(buttons[1])
      expect(onChange).toHaveBeenCalledExactlyOnceWith({ index: 1 })
    }
  )

  it('keeps focus and one tab stop when items are removed', () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <ScrollIndicator items={items} onChange={onChange} />
    )
    const buttons = document.querySelectorAll('button')
    act(() => buttons[2].focus())
    rerender(
      <ScrollIndicator items={items.slice(0, 2)} onChange={onChange} />
    )
    expect(document.querySelectorAll('button')[1]).toHaveFocus()
    rerender(<ScrollIndicator items={items} onChange={onChange} />)
    expect(document.querySelectorAll('button')[1]).toHaveAttribute(
      'tabindex',
      '0'
    )
    expect(document.querySelectorAll('button[tabindex="0"]')).toHaveLength(
      1
    )
    rerender(<ScrollIndicator items={[]} onChange={onChange} />)
    expect(document.querySelector('[role="toolbar"]')).toBeNull()
  })

  it('supports provider defaults, custom names and refs', () => {
    const ref = { current: null }
    render(
      <Provider ScrollIndicator={{ items: [], onChange: vi.fn() }}>
        <ScrollIndicator
          ref={ref}
          items={items}
          onChange={vi.fn()}
          aria-label="Gallery"
        />
      </Provider>
    )
    expect(ref.current).toHaveAccessibleName('Gallery')
    expect(document.querySelectorAll('button')).toHaveLength(3)
    expect(ScrollIndicator['_supportsSpacingProps']).toBe(true)
  })

  it('does not restore focus after the user leaves the group', () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <ScrollIndicator items={items} onChange={onChange} />
    )
    const button = document.querySelectorAll('button')[2]
    act(() => button.focus())
    act(() => button.blur())
    rerender(
      <ScrollIndicator items={items.slice(0, 2)} onChange={onChange} />
    )
    expect(document.body).toHaveFocus()
    expect(document.querySelectorAll('button')[1]).toHaveAttribute(
      'tabindex',
      '0'
    )
  })

  it('has valid accessible markup', async () => {
    const result = render(
      <ScrollIndicator items={items} onChange={vi.fn()} />
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
