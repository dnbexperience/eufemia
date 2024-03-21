import en from './en-GB'

const enGB = en['en-GB']

export default {
  'en-US': {
    ...enGB,
    DatePicker: {
      ...enGB.DatePicker,
      first_day: 'sunday',
      mask_order: 'mm/dd/yyyy',
      mask_placeholder: 'mm/dd/yyyy', // have to be same setup as "mask" - but can be like: mm/dd/åååå
    },
    Forms: {
      OrganisationNumber: {
        label: 'Organization number',
        errorRequired: 'You must enter an organization number',
        errorPattern: 'This is not a valid organization number',
      },
    },
  },
}
