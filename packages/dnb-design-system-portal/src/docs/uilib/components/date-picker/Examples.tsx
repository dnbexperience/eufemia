/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import addDays from 'date-fns/addDays'
import startOfMonth from 'date-fns/startOfMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import lastDayOfWeek from 'date-fns/lastDayOfWeek'
import isWeekend from 'date-fns/isWeekend'
import { DatePicker, Flex, HelpButton } from '@dnb/eufemia/src'
import { Provider } from '@dnb/eufemia/src/shared'

const Wrapper = styled.div`
  [data-visual-test='date-picker-calendar'] .dnb-date-picker__container,
  [data-visual-test='date-picker-only-month'] .dnb-date-picker__container,
  [data-visual-test='date-picker-year-navigation']
    .dnb-date-picker__container {
    display: block;
    position: relative;
    top: 0;
  }
  [data-visual-test='date-picker-calendar'] .dnb-date-picker,
  [data-visual-test='date-picker-only-month'] .dnb-date-picker,
  [data-visual-test='date-picker-year-navigation'] .dnb-date-picker {
    margin-left: 1rem;
  }
`

export const DatePickerRange = () => (
  <ComponentBox
    scope={{
      addDays,
      startOfMonth,
      lastDayOfMonth,
      startOfWeek,
      lastDayOfWeek,
    }}
  >
    <DatePicker
      label="DatePicker"
      startDate="2019-04-01"
      endDate="2019-05-17"
      range={true}
      showInput={true}
      onChange={({ startDate, endDate }) => {
        console.log('onChange', startDate, endDate)
      }}
      onSubmit={({ startDate, endDate }) => {
        console.log('onSubmit', startDate, endDate)
      }}
      onCancel={({ startDate, endDate }) => {
        console.log('onCancel', startDate, endDate)
      }}
      onBlur={({
        startDate,
        endDate,
        partialStartDate,
        partialEndDate,
      }) => {
        console.log('onBlurPartial', partialStartDate, partialEndDate)
        console.log('onBlurComplete', startDate, endDate)
      }}
      shortcuts={[
        {
          title: 'Set date period',
          startDate: '1969-07-15',
          endDate: '1969-08-15',
        },
        {
          title: 'Today',
          startDate: new Date(),
        },
        {
          title: 'This week',
          startDate: startOfWeek(new Date()),
          endDate: lastDayOfWeek(new Date()),
        },
        {
          closeOnSelect: true,
          title: 'This month',
          startDate: startOfMonth(new Date()),
          endDate: lastDayOfMonth(new Date()),
        },
        {
          title: 'Relative +3 days',
          startDate: ({ startDate }) => startDate || new Date(),
          endDate: ({ endDate }) => addDays(endDate || new Date(), 3),
        },
      ]}
    />
  </ComponentBox>
)

export const DatePickerWithInput = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date={new Date()}
      showInput={true}
      showCancelButton={true}
      showResetButton={true}
      onChange={({ date }) => {
        console.log('onChange', date)
      }}
      onCancel={({ date }) => {
        console.log('onCancel', date)
      }}
      onBlur={({ date }) => {
        console.log('onBlur', date)
      }}
    />
  </ComponentBox>
)

export const DatePickerTrigger = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-trigger-default">
      <DatePicker
        label="DatePicker"
        date="2019-05-05"
        returnFormat="dd-MM-yyyy"
        onChange={({ date }) => {
          console.log('onChange', date)
        }}
        onShow={({ date }) => {
          console.log('onShow', date)
        }}
        onBlur={({ startDate, endDate }) => {
          console.log('onBlur', startDate, endDate)
        }}
      />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerHiddenNav = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date="2022/05/05"
      minDate="2022/05/01"
      maxDate="2022/05/17"
      dateFormat="yyyy/MM/dd"
      returnFormat="dd/MM/yyyy"
      hideNavigation={true}
      hideDays={true}
      onChange={({ date }) => {
        console.log('onChange', date)
      }}
      onHide={({ date }) => {
        console.log('onHide', date)
      }}
      onBlur={({ date }) => {
        console.log('onBlur', date)
      }}
    />
  </ComponentBox>
)

export const DatePickerMonthOnly = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date="05/02/2019"
      dateFormat="MM/dd/yyyy"
      onlyMonth={true}
    />
  </ComponentBox>
)

export const DatePickerStatusMessage = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date={new Date()}
      showInput={true}
      status="Please select a valid date"
      statusState="info"
    />
  </ComponentBox>
)

export const DatePickerSuffix = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date={new Date()}
      showInput
      suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
    />
  </ComponentBox>
)

