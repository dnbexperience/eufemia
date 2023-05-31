/**
 * Global helpers tests
 *
 */

import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import {
  setPageFocusElement,
  applyPageFocus,
  scrollToLocationHashId,
  copyToClipboard,
  getSelectedElement,
  hasSelectedText,
  getSelectedText,
  insertElementBeforeSelection,
  debounce,
  isEdge,
  isiOS,
  isSafari,
  isWin,
  isMac,
  isLinux,
  warn,
} from '../helpers'

import { mockGetSelection } from '../../core/jest/jestSetup'

// make it possible to change the navigator lang
// because "navigator.language" defaults to en-GB
let userAgentGetter, platformGetter

beforeAll(() => {
  userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
  platformGetter = jest.spyOn(window.navigator, 'platform', 'get')

  mockGetSelection()
})

describe('"applyPageFocus" should', () => {
  beforeAll(() => {
    const bodyElement = document.body
    bodyElement.insertAdjacentHTML(
      'afterbegin',
      `
      <div id="focus-content" class="focus-content">My Content</div>
      <button class="focus-button">My Button</button>
      `
    )

    setPageFocusElement('.focus-content', 'content')
  })

  beforeEach(() => {
    setPageFocusElement(undefined, 'content')
  })

  it('set a focus on the given element', () => {
    expect(document.activeElement.tagName).toBe('BODY')

    setPageFocusElement('.focus-content', 'content')
    applyPageFocus('content')

    const focusElement = document.querySelector('.focus-content')
    expect(focusElement === document.activeElement).toBe(true)
    expect(document.activeElement.tagName).toBe('DIV')
  })

  it('set attribute "tabindex" with the value -1', () => {
    applyPageFocus('.focus-content')

    const focusElement = document.querySelector('.focus-content')
    expect(focusElement.getAttribute('tabindex')).toBe('-1')
  })

  it('not set attribute "tabindex" with the value -1', () => {
    applyPageFocus('.focus-button')

    const focusElement = document.querySelector('.focus-button')
    expect(focusElement.hasAttribute('tabindex')).toBeFalsy()
  })

  it('set a css class called "dnb-no-focus"', () => {
    applyPageFocus('#focus-content')

    const focusElement = document.querySelector('.focus-content')
    expect(focusElement.getAttribute('class')).toContain('dnb-no-focus')
  })

  it('remove the "tabindex" on blur', () => {
    applyPageFocus('.focus-content')

    const focusElement = document.querySelector('.focus-content')
    fireEvent.blur(focusElement)

    expect(focusElement.getAttribute('tabindex')).toBe(null)
  })

  it('remove the "dnb-no-focus" class on blur', () => {
    applyPageFocus('#focus-content')

    const focusElement = document.querySelector('.focus-content')
    fireEvent.blur(focusElement)

    expect(focusElement.getAttribute('class')).not.toContain(
      'dnb-no-focus'
    )
  })
})

describe('"scrollToLocationHashId" should', () => {
  let scrollElement

  beforeAll(() => {
    const bodyElement = document.body
    bodyElement.insertAdjacentHTML(
      'afterbegin',
      `<div id="scroll-hash">My Content</div>`
    )

    scrollElement = document.querySelector('#scroll-hash')
  })

  window.location.hash = '#scroll-hash'

  it('have a valid dom element', () => {
    expect(scrollElement instanceof HTMLElement).toBe(true)
  })

  it('should not call scrollTo when internal "totalOffset" is 0 or less', () => {
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#unique-id',
      },
    })

    const scrollTo = jest.fn()
    jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

    render(<div id="unique-id">content</div>)

    scrollToLocationHashId({ offset: 1000 })

    expect(scrollTo).toHaveBeenCalledTimes(0)
  })

  it('will call scrollTo with correct top value', () => {
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#unique-id',
      },
    })

    const scrollTo = jest.fn()
    jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

    render(<div id="unique-id">content</div>)

    const elem = document.getElementById('unique-id')
    jest.spyOn(elem, 'offsetTop', 'get').mockReturnValue(400)

    scrollToLocationHashId({ offset: 100 })

    expect(scrollTo).toHaveBeenCalledTimes(1)
    expect(scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 300,
    })
  })

  it('will handle document.readyState', () => {
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#unique-id',
      },
    })

    const scrollTo = jest.fn()
    jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)
    jest.spyOn(document, 'readyState', 'get').mockReturnValue('loading')

    render(<div id="unique-id">content</div>)

    const elem = document.getElementById('unique-id')
    jest.spyOn(elem, 'offsetTop', 'get').mockReturnValue(300)

    scrollToLocationHashId({ offset: 100 })

    document.dispatchEvent(new Event('DOMContentLoaded'))

    expect(scrollTo).toHaveBeenCalledTimes(1)
    expect(scrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 200,
    })
  })

  it('will handle document.readyState', () => {
    Object.defineProperty(window, 'location', {
      value: undefined,
    })

    const scrollTo = jest.fn()
    jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

    render(<div id="unique-id">content</div>)

    const elem = document.getElementById('unique-id')
    jest.spyOn(elem, 'offsetTop', 'get').mockReturnValue(300)

    scrollToLocationHashId({ offset: 100 })

    expect(scrollTo).toHaveBeenCalledTimes(0)
  })
})

