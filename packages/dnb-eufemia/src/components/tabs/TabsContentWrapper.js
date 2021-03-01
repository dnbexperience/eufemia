import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { validateDOMAttributes } from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

export default class ContentWrapper extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    selected_key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    children: PropTypes.node.isRequired
  }
  static defaultProps = {
    selected_key: null
  }
  render() {
    const { id, children, selected_key: key, ...rest } = this.props

    if (!children) {
      return <></>
    }

    const params = rest

    if (key) {
      params['aria-labelledby'] = `${id}-tab-${key}`
    }

    validateDOMAttributes(this.props, params)

    return (
      <div
        role="tabpanel"
        tabIndex="0"
        id={`${id}-content`}
        className={classnames(
          'dnb-tabs__content dnb-no-focus',
          createSpacingClasses(rest)
        )}
        {...params}
      >
        {children}
      </div>
    )
  }
}
