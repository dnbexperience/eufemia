import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Autocomplete from '../../../components/autocomplete/Autocomplete'
import Dropdown from '../../../components/dropdown/Dropdown'
import { createDrawerListVirtualization } from '../Virtualized'
import { mockImplementationForDirectionObserver } from './DrawerListTestMocks'

mockImplementationForDirectionObserver()

const data = Array.from({ length: 1000 }, (_, index) => `Item ${index}`)
const listDriver = createDrawerListVirtualization({ overscan: 2 })

function scrollListenerCount(
  addEventListener: ReturnType<typeof vi.spyOn>
) {
  return addEventListener.mock.instances.filter(
    (instance, index) =>
      addEventListener.mock.calls[index][0] === 'scroll' &&
      instance instanceof HTMLElement &&
      instance.classList.contains('dnb-drawer-list__options')
  ).length
}

describe('DrawerList virtualization', () => {
  beforeEach(() => {
    vi.spyOn(
      HTMLElement.prototype,
      'getBoundingClientRect'
    ).mockImplementation(function (this: HTMLElement) {
      const index = Number(this.getAttribute('data-index') || 0)
      const top =
        index * 48 - (this.closest('[role=listbox]')?.scrollTop || 0)
      return {
        top,
        bottom: top + 48,
        height: 48,
        width: 320,
        x: 0,
        y: top,
        left: 0,
        right: 320,
        toJSON: () => ({}),
      }
    })
  })

  it('renders an initial window during SSR', () => {
    const html = renderToString(
      <Autocomplete
        id="virtual-autocomplete"
        data={data}
        listDriver={listDriver}
        inline
        noAnimation
        skipPortal
      />
    )

    expect((html.match(/role="option"/g) || []).length).toBeGreaterThan(0)
    expect((html.match(/role="option"/g) || []).length).toBeLessThan(
      data.length
    )
  })

  it('renders a window for Autocomplete while retaining the full dataset', async () => {
    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={data}
        listDriver={listDriver}
        open
        noAnimation
        skipPortal
      />
    )

    await waitFor(() => {
      expect(
        document.querySelectorAll('[role="option"]')
      ).not.toHaveLength(0)
    })
    const options = document.querySelectorAll('[role="option"]')

    expect(options.length).toBeGreaterThan(0)
    expect(options.length).toBeLessThan(data.length)
    expect(options[0]).toHaveAttribute('aria-posinset', '1')
    expect(options[0]).toHaveAttribute('aria-setsize', '1000')
  })

  it('reattaches the scroll observer after reopening', async () => {
    const addEventListener = vi.spyOn(
      HTMLElement.prototype,
      'addEventListener'
    )
    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={data}
        listDriver={listDriver}
        showSubmitButton
        noAnimation
        skipPortal
      />
    )

    const submitButton = document.querySelector<HTMLButtonElement>(
      '#virtual-autocomplete-submit-button'
    )
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(scrollListenerCount(addEventListener)).toBe(1)
    })

    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(
        document.querySelector('#virtual-autocomplete-ul')
      ).not.toBeInTheDocument()
    })

    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(scrollListenerCount(addEventListener)).toBe(2)
    })

    addEventListener.mockRestore()
  })

  it('reattaches the scroll observer after reopening by focus', async () => {
    const addEventListener = vi.spyOn(
      HTMLElement.prototype,
      'addEventListener'
    )
    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={data}
        listDriver={listDriver}
        noAnimation
        skipPortal
      />
    )

    const input = document.querySelector<HTMLInputElement>(
      '#virtual-autocomplete'
    )
    await userEvent.click(input)
    await waitFor(() => {
      expect(scrollListenerCount(addEventListener)).toBe(1)
    })

    await userEvent.keyboard('{Escape}')
    await waitFor(() => {
      expect(
        document.querySelector('#virtual-autocomplete-ul')
      ).not.toBeInTheDocument()
    })

    await userEvent.click(document.body)
    await userEvent.click(input)
    await waitFor(() => {
      expect(scrollListenerCount(addEventListener)).toBe(2)
    })

    addEventListener.mockRestore()
  })

  it('positions rows using their measured heights', async () => {
    vi.mocked(
      HTMLElement.prototype.getBoundingClientRect
    ).mockImplementation(function (this: HTMLElement) {
      const index = Number(this.getAttribute('data-index') || 0)
      const height = index === 0 ? 96 : 48
      const top =
        (index === 0 ? 0 : 96 + (index - 1) * 48) -
        (this.closest('[role=listbox]')?.scrollTop || 0)

      return {
        top,
        bottom: top + height,
        height,
        width: 320,
        x: 0,
        y: top,
        left: 0,
        right: 320,
        toJSON: () => ({}),
      }
    })

    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={data}
        listDriver={listDriver}
        open
        noAnimation
        skipPortal
      />
    )

    await waitFor(() => {
      expect(
        document.querySelector<HTMLElement>('[data-index="1"]')
      ).toHaveStyle({ transform: 'translateY(96px)' })
    })
  })

  it('keeps keyboard navigation working beyond the initial window', () => {
    const onChange = vi.fn()
    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={data}
        listDriver={listDriver}
        onChange={onChange}
        open
        noAnimation
        skipPortal
      />
    )

    const input = document.querySelector('input')
    input.focus()

    for (let index = 0; index < 20; index++) {
      fireEvent.keyDown(input, { key: 'ArrowDown' })
    }

    expect(input).toHaveAttribute(
      'aria-activedescendant',
      'option-virtual-autocomplete-19'
    )

    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ data: 'Item 19' })
    )
  })

  it('keeps keyboard focus moving through visible rows before scrolling', async () => {
    vi.mocked(
      HTMLElement.prototype.getBoundingClientRect
    ).mockImplementation(function (this: HTMLElement) {
      if (this.getAttribute('role') === 'listbox') {
        return {
          top: 0,
          bottom: 384,
          height: 384,
          width: 320,
          x: 0,
          y: 0,
          left: 0,
          right: 320,
          toJSON: () => ({}),
        }
      }

      const index = Number(this.getAttribute('data-index') || 0)
      const top =
        index * 48 - (this.closest('[role=listbox]')?.scrollTop || 0)
      return {
        top,
        bottom: top + 48,
        height: 48,
        width: 320,
        x: 0,
        y: top,
        left: 0,
        right: 320,
        toJSON: () => ({}),
      }
    })

    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={data}
        listDriver={listDriver}
        open
        noAnimation
        skipPortal
      />
    )

    const input = document.querySelector('input')
    const list = document.querySelector<HTMLElement>(
      '#virtual-autocomplete-ul'
    )
    input.focus()

    for (let index = 0; index < 4; index++) {
      fireEvent.keyDown(input, { key: 'ArrowDown' })
    }

    expect(input).toHaveAttribute(
      'aria-activedescendant',
      'option-virtual-autocomplete-3'
    )
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    )
    expect(list.scrollTop).toBe(0)
  })

  it('keeps the selected item mounted when opening', async () => {
    render(
      <Dropdown
        id="virtual-dropdown"
        data={data}
        value={999}
        listDriver={listDriver}
        open
        noAnimation
        skipPortal
      />
    )

    await waitFor(() => {
      expect(
        document.getElementById('option-virtual-dropdown-999')
      ).toBeInTheDocument()
    })
    expect(document.querySelector('#virtual-dropdown-ul')).toHaveAttribute(
      'aria-activedescendant',
      'option-virtual-dropdown-999'
    )
    await waitFor(() => {
      expect(
        document.querySelector('#virtual-dropdown-ul').scrollTop
      ).toBeGreaterThan(0)
    })
  })

  it('restores the full list around a selected Autocomplete item', async () => {
    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={data}
        listDriver={listDriver}
        noAnimation
        skipPortal
      />
    )

    const input = document.querySelector('input')
    await userEvent.click(input)
    await userEvent.type(input, 'Item 117')
    await userEvent.click(
      await screen.findByRole('option', { name: 'Item 117' })
    )
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'false')
    })
    await userEvent.click(input)

    const selectedOption = await screen.findByRole('option', {
      name: 'Item 117',
      selected: true,
    })
    expect(selectedOption).toHaveAttribute('aria-setsize', '1000')
    expect(
      screen.getByRole('option', { name: 'Item 118' })
    ).toBeInTheDocument()
  })

  it('keeps filtering usable after reopening a selected Autocomplete item', async () => {
    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={data}
        listDriver={listDriver}
        noAnimation
        skipPortal
      />
    )

    const input = document.querySelector('input')
    await userEvent.click(input)
    await userEvent.type(input, 'Item 117')
    await userEvent.click(
      await screen.findByRole('option', { name: 'Item 117' })
    )
    await userEvent.click(input)
    await userEvent.clear(input)
    await userEvent.type(input, 'Item 999')

    expect(
      await screen.findByRole('option', { name: 'Item 999' })
    ).toBeInTheDocument()
  })

  it('resets the scroll position when filtering after reopening a selected item', async () => {
    const searchableData = Array.from({ length: 1000 }, (_, index) => ({
      selectedKey: String(index),
      content: `Item ${index + 1}`,
    }))

    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={searchableData}
        listDriver={listDriver}
        noAnimation
        skipPortal
      />
    )

    const input = document.querySelector('input')
    await userEvent.click(input)
    await userEvent.type(input, 'Item 123')
    await userEvent.click(
      await screen.findByRole('option', { name: 'Item 123' })
    )
    await userEvent.click(input)

    const list = document.querySelector<HTMLUListElement>(
      '#virtual-autocomplete-ul'
    )
    await waitFor(() => {
      expect(list.scrollTop).toBeGreaterThan(0)
    })

    await userEvent.clear(input)
    await userEvent.type(input, 'Item 124')
    await waitFor(() => {
      expect(list.scrollTop).toBe(0)
    })
    expect(
      screen.getByRole('option', { name: 'Item 124' })
    ).toBeInTheDocument()

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      'option-virtual-autocomplete-123'
    )

    fireEvent.keyDown(input, { key: 'Enter' })
    expect(input).toHaveValue('Item 124')
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps the complete dataset virtualized after show all', async () => {
    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={data}
        listDriver={listDriver}
        open
        noAnimation
        skipPortal
      />
    )
    fireEvent.change(document.querySelector('input'), {
      target: { value: '999' },
    })
    await waitFor(() => {
      expect(
        document.querySelector('.dnb-autocomplete__show-all')
      ).toBeInTheDocument()
    })

    fireEvent.click(document.querySelector('.dnb-autocomplete__show-all'))

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-autocomplete__show-all')
      ).not.toBeInTheDocument()
    })

    const options = document.querySelectorAll('[role="option"]')
    expect(options.length).toBeGreaterThan(0)
    expect(options.length).toBeLessThan(data.length)
    expect(options[0]).toHaveAttribute('aria-setsize', '1000')
  })

  it('renders group labels required by visible options', async () => {
    render(
      <Autocomplete
        id="virtual-autocomplete"
        groups={['First group', 'Second group']}
        data={data.map((content, index) => ({
          content,
          groupIndex: index < 500 ? 0 : 1,
        }))}
        listDriver={listDriver}
        open
        noAnimation
        skipPortal
      />
    )

    await waitFor(() => {
      expect(document.querySelector('[role="option"]')).toBeInTheDocument()
    })

    const option = document.querySelector('[role="option"]')
    const groupId = option.getAttribute('aria-describedby')
    expect(document.getElementById(groupId)).toHaveTextContent(
      'First group'
    )
  })

  it('reports option positions across groups', async () => {
    render(
      <Autocomplete
        id="virtual-autocomplete"
        groups={['First group', 'Second group']}
        data={[
          { content: 'First', groupIndex: 0 },
          { content: 'Second', groupIndex: 1 },
        ]}
        listDriver={listDriver}
        open
        noAnimation
        skipPortal
      />
    )

    await waitFor(() => {
      expect(document.querySelectorAll('[role="option"]')).toHaveLength(2)
    })

    const options = document.querySelectorAll('[role="option"]')
    expect(options[0]).toHaveAttribute('aria-posinset', '1')
    expect(options[1]).toHaveAttribute('aria-posinset', '2')
    expect(options[1]).toHaveAttribute('aria-setsize', '2')
  })

  it('renders a window for Dropdown', async () => {
    render(
      <Dropdown
        id="virtual-dropdown"
        data={data}
        listDriver={listDriver}
        open
        noAnimation
        skipPortal
      />
    )

    await waitFor(() => {
      expect(
        document.querySelectorAll('[role="option"]')
      ).not.toHaveLength(0)
    })
    const options = document.querySelectorAll('[role="option"]')

    expect(options.length).toBeGreaterThan(0)
    expect(options.length).toBeLessThan(data.length)
  })

  it('has valid accessibility semantics', async () => {
    const result = render(
      <Autocomplete
        id="virtual-autocomplete"
        label="Items"
        data={data}
        listDriver={listDriver}
        open
        noAnimation
        skipPortal
      />
    )

    await waitFor(() => {
      expect(document.querySelector('[role="option"]')).toBeInTheDocument()
    })
    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('falls back to optionsRender when both APIs are provided', () => {
    render(
      <Autocomplete
        id="virtual-autocomplete"
        data={data.slice(0, 3)}
        listDriver={listDriver}
        optionsRender={({ Items }) => (
          <>
            <Items />
          </>
        )}
        open
        noAnimation
        skipPortal
      />
    )

    expect(document.querySelectorAll('[role="option"]')).toHaveLength(3)
  })
})
