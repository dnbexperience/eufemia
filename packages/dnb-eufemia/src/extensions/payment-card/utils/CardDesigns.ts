import properties from '../../../style/themes/theme-ui/properties'
import { CardDesignData } from '../types'
import { myFirstImg, youthImg, ungImg } from './backgrounds'

const defaultDesign: CardDesignData = {
  name: 'Default',
  cardStyle: 'card--design-default',
  bankLogo: 'DNB',
  bankLogoColors: properties['--color-white'],
  cardType: 'VisaColored',
  visaColors: properties['--color-white'],
  bankAxept: 'BankAxeptWhite',
}

const pluss: CardDesignData = {
  name: 'Pluss',
  cardStyle: 'card--design-pluss',
  bankLogo: 'DNB',
  bankLogoColors: properties['--color-white'],
  cardType: 'VisaColored',
  visaColors: properties['--color-white'],
  bankAxept: 'BankAxeptWhite',
}

const young: CardDesignData = {
  name: 'Ung',
  cardStyle: 'card--design-ung',
  bankLogo: 'DNB',
  bankLogoColors: properties['--color-sea-green'],
  visaColors: properties['--color-black-80'],
  cardType: 'MastercardDefault',
  bankAxept: 'BankAxeptBlack',
  productType: 'Saga',
  backgroundImage: ungImg,
}

const myFirst: CardDesignData = {
  name: 'My first',
  cardStyle: 'card--design-my-first',
  bankLogo: 'DNB',
  bankLogoColors: properties['--color-ocean-green'],
  cardType: 'VisaColored',
  visaColors: properties['--color-black-80'],
  bankAxept: 'BankAxeptBlack',
  backgroundImage: myFirstImg,
}

const youth: CardDesignData = {
  name: 'Youth',
  cardStyle: 'card--design-youth',
  bankLogo: 'DNB',
  bankLogoColors: properties['--color-sea-green'],
  cardType: 'VisaColored',
  visaColors: properties['--color-black-80'],
  bankAxept: 'BankAxeptBlack',
  backgroundImage: youthImg,
}

const gold: CardDesignData = {
  name: 'Gold',
  cardStyle: 'card--design-gold',
  bankLogo: 'DNB',
  bankLogoColors: properties['--color-white'],
  cardType: 'VisaColored',
  visaColors: properties['--color-white'],
  bankAxept: 'BankAxeptWhite',
}

const saga: CardDesignData = {
  name: 'Saga',
  cardStyle: 'card--design-saga',
  bankLogo: 'DNB',
  bankLogoColors: '#BFA970',
  visaColors: '#BFA970',
  cardType: 'MastercardDefault',
  bankAxept: 'BankAxeptGold',
  cardDesign: 'SagaGold',
}

const sagaPlatinum: CardDesignData = {
  name: 'Saga platinum',
  cardStyle: 'card--design-saga',
  bankLogo: 'DNB',
  bankLogoColors: '#b2b4b3',
  cardType: 'MastercardDark',
  visaColors: '#cccccc',
  bankAxept: 'BankAxeptBlack20',
  cardDesign: 'SagaPlatinum',
}

const privateBanking: CardDesignData = {
  name: 'Private Banking',
  cardStyle: 'card--design-private',
  bankLogo: 'DNB',
  bankLogoColors: '#b2b4b3',
  cardType: 'VisaPlatinum',
  bankAxept: 'BankAxeptGray',
}

const mcBlack: CardDesignData = {
  name: 'Mastercard Black',
  cardStyle: 'card--design-black',
  bankLogo: 'DNB',
  bankLogoColors: properties['--color-black-80'],
  cardType: 'MastercardDark',
  visaColors: '#b2b4b3',
  bankAxept: 'BankAxeptWhite',
}

const businessNoVisa: CardDesignData = {
  name: 'Bedriftskort BankAxept',
  cardStyle: 'card--design-business-no-visa',
  bankLogo: 'DNB',
  bankLogoColors: properties['--color-mint-green'],
  cardType: 'VisaColored',
  visaColors: properties['--color-white'],
  bankAxept: 'BankAxeptWhite',
}

const businessWithVisa: CardDesignData = {
  name: 'Bedriftskort Visa',
  cardStyle: 'card--design-business-with-visa',
  bankLogo: 'DNB',
  bankLogoColors: properties['--color-mint-green'],
  cardType: 'VisaColored',
  visaColors: properties['--color-white'],
  bankAxept: 'BankAxeptWhite',
}

const sbankenVisa: CardDesignData = {
  name: 'Sbanken',
  cardStyle: 'card--design-sbanken-visa',
  bankLogo: 'sbanken',
  bankLogoColors: properties['--sb-color-text'],
  cardType: 'VisaColored',
  visaColors: '#0F357F',
  bankAxept: 'BankAxeptGrayDark',
}

const sbankenMastercard: CardDesignData = {
  name: 'Sbanken Mastercard',
  cardStyle: 'card--design-sbanken-mastercard',
  bankLogo: 'sbanken',
  bankLogoColors: 'var(--color-white)',
  cardType: 'MastercardDefault',
  visaColors: properties['--color-white'],
  bankAxept: 'BankAxeptGray',
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
