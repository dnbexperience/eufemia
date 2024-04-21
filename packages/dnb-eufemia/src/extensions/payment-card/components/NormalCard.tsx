import {
  ProductLogo,
  TypeLogo,
  BankLogo,
  BankAxeptOrCreditLogo,
} from './iconComponents'
import classnames from 'classnames'
import { CardProduct, PaymentCardStatus } from '../types'
import CardText from './CardText'
import { StatusOverlay } from './StatusOverlay'

export type PaymentCardCardStatus =
  | 'active'
  | 'blocked'
  | 'expired'
  | 'not_active'
  | 'order_in_process'
  | 'renewed'
  | 'replaced'
  | 'unknown'

export type NormalCardProps = {
  id?: string
  skeleton?: boolean
  data: CardProduct
  cardStatus: PaymentCardStatus
  cardNumber: string
  translations: any // Unsure about the type of this
}

const NormalCard = ({
  data,
  cardStatus,
  cardNumber,
  id = null,
  skeleton = null,
  translations,
}: NormalCardProps) => {
  return (
    <div
      id={id}
      className={classnames(
        'dnb-payment-card__card',
        `dnb-payment-card__${data.cardDesign.cardStyle}`
      )}
      {...(data.cardDesign?.backgroundImage
        ? {
            style: {
              backgroundImage: `url(${data.cardDesign.backgroundImage})`,
            },
          }
        : {})}
    >
      <div className="dnb-payment-card__card__content">
        <div className="dnb-payment-card__card__top">
          <BankLogo {...data.cardDesign.bankLogo} />
          <ProductLogo
            productType={data.productType}
            cardDesign={data.cardDesign}
          />
          <BankAxeptOrCreditLogo
            bankAxept={data.bankAxept}
            cardDesign={data.cardDesign}
          />
        </div>
        <div className="dnb-payment-card__card__bottom">
          <CardText
            cardNumber={cardNumber}
            translations={translations}
            skeleton={skeleton}
          />
          <TypeLogo
            cardType={data.cardType}
            cardDesign={data.cardDesign}
          />
        </div>
      </div>
      <StatusOverlay
        skeleton={skeleton}
        cardStatus={cardStatus}
        translations={translations}
      />
    </div>
  )
}

export default NormalCard
