/**
 * Inline Tag
 *
 */

import React from 'react'
import CodeBlock from './CodeBlock'
import styled from '@emotion/styled'
import { getComponents } from '@dnb/eufemia/src/components/lib'
import { getFragments } from '@dnb/eufemia/src/fragments/lib'
import { getElements } from '@dnb/eufemia/src/elements/lib'

if (!globalThis.ComponentBoxMemo) {
  globalThis.ComponentBoxMemo = {}
}

type ComponentBoxProps = {
  children: string | (() => string)
  scope?: Record<string, unknown>
  hideCode?: boolean
  useRender?: boolean
}

function ComponentBox(props: ComponentBoxProps) {
  const { children, scope = {}, ...rest } = props

  const content = typeof children === 'function' ? children() : children

  const hash = content
  if (globalThis.ComponentBoxMemo[hash]) {
    return globalThis.ComponentBoxMemo[hash]
  }

  return (globalThis.ComponentBoxMemo[hash] = (
    // @ts-ignore
    <CodeBlock
      scope={{
        ...getComponents(),
        ...getFragments(),
        ...getElements(),
        styled,
        React,
        // TestWrapper,// Not used as of now
        ...scope,
      }}
      {...rest}
    >
      {content}
    </CodeBlock>
  ))
}

export default ComponentBox
