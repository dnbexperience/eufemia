import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Value } from '@dnb/eufemia/src/extensions/forms'

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.InstallmentDate value={15} />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.InstallmentDate label="Label text" value={20} />
    </ComponentBox>
  )
}

export const LastDay = () => {
  return (
    <ComponentBox>
      <Value.InstallmentDate value="last" />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.InstallmentDate placeholder="Not selected" />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        The installment day is <Value.InstallmentDate value={15} inline />{' '}
        every month.
      </P>
    </ComponentBox>
  )
}
