import type nbNO from './nb-NO'

export default {
  'da-DK': {
    Ai: {
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
      toolRunning: 'I gang',
      toolDone: 'Fuldført',
      toolError: 'Mislykkedes',
      toolAwaitingApproval: 'Venter på bekræftelse',
      canceled: 'Annulleret',
      thinking: 'Tænker …',
      reasoning: 'Ræsonnement',
    },
  } satisfies (typeof nbNO)['nb-NO'],
}
