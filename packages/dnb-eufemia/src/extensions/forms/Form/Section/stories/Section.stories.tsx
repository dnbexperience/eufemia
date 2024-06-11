import React from 'react'
import { Field, Form, JSONSchema, SectionProps, Value } from '../../..'
import { Card, Flex } from '../../../../../components'
import { Props as FieldNameProps } from '../../../Field/Name'

export default {
  title: 'Eufemia/Extensions/Forms/Section',
}

const MySection = (props: SectionProps<{ lastName?: FieldNameProps }>) => {
  return (
    <Form.Section {...props}>
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
    </Form.Section>
  )
}

const mySchema: JSONSchema = {
  type: 'object',
  properties: {
    mySection: {
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
  //   'mySection/lastName': {
  //     type: 'string',
  //     minLength: 20,
  //   },
  //   lastName: {
  //     type: 'string',
  //     minLength: 20,
  //   },
  // },
  required: [
    // 'mySection',
    // 'mySection/firstName',
    // 'mySection/lastName',
    'firstName',
    'lastName',
  ],
}

export const FormSection = () => {
  // const { data } = Form.useData('myForm')
  // console.dir('data', data)
  return (
    // <React.StrictMode>
    <Form.Handler
      id="myForm"
      onSubmit={console.log}
      // defaultData={{
      //   // firstName: 'Tobias',
      //   mySection: {
      //     lastName: 'Høegh',
      //   },
      // }}
      schema={mySchema}
      // id="myForm"
    >
      <Flex.Stack>
        <MySection
          // required
          path="/mySection"
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

export const NestedSections = () => {
  const MyNameSection = (props: SectionProps) => {
    return (
      <Form.Section {...props}>
        <Field.Composition width="large">
          <Field.Name.First path="/first" />
          <Field.Name.Last path="/last" />
        </Field.Composition>
      </Form.Section>
    )
  }

  const MyAddressSection = (props: SectionProps) => {
    return (
      <Form.Section {...props}>
        <Field.Composition width="large">
          <Field.String
            label="Gateadresse"
            path="/street"
            width="stretch"
          />
          <Field.String label="Nr." path="/nr" width="small" />
        </Field.Composition>
      </Form.Section>
    )
  }

  const MySection = (props: SectionProps) => {
    return (
      <Form.Section {...props}>
        <Card stack>
          <MyNameSection path="/name" />
          <MyAddressSection path="/address" required />
        </Card>
      </Form.Section>
    )
  }

  return (
    <Form.Handler
      onSubmit={console.log}
      defaultData={{
        nestedPath: {
          name: {
            first: 'Nora',
            last: 'Mørk',
          },
          address: {
            street: 'Strøget',
            nr: '',
          },
        },
      }}
    >
      <MySection path="/nestedPath" />
      <Form.SubmitButton variant="send" />
    </Form.Handler>
  )
}

export function EditViewContainer() {
  const EditContainer = () => {
    return (
      <Form.Section.EditContainer title="Account holder" variant="basic">
        <Field.Name.First path="/firstName" />
        <Field.Name.Last path="/lastName" />
      </Form.Section.EditContainer>
    )
  }
  const ViewContainer = () => {
    return (
      <Form.Section.ViewContainer title="Account holder" variant="basic">
        <Value.SummaryList>
          <Value.Name.First path="/firstName" placeholder="–" />
          <Value.Name.Last path="/lastName" placeholder="–" />
        </Value.SummaryList>
      </Form.Section.ViewContainer>
    )
  }

  return (
    <Form.Handler
      onSubmit={console.log}
      defaultData={{
        nestedPath: {
          firstName: 'Nora',
        },
      }}
    >
      <Card stack>
        <Form.SubHeading>Your account</Form.SubHeading>
        <Form.Section
          path="/nestedPath"
          required
          onChange={console.log}
          // containerMode="edit"
        >
          <EditContainer />
          <ViewContainer />
        </Form.Section>
        <Form.SubmitButton />
      </Card>
    </Form.Handler>
  )
}
