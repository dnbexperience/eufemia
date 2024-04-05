import React from 'react'
import Context, { InternalLocale } from '@dnb/eufemia/src/shared/Context'
import { setLang } from './PortalProviders'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export default function ChangeLocale({ listUSLocale = null, ...props }) {
  const { locale, setLocale } = React.useContext(Context)

  return (
    <Field.Selection
      value={locale}
      onChange={(value) => {
        setLocale(value as InternalLocale)
        setLang(value)
      }}
      {...props}
    >
      <Field.Option value="nb-NO" title="Norsk" />
      <Field.Option value="en-GB" title="English (GB)" />
      {listUSLocale && <Field.Option value="en-US" title="English (US)" />}
    </Field.Selection>
  )
}
