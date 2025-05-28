/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useContext } from 'react'
import DateFormat from '../'
import Card from '../../Card'
import { Context, Provider } from '../../../shared'
import { Dropdown } from '../../lib'

export default {
  title: 'Eufemia/Components/DateFormat',
}

const LocaleChanger = () => {
  const { setLocale, locale } = useContext(Context)

  return (
    <Dropdown
      value={locale}
      data={{
        'en-GB': 'English',
        'en-US': 'English (US)',
        'nb-NO': 'Norsk',
        'sv-SE': 'Svenska',
      }}
      on_change={({ data: { value } }) => {
        setLocale(value)
      }}
    />
  )
}

export function DateFormatExamples() {
  return (
    <Provider>
      <Card stack bottom="large">
        <DateFormat date="2025-08-01" dateStyle="full" />
        <DateFormat date="2025-08-01" dateStyle="long" />
        <DateFormat date="2025-08-01" dateStyle="medium" />
        <DateFormat date="2025-08-01" dateStyle="short" />
      </Card>
      <LocaleChanger />
    </Provider>
  )
}
