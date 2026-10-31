import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getFeatureValueComponents } from '../../../../../shared/parts/listEdges'

export default function ListFeatureValueComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getFeatureValueComponents(regularMdxNodes)}
      {...props}
    />
  )
}
