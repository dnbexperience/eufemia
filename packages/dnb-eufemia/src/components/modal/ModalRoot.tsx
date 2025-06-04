import React from 'react'
import ReactDOM from 'react-dom'
import { warn, isTrue } from '../../shared/component-helper'
import SharedContext from '../../shared/Context'
import {
  getStyleScopeRootElement,
  StyleScopeContext,
} from '../../shared/IsolatedStyleScope'
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

export default class ModalRoot extends React.PureComponent<
  ModalRootProps,
  ModalRootState
> {
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

  modalRoot: HTMLDivElement | null = null

  styleScopeContext?: React.ContextType<typeof StyleScopeContext>

  insertModalRoot(id) {
    if (typeof window === 'undefined') {
      return false
    }

    try {
      const root = getStyleScopeRootElement(
        this.styleScopeContext?.scopeHash
      )
      id = `dnb-modal-${id || 'root'}`
      this.modalRoot = root.querySelector(`#${id}`)
      if (!this.modalRoot) {
        this.modalRoot = document.createElement('div')
        this.modalRoot.setAttribute('id', id)
        root.insertBefore(this.modalRoot, root.firstChild)
      }
    } catch (e) {
      warn('Modal: Could not insert dnb-modal-root', e)
    }

    return this.modalRoot
  }

  componentDidMount() {
    const { direct_dom_return = false, root_id = 'root' } = this.props
    if (!isTrue(direct_dom_return)) {
      this.insertModalRoot(root_id)

      try {
        if (!this.portalElem) {
          this.portalElem = document.createElement('div')
          this.portalElem.className = 'dnb-modal-root__inner'
        }
        if (
          this.portalElem &&
          typeof window !== 'undefined' &&
          this.modalRoot
        ) {
          this.modalRoot.appendChild(this.portalElem)
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
        this.modalRoot &&
        this.modalRoot.removeChild
      ) {
        this.modalRoot.removeChild(this.portalElem)
        this.portalElem = null
      }
    } catch (e) {
      warn(e)
    }
  }

  render() {
    return (
      <StyleScopeContext.Consumer>
        {(styleScopeContext) => {
          this.styleScopeContext = styleScopeContext
          const { children, direct_dom_return, ...props } = this.props

          if (isTrue(direct_dom_return)) {
            return <ModalContent {...props}>{children}</ModalContent>
          }

          if (
            this.portalElem &&
            typeof window !== 'undefined' &&
            this.modalRoot &&
            this.state.isMounted
          ) {
            return ReactDOM.createPortal(
              <ModalContent {...props}>{children}</ModalContent>,
              this.portalElem
            )
          }

          return null
        }}
      </StyleScopeContext.Consumer>
    )
  }
}
