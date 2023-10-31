import React from 'react'
import ReactDOM from 'react-dom'
import { HelpButtonProps } from './HelpButton'
import HelpButtonInstance from './HelpButtonInstance'
import HeightAnimation from '../HeightAnimation'

export type HelpButtonInlineProps = {
  isOpen?: boolean
} & HelpButtonProps

export default function HelpButtonInline(props: HelpButtonInlineProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const { contentElement, children, ...rest } = props

  if (contentElement === null) {
    return null
  }

  const icon = isOpen ? 'close' : rest.icon

  return (
    <>
      <HelpButtonInstance
        on_click={() => {
          setIsOpen((open) => !open)
        }}
        icon={icon}
        {...rest}
      />
      <HelpButtonContent
        isOpen={isOpen}
        contentElement={contentElement}
        {...props}
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
}: HelpButtonInlineProps) {
  return ReactDOM.createPortal(
    <span>
      <HeightAnimation open={isOpen}>
        <div>{children}</div>
      </HeightAnimation>
    </span>,
    contentElement
  )
}
