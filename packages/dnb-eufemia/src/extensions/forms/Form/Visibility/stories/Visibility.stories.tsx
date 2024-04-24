import React from 'react'
import { Field, Form } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Visibility',
}

const id = 'toggle-example'

export const Toggle = () => {
  const { data } = Form.useData(id, {
    showError: true,
    isVisible: true,
  })

  return (
    <Form.Handler id={id}>
      <Flex.Stack>
        <Field.Boolean label="Error" variant="button" path="/showError" />
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
        />
        {/* <Field.String
          path="/foo"
          label="Label"
          value={data.showError ? 'error' : 'valid'}
          pattern="^valid$"
          validateInitially
        /> */}
        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.String
            path="/foo"
            label="Label"
            value={data.showError ? 'error' : 'valid'}
            pattern="^valid$"
            validateInitially
          />
        </Form.Visibility>
        <span>bottom</span>
      </Flex.Stack>
    </Form.Handler>
  )
}

export const KeepInDOM = () => {
  const { data } = Form.useData(id, {
    showError: true,
    isVisible: true,
  })

  return (
    <Form.Handler id={id}>
      <Flex.Stack>
        <Field.Boolean label="Error" variant="button" path="/showError" />
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
        />
        <Form.Visibility pathTrue="/isVisible" keepInDOM>
          <Field.String
            path="/foo"
            label="Label"
            value={data.showError ? 'error' : 'valid'}
            pattern="^valid$"
            validateInitially
          />
        </Form.Visibility>
        <span>bottom</span>
      </Flex.Stack>
    </Form.Handler>
  )
}
