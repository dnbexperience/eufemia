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

type CardInfoDefaultProps = {
  /**
   * Define if the card should behave responsive. Defaults to `false`.
   */
  responsive?: boolean

  /**
   * Define if the Card should have drop shadow. Uses Section `dropShadow`. Defaults to `true`.
   */
  dropShadow?: CardProps['dropShadow']

  /**
   * True to stack the sub components with space between. Defaults to `true`.
   */
  stack?: boolean

  /**
   * How much space between the sub components. Use `false` for no space. Defaults to `small`.
   */
  gap?: CardProps['gap']

  /**
   * The space inside the card. Defaults to `small` on small screens and `medium` on larger screens.
   */
  innerSpace?: CardProps['innerSpace']
}

export type CardInfoProps = (
  | (Omit<CardProps, 'onClick' | keyof CardInfoDefaultProps> & {
      onClick?: never
      href?: never
      to?: never
    })
  | Omit<CardActionProps, keyof CardInfoDefaultProps>
) &
  CardInfoDefaultProps

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
