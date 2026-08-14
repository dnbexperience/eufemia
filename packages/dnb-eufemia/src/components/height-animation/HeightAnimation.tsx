import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useContext, useEffect, useRef, useState } from 'react'
import type { HTMLProps, RefObject } from 'react'
import { clsx } from 'clsx'
import type { UseHeightAnimationOptions } from './useHeightAnimation'
import { useHeightAnimation } from './useHeightAnimation'
import Space from '../space/Space'

import type { DynamicElement, SpacingProps } from '../../shared/types'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import FlexLayoutContext from '../flex/FlexLayoutContext'
import FlexLayoutChildren, {
  useFlexLayoutRoot,
} from '../flex/FlexLayoutChildren'

export type HeightAnimationProps = {
  /**
   * Set to `true` to ensure the nested children content will be kept in the DOM. Defaults to `false`.
   */
  keepInDOM?: boolean

  /**
   * Set to `true` to keep closed content available to the browser find-in-page feature with `hidden="until-found"`. This implies `keepInDOM`. In browsers without `hidden="until-found"` support, the collapsed content may remain visible. Defaults to `false`.
   */
  openOnFind?: boolean

  /**
   * Deprecated. Use `openOnFind` instead.
   * @deprecated Use `openOnFind` instead.
   */
  untilFound?: boolean

  /**
   * Is called after matching content inside a closed animation is opened using `openOnFind`. Use it to synchronize external open state and controls.
   */
  onBeforeMatch?: (event: Event) => void

  /**
   * Set to `true` to omit the usage of "overflow: hidden;". Defaults to `false`.
   */
  showOverflow?: boolean

  /**
   * Custom duration of the animation in milliseconds. Defaults to `400`.
   */
  duration?: number

  /**
   * Custom delay of the animation in milliseconds. Defaults to `0`.
   */
  delay?: number

  /**
   * Custom HTML element for the component. Defaults to `div` HTML Element.
   */
  element?: DynamicElement

  /**
   * Send along a custom `React.Ref`.
   */
  ref?: RefObject<HTMLElement>
} & UseHeightAnimationOptions

export type HeightAnimationAllProps = HeightAnimationProps &
  SpacingProps &
  Omit<
    HTMLProps<HTMLElement>,
    'ref' | 'onAnimationEnd' | 'onAnimationStart'
  >

function HeightAnimation({
  open = true,
  animate = true,
  keepInDOM = false,
  openOnFind,
  untilFound,
  showOverflow = false,
  element,
  duration,
  delay,
  className,
  ref,
  children,
  compensateForGap,
  onInit = null,
  onOpen = null,
  onAnimationStart = null,
  onAnimationEnd = null,
  onBeforeMatch = null,
  ...rest
}: HeightAnimationAllProps) {
  const flexLayout = useContext(FlexLayoutContext)
  const elementRef = useRef<HTMLElement>(undefined)
  const targetRef = ref || elementRef
  const [isOpenedByFind, setOpenedByFind] = useState(false)
  const shouldOpenOnFind = openOnFind ?? untilFound ?? false
  const resolvedOpen = open || (shouldOpenOnFind && isOpenedByFind)

  const handleAnimationStart: UseHeightAnimationOptions['onAnimationStart'] =
    (state) => {
      if (shouldOpenOnFind && state === 'opening') {
        targetRef.current?.removeAttribute('hidden')
      }
      onAnimationStart?.(state)
    }
  const handleAnimationEnd: UseHeightAnimationOptions['onAnimationEnd'] = (
    state
  ) => {
    if (shouldOpenOnFind) {
      if (state === 'closed') {
        targetRef.current?.style.removeProperty('visibility')
        targetRef.current?.setAttribute('hidden', 'until-found')
      } else if (state === 'opened') {
        targetRef.current?.removeAttribute('hidden')
      }
    }
    onAnimationEnd?.(state)
  }
  const rootLayout = useFlexLayoutRoot(flexLayout, targetRef)

  const {
    isInDOM,
    isVisible,
    isVisibleParallax,
    isAnimating,
    firstPaintStyle,
  } = useHeightAnimation(targetRef, {
    open: resolvedOpen,
    animate,
    children,
    compensateForGap,
    onInit,
    onOpen,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
  })

  useLayoutEffect(() => {
    const element = targetRef.current
    if (!element) {
      return
    }

    if (
      shouldOpenOnFind &&
      !resolvedOpen &&
      element.classList.contains('dnb-height-animation--hidden')
    ) {
      element.setAttribute('hidden', 'until-found')
    } else if (element.getAttribute('hidden') === 'until-found') {
      element.removeAttribute('hidden')
    }
  }, [resolvedOpen, shouldOpenOnFind, targetRef])

  useLayoutEffect(() => {
    if (isOpenedByFind && (open || !shouldOpenOnFind)) {
      setOpenedByFind(false)
    }
  }, [isOpenedByFind, open, shouldOpenOnFind])

  useLayoutEffect(() => {
    const element = targetRef.current
    if (!element || !shouldOpenOnFind) {
      return undefined
    }

    const handleBeforeMatch = (event: Event) => {
      element.removeAttribute('hidden')
      element.classList.remove('dnb-height-animation--hidden')
      element.setAttribute('aria-hidden', 'false')
      setOpenedByFind(true)
      onBeforeMatch?.(event)
    }
    element.addEventListener('beforematch', handleBeforeMatch)

    return () => {
      element.removeEventListener('beforematch', handleBeforeMatch)
    }
  }, [onBeforeMatch, shouldOpenOnFind, targetRef])

  // Set CSS custom properties via the DOM instead of React's style
  // prop. React's SSR serializes custom properties without spaces
  // (e.g. "--duration:600ms") while the client serializes them with
  // spaces and a trailing semicolon ("--duration: 600ms;"), causing
  // a hydration mismatch.
  useEffect(() => {
    const el = targetRef.current
    if (!el) {
      return
    }
    if (duration) {
      el.style.setProperty('--duration', `${duration}ms`)
    } else {
      el.style.removeProperty('--duration')
    }

    if (delay) {
      el.style.setProperty('--delay', `${delay}ms`)
    } else {
      el.style.removeProperty('--delay')
    }
  }, [duration, delay, targetRef, isInDOM])

  const shouldKeepInDOM = keepInDOM || shouldOpenOnFind

  if (!shouldKeepInDOM && !isInDOM && !isAnimating) {
    return null
  }

  return (
    <Space
      ref={targetRef}
      element={element || 'div'}
      className={clsx(
        'dnb-height-animation',
        isInDOM && 'dnb-height-animation--is-in-dom',
        isVisible && 'dnb-height-animation--is-visible',
        animate && isVisibleParallax && 'dnb-height-animation--parallax',
        isAnimating && 'dnb-height-animation--animating',
        !isVisible &&
          !isAnimating &&
          !resolvedOpen &&
          'dnb-height-animation--hidden',
        showOverflow && 'dnb-height-animation--show-overflow',
        className
      )}
      style={{ ...firstPaintStyle, ...rest?.style }}
      aria-hidden={shouldKeepInDOM ? !resolvedOpen : undefined}
      {...rest}
    >
      {compensateForGap ? (
        <div className="dnb-height-animation__compensate-for-gap">
          <FlexLayoutChildren layout={rootLayout}>
            {children}
          </FlexLayoutChildren>
        </div>
      ) : (
        <FlexLayoutChildren layout={rootLayout}>
          {children}
        </FlexLayoutChildren>
      )}
    </Space>
  )
}

withComponentMarkers(HeightAnimation, {
  _supportsSpacingProps: 'children',
})

export default HeightAnimation
