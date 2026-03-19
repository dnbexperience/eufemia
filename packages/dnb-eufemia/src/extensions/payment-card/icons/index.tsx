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
import { StatusIcon } from './status'

// Daggy tagged sum type - these values have a .cata() method at runtime
// but Types.d.ts doesn't declare .cata() on the types, so we use any here
type DaggyType = any
type DaggyDesign = Record<string, any>

const BankLogo = ({ logoType }: { logoType: DaggyType }) =>
  logoType.cata({
    Colored: (color: string) => (
      <DNB fill={color} className="dnb-payment-card__card__bank-logo" />
    ),
    Sbanken: (color: string) => (
      <Sbanken
        fill={color}
        className="dnb-payment-card__card__bank-logo"
      />
    ),
  })

const ProductLogo = ({
  productType,
  cardDesign,
}: {
  productType: DaggyType
  cardDesign: DaggyDesign
}) => {
  const id = 'dnb-payment-card__card__product-type'
  return productType.cata({
    Saga: (): React.ReactNode =>
      cardDesign.saga.cata({
        Gold: (): React.ReactNode => <SagaGold className={id} />,
        Platinum: (): React.ReactNode => <SagaPlatinum className={id} />,
        None: (): React.ReactNode => null,
      }),
    Pluss: (): React.ReactNode => <Pluss className={id} />,
    Intro: (): React.ReactNode => <Intro className={id} />,
    Business: (): React.ReactNode => <Business className={id} />,
    Bedrift: (): React.ReactNode => <Bedrift className={id} />,
    Corporate: (): React.ReactNode => <Corporate className={id} />,
    WorldElite: (): React.ReactNode => <WorldElite className={id} />,
    PrivateBanking: (): React.ReactNode =>
      cardDesign.privateBanking.cata({
        Default: (): React.ReactNode => <PB className={id} />,
        None: (): React.ReactNode => null,
      }),
    None: (): React.ReactNode => null,
  })
}

const BankAxeptLogo = ({
  bankAxept,
  cardDesign,
}: {
  bankAxept: DaggyType
  cardDesign: DaggyDesign
}) => {
  const id = 'dnb-payment-card__card__bank-axept'
  return bankAxept.cata({
    BankAxept: (): React.ReactNode =>
      cardDesign.bankAxept.cata({
        White: (): React.ReactNode => (
          <BankAxept className={id} fill="#FFFFFF" />
        ),
        Black20: (): React.ReactNode => (
          <BankAxept className={id} fill="#CCCCCC" />
        ),
        Gray: (): React.ReactNode => (
          <BankAxept className={id} fill="#b2b4b3" />
        ),
        GrayDark: (): React.ReactNode => (
          <BankAxept className={id} fill="#55565A" />
        ),
        Black: (): React.ReactNode => (
          <BankAxept className={id} fill="#000000" />
        ),
        Gold: (): React.ReactNode => (
          <BankAxept className={id} fill="#CAAB51" />
        ),
      }),
    Credit: (): React.ReactNode => null,
    None: (): React.ReactNode => null,
  })
}

const TypeLogo = ({
  cardType,
  cardDesign,
}: {
  cardType: DaggyType
  cardDesign: DaggyDesign
}) => {
  const id = 'dnb-payment-card__card__credit-type'
  return cardType.cata({
    Visa: (): React.ReactNode =>
      cardDesign.visa.cata({
        Colored: (color: string) => (
          <VisaDefault className={id} fill={color} />
        ),
        Platinum: (): React.ReactNode => <VisaPlatinum className={id} />,
      }),
    Mastercard: (): React.ReactNode =>
      cardDesign.mastercard.cata({
        Default: (): React.ReactNode => (
          <MastercardDefault className={id} />
        ),
        Dark: (): React.ReactNode => <MastercardDark className={id} />,
      }),
    None: (): React.ReactNode => null,
  })
}

export { BankLogo, ProductLogo, StatusIcon, TypeLogo, BankAxeptLogo }
