import properties from '../../../style/themes/theme-ui/properties'
import {
  Saga,
  PrivateBanking,
  Mastercard,
  BankAxept,
  VisaPlatinum,
  CardDesignObject,
} from '../types'
import { myFirstImg, youthImg, ungImg } from './backgroundImages'

const defaultDesign: CardDesignObject = {
  name: 'Default',
  cardStyle: 'card--design-default',
  bankLogo: { type: 'DNB', color: properties['--color-white'] },
  visa: { color: properties['--color-white'] },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PrivateBanking.None,
}

const pluss: CardDesignObject = {
  name: 'Pluss',
  cardStyle: 'card--design-pluss',
  bankLogo: { type: 'DNB', color: properties['--color-white'] },
  visa: { color: properties['--color-white'] },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PrivateBanking.Default,
}

const young: CardDesignObject = {
  name: 'Ung',
  cardStyle: 'card--design-ung',
  bankLogo: { type: 'DNB', color: properties['--color-sea-green'] },
  visa: { color: properties['--color-black-80'] },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PrivateBanking.None,
  backgroundImage: ungImg,
}

const myFirst: CardDesignObject = {
  name: 'My first',
  cardStyle: 'card--design-my-first',
  bankLogo: { type: 'DNB', color: properties['--color-ocean-green'] },
  visa: { color: properties['--color-black-80'] },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PrivateBanking.None,
  backgroundImage: myFirstImg,
}

const youth: CardDesignObject = {
  name: 'Youth',
  cardStyle: 'card--design-youth',
  bankLogo: { type: 'DNB', color: properties['--color-sea-green'] },
  visa: { color: properties['--color-black-80'] },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Black,
  saga: Saga.None,
  privateBanking: PrivateBanking.None,
  backgroundImage: youthImg,
}

const gold: CardDesignObject = {
  name: 'Gold',
  cardStyle: 'card--design-gold',
  bankLogo: { type: 'DNB', color: properties['--color-white'] },
  visa: { color: properties['--color-white'] },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PrivateBanking.None,
}

const saga: CardDesignObject = {
  name: 'Saga',
  cardStyle: 'card--design-saga',
  bankLogo: { type: 'DNB', color: '#BFA970' },
  visa: { color: '#BFA970' },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Gold,
  saga: Saga.Gold,
  privateBanking: PrivateBanking.None,
}

const sagaPlatinum: CardDesignObject = {
  name: 'Saga platinum',
  cardStyle: 'card--design-saga',
  bankLogo: { type: 'DNB', color: '#b2b4b3' },
  visa: { color: '#cccccc' },
  mastercard: Mastercard.Dark,
  bankAxept: BankAxept.Black20,
  saga: Saga.Platinum,
  privateBanking: PrivateBanking.None,
}

const privateBanking: CardDesignObject = {
  name: 'Private Banking',
  cardStyle: 'card--design-private',
  bankLogo: { type: 'DNB', color: '#b2b4b3' },
  visa: VisaPlatinum,
  mastercard: Mastercard.Dark,
  bankAxept: BankAxept.Gray,
  saga: Saga.None,
  privateBanking: PrivateBanking.Default,
}

const mcBlack: CardDesignObject = {
  name: 'Mastercard Black',
  cardStyle: 'card--design-black',
  bankLogo: { type: 'DNB', color: properties['--color-black-80'] },
  visa: { color: '#b2b4b3' },
  mastercard: Mastercard.Dark,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PrivateBanking.None,
}

const businessNoVisa: CardDesignObject = {
  name: 'Bedriftskort BankAxept',
  cardStyle: 'card--design-business-no-visa',
  bankLogo: { type: 'DNB', color: properties['--color-mint-green'] },
  visa: { color: properties['--color-white'] },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PrivateBanking.None,
}

const businessWithVisa: CardDesignObject = {
  name: 'Bedriftskort Visa',
  cardStyle: 'card--design-business-with-visa',
  bankLogo: { type: 'DNB', color: properties['--color-mint-green'] },
  visa: { color: properties['--color-white'] },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.White,
  saga: Saga.None,
  privateBanking: PrivateBanking.None,
}

const sbankenVisa: CardDesignObject = {
  name: 'Sbanken',
  cardStyle: 'card--design-sbanken-visa',
  bankLogo: { type: 'Sbanken', color: properties['--sb-color-text'] },
  visa: { color: '#0F357F' },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.GrayDark,
  saga: Saga.None,
  privateBanking: PrivateBanking.None,
}

const sbankenMastercard: CardDesignObject = {
  name: 'Sbanken Mastercard',
  cardStyle: 'card--design-sbanken-mastercard',
  bankLogo: { type: 'Sbanken', color: properties['--color-white'] },
  visa: { color: properties['--color-white'] },
  mastercard: Mastercard.Default,
  bankAxept: BankAxept.Gray,
  saga: Saga.None,
  privateBanking: PrivateBanking.None,
}

const DesignObjectTemplates: Record<any, CardDesignObject> = {
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

export default DesignObjectTemplates

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
