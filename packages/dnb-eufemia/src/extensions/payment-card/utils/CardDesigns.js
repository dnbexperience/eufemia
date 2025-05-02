import properties from '../../../style/themes/theme-ui/properties'
import { DNB, Saga, PB, Mastercard, BankAxept, Visa } from './Types'
import {
  myFirstImg,
  youthImg,
  visaDefault,
  visaPluss,
  visaSagaGold,
  visaSagaPlatinum,
  mastercardGold
} from './backgrounds'

const defaultDesign = {
  name: 'Default',
  cardStyle: 'card--design-default',
  bankLogo: DNB.Colored(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: visaDefault,
}

const pluss = {
  name: 'Pluss',
  cardStyle: 'card--design-pluss',
  bankLogo: DNB.Colored(properties['--color-mint-green']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: visaPluss,
}

const young = {
  name: 'Ung',
  cardStyle: 'card--design-ung',
  bankLogo: DNB.Colored(properties['--color-emerald-green']),
  visa: Visa.Colored(properties['--color-black']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PB.None,
}

const myFirst = {
  name: 'My first',
  cardStyle: 'card--design-my-first',
  bankLogo: DNB.Colored(properties['--color-emerald-green']),
  visa: Visa.Colored(properties['--color-black']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: myFirstImg,
}

const youth = {
  name: 'Youth',
  cardStyle: 'card--design-youth',
  bankLogo: DNB.Colored(properties['--color-emerald-green']),
  visa: Visa.Colored(properties['--color-black']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: youthImg,
}

const gold = {
  name: 'Gold',
  cardStyle: 'card--design-gold',
  bankLogo: DNB.Colored(properties['--color-black']),
  visa: Visa.Colored(properties['--color-black']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: mastercardGold,
}

const saga = {
  name: 'Saga',
  cardStyle: 'card--design-saga',
  bankLogo: DNB.Colored('#CAAB51'),
  visa: Visa.Colored('#CAAB51'),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Gold,
  saga: Saga.Gold,
  privateBanking: PB.None,
  backgroundImage: visaSagaGold,
}

const sagaPlatinum = {
  name: 'Saga platinum',
  cardStyle: 'card--design-saga-platinum',
  bankLogo: DNB.Colored('#cccccc'),
  visa: Visa.Colored('#cccccc'),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black20,
  saga: Saga.Platinum,
  privateBanking: PB.None,
  backgroundImage: visaSagaPlatinum,
}

const privateBanking = {
  name: 'Private Banking',
  cardStyle: 'card--design-private',
  bankLogo: DNB.Colored('#cccccc'),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Dark,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.Default,
  backgroundImage: visaSagaPlatinum,
}

const mcBlack = {
  name: 'Mastercard Black',
  cardStyle: 'card--design-black',
  bankLogo: DNB.Colored(properties['--color-black']),
  visa: Visa.Colored('#b2b4b3'),
  mastercard: Mastercard.Dark,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: visaSagaPlatinum,
}

const businessNoVisa = {
  name: 'Bedriftskort BankAxept',
  cardStyle: 'card--design-default',
  bankLogo: DNB.Colored(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: visaDefault,
}

const businessWithVisa = {
  name: 'Bedriftskort Visa',
  cardStyle: 'card--design-default',
  bankLogo: DNB.Colored(properties['--color-white']),
  visa: Visa.Colored(properties['--color-white']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PB.None,
  backgroundImage: visaDefault,
}

const sbankenVisa = {
  name: 'Sbanken',
  cardStyle: 'card--design-sbanken-visa',
  bankLogo: DNB.Sbanken(properties['--sb-color-text']),
  visa: Visa.Colored(properties['--color-black']),
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
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
