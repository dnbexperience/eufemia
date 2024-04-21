import { BankLogoType } from '../../types'
import { DNB, Sbanken } from '../../icons'

const BankLogo = ({ type, color }: BankLogoType) => {
  if (type === 'Sbanken') {
    return (
      <Sbanken
        fill={color}
        className="dnb-payment-card__card__bank-logo"
      />
    )
  }
  if (type === 'DNB') {
    return (
      <DNB fill={color} className="dnb-payment-card__card__bank-logo" />
    )
  }
}

export default BankLogo
