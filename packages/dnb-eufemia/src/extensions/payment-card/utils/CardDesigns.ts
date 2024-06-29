import properties from '../../../style/themes/theme-ui/properties'
import { PaymentCardType } from '../types'
import { myFirstImg, youthImg, ungImg } from './backgrounds'

export const defaultDesign: PaymentCardType = {
  cardClassName: 'dnb-payment-card__card--design-default',
  bankLogo: { type: 'DNB', color: properties['--color-white'] },
  cardProvider: { type: 'Visa', color: properties['--color-white'] },
  paymentType: { type: 'BankAxept', color: properties['--color-white'] },
}

export const pluss: PaymentCardType = {
  // name: 'Pluss',
  cardClassName: 'dnb-payment-card__card--design-pluss',
  bankLogo: { type: 'DNB', color: properties['--color-white'] },
  cardProvider: { type: 'Visa', color: properties['--color-white'] },
  paymentType: { type: 'BankAxept', color: properties['--color-white'] },
}

export const young: PaymentCardType = {
  // name: 'Ung',
  cardClassName: 'dnb-payment-card__card--design-ung',
  backgroundImage: ungImg,
  bankLogo: { type: 'DNB', color: properties['--color-sea-green'] },
  cardProvider: { type: 'Mastercard' },
  paymentType: {
    type: 'BankAxept',
    color: properties['--color-black-80'],
  },
}

export const myFirst: PaymentCardType = {
  // name: 'My first',
  cardClassName: 'dnb-payment-card__card--design-my-first',
  backgroundImage: myFirstImg,
  bankLogo: { type: 'DNB', color: properties['--color-ocean-green'] },
  cardProvider: { type: 'Visa', color: properties['--color-black-80'] },
  paymentType: {
    type: 'BankAxept',
    color: properties['--color-black-80'],
  },
}

export const youth: PaymentCardType = {
  // name: 'Youth',
  cardClassName: 'dnb-payment-card__card--design-youth',
  backgroundImage: youthImg,
  bankLogo: { type: 'DNB', color: properties['--color-sea-green'] },
  cardProvider: { type: 'Visa', color: properties['--color-black-80'] },
  paymentType: {
    type: 'BankAxept',
    color: properties['--color-black-80'],
  },
}

export const gold: PaymentCardType = {
  // name: 'Gold',
  cardClassName: 'dnb-payment-card__card--design-gold',
  bankLogo: { type: 'DNB', color: properties['--color-white'] },
  cardProvider: { type: 'Visa', color: properties['--color-white'] },
  paymentType: {
    type: 'BankAxept',
    color: properties['--color-white'],
  },
}

export const saga: PaymentCardType = {
  // name: 'Saga',
  cardClassName: 'dnb-payment-card__card--design-saga',
  bankLogo: { type: 'DNB', color: '#BFA970' },
  cardProvider: { type: 'Mastercard', color: '#BFA970' },
  paymentType: {
    type: 'BankAxept',
    color: '#BFA970',
  },
}

export const sagaPlatinum: PaymentCardType = {
  // name: 'Saga platinum',
  cardClassName: 'dnb-payment-card__card--design-saga',
  bankLogo: { type: 'DNB', color: '#b2b4b3' },
  cardProvider: {
    type: 'MastercardDark',
    // TODO: sjekk
    color: '#cccccc',
  },
  paymentType: {
    type: 'BankAxept',
    color: properties['--color-black-20'],
  },
}

export const privateBanking: PaymentCardType = {
  // name: 'Private Banking',
  cardClassName: 'dnb-payment-card__card--design-private',
  bankLogo: { type: 'DNB', color: '#b2b4b3' },
  cardProvider: { type: 'VisaPlatinum' },
  paymentType: { type: 'BankAxept', color: '#b2b4b3' },
}

export const mcBlack: PaymentCardType = {
  // name: 'Mastercard Black',
  cardClassName: 'dnb-payment-card__card--design-black',
  bankLogo: { type: 'DNB', color: properties['--color-black-80'] },
  paymentType: { type: 'BankAxept', color: properties['--color-white'] },
  cardProvider: { type: 'MastercardDark', color: '#b2b4b3' },
}

export const businessNoVisa: PaymentCardType = {
  // name: 'Bedriftskort BankAxept',
  cardClassName: 'dnb-payment-card__card--design-business-no-visa',
  bankLogo: { type: 'DNB', color: properties['--color-mint-green'] },
  cardProvider: { type: 'Visa', color: properties['--color-white'] },
  paymentType: { type: 'BankAxept', color: properties['--color-white'] },
}

export const businessWithVisa: PaymentCardType = {
  // name: 'Bedriftskort Visa',
  cardClassName: 'dnb-payment-card__card--design-business-with-visa',
  bankLogo: { type: 'DNB', color: properties['--color-mint-green'] },
  cardProvider: { type: 'Visa', color: properties['--color-white'] },
  paymentType: { type: 'BankAxept', color: properties['--color-white'] },
}

export const sbankenVisa: PaymentCardType = {
  // name: 'Sbanken',
  cardClassName: 'dnb-payment-card__card--design-sbanken-visa',
  bankLogo: { type: 'sbanken', color: properties['--sb-color-text'] },
  cardProvider: { type: 'Visa', color: '#0F357F' },
  paymentType: { type: 'BankAxept', color: '#55565A' },
}

export const sbankenMastercard: PaymentCardType = {
  // name: 'Sbanken Mastercard',
  cardClassName: 'dnb-payment-card__card--design-sbanken-mastercard',
  bankLogo: { type: 'sbanken', color: properties['--color-white'] },
  cardProvider: { type: 'Mastercard', color: properties['--color-white'] },
  paymentType: { type: 'Credit', color: properties['--color-white'] },
}

const Designs = {
  defaultDesign,
  pluss,
  young,
  myFirst,
  youth,
  gold,
  saga,
  sagaPlatinum,
  privateBanking,
  mcBlack,
  businessNoVisa,
  businessWithVisa,
  sbankenVisa,
  sbankenMastercard,
}

export default Designs
