/**
 * All inline tags for Markdown
 */

import React from 'react'
import CodeBlock from './CodeBlock'
import Table from './Table'
import Img from './Img'
import Header from './transpile/AutoLinkHeader'

export default {
  h1: props => <Header {...props} is="h1" />,
  h2: props => <Header {...props} is="h2" />,
  h3: props => <Header {...props} is="h3" />,
  h4: props => <Header {...props} is="h4" />,
  h5: props => <Header {...props} is="h5" />,
  h6: props => <Header {...props} is="h6" />,
  table: Table,
  code: CodeBlock,
  img: Img
}
