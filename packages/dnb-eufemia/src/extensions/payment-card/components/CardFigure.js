import React from 'react';
import classnames from 'classnames'
import PropTypes from "prop-types";

import {CardType, BankAxeptType} from '../utils/Types'
import { ProductLogo, TypeLogo, BankLogo, BankAxeptLogo } from '../icons';
import StatusOverlay, { isCardBlocked } from './StatusOverlay';
import CardNumberText from './CardNumber';
import CardTypeText from './CardType';

export const cardDataPropTypes = PropTypes.shape({
  productCode: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  cardDesign: PropTypes.object.isRequired,
  cardType: PropTypes.object.isRequired,
  productType: PropTypes.object.isRequired,
  bankAxept: PropTypes.object.isRequired,
})


const CardProvidersSeparator = ({ hasBankAxept, hasCardType }) => {
  return (hasBankAxept && hasCardType) && (<div className="separator" />)
}

CardFigure.propTypes = {
  id: PropTypes.string,
  skeleton: PropTypes.bool,
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
  translations,
}) {
  const cardClasses = classnames(
      'dnb-payment-card__card',
      `dnb-payment-card__${data.cardDesign.cardStyle}`,
      `${isCardBlocked(cardStatus) ? 'dnb-payment-card__card--blocked' : ''}`,
  );

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
                <CardTypeText
                    isCredit={data.bankAxept === BankAxeptType.Credit}
                    translations={translations}
                    skeleton={skeleton}
                />
              </div>
            </div>
            <div className="dnb-payment-card__card__bottom">
              <div className="dnb-payment-card__card__bottom__left">
                <CardNumberText
                    cardNumber={cardNumber}
                    skeleton={skeleton}
                />
              </div>
              <div className="dnb-payment-card__card__bottom__right">
                <BankAxeptLogo
                    bankAxept={data.bankAxept}
                    cardDesign={data.cardDesign}
                />
                <CardProvidersSeparator
                    hasBankAxept={data.bankAxept === BankAxeptType.BankAxept}
                    hasCardType={data.cardType !== CardType.None}
                />
                <TypeLogo
                    cardType={data.cardType}
                    cardDesign={data.cardDesign}
                />
              </div>
            </div>
          </div>
        </div>
        <StatusOverlay
            cardStatus={cardStatus}
            cardDesign={data.cardDesign.cardStyle}
            translations={translations}
        />
      </div>
  )
}

export default CardFigure;