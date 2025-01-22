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
    SubmitIndicator: {
      label: 'Please wait',
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
      confirmRemoveText: 'Are you sure you want to delete this?',
    },
    InfoOverlaySuccess: {
      title: 'Thank you',
      description: 'We have received your information.',
      buttonText: 'Back to homepage',
    },
    InfoOverlayError: {
      title: 'Sorry, something went wrong',
      description: 'Please try again or contact us.',
      cancelButton: 'Back',
      retryButton: 'Try again',
      retryingText: 'Retrying...',
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
        'The value cannot be shorter than {minLength} characters.',
      errorMaxLength:
        'The value cannot be longer than {maxLength} characters.',
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
    PostalAddress: {
      label: 'Postal address',
      errorRequired: 'You must enter a postal address.',
      errorPattern:
        'Invalid postal address. Enter a valid postal address.',
    },
    StreetAddress: {
      label: 'Street address',
      errorRequired: 'You must enter a street address.',
      errorPattern:
        'Invalid street address. Enter a valid street address.',
    },
    Date: {
      label: 'Date',
      errorRequired: 'You must provide a valid date.',
      errorMinDate: 'Chosen date must be after %s.',
      errorMaxDate: 'Chosen date must be before %s.',
      errorRangeStartDateMinDate: 'Chosen start date must be after %s.',
      errorRangeStartDateMaxDate: 'Chosen start date must be before %s.',
      errorRangeEndDateMinDate: 'Chosen end date must be after %s.',
      errorRangeEndDateMaxDate: 'Chosen end date must be before %s.',
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
      errorRequired: 'You must enter a national identity number.',
      errorFnr: 'Invalid national identity number.',
      errorFnrLength:
        'Invalid national identity number. Enter a valid national identity number with 11 digits.',
      errorDnr: 'Invalid D number.',
      errorDnrLength:
        'Invalid D number. Enter a valid d-number with 11 digits.',
      errorMinimumAgeValidator: 'Must be at least {age} years of age.',
      errorMinimumAgeValidatorLength:
        'Invalid birth of date. Enter a valid birth of date (incl. century digit) with 7 digits.',
    },
    OrganizationNumber: {
      label: 'Organisation number',
      errorRequired: 'You must enter an organisation number.',
      errorOrgNo: 'Invalid organisation number.',
      errorOrgNoLength:
        'Invalid organisation number. Enter a valid organisation number with 9 digits.',
    },
    BankAccountNumber: {
      label: 'Bank account',
      errorRequired: 'You must enter an account number.',
      errorBankAccountNumber: 'Invalid account number.',
      errorBankAccountNumberLength:
        'Invalid account number. Enter a valid organisation number with 11 digits.',
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
      label: 'Postcode and city', // Use British English
      invalidCode: 'Invalid postal code.',
    },
    PostalCode: {
      label: 'Postc.',
      errorRequired: 'You must enter a postal code.',
      errorPattern: 'This is not a valid postal code (four-digits).',
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
