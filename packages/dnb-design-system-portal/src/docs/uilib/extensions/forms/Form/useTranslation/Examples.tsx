/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form } from '@dnb/eufemia/src/extensions/forms'

export const CustomTranslations = () => {
  return (
    <ComponentBox>
      {() => {
        const MyField = () => {
          const { Custom, formatMessage } = Form.useTranslation()

          const myTranslation = formatMessage(Custom.translation, {
            myKey: 'value!',
          })
          console.log('Custom', myTranslation)

          return <>{myTranslation}</>
        }

        const MyForm = () => {
          return (
            <Form.Handler
              locale="en-GB"
              translations={{
                'en-GB': {
                  Custom: { translation: 'My translation with a {myKey}' },
                },
              }}
            >
              <MyField />
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const GetTranslation = () => {
  return (
    <ComponentBox>
      {() => {
        const MyField = () => {
          const { formatMessage } = Form.useTranslation()

          const myTranslation = formatMessage('Custom.translation', {
            myKey: 'value!',
          })
          const errorRequired = formatMessage('Field.errorRequired')
          console.log(errorRequired)

          return <>{myTranslation}</>
        }

        const MyForm = () => {
          return (
            <Form.Handler
              locale="en-GB"
              translations={{
                'en-GB': {
                  Custom: { translation: 'My translation with a {myKey}' },
                },
              }}
            >
              <MyField />
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
