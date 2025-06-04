import React from 'react'
import ReactDOM from 'react-dom'
import { warn, isTrue } from '../../shared/component-helper'
import SharedContext from '../../shared/Context'
import ModalContent from './ModalContent'
import { ModalContentProps, ReactChildType } from './types'

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

interface ModalRootContext {
  styleScope?: string
}

export default class ModalRoot extends React.PureComponent<
  ModalRootProps,
  ModalRootState
> {
  context!: ModalRootContext
  portalElem: HTMLDivElement | null
  static contextType = SharedContext
  static defaultProps = {
    id: null,
    root_id: 'root',
    direct_dom_return: false,
    children: null,
  }

  state = {
    isMounted: false,
  }

  static insertModalRoot(id, styleScope) {
    if (typeof window === 'undefined') {
      return false
    }

    try {
      id = `dnb-modal-${id || 'root'}`
      window.__modalRoot = document.getElementById(id)
      if (!window.__modalRoot) {
        window.__modalRoot = document.createElement('div')
        window.__modalRoot.setAttribute('id', id)
        const root = styleScope
          ? document.querySelector(`.${styleScope}`)
          : document.body
        root.insertBefore(window.__modalRoot, root.firstChild)
      }
    } catch (e) {
      warn('Modal: Could not insert dnb-modal-root', e)
    }

    return window.__modalRoot
  }

  componentDidMount() {
    const { direct_dom_return = false, root_id = 'root' } = this.props
    if (!isTrue(direct_dom_return)) {
      ModalRoot.insertModalRoot(root_id, this.context?.styleScope)

      try {
        if (!this.portalElem) {
          this.portalElem = document.createElement('div')
          this.portalElem.className = 'dnb-modal-root__inner'
        }
        if (
          this.portalElem &&
          typeof window !== 'undefined' &&
          window.__modalRoot
        ) {
          window.__modalRoot.appendChild(this.portalElem)
        }
      } catch (e) {
        warn(e)
      }
      this.setState({ isMounted: true })
    }
  }

  componentWillUnmount() {
    try {
      if (
        this.portalElem &&
        typeof window !== 'undefined' &&
        window.__modalRoot &&
        window.__modalRoot.removeChild
      ) {
        window.__modalRoot.removeChild(this.portalElem)
        this.portalElem = null
      }
    } catch (e) {
      warn(e)
    }
  }

  render() {
    const { children, direct_dom_return, ...props } = this.props

    if (isTrue(direct_dom_return)) {
      return <ModalContent {...props}>{children}</ModalContent>
    }

    if (
      this.portalElem &&
      typeof window !== 'undefined' &&
      window.__modalRoot &&
      this.state.isMounted
    ) {
      return ReactDOM.createPortal(
        <ModalContent {...props}>{children}</ModalContent>,
        this.portalElem
      )
    }

    return null
  }
}
