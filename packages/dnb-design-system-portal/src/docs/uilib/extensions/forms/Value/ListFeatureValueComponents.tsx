import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListFeatureValueComponents(props) {
  const edges = regularMdxNodes.filter(
    ({ fields, frontmatter }) =>
      fields.slug.startsWith('uilib/extensions/forms/Value/') &&
      frontmatter.componentType?.includes('feature')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
