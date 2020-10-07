import {
  // cardDesigns,
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
} from './CardDesigns'

import { CardType, ProductType } from './Types'

const cardData = [
  {
    productCode: 'NK1',
    productName: 'DNB Kortet',
    displayName: 'DNB Kortet',
    cardDesign: defaultDesign,
    cardType: CardType.None,
    productType: ProductType.BankAxept
  },
  {
    productCode: 'NK4',
    productName: 'DNB Kortet',
    displayName: 'DNB Kortet',
    cardDesign: defaultDesign,
    cardType: CardType.None,
    productType: ProductType.BankAxept
  },
  {
    productCode: 'NK5',
    productName: 'DNB Kortet',
    displayName: 'DNB Kortet',
    cardDesign: defaultDesign,
    cardType: CardType.None,
    productType: ProductType.BankAxept
  },
  {
    productCode: 'VE1',
    productName: 'DNB Electron',
    displayName: 'DNB Electron',
    cardDesign: defaultDesign,
    cardType: CardType.Visa,
    productType: ProductType.None
  },
  {
    productCode: 'VE2',
    productName: 'DNB Electron u/leg',
    displayName: 'DNB Electron',
    cardDesign: defaultDesign,
    cardType: CardType.Visa,
    productType: ProductType.None
  },
  {
    productCode: 'VG1',
    productName: 'SAGA Gull Visa',
    displayName: 'SAGA Gull',
    cardDesign: saga,
    cardType: CardType.Visa,
    productType: ProductType.Saga
  },
  {
    productCode: 'VG4',
    productName: 'SAGA Gull Visa u/leg',
    displayName: 'SAGA Gull',
    cardDesign: saga,
    cardType: CardType.Visa,
    productType: ProductType.Saga
  },
  {
    productCode: 'VK2',
    productName: 'DNB Visa',
    displayName: 'DNB Visa',
    cardDesign: defaultDesign,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'VK4',
    productName: 'DNB Visa',
    displayName: 'DNB Visa',
    cardDesign: defaultDesign,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'VL1',
    productName: 'Sølv Visa',
    displayName: 'Sølvkort',
    cardDesign: silver,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'VL2',
    productName: 'Hvitt Visa',
    displayName: 'Hvitt kort',
    cardDesign: white,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'VL3',
    productName: 'Sølv Visa',
    displayName: 'Sølvkort',
    cardDesign: silver,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'VL4',
    productName: 'DNB Visa u/leg',
    displayName: 'DNB Visa',
    cardDesign: silver,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'VL6',
    productName: 'Hvitt Visa u/leg',
    displayName: 'Hvitt kort',
    cardDesign: white,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'VP2',
    productName: 'SAGA Platinum Visa',
    displayName: 'SAGA Platinum',
    cardDesign: sagaPlatinum,
    productType: ProductType.Saga,
    cardType: CardType.Visa
  },
  {
    productCode: 'VP3',
    productName: 'Private Banking Visa',
    displayName: 'Private Banking',
    cardDesign: privateBanking,
    productType: ProductType.PrivateBanking,
    cardType: CardType.Visa
  },
  {
    productCode: 'VP4',
    productName: 'SAGA Platinum Visa u/leg',
    displayName: 'SAGA Platinum',
    cardDesign: sagaPlatinum,
    productType: ProductType.Saga,
    cardType: CardType.Visa
  },
  {
    productCode: 'VP5',
    productName: 'Private Banking Visa u/leg',
    displayName: 'Private Banking',
    cardDesign: privateBanking,
    productType: ProductType.PrivateBanking,
    cardType: CardType.Visa
  },
  // {
  //   productCode: 'VU3',
  //   productName: 'Intro Electron',
  //   displayName: 'Intro Electron',
  //   cardDesign: defaultDesign,
  //
  //   productLogo: "",
  //   cardType: CardType.Visa,
  // },
  // {
  //   productCode: 'VU6',
  //   productName: 'Leve Ung',
  //   displayName: 'Leve Ung',
  //   cardDesign: defaultDesign,
  //
  //   productLogo: "",
  //   type: "",
  // },
  {
    productCode: 'VX1',
    productName: 'Mitt første kort',
    displayName: 'Mitt første kort',
    cardDesign: myFirst,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'VX3',
    productName: 'Ungdomskortet',
    displayName: 'Ungdomskort',
    cardDesign: youth,
    productType: ProductType.BankAxept,
    cardType: CardType.Visa
  },
  {
    productCode: 'VX4',
    productName: 'Mitt første kort u/leg',
    displayName: 'Mitt første kort',
    cardDesign: myFirst,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'VX5',
    productName: 'Ungdomskortet u/leg',
    displayName: 'Ungdomskort',
    cardDesign: youth,
    productType: ProductType.BankAxept,
    cardType: CardType.Visa
  },
  {
    productCode: '096',
    productName: 'DNB Mastercard',
    displayName: 'DNB Mastercard',
    cardDesign: gold,
    productType: ProductType.None,
    cardType: CardType.Mastercard
  },
  {
    productCode: '044',
    productName: 'Hvitt Mastercard',
    displayName: 'Student',
    cardDesign: white,
    productType: ProductType.None,
    cardType: CardType.Mastercard
  },
  {
    productCode: '043',
    productName: 'Sølv MasterCard',
    displayName: 'Leve',
    cardDesign: silver,
    productType: ProductType.None,
    cardType: CardType.Mastercard
  },
  {
    productCode: '098',
    productName: 'SAGA Gull Mastercard',
    displayName: 'SAGA Gull',
    cardDesign: saga,
    productType: ProductType.Saga,
    cardType: CardType.Mastercard
  },
  {
    productCode: '074',
    productName: 'SAGA Platinum Mastercard',
    displayName: 'SAGA Platinum',
    cardDesign: sagaPlatinum,
    productType: ProductType.Saga,
    cardType: CardType.Mastercard
  },
  {
    productCode: '062',
    productName: 'Private Banking Mastercard',
    displayName: 'Private Banking',
    cardDesign: privateBanking,
    productType: ProductType.PrivateBanking,
    cardType: CardType.Mastercard
  },
  {
    productCode: 'BK1',
    productName: 'Bedriftskort (småkjøpskort)',
    displayName: 'Bedriftskort (småkjøpskort)',
    cardDesign: businessNoVisa,
    productType: ProductType.BankAxept,
    cardType: CardType.None
  },
  {
    productCode: 'BP1',
    productName: 'Bedriftskort (småkjøpskort)',
    displayName: 'Bedriftskort (småkjøpskort)',
    cardDesign: businessNoVisa,
    productType: ProductType.BankAxept,
    cardType: CardType.None
  },
  {
    productCode: 'VB1',
    productName: 'Bedriftskort med Visa',
    displayName: 'Bedriftskort med Visa',
    cardDesign: businessWithVisa,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'VB2',
    productName: 'Bedriftskort med Visa',
    displayName: 'Bedriftskort med Visa',
    cardDesign: businessWithVisa,
    productType: ProductType.None,
    cardType: CardType.Visa
  },
  {
    productCode: 'P101',
    productName: '?',
    displayName: 'Black Mastercard',
    cardDesign: mcBlack,
    productType: ProductType.None,
    cardType: CardType.Mastercard
  }
]

export default cardData
