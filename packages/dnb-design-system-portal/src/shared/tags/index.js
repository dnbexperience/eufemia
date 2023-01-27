/**
 * All inline tags for Markdown
 */

import React from 'react'
import CodeBlock from './CodeBlock'
import { Checkbox, Input } from '@dnb/eufemia/src/components'
import {
  Ul,
  Ol,
  Dl,
  Li,
  P,
  Hr,
  Blockquote,
  Code,
} from '@dnb/eufemia/src/elements'
import Table from './Table'
// import Img from './Img'
import Anchor from './Anchor'
import Header from './AutoLinkHeader'
import Copy from './Copy'

export default {
  Copy,
  // img: Img, // -> <figure> cannot appear as a descendant of <p>
  h1: (props) => <Header level="1" {...props} />,
  h2: (props) => <Header level="2" {...props} />,
  h3: (props) => <Header level="3" {...props} />,
  h4: (props) => <Header level="4" {...props} />,
  h5: (props) => <Header level="5" {...props} />,
  h6: (props) => <Header level="6" {...props} />,
  a: Anchor,
  link: Anchor,
  input: ({ type, ...rest }) => {
    switch (type) {
      case 'checkbox':
        return <Checkbox {...rest} disabled={false} />
      default:
        return <Input {...rest} />
    }
  },
  table: Table,
  pre: (props) => {
    return CodeBlock(props.children.props)
  },
  code: (props) => {
    return (
      <Copy>
        <Code {...props} />
      </Copy>
    )
  },
  li: (props) => <Li {...props} />,
  ul: (props) => <Ul {...props} />,
  ol: (props) => <Ol {...props} />,
  dl: (props) => <Dl {...props} />,
  p: (props) => <P {...props} />,
  paragraph: (props) => <P {...props} />,
  blockquote: (props) => <Blockquote {...props} />,
  hr: (props) => <Hr light {...props} />,
}
