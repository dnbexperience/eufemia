import React, { useEffect, useState } from 'react'
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

  const buttonId = `${makeUniqueId()}-help-button`
  const { contentId, children, ...rest } = props

  useEffect(() => {
    let element = document.getElementById(contentId)
    if (!element) {
      element = document.getElementById(buttonId)?.parentElement
      if (!element.getAttribute('id')) {
        element.setAttribute('id', `${buttonId}-content`)
      }
    }
    setContentElement(element)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId])

  return (
    <>
      <HelpButtonInstance
        id={buttonId}
        className="dnb-help-button--inline"
        on_click={() => {
          setIsOpen((open) => !open)
        }}
        icon={isOpen ? 'close' : rest.icon}
        aria-controls={
          contentElement ? contentElement.getAttribute('id') : ''
        }
        size={rest.size || 'small'}
        {...rest}
      />
      {contentElement && (
        <HelpButtonContent
          isOpen={isOpen}
          contentElement={contentElement}
          id={contentElement.getAttribute('id')}
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
