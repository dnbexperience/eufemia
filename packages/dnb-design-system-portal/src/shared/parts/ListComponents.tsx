import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getComponents } from './listEdges'

export default function ListComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getComponents(regularMdxNodes)}
      {...props}
    />
  )
}
