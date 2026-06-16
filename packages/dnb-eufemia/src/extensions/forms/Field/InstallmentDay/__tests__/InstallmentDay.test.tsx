import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].InstallmentDay

describe('Field.InstallmentDay', () => {
  it('should render with default label', () => {
    render(<Field.InstallmentDay />)

    const label = document.querySelector('label')
    expect(label).toHaveTextContent(nb.label)
  })

  it('should render with custom label', () => {
    render(<Field.InstallmentDay label="Custom label" />)

    const label = document.querySelector('label')
    expect(label).toHaveTextContent('Custom label')
  })

  it('should render 29 options by default (28 days + last day)', () => {
    render(<Field.InstallmentDay />)

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    expect(options).toHaveLength(29)
  })

  it('should render days 1 to 28 plus last day label by default', () => {
    render(<Field.InstallmentDay />)

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    expect(options[0]).toHaveTextContent('1')
    expect(options[14]).toHaveTextContent('15')
    expect(options[27]).toHaveTextContent('28')
    expect(options[28]).toHaveTextContent(nb.lastDayLabel)
  })

  it('should display selected value', () => {
    render(<Field.InstallmentDay value={15} />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent('15')
  })

  it('should update value when selecting a day', () => {
    const { rerender } = render(<Field.InstallmentDay value={5} />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent('5')

    rerender(<Field.InstallmentDay value={15} />)
    expect(text).toHaveTextContent('15')
  })

  it('should select an option and update the displayed value', async () => {
    render(<Field.InstallmentDay />)

    await userEvent.click(
      document.querySelector('button.dnb-dropdown__trigger')
    )

    const options = document.querySelectorAll('[role="option"]')
    await userEvent.click(options[9])

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent('10')
  })

  it('should select last day option and display last day label', async () => {
    render(<Field.InstallmentDay days={[1, 15]} showLastDay />)

    await userEvent.click(
      document.querySelector('button.dnb-dropdown__trigger')
    )

    const options = document.querySelectorAll('[role="option"]')
    await userEvent.click(options[2])

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent(nb.lastDayLabel)
  })

  it('should show error when required and no value', async () => {
    render(
      <Form.Handler>
        <Field.InstallmentDay required />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    await waitFor(() => {
      const error = document.querySelector('.dnb-form-status')
      expect(error).toHaveTextContent(nb.errorRequired)
    })
  })

  it('should support disabled', () => {
    render(<Field.InstallmentDay disabled />)

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    expect(button).toBeDisabled()
  })

  it('should work with Form.Handler data context', async () => {
    const onSubmit = vi.fn()

    render(
      <Form.Handler
        defaultData={{ installmentDay: 20 }}
        onSubmit={onSubmit}
      >
        <Field.InstallmentDay path="/installmentDay" />
      </Form.Handler>
    )

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent('20')
  })

  it('should render only specified days when days prop is given', () => {
    render(
      <Field.InstallmentDay days={[1, 10, 15, 20]} showLastDay={false} />
    )

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    expect(options).toHaveLength(4)
    expect(options[0]).toHaveTextContent('1')
    expect(options[1]).toHaveTextContent('10')
    expect(options[2]).toHaveTextContent('15')
    expect(options[3]).toHaveTextContent('20')
  })

  it('should hide last day option when showLastDay is false', () => {
    render(<Field.InstallmentDay showLastDay={false} />)

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    expect(options).toHaveLength(28)
    expect(options[27]).toHaveTextContent('28')
  })

  it('should show last day option with constrained days', () => {
    render(<Field.InstallmentDay days={[1, 15]} showLastDay />)

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent('1')
    expect(options[1]).toHaveTextContent('15')
    expect(options[2]).toHaveTextContent(nb.lastDayLabel)
  })

  it('should display last day label when value is "last"', () => {
    render(<Field.InstallmentDay value="last" />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent(nb.lastDayLabel)
  })

  it('should pass htmlAttributes to the dropdown', () => {
    render(<Field.InstallmentDay aria-label="Pick a day" value={10} />)

    const trigger = document.querySelector(
      'button.dnb-dropdown__trigger'
    ) as HTMLElement
    expect(trigger).toHaveAttribute('aria-label', 'Pick a day')
  })
})

describe('Field.InstallmentDay variant="tiles"', () => {
  it('should render toggle buttons', () => {
    render(<Field.InstallmentDay variant="tiles" />)

    const buttons = document.querySelectorAll('.dnb-toggle-button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render 29 toggle buttons by default (28 days + last day)', () => {
    render(<Field.InstallmentDay variant="tiles" />)

    const buttons = document.querySelectorAll('.dnb-toggle-button')
    expect(buttons).toHaveLength(29)
  })

  it('should not render a dropdown', () => {
    render(<Field.InstallmentDay variant="tiles" />)

    const dropdown = document.querySelector('.dnb-dropdown')
    expect(dropdown).not.toBeInTheDocument()
  })

  it('should render constrained days as tiles', () => {
    render(
      <Field.InstallmentDay
        variant="tiles"
        days={[1, 10, 20]}
        showLastDay={false}
      />
    )

    const buttons = document.querySelectorAll('.dnb-toggle-button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0]).toHaveTextContent('1')
    expect(buttons[1]).toHaveTextContent('10')
    expect(buttons[2]).toHaveTextContent('20')
  })

  it('should include last day tile with label', () => {
    render(
      <Field.InstallmentDay variant="tiles" days={[1, 15]} showLastDay />
    )

    const buttons = document.querySelectorAll('.dnb-toggle-button')
    expect(buttons).toHaveLength(3)
    expect(buttons[2]).toHaveTextContent(nb.lastDayLabel)
  })

  it('should show selected tile', () => {
    render(<Field.InstallmentDay variant="tiles" value={15} />)

    const checked = document.querySelector('.dnb-toggle-button--checked')
    expect(checked).toHaveTextContent('15')
  })

  it('should select a tile and update value', async () => {
    render(<Field.InstallmentDay variant="tiles" />)

    const buttons = document.querySelectorAll('.dnb-toggle-button button')
    await userEvent.click(buttons[4])

    const checked = document.querySelector('.dnb-toggle-button--checked')
    expect(checked).toHaveTextContent('5')
  })

  it('should show error when required and submitted without selection', async () => {
    render(
      <Form.Handler>
        <Field.InstallmentDay variant="tiles" required />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    await waitFor(() => {
      const error = document.querySelector('.dnb-form-status')
      expect(error).toHaveTextContent(nb.errorRequired)
    })
  })

  it('should render tiles with role="radio"', () => {
    render(
      <Field.InstallmentDay
        variant="tiles"
        days={[1, 5, 10]}
        showLastDay={false}
      />
    )

    const buttons = document.querySelectorAll('.dnb-toggle-button button')
    expect(buttons).toHaveLength(3)
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('role', 'radio')
    })
  })

  it('should not set value to 0 when attempting to deselect a tile', async () => {
    const onChange = vi.fn()

    render(
      <Form.Handler defaultData={{ day: 5 }} onChange={onChange}>
        <Field.InstallmentDay
          variant="tiles"
          path="/day"
          days={[1, 5, 10]}
          showLastDay={false}
        />
      </Form.Handler>
    )

    const checked = document.querySelector(
      '.dnb-toggle-button--checked button'
    ) as HTMLElement
    expect(checked).toHaveTextContent('5')

    // Click the already-selected tile — should NOT deselect to 0
    await userEvent.click(checked)

    // Value should remain 5, never become 0
    if (onChange.mock.calls.length > 0) {
      const lastCall =
        onChange.mock.calls[onChange.mock.calls.length - 1][0]
      expect(lastCall.day).not.toBe(0)
    }

    // The tile should still be checked
    const stillChecked = document.querySelector(
      '.dnb-toggle-button--checked'
    )
    expect(stillChecked).toHaveTextContent('5')
  })
})
