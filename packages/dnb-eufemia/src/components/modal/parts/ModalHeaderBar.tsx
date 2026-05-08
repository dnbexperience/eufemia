/**
 * Web Modal Component
 *
 */

import { useContext, useEffect, useRef, useState } from 'react'
import type { HTMLProps, ReactNode } from 'react'
import clsx from 'clsx'
import Section from '../../section/Section'
import ModalContext from '../ModalContext'
import CloseButton from './CloseButton'
import type { SectionProps } from '../../Section'

export type ModalHeaderBarProps = {
  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactNode

  shadowClass?: string
} & Omit<SectionProps, 'children'>

export default function ModalHeaderBar({
  className = null,
  children = null,
  ref: _ref,
  shadowClass = null,
  ...props
}: ModalHeaderBarProps & Omit<HTMLProps<HTMLElement>, 'children'>) {
  const context = useContext(ModalContext)
  const sectionRef = useRef<HTMLElement>(null)
  const [showShadow, setShowShadow] = useState(false)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      !sectionRef.current
    ) {
      return undefined // stop here
    }

    const element = sectionRef.current
    const marginTop = -element.clientHeight

    // Find the scroll container (look for .dnb-scroll-view ancestor)
    let scrollRoot: Element | null = null
    let parent = element.parentElement
    while (parent) {
      if (parent.classList?.contains('dnb-scroll-view')) {
        scrollRoot = parent
        break
      }
      parent = parent.parentElement
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setShowShadow(!entry.isIntersecting)
      },
      {
        root: scrollRoot,
        rootMargin: `${marginTop}px 0px 0px 0px`,
        threshold: 0.001,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [children])

  const {
    hideCloseButton = false,
    closeButtonAttributes,
    onCloseClickHandler,
    closeTitle,
  } = context

  return (
    <Section
      className={clsx(
        'dnb-modal__header__bar',
        showShadow && shadowClass,
        className
      )}
      ref={sectionRef}
      {...props}
    >
      <div className="dnb-modal__header__bar__inner">
        {children as ReactNode}
      </div>

      {!hideCloseButton && (
        <div className="dnb-modal__header__bar__close">
          <CloseButton
            onClick={onCloseClickHandler}
            closeTitle={closeTitle}
            {...closeButtonAttributes}
          />
        </div>
      )}
    </Section>
  )
}
