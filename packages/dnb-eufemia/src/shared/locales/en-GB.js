export default {
  'en-GB': {
    TextCounter: {
      characterDown: '%count of %max characters remaining',
      characterUp: 'You have used %count of %max characters',
      characterExceeded:
        'You have exceeded the limit by %count on %max characters',
    },
    TimelineItem: {
      alt_label_completed: 'Complete',
      alt_label_current: 'Current',
      alt_label_upcoming: 'Upcoming',
    },
    Breadcrumb: {
      navText: 'Page hierarchy',
      goBackText: 'Back',
      homeText: 'Home',
      backToText: 'Back to...',
    },
    DatePicker: {
      day: 'Day',
      month: 'Month',
      year: 'Year',
      start: 'from',
      end: 'to',
      selected_date: 'Selected date: %s',
      selected_month: 'Selected month %s',
      selected_year: 'Selected year %s',
      next_month: 'Next month %s',
      prev_month: 'Previous month %s',
      next_year: 'Next year %s',
      prev_year: 'Previous year %s',
      open_picker_text: 'Open date picker',
      mask_order: 'dd/mm/yyyy',
      mask_placeholder: 'dd/mm/yyyy', // have to be same setup as "mask" - but can be like: dd/mm/åååå
      date_format: 'yyyy-MM-dd', // in v1 of date-fns we were more flexible in terms of the format
      return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
      submit_button_text: 'OK',
      cancel_button_text: 'Cancel',
      reset_button_text: 'Reset',
      placeholder_characters: {
        day: 'd',
        month: 'm',
        year: 'y',
      },
    },
    Anchor: {
      targetBlankTitle: 'Opens a new Window',
    },
    GlobalStatus: {
      default_title: 'An error has occurred',
      close_text: 'Close',
      status_anchor_text: 'Go to %s',
    },
    GlobalError: {
      404: {
        title: "We can't find the page you're looking for …",
        text: 'Are you sure you have entered the correct address? Or have we messed with the links?',
      },
      500: {
        title: 'Sorry, a technical error happened!',
        text: 'The service is not working properly at the moment. Try again later.',
      },
      code: 'Error code:',
      help: 'Here are some links that might help:',
    },
    ProgressIndicator: {
      indicator_label: 'Please wait ...',
    },
    Dropdown: {
      title: 'Option Menu',
    },
    Autocomplete: {
      title: 'Type and select',
      submit_button_title: 'Show options',
      no_options: 'No option',
      show_all: 'Show everything',
      show_options_sr: 'Browse options, close with esc button',
      aria_live_options: '%s options',
      selected_sr: 'Selected:',
      indicator_label: 'Getting data ...',
    },
    Modal: {
      dialog_title: 'Dialog Window',
      close_title: 'Close',
    },
    Dialog: {
      declineText: 'Cancel',
      confirmText: 'Approve',
    },
    NumberFormat: {
      clipboard_copy: 'Copied',
      not_available: 'Not available',
    },
    HelpButton: {
      title: 'Help text',
      aria_role: 'Help button',
    },
    Skeleton: {
      aria_busy: 'In progress ...',
      aria_ready: 'Ready to interact',
    },
    Input: {
      submit_button_title: 'Submit button',
      clear_button_title: 'Clear value',
    },
    Pagination: {
      button_title: 'Page %s',
      next_title: 'Next page',
      prev_title: 'Previous page',
      more_pages: '%s more pages',
      is_loading_text: 'Loading new content',
      load_button_text: 'Show more content',
    },
    StepIndicator: {
      overview_title: 'Steps Overview',
      step_title_extended: 'You are on step %step of %count',
      step_title: 'Step %step of %count',
    },
    Slider: {
      addTitle: 'Increase (%s)',
      subtractTitle: 'Decrease (%s)',
    },
    PaymentCard: {
      text_card_number: 'Card number',
      text_expired: 'Expired',
      text_blocked: 'Blocked',
      text_not_active: 'Not activated',
      text_order_in_process: 'Order in process',
      text_renewed: 'Renewed',
      text_replaced: 'Replaced',
      text_unknown: 'Unknown',
    },
    Logo: {
      alt: 'DNB Logo',
    },
    Tag: {
      removeIconTitle: 'Remove',
      addIconTitle: 'Add',
    },
    Table: {
      accordionToggleButtonSR: 'Show more content',
      accordionMoreContentSR: 'More content in the next row',
    },
    Upload: {
      title: 'Upload documents',
      text: 'Drag & drop your files or choose files to upload.',
      textSingular:
        'Drag & drop your file or choose which file to upload.',
      fileTypeDescription: 'Allowed formats:',
      fileSizeDescription: 'Max. filesize:',
      fileAmountDescription: 'Max. number of files:',
      fileSizeContent: '%size MB',
      buttonText: 'Choose files',
      buttonTextSingular: 'Choose file',
      loadingText: 'Uploading',
      errorLargeFile:
        'The file you are trying to upload is too big, the maximum size supported is %size MB.',
      errorAmountLimit:
        'There is a limit to how many files you can upload (%amount).',
      errorUnsupportedFile:
        'The file you are trying to upload is not supported.',
      deleteButton: 'Delete',
      fileListAriaLabel: 'uploaded files',
    },

    Forms: {
      Boolean: {
        yes: 'Yes',
        no: 'No',
      },
      Step: {
        next: 'Next',
        previous: 'Back',
      },
      Context: {
        submit: 'Send',
      },
      Field: {
        stateSummary: 'Summary:',
        errorSummary: 'Please correct the following errors:',
        errorRequired: 'This field is required',
        errorPattern: 'The value is invalid',
      },
      Input: {
        errorRequired: 'This field is required',
        errorPattern: 'The value is invalid',
      },
      StringInput: {
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
      OrganizationNumber: {
        label: 'Organization number',
        errorRequired: 'You must enter an organization number',
        errorPattern: 'This is not a valid organization number',
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
  },
}
