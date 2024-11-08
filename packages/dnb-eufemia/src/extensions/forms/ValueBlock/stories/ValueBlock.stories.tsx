import { Value } from '../..'
import { P } from '../../../../elements'

export default {
  title: 'Eufemia/Extensions/Forms/ValueBlock',
}

export function Inline() {
  return (
    <P>
      Max value (
      <Value.Currency value={123} decimals={0} inline />)
    </P>
  )
}
