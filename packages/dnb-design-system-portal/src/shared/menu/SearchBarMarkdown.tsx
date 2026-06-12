import type { ReactNode } from 'react'
import { Code } from '@dnb/eufemia/src'

export function formatSearchResultMarkdown(
  value: string | null | undefined
): ReactNode {
  if (!value?.includes('`')) {
    return value
  }

  const parts: ReactNode[] = []
  let index = 0

  while (index < value.length) {
    const openingIndex = value.indexOf('`', index)

    if (openingIndex === -1) {
      parts.push(value.slice(index))
      break
    }

    const tickCount = countBackticks(value, openingIndex)
    const contentStart = openingIndex + tickCount
    const closingIndex = findClosingBackticks(
      value,
      contentStart,
      tickCount
    )

    if (closingIndex === -1) {
      parts.push(value.slice(index))
      break
    }

    if (openingIndex > index) {
      parts.push(value.slice(index, openingIndex))
    }

    parts.push(
      <Code key={`code-${openingIndex}`}>
        {normalizeCodeSpan(value.slice(contentStart, closingIndex))}
      </Code>
    )

    index = closingIndex + tickCount
  }

  return parts.some((part) => typeof part !== 'string') ? parts : value
}

function countBackticks(value: string, startIndex: number) {
  let count = 0

  while (value[startIndex + count] === '`') {
    count++
  }

  return count
}

function findClosingBackticks(
  value: string,
  startIndex: number,
  tickCount: number
) {
  let index = startIndex

  while (index < value.length) {
    const nextIndex = value.indexOf('`', index)

    if (nextIndex === -1) {
      return -1
    }

    if (countBackticks(value, nextIndex) === tickCount) {
      return nextIndex
    }

    index = nextIndex + 1
  }

  return -1
}

function normalizeCodeSpan(value: string) {
  if (
    value.length > 2 &&
    value.startsWith(' ') &&
    value.endsWith(' ') &&
    value.trim().length > 0
  ) {
    return value.slice(1, -1)
  }

  return value
}
