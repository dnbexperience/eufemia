import { useContext, useId, useRef, useState } from 'react'
import type { HTMLAttributes, Ref } from 'react'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import type { SpacingProps } from '../../shared/types'
import useTranslation from '../../shared/useTranslation'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useSpacing } from '../space/SpacingUtils'

export type ScrollIndicatorItem = {
  /** Accessible name describing the content this dot reveals. */
  label: string
  /** Whether the corresponding content is in view. Several items can be active. */
  active?: boolean
}

export type ScrollIndicatorProps = {
  /**
   * Dots in the same order as the corresponding content. Each item has a required accessible label and an optional active boolean. Several items can be active.
   */
  items: ScrollIndicatorItem[]
  /**
   * Called when a dot is activated by click, Enter or Space. Receives an object with the zero-based index. Move the content and update items in response. Moving focus with arrow keys does not call onChange.
   */
  onChange: (event: { index: number }) => void
}

export type ScrollIndicatorAllProps = ScrollIndicatorProps &
  SpacingProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
    ref?: Ref<HTMLDivElement>
  }

function ScrollIndicator(localProps: ScrollIndicatorAllProps) {
  const context = useContext(Context)
  const props = extendPropsWithContext(
    localProps,
    {},
    context.ScrollIndicator
  )
  const { items, onChange, className, ref: refProp, ...attributes } = props
  const { ScrollIndicator: translations } = useTranslation()
  const visibleId = useId()
  const ref = useRef<HTMLDivElement>(null)
  const focusedButtonRef = useRef<HTMLButtonElement>(null)
  const combinedRef = useCombinedRef(refProp, ref)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const tabIndex = Math.min(focusedIndex, items.length - 1)
  const mainParams = useSpacing(props, {
    ...attributes,
    className: clsx('dnb-scroll-indicator', className),
  })
  validateDOMAttributes(props, mainParams)

  useIsomorphicLayoutEffect(() => {
    setFocusedIndex((index) =>
      Math.min(index, Math.max(0, items.length - 1))
    )
    // Keep keyboard focus in the group when its focused item is removed.
    if (
      focusedButtonRef.current &&
      !focusedButtonRef.current.isConnected &&
      document.activeElement === document.body
    ) {
      focusedButtonRef.current = null
      ref.current
        ?.querySelector<HTMLButtonElement>('[tabindex="0"]')
        ?.focus({ preventScroll: true })
    }
  }, [items.length])

  if (items.length === 0) {
    return null
  }

  return (
    <div
      role="toolbar"
      aria-label={translations.label}
      {...mainParams}
      ref={combinedRef}
    >
      {items.map(({ label, active = false }, index) => (
        <button
          key={index}
          type="button"
          className="dnb-scroll-indicator__item"
          data-active={active}
          aria-label={label}
          aria-describedby={active ? visibleId : undefined}
          tabIndex={index === tabIndex ? 0 : -1}
          onFocus={(event) => {
            focusedButtonRef.current = event.currentTarget
            setFocusedIndex(index)
          }}
          onBlur={() => {
            focusedButtonRef.current = null
          }}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) {
              return
            }
            const isRtl = getComputedStyle(ref.current).direction === 'rtl'
            let next: number
            switch (event.key) {
              case 'ArrowRight':
                next = index + (isRtl ? -1 : 1)
                break
              case 'ArrowLeft':
                next = index + (isRtl ? 1 : -1)
                break
              case 'Home':
                next = 0
                break
              case 'End':
                next = items.length - 1
                break
              default:
                return
            }
            event.preventDefault()
            next = (next + items.length) % items.length
            const button = ref.current.querySelectorAll('button')[next]
            button.focus({ preventScroll: true })
          }}
          onClick={() => onChange({ index })}
        >
          <span aria-hidden="true" />
        </button>
      ))}
      <span id={visibleId} className="dnb-sr-only">
        {translations.inView}
      </span>
    </div>
  )
}

withComponentMarkers(ScrollIndicator, { _supportsSpacingProps: true })

export default ScrollIndicator
