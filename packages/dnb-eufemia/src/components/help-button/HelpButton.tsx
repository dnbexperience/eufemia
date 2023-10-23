/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import Context from '../../shared/Context'
import Dialog from '../dialog/Dialog'
import HelpButtonInstance from './HelpButtonInstance'
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
} & ButtonProps

export default function HelpButton(localProps: HelpButtonProps) {
  const context = React.useContext(Context)
  const props = extendPropsWithContext(localProps, defaultProps)

  const { children, render, ...params } = props

  if (params.icon === null) {
    params.icon = 'question'
  }

  if (children) {
    if (!params.title) {
      params.title = context.getTranslation(props).HelpButton.title
    }

    if (typeof render === 'function') {
      return render(children, params)
    }

    return <Dialog triggerAttributes={params}>{children}</Dialog>
  }

  return <HelpButtonInstance {...params} />
}

HelpButton._supportsSpacingProps = true
