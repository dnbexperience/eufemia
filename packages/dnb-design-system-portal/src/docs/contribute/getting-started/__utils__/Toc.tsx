import { tableOfContentsNodes } from 'virtual:portal-toc'
import TableOfContents from '../../../../shared/parts/TableOfContents'

const Toc = () => {
  const edges = tableOfContentsNodes
    .filter(({ fields }) =>
      fields.slug.startsWith('contribute/getting-started/')
    )
    .map((node) => ({ node }))

  return <TableOfContents edges={edges} />
}

export default Toc
