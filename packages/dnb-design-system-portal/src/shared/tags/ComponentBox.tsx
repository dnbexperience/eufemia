/**
 * Inline Tag
 *
 */

import React from 'react'
import CodeBlock, { LiveCodeProps } from './CodeBlock'
import styled from '@emotion/styled'
import { getComponents } from '@dnb/eufemia/src/components/lib'
import { getFragments } from '@dnb/eufemia/src/fragments/lib'
import { getElements } from '@dnb/eufemia/src/elements/lib'
import { Provider } from '@dnb/eufemia/src/shared'
import { Field, FieldBlock, Form } from '@dnb/eufemia/src/extensions/forms'

if (!globalThis.ComponentBoxMemo) {
  globalThis.ComponentBoxMemo = {}
}

type ComponentBoxProps = {
  children: React.ReactNode | (() => React.ReactNode)
  useRender?: boolean

  /** @deprecated Use "useRender" instead */
  noInline?: boolean
} & Omit<LiveCodeProps, 'code'>

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <CodeBlock
      scope={{
        ...getComponents(),
        ...getFragments(),
        ...getElements(),
        Provider,
        FieldBlock,
        Field,
        Form,
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
