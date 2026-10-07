import en from './en-GB'

const enGB = en['en-GB']

export default {
  'en-US': {
    Ai: {
      ...enGB.Ai,
      canceled: 'Canceled',
    },
  } satisfies typeof enGB,
}
