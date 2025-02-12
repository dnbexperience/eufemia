import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Value.Address showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.Address placeholder="The value was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.Address value="Dronning Eufemias gate 30" />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.Address label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.Address
        label="Label text"
        value="Dronning Eufemias gate 30"
      />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.Address value="Dronning Eufemias gate 30" inline /> This is
        after the component
      </P>
    </ComponentBox>
  )
}
