/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import Context from '../Context'
import Provider from '../Provider'
import {
  ToggleButton,
  DatePicker,
  NumberFormat,
  Dropdown,
  Section,
} from '../../components'

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
              showSubmitButton
              showCancelButton
              showResetButton
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
        <ToggleButton text="Svenska" value="sv-SE" />
      </ToggleButton.Group>

      <Dropdown
        left
        value={locale}
        data={{ 'en-GB': 'English', 'nb-NO': 'Norsk', 'sv-SE': 'Svenska' }}
        on_change={({ data: { selectedKey: locale } }) => {
          setLocale(locale)
        }}
      />
    </>
  )
}
