import React from 'react'
import { Field, Form, FormError, Tools } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/String',
}

export const String = () => {
  return (
    <Flex.Stack>
      <Field.String label="Label" />
      <Field.String label="Label" multiline />

      <Field.String label="Label" width="small" />
      <Field.String label="Label" multiline width="small" />

      <Field.String label="Label" width="medium" />
      <Field.String label="Label" multiline width="medium" />

      <Field.String label="Label" width="large" />
      <Field.String label="Label" multiline width="large" />

      <Field.String
        label="Label"
        error={[
          new Error('Error message A'),
          new Error('Error message B'),
        ]}
        warning={['Warning message A', 'Warning message B']}
        info={['Info message A', 'Info message B']}
      />
    </Flex.Stack>
  )
}

export const Transform = () => {
  const transformIn = (value) => {
    return value?.toUpperCase()
  }
  const transformOut = (value) => {
    return value?.toLowerCase()
  }
  return (
    <Form.Handler onChange={console.log}>
      <Field.String
        label="Ønsket lånebeløp"
        path="/myField"
        transformIn={transformIn}
        transformOut={transformOut}
      />
    </Form.Handler>
  )
}

export const TransformInOnFormHandler = () => {
  const transformIn = ({ value }) => {
    if (value === undefined) {
      return ''
    }
    return value
  }
  return (
    <Form.Handler
      transformIn={transformIn}
      defaultData={{
        myPath: '',
      }}
    >
      <Field.String label="Ønsket lånebeløp" path="/myPath" />
      <Tools.Log />
    </Form.Handler>
  )
}

export function TransformObject() {
  const defaultData = {
    myLabel: { value: 'Some value', test: 'test' },
  }

  return (
    <Form.Handler
      defaultData={defaultData}
      onSubmit={(data) => console.log('onSubmit', data)}
      onChange={(data) => console.log('onChange', data)}
    >
      <Field.Name.First
        path="/myLabel"
        transformOut={(value) => {
          return { value, test: 'test' }
        }}
        transformIn={(data: typeof defaultData.myLabel) => {
          return data?.value
        }}
      />

      <Form.SubmitButton top />
    </Form.Handler>
  )
}

export function ErrorMessages() {
  return (
    <Form.Handler locale="en-GB">
      <Flex.Stack>
        <Field.PhoneNumber
          value="abc"
          validateInitially
          validator={() => {
            return new FormError('OrganizationNumber.errorRequired')
          }}
          errorMessages={{
            'OrganizationNumber.errorRequired':
              'Display me, instead of the default message',
          }}
        />
        <Field.String
          validateInitially
          required
          value="abc"
          minLength={4}
          // pattern="[0-9]"
          // validator={() => {
          //   return new FormError('OrganizationNumber.errorRequired')
          // }}
          // errorMessages={{
          //   'OrganizationNumber.errorRequired':
          //     'Display me, instead of the default message',
          // }}
        />
      </Flex.Stack>
    </Form.Handler>
  )
}
