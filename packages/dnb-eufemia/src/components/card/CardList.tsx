import type { HTMLProps, ReactNode } from 'react'
import { clsx } from 'clsx'
import type { SpacingProps } from '../space/types'
import { useSpacing } from '../space/SpacingUtils'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type CardListProps = {
  children: ReactNode
} & SpacingProps &
  Omit<HTMLProps<HTMLUListElement>, 'children'>

function CardList(props: CardListProps) {
  const { children, className, top, right, bottom, left, space, ...rest } =
    props

  const params = useSpacing(
    { top, right, bottom, left, space },
    { ...rest, className: clsx('dnb-card-list', className) }
  )

  return <ul {...params}>{children}</ul>
}

withComponentMarkers(CardList, { _supportsSpacingProps: true })

export default CardList
