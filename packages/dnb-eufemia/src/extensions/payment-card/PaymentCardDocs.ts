import { PropertiesTableProps } from '../../shared/types'

export const PaymentCardProperties: PropertiesTableProps = {
  productCode: {
    doc: 'if product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.',
    type: 'string',
    status: 'required',
  },
  cardNumber: {
    doc: 'masked card number.',
    type: 'string',
    status: 'required',
  },
  rawData: {
    doc: 'useful if you want to create custom cards. See Card data properties.',
    type: 'Various',
    status: 'optional',
  },
  cardStatus: {
    doc: 'use one of these: `active`, `notActive`, `new_order`, `new`, `blocked`, `expired`, `renewed`, `replaced`, `orderInProcess`, `unknown`. Defaults to `active`.',
    type: [
      'active',
      'notActive',
      'blocked',
      'expired',
      'renewed',
      'replaced',
      'orderInProcess',
      'unknown',
    ],
    status: 'optional',
  },
  variant: {
    doc: 'defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.',
    type: ['normal', 'compact'],
    status: 'optional',
  },
  digits: {
    doc: 'will use 8 digits if none are specified.',
    type: ['string', 'number'],
    status: 'optional',
  },
  locale: {
    doc: 'use `nb-NO` or `en-GB`. Defaults to the Eufemia provider.',
    type: 'string',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const PaymentCardData: PropertiesTableProps = {
  productCode: {
    doc: 'product code for the given card.',
    type: 'string',
    status: 'required',
  },
  productName: {
    doc: 'product name. Can be blank.',
    type: 'string',
    status: 'required',
  },
  displayName: {
    doc: 'the visible product name. Can be empty.',
    type: 'string',
    status: 'required',
  },
  cardDesign: {
    doc: "object that describes the style properties of the card. `import { Designs } from '@dnb/eufemia/extensions/payment-card'` (see available designs below) or a custom one can be created.",
    type: 'object',
    status: 'required',
  },
  cardType: {
    doc: "`import { CardType } from '@dnb/eufemia/extensions/payment-card'` to use. Can be `CardType.Visa`, `CardType.Mastercard` or `CardType.None`.",
    type: 'Union Type',
    status: 'required',
  },
  productType: {
    doc: "`import { ProductType } from '@dnb/eufemia/extensions/payment-card'` to use. Can be `ProductType.Saga`, `ProductType.Pluss`, `ProductType.Intro`, `ProductType.Business`, `ProductType.Bedrift`, `ProductType.PrivateBanking`, `ProductType.Corporate`, `ProductType.WorldElite` or `ProductType.None`.",
    type: 'Union Type',
    status: 'required',
  },
  bankAxept: {
    doc: "`import { BankAxeptType } from '@dnb/eufemia/extensions/payment-card'` to use. Can be `BankAxeptType.BankAxept`, `BankAxeptType.Credit` or `BankAxeptType.None`.",
    type: 'Union Type',
    status: 'required',
  },
}

export const PaymentCardDesign: PropertiesTableProps = {
  name: {
    doc: 'string Name of design.',
    type: 'string',
    status: 'required',
  },
  cardStyle: {
    doc: 'css class. mainly to set background and color.',
    type: 'string',
    status: 'required',
  },
  bankLogo: {
    doc: "Union Type. import DNB from ./card/utils/Types to use. Can be `DNB.Colored('HexValue')`.",
    type: 'Union Type',
    status: 'required',
  },
  visa: {
    doc: "Union Type. import Visa from ./card/utils/Types to use. Can be `Visa.Colored('HexValue')` or `Visa.Platinum`.",
    type: 'Union Type',
    status: 'required',
  },
  mastercard: {
    doc: 'Union Type. import Mastercard from ./card/utils/Types to use. Can be `Mastercard.Default` or `Mastercard.Dark`.',
    type: 'Union Type',
    status: 'required',
  },
  bankAxept: {
    doc: 'Union Type. import BankAxept from ./card/utils/Types to use. Can be `BankAxept.White`, `BankAxept.Black`, `BankAxept.Gold`, `BankAxept.Black20` or `BankAxept.Gray`.',
    type: 'Union Type',
    status: 'required',
  },
  saga: {
    doc: 'Union Type. import Saga from ./card/utils/Types to use. Can be `Saga.Gold`, `Saga.Platinum` or `Saga.None`.',
    type: 'Union Type',
    status: 'required',
  },
  privateBanking: {
    doc: 'Union Type. import PB from ./card/utils/Types to use. Can be `PB.Default` or `PB.None`.',
    type: 'Union Type',
    status: 'required',
  },
}
export const PaymentCardDesigns: PropertiesTableProps = {
  defaultDesign: {
    doc: 'Default',
    type: 'object',
    status: 'optional',
  },
  pluss: {
    doc: 'Pluss',
    type: 'object',
    status: 'optional',
  },
  young: {
    doc: 'Ung',
    type: 'object',
    status: 'optional',
  },
  myFirst: {
    doc: 'My first',
    type: 'object',
    status: 'optional',
  },
  youth: {
    doc: 'Youth',
    type: 'object',
    status: 'optional',
  },
  gold: {
    doc: 'Gold',
    type: 'object',
    status: 'optional',
  },
  saga: {
    doc: 'Saga',
    type: 'object',
    status: 'optional',
  },
  sagaPlatinum: {
    doc: 'Saga Platinum',
    type: 'object',
    status: 'optional',
  },
  privateBanking: {
    doc: 'Private Banking',
    type: 'object',
    status: 'optional',
  },
  mcBlack: {
    doc: 'Mastercard Black',
    type: 'object',
    status: 'optional',
  },
  businessNoVisa: {
    doc: 'Bedriftskort BankAxept',
    type: 'object',
    status: 'optional',
  },
  businessWithVisa: {
    doc: 'Bedriftskort Visa',
    type: 'object',
    status: 'optional',
  },
  sbankenVisa: {
    doc: 'Sbanken Visa',
    type: 'object',
    status: 'optional',
  },
  sbankenMastercard: {
    doc: 'Sbanken Mastercard',
    type: 'object',
    status: 'optional',
  },
}
