import { createElement } from 'react'
import type { ComponentType } from 'react'
import { basicComponents } from './index'
import MarkdownCodeBlock from './MarkdownCodeBlock'

// react-markdown passes its syntax tree node to each component, which would otherwise end up as an HTML attribute
function omitNodeProp<T extends Record<string, ComponentType<any>>>(
  components: T
) {
  return Object.fromEntries(
    Object.entries(components).map(([tag, Component]) => [
      tag,
      ({ node, ...props }) => createElement(Component, props),
    ])
  ) as T
}

export default omitNodeProp({ ...basicComponents, pre: MarkdownCodeBlock })
