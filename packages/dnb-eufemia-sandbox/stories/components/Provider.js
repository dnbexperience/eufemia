/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'
import Context from '@dnb/eufemia/src/shared/Context'
import Provider from '@dnb/eufemia/src/shared/Provider'
import {
  ToggleButton,
  DatePicker,
  NumberFormat,
  Dropdown,
  Section,
} from '@dnb/eufemia/src'

export default {
  title: 'Eufemia/Components/Provider',
}

export const ProviderSandbox = () => {
  return (
    <Wrapper>
      <Box>
        <Provider locale="en-GB">
          <Section spacing top>
            <ChangeLocale />
          </Section>
          <Section spacing top>
            <NumberFormat>12345678</NumberFormat>
            <DatePicker
              left
              opened
              show_submit_button
              show_cancel_button
              show_reset_button
            />
          </Section>
        </Provider>
      </Box>
    </Wrapper>
  )
}

const ChangeLocale = () => {
  const { locale, setLocale, update } = React.useContext(Context)
  console.log(locale)

  return (
    <>
      <ToggleButton.Group
        label="Choose:"
        variant="radio"
        value={locale}
        on_change={({ value: locale }) => {
          setLocale(locale)
          update({ locale })
        }}
      >
        <ToggleButton text="English" value="en-GB" />
        <ToggleButton text="Norsk" value="nb-NO" />
      </ToggleButton.Group>

      <Dropdown
        left
        value={locale}
        data={{ 'en-GB': 'English', 'nb-NO': 'Norsk' }}
        on_change={({ data: { selected_key: locale } }) => {
          setLocale(locale)
        }}
      />
    </>
  )
}
