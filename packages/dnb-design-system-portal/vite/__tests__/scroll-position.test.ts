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

  it('leaves sidebar scroll persistence to SidebarMenu', () => {
    const el = document.createElement('div')
    el.id = 'portal-sidebar-menu'
    Object.defineProperty(el, 'scrollTop', { value: 150, writable: true })
    document.body.appendChild(el)

    saveScrollPosition()

    expect(
      sessionStorage.getItem('scroll-#portal-sidebar-menu')
    ).toBeNull()

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

  it('does not restore legacy sidebar scroll positions', () => {
    const el = document.createElement('div')
    el.id = 'portal-sidebar-menu'
    Object.defineProperty(el, 'offsetHeight', { value: 500 })
    document.body.appendChild(el)

    sessionStorage.setItem('scroll-#portal-sidebar-menu', '120')

    restoreScrollPosition({ restoreWindow: false })

    expect(el.scrollTop).toBe(0)

    document.body.removeChild(el)
  })

  it('should not throw when no stored positions exist', () => {
    expect(() => restoreScrollPosition()).not.toThrow()
  })
})
