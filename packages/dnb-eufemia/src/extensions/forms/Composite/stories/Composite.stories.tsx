import React from 'react'
import { Field, Form, JSONSchema } from '../..'
import { Composite } from '../../'
import { BlockProps } from '../Block'
import { Flex } from '../../../../components'
import { Props as FieldNameProps } from '../../Field/Name'

export default {
  title: 'Eufemia/Extensions/Forms/Composite',
}

const MyBlock = (props: BlockProps<{ lastName?: FieldNameProps }>) => {
  return (
    <Composite.Block {...props}>
      <Flex.Stack>
        <Field.Composition width="large">
          <Field.Name.First
            path="/firstName"
            // required
            // value="x"
            // validateInitially
          />
          <Field.Name.Last
            path="/lastName"
            // required
            // value="x"
            // minLength={4}
            // continuousValidation
            // validateInitially
          />
        </Field.Composition>

        <Form.Visibility
          visibleWhen={{
            path: '/lastName',
            hasValue: 'x',
          }}
          animate
          // pathDefined="/firstName"
        >
          <Field.PostalCodeAndCity />
        </Form.Visibility>
      </Flex.Stack>
    </Composite.Block>
  )
}

const mySchema: JSONSchema = {
  type: 'object',
  properties: {
    myBlock: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          minLength: 3,
          // maxLength: 4,
        },
        lastName: {
          type: 'string',
          minLength: 9,
          // maxLength: 4,
        },
      },
      required: ['firstName'],
    },
    // firstName: {
    //   type: 'string',
    //   // minLength: 9,
    //   // maxLength: 4,
    // },
    // lastName: {
    //   type: 'string',
    //   minLength: 10,
    //   // maxLength: 4,
    // },
  },

  // properties: {
  //   'myBlock/lastName': {
  //     type: 'string',
  //     minLength: 20,
  //   },
  //   lastName: {
  //     type: 'string',
  //     minLength: 20,
  //   },
  // },
  required: [
    // 'myBlock',
    // 'myBlock/firstName',
    // 'myBlock/lastName',
    'firstName',
    'lastName',
  ],
}

export const CompositeBlock = () => {
  // const { data } = Form.useData('myForm')
  // console.dir('data', data)
  return (
    // <React.StrictMode>
    <Form.Handler
      id="myForm"
      onSubmit={console.log}
      // defaultData={{
      //   // firstName: 'Tobias',
      //   myBlock: {
      //     lastName: 'Høegh',
      //   },
      // }}
      schema={mySchema}
      // id="myForm"
    >
      <Flex.Stack>
        <MyBlock
          // required
          path="/myBlock"
          // onChange={console.log}
          overwriteProps={{
            firstName: {
              // required: false,
              // path: '/firstName2',
              label: 'Custom',
              // value: 'Tobias',
              // onChange: console.log,
            },
            lastName: {
              // minLength: 3,
              // required: false,
              // required: true,
              // value: 'H',
              // onChange: console.log,
            },
          }}
        />
        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
    // </React.StrictMode>
  )
}
