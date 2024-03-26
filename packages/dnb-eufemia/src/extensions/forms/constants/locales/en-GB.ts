export default {
  'en-GB': {
    /**
     * Base fields
     */
    Field: {
      stateSummary: 'Summary:',
      errorSummary: 'Please correct the following errors:',
      errorRequired: 'This field is required',
      errorPattern: 'The value is invalid',
    },
    StringField: {
      errorMinLength:
        'The value cannot be shorter than {minLength} characters',
      errorMaxLength:
        'The value cannot be longer than {maxLength} characters',
    },
    NumberField: {
      errorMinimum: 'The value must be at least {minimum}',
      errorMaximum: 'The value must be a maximum of {maximum}',
      errorExclusiveMinimum:
        'The value must be greater than {exclusiveMinimum}',
      errorExclusiveMaximum:
        'The value must be less than {exclusiveMaximum}',
      errorMultipleOf: 'The value must be a multiple of {multipleOf}',
    },
    BooleanField: {
      yes: 'Yes',
      no: 'No',
    },
    Context: {
      submit: 'Send',
    },
    Step: {
      next: 'Next',
      previous: 'Back',
    },

    /**
     * Feature fields
     */
    CountryCode: {
      label: 'Country code',
    },
    Date: {
      label: 'Date',
      errorRequired: 'You must provide a valid date',
    },
    Expiry: {
      label: 'Expiry date',
    },
    Email: {
      label: 'Email',
      errorRequired: 'You must enter an email',
      errorPattern: 'This is not a valid email address',
    },
    FirstName: {
      label: 'First name',
      errorRequired: 'You must enter a first name',
    },
    LastName: {
      label: 'Surname',
      errorRequired: 'You must enter a surname',
    },
    NationalIdentityNumber: {
      label: 'National identity number (11 digits)',
      errorRequired:
        'Invalid national identity number. Enter a valid 11-digit number',
    },
    OrganisationNumber: {
      label: 'Organisation number',
      errorRequired: 'You must enter an organisation number',
      errorPattern: 'This is not a valid organisation number',
    },
    BankAccountNumber: {
      label: 'Bank account',
      errorRequired: 'You must enter a bank account number',
      errorPattern: 'This is not a valid bank account number',
    },
    PhoneNumber: {
      label: 'Mobile number',
      errorRequired: 'You must enter a valid number',
    },
    PostalCode: {
      label: 'Postc.',
      errorRequired: 'You must enter a postcode',
      errorPattern: 'This is not a valid postcode',
    },
    City: {
      label: 'City',
      errorRequired: 'You must enter a city',
    },
    SelectCountry: {
      label: 'Country',
      placeholder: 'Select a country',
      errorRequired: 'You must select a country',
    },
    Password: {
      label: 'Password',
      ariaLabelShow: 'Show password',
      ariaLabelHide: 'Hide password',
    },
  },
}
