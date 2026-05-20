import { useCallback, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { clsx } from 'clsx'
import HeightAnimation from '../height-animation/HeightAnimation'
import type { HeightAnimationAllProps } from '../height-animation/HeightAnimation'

export type AccordionTertiarySharedState = {
  expanded: boolean
  shouldFocusContent?: boolean
}

type AccordionTertiaryContentProps = Omit<
  HeightAnimationAllProps,
  'animate' | 'children' | 'element' | 'id' | 'onOpen' | 'open' | 'ref'
> & {
  contentId: string
  expanded: boolean
  noAnimation?: boolean
  shouldFocusContent?: boolean
  onFocusHandled?: () => void
  contentRef?: RefObject<HTMLElement>
  children?: ReactNode
}

export default function AccordionTertiaryContent({
  contentId,
  expanded,
  noAnimation = false,
  shouldFocusContent = false,
  onFocusHandled,
  contentRef,
  className,
  children,
  ...rest
}: AccordionTertiaryContentProps) {
  const {
    keepInDOM = false,
    onAnimationStart,
    onAnimationEnd,
    title,
    ['aria-label']: ariaLabel,
    ...wrapperProps
  } = rest
  const fallbackRef = useRef<HTMLElement>(null)
  const targetRef = contentRef || fallbackRef

  const handleOpen = useCallback(() => {
    if (shouldFocusContent && targetRef.current) {
      targetRef.current.focus({ preventScroll: true })
      onFocusHandled?.()
    }
  }, [shouldFocusContent, targetRef, onFocusHandled])

  return (
    <section
      {...wrapperProps}
      ref={targetRef}
      id={contentId}
      className={clsx(
        'dnb-tab-focus',
        'dnb-accordion__tertiary-content',
        className
      )}
      tabIndex={-1}
      title={title}
      aria-label={ariaLabel}
      aria-hidden={!expanded}
    >
      <HeightAnimation
        className="dnb-accordion__content"
        open={expanded}
        animate={!noAnimation}
        keepInDOM={keepInDOM}
        onAnimationStart={onAnimationStart}
        onAnimationEnd={onAnimationEnd}
        onOpen={handleOpen}
      >
        {children}
      </HeightAnimation>
    </section>
  )
}
