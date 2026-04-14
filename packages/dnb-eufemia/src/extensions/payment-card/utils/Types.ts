// ---- Discriminated union types ----
// Each type is a tagged union discriminated by the `tag` property.
// Companion objects provide constructors and pre-created instances.

export type DNB =
  | { readonly tag: 'Colored'; readonly color: string }
  | { readonly tag: 'Sbanken'; readonly color: string }

export const DNB = {
  Colored: (color: string): DNB => ({ tag: 'Colored', color }),
  Sbanken: (color: string): DNB => ({ tag: 'Sbanken', color }),
}

export type Visa =
  | { readonly tag: 'Colored'; readonly color: string }
  | { readonly tag: 'Platinum' }

export const Visa = {
  Colored: (color: string): Visa => ({ tag: 'Colored', color }),
  Platinum: { tag: 'Platinum' } as Visa,
}

export type Mastercard =
  | { readonly tag: 'Default' }
  | { readonly tag: 'Dark' }

export const Mastercard = {
  Default: { tag: 'Default' } as Mastercard,
  Dark: { tag: 'Dark' } as Mastercard,
}

export type CardType =
  | { readonly tag: 'Visa' }
  | { readonly tag: 'Mastercard' }
  | { readonly tag: 'None' }

export const CardType = {
  Visa: { tag: 'Visa' } as CardType,
  Mastercard: { tag: 'Mastercard' } as CardType,
  None: { tag: 'None' } as CardType,
}

export type BankAxept =
  | { readonly tag: 'White' }
  | { readonly tag: 'Black' }
  | { readonly tag: 'Gold' }
  | { readonly tag: 'Black20' }
  | { readonly tag: 'Gray' }
  | { readonly tag: 'GrayDark' }

export const BankAxept = {
  White: { tag: 'White' } as BankAxept,
  Black: { tag: 'Black' } as BankAxept,
  Gold: { tag: 'Gold' } as BankAxept,
  Black20: { tag: 'Black20' } as BankAxept,
  Gray: { tag: 'Gray' } as BankAxept,
  GrayDark: { tag: 'GrayDark' } as BankAxept,
}

export type Saga =
  | { readonly tag: 'Gold' }
  | { readonly tag: 'Platinum' }
  | { readonly tag: 'None' }

export const Saga = {
  Gold: { tag: 'Gold' } as Saga,
  Platinum: { tag: 'Platinum' } as Saga,
  None: { tag: 'None' } as Saga,
}

// PrivateBanking
export type PB = { readonly tag: 'Default' } | { readonly tag: 'None' }

export const PB = {
  Default: { tag: 'Default' } as PB,
  None: { tag: 'None' } as PB,
}

export type ProductType =
  | { readonly tag: 'Saga' }
  | { readonly tag: 'Pluss' }
  | { readonly tag: 'Intro' }
  | { readonly tag: 'Bedrift' }
  | { readonly tag: 'Business' }
  | { readonly tag: 'PrivateBanking' }
  | { readonly tag: 'Corporate' }
  | { readonly tag: 'WorldElite' }
  | { readonly tag: 'None' }

export const ProductType = {
  Saga: { tag: 'Saga' } as ProductType,
  Pluss: { tag: 'Pluss' } as ProductType,
  Intro: { tag: 'Intro' } as ProductType,
  Bedrift: { tag: 'Bedrift' } as ProductType,
  Business: { tag: 'Business' } as ProductType,
  PrivateBanking: { tag: 'PrivateBanking' } as ProductType,
  Corporate: { tag: 'Corporate' } as ProductType,
  WorldElite: { tag: 'WorldElite' } as ProductType,
  None: { tag: 'None' } as ProductType,
}

export type BankAxeptType =
  | { readonly tag: 'BankAxept' }
  | { readonly tag: 'Credit' }
  | { readonly tag: 'None' }

export const BankAxeptType = {
  BankAxept: { tag: 'BankAxept' } as BankAxeptType,
  Credit: { tag: 'Credit' } as BankAxeptType,
  None: { tag: 'None' } as BankAxeptType,
}

const Types = {
  DNB,
  Saga,
  PB,
  Mastercard,
  ProductType,
  CardType,
  BankAxept,
  BankAxeptType,
  Visa,
}

export default Types
