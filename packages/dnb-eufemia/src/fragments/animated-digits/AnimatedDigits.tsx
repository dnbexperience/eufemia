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
}

const isDigit = (character: string) => /\p{Nd}/u.test(character)

export default function AnimatedDigits({
  value,
  previousValue = value,
  direction = 'up',
  reserveWidth,
}: AnimatedDigitsProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const removedRef = useRef<HTMLSpanElement>(null)
  const previous = useRef<{ value: string; width: number }>(null)
  const animation = useRef<Animation>(null)

  useLayoutEffect(() => {
    const element = ref.current
    const old = previous.current
    const width = animation.current
      ? element.getBoundingClientRect().width
      : old?.width
    animation.current?.cancel()
    animation.current = null

    const targetWidth = element.getBoundingClientRect().width
    previous.current = { value, width: targetWidth }
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const removed = removedRef.current
    if (removed) {
      removed.style.setProperty(
        '--removed-width',
        `${removed.firstElementChild.getBoundingClientRect().width}px`
      )
    }

    if (
      !element.animate ||
      media?.matches ||
      !old ||
      !Number.isFinite(width) ||
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
        `dnb-animated-digits--${direction}`
      )}
      style={{ minInlineSize: reserveWidth }}
    >
      <span ref={ref} className="dnb-animated-digits__viewport">
        <span
          key={previousValue + ':' + value}
          className="dnb-animated-digits__content"
        >
          {prefix.slice(0, sharedPrefix).join('')}
          {removed && (
            <span
              ref={removedRef}
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
                <span className="dnb-animated-digits__value">
                  {character}
                </span>
              </span>
            )
          })}
        </span>
      </span>
    </span>
  )
}
