/**
 * Web Modal Component
 *
 */

import React from 'react'
import clsx from 'clsx'
import { extendPropsWithContextInClassComponent } from '../../../shared/component-helper'
import Button from '../../button/Button'
import Context from '../../../shared/Context'
import type { ButtonProps } from '../../button/Button'

export type CloseButtonProps = {
  /**
   * The title of the close button. Defaults to <em>Close</em> or <em>Lukk</em>.
   */
  closeTitle?: string
} & Partial<ButtonProps>

const CloseButton: React.FC<CloseButtonProps> = (props) => {
  const context = React.useContext(Context)

  // use only the props from context, who are available here anyway
  const {
    closeTitle = null,
    size = 'default',
    iconPosition = 'left',
    className = null,
    ...button_props
  } = extendPropsWithContextInClassComponent(
    props,
    {
      closeTitle: null,
      size: 'default',
      iconPosition: 'left',
      className: null,
    },
    context.getTranslation(props).Modal
  )

  return (
    <Button
      type="button"
      variant="tertiary"
      icon="close"
      text={closeTitle}
      size={size}
      iconPosition={iconPosition}
      className={clsx('dnb-modal__close-button', className)}
      {...button_props}
    />
  )
}

export default CloseButton
