import { act, fireEvent, render } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import * as Ai from '..'

const getScroll = () =>
  document.querySelector<HTMLDivElement>('.dnb-ai-conversation__scroll')
const getScrollButton = () =>
  document.querySelector<HTMLButtonElement>(
    '.dnb-ai-conversation__scroll-button'
  )

const setScrollPosition = (
  element: HTMLElement,
  { scrollHeight, scrollTop, clientHeight }
) => {
  Object.defineProperty(element, 'scrollHeight', {
    configurable: true,
    value: scrollHeight,
  })
  Object.defineProperty(element, 'clientHeight', {
    configurable: true,
    value: clientHeight,
  })
  element.scrollTop = scrollTop
  fireEvent.scroll(element)
}

describe('Ai.Conversation', () => {
  let resizeCallback: ResizeObserverCallback

  beforeEach(() => {
    window.ResizeObserver = class {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback
      }
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    }
    Element.prototype.scrollTo = vi.fn()
  })

  it('renders a labeled log in a scroll view', () => {
    render(
      <Ai.Conversation>
        <Ai.Message>Hi</Ai.Message>
      </Ai.Conversation>
    )

    const log = getScroll()
    expect(log).toHaveAttribute('role', 'log')
    expect(log).toHaveClass('dnb-scroll-view')
    expect(log).toHaveAccessibleName('Samtale')
    expect(
      log.querySelector('.dnb-ai-conversation__content .dnb-ai-message')
    ).toBeInTheDocument()
  })

  it('translates and supports a custom label', () => {
    const { rerender } = render(
      <Provider locale="en-GB">
        <Ai.Conversation />
      </Provider>
    )
    expect(getScroll()).toHaveAccessibleName('Conversation')

    rerender(<Ai.Conversation label="Chat with Aino" />)
    expect(getScroll()).toHaveAccessibleName('Chat with Aino')
  })

  it('follows new content while at the bottom', () => {
    render(<Ai.Conversation />)
    const scrollTo = vi.mocked(Element.prototype.scrollTo)
    scrollTo.mockClear()

    act(() => resizeCallback([], null))
    expect(scrollTo).toHaveBeenCalledTimes(1)

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
    })
    scrollTo.mockClear()

    act(() => resizeCallback([], null))
    expect(scrollTo).not.toHaveBeenCalled()
  })

  it('shows a button to scroll to the bottom when scrolled up', () => {
    render(<Ai.Conversation />)
    expect(getScrollButton()).toBeNull()

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
    })
    expect(getScrollButton()).toHaveAccessibleName('Gå til siste melding')

    fireEvent.click(getScrollButton())
    expect(Element.prototype.scrollTo).toHaveBeenLastCalledWith({
      top: 1000,
      behavior: 'smooth',
    })
    expect(getScrollButton()).toBeNull()
  })

  it('hides the button when scrolled back to the bottom', () => {
    render(<Ai.Conversation />)

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
    })
    expect(getScrollButton()).toBeInTheDocument()

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 590,
      clientHeight: 400,
    })
    expect(getScrollButton()).toBeNull()
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Ai.Conversation top="large" className="custom" id="chat" />)

    const element = document.querySelector('.dnb-ai-conversation')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'chat')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <Ai.Conversation>
        <Ai.Message from="user">Hi</Ai.Message>
        <Ai.Message>Hello</Ai.Message>
      </Ai.Conversation>
    )

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
    })

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
