import { clsx } from 'clsx'
import { useRef } from 'react'
import useLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'

export type AnimatedDigitsProps = {
  /** Already formatted text. Formatting and update timing belong to the consumer. */
  value: string
  /** Omit to show the value without motion, for example after a locale change. */
  previousValue?: string
  direction?: 'up' | 'down'
  reserveWidth?: string
  /** Use generated text when a parent already provides the accessible value. */
  decorative?: boolean
}

const isDigit = (character: string) => /\p{Nd}/u.test(character)

// Keep native shaping and bidi controls together instead of splitting RTL text.
export const hasRtlText = (value: string) =>
  /[\u0590-\u08ff\ufb1d-\ufdff\ufe70-\ufeff\u200e-\u200f\u202a-\u202e\u2066-\u2069]/u.test(
    value.replace(/\p{Nd}/gu, '')
  )

export default function AnimatedDigits({
  value,
  previousValue = value,
  direction = 'up',
  reserveWidth,
  decorative = false,
}: AnimatedDigitsProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const previous = useRef<{
    value: string
    width: number
  }>(null)
  const animation = useRef<Animation>(null)

  useLayoutEffect(() => {
    const element = ref.current
    const old = previous.current
    if (!element) {
      previous.current = null
      animation.current?.cancel()
      animation.current = null
      return undefined
    }
    const width = animation.current
      ? element.getBoundingClientRect().width
      : old?.width
    animation.current?.cancel()
    animation.current = null

    const targetWidth = element.getBoundingClientRect().width
    previous.current = { value, width: targetWidth }
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')

    if (
      !element.animate ||
      media?.matches ||
      !old ||
      !Number.isFinite(width) ||
      width <= 0 ||
      targetWidth <= 0 ||
      old.value !== previousValue ||
      value === previousValue ||
      Math.abs(width - targetWidth) < 0.5
    ) {
      return undefined
    }

    // Animate layout so the digits and surrounding symbols move together.
    const current = element.animate(
      [{ width: `${width}px` }, { width: `${targetWidth}px` }],
      { duration: 160, easing: 'ease-out' }
    )
    animation.current = current
    const cancel = () => {
      current.cancel()
      animation.current = null
      media?.removeEventListener('change', cancel)
    }
    current.onfinish = cancel
    media?.addEventListener('change', cancel)

    return () => {
      media?.removeEventListener('change', cancel)
    }
  }, [value, previousValue])

  useLayoutEffect(() => () => animation.current?.cancel(), [])

  if (hasRtlText(value)) {
    return <>{value}</>
  }

  const characters = Array.from(value)
  const previousCharacters = Array.from(previousValue)
  const previousIndexes = previousCharacters.flatMap((character, index) =>
    isDigit(character) ? [index] : []
  )
  const previousDigits = previousIndexes.map(
    (index) => previousCharacters[index]
  )
  const prefixEnd = characters.findIndex(isDigit)
  const prefix = characters.slice(
    0,
    prefixEnd < 0 ? characters.length : prefixEnd
  )
  const previousPrefix = previousCharacters.slice(
    0,
    previousIndexes[0] ?? previousCharacters.length
  )
  let sharedPrefix = 0
  while (
    sharedPrefix < prefix.length &&
    prefix[sharedPrefix] === previousPrefix[sharedPrefix]
  ) {
    sharedPrefix++
  }
  let digitIndex =
    previousDigits.length - characters.filter(isDigit).length
  const removed =
    digitIndex > 0
      ? previousCharacters
          .slice(sharedPrefix, previousIndexes[digitIndex])
          .join('')
      : previousPrefix
          .slice(
            sharedPrefix,
            sharedPrefix +
              Math.max(0, previousPrefix.length - prefix.length)
          )
          .join('')

  return (
    <span
      className={clsx(
        'dnb-animated-digits',
        `dnb-animated-digits--${direction}`,
        reserveWidth && 'dnb-animated-digits--reserved'
      )}
      ref={ref}
      aria-hidden={decorative || undefined}
      style={{ minInlineSize: reserveWidth }}
    >
      <span
        className="dnb-animated-digits__text"
        data-text={decorative ? value : undefined}
      >
        {decorative ? undefined : value}
      </span>
      <span className="dnb-animated-digits__visual" aria-hidden="true">
        <span data-text={prefix.slice(0, sharedPrefix).join('')} />
        <span className="dnb-animated-digits__viewport">
          <span
            key={previousValue + ':' + value}
            className="dnb-animated-digits__content"
          >
            <span
              className="dnb-animated-digits__prefix"
              data-text={prefix.slice(0, sharedPrefix).join('')}
            />
            {removed && (
              <span
                className="dnb-animated-digits__removed"
                aria-hidden="true"
              >
                <span data-previous={removed} />
              </span>
            )}
            {characters.slice(sharedPrefix).map((character, index) => {
              const digit = isDigit(character)
              const from = digit ? previousDigits[digitIndex++] : undefined
              const changed = digit && from !== character

              return (
                <span
                  key={characters.length - index}
                  className={clsx(
                    'dnb-animated-digits__character',
                    changed && 'dnb-animated-digits__character--changed'
                  )}
                >
                  {changed && from !== undefined && (
                    <span
                      className="dnb-animated-digits__previous"
                      data-previous={from}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="dnb-animated-digits__value"
                    data-text={character}
                  />
                </span>
              )
            })}
          </span>
        </span>
      </span>
    </span>
  )
}
