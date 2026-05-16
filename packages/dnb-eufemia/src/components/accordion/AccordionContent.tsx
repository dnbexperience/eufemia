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
import clsx from 'clsx'
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
import type { AccordionTertiarySharedState } from './AccordionTertiary'

export type AccordionContentProps = Omit<
  HTMLProps<HTMLElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'children'
> &
  SpacingProps & {
    instance?: RefObject<unknown>
    /**
     * If set to `true` the content will remain in the DOM when collapsed.
     * Defaults to `true` in standalone mode.
     */
    keepInDOM?: boolean
    /**
     * An accessible label for the content section. Used as `aria-label` in standalone mode.
     */
    title?: ReactNode
    className?: string
    children?: ReactNode | (() => ReactNode)
  }

export default function AccordionContent(props: AccordionContentProps) {
  const context = useContext<AccordionContextValue>(AccordionContext)

  // Standalone mode: when used outside an Accordion parent with an explicit id,
  // subscribe to the shared state from an AccordionTertiary button.
  const isStandalone = !context.id && props.id
  if (isStandalone) {
    return <AccordionContentStandalone {...props} />
  }

  return <AccordionContentInner {...props} />
}

function AccordionContentStandalone({
  ref: _ref,
  ...props
}: AccordionContentProps) {
  const {
    id,
    className,
    children,
    title,
    keepInDOM: keepInDOMProp = true,
    ...rest
  } = props

  const contentRef = useRef<HTMLElement>(null)
  const { data: sharedData, set } =
    useSharedState<AccordionTertiarySharedState>(id)
  const expanded = sharedData?.expanded ?? false
  const userInteracted = sharedData?.userInteracted ?? false
  const contentId = `${id}-content`

  const handleOpen = useCallback(() => {
    if (userInteracted && contentRef.current) {
      contentRef.current.focus({ preventScroll: true })
      set({ ...sharedData, userInteracted: false })
    }
  }, [userInteracted, sharedData, set])

  const wrapperParams = useSpacing(props, {
    className: clsx(
      'dnb-accordion__content',
      'dnb-accordion__tertiary-content',
      className
    ),
    ...rest,
  })
  validateDOMAttributes(props, wrapperParams)

  return (
    <HeightAnimation
      {...wrapperParams}
      element="section"
      ref={contentRef}
      open={expanded}
      keepInDOM={keepInDOMProp}
      id={contentId}
      onOpen={handleOpen}
      tabIndex={-1}
      title={typeof title === 'string' ? title : undefined}
      aria-label={typeof title === 'string' ? title : undefined}
    >
      {children as ReactNode}
    </HeightAnimation>
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

  const setContainerHeight = () => {
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
          warn(e)
        }
      }
    }
  }

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
