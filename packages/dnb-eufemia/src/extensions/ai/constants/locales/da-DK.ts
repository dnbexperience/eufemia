import type nbNO from './nb-NO'

export default {
  'da-DK': {
    Ai: {
      undo: 'Fortryd',
      undoAvailable: '%action er tilgængelig.',
      undoAvailableFor: '%action er tilgængelig i %seconds sekunder.',
      undoAvailableForOneSecond: '%action er tilgængelig i 1 sekund.',
      undoUnavailable: '%action er ikke længere tilgængelig.',
      undoAvailableUntil: '%action er tilgængelig indtil %time.',
      undoTimeLeft: 'Tid tilbage til at fortryde',
      copyCode: 'Kopiér kode',
      codeCopied: 'Kopieret',
      loading: 'Skriver svar …',
      aiGenerated: 'AI-genereret',
      promptLabel: 'Besked',
      promptPlaceholder: 'Skriv en besked',
      send: 'Send',
      stop: 'Stop',
      addAttachment: 'Tilføj vedhæftning',
      useMicrophone: 'Brug mikrofon',
      suggestions: 'Forslag',
      conversationLabel: 'Samtale',
      scrollToBottom: 'Gå til seneste besked',
      sources: 'Kilder (%count)',
      taskRunning: 'I gang',
      taskDone: 'Fuldført',
      taskError: 'Mislykkedes',
      taskAwaitingConfirmation: 'Venter på bekræftelse',
      canceled: 'Annulleret',
    },
  } satisfies (typeof nbNO)['nb-NO'],
}