describe('platform', () => {
  it('"isMac" should result in true', () => {
    platformGetter.mockReturnValue('Mac')
    expect(isMac()).toBe(true)
  })
  it('"isWin" should result in true', () => {
    platformGetter.mockReturnValue('Win')
    expect(isWin()).toBe(true)
  })
  it('"isLinux" should result in true', () => {
    platformGetter.mockReturnValue('Linux')
    expect(isLinux()).toBe(true)
  })
  it('"isiOS" should result in true', () => {
    platformGetter.mockReturnValue('iPhone')
    expect(isiOS()).toBe(true)

    platformGetter.mockReturnValue('iPad')
    expect(isiOS()).toBe(true)
  })
})

describe('user agent', () => {
  it('"isEdge" should result in true', () => {
    userAgentGetter.mockReturnValue('Edge')
    expect(isEdge()).toBe(true)
  })
  it('"isSafari" should result in true', () => {
    userAgentGetter.mockReturnValue('Safari')
    expect(isSafari()).toBe(true)

    userAgentGetter.mockReturnValue('Safari Chrome')
    expect(isSafari()).toBe(false)
  })
})

describe('"copyToClipboard" should', () => {
  it('make valid copy', async () => {
    await copyToClipboard('copy')
    expect(await navigator.clipboard.readText()).toBe('copy')
  })
})

describe('selection related methods', () => {
  it('getSelectedElement should return HTML element', () => {
    expect(getSelectedElement() instanceof HTMLElement).toBe(true)
  })
  it('getSelectedText should return numbers', () => {
    expect(getSelectedText()).toBe('1234.56')
  })
  it('hasSelectedText should be true', () => {
    expect(hasSelectedText()).toBe(true)
  })
  it('insertElementBeforeSelection should be true', () => {
    const elem = document.createElement('div')
    insertElementBeforeSelection(elem)
    expect(
      window.getSelection().getRangeAt(1).getElement() instanceof
        HTMLElement
    ).toBe(true)
  })
})

describe('"debounce" should', () => {
  it('delay execution', (done) => {
    let outside = 'one'

    const debounced = debounce(({ inside }) => {
      outside = inside
      expect(outside).toBe('two')

      return 'not accessible'
    }, 1)

    const result = debounced({ inside: 'two' })

    expect(typeof debounced).toBe('function')
    expect(typeof debounced.cancel).toBe('function')

    expect(outside).toBe('one')
    expect(result).toBe(undefined)

    setTimeout(done, 2)
  })

  it('use given instance', (done) => {
    const instance = () => {}
    instance.property = 'hello'

    const debounced = debounce(
      // Needs to be a function (so we can use "this")
      function () {
        expect(this).toBe(instance)
        expect(this.property).toBe(instance.property)
      },
      1,
      { instance }
    )

    debounced()

    setTimeout(done, 2)
  })

  it('execution immediate', (done) => {
    let outside = 'one'

    const debounced = debounce(
      ({ inside }) => {
        expect(outside).toBe('one')
        outside = inside
        expect(outside).toBe('two')
      },
      1,
      { immediate: true }
    )

    debounced({ inside: 'two' })

    expect(outside).toBe('two')

    setTimeout(done, 2)
  })

  it('execution immediate and return result', (done) => {
    let outside = 'one'

    const debounced = debounce(
      ({ inside }) => {
        expect(outside).toBe('one')
        outside = inside
        expect(outside).toBe('two')

        return inside
      },
      1,
      { immediate: true }
    )

    const immediateResult = debounced({ inside: 'two' })

    expect(outside).toBe('two')
    expect(immediateResult).toBe('two')

    setTimeout(done, 2)
  })

  it('should not run debounced function when cancelled', (done) => {
    let outside = 'one'

    const debounced = debounce(({ inside }) => {
      expect(outside).toBe('one')
      outside = inside
      expect(outside).toBe('two')
    }, 1)
    debounced({ inside: 'two' })
    debounced.cancel()

    setTimeout(() => {
      expect(outside).toBe('one')
      done()
    }, 2)
  })
})

describe('"warn" should', () => {
  const log = global.console.log

  beforeEach(() => {
    global.console.log = jest.fn()
  })

  afterEach(() => {
    global.console.log = log

    jest.resetAllMocks()
  })

  it('run console.log in development', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    warn('message-1', 'message-2')

    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(
      '%cEufemia',
      'padding: 0.125rem 0.5rem 0;font-weight: bold;color: #00343E;background: #A5E1D2',
      'message-1',
      'message-2'
    )

    process.env.NODE_ENV = env
  })

  it('run console.log in test', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'test'

    warn('message-1', 'message-2')

    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(
      '\u001b[0m\u001b[1m\u001b[38;5;23m\u001b[48;5;152mEufemia\u001b[49m\u001b[39m\u001b[22m\u001b[0m',
      'message-1',
      'message-2'
    )

    process.env.NODE_ENV = env
  })

  it('run not log if NODE_ENV is production', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    warn('message-1', 'message-2')

    expect(global.console.log).toHaveBeenCalledTimes(0)

    process.env.NODE_ENV = env
  })

  it('run not use styles when not in browser', () => {
    const windowSpy = jest.spyOn(window, 'window', 'get')
    windowSpy.mockImplementation(() => undefined)

    warn('message-1', 'message-2')

    expect(global.console.log).toHaveBeenCalledTimes(1)
  })

  it('run not log if NODE_ENV is production', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    warn('message-1', 'message-2')

    expect(global.console.log).toHaveBeenCalledTimes(0)

    process.env.NODE_ENV = env
  })
})
