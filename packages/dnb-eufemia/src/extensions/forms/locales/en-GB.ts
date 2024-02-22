export default {
  'en-GB': {
    boolean: {
      yes: 'Yes',
      no: 'No',
    },
    step: {
      next: 'Next',
      previous: 'Back',
    },
    context: {
      submit: 'Send',
    },
    field: {
      stateSummary: 'Summary:',
      error: {
        summary: 'Please correct the following errors:',
        required: 'This field is required',
      },
    },
    input: {
      error: {
        required: 'This field is required',
        pattern: 'The value is invalid',
      },
    },
    stringInput: {
      error: {
        minLength:
          'The value cannot be shorter than {minLength} characters',
        maxLength:
          'The value cannot be longer than {maxLength} characters',
      },
    },
    numberField: {
      error: {
        minimum: 'The value must be at lest {minimum}',
        maximum: 'The value must be a maximum of {maximum}',
        exclusiveMinimum:
          'The value must be greater than {exclusiveMinimum}',
        exclusiveMaximum: 'The value must be less than {exclusiveMaximum}',
        multipleOf: 'The value must be a multiple of {multipleOf}',
      },
    },
    countryCode: {
      label: 'Country code',
    },
    date: {
      label: 'Date',
      error: {
        required: 'You must provide a valid date',
      },
    },
    expiry: {
      label: 'Expiry date',
    },
    email: {
      label: 'Email',
      error: {
        required: 'You must enter an email',
        pattern: 'This is not a valid email address',
      },
    },
    firstName: {
      label: 'First name',
      error: {
        required: 'You must enter a first name',
      },
    },
    lastName: {
      label: 'Surname',
      error: {
        required: 'You must enter a surname',
      },
    },
    nationalIdentityNumber: {
      label: 'National identity number (11 digits)',
      error: {
        required:
          'Invalid national identity number. Enter a valid 11-digit number',
      },
    },

    organizationNumber: {
      label: 'Organization number',
      error: {
        required: 'You must enter an organization number',
        pattern: 'This is not a valid organization number',
      },
    },
    bankAccountNumber: {
      label: 'Bank account',
      error: {
        required: 'You must enter a bank account number',
        pattern: 'This is not a valid bank account number',
      },
    },
    phoneNumbe: {
      label: 'Mobile number',
      error: {
        required: 'You must enter a valid number',
      },
    },
    postalCode: {
      label: 'Postc.',
      error: {
        required: 'You must enter a postcode',
        pattern: 'This is not a valid postcode',
      },
    },
    city: {
      label: 'City',
      error: {
        required: 'You must enter a city',
      },
    },
    selectCountry: {
      label: 'Country',
      placeholder: 'Select a country',
      error: {
        required: 'You must select a country',
      },
    },
    password: {
      label: 'Password',
      ariaLabel: {
        show: 'Show password',
        hide: 'Hide password',
      },
    },
  },
}
