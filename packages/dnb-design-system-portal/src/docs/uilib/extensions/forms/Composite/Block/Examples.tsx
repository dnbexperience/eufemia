import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card, Code, Flex, P, Section } from '@dnb/eufemia/src'
import {
  Composite,
  Field,
  Form,
  JSONSchema,
  Value,
} from '@dnb/eufemia/src/extensions/forms'
import { BlockProps } from '@dnb/eufemia/src/extensions/forms/Composite/Block'

export const WithoutDataContext = () => {
  return (
    <ComponentBox scope={{ Composite }}>
      <Composite.Block onChange={console.log}>
        <Field.String path="/myField" />
      </Composite.Block>
    </ComponentBox>
  )
}

export const NestedPathBlock = () => {
  return (
    <ComponentBox scope={{ Composite }}>
      {() => {
        const MyNameBlock = (props: BlockProps) => {
          return (
            <Composite.Block {...props}>
              <Card stack>
                <Field.Name.First path="/firstName" />
                <Field.Name.Last path="/lastName" />
              </Card>
            </Composite.Block>
          )
        }

        return (
          <Form.Handler
            onSubmit={console.log}
            defaultData={{
              nestedPath: {
                firstName: 'Nora',
                lastName: 'Mørk',
              },
            }}
          >
            <MyNameBlock path="/nestedPath" />
            <Form.SubmitButton variant="send" />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const OverwriteProps = () => {
  return (
    <ComponentBox scope={{ Composite }}>
      {() => {
        const MyNameBlock = (props) => {
          return (
            <Composite.Block {...props}>
              <Card stack>
                <Field.Composition width="large">
                  <Field.Name.First path="/firstName" />
                  <Field.Name.Last
                    path="/lastName"
                    required
                    minLength={10}
                  />
                </Field.Composition>
              </Card>
            </Composite.Block>
          )
        }

        return (
          <Form.Handler
            onSubmit={console.log}
            defaultData={{
              nestedPath: {
                firstName: '',
                lastName: 'M',
              },
            }}
          >
            <MyNameBlock
              path="/nestedPath"
              overwriteProps={{
                firstName: {
                  required: true,
                  label: 'Custom',
                },
                lastName: {
                  required: false,
                  minLength: 2,
                },
              }}
            />
            <Form.SubmitButton variant="send" />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const AllFieldsRequired = () => {
  return (
    <ComponentBox scope={{ Composite }}>
      {() => {
        const MyNameBlock = (props: BlockProps) => {
          return (
            <Composite.Block {...props}>
              <Card stack>
                <Field.Composition width="large">
                  <Field.Name.First path="/firstName" />
                  <Field.Name.Last path="/lastName" />
                </Field.Composition>
              </Card>
            </Composite.Block>
          )
        }

        const schema: JSONSchema = {
          type: 'object',
          required: ['myRequiredBlock'],
        }

        return (
          <Flex.Stack>
            <Form.Handler onSubmit={console.log}>
              <MyNameBlock required />
              <Form.SubmitButton variant="send" />
            </Form.Handler>

            <Form.Handler onSubmit={console.log} schema={schema}>
              <MyNameBlock path="/myRequiredBlock" />
              <Form.SubmitButton variant="send" />
            </Form.Handler>
          </Flex.Stack>
        )
      }}
    </ComponentBox>
  )
}

export const SchemaSupport = () => {
  return (
    <ComponentBox scope={{ Composite }}>
      {() => {
        const MyNameBlock = (props: BlockProps) => {
          return (
            <Composite.Block {...props}>
              <Card stack>
                <Field.Composition width="large">
                  <Field.Name.First path="/firstName" />
                  <Field.Name.Last
                    path="/lastName"
                    required
                    minLength={10}
                  />
                </Field.Composition>
              </Card>
            </Composite.Block>
          )
        }

        const mySchema: JSONSchema = {
          type: 'object',
          properties: {
            nestedPath: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  minLength: 3,
                },
                lastName: {
                  type: 'string',
                  minLength: 2,
                },
              },
              required: ['firstName', 'lastName'],
            },
          },
        }

        return (
          <Form.Handler
            onSubmit={console.log}
            schema={mySchema}
            defaultData={{
              nestedPath: {
                firstName: '',
                lastName: 'M',
              },
            }}
          >
            <MyNameBlock path="/nestedPath" />
            <Form.SubmitButton variant="send" />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const WithVisibility = () => {
  return (
    <ComponentBox scope={{ Composite, Output }}>
      {() => {
        const MyBlock = ({ children, ...props }) => {
          return (
            <Composite.Block {...props}>
              <Card stack>
                <Field.Boolean
                  label="Are you sure?"
                  variant="buttons"
                  path="/iAmSure"
                />
                <Form.Visibility visible pathTrue="/iAmSure" animate>
                  <Field.Selection
                    label="Choose"
                    variant="radio"
                    path="/mySelection"
                  >
                    <Field.Option value="less" title="Less" />
                    <Field.Option value="more" title="More" />
                  </Field.Selection>

                  <Form.Visibility
                    visibleWhen={{
                      path: '/mySelection',
                      hasValue: 'more',
                    }}
                    animate
                  >
                    <Field.String label="My String" path="/myString" />
                  </Form.Visibility>
                </Form.Visibility>

                {children}
              </Card>

              <Output />
            </Composite.Block>
          )
        }

        return (
          <Form.Handler
            onChange={console.log}
            defaultData={{
              nestedPath: {
                iAmSure: false,
                mySelection: 'less',
                myString: 'has a value',
              },
            }}
          >
            <MyBlock path="/nestedPath">
              <Form.Visibility
                visibleWhen={{
                  path: '/myString',
                  withValue: (value) => value !== 'has a value',
                }}
                animate
              >
                <P>
                  Result:{' '}
                  <Value.String path="/nestedPath/myString" inline />
                </P>
              </Form.Visibility>
            </MyBlock>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const NestedBlocks = () => {
  return (
    <ComponentBox scope={{ Composite }}>
      {() => {
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
            <MyBlock path="/nestedPath" required />
            <Form.SubmitButton variant="send" />
          </Form.Handler>
        )

        function MyBlock(props: BlockProps) {
          return (
            <Composite.Block {...props}>
              <Card stack>
                <MyNameBlock path="/name" />
                <MyAddressBlock path="/address" />
                <MyValueBlock />
              </Card>
            </Composite.Block>
          )
        }

        function MyNameBlock(props: BlockProps) {
          return (
            <Composite.Block {...props}>
              <Field.Composition width="large">
                <Field.Name.First path="/first" />
                <Field.Name.Last path="/last" />
              </Field.Composition>
            </Composite.Block>
          )
        }

        function MyAddressBlock(props: BlockProps) {
          return (
            <Composite.Block {...props}>
              <Field.Composition width="large">
                <Field.String
                  label="Gateadresse"
                  path="/street"
                  width="stretch"
                />
                <Field.String label="Nr." path="/nr" width="small" />
              </Field.Composition>
            </Composite.Block>
          )
        }

        function MyValueBlock(props: BlockProps) {
          return (
            <Composite.Block {...props}>
              <Value.SummaryList>
                <Composite.Block path="/name">
                  <Value.Composition gap="small">
                    <Value.Name.First path="/first" />
                    <Value.Name.Last path="/last" />
                  </Value.Composition>
                </Composite.Block>

                <Composite.Block path="/address">
                  <Value.Composition gap="small">
                    <Value.String label="Gateadresse" path="/street" />
                    <Value.String label="Nr." path="/nr" placeholder="–" />
                  </Value.Composition>
                </Composite.Block>
              </Value.SummaryList>
            </Composite.Block>
          )
        }
      }}
    </ComponentBox>
  )
}

const Output = () => {
  const { data } = Form.useData()

  return (
    <Section
      element="output"
      innerSpace
      backgroundColor="sand-yellow"
      top
      bottom="large"
    >
      <Code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Code>
    </Section>
  )
}
