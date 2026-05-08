import clsx from 'clsx'
import type { CardProps } from '../card/Card'
import Card from '../card/Card'

export type ListCardProps = CardProps

function ListCard(props: ListCardProps) {
  const { className, children, ...rest } = props

  return (
    <Card stack className={clsx('dnb-list__card', className)} {...rest}>
      {children}
    </Card>
  )
}

ListCard._supportsSpacingProps = true

export default ListCard
