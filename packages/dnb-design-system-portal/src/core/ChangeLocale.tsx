import React from 'react'
import { Dropdown } from '@dnb/eufemia/src'

import Context from '@dnb/eufemia/src/shared/Context'
import { setLang } from './PortalProviders'

export default function ChangeLocale({ listUSLocale = null, ...props }) {
  const { locale, setLocale } = React.useContext(Context)

  const date = {
    'nb-NO': 'Norsk',
    'en-GB': 'English (GB)',
  }
  if (listUSLocale) {
    date['en-US'] = 'English (US)'
  }

  return (
    <Dropdown
      value={locale}
      data={date}
      on_change={({ data: { value } }) => {
        setLocale(value)
        setLang(value)
      }}
      {...props}
    />
  )
}
