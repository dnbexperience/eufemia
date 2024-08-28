import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Button, Flex, Section } from '@dnb/eufemia/src'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'
import { ScrollView } from '@dnb/eufemia/src/fragments'

export function Default() {
  return (
    <ComponentBox>
      {() => {
        const existingData = { foo: 'bar' }

        const Component = () => {
          const { data } = Form.useData('default-id', existingData)

          return (
            <Form.Handler id="default-id">
              <Field.String path="/foo" label={data.foo} />
            </Form.Handler>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}

export function Update() {
  return (
    <ComponentBox>
      {() => {
        const existingData = { count: 1 }

        const Component = () => {
          const { data, update } = Form.useData('update-id', existingData)

          const increment = React.useCallback(() => {
            update('/count', (count) => {
              return count + 1
            })
          }, [update])

          return (
            <Form.Handler id="update-id">
              <Flex.Horizontal>
                <Field.Number path="/count" showStepControls />
                <Form.SubmitButton
                  onClick={increment}
                  text={'Increment ' + data.count}
                />
              </Flex.Horizontal>
            </Form.Handler>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}

export function WithoutFormHandler() {
  return (
    <ComponentBox>
      {() => {
        const existingData = { count: 1 }

        const Component = () => {
          const { data, update } = Form.useData(
            'independent-id',
            existingData,
          )

          const increment = React.useCallback(() => {
            update('/count', (count) => {
              return count + 1
            })
          }, [update])

          return (
            <Button
              on_click={increment}
              text={'Increment ' + data.count}
              variant="secondary"
            />
          )
        }

        return (
          <Flex.Vertical>
            <Component />
            <Component />
          </Flex.Vertical>
        )
      }}
    </ComponentBox>
  )
}

export function FilterData() {
  return (
    <ComponentBox>
      {() => {
        const filterDataPaths = {
          '/isVisible': false,
          '/mySelection': ({ data }) => data.isVisible,
          '/myString': ({ data }) => {
            return data.isVisible && data.mySelection === 'more'
          },
        }

        const MyForm = () => {
          return (
            <Form.Handler
              defaultData={{
                isVisible: false,
                mySelection: 'less',
                myString: 'foo',
              }}
            >
              <Flex.Stack>
                <Field.Boolean
                  label="Toggle visible"
                  variant="button"
                  path="/isVisible"
                  data-exclude-field
                />
                <Form.Visibility pathTrue="/isVisible" animate>
                  <Field.Selection
                    label="Choose"
                    variant="radio"
                    path="/mySelection"
                    value="less"
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
                    <Field.String
                      label="My String"
                      path="/myString"
                      value="foo"
                    />
                  </Form.Visibility>
                </Form.Visibility>

                <Output />
              </Flex.Stack>
            </Form.Handler>
          )
        }

        const Output = () => {
          const { data, filterData } = Form.useData()

          return (
            <Section
              element="output"
              backgroundColor="sand-yellow"
              style={{ maxWidth: '80vw' }}
              innerSpace
            >
              <ScrollView>
                <pre>
                  Filtered: <br />
                  {JSON.stringify(filterData(filterDataPaths), null, 2)}
                </pre>
                <pre>
                  All data: <br />
                  {JSON.stringify(data, null, 2)}
                </pre>
              </ScrollView>
            </Section>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
