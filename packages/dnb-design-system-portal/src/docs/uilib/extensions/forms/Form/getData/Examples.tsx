import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, Section } from '@dnb/eufemia/src'
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

export function FilterData() {
  return (
    <ComponentBox>
      {() => {
        // Method A (if you know the paths)
        const filterDataPaths = {
          '/foo': ({ value }) => {
            if (value === 'foo') {
              return false
            }
          },
        }

        // Method B (will iterate over all fields regardless of the path)
        const filterDataHandler = ({ value }) => {
          if (value === 'foo') {
            return false
          }
        }

        const Component = () => {
          return (
            <Form.Handler id="filter-data">
              <Flex.Stack>
                <Field.String path="/foo" value="foo" />
                <Field.String path="/bar" value="bar" />
              </Flex.Stack>
            </Form.Handler>
          )
        }

        const { filterData } = Form.getData('filter-data')

        return (
          <Flex.Stack>
            <Component />
            <Section backgroundColor="sand-yellow" innerSpace>
              <pre>{JSON.stringify(filterData(filterDataPaths))}</pre>
              <pre>{JSON.stringify(filterData(filterDataHandler))}</pre>
            </Section>
          </Flex.Stack>
        )
      }}
    </ComponentBox>
  )
}
