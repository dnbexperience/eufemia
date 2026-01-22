import React from 'react'
import ModalContent from './ModalContent'
import { ModalContentProps, ReactChildType } from './types'
import PortalRoot from '../PortalRoot'

export interface ModalRootProps extends ModalContentProps {
  /**
   * The id used internal in the modal/drawer root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  id?: string
  /**
   * The id used internal in the modal/drawer root element. Defaults to `root`, so the element id will be `dnb-modal-root`.
   */
  rootId?: string
  directDomReturn?: boolean

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactChildType

  /** For internal use only */
  modalContentCloseRef?: React.RefObject<any>
}

const ModalRoot: React.FC<ModalRootProps> = (props) => {
  const {
    children = null,
    directDomReturn = false,
    rootId = null,
    ...restProps
  } = props

  if (directDomReturn) {
    return <ModalContent {...restProps}>{children}</ModalContent>
  }

  return (
    <PortalRoot>
      <div
        id={rootId ? `dnb-modal-${rootId}` : null}
        className="dnb-modal-root__inner"
      >
        <ModalContent {...restProps}>{children}</ModalContent>
      </div>
    </PortalRoot>
  )
}

export default ModalRoot
