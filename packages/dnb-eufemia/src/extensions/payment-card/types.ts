import { SpacingProps } from '../../shared/types'

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
  card_status?: PaymentCardCardStatus
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
  raw_data?: PaymentCardRawData
  id?: string
  /**
   * Use `nb-NO` or `en-GB`. Defaults to the Eufemia provider.
   */
  // locale?: InternalLocale,

  skeleton?: boolean
  class?: string
  className?: string
  children?: React.ReactNode
} & Omit<React.HTMLProps<HTMLElement>, 'ref'> &
  SpacingProps

export type PaymentCardRawData = {
  productCode: string
  productName: string
  displayName: string
  cardDesign: CardDesignData
  cardType: CardTypeDesign
  productType: ProductType
  bankAxept: BankAxeptType
}

export type CardDesignData = {
  name: string
  cardStyle: string
  bankLogo: LogoType
  cardType: CardTypeDesign
  bankAxept: BankAxeptType
  cardStatus?: CardStatus
  productType?: ProductType
  cardDesign?: CardDesign
  backgroundImage?: string
  bankLogoColors?: string
  visaColors?: string
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
export type PaymentCardDigits = string | number

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
