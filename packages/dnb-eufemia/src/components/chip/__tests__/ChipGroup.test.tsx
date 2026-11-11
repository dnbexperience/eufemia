import { useState } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chip from '../Chip'
import type { ChipElement, ChipValue } from '../types'
import { Provider } from '../../../shared'
import { axeComponent } from '../../../core/test-utils/testSetup'

describe('Chip.Group', () => {
  it('inherits sizes while allowing per-chip and nested-group overrides', () => {
    render(
      <Chip.Group label="Account" size="large">
        <Chip value="savings">Savings</Chip>
        <Chip value="funds" size="small">
          Funds
        </Chip>
        <Chip value="loans" size="default">
          Loans
        </Chip>
        <Chip.Group label="Filters" selectionMode="multiple" size="medium">
          <Chip value="active">Active</Chip>
        </Chip.Group>
      </Chip.Group>
    )
    const chips = document.querySelectorAll('.dnb-chip')
    expect(chips[0]).toHaveClass('dnb-chip--size-large')
    expect(chips[1]).toHaveClass('dnb-chip--size-small')
    expect(chips[2]).toHaveClass('dnb-chip--size-default')
    expect(chips[3]).toHaveClass('dnb-chip--size-medium')
    expect(document.querySelector('.dnb-chip-group')).not.toHaveAttribute(
      'size'
    )
  })

  it('preserves numeric single selections, including zero, and synchronizes changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const example = (value: number | undefined) => (
      <Chip.Group label="Account" value={value} onChange={onChange}>
        <Chip value={0}>Savings</Chip>
        <Chip value={1.5}>Funds</Chip>
      </Chip.Group>
    )
    const { rerender } = render(example(0))
    const [savings, funds] = document.querySelectorAll('input')
    expect(savings).toBeChecked()
    await user.click(funds)
    expect(funds).toBeChecked()
    expect(savings).not.toBeChecked()
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: 1.5, values: [1.5], checked: true })
    )
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledTimes(1)
    rerender(example(undefined))
    expect(savings).not.toBeChecked()
    expect(funds).not.toBeChecked()
    rerender(example(0))
    expect(savings).toBeChecked()
  })

  it('preserves numeric and string values in multiple selection mode when adding, removing, and synchronizing', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const example = (values: Array<string | number>) => (
      <Chip.Group
        label="Filters"
        selectionMode="multiple"
        values={values}
        onChange={onChange}
      >
        <Chip value={0}>Savings</Chip>
        <Chip value={-2}>Funds</Chip>
        <Chip value="all">All accounts</Chip>
      </Chip.Group>
    )
    const { rerender } = render(example([0]))
    const [savings, funds, all] = document.querySelectorAll('input')
    await user.click(funds)
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: -2, values: [0, -2] })
    )
    await user.click(savings)
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: 0, values: [-2], checked: false })
    )
    await user.click(all)
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: 'all', values: [-2, 'all'] })
    )
    rerender(example([0]))
    expect(savings).toBeChecked()
    expect(funds).not.toBeChecked()
    expect(all).not.toBeChecked()
  })

  it('distinguishes no selection from an empty-string value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Chip.Group label="Account" onChange={onChange}>
        <Chip value="">All accounts</Chip>
        <Chip value="savings">Savings</Chip>
      </Chip.Group>
    )
    const [all, savings] = document.querySelectorAll('input')
    expect(all).not.toBeChecked()
    expect(savings).not.toBeChecked()
    for (const input of [all, savings, all, savings]) {
      await user.click(input)
      expect(input).toBeChecked()
      expect(input === all ? savings : all).not.toBeChecked()
      expect(input).toHaveAttribute(
        'value',
        input === all ? '' : 'savings'
      )
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: input === all ? '' : 'savings',
          values: [input === all ? '' : 'savings'],
        })
      )
    }
  })

  it.each([
    ['default', undefined],
    ['default', 'single'],
    ['addable', 'single'],
    ['checkbox', 'single'],
    ['radio', 'single'],
  ] as const)(
    'supports single selection with the %s appearance and selectionMode=%s',
    async (variant, selectionMode) => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const onChipChange = vi.fn()
      render(
        <Chip.Group
          label="Account"
          selectionMode={selectionMode}
          variant={variant}
          value="savings"
          onChange={onChange}
        >
          <Chip value="savings" onChange={onChipChange}>
            Savings
          </Chip>
          <Chip value="funds" onChange={onChipChange}>
            Funds
          </Chip>
        </Chip.Group>
      )
      const [savings, funds] = document.querySelectorAll<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
      expect(savings).toHaveAttribute('type', 'radio')
      expectSelected(savings, true)
      expectSelected(funds, false)
      expect(
        document.querySelectorAll(`.dnb-chip--${variant}`)
      ).toHaveLength(2)

      for (const input of [funds, savings, funds]) {
        await user.click(input)
        expectSelected(input, true)
        expect(onChange).toHaveBeenLastCalledWith({
          value: input.value,
          checked: true,
          values: [input.value],
          event: expect.any(Object),
        })
        expect(onChipChange).toHaveBeenLastCalledWith({
          value: input.value,
          checked: true,
          event: expect.any(Object),
        })
      }
      await user.click(funds)
      expectSelected(funds, true)
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChipChange).toHaveBeenCalledTimes(3)
    }
  )

  it.each(['default', 'addable', 'checkbox', 'radio'] as const)(
    'supports multiple selection with the %s appearance',
    async (variant) => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      render(
        <Chip.Group
          label="Filters"
          variant={variant}
          selectionMode="multiple"
          values={['savings']}
          onChange={onChange}
        >
          <Chip value="savings">Savings</Chip>
          <Chip value="funds">Funds</Chip>
        </Chip.Group>
      )
      const [savings, funds] = document.querySelectorAll<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
      expect(savings).toHaveAttribute(
        'type',
        variant === 'addable' ? 'button' : 'checkbox'
      )
      await user.click(funds)
      expectSelected(savings, true)
      expectSelected(funds, true)
      expect(onChange).toHaveBeenLastCalledWith({
        value: 'funds',
        checked: true,
        values: ['savings', 'funds'],
        event: expect.any(Object),
      })
      await user.click(savings)
      expectSelected(savings, false)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          value: 'savings',
          checked: false,
          values: ['funds'],
        })
      )
      await user.click(funds)
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ values: [] })
      )
      expect(onChange).toHaveBeenCalledTimes(3)
    }
  )

  it('starts with no single selection and synchronizes changed values, including clearing', async () => {
    const user = userEvent.setup()
    const children = (
      <>
        <Chip value="savings">Savings</Chip>
        <Chip value="funds">Funds</Chip>
      </>
    )
    const { rerender } = render(
      <Chip.Group label="Account">{children}</Chip.Group>
    )
    const [savings, funds] = document.querySelectorAll('input')
    expect(savings).not.toBeChecked()
    expect(funds).not.toBeChecked()
    await user.click(savings)
    expect(savings).toBeChecked()
    rerender(
      <Chip.Group label="Account" value="funds">
        {children}
      </Chip.Group>
    )
    expect(savings).not.toBeChecked()
    expect(funds).toBeChecked()
    rerender(
      <Chip.Group label="Account" value={undefined}>
        {children}
      </Chip.Group>
    )
    expect(funds).not.toBeChecked()
  })

  it('synchronizes changed values and handlers for multiple selection', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const children = (
      <>
        <Chip value="savings">Savings</Chip>
        <Chip value="funds">Funds</Chip>
      </>
    )
    const { rerender } = render(
      <Chip.Group
        selectionMode="multiple"
        label="Filters"
        values={['savings']}
      >
        {children}
      </Chip.Group>
    )
    const [savings, funds] = document.querySelectorAll('input')
    rerender(
      <Chip.Group
        selectionMode="multiple"
        label="Filters"
        values={['funds']}
        onChange={onChange}
      >
        {children}
      </Chip.Group>
    )
    expect(savings).not.toBeChecked()
    expect(funds).toBeChecked()
    await user.click(savings)
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ values: ['funds', 'savings'] })
    )
    rerender(
      <Chip.Group
        selectionMode="multiple"
        label="Filters"
        values={[]}
        onChange={onChange}
      >
        {children}
      </Chip.Group>
    )
    expect(savings).not.toBeChecked()
    expect(funds).not.toBeChecked()
  })

  it.each(['default', 'addable'] as const)(
    'unchecks a %s chip when the parent rejects it by passing the previous values',
    async (variant) => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const MaxTwo = () => {
        const [values, setValues] = useState<ChipValue[]>(['savings'])
        return (
          <form>
            <Chip.Group
              selectionMode="multiple"
              label="Filters"
              name="filters"
              variant={variant}
              values={values}
              onChange={(event) => {
                onChange(event)
                setValues(
                  event.values.length <= 2 ? event.values : [...values]
                )
              }}
            >
              <Chip value="savings">Savings</Chip>
              <Chip value="funds">Funds</Chip>
              <Chip value="loans">Loans</Chip>
            </Chip.Group>
          </form>
        )
      }
      render(<MaxTwo />)
      const [savings, funds, loans] =
        document.querySelectorAll<ChipElement>(
          'input:not([type="hidden"]), .dnb-chip__button'
        )

      await user.click(funds)
      await user.click(loans)

      expectSelected(loans, false)
      expect(
        new FormData(document.querySelector('form')).getAll('filters')
      ).toEqual(['savings', 'funds'])

      await user.click(savings)

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ values: ['funds'] })
      )
      expectSelected(savings, false)
      expectSelected(funds, true)
      expectSelected(loans, false)
    }
  )

  it.each([
    ['single', 'default'],
    ['multiple', 'default'],
    ['multiple', 'addable'],
  ] as const)(
    'submits selected enabled values with selectionMode=%s and variant=%s',
    (selectionMode, variant) => {
      render(
        <form>
          <Chip.Group
            name="account"
            variant={variant}
            selectionMode={selectionMode}
            value="savings"
            values={['savings', 'funds', 'loans']}
          >
            <Chip value="savings" readOnly>
              Savings
            </Chip>
            <Chip value="funds">Funds</Chip>
            <Chip value="loans" disabled>
              Loans
            </Chip>
          </Chip.Group>
        </form>
      )
      expect(
        new FormData(document.querySelector('form')).getAll('account')
      ).toEqual(
        selectionMode === 'multiple' ? ['savings', 'funds'] : ['savings']
      )
    }
  )

  it.each(['single', 'multiple'] as const)(
    'inherits group states with selectionMode=%s and permits explicit overrides',
    async (selectionMode) => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { rerender } = render(
        <Provider
          ChipGroup={{ selectionMode, variant: 'addable', disabled: true }}
        >
          <Chip.Group label="Filters" onChange={onChange}>
            <Chip value="savings">Savings</Chip>
            <Chip value="funds" disabled={false} variant="checkbox">
              Funds
            </Chip>
          </Chip.Group>
          <Chip.Group
            label="Mode override"
            selectionMode={
              selectionMode === 'single' ? 'multiple' : 'single'
            }
          >
            <Chip value="override">Override</Chip>
          </Chip.Group>
        </Provider>
      )
      const [savings, funds, override] =
        document.querySelectorAll<ChipElement>(
          'input:not([type="hidden"]), .dnb-chip__button'
        )
      expect(savings).toHaveAttribute(
        'type',
        selectionMode === 'single' ? 'radio' : 'button'
      )
      expect(override).toHaveAttribute(
        'type',
        selectionMode === 'single' ? 'button' : 'radio'
      )
      expect(savings).toBeDisabled()
      expect(funds).toBeEnabled()
      expect(document.querySelector('.dnb-chip')).toHaveClass(
        'dnb-chip--addable'
      )
      expect(document.querySelectorAll('.dnb-chip')[1]).toHaveClass(
        'dnb-chip--checkbox'
      )
      await user.click(savings)
      expect(onChange).not.toHaveBeenCalled()
      await user.click(funds)
      expect(onChange).toHaveBeenCalledTimes(1)

      rerender(
        <Chip.Group
          label="Filters"
          selectionMode={selectionMode}
          variant="addable"
          readOnly
          onChange={onChange}
        >
          <Chip value="savings">Savings</Chip>
        </Chip.Group>
      )
      const input = document.querySelector<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )
      await user.click(input)
      await user.keyboard(' {Enter}')
      expectSelected(input, false)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(input).toHaveFocus()

      rerender(
        <Chip.Group
          label="Filters"
          selectionMode={selectionMode}
          variant="addable"
          skeleton
        >
          <Chip value="savings">Savings</Chip>
        </Chip.Group>
      )
      expect(
        document.querySelector<ChipElement>(
          'input:not([type="hidden"]), .dnb-chip__button'
        )
      ).toBeDisabled()
    }
  )

  it.each([
    ['single', 'default'],
    ['multiple', 'default'],
    ['multiple', 'addable'],
  ] as const)(
    'has a named, described accessible group with selectionMode=%s and variant=%s',
    async (selectionMode, variant) => {
      const component = render(
        <>
          <p id="hint">Choose an account</p>
          <Chip.Group
            id="accounts"
            label="Accounts"
            selectionMode={selectionMode}
            variant={variant}
            aria-describedby="hint"
            status="Select an option"
            suffix="More information"
          >
            <Chip value="savings">Savings</Chip>
            <Chip value="funds">Funds</Chip>
          </Chip.Group>
        </>
      )
      const group = document.querySelector(
        `[role="${selectionMode === 'multiple' ? 'group' : 'radiogroup'}"]`
      )
      expect(group).toHaveAccessibleName('Accounts')
      expect(group).toHaveAccessibleDescription(
        'Choose an account Select an option More information'
      )
      for (const input of document.querySelectorAll<ChipElement>(
        'input:not([type="hidden"]), .dnb-chip__button'
      )) {
        expect(input).toHaveAccessibleDescription(
          'Choose an account Select an option More information'
        )
        expect(input).toHaveAttribute('aria-invalid', 'true')
      }
      expect(
        document.querySelectorAll('.dnb-form-status__text')
      ).toHaveLength(1)
      expect(await axeComponent(component)).toHaveNoViolations()
    }
  )

  it.each(['single', 'multiple'] as const)(
    'propagates only error status to chips with selectionMode=%s',
    (selectionMode) => {
      const example = (statusState: 'error' | 'information') => (
        <Chip.Group
          label="Accounts"
          selectionMode={selectionMode}
          status="Select an account"
          statusState={statusState}
        >
          {(['default', 'addable', 'checkbox', 'radio'] as const).map(
            (variant) => (
              <Chip key={variant} value={variant} variant={variant}>
                {variant}
              </Chip>
            )
          )}
        </Chip.Group>
      )
      const { rerender } = render(example('error'))
      const errorClass = `dnb-${selectionMode === 'multiple' ? 'checkbox' : 'radio'}__status--error`

      for (const chip of document.querySelectorAll('.dnb-chip')) {
        expect(chip).toHaveClass(
          chip.querySelector('button')
            ? 'dnb-chip--status-error'
            : errorClass
        )
      }

      rerender(example('information'))

      for (const chip of document.querySelectorAll('.dnb-chip')) {
        expect(chip).not.toHaveClass(errorClass, 'dnb-chip--status-error')
        expect(
          chip.querySelector(
            'input:not([type="hidden"]), .dnb-chip__button'
          )
        ).not.toHaveAttribute('aria-invalid')
      }
      expect(
        document.querySelectorAll('.dnb-form-status__text')
      ).toHaveLength(1)
    }
  )

  it('supports aria-label and independent nested groups', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Chip.Group aria-label="Outer" onChange={onChange}>
        <Chip value="outer">Outer option</Chip>
        <Chip.Group aria-label="Inner" selectionMode="multiple">
          <Chip value="inner">Inner option</Chip>
        </Chip.Group>
      </Chip.Group>
    )
    const [outer, inner] = document.querySelectorAll('input')
    expect(
      document.querySelector('[role="radiogroup"]')
    ).toHaveAccessibleName('Outer')
    expect(document.querySelector('[role="group"]')).toHaveAccessibleName(
      'Inner'
    )
    await user.click(inner)
    expect(inner).toBeChecked()
    expect(outer).not.toBeChecked()
    expect(onChange).not.toHaveBeenCalled()
  })
})

function expectSelected(control: ChipElement, checked: boolean) {
  if (control instanceof HTMLButtonElement) {
    expect(control).toHaveAttribute('aria-pressed', String(checked))
  } else {
    expect(control.checked).toBe(checked)
  }
}
