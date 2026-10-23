import { useMemo } from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import TableOfContentItem from './TableOfContentItem'
import TableOfContentNavigation from './TableOfContentNavigation'
import { buildTocTree, itemsToRender } from './tableOfContentTree'
import type { TocNode } from './tableOfContentTree'
import type { TableOfContentDataProps } from './types'

export default function TableOfContentData({
  data,
  maxDepth = 2,
  ...props
}: TableOfContentDataProps) {
  const tree = useMemo(
    () => buildTocTree(data, maxDepth),
    [data, maxDepth]
  )

  const renderItems = (nodes: TocNode[]) =>
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
    >
      {renderItems(tree)}
    </TableOfContentNavigation>
  )
}

withComponentMarkers(TableOfContentData, { _supportsSpacingProps: true })
