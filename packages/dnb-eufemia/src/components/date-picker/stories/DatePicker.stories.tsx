/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import startOfMonth from 'date-fns/startOfMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import addDays from 'date-fns/addDays'
import Provider from '../../../shared/Provider'
import Context from '../../../shared/Context'
import nbNO from '../../../shared/locales/nb-NO'
import isWeekend from 'date-fns/isWeekend'
import svLocale from 'date-fns/locale/sv'

import {
  DatePicker,
  Button,
  Dropdown,
  Input,
  Section,
  GlobalStatus,
  Flex,
} from '../..'
import { FieldBlock } from '../../../extensions/forms'

export default {
  title: 'Eufemia/Components/DatePicker',
}

const Scrollbar = styled.div`
  height: 10rem;
  padding: 1rem;
  overflow-x: scroll;

  background: yellow;
`
const ScrollbarInner = styled.div`
  width: 110%;
  height: 100%;
`

const ChangeLocale = () => {
  const {
    setLocale,
    // setCurrentLocale,// to update only the current context
    locale,
  } = React.useContext(Context)

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLocale('en-GB')
  //   }, 2e3)
  // }, [])

  return (
    <Dropdown
      value={locale}
      data={{ 'en-GB': 'English', 'nb-NO': 'Norsk' }}
      on_change={({ data: { value } }) => {
        setLocale(value)
      }}
    />
  )
}

