/**
 * Web PaymentCard Component
 */
import React, { useContext } from 'react'
import clsx from 'clsx'
import Context, { type Translation } from '../../shared/Context'
import Provider from '../../shared/Provider'
import {
  validateDOMAttributes,
  extendExistingPropsWithContext,
  removeUndefinedProps,
} from '../../shared/component-helper'
import { applySpacing } from '../../components/space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../../components/skeleton/SkeletonHelper'

import { formatCardNumber } from './components/CardNumber'
import CardFigure from './components/CardFigure'
import type { CardData } from './components/CardFigure'

import { ProductType, CardType, BankAxeptType } from './utils/Types'
import Designs, { defaultDesign } from './utils/CardDesigns'
import type { CardDesign } from './utils/CardDesigns'
import cardProducts from './utils/cardProducts'

import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../../components/skeleton/Skeleton'
import type { InternalLocale } from '../../shared/Context'

export { Designs, ProductType, CardType, BankAxeptType }

export { formatCardNumber }

export type PaymentCardCardStatus =
  | 'active'
  | 'blocked'
  | 'expired'
  | 'notActive'
  | 'newOrder'
  | 'new'
  | 'orderInProcess'
  | 'renewed'
  | 'replaced'
  | 'unknown'

export type PaymentCardVariant = 'normal' | 'compact'

export type PaymentCardDigits = string | number

export type PaymentCardChildren =
  | string
  | React.ReactNode
  | (() => React.ReactNode)

export type PaymentCardRawData = {
  productCode: string
  productName: string
  displayName: string
  cardDesign: CardDesign
  cardType: CardType
  productType: ProductType
  bankAxept: BankAxeptType
}

export type PaymentCardProps = {
  /**
   * If product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.
   */
  productCode: string
  /**
   * Masked card number.
   */
  cardNumber: string
  /**
   * Use one of these: `active`, `notActive`, `newOrder`, `new`, `blocked`, `expired`, `renewed`, `replaced`, `orderInProcess`, `unknown`. Defaults to `active`.
   */
  cardStatus?: PaymentCardCardStatus
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
  rawData?: PaymentCardRawData
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
} & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'children'> &
  SpacingProps

type PaymentCardTranslation = NonNullable<Translation['PaymentCard']>

const translationDefaultPropsProps: Record<
  keyof PaymentCardTranslation,
  null
> = {
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

const paymentCardDefaultProps: Partial<PaymentCardProps> = {
  digits: 8,
  locale: null,
  cardStatus: 'active',
  variant: 'normal',

  id: null,
  rawData: null,

  skeleton: false,
  className: null,
  children: null,
}

function PaymentCard(props: PaymentCardProps) {
  const context = useContext(Context)

  const extendedProps = extendExistingPropsWithContext(
    {
      ...paymentCardDefaultProps,
      ...removeUndefinedProps({ ...props }),
    },
    paymentCardDefaultProps,
    { locale: context.locale },
    { skeleton: context?.skeleton }
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
    children,
    ...attributes
  } = extendedProps

  const cardData = rawData || getCardData(productCode)

  const params = applySpacing(extendedProps, {
    className: clsx(
      'dnb-payment-card',
      `dnb-payment-card--${variant}`,
      createSkeletonClass(null, skeleton, context),
      className,
      _className
    ),
    ...attributes,
  })

  skeletonDOMAttributes(params, skeleton, context)

  // also used for code markup simulation
  validateDOMAttributes(props, params)

  return (
    <Provider locale={locale}>
      <PaymentCardContent
        props={props}
        params={params}
        cardData={cardData}
        cardStatus={cardStatus}
        cardNumber={cardNumber}
        digits={digits}
        id={id}
        skeleton={skeleton}
        variant={variant}
      />
    </Provider>
  )
}

function PaymentCardContent({
  props,
  params,
  cardData,
  cardStatus,
  cardNumber,
  digits,
  id,
  skeleton,
  variant,
}: {
  props: PaymentCardProps
  params: Record<string, unknown>
  cardData: CardData
  cardStatus: PaymentCardCardStatus
  cardNumber: string
  digits: string | number
  id: string
  skeleton: SkeletonShow
  variant: PaymentCardVariant
}) {
  const { translation } = useContext(Context)
  const translations = extendExistingPropsWithContext(
    {
      ...translationDefaultPropsProps,
      ...removeUndefinedProps({ ...props }),
    },
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
        skeleton={skeleton}
        compact={variant === 'compact'}
        data={cardData}
        cardStatus={cardStatus}
        cardNumber={formatCardNumber(
          cardNumber,
          parseFloat(String(digits))
        )}
        translations={translations}
      />
    </figure>
  )
}

export default PaymentCard

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
