import React from 'react'

import {
  refresh_medium as Refresh,
  clock_medium as Expired,
  email_medium as Envelope,
  padlock_medium as Blocked,
  question_medium as QuestionMark,
  shopping_cart_medium as Cart,
  confetti_medium as Confetti,
  stop_medium as Stop,
  reset_medium as Reset,
} from '../../../../icons'

const statusIconMap = {
  renewed: { Icon: Reset, className: 'icon--fill' },
  replaced: { Icon: Refresh, className: 'icon--fill' },
  new: { Icon: Confetti, className: 'icon--fill' },
  expired: { Icon: Expired, className: 'icon--stroke' },
  notActive: { Icon: Stop, className: 'icon--stroke' },
  blocked: { Icon: Blocked, className: 'icon--stroke' },
  newOrder: { Icon: Cart, className: 'icon--stroke' },
  orderInProcess: { Icon: Envelope, className: 'icon--stroke' },
  unknown: { Icon: QuestionMark, className: 'icon--stroke' },
}

type StatusKey = keyof typeof statusIconMap

export const StatusIcon = ({ status }: { status: string }) => {
  const entry = statusIconMap[status as StatusKey]
  if (!entry) {
    return null
  }
  const { Icon, className } = entry
  return <Icon className={className} />
}
