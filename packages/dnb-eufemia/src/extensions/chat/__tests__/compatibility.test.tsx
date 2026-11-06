import { act, render } from '@testing-library/react'
import { expectTypeOf } from 'vitest'
import * as Chat from '..'
import * as Ai from '../../ai'
import ChatNamespace from '../Chat'
import AiNamespace from '../../ai/Ai'
import Provider from '../../../shared/Provider'
import chatSv from '../constants/locales/sv-SE'
import aiSv from '../../ai/constants/locales/sv-SE'
import type { ChatMessageProps, ChatConversationItem } from '../types'
import type { AiMessageProps, AiConversationItem } from '../../ai/types'
import { Ai as LegacyNamespace, Chat as PublicNamespace } from '../..'

describe('Chat compatibility with Ai', () => {
  it('shares components, hooks and the namespace without wrappers', () => {
    expect(PublicNamespace).toBe(ChatNamespace)
    expect(LegacyNamespace).toBe(AiNamespace)
    for (const [name, value] of Object.entries(Chat)) {
      expect(Ai[name]).toBe(value)
      expect(AiNamespace[name]).toBe(ChatNamespace[name])
    }
    expectTypeOf<AiMessageProps>().toEqualTypeOf<ChatMessageProps>()
    expectTypeOf<AiConversationItem>().toEqualTypeOf<ChatConversationItem>()
    expectTypeOf<AiNamespace.AiMessageProps>().toEqualTypeOf<ChatNamespace.ChatMessageProps>()
  })

  it('shares conversation state with legacy hooks and messages', () => {
    let controls: ReturnType<typeof Ai.useConversation>
    function LegacyControls() {
      controls = Ai.useConversation()
      return null
    }
    render(
      <Chat.Conversation>
        <LegacyControls />
        <Ai.Message id="compatibility-message">Hello</Ai.Message>
      </Chat.Conversation>
    )
    act(() => {
      expect(controls.scrollToMessage('compatibility-message')).toBe(true)
    })
  })

  it.each([
    { Ai: { loading: 'Legacy nested' } },
    { 'Ai.loading': 'Legacy flat' },
    { Chat: { loading: 'Chat nested' } },
    { 'Chat.loading': 'Chat flat' },
  ])(
    'supports translation overrides %j through both entry points',
    (labels) => {
      render(
        <Provider locale="en-GB" translations={{ 'en-GB': labels }}>
          <Chat.MessageIndicator />
          <Ai.MessageIndicator />
        </Provider>
      )
      const expected = Object.values(labels)[0]
      const text =
        typeof expected === 'string' ? expected : expected.loading
      expect(
        Array.from(
          document.querySelectorAll('[role="status"]'),
          (el) => el.textContent
        )
      ).toEqual([text, text])
    }
  )

  it('uses Chat overrides first and retains missing Ai overrides', () => {
    render(
      <Provider
        locale="en-GB"
        translations={{
          'en-GB': {
            Ai: {
              loading: 'Legacy',
              promptPlaceholder: 'Legacy placeholder',
            },
            Chat: { loading: 'Chat' },
          },
        }}
      >
        <Chat.MessageIndicator />
        <Ai.PromptInput />
      </Provider>
    )
    expect(document.querySelector('[role="status"]')).toHaveTextContent(
      'Chat'
    )
    expect(document.querySelector('textarea')).toHaveAttribute(
      'aria-placeholder',
      'Legacy placeholder'
    )
  })

  it.each([chatSv, aiSv])(
    'supports separately imported Chat and Ai locales',
    (translations) => {
      render(
        <Provider locale="sv-SE" translations={translations}>
          <Chat.PromptInput />
        </Provider>
      )
      expect(document.querySelector('textarea')).toHaveAttribute(
        'aria-placeholder',
        'Skriv ett meddelande'
      )
    }
  )
})
