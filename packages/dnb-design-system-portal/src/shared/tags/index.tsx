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
  Icon,
} from '@dnb/eufemia/src'
import Table from './Table'
// import Img from './Img'
import Anchor from './Anchor'
import Header from './AutoLinkHeader'
import Copy from './Copy'
import VisibilityByTheme from '@dnb/eufemia/src/shared/VisibilityByTheme'
import { TypographyBox } from '../parts/TypographyBox'

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
  hr: (props) => <Hr {...props} />,
  table: Table,
  pre: (props) => {
    return CodeBlock(props.children.props)
  },
  code: ({ children, ...rest }) => {
    if (rest?.inline) {
      // So it does not appear in the HTML
      delete rest.inline
    }
    return (
      <Code {...rest}>
        <Copy>{children}</Copy>
      </Code>
    )
  },

  a: (props) => {
    if (props?.children[0]?.type === Icon) {
      // If first children is a Icon, we pass it to Anchor's icon property and sets is position to left
      const { children } = props
      const [icon, ...restChildren] = children
      return (
        <Anchor icon={icon} iconPosition="left" {...props}>
          {restChildren}
        </Anchor>
      )
    }

    return <Anchor {...props} />
  },
}

export default {
  Copy,
  TypographyBox,
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

  link: (props) => {
    return <Anchor {...props} />
  },
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
