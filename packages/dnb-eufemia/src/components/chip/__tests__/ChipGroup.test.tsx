import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chip from '../Chip'
import { Provider } from '../../../shared'
import { axeComponent } from '../../../core/test-utils/testSetup'

describe('Chip.Group', () => {
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

  it.each(['default', 'addable', 'checkbox', 'radio'] as const)(
    'supports single selection with the %s appearance',
    async (variant) => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const onChipChange = vi.fn()
      render(
        <Chip.Group
          label="Account"
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
      const [savings, funds] = document.querySelectorAll('input')
      expect(savings).toHaveAttribute('type', 'radio')
      expect(savings).toBeChecked()
      expect(funds).not.toBeChecked()
      expect(
        document.querySelectorAll(`.dnb-chip--${variant}`)
      ).toHaveLength(2)

      for (const input of [funds, savings, funds]) {
        await user.click(input)
        expect(input).toBeChecked()
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
      expect(funds).toBeChecked()
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
          multiselect
          values={['savings']}
          onChange={onChange}
        >
          <Chip value="savings">Savings</Chip>
          <Chip value="funds">Funds</Chip>
        </Chip.Group>
      )
      const [savings, funds] = document.querySelectorAll('input')
      expect(savings).toHaveAttribute('type', 'checkbox')
      await user.click(funds)
      expect(savings).toBeChecked()
      expect(funds).toBeChecked()
      expect(onChange).toHaveBeenLastCalledWith({
        value: 'funds',
        checked: true,
        values: ['savings', 'funds'],
        event: expect.any(Object),
      })
      await user.click(savings)
      expect(savings).not.toBeChecked()
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
      <Chip.Group multiselect label="Filters" values={['savings']}>
        {children}
      </Chip.Group>
    )
    const [savings, funds] = document.querySelectorAll('input')
    rerender(
      <Chip.Group
        multiselect
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
        multiselect
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

  it.each([false, true])(
    'submits selected enabled values with multiselect=%s',
    (multiselect) => {
      render(
        <form>
          <Chip.Group
            name="account"
            multiselect={multiselect}
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
      ).toEqual(multiselect ? ['savings', 'funds'] : ['savings'])
    }
  )

  it.each([false, true])(
    'inherits group states with multiselect=%s and permits explicit overrides',
    async (multiselect) => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const { rerender } = render(
        <Provider
          ChipGroup={{ multiselect, variant: 'addable', disabled: true }}
        >
          <Chip.Group label="Filters" onChange={onChange}>
            <Chip value="savings">Savings</Chip>
            <Chip value="funds" disabled={false} variant="checkbox">
              Funds
            </Chip>
          </Chip.Group>
        </Provider>
      )
      const [savings, funds] = document.querySelectorAll('input')
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
          multiselect={multiselect}
          readOnly
          onChange={onChange}
        >
          <Chip value="savings">Savings</Chip>
        </Chip.Group>
      )
      const input = document.querySelector('input')
      await user.click(input)
      await user.keyboard(' {Enter}')
      expect(input).not.toBeChecked()
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(input).toHaveFocus()

      rerender(
        <Chip.Group label="Filters" multiselect={multiselect} skeleton>
          <Chip value="savings">Savings</Chip>
        </Chip.Group>
      )
      expect(document.querySelector('input')).toBeDisabled()
    }
  )

  it.each([false, true])(
    'has a named, described accessible group with multiselect=%s',
    async (multiselect) => {
      const component = render(
        <>
          <p id="hint">Choose an account</p>
          <Chip.Group
            id="accounts"
            label="Accounts"
            multiselect={multiselect}
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
        `[role="${multiselect ? 'group' : 'radiogroup'}"]`
      )
      expect(group).toHaveAccessibleName('Accounts')
      expect(group).toHaveAccessibleDescription(
        'Choose an account Select an option More information'
      )
      for (const input of document.querySelectorAll('input')) {
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

  it('supports aria-label and independent nested groups', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Chip.Group aria-label="Outer" onChange={onChange}>
        <Chip value="outer">Outer option</Chip>
        <Chip.Group aria-label="Inner" multiselect>
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
