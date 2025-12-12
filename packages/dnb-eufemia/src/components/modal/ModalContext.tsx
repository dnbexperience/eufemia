/**
 * Web ModalContext Context
 *
 */

import React from 'react'

const ModalContext = React.createContext({
  preventClick: null,
  onKeyDownHandler: null,
  id: null,
  title: null,
  hideCloseButton: null,
  closeButtonAttributes: null,
  closeTitle: null,
  setBackgroundColor: null,
  onCloseClickHandler: null,
  contentRef: null,
  scrollRef: null,
  hide: null,
  contentId: null,
  close: null,
})

export default ModalContext
