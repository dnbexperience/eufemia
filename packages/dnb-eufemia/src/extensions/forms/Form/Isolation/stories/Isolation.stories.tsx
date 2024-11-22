import React from 'react'
import { Field, Form } from '../../..'
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
        // return {
        //   info: 'Info message',
        // }
      }}
      defaultData={{
        regular: 'Regular',
        // isolated: 'Isolated',
      }}
    >
      <Flex.Stack>
        <Form.Isolation
          // onChange={async (data) => {
          //   await new Promise((resolve) => setTimeout(resolve, 1000))
          //   // console.log('Isolated onChange:', data)
          //   // return {
          //   //   info: 'Info message',
          //   // }
          // }}
          onCommit={(data) => console.log('onCommit:', data)}
          // defaultData={{
          //   isolated: 'Isolated',
          // }}
        >
          <Flex.Stack>
            <Field.String
              label="Isolated"
              path="/isolated"
              required
              // validateInitially
            />

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
      // onChange={async (data) => {
      //   console.log('Outer onChange:', data)
      //   await new Promise((resolve) => setTimeout(resolve, 10))
      // }}
    >
      <Form.Section path="/mySection">
        <Flex.Stack>
          <Form.Isolation
            defaultData={{
              isolated: 'The real initial "isolated" value',
            }}
            // onPathChange={async (path, value) => {
            //   console.log('Isolated onChange:', path, value)
            //   await new Promise((resolve) => setTimeout(resolve, 10))
            // }}
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
      // onChange={console.log}
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

            <Form.Isolation
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
