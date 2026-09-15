import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListComponents(props) {
  const edges = regularMdxNodes.filter(({ fields, frontmatter }) => {
    const isFragment =
      fields.slug === 'uilib/components/fragments' ||
      fields.slug.startsWith('uilib/components/fragments/')

    return (
      fields.slug.startsWith('uilib/components/') &&
      !isFragment &&
      frontmatter.hideInMenu !== true
    )
  })

  return <ListSummaryFromEdges edges={edges} {...props} />
}
