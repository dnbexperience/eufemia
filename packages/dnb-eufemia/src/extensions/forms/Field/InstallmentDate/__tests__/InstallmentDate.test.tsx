import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].InstallmentDate

describe('Field.InstallmentDate', () => {
  it('should render with default label', () => {
    render(<Field.InstallmentDate />)

    const label = document.querySelector('label')
    expect(label).toHaveTextContent(nb.label)
  })

  it('should render with custom label', () => {
    render(<Field.InstallmentDate label="Custom label" />)

    const label = document.querySelector('label')
    expect(label).toHaveTextContent('Custom label')
  })

  it('should render 29 options by default (28 days + last day)', () => {
    render(<Field.InstallmentDate />)

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    expect(options).toHaveLength(29)
  })

  it('should render days 1 to 28 plus last day label by default', () => {
    render(<Field.InstallmentDate />)

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
    render(<Field.InstallmentDate value={15} />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent('15')
  })

  it('should update value when selecting a day', () => {
    const { rerender } = render(<Field.InstallmentDate value={5} />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent('5')

    rerender(<Field.InstallmentDate value={15} />)
    expect(text).toHaveTextContent('15')
  })

  it('should select an option and update the displayed value', async () => {
    render(<Field.InstallmentDate />)

    await userEvent.click(
      document.querySelector('button.dnb-dropdown__trigger')
    )

    const options = document.querySelectorAll('[role="option"]')
    await userEvent.click(options[9])

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent('10')
  })

  it('should select last day option and display last day label', async () => {
    render(<Field.InstallmentDate days={[1, 15]} showLastDay />)

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
        <Field.InstallmentDate required />
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
    render(<Field.InstallmentDate disabled />)

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
        <Field.InstallmentDate path="/installmentDay" />
      </Form.Handler>
    )

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent('20')
  })

  it('should render only specified days when days prop is given', () => {
    render(
      <Field.InstallmentDate days={[1, 10, 15, 20]} showLastDay={false} />
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
    render(<Field.InstallmentDate showLastDay={false} />)

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    expect(options).toHaveLength(28)
    expect(options[27]).toHaveTextContent('28')
  })

  it('should show last day option with constrained days', () => {
    render(<Field.InstallmentDate days={[1, 15]} showLastDay />)

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
    render(<Field.InstallmentDate value="last" />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent(nb.lastDayLabel)
  })

  it('should pass htmlAttributes to the dropdown', () => {
    render(<Field.InstallmentDate aria-label="Pick a day" value={10} />)

    const trigger = document.querySelector(
      'button.dnb-dropdown__trigger'
    ) as HTMLElement
    expect(trigger).toHaveAttribute('aria-label', 'Pick a day')
  })
})
