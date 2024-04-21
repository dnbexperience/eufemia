/* eslint-disable no-unused-vars */
export interface CardProduct {
  productCode: string
  productName: string
  displayName: string
  cardDesign: CardDesignObject
  cardType: CardType
  productType: ProductType
  bankAxept: BankAxeptOrCreditType
}

export type CardTextTranslations = {
  text_card_number: string
  text_expired: string
  text_blocked: string
  text_not_active: string
  text_order_in_process: string
  text_renewed: string
  text_replaced: string
  text_unknown: string
}

export type PaymentCardStatus =
  | 'active'
  | 'blocked'
  | 'expired'
  | 'not_active'
  | 'order_in_process'
  | 'renewed'
  | 'replaced'
  | 'unknown'

export type PaymentCardChildren =
  | string
  | React.ReactNode
  | ((...args: any[]) => any)

export type PaymentCardVariant = 'normal' | 'compact'

export type PaymentCardDigits = number | string

export interface CardDesignObject {
  name: string
  cardStyle: string // css-class
  bankLogo: BankLogoType
  visa: Visa
  mastercard: Mastercard
  bankAxept: BankAxept
  saga: Saga
  privateBanking: PrivateBanking
  backgroundImage?: string
}

export enum CardType {
  Visa,
  Mastercard,
  None,
}

export enum ProductType {
  Saga,
  Pluss,
  Intro,
  Business,
  Bedrift,
  PrivateBanking,
  None,
}

export enum BankAxept {
  White,
  Black,
  Gold,
  Black20,
  Gray,
  GrayDark,
}

export enum BankAxeptOrCreditType {
  BankAxept,
  Credit,
  None,
}

type Colored = { color: string }

export type BankLogoType =
  | {
      type: 'DNB'
      color: string
    }
  | {
      type: 'Sbanken'
      color: string
    }

export const VisaPlatinum = 'VisaPlatinum'

export type Visa = Colored | typeof VisaPlatinum

export enum Mastercard {
  Default,
  Dark,
}
export enum Saga {
  Gold,
  Platinum,
  None,
}

export enum PrivateBanking {
  Default,
  None,
}
