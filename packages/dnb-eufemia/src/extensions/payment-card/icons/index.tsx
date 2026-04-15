import React from 'react'

// brand logos
import DNB from './brandLogos/DNB'
import Sbanken from './brandLogos/Sbanken'
// loyalty logos
import Bedrift from './loyaltyLogos/Bedrift'
import Business from './loyaltyLogos/Business'
import Corporate from './loyaltyLogos/Corporate'
import Intro from './loyaltyLogos/Intro'
import PB from './loyaltyLogos/PB'
import Pluss from './loyaltyLogos/Pluss'
import SagaGold from './loyaltyLogos/SagaGold'
import SagaPlatinum from './loyaltyLogos/SagaPlatinum'
import WorldElite from './loyaltyLogos/WorldElite'
// provider icons
import BankAxept from './providers/BankAxept'
import MastercardDefault from './providers/MastercardDefault'
import MastercardDark from './providers/MastercardDark'
import VisaDefault from './providers/VisaDefault'
import VisaPlatinum from './providers/VisaPlatinum'
import { StatusIcon } from './status'
import type {
  DNB as DNBType,
  ProductType,
  BankAxeptType,
  CardType,
} from '../utils/Types'
import type { CardDesign } from '../utils/CardDesigns'

const BankLogo = ({ logoType }: { logoType: DNBType }) => {
  switch (logoType.tag) {
    case 'Colored':
      return (
        <DNB
          fill={logoType.color}
          className="dnb-payment-card__card__bank-logo"
        />
      )
    case 'Sbanken':
      return (
        <Sbanken
          fill={logoType.color}
          className="dnb-payment-card__card__bank-logo"
        />
      )
  }
}

const ProductLogo = ({
  productType,
  cardDesign,
}: {
  productType: ProductType
  cardDesign: CardDesign
}) => {
  const id = 'dnb-payment-card__card__product-type'

  switch (productType.tag) {
    case 'Saga':
      switch (cardDesign.saga.tag) {
        case 'Gold':
          return <SagaGold className={id} />
        case 'Platinum':
          return <SagaPlatinum className={id} />
        case 'None':
          return null
      }
      return null
    case 'Pluss':
      return <Pluss className={id} />
    case 'Intro':
      return <Intro className={id} />
    case 'Business':
      return <Business className={id} />
    case 'Bedrift':
      return <Bedrift className={id} />
    case 'Corporate':
      return <Corporate className={id} />
    case 'WorldElite':
      return <WorldElite className={id} />
    case 'PrivateBanking':
      switch (cardDesign.privateBanking.tag) {
        case 'Default':
          return <PB className={id} />
        case 'None':
          return null
      }
      return null
    case 'None':
      return null
  }
}

const BankAxeptLogo = ({
  bankAxept,
  cardDesign,
}: {
  bankAxept: BankAxeptType
  cardDesign: CardDesign
}) => {
  const id = 'dnb-payment-card__card__bank-axept'

  switch (bankAxept.tag) {
    case 'BankAxept':
      switch (cardDesign.bankAxept.tag) {
        case 'White':
          return <BankAxept className={id} fill="#FFFFFF" />
        case 'Black20':
          return <BankAxept className={id} fill="#CCCCCC" />
        case 'Gray':
          return <BankAxept className={id} fill="#b2b4b3" />
        case 'GrayDark':
          return <BankAxept className={id} fill="#55565A" />
        case 'Black':
          return <BankAxept className={id} fill="#000000" />
        case 'Gold':
          return <BankAxept className={id} fill="#CAAB51" />
      }
      return null
    case 'Credit':
      return null
    case 'None':
      return null
  }
}

const TypeLogo = ({
  cardType,
  cardDesign,
}: {
  cardType: CardType
  cardDesign: CardDesign
}) => {
  const id = 'dnb-payment-card__card__credit-type'

  switch (cardType.tag) {
    case 'Visa':
      switch (cardDesign.visa.tag) {
        case 'Colored':
          return (
            <VisaDefault className={id} fill={cardDesign.visa.color} />
          )
        case 'Platinum':
          return <VisaPlatinum className={id} />
      }
      return null
    case 'Mastercard':
      switch (cardDesign.mastercard.tag) {
        case 'Default':
          return <MastercardDefault className={id} />
        case 'Dark':
          return <MastercardDark className={id} />
      }
      return null
    case 'None':
      return null
  }
}

export { BankLogo, ProductLogo, StatusIcon, TypeLogo, BankAxeptLogo }
