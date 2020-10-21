/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  registerElement
  // extendPropsWithContext
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import Modal from '../modal/Modal'
import HelpButtonInstance from './HelpButtonInstance'

export default class HelpButton extends React.PureComponent {
  static contextType = Context
  static tagName = 'dnb-help-button'

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.node,
    text: PropTypes.node,
    modal_content: PropTypes.node,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    id: null,
    title: null,
    text: null,
    modal_content: null,
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
      ...params
    } = this.props

    const content = HelpButton.getContent(this.props)

    if (content) {
      if (!params.title) {
        params.title = this.context.translation.HelpButton.title
      }

      return (
        <Modal as_help_button {...params}>
          {content}
        </Modal>
      )
    }

    return <HelpButtonInstance {...params} />
  }
}
