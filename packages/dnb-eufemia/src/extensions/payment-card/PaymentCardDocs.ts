import { PropertiesTableProps } from '../../shared/types'

export const PaymentCardProperties: PropertiesTableProps = {
  product_code: {
    doc: 'If product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.',
    type: 'unknown',
    state: 'optional',
  },
  card_number: {
    doc: 'Masked card number.',
    type: 'unknown',
    state: 'optional',
  },
  raw_data: {
    doc: 'Useful if you want to create custom cards. See Card data properties.',
    type: 'unknown',
    state: 'optional',
  },
  card_status: {
    doc: 'Use one of these: `active`, `not_active`, `blocked`, `expired`, `renewed`, `replaced`, `order_in_process`, `unknown`. Defaults to `active`.',
    type: 'unknown',
    state: 'optional',
  },
  variant: {
    doc: 'Defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.',
    type: 'unknown',
    state: 'optional',
  },
  digits: {
    doc: 'Will use 8 digits if none are specified.',
    type: 'unknown',
    state: 'optional',
  },
  locale: {
    doc: 'Use `nb-NO` or `en-GB`. Defaults to the Eufemia provider.',
    type: 'unknown',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const PaymentCardData: PropertiesTableProps = {
  productCode: {
    doc: 'Product code for the given card.',
    type: 'string',
    state: 'required',
  },
  productName: {
    doc: 'Product name. Can be blank.',
    type: 'string',
    state: 'required',
  },
  displayName: {
    doc: 'The visible product name. Can be empty.',
    type: 'string',
    state: 'required',
  },
  cardDesign: {
    doc: "Object that describes the style properties of the card. `import { Designs } from '@dnb/eufemia/extensions/payment-card'` (see available designs below) or a custom one can be created.",
    type: 'object',
    state: 'required',
  },
  cardType: {
    doc: "`import { CardType } from '@dnb/eufemia/extensions/payment-card'` to use. Can be CardType.Visa, CardType.Mastercard or CardType.None",
    type: 'Union Type',
    state: 'required',
  },
  productType: {
    doc: "`import { ProductType } from '@dnb/eufemia/extensions/payment-card'` to use. Can be ProductType.Saga, ProductType.Pluss, ProductType.Intro, ProductType.Business, ProductType.Bedrift, ProductType.PrivateBanking or ProductType.None",
    type: 'Union Type',
    state: 'required',
  },
}

export const PaymentCardDesign: PropertiesTableProps = {
  name: {
    doc: 'String Name of design',
    type: 'string',
    state: 'required',
  },
  cardStyle: {
    doc: 'Css class. mainly to set background and color',
    type: 'string',
    state: 'required',
  },
  bankLogo: {
    doc: "Union Type. import DNB from ./card/utils/Types to use. Can be DNB.Colored('HexValue')",
    type: 'Union Type',
    state: 'required',
  },
  visa: {
    doc: "Union Type. import Visa from ./card/utils/Types to use. Can be Visa.Colored('HexValue') or Visa.Platinum",
    type: 'Union Type',
    state: 'required',
  },
  mastercard: {
    doc: 'Union Type. import Mastercard from ./card/utils/Types to use. Can be Mastercard.Default or Mastercard.Dark',
    type: 'Union Type',
    state: 'required',
  },
  bankAxept: {
    doc: 'Union Type. import BankAxept from ./card/utils/Types to use. Can be BankAxept.White, BankAxept.Black, BankAxept.Gold, BankAxept.Black20 or BankAxept.Gray',
    type: 'Union Type',
    state: 'required',
  },
  saga: {
    doc: 'Union Type. import Saga from ./card/utils/Types to use. Can be Saga.Gold, Saga.Platinum or Saga.None',
    type: 'Union Type',
    state: 'required',
  },
  privateBanking: {
    doc: 'Union Type. import PB from ./card/utils/Types to use. Can be PB.Default or PB.None',
    type: 'Union Type',
    state: 'required',
  },
}

export const PaymentCardDesignList: PropertiesTableProps = {
  defaultDesign: {
    doc: 'Default',
    type: 'object',
    state: 'required',
  },
  pluss: {
    doc: 'Pluss',
    type: 'object',
    state: 'required',
  },
  young: {
    doc: 'Ung',
    type: 'object',
    state: 'required',
  },
  myFirst: {
    doc: 'My first',
    type: 'object',
    state: 'required',
  },
  youth: {
    doc: 'Youth',
    type: 'object',
    state: 'required',
  },
  gold: {
    doc: 'Gold',
    type: 'object',
    state: 'required',
  },
  saga: {
    doc: 'Saga',
    type: 'object',
    state: 'required',
  },
  sagaPlatinum: {
    doc: 'Saga platinum',
    type: 'object',
    state: 'required',
  },
  privateBanking: {
    doc: 'Private Banking',
    type: 'object',
    state: 'required',
  },
  mcBlack: {
    doc: 'Mastercard Black',
    type: 'object',
    state: 'required',
  },
  businessNoVisa: {
    doc: 'Bedriftskort BankAxept',
    type: 'object',
    state: 'required',
  },
  businessWithVisa: {
    doc: 'Bedriftskort Visa',
    type: 'object',
    state: 'required',
  },
}
