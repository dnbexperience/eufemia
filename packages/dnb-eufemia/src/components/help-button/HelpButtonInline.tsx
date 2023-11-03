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
  const [actualContentElement, setActualContentElement] = useState(null)

  const buttonId = useRef(`${makeUniqueId()}-help-button`)
  const { contentElement, children, ...rest } = props

  useEffect(() => {
    const elementToSet = contentElement
      ? contentElement
      : document.getElementById(buttonId.current)?.parentElement
    if (!elementToSet.getAttribute('id')) {
      elementToSet.setAttribute('id', `${buttonId.current}-help-content`)
    }
    setActualContentElement(elementToSet)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentElement])

  return (
    <>
      <HelpButtonInstance
        id={buttonId.current}
        className="dnb-help-button--inline"
        on_click={() => {
          setIsOpen((open) => !open)
        }}
        icon={isOpen ? 'close' : rest.icon}
        aria-controls={
          actualContentElement
            ? actualContentElement.getAttribute('id')
            : ''
        }
        size={rest.size || 'small'}
        {...rest}
      />
      {actualContentElement && (
        <HelpButtonContent
          isOpen={isOpen}
          contentElement={actualContentElement}
          id={actualContentElement.getAttribute('id')}
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
