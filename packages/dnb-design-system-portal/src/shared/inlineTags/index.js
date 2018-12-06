/**
 * Gatter all the inline tags
 */

import React from 'react'
import InlineCode from './InlineCode'
import CodeBlock from './CodeBlock'
import Table from './Table'
import Img from './Img'

export default {
  table: Table,
  code: CodeBlock,
  img: Img,
  inlineCode: props => <InlineCode {...props} />
}
