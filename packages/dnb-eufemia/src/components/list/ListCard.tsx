import { clsx } from 'clsx'
import type { CardProps } from '../card/Card'
import Card from '../card/Card'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ListCardProps = CardProps

function ListCard(props: ListCardProps) {
  const { className, children, ...rest } = props

  return (
    <Card stack className={clsx('dnb-list__card', className)} {...rest}>
      {children}
    </Card>
  )
}

withComponentMarkers(ListCard, {
  _supportsSpacingProps: true,
})

export default ListCard
