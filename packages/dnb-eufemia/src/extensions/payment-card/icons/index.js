import React from 'react'

import BankAxept from './BankAxept'
import DNB from './DNB'
import { clock_medium as Expired } from '../../../icons'
import { padlock_medium as Blocked } from '../../../icons'
import { card_in_medium as CardIn } from '../../../icons'
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
import { hourglass as Hourglass } from '../../../icons'
const BankLogo = ({ logoType, height }) =>
  logoType.cata({
    Colored: (color) => (
      <DNB
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
        Black: () => <BankAxept className={id} fill="#333333" />,
        Gold: () => <BankAxept className={id} fill="#BFA970" />,
      }),
    None: () => null,
  })
}

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'expired':
      return <Expired stroke="#fefefe"/>

    case 'not_active':
      return <CardIn stroke="#fefefe"/>
    
    case 'blocked':
      return <Blocked stroke="#fefefe"/>
    
    case 'order_in_process':
      return <Hourglass stroke="#fefefe"/>

    case 'renewed':
      return <CardIn stroke="#fefefe"/>
    
    case 'replaced':
      return <CardIn stroke="#fefefe"/>

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
