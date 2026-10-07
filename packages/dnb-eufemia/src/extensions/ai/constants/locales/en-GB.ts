import type nbNO from './nb-NO'

export default {
  'en-GB': {
    Ai: {
      copyCode: 'Copy code',
      codeCopied: 'Copied',
      loading: 'Writing a reply …',
      aiGenerated: 'AI-generated',
      promptLabel: 'Message',
      promptPlaceholder: 'Write a message',
      send: 'Send',
      stop: 'Stop',
      addAttachment: 'Add attachment',
      useMicrophone: 'Use microphone',
      suggestions: 'Suggestions',
      conversationLabel: 'Conversation',
      scrollToBottom: 'Go to latest message',
      sources: 'Sources (%count)',
      toolRunning: 'In progress',
      toolDone: 'Completed',
      toolError: 'Failed',
      toolAwaitingApproval: 'Waiting for confirmation',
      canceled: 'Cancelled',
      thinking: 'Thinking …',
      reasoning: 'Reasoning',
    },
  } satisfies (typeof nbNO)['nb-NO'],
}
