import { PropertiesTableProps } from '../../shared/types'

export const PaymentCardProperties: PropertiesTableProps = {
  productCode: {
    doc: 'if product code matches one of the codes in the list the card will get that design, if no match is found Default design will be used.',
    type: 'string',
    status: 'optional',
  },
  cardNumber: {
    doc: 'masked card number.',
    type: 'string',
    status: 'optional',
  },
  customCard: {
    doc: 'option for creating custom card. Type described under [PaymentCardType](/uilib/extensions/payment-card/properties/#paymentcardtype)',
    type: 'PaymentCardType',
    status: 'optional',
  },
  cardStatus: {
    doc: 'gives the status effect with the selected status. Defaults to `active`.',
    type: [
      'active',
      'not_active',
      'blocked',
      'expired',
      'renewed',
      'replaced',
      'order_in_process',
      'unknown',
    ],
    status: 'optional',
  },
  variant: {
    doc: 'Defines the appearance. Use one of these: `normal` or `compact`. Defaults to `normal`.',
    type: ['normal', 'compact'],
    status: 'optional',
  },
  digits: {
    doc: 'controls the number of digits of the cardNumber to display. Defaults to `8`.',
    type: 'number',
    status: 'optional',
  },
  skeleton: {
    doc: 'if set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
}

export const PaymentCardTypeProperties: PropertiesTableProps = {
  displayName: {
    doc: 'used by the screen reader.',
    type: 'string',
    status: 'optional',
  },
  cardClassName: {
    doc: 'className added to the PaymentCard root element.',
    type: 'string',
    status: 'optional',
  },
  backgroundImage: {
    doc: 'include base64 endoded image to customize the background.',
    type: 'string',
    status: 'optional',
  },
  bankLogo: {
    doc: 'bank logo in the top left. Types for [BankLogoType](/uilib/extensions/payment-card/properties/#types).',
    type: '{ type: BankLogoType, color?: string }',
    status: 'optional',
  },
  productType: {
    doc: 'set customer program for the card. Types for [ProductType](/uilib/extensions/payment-card/properties/#types).',
    type: '{ type: ProductType, color?: string }',
    status: 'optional',
  },
  cardProvider: {
    doc: 'set the card provider logo. Types for [CardProvider](/uilib/extensions/payment-card/properties/#types).',
    type: '{ type: CardProvider, color?: string }',
    status: 'optional',
  },
  paymentType: {
    doc: 'payment type in the top right. Types for [PaymentType](/uilib/extensions/payment-card/properties/#types).',
    type: '{ type: PaymentType, color?: string }',
    status: 'optional',
  },
}
