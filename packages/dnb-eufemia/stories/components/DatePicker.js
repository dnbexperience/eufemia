/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import enLocale from 'date-fns/locale/en-GB'
import startOfMonth from 'date-fns/startOfMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import addDays from 'date-fns/addDays'
import Provider from '../../src/shared/Provider'
import Context from '../../src/shared/Context'
import nbNO from '../../src/shared/locales/nb-NO'
import isWeekend from 'date-fns/isWeekend'

import {
  DatePicker,
  Button,
  FormRow,
  Dropdown,
  Input,
  Section
} from '../../src/components'
// import { H2 } from '../../src/elements'

export default {
  title: 'Eufemia/Components/DatePicker'
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
    locale
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
      <FormRow vertical>
        <DatePicker
          label="Linked Range DatePicker:"
          // label_direction="vertical"
          // start_date={new Date()}
          start_date="2019-01-15"
          // start_date="2020-11-01"
          end_date="2020-11-02"
          // min_date="2020-10-28"
          // max_date="2020-11-03"
          range={true}
          // link={true}
          // sync={false}
          // opened={true}
          show_input={true}
          on_show={(props) => {
            console.log('on_show', props)
          }}
          on_days_render={(
            days
            // , nr
          ) => {
            // console.log('on_days_render', nr, days)

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
          on_hide={(props) => {
            console.log('on_hide', props)
          }}
          on_change={(props) => {
            console.log('on_change', props)
          }}
          on_type={(props) => {
            console.log('on_type', props)
          }}
          on_submit={(props) => {
            console.log('on_submit', props)
          }}
          on_cancel={(props) => {
            console.log('on_cancel', props)
          }}
          // status="Please select a valid date"
        />
      </FormRow>
    </Box>
    <Box>
      <DatePicker
        // opened
        show_input
        show_submit_button
        show_cancel_button
        enable_keyboard_nav
        input_element={<Input value="custom value" />}
        shortcuts={[
          { title: 'Set date', date: '2019-11-15' },
          {
            title: 'Relative +3 days',
            date: ({ date }) => date && addDays(date, 3)
          }
        ]}
        right
      />
      <DatePicker
        show_input
        input_element={() => <Input value="custom value" />}
        range
        shortcuts={[
          {
            title: 'Set date period',
            start_date: '1981-01-15',
            end_date: '1981-02-15'
          },
          {
            title: 'This month',
            start_date: startOfMonth(new Date()),
            end_date: lastDayOfMonth(new Date())
          }
        ]}
        // addon_element={ToggleButtons}
        // addon_element={<>Bla</>}
      />
    </Box>
    <Box>
      <Provider
        locales={{ ...nbNO, 'nb-NO': { myString: 'Custom string' } }}
      >
        <CustomDate />
        <ChangeLocale />
      </Provider>
    </Box>
    <Box>
      <Scrollbar>
        <ScrollbarInner>
          <DatePicker label="Date Picker 1:" show_input />
        </ScrollbarInner>
      </Scrollbar>
    </Box>
    <Box>
      <FormRow label_direction="vertical" label="Legend:">
        <DatePicker
          label="Date Picker 1:"
          right="small"
          date="1981-01-15"
          title="My Button"
        />
        <DatePicker
          label="Date Picker 2:"
          align_picker="right"
          date={new Date()}
        />
        <DatePicker
          label="Date Picker 3:"
          show_input
          align_picker="right"
          mask_placeholder="dd/mm/yyyy"
          locale={enLocale}
          first_day="sunday"
          return_format="dd/MM/yyyy"
          date="1981-01-15"
          data-foo="bar"
          on_show={(props) => {
            console.log(
              'on_show',
              // props,
              props.event
            )
          }}
          on_hide={(props) => {
            console.log(
              'on_hide',
              // props,
              props.event
            )
          }}
          on_change={(props) => {
            console.log(
              'on_change',
              // props,
              props.event
            )
          }}
        />
        <DatePicker
          label="Hidden Nav:"
          show_input
          // date="2019/05/05"
          // start_date="05/05/2019"
          hide_navigation={true}
          hide_days={true}
          submit_button_text="OK"
          cancel_button_text="Cancel"
          date_format="dd/MM/yyyy"
          range={true}
          // return_format="dd/MM/yyyy"
          return_format="yyyy/MM/dd"
          on_change={({ date }) => {
            console.log('on_change', date)
          }}
          // on_hide={({ date }) => {
          //   console.log('on_hide', date)
          // }}
          shortcuts={[
            {
              title: 'Set date period',
              start_date: '1981-01-15',
              end_date: '1981-02-15'
            },
            {
              title: 'This month',
              start_date: startOfMonth(new Date()),
              end_date: lastDayOfMonth(new Date())
            }
          ]}
        />
      </FormRow>
    </Box>
    <Box>
      <FormRow direction="vertical" label="Legend:">
        <DatePicker label="Date Picker 1:" />
        <DatePicker label="Date Picker 2:" top="small" />
      </FormRow>
    </Box>
    <Box>
      <FormRow vertical label="Legend:">
        <DatePicker label="Date Picker 1:" />
        <DatePicker label="Date Picker 2:" top="small" />
      </FormRow>
    </Box>
    <Box>
      <DatePicker
        label="Range DatePicker:"
        // start_date="2019-05-01"
        // end_date="2019-06-17"
        // min_date="2019-05-02"
        // max_date="2019-06-15"
        range={true}
        opened={false}
        show_input={true}
        on_change={(props) => {
          console.log('on_change', props)
        }}
        on_submit={(props) => {
          console.log('on_submit', props)
        }}
        on_cancel={(props) => {
          console.log('on_cancel', props)
        }}
      />
    </Box>
    <Box>
      <DatePicker
        label="Default DatePicker with Input:"
        date="2019-05-05"
        show_input={true}
        // show_submit_button={true}
        show_cancel_button={true}
        on_change={(props) => {
          console.log('on_change', props)
        }}
      />
    </Box>
    <Box>
      <DatePicker
        label="Hidden Nav:"
        date="2019-05-05"
        hide_navigation={true}
        hide_days={true}
      />
    </Box>
    <Box>
      <DatePicker
        label="Show month only:"
        date="2019-02-05"
        // hide_navigation_buttons={true}
        only_month={true}
      />
    </Box>
  </Wrapper>
)

const CustomDate = () => {
  const [startDate, setStartDate] = React.useState('2019-02-15')
  const [endDate, setEndDate] = React.useState('2019-03-15')
  // const [startDate, setStartDate] = React.useState('2019-10-02')
  // const [endDate, setEndDate] = React.useState(null)
  const [errorStatus, setErrorStatus] = React.useState(false)

  // const [count, incement] = React.useState(0)
  //
  // React.useEffect(() => {
  //   const id = setInterval(() => {
  //     incement(count + 1)
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
        min_date="2019-09-28"
        max_date="2019-10-17"
        date={startDate}
        label="Min max DatePicker:"
        show_input
        start_date={startDate}
        end_date={endDate}
        on_change={({ date, start_date, end_date, ...rest }) => {
          console.log('on_change', date, start_date, end_date, rest)
          setStartDate(start_date)
          setEndDate(end_date)
        }}
        // return_format="yyyy-MM-dd"
        status={errorStatus}
      />
      <Button
        right
        text="Change"
        variant="secondary"
        on_click={() => {
          setStartDate('2019-03-15')
          setEndDate('2019-04-15')
        }}
      />
      <Button
        right
        text="Reset"
        on_click={() => {
          // setStartDate(undefined)
          // setEndDate(undefined)
          setStartDate(null)
          setEndDate(null)
        }}
      />
      <Button
        right
        text="Error"
        on_click={() => {
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
//   const [count, incement] = React.useState(0)
//
//   React.useEffect(() => {
//     console.log('count', count)
//     const id = setInterval(() => {
//       incement(count + 1)
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
//         show_input
//         start_date={startDate}
//         end_date={endDate}
//         on_change={({ start_date, end_date }) => {
//           console.log('on_change', start_date, end_date)
//           setStartDate(start_date)
//           setEndDate(end_date)
//         }}
//         // return_format="yyyy-MM-dd"
//         status={errorStatus}
//       />
//       <Button
//         right
//         text="Change"
//         variant="secondary"
//         on_click={() => {
//           setStartDate('2019-03-15')
//           setEndDate('2019-04-15')
//         }}
//       />
//       <Button
//         right
//         text="Reset"
//         on_click={() => {
//           setStartDate(null)
//           setEndDate(null)
//         }}
//       />
//       <Button
//         right
//         text="Error"
//         on_click={() => {
//           setErrorStatus('Please select a valid date')
//         }}
//       />
//     </Section>
//   )
// }
