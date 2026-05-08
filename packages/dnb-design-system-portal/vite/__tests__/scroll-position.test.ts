import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  saveScrollPosition,
  restoreScrollPosition,
} from '../client/plugins/scroll-position.runtime'

beforeEach(() => {
  sessionStorage.clear()
  vi.restoreAllMocks()
})

describe('saveScrollPosition', () => {
  it('should save window scroll position to sessionStorage', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 200,
      writable: true,
    })

    saveScrollPosition()

    expect(sessionStorage.getItem('scroll-window')).toBe('200')
  })

  it('should save element scroll position when element exists', () => {
    const el = document.createElement('div')
    el.id = 'portal-sidebar-menu'
    Object.defineProperty(el, 'scrollTop', { value: 150, writable: true })
    document.body.appendChild(el)

    saveScrollPosition()

    expect(sessionStorage.getItem('scroll-#portal-sidebar-menu')).toBe(
      '150'
    )

    document.body.removeChild(el)
  })

  it('should not throw when element does not exist', () => {
    expect(() => saveScrollPosition()).not.toThrow()
  })
})

describe('restoreScrollPosition', () => {
  it('should restore window scroll position', () => {
    const scrollToSpy = vi.fn()
    window.scrollTo = scrollToSpy
    sessionStorage.setItem('scroll-window', '300')

    restoreScrollPosition()

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 300,
      behavior: 'auto',
    })
  })

  it('should use smooth behavior when smooth is true', () => {
    const scrollToSpy = vi.fn()
    window.scrollTo = scrollToSpy
    sessionStorage.setItem('scroll-window', '100')

    restoreScrollPosition({ smooth: true })

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 100,
      behavior: 'smooth',
    })
  })

  it('should skip window restore when restoreWindow is false', () => {
    const scrollToSpy = vi.fn()
    window.scrollTo = scrollToSpy
    sessionStorage.setItem('scroll-window', '100')

    restoreScrollPosition({ restoreWindow: false })

    expect(scrollToSpy).not.toHaveBeenCalled()
  })

  it('should restore element scroll position', () => {
    const el = document.createElement('div')
    el.id = 'portal-sidebar-menu'
    Object.defineProperty(el, 'offsetHeight', { value: 500 })
    document.body.appendChild(el)

    sessionStorage.setItem('scroll-#portal-sidebar-menu', '120')

    restoreScrollPosition({ restoreWindow: false })

    expect(el.scrollTop).toBe(120)

    document.body.removeChild(el)
  })

  it('should not throw when no stored positions exist', () => {
    expect(() => restoreScrollPosition()).not.toThrow()
  })

  it('should snap to active item when stored position is not in view', () => {
    const sidebar = document.createElement('div')
    sidebar.id = 'portal-sidebar-menu'
    Object.defineProperty(sidebar, 'offsetHeight', { value: 400 })
    document.body.appendChild(sidebar)

    const ul = document.createElement('ul')
    sidebar.appendChild(ul)
    const li = document.createElement('li')
    li.classList.add('is-active')
    ul.appendChild(li)
    const item = document.createElement('div')
    item.classList.add('dnb-sidebar-menu__item')
    Object.defineProperty(item, 'offsetTop', { value: 800 })
    Object.defineProperty(item, 'offsetHeight', { value: 40 })
    li.appendChild(item)

    sessionStorage.setItem('scroll-#portal-sidebar-menu', '50')

    restoreScrollPosition({ restoreWindow: false })

    expect(sidebar.scrollTop).toBe(800)

    document.body.removeChild(sidebar)
  })
})
