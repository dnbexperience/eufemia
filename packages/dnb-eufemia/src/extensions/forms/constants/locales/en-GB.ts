import nb from './nb-NO'
export default {
  'en-GB': {
    /**
     * General
     */
    Field: {
      errorSummaryTitle: 'Please correct the following errors',
      stateSummary: 'Summary:',
      errorSummary: 'Please correct the following errors:',
      errorRequired: 'This field is required.',
      errorPattern: 'The value is invalid.',
      optionalLabelSuffix: '(optional)',
    },
    SubmitButton: {
      text: 'Send',
      sendText: 'Send',
    },
    Isolation: {
      commitButtonText: 'Add',
    },
    Step: {
      summaryTitle: 'Summary',
    },
    WizardEditButton: {
      text: 'Edit',
    },
    WizardPreviousButton: {
      text: 'Back',
    },
    WizardNextButton: {
      text: 'Next',
    },
    RemoveButton: {
      text: 'Remove',
    },
    SectionViewContainer: {
      editButton: 'Edit',
    },
    SectionEditContainer: {
      doneButton: 'Done',
      cancelButton: 'Cancel',
      errorInSection: 'Please correct the errors above.',
    },
    IterateViewContainer: {
      removeButton: 'Remove',
      editButton: 'Edit',
    },
    IterateEditContainer: {
      removeButton: 'Remove',
      doneButton: 'Done',
      cancelButton: 'Cancel',
      errorInContainer: 'Please correct the errors above.',
    },
    IteratePushContainer: {
      createButton: 'Add',
      itemsLimitReached: 'You have reached the limit of: {limit}',
    },

    /**
     * Base fields
     */
    StringField: {
      errorMinLength:
        'The value can not be shorter than {minLength} characters.',
      errorMaxLength:
        'The value can not be longer than {maxLength} characters.',
    },
    NumberField: {
      errorMinimum: 'The value must be at least {minimum}.',
      errorMaximum: 'The value must be a maximum of {maximum}.',
      errorExclusiveMinimum:
        'The value must be greater than {exclusiveMinimum}.',
      errorExclusiveMaximum:
        'The value must be less than {exclusiveMaximum}.',
      errorMultipleOf: 'The value must be a multiple of {multipleOf}.',
    },
    BooleanField: {
      yes: 'Yes',
      no: 'No',
    },
    ToggleField: {
      yes: 'Yes',
      no: 'No',
    },

    /**
     * Feature fields
     */
    Date: {
      label: 'Date',
      errorRequired: 'You must provide a valid date.',
    },
    Expiry: {
      label: 'Expiry date',
    },
    Email: {
      label: 'Email address',
      errorRequired: 'You must enter a Email address.',
      errorPattern: 'Invalid Email address. Enter a valid Email address.',
    },
    FirstName: {
      label: 'Given name',
      errorRequired: 'You must enter a given name (first name).',
      errorPattern:
        'Enter a given name (first name) using only letters and characters such as hyphens and spaces.',
    },
    LastName: {
      label: 'Surname',
      errorRequired: 'You must enter a surname (last name).',
      errorPattern:
        'Enter a surname (last name) using only letters and characters such as hyphens and spaces.',
    },
    CompanyName: {
      label: 'Company name',
      errorRequired: 'You must enter a company name.',
    },
    NationalIdentityNumber: {
      label: 'National identity number (11 digits)',
      errorRequired:
        'Invalid national identity number. Enter a valid 11-digit number.',
      errorFnr: 'Invalid national identity number.',
      errorDnr: 'Invalid D number.',
    },
    OrganizationNumber: {
      label: 'Organisation number',
      errorRequired: 'You must enter an organisation number.',
      errorPattern: 'This is not a valid organisation number.',
    },
    BankAccountNumber: {
      label: 'Bank account',
      errorRequired:
        'Enter a valid account number. Account number is mandatory to fill out.',
      errorPattern: 'This is not a valid bank account number.',
    },
    PhoneNumber: {
      label: 'Mobile number',
      countryCodeLabel: 'Country code',
      errorRequired:
        'Mobile number must be filled in. If you don’t have a mobile number, you can enter another phone number.',
      warningRequired:
        'You have not entered a mobile number. You can still use this number if it is correct.',
    },
    PostalCodeAndCity: {
      label: 'Postcode and city',
    },
    PostalCode: {
      label: 'Postc.',
      errorRequired: 'You must enter a postcode.',
      errorPattern: 'This is not a valid postcode (four-digits).',
    },
    City: {
      label: 'City',
      errorRequired: 'You must enter a city name.',
      errorPattern:
        'City names can only contain letters and valid characters such as hyphens and spaces.',
    },
    SelectCountry: {
      label: 'Country',
      placeholder: 'Select country',
      errorRequired: 'You must select a country from the list.',
    },
    Password: {
      label: 'Password',
      ariaLabelShow: 'Show password',
      ariaLabelHide: 'Hide password',
    },
    Upload: {
      errorRequired: 'You must upload a file.',
      errorInvalidFiles: 'Remove all files that have errors.',
    },
  } satisfies (typeof nb)['nb-NO'],
}
