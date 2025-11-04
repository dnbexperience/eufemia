import React, { useCallback } from 'react'
import { Field, Form, JSONSchema, SectionProps, Value } from '../../..'
import { Flex, Table } from '../../../../../components'
import { Tr, Td, Th, P } from '../../../../../elements'
import { Props as FieldNameProps } from '../../../Field/Name'

export default {
  title: 'Eufemia/Extensions/Forms/Section',
}

const MySection = (props: SectionProps<{ lastName?: FieldNameProps }>) => {
  return (
    <Form.Section {...props}>
      <Flex.Stack>
        <Field.Composition width="large">
          <Field.Name.First path="/firstName" />
          <Field.Name.Last path="/lastName" />
        </Field.Composition>

        <Form.Visibility
          visibleWhen={{
            path: '/lastName',
            hasValue: 'x',
          }}
          animate
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
        },
        lastName: {
          type: 'string',
          minLength: 9,
        },
      },
      required: ['firstName'],
    },
  },

  required: ['firstName', 'lastName'],
}

export const FormSection = () => {
  return (
    <Form.Handler id="myForm" onSubmit={console.log} schema={mySchema}>
      <Flex.Stack>
        <MySection
          path="/mySection"
          overwriteProps={{
            firstName: {
              label: 'Custom',
            },
            lastName: {},
          }}
        />
        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
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
        <Form.Card>
          <MyNameSection path="/name" />
          <MyAddressSection path="/address" required />
        </Form.Card>
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
      <Form.Card>
        <Form.SubHeading>Your account</Form.SubHeading>
        <Form.Section path="/nestedPath" required onChange={console.log}>
          <EditContainer />
          <ViewContainer />
        </Form.Section>
        <Form.SubmitButton />
      </Form.Card>
    </Form.Handler>
  )
}

export function OpenWhenFieldValidationError() {
  const MyEditContainer = useCallback(() => {
    return (
      <Form.Section.EditContainer>
        <Field.Name.First path="/firstName" />
        <Field.Name.Last path="/lastName" validateInitially={false} />
      </Form.Section.EditContainer>
    )
  }, [])

  const MyViewContainer = useCallback(() => {
    return (
      <Form.Section.ViewContainer>
        <Value.SummaryList>
          <Value.Name.First path="/firstName" />
          <Value.Name.Last path="/lastName" />
        </Value.SummaryList>
      </Form.Section.ViewContainer>
    )
  }, [])

  return (
    <Form.Handler
      onSubmit={async (data) => console.log('onSubmit', data)}
      defaultData={{
        nestedPath: {
          firstName: 'Nora',
          lastName: undefined, // initiate error
        },
      }}
    >
      <Form.Card>
        <Form.SubHeading>Your account</Form.SubHeading>
        <Form.Section path="/nestedPath" required validateInitially>
          <MyEditContainer />
          <MyViewContainer />
        </Form.Section>
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}

export function TableInContainer() {
  return (
    <Form.Handler>
      <Form.Section>
        <Form.Section.ViewContainer innerSpace={false}>
          <Table outline>
            <caption className="dnb-sr-only">A Table Caption</caption>
            <thead>
              <Tr>
                <Th>Column</Th>
                <Th sortable>
                  <Th.SortButton
                    text="Sortable"
                    title="Sort table column"
                  />
                </Th>
                <Th align="right">Column</Th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Td>Row 1</Td>
                <Td>Row 1</Td>
                <Td align="right">Row 1</Td>
              </Tr>
              <Tr>
                <Td>
                  <P>Row 2 with paragraph</P>
                </Td>
                <Td>
                  <P>
                    Row 2 with <b>medium paragraph</b>
                  </P>
                </Td>
                <Td align="right">
                  Row 2 with <b>medium text</b>
                </Td>
              </Tr>
            </tbody>
          </Table>
        </Form.Section.ViewContainer>
        <Form.Section.EditContainer innerSpace={false}>
          <Table outline>
            <caption className="dnb-sr-only">A Table Caption</caption>
            <thead>
              <Tr>
                <Th>Column</Th>
                <Th sortable>
                  <Th.SortButton
                    text="Sortable"
                    title="Sort table column"
                  />
                </Th>
                <Th align="right">Column</Th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <Td>Row 1</Td>
                <Td>Row 1</Td>
                <Td align="right">Row 1</Td>
              </Tr>
              <Tr>
                <Td>
                  <P>Row 2 with paragraph</P>
                </Td>
                <Td>
                  <P>
                    Row 2 with <b>medium paragraph</b>
                  </P>
                </Td>
                <Td align="right">
                  Row 2 with <b>medium text</b>
                </Td>
              </Tr>
            </tbody>
          </Table>
        </Form.Section.EditContainer>
      </Form.Section>
    </Form.Handler>
  )
}
