import { SpacingProps } from '../../shared/types'

export type PaymentCardProps = {
  /**
   * <em>(required)</em> if product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.
   */
  productCode?: string
  /**
   * <em>(required)</em> masked card number.
   */
  cardNumber?: string
  /**
   * Use one of these: `active`, `not_active`, `blocked`, `expired`, `renewed`, `replaced`, `order_in_process`, `unknown`. Defaults to `active`.
   */
  cardStatus?: PaymentCardCardStatus
  /**
   * Defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.
   */
  variant?: PaymentCardVariant
  /**
   * Will use 8 digits if none are specified.
   */
  digits?: number
  /**
   * Useful if you want to create custom cards. See Card data properties.
   */
  customCard?: PaymentCardType
  skeleton?: boolean
  className?: string
} & Omit<React.HTMLProps<HTMLElement>, 'ref'> &
  SpacingProps &
  PaymentCardTranslations &
  DeprecatedPaymentCardProps

type DeprecatedPaymentCardProps = {
  /** @deprecated use `productCode` */
  product_code?: string
  /** @deprecated use `cardNumber` */
  card_number?: string
  /** @deprecated use `cardStatus` */
  card_status?: PaymentCardCardStatus
}

type PaymentCardTranslations = {
  text_card_number?: string
  text_expired?: string
  text_blocked?: string
  text_not_active?: string
  text_order_in_process?: string
  text_renewed?: string
  text_replaced?: string
  text_unknown?: string
}

export type PaymentCardCardStatus =
  | 'active'
  | 'blocked'
  | 'expired'
  | 'not_active'
  | 'order_in_process'
  | 'renewed'
  | 'replaced'
  | 'unknown'

export type PaymentCardVariant = 'normal' | 'compact'

export type PaymentCardType = {
  productCode?: string
  displayName?: string
  cardClassName?: string
  backgroundImage?: string
  bankLogo?: { type: BankLogoType; color?: string }
  productType?: { type: ProductType; color?: string }
  cardProvider?: { type: CardProvider; color?: string }
  paymentType?: { type: PaymentType; color?: string }
}

export type BankLogoType = 'sbanken' | 'DNB'

export type CardProvider =
  | 'Mastercard'
  | 'MastercardDark'
  | 'Visa'
  | 'VisaPlatinum'

export type PaymentType = 'BankAxept' | 'Credit'

export type ProductType =
  | 'SagaGold'
  | 'SagaPlatinum'
  | 'Pluss'
  | 'Intro'
  | 'Business'
  | 'Bedrift'
  | 'PrivateBanking'
