import { useMemo } from 'react'
import TableOfContentItem from './TableOfContentItem'
import TableOfContentNavigation from './TableOfContentNavigation'
import { buildTocTree, itemsToRender } from './tableOfContentTree'
import type { TableOfContentNode } from './tableOfContentTree'
import type { TableOfContentDataProps } from './types'

export default function TableOfContentData({
  data,
  maxDepth = 2,
  includeH1 = false,
  ...props
}: TableOfContentDataProps) {
  const tree = useMemo(
    () => buildTocTree(data, maxDepth, includeH1),
    [data, maxDepth, includeH1]
  )

  const renderItems = (nodes: TableOfContentNode[]) =>
    itemsToRender(nodes).map((item) => (
      <TableOfContentItem key={item.id} id={item.id} text={item.text}>
        {renderItems(item.subTree)}
      </TableOfContentItem>
    ))

  return (
    <TableOfContentNavigation
      {...props}
      sections={data}
      maxDepth={maxDepth}
      includeH1={includeH1}
    >
      {renderItems(tree)}
    </TableOfContentNavigation>
  )
}
