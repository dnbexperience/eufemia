import Refresh from '../../../../icons/refresh_medium'
import Expired from '../../../../icons/clock_medium'
import Envelope from '../../../../icons/email_medium'
import Blocked from '../../../../icons/padlock_medium'
import QuestionMark from '../../../../icons/question_medium'
import Cart from '../../../../icons/shopping_cart_medium'
import Confetti from '../../../../icons/confetti_medium'
import Stop from '../../../../icons/stop_medium'
import Reset from '../../../../icons/reset_medium'

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
