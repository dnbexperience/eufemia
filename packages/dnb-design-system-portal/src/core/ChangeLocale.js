import React from 'react'
// import { ToggleButton } from '@dnb/eufemia/src'
import { Dropdown } from '@dnb/eufemia/src'

import Context from '@dnb/eufemia/src/shared/Context'
import { setLang } from './portalProviders'

export default function ChangeLocale({ showUS, ...props }) {
  const { locale, setLocale } = React.useContext(Context)

  // return (
  //   <ToggleButton.Group
  //     value={locale}
  //     on_change={({ value }) => {
  //       setLocale(value)
  //       setLang(value)
  //     }}
  //     {...props}
  //   >
  //     <ToggleButton value="nb-NO">Norsk</ToggleButton>
  //     <ToggleButton value="en-GB">English</ToggleButton>
  //     <ToggleButton value="en-US">English (US)</ToggleButton>
  //     {/* <ToggleButton value="de-DE">DE</ToggleButton> */}
  //   </ToggleButton.Group>
  // )

  const date = {
    'nb-NO': 'Norsk',
    'en-GB': 'English (GB)',
  }
  if (showUS) {
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
