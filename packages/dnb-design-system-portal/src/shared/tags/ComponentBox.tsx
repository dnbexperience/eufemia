/**
 * Inline Tag
 *
 */

import React from 'react'
import CodeBlock, { CodeSectionProps } from './CodeBlock'
import styled from '@emotion/styled'
import { getComponents } from '@dnb/eufemia/src/components/lib'
import { getFragments } from '@dnb/eufemia/src/fragments/lib'
import { getElements } from '@dnb/eufemia/src/elements/lib'
import { Provider } from '@dnb/eufemia/src/shared'
import {
  Field,
  Value,
  Form,
  Wizard,
  FieldBlock,
  Iterate,
  FormError,
  Tools,
} from '@dnb/eufemia/src/extensions/forms'

if (!globalThis.ComponentBoxMemo) {
  globalThis.ComponentBoxMemo = {}
}

function ComponentBox(props: CodeSectionProps) {
  const { children, scope = {}, ...rest } = props

  const hash = children as string
  if (globalThis.ComponentBoxMemo[hash]) {
    return globalThis.ComponentBoxMemo[hash]
  }

  return (globalThis.ComponentBoxMemo[hash] = (
    <CodeBlock
      scope={{
        ...getComponents(),
        ...getFragments(),
        ...getElements(),
        Provider,
        FieldBlock,
        Field,
        Value,
        Form,
        Wizard,
        styled,
        React,
        Iterate,
        FormError,
        Tools,
        ...scope,
      }}
      {...rest}
    >
      {children}
    </CodeBlock>
  ))
}

export default ComponentBox
