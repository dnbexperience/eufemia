import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { useId } from 'react'
import {
  Field,
  Form,
  Tools,
  Value,
} from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src/components'

export const OutsideTreeFields = () => {
  return (
    <ComponentBox hideCode scope={{ useId }}>
      {() => {
        const Example = () => {
          const formHandlerId = useId()
          return (
            <Flex.Stack>
              <Form.Handler
                id={formHandlerId}
                data={{ firstName: 'Nora', lastName: 'Mork' }}
                required
              >
                <Flex.Stack>
                  <Form.Card>
                    <Form.SubHeading>Form.Handler</Form.SubHeading>
                    <Value.Composition label="Name">
                      <Value.String path="/firstName" />
                      <Value.String path="/lastName" />
                    </Value.Composition>
                  </Form.Card>
                </Flex.Stack>
              </Form.Handler>

              <Form.Card>
                <Flex.Stack>
                  <Form.SubHeading>
                    Linked editor (Form.Bridge)
                  </Form.SubHeading>

                  <Form.Bridge formHandlerId={formHandlerId}>
                    <Field.Name.First path="/firstName" />
                    <Field.Name.Last path="/lastName" />
                  </Form.Bridge>
                </Flex.Stack>
              </Form.Card>
            </Flex.Stack>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export const SectionInsideBridge = () => {
  return (
    <ComponentBox hideCode scope={{ useId }}>
      {() => {
        const Example = () => {
          const formHandlerId = useId()

          return (
            <>
              <Flex.Stack>
                <Form.Handler id={formHandlerId} required>
                  <Flex.Stack>
                    <Form.Card>
                      <Form.SubHeading>Form.Handler</Form.SubHeading>
                      <Field.Composition width="large">
                        <Field.Name.First path="/mySection/firstName" />
                        <Field.Name.Last path="/mySection/lastName" />
                      </Field.Composition>
                      <Form.SubmitButton />
                    </Form.Card>
                  </Flex.Stack>
                </Form.Handler>

                <Form.Bridge formHandlerId={formHandlerId}>
                  <Form.Card>
                    <Form.SubHeading>
                      Linked editor in Form.Section (Form.Bridge)
                    </Form.SubHeading>

                    <Form.Section path="/mySection">
                      <Flex.Stack>
                        <Field.Composition width="large">
                          <Field.Name.First path="/firstName" />
                          <Field.Name.Last path="/lastName" />
                        </Field.Composition>
                        <Form.SubmitButton />
                      </Flex.Stack>
                    </Form.Section>
                    <Tools.Log
                      label="Linked data"
                      placeholder="Type in either place to see linked data"
                    />
                  </Form.Card>
                </Form.Bridge>
              </Flex.Stack>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}
