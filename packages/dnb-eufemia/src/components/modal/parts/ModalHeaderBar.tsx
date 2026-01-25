/**
 * Web Modal Component
 *
 */

import React from 'react'
import clsx from 'clsx'
import { isTrue } from '../../../shared/component-helper'
import Section from '../../section/Section'
import ModalContext from '../ModalContext'
import CloseButton from './CloseButton'
import { SectionProps } from '../../Section'
import { ReactChildType } from '../types'

export interface ModalHeaderBarProps
  extends Omit<SectionProps, 'children'> {
  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactChildType

  /**
   * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
   */
  className?: string

  shadowClass?: string
}

const ModalHeaderBar: React.FC<
  ModalHeaderBarProps & Omit<React.HTMLProps<HTMLElement>, 'children'>
> = (props) => {
  const context = React.useContext(ModalContext)
  const _ref = React.useRef<any>(null)
  const intersectionObserverRef = React.useRef<IntersectionObserver>(null)
  const [showShadow, setShowShadow] = React.useState(false)

  const observeHeader = React.useCallback(() => {
    if (
      typeof window !== 'undefined' &&
      typeof IntersectionObserver !== 'undefined' &&
      _ref.current
    ) {
      const marginTop = -_ref.current.clientHeight
      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          setShowShadow(!entry.isIntersecting)
        },
        {
          rootMargin: `${marginTop}px 0px 0px 0px`,
          threshold: 0.001,
        }
      )

      intersectionObserverRef.current.observe(_ref.current)
    }
  }, [])

  React.useEffect(() => {
    observeHeader()

    return () => {
      intersectionObserverRef.current?.disconnect()
    }
  }, [observeHeader])

  React.useEffect(() => {
    // Re-observe if children change
    // This is necessary to handle dynamic content changes
    // that might affect the header's height
    // e.g., when the modal content changes
    intersectionObserverRef.current?.disconnect()
    observeHeader()
  }, [props.children, observeHeader])

  const {
    className = null,
    children = null,
    ref, //eslint-disable-line
    shadowClass = null,
    ...restProps
  } = props
  const {
    hideCloseButton = false,
    closeButtonAttributes,
    onCloseClickHandler,
    closeTitle,
  } = context

  return (
    <Section
      style_type="white"
      className={clsx(
        'dnb-modal__header__bar',
        showShadow && shadowClass,
        className
      )}
      innerRef={_ref}
      {...restProps}
    >
      <div className="dnb-modal__header__bar__inner">
        {children as React.ReactNode}
      </div>

      {!isTrue(hideCloseButton) && (
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

export default ModalHeaderBar
