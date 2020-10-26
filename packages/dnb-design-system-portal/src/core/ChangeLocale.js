import React from 'react'
import { ToggleButton } from 'dnb-ui-lib/src'
// import { Dropdown } from 'dnb-ui-lib/src'

import Context from 'dnb-ui-lib/src/shared/Context'
import { setLang } from './portalProviders'

export default function ChangeLocale(props) {
  const { locale, setLocale } = React.useContext(Context)

  return (
    <ToggleButton.Group
      value={locale}
      on_change={({ value }) => {
        setLocale(value)
        setLang(value)
      }}
      {...props}
    >
      <ToggleButton value="nb-NO">Norsk</ToggleButton>
      <ToggleButton value="en-US">English</ToggleButton>
    </ToggleButton.Group>
  )

  // return (
  //   <Dropdown
  //     value={locale}
  //     data={{ 'en-US': 'English', 'nb-NO': 'Norsk' }}
  //     on_change={({ data: { value } }) => {
  //       setLocale(value)
  //       setLang(value)
  //     }}
  //     {...props}
  //   />
  // )
}
