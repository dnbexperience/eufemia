/**
 * Gatter all the inline tags
 */

import React from 'react'
// import Heading from '../Heading'
// import Text from './Text'
import InlineCode from './InlineCode'
import CodeBlock from './CodeBlock'
import Table from './Table'
// import Pre from './Pre'

/* eslint-disable react/display-name */
export default {
  // h1: props => <Heading {...props} is="h1" fontSize={[5, 6]} />,
  // h2: props => <Heading {...props} is="h2" fontSize={[4, 5]} />,
  // h3: props => <Heading {...props} is="h3" fontSize={3} />,
  // h4: props => <Heading {...props} is="h4" fontSize={2} />,
  // h5: props => <Heading {...props} is="h5" fontSize={1} />,
  // h6: props => <Heading {...props} is="h6" fontSize={0} />,
  // p: props => <Text {...props} is="p" lineHeight={1.625} mt={3} mb={4} />,
  // pre: Pre,
  // MDXTag: { table: Table },
  table: Table,
  code: CodeBlock,
  inlineCode: props => <InlineCode {...props} />
  // TODO add `a`
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
}
