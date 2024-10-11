import en from './en-GB'

const enGB = en['en-GB']

export default {
  'en-US': {
    ...enGB,
    OrganizationNumber: {
      label: 'Organization number',
      errorRequired: 'You must enter an organization number.',
      errorOrgNo: 'Invalid organization number.',
      errorOrgNoLength:
        'Invalid organization number. Enter a valid organization number with 9 digits.',
    },
  },
}
