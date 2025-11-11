/**
 * Web Modal Component
 *
 */

import React from 'react'
import classnames from 'classnames'
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

  shadow_class?: string
}

interface ModalHeaderBarState {
  showShadow: boolean
}

export default class ModalHeaderBar extends React.PureComponent<
  ModalHeaderBarProps & Omit<React.HTMLProps<HTMLElement>, 'children'>,
  ModalHeaderBarState
> {
  static contextType = ModalContext

  context!: React.ContextType<typeof ModalContext>

  _ref: React.RefObject<any>
  intersectionObserver: IntersectionObserver

  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  state = { showShadow: false }

  componentDidMount() {
    this.observeHeader()
  }

  componentDidUpdate(prevProps) {
    // Re-observe if children change
    // This is necessary to handle dynamic content changes
    // that might affect the header's height
    // e.g., when the modal content changes
    if (prevProps.children !== this.props.children) {
      this.intersectionObserver?.disconnect()
      this.observeHeader()
    }
  }

  componentWillUnmount() {
    this.intersectionObserver?.disconnect()
  }

  observeHeader() {
    if (
      typeof window !== 'undefined' &&
      typeof IntersectionObserver !== 'undefined' &&
      this._ref.current
    ) {
      const marginTop = -this._ref.current.clientHeight
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          this.setState({
            showShadow: !entry.isIntersecting,
          })
        },
        {
          rootMargin: `${marginTop}px 0px 0px 0px`,
          threshold: 0.001,
        }
      )

      this.intersectionObserver.observe(this._ref.current)
    }
  }

  render() {
    const {
      className = null,
      children = null,
      ref, //eslint-disable-line
      shadow_class = null,
      ...props
    } = this.props
    const { showShadow } = this.state
    const {
      hideCloseButton = false,
      closeButtonAttributes,
      onCloseClickHandler,
      closeTitle,
    } = this.context

    return (
      <Section
        style_type="white"
        className={classnames(
          'dnb-modal__header__bar',
          showShadow && shadow_class,
          className
        )}
        innerRef={this._ref}
        {...props}
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
}