export const DatePickerSandbox = () => (
  <Wrapper>
    <Box>
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <DatePicker
          label="Linked Range DatePicker:"
          // labelDirection="vertical"
          // startDate={new Date()}
          startDate="2019-01-15"
          // startDate="2020-11-01"
          endDate="2020-11-02"
          // minDate="2020-10-28"
          // maxDate="2020-11-03"
          range={true}
          // link={true}
          // sync={false}
          // opened={true}
          showInput={true}
          onShow={(props) => {
            console.log('onShow', props)
          }}
          onDaysRender={(
            days
            // , nr
          ) => {
            // console.log('onDaysRender', nr, days)

            return days.map((dateObject) => {
              // console.log('dateObject', dateObject)
              if (isWeekend(dateObject.date)) {
                // console.log('dateObject', dateObject)
                dateObject.isInactive = true
                // dateObject.isDisabled = true
                // dateObject.isSelectable = false
                dateObject.className = 'dnb-date-picker__day--weekend'
              }
              return dateObject
            })
          }}
          onHide={(props) => {
            console.log('onHide', props)
          }}
          onChange={(props) => {
            console.log('onChange', props)
          }}
          onType={(props) => {
            console.log('onType', props)
          }}
          onSubmit={(props) => {
            console.log('onSubmit', props)
          }}
          onCancel={(props) => {
            console.log('onCancel', props)
          }}
          onReset={(props) => {
            console.log('onReset', props)
          }}
          showCancelButton
          showResetButton
          showSubmitButton
          // status="Please select a valid date"
        />
      </Provider>
    </Box>
    <Box>
      <DatePicker
        // opened
        showInput
        showSubmitButton
        showCancelButton
        enableKeyboardNav
        inputElement={<Input value="custom value" />}
        shortcuts={[
          { title: 'Set date', date: '2019-11-15' },
          {
            title: 'Relative +3 days',
            date: ({ date }) => date && addDays(date, 3),
          },
        ]}
        right
      />
      <DatePicker
        showInput
        inputElement={() => <Input value="custom value" />}
        range
        shortcuts={JSON.stringify([
          {
            title: 'Set cake',
            start_date: '1981-01-15',
            end_date: '1981-02-15',
          },
          {
            title: 'This stake',
            start_date: startOfMonth(new Date()),
            end_date: lastDayOfMonth(new Date()),
          },
        ])}
        // addonElement={ToggleButtons}
        // addonElement={<>Bla</>}
      />
    </Box>
    <Box>
      <Provider
        translations={{ ...nbNO, 'nb-NO': { myString: 'Custom string' } }}
      >
        <CustomDate />
        <ChangeLocale />
      </Provider>
    </Box>
    <Box>
      <Scrollbar>
        <ScrollbarInner>
          <DatePicker label="Date Picker 1:" showInput />
        </ScrollbarInner>
      </Scrollbar>
    </Box>
    <Box>
      <DatePicker
        label="Date Picker with reset:"
        date="1981-01-15"
        showInput
        showResetButton
      />
    </Box>
    <Box>
      <Provider
        formElement={{
          labelDirection: 'vertical',
        }}
      >
        <FieldBlock label="Legend:">
          <Flex.Vertical>
            <DatePicker
              label="Date Picker 1"
              right="small"
              date="1981-01-15"
              title="My Button"
            />
            <DatePicker
              label="Date Picker 2:"
              alignPicker="right"
              date={new Date()}
            />
            <DatePicker
              label="Date Picker 3:"
              showInput
              alignPicker="right"
              maskPlaceholder="dd/mm/yyyy"
              firstDay="sunday"
              returnFormat="dd/MM/yyyy"
              date="1981-01-15"
              data-foo="bar"
              onShow={(props) => {
                console.log(
                  'onShow',
                  // props,
                  props.event
                )
              }}
              onHide={(props) => {
                console.log(
                  'onHide',
                  // props,
                  props.event
                )
              }}
              onChange={(props) => {
                console.log(
                  'onChange',
                  // props,
                  props.event
                )
              }}
            />
            <DatePicker
              label="Hidden Nav:"
              showInput
              // date="2019/05/05"
              // startDate="05/05/2019"
              hideNavigation={true}
              hideDays={true}
              submitButtonText="OK"
              cancelButtonText="Cancel"
              dateFormat="dd/MM/yyyy"
              range={true}
              // returnFormat="dd/MM/yyyy"
              returnFormat="yyyy/MM/dd"
              onChange={({ date }) => {
                console.log('onChange', date)
              }}
              // onHide={({ date }) => {
              //   console.log('onHide', date)
              // }}
              shortcuts={[
                {
                  title: 'Set date period',
                  start_date: '1981-01-15',
                  end_date: '1981-02-15',
                },
                {
                  title: 'This month',
                  start_date: startOfMonth(new Date()),
                  end_date: lastDayOfMonth(new Date()),
                },
              ]}
            />
          </Flex.Vertical>
        </FieldBlock>
      </Provider>
    </Box>
    <Box>
      <FieldBlock label="Legend:">
        <Flex.Vertical>
          <DatePicker label="Date Picker 1:" />
          <DatePicker label="Date Picker 2:" top="small" />
        </Flex.Vertical>
      </FieldBlock>
    </Box>
    <Box>
      <FieldBlock label="Legend:">
        <Flex.Vertical>
          <DatePicker label="Date Picker 1:" />
          <DatePicker label="Date Picker 2:" top="small" />
        </Flex.Vertical>
      </FieldBlock>
    </Box>
    <Box>
      <DatePicker
        label="Range DatePicker:"
        // startDate="2019-05-01"
        // endDate="2019-06-17"
        // minDate="2019-05-02"
        // maxDate="2019-06-15"
        range={true}
        opened={false}
        showInput={true}
        onChange={(props) => {
          console.log('onChange', props)
        }}
        onSubmit={(props) => {
          console.log('onSubmit', props)
        }}
        onCancel={(props) => {
          console.log('onCancel', props)
        }}
      />
    </Box>
    <Box>
      <DatePicker
        label="Default DatePicker with Input:"
        date="2019-05-05"
        showInput={true}
        // showSubmitButton={true}
        showCancelButton={true}
        onChange={(props) => {
          console.log('onChange', props)
        }}
      />
    </Box>
    <Box>
      <DatePicker
        label="Hidden Nav:"
        date="2019-05-05"
        hideNavigation={true}
        hideDays={true}
      />
    </Box>
    <Box>
      <DatePicker
        label="Show month only:"
        date="2019-02-05"
        // hideNavigationButtons={true}
        onlyMonth={true}
      />
    </Box>
    <Box>
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <Flex.Vertical>
          <Input label="Input Default" />
          <DatePicker
            label="DatePicker Default"
            date={new Date()}
            showInput={true}
          />
          <Input label="Input Default" />
        </Flex.Vertical>
      </Provider>
    </Box>
    <Box>
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <Flex.Vertical>
          <Input size="small" label="Input Small" />
          <DatePicker
            size="small"
            label="DatePicker Small"
            date={new Date()}
            showInput={true}
          />
          <Input size="small" label="Input Small" />
        </Flex.Vertical>
      </Provider>
    </Box>
    <Box>
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <Flex.Vertical>
          <Input size="medium" label="Input Medium" />
          <DatePicker
            size="medium"
            label="DatePicker Medium"
            date={new Date()}
            showInput={true}
          />
          <Input size="medium" label="Input Medium" />
        </Flex.Vertical>
      </Provider>
    </Box>
    <Box>
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <Flex.Vertical>
          <Input size="large" label="Input Large" />
          <DatePicker
            size="large"
            label="DatePicker Large"
            date={new Date()}
            showInput={true}
          />
          <Input size="large" label="Input Large" />
        </Flex.Vertical>
      </Provider>
    </Box>
  </Wrapper>
)

