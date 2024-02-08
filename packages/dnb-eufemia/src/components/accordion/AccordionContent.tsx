/**
 * Web Accordion Component
 *
 */

import React, { HTMLProps } from 'react'
import classnames from 'classnames'
import {
  warn,
  validateDOMAttributes,
  processChildren,
  getPreviousSibling,
} from '../../shared/component-helper'
import { useMediaQuery } from '../../shared'
import AccordionContext, {
  AccordionContextProps,
} from './AccordionContext'
import { createSpacingClasses } from '../space/SpacingHelper'
import HeightAnimation from '../height-animation/HeightAnimation'
import { SpacingProps } from '../space/types'

export type AccordionContentProps = Omit<
  React.HTMLProps<HTMLElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'children'
> &
  SpacingProps & {
    instance?: React.MutableRefObject<unknown>
    className?: string
    children?: React.ReactNode | ((...args: any[]) => any)
  }

export default function AccordionContent(props: AccordionContentProps) {
  const context = React.useContext<AccordionContextProps>(AccordionContext)

  const {
    id,
    expanded,
    prerender,
    prevent_rerender,
    single_container,
    disabled,
    no_animation,
    contentRef,
  } = context

  const { className, children, instance, ...rest } = props

  let elementRef = React.useRef(null)
  const cacheRef = React.useRef(null)

  if (contentRef) {
    elementRef = contentRef
  }

  const setContainerHeight = () => {
    const { single_container } = context

    if (single_container) {
      const contentElem = elementRef.current
      if (contentElem) {
        try {
          contentElem.style.height = ''

          const containerElement = getPreviousSibling(
            'dnb-accordion-group--single-container',
            contentElem
          ) as HTMLElement

          if (no_animation) {
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
      prerender,
      prevent_rerender,
      prevent_rerender_conditional,
    } = context

    let content = children

    if (typeof content === 'string') {
      content = <p className="dnb-p">{content}</p>
    }

    if (prevent_rerender) {
      /**
       * Ensure we do not render, if it is not expanded
       */
      if (!(expanded || prerender)) {
        content = null
      }

      // update the cache if children is not the same anymore
      if (prevent_rerender_conditional && cacheRef.current !== content) {
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

  React.useEffect(() => {
    if (expanded && single_container) {
      setContainerHeight()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, expanded, single_container])

  React.useState(() => {
    if (
      instance &&
      Object.prototype.hasOwnProperty.call(instance, 'current')
    ) {
      instance.current = { setContainerHeight }
    }
  })

  const isSmallScreen = useMediaQuery({
    when: { max: 'small' },
  })

  const content = renderContent()

  const wrapperParams = {
    className: classnames('dnb-accordion__content', className),
    ...rest,
  }

  const keepInDOM = prerender || prevent_rerender

  const innerParams = {
    id: `${id}-content`,
    'aria-labelledby': `${id}-header`,
    className: classnames(
      'dnb-accordion__content__inner',
      createSpacingClasses(rest)
    ),
  } as HTMLProps<HTMLElement>

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

  const animate =
    !no_animation && (single_container ? isSmallScreen : true)

  return (
    <HeightAnimation
      {...wrapperParams}
      open={expanded}
      animate={animate}
      keepInDOM={keepInDOM}
      innerRef={elementRef}
    >
      <section {...innerParams}>{content}</section>
    </HeightAnimation>
  )
}

AccordionContent._supportsSpacingProps = true
