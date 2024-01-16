import React from 'react'
import { Field, Form } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/useData',
}

const existingData = {
  count: 1,
  foo: 'bar',
}

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

export function Hook() {
  return (
    <Flex.Vertical>
      <Component />
      <Component />
    </Flex.Vertical>
  )
}
