import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const WithLabelAndEmpty = () => {
  return (
    <ComponentBox>
      <Value.Number label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.Number placeholder="The number was not filled in" />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.Number label="Label text" value={12345678} />
    </ComponentBox>
  )
}

export const ValueAndPath = () => {
  return (
    <ComponentBox>
      <Form.Handler data={{ myNumber: 12345678 }}>
        <Value.Number
          label="Label text"
          currency
          currencyDisplay="code"
          currencyPosition="before"
          path="/myNumber"
        />
      </Form.Handler>
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component <Value.Number value={123} inline />{' '}
        This is after the component
      </P>
    </ComponentBox>
  )
}
