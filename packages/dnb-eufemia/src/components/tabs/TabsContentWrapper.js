import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  validateDOMAttributes,
  isTrue
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Section from '../section/Section'

export default class ContentWrapper extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    selected_key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    content_style: PropTypes.string,
    content_spacing: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    children: PropTypes.node.isRequired
  }
  static defaultProps = {
    selected_key: null,
    content_style: null,
    content_spacing: true
  }
  render() {
    const {
      id,
      children,
      selected_key: key,
      content_style,
      content_spacing,
      ...rest
    } = this.props

    if (!children) {
      return <></>
    }

    const params = rest

    if (key) {
      params['aria-labelledby'] = `${id}-tab-${key}`
    }

    validateDOMAttributes(this.props, params)

    const Content = content_style ? Section : 'div'

    return (
      <Content
        role="tabpanel"
        tabIndex="0"
        id={`${id}-content`}
        spacing={content_style ? false : undefined}
        style_type={content_style ? content_style : undefined}
        element={content_style ? 'div' : undefined}
        className={classnames(
          'dnb-tabs__content dnb-no-focus',
          isTrue(content_spacing) && 'dnb-tabs__content--spacing',
          createSpacingClasses(rest)
        )}
        {...params}
      >
        {children}
      </Content>
    )
  }
}
