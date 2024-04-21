import classnames from 'classnames'
import { createSkeletonClass } from '../../../components/skeleton/SkeletonHelper'
import { CardTextTranslations, PaymentCardStatus } from '../types'
import { StatusIcon } from './iconComponents'
import { P } from '../../../elements'

type StatusOverlayProps = {
  cardStatus: PaymentCardStatus
  translations: CardTextTranslations
  skeleton?: boolean
}

const BlockingOverlay = ({ cardStatus, text }, skeleton) => {
  return (
    <div
      className={classnames(
        'dnb-payment-card__blocking__overlay',
        createSkeletonClass('font', skeleton)
      )}
    >
      <div className="dnb-payment-card__blocking__center">
        <StatusIcon status={cardStatus} />
        <P top="xx-small">{text}</P>
      </div>
    </div>
  )
}

const StatusOverlay = ({
  cardStatus,
  translations,
}: StatusOverlayProps) => {
  const cardStatusMap = {
    not_active: translations.text_not_active,
    order_in_process: translations.text_order_in_process,
    renewed: translations.text_renewed,
    replaced: translations.text_replaced,
    blocked: translations.text_blocked,
    expired: translations.text_expired,
    unknown: translations.text_unknown,
  }

  return cardStatusMap[cardStatus] ? (
    <BlockingOverlay
      cardStatus={cardStatus}
      text={cardStatusMap[cardStatus]}
    />
  ) : null
}

export { StatusOverlay, BlockingOverlay }
