import React, { useCallback } from 'react'
import { Field, Form } from '../../..'
import { Flex, Section } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Visibility',
}

const id = 'toggle-example'

export const Toggle = () => {
  const { data } = Form.useData(id, {
    showError: true,
    isVisible: true,
  })

  return (
    <Form.Handler id={id}>
      <Flex.Stack>
        <Field.Boolean label="Error" variant="button" path="/showError" />
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
        />
        {/* <Field.String
          path="/foo"
          label="Label"
          value={data.showError ? 'error' : 'valid'}
          pattern="^valid$"
          validateInitially
        /> */}
        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.String
            path="/foo"
            label="Label"
            value={data.showError ? 'error' : 'valid'}
            pattern="^valid$"
            validateInitially
          />
        </Form.Visibility>
        <span>bottom</span>
      </Flex.Stack>
    </Form.Handler>
  )
}

export const RadioDisabled = () => {
  return (
    <Form.Handler id={id}>
      <Flex.Stack>
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
        />
        <Form.Visibility visible pathTrue="/isVisible" animate keepInDOM>
          <Field.Selection
            label="Radio"
            variant="radio"
            path="/myValue"
            value="foo"
          >
            <Field.Option value="foo" title="Foo" />
            <Field.Option value="bar" title="Bar" />
          </Field.Selection>
        </Form.Visibility>
        <span>bottom</span>
      </Flex.Stack>
    </Form.Handler>
  )
}

export const filterDataHandler = ({ props }) => {
  return !props['data-exclude-field']
}

const OutputWithoutId = () => {
  const { data, filterData } = Form.useData<{
    myValue: string
  }>()
  return (
    <Section backgroundColor="sand-yellow" innerSpace>
      <pre>Filtered: {JSON.stringify(filterData(filterDataHandler))}</pre>
      <pre>All data: {JSON.stringify(data)}</pre>
    </Section>
  )
}

export const FilterData = () => {
  const { data, filterData } = Form.useData<{
    myValue: string
  }>('my-form')

  const OutputWithId = useCallback(() => {
    return (
      <Section backgroundColor="sand-yellow" innerSpace>
        <pre>
          Filtered: {JSON.stringify(filterData(filterDataHandler))}
        </pre>
        <pre>All data: {JSON.stringify(data)}</pre>
      </Section>
    )
  }, [data, filterData])

  return (
    <Form.Handler id="my-form">
      <Flex.Stack>
        <Field.Boolean
          label="Toggle visible"
          variant="button"
          path="/isVisible"
          data-exclude-field
        />
        <Form.Visibility
          pathTrue="/isVisible"
          animate
          keepInDOM
          fieldPropsWhenHidden={{ 'data-exclude-field': true }}
        >
          <Field.Selection
            label="Choose"
            variant="radio"
            path="/myValue"
            value="less"
          >
            <Field.Option value="less" title="Less" />
            <Field.Option value="more" title="More" />
          </Field.Selection>

          <Form.Visibility
            visibleWhen={{ path: '/myValue', hasValue: 'more' }}
            animate
            keepInDOM
            fieldPropsWhenHidden={{ 'data-exclude-field': true }}
          >
            <Field.String label="My String" path="/myString" value="foo" />
          </Form.Visibility>
        </Form.Visibility>

        <OutputWithId />
        <OutputWithoutId />
      </Flex.Stack>
    </Form.Handler>
  )
}

export const KeepInDOM = () => {
  const { data } = Form.useData(id, {
    showError: true,
    isVisible: true,
  })

  return (
    <Form.Handler id={id}>
      <Flex.Stack>
        <Field.Boolean label="Error" variant="button" path="/showError" />
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
        />
        <Form.Visibility pathTrue="/isVisible" keepInDOM>
          <Field.String
            path="/foo"
            label="Label"
            value={data.showError ? 'error' : 'valid'}
            pattern="^valid$"
            validateInitially
          />
        </Form.Visibility>
        <span>bottom</span>
      </Flex.Stack>
    </Form.Handler>
  )
}
