/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import Context from '../../shared/Context'
import Dialog from '../dialog/Dialog'
import HelpButtonInstance from './HelpButtonInstance'
import {
  HelpButtonInline,
  HelpButtonInlineContent,
} from './HelpButtonInline'
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
  displayMethod?: 'dialog' | 'inline'
  contentId?: string
} & ButtonProps

export default function HelpButton(localProps: HelpButtonProps) {
  const context = React.useContext(Context)
  const props = extendPropsWithContext(localProps, defaultProps)

  const { children, render, displayMethod, ...params } = props

  if (params.icon === null) {
    params.icon = 'question'
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

  if (displayMethod === 'inline') {
    // console.log(props)
    return <HelpButtonInline {...params}>{children}</HelpButtonInline>
  }

  return <Dialog triggerAttributes={params}>{children}</Dialog>
}

// HelpButton.Content = ({ id }) => {
//   console.log('id', id)
//   return <span id={id} />
// }
HelpButton.Content = HelpButtonInlineContent
HelpButton._supportsSpacingProps = true
