import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListBaseValueComponents(props) {
  const edges = regularMdxNodes.filter(
    ({ fields, frontmatter }) =>
      fields.slug.startsWith('uilib/extensions/forms/Value/') &&
      frontmatter.componentType?.includes('base')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
