/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'

import { Button, P } from '../..'

import Provider from '../Provider'
import type { InternalLocale } from '../Context'
import { ButtonRow } from '../../extensions/forms/Form'
import useTranslation from '../useTranslation'

export default {
  title: 'Eufemia/Components/useTranslation',
}

export const Sandbox = () => {
  const [count, increment] = useState(0)
  const [locale, setLocale] = useState<InternalLocale>('nb-NO')

  return (
    <>
      {count}
      <Provider locale={locale}>
        <Locale />
        <LocaleComponents />
        <ButtonRow>
          <Button onClick={() => setLocale('nb-NO')}>nb-NO</Button>
          <Button onClick={() => setLocale('en-GB')}>en-GB</Button>
          <Button onClick={() => increment((c) => c + 1)}>
            increment
          </Button>
          {/* <Button onClick={() => setLocale('en-US')}>en-US</Button> */}
        </ButtonRow>
      </Provider>
    </>
  )
}

const Locale = () => {
  const translation = useTranslation()

  return <P>{translation.DatePicker.mask_placeholder}</P>
}

const tr = {
  Autocomplete: {
    title: 'Autocomplete',
  },
  Breadcrumb: {
    navText: 'Breadcrumb',
  },
}

const LocaleComponents = () => {
  const translations = useTranslation(tr)

  // const translations = useTranslation({
  //   'nb-NO': {
  //     Autocomplete: {
  //       title: 'Autocomplete',
  //     },
  //     Breadcrumb: {
  //       navText: 'Breadcrumb',
  //     },
  //   },
  //   'en-GB': {
  //     Autocomplete: {
  //       title: 'Autocomplete2',
  //     },
  //     Breadcrumb: {
  //       navText: 'Breadcrumb2',
  //     },
  //   },
  // })

  // console.log(
  //   'Only autocomplete and Breadcrumb translations here',
  //   translations
  // )

  return (
    <>
      <P>{translations.Autocomplete.title}</P>
      <P>{translations.Breadcrumb.navText}</P>
    </>
  )
}
