import type nbNO from './nb-NO'

export default {
  'en-GB': {
    Ai: {
      undo: 'Undo',
      undoAvailable: '%action available.',
      undoAvailableFor: '%action available for %seconds seconds.',
      undoAvailableForOneSecond: '%action available for 1 second.',
      undoUnavailable: '%action is no longer available.',
      undoAvailableUntil: '%action available until %time.',
      undoTimeLeft: 'Time left to undo',
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
      taskRunning: 'In progress',
      taskDone: 'Completed',
      taskError: 'Failed',
      taskAwaitingConfirmation: 'Waiting for confirmation',
      canceled: 'Cancelled',
    },
  } satisfies (typeof nbNO)['nb-NO'],
}
