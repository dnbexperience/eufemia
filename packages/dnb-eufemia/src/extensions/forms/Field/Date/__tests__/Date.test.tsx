import React, { useState } from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { DataContext, Field, FieldBlock, Form, Wizard } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'
import enGB from '../../../constants/locales/en-GB'
import { FormatDateOptions, formatDate } from '../../../Value/Date'

const nb = nbNO['nb-NO']
const en = enGB['en-GB']

const formatOptions: Record<'no' | 'en', FormatDateOptions> = {
  no: {
    locale: 'nb-NO',
    variant: 'long',
  },
  en: {
    locale: 'en-GB',
    variant: 'long',
  },
}

describe('Field.Date', () => {
  it('should render without props', () => {
    render(<Field.Date />)
    expect(screen.getByLabelText('Dato')).toBeInTheDocument()
  })

  it('should support size', () => {
    render(<Field.Date size="large" />)

    const fieldStringElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-string'
    )
    expect(fieldStringElement.classList).toContain(
      'dnb-forms-field-block--label-height-large'
    )

    const datePickerElement: HTMLInputElement =
      document.querySelector('.dnb-date-picker')
    expect(datePickerElement.classList).toContain('dnb-date-picker--large')

    const inputElement: HTMLInputElement =
      document.querySelector('.dnb-input')
    expect(inputElement.classList).toContain('dnb-input--large')
  })

  it('should show required warning', async () => {
    render(<Field.Date value="2023-12-07" required />)

    const datePicker = document.querySelector('.dnb-date-picker')
    const [, , year]: Array<HTMLInputElement> = Array.from(
      datePicker.querySelectorAll('.dnb-date-picker__input')
    )

    expect(datePicker.classList).not.toContain(
      'dnb-date-picker__status--error'
    )
    expect(
      datePicker.querySelector('.dnb-form-status__text')
    ).not.toBeInTheDocument()

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    fireEvent.focus(year)
    await userEvent.type(year, '{Backspace>2}')
    fireEvent.blur(year)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()

    await userEvent.keyboard('20231207')

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    await userEvent.click(
      document.querySelector('.dnb-input__submit-button__button')
    )

    await userEvent.click(
      document
        .querySelector('.dnb-date-picker__footer')
        .querySelectorAll('.dnb-button--tertiary ')[0]
    )

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
  })

  it('should support date range', () => {
    const { rerender } = render(
      <Field.Date range value="2024-09-01|2024-09-30" />
    )

    const fields = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(fields).toHaveLength(6)

    const [startDay, startMonth, startYear, endDay, endMonth, endYear] =
      fields

    // Start date
    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('09')
    expect(startYear).toHaveValue('2024')

    // End date
    expect(endDay).toHaveValue('30')
    expect(endMonth).toHaveValue('09')
    expect(endYear).toHaveValue('2024')

    // Should handle undfined or null end date
    rerender(<Field.Date range value="2024-09-01|undefined" />)

    // Start date
    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('09')
    expect(startYear).toHaveValue('2024')

    // End date
    expect(endDay).toHaveValue('dd')
    expect(endMonth).toHaveValue('mm')
    expect(endYear).toHaveValue('åååå')

    // Should handle undfined or null start and end dates
    rerender(<Field.Date range value="null|undefined" />)

    // Start date
    expect(startDay).toHaveValue('dd')
    expect(startMonth).toHaveValue('mm')
    expect(startYear).toHaveValue('åååå')

    // End date
    expect(endDay).toHaveValue('dd')
    expect(endMonth).toHaveValue('mm')
    expect(endYear).toHaveValue('åååå')

    // Should handle undfined or null start date
    rerender(<Field.Date range value="null|2024-04-01" />)

    // Start date
    expect(startDay).toHaveValue('dd')
    expect(startMonth).toHaveValue('mm')
    expect(startYear).toHaveValue('åååå')

    // End date
    expect(endDay).toHaveValue('01')
    expect(endMonth).toHaveValue('04')
    expect(endYear).toHaveValue('2024')
  })

  describe('error handling', () => {
    describe('with validateInitially', () => {
      it('should show error message initially', async () => {
        render(<Field.Date required validateInitially />)
        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status--error')
          ).toBeInTheDocument()
        })
      })
    })

    describe('with validateUnchanged', () => {
      it('should show error message when blurring without any changes', async () => {
        // Because of the invalid date
        const log = jest.spyOn(console, 'log').mockImplementation()

        render(
          <Field.Date
            value="2023-12-0"
            schema={{ type: 'string', minLength: 10 }}
            validateUnchanged
          />
        )

        const input = document.querySelector('input')

        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()

        input.focus()
        fireEvent.blur(input)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-form-status--error')
          ).toBeInTheDocument()
        })

        log.mockRestore()
      })
    })
  })

  it('should store "displayValue" in data context', async () => {
    let dataContext = null

    render(
      <Form.Handler>
        <Field.Date defaultValue="2023-10-01" path="/myValue" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    const [day, , year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '01.10.2023',
      },
    })

    fireEvent.focus(day)
    await userEvent.keyboard('0211')
    await userEvent.type(year, '2024')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '02.11.2024',
      },
    })
  })

  it('should store "displayValue" in en-US locale', async () => {
    let dataContext = null

    render(
      <Form.Handler locale="en-US">
        <Field.Date defaultValue="2023-10-01" path="/myValue" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    const [day, , year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '10/01/2023',
      },
    })

    fireEvent.focus(day)
    await userEvent.keyboard('0211')
    await userEvent.type(year, '2024')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '11/02/2024',
      },
    })
  })

  // TODO: Add test for month, sync and hideLastWeek prop when it's working again

  it('should display correct start and end month on opening the date picker', async () => {
    render(
      <Field.Date startMonth="2024-01-01" endMonth="2024-12-31" range />
    )

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const [startMonth, endMonth] = Array.from(
      document.querySelectorAll('.dnb-date-picker__header__title')
    )

    expect(startMonth).toHaveTextContent('januar 2024')
    expect(endMonth).toHaveTextContent('desember 2024')
  })

  it('should have functioning min and max date', async () => {
    render(
      <Field.Date
        value="2024-10-01|2024-10-31"
        minDate="2024-10-01"
        maxDate="2024-10-31"
        range
      />
    )

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const [rightCalendar, leftCalendar] = Array.from(
      document.querySelectorAll('.dnb-date-picker__calendar')
    )

    const rightPrev = rightCalendar.querySelector('.dnb-date-picker__prev')
    const rightNext = rightCalendar.querySelector('.dnb-date-picker__next')
    const leftPrev = leftCalendar.querySelector('.dnb-date-picker__prev')
    const leftNext = leftCalendar.querySelector('dnb-date-picker__next')

    expect(
      rightCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      leftCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')

    await userEvent.click(rightPrev)

    expect(
      rightCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      leftCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')

    await userEvent.click(rightNext)

    expect(
      rightCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      leftCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')

    await userEvent.click(leftPrev)

    expect(
      rightCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      leftCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')

    await userEvent.click(leftNext)

    expect(
      rightCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
    expect(
      leftCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')

    expect(
      screen.getAllByLabelText('mandag 30. september 2024')[0]
    ).toHaveAttribute('disabled')
    expect(
      screen.getAllByLabelText('mandag 30. september 2024')[0]
    ).toHaveAttribute('aria-disabled', 'true')

    expect(
      screen.getAllByLabelText('fredag 1. november 2024')[0]
    ).toHaveAttribute('disabled')
    expect(
      screen.getAllByLabelText('fredag 1. november 2024')[0]
    ).toHaveAttribute('aria-disabled', 'true')
  })

  it('should support min and max dates as date objects', async () => {
    render(
      <Wizard.Container>
        <Wizard.Step title="Step 1">
          <Field.Date
            value="2025-03-15"
            minDate={new Date('2025-03-13')}
            maxDate={new Date('2025-03-31')}
            showResetButton={false}
            showCancelButton={false}
          />
          <Wizard.Buttons />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    )

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    // Clicking the minDate should not trigger error
    await userEvent.click(screen.getByLabelText('torsdag 13. mars 2025'))
    await userEvent.click(screen.getByText('Neste'))
    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()

    // Clicking the maxDate should not trigger error
    await userEvent.click(screen.getByText('Tilbake'))
    await userEvent.click(screen.getByLabelText('åpne datovelger'))
    await userEvent.click(screen.getByLabelText('mandag 31. mars 2025'))
    await userEvent.click(screen.getByText('Neste'))
    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()

    // Double check that dates before min and max date are disabled in the calendar
    await userEvent.click(screen.getByText('Tilbake'))
    await userEvent.click(screen.getByLabelText('åpne datovelger'))
    expect(screen.getByLabelText('onsdag 12. mars 2025')).toHaveAttribute(
      'disabled'
    )
    expect(screen.getByLabelText('tirsdag 1. april 2025')).toHaveAttribute(
      'disabled'
    )
  })

  it('should support min and max dates as ISO strings', async () => {
    render(
      <Wizard.Container>
        <Wizard.Step title="Step 1">
          <Field.Date
            value="2025-03-15"
            minDate="2025-03-13T11:25:13.000Z"
            maxDate="2025-03-31T14:12:19.000Z"
            showResetButton={false}
            showCancelButton={false}
          />
          <Wizard.Buttons />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    )

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    // Clicking the minDate should not trigger error
    await userEvent.click(screen.getByLabelText('torsdag 13. mars 2025'))
    await userEvent.click(screen.getByText('Neste'))
    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()

    // Clicking the maxDate should not trigger error
    await userEvent.click(screen.getByText('Tilbake'))
    await userEvent.click(screen.getByLabelText('åpne datovelger'))
    await userEvent.click(screen.getByLabelText('mandag 31. mars 2025'))
    await userEvent.click(screen.getByText('Neste'))
    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()

    // Double check that dates before min and max date are disabled in the calendar
    await userEvent.click(screen.getByText('Tilbake'))
    await userEvent.click(screen.getByLabelText('åpne datovelger'))
    expect(screen.getByLabelText('onsdag 12. mars 2025')).toHaveAttribute(
      'disabled'
    )
    expect(screen.getByLabelText('tirsdag 1. april 2025')).toHaveAttribute(
      'disabled'
    )
  })

  it('should be able to correct invalid dates', async () => {
    render(
      <Field.Date
        value="2024-10-07"
        minDate="2024-10-07"
        maxDate="2024-10-25"
        correctInvalidDate
      />
    )

    const [day, month, year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(day).toHaveValue('07')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')

    await userEvent.dblClick(day)
    await userEvent.keyboard('{ArrowRight>2}{Backspace>2}')
    await userEvent.keyboard('06')

    expect(day).toHaveValue('07')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')

    await userEvent.dblClick(month)
    await userEvent.keyboard('{ArrowRight>2}{Backspace>2}')
    await userEvent.keyboard('12')

    expect(day).toHaveValue('07')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')

    await userEvent.dblClick(year)
    await userEvent.keyboard('{ArrowRight>4}{Backspace>2}')
    await userEvent.keyboard('2026')

    expect(day).toHaveValue('07')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')

    await userEvent.dblClick(day)
    await userEvent.keyboard('{ArrowDown>4}')

    expect(day).toHaveValue('07')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')

    await userEvent.dblClick(month)
    await userEvent.keyboard('{ArrowDown>3}')

    expect(day).toHaveValue('07')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')

    await userEvent.keyboard('{ArrowUp>3}')

    expect(day).toHaveValue('07')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')

    await userEvent.dblClick(year)
    await userEvent.keyboard('{ArrowDown>3}')

    expect(day).toHaveValue('07')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')

    await userEvent.keyboard('{ArrowUp>3}')

    expect(day).toHaveValue('07')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')
  })

  it('should parse dates in specified format', async () => {
    render(<Field.Date value="01/10/2024" dateFormat="dd/MM/yyyy" />)

    const [startDay, startMonth, startYear]: Array<HTMLInputElement> =
      Array.from(document.querySelectorAll('.dnb-date-picker__input'))

    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('10')
    expect(startYear).toHaveValue('2024')

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    expect(
      screen.getByLabelText('tirsdag 1. oktober 2024')
    ).toHaveAttribute('aria-current', 'date')
  })

  it('should return dates in specifed return format', async () => {
    const onChange = jest.fn()

    render(
      <Field.Date
        value="01/10/2024"
        dateFormat="dd/MM/yyyy"
        returnFormat="dd/MM/yyyy"
        onChange={onChange}
      />
    )

    const [startDay, startMonth, startYear]: Array<HTMLInputElement> =
      Array.from(document.querySelectorAll('.dnb-date-picker__input'))

    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('10')
    expect(startYear).toHaveValue('2024')

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    expect(
      screen.getByLabelText('tirsdag 1. oktober 2024')
    ).toHaveAttribute('aria-current', 'date')

    await userEvent.click(
      screen.getByLabelText('torsdag 31. oktober 2024')
    )

    expect(onChange).toHaveBeenCalledWith('31/10/2024', expect.anything())
    expect(startDay).toHaveValue('31')
    expect(startMonth).toHaveValue('10')
    expect(startYear).toHaveValue('2024')
    expect(
      screen.getByLabelText('torsdag 31. oktober 2024')
    ).toHaveAttribute('aria-current', 'date')
  })

  it('should display input by default', () => {
    render(<Field.Date />)

    expect(
      document.querySelector('.dnb-date-picker__input__wrapper')
    ).toBeInTheDocument()
  })

  it('should be able to hide input', () => {
    render(<Field.Date showInput={false} />)

    const [day, month, year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(day).toHaveAttribute('hidden')
    expect(month).toHaveAttribute('hidden')
    expect(year).toHaveAttribute('hidden')
  })

  it('should support custom mask order', () => {
    render(<Field.Date value="2024-10-26" maskOrder="mm/dd/yyyy" />)

    const [month, day, year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(month).toHaveValue('10')
    expect(day).toHaveValue('26')
    expect(year).toHaveValue('2024')
  })

  it('should support having the picker be open by default', () => {
    render(<Field.Date opened />)

    expect(
      document.querySelector('.dnb-date-picker__calendar')
    ).toBeInTheDocument()
  })

  it('should show custom mask placeholder', () => {
    render(<Field.Date maskPlaceholder="aa/bb/cccc" />)

    const [day, month, year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(day.value).toBe('aa')
    expect(month.value).toBe('bb')
    expect(year.value).toBe('cccc')
  })

  it('should be able to hide navigation arrows', async () => {
    render(<Field.Date hideNavigation />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    expect(
      document.querySelector('.dnb-date-picker__prev')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-date-picker__next')
    ).not.toBeInTheDocument()
  })

  it('should be able to hide week days', async () => {
    render(<Field.Date hideDays />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    expect(
      document.querySelector('.dnb-date-picker__labels')
    ).not.toBeInTheDocument()
  })

  it('should display cancel and reset buttons by default', async () => {
    render(<Field.Date />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const [resetButton, cancelButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__footer button')
    )

    expect(resetButton).toBeInTheDocument()
    expect(resetButton).toHaveAttribute('data-testid', 'reset')

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toHaveAttribute('data-testid', 'cancel')
  })

  it('should be able to hide and show submit, cancel and reset buttons', async () => {
    const { rerender } = render(
      <Field.Date showSubmitButton showCancelButton showResetButton />
    )

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const [submitButton, resetButton, cancelButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__footer button')
    )

    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('data-testid', 'submit')
    expect(resetButton).toBeInTheDocument()
    expect(resetButton).toHaveAttribute('data-testid', 'reset')
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toHaveAttribute('data-testid', 'cancel')

    rerender(
      <Field.Date
        showSubmitButton={false}
        showCancelButton={false}
        showResetButton={false}
      />
    )

    expect(submitButton).not.toBeInTheDocument()
    expect(resetButton).not.toBeInTheDocument()
    expect(cancelButton).not.toBeInTheDocument()
  })

  it('should support custom submit, cancel and reset button texts', async () => {
    render(
      <Field.Date
        showSubmitButton
        submitButtonText="Custom Submit"
        cancelButtonText="Custom Cancel"
        resetButtonText="Custom Reset"
      />
    )

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const [submitButton, resetButton, cancelButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__footer button')
    )

    expect(submitButton).toHaveTextContent('Custom Submit')
    expect(resetButton).toHaveTextContent('Custom Reset')
    expect(cancelButton).toHaveTextContent('Custom Cancel')
  })

  it('should support linked calendars', async () => {
    render(<Field.Date value="2024-11-01|2024-12-01" range link />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const [rightCalendar, leftCalendar] = Array.from(
      document.querySelectorAll('.dnb-date-picker__calendar')
    )

    // TODO: Update to use left picker nav buttons when bug is fixed in DatePicker
    const rightNext = rightCalendar.querySelector('.dnb-date-picker__next')
    const leftPrev = rightCalendar.querySelector('.dnb-date-picker__prev')

    expect(
      rightCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('november 2024')
    expect(
      leftCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('desember 2024')

    await userEvent.click(rightNext)
    await userEvent.click(rightNext)

    expect(
      rightCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('januar 2025')
    expect(
      leftCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('februar 2025')

    await userEvent.click(leftPrev)
    await userEvent.click(leftPrev)
    await userEvent.click(leftPrev)
    await userEvent.click(leftPrev)

    expect(
      rightCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('september 2024')
    expect(
      leftCalendar.querySelector('.dnb-date-picker__header__title')
    ).toHaveTextContent('oktober 2024')
  })

  it('should be able to define the first day of the week', async () => {
    render(<Field.Date firstDay="tuesday" />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const [firstDay] = Array.from(
      document.querySelectorAll('.dnb-date-picker__labels__day')
    )

    expect(firstDay).toHaveTextContent('ti')
    expect(firstDay).toHaveAttribute('aria-label', 'tirsdag')
  })

  it('should be able to set picker alignment', async () => {
    const { rerender } = render(<Field.Date alignPicker="auto" />)

    const datePicker = document.querySelector('.dnb-date-picker')

    expect(datePicker).toHaveClass('dnb-date-picker--auto')

    rerender(<Field.Date alignPicker="right" />)
    expect(datePicker).toHaveClass('dnb-date-picker--right')

    rerender(<Field.Date alignPicker="left" />)
    expect(datePicker).toHaveClass('dnb-date-picker--left')
  })

  it('should be able to only show the month in calendar', async () => {
    render(<Field.Date onlyMonth />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const calendar = document.querySelector('.dnb-date-picker__calendar')

    expect(
      calendar.querySelector('.dnb-date-picker__header')
    ).not.toBeInTheDocument()
    expect(
      calendar.querySelector('.dnb-date-picker__labels')
    ).not.toBeInTheDocument()
  })

  it('should be able to hide calendar weeks from the previous month', () => {
    render(<Field.Date hideLastWeek />)

    expect(
      document.querySelector('.dnb-date-picker__calendar__week--last')
    ).not.toBeInTheDocument()
  })

  it('should support custom date shortcuts', async () => {
    render(
      <Field.Date
        range
        shortcuts={[
          {
            title: 'First of October',
            date: '2024-10-01',
          },
          {
            title: 'Second week of October',
            start_date: '2024-10-07',
            end_date: '2024-10-13',
          },
          {
            title: 'Whole month of October',
            start_date: '2024-10-01',
            end_date: '2024-10-31',
          },
        ]}
      />
    )

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const [
      startDay,
      startMonth,
      startYear,
      endDay,
      endMonth,
      endYear,
    ]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    const [dayShortcut, weekShortcut, monthShortcut] = Array.from(
      document.querySelectorAll('.dnb-date-picker__addon button')
    )

    expect(startDay).toHaveValue('dd')
    expect(startMonth).toHaveValue('mm')
    expect(startYear).toHaveValue('åååå')
    expect(endDay).toHaveValue('dd')
    expect(endMonth).toHaveValue('mm')
    expect(endYear).toHaveValue('åååå')

    expect(dayShortcut).toHaveTextContent('First of October')
    expect(weekShortcut).toHaveTextContent('Second week of October')
    expect(monthShortcut).toHaveTextContent('Whole month of October')

    await userEvent.click(dayShortcut)

    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('10')
    expect(startYear).toHaveValue('2024')
    expect(endDay).toHaveValue('01')
    expect(endMonth).toHaveValue('10')
    expect(endYear).toHaveValue('2024')

    await userEvent.click(weekShortcut)

    expect(startDay).toHaveValue('07')
    expect(startMonth).toHaveValue('10')
    expect(startYear).toHaveValue('2024')
    expect(endDay).toHaveValue('13')
    expect(endMonth).toHaveValue('10')
    expect(endYear).toHaveValue('2024')

    await userEvent.click(monthShortcut)

    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('10')
    expect(startYear).toHaveValue('2024')
    expect(endDay).toHaveValue('31')
    expect(endMonth).toHaveValue('10')
    expect(endYear).toHaveValue('2024')
  })

  it('should support custom addon elements', async () => {
    const DateWithAddon = () => {
      const [date, setDate] = useState('2024-10-01')

      return (
        <Field.Date
          value={date}
          addonElement={
            <button id="date-addon" onClick={() => setDate('2024-10-31')}>
              Custom Date Addon
            </button>
          }
        />
      )
    }

    render(<DateWithAddon />)

    const [day, month, year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(day).toHaveValue('01')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const addonElement = document.querySelector(
      '.dnb-date-picker__addon button'
    )

    expect(addonElement).toHaveTextContent('Custom Date Addon')
    expect(addonElement).toHaveAttribute('id', 'date-addon')
    expect(addonElement.nodeName).toBe('BUTTON')

    await userEvent.click(addonElement)

    expect(day).toHaveValue('31')
    expect(month).toHaveValue('10')
    expect(year).toHaveValue('2024')
  })

  it('should be able to disable autofocus', async () => {
    render(<Field.Date disableAutofocus />)

    const [day, month, year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const monthTable = document.querySelector(
      '.dnb-date-picker__calendar table'
    )

    expect(monthTable).toHaveClass('dnb-no-focus')
    expect(document.activeElement).not.toBe(monthTable)

    await userEvent.keyboard('{ArrowRight>5}')

    expect(day).toHaveValue('dd')
    expect(month).toHaveValue('mm')
    expect(year).toHaveValue('åååå')
  })

  it('should support onType event', async () => {
    const onType = jest.fn()

    render(<Field.Date onType={onType} />)

    const dayInput = document.querySelector('.dnb-date-picker__input')

    await userEvent.click(dayInput)
    await userEvent.keyboard('01102024')

    expect(onType).toHaveBeenCalledTimes(8)
    expect(onType).toHaveBeenLastCalledWith(
      expect.objectContaining({ date: '2024-10-01' })
    )
  })

  it('should support onSubmit event', async () => {
    const onSubmit = jest.fn()

    render(
      <Field.Date
        value="2024-10-31"
        showSubmitButton
        onSubmit={onSubmit}
      />
    )

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const submitButton = document.querySelector(
      '.dnb-date-picker__footer button[data-testid="submit"]'
    )

    await userEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      expect.objectContaining({ date: '2024-10-31' })
    )
  })

  it('should support onCancel event', async () => {
    const onCancel = jest.fn()

    render(<Field.Date value="2024-10-31" onCancel={onCancel} />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const cancelButton = document.querySelector(
      '.dnb-date-picker__footer button[data-testid="cancel"]'
    )

    await userEvent.click(cancelButton)

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onCancel).toHaveBeenLastCalledWith(
      expect.objectContaining({ date: '2024-10-31' })
    )
  })

  it('should support onReset event', async () => {
    const onReset = jest.fn()

    render(<Field.Date value="2024-10-31" onReset={onReset} />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    const resetButton = document.querySelector(
      '.dnb-date-picker__footer button[data-testid="reset"]'
    )

    await userEvent.click(resetButton)

    expect(onReset).toHaveBeenCalledTimes(1)
    expect(onReset).toHaveBeenLastCalledWith(expect.anything())
  })

  it('should support onShow event', async () => {
    const onShow = jest.fn()

    render(<Field.Date value="2024-10-31" onShow={onShow} />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    expect(onShow).toHaveBeenCalledTimes(1)
    expect(onShow).toHaveBeenLastCalledWith(
      expect.objectContaining({ date: '2024-10-31' })
    )
  })

  it('should support onHide event', async () => {
    const onHide = jest.fn()

    render(<Field.Date value="2024-10-31" onHide={onHide} />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))
    await userEvent.click(screen.getByLabelText('åpne datovelger'))
    await waitFor(() =>
      expect(
        document.querySelector('.dnb-date-picker__portal')
      ).not.toBeInTheDocument()
    )

    expect(onHide).toHaveBeenCalledTimes(1)
    expect(onHide).toHaveBeenLastCalledWith(
      expect.objectContaining({ date: '2024-10-31' })
    )
  })

  it('should support onDaysRender event', async () => {
    const onDaysRender = jest.fn()

    render(<Field.Date value="2024-10-01" onDaysRender={onDaysRender} />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    expect(onDaysRender).toHaveBeenCalledTimes(1)
    expect(onDaysRender.mock.calls[0][0].length).toBe(42)
    expect(onDaysRender.mock.calls[0][0][0]).toEqual(
      expect.objectContaining({
        date: expect.any(Date),
        isDisabled: null,
        isEndDate: false,
        isInactive: true,
        isLastMonth: false,
        isNextMonth: true,
        isPreview: false,
        isSelectable: false,
        isStartDate: false,
        isToday: false,
        isWithinSelection: false,
      })
    )
  })

  it('should support `skipPortal`', async () => {
    render(<Field.Date skipPortal />)

    await userEvent.click(screen.getByLabelText('åpne datovelger'))

    // dnb-date-picker__container is a direct descendant of dnb-date-picker__shell when portal is skipped
    expect(
      document.querySelector(
        '.dnb-date-picker__shell > .dnb-date-picker__container'
      )
    ).toBeInTheDocument()
    expect(
      document.body.querySelector('.dnb-date-picker__portal')
    ).not.toBeInTheDocument()
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.Date label="Label" required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.Date required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.Date required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('renders error', () => {
    render(<Field.Date error={new Error('Error message')} />)

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent('Error message')

    const input = document.querySelector('.dnb-date-picker')
    expect(input).toHaveClass('dnb-date-picker__status--error')
  })

  it('shows error style in FieldBlock', () => {
    render(
      <FieldBlock>
        <Field.Date error={new Error('Error message')} />
      </FieldBlock>
    )

    const input = document.querySelector('.dnb-date-picker')
    expect(input).toHaveClass('dnb-date-picker__status--error')
  })

  describe('`minDate` and `maxDate` validation', () => {
    it('should display error message if `value` is before `minDate`', async () => {
      const minDate = '2025-01-01'

      render(<Field.Date value={minDate} minDate={minDate} />)

      const day = document.querySelector(
        '.dnb-date-picker__input--day'
      ) as HTMLInputElement

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      await userEvent.click(day)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        nb.Date.errorMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.no)
        )
      )
    })

    it('should display error message if `value` is after `maxDate`', async () => {
      const maxDate = '2025-01-31'

      render(<Field.Date value={maxDate} maxDate={maxDate} />)

      const day = document.querySelector(
        '.dnb-date-picker__input--day'
      ) as HTMLInputElement

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      await userEvent.click(day)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        nb.Date.errorMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.no)
        )
      )
    })

    it('should display error message if start date is before `minDate`', async () => {
      const minDate = '2025-01-01'

      render(
        <Field.Date
          value={`${minDate}|undefined`}
          minDate={minDate}
          range
        />
      )

      const [startDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      await userEvent.click(startDay)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        nb.Date.errorStartDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.no)
        )
      )
    })

    it('should display error message if start date is after `maxDate`', async () => {
      const maxDate = '2025-01-31'

      render(
        <Field.Date
          value={`${maxDate}|undefined`}
          maxDate={maxDate}
          range
        />
      )

      const [startDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      await userEvent.click(startDay)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        nb.Date.errorStartDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.no)
        )
      )
    })

    it('should display error message if end date is before `minDate`', async () => {
      const minDate = '2025-01-01'

      render(
        <Field.Date
          value={`undefined|${minDate}`}
          minDate={minDate}
          range
        />
      )

      const [, endDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      await userEvent.click(endDay)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        nb.Date.errorEndDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.no)
        )
      )
    })

    it('should display error message if end date is after `maxDate`', async () => {
      const maxDate = '2025-01-31'

      render(
        <Field.Date
          value={`undefined|${maxDate}`}
          maxDate={maxDate}
          range
        />
      )

      const [, endDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      await userEvent.click(endDay)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        nb.Date.errorEndDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.no)
        )
      )
    })

    it('should display error messages if start date and end date is outside of limits in `range` mode', async () => {
      const minDate = '2025-01-01'
      const maxDate = '2025-01-31'

      const getMessages = () =>
        Array.from(
          document.querySelectorAll('.dnb-form-status .dnb-li')
        ) as Array<HTMLLIElement>

      render(
        <Field.Date
          value={`${minDate}|${maxDate}`}
          minDate={minDate}
          maxDate={maxDate}
          range
        />
      )

      const [startDay, startMonth, , endDay, endMonth] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      ) as Array<HTMLInputElement>

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      // Focus on day inputs and select out of limit dates
      await userEvent.click(startDay)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(endDay)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      const statusText = document.querySelector('.dnb-form-status__text')

      expect(statusText).toHaveTextContent(nb.Field.errorSummary)

      expect(getMessages().at(0)).toHaveTextContent(
        nb.Date.errorStartDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.no)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        nb.Date.errorEndDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.no)
        )
      )

      await userEvent.click(startMonth)
      await userEvent.keyboard('{ArrowUp>2}')
      await userEvent.click(document.body)

      expect(getMessages().at(0)).toHaveTextContent(
        nb.Date.errorStartDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.no)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        nb.Date.errorEndDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.no)
        )
      )

      await userEvent.click(endMonth)
      await userEvent.keyboard('{ArrowDown>2}')
      await userEvent.click(document.body)

      expect(getMessages().at(0)).toHaveTextContent(
        nb.Date.errorStartDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.no)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        nb.Date.errorEndDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.no)
        )
      )

      await userEvent.click(startMonth)
      await userEvent.keyboard('{ArrowDown>2}')
      await userEvent.click(document.body)

      expect(getMessages().at(0)).toHaveTextContent(
        nb.Date.errorStartDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.no)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        nb.Date.errorEndDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.no)
        )
      )

      await userEvent.click(startMonth)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(endMonth)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should validate `minDate` limits based on `value` prop', async () => {
      const minDate = '2025-01-01'

      render(<Field.Date value="2024-12-31" minDate={minDate} />)

      const day = document.querySelector(
        '.dnb-date-picker__input--day'
      ) as HTMLInputElement

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        nb.Date.errorMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.no)
        )
      )

      await userEvent.click(day)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should validate `maxDate` based on `value` prop', async () => {
      const maxDate = '2025-01-31'

      render(<Field.Date value="2025-02-01" maxDate={maxDate} />)

      const day = document.querySelector(
        '.dnb-date-picker__input--day'
      ) as HTMLInputElement

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        nb.Date.errorMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.no)
        )
      )

      await userEvent.click(day)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should validate date limits based on `value` prop in `range` mode', async () => {
      const minDate = '2025-01-01'
      const maxDate = '2025-01-31'

      render(
        <Field.Date
          value="2024-12-31|2025-02-01"
          minDate={minDate}
          maxDate={maxDate}
          range
        />
      )

      const [startDay, endDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      const [startDayError, endDayError] = Array.from(
        document.querySelectorAll('.dnb-li')
      ) as Array<HTMLLIElement>

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(startDayError).toHaveTextContent(
        nb.Date.errorStartDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.no)
        )
      )
      expect(endDayError).toHaveTextContent(
        nb.Date.errorEndDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.no)
        )
      )

      await userEvent.click(startDay)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(endDay)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should export `dateLimitValidator`', async () => {
      const myOnBlurValidator = (value: string) => {
        if (value === '2025-01-01') {
          return new Error('My custom message')
        }

        if (value === '2025-01-03') {
          return [
            new Error('My custom message 1'),
            new Error('My custom message 2'),
          ]
        }
      }

      const onBlurValidator = (value: string, { validators }) => {
        const { dateLimitValidator } = validators

        return [myOnBlurValidator, dateLimitValidator]
      }

      const minDate = '2025-01-01'
      const maxDate = '2025-01-31'

      render(
        <Field.Date
          value="2025-01-02"
          minDate={minDate}
          maxDate={maxDate}
          onBlurValidator={onBlurValidator}
        />
      )

      const [day, month]: Array<HTMLInputElement> = Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      )

      await userEvent.click(day)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(screen.getByRole('alert')).toHaveTextContent(
        'My custom message'
      )

      await userEvent.click(day)
      await userEvent.keyboard('{ArrowUp>2}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      const [firstMessage, secondMessage] = Array.from(
        document.querySelectorAll('.dnb-li')
      )

      expect(firstMessage).toHaveTextContent('My custom message 1')
      expect(secondMessage).toHaveTextContent('My custom message 2')

      await userEvent.click(month)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(screen.getByRole('alert')).toHaveTextContent(
        nb.Date.errorMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.no)
        )
      )

      await userEvent.click(month)
      await userEvent.keyboard('{ArrowDown>2}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(screen.getByRole('alert')).toHaveTextContent(
        nb.Date.errorMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.no)
        )
      )

      await userEvent.click(month)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(day)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should disabled `dateLimitValidator` if `onBlurValidation` is set to `false`', async () => {
      const minDate = '2025-01-01'
      const maxDate = '2025-01-31'

      render(
        <Field.Date
          value="2025-01-01"
          minDate={minDate}
          maxDate={maxDate}
          onBlurValidator={false}
        />
      )

      const [day, month]: Array<HTMLInputElement> = Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      )

      await userEvent.click(day)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      await userEvent.click(month)
      await userEvent.keyboard('{ArrowUp>2}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should display date limit error messages based on locale', async () => {
      const minDate = '2025-01-01'
      const maxDate = '2025-01-31'

      render(
        <Form.Handler locale="en-GB">
          <Field.Date
            value={minDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Form.Handler>
      )

      const [day, month] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      )

      await userEvent.click(day)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        en.Date.errorMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.en)
        )
      )

      await userEvent.click(month)
      await userEvent.keyboard('{ArrowUp>2}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        en.Date.errorMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.en)
        )
      )
    })

    it('should display date limit error messages based on locale when in `range` mode', async () => {
      const minDate = '2025-01-01'
      const maxDate = '2025-01-31'

      const getMessages = () =>
        Array.from(
          document.querySelectorAll('.dnb-form-status .dnb-li')
        ) as Array<HTMLLIElement>

      render(
        <Form.Handler locale="en-GB">
          <Field.Date
            value={`${minDate}|${maxDate}`}
            minDate={minDate}
            maxDate={maxDate}
            range
          />
        </Form.Handler>
      )

      const [startMonth, endMonth] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--month')
      ) as Array<HTMLInputElement>

      await userEvent.click(startMonth)
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.click(endMonth)
      await userEvent.keyboard('{ArrowUp}')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(en.Field.errorSummary)

      expect(getMessages().at(0)).toHaveTextContent(
        en.Date.errorStartDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.en)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        en.Date.errorEndDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.en)
        )
      )

      await userEvent.click(startMonth)
      await userEvent.keyboard('{ArrowUp>2}')
      await userEvent.click(document.body)

      expect(getMessages().at(0)).toHaveTextContent(
        en.Date.errorStartDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.en)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        en.Date.errorEndDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.en)
        )
      )

      await userEvent.click(endMonth)
      await userEvent.keyboard('{ArrowDown>2}')
      await userEvent.click(document.body)

      expect(getMessages().at(0)).toHaveTextContent(
        en.Date.errorStartDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, formatOptions.en)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        en.Date.errorEndDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.en)
        )
      )

      await userEvent.click(startMonth)
      await userEvent.keyboard('{ArrowDown>2}')
      await userEvent.click(document.body)

      expect(getMessages().at(0)).toHaveTextContent(
        en.Date.errorStartDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.en)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        en.Date.errorEndDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, formatOptions.en)
        )
      )
    })
  })

  it('should support keyboard interactions in range mode when id includes start or end', async () => {
    const onChange = jest.fn()

    render(
      <Field.Date
        id="id-end-start-something"
        value="2025-01-01|2025-01-31"
        range
        onChange={onChange}
      />
    )

    const [startMonth, endMonth] = Array.from(
      document.querySelectorAll('.dnb-date-picker__input--month')
    ) as Array<HTMLInputElement>

    await userEvent.type(startMonth, '{ArrowDown}')
    await userEvent.type(endMonth, '{ArrowUp}')
    await userEvent.click(document.body)

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenNthCalledWith(
      1,
      '2024-12-01|2025-01-31',
      expect.anything()
    )
    expect(onChange).toHaveBeenNthCalledWith(
      2,
      '2024-12-01|2025-02-28',
      expect.anything()
    )
  })
})
