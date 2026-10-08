import { createContext } from 'react'

export const MODAL_OPEN_EVENT = 'dnb-modal-open'
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
