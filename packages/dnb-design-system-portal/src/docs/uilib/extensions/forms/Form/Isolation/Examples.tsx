import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card, Flex, HeightAnimation, Section } from '@dnb/eufemia/src'
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
            <>
              <Form.Handler
                bottom="large"
                data={{
                  contactPersons: [{ title: 'Hanne', value: 'hanne' }],
                }}
              >
                <Card stack>
                  <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>
                  <Field.Selection
                    variant="radio"
                    dataPath="/contactPersons"
                  />
                  <Form.Isolation
                    commitHandleRef={commitHandleRef}
                    transformOnCommit={(isolatedData, handlerData) => {
                      const value =
                        isolatedData.newPerson.title.toLowerCase()
                      const transformedData = {
                        ...handlerData,
                        contactPersons: [
                          ...handlerData.contactPersons,
                          {
                            ...isolatedData.newPerson,
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
                  <Log />
                </Card>
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

        const Log = () => {
          const { data } = Form.useData()
          return (
            <Section
              element="output"
              innerSpace
              backgroundColor="sand-yellow"
              top
            >
              {JSON.stringify(data || {}, null, 4)}
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
      {() => {
        const MyForm = () => {
          return (
            <Form.Handler
              onChange={console.log}
              defaultData={{
                contactPersons: [
                  { title: 'Hanne', value: 'hanne' },
                  { title: 'Annen person', value: 'other' },
                ],
                mySelection: 'hanne',
              }}
            >
              <Card stack>
                <Form.SubHeading>
                  Legg til ny hovedkontaktperson
                </Form.SubHeading>

                <HeightAnimation>
                  <Field.Selection
                    variant="radio"
                    path="/mySelection"
                    dataPath="/contactPersons"
                  />
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
                        const lastPersonIndex =
                          handlerData.contactPersons.length - 1

                        return {
                          ...handlerData,
                          contactPersons: [
                            ...handlerData.contactPersons.slice(
                              0,
                              lastPersonIndex,
                            ),
                            {
                              ...isolatedData.newPerson,
                              value:
                                isolatedData.newPerson.title.toLowerCase(),
                            },
                            handlerData.contactPersons[lastPersonIndex],
                          ],
                        }
                      }}
                      id="my-isolated-area"
                      onCommit={() => {
                        Form.clearData('my-isolated-area')
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
              </Card>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
