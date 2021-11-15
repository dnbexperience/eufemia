/**
 * Web Modal Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  findElementInChildren,
  extendPropsWithContext,
} from '../../shared/component-helper'
import Section from '../section/Section'
import ModalContext from './ModalContext'
import Button from '../button/Button'
import H1 from '../../elements/H1'
import Context from '../../shared/Context'

export default class ModalHeader extends React.PureComponent {
  static contextType = ModalContext
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.node,
    className: PropTypes.string,
  }
  static defaultProps = {
    children: null,
    title: null,
    className: null,
  }

  render() {
    const { title, className, children, ...props } = this.props

    const customHeader = findElementInChildren(children, (cur) => {
      return cur.type === 'h1' || cur.type === H1
    })

    const usedTitle = title || this.context.title
    const showTitle = !customHeader && usedTitle

    return (
      <Section
        style_type="white"
        className={classnames('dnb-modal__header', className)}
        id={
          showTitle ? 'dnb-modal-' + this.context.id + '-title' : undefined
        }
        {...props}
      >
        {showTitle && (
          <h1
            className={classnames(
              'dnb-modal__title',
              'dnb-space__top--zero',
              'dnb-space__bottom--small',
              this.context.mode === 'drawer'
                ? 'dnb-h--x-large'
                : 'dnb-h--large'
            )}
          >
            {usedTitle}
          </h1>
        )}
        <div className="dnb-modal__header__inner">{children}</div>
      </Section>
    )
  }
}

export class ModalHeaderBar extends React.PureComponent {
  static contextType = ModalContext
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }
  static defaultProps = {
    children: null,
    className: null,
  }

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
    const { className, children, ...props } = this.props

    if (
      !this.context.title &&
      isTrue(this.context.hide_close_button) &&
      !this._ref.current
    ) {
      return null
    }

    return (
      <Section
        style_type="white"
        className={classnames(
          'dnb-modal__header__bar',
          this.state.showShadow && 'dnb-modal__header__bar--sticky',
          className
        )}
        inner_ref={this._ref}
        {...props}
      >
        <div className="dnb-modal__header__bar__inner">{children}</div>

        {!isTrue(this.context.hide_close_button) && (
          <div className="dnb-modal__header__bar__close">
            <CloseButton
              on_click={this.context.onCloseClickHandler}
              close_title={this.context.close_title}
              {...this.context.close_button_attributes}
            />
          </div>
        )}
      </Section>
    )
  }
}

export class CloseButton extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    on_click: PropTypes.func.isRequired,
    close_title: PropTypes.string,
    size: PropTypes.string,
    icon_position: PropTypes.string,
    className: PropTypes.string,
  }
  static defaultProps = {
    close_title: null,
    size: 'large',
    icon_position: 'left',
    className: null,
  }

  render() {
    // use only the props from context, who are available here anyway
    const {
      on_click,
      close_title,
      className = null,
      ...rest
    } = extendPropsWithContext(
      this.props,
      CloseButton.defaultProps,
      this.context.getTranslation(this.props).Modal
    )

    return (
      <Button
        type="button"
        text={close_title}
        variant="tertiary"
        className={classnames('dnb-modal__close-button', className)}
        icon="close"
        on_click={on_click}
        {...rest}
      />
    )
  }
}
