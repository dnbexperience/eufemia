/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Drawer, P } from '@dnb/eufemia/src'

export const DrawerScrollViewSetup = () => (
  <ComponentBox data-visual-test="drawer-scroll-view">
    {() => {
      const DrawerMock = () => {
        const scrollRef = React.useRef(null)
        const innerRef = React.useRef(null)
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
                innerRef.current,
              ).overflowY

              const contentElem = scrollRef.current.querySelector(
                '.dnb-drawer__content',
              )
              const contentOverflowY =
                window.getComputedStyle(contentElem)?.overflowY

              const scrollOverflowY = window.getComputedStyle(
                scrollRef.current,
              ).overflowY

              if (contentOverflowY !== 'visible') {
                setErrorMessage(
                  '.dnb-drawer__content was "' +
                    contentOverflowY +
                    '" and not "visible"',
                )
              } else if (innerOverflowY !== 'visible') {
                setErrorMessage(
                  '.dnb-drawer__inner was "' +
                    innerOverflowY +
                    '" and not "visible"',
                )
              } else if (scrollOverflowY !== 'auto') {
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
      return <DrawerMock />
    }}
  </ComponentBox>
)
