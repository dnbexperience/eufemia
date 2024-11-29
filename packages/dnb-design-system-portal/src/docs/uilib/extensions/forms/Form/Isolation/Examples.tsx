import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, HeightAnimation } from '@dnb/eufemia/src'
import { Field, Form, Tools } from '@dnb/eufemia/src/extensions/forms'
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
              <Form.Isolation.CommitButton text="Commit" />
            </Flex.Stack>
          </Form.Isolation>

          <Field.String
            required
            label="Committed from isolation"
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
    <ComponentBox scope={{ Tools }}>
      {() => {
        const MyForm = () => {
          const commitHandleRef = React.useRef(null)

          return (
            <>
              <Form.Handler
                bottom="large"
                data={{
                  contactPersons: [{ title: 'Hanne', value: 'hanne' }],
                }}
              >
                <Form.Card>
                  <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>

                  <HeightAnimation>
                    <Field.Selection
                      variant="radio"
                      dataPath="/contactPersons"
                    />
                  </HeightAnimation>

                  <Form.Isolation
                    commitHandleRef={commitHandleRef}
                    transformOnCommit={(isolatedData, handlerData) => {
                      // Because of missing TypeScript support
                      const contactPersons = handlerData['contactPersons']
                      const newPerson = isolatedData['newPerson']

                      const value = newPerson.title.toLowerCase()
                      const transformedData = {
                        ...handlerData,
                        contactPersons: [
                          ...contactPersons,
                          {
                            ...newPerson,
                            value,
                          },
                        ],
                      }

                      return transformedData
                    }}
                  >
                    <Flex.Stack>
                      <Form.Section path="/newPerson">
                        <Field.Name.First required path="/title" />
                      </Form.Section>
                    </Flex.Stack>
                  </Form.Isolation>
                  <Tools.Log />
                </Form.Card>
              </Form.Handler>

              <button
                onClick={() => {
                  commitHandleRef.current()
                }}
              >
                Commit from outside of handler
              </button>
            </>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const TransformCommitData = () => {
  return (
    <ComponentBox>
      {() => {
        const MyForm = () => {
          return (
            <Form.Handler
              onChange={console.log}
              defaultData={{
                contactPersons: [{ title: 'Hanne', value: 'hanne' }],
                mySelection: 'hanne',
              }}
            >
              <Form.Card>
                <Form.SubHeading>
                  Legg til ny hovedkontaktperson
                </Form.SubHeading>

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
                    <Form.SubHeading>
                      Ny hovedkontaktperson
                    </Form.SubHeading>

                    <Form.Isolation
                      transformOnCommit={(isolatedData, handlerData) => {
                        // Because of missing TypeScript support
                        const contactPersons =
                          handlerData['contactPersons']
                        const newPerson = isolatedData['newPerson']

                        return {
                          ...handlerData,
                          contactPersons: [
                            ...contactPersons,
                            {
                              ...newPerson,
                              value: newPerson.title.toLowerCase(),
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

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const InsideSection = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          mySection: {
            isolated: 'Isolated value defined outside',
            regular: 'Outer regular value',
          },
        }}
        onChange={(data) => {
          console.log('Outer onChange:', data)
        }}
      >
        <Form.Section path="/mySection">
          <Flex.Stack>
            <Form.Isolation
              defaultData={{
                isolated: 'The real initial "isolated" value',
              }}
              onPathChange={(path, value) => {
                console.log('Isolated onChange:', path, value)
              }}
              onCommit={(data) => console.log('onCommit:', data)}
            >
              <Flex.Stack>
                <Field.String label="Isolated" path="/isolated" required />
                <Form.Isolation.CommitButton />
              </Flex.Stack>
            </Form.Isolation>

            <Field.String label="Synced" path="/isolated" />
            <Field.String label="Regular" path="/regular" required />

            <Form.SubmitButton />
          </Flex.Stack>
        </Form.Section>
      </Form.Handler>
    </ComponentBox>
  )
}
