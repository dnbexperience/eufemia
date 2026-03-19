import React from 'react'
import classnames from 'classnames'
import Card, { Props as CardProps } from '../card/Card'
import ScrollView, {
  ScrollViewAllProps,
} from '../../fragments/scroll-view/ScrollView'

import type { SpacingProps } from '../../shared/types'

export type ListCardProps = CardProps

function ListCard(props: ListCardProps) {
  const { className, children, ...rest } = props

  return (
    <Card
      stack
      className={classnames('dnb-list__card', className)}
      {...rest}
    >
      {children}
    </Card>
  )
}

ListCard._supportsSpacingProps = true

export type ListCardScrollViewProps = {
  children: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
  SpacingProps &
  ScrollViewAllProps

function ListCardScrollView(props: ListCardScrollViewProps) {
  const { className, children, ...rest } = props

  return (
    <ScrollView
      className={classnames(
        'dnb-list__card__scroll-view',
        'dnb-list--inset-outline',
        className
      )}
      interactive="auto"
      {...rest}
    >
      {children}
    </ScrollView>
  )
}

ListCardScrollView._supportsSpacingProps = true

ListCard.ScrollView = ListCardScrollView

export default ListCard
