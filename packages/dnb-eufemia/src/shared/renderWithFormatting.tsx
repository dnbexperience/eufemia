import React, { Fragment } from 'react'
import Anchor from '../components/Anchor'
import CodeEl from '../elements/Code'

export type FormatOptions = {
  br?: string
  strong?: (c: React.ReactNode) => React.ReactNode
  em?: (c: React.ReactNode) => React.ReactNode
  link?: (c: React.ReactNode, href: string) => React.ReactNode
  code?: (c: React.ReactNode) => React.ReactNode
}

type Nodes = React.ReactNode[]

const Strong = (c) => <strong>{c}</strong>
const Em = (c) => <em>{c}</em>
const Code = (c) => <CodeEl>{c}</CodeEl>
const Link = (c, href) => (
  <Anchor href={href} rel="noopener noreferrer">
    {c}
  </Anchor>
)

export default function renderWithFormatting(
  text: string | Nodes,
  {
    br = '{br}',
    strong = Strong,
    em = Em,
    link = Link,
    code = Code,
  }: FormatOptions = {}
): React.ReactNode {
  return withFormatting(text, { strong, em, br, link, code })
}

function withFormatting(
  text: string | Nodes,
  {
    br,
    strong,
    em,
    link,
    code,
  }: Required<
    Pick<FormatOptions, 'strong' | 'em' | 'br' | 'link' | 'code'>
  >
): React.ReactNode {
  let nodes: Nodes = Array.isArray(text) ? text : [text]

  // {br}
  nodes = splitToken(nodes, br, ({ k }) => <br key={k()} />)

  // `inline code` — prevent further formatting inside code
  const codeRe = /(`[^`]+`)/g
  nodes = replaceInStrings(nodes, codeRe, (m, { k }) => [
    <Fragment key={`c-${k()}`}>{code(m[0].slice(1, -1))}</Fragment>,
  ])

  // [label](href) — recursive formatting inside the label, but avoid nested links
  const linkRe = /\[([^\]]+)\]\(([^)\s]+)\)/g
  nodes = replaceInStrings(nodes, linkRe, (m, { k }) => {
    const [, label, href] = m
    const children = withFormatting(label, {
      br,
      strong,
      em,
      link,
      code,
    })
    return [<Fragment key={`a-${k()}`}>{link(children, href)}</Fragment>]
  })

  // Bare URLs (http/https) — only after explicit links are handled
  const bareUrlRe = /\b((?:https?:\/\/)[^\s<>()]+)\b/g
  nodes = replaceInStrings(nodes, bareUrlRe, (m, { k }) => {
    const href = m[1]
    return [<Fragment key={`l-${k()}`}>{link(href, href)}</Fragment>]
  })

  // **bold**
  const boldRe = /\*\*([^*]+)\*\*/g
  nodes = replaceInStrings(nodes, boldRe, (m, { k }) => [
    <Fragment key={`b-${k()}`}>{strong(m[1])}</Fragment>,
  ])

  // _italic_
  const italicRe = /_([^_]+)_/g
  nodes = replaceInStrings(nodes, italicRe, (m, { k }) => [
    <Fragment key={`i-${k()}`}>{em(m[1])}</Fragment>,
  ])

  return <Fragment key="renderWithFormatting">{nodes}</Fragment>
}

function replaceInStrings(
  nodes: Nodes,
  re: RegExp,
  replacer: (
    match: RegExpExecArray,
    ctx: { i: number; k: () => string }
  ) => Nodes
): Nodes {
  let key = 0
  const k = () => String(key++)

  return nodes.flatMap((n, i) => {
    if (typeof n !== 'string') return [n]

    const out: Nodes = []
    let last = 0
    let m: RegExpExecArray | null

    while ((m = re.exec(n)) !== null) {
      const before = n.slice(last, m.index)
      if (before) out.push(before)
      out.push(...replacer(m, { i, k }))
      last = m.index + m[0].length

      // Avoid infinite loops with zero-width matches
      if (re.lastIndex === m.index) re.lastIndex++
    }

    const tail = n.slice(last)
    if (tail) out.push(tail)
    return out
  })
}

function splitToken(
  nodes: Nodes,
  token: string,
  make: (ctx: {
    i: number
    idx: number
    k: () => string
  }) => React.ReactNode
): Nodes {
  let key = 0
  const k = () => String(key++)

  return nodes.flatMap((n, i) => {
    if (typeof n !== 'string') return [n]
    const parts = n.split(token)
    const out: Nodes = []
    parts.forEach((chunk, idx) => {
      if (chunk) out.push(chunk)
      if (idx < parts.length - 1)
        out.push(<Fragment key={k()}>{make({ i, idx, k })}</Fragment>)
    })
    return out
  })
}
