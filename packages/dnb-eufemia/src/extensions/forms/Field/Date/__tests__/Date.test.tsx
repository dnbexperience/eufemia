import React, { useState } from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import {
  DataContext,
  Field,
  FieldBlock,
  Form,
  makeAjvInstance,
  Wizard,
} from '../../..'
import nbNO from '../../../constants/locales/nb-NO'
import enGB from '../../../constants/locales/en-GB'
import type { FormatDateOptions } from '../../../../../components/date-format/DateFormatUtils'
import { formatDate } from '../../../../../components/date-format/DateFormatUtils'

const nb = nbNO['nb-NO']
const en = enGB['en-GB']

const options: Record<'no' | 'en', FormatDateOptions> = {
  no: {
    locale: 'nb-NO',
    options: { dateStyle: 'long' },
  },
  en: {
    locale: 'en-GB',
    options: { dateStyle: 'long' },
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
    const dayInput = datePicker.querySelector(
      '.dnb-date-picker__input--day'
    )
    const yearInput = datePicker.querySelector(
      '.dnb-date-picker__input--year'
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

    await userEvent.type(yearInput, '{Backspace>2}')
    await userEvent.click(document.body)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(nb.Date.errorRequired)
    })

    await userEvent.type(dayInput, '07122023')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    await userEvent.type(dayInput, '{Backspace>2}')
    await userEvent.click(document.body)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(nb.Date.errorRequired)
    })
  })

  it('should show required warning in range mode', async () => {
    render(<Field.Date value="2023-12-07|2023-12-14" range required />)

    const datePicker = document.querySelector('.dnb-date-picker')
    const startDayInput = datePicker.querySelector(
      '.dnb-date-picker__input--day'
    )
    const endDateYear = datePicker.querySelectorAll(
      '.dnb-date-picker__input--year'
    )[1]

    expect(datePicker.classList).not.toContain(
      'dnb-date-picker__status--error'
    )
    expect(
      datePicker.querySelector('.dnb-form-status__text')
    ).not.toBeInTheDocument()

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    await userEvent.type(endDateYear, '{Backspace>16}')
    await userEvent.click(document.body)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
    })
    expect(
      document.querySelector('.dnb-form-status__text')
    ).toHaveTextContent(nb.Date.errorRequiredRange)

    await userEvent.type(startDayInput, '0102202304052026')
    await userEvent.click(document.body)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })
  })

  it('should show required warning in range mode when value is not set', async () => {
    render(<Field.Date range required validateInitially />)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-form-status__text')
    ).toHaveTextContent(nb.Date.errorRequiredRange)
  })

  it('should show required warning in range mode when start date is not set', async () => {
    render(
      <Field.Date
        value="null|2023-12-14"
        range
        required
        validateInitially
      />
    )

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-form-status__text')
    ).toHaveTextContent(nb.Date.errorRequiredRange)
  })

  it('should show required warning in range mode when end date is not set', async () => {
    render(
      <Field.Date
        value="2023-12-14|null"
        range
        required
        validateInitially
      />
    )

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-form-status__text')
    ).toHaveTextContent(nb.Date.errorRequiredRange)
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

  it('should support keyboard interactions in range mode when id includes start or end', async () => {
    const onChange = jest.fn()

    render(
      <Field.Date
        id="id-end-start-something"
        value="2025-01-01|2025-01-31"
        onChange={onChange}
        range
      />
    )

    const [startMonth, endMonth] = Array.from(
      document.querySelectorAll('.dnb-date-picker__input--month')
    ) as Array<HTMLInputElement>

    await userEvent.type(startMonth, '{Backspace>2}122024')
    await userEvent.type(endMonth, '{Backspace>4}2802')
    await userEvent.click(document.body)

    expect(onChange).toHaveBeenCalledTimes(14)
    // Check the actual values that were called instead of assuming specific positions
    const calls = onChange.mock.calls.map((call) => call[0])
    expect(calls).toContain('2024-12-01|2025-01-31')
    expect(calls).toContain('2024-12-01|2025-02-28')
  })

  describe('validation', () => {
    it('should display error on first form submit', async () => {
      render(
        <Form.Handler>
          <Field.Date minDate="2025-01-01" required />
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(nb.Date.errorRequired)
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

      const day = document.querySelector('.dnb-date-picker__input--day')

      await userEvent.type(day, '{Backspace>2}31122024')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        en.Date.errorMinDate.replace(
          /\{date\}/,
          formatDate(minDate, options.en)
        )
      )

      await userEvent.type(day, '{Backspace>2}01022025')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toHaveTextContent(
        en.Date.errorMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, options.en)
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

      const [startDay, endDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      await userEvent.type(startDay, '{Backspace>2}31122024')
      await userEvent.type(endDay, '{Backspace>2}01022025')
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
          formatDate(minDate, options.en)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        en.Date.errorEndDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, options.en)
        )
      )

      await userEvent.type(startDay, '{Backspace>2}01022025')
      await userEvent.click(document.body)

      expect(getMessages().at(0)).toHaveTextContent(
        en.Date.errorStartDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, options.en)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        en.Date.errorEndDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, options.en)
        )
      )

      await userEvent.type(endDay, '{Backspace>2}31122024')
      await userEvent.click(document.body)

      expect(getMessages().at(0)).toHaveTextContent(
        en.Date.errorStartDateMaxDate.replace(
          /\{date\}/,
          formatDate(maxDate, options.en)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        en.Date.errorEndDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, options.en)
        )
      )

      await userEvent.type(startDay, '{Backspace>2}31122024')
      await userEvent.click(document.body)

      expect(getMessages().at(0)).toHaveTextContent(
        en.Date.errorStartDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, options.en)
        )
      )
      expect(getMessages().at(1)).toHaveTextContent(
        en.Date.errorEndDateMinDate.replace(
          /\{date\}/,
          formatDate(minDate, options.en)
        )
      )
    })

    it('should not display error if a valid value is cleared/removed', async () => {
      render(<Field.Date value="2023-01-16" />)

      const [day, month, year]: Array<HTMLInputElement> = Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      )

      expect(day).toHaveValue('16')
      expect(month).toHaveValue('01')
      expect(year).toHaveValue('2023')

      const yearInput = document.querySelector(
        '.dnb-date-picker__input--year'
      ) as HTMLInputElement

      await userEvent.click(yearInput)
      await userEvent.keyboard('{Backspace>16}')
      await userEvent.click(document.body)

      expect(day).toHaveValue('dd')
      expect(month).toHaveValue('mm')
      expect(year).toHaveValue('yyyy')

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should display error if a valid value is cleared/removed when required', async () => {
      render(<Field.Date value="2023-01-16" required />)

      const [day, month, year]: Array<HTMLInputElement> = Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      )

      expect(day).toHaveValue('16')
      expect(month).toHaveValue('01')
      expect(year).toHaveValue('2023')

      const yearInput = document.querySelector(
        '.dnb-date-picker__input--year'
      ) as HTMLInputElement

      await userEvent.click(yearInput)
      await userEvent.keyboard('{Backspace>16}')
      await userEvent.click(document.body)

      expect(day).toHaveValue('dd')
      expect(month).toHaveValue('mm')
      expect(year).toHaveValue('yyyy')

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
    })

    it('should display error if date is invalid', async () => {
      render(<Field.Date />)

      const dayInput = document.querySelector(
        '.dnb-date-picker__input--day'
      ) as HTMLInputElement

      await userEvent.click(dayInput)
      dayInput.setSelectionRange(0, 0)
      await userEvent.keyboard('39192025')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(nb.Date.errorInvalidDate)

      await userEvent.click(dayInput)
      dayInput.setSelectionRange(0, 0)
      await userEvent.keyboard('11122025')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should display error if start date or end date is invalid', async () => {
      render(<Field.Date range />)

      const [startDay, endDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      const getMessages = () =>
        Array.from(
          document.querySelectorAll('.dnb-form-status .dnb-li')
        ) as Array<HTMLLIElement>

      // Type start date
      await userEvent.click(startDay)
      await userEvent.keyboard('39192025')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(nb.Date.errorInvalidStartDate)

      // Type end date
      await userEvent.click(endDay)
      await userEvent.keyboard('39192026')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(getMessages().at(0)).toHaveTextContent(
        nb.Date.errorInvalidStartDate
      )
      expect(getMessages().at(1)).toHaveTextContent(
        nb.Date.errorInvalidEndDate
      )

      // Type valid start date
      await userEvent.click(startDay)
      startDay.setSelectionRange(0, 0)
      await userEvent.keyboard('11122025')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(nb.Date.errorInvalidEndDate)

      // Type valid end date
      await userEvent.click(endDay)
      endDay.setSelectionRange(0, 0)
      await userEvent.keyboard('11122026')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should display invalid date error message based on locale', async () => {
      render(
        <Form.Handler locale="en-GB">
          <Field.Date />
        </Form.Handler>
      )

      const dayInput = document.querySelector(
        '.dnb-date-picker__input--day'
      ) as HTMLInputElement

      await userEvent.click(dayInput)
      dayInput.setSelectionRange(0, 0)
      await userEvent.keyboard('39192025')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(en.Date.errorInvalidDate)

      await userEvent.click(dayInput)
      dayInput.setSelectionRange(0, 0)
      await userEvent.keyboard('11122025')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should display invalid date error message based on locale when in `range` mode', async () => {
      render(
        <Form.Handler locale="en-GB">
          <Field.Date range />
        </Form.Handler>
      )

      const [startDay, endDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      const getMessages = () =>
        Array.from(
          document.querySelectorAll('.dnb-form-status .dnb-li')
        ) as Array<HTMLLIElement>

      // Type start date
      await userEvent.click(startDay)
      await userEvent.keyboard('39192025')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(en.Date.errorInvalidStartDate)

      // Type end date
      await userEvent.click(endDay)
      await userEvent.keyboard('39192026')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(getMessages().at(0)).toHaveTextContent(
        en.Date.errorInvalidStartDate
      )
      expect(getMessages().at(1)).toHaveTextContent(
        en.Date.errorInvalidEndDate
      )

      // Type valid start date
      await userEvent.click(startDay)
      startDay.setSelectionRange(0, 0)
      await userEvent.keyboard('11122025')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(en.Date.errorInvalidEndDate)

      // Type valid end date
      await userEvent.click(endDay)
      endDay.setSelectionRange(0, 0)
      await userEvent.keyboard('11122026')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
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

    const day = document.querySelector(
      '.dnb-date-picker__input'
    ) as HTMLInputElement

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '01.10.2023',
      },
    })

    await userEvent.click(day)
    day.setSelectionRange(0, 0)
    await userEvent.keyboard('02112024')

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

    const day = document.querySelector(
      '.dnb-date-picker__input'
    ) as HTMLInputElement

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '10/1/23',
      },
    })

    await userEvent.click(day)
    day.setSelectionRange(0, 0)
    await userEvent.keyboard('02112024')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '11/2/24',
      },
    })
  })

  // TODO: Add test for month, sync and hideLastWeek prop when it's working again

  it('should parse dates in specified format', async () => {
    render(<Field.Date value="01/10/2024" dateFormat="dd/MM/yyyy" />)

    const [startDay, startMonth, startYear]: Array<HTMLInputElement> =
      Array.from(document.querySelectorAll('.dnb-date-picker__input'))

    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('10')
    expect(startYear).toHaveValue('2024')

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(
      document.querySelector('.dnb-date-picker__prev')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-date-picker__next')
    ).not.toBeInTheDocument()
  })

  it('should be able to hide week days', async () => {
    render(<Field.Date hideDays />)

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(
      document.querySelector('.dnb-date-picker__labels')
    ).not.toBeInTheDocument()
  })

  it('should display cancel and reset buttons by default', async () => {
    render(<Field.Date />)

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    const [resetButton, cancelButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__footer button')
    )

    expect(resetButton).toBeInTheDocument()
    expect(resetButton).toHaveAttribute('data-testid', 'reset')

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toHaveAttribute('data-testid', 'cancel')
  })

  it('will reset the value and the picker on reset click', async () => {
    const onReset = jest.fn()
    let dataContext = null

    render(
      <Form.Handler>
        <Field.Date path="/date" showInput onReset={onReset} />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    const dayInput = document.querySelector('.dnb-date-picker__input')
    await userEvent.click(dayInput)
    await userEvent.keyboard('01102024')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/date': {
        type: 'field',
        value: '01.10.2024',
      },
    })
    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/date': {
        type: 'field',
        value: '01.10.2024',
      },
    })

    const openButton = document.querySelector(
      'button.dnb-input__submit-button__button'
    )
    await userEvent.click(openButton)

    expect(document.querySelector('.dnb-date-picker')).toHaveClass(
      'dnb-date-picker--opened'
    )

    const resetButton = document.querySelector(
      'button[data-testid="reset"]'
    )
    await userEvent.click(resetButton)

    expect(onReset).toHaveBeenCalledTimes(1)
    expect(onReset).toHaveBeenCalledWith(
      expect.objectContaining({
        date: undefined,
        is_valid: false,
        start_date: undefined,
        end_date: undefined,
      })
    )

    expect(document.querySelector('.dnb-date-picker')).not.toHaveClass(
      'dnb-date-picker--opened'
    )

    const [day, month, year]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    expect(day.value).toBe('dd')
    expect(month.value).toBe('mm')
    expect(year.value).toBe('åååå')

    expect(dataContext.internalDataRef.current).toEqual({
      '/date': undefined,
    })
    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/date': {
        type: 'field',
        value: undefined,
      },
    })
  })

  it('should be able to hide and show submit, cancel and reset buttons', async () => {
    const { rerender } = render(
      <Field.Date showSubmitButton showCancelButton showResetButton />
    )

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    const [submitButton, resetButton, cancelButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__footer button')
    )

    expect(submitButton).toHaveTextContent('Custom Submit')
    expect(resetButton).toHaveTextContent('Custom Reset')
    expect(cancelButton).toHaveTextContent('Custom Cancel')
  })

  it('should support linked calendars', async () => {
    render(<Field.Date value="2024-11-01|2024-12-01" range link />)

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    const [firstDay] = Array.from(
      document.querySelectorAll('.dnb-date-picker__labels__day')
    )

    expect(firstDay).toHaveTextContent('ti')
    expect(firstDay).toHaveAttribute('aria-label', 'tirsdag')
  })

  it('should be able to set picker alignment', async () => {
    const { rerender } = render(<Field.Date alignPicker="right" opened />)

    expect(
      document.querySelector('.dnb-popover__arrow__arrow--right')
    ).toBeInTheDocument()

    rerender(<Field.Date alignPicker="left" opened />)
    expect(
      document.querySelector('.dnb-popover__arrow__arrow--left')
    ).toBeInTheDocument()
  })

  it('should be able to only show the month in calendar', async () => {
    render(<Field.Date onlyMonth />)

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    const calendar = document.querySelector('.dnb-date-picker__calendar')

    expect(
      calendar.querySelector('.dnb-date-picker__header--only-month-label')
    ).toBeInTheDocument()

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
            startDate: '2024-10-07',
            endDate: '2024-10-13',
          },
          {
            title: 'Whole month of October',
            startDate: '2024-10-01',
            endDate: '2024-10-31',
          },
        ]}
      />
    )

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    expect(onShow).toHaveBeenCalledTimes(1)
    expect(onShow).toHaveBeenLastCalledWith(
      expect.objectContaining({ date: '2024-10-31' })
    )
  })

  it('should support onHide event', async () => {
    const onHide = jest.fn()

    render(<Field.Date value="2024-10-31" onHide={onHide} />)

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )
    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )
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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

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

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    // dnb-date-picker__container is within dnb-date-picker__shell when portal is skipped (wrapped by Popover span)
    await waitFor(() => {
      expect(
        document.querySelector(
          '.dnb-date-picker__shell .dnb-date-picker__container'
        )
      ).toBeInTheDocument()
    })
    expect(
      document.body.querySelector('.dnb-date-picker__portal')
    ).not.toBeInTheDocument()
  })

  it('should support `yearNavigation`', async () => {
    const onChange = jest.fn()

    render(
      <Field.Date value="2025-04-16" yearNavigation onChange={onChange} />
    )

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    const [monthTitle, yearTitle] = Array.from(
      document.querySelectorAll('.dnb-date-picker__header__title')
    )

    const [prevMonthButton, prevYearButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__prev')
    )
    const [nextMonthButton, nextYearButton] = Array.from(
      document.querySelectorAll('.dnb-date-picker__next')
    )

    const [day, month, year] = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    ) as Array<HTMLInputElement>

    expect(prevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(nextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(prevYearButton).toHaveAttribute('aria-label', 'Forrige år 2024')
    expect(nextYearButton).toHaveAttribute('aria-label', 'Neste år 2026')

    await userEvent.click(prevYearButton)
    // Verify year
    expect(yearTitle).toHaveTextContent('2024')
    expect(yearTitle).toHaveAttribute('title', 'Valgt år 2024')
    expect(prevYearButton).toHaveAttribute('aria-label', 'Forrige år 2023')
    expect(nextYearButton).toHaveAttribute('aria-label', 'Neste år 2025')

    // Verify month
    expect(prevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(nextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(monthTitle).toHaveTextContent('april')
    expect(monthTitle).toHaveAttribute('title', 'Valgt måned april')

    await userEvent.click(nextYearButton)
    await userEvent.click(nextYearButton)

    // Verify year
    expect(yearTitle).toHaveTextContent('2026')
    expect(yearTitle).toHaveAttribute('title', 'Valgt år 2026')
    expect(prevYearButton).toHaveAttribute('aria-label', 'Forrige år 2025')
    expect(nextYearButton).toHaveAttribute('aria-label', 'Neste år 2027')

    // Verify month
    expect(prevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(nextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(monthTitle).toHaveTextContent('april')
    expect(monthTitle).toHaveAttribute('title', 'Valgt måned april')

    // Pick a new date
    await userEvent.click(screen.getByLabelText('onsdag 1. april 2026'))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('2026-04-01', expect.anything())
    expect(day).toHaveValue('01')
    expect(month).toHaveValue('04')
    expect(year).toHaveValue('2026')
    expect(screen.getByLabelText('onsdag 1. april 2026')).toHaveAttribute(
      'aria-current',
      'date'
    )
  })

  it('should support `yearNavigation` in range mode', async () => {
    const onChange = jest.fn()

    render(
      <Field.Date
        value="2025-04-16|2026-05-17"
        onChange={onChange}
        yearNavigation
        range
      />
    )

    await userEvent.click(
      document.querySelector('button.dnb-input__submit-button__button')
    )

    const [
      leftMonthTitle,
      leftYearTitle,
      rightMonthTitle,
      rightYearTitle,
    ] = Array.from(
      document.querySelectorAll('.dnb-date-picker__header__title')
    )

    const [
      leftPrevMonthButton,
      leftPrevYearButton,
      rightPrevMonthButton,
      rightPrevYearButton,
    ] = Array.from(document.querySelectorAll('.dnb-date-picker__prev'))

    const [
      leftNextMonthButton,
      leftNextYearButton,
      rightNextMonthButton,
      rightNextYearButton,
    ] = Array.from(document.querySelectorAll('.dnb-date-picker__next'))

    const [startDay, startMonth, startYear, endDay, endMonth, endYear] =
      Array.from(
        document.querySelectorAll('.dnb-date-picker__input')
      ) as Array<HTMLInputElement>

    // Verify initial label values
    // Left
    expect(leftPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(leftNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(leftPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2024'
    )
    expect(leftNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2026'
    )

    // Right
    expect(rightPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned april'
    )
    expect(rightNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned juni'
    )
    expect(rightPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2025'
    )
    expect(rightNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2027'
    )

    await userEvent.click(leftPrevYearButton)
    await userEvent.click(rightPrevYearButton)

    // Verify years
    // Left
    expect(leftYearTitle).toHaveTextContent('2024')
    expect(leftYearTitle).toHaveAttribute('title', 'Valgt år 2024')
    expect(leftPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2023'
    )
    expect(leftNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2025'
    )

    // Right
    expect(rightYearTitle).toHaveTextContent('2025')
    expect(rightYearTitle).toHaveAttribute('title', 'Valgt år 2025')
    expect(rightPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2024'
    )
    expect(rightNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2026'
    )

    // Verify months
    // Left
    expect(leftPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(leftNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(leftMonthTitle).toHaveTextContent('april')
    expect(leftMonthTitle).toHaveAttribute('title', 'Valgt måned april')

    // Right
    expect(rightMonthTitle).toHaveTextContent('mai')
    expect(rightMonthTitle).toHaveAttribute('title', 'Valgt måned mai')
    expect(rightPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned april'
    )
    expect(rightNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned juni'
    )

    await userEvent.click(leftNextYearButton)
    await userEvent.click(leftNextYearButton)
    await userEvent.click(rightNextYearButton)
    await userEvent.click(rightNextYearButton)

    // Verify years
    // Left
    expect(leftYearTitle).toHaveTextContent('2026')
    expect(leftYearTitle).toHaveAttribute('title', 'Valgt år 2026')
    expect(leftPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2025'
    )
    expect(leftNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2027'
    )

    // Right
    expect(rightYearTitle).toHaveTextContent('2027')
    expect(rightYearTitle).toHaveAttribute('title', 'Valgt år 2027')
    expect(rightPrevYearButton).toHaveAttribute(
      'aria-label',
      'Forrige år 2026'
    )
    expect(rightNextYearButton).toHaveAttribute(
      'aria-label',
      'Neste år 2028'
    )

    // Verify months
    // Left
    expect(leftPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned mars'
    )
    expect(leftNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned mai'
    )
    expect(leftMonthTitle).toHaveTextContent('april')
    expect(leftMonthTitle).toHaveAttribute('title', 'Valgt måned april')

    // Right
    expect(rightMonthTitle).toHaveTextContent('mai')
    expect(rightMonthTitle).toHaveAttribute('title', 'Valgt måned mai')
    expect(rightPrevMonthButton).toHaveAttribute(
      'aria-label',
      'Forrige måned april'
    )
    expect(rightNextMonthButton).toHaveAttribute(
      'aria-label',
      'Neste måned juni'
    )

    // Pick new dates
    await userEvent.click(screen.getByLabelText('onsdag 1. april 2026'))
    await userEvent.click(screen.getByLabelText('lørdag 1. mai 2027'))

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(
      '2026-04-01|2027-05-01',
      expect.anything()
    )
    // Start date
    expect(startDay).toHaveValue('01')
    expect(startMonth).toHaveValue('04')
    expect(startYear).toHaveValue('2026')
    expect(screen.getByLabelText('onsdag 1. april 2026')).toHaveAttribute(
      'aria-current',
      'date'
    )

    // End date
    expect(endDay).toHaveValue('01')
    expect(endMonth).toHaveValue('05')
    expect(endYear).toHaveValue('2027')
    expect(screen.getByLabelText('lørdag 1. mai 2027')).toHaveAttribute(
      'aria-current',
      'date'
    )
  })

  it('should export `dateValidator`', async () => {
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
      const { dateValidator } = validators

      return [myOnBlurValidator, dateValidator]
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

    // Test myOnBlurValidator
    await userEvent.type(day, '{Backspace>2}01')
    await userEvent.click(document.body)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).toBeInTheDocument()

    expect(screen.getByRole('alert')).toHaveTextContent(
      'My custom message'
    )

    await userEvent.type(day, '{Backspace>2}03')
    await userEvent.click(document.body)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).toBeInTheDocument()

    const [firstMessage, secondMessage] = Array.from(
      document.querySelectorAll('.dnb-li')
    )

    expect(firstMessage).toHaveTextContent('My custom message 1')
    expect(secondMessage).toHaveTextContent('My custom message 2')

    // Test date limit (min|max) validator
    await userEvent.type(month, '{Backspace>2}12')
    await userEvent.click(document.body)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).toBeInTheDocument()

    expect(
      document.querySelector('.dnb-form-status__text')
    ).toHaveTextContent(
      nb.Date.errorMaxDate.replace(
        /\{date\}/,
        formatDate(maxDate, options.no)
      )
    )

    await userEvent.type(day, '{Backspace>2}31122024')
    await userEvent.click(document.body)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).toBeInTheDocument()

    expect(
      document.querySelector('.dnb-form-status__text')
    ).toHaveTextContent(
      nb.Date.errorMinDate.replace(
        /\{date\}/,
        formatDate(minDate, options.no)
      )
    )

    await userEvent.type(day, '{Backspace>2}02012025')
    await userEvent.click(document.body)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()

    // Test invalid date validator
    await userEvent.type(day, '99999999')
    await userEvent.click(document.body)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-form-status__text')
    ).toHaveTextContent(nb.Date.errorInvalidDate)

    await userEvent.type(day, '{Backspace>2}02012025')
    await userEvent.click(document.body)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()
  })

  it('should disable `dateValidator` if `onBlurValidation` is set to `false`', async () => {
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

    const [dayInput, monthInput]: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll('.dnb-date-picker__input')
    )

    await userEvent.click(dayInput)
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.click(document.body)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()

    await userEvent.click(monthInput)
    await userEvent.keyboard('{ArrowUp>2}')
    await userEvent.click(document.body)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()

    await userEvent.click(dayInput)
    await userEvent.keyboard('99999999')
    await userEvent.click(document.body)

    expect(
      document.querySelector('.dnb-form-status--error')
    ).not.toBeInTheDocument()
  })

  describe('startMonth and endMonth', () => {
    it('should display correct start and end month on opening the date picker', async () => {
      render(
        <Field.Date startMonth="2024-01-01" endMonth="2024-12-31" range />
      )

      await userEvent.click(
        document.querySelector('button.dnb-input__submit-button__button')
      )

      const [startMonth, endMonth] = Array.from(
        document.querySelectorAll('.dnb-date-picker__header__title')
      )

      expect(startMonth).toHaveTextContent('januar 2024')
      expect(endMonth).toHaveTextContent('desember 2024')
    })
  })

  describe('minDate and maxDate', () => {
    it('should have functioning `minDate` and `maxDate`', async () => {
      render(
        <Field.Date
          value="2024-10-01|2024-10-31"
          minDate="2024-10-01"
          maxDate="2024-10-31"
          range
        />
      )

      await userEvent.click(
        document.querySelector('button.dnb-input__submit-button__button')
      )

      const [rightCalendar, leftCalendar] = Array.from(
        document.querySelectorAll('.dnb-date-picker__calendar')
      )

      const rightPrev = rightCalendar.querySelector(
        '.dnb-date-picker__prev'
      )
      const rightNext = rightCalendar.querySelector(
        '.dnb-date-picker__next'
      )
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

    it('should support `minDate` and `maxDate` as date objects', async () => {
      render(
        <Form.Handler>
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
        </Form.Handler>
      )

      await userEvent.click(
        document.querySelector('button.dnb-input__submit-button__button')
      )

      // Clicking the minDate should not trigger error
      await userEvent.click(screen.getByLabelText('torsdag 13. mars 2025'))
      await userEvent.click(screen.getByText('Neste'))
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      // Clicking the maxDate should not trigger error
      await userEvent.click(screen.getByText('Tilbake'))
      await userEvent.click(
        document.querySelector('button.dnb-input__submit-button__button')
      )
      await userEvent.click(screen.getByLabelText('mandag 31. mars 2025'))
      await userEvent.click(screen.getByText('Neste'))
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      // Double check that dates before min and max date are disabled in the calendar
      await userEvent.click(screen.getByText('Tilbake'))
      await userEvent.click(
        document.querySelector('button.dnb-input__submit-button__button')
      )
      expect(
        screen.getByLabelText('onsdag 12. mars 2025')
      ).toHaveAttribute('disabled')
      expect(
        screen.getByLabelText('tirsdag 1. april 2025')
      ).toHaveAttribute('disabled')
    })

    it('should support `minDate` and `maxDate` as ISO strings', async () => {
      render(
        <Form.Handler>
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
        </Form.Handler>
      )

      await userEvent.click(
        document.querySelector('button.dnb-input__submit-button__button')
      )

      // Clicking the minDate should not trigger error
      await userEvent.click(screen.getByLabelText('torsdag 13. mars 2025'))
      await userEvent.click(screen.getByText('Neste'))
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      // Clicking the maxDate should not trigger error
      await userEvent.click(screen.getByText('Tilbake'))
      await userEvent.click(
        document.querySelector('button.dnb-input__submit-button__button')
      )
      await userEvent.click(screen.getByLabelText('mandag 31. mars 2025'))
      await userEvent.click(screen.getByText('Neste'))
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      // Double check that dates before min and max date are disabled in the calendar
      await userEvent.click(screen.getByText('Tilbake'))
      await userEvent.click(
        document.querySelector('button.dnb-input__submit-button__button')
      )
      expect(
        screen.getByLabelText('onsdag 12. mars 2025')
      ).toHaveAttribute('disabled')
      expect(
        screen.getByLabelText('tirsdag 1. april 2025')
      ).toHaveAttribute('disabled')
    })

    describe('validation', () => {
      it('should display error message if `value` is before `minDate`', async () => {
        const minDate = '2025-01-01'

        render(<Field.Date value={minDate} minDate={minDate} />)

        const day = document.querySelector(
          '.dnb-date-picker__input--day'
        ) as HTMLInputElement

        expect(
          document.querySelector('.dnb-form-status--error')
        ).not.toBeInTheDocument()

        await userEvent.type(day, '{Backspace>2}3112024')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toHaveTextContent(
          nb.Date.errorMinDate.replace(
            /\{date\}/,
            formatDate(minDate, options.no)
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

        await userEvent.type(day, '{Backspace>2}01022025')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toHaveTextContent(
          nb.Date.errorMaxDate.replace(
            /\{date\}/,
            formatDate(maxDate, options.no)
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

        await userEvent.type(startDay, '{Backspace>2}3112024')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toHaveTextContent(
          nb.Date.errorStartDateMinDate.replace(
            /\{date\}/,
            formatDate(minDate, options.no)
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

        await userEvent.type(startDay, '{Backspace>2}01022025')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toHaveTextContent(
          nb.Date.errorStartDateMaxDate.replace(
            /\{date\}/,
            formatDate(maxDate, options.no)
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

        await userEvent.type(endDay, '{backspace>2}3112024')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toHaveTextContent(
          nb.Date.errorEndDateMinDate.replace(
            /\{date\}/,
            formatDate(minDate, options.no)
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

        await userEvent.type(endDay, '{Backspace>2}01022025')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toHaveTextContent(
          nb.Date.errorEndDateMaxDate.replace(
            /\{date\}/,
            formatDate(maxDate, options.no)
          )
        )
      })

      it('should display error messages if start date and end date is outside of `minDate` and `maxDate` in `range` mode', async () => {
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

        const [startDay, endDay] = Array.from(
          document.querySelectorAll('.dnb-date-picker__input--day')
        ) as Array<HTMLInputElement>

        expect(
          document.querySelector('.dnb-form-status--error')
        ).not.toBeInTheDocument()

        // Focus on day inputs and select out of limit dates
        await userEvent.type(startDay, '{Backspace>2}3112024')
        await userEvent.type(endDay, '{Backspace>2}01022025')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()

        const statusText = document.querySelector('.dnb-form-status__text')

        expect(statusText).toHaveTextContent(nb.Field.errorSummary)

        expect(getMessages().at(0)).toHaveTextContent(
          nb.Date.errorStartDateMinDate.replace(
            /\{date\}/,
            formatDate(minDate, options.no)
          )
        )
        expect(getMessages().at(1)).toHaveTextContent(
          nb.Date.errorEndDateMaxDate.replace(
            /\{date\}/,
            formatDate(maxDate, options.no)
          )
        )

        await userEvent.type(startDay, '{Backspace>2}01022025')
        await userEvent.click(document.body)

        expect(getMessages().at(0)).toHaveTextContent(
          nb.Date.errorStartDateMaxDate.replace(
            /\{date\}/,
            formatDate(maxDate, options.no)
          )
        )
        expect(getMessages().at(1)).toHaveTextContent(
          nb.Date.errorEndDateMaxDate.replace(
            /\{date\}/,
            formatDate(maxDate, options.no)
          )
        )

        await userEvent.type(endDay, '{Backspace>2}31122024')
        await userEvent.click(document.body)

        expect(getMessages().at(0)).toHaveTextContent(
          nb.Date.errorStartDateMaxDate.replace(
            /\{date\}/,
            formatDate(maxDate, options.no)
          )
        )
        expect(getMessages().at(1)).toHaveTextContent(
          nb.Date.errorEndDateMinDate.replace(
            /\{date\}/,
            formatDate(minDate, options.no)
          )
        )

        await userEvent.type(startDay, '{Backspace>2}31122024')
        await userEvent.click(document.body)

        expect(getMessages().at(0)).toHaveTextContent(
          nb.Date.errorStartDateMinDate.replace(
            /\{date\}/,
            formatDate(minDate, options.no)
          )
        )
        expect(getMessages().at(1)).toHaveTextContent(
          nb.Date.errorEndDateMinDate.replace(
            /\{date\}/,
            formatDate(minDate, options.no)
          )
        )

        await userEvent.type(startDay, '{Backspace>2}01012025')
        await userEvent.type(endDay, '{Backspace>2}31012025')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).not.toBeInTheDocument()
      })

      it('should validate `minDate` limits based on `value` prop', async () => {
        const minDate = '2025-01-01'

        render(
          <Field.Date
            value="2024-12-31"
            minDate={minDate}
            validateInitially
          />
        )

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
            formatDate(minDate, options.no)
          )
        )

        await userEvent.type(day, '{Backspace>2}01012025')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).not.toBeInTheDocument()
      })

      it('should validate `maxDate` based on `value` prop', async () => {
        const maxDate = '2025-01-31'

        render(
          <Field.Date
            value="2025-02-01"
            maxDate={maxDate}
            validateInitially
          />
        )

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
            formatDate(maxDate, options.no)
          )
        )

        await userEvent.type(day, '{Backspace>2}31012025')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).not.toBeInTheDocument()
      })

      it('should validate `minDate` and `maxDate` based on `value` prop in `range` mode', async () => {
        const minDate = '2025-01-01'
        const maxDate = '2025-01-31'

        render(
          <Field.Date
            value="2024-12-31|2025-02-01"
            minDate={minDate}
            maxDate={maxDate}
            validateInitially
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
            formatDate(minDate, options.no)
          )
        )
        expect(endDayError).toHaveTextContent(
          nb.Date.errorEndDateMaxDate.replace(
            /\{date\}/,
            formatDate(maxDate, options.no)
          )
        )

        await userEvent.type(startDay, '{Backspace>2}01012025')
        await userEvent.type(endDay, '{Backspace>2}31012025')
        await userEvent.click(document.body)

        expect(
          document.querySelector('.dnb-form-status--error')
        ).not.toBeInTheDocument()
      })
    })
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

  describe('error handling', () => {
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
          <Form.Handler ajvInstance={makeAjvInstance()}>
            <Field.Date
              value="2023-12-0"
              schema={{ type: 'string', minLength: 10 }}
              validateUnchanged
            />
          </Form.Handler>
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

  describe('popover alignment', () => {
    it('should align popover to right when width is large and showInput is true', async () => {
      let capturedAlignPicker: string | undefined

      const DatePickerModule = await import(
        '../../../../../components/date-picker/DatePicker'
      )

      jest
        .spyOn(DatePickerModule, 'default')
        .mockImplementation((props) => {
          capturedAlignPicker = props.alignPicker
          // Return a simple div to avoid rendering the full DatePicker
          return React.createElement('div', {
            'data-testid': 'date-picker-mock',
          })
        })

      render(
        <Field.Date
          label="Date"
          width="large"
          showInput
          value="2023-01-16"
        />
      )

      // Verify alignPicker is 'right' when width is large and showInput is true
      // When the change is present: alignPicker should be 'right'
      // When reverted: alignPicker should be undefined
      expect(capturedAlignPicker).toBe('right')

      jest.restoreAllMocks()
    })

    it('should align popover to right when width is stretch and showInput is true', async () => {
      let capturedAlignPicker: string | undefined

      const DatePickerModule = await import(
        '../../../../../components/date-picker/DatePicker'
      )

      jest
        .spyOn(DatePickerModule, 'default')
        .mockImplementation((props) => {
          capturedAlignPicker = props.alignPicker
          // Return a simple div to avoid rendering the full DatePicker
          return React.createElement('div', {
            'data-testid': 'date-picker-mock',
          })
        })

      render(
        <Field.Date
          label="Date"
          width="stretch"
          showInput
          value="2023-01-16"
        />
      )

      // Verify alignPicker is 'right' when width is stretch and showInput is true
      // When the change is present: alignPicker should be 'right'
      // When reverted: alignPicker should be undefined
      expect(capturedAlignPicker).toBe('right')

      jest.restoreAllMocks()
    })

    it('should not align popover to right when width is large but showInput is false', async () => {
      let capturedAlignPicker: string | undefined

      const DatePickerModule = await import(
        '../../../../../components/date-picker/DatePicker'
      )

      jest
        .spyOn(DatePickerModule, 'default')
        .mockImplementation((props) => {
          capturedAlignPicker = props.alignPicker
          // Return a simple div to avoid rendering the full DatePicker
          return React.createElement('div', {
            'data-testid': 'date-picker-mock',
          })
        })

      render(
        <Field.Date
          label="Date"
          width="large"
          showInput={false}
          value="2023-01-16"
        />
      )

      // Verify alignPicker is undefined when showInput is false
      expect(capturedAlignPicker).toBeUndefined()

      jest.restoreAllMocks()
    })

    it('should not align popover to right when width is small and showInput is true', async () => {
      let capturedAlignPicker: string | undefined

      const DatePickerModule = await import(
        '../../../../../components/date-picker/DatePicker'
      )

      jest
        .spyOn(DatePickerModule, 'default')
        .mockImplementation((props) => {
          capturedAlignPicker = props.alignPicker
          // Return a simple div to avoid rendering the full DatePicker
          return React.createElement('div', {
            'data-testid': 'date-picker-mock',
          })
        })

      render(
        <Field.Date
          label="Date"
          width="small"
          showInput
          value="2023-01-16"
        />
      )

      // Verify alignPicker is undefined when width is small
      expect(capturedAlignPicker).toBeUndefined()

      jest.restoreAllMocks()
    })
  })

  describe('required', () => {
    it('should show required error when not completing the date', async () => {
      render(<Field.Date required />)

      const [startDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      await userEvent.type(startDay, '0101202')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(nb.Date.errorRequired)
    })

    it('should show required error when not completing the date in range mode', async () => {
      render(<Field.Date range required />)

      const [startDay, endDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      await userEvent.type(startDay, '01012025')
      await userEvent.type(endDay, '0202202')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-form-status__text')
      ).toHaveTextContent(nb.Date.errorRequiredRange)
    })

    it('should not show required error when moving to next input when in range mode', async () => {
      render(<Field.Date range required />)

      const [startDay, endDay] = Array.from(
        document.querySelectorAll('.dnb-date-picker__input--day')
      ) as Array<HTMLInputElement>

      // Type a complete start date
      await userEvent.type(startDay, '01012025')
      await userEvent.click(endDay)

      // The component may not validate immediately when moving between inputs
      // Only validate when explicitly blurring or submitting
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()

      // Type a complete end date
      await userEvent.type(endDay, '02022025')
      await userEvent.click(document.body)

      // The component should validate that both dates are complete
      // If there's still an error, it means the dates are not being recognized as valid
      const errorText =
        document.querySelector('.dnb-form-status__text')?.textContent || ''

      // Check that the error message is the expected required error
      expect(errorText).toContain(nb.Date.errorRequiredRange)
    })
  })

  it('should validate continuously when validateContinuously is enabled', async () => {
    render(<Field.Date validateContinuously />)

    const dayInput = document.querySelector(
      '.dnb-date-picker__input--day'
    ) as HTMLInputElement

    // Type invalid date - error should appear during typing
    await userEvent.click(dayInput)
    dayInput.setSelectionRange(0, 0)
    await userEvent.keyboard('39192025')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        nb.Date.errorInvalidDate
      )
    })

    // Fix the date - error should disappear during typing
    await userEvent.click(dayInput)
    dayInput.setSelectionRange(0, 0)
    await userEvent.keyboard('11122025')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    // Type invalid date again - error should appear again
    await userEvent.click(dayInput)
    dayInput.setSelectionRange(0, 0)
    await userEvent.keyboard('99999999')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        nb.Date.errorInvalidDate
      )
    })
  })

  it('should call onStatusChange when validateContinuously reveals validation errors', async () => {
    const onStatusChange = jest.fn()

    render(
      <Field.Date
        onStatusChange={onStatusChange}
        validateContinuously
        required
      />
    )

    const dayInput = document.querySelector(
      '.dnb-date-picker__input--day'
    ) as HTMLInputElement

    // Type invalid date
    await userEvent.click(dayInput)
    dayInput.setSelectionRange(0, 0)
    await userEvent.keyboard('39192025')

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled()
      expect(onStatusChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          error: expect.anything(),
        })
      )
    })

    // Clear mock to track new calls
    onStatusChange.mockClear()

    // Type valid date
    await userEvent.click(dayInput)
    dayInput.setSelectionRange(0, 0)
    await userEvent.keyboard('11122025')

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled()
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: undefined,
      })
    })
  })

  it('should call onStatusChange when error prop changes without validateContinuously', async () => {
    const onStatusChange = jest.fn()
    const error1 = new Error('Error 1')
    const error2 = new Error('Error 2')

    const { rerender } = render(
      <Field.Date onStatusChange={onStatusChange} error={undefined} />
    )

    // Initially no error should be called
    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(0)
    })

    // Set error prop
    rerender(<Field.Date onStatusChange={onStatusChange} error={error1} />)

    // Wait for onStatusChange to be called with error
    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(1)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: error1,
      })
    })

    // Change to different error
    rerender(<Field.Date onStatusChange={onStatusChange} error={error2} />)

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(2)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: error2,
      })
    })

    // Clear error
    rerender(
      <Field.Date onStatusChange={onStatusChange} error={undefined} />
    )

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(3)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: undefined,
      })
    })
  })
})
