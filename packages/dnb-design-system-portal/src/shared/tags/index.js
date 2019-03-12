/**
 * All inline tags for Markdown
 */

import React from 'react'
import CodeBlock from './CodeBlock'
import Table from './Table'
import Img from './Img'
import Tag from './Tag'
import Anchor from './Anchor'
import Header from './transpile/AutoLinkHeader'

export default {
  h1: props => <Header is="h1" {...props} />,
  h2: props => <Header is="h2" {...props} />,
  h3: props => <Header is="h3" {...props} />,
  h4: props => <Header is="h4" {...props} />,
  h5: props => <Header is="h5" {...props} />,
  h6: props => <Header is="h6" {...props} />,
  a: Anchor,
  table: Table,
  code: CodeBlock,
  inlineCode: props => <Tag is="code" {...props} />,
  ul: props => <Tag is="ul" {...props} />,
  ol: props => <Tag is="ol" {...props} />,
  dl: props => <Tag is="dl" {...props} />,
  p: props => <Tag is="p" {...props} />,
  blockquote: props => <Tag is="blockquote" {...props} />,
  hr: props => <Tag is="hr" {...props} />,
  img: Img
}
