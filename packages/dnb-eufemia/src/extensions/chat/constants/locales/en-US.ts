import en from './en-GB'

const enGB = en['en-GB']

export default {
  'en-US': {
    Chat: {
      ...enGB.Chat,
      canceled: 'Canceled',
    },
  } satisfies typeof enGB,
}
