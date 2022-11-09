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
  children: React.ReactNode | (() => React.ReactNode)
  scope?: Record<string, unknown>
  hideCode?: boolean
  useRender?: boolean

  /** @deprecated Use "useRender" instead */
  noInline?: boolean
}

function ComponentBox(props: ComponentBoxProps) {
  const { children, scope = {}, ...rest } = props

  const hash = children as string
  if (globalThis.ComponentBoxMemo[hash]) {
    return globalThis.ComponentBoxMemo[hash]
  }

  if (rest.noInline) {
    rest.useRender = true
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
      {children}
    </CodeBlock>
  ))
}

export default ComponentBox
