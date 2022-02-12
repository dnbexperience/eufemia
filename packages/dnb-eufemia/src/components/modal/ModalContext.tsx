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
  hide_close_button: null,
  close_button_attributes: null,
  close_title: null,
  mode: null,
  setBackgroundColor: null,
  onCloseClickHandler: null,
  contentRef: null,
  hide: null,
  contentId: null,
  close: null,
})

export default ModalContext
