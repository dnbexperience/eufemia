import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useCallback,
} from 'react'
import type { ContextType, ReactNode } from 'react'
import HeadingContentContext from './HeadingContentContext'
import Span from '../span/Span'

export type TypographyRebelsProps = {
  /** Maximum Rebels per heading, capped at 2 and one per word. Use 0 to disable. */
  maxPerHeading?: number
  children: ReactNode
}

const inlineElements = new Set([
  'a',
  'b',
  'em',
  'i',
  'mark',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'u',
])

export default function TypographyRebels({
  maxPerHeading = 2,
  children,
}: TypographyRebelsProps) {
  const renderHeading = useCallback<
    ContextType<typeof HeadingContentContext>
  >(
    (children, { family, size, brand }) => {
      const usesHeadingFont =
        !family || family === 'heading' || family === 'display'

      // Move this check and the .dnb-t__rebel theme rule when Coconut becomes Sbanken.
      if (
        brand !== 'coconut' ||
        !usesHeadingFont ||
        !['x-large', 'xx-large'].includes(size) ||
        !Number.isFinite(maxPerHeading) ||
        maxPerHeading < 1
      ) {
        return mapText(children, (value) => value)
      }

      return renderRebels(children, Math.floor(maxPerHeading))
    },
    [maxPerHeading]
  )

  return (
    <HeadingContentContext value={renderHeading}>
      {children}
    </HeadingContentContext>
  )
}

function renderRebels(children: ReactNode, maxPerHeading: number) {
  let text = ''
  mapText(
    children,
    (value) => {
      text += value
      return value
    },
    () => {
      text += '\n'
    }
  )

  // Keep decomposed accented letters together and use only glyphs in ss01.
  const eligible = /[aefilnort!](?!\p{Mark})/gu
  const positions = Array.from(
    text.matchAll(eligible),
    ({ index }) => index
  )
  // Avoid the largest kerning losses at the boundary of a Rebel span.
  const preferredPositions = positions.filter(
    (index) =>
      !/[FKPTVWXY]$/.test(text.slice(Math.max(0, index - 1), index))
  )
  const wordPositions = Array.from(text.matchAll(/\S+/gu)).flatMap(
    ({ 0: word, index }) => {
      const preferred = preferredPositions.find(
        (position) => position >= index && position < index + word.length
      )
      if (preferred !== undefined) {
        return [preferred]
      }
      const match = word.match(/[aefilnort!](?!\p{Mark})/u)
      return match ? [index + match.index] : []
    }
  )
  const preferredWords = wordPositions.filter((position) =>
    preferredPositions.includes(position)
  )
  const limit = Math.min(maxPerHeading, 2, wordPositions.length)
  const candidates =
    preferredWords.length >= limit ? preferredWords : wordPositions
  const selected = new Set<number>()
  for (let index = 0; index < limit; index++) {
    const position =
      candidates[
        limit === 1
          ? 0
          : Math.round((index * (candidates.length - 1)) / (limit - 1))
      ]
    selected.add(position)
  }
  let offset = 0

  return mapText(
    children,
    (value) => {
      const start = offset
      offset += value.length
      const parts: ReactNode[] = []
      let previous = 0

      for (let index = 0; index < value.length; index++) {
        if (selected.has(start + index)) {
          parts.push(value.slice(previous, index))
          parts.push(
            <span className="dnb-t__rebel" key={index}>
              {value[index]}
            </span>
          )
          previous = index + 1
        }
      }

      return parts.length ? [...parts, value.slice(previous)] : value
    },
    () => {
      offset += 1
    }
  )
}

function mapText(
  children: ReactNode,
  transform: (text: string) => ReactNode,
  onBreak?: () => void
): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return transform(String(child))
    }

    if (isValidElement(child) && child.type === 'br') {
      onBreak?.()
      return child
    }

    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      (child.type === Fragment ||
        child.type === Span ||
        (typeof child.type === 'string' && inlineElements.has(child.type)))
    ) {
      return cloneElement(child, {
        children: mapText(child.props.children, transform, onBreak),
      })
    }

    return child
  })
}
