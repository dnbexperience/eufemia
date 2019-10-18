/**
 * All inline tags for Markdown
 */

import React from 'react'
import CodeBlock from './CodeBlock'
import { Checkbox, Input } from 'dnb-ui-lib/components'
import Table from './Table'
// import Img from './Img'
import Tag from './Tag'
import Anchor from './Anchor'
import Intro, { IntroFooter } from './Intro'
import Header from './AutoLinkHeader'

export default {
  Intro,
  IntroFooter,
  // Img,
  // img: Img
  h1: props => <Header is="h1" {...props} />,
  h2: props => <Header is="h2" {...props} />,
  h3: props => <Header is="h3" {...props} />,
  h4: props => <Header is="h4" {...props} />,
  h5: props => <Header is="h5" {...props} />,
  h6: props => <Header is="h6" {...props} />,
  a: Anchor,
  link: Anchor,
  // eslint-disable-next-line
  input: ({ type, ...rest }) => {
    switch (type) {
      case 'checkbox':
        return <Checkbox {...rest} disabled={false} />
      default:
        return <Input {...rest} />
    }
  },
  table: Table,
  code: (...args) => CodeBlock(...args),
  inlineCode: props => <Tag is="code" {...props} />,
  ul: props => <Tag is="ul" {...props} />,
  ol: props => <Tag is="ol" {...props} />,
  dl: props => <Tag is="dl" {...props} />,
  p: props => <Tag is="p" {...props} />,
  blockquote: props => <Tag is="blockquote" {...props} />,
  hr: props => <Tag is="hr" {...props} />
}
