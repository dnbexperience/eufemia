import en from './en-GB'

const enGB = en['en-GB']

export default {
  'en-US': {
    ...enGB,
    DatePicker: {
      ...enGB.DatePicker,
      mask_order: 'mm/dd/yyyy',
      mask_placeholder: 'mm/dd/yyyy', // have to be same setup as "mask" - but can be like: mm/dd/åååå
      first_day: 'sunday',
    },
  } satisfies typeof enGB & {
    DatePicker: {
      first_day: string
    }
  },
}
