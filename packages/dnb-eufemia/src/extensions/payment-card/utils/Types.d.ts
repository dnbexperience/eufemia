export type CardType = { '@@tag': 'Visa' | 'Mastercard' | 'None' };
export type BankAxeptType = {
  '@@tag': 'BankAxept' | 'Credit' | 'None';
};
export type BankAxept = {
  '@@tag': 'White' | 'Black' | 'Gold' | 'Black20' | 'Gray' | 'GrayDark';
};
export type ProductType = {
  '@@tag':
    | 'Saga'
    | 'Pluss'
    | 'Intro'
    | 'Bedrift'
    | 'Business'
    | 'PrivateBanking'
    | 'Corporate'
    | 'WorldElite'
    | 'None';
};
export type DNB = { '@@tag': 'Colored' | 'Sbanken' };
export type Saga = { '@@tag': 'Gold' | 'Platinum' | 'None' };
export type PB = { '@@tag': 'Default' | 'None' };
export type Mastercard = { '@@tag': 'Default' | 'Dark' };
export type Visa = { '@@tag': 'Colored' | 'Platinum' };

export const CardType: {
  Visa: CardType;
  Mastercard: CardType;
  None: CardType;
};
export const BankAxeptType: {
  BankAxept: BankAxeptType;
  Credit: BankAxeptType;
  None: BankAxeptType;
};
export const BankAxept: {
  White: BankAxept;
  Black: BankAxept;
  Gold: BankAxept;
  Black20: BankAxept;
  Gray: BankAxept;
  GrayDark: BankAxept;
};
export const ProductType: {
  Saga: ProductType;
  Pluss: ProductType;
  Intro: ProductType;
  Bedrift: ProductType;
  Business: ProductType;
  PrivateBanking: ProductType;
  Corporate: ProductType;
  WorldElite: ProductType;
  None: ProductType;
};
export const DNB: {
  Colored: DNB;
  Sbanken: DNB;
};
export const Saga: {
  Gold: Saga;
  Platinum: Saga;
  None: Saga;
};
export const PB: {
  Default: PB;
  None: PB;
};
export const Mastercard: {
  Default: Mastercard;
  Dark: Mastercard;
};
export const Visa: {
  Colored: Visa;
  Platinum: Visa;
};

declare const Types: {
  DNB: typeof DNB;
  Saga: typeof Saga;
  PB: typeof PB;
  Mastercard: typeof Mastercard;
  ProductType: typeof ProductType;
  CardType: typeof CardType;
  BankAxept: typeof BankAxept;
  BankAxeptType: typeof BankAxeptType;
  Visa: typeof Visa;
};
export default Types;
