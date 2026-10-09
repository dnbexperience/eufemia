import { Fragment, memo, useMemo } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Anchor from '../../components/Anchor'
import Table from '../../components/Table'
import { Th, Td, Tr } from '../../components/table/Table'
import { Code, H, Hr, Li, Ol, P, Ul } from '../../elements'
import type { HSize } from '../../elements/typography/H'
import AiCodeBlock from './AiCodeBlock'
import { parseBlocks } from './markdown/parseBlocks'
import type {
  Block,
  BlockWithSource,
  ListItem,
} from './markdown/parseBlocks'
import { parseInline } from './markdown/parseInline'
import type { Inline } from './markdown/parseInline'
import { sanitizeUrl } from './markdown/sanitizeUrl'
import type {
  AiResponseComponents,
  AiResponseElement,
  AiResponseProps,
} from './types'

type RenderContext = {
  get: (tag: AiResponseElement) => React.ElementType
  // Code inside a code block uses a plain element unless `code` is overridden
  blockCode: React.ElementType
  link: (href: string) => string | null
  image: (src: string) => string | null
}

const HEADING_SIZES: Record<number, HSize> = {
  1: 'large',
  2: 'medium',
  3: 'basis',
  4: 'basis',
  5: 'small',
  6: 'small',
}

const DefaultHeading = (level: number) => {
  const Heading = (props) => (
    <H element={`h${level}`} size={HEADING_SIZES[level]} {...props} />
  )
  Heading.displayName = `AiResponseH${level}`
  return Heading
}

const DefaultLink = ({ href, ...props }) => {
  const external = /^https?:\/\//.test(href)
  return (
    <Anchor
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    />
  )
}

function AiBlockquote({
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      className={clsx('dnb-ai-response__blockquote', className)}
    />
  )
}

const DEFAULT_COMPONENTS: Record<AiResponseElement, React.ElementType> = {
  p: P,
  h1: DefaultHeading(1),
  h2: DefaultHeading(2),
  h3: DefaultHeading(3),
  h4: DefaultHeading(4),
  h5: DefaultHeading(5),
  h6: DefaultHeading(6),
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: AiBlockquote,
  hr: Hr,
  pre: AiCodeBlock,
  code: Code,
  table: Table,
  thead: 'thead',
  tbody: 'tbody',
  tr: Tr,
  th: Th,
  td: Td,
  a: DefaultLink,
  img: 'img',
  strong: 'strong',
  em: 'em',
  del: 'del',
  br: 'br',
  input: 'input',
}

function AiResponse(props: AiResponseProps) {
  const {
    children = '',
    parseIncompleteMarkdown = true,
    components,
    allowedLinkPrefixes,
    allowedImagePrefixes,
    defaultOrigin,
    className,
    ...rest
  } = props

  const linkPrefixes = allowedLinkPrefixes?.join('\n')
  const imagePrefixes = allowedImagePrefixes?.join('\n')

  const context = useMemo<RenderContext>(
    () => ({
      get: (tag) => components?.[tag] ?? DEFAULT_COMPONENTS[tag],
      blockCode: components?.code ?? 'code',
      link: (href) =>
        sanitizeUrl(href, {
          allowedPrefixes: linkPrefixes?.split('\n'),
          defaultOrigin,
          protocols: ['mailto:', 'tel:'],
        }),
      image: (src) =>
        sanitizeUrl(src, {
          allowedPrefixes: imagePrefixes?.split('\n'),
          defaultOrigin,
        }),
    }),
    [components, linkPrefixes, imagePrefixes, defaultOrigin]
  )

  const blocks = useMemo(() => parseBlocks(children), [children])

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-response', 'dnb-spacing', className),
  })

  return (
    <div {...rootProps}>
      {blocks.map((block, index) => (
        <MemoBlock
          key={index}
          block={block}
          source={block.source}
          incomplete={
            parseIncompleteMarkdown && index === blocks.length - 1
          }
          context={context}
        />
      ))}
    </div>
  )
}

// Finished blocks keep their source, so they skip re-rendering while streaming
const MemoBlock = memo(
  function MemoBlock({
    block,
    incomplete,
    context,
  }: {
    block: BlockWithSource
    source: string
    incomplete: boolean
    context: RenderContext
  }) {
    return <>{renderBlock(block, incomplete, context)}</>
  },
  (prev, next) =>
    prev.source === next.source &&
    prev.incomplete === next.incomplete &&
    prev.context === next.context
)

function renderBlocks(
  blocks: Array<Block>,
  incomplete: boolean,
  context: RenderContext,
  tight = false
): ReactNode {
  return blocks.map((block, index) => (
    <Fragment key={index}>
      {renderBlock(
        block,
        incomplete && index === blocks.length - 1,
        context,
        tight
      )}
    </Fragment>
  ))
}

