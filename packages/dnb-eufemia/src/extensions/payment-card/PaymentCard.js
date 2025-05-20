/**
 * Web PaymentCard Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import {
  isTrue,
  validateDOMAttributes,
  extendPropsWithContextInClassComponent,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../../components/space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../../components/skeleton/SkeletonHelper'

import { formatCardNumber } from './components/CardNumber'
import CardFigure, { cardDataPropTypes } from './components/CardFigure'

import { ProductType, CardType, BankAxeptType } from './utils/Types'
import Designs, { defaultDesign } from './utils/CardDesigns'
import cardProducts from './utils/cardProducts'

export { Designs, ProductType, CardType, BankAxeptType }

const translationDefaultPropsProps = {
  text_card_number: null,
  text_status_blocked: null,
  text_status_expired: null,
  text_status_not_active: null,
  text_status_new_order: null,
  text_status_order_in_process: null,
  text_status_replaced: null,
  text_status_renewed: null,
  text_status_new: null,
  text_status_unknown: null,
}

export default class PaymentCard extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    product_code: PropTypes.string.isRequired,
    card_number: PropTypes.string.isRequired,
    card_status: PropTypes.oneOf([
      'active',
      'blocked',
      'expired',
      'not_active',
      'new_order',
      'new',
      'order_in_process',
      'renewed',
      'replaced',
      'unknown',
    ]),
    variant: PropTypes.oneOf(['normal', 'compact']),
    digits: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    raw_data: cardDataPropTypes,
    id: PropTypes.string,
    locale: PropTypes.string,

    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

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
    className: null,
    children: null,

    ...translationDefaultPropsProps,
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
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
            const translations = extendPropsWithContextInClassComponent(
              this.props,
              translationDefaultPropsProps,
              translation.PaymentCard
            )
            return (
              <figure {...params}>
                <figcaption className="dnb-sr-only dnb-payment-card__figcaption">
                  {cardData.productName}
                </figcaption>
                <CardFigure
                  id={id}
                  skeleton={isTrue(skeleton)}
                  compact={variant === 'compact'}
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
  bankAxept: BankAxeptType.None,
})
