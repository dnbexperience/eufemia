import en from './en-GB'

const enGB = en['en-GB']

export default {
  'en-US': {
    ...enGB,
    OrganizationNumber: {
      label: 'Organization number',
      errorRequired: 'You must enter an organization number.',
      errorOrgNo: 'This is not a valid organization number.',
    },
  },
}
