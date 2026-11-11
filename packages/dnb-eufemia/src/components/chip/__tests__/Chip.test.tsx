import { createRef } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chip from '../Chip'
import type { ChipElement } from '../types'
import Tooltip from '../../tooltip/Tooltip'
import { Provider } from '../../../shared'
import { axeComponent } from '../../../core/test-utils/testSetup'

describe('Chip', () => {
  it('uses a native toggle button for addable chips and submits only the selected value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onSubmit = vi.fn((event) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Chip
          variant="addable"
          name="filters"
          value={0}
          onChange={onChange}
        >
          Savings
        </Chip>
      </form>
    )
    const button = document.querySelector('button')
    const form = document.querySelector('form')
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAccessibleName('Savings')
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(
      document.querySelector('input[type="checkbox"]')
    ).not.toBeInTheDocument()
    expect(new FormData(form).getAll('filters')).toEqual([])

    await user.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(onChange).toHaveBeenLastCalledWith({
      checked: true,
      value: 0,
      event: expect.objectContaining({
        currentTarget: null,
        target: button,
      }),
    })
    expect(new FormData(form).getAll('filters')).toEqual(['0'])

    await user.keyboard(' ')
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(new FormData(form).getAll('filters')).toEqual([])
    await user.keyboard('{Enter}')
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it.each(['default', 'small', 'medium', 'large'] as const)(
    'supports the %s size without passing it to the native input',
    (size) => {
      render(<Chip size={size}>Savings</Chip>)
      expect(document.querySelector('.dnb-chip')).toHaveClass(
        `dnb-chip--size-${size}`
      )
      expect(document.querySelector('input')).not.toHaveAttribute('size')
    }
  )

  it.each(['default', 'radio', 'addable'] as const)(
    'keeps a %s suffix outside the label and preserves all descriptions',
    async (variant) => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(
        <>
          <p id="hint">Choose an account</p>
          <Chip
            id="account"
            variant={variant}
            aria-describedby="hint"
            status="Select an option"
            suffix={<button type="button">About savings</button>}
            onChange={onChange}
            right="small"
          >
            Savings
          </Chip>
        </>
      )
      const input = document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
      const suffix = document.querySelector<HTMLElement>(
        '.dnb-chip__suffix'
      )
      expect(input).toHaveAccessibleName('Savings')
      expect(input).toHaveAccessibleDescription(
        'Choose an account About savings Select an option'
      )
      expect(
        document.querySelector('.dnb-chip__content, label')
      ).not.toContainElement(suffix)
      expect(document.querySelector('.dnb-chip')).not.toContainElement(
        suffix
      )
      expect(document.querySelector('.dnb-chip__wrapper')).toHaveClass(
        'dnb-space__right--small'
      )
      expect(document.querySelector('.dnb-chip')).not.toHaveClass(
        'dnb-space__right--small'
      )
      await user.click(suffix.querySelector('button'))
      expectSelected(input, false)
      expect(onChange).not.toHaveBeenCalled()
      await user.click(input)
      expect(onChange).toHaveBeenCalledTimes(1)
    }
  )

  it.each(['default', 'radio', 'addable'] as const)(
    'preserves numeric values in %s events and serializes native form values',
    async (variant) => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(
        <form>
          <Chip
            variant={variant}
            name="account"
            value={0}
            onChange={onChange}
          >
            Savings
          </Chip>
        </form>
      )
      await user.click(
        document.querySelector<ChipElement>(
          'input:not([type="hidden"]), .dnb-chip__button'
        )
      )
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 0, checked: true })
      )
      expect(
        new FormData(document.querySelector('form')).get('account')
      ).toBe('0')
    }
  )

  it.each(['default', 'checkbox'] as const)(
    'provides a named native checkbox for %s',
    (variant) => {
      render(<Chip variant={variant}>Savings</Chip>)

      const input = document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
      expect(input).toHaveAttribute('type', 'checkbox')
      expect(input).toHaveAccessibleName('Savings')
      expectSelected(input, false)
      expect(
        document.querySelectorAll<ChipElement>(
          'input:not([type="hidden"]), .dnb-chip__button'
        )
      ).toHaveLength(1)
      expect(document.querySelector('button')).not.toBeInTheDocument()
    }
  )

  it('supports text and children, preserving an explicit empty text', () => {
    const { rerender } = render(<Chip>Savings</Chip>)
    expect(document.querySelector('input')).toHaveAccessibleName('Savings')

    rerender(<Chip text="Funds" />)
    expect(document.querySelector('input')).toHaveAccessibleName('Funds')

    rerender(<Chip text="Funds">Savings</Chip>)
    expect(document.querySelector('input')).toHaveAccessibleName('Funds')

    rerender(
      <Chip text="" aria-label="Funds">
        Savings
      </Chip>
    )
    expect(document.querySelector('.dnb-chip__text')).toBeEmptyDOMElement()
  })

  it.each(['default', 'addable', 'radio', 'checkbox'] as const)(
    'hides only the text when %s uses labelSrOnly',
    (variant) => {
      render(
        <Chip variant={variant} icon="bell" labelSrOnly>
          Notifications
        </Chip>
      )

      expect(
        document.querySelector<ChipElement>(
          'input:not([type="hidden"]), .dnb-chip__button'
        )
      ).toHaveAccessibleName('Notifications')
      expect(document.querySelector('.dnb-chip__text')).toHaveClass(
        'dnb-sr-only'
      )
      expect(
        document.querySelector('.dnb-chip__content, label')
      ).not.toHaveClass('dnb-sr-only')
      expect(document.querySelector('.dnb-chip__icon')).toBeInTheDocument()
    }
  )

  it.each(['default', 'radio', 'addable'] as const)(
    'shows a tooltip on %s input focus and preserves existing descriptions and refs',
    async (variant) => {
      const user = userEvent.setup()
      const ref = createRef<ChipElement>()
      render(
        <>
          <p id="description">Choose an account</p>
          <Chip
            ref={ref}
            variant={variant}
            id="chip"
            status="Select an option"
            aria-describedby="description"
            tooltip={
              <Tooltip showDelay={0} hideDelay={0}>
                <strong>Earn interest</strong> on your savings
              </Tooltip>
            }
          >
            Savings
          </Chip>
        </>
      )
      const input = document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
      expect(ref.current).toBe(input)
      expect(input).not.toHaveAttribute('tooltip')
      await user.tab()

      await waitFor(() => {
        expect(input).toHaveAccessibleDescription(
          'Choose an account Select an option Earn interest on your savings'
        )
      })
      expect(
        document.querySelector('[role="tooltip"] strong')
      ).toHaveTextContent('Earn interest')
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(input).toHaveAccessibleDescription(
          'Choose an account Select an option'
        )
      })
    }
  )

  it('shows a tooltip on hover without repeating the accessible name', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <Chip icon="bell" labelSrOnly tooltip="Notifications">
        Notifications
      </Chip>
    )
    const input = document.querySelector('input')
    await user.hover(input)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip--active')
      ).toHaveTextContent('Notifications')
    })
    expect(input).toHaveAccessibleName('Notifications')
    expect(input).not.toHaveAttribute('aria-describedby')

    rerender(
      <Chip icon="bell" labelSrOnly>
        Notifications
      </Chip>
    )
    expect(document.querySelector('.dnb-tooltip')).not.toBeInTheDocument()
    expect(input).toHaveAccessibleName('Notifications')
  })

  it.each(['default', 'radio', 'addable'] as const)(
    'moves the tooltip target when switching to %s',
    async (variant) => {
      const user = userEvent.setup()
      const tooltip = <Tooltip showDelay={0}>Earn interest</Tooltip>
      const { rerender } = render(
        <Chip
          variant={variant === 'addable' ? 'default' : 'addable'}
          tooltip={tooltip}
        >
          Savings
        </Chip>
      )

      rerender(
        <Chip variant={variant} tooltip={tooltip}>
          Savings
        </Chip>
      )
      const input = document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
      await user.tab()
      await waitFor(() => {
        expect(input).toHaveAccessibleDescription('Earn interest')
      })
    }
  )

  it('toggles with pointer and Space and emits the current value once', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Chip value="savings" onChange={onChange}>
        Savings
      </Chip>
    )
    const input = document.querySelector('input')

    await user.click(document.querySelector('label'))
    expect(input).toBeChecked()
    expect(onChange).toHaveBeenLastCalledWith({
      checked: true,
      value: 'savings',
      event: expect.any(Object),
    })

    await user.keyboard(' ')
    expect(input).not.toBeChecked()
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it.each(['default', 'addable'] as const)(
    'updates checked, value and event handler when %s props change',
    async (variant) => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { rerender } = render(
        <Chip variant={variant} checked>
          First
        </Chip>
      )
      const input = document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
      expectSelected(input, true)

      rerender(
        <Chip
          variant={variant}
          checked={false}
          value="second"
          onChange={onChange}
        >
          Second
        </Chip>
      )
      expectSelected(input, false)
      await user.click(input)
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          checked: true,
          value: 'second',
        })
      )
    }
  )

  it.each(['default', 'addable', 'radio', 'checkbox'] as const)(
    'prevents pointer and keyboard changes when %s is readOnly',
    async (variant) => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(
        <Chip variant={variant} readOnly onChange={onChange}>
          Savings
        </Chip>
      )
      const input = document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
      await user.click(input)
      await user.keyboard(' {Enter}')
      expectSelected(input, false)
      expect(onChange).not.toHaveBeenCalled()
      expect(input).toHaveFocus()
      expect(input).toHaveAttribute(
        variant === 'addable' ? 'aria-disabled' : 'readonly'
      )
      expect(input.hasAttribute('readonly')).toBe(variant !== 'addable')
    }
  )

  it('honors disabled and skeleton from Provider and explicit overrides', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Provider
        formElement={{ disabled: true }}
        Chip={{ variant: 'addable' }}
      >
        <Chip onChange={onChange}>Disabled</Chip>
        <Chip disabled={false}>Enabled</Chip>
        <Chip skeleton>Loading</Chip>
      </Provider>
    )
    const inputs = document.querySelectorAll<ChipElement>(
      'input:not([type="hidden"]), .dnb-chip__button'
    )
    expect(inputs[0]).toBeDisabled()
    expect(inputs[1]).toBeEnabled()
    expect(inputs[2]).toBeDisabled()
    expect(document.querySelector('.dnb-chip')).toHaveClass(
      'dnb-chip--addable'
    )
    await user.click(inputs[0])
    expect(onChange).not.toHaveBeenCalled()
  })

  it('forwards refs, spacing and input attributes', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <Chip
        ref={ref}
        id="chip"
        name="filters"
        required
        top="small"
        className="custom"
      >
        Savings
      </Chip>
    )
    expect(ref.current).toBe(document.querySelector('input'))
    expect(ref.current).toHaveAttribute('id', 'chip')
    expect(ref.current).toHaveAttribute('name', 'filters')
    expect(ref.current).toBeRequired()
    expect(document.querySelector('.dnb-chip')).toHaveClass(
      'custom',
      'dnb-space__top--small'
    )
  })

  it('submits only selected values without submitting on activation', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Chip name="filters" value="savings">
          Savings
        </Chip>
        <Chip name="filters" value="funds">
          Funds
        </Chip>
      </form>
    )
    await user.click(document.querySelector('input'))
    expect(
      new FormData(document.querySelector('form')).getAll('filters')
    ).toEqual(['savings'])
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('groups single-choice chips with Chip.Group', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Chip.Group label="Account" value="savings" onChange={onChange}>
        <Chip variant="radio" value="savings">
          Savings
        </Chip>
        <Chip variant="radio" value="funds">
          Funds
        </Chip>
      </Chip.Group>
    )
    expect(
      document.querySelector('[role="radiogroup"]')
    ).toHaveAccessibleName('Account')
    const [first, second] = document.querySelectorAll('input')
    expect(first).toHaveAttribute('type', 'radio')
    expect(first.name).toBe(second.name)
    expect(first).toBeChecked()
    await user.click(second)
    expect(first).not.toBeChecked()
    expect(second).toBeChecked()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'funds' })
    )
    await user.click(second)
    expect(second).toBeChecked()
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('reports the selected state when returning to a radio option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Chip.Group label="Account" value="savings">
        <Chip variant="radio" value="savings" onChange={onChange}>
          Savings
        </Chip>
        <Chip variant="radio" value="funds" onChange={onChange}>
          Funds
        </Chip>
      </Chip.Group>
    )
    const [savings, funds] = document.querySelectorAll('input')

    for (const input of [funds, savings, funds]) {
      await user.click(input)
      expect(input).toBeChecked()
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ checked: true, value: input.value })
      )
    }
    expect(onChange).toHaveBeenCalledTimes(3)
  })

  it.each(['default', 'radio', 'addable'] as const)(
    'associates %s error text and preserves an existing description',
    (variant) => {
      render(
        <>
          <p id="description">Choose an account</p>
          <Chip
            id="chip"
            variant={variant}
            status="Select an option"
            aria-describedby="description"
          >
            Savings
          </Chip>
        </>
      )
      expect(
        document.querySelector<ChipElement>(
          'input:not([type="hidden"]), .dnb-chip__button'
        )
      ).toHaveAttribute('aria-invalid', 'true')
      expect(
        document.querySelector<ChipElement>(
          'input:not([type="hidden"]), .dnb-chip__button'
        )
      ).toHaveAccessibleDescription('Choose an account Select an option')
    }
  )

  it('keeps decorative icons out of the accessible name', () => {
    render(
      <Chip
        variant="addable"
        icon={
          <svg>
            <title>Decorative</title>
          </svg>
        }
      >
        Savings
      </Chip>
    )
    expect(
      document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
    ).toHaveAccessibleName('Savings')
    expect(document.querySelector('.dnb-chip__action')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })

  it.each(['default', 'addable', 'radio', 'checkbox'] as const)(
    'has accessible %s markup',
    async (variant) => {
      const component = render(<Chip variant={variant}>Savings</Chip>)
      expect(await axeComponent(component)).toHaveNoViolations()
    }
  )

  it('supports a callback ref', () => {
    const ref = vi.fn()
    render(<Chip ref={ref}>Savings</Chip>)
    expect(ref).toHaveBeenCalledWith(
      document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
    )
    fireEvent.click(
      document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
    )
    expect(
      document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
    ).toBeChecked()
  })
})

function expectSelected(control: ChipElement, checked: boolean) {
  if (control instanceof HTMLButtonElement) {
    expect(control).toHaveAttribute('aria-pressed', String(checked))
  } else {
    expect(control.checked).toBe(checked)
  }
}
