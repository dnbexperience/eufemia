/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const DrawerScrollViewSetup = () => (
  <ComponentBox useRender data-visual-test="drawer-scroll-view">
    {
      /* jsx */ `
const DrawerMock = () => {
  const scrollRef = React.useRef()
  const innerRef = React.useRef()
  const [errorMessage, setErrorMessage] = React.useState(null)

  const message = errorMessage
    ? errorMessage
    : 'Yes, the "dnb-scroll-view" is used!'

  return (
    <Drawer
      contentRef={innerRef}
      scrollRef={scrollRef}
      onOpen={() => {
        const innerOverflowY = window.getComputedStyle(
          innerRef.current
        ).overflowY

        const contentElem = scrollRef.current.querySelector(
          '.dnb-drawer__content'
        )
        const contentOverflowY =
          window.getComputedStyle(contentElem)?.overflowY

        const scxrollOverflowY = window.getComputedStyle(
          scrollRef.current
        ).overflowY

        if (contentOverflowY !== 'visible') {
          setErrorMessage(
            '.dnb-drawer__content was "'+contentOverflowY+'" and not "visible"'
          )
        } else if (innerOverflowY !== 'visible') {
          setErrorMessage(
            '.dnb-drawer__inner was "'+innerOverflowY+'" and not "visible"'
          )
        } else if (scxrollOverflowY !== 'auto') {
          setErrorMessage('.dnb-scroll-view was not "auto"')
        }
      }}
    >
      <Drawer.Body>
        <div style={{ height: '100rem' }}>
          <div className="drawer-scroll-view">
            <P size="x-large">{message}</P>
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  )
}
render(<DrawerMock />)
`
    }
  </ComponentBox>
)
