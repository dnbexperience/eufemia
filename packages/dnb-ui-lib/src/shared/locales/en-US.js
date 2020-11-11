import en from './en-GB'

const enGB = en['en-GB']

export default {
  'en-US': {
    ...enGB,
    DatePicker: {
      ...enGB.DatePicker,
      first_day: 'sunday',
      mask_order: 'yyyy/dd/mm',
      mask_placeholder: 'yyyy/dd/mm' // have to be same setup as "mask" - but can be like: dd/mm/åååå
    }
  }
}
