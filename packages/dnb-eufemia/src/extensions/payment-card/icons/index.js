import React from 'react'

import BankAxept from './BankAxept'
import DNB from './DNB'
import {
  clock_medium as Expired,
  padlock_medium as Blocked,
  card_in_medium as CardIn,
  hourglass as Hourglass,
  question_medium as QuestionMark,
} from '../../../icons'
import MastercardDefault from './MastercardDefault'
import MastercardDark from './MastercardDark'
import Pluss from './Pluss'
import Intro from './Intro'
import Business from './Business'
import Bedrift from './Bedrift'
import PB from './PB'
import SagaGold from './SagaGold'
import SagaPlatinum from './SagaPlatinum'
import VisaDefault from './VisaDefault'
import VisaPlatinum from './VisaPlatinum'
import Sbanken from './Sbanken'
import Credit from './Credit'
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
        White: () => <BankAxept className={id} fill="#ffffff" />,
        Black20: () => <BankAxept className={id} fill="#cccccc" />,
        Gray: () => <BankAxept className={id} fill="#b2b4b3" />,
        GrayDark: () => <BankAxept className={id} fill="#55565A" />,
        Black: () => <BankAxept className={id} fill="#333333" />,
        Gold: () => <BankAxept className={id} fill="#BFA970" />,
      }),
    Credit: () => (
      <Credit className={'dnb-payment-card__card__credit'} fill="#fff" />
    ),
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
