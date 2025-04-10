import React from "react";
import classnames from "classnames";
import { createSkeletonClass } from "../../../components/skeleton/SkeletonHelper";
import P from "../../../elements/P";

interface CardNumberTextProps {
  cardNumber: string;
  skeleton: boolean;
}

const CardNumberText = ({cardNumber, skeleton}: CardNumberTextProps) => {
  return (
    <span className={classnames(
      'dnb-payment-card__card__wrapper', createSkeletonClass('font', skeleton))}>
      <P className="dnb-payment-card__card__numbers">{cardNumber}</P>
    </span>
  )
}

const formatCardNumberRegex = /(?=(?:....)*$)/g

export const formatCardNumber = (cardNumber:string, digits:number = 8) => {
  if (!cardNumber) {
    return cardNumber
  }
  if (digits && digits <= cardNumber.length) {
    return cardNumber
      .slice(cardNumber.length - digits, cardNumber.length)
      .replace(formatCardNumberRegex, ' ')
      .trim()
  }
  return cardNumber.replace(formatCardNumberRegex, ' ').trim()
}

export default CardNumberText;