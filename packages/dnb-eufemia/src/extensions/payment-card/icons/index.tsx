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
import {
  ProductType,
  PaymentCardCardStatus,
  PaymentType,
  CardProvider,
  BankLogoType,
} from '../types'

type BankLogoProps = {
  type?: BankLogoType
  color?: string
}

function BankLogo({ type, color }: BankLogoProps) {
  switch (type) {
    case 'DNB':
      return (
        <DNB fill={color} className="dnb-payment-card__card__bank-logo" />
      )

    case 'sbanken':
      return (
        <Sbanken
          fill={color}
          className="dnb-payment-card__card__bank-logo"
        />
      )
    default:
      return null
  }
}

type ProductLogoProps = {
  type?: ProductType
  color?: string
}

function ProductLogo({ type, color }: ProductLogoProps) {
  const props = {
    className: 'dnb-payment-card__card__product-type',
    color,
  }

  switch (type) {
    case 'SagaGold':
      return <SagaGold {...props} />
    case 'SagaPlatinum':
      return <SagaPlatinum {...props} />
    case 'Pluss':
      return <Pluss {...props} />
    case 'Intro':
      return <Intro {...props} />
    case 'Business':
      return <Business {...props} />
    case 'Bedrift':
      return <Bedrift {...props} />
    case 'PrivateBanking':
      return <PB {...props} />
    default:
      return null
  }
}

type PaymentTypeProps = {
  type: PaymentType
  color?: string
}

const PaymentTypeLogo = ({ type, color }: PaymentTypeProps) => {
  switch (type) {
    case 'BankAxept':
      return (
        <BankAxept
          className="dnb-payment-card__card__bank-axept"
          fill={color}
        />
      )
    case 'Credit':
      return (
        <Credit className="dnb-payment-card__card__credit" fill={color} />
      )
    default:
      return null
  }
}

const StatusIcon = ({ status }: { status: PaymentCardCardStatus }) => {
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

const CardProviderLogo = ({
  type,
  color,
}: {
  type: CardProvider
  color?: string
}) => {
  const id = 'dnb-payment-card__card__credit-type'

  switch (type) {
    case 'Mastercard':
      return <MastercardDefault className={id} />

    case 'MastercardDark':
      return <MastercardDark className={id} />

    case 'Visa':
      return <VisaDefault className={id} fill={color} />

    case 'VisaPlatinum':
      return <VisaPlatinum className={id} fill={color} />

    default:
      return null
  }
}

export {
  BankLogo,
  ProductLogo,
  StatusIcon,
  CardProviderLogo,
  PaymentTypeLogo,
}
