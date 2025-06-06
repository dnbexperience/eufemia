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
        <DateFormat value="2025-08-01" dateStyle="full" />
        <DateFormat value="2025-08-01" dateStyle="long" />
        <DateFormat value="2025-08-01" dateStyle="medium" />
        <DateFormat value="2025-08-01" dateStyle="short" />
      </Card>
      <LocaleChanger />
    </Provider>
  )
}

export function DateFormatInvalidValues() {
  return (
    <Card stack>
      <DateFormat dateStyle="full" value={null}>
        {''}
      </DateFormat>
      <DateFormat dateStyle="long" value={''}>
        {null}
      </DateFormat>
      <DateFormat dateStyle="medium">{''}</DateFormat>
      <DateFormat dateStyle="short">2025-0</DateFormat>
      <DateFormat dateStyle="short" value={undefined}>
        {undefined}
      </DateFormat>
      <DateFormat dateStyle="short" />
      <DateFormat dateStyle="short" value={new Date('2025-16')}>
        {null}
      </DateFormat>
      <DateFormat dateStyle="short">{null}</DateFormat>
      <DateFormat dateStyle="short" value={undefined}>
        {null}
      </DateFormat>
    </Card>
  )
}
