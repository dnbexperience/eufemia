/**
 * Inline Tag
 *
 */

// eslint-disable-next-line no-restricted-imports -- React namespace needed for react-live scope
import * as React from 'react'
import CodeBlock, { type CodeSectionProps } from './CodeBlock'
import styled from '@emotion/styled'
import { getComponents } from '@dnb/eufemia/src/components/lib'
import { getFragments } from '@dnb/eufemia/src/fragments/lib'
import { getElements } from '@dnb/eufemia/src/elements/lib'
import { Provider, Theme } from '@dnb/eufemia/src/shared'
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
        Theme,
        FieldBlock,
        Field,
        Value,
        Form,
        Wizard,
        styled,
        React,
        Fragment: React.Fragment,
        useState: React.useState,
        useEffect: React.useEffect,
        useRef: React.useRef,
        useCallback: React.useCallback,
        useMemo: React.useMemo,
        useContext: React.useContext,
        useLayoutEffect: React.useLayoutEffect,
        createContext: React.createContext,
        Suspense: React.Suspense,
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
