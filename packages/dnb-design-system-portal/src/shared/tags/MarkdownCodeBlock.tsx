import type { ReactElement } from 'react'
import CodeBlock, { type CodeSectionProps } from './CodeBlock'

export default function MarkdownCodeBlock({
  children,
}: {
  children: ReactElement<CodeSectionProps>
}) {
  return <CodeBlock {...children.props} />
}
