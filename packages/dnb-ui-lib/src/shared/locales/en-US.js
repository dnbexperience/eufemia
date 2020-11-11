import en from './en-GB'

const enGB = en['en-GB']

export default {
  'en-US': {
    ...enGB,
    DatePicker: {
      ...enGB.DatePicker,
      first_day: 'sunday',
      mask_order: 'dd/mm/yyyy',
      mask_placeholder: 'dd/mm/yyyy' // have to be same setup as "mask" - but can be like: dd/mm/åååå
    }
  }
}