const CustomDate = () => {
  const [startDate, setStartDate] = React.useState('2019-02-15')
  const [endDate, setEndDate] = React.useState('2019-03-15')
  // const [startDate, setStartDate] = React.useState('2019-10-02')
  // const [endDate, setEndDate] = React.useState(null)
  const [errorStatus, setErrorStatus] = React.useState('')

  // const [count, increment] = React.useState(0)
  //
  // React.useEffect(() => {
  //   const id = setInterval(() => {
  //     increment(count + 1)
  //   }, 1e3)
  //
  //   return () => clearInterval(id)
  // }, [count])

  return (
    <Section spacing>
      {/* <H2>{count}</H2> */}
      <DatePicker
        right
        range
        minDate="2019-09-28"
        maxDate="2019-10-17"
        date={startDate}
        label="Min max DatePicker:"
        showInput
        startDate={startDate}
        endDate={endDate}
        onChange={({ date, start_date, end_date, ...rest }) => {
          console.log('onChange', date, start_date, end_date, rest)
          setStartDate(start_date)
          setEndDate(end_date)
        }}
        // returnFormat="yyyy-MM-dd"
        status={errorStatus}
      />
      <Button
        right
        text="Change"
        variant="secondary"
        onClick={() => {
          setStartDate('2019-03-15')
          setEndDate('2019-04-15')
        }}
      />
      <Button
        right
        text="Reset"
        onClick={() => {
          // setStartDate(undefined)
          // setEndDate(undefined)
          setStartDate(null)
          setEndDate(null)
        }}
      />
      <Button
        right
        text="Error"
        onClick={() => {
          errorStatus
            ? setErrorStatus('')
            : setErrorStatus('Please select a valid date')
        }}
      />
    </Section>
  )
}

// const CustomDate = () => {
//   // const [startDate, setStartDate] = React.useState('2019-02-15')
//   // const [endDate, setEndDate] = React.useState('2019-03-15')
//   const [startDate, setStartDate] = React.useState(null)
//   const [endDate, setEndDate] = React.useState(null)
//   const [errorStatus, setErrorStatus] = React.useState(false)
//
//   const [count, increment] = React.useState(0)
//
//   React.useEffect(() => {
//     console.log('count', count)
//     const id = setInterval(() => {
//       increment(count + 1)
//     }, 1e3)
//
//     return () => clearInterval(id)
//   }, [])
//
//   return (
//     <Section spacing>
//       <H2>{count}</H2>
//       <DatePicker
//         right
//         range
//         label="Default DatePicker:"
//         showInput
//         startDate={startDate}
//         endDate={endDate}
//         onChange={({ start_date, end_date }) => {
//           console.log('on_change', start_date, end_date)
//           setStartDate(start_date)
//           setEndDate(end_date)
//         }}
//         // returnFormat="yyyy-MM-dd"
//         status={errorStatus}
//       />
//       <Button
//         right
//         text="Change"
//         variant="secondary"
//         onClick={() => {
//           setStartDate('2019-03-15')
//           setEndDate('2019-04-15')
//         }}
//       />
//       <Button
//         right
//         text="Reset"
//         onClick={() => {
//           setStartDate(null)
//           setEndDate(null)
//         }}
//       />
//       <Button
//         right
//         text="Error"
//         onClick={() => {
//           setErrorStatus('Please select a valid date')
//         }}
//       />
//     </Section>
//   )
// }

export const GlobalStatusExample = () => {
  return (
    <>
      <GlobalStatus id="my-id" />
      <DatePicker
        label="Date Picker 1:"
        right="small"
        date="1981-01-15"
        title="My Button"
        globalStatus={{ id: 'my-id', message: 'my message' }}
        status="Message"
      />
    </>
  )
}

export const CorrectInvalidDateExample = () => {
  return (
    <DatePicker
      show_input
      date="2022-01-01"
      correctInvalidDate
      minDate={new Date()}
    />
  )
}

export const ProviderLocaleExample = () => {
  return (
    <Provider
      locale="sv-SE"
      dateFnsLocale={{ 'sv-SE': svLocale }}
      translations={{
        'sv-SE': {
          DatePicker: {
            day: 'dag',
            month: 'månad',
            year: 'år',
            start: 'från',
            end: 'till',
            selectedDate: 'Valt datum: %s',
            selectedMonth: 'Vald månad %s',
            selectedYear: 'Valt år %s',
            nextMonth: 'Nästa månad %s',
            prevMonth: 'Förra månaden %s',
            nextYear: 'Nästa år %s',
            prevYear: 'Förra året %s',
            openPickerText: 'öppna datumväljaren',
            maskOrder: 'dd/mm/yyyy',
            maskPlaceholder: 'dd.mm.åååå',
            dateFormat: 'yyyy-MM-dd',
            returnFormat: 'yyyy-MM-dd',
            submitButtonText: 'Okej',
            cancelButtonText: 'Stänga',
            resetButtonText: 'Återställa',
            placeholderCharacters: {
              day: 'd',
              month: 'm',
              year: 'å',
            },
          },
        },
      }}
    >
      <DatePicker showInput />
    </Provider>
  )
}
