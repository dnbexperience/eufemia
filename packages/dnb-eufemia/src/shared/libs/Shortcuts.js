import keycode from 'keycode'
import { warn } from '../component-helper'

export class createShortcut {
  constructor() {
    this.eventTracker = []
    this.shortcutExists = []
  }

  // Lets you add a new shortcut
  add(shortcut, callback, onDone, element = null) {
    // Prevents multiple additions of the same shortcut
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      this.shortcutExists[shortcut] === true
    ) {
      return
    }

    try {
      element = element || document
      const timeout = { id: null }

      const keyDown = (e) => {
        try {
          const event = e || window.event
          const code = keycode(event)
          const shortcuts = shortcut.split('+')
          const metaWanted = {
            cmd: false,
            ctrl: false,
            shift: false,
            alt: false,
          }
          const metaPressed = {
            cmd: event.metaKey,
            ctrl: event.ctrlKey,
            shift: event.shiftKey,
            alt: event.altKey,
          }

          let matches = 0
          shortcuts.forEach((cut) => {
            switch (cut) {
              case 'cmd':
              case 'ctrl':
              case 'shift':
              case 'alt':
                {
                  metaWanted[cut] = true
                  matches++
                }
                break
              default:
                {
                  if (cut === code) {
                    matches++
                  }
                }
                break
            }
            // if (cut.length > 1) {
            //   if (keycodes[cut] === keypress) {
            //     matches++
            //   }
            // }
          })

          // If we have matched the shortcut we issue the callback
          if (
            matches === shortcuts.length &&
            metaWanted.cmd === metaPressed.cmd &&
            metaWanted.ctrl === metaPressed.ctrl &&
            metaWanted.shift === metaPressed.shift &&
            metaWanted.alt === metaPressed.alt
          ) {
            callback(event)
            if (typeof onDone === 'function') {
              clearTimeout(timeout.id)
              timeout.id = setTimeout(onDone, 10)
            }
          }
        } catch (e) {
          warn(e)
        }
      }

      const keyUp = (e) => {
        if (typeof onDone === 'function') {
          onDone(e)
        }
      }

      // Add the event listener
      element.addEventListener('keydown', keyDown)
      element.addEventListener('keyup', keyUp)

      // Cache the event data so it can be removed later
      this.eventTracker[shortcut] = {
        timeout,
        element,
        keyDown,
        keyUp,
      }

      this.shortcutExists[shortcut] = true
    } catch (e) {
      warn(e)
    }
  }

  remove(shortcut) {
    try {
      shortcut = shortcut.toLowerCase()

      if (this.eventTracker[shortcut]) {
        const { timeout, element, keyDown, keyUp } = this.eventTracker[
          shortcut
        ]

        element.removeEventListener('keydown', keyDown, false)
        element.removeEventListener('keyup', keyUp, false)

        clearTimeout(timeout.id)

        delete this.eventTracker[shortcut]
        this.shortcutExists[shortcut] = false
      }
    } catch (e) {
      //
    }
  }
}
