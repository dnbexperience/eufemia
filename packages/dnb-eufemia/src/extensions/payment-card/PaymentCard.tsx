import React from 'react'
import classnames from 'classnames'
import Context, { InternalLocale } from '../../shared/Context'
import Provider from '../../shared/Provider'
import {
  extendPropsWithContext,
  isTrue,
  validateDOMAttributes,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../../components/space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../../components/skeleton/SkeletonHelper'

import { SpacingProps } from '../../shared/types'

import { SkeletonShow } from '../../components/Skeleton'
import NormalCard from './components/NormalCard' // sjekk at denne er riktig
import {
  PaymentCardChildren,
  PaymentCardDigits,
  CardProduct,
  PaymentCardStatus,
  PaymentCardVariant,
} from './types'
import { formatCardNumber, getCardData } from './utils'

export type PaymentCardProps = {
  /**
   * <em>(required)</em> if product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.
   */
  product_code: string
  /**
   * <em>(required)</em> masked card number.
   */
  card_number: string
  /**
   * Use one of these: `active`, `not_active`, `blocked`, `expired`, `renewed`, `replaced`, `order_in_process`, `unknown`. Defaults to `active`.
   */
  card_status?: PaymentCardStatus
  /**
   * Defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.
   */
  variant?: PaymentCardVariant
  /**
   * Will use 8 digits if none are specified.
   */
  digits?: PaymentCardDigits
  /**
   * Useful if you want to create custom cards. See Card data properties.
   */
  raw_data?: CardProduct
  id?: string
  /**
   * Use `nb-NO` or `en-GB`. Defaults to the Eufemia provider.
   */
  locale?: InternalLocale
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  class?: string
  className?: string
  children?: PaymentCardChildren
} & Omit<React.HTMLProps<HTMLElement>, 'ref'> &
  SpacingProps

export default function PaymentCard(localProps: PaymentCardProps) {
  const defaultProps: Partial<PaymentCardProps> = {
    card_status: 'active',
    raw_data: null,
    variant: 'normal',
    digits: 8,
    id: null,
    locale: null,
    skeleton: false,
    className: null,
    children: null,
  }
  const context = React.useContext(Context)

  // render() {
  // use only the props from context, who are available here anyway
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { locale: context.locale },
    { skeleton: context.skeleton }
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

    ...props
  } = allProps

  const cardData = raw_data || getCardData(product_code)

  const params = {
    className: classnames(
      'dnb-payment-card',
      `dnb-payment-card--${variant}`,
      createSkeletonClass(null, skeleton, context),
      createSpacingClasses(props),
      className,
      _className
    ),
    ...props,
  }

  skeletonDOMAttributes(params, skeleton, context)

  validateDOMAttributes(allProps, params)
  const translationDefaultPropsProps = {
    text_card_number: null,
    text_expired: null,
    text_blocked: null,
    text_not_active: null,
    text_order_in_process: null,
    text_renewed: null,
    text_replaced: null,
    text_unknown: null,
  }
  return (
    <Provider locale={locale}>
      <Context.Consumer>
        {({ translation }) => {
          const translations = extendPropsWithContext(
            allProps,
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
                  parseFloat(`${digits}`)
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
