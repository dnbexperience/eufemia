import React from 'react'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'

export function Default() {
  return (
    <ComponentBox>
      {() => {
        Form.setData('default-id', { foo: 'bar' })

        const Component = () => {
          return (
            <Form.Handler id="default-id">
              <Field.String path="/foo" />
            </Form.Handler>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}

export function AfterFirstRender() {
  return (
    <ComponentBox>
      {() => {
        const Component = () => {
          return (
            <Form.Handler id="after-id">
              <Field.String path="/foo" />
            </Form.Handler>
          )
        }

        Form.setData('after-id', { foo: 'bar' })

        return <Component />
      }}
    </ComponentBox>
  )
}
