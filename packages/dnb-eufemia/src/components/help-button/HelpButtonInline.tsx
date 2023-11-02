import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { HelpButtonProps } from './HelpButton'
import HelpButtonInstance from './HelpButtonInstance'
import HeightAnimation from '../HeightAnimation'
import { makeUniqueId } from '../../shared/component-helper'

export type HelpButtonInlineProps = {
  isOpen?: boolean
} & HelpButtonProps

export type HelpButtonContentProps = {
  isOpen: boolean
  contentElement: Element
  children: React.ReactNode | string
  id: string
}

export default function HelpButtonInline(props: HelpButtonInlineProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { contentElement, children, ...rest } = props

  const contentElementId = useRef('')
  useEffect(() => {
    contentElementId.current =
      contentElement.getAttribute('id') || makeUniqueId()
  }, [contentElement])

  if (contentElement === null) {
    return null
  }

  return (
    <>
      <HelpButtonInstance
        className="dnb-help-button--inline"
        on_click={() => {
          setIsOpen((open) => !open)
        }}
        icon={isOpen ? 'close' : rest.icon}
        aria-controls={contentElementId.current}
        size={rest.size || 'small'}
        {...rest}
      />
      <HelpButtonContent
        isOpen={isOpen}
        contentElement={contentElement}
        id={contentElementId.current}
      >
        {children}
      </HelpButtonContent>
    </>
  )
}

function HelpButtonContent({
  isOpen,
  contentElement,
  children,
  id,
}: HelpButtonContentProps) {
  return ReactDOM.createPortal(
    <span id={id}>
      <HeightAnimation open={isOpen}>
        <div className="dnb-help-button-content">{children}</div>
      </HeightAnimation>
    </span>,
    contentElement
  )
}
