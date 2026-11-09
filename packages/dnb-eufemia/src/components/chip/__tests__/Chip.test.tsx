import { createRef } from 'react'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chip from '../Chip'
import { Provider } from '../../../shared'
import { axeComponent } from '../../../core/test-utils/testSetup'

describe('Chip', () => {
  it.each(['default', 'addable', 'checkbox'] as const)(
    'provides a named native checkbox for %s',
    (variant) => {
      render(<Chip variant={variant}>Savings</Chip>)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('type', 'checkbox')
      expect(input).toHaveAccessibleName('Savings')
      expect(input).not.toBeChecked()
      expect(document.querySelectorAll('input')).toHaveLength(1)
      expect(document.querySelector('button')).not.toBeInTheDocument()
    }
  )

  it('supports text and label, preserving an explicit empty text', () => {
    const { rerender } = render(<Chip label="Savings" />)
    expect(document.querySelector('input')).toHaveAccessibleName('Savings')

    rerender(<Chip text="Funds">Savings</Chip>)
    expect(document.querySelector('input')).toHaveAccessibleName('Funds')

    rerender(
      <Chip text="" aria-label="Funds">
        Savings
      </Chip>
    )
    expect(document.querySelector('.dnb-chip__text')).toBeEmptyDOMElement()
  })

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

  it('updates checked, value and event handler when props change', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { rerender } = render(<Chip checked>First</Chip>)
    const input = document.querySelector('input')
    expect(input).toBeChecked()

    rerender(
      <Chip checked={false} value="second" onChange={onChange}>
        Second
      </Chip>
    )
    expect(input).not.toBeChecked()
    await user.click(input)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        checked: true,
        value: 'second',
      })
    )
  })

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
      const input = document.querySelector('input')
      await user.click(input)
      await user.keyboard(' {Enter}')
      expect(input).not.toBeChecked()
      expect(onChange).not.toHaveBeenCalled()
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
    const inputs = document.querySelectorAll('input')
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

  it.each(['default', 'radio'] as const)(
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
      expect(document.querySelector('input')).toHaveAttribute(
        'aria-invalid',
        'true'
      )
      expect(document.querySelector('input')).toHaveAccessibleDescription(
        'Choose an account Select an option'
      )
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
    expect(document.querySelector('input')).toHaveAccessibleName('Savings')
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
    expect(ref).toHaveBeenCalledWith(document.querySelector('input'))
    fireEvent.click(document.querySelector('input'))
    expect(document.querySelector('input')).toBeChecked()
  })
})
