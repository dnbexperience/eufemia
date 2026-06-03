import { useContext } from 'react'
import { clsx } from 'clsx'
import Button from '../button/Button'
import Icon from '../icon/Icon'
import { arrow_down, arrow_up } from '../../icons'
import { TableThContext } from './TableThContext'

const sortIcon = Icon.transition({ asc: arrow_down, desc: arrow_up })

export default function TableSortButton({ className = null, ...props }) {
  const thContext = useContext(TableThContext)

  return (
    <Button
      className={clsx('dnb-table__sort-button', className)}
      variant="tertiary"
      icon={sortIcon}
      transitionState={thContext?.reversed ? 'desc' : 'asc'}
      wrap
      {...props}
    />
  )
}
