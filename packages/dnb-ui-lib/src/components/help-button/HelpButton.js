/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { registerElement } from '../../shared/component-helper'
import Context from '../../shared/Context'
import Modal from '../modal/Modal'
import HelpButtonInstance from './HelpButtonInstance'
import Button from '../button/Button'

export default class HelpButton extends React.PureComponent {
  static contextType = Context
  static tagName = 'dnb-help-button'

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.node,
    variant: Button.propTypes.variant,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]),
    icon_position: PropTypes.string,
    text: PropTypes.node,
    modal_content: PropTypes.node,
    modal_props: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    id: null,
    title: null,
    variant: 'secondary',
    icon: null,
    icon_position: 'left',
    text: null,
    modal_content: null,
    modal_props: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(
      HelpButton.tagName,
      HelpButton,
      HelpButton.defaultProps
    )
  }

  static getContent(props) {
    if (props.modal_content) {
      return props.modal_content
    }
    return typeof props.children === 'function'
      ? props.children(props)
      : props.children
  }

  render() {
    const {
      modal_content, // eslint-disable-line
      children, // eslint-disable-line
      modal_props,
      ...params
    } = this.props

    const content = HelpButton.getContent(this.props)

    if (params.icon === null) {
      params.icon = 'question'
    }

    if (content) {
      if (!params.title) {
        params.title = this.context.translation.HelpButton.title
      }

      return (
        <Modal trigger_props={params} {...modal_props}>
          {content}
        </Modal>
      )
    }

    return <HelpButtonInstance {...params} />
  }
}
