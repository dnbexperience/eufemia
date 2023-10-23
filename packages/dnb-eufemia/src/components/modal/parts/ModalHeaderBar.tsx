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

  componentWillUnmount() {
    this.intersectionObserver?.disconnect()
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
      hide_close_button = false,
      close_button_attributes,
      onCloseClickHandler,
      close_title,
    } = this.context

    return (
      <Section
        style_type="white"
        className={classnames(
          'dnb-modal__header__bar',
          showShadow && shadow_class,
          className
        )}
        inner_ref={this._ref}
        {...props}
      >
        <div className="dnb-modal__header__bar__inner">
          {children as React.ReactNode}
        </div>

        {!isTrue(hide_close_button) && (
          <div className="dnb-modal__header__bar__close">
            <CloseButton
              on_click={onCloseClickHandler}
              close_title={close_title}
              {...close_button_attributes}
            />
          </div>
        )}
      </Section>
    )
  }
}
