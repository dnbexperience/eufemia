import type nbNO from './nb-NO'

export default {
  'sv-SE': {
    Ai: {
      undo: 'Ångra',
      undoAvailable: '%action är tillgängligt.',
      undoAvailableFor: '%action är tillgängligt i %seconds sekunder.',
      undoAvailableForOneSecond: '%action är tillgängligt i 1 sekund.',
      undoUnavailable: '%action är inte längre tillgängligt.',
      undoAvailableUntil: '%action är tillgängligt till %time.',
      undoTimeLeft: 'Tid kvar att ångra',
      copyCode: 'Kopiera kod',
      codeCopied: 'Kopierat',
      loading: 'Skriver svar …',
      aiGenerated: 'AI-genererat',
      promptLabel: 'Meddelande',
      promptPlaceholder: 'Skriv ett meddelande',
      send: 'Skicka',
      stop: 'Stoppa',
      addAttachment: 'Lägg till bilaga',
      useMicrophone: 'Använd mikrofon',
      suggestions: 'Förslag',
      conversationLabel: 'Konversation',
      scrollToBottom: 'Gå till senaste meddelandet',
      sources: 'Källor (%count)',
      toolRunning: 'Pågår',
      toolDone: 'Slutförd',
      toolError: 'Misslyckades',
      toolAwaitingApproval: 'Väntar på bekräftelse',
      canceled: 'Avbruten',
    },
  } satisfies (typeof nbNO)['nb-NO'],
}
