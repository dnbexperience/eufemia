import {
  Expired,
  CardInactive,
  Blocked,
  Hourglass,
  QuestionMark,
} from '../../icons'
import { PaymentCardStatus } from '../../types'

export type StatusIconProps = {
  status: PaymentCardStatus
}

const StatusIcon = ({ status }: StatusIconProps) => {
  switch (status) {
    case 'expired':
      return <Expired />

    case 'not_active':
      return <CardInactive />

    case 'blocked':
      return <Blocked />

    case 'order_in_process':
      return <Hourglass />

    case 'renewed':
      return <CardInactive />

    case 'replaced':
      return <CardInactive />

    case 'unknown':
      return <QuestionMark />

    case 'active':
    default:
      return null
  }
}

export default StatusIcon
