import React from 'react'
import clsx from 'clsx'

import { ProductLogo, TypeLogo, BankLogo, BankAxeptLogo } from '../icons'
import StatusOverlay, {
  isCardBlocked,
  Translations,
} from './StatusOverlay'
import CardNumberText from './CardNumber'
import CardTypeText from './CardType'
import { BankAxeptType, CardType } from '../PaymentCard'

export type CardData = {
  productCode: string
  productName: string
  displayName: string
  cardDesign: {
    cardStyle: string
    bankLogo: string
    backgroundImage?: string
  }
  cardType: CardType
  productType: any
  bankAxept: BankAxeptType
}

type CardFigureProps = {
  id?: string | null
  skeleton?: boolean
  compact?: boolean
  data: CardData
  cardStatus: string
  cardNumber: string
  translations: Translations
}

function CardFigure({
  data,
  cardStatus,
  cardNumber,
  id = null,
  skeleton = false,
  compact = false,
  translations,
}: CardFigureProps) {
  const cardClasses = clsx(
    'dnb-payment-card__card',
    `dnb-payment-card__${data.cardDesign.cardStyle}`,
    `${isCardBlocked(cardStatus) ? 'dnb-payment-card__card--blocked' : ''}`
  )

  const ProviderIcons = () => {
    const multipleProviders =
      data.bankAxept === BankAxeptType.BankAxept &&
      data.cardType !== CardType.None
    return (
      <div
        className={clsx(
          'dnb-payment-card__card__providers',
          `${
            multipleProviders
              ? 'dnb-payment-card__card__providers--multiple'
              : ''
          }`
        )}
      >
        <BankAxeptLogo
          bankAxept={data.bankAxept}
          cardDesign={data.cardDesign}
        />
        {multipleProviders && <div className="provider--separator" />}
        <TypeLogo cardType={data.cardType} cardDesign={data.cardDesign} />
      </div>
    )
  }

  return (
    <div className="dnb-payment-card__card__wrapper">
      <div
        id={id}
        className={cardClasses}
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
            <div className="dnb-payment-card__card__top__left">
              <BankLogo logoType={data.cardDesign.bankLogo} />
              <ProductLogo
                productType={data.productType}
                cardDesign={data.cardDesign}
              />
            </div>
            <div className="dnb-payment-card__card__top__right">
              {compact ? (
                <ProviderIcons />
              ) : (
                <CardTypeText
                  isCredit={data.bankAxept === BankAxeptType.Credit}
                  skeleton={skeleton}
                />
              )}
            </div>
          </div>
          {!compact && (
            <div className="dnb-payment-card__card__bottom">
              <div className="dnb-payment-card__card__bottom__left">
                <CardNumberText
                  cardNumber={cardNumber}
                  skeleton={skeleton}
                />
              </div>
              <div className="dnb-payment-card__card__bottom__right">
                <ProviderIcons />
              </div>
            </div>
          )}
        </div>
      </div>
      {!compact && (
        <StatusOverlay
          cardStatus={cardStatus}
          cardDesign={data.cardDesign.cardStyle}
          translations={translations}
        />
      )}
    </div>
  )
}

export default CardFigure
