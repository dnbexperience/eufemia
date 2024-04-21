import classnames from 'classnames'
import { createSkeletonClass } from '../../../components/skeleton/SkeletonHelper'
import { P } from '../../../elements'
import { CardTextTranslations } from '../types'

type CardTextProps = {
  cardNumber: string
  translations: CardTextTranslations
  skeleton: boolean
}
const CardText = ({
  cardNumber,
  translations,
  skeleton,
}: CardTextProps) => {
  return (
    <span
      className={classnames(
        'dnb-payment-card__card__wrapper',
        createSkeletonClass('font', skeleton)
      )}
    >
      <P
        className="dnb-payment-card__card__holder"
        modifier="x-small medium"
      >
        {translations.text_card_number}
      </P>
      <P className="dnb-payment-card__card__numbers">{cardNumber}</P>
    </span>
  )
}

export default CardText
