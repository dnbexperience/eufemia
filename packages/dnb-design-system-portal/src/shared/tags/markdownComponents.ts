import { createElement } from 'react'
import { basicComponents } from './index'
import MarkdownCodeBlock from './MarkdownCodeBlock'

const components = { ...basicComponents, pre: MarkdownCodeBlock }

// react-markdown passes its syntax tree node to each component, which would otherwise end up as an HTML attribute
export default Object.fromEntries(
  Object.entries(components).map(([tag, Component]) => [
    tag,
    ({ node, ...props }) => createElement(Component, props),
  ])
)
