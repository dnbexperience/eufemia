import { act, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { fireEvent } from '@testing-library/react'
import Popover from '../Popover'

// React adds its event listeners only for the first root in a document, so this test needs its own file
describe('Popover rendered into the document', () => {
  it('stays open when a press inside replaces the pressed element', () => {
    function ReplaceOnPress() {
      const [count, setCount] = useState(0)
      // Browsers render before the next listener runs, as React updates in a microtask
      const replace = () => flushSync(() => setCount((count) => count + 1))

      return (
        <button
          key={count}
          id="replace-on-press"
          type="button"
          onMouseDown={replace}
          onTouchEnd={replace}
        >
          Pressed {count}
        </button>
      )
    }

    // Like Next.js App Router, which renders into the document
    const root = createRoot(document)

    try {
      act(() => {
        root.render(
          <html lang="en">
            <head />
            <body>
              <Popover
                skipPortal
                noAnimation
                openInitially
                trigger={({ ref, ...rest }) => (
                  <button type="button" ref={ref} {...rest}>
                    Toggle popover
                  </button>
                )}
              >
                <ReplaceOnPress />
              </Popover>
            </body>
          </html>
        )
      })

      const trigger = document.querySelector('button[aria-controls]')
      expect(trigger).toHaveAttribute('aria-expanded', 'true')

      fireEvent.mouseDown(document.querySelector('#replace-on-press'))
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      expect(
        document.querySelector('#replace-on-press')
      ).toHaveTextContent('Pressed 1')

      fireEvent.touchStart(document.querySelector('#replace-on-press'))
      fireEvent.touchEnd(document.querySelector('#replace-on-press'))
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      expect(
        document.querySelector('#replace-on-press')
      ).toHaveTextContent('Pressed 2')
    } finally {
      act(() => root.unmount())
    }
  })
})
