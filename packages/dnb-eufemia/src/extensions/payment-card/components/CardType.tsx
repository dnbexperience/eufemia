import React from 'react'
import classnames from 'classnames'
import { createSkeletonClass } from '../../../components/skeleton/SkeletonHelper'
import P from '../../../elements/P'

interface CardTypeTextProps {
  isCredit: boolean
  skeleton: boolean
}

const CardTypeText = ({ isCredit, skeleton }: CardTypeTextProps) => {
  const cardType = isCredit ? 'Credit' : 'Debit'
  return (
    <span
      className={classnames(
        'dnb-payment-card__card__element--wrapper',
        createSkeletonClass('font', skeleton)
      )}
    >
      <P className={'dnb-payment-card__card__type-text'}>{cardType}</P>
    </span>
  )
}

export default CardTypeText
