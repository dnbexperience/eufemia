/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import Context from '../../shared/Context'
import Dialog from '../dialog/Dialog'
import HelpButtonInstance from './HelpButtonInstance'
import HelpButtonInline from './HelpButtonInline'
import type { ButtonProps } from '../button/Button'
import { extendPropsWithContext } from '../../shared/component-helper'

const defaultProps = {
  variant: 'secondary',
  icon_position: 'left',
}

export type HelpButtonProps = {
  render?: (
    children: React.ReactNode,
    props: ButtonProps
  ) => React.ReactElement
  displayMethod?: false | 'dialog' | 'inline'
} & ButtonProps

export default function HelpButton(localProps: HelpButtonProps) {
  const context = React.useContext(Context)
  const props = extendPropsWithContext(localProps, defaultProps)

  const { children, render, ...params } = props

  if (params.icon === null) {
    params.icon = 'question'
  }
  if (params.displayMethod === null) {
    params.displayMethod = 'dialog'
  }

  if (!children) {
    return <HelpButtonInstance {...params} />
  }

  if (!params.title) {
    params.title = context.getTranslation(props).HelpButton.title
  }

  if (typeof render === 'function') {
    return render(children, params)
  }

  if (params.displayMethod !== 'inline') {
    return <Dialog triggerAttributes={params}>{children}</Dialog>
  }

  return <HelpButtonInline {...params}>{children}</HelpButtonInline>
}

HelpButton._supportsSpacingProps = true
