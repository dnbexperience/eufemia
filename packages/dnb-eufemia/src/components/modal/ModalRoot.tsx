import React from 'react'
import ModalContent from './ModalContent'
import { ModalContentProps } from './types'
import PortalRoot from '../PortalRoot'

declare global {
  interface Window {
    __modalRoot: HTMLElement
  }
}

export interface ModalRootProps extends ModalContentProps {
  /**
   * The id used internal in the modal/drawer root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  id?: string
  directDomReturn?: boolean

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?:
    | React.ReactNode
    | ((props: ModalContentProps) => React.ReactNode)

  /** For internal use only */
  modalContentCloseRef?: React.RefObject<any>
}

export default function ModalRoot({
  children = null,
  directDomReturn = false,
  ...props
}: ModalRootProps) {
  if (directDomReturn) {
    return <ModalContent {...props}>{children}</ModalContent>
  }

  return (
    <PortalRoot>
      <div className="dnb-modal-root__inner">
        <ModalContent {...props}>{children}</ModalContent>
      </div>
    </PortalRoot>
  )
}
