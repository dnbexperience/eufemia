import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { CardType, BankAxeptType } from '../utils/Types'
import { ProductLogo, TypeLogo, BankLogo, BankAxeptLogo } from '../icons'
import StatusOverlay, { isCardBlocked } from './StatusOverlay'
import CardNumberText from './CardNumber'
import CardTypeText from './CardType'

export const cardDataPropTypes = PropTypes.shape({
  productCode: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  cardDesign: PropTypes.object.isRequired,
  cardType: PropTypes.object.isRequired,
  productType: PropTypes.object.isRequired,
  bankAxept: PropTypes.object.isRequired,
})

CardFigure.propTypes = {
  id: PropTypes.string,
  skeleton: PropTypes.bool,
  compact: PropTypes.bool,
  data: cardDataPropTypes.isRequired,
  cardStatus: PropTypes.string.isRequired,
  cardNumber: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired,
}

function CardFigure({
  data,
  cardStatus,
  cardNumber,
  id = null,
  skeleton = false,
  compact = false,
  translations,
}) {
  const cardClasses = classnames(
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
        className={classnames(
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
