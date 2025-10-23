/**
 * Web Modal Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import { extendPropsWithContextInClassComponent } from '../../../shared/component-helper'
import Button from '../../button/Button'
import Context, { ContextProps } from '../../../shared/Context'
import type { ButtonProps } from '../../button/Button'

export type CloseButtonProps = {
  /**
   * The title of the close button. Defaults to <em>Close</em> or <em>Lukk</em>.
   */
  closeTitle?: string
} & Partial<ButtonProps>

export default class CloseButton extends React.PureComponent<CloseButtonProps> {
  static contextType = Context

  context!: ContextProps

  static defaultProps = {
    closeTitle: null,
    size: 'default',
    icon_position: 'left',
    className: null,
  }

  render() {
    // use only the props from context, who are available here anyway
    const {
      closeTitle = null,
      size = 'default',
      icon_position = 'left',
      className = null,
      ...button_props
    } = extendPropsWithContextInClassComponent(
      this.props,
      CloseButton.defaultProps,
      this.context.getTranslation(this.props).Modal
    )

    return (
      <Button
        type="button"
        variant="tertiary"
        icon="close"
        text={closeTitle}
        size={size}
        icon_position={icon_position}
        className={classnames('dnb-modal__close-button', className)}
        {...button_props}
      />
    )
  }
}
