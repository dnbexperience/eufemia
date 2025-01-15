/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import emailMask from '../addons/emailMask'
import { InputMasked, FormSet, ToggleButton } from '../..'
import { Hr } from '../../..'
import styled from '@emotion/styled'
import { Provider } from '../../../shared'
import { MultiInputMask } from '../'
import type { MultiInputMaskValue } from '../'
import { InternalLocale } from '../../../shared/Context'

const Pre = styled.pre`
  margin-top: 0;
  margin-bottom: 0;
`

export default {
  title: 'Eufemia/Components/InputMasked',
}

export function TypeNumber() {
  return <InputMasked label="Number:" as_currency value="12" />
}

export function NoProps() {
  return <InputMasked label="what" />
}

export function Sandbox() {
  const [locale, setLocale] = React.useState<InternalLocale>('nb-NO')
  return (
    <Wrapper>
      <Provider locale={locale}>
        <FormSet label_direction="vertical">
          <ToggleButton.Group
            value={locale}
            on_change={({ value }) => setLocale(value)}
            right
            label="Choose locale"
          >
            <ToggleButton value="nb-NO" right>
              nb-NO
            </ToggleButton>
            <ToggleButton value="en-GB" right>
              en-GB
            </ToggleButton>
          </ToggleButton.Group>
          <Hr top bottom />
          <Box>
            <BasicNumberMask />
          </Box>
          <Box>
            <BasicCurrencyMask />
          </Box>
          <Box>
            <CurrencyInput />
          </Box>
          <Box>
            <NumberInput />
          </Box>
          <Box>
            <PercentInput />
          </Box>
          <Box>
            <EmailMask />
          </Box>
          <Box>
            <ShowMask />
          </Box>
        </FormSet>
      </Provider>
    </Wrapper>
  )
}

function BasicNumberMask() {
  const [floatval, setState] = React.useState(10234.556)

  return (
    <InputMasked
      label="number_mask"
      // selectall
      value={floatval}
      // placeholder="En placeholder"
      number_mask
      mask_options={{ disallowLeadingZeroes: true, allowNegative: false }}
      suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
      on_change={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function BasicCurrencyMask() {
  const [floatval, setState] = React.useState(1234.556)

  return (
    <InputMasked
      label="currency_mask"
      // selectall
      value={floatval}
      // placeholder="En placeholder"
      currency_mask={{
        currency: 'NOK',
        prefix: 'Prefix ',
        // allowDecimal: false,
        allowNegative: false,
      }}
      // mask_options={{ disallowLeadingZeroes: true }}
      suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
      on_change={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function CurrencyInput() {
  const [floatval, setState] = React.useState(1234.556)
  // const [floatval, setState] = React.useState(0.01)

  return (
    <InputMasked
      label="as_currency"
      value={floatval}
      as_currency="NOK"
      // mask_options={{ disallowLeadingZeroes: true }}
      suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
      on_change={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function NumberInput() {
  const [floatval, setState] = React.useState('1234.556')

  return (
    <>
      <InputMasked
        label="as_number"
        value={floatval}
        as_number
        mask_options={{ allowDecimal: true, decimalLimit: null }}
        suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
        on_change={({ numberValue }) => {
          setState(numberValue)
        }}
      />
    </>
  )
}

function PercentInput() {
  const [floatval, setState] = React.useState(1)

  return (
    <InputMasked
      label="as_percent"
      value={floatval}
      as_percent
      mask_options={{ allowDecimal: true, disallowLeadingZeroes: true }}
      // number_mask={{ allowDecimal: true, decimalLimit: 1 }}
      suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
      on_change={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function EmailMask() {
  return (
    <InputMasked
      label="emailMask"
      // DOMException: Failed to execute 'setSelectionRange' on 'HTMLInputElement'
      // The input element's type ('email') does not support selection.
      // type="email"
      placeholder="@."
      autocomplete="on"
      keep_placeholder
      mask={emailMask}
      right
      bottom
    />
  )
}

function ShowMask() {
  return (
    <InputMasked
      label="show_mask"
      show_mask
      number_mask={{
        suffix: ' kr',
        allowDecimal: true,
      }}
    />
  )
}

export function MultiInputMaskPlayground() {
  return (
    <>
      <Box>
        <MultiInputMaskDate />
      </Box>
      <Box>
        <MultiInputMaskMix />
      </Box>
      <Box>
        <MultiInputMaskStatuses />
      </Box>
    </>
  )
}

function MultiInputMaskDate() {
  const [values, setValues] = useState<
    MultiInputMaskValue<'day' | 'month' | 'year'>
  >({
    day: '',
    month: '',
    year: '',
  })

  return (
    <MultiInputMask
      label="Datogreier"
      onChange={({ day, month, year }) => setValues({ day, month, year })}
      values={values}
      delimiter="/"
      labelDirection="vertical"
      inputs={[
        {
          id: 'day',
          label: 'dagen',
          placeholderCharacter: 'd',
          mask: [/[0-9]/, /[0-9]/],
        },
        {
          id: 'month',
          label: 'måneden',
          placeholderCharacter: 'm',
          mask: [/[0-9]/, /[0-9]/],
        },
        {
          id: 'year',
          label: 'året',
          placeholderCharacter: 'å',
          mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
        },
      ]}
    />
  )
}

function MultiInputMaskMix() {
  const [values, setValues] = useState<
    MultiInputMaskValue<'numbers' | 'letters' | 'mix'>
  >({
    letters: '',
    numbers: '',
    mix: '',
  })

  return (
    <MultiInputMask
      label="Mix"
      onChange={({ letters, numbers, mix }) =>
        setValues({ letters, numbers, mix })
      }
      delimiter="/"
      values={values}
      inputs={[
        {
          id: 'numbers',
          label: 'just numbers',
          placeholderCharacter: 'n',
          mask: [/[0-9]/, /[0-9]/],
        },
        {
          id: 'letters',
          label: 'just letters',
          placeholderCharacter: 'l',
          mask: [/[a-zA-Z]/, /[a-zA-Z]/],
        },
        {
          id: 'mix',
          label: 'numbers and letters',
          placeholderCharacter: 'm',
          mask: [/[0-9]/, /[0-9]/, /[a-zA-Z]/, /[a-zA-Z]/],
        },
      ]}
    />
  )
}

function MultiInputMaskStatuses() {
  return (
    <>
      <MultiInputMask
        label="Statuses"
        status="error"
        statusState="error"
        inputs={[
          {
            id: 'error',
            label: 'error',
            placeholderCharacter: 'e',
            mask: [/[0-9]/, /[0-9]/],
          },
        ]}
      />
      <MultiInputMask
        label="Statuses"
        disabled
        inputs={[
          {
            id: 'disabled',
            label: 'disabled',
            placeholderCharacter: 'd',
            mask: [/[0-9]/, /[0-9]/],
          },
        ]}
      />
    </>
  )
}
