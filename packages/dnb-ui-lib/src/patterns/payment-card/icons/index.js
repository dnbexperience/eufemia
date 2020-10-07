import React from 'react'

import BankAxept from './BankAxept'
import DNB from './DNB'
import DNBMetalic from './DNBMetalic'
import Expired from './Clock'
import Blocked from './Padlock'
import MastercardDefault from './MastercardDefault'
import MastercardMetalic from './MastercardMetalic'
// import MastercardMetalicBlack from './MastercardMetalicBlack'
import MCBlack from './MCBlack'
import PB from './PB'
import PBPlatinum from './PBPlatinum'
import SagaGold from './SagaGold'
import SagaPlatinum from './SagaPlatinum'
import SagaVisaPlatinum from './SagaVisaPlatinum'
import VisaDefault from './VisaDefault'
import VisaMetalic from './VisaMetalic'

const BankLogo = ({ logoType, height }) =>
  logoType.cata({
    Colored: (color) => (
      <DNB
        height={height}
        fill={color}
        className="dnb-payment-card__card__bank-logo"
      />
    ),
    Metalic: () => (
      <DNBMetalic
        height={height}
        className="dnb-payment-card__card__bank-logo"
      />
    )
  })

const ProductLogo = ({ productType, cardDesign }) => {
  const id = 'dnb-payment-card__card__product-type'
  return productType.cata({
    BankAxept: () =>
      cardDesign.bankAxept.cata({
        White: () => <BankAxept className={id} fill="#ffffff" />,
        Black: () => <BankAxept className={id} fill="#757575" />
      }),
    Saga: () =>
      cardDesign.saga.cata({
        Gold: () => <SagaGold className={id} />,
        Platinum: () => <SagaPlatinum className={id} />,
        VisaPlatinum: () => <SagaVisaPlatinum className={id} />,
        None: () => null
      }),
    PrivateBanking: () =>
      cardDesign.privateBanking.cata({
        Default: () => <PB className={id} />,
        Platinum: () => <PBPlatinum className={id} />,
        None: () => null
      }),
    None: () => null
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
        Metalic: () => <VisaMetalic className={id} />
      }),
    Mastercard: () =>
      cardDesign.mastercard.cata({
        Default: () => <MastercardDefault className={id} />,
        DefaultWhite: () => (
          <MastercardDefault className={id} textFill="#ffffff" />
        ),
        Metalic: () => <MastercardMetalic className={id} />,
        // ! Some gradient color pros are nott correct when using jsx component so using img instead
        BlackMetalic: () => (
          <MCBlack className={id} />
          // <img src={MCBlack} alt="Mastercard Black" className={id} />
        ) // <MastercardMetalicBlack className={id} />
      }),
    None: () => null
  })
}

export { BankLogo, ProductLogo, StatusIcon, TypeLogo }
