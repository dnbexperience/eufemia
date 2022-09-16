/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  convertJsxToString,
  usePropsWithContext,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses } from '../space/SpacingHelper'
import Button, { ButtonProps } from '../button/Button'

const defaultProps = {
  variant: 'secondary',
  icon_position: 'left',
}

export default function HelpButtonInstance(localProps: ButtonProps) {
  const context = React.useContext(Context)

  // use only the props from context, who are available here anyway
  const props = usePropsWithContext(
    localProps,
    defaultProps,
    context.FormRow,
    context.HelpButton
  )

  const {
    size,
    icon,
    on_click,
    className,
    class: _className,
    ...rest
  } = props

  const params = {
    className: classnames(
      'dnb-help-button',
      createSpacingClasses(props),
      className,
      _className
    ),
    size,
    icon,
    ...rest,
  }

  const isPotentialHelpButton =
    !params.text || params.variant === 'tertiary'

  if (isPotentialHelpButton && !params.icon && params.icon !== false) {
    params.icon = 'question'
  }

  const isHelpButton =
    isPotentialHelpButton &&
    ['question', 'information'].includes(String(params.icon))

  if (isHelpButton) {
    if (!params['aria-roledescription']) {
      params['aria-roledescription'] =
        context.getTranslation(props).HelpButton.aria_role
    }
  }

  if (!params.text && !params['aria-label']) {
    let ariaLabel = convertJsxToString(props.title || props.children)
    if (!ariaLabel) {
      ariaLabel = context.getTranslation(props).HelpButton.title
    }
    params['aria-label'] = ariaLabel
  }

  if (icon === 'information' && !size) {
    params.icon_size = 'medium'
  }
  if (params.title && !params.tooltip && params.tooltip !== false) {
    params.tooltip = params.title
  }
  if (params.tooltip) {
    params.title = null
  }

  return <Button on_click={on_click} {...params} />
}
