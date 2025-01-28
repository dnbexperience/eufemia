import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import {
  Field,
  Form,
  JSONSchema,
  SectionProps,
  Tools,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

export const WithoutDataContext = () => {
  return (
    <ComponentBox>
      <Form.Section data={{ myField: 'Value' }} onChange={console.log}>
        <Field.String path="/myField" />
      </Form.Section>
    </ComponentBox>
  )
}

export const NestedPathSection = () => {
  return (
    <ComponentBox>
      {() => {
        const MyNameSection = (props: SectionProps) => {
          return (
            <Form.Section {...props}>
              <Form.Card>
                <Field.Name.First path="/firstName" />
                <Field.Name.Last path="/lastName" />
              </Form.Card>
            </Form.Section>
          )
        }

        return (
          <Form.Handler
            onSubmit={async (data) => console.log('onSubmit', data)}
            defaultData={{
              nestedPath: {
                firstName: 'Nora',
                lastName: 'Mørk',
              },
            }}
          >
            <MyNameSection path="/nestedPath" />
            <Form.SubmitButton variant="send" />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const ViewAndEditContainer = () => {
  return (
    <ComponentBox data-visual-test="view-and-edit-container" hideCode>
      {() => {
        const MyEditContainer = () => {
          return (
            <Form.Section.EditContainer>
              <Field.Name.First path="/firstName" />
              <Field.Name.Last path="/lastName" />
            </Form.Section.EditContainer>
          )
        }

        const MyViewContainer = () => {
          return (
            <Form.Section.ViewContainer>
              <Value.SummaryList>
                <Value.Name.First path="/firstName" />
                <Value.Name.Last path="/lastName" />
              </Value.SummaryList>
            </Form.Section.ViewContainer>
          )
        }

        return (
          <Form.Handler
            onSubmit={async (data) => console.log('onSubmit', data)}
            defaultData={{
              nestedPath: {
                firstName: 'Nora',
                lastName: 'Mørk',
              },
            }}
          >
            <Form.Card>
              <Form.SubHeading>Your account</Form.SubHeading>
              <Form.Section path="/nestedPath" required>
                <MyEditContainer />
                <MyViewContainer />
              </Form.Section>
            </Form.Card>
            <Form.SubmitButton />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const ViewAndEditContainerValidation = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const MyEditContainer = () => {
          return (
            <Form.Section.EditContainer>
              <Field.Name.First path="/firstName" />
              <Field.Name.Last path="/lastName" />
            </Form.Section.EditContainer>
          )
        }

        const MyViewContainer = () => {
          return (
            <Form.Section.ViewContainer>
              <Value.SummaryList>
                <Value.Name.First path="/firstName" />
                <Value.Name.Last path="/lastName" />
              </Value.SummaryList>
            </Form.Section.ViewContainer>
          )
        }

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
      }}
    </ComponentBox>
  )
}

export const BasicViewAndEditContainer = () => {
  return (
    <ComponentBox
      data-visual-test="basic-view-and-edit-container"
      hideCode
    >
      {() => {
        const MyEditContainer = () => {
          return (
            <Form.Section.EditContainer variant="basic">
              <Field.Name.First path="/firstName" />
              <Field.Name.Last path="/lastName" />
            </Form.Section.EditContainer>
          )
        }

        const MyViewContainer = () => {
          return (
            <Form.Section.ViewContainer variant="basic">
              <Value.SummaryList>
                <Value.Name.First path="/firstName" />
                <Value.Name.Last path="/lastName" />
              </Value.SummaryList>
            </Form.Section.ViewContainer>
          )
        }

        return (
          <Form.Handler
            onSubmit={async (data) => console.log('onSubmit', data)}
            defaultData={{
              nestedPath: {
                firstName: 'Nora',
                lastName: 'Mørk',
              },
            }}
          >
            <Form.Card>
              <Form.SubHeading>Your account</Form.SubHeading>
              <Form.Section path="/nestedPath" required>
                <MyEditContainer />
                <MyViewContainer />
              </Form.Section>
            </Form.Card>
            <Form.SubmitButton />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const OverwriteProps = () => {
  return (
    <ComponentBox>
      {() => {
        const MyNameSection = (props) => {
          return (
            <Form.Section {...props}>
              <Form.Card>
                <Field.Composition width="large">
                  <Field.Name.First path="/firstName" />
                  <Field.Name.Last
                    path="/lastName"
                    required
                    minLength={10}
                  />
                </Field.Composition>
              </Form.Card>
            </Form.Section>
          )
        }

        return (
          <Form.Handler
            onSubmit={async (data) => console.log('onSubmit', data)}
            defaultData={{
              nestedPath: {
                firstName: '',
                lastName: 'M',
              },
            }}
          >
            <MyNameSection
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
    <ComponentBox>
      {() => {
        const MyNameSection = (props: SectionProps) => {
          return (
            <Form.Section {...props}>
              <Form.Card>
                <Field.Composition width="large">
                  <Field.Name.First path="/firstName" />
                  <Field.Name.Last path="/lastName" />
                </Field.Composition>
              </Form.Card>
            </Form.Section>
          )
        }

        const schema: JSONSchema = {
          type: 'object',
          required: ['myRequiredSection'],
        }

        return (
          <Flex.Stack>
            <Form.Handler
              onSubmit={async (data) => console.log('onSubmit', data)}
            >
              <MyNameSection required />
              <Form.SubmitButton variant="send" />
            </Form.Handler>

            <Form.Handler
              onSubmit={async (data) => console.log('onSubmit', data)}
              schema={schema}
            >
              <MyNameSection path="/myRequiredSection" />
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
    <ComponentBox>
      {() => {
        const MyNameSection = (props: SectionProps) => {
          return (
            <Form.Section {...props}>
              <Form.Card>
                <Field.Composition width="large">
                  <Field.Name.First path="/firstName" />
                  <Field.Name.Last
                    path="/lastName"
                    required
                    minLength={10}
                  />
                </Field.Composition>
              </Form.Card>
            </Form.Section>
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
            onSubmit={async (data) => console.log('onSubmit', data)}
            schema={mySchema}
            defaultData={{
              nestedPath: {
                firstName: '',
                lastName: 'M',
              },
            }}
          >
            <MyNameSection path="/nestedPath" />
            <Form.SubmitButton variant="send" />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const WithVisibility = () => {
  return (
    <ComponentBox>
      {() => {
        const MySection = ({ children, ...props }) => {
          return (
            <Form.Section {...props}>
              <Form.Card>
                <Field.Boolean
                  label="Are you sure?"
                  variant="buttons"
                  path="/iAmSure"
                />
                <Form.Visibility pathTrue="/iAmSure" animate>
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
              </Form.Card>

              <Tools.Log />
            </Form.Section>
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
            <MySection path="/nestedPath">
              <Form.Visibility
                visibleWhen={{
                  path: '/myString',
                  hasValue: (value) => value !== 'has a value',
                }}
                animate
              >
                <P>
                  Result:{' '}
                  <Value.String path="/nestedPath/myString" inline />
                </P>
              </Form.Visibility>
            </MySection>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const NestedSections = () => {
  return (
    <ComponentBox>
      {() => {
        return (
          <Form.Handler
            onSubmit={async (data) => console.log('onSubmit', data)}
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
            <MySection path="/nestedPath" required />
            <Form.SubmitButton variant="send" />
          </Form.Handler>
        )

        function MySection(props: SectionProps) {
          return (
            <Form.Section {...props}>
              <Form.Card>
                <MyNameSection path="/name" />
                <MyAddressSection path="/address" />
                <MyValueSection />
              </Form.Card>
            </Form.Section>
          )
        }

        function MyNameSection(props: SectionProps) {
          return (
            <Form.Section {...props}>
              <Field.Composition width="large">
                <Field.Name.First path="/first" />
                <Field.Name.Last path="/last" />
              </Field.Composition>
            </Form.Section>
          )
        }

        function MyAddressSection(props: SectionProps) {
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

        function MyValueSection(props: SectionProps) {
          return (
            <Form.Section {...props}>
              <Value.SummaryList>
                <Form.Section path="/name">
                  <Value.Composition gap="small">
                    <Value.Name.First path="/first" />
                    <Value.Name.Last path="/last" />
                  </Value.Composition>
                </Form.Section>

                <Form.Section path="/address">
                  <Value.Composition gap="small">
                    <Value.String label="Gateadresse" path="/street" />
                    <Value.String label="Nr." path="/nr" placeholder="–" />
                  </Value.Composition>
                </Form.Section>
              </Value.SummaryList>
            </Form.Section>
          )
        }
      }}
    </ComponentBox>
  )
}
