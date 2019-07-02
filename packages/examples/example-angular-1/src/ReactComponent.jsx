/**
 * To showcase the usage of the dnb-ui-lib in Angular
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Icon } from 'dnb-ui-lib'
import { H1 } from 'dnb-ui-lib/elements'

class ReactComponent extends Component {
  static propTypes = {
    icon: PropTypes.func,
    iconJsx: PropTypes.func,
    message: PropTypes.string.isRequired,
    onMessageChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  }
  static defaultProps = {
    icon: null,
    iconJsx: null
  }

  render() {
    const {
      icon,
      iconJsx,
      message,
      onMessageChange,
      onClick,
      ...rest
    } = this.props

    return (
      <div>
        <H1>React Components inside Angular</H1>
        <Input
          label="Label:"
          placeholder="Type someting ..."
          value={message}
          on_change={onMessageChange}
        />
        <Button
          text="Button with Icon"
          icon="chevron_right"
          on_click={onClick}
        />
        {icon && <Icon icon={icon} {...rest} />}
        {iconJsx && <Icon icon={iconJsx} />}
      </div>
    )
  }
}

export default ReactComponent
