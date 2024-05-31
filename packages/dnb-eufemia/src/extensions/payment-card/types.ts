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
  rawData?: PaymentCardRawData
  id?: string
  /**
   * Use `nb-NO` or `en-GB`. Defaults to the Eufemia provider.
   */
  // locale?: InternalLocale,
  skeleton?: boolean
  className?: string
  children?: React.ReactNode
  /**
   * Translations
   */
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
  /** @deprecated use `rawData` */
  raw_data?: PaymentCardRawData
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

// Testing new structure
type PaymentCardData = {
  productCode: string
  productName: string
  // cardDesign: CardDesignData // rename?
  cardType?: CardTypeDesign
  productType?: ProductType
  paymentTypeVariant?: BankAxeptType
  cardStyle?: string
  bankLogo?: LogoType
  bankLogoColor?: string
  cardDesign?: CardDesign
  backgroundImage?: string
  visaColor?: string
}

export type PaymentCardRawData = {
  productCode: string
  productName: string
  cardDesign: CardDesignData // rename?
  cardType: CardTypeDesign
  productType: ProductType
  bankAxept: BankAxeptType // PaymentSystemVariant
  // remove?
  displayName: string // not used
}

export type CardDesignData = {
  cardStyle?: string
  bankLogo?: LogoType
  bankLogoColors?: string
  cardDesign?: CardDesign
  backgroundImage?: string
  visaColors?: string
  // Remove?
  name?: string
  cardType?: CardTypeDesign
  bankAxept?: BankAxeptType
  cardStatus?: CardStatus
  productType?: ProductType
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

export type LogoType = 'DNB' | 'sbanken'
export type ProductType =
  | 'Saga'
  | 'Pluss'
  | 'Intro'
  | 'Business'
  | 'Bedrift'
  | 'PrivateBanking'
  | 'None'
export type CardDesign = 'SagaGold' | 'SagaPlatinum' | 'None' | 'PBDefault'

export type BankAxeptType =
  | 'BankAxeptWhite'
  | 'BankAxeptBlack20'
  | 'BankAxeptGray'
  | 'BankAxeptGrayDark'
  | 'BankAxeptBlack'
  | 'BankAxeptGold'
  | 'Credit'
  | 'None'

export type CardStatus =
  | 'expired'
  | 'not_active'
  | 'blocked'
  | 'order_in_process'
  | 'renewed'
  | 'replaced'
  | 'unknown'
  | 'active'

export type CardTypeDesign =
  | 'VisaColored'
  | 'VisaPlatinum'
  | 'MastercardDefault'
  | 'MastercardDark'
  | 'None'
