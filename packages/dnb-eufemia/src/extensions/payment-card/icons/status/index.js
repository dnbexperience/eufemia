import React from 'react'
import {
  refresh_medium as Refresh,
  clock_medium as Expired,
  email_medium as Envelope,
  padlock_medium as Blocked,
  question_medium as QuestionMark,
  shopping_cart_medium as Cart,
  confetti_medium as Confetti,
} from '../../../../icons'

const statusIconMap = {
  renewed: { Icon: Refresh, className: 'icon--fill' },
  replaced: { Icon: Refresh, className: 'icon--fill' },
  new: { Icon: Confetti, className: 'icon--fill' },
  expired: { Icon: Expired, className: 'icon--stroke' },
  notActive: { Icon: Expired, className: 'icon--stroke' },
  blocked: { Icon: Blocked, className: 'icon--stroke' },
  newOrder: { Icon: Cart, className: 'icon--stroke' },
  orderInProcess: { Icon: Envelope, className: 'icon--stroke' },
  unknown: { Icon: QuestionMark, className: 'icon--stroke' },
}

export const StatusIcon = ({ status }) => {
  const { Icon, className } = statusIconMap[status] || {}
  return Icon ? <Icon className={className} /> : null
}