function renderBlock(
  block: Block,
  incomplete: boolean,
  context: RenderContext,
  tight = false
): ReactNode {
  const { get } = context
  const inline = (text: string) =>
    renderInline(parseInline(text, { incomplete }), context)

  switch (block.type) {
    case 'paragraph': {
      if (tight) {
        return inline(block.text)
      }
      const Paragraph = get('p')
      return <Paragraph>{inline(block.text)}</Paragraph>
    }

    case 'heading': {
      const Heading = get(`h${block.level}`)
      return <Heading>{inline(block.text)}</Heading>
    }

    case 'hr': {
      const Rule = get('hr')
      return <Rule />
    }

    case 'blockquote': {
      const Quote = get('blockquote')
      return (
        <Quote>{renderBlocks(block.children, incomplete, context)}</Quote>
      )
    }

    case 'code': {
      const Pre = get('pre')
      const CodeElement = context.blockCode
      return (
        <Pre code={block.value} language={block.lang}>
          <CodeElement
            className={block.lang ? `language-${block.lang}` : undefined}
          >
            {block.value}
          </CodeElement>
        </Pre>
      )
    }

    case 'list': {
      const List = get(block.ordered ? 'ol' : 'ul')
      const Item = get('li')
      return (
        <List
          {...(block.ordered &&
            block.start !== 1 && { start: block.start })}
        >
          {block.items.map((item, index) => (
            <Item
              key={index}
              className={
                item.checked !== null ? 'dnb-ai-response__task' : undefined
              }
            >
              {renderListItem(
                item,
                incomplete && index === block.items.length - 1,
                context,
                block.tight
              )}
            </Item>
          ))}
        </List>
      )
    }

    case 'table': {
      const TableElement = get('table')
      const Head = get('thead')
      const Body = get('tbody')
      const Row = get('tr')
      const HeaderCell = get('th')
      const Cell = get('td')
      const style = (index: number) =>
        block.align[index] ? { textAlign: block.align[index] } : undefined
      const isLastRow = (index: number) =>
        incomplete && index === block.rows.length - 1

      return (
        <Table.ScrollView>
          <TableElement>
            <Head>
              <Row>
                {block.header.map((cell, index) => (
                  <HeaderCell key={index} style={style(index)}>
                    {renderInline(parseInline(cell), context)}
                  </HeaderCell>
                ))}
              </Row>
            </Head>
            {block.rows.length > 0 && (
              <Body>
                {block.rows.map((row, rowIndex) => (
                  <Row key={rowIndex}>
                    {row.map((cell, index) => (
                      <Cell key={index} style={style(index)}>
                        {renderInline(
                          parseInline(cell, {
                            incomplete:
                              isLastRow(rowIndex) &&
                              index === row.length - 1,
                          }),
                          context
                        )}
                      </Cell>
                    ))}
                  </Row>
                ))}
              </Body>
            )}
          </TableElement>
        </Table.ScrollView>
      )
    }
  }
}

function renderListItem(
  item: ListItem,
  incomplete: boolean,
  context: RenderContext,
  tight: boolean
): ReactNode {
  if (item.checked === null) {
    return renderBlocks(item.children, incomplete, context, tight)
  }

  // The label gives the checkbox its accessible name
  const Checkbox = context.get('input')
  const [first, ...rest] = item.children
  const isLabel = first?.type === 'paragraph'

  return (
    <>
      <label>
        <Checkbox
          type="checkbox"
          checked={item.checked}
          disabled
          readOnly
        />
        {isLabel &&
          renderBlock(
            first,
            incomplete && rest.length === 0,
            context,
            true
          )}
      </label>
      {renderBlocks(
        isLabel ? rest : item.children,
        incomplete,
        context,
        tight
      )}
    </>
  )
}

function renderInline(
  nodes: Array<Inline>,
  context: RenderContext
): ReactNode {
  const { get } = context

  return nodes.map((node, index) => {
    switch (node.type) {
      case 'text':
        return node.value

      case 'br': {
        const Break = get('br')
        return <Break key={index} />
      }

      case 'code': {
        const CodeElement = get('code')
        return <CodeElement key={index}>{node.value}</CodeElement>
      }

      case 'strong':
      case 'em':
      case 'del': {
        const Element = get(node.type)
        return (
          <Element key={index}>
            {renderInline(node.children, context)}
          </Element>
        )
      }

      case 'link': {
        const href = context.link(node.href)
        const children = renderInline(node.children, context)
        if (!href) {
          return <Fragment key={index}>{children}</Fragment>
        }
        const Link = get('a')
        return (
          <Link key={index} href={href} title={node.title}>
            {children}
          </Link>
        )
      }

      case 'image': {
        const src = context.image(node.src)
        if (!src) {
          return node.alt
        }
        const Image = get('img')
        return (
          <Image key={index} src={src} alt={node.alt} title={node.title} />
        )
      }
    }
  })
}

export default AiResponse

export type { AiResponseComponents }
