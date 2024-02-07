import React from 'react'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Section } from '@dnb/eufemia/src'
import { Form, Field, Value } from '@dnb/eufemia/src/extensions/forms'

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
        const filterDataHandler = (path, value, props) => {
          if (value === 'foo') {
            return false
          }
        }

        const Component = () => {
          return (
            <Form.Handler id="filter-data">
              <Value.String path="/foo" value="foo" />{' '}
              <Value.String path="/bar" value="baz" />
            </Form.Handler>
          )
        }

        const { data, filterData } = Form.getData('filter-data')

        return (
          <>
            <Component />

            <Section backgroundColor="sand-yellow" innerSpace>
              <pre>{JSON.stringify(data)}</pre>
              <pre>{JSON.stringify(filterData(filterDataHandler))}</pre>
            </Section>
          </>
        )
      }}
    </ComponentBox>
  )
}
