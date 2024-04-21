import {
  VisaDefault,
  VisaPlatinum,
  MastercardDefault,
  MastercardDark,
} from '../../icons'
import { CardDesignObject, CardType, Mastercard, Visa } from '../../types'

const id = 'dnb-payment-card__card__credit-type'

function getVisaCard(visaType: Visa) {
  if (typeof visaType === 'object') {
    return <VisaDefault className={id} fill={visaType.color} />
  }
  if (typeof visaType === 'string') {
    return <VisaPlatinum className={id} />
  }
}

function getMasterCard(mastercardType: Mastercard) {
  if (mastercardType === Mastercard.Default) {
    return <MastercardDefault className={id} />
  }
  if (mastercardType === Mastercard.Dark) {
    return <MastercardDark className={id} />
  }
}

const TypeLogo = ({
  cardType,
  cardDesign,
}: {
  cardType: CardType
  cardDesign: CardDesignObject
}) => {
  switch (cardType) {
    case CardType.Visa:
      return getVisaCard(cardDesign.visa)
    case CardType.Mastercard:
      return getMasterCard(cardDesign.mastercard)
    case CardType.None:
    default:
      return null
  }
}

export default TypeLogo
