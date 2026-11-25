import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useCallback,
} from 'react'
import type { ContextType, ReactNode } from 'react'
import HeadingContentContext from './HeadingContentContext'

export type TypographyRebelsProps = {
  /** Maximum number of Rebels per heading. Defaults to 2. Use 0 to disable. */
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
        family === 'heading' ||
        family === 'display' ||
        (!family && !['basis', 'small', 'x-small'].includes(size))

      if (
        brand !== 'coconut' ||
        !usesHeadingFont ||
        !Number.isFinite(maxPerHeading) ||
        maxPerHeading < 1
      ) {
        return children
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
  mapText(children, (value) => {
    text += value
    return value
  })

  // Keep decomposed accented letters together and use only glyphs in ss01.
  const eligible = /[aefilnort!](?!\p{Mark})/gu
  const positions = Array.from(
    text.matchAll(eligible),
    ({ index }) => index
  )
  const limit = Math.min(maxPerHeading, positions.length)

  if (limit === 0) {
    return children
  }

  const wordPositions = Array.from(text.matchAll(/\S+/gu)).flatMap(
    ({ 0: word, index }) => {
      const match = word.match(/[aefilnort!](?!\p{Mark})/u)
      return match ? [index + match.index] : []
    }
  )
  const candidates =
    wordPositions.length >= limit ? wordPositions : positions
  const selected = new Set(
    Array.from(
      { length: limit },
      (_, index) =>
        candidates[
          limit === 1
            ? 0
            : Math.round((index * (candidates.length - 1)) / (limit - 1))
        ]
    )
  )
  let offset = 0

  return mapText(children, (value) => {
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
  })
}

function mapText(
  children: ReactNode,
  transform: (text: string) => ReactNode
): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return transform(String(child))
    }

    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      (child.type === Fragment ||
        (typeof child.type === 'string' && inlineElements.has(child.type)))
    ) {
      return cloneElement(child, {
        children: mapText(child.props.children, transform),
      })
    }

    return child
  })
}
