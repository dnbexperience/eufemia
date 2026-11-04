import { act, render, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { axeComponent } from '../../../core/test-utils/testSetup'
import { Conversation, Message, useConversation } from '..'
import { createConversationVirtualization } from '../Virtualization'
import type { AiConversationItem, AiConversationControls } from '../types'

const driver = createConversationVirtualization({
  estimateSize: 100,
  overscan: 2,
})
const items: AiConversationItem[] = Array.from(
  { length: 1000 },
  (_, index) => ({
    id: 'message-' + index,
    from: index % 2 ? 'assistant' : 'user',
    render: () => (
      <Message from={index % 2 ? 'assistant' : 'user'}>
        Message {index}
      </Message>
    ),
  })
)
let controls: AiConversationControls
function Consumer() {
  controls = useConversation('virtual-unit-test')
  return null
}

describe('Conversation virtualization', () => {
  beforeEach(() => {
    vi.spyOn(
      HTMLElement.prototype,
      'getBoundingClientRect'
    ).mockImplementation(function (this: HTMLElement) {
      const top = Number(this.dataset.index || 0) * 100
      return {
        x: 0,
        y: top,
        top,
        bottom: top + 100,
        left: 0,
        right: 320,
        width: 320,
        height: 100,
        toJSON: () => ({}),
      }
    })
    vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(
      400
    )
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(
      100
    )
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(
      320
    )
    Element.prototype.scrollTo = vi.fn()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders all data without a driver and retains the children API', () => {
    const { rerender } = render(<Conversation items={items.slice(0, 3)} />)
    expect(
      document.querySelectorAll('.dnb-ai-conversation__item')
    ).toHaveLength(3)
    rerender(
      <Conversation renderDriver={driver}>
        <Message>Composed content</Message>
      </Conversation>
    )
    expect(document.querySelector('.dnb-ai-message')).toHaveTextContent(
      'Composed content'
    )
    expect(
      document.querySelector('.dnb-ai-conversation--virtualized')
    ).toBeNull()
  })

  it('keeps only a window mounted and silences recycled log additions', async () => {
    render(<Conversation items={items} renderDriver={driver} />)
    await waitFor(() =>
      expect(
        document.querySelector('[data-ai-message-id]')
      ).toBeInTheDocument()
    )
    expect(
      document.querySelectorAll('[data-ai-message-id]').length
    ).toBeLessThan(30)
    expect(document.querySelector('[role="log"]')).toHaveAttribute(
      'aria-live',
      'off'
    )
  })

  it('retains explicitly pinned items and accepts navigation for unmounted IDs', async () => {
    render(
      <>
        <Consumer />
        <Conversation
          id="virtual-unit-test"
          items={items.map((item, index) =>
            index === 500 ? { ...item, keepMounted: true } : item
          )}
          renderDriver={driver}
        />
      </>
    )
    await waitFor(() =>
      expect(document.querySelector('#message-500')).toBeInTheDocument()
    )
    expect(document.querySelector('#message-100')).toBeNull()
    act(() => expect(controls.scrollToMessage('message-100')).toBe(true))
    expect(controls.scrollToMessage('missing')).toBe(false)
  })

  it('renders a bounded server window and hydrates without recovery errors', async () => {
    const view = <Conversation items={items} renderDriver={driver} />
    const html = renderToString(view)
    expect(
      (html.match(/data-ai-message-id=/g) || []).length
    ).toBeGreaterThan(0)
    expect((html.match(/data-ai-message-id=/g) || []).length).toBeLessThan(
      20
    )
    const container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = html
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => {
      root = hydrateRoot(container, view, { onRecoverableError })
    })
    expect(onRecoverableError).not.toHaveBeenCalled()
    act(() => root.unmount())
    container.remove()
  })

  it('cleans up shared controls on unmount and tolerates empty data', () => {
    const { rerender, unmount } = render(
      <>
        <Consumer />
        <Conversation
          id="virtual-unit-test"
          items={[]}
          renderDriver={driver}
        />
      </>
    )
    expect(controls.scrollToMessage('missing')).toBe(false)
    rerender(
      <>
        <Consumer />
        <Conversation
          id="virtual-unit-test"
          items={items}
          renderDriver={driver}
        />
      </>
    )
    unmount()
    render(<Consumer />)
    expect(controls.scrollToMessage('message-1')).toBe(false)
  })

  it('passes accessibility rules for mounted content', async () => {
    const view = render(
      <Conversation items={items} renderDriver={driver} />
    )
    expect(await axeComponent(view)).toHaveNoViolations()
  })
})
