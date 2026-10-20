import { clsx } from 'clsx'
import Flex from '../flex/Flex'
import type { StackProps } from '../flex/Stack'
import Theme from '../../shared/Theme'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type CardOverlayProps = StackProps & {
  /** Add a transparent-to-dark gradient behind the content. Defaults to true. */
  gradient?: boolean
  /** Add progressive backdrop blur behind the content. Defaults to true. */
  blur?: boolean
}

function CardOverlay({
  className,
  gradient = true,
  blur = true,
  children,
  ...rest
}: CardOverlayProps) {
  return (
    <Theme.Context surface="dark">
      <Flex.Stack
        layoutEngine="css"
        gap="small"
        innerSpace={{ small: 'small', medium: 'large', large: 'large' }}
        {...rest}
        className={clsx(
          'dnb-card__overlay',
          gradient && 'dnb-card__overlay--gradient',
          className
        )}
      >
        {blur && (
          <div className="dnb-card__overlay-blur" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        )}
        {children}
      </Flex.Stack>
    </Theme.Context>
  )
}

withComponentMarkers(CardOverlay, { _supportsSpacingProps: true })

export default CardOverlay
