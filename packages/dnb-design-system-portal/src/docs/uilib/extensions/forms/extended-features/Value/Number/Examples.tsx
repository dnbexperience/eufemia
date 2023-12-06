import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Number showEmpty />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Number placeholder="The number was not filled in" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Number value={123} />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Number label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Number label="Label text" value={12345678} />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <P>
        This is before the component
        <Value.Number value={123} inline />
        This is after the component
      </P>
    </ComponentBox>
  )
}

export const WithThousandSeparator = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Number
        label="Label text"
        value={12345678.9}
        thousandSeparator=" "
      />
    </ComponentBox>
  )
}

export const WithDecimalSymbol = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Number
        label="Label text"
        value={123.4567}
        decimalSymbol="."
      />
    </ComponentBox>
  )
}

export const WithDecimalLimit = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Number label="Label text" value={123.4567} decimalLimit={2} />
    </ComponentBox>
  )
}

export const WithPrefix = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Number label="Label text" value={123.4} prefix="$" />
    </ComponentBox>
  )
}

export const WithSuffix = () => {
  return (
    <ComponentBox scope={{ Value }}>
      <Value.Number label="Label text" value={123.4} suffix="kr" />
    </ComponentBox>
  )
}
