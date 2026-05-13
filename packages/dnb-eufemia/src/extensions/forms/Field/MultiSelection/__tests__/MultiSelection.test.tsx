import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { afterAll, beforeEach, vi } from 'vitest'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { Provider } from '../../../../../shared'
import { Field, Form } from '../../..'

const originalScrollIntoView = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'scrollIntoView'
)

const scrollIntoViewMock = vi.fn()

Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: scrollIntoViewMock,
  writable: true,
})

describe('MultiSelection', () => {
  beforeEach(() => {
    scrollIntoViewMock.mockClear()
  })

  afterAll(() => {
    if (originalScrollIntoView) {
      Object.defineProperty(
        HTMLElement.prototype,
        'scrollIntoView',
        originalScrollIntoView
      )
      return
    }

    delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView
  })

  it('renders with label and trigger button', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(
      <Provider locale="en-GB">
        <Field.MultiSelection label="Select items" data={data} />
      </Provider>
    )

    expect(screen.getByText('Select items')).toBeInTheDocument()

    await waitFor(
      () => {
        expect(
          document.querySelector('.dnb-dropdown__text__inner')
        ).toHaveTextContent('0 of 2 selected')
      },
      { timeout: 3000 }
    )
  })

  it('renders trigger with dropdown styling classes', () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(<Field.MultiSelection data={data} />)

    const triggerButton = screen.getByRole('button')
    expect(triggerButton).toHaveClass('dnb-dropdown__trigger')

    const shell = triggerButton.closest('.dnb-dropdown__shell')
    expect(shell).toBeInTheDocument()

    const wrapper = shell?.closest('.dnb-dropdown--stretch')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('dnb-dropdown--icon-position-right')
  })

  it('opens popover when label is clicked', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(<Field.MultiSelection label="Select items" data={data} />)

    fireEvent.click(screen.getByText('Select items'))

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('opens popover when trigger button is clicked', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(<Field.MultiSelection data={data} />)

    const triggerButton = screen.getByRole('button')
    fireEvent.click(triggerButton)

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('exposes the selection count through aria-describedby in the zero-selected state', () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
      { value: 'option3', title: 'Option 3' },
      { value: 'option4', title: 'Option 4' },
      { value: 'option5', title: 'Option 5' },
    ]

    const { container } = render(
      <Provider locale="en-GB">
        <Field.MultiSelection label="Select items" data={data} />
      </Provider>
    )

    const triggerButton = screen.getByRole('button')
    const describedBy = triggerButton.getAttribute('aria-describedby')
    const selectionCountId = `${triggerButton.id}-selection-count`

    expect(describedBy).toBeTruthy()
    expect(describedBy).toContain(selectionCountId)

    const selectionCount = container.querySelector(`#${selectionCountId}`)
    const visibleCount = container.querySelector(
      '.dnb-dropdown__text.dnb-button__text'
    )

    expect(selectionCount).toHaveTextContent('0 of 5 selected')
    expect(selectionCount).toHaveClass('dnb-sr-only')
    expect(visibleCount).toHaveAttribute('aria-hidden', 'true')
  })

  it('updates the described selection count after selecting an item', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    const { container } = render(
      <Provider locale="en-GB">
        <Field.MultiSelection label="Select items" data={data} />
      </Provider>
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const firstItem = document.querySelector(
      '.dnb-forms-field-multi-selection__item'
    ) as HTMLElement

    fireEvent.click(firstItem)

    await waitFor(
      () => {
        const selectionCount = container.querySelector(
          '.dnb-sr-only[id$="-selection-count"]'
        )

        expect(selectionCount).toHaveTextContent('1 of 2 selected')
        expect(
          document.querySelector('.dnb-dropdown__text__inner')
        ).toHaveTextContent('1 of 2 selected')
      },
      { timeout: 3000 }
    )
  })

  it('announces the checked count after a selection change', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(
      <Provider locale="en-GB">
        <Field.MultiSelection data={data} />
      </Provider>
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const firstItem = document.querySelector(
      '.dnb-forms-field-multi-selection__item'
    ) as HTMLElement

    fireEvent.click(firstItem)

    await waitFor(
      () => {
        expect(document.querySelector('.dnb-aria-live')).toHaveTextContent(
          '1 of 2 selected'
        )
      },
      { timeout: 3000 }
    )
  })

  it('opens popover and focuses first checkbox when pressing ArrowDown on the trigger', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(<Field.MultiSelection data={data} />)

    const triggerButton = screen.getByRole('button')
    triggerButton.focus()

    fireEvent.keyDown(triggerButton, { key: 'ArrowDown' })

    await waitFor(
      () => {
        const firstCheckbox = document.querySelector(
          '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
        )

        expect(screen.getByText('Option 1')).toBeInTheDocument()
        expect(document.activeElement).toBe(firstCheckbox)
      },
      { timeout: 3000 }
    )
  })

  it('opens popover and focuses last checkbox when pressing ArrowUp on the trigger', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(<Field.MultiSelection data={data} />)

    const triggerButton = screen.getByRole('button')
    triggerButton.focus()

    fireEvent.keyDown(triggerButton, { key: 'ArrowUp' })

    await waitFor(
      () => {
        const checkboxes = document.querySelectorAll(
          '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
        )

        expect(screen.getByText('Option 1')).toBeInTheDocument()
        expect(document.activeElement).toBe(checkboxes[1])
      },
      { timeout: 3000 }
    )
  })

  describe('width', () => {
    it('applies the requested field width', () => {
      const data = [{ value: 'option1', title: 'Option 1' }]

      const { container } = render(
        <Field.MultiSelection data={data} width="medium" />
      )

      expect(
        container.querySelector(
          '.dnb-forms-field-block__contents--width-medium'
        )
      ).toBeInTheDocument()
    })
  })

  it('toggles an item when its row is clicked', async () => {
    const data = [
      {
        value: 'option1',
        title: 'Option 1',
        text: 'Additional details',
      },
    ]

    render(
      <Provider locale="en-GB">
        <Field.MultiSelection data={data} />
      </Provider>
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const item = document.querySelector(
      '.dnb-forms-field-multi-selection__item'
    ) as HTMLElement

    fireEvent.click(item)

    await waitFor(
      () => {
        expect(
          document.querySelector('.dnb-dropdown__text__inner')
        ).toHaveTextContent('1 of 1 selected')
      },
      { timeout: 3000 }
    )
  })

  describe('showConfirmButton', () => {
    it('shows confirm and cancel buttons in popover when showSearchField is true', async () => {
      const data = [{ value: 'option1', title: 'Option 1' }]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            showSearchField
            showConfirmButton
          />
        </Provider>
      )

      const triggerButton = screen.getByRole('button')
      fireEvent.click(triggerButton)

      await waitFor(
        () => {
          expect(
            screen.getByText('Confirm (0 selected)')
          ).toBeInTheDocument()
          expect(screen.getByText('Cancel')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('renders Hr separators between popover sections', async () => {
      const data = [{ value: 'option1', title: 'Option 1' }]

      render(
        <Field.MultiSelection
          data={data}
          showSearchField
          showSelectedTags
          showConfirmButton
        />
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(document.querySelectorAll('.dnb-hr')).toHaveLength(3)
        },
        { timeout: 3000 }
      )
    })

    it('does not update trigger count until confirm button is clicked', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection data={data} showConfirmButton />
        </Provider>
      )

      const triggerButton = screen.getByRole('button')

      // Initially 0 selected
      await waitFor(
        () => {
          expect(
            document.querySelector('.dnb-dropdown__text__inner')
          ).toHaveTextContent('0 of 2 selected')
        },
        { timeout: 3000 }
      )

      // Open popover and select an item
      fireEvent.click(triggerButton)

      await waitFor(
        () => {
          expect(screen.getByText('Option 1')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const option1Checkbox = screen.getByRole('checkbox', {
        name: /Option 1/,
      })
      fireEvent.click(option1Checkbox)

      // Trigger count should still be 0 (not 1) because showConfirmButton is enabled
      expect(
        document.querySelector('.dnb-dropdown__text__inner')
      ).toHaveTextContent('0 of 2 selected')

      // Click confirm to apply the change
      const confirmButton = screen.getByText(/Confirm/)
      fireEvent.click(confirmButton)

      // Now trigger count should be 1
      await waitFor(
        () => {
          expect(
            document.querySelector('.dnb-dropdown__text__inner')
          ).toHaveTextContent('1 of 2 selected')
        },
        { timeout: 3000 }
      )
    })
  })

  describe('showSelectAll', () => {
    it('shows Select all checkbox in popover', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection data={data} showSelectAll />
        </Provider>
      )

      const triggerButton = screen.getByRole('button')
      fireEvent.click(triggerButton)

      await waitFor(
        () => {
          expect(screen.getByText('Select all')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('includes the Select all checkbox in ArrowDown and ArrowUp navigation', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection data={data} showSelectAll />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText('Select all')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const checkboxes = document.querySelectorAll(
        '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
      )

      const selectAllCheckbox = checkboxes[0] as HTMLElement
      const firstItemCheckbox = checkboxes[1] as HTMLElement

      selectAllCheckbox.focus()
      fireEvent.keyDown(selectAllCheckbox, { key: 'ArrowDown' })
      expect(document.activeElement).toBe(firstItemCheckbox)

      fireEvent.keyDown(firstItemCheckbox, { key: 'ArrowUp' })
      expect(document.activeElement).toBe(selectAllCheckbox)
    })

    it('selects all items when clicking Select all checkbox', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection data={data} showSelectAll />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText('Select all')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const selectAllCheckbox = document.querySelector(
        '.dnb-forms-field-multi-selection__item--select-all .dnb-checkbox__input'
      ) as HTMLInputElement

      fireEvent.click(selectAllCheckbox)

      await waitFor(
        () => {
          const allCheckboxes =
            document.querySelectorAll<HTMLInputElement>(
              '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
            )
          allCheckboxes.forEach((checkbox) => {
            expect(checkbox.checked).toBe(true)
          })
        },
        { timeout: 3000 }
      )
    })

    it('excludes disabled items from Select all', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2', disabled: true },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection data={data} showSelectAll />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText('Select all')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const selectAllCheckbox = document.querySelector(
        '.dnb-forms-field-multi-selection__item--select-all .dnb-checkbox__input'
      ) as HTMLInputElement

      fireEvent.click(selectAllCheckbox)

      await waitFor(
        () => {
          const enabledCheckbox = document.querySelector<HTMLInputElement>(
            '.dnb-forms-field-multi-selection__item:not(.--disabled):not(.--select-all) .dnb-checkbox__input'
          )
          const disabledCheckbox =
            document.querySelector<HTMLInputElement>(
              '.dnb-forms-field-multi-selection__item--disabled .dnb-checkbox__input'
            )
          expect(enabledCheckbox?.checked).toBe(true)
          expect(disabledCheckbox?.checked).toBe(false)
          expect(disabledCheckbox?.disabled).toBe(true)
        },
        { timeout: 3000 }
      )
    })
  })

  describe('disabled', () => {
    it('disables component when disabled prop is true', () => {
      const data = [{ value: 'option1', title: 'Option 1' }]

      render(<Field.MultiSelection data={data} disabled />)

      const triggerButton = screen.getByRole('button')
      expect(triggerButton).toBeDisabled()
    })
  })

  it('focuses first and last checkbox when pressing ArrowDown and ArrowUp after mouse-open', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(<Field.MultiSelection data={data} />)

    const triggerButton = screen.getByRole('button')
    fireEvent.click(triggerButton)

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const checkboxes = document.querySelectorAll(
      '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
    )
    const firstCheckbox = checkboxes[0] as HTMLElement
    const lastCheckbox = checkboxes[1] as HTMLElement

    triggerButton.focus()
    fireEvent.keyDown(triggerButton, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(firstCheckbox)

    triggerButton.focus()
    fireEvent.keyDown(triggerButton, { key: 'ArrowUp' })
    expect(document.activeElement).toBe(lastCheckbox)
  })

  it('focuses checkbox when pressing ArrowDown on an item', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(<Field.MultiSelection data={data} />)

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const itemDivs = document.querySelectorAll(
      '.dnb-forms-field-multi-selection__item:not(.--select-all)'
    )
    const firstItem = itemDivs[0] as HTMLElement

    fireEvent.keyDown(firstItem, { key: 'ArrowDown' })

    const checkbox = firstItem.querySelector('input[type="checkbox"]')
    expect(document.activeElement).toBe(checkbox)
  })

  it('navigates between checkbox items with ArrowDown and ArrowUp', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
      { value: 'option3', title: 'Option 3' },
    ]

    render(<Field.MultiSelection data={data} />)

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const checkboxes = document.querySelectorAll(
      '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
    )

    const firstCheckbox = checkboxes[0] as HTMLElement
    const secondCheckbox = checkboxes[1] as HTMLElement
    const thirdCheckbox = checkboxes[2] as HTMLElement

    firstCheckbox.focus()
    fireEvent.keyDown(firstCheckbox, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(secondCheckbox)

    fireEvent.keyDown(secondCheckbox, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(thirdCheckbox)

    fireEvent.keyDown(thirdCheckbox, { key: 'ArrowUp' })
    expect(document.activeElement).toBe(secondCheckbox)
  })

  it('wraps keyboard navigation from last item to first and back', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
      { value: 'option3', title: 'Option 3' },
    ]

    render(<Field.MultiSelection data={data} />)

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const checkboxes = document.querySelectorAll(
      '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
    )

    const firstCheckbox = checkboxes[0] as HTMLElement
    const lastCheckbox = checkboxes[checkboxes.length - 1] as HTMLElement

    lastCheckbox.focus()
    fireEvent.keyDown(lastCheckbox, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(firstCheckbox)

    firstCheckbox.focus()
    fireEvent.keyDown(firstCheckbox, { key: 'ArrowUp' })
    expect(document.activeElement).toBe(lastCheckbox)
  })

  it('scrolls the focused item into view during keyboard navigation', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
      { value: 'option3', title: 'Option 3' },
    ]

    render(<Field.MultiSelection data={data} />)

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const checkboxes = document.querySelectorAll(
      '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
    )

    const firstCheckbox = checkboxes[0] as HTMLElement
    const secondCheckbox = checkboxes[1] as HTMLElement
    const secondItem = secondCheckbox.closest(
      '.dnb-forms-field-multi-selection__item'
    ) as HTMLElement

    firstCheckbox.focus()
    fireEvent.keyDown(firstCheckbox, { key: 'ArrowDown' })

    expect(document.activeElement).toBe(secondCheckbox)
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1)
    expect(scrollIntoViewMock.mock.instances[0]).toBe(secondItem)
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
    })
  })

  it('navigates nested checkbox items in rendered order with ArrowDown and ArrowUp', async () => {
    const data = [
      {
        value: 'group1',
        title: 'Group 1',
        children: [
          { value: 'child1', title: 'Child 1' },
          { value: 'child2', title: 'Child 2' },
        ],
      },
      { value: 'option2', title: 'Option 2' },
    ]

    render(<Field.MultiSelection data={data} />)

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        expect(screen.getByText('Group 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const checkboxes = document.querySelectorAll(
      '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
    )

    const parentCheckbox = checkboxes[0] as HTMLElement
    const firstChildCheckbox = checkboxes[1] as HTMLElement
    const secondChildCheckbox = checkboxes[2] as HTMLElement
    const lastCheckbox = checkboxes[3] as HTMLElement

    parentCheckbox.focus()
    fireEvent.keyDown(parentCheckbox, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(firstChildCheckbox)

    fireEvent.keyDown(firstChildCheckbox, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(secondChildCheckbox)

    fireEvent.keyDown(secondChildCheckbox, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(lastCheckbox)

    fireEvent.keyDown(lastCheckbox, { key: 'ArrowUp' })
    expect(document.activeElement).toBe(secondChildCheckbox)
  })

  describe('showSearchField', () => {
    it('filters on description text', async () => {
      const data = [
        {
          value: 'option1',
          title: 'Option 1',
          description: 'Matches search',
        },
        {
          value: 'option2',
          title: 'Option 2',
        },
      ]

      render(<Field.MultiSelection data={data} showSearchField />)

      fireEvent.click(screen.getByRole('button'))

      const input = document.querySelector('input') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'matches' } })

      await waitFor(
        () => {
          expect(screen.getByText('Option 1')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
    })

    it('focuses the search input when pressing ArrowDown on the trigger with showSearchField', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(<Field.MultiSelection data={data} showSearchField />)

      const triggerButton = screen.getByRole('button')
      triggerButton.focus()

      fireEvent.keyDown(triggerButton, { key: 'ArrowDown' })

      await waitFor(
        () => {
          const searchInput = document.querySelector(
            '.dnb-forms-field-multi-selection__search input'
          ) as HTMLInputElement

          expect(screen.getByText('Option 1')).toBeInTheDocument()
          expect(document.activeElement).toBe(searchInput)
        },
        { timeout: 3000 }
      )
    })

    it('moves focus from the search input to the first checkbox on ArrowDown', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(<Field.MultiSelection data={data} showSearchField />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText('Option 1')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const searchInput = document.querySelector(
        '.dnb-forms-field-multi-selection__search input'
      ) as HTMLInputElement
      const firstCheckbox = document.querySelector(
        '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
      ) as HTMLInputElement

      searchInput.focus()
      fireEvent.keyDown(searchInput, { key: 'ArrowDown' })

      expect(document.activeElement).toBe(firstCheckbox)
    })

    it('moves focus from the first checkbox back to the search input on ArrowUp', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(<Field.MultiSelection data={data} showSearchField />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText('Option 1')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const searchInput = document.querySelector(
        '.dnb-forms-field-multi-selection__search input'
      ) as HTMLInputElement
      const firstCheckbox = document.querySelector(
        '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
      ) as HTMLInputElement

      firstCheckbox.focus()
      fireEvent.keyDown(firstCheckbox, { key: 'ArrowUp' })

      expect(document.activeElement).toBe(searchInput)
    })

    it('does not call scrollIntoView when navigating to the search input', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(<Field.MultiSelection data={data} showSearchField />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText('Option 1')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const firstCheckbox = document.querySelector(
        '.dnb-forms-field-multi-selection__items .dnb-checkbox__input'
      ) as HTMLInputElement

      firstCheckbox.focus()
      scrollIntoViewMock.mockClear()
      fireEvent.keyDown(firstCheckbox, { key: 'ArrowUp' })

      expect(scrollIntoViewMock).not.toHaveBeenCalled()
    })

    it('registers ArrowDown navigation as keyboard input after mouse-open', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(<Field.MultiSelection data={data} showSearchField />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText('Option 1')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const searchInput = document.querySelector(
        '.dnb-forms-field-multi-selection__search input'
      ) as HTMLInputElement

      window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
      expect(document.documentElement.getAttribute('data-whatinput')).toBe(
        'mouse'
      )

      searchInput.focus()
      window.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
        })
      )

      expect(document.documentElement.getAttribute('data-whatinput')).toBe(
        'keyboard'
      )
    })

    it('switches back to mouse input after mouse interaction', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(<Field.MultiSelection data={data} showSearchField />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText('Option 1')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const searchInput = document.querySelector(
        '.dnb-forms-field-multi-selection__search input'
      ) as HTMLInputElement
      const popoverContent = document.querySelector(
        '.dnb-forms-field-multi-selection__popover-content'
      ) as HTMLElement

      searchInput.focus()
      window.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
        })
      )
      expect(document.documentElement.getAttribute('data-whatinput')).toBe(
        'keyboard'
      )

      popoverContent.dispatchEvent(
        new MouseEvent('mousedown', {
          bubbles: true,
        })
      )

      expect(document.documentElement.getAttribute('data-whatinput')).toBe(
        'mouse'
      )
    })

    it('filters on JSX elements in title, text, and description', async () => {
      const data = [
        {
          value: 'option1',
          title: <strong>Bold Title</strong>,
          text: <em>Italic text</em>,
          description: <span>Span description</span>,
        },
        {
          value: 'option2',
          title: 'Option 2',
        },
      ]

      render(<Field.MultiSelection data={data} showSearchField />)

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText(/Bold Title/)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const input = document.querySelector('input') as HTMLInputElement

      // Search for text within JSX title
      fireEvent.change(input, { target: { value: 'bold' } })

      await waitFor(
        () => {
          expect(screen.getByText(/Bold Title/)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      expect(screen.queryByText('Option 2')).not.toBeInTheDocument()

      // Search for text in description
      fireEvent.change(input, { target: { value: 'span' } })

      await waitFor(
        () => {
          expect(screen.getByText(/Span description/)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
    })
  })

  describe('minItems', () => {
    it('shows error when minItems is not met', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            minItems={2}
            validateInitially
            value={['option1']}
          />
        </Provider>
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('You must select at least 2 items.')
      })
    })

    it('shows custom error message for minItems', async () => {
      const data = [{ value: 'option1', title: 'Option 1' }]
      const customError = 'Please select at least two items'

      render(
        <Field.MultiSelection
          data={data}
          minItems={2}
          validateInitially
          value={['option1']}
          errorMessages={{ minItems: customError }}
        />
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(customError)
      })
    })
  })

  describe('maxItems', () => {
    it('shows error when maxItems is exceeded', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
        { value: 'option3', title: 'Option 3' },
      ]

      render(
        <Provider locale="en-GB">
          <Form.Handler>
            <Field.MultiSelection
              data={data}
              maxItems={1}
              value={['option1', 'option2']}
              path="/items"
            />
          </Form.Handler>
        </Provider>
      )

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('You cannot select more than 1 items.')
      })
    })
  })

  it('renders items using semantic ul and li elements', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(<Field.MultiSelection label="Select items" data={data} />)

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        const list = document.querySelector(
          '.dnb-forms-field-multi-selection__list'
        )
        expect(list).toBeInTheDocument()
        expect(list?.tagName).toBe('UL')
      },
      { timeout: 3000 }
    )

    const items = document.querySelectorAll(
      '.dnb-forms-field-multi-selection__list > li'
    )
    expect(items.length).toBeGreaterThan(0)
    items.forEach((item) => {
      expect(item.tagName).toBe('LI')
    })
  })

  it('passes axe validation', async () => {
    const data = [{ value: 'option1', title: 'Option 1' }]

    const { container } = render(
      <Field.MultiSelection label="Select items" data={data} />
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })

  it('passes axe validation with nested items', async () => {
    const data = [
      {
        value: 'group1',
        title: 'Group 1',
        children: [
          { value: 'child1', title: 'Child 1' },
          { value: 'child2', title: 'Child 2' },
        ],
      },
      { value: 'option2', title: 'Option 2' },
    ]

    const { container } = render(
      <Field.MultiSelection label="Select items" data={data} />
    )

    expect(await axeComponent(container)).toHaveNoViolations()
  })

  it('shows "no options" message when search has no results', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(
      <Field.MultiSelection
        label="Select items"
        data={data}
        showSearchField
      />
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const input = document.querySelector('input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'nonexistent' } })

    await waitFor(
      () => {
        expect(screen.getByText('Ingen alternativer')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
  })

  it('displays accessible no options message with proper structure', async () => {
    const data = [
      { value: 'option1', title: 'Option 1' },
      { value: 'option2', title: 'Option 2' },
    ]

    render(
      <Field.MultiSelection
        label="Select items"
        data={data}
        showSearchField
      />
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(
      () => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    const input = document.querySelector('input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'xyz' } })

    await waitFor(
      () => {
        const noOptionsItem = document.querySelector(
          '.dnb-forms-field-multi-selection__no-options'
        )
        expect(noOptionsItem).toBeInTheDocument()
        expect(noOptionsItem?.tagName).toBe('LI')

        const noOptionsText = noOptionsItem?.querySelector(
          '.dnb-forms-field-multi-selection__no-options-text'
        )
        expect(noOptionsText).toBeInTheDocument()
        expect(noOptionsText?.tagName).toBe('P')
        expect(noOptionsText).toHaveTextContent('Ingen alternativer')
      },
      { timeout: 3000 }
    )
  })

  describe('nested items with parent behavior', () => {
    it('does not include parent value when only some children are selected (indeterminate)', async () => {
      const handleChange = vi.fn()
      const data = [
        {
          value: 'scandinavia',
          title: 'Scandinavia',
          children: [
            { value: 'oslo', title: 'Oslo' },
            { value: 'stockholm', title: 'Stockholm' },
          ],
        },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection data={data} onChange={handleChange} />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText('Scandinavia')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      // Get child items (level 1) and find Oslo
      const childItems = document.querySelectorAll(
        '.dnb-forms-field-multi-selection__item--level-1'
      ) as NodeListOf<HTMLElement>

      const osloItem = Array.from(childItems).find((item) =>
        item.textContent?.includes('Oslo')
      )

      if (osloItem) {
        fireEvent.click(osloItem)
      }

      await waitFor(
        () => {
          const calls = handleChange.mock.calls
          expect(calls.length).toBeGreaterThan(0)
          const firstCall = calls[0]
          expect(firstCall[0]).toEqual(['oslo'])
        },
        { timeout: 3000 }
      )

      // Parent should NOT be included, only the child
      expect(handleChange).not.toHaveBeenCalledWith([
        'scandinavia',
        'oslo',
      ])
    })

    it('includes parent value when all children are selected by clicking parent', async () => {
      const handleChange = vi.fn()
      const data = [
        {
          value: 'scandinavia',
          title: 'Scandinavia',
          children: [
            { value: 'oslo', title: 'Oslo' },
            { value: 'stockholm', title: 'Stockholm' },
          ],
        },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection data={data} onChange={handleChange} />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(screen.getByText('Scandinavia')).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      // Get parent items (no level class) and find Scandinavia
      const allItems = document.querySelectorAll(
        '.dnb-forms-field-multi-selection__item'
      ) as NodeListOf<HTMLElement>

      const parentItem = Array.from(allItems).find((item) => {
        // Parent items don't have level classes
        const hasLevel =
          item.classList.contains(
            'dnb-forms-field-multi-selection__item--level-1'
          ) ||
          item.classList.contains(
            'dnb-forms-field-multi-selection__item--level-2'
          )
        return !hasLevel && item.textContent?.includes('Scandinavia')
      })

      if (parentItem) {
        fireEvent.click(parentItem)
      }

      await waitFor(
        () => {
          // Verify handleChange was called with all three values
          const calls = handleChange.mock.calls
          expect(calls.length).toBeGreaterThan(0)
          const lastCall = calls[calls.length - 1]
          const callValue = lastCall[0]

          expect(callValue).toContain('scandinavia')
          expect(callValue).toContain('oslo')
          expect(callValue).toContain('stockholm')
        },
        { timeout: 3000 }
      )
    })
  })

  describe('selectedItemsCollapsibleThreshold', () => {
    it('shows toggle button and clear all when total items exceed threshold', async () => {
      const data = Array.from({ length: 25 }, (_, i) => ({
        value: `option${i + 1}`,
        title: `Option ${i + 1}`,
      }))

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            showSelectedTags
            value={data.slice(0, 22).map((item) => item.value)}
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(
            document.querySelector(
              '.dnb-forms-field-multi-selection__selected-items-header'
            )
          ).toBeInTheDocument()
          expect(
            document.querySelector(
              '.dnb-forms-field-multi-selection__selected-items-header button:last-child'
            )
          ).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('shows tags by default when total items exceed threshold', async () => {
      const data = Array.from({ length: 25 }, (_, i) => ({
        value: `option${i + 1}`,
        title: `Option ${i + 1}`,
      }))

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            showSelectedTags
            value={data.slice(0, 22).map((item) => item.value)}
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(
            document.querySelector(
              '.dnb-forms-field-multi-selection__selected-items-header'
            )
          ).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('hides tags when toggle button is clicked', async () => {
      const data = Array.from({ length: 25 }, (_, i) => ({
        value: `option${i + 1}`,
        title: `Option ${i + 1}`,
      }))

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            showSelectedTags
            value={data.slice(0, 22).map((item) => item.value)}
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(
            document.querySelector(
              '.dnb-forms-field-multi-selection__selected-items-header'
            )
          ).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const toggleButton = document.querySelector(
        '.dnb-forms-field-multi-selection__selected-items-header button:first-child'
      ) as HTMLElement

      // Initially collapsed
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(toggleButton)

      await waitFor(
        () => {
          expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
        },
        { timeout: 3000 }
      )
    })

    it('clears all items when clear all button is clicked', async () => {
      const data = Array.from({ length: 25 }, (_, i) => ({
        value: `option${i + 1}`,
        title: `Option ${i + 1}`,
      }))

      render(
        <Provider locale="en-GB">
          <Form.Handler>
            <Field.MultiSelection
              data={data}
              showSelectedTags
              path="/items"
              value={data.slice(0, 22).map((item) => item.value)}
            />
          </Form.Handler>
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(
            document.querySelector(
              '.dnb-forms-field-multi-selection__selected-items-header'
            )
          ).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const clearAllButton = document.querySelector(
        '.dnb-forms-field-multi-selection__selected-items-header button:last-child'
      ) as HTMLElement
      fireEvent.click(clearAllButton)

      await waitFor(
        () => {
          expect(
            document.querySelector('.dnb-dropdown__text__inner')
          ).toHaveTextContent('0 of 25 selected')
        },
        { timeout: 3000 }
      )
    })

    it('hides header when no items selected', async () => {
      const data = Array.from({ length: 25 }, (_, i) => ({
        value: `option${i + 1}`,
        title: `Option ${i + 1}`,
      }))

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            showSelectedTags
            value={data.slice(0, 22).map((item) => item.value)}
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(
            document.querySelector(
              '.dnb-forms-field-multi-selection__selected-items-header'
            )
          ).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const clearAllButton = document.querySelector(
        '.dnb-forms-field-multi-selection__selected-items-header button:last-child'
      ) as HTMLElement
      fireEvent.click(clearAllButton)

      await waitFor(
        () => {
          expect(clearAllButton).not.toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('respects custom threshold value', async () => {
      const data = Array.from({ length: 15 }, (_, i) => ({
        value: `option${i + 1}`,
        title: `Option ${i + 1}`,
      }))

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            showSelectedTags
            selectedItemsCollapsibleThreshold={10}
            value={data.slice(0, 12).map((item) => item.value)}
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          // Should show header because 15 total items > 10 threshold
          expect(
            document.querySelector(
              '.dnb-forms-field-multi-selection__selected-items-header'
            )
          ).toBeInTheDocument()
          expect(
            document.querySelector(
              '.dnb-forms-field-multi-selection__selected-items-header button:last-child'
            )
          ).toBeInTheDocument()
        },
        { timeout: 3000 }
      )
    })

    it('does not show toggle when total items do not exceed threshold', async () => {
      const data = Array.from({ length: 15 }, (_, i) => ({
        value: `option${i + 1}`,
        title: `Option ${i + 1}`,
      }))

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            showSelectedTags
            selectedItemsCollapsibleThreshold={20}
            value={data.slice(0, 12).map((item) => item.value)}
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          // Find any option to verify popover opened
          const anyOption = Array.from(
            document.querySelectorAll(
              '.dnb-forms-field-multi-selection__item'
            )
          )[0]
          expect(anyOption).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      // Should not have the header when total items are under threshold
      expect(
        document.querySelector(
          '.dnb-forms-field-multi-selection__selected-items-header'
        )
      ).not.toBeInTheDocument()
    })

    it('shows all tags when selected items do not exceed threshold', async () => {
      const data = Array.from({ length: 15 }, (_, i) => ({
        value: `option${i + 1}`,
        title: `Option ${i + 1}`,
      }))

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            showSelectedTags
            selectedItemsCollapsibleThreshold={20}
            value={data.slice(0, 10).map((item) => item.value)}
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          const tags = document.querySelectorAll(
            '.dnb-forms-field-multi-selection__selected-items .dnb-tag'
          )
          expect(tags.length).toBe(10)
        },
        { timeout: 3000 }
      )
    })

    it('toggle button has aria-expanded and aria-controls linked to selected items container', async () => {
      const data = Array.from({ length: 25 }, (_, i) => ({
        value: `option${i + 1}`,
        title: `Option ${i + 1}`,
      }))

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            showSelectedTags
            value={data.slice(0, 22).map((item) => item.value)}
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(
        () => {
          expect(
            document.querySelector(
              '.dnb-forms-field-multi-selection__accordion'
            )
          ).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const toggleButton = document.querySelector(
        '.dnb-forms-field-multi-selection__accordion'
      ) as HTMLElement

      // Collapsed by default
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

      const controlledId = toggleButton.getAttribute('aria-controls')
      expect(controlledId).toBeTruthy()

      const controlledElement = document.querySelector(
        `[id="${controlledId}"]`
      )
      expect(controlledElement).toBeInTheDocument()
      expect(controlledElement).toHaveClass(
        'dnb-forms-field-multi-selection__selected-items'
      )

      // Expand
      fireEvent.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')

      // Collapse
      fireEvent.click(toggleButton)
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('adaptive popover max-height', () => {
    const mockLayout = ({
      popoverTop,
      popoverBottom = popoverTop + 200,
      viewportHeight = 800,
    }: {
      popoverTop: number
      popoverBottom?: number
      viewportHeight?: number
    }) => {
      const originalInnerHeight = window.innerHeight

      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: viewportHeight,
      })

      const getBoundingClientRectMock = vi
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function (this: HTMLElement) {
          if (
            this.classList.contains(
              'dnb-forms-field-multi-selection__popover-content'
            )
          ) {
            return {
              top: popoverTop,
              left: 0,
              width: 320,
              height: popoverBottom - popoverTop,
              bottom: popoverBottom,
              right: 320,
              x: 0,
              y: popoverTop,
              toJSON: () => null,
            } as DOMRect
          }

          if (this.classList.contains('dnb-dropdown__trigger')) {
            return {
              top: 100,
              left: 0,
              width: 200,
              height: 40,
              bottom: 140,
              right: 200,
              x: 0,
              y: 100,
              toJSON: () => null,
            } as DOMRect
          }

          return {
            top: 0,
            left: 0,
            width: 1024,
            height: 768,
            bottom: 768,
            right: 1024,
            x: 0,
            y: 0,
            toJSON: () => null,
          } as DOMRect
        })

      return () => {
        getBoundingClientRectMock.mockRestore()

        Object.defineProperty(window, 'innerHeight', {
          configurable: true,
          value: originalInnerHeight,
        })
      }
    }

    it('sets --popover-max-height CSS variable when popover opens', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      const cleanup = mockLayout({ popoverTop: 200 })

      try {
        render(
          <Provider locale="en-GB">
            <Field.MultiSelection data={data} />
          </Provider>
        )

        const trigger = screen.getByRole('button')
        fireEvent.click(trigger)

        await waitFor(
          () => {
            const popoverContent = document.querySelector(
              '.dnb-forms-field-multi-selection__popover-content'
            ) as HTMLElement
            expect(popoverContent).toBeInTheDocument()
          },
          { timeout: 3000 }
        )

        await waitFor(
          () => {
            const popoverContent = document.querySelector(
              '.dnb-forms-field-multi-selection__popover-content'
            ) as HTMLElement
            const maxHeightValue = popoverContent?.style.getPropertyValue(
              '--popover-max-height'
            )
            expect(maxHeightValue).toBe(`${800 - 200 - 16}px`)
          },
          { timeout: 3000 }
        )

        return
      } finally {
        cleanup()
      }
    })

    it('only sets max-height if calculated value is greater than 100px', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      const cleanup = mockLayout({ popoverTop: 200 })

      try {
        render(
          <Provider locale="en-GB">
            <Field.MultiSelection data={data} />
          </Provider>
        )

        const trigger = screen.getByRole('button')
        fireEvent.click(trigger)

        await waitFor(
          () => {
            const popoverContent = document.querySelector(
              '.dnb-forms-field-multi-selection__popover-content'
            ) as HTMLElement
            expect(popoverContent).toBeInTheDocument()
          },
          { timeout: 3000 }
        )

        await waitFor(
          () => {
            const popoverContent = document.querySelector(
              '.dnb-forms-field-multi-selection__popover-content'
            ) as HTMLElement
            const maxHeightValue = popoverContent?.style.getPropertyValue(
              '--popover-max-height'
            )

            expect(parseInt(maxHeightValue, 10)).toBeGreaterThan(100)
          },
          { timeout: 3000 }
        )

        return
      } finally {
        cleanup()
      }
    })

    it('keeps --popover-max-height unset when the calculated value is 100px or less', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      const cleanup = mockLayout({ popoverTop: 700 })

      try {
        render(
          <Provider locale="en-GB">
            <Field.MultiSelection data={data} />
          </Provider>
        )

        fireEvent.click(screen.getByRole('button'))

        await waitFor(
          () => {
            const popoverContent = document.querySelector(
              '.dnb-forms-field-multi-selection__popover-content'
            ) as HTMLElement

            expect(popoverContent).toBeInTheDocument()
            expect(
              popoverContent.style.getPropertyValue('--popover-max-height')
            ).toBe('')
          },
          { timeout: 3000 }
        )

        return
      } finally {
        cleanup()
      }
    })
  })

  describe('variant="inline"', () => {
    it('renders checkboxes inline without a popover trigger', () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Field.MultiSelection
          variant="inline"
          label="Select items"
          data={data}
        />
      )

      expect(
        document.querySelector('.dnb-dropdown__trigger')
      ).not.toBeInTheDocument()

      expect(
        document.querySelector('.dnb-forms-field-multi-selection--inline')
      ).toBeInTheDocument()

      expect(
        document.querySelector(
          '.dnb-forms-field-multi-selection__inline-content'
        )
      ).toBeInTheDocument()

      const checkboxes = document.querySelectorAll('.dnb-checkbox')
      expect(checkboxes).toHaveLength(2)
    })

    it('renders as a fieldset for accessibility', () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Field.MultiSelection
          variant="inline"
          label="Select items"
          data={data}
        />
      )

      expect(document.querySelector('fieldset')).toBeInTheDocument()
    })

    it('toggles items directly without a popover', () => {
      const onChange = vi.fn()
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Form.Handler onChange={onChange}>
          <Field.MultiSelection
            variant="inline"
            path="/items"
            data={data}
          />
        </Form.Handler>
      )

      const checkboxes = document.querySelectorAll('.dnb-checkbox__input')
      fireEvent.click(checkboxes[0])

      expect(onChange).toHaveBeenCalledWith(
        { items: ['option1'] },
        expect.anything()
      )
    })

    it('supports showSelectedTags', () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Field.MultiSelection
          variant="inline"
          data={data}
          value={['option1']}
          showSelectedTags
        />
      )

      expect(
        document.querySelector(
          '.dnb-forms-field-multi-selection__selected-items'
        )
      ).toBeInTheDocument()
    })

    it('supports showSelectAll', () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            variant="inline"
            data={data}
            showSelectAll
          />
        </Provider>
      )

      const selectAll = document.querySelector(
        '.dnb-forms-field-multi-selection__item--select-all'
      )
      expect(selectAll).toBeInTheDocument()
    })

    it('supports showSearchField', () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Field.MultiSelection
          variant="inline"
          data={data}
          showSearchField
        />
      )

      const searchInput = document.querySelector(
        '.dnb-forms-field-multi-selection__search input'
      )
      expect(searchInput).toBeInTheDocument()
    })

    it('filters items when searching', () => {
      const data = [
        { value: 'apple', title: 'Apple' },
        { value: 'banana', title: 'Banana' },
        { value: 'cherry', title: 'Cherry' },
      ]

      render(
        <Field.MultiSelection
          variant="inline"
          data={data}
          showSearchField
        />
      )

      const searchInput = document.querySelector(
        '.dnb-forms-field-multi-selection__search input'
      )

      fireEvent.change(searchInput, { target: { value: 'ban' } })

      const items = document.querySelectorAll(
        '.dnb-forms-field-multi-selection__item'
      )
      expect(items).toHaveLength(1)
      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        'Banana'
      )
    })

    it('does not render a popover', () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(<Field.MultiSelection variant="inline" data={data} />)

      expect(
        document.querySelector('.dnb-popover')
      ).not.toBeInTheDocument()
    })

    it('works with Form.Handler', () => {
      const onChange = vi.fn()
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      render(
        <Form.Handler onChange={onChange}>
          <Field.MultiSelection
            variant="inline"
            path="/selection"
            data={data}
          />
        </Form.Handler>
      )

      const checkboxes = document.querySelectorAll('.dnb-checkbox__input')
      fireEvent.click(checkboxes[1])

      expect(onChange).toHaveBeenCalledWith(
        { selection: ['option2'] },
        expect.anything()
      )
    })
  })

  describe('disabled items', () => {
    it('preserves disabled items when "Clear all" is clicked', async () => {
      const onChange = vi.fn()
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2', disabled: true },
        { value: 'option3', title: 'Option 3' },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            value={['option1', 'option2', 'option3']}
            onChange={onChange}
            showSelectedTags
            selectedItemsCollapsibleThreshold={0}
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-forms-field-multi-selection__items')
        ).toBeInTheDocument()
      })

      // Click "Clear all"
      fireEvent.click(screen.getByText('Clear all'))

      // Option 2 (disabled) should still be selected
      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes[0]).not.toBeChecked() // Option 1
        expect(checkboxes[1]).toBeChecked() // Option 2 (disabled)
        expect(checkboxes[2]).not.toBeChecked() // Option 3
      })

      // Verify onChange was called with only the disabled item's value
      expect(onChange).toHaveBeenLastCalledWith(
        ['option2'],
        expect.anything()
      )
    })

    it('does not remove a disabled item via tag click', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2', disabled: true },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            value={['option1', 'option2']}
            showSelectedTags
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-forms-field-multi-selection__items')
        ).toBeInTheDocument()
      })

      // The disabled item's tag should not be removable
      const tags = document.querySelectorAll(
        '.dnb-forms-field-multi-selection__selected-items .dnb-tag'
      )
      expect(tags).toHaveLength(2)

      // The disabled tag should not have the removable variant
      const disabledTag = tags[1]
      expect(disabledTag).not.toHaveClass('dnb-tag--removable')
    })

    it('renders disabled tags as default variant and enabled tags as removable', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2', disabled: true },
        { value: 'option3', title: 'Option 3' },
      ]

      render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            value={['option1', 'option2', 'option3']}
            showSelectedTags
          />
        </Provider>
      )

      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-forms-field-multi-selection__items')
        ).toBeInTheDocument()
      })

      const tags = document.querySelectorAll(
        '.dnb-forms-field-multi-selection__selected-items .dnb-tag'
      )
      expect(tags).toHaveLength(3)

      // Option 1 - enabled, should be removable
      expect(tags[0]).toHaveClass('dnb-tag--removable')
      // Option 2 - disabled, should not be removable
      expect(tags[1]).not.toHaveClass('dnb-tag--removable')
      // Option 3 - enabled, should be removable
      expect(tags[2]).toHaveClass('dnb-tag--removable')
    })
  })

  describe('external value sync', () => {
    it('syncs tempValue when value changes externally while popover is closed', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      const { rerender } = render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            value={['option1']}
          />
        </Provider>
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-dropdown__text__inner')
        ).toHaveTextContent('1 of 2 selected')
      })

      // Change value externally
      rerender(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            value={['option1', 'option2']}
          />
        </Provider>
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-dropdown__text__inner')
        ).toHaveTextContent('2 of 2 selected')
      })

      // Open popover and verify both checkboxes are checked
      fireEvent.click(screen.getByRole('button'))

      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes[0]).toBeChecked()
        expect(checkboxes[1]).toBeChecked()
      })
    })

    it('syncs tempValue on form reset', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      const { container } = render(
        <Provider locale="en-GB">
          <Form.Handler
            defaultData={{ selection: ['option1'] }}
          >
            <Field.MultiSelection
              path="/selection"
              data={data}
            />
          </Form.Handler>
        </Provider>
      )

      await waitFor(() => {
        expect(
          container.querySelector('.dnb-dropdown__text__inner')
        ).toHaveTextContent('1 of 2 selected')
      })

      // Open popover, select option2
      const triggerButton = container.querySelector(
        '.dnb-dropdown__trigger'
      ) as HTMLElement
      fireEvent.click(triggerButton)
      await waitFor(() => {
        expect(screen.getByText('Option 2')).toBeInTheDocument()
      })
      fireEvent.click(
        screen.getByRole('checkbox', { name: /Option 2/ })
      )

      await waitFor(() => {
        expect(
          container.querySelector('.dnb-dropdown__text__inner')
        ).toHaveTextContent('2 of 2 selected')
      })
    })

    it('syncs tempValue for inline variant when value changes externally', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      const { rerender } = render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            variant="inline"
            data={data}
            value={['option1']}
          />
        </Provider>
      )

      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes[0]).toBeChecked()
        expect(checkboxes[1]).not.toBeChecked()
      })

      // Change value externally
      rerender(
        <Provider locale="en-GB">
          <Field.MultiSelection
            variant="inline"
            data={data}
            value={['option1', 'option2']}
          />
        </Provider>
      )

      await waitFor(() => {
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes[0]).toBeChecked()
        expect(checkboxes[1]).toBeChecked()
      })
    })

    it('syncs tempValue when value is cleared externally', async () => {
      const data = [
        { value: 'option1', title: 'Option 1' },
        { value: 'option2', title: 'Option 2' },
      ]

      const { rerender } = render(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            value={['option1', 'option2']}
          />
        </Provider>
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-dropdown__text__inner')
        ).toHaveTextContent('2 of 2 selected')
      })

      // Clear value externally
      rerender(
        <Provider locale="en-GB">
          <Field.MultiSelection
            data={data}
            value={undefined}
          />
        </Provider>
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-dropdown__text__inner')
        ).toHaveTextContent('0 of 2 selected')
      })
    })
  })
})
