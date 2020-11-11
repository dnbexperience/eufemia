/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'
import Context from '../../src/shared/Context'
import Provider from '../../src/shared/Provider'
import {
  ToggleButton,
  DatePicker,
  Number,
  Dropdown,
  Section
} from '../../src'

export default {
  title: 'Eufemia/Components/Provider'
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
            <Number>12345678</Number>
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
