import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { HelpButtonProps } from './HelpButton'
import HelpButtonInstance from './HelpButtonInstance'
import HeightAnimation from '../HeightAnimation'
import { makeUniqueId } from '../../shared/component-helper'

type HelpButtonContentProps = {
  isOpen: boolean
  contentElement: Element
  children: React.ReactNode | string
  id: string
}

export default function HelpButtonInline(props: HelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [contentElement, setContentElement] = useState(null)

  const { contentId: contentContainerId, children, ...rest } = props

  const baseId = useRef(rest.id ? rest.id : makeUniqueId())
  const contentId = `${baseId.current}-content`

  useEffect(() => {
    const element = document.getElementById(contentContainerId)
      ? document.getElementById(contentContainerId)
      : document.getElementById(baseId.current)?.parentElement
    setContentElement(element)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentContainerId])

  return (
    <>
      <HelpButtonInstance
        className="dnb-help-button--inline"
        on_click={() => {
          setIsOpen((open) => !open)
        }}
        icon={isOpen ? 'close' : rest.icon}
        aria-controls={contentId}
        size={rest.size || 'small'}
        {...rest}
        id={baseId.current}
      />
      {contentElement && (
        <HelpButtonContent
          isOpen={isOpen}
          contentElement={contentElement}
          id={contentId}
        >
          {children}
        </HelpButtonContent>
      )}
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
