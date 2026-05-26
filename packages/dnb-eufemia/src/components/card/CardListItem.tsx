import type { HTMLProps, ReactNode } from 'react'
import { clsx } from 'clsx'
import type { SpacingProps } from '../space/types'
import { useSpacing } from '../space/SpacingUtils'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type CardListItemProps = {
  /**
   * Center the content of the list item.
   * Use `true` to always center, or `"when-small"` to center only on small screens.
   */
  center?: boolean | 'when-small'
  children: ReactNode
} & SpacingProps &
  Omit<HTMLProps<HTMLLIElement>, 'children'>

function CardListItem(props: CardListItemProps) {
  const {
    children,
    className,
    center,
    top,
    right,
    bottom,
    left,
    space,
    ...rest
  } = props

  const params = useSpacing(
    { top, right, bottom, left, space },
    {
      ...rest,
      className: clsx(
        'dnb-card-list__item',
        center === true && 'dnb-card-list__item--center',
        center === 'when-small' &&
          'dnb-card-list__item--center-when-small',
        className
      ),
    }
  )

  return <li {...params}>{children}</li>
}

withComponentMarkers(CardListItem, { _supportsSpacingProps: true })

export default CardListItem
