import React from 'react'
import ModalContent from './ModalContent'
import { ModalContentProps, ReactChildType } from './types'
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
  root_id?: string
  rootRef?: React.RefObject<HTMLElement>
  direct_dom_return?: boolean

  /**
   * The content which will appear when triggering the modal/drawer.
   */
  children?: ReactChildType

  /** For internal use only */
  modalContentCloseRef?: React.RefObject<any>
}

interface ModalRootState {
  isMounted: boolean
}

export default class ModalRoot extends React.PureComponent<
  ModalRootProps,
  ModalRootState
> {
  static defaultProps = {
    id: null,
    root_id: null,
    rootRef: null,
    direct_dom_return: false,
    children: null,
  }

  render() {
    const { children, direct_dom_return, ...props } = this.props

    if (direct_dom_return) {
      return <ModalContent {...props}>{children}</ModalContent>
    }

    return (
      <PortalRoot innerRef={this.props.rootRef}>
        <div
          id={
            this.props.root_id ? `dnb-modal-${this.props.root_id}` : null
          }
          className="dnb-modal-root__inner"
        >
          <ModalContent {...props}>{children}</ModalContent>
        </div>
      </PortalRoot>
    )
  }
}
