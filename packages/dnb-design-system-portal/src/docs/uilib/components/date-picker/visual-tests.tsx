import { Provider } from '@dnb/eufemia/shared'
import { DatePicker, Flex } from '@dnb/eufemia/src'
import { isSameDay } from 'date-fns'
import {
  DatePickerLinked,
  DatePickerNoInputStatus,
  DatePickerErrorMessage,
  DatePickerTrigger,
} from './Examples'

export default function Page() {
  return (
    <>
      <DatePickerAlignPickerRight />
      <DatePickerAlignPickerRightWithInput />
      <DatePickerYearNavigationOpen />
      <DatePickerOnlyMonthOpen />
      <DatePickerScreenshotTestSizes />
      <DatePickerScreenshotTestDisabled />
      <DatePickerLabelAlignmentRight />
      <DatePickerLabelAlignmentWithButtonRight />
      <DatePickerLinked />
      <DatePickerNoInputStatus />
      <DatePickerErrorMessage />
      <DatePickerRangeMode />
      <DatePickerTrigger />
    </>
  )
}

const DatePickerScreenshotTestSizes = () => {
  return (
    <div data-visual-test="date-picker-sizes">
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <Flex.Vertical>
          <DatePicker
            label="DatePicker"
            date={new Date('2022/06/10')}
            showInput
          />
          <DatePicker
            size="small"
            label="DatePicker"
            date={new Date('2022/06/10')}
            showInput
          />
          <DatePicker
            size="medium"
            label="DatePicker"
            date={new Date('2022/06/10')}
            showInput
          />
          <DatePicker
            size="large"
            label="DatePicker"
            date={new Date('2022/06/10')}
            showInput
          />
        </Flex.Vertical>
      </Provider>
    </div>
  )
}

const DatePickerScreenshotTestDisabled = () => {
  return (
    <div data-visual-test="date-picker-disabled">
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <Flex.Vertical>
          <DatePicker disabled />
          <DatePicker showInput disabled />
        </Flex.Vertical>
      </Provider>
    </div>
  )
}

const DatePickerLabelAlignmentRight = () => (
  <div data-visual-test="date-picker-label-alignment-right">
    <DatePicker label="Label" labelAlignment="right" />
  </div>
)

const DatePickerLabelAlignmentWithButtonRight = () => (
  <div data-visual-test="date-picker-with-button-label-alignment-right">
    <DatePicker label="Label" labelAlignment="right" showInput />
  </div>
)

const DatePickerYearNavigationOpen = () => (
  <div
    data-visual-test="date-picker-year-navigation"
    style={{ width: '350px', height: '430px' }}
  >
    <DatePicker date="2025-05-12" yearNavigation opened left top />
  </div>
)

const DatePickerOnlyMonthOpen = () => (
  <div
    data-visual-test="date-picker-only-month"
    style={{ width: '350px', height: '350px' }}
  >
    <Flex.Horizontal innerSpace>
      <DatePicker date="2025-05-20" onlyMonth opened />
    </Flex.Horizontal>
  </div>
)

const DatePickerAlignPickerRight = () => (
  <div
    data-visual-test="date-picker-align-picker-right"
    style={{ width: '350px', height: '430px' }}
  >
    <Flex.Horizontal justify="flex-end" innerSpace>
      <DatePicker
        alignPicker="right"
        opened
        date="2025-05-20"
        onDaysRender={(days) => {
          return days.map((dayObject) => {
            dayObject.isToday = isSameDay(
              dayObject.date,
              new Date('2025-05-22'),
            )
            return dayObject
          })
        }}
      />
    </Flex.Horizontal>
  </div>
)

const DatePickerAlignPickerRightWithInput = () => (
  <div
    data-visual-test="date-picker-align-picker-right-with-input"
    style={{ width: '350px', height: '430px' }}
  >
    <Flex.Horizontal justify="flex-end" innerSpace right>
      <DatePicker
        showInput
        alignPicker="right"
        opened
        date="2025-05-20"
        onDaysRender={(days) => {
          return days.map((dayObject) => {
            dayObject.isToday = isSameDay(
              dayObject.date,
              new Date('2025-05-22'),
            )
            return dayObject
          })
        }}
      />
    </Flex.Horizontal>
  </div>
)

const DatePickerRangeMode = () => (
  <div
    data-visual-test="date-picker-calendar-range"
    style={{
      display: 'inline-flex',
      background: 'white',
      padding: '1rem',
    }}
  >
    <DatePicker
      inline
      range
      startDate="2019-05-05"
      endDate="2019-06-05"
      onDaysRender={(days) => {
        return days.map((dayObject) => {
          dayObject.isToday = isSameDay(
            dayObject.date,
            new Date('2019-06-07'),
          )
          return dayObject
        })
      }}
    />
  </div>
)
