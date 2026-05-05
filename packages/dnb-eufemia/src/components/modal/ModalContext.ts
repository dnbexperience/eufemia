import { createContext } from 'react'
/**
 * Web ModalContext Context
 *
 */

const ModalContext = createContext({
  preventClick: null,
  onKeyDownHandler: null,
  id: null,
  title: null,
  hideCloseButton: null,
  closeButtonAttributes: null,
  closeTitle: null,
  onCloseClickHandler: null,
  contentRef: null,
  scrollRef: null,
  hide: null,
  contentId: null,
  close: null,
})

export default ModalContext
