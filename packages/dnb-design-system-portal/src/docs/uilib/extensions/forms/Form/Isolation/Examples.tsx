import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card, Flex, Section } from '@dnb/eufemia/src'
import { Field, Form, Iterate } from '@dnb/eufemia/src/extensions/forms'
import React from 'react'

export const UsingCommitButton = () => {
  return (
    <ComponentBox>
      <Form.Handler
        onSubmit={(data) => console.log('onSubmit', data)}
        onChange={(data) => console.log('Regular onChange:', data)}
      >
        <Flex.Stack>
          <Form.Isolation
            onChange={(data) => console.log('Isolated onChange:', data)}
          >
            <Flex.Stack>
              <Field.String required label="Isolated" path="/isolated" />

              <Flex.Horizontal>
                <Form.Isolation.CommitButton text="Commit" />
              </Flex.Horizontal>
            </Flex.Stack>
          </Form.Isolation>

          <Field.String
            required
            label="Commited from isolation"
            path="/isolated"
          />
          <Field.String
            required
            label="Outside of isolation"
            path="/regular"
          />

          <Form.SubmitButton />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const CommitHandleRef = () => {
  return (
    <ComponentBox>
      {() => {
        const MyForm = () => {
          const commitHandleRef = React.useRef(null)

          return (
            <Form.Handler data={{ foo: 'bar' }}>
              <Card stack>
                <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>
                <Form.Isolation commitHandleRef={commitHandleRef}>
                  <Flex.Stack>
                    <Form.Section path="/newPerson">
                      <Field.Name.First required path="/title" />
                    </Form.Section>
                    <button
                      onClick={() => {
                        commitHandleRef.current()
                      }}
                    >
                      Legg til
                    </button>
                  </Flex.Stack>
                </Form.Isolation>
                <Log />
              </Card>
            </Form.Handler>
          )
        }

        const Log = () => {
          const { data } = Form.useData()
          return (
            <Section backgroundColor="sand-yellow" innerSpace>
              <pre>{JSON.stringify(data)}</pre>
            </Section>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const TransformCommitData = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Form.Handler
        onChange={console.log}
        defaultData={{
          persons: [{ value: 'id-123', title: 'Hanne' }],
        }}
      >
        <Card stack>
          <Form.SubHeading>Legg til ny hovedkontaktperson</Form.SubHeading>
          <Field.Selection required variant="radio" path="/person">
            <Iterate.Array path="/persons">
              <Field.Option itemPath="/" />
            </Iterate.Array>

            <Field.Option value="other-person">Annen person</Field.Option>
          </Field.Selection>
          <Form.Visibility
            visibleWhen={{
              path: '/person',
              hasValue: 'other-person',
            }}
            animate
          >
            <Flex.Stack>
              <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>
              <Form.Isolation
                transformCommitData={(isolatedData, outerData) => {
                  return {
                    ...outerData,
                    persons: [
                      ...outerData.persons,
                      isolatedData.newPerson,
                    ],
                  }
                }}
              >
                <Flex.Stack>
                  <Form.Section path="/newPerson">
                    <Field.Name.First required path="/title" />
                  </Form.Section>

                  <Form.Isolation.CommitButton />
                </Flex.Stack>
              </Form.Isolation>
            </Flex.Stack>
          </Form.Visibility>

          <Form.SubmitButton />
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}
