import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Button } from '@dnb/eufemia/src'
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

export function UpdateValue() {
  return (
    <ComponentBox>
      {() => {
        const myFormId = {}
        const { update } = Form.setData(myFormId)

        const Component = () => {
          return (
            <Form.Card>
              <Form.Handler id={myFormId}>
                <Field.Number path="/foo" defaultValue={1} />
              </Form.Handler>
              <Button
                onClick={() => {
                  update('/foo', (count) => count + 1)
                }}
              >
                Update
              </Button>
            </Form.Card>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}
