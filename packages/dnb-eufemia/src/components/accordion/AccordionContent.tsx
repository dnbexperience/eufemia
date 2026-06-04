/**
 * Web Accordion Component
 *
 */

import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { HTMLProps, ReactNode, RefObject } from 'react'
import { clsx } from 'clsx'
import {
  warn,
  validateDOMAttributes,
  processChildren,
  getClosestParent,
} from '../../shared/component-helper'
import { useMediaQuery } from '../../shared'
import type { AccordionContextValue } from './AccordionContext'
import AccordionContext from './AccordionContext'
import { useSpacing } from '../space/SpacingUtils'
import HeightAnimation from '../height-animation/HeightAnimation'
import type { SpacingProps } from '../../shared/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useSharedState } from '../../shared/helpers/useSharedState'
import AccordionTertiaryContent from './AccordionTertiaryContent'
import type { AccordionTertiarySharedState } from './AccordionTertiaryContent'

export type AccordionContentProps = Omit<
  HTMLProps<HTMLElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'children'
> &
  SpacingProps & {
    instance?: RefObject<unknown>
    /**
     * Connects this standalone `Accordion.Content` to an `Accordion` tertiary button using the same identifier.
     */
    connectedTo?: string
    /**
     * If set to `true` the content will be present, even when the accordion is not expanded. In standalone tertiary mode, the content region stays mounted to preserve `aria-controls`.
     */
    keepInDOM?: boolean
    /**
     * If set to `true`, the open and close animation will be omitted in standalone tertiary mode.
     */
    noAnimation?: boolean
    /**
     * Provides a label for the content region in standalone tertiary mode. It is applied to both `aria-label` and `title`.
     */
    title?: string
    className?: string
    children?: ReactNode | (() => ReactNode)
  }

export default function AccordionContent(props: AccordionContentProps) {
  const context = useContext<AccordionContextValue>(AccordionContext)

  const connectionId = props.connectedTo ?? props.id

  // Standalone mode: when used outside an Accordion parent with an explicit connectedTo (or legacy id),
  // subscribe to the shared state from an AccordionTertiary button.
  const isStandalone = !context.id && connectionId
  if (isStandalone) {
    return (
      <AccordionContentStandalone {...props} connectionId={connectionId} />
    )
  }

  return <AccordionContentInner {...props} />
}

function AccordionContentStandalone({
  ref: _ref,
  connectionId,
  ...props
}: AccordionContentProps & { connectionId: string }) {
  const {
    connectedTo: _connectedTo,
    id: _id,
    className,
    children,
    title,
    keepInDOM: keepInDOMProp = false,
    noAnimation = false,
    ...rest
  } = props

  const contentRef = useRef<HTMLElement>(null)
  const { data: sharedData, set } =
    useSharedState<AccordionTertiarySharedState>(connectionId)
  const expanded = sharedData?.expanded ?? false
  const shouldFocusContent = sharedData?.shouldFocusContent ?? false
  const contentId = `${connectionId}-content`
  const content = processChildren(props) as ReactNode

  const wrapperParams = useSpacing(props, {
    className: clsx('dnb-accordion__content', className),
    ...rest,
  })
  validateDOMAttributes(props, wrapperParams)

  return (
    <AccordionTertiaryContent
      {...wrapperParams}
      contentRef={contentRef}
      contentId={contentId}
      expanded={expanded}
      noAnimation={noAnimation}
      shouldFocusContent={shouldFocusContent}
      onFocusHandled={() =>
        set({ ...sharedData, shouldFocusContent: false })
      }
      keepInDOM={keepInDOMProp}
      title={title}
      aria-label={title}
    >
      {content}
    </AccordionTertiaryContent>
  )
}

function AccordionContentInner(props: AccordionContentProps) {
  const context = useContext<AccordionContextValue>(AccordionContext)
  const {
    id,
    expanded,
    keepInDOM,
    preventRerender,
    singleContainer,
    disabled,
    noAnimation,
    contentRef,
  } = context

  const { className, children, instance, ...rest } = props

  let elementRef = useRef<HTMLElement>(null)
  const cacheRef = useRef<ReactNode | null>(null)

  if (contentRef) {
    elementRef = contentRef
  }

  const setContainerHeight = useCallback(() => {
    const { singleContainer } = context

    if (singleContainer) {
      const contentElem = elementRef.current
      if (contentElem) {
        try {
          contentElem.style.height = ''

          const containerElement = getClosestParent(
            'dnb-accordion-group--single-container',
            contentElem
          ) as HTMLElement

          if (noAnimation) {
            containerElement.style.transitionDuration = '1ms'
          }

          const minHeight =
            (contentElem.offsetHeight + contentElem.offsetTop) / 16
          containerElement.style.minHeight = `${minHeight}rem`
        } catch (e) {
          warn('AccordionContent: Failed to calculate content height:', e)
        }
      }
    }
  }, [context, noAnimation])

  const renderContent = () => {
    const children = processChildren(props)

    const {
      expanded,
      keepInDOM,
      preventRerender,
      preventRerenderConditional,
    } = context

    let content = children

    if (typeof content === 'string') {
      content = <p className="dnb-p">{content}</p>
    }

    if (preventRerender) {
      /**
       * Ensure we do not render, if it is not expanded
       */
      if (!(expanded || keepInDOM)) {
        content = null
      }

      // update the cache if children is not the same anymore
      if (preventRerenderConditional && cacheRef.current !== content) {
        cacheRef.current = content
      }

      if (cacheRef.current) {
        content = cacheRef.current
      } else {
        cacheRef.current = content
      }
    }

    return content
  }

  useEffect(() => {
    if (expanded && singleContainer) {
      setContainerHeight()
    }
  }, [children, expanded, singleContainer, setContainerHeight])

  useState(() => {
    if (instance && Object.hasOwn(instance, 'current')) {
      const mutableInstance = instance as RefObject<unknown>
      mutableInstance.current = {
        setContainerHeight,
      }
    }
  })

  const isSmallScreen = useMediaQuery({
    when: { max: 'small' },
  })

  const content = renderContent()

  const wrapperParams = {
    className: clsx('dnb-accordion__content', className),
    ...rest,
  }

  const keepInDOMContent = keepInDOM || preventRerender

  const innerParams = useSpacing(rest, {
    id: `${id}-content`,
    'aria-labelledby': `${id}-header`,
    className: 'dnb-accordion__content__inner',
  }) as HTMLProps<HTMLElement>

  if (expanded) {
    innerParams['aria-expanded'] = true
  }

  if (!expanded || disabled) {
    innerParams.disabled = true
    innerParams['aria-hidden'] = true
  }

  // to remove spacing props
  validateDOMAttributes(props, wrapperParams)
  validateDOMAttributes(null, innerParams)

  const animate = !noAnimation && (singleContainer ? isSmallScreen : true)

  return (
    <HeightAnimation
      {...wrapperParams}
      open={expanded}
      animate={animate}
      keepInDOM={keepInDOMContent}
      ref={elementRef}
    >
      <section {...innerParams}>{content}</section>
    </HeightAnimation>
  )
}

withComponentMarkers(AccordionContent, { _supportsSpacingProps: true })
