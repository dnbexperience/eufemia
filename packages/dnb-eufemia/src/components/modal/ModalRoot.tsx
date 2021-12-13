import React from 'react'
import ReactDOM from 'react-dom'
import { warn, isTrue } from '../../shared/component-helper'
import ModalContent from './ModalContent'
import { ModalRootProps } from './types'

declare global {
  interface Window {
    __modalRoot: HTMLElement
  }
}

interface ModalRootState {
  isMounted: boolean
}

export default class ModalRoot extends React.PureComponent<
  ModalRootProps & React.HTMLProps<HTMLElement>,
  ModalRootState
> {
  portalElem: HTMLDivElement | null
  static defaultProps = {
    id: null,
    root_id: null,
    direct_dom_return: false,
    children: null,
  }

  state = {
    isMounted: false,
  }

  static insertModalRoot(id) {
    if (typeof window === 'undefined') {
      return false
    }

    try {
      id = `dnb-modal-${id || 'root'}`
      window.__modalRoot = document.getElementById(id)
      if (!window.__modalRoot) {
        window.__modalRoot = document.createElement('div')
        window.__modalRoot.setAttribute('id', id)
        document.body.insertBefore(
          window.__modalRoot,
          document.body.firstChild
        )
      }
    } catch (e) {
      warn('Modal: Could not insert dnb-modal-root', e)
    }

    return window.__modalRoot
  }

  componentDidMount() {
    const { direct_dom_return, root_id } = this.props
    if (!isTrue(direct_dom_return)) {
      ModalRoot.insertModalRoot(root_id)

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
    const {
      children,
      direct_dom_return,
      ref, //eslint-disable-line
      ...props
    } = this.props

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
