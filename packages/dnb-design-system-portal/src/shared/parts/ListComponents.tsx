import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getComponents } from './listEdges'
import { excludedSlugs } from './componentCategories'

export default function ListComponents(props) {
  const visibleComponents = getComponents(regularMdxNodes).filter(
    (node) => !excludedSlugs.has(node.fields.slug)
  )

  return (
    <ListSummaryFromEdges edges={visibleComponents} {...props} />
  )
}
