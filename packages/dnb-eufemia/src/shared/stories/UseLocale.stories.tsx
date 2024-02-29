/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'

import { Button, P } from '../..'

import { useLocale, type TranslationLocale } from '../useLocale'
import Provider from '../Provider'
import { ButtonRow } from '../../extensions/forms/Form'

export default {
  title: 'Eufemia/Components/UseLocale',
}

export const UseLocale = () => {
  const [locale, setLocale] = useState<TranslationLocale>('nb-NO')

  return (
    <>
      <Provider locale={locale}>
        <Locale />
        <LocaleComponents />
        <ButtonRow>
          <Button onClick={() => setLocale('nb-NO')}>no-NB</Button>
          <Button onClick={() => setLocale('en-GB')}>en-GB</Button>
          <Button onClick={() => setLocale('en-US')}>en-US</Button>
        </ButtonRow>
      </Provider>
    </>
  )
}

const Locale = () => {
  const translation = useLocale()

  return <P>{translation.DatePicker.mask_placeholder}</P>
}

const LocaleComponents = () => {
  const translations = useLocale({
    components: ['Autocomplete', 'Breadcrumb'],
  })

  console.log('Only autocomplete translations here', translations)

  return (
    <>
      <P>{translations.Autocomplete.title}</P>
      <P>{translations.Breadcrumb.navText}</P>
    </>
  )
}
