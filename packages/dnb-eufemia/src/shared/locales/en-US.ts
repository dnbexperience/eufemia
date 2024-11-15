import en from './en-GB'

const enGB = en['en-GB']

export default {
  'en-US': {
    ...enGB,
    DatePicker: {
      ...enGB.DatePicker,
      maskOrder: 'mm/dd/yyyy',
      maskPlaceholder: 'mm/dd/yyyy', // have to be same setup as "mask" - but can be like: mm/dd/åååå
      firstDay: 'sunday',
    },
  } satisfies typeof enGB & {
    DatePicker: {
      firstDay: string
    }
  },
}
