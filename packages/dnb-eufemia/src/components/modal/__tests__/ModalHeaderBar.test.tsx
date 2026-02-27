import React from 'react'
import { render, act } from '@testing-library/react'
import ModalHeaderBar from '../parts/ModalHeaderBar'
import ModalContext from '../ModalContext'

type IntersectionObserverCallback = (
  entries: Partial<IntersectionObserverEntry>[]
) => void

const defaultContext = {
  preventClick: null,
  onKeyDownHandler: null,
  id: null,
  title: null,
  hideCloseButton: null,
  closeButtonAttributes: null,
  closeTitle: 'Close',
  setBackgroundColor: null,
  onCloseClickHandler: jest.fn(),
  contentRef: null,
  scrollRef: null,
  hide: null,
  contentId: null,
  close: null,
}

function renderWithContext(
  ui: React.ReactElement,
  context = defaultContext
) {
  return render(
    <ModalContext value={context}>{ui}</ModalContext>
  )
}

describe('ModalHeaderBar', () => {
  let observerCallback: IntersectionObserverCallback
  let observerOptions: IntersectionObserverInit
  const observe = jest.fn()
  const disconnect = jest.fn()

  beforeEach(() => {
    observe.mockClear()
    disconnect.mockClear()

    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(
        (
          cb: IntersectionObserverCallback,
          options: IntersectionObserverInit
        ) => {
          observerCallback = cb
          observerOptions = options
          return { observe, disconnect }
        }
      )
  })

  afterEach(() => {
    delete window.IntersectionObserver
  })

  it('should create an IntersectionObserver on mount', () => {
    renderWithContext(<ModalHeaderBar />)

    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenCalledTimes(1)
  })

  it('should apply shadowClass when content is scrolled', () => {
    renderWithContext(<ModalHeaderBar shadowClass="my-shadow-class" />)

    const section = document.querySelector('.dnb-modal__header__bar')

    expect(section.classList.contains('my-shadow-class')).toBe(false)

    act(() => {
      observerCallback([{ isIntersecting: false }])
    })

    expect(section.classList.contains('my-shadow-class')).toBe(true)
  })

  it('should remove shadowClass when scrolled back to top', () => {
    renderWithContext(<ModalHeaderBar shadowClass="my-shadow-class" />)

    const section = document.querySelector('.dnb-modal__header__bar')

    act(() => {
      observerCallback([{ isIntersecting: false }])
    })

    expect(section.classList.contains('my-shadow-class')).toBe(true)

    act(() => {
      observerCallback([{ isIntersecting: true }])
    })

    expect(section.classList.contains('my-shadow-class')).toBe(false)
  })

  it('should not apply any shadow class when shadowClass is not provided', () => {
    renderWithContext(<ModalHeaderBar />)

    const section = document.querySelector('.dnb-modal__header__bar')

    act(() => {
      observerCallback([{ isIntersecting: false }])
    })

    expect(section.className).not.toContain('null')
    expect(section.className).not.toContain('undefined')
  })

  it('should use .dnb-scroll-view ancestor as IntersectionObserver root', () => {
    const scrollView = document.createElement('div')
    scrollView.classList.add('dnb-scroll-view')
    document.body.appendChild(scrollView)

    const wrapper = document.createElement('div')
    scrollView.appendChild(wrapper)

    render(
      <ModalContext value={defaultContext}>
        <ModalHeaderBar shadowClass="sticky-class" />
      </ModalContext>,
      { container: wrapper }
    )

    expect(observerOptions.root).toBe(scrollView)

    scrollView.remove()
  })

  it('should use null as root when no .dnb-scroll-view ancestor exists', () => {
    renderWithContext(<ModalHeaderBar />)

    expect(observerOptions.root).toBeNull()
  })

  it('should set negative rootMargin based on the element height', () => {
    renderWithContext(<ModalHeaderBar />)

    // clientHeight is 0 in jsdom
    expect(observerOptions.rootMargin).toBe('0px 0px 0px 0px')
    expect(observerOptions.threshold).toBe(0.001)
  })

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderWithContext(<ModalHeaderBar />)

    expect(disconnect).toHaveBeenCalledTimes(0)

    unmount()

    expect(disconnect).toHaveBeenCalledTimes(1)
  })

  it('should reconnect observer when children change', () => {
    const { rerender } = render(
      <ModalContext value={defaultContext}>
        <ModalHeaderBar>First</ModalHeaderBar>
      </ModalContext>
    )

    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(disconnect).toHaveBeenCalledTimes(0)

    rerender(
      <ModalContext value={defaultContext}>
        <ModalHeaderBar>Second</ModalHeaderBar>
      </ModalContext>
    )

    expect(disconnect).toHaveBeenCalledTimes(1)
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(2)
  })
})
