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
  CardDesign,
  LogoType,
  ProductType,
  BankAxeptType,
  CardStatus,
  CardTypeDesign,
} from '../types'

type BankLogoProps = {
  logoType?: LogoType
  color?: string
  height?: string
}

function BankLogo({ logoType, color, height }: BankLogoProps) {
  switch (logoType) {
    case 'DNB':
      return (
        <DNB
          height={height}
          fill={color}
          className="dnb-payment-card__card__bank-logo"
        />
      )

    case 'sbanken':
      return (
        <Sbanken
          height={height}
          fill={color}
          className="dnb-payment-card__card__bank-logo"
        />
      )
  }
}

type ProductLogoProps = {
  productType: ProductType
  cardDesign: CardDesign
}

function ProductLogo({ productType, cardDesign }: ProductLogoProps) {
  const classname = 'dnb-payment-card__card__product-type'

  switch (productType) {
    case 'Saga':
      switch (cardDesign) {
        case 'SagaGold':
          return <SagaGold className={classname} />
        case 'SagaPlatinum':
          return <SagaPlatinum className={classname} />
        case 'None':
        default:
          return null
      }
    case 'Pluss':
      return <Pluss className={classname} />
    case 'Intro':
      return <Intro className={classname} />
    case 'Business':
      return <Business className={classname} />
    case 'Bedrift':
      return <Bedrift className={classname} />
    case 'PrivateBanking':
      return cardDesign !== 'None' ? <PB className={classname} /> : null
    case 'None':
    default:
      return null
  }
}

type BankAxeptProps = {
  bankAxept: BankAxeptType
}

const BankAxeptLogo = ({ bankAxept }: BankAxeptProps) => {
  const classname = 'dnb-payment-card__card__bank-axept'

  switch (bankAxept) {
    case 'BankAxeptWhite':
      return <BankAxept className={classname} fill="#ffffff" />
    case 'BankAxeptBlack20':
      return <BankAxept className={classname} fill="#cccccc" />
    case 'BankAxeptGray':
      return <BankAxept className={classname} fill="#b2b4b3" />
    case 'BankAxeptGrayDark':
      return <BankAxept className={classname} fill="#55565A" />
    case 'BankAxeptBlack':
      return <BankAxept className={classname} fill="#333333" />
    case 'BankAxeptGold':
      return <BankAxept className={classname} fill="#BFA970" />
    case 'Credit':
      return (
        <Credit className="dnb-payment-card__card__credit" fill="#fff" />
      )
    case 'None':
    default:
      return null
  }
}

const StatusIcon = ({ status }: { status: CardStatus }) => {
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
  cardTypeDesign,
  color,
}: {
  cardTypeDesign: CardTypeDesign
  color?: string
}) => {
  const id = 'dnb-payment-card__card__credit-type'

  switch (cardTypeDesign) {
    case 'VisaColored':
      return <VisaDefault className={id} fill={color} />
    case 'VisaPlatinum':
      return <VisaPlatinum className={id} />
    case 'MastercardDefault':
      return <MastercardDefault className={id} />
    case 'MastercardDark':
      return <MastercardDark className={id} />
    case 'None':
      return null
  }
}

export {
  BankLogo,
  ProductLogo,
  StatusIcon,
  CardProviderLogo,
  BankAxeptLogo,
}
