import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.InstallmentDay value={15} />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.InstallmentDay label="Label text" value={20} />
    </ComponentBox>
  )
}

export const LastDay = () => {
  return (
    <ComponentBox>
      <Value.InstallmentDay value="last" />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.InstallmentDay placeholder="Not selected" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        The installment day is <Value.InstallmentDay value={15} inline />{' '}
        every month.
      </P>
    </ComponentBox>
  )
}
