import React from 'react'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Button, Flex, Section } from '@dnb/eufemia/src'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'

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
            'idependent-id',
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
        const filterDataHandler = (path, value, props) => {
          if (value === 'removed') {
            return false
          }
        }

        const Component = () => {
          const { data, filterData } = Form.useData('filter-data')

          return (
            <>
              <Form.Handler id="filter-data">
                <Flex.Stack>
                  <Field.String path="/foo" value="bar" />
                  <Field.String path="/baz" value="removed" />

                  <Section backgroundColor="sand-yellow" innerSpace>
                    <pre>{JSON.stringify(data)}</pre>
                    <pre>
                      {JSON.stringify(filterData(filterDataHandler))}
                    </pre>
                  </Section>
                </Flex.Stack>
              </Form.Handler>
            </>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}
