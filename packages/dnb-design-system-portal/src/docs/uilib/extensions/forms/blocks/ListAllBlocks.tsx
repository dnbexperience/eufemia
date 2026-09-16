import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getAllBlocks } from '../../../../../shared/parts/listEdges'

export default function ListAllBlocks(props) {
  return (
    <ListSummaryFromEdges
      edges={getAllBlocks(regularMdxNodes)}
      {...props}
    />
  )
}
