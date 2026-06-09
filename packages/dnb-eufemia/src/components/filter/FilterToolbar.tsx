import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import Flex from '../flex/Flex'

export type FilterToolbarProps = {
  className?: string
  children?: ReactNode
}

function FilterToolbar({ className, children }: FilterToolbarProps) {
  return (
    <div className={clsx('dnb-filter__toolbar', className)}>
      {children}
    </div>
  )
}

export type FilterToolbarActionsProps = {
  className?: string
  children?: ReactNode
}

function FilterToolbarActions({
  className,
  children,
}: FilterToolbarActionsProps) {
  return (
    <Flex.Horizontal
      gap="small"
      align="center"
      className={clsx('dnb-filter__toolbar-actions', className)}
    >
      {children}
    </Flex.Horizontal>
  )
}

FilterToolbar.Actions = FilterToolbarActions

export default FilterToolbar
