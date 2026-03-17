import type nb from './nb-NO'
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
      errorPattern: 'You must enter a valid value.',
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
      preventUncommittedChangesText:
        'You must either add or discard the changes.',
    },
    Step: {
      summaryTitle: 'Summary',
      stepHasError: 'The form contains errors.',
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
      errorInSection: 'You must correct the errors above.',
      confirmCancelText: 'Are you sure you want to discard your changes?',
    },
    IterateViewContainer: {
      removeButton: 'Remove',
      editButton: 'Edit',
    },
    IterateEditContainer: {
      removeButton: 'Remove',
      doneButton: 'Done',
      cancelButton: 'Cancel',
      resetButton: 'Reset',
      errorInContainer: 'You must correct the errors above.',
      confirmResetText: 'Are you sure you want to clear the changes?',
    },
    IteratePushContainer: {
      createButton: 'Add',
      itemsLimitReached: 'You have reached the limit of: {limit}',
    },
    IterateArray: {
      errorMinItems: 'You must add at least {minItems} items.',
      errorMaxItems: 'You cannot add more than {maxItems} items.',
    },

    /**
     * Base fields
     */
    StringField: {
      errorMinLength:
        'Cannot be shorter than {minLength} characters.',
      errorMaxLength:
        'Cannot be longer than {maxLength} characters.',
    },
    NumberField: {
      errorMinimum: 'Must be at least {minimum}.',
      errorMaximum: 'Must be max {maximum}.',
      errorExclusiveMinimum:
        'Must be larger than {exclusiveMinimum}.',
      errorExclusiveMaximum:
        'Must be less than {exclusiveMaximum}.',
      errorMultipleOf: 'Must be divisible by {multipleOf}.',
      errorInteger: 'Must be a whole number (no decimals).',
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
      errorPattern: 'You must enter a valid postal address.',
    },
    StreetAddress: {
      label: 'Street address',
      errorRequired: 'You must enter a street address.',
      errorPattern: 'You must enter a valid street address.',
      suggestionPlaceholder: 'Enter an address',
    },
    Date: {
      label: 'Date',
      errorRequired: 'You must enter a date.',
      errorRequiredRange: 'You must enter a date range.',
      errorMinDate: 'Chosen date cannot be before {date}.',
      errorMaxDate: 'Chosen date cannot be after {date}.',
      errorStartDateMinDate: 'Start date cannot be before {date}.',
      errorStartDateMaxDate: 'Start date cannot be after {date}.',
      errorEndDateMinDate: 'End date cannot be before {date}.',
      errorEndDateMaxDate: 'End date cannot be after {date}.',
      errorInvalidDate: 'Invalid date.',
      errorInvalidStartDate: 'Invalid start date.',
      errorInvalidEndDate: 'Invalid end date.',
    },
    Expiry: {
      label: 'Expiry date',
      errorMonth: '{month} is not a valid month.',
      errorYear: '{year} is not a valid year.',
      errorRequired: 'You must enter an expiry date.',
    },
    Email: {
      label: 'Email address',
      errorRequired: 'You must enter an email address.',
      errorPattern: 'You must enter a valid email address.',
    },
    FirstName: {
      label: 'Given name',
      errorRequired: 'You must enter a given name (first name).',
      errorPattern:
        'You must enter a valid first name. Only letters, hyphens and spaces are allowed.',
    },
    LastName: {
      label: 'Surname',
      errorRequired: 'You must enter a surname (last name).',
      errorPattern:
        'You must enter a valid surname. Only letters, hyphens and spaces are allowed.',
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
        'You must enter a valid national identity number with 11 digits.',
      errorDnr: 'Invalid D number.',
      errorDnrLength:
        'You must enter a valid D number with 11 digits.',
      errorMinimumAgeValidator: 'Must be at least {age} years of age.',
      errorMinimumAgeValidatorLength:
        'You must enter a valid date of birth with 7 digits (including century).',
    },
    OrganizationNumber: {
      label: 'Organisation number',
      errorRequired: 'You must enter an organisation number.',
      errorOrgNo: 'Invalid organisation number.',
      errorOrgNoLength:
        'You must enter a valid organisation number with 9 digits.',
    },
    BankAccountNumber: {
      label: 'Bank account',
      errorRequired: 'You must enter an account number.',
      errorBankAccountNumber: 'Invalid account number.',
      errorBankAccountNumberLength:
        'You must enter a valid account number with 11 digits.',
    },
    DateOfBirth: {
      label: 'Date of birth',
      dayLabel: 'Day',
      monthLabel: 'Month',
      yearLabel: 'Year',
      dayPlaceholder: 'dd',
      monthPlaceholder: 'month',
      yearPlaceholder: 'yyyy',
      errorRequired: 'You must enter a date of birth.',
      errorDateOfBirth: 'Invalid date of birth.',
      errorDateOfBirthFuture:
        'Invalid date of birth. Enter todays date or earlier.',
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
      label: 'Postcode',
      errorRequired: 'You must enter a postcode.',
      errorPattern: 'You must enter a valid postcode (4 digits).',
    },
    City: {
      label: 'City',
      errorRequired: 'You must enter a city name.',
      errorPattern:
        'You must enter a valid city name. Only letters, hyphens and spaces are allowed.',
    },
    SelectCountry: {
      label: 'Country',
      placeholder: 'Select country',
      errorRequired: 'You must select a country from the list.',
    },
    SelectCurrency: {
      label: 'Currency',
      placeholder: 'Select currency',
      errorRequired: 'You must select a currency from the list.',
    },
    Password: {
      label: 'Password',
      errorRequired: 'You must enter a password.',
      ariaLabelShow: 'Show password',
      ariaLabelHide: 'Hide password',
    },
    Upload: {
      errorRequired: 'You must upload a file.',
      errorInvalidFiles: 'Remove all files with errors.',
    },
  } satisfies (typeof nb)['nb-NO'],
}
