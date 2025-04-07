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
import ClickToPay from './providers/ClickToPay'
import MastercardDefault from './providers/MastercardDefault'
import MastercardDark from './providers/MastercardDark'
import VisaDefault from './providers/VisaDefault'
import VisaPlatinum from './providers/VisaPlatinum'
// status icons
import {
  clock_medium as Expired,
  padlock_medium as Blocked,
  card_in_medium as CardIn,
  hourglass as Hourglass,
  question_medium as QuestionMark,
} from '../../../icons'
const BankLogo = ({ logoType, height }) =>
  logoType.cata({
    Colored: (color) => (
      <DNB
        height={height}
        fill={color}
        className="dnb-payment-card__card__bank-logo"
      />
    ),
    Sbanken: (color) => (
      <Sbanken
        height={height}
        fill={color}
        className="dnb-payment-card__card__bank-logo"
      />
    ),
  })

const ProductLogo = ({ productType, cardDesign }) => {
  const id = 'dnb-payment-card__card__product-type'
  return productType.cata({
    Saga: () =>
      cardDesign.saga.cata({
        Gold: () => <SagaGold className={id} />,
        Platinum: () => <SagaPlatinum className={id} />,
        None: () => null,
      }),
    Pluss: () => <Pluss className={id} />,
    Intro: () => <Intro className={id} />,
    Business: () => <Business className={id} />,
    Bedrift: () => <Bedrift className={id} />,
    Corporate: () => <Corporate className={id} />,
    WorldElite: () => <WorldElite className={id} />,
    PrivateBanking: () =>
      cardDesign.privateBanking.cata({
        Default: () => <PB className={id} />,
        None: () => null,
      }),
    None: () => null,
  })
}

const BankAxeptLogo = ({ bankAxept, cardDesign }) => {
  const id = 'dnb-payment-card__card__bank-axept'
  return bankAxept.cata({
    BankAxept: () =>
      cardDesign.bankAxept.cata({
        White: () => <BankAxept className={id} fill="#FFFFFF" />,
        Black20: () => <BankAxept className={id} fill="#CCCCCC" />,
        Gray: () => <BankAxept className={id} fill="#b2b4b3" />,
        GrayDark: () => <BankAxept className={id} fill="#55565A" />,
        Black: () => <BankAxept className={id} fill="#000000" />,
        Gold: () => <BankAxept className={id} fill="#CAAB51" />,
      }),
    Credit: () => null,
    None: () => null,
  })
}

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'expired':
      return <Expired />

    case 'not_active':
      return <CardIn />

    case 'blocked':
      return <Blocked />

    case 'order_in_process':
      return <Hourglass />

    case 'renewed':
      return <CardIn />

    case 'replaced':
      return <CardIn />

    case 'unknown':
      return <QuestionMark />

    case 'active':
    default:
      return null
  }
}

const TypeLogo = ({ cardType, cardDesign }) => {
  const id = 'dnb-payment-card__card__credit-type'
  return cardType.cata({
    Visa: () =>
      cardDesign.visa.cata({
        Colored: (color) => <VisaDefault className={id} fill={color} />,
        Platinum: () => <VisaPlatinum className={id} />,
      }),
    Mastercard: () =>
      cardDesign.mastercard.cata({
        Default: () => <MastercardDefault className={id} />,
        Dark: () => <MastercardDark className={id} />,
      }),
    None: () => null,
  })
}

export { BankLogo, ProductLogo, StatusIcon, TypeLogo, BankAxeptLogo }
