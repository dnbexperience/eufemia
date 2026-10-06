import { act, fireEvent, render } from '@testing-library/react'
import type { AiMessageData } from '../types'
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
  { scrollHeight, scrollTop, clientHeight, byUser = false }
) => {
  if (byUser) {
    fireEvent.wheel(element)
  }
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
    expect(log).toHaveAttribute('aria-relevant', 'additions')
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
    render(<Ai.Conversation scrollBehavior="end" />)
    const scrollTo = vi.mocked(Element.prototype.scrollTo)
    scrollTo.mockClear()

    act(() => resizeCallback([], null))
    expect(scrollTo).toHaveBeenCalledTimes(1)

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 600,
      clientHeight: 400,
    })
    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
      byUser: true,
    })
    scrollTo.mockClear()

    act(() => resizeCallback([], null))
    expect(scrollTo).not.toHaveBeenCalled()
  })

  it('keeps following when content grows without the user scrolling', () => {
    render(<Ai.Conversation scrollBehavior="end" />)
    const scrollTo = vi.mocked(Element.prototype.scrollTo)

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 600,
      clientHeight: 400,
    })

    // The browser fires a scroll event after the content has grown
    setScrollPosition(getScroll(), {
      scrollHeight: 1348,
      scrollTop: 600,
      clientHeight: 400,
    })
    expect(getScrollButton()).toBeNull()

    scrollTo.mockClear()
    act(() => resizeCallback([], null))
    expect(scrollTo).toHaveBeenCalledTimes(1)
  })

  it('keeps following when the browser moves the scroll position', () => {
    render(<Ai.Conversation scrollBehavior="end" />)

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 600,
      clientHeight: 400,
    })

    // Content changes can move the scroll position without the user
    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 560,
      clientHeight: 400,
    })
    expect(getScrollButton()).toBeNull()
  })

  it('keeps following after the user uses content in the conversation', () => {
    render(
      <Ai.Conversation scrollBehavior="end">
        <button>Choose</button>
      </Ai.Conversation>
    )

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 600,
      clientHeight: 400,
    })
    fireEvent.pointerDown(document.querySelector('button'))
    fireEvent.keyDown(document.querySelector('button'), { key: 'Enter' })
    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 560,
      clientHeight: 400,
    })
    expect(getScrollButton()).toBeNull()

    fireEvent.keyDown(getScroll(), { key: 'PageUp' })
    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 200,
      clientHeight: 400,
    })
    expect(getScrollButton()).toBeInTheDocument()
  })

  it('shows a button to scroll to the bottom when scrolled up', () => {
    render(<Ai.Conversation scrollBehavior="end" />)
    expect(getScrollButton()).toBeNull()

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 600,
      clientHeight: 400,
    })
    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
      byUser: true,
    })
    expect(getScrollButton()).toHaveAccessibleName('Gå til siste melding')

    fireEvent.click(getScrollButton())
    expect(Element.prototype.scrollTo).toHaveBeenLastCalledWith({
      top: 1000,
      behavior: 'smooth',
    })
    expect(getScrollButton()).toBeNull()
  })

  it('keeps following while scrolling down from the button', () => {
    render(<Ai.Conversation scrollBehavior="end" />)

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 600,
      clientHeight: 400,
    })
    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
      byUser: true,
    })
    fireEvent.click(getScrollButton())

    // The smooth scroll fires scroll events on the way down
    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 300,
      clientHeight: 400,
    })
    expect(getScrollButton()).toBeNull()
  })

  it('hides the button when scrolled back to the bottom', () => {
    render(<Ai.Conversation scrollBehavior="end" />)

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 600,
      clientHeight: 400,
    })
    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
      byUser: true,
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
      scrollTop: 600,
      clientHeight: 400,
    })
    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 0,
      clientHeight: 400,
      byUser: true,
    })

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.Conversation turns', () => {
  let resizeCallback: ResizeObserverCallback
  const scrollTo = vi.fn()

  const setRect = (element: Element, top: number, bottom = top) => {
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top,
      bottom,
    } as DOMRect)
  }

  const resize = () => act(() => resizeCallback([], null))

  beforeEach(() => {
    window.ResizeObserver = class {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback
      }
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    }
    scrollTo.mockClear()
    Element.prototype.scrollTo = scrollTo
  })

  const renderTurn = (messages: Array<string>) =>
    render(
      <Ai.Conversation>
        {messages.map((text, index) => (
          <Ai.Message key={index} from={index % 2 ? 'assistant' : 'user'}>
            {text}
          </Ai.Message>
        ))}
      </Ai.Conversation>
    )

  it('scrolls a new message from the user near the top', () => {
    const { rerender } = renderTurn(['Hi', 'Hello'])
    Object.defineProperty(getScroll(), 'clientHeight', {
      configurable: true,
      value: 400,
    })
    resize()
    scrollTo.mockClear()

    rerender(
      <Ai.Conversation>
        <Ai.Message from="user">Hi</Ai.Message>
        <Ai.Message>Hello</Ai.Message>
        <Ai.Message from="user">Block my card</Ai.Message>
      </Ai.Conversation>
    )
    const anchor = document.querySelectorAll('.dnb-ai-message--user')[1]
    setRect(getScroll(), 0)
    setRect(anchor, 500)
    setRect(
      document.querySelector('.dnb-ai-conversation__content'),
      0,
      600
    )
    resize()

    expect(scrollTo).toHaveBeenCalledWith({ top: 500, behavior: 'smooth' })
    expect(
      document.querySelector<HTMLElement>('.dnb-ai-conversation__spacer')
        .style.height
    ).toBe('300px')
  })

  it('keeps the latest turn in place when the content changes', () => {
    renderTurn(['Hi', 'Hello'])
    const turn = document.querySelector('.dnb-ai-message--user')
    const content = document.querySelector('.dnb-ai-conversation__content')
    setRect(getScroll(), 0)
    setRect(turn, 48)
    setRect(content, 0, 600)
    resize()
    getScroll().scrollTop = 500

    // A part of the reply closes, and the browser moves the scroll position
    // before the change is handled
    setRect(turn, 56)
    setRect(content, 0, 592)
    fireEvent.scroll(getScroll())
    resize()

    expect(getScroll().scrollTop).toBe(508)
  })

  it('does not follow the reply as it streams in', () => {
    renderTurn(['Hi', 'Hello'])
    resize()
    scrollTo.mockClear()

    resize()
    expect(scrollTo).not.toHaveBeenCalled()
  })

  it('follows the reply when the user scrolls to the end', () => {
    renderTurn(['Hi', 'Hello'])
    resize()

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 600,
      clientHeight: 400,
      byUser: true,
    })
    scrollTo.mockClear()

    resize()
    expect(scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: 'auto' })
  })

  it('keeps what the user reads in place when a message above grows', () => {
    renderTurn(['Hi', 'Hello', 'Block my card', 'Done'])
    const [first, second, turn] = Array.from(
      document.querySelectorAll('.dnb-ai-message')
    )
    setRect(getScroll(), 0, 400)
    resize()

    // The user scrolls up and reads the second message
    setRect(first, -300, -100)
    setRect(second, -100, 200)
    setRect(turn, 600, 700)
    setScrollPosition(getScroll(), {
      scrollHeight: 2000,
      scrollTop: 300,
      clientHeight: 400,
      byUser: true,
    })

    // The first message is rendered with its real size
    setRect(first, -340, -100)
    setRect(second, -60, 240)
    resize()

    expect(getScroll().scrollTop).toBe(340)
  })

  it('remembers where the browser scrolled to, like to a focused element', () => {
    renderTurn(['Hi', 'Hello'])
    const [first, second] = Array.from(
      document.querySelectorAll('.dnb-ai-message')
    )
    setRect(getScroll(), 0, 400)
    setRect(first, 500, 600)
    setScrollPosition(getScroll(), {
      scrollHeight: 2000,
      scrollTop: 0,
      clientHeight: 400,
    })
    resize()

    setRect(first, -100, 0)
    setRect(second, 0, 300)
    setScrollPosition(getScroll(), {
      scrollHeight: 2000,
      scrollTop: 600,
      clientHeight: 400,
    })
    resize()

    expect(getScroll().scrollTop).toBe(600)
  })

  it('fades in new messages, but not the messages shown from the start', () => {
    const { rerender } = renderTurn(['Hi', 'Hello'])
    resize()

    rerender(
      <Ai.Conversation>
        {['Hi', 'Hello', 'Block my card'].map((text, index) => (
          <Ai.Message key={index} from={index % 2 ? 'assistant' : 'user'}>
            {text}
          </Ai.Message>
        ))}
      </Ai.Conversation>
    )
    resize()

    const messages = document.querySelectorAll('.dnb-ai-message')
    expect(messages[0]).not.toHaveAttribute('data-entering')
    expect(messages[1]).not.toHaveAttribute('data-entering')
    expect(messages[2]).toHaveAttribute('data-entering')
  })

  it('adjusts the scroll to a message when messages above change size', () => {
    let controls: ReturnType<typeof Ai.useConversation>
    const Toolbar = () => {
      controls = Ai.useConversation()
      return null
    }
    render(
      <Ai.Conversation>
        <Toolbar />
        <Ai.Message id="a">Hi</Ai.Message>
        <Ai.Message id="b">Hello</Ai.Message>
      </Ai.Conversation>
    )
    resize()
    const target = document.getElementById('b')
    setRect(target, 1000)
    controls.scrollToMessage('b')
    expect(scrollTo).toHaveBeenLastCalledWith({
      top: 1000,
      behavior: 'smooth',
    })

    setRect(target, 1200)
    resize()
    expect(scrollTo).toHaveBeenLastCalledWith({
      top: 1200,
      behavior: 'smooth',
    })
  })

  it('keeps the view in place when messages are added above', () => {
    const messages = ['Hi', 'Hello']
    const Messages = ({ list }: { list: Array<string> }) => (
      <Ai.Conversation>
        {list.map((text) => (
          <Ai.Message key={text} from="user">
            {text}
          </Ai.Message>
        ))}
      </Ai.Conversation>
    )
    const { rerender } = render(<Messages list={messages} />)
    const first = document.querySelector('.dnb-ai-message')
    setRect(first, 100)
    resize()
    getScroll().scrollTop = 200

    rerender(<Messages list={['Older', ...messages]} />)
    setRect(first, 350)
    resize()

    expect(getScroll().scrollTop).toBe(450)
  })

  it('keeps the view in place when a scroll event comes before the change is handled', () => {
    const Messages = ({ list }: { list: Array<string> }) => (
      <Ai.Conversation>
        {list.map((text) => (
          <Ai.Message key={text} from="user">
            {text}
          </Ai.Message>
        ))}
      </Ai.Conversation>
    )
    const { rerender } = render(<Messages list={['Hi', 'Hello']} />)
    const content = document.querySelector('.dnb-ai-conversation__content')
    const first = document.querySelector('.dnb-ai-message')
    setRect(getScroll(), 0)
    setRect(first, 100)
    setRect(content, 0, 600)
    resize()
    getScroll().scrollTop = 200

    rerender(<Messages list={['Older', ...['Hi', 'Hello']]} />)
    setRect(first, 350)
    setRect(content, 0, 850)
    fireEvent.scroll(getScroll())
    resize()

    expect(getScroll().scrollTop).toBe(450)
  })
})

