/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useState } from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import emailMask from '../addons/emailMask'
import { InputMasked, FormSet, ToggleButton } from '../..'
import { Flex, Hr } from '../../..'
import styled from '@emotion/styled'
import { Provider } from '../../../shared'
import { MultiInputMask } from '../'
import type { MultiInputMaskValue } from '../'
import { InternalLocale } from '../../../shared/Context'
import { Field } from '../../../extensions/forms'

const Pre = styled.pre`
  margin-top: 0;
  margin-bottom: 0;
`

export default {
  title: 'Eufemia/Components/InputMasked',
}

export function TypeNumber() {
  return <InputMasked label="Number:" asCurrency value="12" />
}

export function NoProps() {
  return <InputMasked label="what" />
}

export function Sandbox() {
  const [locale, setLocale] = React.useState<InternalLocale>('nb-NO')
  return (
    <Wrapper>
      <Provider locale={locale}>
        <FormSet labelDirection="vertical">
          <ToggleButton.Group
            value={locale}
            on_change={({ value }) => setLocale(value)}
            right
            label="Choose locale"
          >
            <ToggleButton value="nb-NO" right>
              nb-NO
            </ToggleButton>
            <ToggleButton value="sv-SE" right>
              sv-SE
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
      label="numberMask"
      value={floatval}
      numberMask
      maskOptions={{ disallowLeadingZeroes: true, allowNegative: false }}
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
      label="currencyMask"
      value={floatval}
      currencyMask={{
        currency: 'NOK',
        prefix: 'Prefix ',
        allowNegative: false,
      }}
      suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
      on_change={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function CurrencyInput() {
  const [floatval, setState] = React.useState(1234.556)

  return (
    <InputMasked
      label="asCurrency"
      value={floatval}
      asCurrency="NOK"
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
        label="asNumber"
        value={floatval}
        asNumber
        maskOptions={{ allowDecimal: true, decimalLimit: null }}
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
      label="asPercent"
      value={floatval}
      asPercent
      maskOptions={{ allowDecimal: true, disallowLeadingZeroes: true }}
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
      placeholder="@."
      autocomplete="on"
      keepPlaceholder
      mask={emailMask}
      right
      bottom
    />
  )
}

function ShowMask() {
  return (
    <InputMasked
      label="showMask"
      showMask
      numberMask={{
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

export function DisallowLeadingZerosMask() {
  return (
    <Flex.Vertical>
      <InputMasked
        value={-100123}
        currencyMask={{
          disallowLeadingZeroes: true, //
        }}
        onChange={({ value, numberValue }) => {}}
      />

      <Field.Currency disallowLeadingZeroes onChange={(value) => {}} />
    </Flex.Vertical>
  )
}
