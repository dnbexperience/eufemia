import React from 'react'
import classnames from 'classnames'
import { StatusIcon } from '../icons'
import P from '../../../elements/P'

export interface Translations {
  textBlocked: string
  textExpired: string
  textNotActive: string
  textNewOrder: string
  textOrderInProcess: string
  textReplaced: string
  textRenewed: string
  textNew: string
  textUnknown: string
}

interface StatusOverlayProps {
  cardStatus: string
  translations: Translations
  cardDesign: string
}

const StatusOverlay = ({
  cardStatus,
  translations,
  cardDesign,
}: StatusOverlayProps) => {
  const cardStatusMap: Record<string, string> = {
    notActive: translations.textNotActive,
    newOrder: translations.textNewOrder,
    orderInProcess: translations.textOrderInProcess,
    renewed: translations.textRenewed,
    replaced: translations.textReplaced,
    blocked: translations.textBlocked,
    expired: translations.textExpired,
    new: translations.textNew,
    unknown: translations.textUnknown,
  }

  const cardStatusOverlayThemeMap: Record<string, string> = {
    'card--design-default': 'light',
    'card--design-business-no-visa': 'light',
    'card--design-business-with-visa': 'light',
    'card--design-ung': 'light',
    'card--design-youth': 'light',
    'card--design-my-first': 'light',
    'card--design-sbanken-visa': 'light',
    'card--design-pluss': 'dark',
    'card--design-gold': 'dark',
    'card--design-saga': 'dark',
    'card--design-saga-platinum': 'dark',
    'card--design-private': 'dark',
    'card--design-black': 'dark',
    'card--design-sbanken-mastercard': 'dark',
  }

  return cardStatusMap[cardStatus] ? (
    <div className="dnb-payment-card__overlay">
      <div
        className={classnames(
          'dnb-payment-card__overlay__content',
          `dnb-payment-card__overlay__content--${cardStatusOverlayThemeMap[cardDesign]}`
        )}
      >
        <StatusIcon status={cardStatus} />
        <P>{cardStatusMap[cardStatus]}</P>
      </div>
    </div>
  ) : null
}

export const isCardBlocked = (cardStatus: string): boolean => {
  const cardStatusMap: Record<string, boolean> = {
    notActive: true,
    newOrder: false,
    orderInProcess: false,
    renewed: false,
    replaced: false,
    blocked: true,
    expired: true,
    new: false,
    unknown: false,
  }

  return cardStatusMap[cardStatus]
}

export default StatusOverlay