describe('Ai.useConversation', () => {
  const scrollTo = vi.fn()

  beforeEach(() => {
    window.ResizeObserver = undefined
    scrollTo.mockClear()
    Element.prototype.scrollTo = scrollTo
  })

  const message: AiMessageData = {
    id: 'message-2',
    role: 'assistant',
    parts: [{ type: 'text', text: 'Hello', state: 'done' }],
  }

  it('scrolls the conversation with the given id', () => {
    let controls: ReturnType<typeof Ai.useConversation>
    const Toolbar = () => {
      controls = Ai.useConversation('chat')
      return null
    }

    render(
      <>
        <Toolbar />
        <Ai.Conversation id="chat">
          <Ai.Message message={message} />
        </Ai.Conversation>
      </>
    )

    expect(
      document.querySelector('[data-message-id="message-2"]')
    ).toBeInTheDocument()

    let found: boolean
    act(() => {
      found = controls.scrollToMessage('message-2')
    })
    expect(found).toBe(true)
    expect(scrollTo).toHaveBeenLastCalledWith(
      expect.objectContaining({ behavior: 'smooth' })
    )
    expect(controls.scrollToMessage('unknown')).toBe(false)

    act(() => controls.scrollToStart())
    expect(scrollTo).toHaveBeenLastCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('works inside the conversation without an id', () => {
    const ScrollButton = () => {
      const { scrollToEnd } = Ai.useConversation()
      return <button onClick={scrollToEnd}>End</button>
    }

    render(
      <Ai.Conversation>
        <ScrollButton />
      </Ai.Conversation>
    )
    Object.defineProperty(getScroll(), 'scrollHeight', {
      configurable: true,
      value: 800,
    })
    fireEvent.click(document.querySelector('button'))

    expect(scrollTo).toHaveBeenLastCalledWith({
      top: 800,
      behavior: 'smooth',
    })
  })

  it('does nothing without a conversation', () => {
    let controls: ReturnType<typeof Ai.useConversation>
    const Toolbar = () => {
      controls = Ai.useConversation('missing')
      return null
    }
    render(<Toolbar />)

    expect(controls.scrollToMessage('a')).toBe(false)
    expect(() => controls.scrollToEnd()).not.toThrow()
  })
})

describe('Ai.useConversationScrollState', () => {
  beforeEach(() => {
    window.ResizeObserver = undefined
    Element.prototype.scrollTo = vi.fn()
  })

  it('tells if the conversation is scrolled to the start or the end', () => {
    let state: ReturnType<typeof Ai.useConversationScrollState>
    const Edges = () => {
      state = Ai.useConversationScrollState('chat')
      return null
    }
    render(
      <>
        <Edges />
        <Ai.Conversation id="chat" />
      </>
    )
    expect(state).toEqual({ isAtStart: true, isAtEnd: true })

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 300,
      clientHeight: 400,
      byUser: true,
    })
    expect(state).toEqual({ isAtStart: false, isAtEnd: false })

    setScrollPosition(getScroll(), {
      scrollHeight: 1000,
      scrollTop: 600,
      clientHeight: 400,
      byUser: true,
    })
    expect(state).toEqual({ isAtStart: false, isAtEnd: true })
  })

  it('returns a default without a conversation', () => {
    let state: ReturnType<typeof Ai.useConversationScrollState>
    const Edges = () => {
      state = Ai.useConversationScrollState()
      return null
    }
    render(<Edges />)
    expect(state).toEqual({ isAtStart: true, isAtEnd: true })
  })
})

