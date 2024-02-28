/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'

import { Button, H2, P } from '../..'

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
        <DefaultLocale />
        <NOLocale />
        <GBLocale />
        <USLocale />
        <hr />
        <SharedContextLocale />
        <ButtonRow>
          <Button onClick={() => setLocale('nb-NO')}>no-NB</Button>
          <Button onClick={() => setLocale('en-GB')}>en-GB</Button>
          <Button onClick={() => setLocale('en-US')}>en-US</Button>
        </ButtonRow>
      </Provider>
    </>
  )
}

const DefaultLocale = () => {
  const translation = useLocale()

  return <P>{translation.DatePicker.mask_placeholder}</P>
}

const NOLocale = () => {
  const translation = useLocale('nb-NO')

  return <P>{translation.DatePicker.mask_placeholder}</P>
}

const GBLocale = () => {
  const translation = useLocale('en-GB')

  return <P>{translation.DatePicker.mask_placeholder}</P>
}

const USLocale = () => {
  const translation = useLocale('en-US')

  return <P>{translation.DatePicker.mask_placeholder}</P>
}

const SharedContextLocale = () => {
  const translation = useLocale()

  return (
    <>
      <H2>I should change based on context locale!</H2>
      <P>{translation.DatePicker.mask_placeholder}</P>
    </>
  )
}
