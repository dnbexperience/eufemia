import React from 'react'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import {
  Field,
  Form,
  TestElement,
} from '@dnb/eufemia/src/extensions/forms'

export const BooleanExample = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Form.Handler>
        <Flex.Stack>
          <Field.Boolean
            label="Show content"
            variant="buttons"
            path="/toggleValue"
            value={false}
          />
          <Form.Visibility pathTrue="/toggleValue">
            <TestElement>Item 1</TestElement>
            <TestElement>Item 2</TestElement>
          </Form.Visibility>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const PathValue = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Field.Toggle
          label="Show content"
          valueOn="checked"
          valueOff="unchecked"
          variant="buttons"
          path="/toggleValue"
          value="unchecked"
        />
        <Form.Visibility pathValue="/toggleValue" whenValue="checked">
          <P>This is visible</P>
        </Form.Visibility>
      </Form.Handler>
    </ComponentBox>
  )
}

export const InferData = () => {
  return (
    <ComponentBox>
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
              <Form.Visibility inferData={inferData}>
                <P>This is visible</P>
              </Form.Visibility>
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
    <ComponentBox>
      <Form.Visibility visible={true}>
        <P>This is visible</P>
      </Form.Visibility>
    </ComponentBox>
  )
}

export const BasedOnContext = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{
          toBe: true,
          notToBe: false,
        }}
      >
        <Form.Visibility pathTrue="/toBe">
          <P>This will show, as long as `toBe` is true.</P>
        </Form.Visibility>
        <Form.Visibility pathTrue="/notToBe">
          <P>This will not show until `notToBe` is true.</P>
        </Form.Visibility>
      </Form.Handler>
    </ComponentBox>
  )
}
