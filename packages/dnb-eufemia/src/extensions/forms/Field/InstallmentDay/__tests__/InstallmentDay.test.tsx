import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form } from '../../..'
import { Provider } from '../../../../../shared'
import DataContext from '../../../DataContext/Context'
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

  it('should display the selected value as a readable phrase', () => {
    render(<Field.InstallmentDay value={15} />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent(nb.dayDisplay.replace('{day}', '15.'))
  })

  it('should render the Norwegian ordinal phrase by default', () => {
    render(<Field.InstallmentDay value={3} />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent('3. dagen i måneden')
  })

  it('should render the English ordinal phrase when locale is en-GB', () => {
    render(
      <Provider locale="en-GB">
        <Field.InstallmentDay value={1} />
      </Provider>
    )

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent('1st day of the month')
  })

  it('should keep the dropdown options as bare numbers (not the phrase)', () => {
    render(<Field.InstallmentDay />)

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    expect(options[0]).toHaveTextContent('1')
    expect(options[0]).not.toHaveTextContent('måneden')
  })

  it('should update value when selecting a day', () => {
    const { rerender } = render(<Field.InstallmentDay value={5} />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent(nb.dayDisplay.replace('{day}', '5.'))

    rerender(<Field.InstallmentDay value={15} />)
    expect(text).toHaveTextContent(nb.dayDisplay.replace('{day}', '15.'))
  })

  it('should select an option and update the displayed value', async () => {
    render(<Field.InstallmentDay />)

    await userEvent.click(
      document.querySelector('button.dnb-dropdown__trigger')
    )

    const options = document.querySelectorAll('[role="option"]')
    await userEvent.click(options[9])

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent(nb.dayDisplay.replace('{day}', '10.'))
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
    expect(text).toHaveTextContent(nb.dayDisplay.replace('{day}', '20.'))
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

  it('should display the last day value even when showLastDay is false', () => {
    render(<Field.InstallmentDay showLastDay={false} value="last" />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent(nb.lastDayLabel)
  })

  it('should add the last day option when value is "last" even if showLastDay is false', () => {
    render(<Field.InstallmentDay showLastDay={false} value="last" />)

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    // 28 default days + the last day option surfaced for the 'last' value
    expect(options).toHaveLength(29)
    expect(options[28]).toHaveTextContent(nb.lastDayLabel)
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

  it('should display a numeric value that is outside the default days', () => {
    render(<Field.InstallmentDay value={31} />)

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent(nb.dayDisplay.replace('{day}', '31.'))
  })

  it('should add an out-of-range value as a selectable option in sorted order', () => {
    render(<Field.InstallmentDay value={31} />)

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    // 28 default days + the injected day 31 + the last day option
    expect(options).toHaveLength(30)
    expect(options[27]).toHaveTextContent('28')
    expect(options[28]).toHaveTextContent('31')
    expect(options[29]).toHaveTextContent(nb.lastDayLabel)
  })

  it('should display a value not present in a custom days array', () => {
    render(
      <Field.InstallmentDay days={[1, 15]} showLastDay={false} value={7} />
    )

    const text = document.querySelector('.dnb-dropdown__text__inner')
    expect(text).toHaveTextContent(nb.dayDisplay.replace('{day}', '7.'))

    const button = document.querySelector(
      '.dnb-dropdown__trigger'
    ) as HTMLElement
    fireEvent.click(button)

    const options = document.querySelectorAll('.dnb-drawer-list__option')
    // The injected value is placed in sorted order: 1, 7, 15
    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent('1')
    expect(options[1]).toHaveTextContent('7')
    expect(options[2]).toHaveTextContent('15')
  })

  it('should pass htmlAttributes to the dropdown', () => {
    render(<Field.InstallmentDay aria-label="Pick a day" value={10} />)

    const trigger = document.querySelector(
      'button.dnb-dropdown__trigger'
    ) as HTMLElement
    expect(trigger).toHaveAttribute('aria-label', 'Pick a day')
  })

  it('should render the dropdown with stretch so the width takes effect', () => {
    render(<Field.InstallmentDay />)

    const dropdown = document.querySelector('.dnb-dropdown')
    expect(dropdown).toHaveClass('dnb-dropdown--stretch')
  })

  it('should apply the default large width to the field block contents', () => {
    render(<Field.InstallmentDay />)

    const contents = document.querySelector(
      '.dnb-forms-field-block__contents'
    )
    expect(contents).toHaveClass(
      'dnb-forms-field-block__contents--width-large'
    )
  })

  it('should apply a custom width to the field block contents', () => {
    render(<Field.InstallmentDay width="medium" />)

    const contents = document.querySelector(
      '.dnb-forms-field-block__contents'
    )
    expect(contents).toHaveClass(
      'dnb-forms-field-block__contents--width-medium'
    )
  })

  it('should call onChange with a number when selecting a day', async () => {
    const onChange = vi.fn()
    render(<Field.InstallmentDay onChange={onChange} />)

    await userEvent.click(
      document.querySelector('button.dnb-dropdown__trigger')
    )

    const options = document.querySelectorAll('[role="option"]')
    await userEvent.click(options[9])

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(10, expect.anything())
  })

  it('should call onChange with "last" when selecting the last day option', async () => {
    const onChange = vi.fn()
    render(
      <Field.InstallmentDay
        days={[1, 15]}
        showLastDay
        onChange={onChange}
      />
    )

    await userEvent.click(
      document.querySelector('button.dnb-dropdown__trigger')
    )

    const options = document.querySelectorAll('[role="option"]')
    await userEvent.click(options[2])

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith('last', expect.anything())
  })

  it('should render the placeholder when no value is selected', () => {
    render(<Field.InstallmentDay />)

    const trigger = document.querySelector('.dnb-dropdown__text__inner')
    expect(trigger).toHaveTextContent(nb.placeholder)
  })

  it('should render a custom placeholder', () => {
    render(<Field.InstallmentDay placeholder="Choose a day" />)

    const trigger = document.querySelector('.dnb-dropdown__text__inner')
    expect(trigger).toHaveTextContent('Choose a day')
  })

  it('should store "displayValue" in data context', () => {
    let dataContext = null

    render(
      <Form.Handler defaultData={{ installmentDay: 'last' }}>
        <Field.InstallmentDay path="/installmentDay" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/installmentDay': {
        type: 'field',
        value: nb.lastDayLabel,
      },
    })
  })

  it('should store the formatted numeric "displayValue" in data context', () => {
    let dataContext = null

    render(
      <Form.Handler defaultData={{ installmentDay: 15 }}>
        <Field.InstallmentDay path="/installmentDay" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/installmentDay': {
        type: 'field',
        value: nb.dayDisplay.replace('{day}', '15.'),
      },
    })
  })
})
