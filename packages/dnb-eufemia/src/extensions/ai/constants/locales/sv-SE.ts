import type nbNO from './nb-NO'

export default {
  'sv-SE': {
    Ai: {
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
      thinking: 'Tänker …',
      reasoning: 'Resonemang',
    },
  } satisfies (typeof nbNO)['nb-NO'],
}
