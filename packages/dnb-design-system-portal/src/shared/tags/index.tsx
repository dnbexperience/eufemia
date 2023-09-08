/**
 * All inline tags for Markdown
 */

import React from 'react'
import CodeBlock from './CodeBlock'
import { Checkbox, Input } from '@dnb/eufemia/src/components'
import { Ul, Ol, Dl, Li, P, Hr, Blockquote, Code } from '@dnb/eufemia/src'
import Table from './Table'
// import Img from './Img'
import Anchor from './Anchor'
import Header from './AutoLinkHeader'
import Copy from './Copy'
import VisibilityByTheme from '@dnb/eufemia/src/shared/VisibilityByTheme'

export const basicComponents = {
  // img: Img, // -> <figure> cannot appear as a descendant of <p>
  h1: (props) => <Header level="1" {...props} />,
  h2: (props) => <Header level="2" {...props} />,
  h3: (props) => <Header level="3" {...props} />,
  h4: (props) => <Header level="4" {...props} />,
  h5: (props) => <Header level="5" {...props} />,
  h6: (props) => <Header level="6" {...props} />,
  li: (props) => <Li {...props} />,
  ul: (props) => <Ul {...props} />,
  ol: (props) => <Ol {...props} />,
  dl: (props) => <Dl {...props} />,
  p: (props) => <P {...props} />,
  paragraph: (props) => <P {...props} />,
  blockquote: (props) => <Blockquote {...props} />,
  hr: (props) => <Hr light {...props} />,
  table: Table,
  pre: (props) => {
    return CodeBlock(props.children.props)
  },
  code: ({ children }) => {
    return (
      <Copy>
        <Code>{children}</Code>
      </Copy>
    )
  },
  a: Anchor as React.DetailedHTMLFactory<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  anchor: Anchor,
}

export default {
  Copy,
  VisibilityByTheme,
  VisibleWhenVisualTest: ({ children }) => {
    if (typeof globalThis !== 'undefined' && globalThis.IS_TEST) {
      return children
    }
  },
  VisibleWhenNotVisualTest: ({ children }) => {
    if (typeof globalThis !== 'undefined' && !globalThis.IS_TEST) {
      return children
    }
  },

  link: Anchor,
  input: ({ type, ...rest }) => {
    switch (type) {
      case 'checkbox':
        return <Checkbox {...rest} disabled={false} />
      default:
        return <Input {...rest} />
    }
  },

  ...basicComponents,
}
