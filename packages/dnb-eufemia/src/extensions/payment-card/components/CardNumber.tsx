import React from 'react'
import clsx from 'clsx'
import { createSkeletonClass } from '../../../components/skeleton/SkeletonHelper'
import P from '../../../elements/P'

interface CardNumberTextProps {
  cardNumber: string
  skeleton: boolean
}

/**
 * A functional component that displays the text representation of a card number
 * with optional skeleton styling for loading states.
 *
 * @param {CardNumberTextProps} props - The properties for the CardNumberText component.
 * @param {string} props.cardNumber - The card number to display.
 * @param {boolean} props.skeleton - Determines if skeleton styling is applied for loading states.
 * @returns A span element containing the card number with optional skeleton styling.
 */
const CardNumberText = ({ cardNumber, skeleton }: CardNumberTextProps) => {
  return (
    <span
      className={clsx(
        'dnb-payment-card__card__element--wrapper',
        createSkeletonClass('font', skeleton)
      )}
    >
      <P className="dnb-payment-card__card__numbers">{cardNumber}</P>
    </span>
  )
}

const formatCardNumberRegex = /(?=(?:....)*$)/g

/**
 * Formats a credit card number by preserving a specified number of trailing digits and
 * masking the rest with spaces. If no specific number of digits is provided, the card
 * number is formatted by replacing all spaces or non-numeric characters with a single
 * space.
 *
 * @param {string} cardNumber - The credit card number to format.
 * @param [digits=8] - The number of trailing digits to preserve in the card number.
 *                              Defaults to 8 if not specified.
 * @returns {string} The formatted credit card number.
 */
export const formatCardNumber = (
  cardNumber: string,
  digits = 8
): string => {
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

export default CardNumberText
