/**
 * To showcase the usage of the dnb-ui-lib in Angular
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Icon } from 'dnb-ui-lib/components'; // optional, import "dnb-ui-lib/components/web-components" to enable Web Components

class ReactComponent extends Component {
  static propTypes = {
    icon: PropTypes.func,
    message: PropTypes.string.isRequired,
    onMessageChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };
  static defaultProps = {
    icon: null
  };

  render() {
    const {
      icon,
      message,
      onMessageChange,
      onClick,
      ...rest
    } = this.props;

    return (
      <div>
        <h1 className="dnb-h1">React Component(s)</h1>
        <Input
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
      </div>
    );
  }
}

export default ReactComponent;
