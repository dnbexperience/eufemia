import React from 'react'
import { Dropdown } from 'dnb-ui-lib/src'

import Context from 'dnb-ui-lib/src/shared/Context'
import { getLang, setLang } from './portalProviders'

export default function ChangeLocale(props) {
  const { locale, setLocale } = React.useContext(Context)

  return (
    <Dropdown
      value={getLang(locale)}
      data={{ 'en-US': 'English', 'nb-NO': 'Norsk' }}
      on_change={({ data: { selected_key } }) => {
        setLocale(selected_key)
        setLang(selected_key)
      }}
      {...props}
    />
  )
}
