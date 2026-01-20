import React from 'react'
import clsx from 'clsx'
import { createSkeletonClass } from '../../../components/skeleton/SkeletonHelper'
import P from '../../../elements/P'

interface CardTypeTextProps {
  isCredit: boolean
  skeleton: boolean
}

const CardTypeText: React.FC<CardTypeTextProps> = ({
  isCredit,
  skeleton,
}) => {
  const cardType = isCredit ? 'Credit' : 'Debit'
  return (
    <span
      className={clsx(
        'dnb-payment-card__card__element--wrapper',
        createSkeletonClass('font', skeleton)
      )}
    >
      <P className={'dnb-payment-card__card__type-text'}>{cardType}</P>
    </span>
  )
}

export default CardTypeText
