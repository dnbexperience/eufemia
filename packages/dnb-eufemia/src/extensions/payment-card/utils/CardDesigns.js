import properties from '../../../style/themes/theme-ui/properties'
import { DNB, Saga, PB, Mastercard, BankAxept, Visa } from './Types'
import { myFirstImg, youthImg, ungImg } from './backgrounds'

const defaultDesign = {
  name: 'Default',
  cardStyle: 'card--design-default',
  bankLogo: DNB.Colored(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
}

const pluss = {
  name: 'Pluss',
  cardStyle: 'card--design-pluss',
  bankLogo: DNB.Colored(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
}

const young = {
  name: 'Ung',
  cardStyle: 'card--design-ung',
  bankLogo: DNB.Colored(properties['--color-sea-green']),
  visa: Visa.Colored(properties['--color-black-80']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: ungImg,
}

const myFirst = {
  name: 'My first',
  cardStyle: 'card--design-my-first',
  bankLogo: DNB.Colored(properties['--color-ocean-green']),
  visa: Visa.Colored(properties['--color-black-80']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: myFirstImg,
}

const youth = {
  name: 'Youth',
  cardStyle: 'card--design-youth',
  bankLogo: DNB.Colored(properties['--color-sea-green']),
  visa: Visa.Colored(properties['--color-black-80']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: youthImg,
}

const gold = {
  name: 'Gold',
  cardStyle: 'card--design-gold',
  bankLogo: DNB.Colored(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
}

const saga = {
  name: 'Saga',
  cardStyle: 'card--design-saga',
  bankLogo: DNB.Colored('#BFA970'),
  visa: Visa.Colored('#BFA970'),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Gold,
  saga: Saga.Gold,
  privateBanking: PB.None,
}

const sagaPlatinum = {
  name: 'Saga platinum',
  cardStyle: 'card--design-saga',
  bankLogo: DNB.Colored('#b2b4b3'),
  visa: Visa.Colored('#cccccc'),
  mastercard: Mastercard.Dark,
  bankAxept: BankAxept.Black20,
  saga: Saga.Platinum,
  privateBanking: PB.None,
}

const privateBanking = {
  name: 'Private Banking',
  cardStyle: 'card--design-private',
  bankLogo: DNB.Colored('#b2b4b3'),
  visa: Visa.Platinum,
  mastercard: Mastercard.Dark,
  bankAxept: BankAxept.Gray,
  saga: Saga.None,
  privateBanking: PB.Default,
}

const mcBlack = {
  name: 'Mastercard Black',
  cardStyle: 'card--design-black',
  bankLogo: DNB.Colored(properties['--color-black-80']),
  visa: Visa.Colored('#b2b4b3'),
  mastercard: Mastercard.Dark,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
}

const businessNoVisa = {
  name: 'Bedriftskort BankAxept',
  cardStyle: 'card--design-business-no-visa',
  bankLogo: DNB.Colored(properties['--color-mint-green']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
}

const businessWithVisa = {
  name: 'Bedriftskort Visa',
  cardStyle: 'card--design-business-with-visa',
  bankLogo: DNB.Colored(properties['--color-mint-green']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
}

const sbankenVisa = {
  name: 'Sbanken',
  cardStyle: 'card--design-sbanken-visa',
  bankLogo: DNB.Sbanken(properties['--sb-color-text']),
  visa: Visa.Colored('#0F357F'),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.GrayDark,
  saga: Saga.None,
  privateBanking: PB.None,
}

const sbankenMastercard = {
  name: 'Sbanken Mastercard',
  cardStyle: 'card--design-sbanken-mastercard',
  bankLogo: DNB.Sbanken(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Gray,
  saga: Saga.None,
  privateBanking: PB.None,
}

const Designs = {
  defaultDesign,
  young,
  myFirst,
  youth,
  pluss,
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

export {
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
