/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import Context from '../../shared/Context'
import Dialog from '../dialog/Dialog'
import HelpButtonInstance from './HelpButtonInstance'
import type { ButtonProps } from '../button/Button'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type HelpButtonProps = {
  render?: (
    children: React.ReactNode,
    props: ButtonProps
  ) => React.ReactElement
} & ButtonProps

export default function HelpButton({
  variant = 'secondary',
  iconPosition = 'left',
  children,
  render,
  ...rest
}: HelpButtonProps) {
  const context = React.useContext(Context)

  const params = { variant, iconPosition, ...rest } as Record<
    string,
    unknown
  >

  if (params.size === 'small') {
    params.bounding = true
  }

  if (params.icon === null) {
    params.icon = 'question'
  }

  if (children) {
    if (!params.title) {
      params.title = context.getTranslation(params).HelpButton.title
    }

    if (typeof render === 'function') {
      return render(children, params)
    }

    return <Dialog triggerAttributes={params}>{children}</Dialog>
  }

  return <HelpButtonInstance {...params} />
}

withComponentMarkers(HelpButton, { _supportsSpacingProps: true })
