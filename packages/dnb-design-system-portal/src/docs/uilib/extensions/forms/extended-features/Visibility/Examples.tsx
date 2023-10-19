import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Form, Visibility } from '@dnb/eufemia/src/extensions/forms'

export const BasedOnBooleanTrue = () => {
  return (
    <ComponentBox scope={{ Visibility }}>
      <Visibility visible={true}>This is visible</Visibility>
    </ComponentBox>
  )
}

export const BasedOnBooleanFalse = () => {
  return (
    <ComponentBox scope={{ Visibility }}>
      <Visibility visible={{ foo: 'foo' }.foo === 'bar'}>
        This is not visible
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
