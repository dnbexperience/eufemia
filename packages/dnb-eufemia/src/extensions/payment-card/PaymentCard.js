/**
 * Web PaymentCard Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../../components/space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../../components/skeleton/SkeletonHelper'
import P from '../../elements/P'

import { ProductType, CardType } from './utils/Types'
import Designs, { defaultDesign } from './utils/CardDesigns'
import cardProducts from './utils/cardProducts'
import { ProductLogo, TypeLogo, BankLogo, StatusIcon } from './icons'

export { Designs, ProductType, CardType }

const cardDataPropTypes = PropTypes.shape({
  productCode: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  cardDesign: PropTypes.object.isRequired,
  cardType: PropTypes.object.isRequired,
  productType: PropTypes.object.isRequired,
})

const translationDefaultPropsProps = {
  text_card_number: null,
  text_expired: null,
  text_blocked: null,
}

export default class PaymentCard extends React.PureComponent {
  static tagName = 'dnb-payment-card'
  static contextType = Context

  static propTypes = {
    product_code: PropTypes.string.isRequired,
    card_number: PropTypes.string.isRequired,
    card_status: PropTypes.oneOf(['active', 'blocked', 'expired']),
    variant: PropTypes.oneOf(['normal', 'compact']),
    digits: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    raw_data: cardDataPropTypes,
    id: PropTypes.string,
    locale: PropTypes.string,

    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
  }

  static defaultProps = {
    digits: 8,
    locale: null,
    card_status: 'active',
    variant: 'normal',

    id: null,
    raw_data: null,

    skeleton: false,
    class: null,
    className: null,
    children: null,

    ...translationDefaultPropsProps,
  }

  static enableWebComponent() {
    registerElement(
      PaymentCard.tagName,
      PaymentCard,
      PaymentCard.defaultProps
    )
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      PaymentCard.defaultProps,
      { locale: this.context.locale },
      { skeleton: this.context?.skeleton }
    )

    const {
      product_code,
      card_number,
      card_status,
      variant,
      digits,
      id,
      raw_data,
      locale,
      skeleton,
      className,
      class: _className,
      children, //eslint-disable-line
      ...attributes
    } = props

    const cardData = raw_data || getCardData(product_code)

    const params = {
      className: classnames(
        'dnb-payment-card',
        `dnb-payment-card--${variant}`,
        createSkeletonClass(null, skeleton, this.context),
        createSpacingClasses(props),
        className,
        _className
      ),
      ...attributes,
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <Provider locale={locale}>
        <Context.Consumer>
          {({ translation }) => {
            const translations = extendPropsWithContext(
              this.props,
              translationDefaultPropsProps,
              translation.PaymentCard
            )
            return (
              <figure {...params}>
                <figcaption className="dnb-sr-only dnb-payment-card__figcaption">
                  {cardData.productName}
                </figcaption>
                <NormalCard
                  id={id}
                  skeleton={isTrue(skeleton)}
                  data={cardData}
                  cardStatus={card_status}
                  cardNumber={formatCardNumber(
                    card_number,
                    parseFloat(digits)
                  )}
                  translations={translations}
                />
              </figure>
            )
          }}
        </Context.Consumer>
      </Provider>
    )
  }
}

const formatCardNumberRegex = /(?=(?:....)*$)/g

export const formatCardNumber = (cardNumber, digits) =>
  digits
    ? cardNumber
        .slice(cardNumber.length - digits, cardNumber.length)
        .replace(formatCardNumberRegex, ' ')
    : cardNumber.replace(formatCardNumberRegex, ' ')

export const getCardData = (productCode) => {
  const card = cardProducts.find(
    (item) => item.productCode === productCode
  )
  return card || defaultCard(productCode)
}

const defaultCard = (productCode) => ({
  productCode,
  productName: '',
  displayName: '',
  cardDesign: defaultDesign,
  cardType: CardType.None,
  productType: ProductType.None,
})

StatusOverlay.propTypes = {
  cardStatus: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired,
  skeleton: PropTypes.bool,
}
StatusOverlay.defaultProps = {
  skeleton: false,
}

function StatusOverlay({ cardStatus, translations, skeleton }) {
  switch (cardStatus) {
    case 'blocked':
      return (
        <div
          className={classnames(
            'dnb-payment-card__blocking__overlay',
            createSkeletonClass('font', skeleton)
          )}
        >
          <div className="dnb-payment-card__blocking__center">
            <StatusIcon status={cardStatus} />
            <P top="xx-small">{translations.text_blocked}</P>
          </div>
        </div>
      )

    case 'expired':
      return (
        <div
          className={classnames(
            'dnb-payment-card__blocking__overlay',
            createSkeletonClass('font', skeleton)
          )}
        >
          <div className="dnb-payment-card__blocking__center">
            <StatusIcon status={cardStatus} />
            <P top="xx-small">{translations.text_expired}</P>
          </div>
        </div>
      )

    case 'active':
    default:
      return null
  }
}

CardText.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired,
  skeleton: PropTypes.bool.isRequired,
}

function CardText({ cardNumber, translations, skeleton }) {
  return (
    <span
      className={classnames(
        'dnb-payment-card__card__wrapper',
        createSkeletonClass('font', skeleton)
      )}
    >
      <P
        className="dnb-payment-card__card__holder"
        modifier="x-small bold"
      >
        {translations.text_card_number}
      </P>
      <P className="dnb-payment-card__card__numbers">{cardNumber}</P>
    </span>
  )
}

NormalCard.propTypes = {
  id: PropTypes.string,
  skeleton: PropTypes.bool,
  data: cardDataPropTypes.isRequired,
  cardStatus: PropTypes.string.isRequired,
  cardNumber: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired,
}
NormalCard.defaultProps = {
  id: null,
  skeleton: null,
}

function NormalCard({
  data,
  cardStatus,
  cardNumber,
  id,
  skeleton,
  translations,
}) {
  return (
    <div
      id={id}
      className={classnames(
        'dnb-payment-card__card',
        `dnb-payment-card__${data.cardDesign.cardStyle}`
      )}
    >
      <div className="dnb-payment-card__card__content">
        <div className="dnb-payment-card__card__top">
          <BankLogo logoType={data.cardDesign.bankLogo} />
          <ProductLogo
            productType={data.productType}
            cardDesign={data.cardDesign}
          />
        </div>
        <div className="dnb-payment-card__card__bottom">
          <CardText
            cardNumber={cardNumber}
            displayName={data.displayName}
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
