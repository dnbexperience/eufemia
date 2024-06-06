import properties from '../../../style/themes/theme-ui/properties'
import { CustomCard } from '../types'
import { myFirstImg, youthImg, ungImg } from './backgrounds'

export const defaultDesign: CustomCard = {
  cardClassName: 'card--design-default',
  bankLogo: { type: 'DNB', color: properties['--color-white'] },
  cardProvider: { type: 'Visa', color: properties['--color-white'] },
  paymentType: { type: 'BankAxept', color: properties['--color-white'] },
}

export const pluss: CustomCard = {
  // name: 'Pluss',
  cardClassName: 'card--design-pluss',
  bankLogo: { type: 'DNB', color: properties['--color-white'] },
  cardProvider: { type: 'Visa', color: properties['--color-white'] },
  paymentType: { type: 'BankAxept', color: properties['--color-white'] },
}

export const young: CustomCard = {
  // name: 'Ung',
  cardClassName: 'card--design-ung',
  backgroundImage: ungImg,
  bankLogo: { type: 'DNB', color: properties['--color-sea-green'] },
  cardProvider: { type: 'Mastercard' },
  paymentType: {
    type: 'BankAxept',
    color: properties['--color-black-80'],
  },
}

export const myFirst: CustomCard = {
  // name: 'My first',
  cardClassName: 'card--design-my-first',
  backgroundImage: myFirstImg,
  bankLogo: { type: 'DNB', color: properties['--color-ocean-green'] },
  cardProvider: { type: 'Visa', color: properties['--color-black-80'] },
  paymentType: {
    type: 'BankAxept',
    color: properties['--color-black-80'],
  },
}

export const youth: CustomCard = {
  // name: 'Youth',
  cardClassName: 'card--design-youth',
  backgroundImage: youthImg,
  bankLogo: { type: 'DNB', color: properties['--color-sea-green'] },
  cardProvider: { type: 'Visa', color: properties['--color-black-80'] },
  paymentType: {
    type: 'BankAxept',
    color: properties['--color-black-80'],
  },
}

export const gold: CustomCard = {
  // name: 'Gold',
  cardClassName: 'card--design-gold',
  bankLogo: { type: 'DNB', color: properties['--color-white'] },
  cardProvider: { type: 'Visa', color: properties['--color-white'] },
  paymentType: {
    type: 'BankAxept',
    color: properties['--color-white'],
  },
}

export const saga: CustomCard = {
  // name: 'Saga',
  cardClassName: 'card--design-saga',
  bankLogo: { type: 'DNB', color: '#BFA970' },
  cardProvider: { type: 'Mastercard', color: '#BFA970' },
  paymentType: {
    type: 'BankAxept',
    color: '#BFA970',
  },
}

export const sagaPlatinum: CustomCard = {
  // name: 'Saga platinum',
  cardClassName: 'card--design-saga',
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

export const privateBanking: CustomCard = {
  // name: 'Private Banking',
  cardClassName: 'card--design-private',
  bankLogo: { type: 'DNB', color: '#b2b4b3' },
  cardProvider: { type: 'VisaPlatinum' },
  paymentType: { type: 'BankAxept', color: '#b2b4b3' },
}

export const mcBlack: CustomCard = {
  // name: 'Mastercard Black',
  cardClassName: 'card--design-black',
  bankLogo: { type: 'DNB', color: properties['--color-black-80'] },
  paymentType: { type: 'BankAxept', color: properties['--color-white'] },
  cardProvider: { type: 'MastercardDark', color: '#b2b4b3' },
}

export const businessNoVisa: CustomCard = {
  // name: 'Bedriftskort BankAxept',
  cardClassName: 'card--design-business-no-visa',
  bankLogo: { type: 'DNB', color: properties['--color-mint-green'] },
  cardProvider: { type: 'Visa', color: properties['--color-white'] },
  paymentType: { type: 'BankAxept', color: properties['--color-white'] },
}

export const businessWithVisa: CustomCard = {
  // name: 'Bedriftskort Visa',
  cardClassName: 'card--design-business-with-visa',
  bankLogo: { type: 'DNB', color: properties['--color-mint-green'] },
  cardProvider: { type: 'Visa', color: properties['--color-white'] },
  paymentType: { type: 'BankAxept', color: properties['--color-white'] },
}

export const sbankenVisa: CustomCard = {
  // name: 'Sbanken',
  cardClassName: 'card--design-sbanken-visa',
  bankLogo: { type: 'sbanken', color: properties['--sb-color-text'] },
  cardProvider: { type: 'Visa', color: '#0F357F' },
  paymentType: { type: 'BankAxept', color: '#55565A' },
}

export const sbankenMastercard: CustomCard = {
  // name: 'Sbanken Mastercard',
  cardClassName: 'card--design-sbanken-mastercard',
  bankLogo: { type: 'sbanken', color: properties['--color-white'] },
  cardProvider: { type: 'Mastercard', color: properties['--color-white'] },
  paymentType: { type: 'Credit', color: properties['--color-white'] },
}
