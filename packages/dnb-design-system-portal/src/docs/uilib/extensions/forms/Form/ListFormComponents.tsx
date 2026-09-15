import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListFormComponents(props) {
  const edges = regularMdxNodes.filter(
    ({ fields, frontmatter }) =>
      fields.slug.startsWith('uilib/extensions/forms/Form/') &&
      frontmatter.componentType !== 'docs'
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
