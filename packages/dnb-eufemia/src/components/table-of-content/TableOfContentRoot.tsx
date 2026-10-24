import { Children, Fragment, isValidElement, useMemo } from 'react'
import type { ReactNode } from 'react'
import TableOfContentNavigation from './TableOfContentNavigation'
import type {
  TableOfContentItemProps,
  TableOfContentRootProps,
  TableOfContentSection,
} from './types'

function TableOfContentRoot({
  children,
  ...props
}: TableOfContentRootProps) {
  const sections = useMemo(() => readItems(children), [children])

  return (
    <TableOfContentNavigation {...props} sections={sections}>
      {children}
    </TableOfContentNavigation>
  )
}

function readItems(
  children: ReactNode,
  level = 2
): TableOfContentSection[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement<TableOfContentItemProps>(child)) {
      return []
    }
    if (child.type === Fragment) {
      return readItems(child.props.children, level)
    }
    const type = child.type as {
      _tableOfContentRole?: string
      type?: { _tableOfContentRole?: string }
    }
    if (
      (type._tableOfContentRole ?? type.type?._tableOfContentRole) !==
      'item'
    ) {
      return []
    }
    const { id, text, children: nested } = child.props
    return [{ id, text, level }, ...readItems(nested, level + 1)]
  })
}

export default TableOfContentRoot
