import React, { useMemo } from 'react'
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
  const controlId = useMemo(() => {
    return contentId ? contentId : makeUniqueId()
  }, [contentId])

  const { data, update } =
    useSharedState<HelpButtonInlineSharedStateDataProps>(controlId, {
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
        aria-controls={`${controlId}-content`}
        size={rest.size || 'small'}
        {...rest}
        id={controlId}
      />
      {/* If contentId is not given, we expect the content element to be rendered elsewhere */}
      {!contentId && (
        <HelpButtonInlineContent contentId={controlId}>
          {children}
        </HelpButtonInlineContent>
      )}
    </>
  )
}

export type HelpButtonInlineContentProps = {
  contentId: string
  children?: React.ReactNode | string
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
