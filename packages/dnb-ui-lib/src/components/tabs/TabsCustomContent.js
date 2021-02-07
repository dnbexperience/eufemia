import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  spacingPropTypes,
  createSpacingClasses
} from '../space/SpacingHelper'

// import {
//   validateDOMAttributes,
// } from '../../shared/component-helper'

// This component is only a dummy component to collect data
/*
  Like:
  <Tabs>
    <Tabs.Content title="first" selected disabled>first</Tabs.Content>
    <Tabs.Content title="second">second</Tabs.Content>
  </Tabs>
 */
export default class CustomContent extends React.PureComponent {
  static propTypes = {
    displayName: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func
    ]), // eslint-disable-line
    hash: PropTypes.string, // eslint-disable-line
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // eslint-disable-line
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // eslint-disable-line

    ...spacingPropTypes,

    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    class: PropTypes.string
  }
  static defaultProps = {
    displayName: 'CustomContent',
    title: null,
    hash: null,
    selected: null,
    disabled: null,
    className: null,
    class: null
  }
  render() {
    const {
      children,
      displayName, // eslint-disable-line
      title, // eslint-disable-line
      hash, // eslint-disable-line
      selected, // eslint-disable-line
      disabled, // eslint-disable-line
      className,
      class: _className,
      ...rest
    } = this.props
    return (
      <div
        className={classnames(
          'dnb-tabs__content__inner',
          createSpacingClasses(rest),
          className,
          _className
        )}
      >
        {children}
      </div>
    )
  }
}
