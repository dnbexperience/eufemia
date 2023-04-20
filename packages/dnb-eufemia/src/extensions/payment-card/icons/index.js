import React from 'react'

import BankAxept from './BankAxept'
import DNB from './DNB'
import DNBMetallic from './DNBMetallic'
import Expired from './Clock'
import Blocked from './Padlock'
import MastercardDefault from './MastercardDefault'
import MastercardMetallic from './MastercardMetallic'
import MastercardMetallicBlack from './MastercardMetallicBlack'
import Pluss from './Pluss'
import PB from './PB'
import PBPlatinum from './PBPlatinum'
import SagaGold from './SagaGold'
import SagaPlatinum from './SagaPlatinum'
import SagaVisaPlatinum from './SagaVisaPlatinum'
import VisaDefault from './VisaDefault'
import VisaMetallic from './VisaMetallic'

const BankLogo = ({ logoType, height }) =>
  logoType.cata({
    Colored: (color) => (
      <DNB
        height={height}
        fill={color}
        className="dnb-payment-card__card__bank-logo"
      />
    ),
    Metallic: () => (
      <DNBMetallic
        height={height}
        className="dnb-payment-card__card__bank-logo"
      />
    ),
  })

const ProductLogo = ({ productType, cardDesign }) => {
  const id = 'dnb-payment-card__card__product-type'
  return productType.cata({
    BankAxept: () =>
      cardDesign.bankAxept.cata({
        White: () => <BankAxept className={id} fill="#ffffff" />,
        Black: () => <BankAxept className={id} fill="#757575" />,
      }),
    Saga: () =>
      cardDesign.saga.cata({
        Gold: () => <SagaGold className={id} />,
        Platinum: () => <SagaPlatinum className={id} />,
        VisaPlatinum: () => <SagaVisaPlatinum className={id} />,
        None: () => null,
      }),
    Pluss: () => <Pluss className={id} fill="#A5E1D2" />,
    PrivateBanking: () =>
      cardDesign.privateBanking.cata({
        Default: () => <PB className={id} />,
        Platinum: () => <PBPlatinum className={id} />,
        None: () => null,
      }),
    None: () => null,
  })
}

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'expired':
      return <Expired />

    case 'blocked':
      return <Blocked />

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
        Metallic: () => <VisaMetallic className={id} />,
      }),
    Mastercard: () =>
      cardDesign.mastercard.cata({
        Default: () => <MastercardDefault className={id} />,
        DefaultWhite: () => (
          <MastercardDefault className={id} textFill="#ffffff" />
        ),
        Metallic: () => <MastercardMetallic className={id} />,
        BlackMetallic: () => <MastercardMetallicBlack className={id} />,
      }),
    None: () => null,
  })
}

export { BankLogo, ProductLogo, StatusIcon, TypeLogo }
