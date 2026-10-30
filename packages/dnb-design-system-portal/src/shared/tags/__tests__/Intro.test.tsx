import { createElement, type ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { navigate } from 'portal-query'
import Intro from '../Intro'

vi.mock('portal-query', () => ({ navigate: vi.fn() }))
vi.mock('@dnb/eufemia/src', () => ({
  Anchor: 'a',
  Button: 'button',
  Space: 'div',
}))
vi.mock('../Anchor', () => ({ Link: 'a' }))

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(window.history, 'back').mockImplementation(() => undefined)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

function renderIntro(control?: ReactNode) {
  return render(
    <Intro>
      <h1 tabIndex={-1}>Typography</h1>
      {control}
      <a href="/uilib/intro/08-color-usage">Next</a>
    </Intro>
  )
}

describe('Intro keyboard shortcuts', () => {
  it.each(['ArrowLeft', 'ArrowRight'])(
    'keeps normal %s navigation from the page heading',
    (key) => {
      renderIntro()
      const heading = document.querySelector('h1')
      heading.focus()
      fireEvent.keyDown(heading, { key })

      if (key === 'ArrowRight') {
        expect(navigate).toHaveBeenCalledExactlyOnceWith(
          '/uilib/intro/08-color-usage'
        )
        expect(window.history.back).not.toHaveBeenCalled()
      } else {
        expect(window.history.back).toHaveBeenCalledOnce()
        expect(navigate).not.toHaveBeenCalled()
      }
    }
  )

  it.each(['input', 'textarea', 'select', 'button', 'pre', 'a'])(
    'leaves arrow keys to the focused %s',
    (tag) => {
      renderIntro(createElement(tag, { id: 'control', tabIndex: 0 }))
      const control = document.querySelector<HTMLElement>('#control')
      control.focus()
      expect(document.activeElement).toBe(control)

      fireEvent.keyDown(control, { key: 'ArrowRight' })
      fireEvent.keyDown(control, { key: 'ArrowLeft' })
      expect(navigate).not.toHaveBeenCalled()
      expect(window.history.back).not.toHaveBeenCalled()
    }
  )

  it('leaves arrow keys to nested code inside a focused scroll area', () => {
    renderIntro(
      <pre>
        <code>Wide code</code>
      </pre>
    )
    const codeBlock = document.querySelector('pre')
    codeBlock.tabIndex = 0
    codeBlock.focus()
    fireEvent.keyDown(document.querySelector('code'), {
      key: 'ArrowRight',
    })

    expect(navigate).not.toHaveBeenCalled()
  })

  it('leaves arrow keys to a custom focusable control', () => {
    renderIntro(
      <div
        role="slider"
        tabIndex={0}
        aria-label="Value"
        aria-valuenow={0}
      />
    )
    const control = document.querySelector<HTMLElement>('[role="slider"]')
    control.focus()
    fireEvent.keyDown(control, { key: 'ArrowRight' })
    fireEvent.keyDown(control, { key: 'ArrowLeft' })

    expect(navigate).not.toHaveBeenCalled()
    expect(window.history.back).not.toHaveBeenCalled()
  })

  it('leaves arrow keys to an editable region', () => {
    renderIntro(
      <div contentEditable tabIndex={-1} suppressContentEditableWarning />
    )
    const control = document.querySelector<HTMLElement>(
      '[contenteditable]'
    )
    control.focus()
    expect(document.activeElement).toBe(control)
    fireEvent.keyDown(control, { key: 'ArrowRight' })

    expect(navigate).not.toHaveBeenCalled()
  })

  it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])(
    'does not navigate when %s is pressed',
    (modifier) => {
      renderIntro()
      fireEvent.keyDown(document.body, {
        key: 'ArrowRight',
        [modifier]: true,
      })
      fireEvent.keyDown(document.body, {
        key: 'ArrowLeft',
        [modifier]: true,
      })

      expect(navigate).not.toHaveBeenCalled()
      expect(window.history.back).not.toHaveBeenCalled()
    }
  )

  it('does not navigate after a child handles the key', () => {
    renderIntro(
      <div
        role="button"
        tabIndex={-1}
        onKeyDown={(event) => event.preventDefault()}
      >
        Handled
      </div>
    )
    fireEvent.keyDown(document.querySelector('h1').nextElementSibling, {
      key: 'ArrowRight',
    })

    expect(navigate).not.toHaveBeenCalled()
  })

  it('removes its keyboard listener on unmount', () => {
    const { unmount } = renderIntro()
    unmount()
    fireEvent.keyDown(document.body, { key: 'ArrowRight' })
    fireEvent.keyDown(document.body, { key: 'ArrowLeft' })

    expect(navigate).not.toHaveBeenCalled()
    expect(window.history.back).not.toHaveBeenCalled()
  })
})