export const DatePickerLinked = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-input">
      <DatePicker label="DatePicker" range link showInput />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerNoInputStatus = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-trigger-error">
      <DatePicker
        label="DatePicker"
        date="2019-05-05"
        hideNavigation={true}
        status="Please select a valid date"
      />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerErrorMessage = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-input-error">
      <DatePicker
        label="DatePicker"
        date="2019-05-05"
        showInput={true}
        showSubmitButton={true}
        stretch={true}
        status={
          <span>
            Status message with <b>HTML</b> inside
          </span>
        }
      />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerErrorStatus = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date={new Date()}
      hideNavigation={true}
      status="error"
    />
  </ComponentBox>
)

export const DatePickerCalendar = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-calendar">
      <DatePicker
        opened={true}
        preventClose={true}
        disableAutofocus={true}
        range={true}
        startDate="2019-05-05"
        endDate="2019-06-05"
        skipPortal
      />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerScreenshotTestSizes = () => {
  return (
    <Wrapper>
      <ComponentBox data-visual-test="date-picker-sizes">
        <Provider formElement={{ labelDirection: 'vertical' }}>
          <Flex.Vertical>
            <DatePicker
              label="DatePicker"
              date={new Date('2022/06/10')}
              showInput={true}
            />
            <DatePicker
              size="small"
              label="DatePicker"
              date={new Date('2022/06/10')}
              showInput={true}
            />
            <DatePicker
              size="medium"
              label="DatePicker"
              date={new Date('2022/06/10')}
              showInput={true}
            />
            <DatePicker
              size="large"
              label="DatePicker"
              date={new Date('2022/06/10')}
              showInput={true}
            />
          </Flex.Vertical>
        </Provider>
      </ComponentBox>
    </Wrapper>
  )
}

export const DatePickerScreenshotTestDisabled = () => {
  return (
    <Wrapper>
      <ComponentBox data-visual-test="date-picker-disabled">
        <Provider formElement={{ labelDirection: 'vertical' }}>
          <Flex.Vertical>
            <DatePicker disabled />
            <DatePicker showInput={true} disabled />
          </Flex.Vertical>
        </Provider>
      </ComponentBox>
    </Wrapper>
  )
}

export const DatePickerDateFns = () => (
  <ComponentBox scope={{ addDays }} hidePreview hideToolbar>
    <DatePicker
      shortcuts={[
        { title: 'Set date', date: '1969-07-15' },
        {
          title: 'Relative +3 days',
          date: ({ date }) => date && addDays(date, 3),
        },
      ]}
    />
  </ComponentBox>
)

export const DatePickerDateFnsRange = () => (
  <ComponentBox
    scope={{ startOfMonth, lastDayOfMonth }}
    hidePreview
    hideToolbar
  >
    <DatePicker
      shortcuts={[
        {
          title: 'Set date period',
          startDate: '1969-07-15',
          endDate: '1969-07-15',
          closeOnSelect: true, // will close the picker
        },
        {
          title: 'This month',
          startDate: startOfMonth(new Date()),
          endDate: lastDayOfMonth(new Date()),
        },
      ]}
    />
  </ComponentBox>
)

export const DatePickerDateFnsRangeIsWeekend = () => (
  <ComponentBox scope={{ isWeekend }} hidePreview>
    <DatePicker
      onDaysRender={(days, calendarNumber = 0) => {
        return days.map((dayObject) => {
          if (isWeekend(dayObject.date)) {
            dayObject.isInactive = true
            dayObject.className = 'dnb-date-picker__day--weekend' // custom css
          }
          return dayObject
        })
      }}
    />
  </ComponentBox>
)

export const DatePickerLabelAlignmentRight = () => (
  <ComponentBox data-visual-test="date-picker-label-alignment-right">
    <DatePicker label="Label" labelAlignment="right" />
  </ComponentBox>
)

export const DatePickerLabelAlignmentWithButtonRight = () => (
  <ComponentBox data-visual-test="date-picker-with-button-label-alignment-right">
    <DatePicker label="Label" labelAlignment="right" showInput={true} />
  </ComponentBox>
)

export const DatePickerYearNavigation = () => (
  <ComponentBox>
    <DatePicker showInput yearNavigation />
  </ComponentBox>
)

export const DatePickerYearNavigationOpen = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-year-navigation">
      <DatePicker
        date="2025-05-12"
        yearNavigation
        opened
        skipPortal
        preventClose
        disableAutofocus
      />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerOnlyMonthOpen = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-only-month">
      <DatePicker date="2025-05-20" onlyMonth opened skipPortal />
    </ComponentBox>
  </Wrapper>
)
