import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import {
  Field,
  Form,
  TestElement,
  Visibility,
} from '@dnb/eufemia/src/extensions/forms'

export const BooleanExample = () => {
  return (
    <ComponentBox scope={{ Visibility, TestElement }}>
      <Form.Handler>
        <Flex.Stack>
          <Field.Boolean
            variant="buttons"
            path="/toggleValue"
            label="Show content"
            value={false}
          />
          <Visibility pathTrue="/toggleValue">
            <TestElement>Item 1</TestElement>
            <TestElement>Item 2</TestElement>
          </Visibility>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const InferData = () => {
  return (
    <ComponentBox scope={{ Visibility }}>
      {() => {
        const MyComponent = () => {
          const [state, setState] = React.useState(false)
          const inferData = React.useCallback(() => state, [state])

          return (
            <Form.Handler>
              <Field.Boolean
                path="/toggleValue"
                onChange={setState}
                label="Check me"
              />
              <Visibility inferData={inferData}>
                <P>This is visible</P>
              </Visibility>
            </Form.Handler>
          )
        }

        return <MyComponent />
      }}
    </ComponentBox>
  )
}

export const BasedOnBooleanTrue = () => {
  return (
    <ComponentBox scope={{ Visibility }}>
      <Visibility visible={true}>
        <P>This is visible</P>
      </Visibility>
    </ComponentBox>
  )
}

export const BasedOnContext = () => {
  return (
    <ComponentBox scope={{ Visibility }}>
      <Form.Handler
        data={{
          toBe: true,
          notToBe: false,
        }}
      >
        <Visibility pathTrue="/toBe">
          <P>This will show, as long as `toBe` is true.</P>
        </Visibility>
        <Visibility pathTrue="/notToBe">
          <P>This will not show until `notToBe` is true.</P>
        </Visibility>
      </Form.Handler>
    </ComponentBox>
  )
}
