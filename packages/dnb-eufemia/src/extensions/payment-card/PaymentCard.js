/**
 * Web PaymentCard Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import {
  isTrue,
  validateDOMAttributes,
  extendPropsWithContextInClassComponent,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../../components/space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../../components/skeleton/SkeletonHelper'

import { formatCardNumber } from './components/CardNumber'
import CardFigure from './components/CardFigure'

import { ProductType, CardType, BankAxeptType } from './utils/Types'
import Designs, { defaultDesign } from './utils/CardDesigns'
import cardProducts from './utils/cardProducts'

export { Designs, ProductType, CardType, BankAxeptType }

export { formatCardNumber }

const translationDefaultPropsProps = {
  textBlocked: null,
  textExpired: null,
  textNotActive: null,
  textNewOrder: null,
  textOrderInProcess: null,
  textReplaced: null,
  textRenewed: null,
  textNew: null,
  textUnknown: null,
}

export default class PaymentCard extends React.PureComponent {
  static contextType = Context

  static defaultProps = {
    digits: 8,
    locale: null,
    cardStatus: 'active',
    variant: 'normal',

    id: null,
    rawData: null,

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
      productCode,
      cardNumber,
      cardStatus,
      variant,
      digits,
      id,
      rawData,
      locale,
      skeleton,
      className,
      class: _className,
      children, //eslint-disable-line
      ...attributes
    } = props

    const cardData = rawData || getCardData(productCode)

    const params = {
      className: clsx(
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
                  cardStatus={cardStatus}
                  cardNumber={formatCardNumber(
                    cardNumber,
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
