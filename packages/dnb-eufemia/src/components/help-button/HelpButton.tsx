/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import Context from '../../shared/Context'
import Dialog from '../dialog/Dialog'
import HelpButtonInstance from './HelpButtonInstance'
import { ButtonProps } from '../button/Button'
import { DialogProps } from '../dialog/types'
import { extendPropsWithContext } from '../../shared/component-helper'

const defaultProps = {
  variant: 'secondary',
  icon_position: 'left',
}

export type HelpButtonProps = {
  modal_content?: React.ReactNode
  modal_props?: DialogProps
} & ButtonProps

export default function HelpButton(localProps: HelpButtonProps) {
  const getContent = (props: HelpButtonProps) => {
    if (props.modal_content) {
      return props.modal_content
    }
    return typeof props.children === 'function'
      ? props.children(props)
      : props.children
  }

  const context = React.useContext(Context)
  const props = extendPropsWithContext(localProps, defaultProps)
  const content = getContent(props)

  const {
    modal_content, // eslint-disable-line
    children, // eslint-disable-line
    modal_props,
    ...params
  } = props

  if (params.icon === null) {
    params.icon = 'question'
  }

  if (content) {
    if (!params.title) {
      params.title = context.getTranslation(props).HelpButton.title
    }

    return (
      <Dialog triggerAttributes={params} {...modal_props}>
        {content}
      </Dialog>
    )
  }

  return <HelpButtonInstance {...params} />
}
