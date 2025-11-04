import React from 'react'
import { Field, Form, Tools } from '../../..'
import { Flex, HeightAnimation } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Isolation',
}

export function Isolation() {
  return (
    <Form.Handler
      onSubmit={(data) => console.log('onSubmit', data)}
      onChange={async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log('Regular onChange:', data)
      }}
      defaultData={{
        regular: 'Regular',
      }}
    >
      <Flex.Stack>
        <Form.Isolation
          onCommit={(data) => console.log('onCommit:', data)}
        >
          <Flex.Stack>
            <Field.String label="Isolated" path="/isolated" required />

            <Flex.Horizontal>
              <Form.SubmitButton text="Commit" />
              <Form.Isolation.CommitButton text="Commit" />
            </Flex.Horizontal>
          </Flex.Stack>
        </Form.Isolation>

        <Field.String label="Synced" path="/isolated" />
        <Field.String label="Regular" path="/regular" required />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}

export function IsolationInsideSection() {
  return (
    <Form.Handler
      defaultData={{
        mySection: {
          isolated: 'Isolated value defined outside',
          regular: 'Outer regular value',
        },
      }}
    >
      <Form.Section path="/mySection">
        <Flex.Stack>
          <Form.Isolation
            defaultData={{
              isolated: 'The real initial "isolated" value',
            }}
            onCommit={(data) => console.log('onCommit:', data)}
          >
            <Flex.Stack>
              <Field.String label="Isolated" path="/isolated" required />

              <Flex.Horizontal>
                <Form.SubmitButton text="Commit" />
                <Form.Isolation.CommitButton text="Commit" />
              </Flex.Horizontal>
            </Flex.Stack>
          </Form.Isolation>

          <Field.String label="Synced" path="/isolated" />
          <Field.String label="Regular" path="/regular" required />

          <Form.SubmitButton />
        </Flex.Stack>
      </Form.Section>
    </Form.Handler>
  )
}

export const TransformOnCommit = () => {
  return (
    <Form.Handler
      defaultData={{
        contactPersons: [{ title: 'Hanne', value: 'hanne' }],
        mySelection: 'other',
      }}
    >
      <Form.Card>
        <Form.SubHeading>Legg til ny hovedkontaktperson</Form.SubHeading>

        <HeightAnimation>
          <Field.Selection
            variant="radio"
            path="/mySelection"
            dataPath="/contactPersons"
          >
            <Field.Option title="Annen person" value="other" />
          </Field.Selection>
        </HeightAnimation>

        <Form.Visibility
          visibleWhen={{
            path: '/mySelection',
            hasValue: 'other',
          }}
          animate
        >
          <Flex.Stack>
            <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>

            <Form.Isolation<{
              newPerson: { title: string }
              contactPersons: Array<{ title: string; value: string }>
            }>
              transformOnCommit={(isolatedData, handlerData) => {
                return {
                  ...handlerData,
                  contactPersons: [
                    ...handlerData.contactPersons,
                    {
                      ...isolatedData.newPerson,
                      value: isolatedData.newPerson.title.toLowerCase(),
                    },
                  ],
                }
              }}
              onCommit={(data, { clearData }) => {
                clearData()
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
      </Form.Card>
    </Form.Handler>
  )
}

export function preventUncommittedChanges() {
  return (
    <Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
      <Flex.Stack>
        <Form.Isolation
          preventUncommittedChanges
          resetDataAfterCommit
          defaultData={{ isolated: 'Isolated' }}
        >
          <Flex.Stack>
            <Field.String label="Isolated" path="/isolated" required />

            <Flex.Horizontal>
              <Form.Isolation.CommitButton />
              <Form.Isolation.ResetButton showWhen="uncommittedChangeDetected" />
            </Flex.Horizontal>
          </Flex.Stack>
        </Form.Isolation>

        <Form.SubmitButton />

        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}
