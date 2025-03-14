import React from 'react'
import Context, { InternalLocale } from '@dnb/eufemia/src/shared/Context'
import { setLang, supportedTranslationsKey } from './PortalProviders'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export const languageDisplayNames = {
  'nb-NO': { label: 'Norsk' },
  'sv-SE': { label: 'Svenska (beta)', status: 'beta' },
  'en-GB': { label: 'English (GB)' },
  'en-US': { label: 'English (US)' },
}

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
      {supportedTranslationsKey
        .filter((key) => {
          return !listUSLocale && key === 'en-US' ? false : true
        })
        .map((key) => {
          const title = languageDisplayNames[key].label
          return <Field.Option key={key} value={key} title={title} />
        })}
    </Field.Selection>
  )
}
