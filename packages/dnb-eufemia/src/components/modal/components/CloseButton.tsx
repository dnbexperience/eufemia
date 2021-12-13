/**
 * Web Modal Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import { extendPropsWithContext } from '../../../shared/component-helper'
import Button from '../../button/Button'
import Context from '../../../shared/Context'
import { CloseButtonProps } from '../types'

export default class CloseButton extends React.PureComponent<
  CloseButtonProps & React.HTMLProps<HTMLElement>
> {
  static contextType = Context
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
      close_title = null,
      size = 'large',
      icon_position = 'left',
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
        size={size}
        icon_position={icon_position}
        {...rest}
      />
    )
  }
}
