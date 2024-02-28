import React, { useRef } from 'react'
import { HelpButtonProps } from './HelpButton'
import HelpButtonInstance from './HelpButtonInstance'
import HeightAnimation from '../HeightAnimation'
import { makeUniqueId } from '../../shared/component-helper'
import { useSharedState } from '../../shared/helpers/useSharedState'

export type HelpButtonInlineSharedStateDataProps = {
  isOpen: boolean
}

export function HelpButtonInline({
  contentId,
  children,
  ...rest
}: HelpButtonProps) {
  const id = useRef(contentId ? contentId : makeUniqueId())

  const { data, update } =
    useSharedState<HelpButtonInlineSharedStateDataProps>(id.current, {
      isOpen: false,
    })

  const onClickHandler = ({ event }) => {
    event.preventDefault()
    update({ isOpen: !data.isOpen })
  }

  return (
    <>
      <HelpButtonInstance
        className="dnb-help-button--inline"
        on_click={onClickHandler}
        icon={data.isOpen ? 'close' : rest.icon}
        aria-controls={`${id.current}-content`}
        size={rest.size || 'small'}
        {...rest}
        id={id.current}
      />
      {!contentId && (
        <HelpButtonInlineContent contentId={id.current}>
          {children}
        </HelpButtonInlineContent>
      )}
    </>
  )
}

export type HelpButtonInlineContentProps = {
  contentId: string
  children: React.ReactNode | string
}

export function HelpButtonInlineContent({
  contentId,
  children,
}: HelpButtonInlineContentProps) {
  const { data } =
    useSharedState<HelpButtonInlineSharedStateDataProps>(contentId)
  return (
    <HeightAnimation id={`${contentId}-content`} open={data.isOpen}>
      <div className="dnb-help-button-content">{children}</div>
    </HeightAnimation>
  )
}
