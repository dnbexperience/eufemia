import React from 'react'
import { Field, Form, FormError, Tools } from '../../..'
import { Flex } from '../../../../../components'
import type { AdditionalArgs } from '../PhoneNumber'

export default {
  title: 'Eufemia/Extensions/Forms/PhoneNumber',
}

const initialData = { phone: '+4742345678' }

const makeRequest = async (value: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false)
    }, 1000)
  })
}

const onChangeValidator = async (value: any) => {
  const isValid = await makeRequest(value)
  if (!isValid) {
    return new FormError('Field.errorRequired')
  }
  return undefined
}

export function PhoneNumber() {
  const { update } = Form.useData('uniqueId')

  React.useEffect(() => {
    update('/phone', () => '+41123')
  }, [update])

  return (
    <Form.Handler id="uniqueId" data={initialData}>
      <Flex.Stack>
        <Field.PhoneNumber
          required
          onChangeValidator={onChangeValidator}
          validateInitially
          path="/phone"
          onBlur={console.log}
          onFocus={console.log}
          onChange={(value) => {
            console.log('onChange', value)
            update('/phone', () => value)
          }}
        />
        <Field.String label="Shadow" path="/phone" />
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Stack>
    </Form.Handler>
  )
}

type PhoneNumberDataShape = {
  countryCode: string
  phoneNumber: string
  countryCodePrefix: string
}

const transformOut = (internal: any, additionalArgs = {}) => {
  const {
    countryCode: countryCodePrefix,
    phoneNumber,
    iso: countryCode,
  } = additionalArgs as AdditionalArgs

  return {
    countryCode,
    phoneNumber,
    countryCodePrefix,
  } satisfies PhoneNumberDataShape
}
const transformIn = (external: unknown) => {
  const {
    countryCode: iso,
    phoneNumber,
    countryCodePrefix: countryCode,
  } = (external || {}) as PhoneNumberDataShape
  return {
    countryCode,
    phoneNumber,
    iso,
  } satisfies AdditionalArgs
}

export function TransformOut() {
  return (
    <Form.Handler
      defaultData={{
        primaryMobile: {
          countryCode: 'GB',
          phoneNumber: '9123457',
          countryCodePrefix: '+44',
        },
      }}
    >
      <Flex.Stack>
        <Field.PhoneNumber
          path="/primaryMobile"
          transformOut={transformOut}
          transformIn={transformIn}
        />
      </Flex.Stack>

      <Tools.Log top />
    </Form.Handler>
  )
}

export function Basic() {
  return (
    <Form.Handler>
      <Field.PhoneNumber
        path="/phoneNumber"
        onChange={(value, { countryCode, phoneNumber, iso }) =>
          console.log('onChange', value, {
            countryCode,
            phoneNumber,
            iso,
          })
        }
      />

      <Tools.Log top />
    </Form.Handler>
  )
}

export function E164AutoDetection() {
  return (
    <Form.Handler
      defaultData={{
        norwegian: '+4798712345',
        swedish: '+46701234567',
        american: '+12025551234',
        samoa: '+16841234567',
      }}
    >
      <Flex.Stack>
        <Field.PhoneNumber path="/norwegian" numberLabel="Norway (+47)" />
        <Field.PhoneNumber path="/swedish" numberLabel="Sweden (+46)" />
        <Field.PhoneNumber path="/american" numberLabel="USA (+1)" />
        <Field.PhoneNumber
          path="/samoa"
          numberLabel="American Samoa (+1-684)"
        />
      </Flex.Stack>

      <Tools.Log top />
    </Form.Handler>
  )
}

export function ZeroPrefixAutoDetection() {
  return (
    <Form.Handler
      defaultData={{
        phone: '004798712345',
      }}
    >
      <Flex.Stack>
        <Field.PhoneNumber path="/phone" numberLabel="00 prefix" />
      </Flex.Stack>

      <Tools.Log top />
    </Form.Handler>
  )
}
