import { useContext } from 'react'
import { clsx } from 'clsx'
import Button from '../button/Button'
import type { ButtonProps } from '../button/Button'
import Context from '../../shared/Context'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type CardCloseButtonProps = Omit<ButtonProps, 'href' | 'type'>

/** Optional Card child. The application controls dismissal and focus. */
function CardCloseButton(props: CardCloseButtonProps) {
  const context = useContext(Context)
  const {
    className,
    title = context.getTranslation(props).Card.closeTitle,
    ...rest
  } = props

  return (
    <Button
      variant="tertiary"
      size="small"
      bounding
      icon="close"
      title={title}
      space={0}
      {...rest}
      className={clsx('dnb-card__close-button', className)}
      type="button"
    />
  )
}

withComponentMarkers(CardCloseButton, {
  _supportsSpacingProps: true,
  _cardControl: 'close',
})

export default CardCloseButton