describe('Ai.useConversationVisibility', () => {
  let intersect: IntersectionObserverCallback
  const observe = vi.fn()
  const disconnect = vi.fn()

  beforeEach(() => {
    window.ResizeObserver = undefined
    Element.prototype.scrollTo = vi.fn()
    observe.mockClear()
    disconnect.mockClear()
    window.IntersectionObserver = vi.fn().mockImplementation(function (
      callback: IntersectionObserverCallback
    ) {
      intersect = callback
      return { observe, unobserve: vi.fn(), disconnect }
    })
  })

  afterEach(() => {
    delete window.IntersectionObserver
  })

  const message = (
    id: string,
    role: AiMessageData['role']
  ): AiMessageData => ({
    id,
    role,
    parts: [{ type: 'text', text: id, state: 'done' }],
  })

  it('tells which messages are visible and which turn is read', () => {
    let visibility: ReturnType<typeof Ai.useConversationVisibility>
    const Outline = () => {
      visibility = Ai.useConversationVisibility()
      return null
    }
    render(
      <Ai.Conversation>
        <Outline />
        <Ai.Message message={message('q1', 'user')} />
        <Ai.Message message={message('a1', 'assistant')} />
        <Ai.Message message={message('q2', 'user')} />
        <Ai.Message message={message('a2', 'assistant')} />
      </Ai.Conversation>
    )
    expect(observe).toHaveBeenCalledTimes(4)

    const get = (id: string) =>
      document.querySelector(`[data-message-id="${id}"]`)
    vi.spyOn(get('q1'), 'getBoundingClientRect').mockReturnValue({
      top: -200,
    } as DOMRect)
    vi.spyOn(get('q2'), 'getBoundingClientRect').mockReturnValue({
      top: 300,
    } as DOMRect)

    act(() =>
      intersect(
        [
          { target: get('a2'), isIntersecting: true },
          { target: get('a1'), isIntersecting: true },
          { target: get('q2'), isIntersecting: true },
        ] as Array<IntersectionObserverEntry>,
        null
      )
    )
    expect(visibility).toEqual({
      currentTurnId: 'q1',
      visibleMessageIds: ['a1', 'q2', 'a2'],
    })

    act(() =>
      intersect(
        [
          { target: get('a1'), isIntersecting: false },
        ] as Array<IntersectionObserverEntry>,
        null
      )
    )
    expect(visibility.visibleMessageIds).toEqual(['q2', 'a2'])
  })

  it('only tracks messages while it is used', () => {
    const Outline = () => {
      Ai.useConversationVisibility('chat')
      return null
    }
    const { rerender } = render(
      <>
        <Ai.Conversation id="chat">
          <Ai.Message message={message('q1', 'user')} />
        </Ai.Conversation>
      </>
    )
    expect(observe).not.toHaveBeenCalled()

    rerender(
      <>
        <Outline />
        <Ai.Conversation id="chat">
          <Ai.Message message={message('q1', 'user')} />
        </Ai.Conversation>
      </>
    )
    expect(observe).toHaveBeenCalledTimes(1)

    rerender(
      <>
        <Ai.Conversation id="chat">
          <Ai.Message message={message('q1', 'user')} />
        </Ai.Conversation>
      </>
    )
    expect(disconnect).toHaveBeenCalled()
  })
})
