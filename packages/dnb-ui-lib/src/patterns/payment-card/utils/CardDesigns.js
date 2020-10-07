import properties from '../../../style/properties'
import { DNB, Saga, PB, Mastercard, BankAxept, Visa } from './Types'

const defaultDesign = {
  name: 'Default',
  cardStyle: 'card--design-default',
  bankLogo: DNB.Colored(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.DefaultWhite,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None
}

const white = {
  name: 'White',
  cardStyle: 'card--design-white',
  bankLogo: DNB.Colored(properties['--color-black-55']),
  visa: Visa.Colored(properties['--color-black-55']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PB.None
}

const myFirst = {
  name: 'My first',
  cardStyle: 'card--design-white',
  bankLogo: DNB.Colored(properties['--color-emerald-green']),
  visa: Visa.Colored(properties['--color-black-55']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PB.None
}

const youth = {
  name: 'Youth',
  cardStyle: 'card--design-white',
  bankLogo: DNB.Colored(properties['--color-summer-green']),
  visa: Visa.Colored(properties['--color-black-55']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PB.None
}

const silver = {
  name: 'Silver',
  cardStyle: 'card--design-silver',
  bankLogo: DNB.Colored(properties['--color-black-55']),
  visa: Visa.Colored(properties['--color-black-55']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PB.None
}

const gold = {
  name: 'Gold',
  cardStyle: 'card--design-gold',
  bankLogo: DNB.Colored(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.DefaultWhite,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None
}

const saga = {
  name: 'Saga',
  cardStyle: 'card--design-saga',
  bankLogo: DNB.Colored('#CFAD88'),
  visa: Visa.Colored('#CFAD8899'),
  mastercard: Mastercard.DefaultWhite,
  bankAxept: BankAxept.White,
  saga: Saga.Gold,
  privateBanking: PB.None
}

const sagaPlatinum = {
  name: 'Saga platinum',
  cardStyle: 'card--design-saga',
  bankLogo: DNB.Colored('#8C9091'),
  visa: Visa.Colored('#8C909199'),
  mastercard: Mastercard.DefaultWhite,
  bankAxept: BankAxept.White,
  saga: Saga.Platinum,
  privateBanking: PB.None
}

const privateBanking = {
  name: 'Private Banking',
  cardStyle: 'card--design-private',
  bankLogo: DNB.Metalic,
  visa: Visa.Metalic,
  mastercard: Mastercard.Metalic,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.Default
}

const mcBlack = {
  name: 'Mastercard Black',
  cardStyle: 'card--design-black',
  bankLogo: DNB.Colored(properties['--color-black-80']),
  visa: Visa.Metalic,
  mastercard: Mastercard.BlackMetalic,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None
}

const businessNoVisa = {
  name: 'Bedriftskort BankAxept',
  cardStyle: 'card--design-business-no-visa',
  bankLogo: DNB.Colored(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.DefaultWhite,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None
}

const businessWithVisa = {
  name: 'Bedriftskort Visa',
  cardStyle: 'card--design-business-with-visa',
  bankLogo: DNB.Colored(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.DefaultWhite,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None
}

// const Designs = {
//   defaultDesign,
//   white,
//   myFirst,
//   youth,
//   silver,
//   gold,
//   saga,
//   sagaPlatinum,
//   privateBanking,
//   mcBlack,
//   businessNoVisa,
//   businessWithVisa
// }
// export default Designs

export {
  defaultDesign,
  white,
  myFirst,
  youth,
  silver,
  gold,
  saga,
  sagaPlatinum,
  privateBanking,
  mcBlack,
  businessNoVisa,
  businessWithVisa
}
