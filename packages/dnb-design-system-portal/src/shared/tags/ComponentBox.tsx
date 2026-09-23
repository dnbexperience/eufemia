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
if (!globalThis.ComponentBoxMemoIds) {
  globalThis.ComponentBoxMemoIds = new WeakMap()
}
if (!globalThis.ComponentBoxMemoId) {
  globalThis.ComponentBoxMemoId = 0
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

  const hash = JSON.stringify([
    getMemoValue(children),
    getMemoRecord(scope),
    getMemoRecord(__buildScope),
    getMemoRecord(rest),
  ])

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

function getMemoValue(value: unknown): string {
  if (Array.isArray(value)) {
    return JSON.stringify(value.map(getMemoValue))
  }

  if (value && typeof value === 'object') {
    return getObjectId(value)
  }

  if (typeof value === 'function') {
    return getObjectId(value)
  }

  return `${typeof value}:${String(value)}`
}

function getMemoRecord(value?: Record<string, unknown>): string {
  return JSON.stringify(
    Object.entries(value ?? {})
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([key, value]) => [key, getMemoValue(value)])
  )
}

function getObjectId(value: object): string {
  let id = globalThis.ComponentBoxMemoIds.get(value)

  if (!id) {
    id = ++globalThis.ComponentBoxMemoId
    globalThis.ComponentBoxMemoIds.set(value, id)
  }

  return `object:${id}`
}

export default ComponentBox
