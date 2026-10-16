import { clsx } from 'clsx'
import Card from './CardInner'
import type { CardProps } from './CardInner'
import CardAction from './CardAction'
import type { CardActionProps } from './CardAction'
import CardCloseButton from './CardCloseButton'
import CardMediaButton from './CardMediaButton'
import CardOverlay from './CardOverlay'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { removeUndefinedProps } from '../../shared/component-helper'

export type CardInfoProps =
  | (Omit<CardProps, 'onClick'> & {
      onClick?: never
      href?: never
      to?: never
    })
  | (CardActionProps & { onClose?: never; closeButtonProps?: never })

const defaults = {
  responsive: false,
  dropShadow: true,
  stack: true,
  gap: 'small',
  innerSpace: { small: 'small', medium: 'medium', large: 'medium' },
} satisfies Partial<CardProps>

function isAction(props: CardInfoProps): props is CardActionProps {
  return Boolean(props.href || props.to || props.onClick)
}

function CardInfo(props: CardInfoProps) {
  const className = clsx('dnb-card-info', props.className)
  const cardProps: CardInfoProps = removeUndefinedProps({ ...props })

  if (isAction(cardProps)) {
    return (
      <CardAction {...defaults} {...cardProps} className={className} />
    )
  }

  return <Card {...defaults} {...cardProps} className={className} />
}

withComponentMarkers(CardInfo, { _supportsSpacingProps: true })

export default Object.assign(CardInfo, {
  CloseButton: CardCloseButton,
  MediaButton: CardMediaButton,
  Overlay: CardOverlay,
})
