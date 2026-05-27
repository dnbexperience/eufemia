/**
 * Inline Tag
 *
 */

// eslint-disable-next-line no-restricted-imports -- React namespace needed for react-live scope
import * as React from 'react'
import CodeBlock, { type CodeSectionProps } from './CodeBlock'
import styled from '@emotion/styled'

if (!globalThis.ComponentBoxMemo) {
  globalThis.ComponentBoxMemo = {}
}

type ComponentBoxProps = CodeSectionProps & {
  /**
   * Injected by the inject-scope Babel plugin.
   * Contains only the Eufemia symbols that the code string references,
   * eliminating the need to import the entire library.
   */
  __buildScope?: Record<string, unknown>
}

function ComponentBox(props: ComponentBoxProps) {
  const { children, scope = {}, __buildScope, ...rest } = props

  const hash = children as string

  if (globalThis.ComponentBoxMemo[hash]) {
    return globalThis.ComponentBoxMemo[hash]
  }

  const element = (
    <CodeBlock
      scope={{
        ...__buildScope,
        styled,
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
        ...scope,
      }}
      {...rest}
    >
      {children}
    </CodeBlock>
  )

  globalThis.ComponentBoxMemo[hash] = element

  return element
}

export default ComponentBox
